
import React, { useState } from 'react';
import { 
    BanknotesIcon, CheckCircleIcon, QuestionMarkCircleIcon 
} from '../components/icons';

const pricingData = [
    { category: 'Malerarbeiten', price: 'CHF 15.00', description: 'Standard Malerarbeiten, Renovationen, Fassaden.' },
    { category: 'Gipserarbeiten', price: 'CHF 15.00', description: 'Trockenbau, Verputzarbeiten, Stuckaturen.' },
    { category: 'Bodenleger', price: 'CHF 20.00', description: 'Verlegung von Parkett, Laminat, Vinyl etc.' },
    { category: 'Reinigung', price: 'CHF 10.00', description: 'Wohnungs-, Büro- und Fensterreinigung.' },
    { category: 'Umzugsreinigung', price: 'CHF 15.00', description: 'Reinigung mit Abnahmegarantie.' },
    { category: 'Umzug & Transport', price: 'CHF 25.00', description: 'Privat- und Firmenumzüge, Möbeltransporte.' },
    { category: 'Gartenpflege', price: 'CHF 15.00', description: 'Heckenschnitt, Rasenpflege, Gartenunterhalt.' },
    { category: 'Sanitär & Heizung', price: 'CHF 20.00', description: 'Reparaturen, Installationen, Wartung.' },
    { category: 'Elektriker', price: 'CHF 20.00', description: 'Installationen, Reparaturen, Smart Home.' },
    { category: 'Schreiner', price: 'CHF 25.00', description: 'Möbel nach Mass, Reparaturen, Innenausbau.' },
    { category: 'Grosse Projekte (> CHF 10\'000)', price: 'CHF 50.00', description: 'Umfassende Renovationen, Neubau-Projekte etc.' },
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
    const [notifications, setNotifications] = useState([]);
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
                                <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Kategorie</th>
                                        <th className="px-6 py-3 font-semibold">Beschreibung</th>
                                        <th className="px-6 py-3 font-semibold text-right">Preis pro Lead</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pricingData.map((item, index) => (
                                        <tr key={index} className="hover:bg-slate-50/50">
                                            <td className="px-6 py-4 font-bold text-slate-800">{item.category}</td>
                                            <td className="px-6 py-4 text-slate-600">{item.description}</td>
                                            <td className="px-6 py-4 font-extrabold text-lg text-slate-900 text-right">{item.price}</td>
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
