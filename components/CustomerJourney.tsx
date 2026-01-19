import React from 'react';
import { LightbulbIcon, MagnifyingGlassIcon, UserCheckIcon, TestsiegerIcon } from './icons';

const journeySteps = [
    {
        icon: <LightbulbIcon className="w-8 h-8 text-primary-700" />,
        title: "Ihre Idee & Vision",
        description: "Sie haben einen Plan. Beschreiben Sie Ihr Projekt mühelos in unserem Formular und wir aktivieren unser Netzwerk für Sie."
    },
    {
        icon: <MagnifyingGlassIcon className="w-8 h-8 text-primary-700" />,
        title: "Der smarte Vergleich",
        description: "Lehnen Sie sich entspannt zurück. Sie erhalten massgeschneiderte Offerten und können Preise, Leistungen und Bewertungen in Ruhe vergleichen."
    },
    {
        icon: <UserCheckIcon className="w-8 h-8 text-primary-700" />,
        title: "Die sichere Auswahl",
        description: "Sie haben die volle Kontrolle. Wählen Sie mit Vertrauen den geprüften Profi, der am besten zu Ihren Wünschen und Ihrem Budget passt."
    },
    {
        icon: <TestsiegerIcon className="w-8 h-8 text-primary-700" />,
        title: "Das perfekte Ergebnis",
        description: "Freuen Sie sich über ein professionell umgesetztes Projekt, das Ihre Erwartungen übertrifft. Einfach, sicher und zu Ihrer vollen Zufriedenheit."
    }
];

const CustomerJourney: React.FC = () => {
    return (
        <section className="py-24 sm:py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Ihre Reise zum perfekten Ergebnis</h2>
                    <p className="text-lg text-slate-600">
                        Wir begleiten Sie bei jedem Schritt und sorgen dafür, dass Ihr Projekt ein voller Erfolg wird – transparent und stressfrei.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {journeySteps.map((step, index) => (
                        <div key={index} className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200/60 flex flex-col items-center text-center">
                           <div className="flex-shrink-0 w-20 h-20 mb-6 rounded-full bg-white flex items-center justify-center shadow-md">
                                {step.icon}
                           </div>
                           <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                           <p className="text-slate-600 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerJourney;