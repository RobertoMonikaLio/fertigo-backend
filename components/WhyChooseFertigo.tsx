import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';
import { CheckCircleIcon, XMarkIcon, ArrowRightIcon } from './icons';

const WhyChooseFertigo: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    const comparisonRows = [
        { label: 'Vergleiche', fertigo: true, portal: true, quotes: false },
        { label: 'Anbieter finden', fertigo: true, portal: false, quotes: false },
        { label: 'Offerten einholen', fertigo: true, portal: false, quotes: true },
        { label: 'Schweizer KMU', fertigo: true, portal: 'partial', quotes: 'partial' },
        { label: '1 Login für alles', fertigo: true, portal: false, quotes: false },
        { label: 'KI-Unterstützung', fertigo: true, portal: false, quotes: false },
        { label: 'Neutral & transparent', fertigo: true, portal: 'partial', quotes: 'partial' },
    ];

    const valuePoints = [
        {
            title: 'Weniger Aufwand',
            description: 'Eine Anfrage, mehrere passende Angebote.',
            icon: '⚡',
        },
        {
            title: 'Mehr Auswahl',
            description: 'Vergleich verschiedener Anbieter in wenigen Minuten.',
            icon: '📌',
        },
        {
            title: 'Klare Transparenz',
            description: 'Verifizierte Partner und klare Bedingungen.',
            icon: '🔒',
        },
    ];

    return (
        <section 
            ref={ref}
            className="relative bg-white py-16 sm:py-20 md:py-24 overflow-hidden"
        >
            {/* Subtiler Hintergrund */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Header */}
                <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <h2 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                        Warum Fertigo statt Konkurrenz?
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mb-4">
                        Ein klarer Vergleich zeigt, wo Fertigo Ihnen Zeit und Aufwand spart.
                    </p>
                    <p className="text-sm text-slate-500 max-w-2xl mx-auto">
                        Vergleich auf Basis von Plattform-Kategorien – nicht einzelner Firmen.
                    </p>
                </div>

                {/* Value Points */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {valuePoints.map((point, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-primary-400 transition-all p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">{`Vorteil ${index + 1}`}</div>
                                    <h3 className="text-2xl font-black text-slate-900">{point.title}</h3>
                                </div>
                                <div className="w-12 h-12 rounded-full border-2 border-primary-600 text-primary-600 flex items-center justify-center text-xl">
                                    {point.icon}
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed mb-6">{point.description}</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-0.5 bg-slate-200"></div>
                                <span className="text-xs font-semibold text-primary-600">Klarer Vorteil</span>
                                <div className="flex-1 h-0.5 bg-slate-200"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison Table */}
                <div className={`mb-12 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-bold text-slate-600 uppercase tracking-wide">
                                <div>Funktion</div>
                                <div className="text-center font-black text-primary-600">Fertigo</div>
                                <div className="text-center">Vergleichsportale</div>
                                <div className="text-center">Offertenplattformen</div>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {comparisonRows.map((row, index) => (
                                <div
                                    key={index}
                                    className={`grid grid-cols-2 md:grid-cols-4 gap-3 px-6 py-4 items-center ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                    style={{ transitionDelay: `${index * 70}ms` }}
                                >
                                    <div className="text-sm font-semibold text-slate-900">{row.label}</div>
                                    <div className="flex items-center justify-center">
                                        {row.fertigo ? <CheckCircleIcon className="w-5 h-5 text-green-600" /> : <XMarkIcon className="w-5 h-5 text-red-500" />}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {row.portal === true ? <CheckCircleIcon className="w-5 h-5 text-green-600" /> : row.portal === 'partial' ? <span className="text-slate-400 text-lg">⚠️</span> : <XMarkIcon className="w-5 h-5 text-red-500" />}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {row.quotes === true ? <CheckCircleIcon className="w-5 h-5 text-green-600" /> : row.quotes === 'partial' ? <span className="text-slate-400 text-lg">⚠️</span> : <XMarkIcon className="w-5 h-5 text-red-500" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
                            Legende: ✅ vollständig · ⚠️ teilweise · ❌ nicht enthalten
                        </div>
                    </div>
                </div>

                {/* CTA Section removed */}
            </div>
        </section>
    );
};

export default WhyChooseFertigo;
