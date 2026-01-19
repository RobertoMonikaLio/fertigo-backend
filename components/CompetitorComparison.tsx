import React from 'react';
import { useAppContext } from '../pages/AppContext';
import { useInView } from 'react-intersection-observer';
import { CheckCircleIcon, ArrowRightIcon, XMarkIcon } from './icons';

const CompetitorComparison: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    const advantages = [
        {
            icon: '⚡',
            title: '150x schneller',
            description: 'Von 5+ Stunden auf nur 2 Minuten',
            value: '150x',
            color: 'from-yellow-400 to-orange-500',
        },
        {
            icon: '📊',
            title: '3-5 Angebote',
            description: 'Statt nur 1-2 bei der Konkurrenz',
            value: '3-5',
            color: 'from-blue-400 to-blue-600',
        },
        {
            icon: '✅',
            title: '2\'500+ Partner',
            description: 'Alle verifiziert & geprüft',
            value: '2\'500+',
            color: 'from-green-400 to-green-600',
        },
        {
            icon: '💰',
            title: '100% kostenlos',
            description: 'Keine versteckten Kosten',
            value: '0 CHF',
            color: 'from-purple-400 to-purple-600',
        },
    ];

    const comparisonItems = [
        {
            category: 'Zeitaufwand',
            competitor: '5+ Stunden',
            fertigo: '2 Minuten',
            improvement: '99.3% schneller',
        },
        {
            category: 'Anzahl Angebote',
            competitor: '1-2',
            fertigo: '3-5',
            improvement: '2.5x mehr',
        },
        {
            category: 'Telefonate',
            competitor: 'Viele nötig',
            fertigo: 'Keine nötig',
            improvement: '100% digital',
        },
        {
            category: 'Preisvergleich',
            competitor: 'Schwierig',
            fertigo: 'Auf einen Blick',
            improvement: 'Sofort klar',
        },
    ];

    return (
        <section ref={ref} className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-300 text-sm font-bold mb-6 border border-primary-400/30">
                        <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
                        Der Vergleich
                    </div>
                    <h2 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        Die Rechnung, bitte.
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
                        Warum Fertigo die bessere Wahl ist
                    </p>
                </div>

                {/* Vergleichstabelle - Modern */}
                <div className={`mb-16 transition-all duration-1000 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50">
                        <h3 className="text-2xl font-bold text-white mb-8 text-center">Direkter Vergleich</h3>
                        <div className="space-y-4">
                            {comparisonItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50 hover:border-primary-500/50 transition-all"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-white mb-2">{item.category}</h4>
                                        </div>
                                        <div className="flex items-center gap-6 flex-1">
                                            <div className="flex-1 text-center">
                                                <div className="text-xl font-bold text-red-400">{item.competitor}</div>
                                                <div className="text-xs text-slate-400 mt-1">Konkurrenz</div>
                                            </div>
                                            <div className="text-primary-400 font-bold">vs</div>
                                            <div className="flex-1 text-center">
                                                <div className="text-xl font-bold text-primary-400">{item.fertigo}</div>
                                                <div className="text-xs text-slate-400 mt-1">Fertigo</div>
                                            </div>
                                        </div>
                                        <div className="md:w-32 text-center">
                                            <div className="inline-block bg-primary-500/20 text-primary-300 text-sm font-bold px-4 py-2 rounded-full border border-primary-400/30">
                                                {item.improvement}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vorteile Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {advantages.map((advantage, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-primary-500/50 transition-all hover:-translate-y-2"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                            <div className="relative p-8">
                                <div className="text-5xl mb-4">{advantage.icon}</div>
                                <div className="text-4xl font-black text-white mb-2">{advantage.value}</div>
                                <h4 className="text-xl font-bold text-white mb-2">{advantage.title}</h4>
                                <p className="text-sm text-slate-300">{advantage.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className={`text-center transition-all duration-1000 delay-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <button
                        onClick={() => openQuoteModal()}
                        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold px-10 py-5 md:px-14 md:py-6 rounded-2xl transition-all shadow-2xl hover:shadow-primary-500/50 transform hover:-translate-y-1 text-lg md:text-xl inline-flex items-center gap-4"
                    >
                        <span>Jetzt Zeit sparen</span>
                        <ArrowRightIcon className="w-6 h-6 md:w-7 md:h-7" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CompetitorComparison;
