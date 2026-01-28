import React, { useState } from 'react';
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

    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const features = [
        { name: 'Schnelle Offerten', fertigo: '5 Minuten', competitor: '5+ Stunden', icon: '⚡' },
        { name: 'Kostenlos für Kunden', fertigo: true, competitor: 'partial', icon: '💰' },
        { name: '100% Schweizer KMU', fertigo: true, competitor: 'partial', icon: '🇨🇭' },
        { name: 'KI-Unterstützung', fertigo: true, competitor: false, icon: '🤖' },
        { name: '1 Login für alles', fertigo: true, competitor: false, icon: '🔐' },
        { name: 'Geprüfte Partner', fertigo: true, competitor: 'partial', icon: '✅' },
    ];

    const stats = [
        { value: '100%', label: 'Schweizer KMU', icon: '🇨🇭' },
        { value: '5 Min', label: 'bis zur Offerte', icon: '⚡' },
        { value: '0 CHF', label: 'für Anfragen', icon: '💰' },
        { value: '1 Login', label: 'für alle Services', icon: '🔐' },
        { value: '24/7', label: 'online anfragen', icon: '🌙' },
    ];

    return (
        <section 
            ref={ref}
            className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-emerald-50 to-emerald-100"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 1px 1px, #000 1px, transparent 0)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 mb-4">
                        Warum Fertigo{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                            statt Konkurrenz?
                        </span>
                    </h2>
                    <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Ein klarer Vergleich zeigt, wo Fertigo Ihnen Zeit und Aufwand spart
                    </p>
                </div>

                {/* Mobile-Ansicht: Kompakte klassische Tabelle */}
                <div className={`mb-10 md:hidden transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        {/* Kompakter Header */}
                        <div className="px-3 py-2.5 bg-slate-900 text-white border-b border-slate-700">
                            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-1">
                                Vergleichstabelle
                            </div>
                            <div className="text-sm font-black">
                                Fertigo vs. Konkurrenz
                            </div>
                        </div>

                        {/* Kompakte Tabelle */}
                        <div className="overflow-x-auto -mx-1">
                            <table className="w-full border-collapse text-xs">
                                <thead>
                                    <tr className="bg-slate-50 border-b-2 border-slate-200">
                                        <th className="px-2 py-2 text-left text-[9px] font-bold uppercase tracking-wider text-slate-500 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">
                                            Feature
                                        </th>
                                        <th className="px-2 py-2 text-center text-[9px] font-bold uppercase tracking-wider text-slate-500 min-w-[75px]">
                                            <div className="inline-flex items-center gap-1">
                                                <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-500 text-[7px] font-black text-white">
                                                    F
                                                </span>
                                                <span className="text-slate-600">Fertigo</span>
                                            </div>
                                        </th>
                                        <th className="px-2 py-2 text-center text-[9px] font-bold uppercase tracking-wider text-slate-500 min-w-[75px]">
                                            <div className="inline-flex items-center gap-1">
                                                <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-400 text-[7px] font-black text-white">
                                                    K
                                                </span>
                                                <span className="text-slate-500">Konkurrenz</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {features.map((feature, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-slate-50/30 transition-colors"
                                        >
                                            {/* Feature - Sticky */}
                                            <td className="px-2 py-2.5 sticky left-0 bg-white z-10 border-r border-slate-100">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-base flex-shrink-0">{feature.icon}</span>
                                                    <span className="text-[11px] font-bold text-slate-900 leading-tight">
                                                        {feature.name}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Fertigo */}
                                            <td className="px-2 py-2.5 text-center">
                                                {feature.fertigo === true ? (
                                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 border border-green-200">
                                                        <CheckCircleIcon className="h-3 w-3 text-green-600" />
                                                        <span className="text-[10px] font-bold">Ja</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white">
                                                        <span className="text-[9px] uppercase opacity-80">in</span>
                                                        <span className="text-[10px] font-black">{feature.fertigo}</span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Konkurrenz */}
                                            <td className="px-2 py-2.5 text-center">
                                                {feature.competitor === true ? (
                                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                                        <CheckCircleIcon className="h-3 w-3 text-slate-400" />
                                                        <span className="text-[10px] font-bold">Ja</span>
                                                    </div>
                                                ) : feature.competitor === 'partial' ? (
                                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                                                        <span className="text-xs">⚠️</span>
                                                        <span className="text-[10px] font-bold">Teilw.</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">
                                                        {typeof feature.competitor === 'string' ? (
                                                            <>
                                                                <XMarkIcon className="h-3 w-3 text-red-500" />
                                                                <span className="text-[9px] font-bold">{feature.competitor}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XMarkIcon className="h-3 w-3 text-red-500" />
                                                                <span className="text-[10px] font-bold">Nein</span>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Scroll Hint */}
                        <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 text-center">
                            <p className="text-[9px] text-slate-500">
                                ← Swipe für vollständige Ansicht →
                            </p>
                        </div>
                    </div>

                    {/* Mobile Stats - Kompaktes Grid */}
                    <div className={`mt-3 grid grid-cols-2 gap-2 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center px-2.5 py-2.5 rounded-lg bg-white border border-slate-200 shadow-sm"
                            >
                                <div className="text-lg mb-0.5">{stat.icon}</div>
                                <div className="text-sm font-black text-slate-900 mb-0.5">{stat.value}</div>
                                <div className="text-[9px] text-slate-600 font-medium leading-tight">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop/Tablet: Tabelle + Stats wie bisher */}
                <div className={`hidden md:block mb-16 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                        {/* Table Header */}
                        <div className="px-6 lg:px-8 py-5 border-b border-slate-200">
                            <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
                                Direktvergleich
                            </div>
                            <div className="text-lg lg:text-xl font-black text-slate-900">
                                Die 6 wichtigsten Vorteile im Überblick
                            </div>
                        </div>

                        {/* Table Body */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-separate border-spacing-y-3 px-4">
                                <thead>
                                    <tr className="text-left text-xs font-semibold text-slate-500">
                                        <th className="px-6 py-2 w-1/2"></th>
                                        <th className="px-3 py-2 w-1/4 text-center">
                                            <div className="inline-flex items-center justify-center gap-1.5">
                                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-black text-white">
                                                    F
                                                </span>
                                                <span className="text-slate-600">Fertigo</span>
                                            </div>
                                        </th>
                                        <th className="px-3 py-2 w-1/4 text-center">
                                            <div className="inline-flex items-center justify-center gap-1.5">
                                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-400 text-[10px] font-black text-white">
                                                    K
                                                </span>
                                                <span className="text-slate-500">Konkurrenz</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {features.map((feature, index) => (
                                        <tr
                                            key={index}
                                            onMouseEnter={() => setHoveredRow(index)}
                                            onMouseLeave={() => setHoveredRow(null)}
                                            className={`
                                                align-middle transition-all duration-200
                                                ${hoveredRow === index ? 'scale-[1.01]' : ''}
                                            `}
                                        >
                                            {/* Feature cell */}
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`
                                                        flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xl transition-all duration-200
                                                        ${hoveredRow === index ? 'bg-green-100 scale-110' : 'bg-slate-100'}
                                                    `}>
                                                        {feature.icon}
                                                    </div>
                                                    <div className="text-sm sm:text-base font-bold text-slate-900">
                                                        {feature.name}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Fertigo cell */}
                                            <td className="px-3 py-3 text-center">
                                                <div className={`
                                                    inline-flex min-w-[110px] items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold
                                                    ${feature.fertigo === true
                                                        ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
                                                        : 'bg-green-500 text-white'}
                                                `}>
                                                    {feature.fertigo === true ? (
                                                        <>
                                                            <CheckCircleIcon className="h-4 w-4 text-green-600" />
                                                            <span>Ja, inklusive</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-[11px] uppercase tracking-wide opacity-80">
                                                                in
                                                            </span>
                                                            <span className="text-sm font-black">{feature.fertigo}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Competitor cell */}
                                            <td className="px-3 py-3 text-center">
                                                <div className={`
                                                    inline-flex min-w-[110px] items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold
                                                    ${
                                                        feature.competitor === true
                                                            ? 'bg-slate-100 text-slate-600'
                                                            : feature.competitor === 'partial'
                                                            ? 'bg-yellow-50 text-yellow-800 ring-1 ring-yellow-200'
                                                            : 'bg-red-50 text-red-700 ring-1 ring-red-200'
                                                    }
                                                `}>
                                                    {feature.competitor === true ? (
                                                        <>
                                                            <CheckCircleIcon className="h-4 w-4 text-slate-400" />
                                                            <span>Ja, aber anders</span>
                                                        </>
                                                    ) : feature.competitor === 'partial' ? (
                                                        <>
                                                            <span className="text-lg leading-none">⚠️</span>
                                                            <span>Nur teilweise</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {typeof feature.competitor === 'string' ? (
                                                                <>
                                                                    <XMarkIcon className="h-4 w-4 text-red-500" />
                                                                    <span>{feature.competitor}</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XMarkIcon className="h-4 w-4 text-red-500" />
                                                                    <span>Nein</span>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                {/* Stats Row (unterhalb der Tabelle) */}
                <div className={`hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 transition-all duration-1000 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center px-4 py-4 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="text-2xl mb-1.5">{stat.icon}</div>
                            <div className="text-xl lg:text-2xl font-black text-slate-900 mb-0.5">{stat.value}</div>
                            <div className="text-xs text-slate-600 font-medium leading-snug">{stat.label}</div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyChooseFertigo;
