
import React, { useState } from 'react';
import {
    BanknotesIcon, CheckCircleIcon, QuestionMarkCircleIcon
} from '../components/icons';

const pricingData = [
    { category: 'Privatumzug', klein: '25 CHF', mittel: '35 CHF', gross: '45 CHF', premium: '55–60 CHF' },
    { category: 'Firmenumzug', klein: '40 CHF', mittel: '50 CHF', gross: '70 CHF', premium: '80–90 CHF' },
    { category: 'Möbeltransport', klein: '10 CHF', mittel: '20 CHF', gross: '30 CHF', premium: '–' },
    { category: 'Spezialumzug', klein: '30 CHF', mittel: '50 CHF', gross: '70 CHF', premium: '90 CHF' },
    { category: 'Transport', klein: '10 CHF', mittel: '20 CHF', gross: '30 CHF', premium: '–' },
    { category: 'Umzugsreinigung', klein: '12 CHF', mittel: '20 CHF', gross: '30 CHF', premium: '35 CHF' },
    { category: 'Malerarbeiten', klein: '15 CHF', mittel: '30 CHF', gross: '60 CHF', premium: '70–80 CHF' },
    { category: 'Sanitär / Heizung / Klimaanlage', klein: '25 CHF', mittel: '45 CHF', gross: '70 CHF', premium: '85–100 CHF' },
    { category: 'Badezimmerumbau', klein: '50 CHF', mittel: '80 CHF', gross: '120 CHF', premium: '140 CHF' },
    { category: 'Küchenbau', klein: '60 CHF', mittel: '100 CHF', gross: '150 CHF', premium: '180 CHF' },
    { category: 'Bodenleger / Plattenleger', klein: '15 CHF', mittel: '35 CHF', gross: '60 CHF', premium: '70–80 CHF' },
    { category: 'Schreiner / Zimmerarbeiten', klein: '15 CHF', mittel: '40 CHF', gross: '70 CHF', premium: '80–90 CHF' },
    { category: 'Dachdecker / Dachreinigung', klein: '40 CHF', mittel: '70 CHF', gross: '100 CHF', premium: '120 CHF' },
    { category: 'Fassadenbau / Renovation', klein: '50 CHF', mittel: '80 CHF', gross: '120 CHF', premium: '140–160 CHF' },
    { category: 'Fensterreinigung / Montage', klein: '12 CHF', mittel: '25 CHF', gross: '40 CHF', premium: '50 CHF' },
    { category: 'Gartenpflege / Gartenbau', klein: '10 CHF', mittel: '25 CHF', gross: '50 CHF', premium: '60 CHF' },
    { category: 'Baureinigung / Gebäudereinigung', klein: '15 CHF', mittel: '35 CHF', gross: '70 CHF', premium: '80 CHF' },
    { category: 'Entsorgung', klein: '12 CHF', mittel: '30 CHF', gross: '50 CHF', premium: '60 CHF' },
    { category: 'Räumung', klein: '15 CHF', mittel: '40 CHF', gross: '60 CHF', premium: '80 CHF' },
    { category: 'Möbelmontage / Kleinreparaturen', klein: '8 CHF', mittel: '15 CHF', gross: '25 CHF', premium: '30 CHF' },
    { category: 'Smart Home / Technik', klein: '25 CHF', mittel: '50 CHF', gross: '80 CHF', premium: '90–100 CHF' },
    { category: '24h Notdienst', klein: '40 CHF', mittel: '70 CHF', gross: '100 CHF', premium: '120–150 CHF' },
];

const faqs = [
    { q: 'Was genau ist ein "Lead"?', a: 'Ein Lead ist eine qualifizierte Anfrage von einem potenziellen Kunden, der eine Dienstleistung benötigt. Wenn Sie einen Lead kaufen, erhalten Sie die Kontaktdaten des Kunden, um ein Angebot zu unterbreiten.' },
    { q: 'Wann bezahle ich für einen Lead?', a: 'Die Kosten für einen Lead werden direkt von Ihrem Guthaben abgebucht, sobald Sie auf "Kaufen" klicken. Es gibt keine versteckten Gebühren oder Provisionen.' },
    { q: 'Sind die Preise fix?', a: 'Ja, die Preise pro Lead sind fix und nach Kategorie gestaffelt. Sie sehen den Preis immer, bevor Sie einen Kauf tätigen.' },
    { q: 'Gibt es eine Rückerstattung für schlechte Leads?', a: 'Ja. Wenn sich herausstellt, dass ein Lead ungültig ist (z.B. falsche Kontaktdaten, Spamanfrage), können Sie eine Rückerstattung beantragen. Unser Support-Team prüft jeden Fall fair.' },
];

const FaqItem: React.FC<{ q: string, a: string }> = ({ q, a }) => (
    <div className="py-5 border-b border-slate-200">
        <dt className="font-semibold text-slate-800">{q}</dt>
        <dd className="mt-2 text-slate-600">{a}</dd>
    </div>
);


const PartnerPricingPage: React.FC = () => {

    return (
        <div className="max-w-4xl mx-auto">
            <div className="space-y-8">

                {/* Pricing Table */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg">
                    <div className="p-5 border-b border-slate-200/80 flex items-center gap-3">
                        <BanknotesIcon className="w-6 h-6 text-primary-700" />
                        <h2 className="text-xl font-bold text-slate-800">Preise pro Lead</h2>
                    </div>
                    <div className="p-6">
                        <p className="text-slate-600 mb-6">Unsere Preise sind transparent und fair. Sie zahlen nur für die Anfragen, die Sie interessieren. Alle Preise verstehen sich exkl. MwSt.</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-600 font-bold text-xs uppercase text-center border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left border-r border-slate-200" rowSpan={2}>Kategorie / Gewerbe</th>
                                        <th className="px-6 py-2 border-b border-slate-200" colSpan={4}>Projektgrösse / Preis pro Lead</th>
                                    </tr>
                                    <tr className="bg-slate-100/50">
                                        <th className="px-4 py-3 font-semibold text-slate-500 border-r border-slate-200 w-1/5 whitespace-nowrap">Kleinauftrag</th>
                                        <th className="px-4 py-3 font-semibold text-slate-500 border-r border-slate-200 w-1/5 whitespace-nowrap">Mittelauftrag</th>
                                        <th className="px-4 py-3 font-semibold text-slate-500 border-r border-slate-200 w-1/5 whitespace-nowrap">Großauftrag</th>
                                        <th className="px-4 py-3 font-semibold text-slate-500 w-1/5 whitespace-nowrap">Premium / Notfall</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pricingData.map((item, index) => (
                                        <tr key={index} className="hover:bg-slate-50/50 group transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-800 border-r border-slate-200 bg-white group-hover:bg-slate-50/50">{item.category}</td>
                                            <td className="px-4 py-4 text-slate-700 text-center border-r border-slate-200">{item.klein}</td>
                                            <td className="px-4 py-4 text-slate-700 text-center border-r border-slate-200">{item.mittel}</td>
                                            <td className="px-4 py-4 text-slate-700 text-center border-r border-slate-200">{item.gross}</td>
                                            <td className="px-4 py-4 text-slate-700 text-center relative overflow-hidden">
                                                {item.premium !== '–' && (
                                                    <div className="absolute inset-0 bg-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                )}
                                                <span className="relative z-10">{item.premium}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg">
                    <div className="p-5 border-b border-slate-200/80 flex items-center gap-3">
                        <QuestionMarkCircleIcon className="w-6 h-6 text-primary-700" />
                        <h2 className="text-xl font-bold text-slate-800">Häufig gestellte Fragen</h2>
                    </div>
                    <div className="p-6">
                        <dl className="divide-y divide-slate-200">
                            {faqs.map((faq, index) => <FaqItem key={index} q={faq.q} a={faq.a} />)}
                        </dl>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PartnerPricingPage;
