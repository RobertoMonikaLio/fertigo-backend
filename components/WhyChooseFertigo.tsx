import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';
import { CheckCircleIcon, ArrowRightIcon } from './icons';

const WhyChooseFertigo: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    const benefits = [
        {
            icon: '🔍',
            title: 'Vergleichen',
            description: 'Alle relevanten Anbieter auf einen Blick – transparent und neutral bewertet.',
            color: 'from-blue-500 to-cyan-400',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
        },
        {
            icon: '🎯',
            title: 'Finden',
            description: 'Der perfekte Match für Ihr Projekt – basierend auf Ihren individuellen Anforderungen.',
            color: 'from-emerald-500 to-teal-400',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20',
        },
        {
            icon: '📋',
            title: 'Offerten erhalten',
            description: 'Kostenlose Offerten von qualifizierten Schweizer KMU – schnell und unkompliziert.',
            color: 'from-violet-500 to-purple-400',
            bgColor: 'bg-violet-500/10',
            borderColor: 'border-violet-500/20',
        },
        {
            icon: '🤖',
            title: 'KI-Unterstützung',
            description: 'Intelligente Empfehlungen und automatische Vorauswahl der besten Anbieter.',
            color: 'from-orange-500 to-amber-400',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/20',
        },
    ];

    const highlights = [
        { value: '100%', label: 'Schweizer KMU', sublabel: 'Lokale Partner' },
        { value: '5', label: 'Minuten', sublabel: 'bis zur Offerte' },
        { value: '0.-', label: 'Kosten', sublabel: 'für Anfragen' },
    ];

    return (
        <section 
            ref={ref}
            className="relative bg-white py-20 sm:py-28 overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full mb-6">
                        <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                        <span className="text-primary-700 text-sm font-semibold">Ihre Vorteile</span>
                    </div>
                    <h2 className="font-title text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Fertigo</span> macht den Unterschied
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Die erste Plattform der Schweiz, die Vergleichen, Finden und Offerten einholen vereint – alles an einem Ort.
                    </p>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className={`group relative p-8 rounded-3xl ${benefit.bgColor} border ${benefit.borderColor} hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1`}
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {benefit.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {benefit.description}
                            </p>
                            <div className={`absolute top-8 right-8 w-20 h-20 bg-gradient-to-br ${benefit.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                        </div>
                    ))}
                </div>

                <div className={`relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12 overflow-hidden transition-all duration-1000 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="grid grid-cols-3 gap-6 md:gap-12 mb-10">
                            {highlights.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-white font-semibold text-sm md:text-base">{stat.label}</div>
                                    <div className="text-slate-400 text-xs md:text-sm">{stat.sublabel}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => openQuoteModal()}
                                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 flex items-center justify-center gap-3"
                            >
                                <span>Kostenlos Offerten erhalten</span>
                                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                                <span>Unverbindlich & kostenlos</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-500 transition-all duration-1000 delay-600 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                        <span>Neutral & transparent</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                        <span>1 Login für alles</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                        <span>Datenschutz garantiert</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseFertigo;
