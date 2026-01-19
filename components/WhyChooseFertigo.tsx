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

    const advantages = [
        {
            title: 'Fertigo',
            highlight: true,
            features: [
                { name: 'Vergleiche', available: true },
                { name: 'Anbieter finden', available: true },
                { name: 'Offerten einholen', available: true },
                { name: 'Schweizer KMU', available: true },
                { name: '1 Login für alles', available: true },
                { name: 'KI-Unterstützung', available: true },
                { name: 'Neutral & transparent', available: true },
            ],
        },
        {
            title: 'Vergleichsportale',
            highlight: false,
            features: [
                { name: 'Vergleiche', available: true },
                { name: 'Anbieter finden', available: false },
                { name: 'Offerten einholen', available: false },
                { name: 'Schweizer KMU', available: 'partial' },
                { name: '1 Login für alles', available: false },
                { name: 'KI-Unterstützung', available: false },
                { name: 'Neutral & transparent', available: 'partial' },
            ],
        },
        {
            title: 'Offertenplattformen',
            highlight: false,
            features: [
                { name: 'Vergleiche', available: false },
                { name: 'Anbieter finden', available: false },
                { name: 'Offerten einholen', available: true },
                { name: 'Schweizer KMU', available: 'partial' },
                { name: '1 Login für alles', available: false },
                { name: 'KI-Unterstützung', available: false },
                { name: 'Neutral & transparent', available: 'partial' },
            ],
        },
    ];

    const stats = [
        { value: '100%', label: 'Schweizer KMU', icon: '🇨🇭' },
        { value: '5 Min', label: 'bis zur Offerte', icon: '⚡' },
        { value: '0 CHF', label: 'für Anfragen', icon: '💰' },
    ];

    return (
        <section 
            ref={ref}
            className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20 overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className={`text-center mb-12 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <span className="inline-block px-4 py-1.5 bg-primary-500/20 text-primary-300 text-sm font-semibold rounded-full mb-4">
                        Der Unterschied
                    </span>
                    <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Warum Fertigo statt Konkurrenz?
                    </h2>
                    <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
                        Ein klarer Vergleich zeigt, wo Fertigo Ihnen Zeit und Aufwand spart.
                    </p>
                </div>

                <div className={`grid grid-cols-3 gap-4 md:gap-6 mb-12 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                        >
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                            <div className="text-xs md:text-sm text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {advantages.map((card, cardIndex) => (
                        <div
                            key={cardIndex}
                            className={`rounded-2xl p-5 md:p-6 transition-all duration-300 ${
                                card.highlight
                                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 shadow-2xl shadow-primary-500/30 scale-[1.02] border-2 border-primary-400'
                                    : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h3 className={`text-lg md:text-xl font-bold ${card.highlight ? 'text-white' : 'text-slate-300'}`}>
                                    {card.title}
                                </h3>
                                {card.highlight && (
                                    <span className="px-2 py-1 bg-white/20 text-white text-xs font-bold rounded-full">
                                        Empfohlen
                                    </span>
                                )}
                            </div>
                            <ul className="space-y-3">
                                {card.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className={`flex items-center gap-3 text-sm ${
                                            card.highlight ? 'text-white/90' : 'text-slate-400'
                                        }`}
                                    >
                                        <span className="flex-shrink-0">
                                            {feature.available === true ? (
                                                <CheckCircleIcon className={`w-5 h-5 ${card.highlight ? 'text-white' : 'text-green-400'}`} />
                                            ) : feature.available === 'partial' ? (
                                                <span className="text-yellow-400 text-base">⚠️</span>
                                            ) : (
                                                <XMarkIcon className={`w-5 h-5 ${card.highlight ? 'text-white/40' : 'text-red-400/60'}`} />
                                            )}
                                        </span>
                                        <span className={feature.available === true ? '' : 'opacity-60'}>{feature.name}</span>
                                    </li>
                                ))}
                            </ul>
                            {card.highlight && (
                                <button
                                    onClick={() => openQuoteModal()}
                                    className="mt-6 w-full py-3 px-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 group"
                                >
                                    Jetzt starten
                                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className={`mt-10 text-center text-xs text-slate-500 transition-all duration-1000 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                    Legende: ✅ vollständig · ⚠️ teilweise · ❌ nicht enthalten
                </div>
            </div>
        </section>
    );
};

export default WhyChooseFertigo;
