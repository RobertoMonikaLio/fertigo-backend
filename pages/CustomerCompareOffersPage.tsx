import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import { BeakerIcon, PlusIcon, TrashIcon, SpinnerIcon, ExclamationTriangleIcon, CheckCircleIcon, ListBulletIcon } from '../components/icons';

let ai: GoogleGenAI | null = null;
try {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
} catch (error) {
    console.error("Fehler bei der Initialisierung von GoogleGenAI:", error);
}

const comparisonSchema = {
    type: Type.OBJECT,
    properties: {
        comparison: {
            type: Type.ARRAY,
            description: 'Eine Liste der analysierten Offerten.',
            items: {
                type: Type.OBJECT,
                properties: {
                    providerName: { type: Type.STRING, description: 'Der Name des Anbieters/der Firma aus dem Offertentext.' },
                    totalPrice: { type: Type.NUMBER, description: 'Der Gesamtpreis der Offerte als Zahl. Falls nicht explizit genannt, gib 0 an.' },
                    includedServices: { type: Type.ARRAY, description: 'Eine Liste der explizit im Preis enthaltenen Hauptleistungen.', items: { type: Type.STRING } },
                    materialCosts: { type: Type.STRING, description: 'Angaben zu den Materialkosten (z.B. "Inklusive", "Separat", "CHF 500").' },
                    warranty: { type: Type.STRING, description: 'Angaben zur Garantie (z.B. "2 Jahre", "Nicht erwähnt").' },
                    timeline: { type: Type.STRING, description: 'Informationen zum Zeitplan oder Startdatum (z.B. "Start ab KW 34", "ca. 5 Tage").' },
                    summary: { type: Type.STRING, description: 'Eine sehr kurze, neutrale Zusammenfassung der wichtigsten Punkte in einem Satz.' }
                },
                required: ['providerName', 'totalPrice', 'includedServices', 'materialCosts', 'warranty', 'timeline', 'summary']
            }
        }
    },
    required: ['comparison']
};

interface ComparisonResult {
    providerName: string;
    totalPrice: number;
    includedServices: string[];
    materialCosts: string;
    warranty: string;
    timeline: string;
    summary: string;
}

const CustomerCompareOffersPage: React.FC = () => {
    const { requestId } = useParams<{ requestId: string }>();
    const [quotes, setQuotes] = useState([{ id: 1, providerName: '', text: '' }]);
    const [comparisonResult, setComparisonResult] = useState<ComparisonResult[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAddQuote = () => {
        if (quotes.length < 5) {
            setQuotes([...quotes, { id: Date.now(), providerName: '', text: '' }]);
        }
    };

    const handleRemoveQuote = (id: number) => {
        setQuotes(quotes.filter(q => q.id !== id));
    };

    const handleQuoteChange = (id: number, field: 'providerName' | 'text', value: string) => {
        setQuotes(quotes.map(q => (q.id === id ? { ...q, [field]: value } : q)));
    };

    const handleAnalyze = async () => {
        if (!ai) {
            setError("Die KI-Analyse ist zurzeit nicht verfügbar. Bitte versuchen Sie es später erneut.");
            return;
        }

        const validQuotes = quotes.filter(q => q.text.trim().length > 10 && q.providerName.trim().length > 0);
        if (validQuotes.length < 2) {
            setError("Bitte geben Sie mindestens zwei Offerten mit Firmennamen und Text ein, um sie zu vergleichen.");
            return;
        }
        
        setError('');
        setIsLoading(true);
        setComparisonResult(null);

        try {
            const systemInstruction = `Du bist ein Experte für die Analyse von Handwerker-Offerten in der Schweiz. Deine Aufgabe ist es, die folgenden Offertentexte zu analysieren und die wichtigsten Informationen strukturiert zu extrahieren. Achte besonders auf Preise, Leistungen, Materialkosten, Garantien und Zeitpläne. Gib die extrahierten Daten ausschliesslich im JSON-Format zurück, das dem bereitgestellten Schema entspricht.`;
            const userContent = validQuotes.map(q => `--- Offerte VON "${q.providerName}" ---\n${q.text}\n--- ENDE Offerte ---`).join('\n\n');
            const fullPrompt = `${systemInstruction}\n\nAnalysiere die folgenden Texte:\n${userContent}`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: fullPrompt,
                config: { responseMimeType: "application/json", responseSchema: comparisonSchema }
            });

            const responseText = response.text || (response as any).response?.text || '';
            if (!responseText) {
                throw new Error("Keine Antwort von der KI erhalten.");
            }
            const result = JSON.parse(responseText);
            if (result.comparison && result.comparison.length > 0) {
                setComparisonResult(result.comparison);
            } else {
                throw new Error("Die KI konnte die Offerten nicht korrekt analysieren.");
            }
        } catch (err) {
            console.error("Fehler bei der KI-Analyse:", err);
            setError("Ein Fehler ist aufgetreten. Bitte stellen Sie sicher, dass die Offertentexte klar formuliert sind und versuchen Sie es erneut.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Link to={`/kunden/anfragen/${requestId}`} className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-text-light dark:hover:text-text-dark mb-6">
                <span className="material-symbols-outlined">arrow_back</span>
                Zurück zum Projekt
            </Link>

            <header className="mb-8">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] flex items-center gap-4">
                    <BeakerIcon className="w-10 h-10 text-primary" />
                    <span>Angebote mit KI vergleichen</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal mt-2">Fügen Sie den Text Ihrer Offerten ein, um eine automatische Vergleichsübersicht zu erstellen.</p>
            </header>

            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark space-y-6">
                <h2 className="text-xl font-bold text-text-light dark:text-text-dark">1. Offerten einfügen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {quotes.map((q, index) => (
                        <div key={q.id} className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-border-light dark:border-border-dark relative">
                            <input
                                type="text"
                                placeholder={`Name von Firma ${index + 1}`}
                                value={q.providerName}
                                onChange={(e) => handleQuoteChange(q.id, 'providerName', e.target.value)}
                                className="w-full p-2 mb-2 border-b bg-transparent font-bold focus:outline-none focus:border-primary"
                            />
                            <textarea
                                value={q.text}
                                onChange={(e) => handleQuoteChange(q.id, 'text', e.target.value)}
                                placeholder={`Fügen Sie hier den Text der Offerte ${index + 1} ein...\n(z.B. aus einer E-Mail oder PDF kopieren)`}
                                rows={8}
                                className="w-full p-2 bg-transparent text-sm focus:outline-none resize-y"
                            />
                             {quotes.length > 1 && (
                                <button onClick={() => handleRemoveQuote(q.id)} className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="w-5 h-5"/></button>
                            )}
                        </div>
                    ))}
                </div>
                 {quotes.length < 5 && (
                    <button onClick={handleAddQuote} className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80">
                        <PlusIcon className="w-5 h-5"/> Weitere Offerte hinzufügen
                    </button>
                )}
            </div>

            <div className="text-center my-8">
                <button onClick={handleAnalyze} disabled={isLoading} className="bg-primary text-white font-bold px-8 py-4 rounded-lg hover:bg-primary/90 transition-all shadow-lg text-lg flex items-center justify-center gap-3 w-full sm:w-auto mx-auto disabled:bg-primary/50 disabled:cursor-wait">
                    {isLoading ? <><SpinnerIcon className="w-6 h-6 animate-spin"/> Angebote werden analysiert...</> : <><BeakerIcon className="w-6 h-6"/> Angebote mit KI analysieren</>}
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3"><ExclamationTriangleIcon className="w-6 h-6 mt-1 flex-shrink-0"/><p>{error}</p></div>
            )}
            
            {comparisonResult && (
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark animate-fade-in">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">2. Vergleichsübersicht</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] border-collapse text-sm">
                            <thead className="border-b-2 border-border-light dark:border-border-dark">
                                <tr>
                                    <th className="p-3 text-left font-bold text-text-light dark:text-text-dark w-1/6">Merkmal</th>
                                    {comparisonResult.map((res, i) => (
                                        <th key={i} className="p-3 text-left font-bold text-primary">{res.providerName || `Offerte ${i + 1}`}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border-light dark:border-border-dark"><td className="p-3 font-semibold text-gray-500 dark:text-gray-400">Gesamtpreis</td>{comparisonResult.map((res, i) => <td key={i} className="p-3 text-lg font-extrabold text-text-light dark:text-text-dark">{res.totalPrice > 0 ? `CHF ${res.totalPrice.toLocaleString('de-CH')}` : 'n.a.'}</td>)}</tr>
                                <tr className="border-b border-border-light dark:border-border-dark"><td className="p-3 font-semibold text-gray-500 dark:text-gray-400 align-top">Leistungen</td>{comparisonResult.map((res, i) => <td key={i} className="p-3 align-top"><ul className="space-y-1.5">{res.includedServices.map((s, j) => <li key={j} className="flex items-start gap-2"><CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"/>{s}</li>)}</ul></td>)}</tr>
                                <tr className="border-b border-border-light dark:border-border-dark"><td className="p-3 font-semibold text-gray-500 dark:text-gray-400">Materialkosten</td>{comparisonResult.map((res, i) => <td key={i} className="p-3">{res.materialCosts}</td>)}</tr>
                                <tr className="border-b border-border-light dark:border-border-dark"><td className="p-3 font-semibold text-gray-500 dark:text-gray-400">Zeitplan</td>{comparisonResult.map((res, i) => <td key={i} className="p-3">{res.timeline}</td>)}</tr>
                                <tr className="border-b border-border-light dark:border-border-dark"><td className="p-3 font-semibold text-gray-500 dark:text-gray-400">Garantie</td>{comparisonResult.map((res, i) => <td key={i} className="p-3">{res.warranty}</td>)}</tr>
                                <tr><td className="p-3 font-semibold text-gray-500 dark:text-gray-400 align-top">KI-Zusammenfassung</td>{comparisonResult.map((res, i) => <td key={i} className="p-3 align-top italic text-gray-600 dark:text-gray-300">"{res.summary}"</td>)}</tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomerCompareOffersPage;