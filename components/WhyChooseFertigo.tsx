import React from 'react';
import { useInView } from 'react-intersection-observer';

const WhyChooseFertigo: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
    });

    const comparisons = [
        {
            fertigo: { title: '5 Minuten', desc: 'bis zur Offerte' },
            konkurrenz: { title: '5+ Stunden', desc: 'Recherche & Anrufe' },
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
        {
            fertigo: { title: '0 CHF', desc: 'für Ihre Anfrage' },
            konkurrenz: { title: 'Versteckte Kosten', desc: 'oder teure Abos' },
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            fertigo: { title: '100% geprüft', desc: 'Schweizer KMU' },
            konkurrenz: { title: 'Unbekannte', desc: 'Qualität & Herkunft' },
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            fertigo: { title: 'KI-Unterstützung', desc: 'Smarte Empfehlungen' },
            konkurrenz: { title: 'Manuelle Suche', desc: 'Zeitaufwändig' },
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
    ];

    return (
        <section
            ref={ref}
            className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-white"
        >
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                {/* Header */}
                <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-5 leading-tight">
                        Warum Fertigo{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                            statt Konkurrenz?
                        </span>
                    </h2>
                    <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
                        Der Unterschied auf einen Blick
                    </p>
                </div>

                {/* VS Comparison Grid */}
                <div className={`transition-all duration-1000 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Header Row */}
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mb-6">
                        <div className="flex items-center justify-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-white font-bold shadow-lg shadow-green-600/25">
                                <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-sm font-black">F</span>
                                Mit Fertigo
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-black text-slate-500 text-sm">
                                VS
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-400 text-white font-bold">
                                <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-sm font-black">K</span>
                                Konkurrenz
                            </div>
                        </div>
                    </div>

                    {/* Comparison Rows */}
                    <div className="space-y-4">
                        {comparisons.map((item, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-[1fr_auto_1fr] gap-4 items-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${200 + index * 100}ms` }}
                            >
                                {/* Fertigo Side */}
                                <div className="bg-white rounded-2xl border-2 border-green-200 p-5 shadow-md hover:shadow-lg hover:border-green-300 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-xl font-black text-slate-900">{item.fertigo.title}</div>
                                            <div className="text-sm text-slate-600">{item.fertigo.desc}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center Divider */}
                                <div className="flex flex-col items-center">
                                    <div className="w-px h-full min-h-[60px] bg-gradient-to-b from-green-300 via-slate-300 to-red-300"></div>
                                </div>

                                {/* Konkurrenz Side */}
                                <div className="bg-slate-100 rounded-2xl border-2 border-slate-200 p-5 opacity-75">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-slate-500">{item.konkurrenz.title}</div>
                                            <div className="text-sm text-slate-400">{item.konkurrenz.desc}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className={`mt-14 text-center transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-green-50 border border-green-200">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🇨🇭</span>
                            <span className="font-semibold text-slate-700">100% Schweiz</span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 hidden sm:block"></span>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            <span className="font-semibold text-slate-700">Sofort Offerten</span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 hidden sm:block"></span>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">💰</span>
                            <span className="font-semibold text-slate-700">Kostenlos</span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 hidden sm:block"></span>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">✅</span>
                            <span className="font-semibold text-slate-700">Geprüfte Partner</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseFertigo;
