
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons';

const PricingPage: React.FC = () => {
    const [faqOpen, setFaqOpen] = useState<number | null>(0);
    const [service, setService] = useState('Malerarbeiten');
    const [amount, setAmount] = useState('');
    const [priceResult, setPriceResult] = useState<string | null>(null);

    const toggleFaq = (index: number) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const calculatePrice = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setPriceResult('Bitte geben Sie eine gültige Menge ein.');
            return;
        }
        let price = 0;
        switch (service) {
            case 'Malerarbeiten': price = 10 * numAmount; break;
            case 'Umzug & Transport': price = 20 * numAmount; break;
            case 'Reinigung': price = 5 * numAmount; break;
            default: price = 0;
        }
        setPriceResult(`Geschätzter Preis: CHF ${price.toLocaleString('de-CH')}`);
    };

    const faqs = [
        {
            q: 'Sind die Preise verbindlich?',
            a: 'Die hier berechneten Preise sind unverbindliche Schätzungen basierend auf Durchschnittswerten. Nach Ihrer Anfrage erhalten Sie exakte, individuelle Angebote direkt von den Anbietern, die auf Ihr spezifisches Projekt zugeschnitten sind.'
        }, {
            q: 'Gibt es versteckte Kosten?',
            a: 'Nein. Unser Vermittlungsservice ist für Sie als Auftraggeber zu 100% kostenlos und unverbindlich. Sie zahlen nur den Preis, den Sie mit dem ausgewählten Anbieter vereinbaren.'
        }, {
            q: 'Wie kann ich am besten sparen?',
            a: 'Der grösste Spareffekt entsteht durch den direkten Vergleich mehrerer Angebote. Achten Sie nicht nur auf den Endpreis, sondern auch auf die im Angebot enthaltenen Leistungen, Materialien und die Qualifikationen des Anbieters.'
        }
    ];

    const structuredFaqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <div className="bg-white">
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredFaqData) }}
            />
            <div className="container mx-auto px-6 py-24 sm:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-4">Preise & Leistungen</h1>
                    <p className="text-lg text-slate-600">
                        Nutzen Sie unseren Preisrechner für eine erste Schätzung und finden Sie Antworten auf häufige Fragen.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-lg">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Preisrechner</h2>
                        <form onSubmit={calculatePrice} className="flex flex-col gap-6">
                            <div className="w-full">
                                <label htmlFor="serviceType" className="block font-semibold mb-2 text-slate-700">Service wählen</label>
                                <select id="serviceType" value={service} onChange={(e) => setService(e.target.value)} className="w-full border-slate-300 rounded-lg px-4 py-3 bg-white shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition">
                                    <option value="Malerarbeiten">Malerarbeiten</option>
                                    <option value="Umzug & Transport">Umzug & Transport</option>
                                    <option value="Reinigung">Reinigung</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="amount" className="block font-semibold mb-2 text-slate-700">Menge / Grösse (z.B. m², Zimmer)</label>
                                <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="1" className="w-full border-slate-300 rounded-lg px-4 py-3 bg-white shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition" placeholder="z.B. 50" />
                            </div>
                            <button type="submit" className="bg-primary-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full">
                                Preis schätzen
                            </button>
                            {priceResult && (
                                <div className="mt-4 text-center bg-green-50 text-green-800 border border-green-200 rounded-lg p-4 w-full" aria-live="polite">
                                  <p className="font-bold text-lg">{priceResult}</p>
                                  <p className="text-sm">Dies ist eine unverbindliche Schätzung.</p>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="w-full pt-4">
                        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Häufig gestellte Fragen</h2>
                        <div className="space-y-4">
                            {faqs.map((item, idx) => (
                                <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                    <button 
                                        type="button" 
                                        className="w-full flex justify-between items-center text-left p-5 font-semibold text-slate-900 hover:bg-slate-50 transition-colors" 
                                        onClick={() => toggleFaq(idx)}
                                        aria-expanded={faqOpen === idx}
                                        aria-controls={`faq-content-${idx}`}
                                    >
                                        <span className="text-lg">{item.q}</span>
                                        <span className={`transform transition-transform duration-300 ${faqOpen === idx ? 'rotate-180' : 'rotate-0'}`}>
                                            <ChevronDownIcon className="w-5 h-5 text-slate-500" />
                                        </span>
                                    </button>
                                    <div
                                        id={`faq-content-${idx}`}
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${faqOpen === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="text-slate-600 p-5 pt-0 text-base leading-relaxed">
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
