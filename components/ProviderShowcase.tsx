import React from 'react';

const trades = [
    {
        icon: '🎨',
        name: 'Maler & Gipser',
        description: 'Für perfekte Oberflächen und ein neues Wohngefühl in Ihren Räumen.'
    },
    {
        icon: '💧',
        name: 'Sanitär & Heizung',
        description: 'Alle Installationen und Reparaturen rund um Bad, Küche und Heizsysteme.'
    },
    {
        icon: '⚡️',
        name: 'Elektriker',
        description: 'Sichere Elektroinstallationen von der Steckdose bis zum Smart Home.'
    },
    {
        icon: '🌿',
        name: 'Gärtner',
        description: 'Professionelle Pflege für Ihren Garten, von Rasen bis Baumschnitt.'
    },
    {
        icon: '🪚',
        name: 'Schreiner',
        description: 'Massgefertigte Möbel, Reparaturen und Holzarbeiten nach Wunsch.'
    },
    {
        icon: '🛠️',
        name: 'Bodenleger',
        description: 'Verlegung von Parkett, Laminat, Teppich und weiteren Bodenbelägen.'
    }
];

const ProviderShowcase: React.FC = () => {
    return (
        <section className="bg-primary-50 py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Unsere geprüften Fachbetriebe</h2>
                    <p className="text-lg text-slate-600">
                        Wir verbinden Sie mit qualifizierten Experten aus allen wichtigen Branchen – für jedes Projekt der richtige Partner.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trades.map((trade) => (
                        <a href="#hero-form" key={trade.name} className="group bg-white p-8 rounded-2xl border border-slate-200/80 shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-primary-100 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-200">
                                {trade.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{trade.name}</h3>
                            <p className="text-slate-600 leading-relaxed">{trade.description}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProviderShowcase;