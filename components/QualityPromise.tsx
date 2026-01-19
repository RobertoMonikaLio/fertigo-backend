import React from 'react';
import { ShieldCheckIcon, UserCheckIcon, CheckCircleIcon } from './icons';

const promises = [
    {
        icon: <UserCheckIcon className="w-7 h-7 text-primary-700" />,
        title: "Nur verifizierte Profis",
        description: "Jeder Partner wird von uns sorgfältig geprüft – auf Handelsregistereintrag, Erfahrung und Zuverlässigkeit."
    },
    {
        icon: <ShieldCheckIcon className="w-7 h-7 text-primary-700" />,
        title: "Datenschutz nach Schweizer Standard",
        description: "Ihre Daten werden vertraulich behandelt und nur an passende Anbieter für Ihr Projekt weitergegeben."
    },
    {
        icon: <CheckCircleIcon className="w-7 h-7 text-primary-700" />,
        title: "Kostenlos & 100% unverbindlich",
        description: "Der Vergleich von Angeboten verpflichtet Sie zu nichts. Sie entscheiden frei, ob und an wen Sie den Auftrag vergeben."
    }
];

const QualityPromise: React.FC = () => {
    return (
        <section className="bg-white py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-6">Ihr Projekt in den besten Händen</h2>
                        <p className="text-lg text-slate-600 mb-10">
                            Wir gehen über die reine Vermittlung hinaus. Unser Qualitätsversprechen sichert Ihnen ein reibungsloses Erlebnis von der Anfrage bis zum abgeschlossenen Projekt.
                        </p>
                        <div className="space-y-8">
                            {promises.map((promise, index) => (
                                <div key={index} className="flex items-start gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center">
                                        {promise.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-1">{promise.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{promise.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="hidden lg:block">
                        <img 
                            src="https://images.unsplash.com/photo-1581092916372-23f2162a445d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                            alt="Qualitätsversprechen" 
                            className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityPromise;