import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon, SwissFlagIcon } from './icons';

const RadialJourney: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    const steps = [
        {
            id: 0,
            number: "1",
            icon: "✍️",
            title: "Projekt beschreiben",
            time: "60 Sekunden",
            description: "Beschreiben Sie Ihr Vorhaben in wenigen Klicks. Unser System führt Sie intuitiv durch den Prozess.",
            features: ["Intuitive Eingabe", "KI-Unterstützung", "100% kostenlos"],
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-50 to-emerald-50",
            swissValue: "Schweizer Präzision"
        },
        {
            id: 1,
            number: "2",
            icon: "🔍",
            title: "Experten finden",
            time: "30 Sekunden",
            description: "Unsere KI durchsucht über 2'500 geprüfte Schweizer Fachbetriebe und findet die perfekten Partner für Ihr Projekt.",
            features: ["Smart-Matching", "Regionale Experten", "Geprüfte Qualität"],
            gradient: "from-emerald-500 to-teal-500",
            bgGradient: "from-emerald-50 to-teal-50",
            swissValue: "Lokale Expertise"
        },
        {
            id: 2,
            number: "3",
            icon: "✅",
            title: "Angebot wählen",
            time: "2 Minuten",
            description: "Vergleichen Sie transparente Offerten, prüfen Sie Bewertungen und entscheiden Sie sich für den besten Anbieter.",
            features: ["Preisvergleich", "Echte Bewertungen", "Qualitätsgarantie"],
            gradient: "from-teal-500 to-cyan-500",
            bgGradient: "from-teal-50 to-cyan-50",
            swissValue: "Schweizer Qualität"
        }
    ];

    return (
        <section
            ref={ref}
            className="relative py-12 sm:py-28 lg:py-36 overflow-hidden bg-white"
        >

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
                {/* Header */}
                <div className={`text-center mb-8 sm:mb-16 lg:mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 mb-3 sm:mb-4 leading-tight lg:whitespace-nowrap">
                        In 3 Schritten zum{' '}
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                            perfekten Handwerker
                            <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                                <path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradient)" strokeWidth="4" strokeLinecap="round"/>
                                <defs>
                                    <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#16a34a"/>
                                        <stop offset="50%" stopColor="#10b981"/>
                                        <stop offset="100%" stopColor="#14b8a6"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-600 mx-auto lg:whitespace-nowrap max-w-xs sm:max-w-none">
                        Schweizer Qualität, Präzision und Vertrauen – so einfach finden Sie den passenden Experten
                    </p>
                </div>

                {/* ===== MOBILE ONLY: Notion-Style Scroll Cards ===== */}
                <div className="sm:hidden -mx-4">
                    <div className="flex gap-4 pl-4 pr-8 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide">
                        {steps.map((step, index) => {
                            const emojis = ['📝', '🔎', '🏆'];
                            return (
                                <div
                                    key={step.id}
                                    className={`
                                        snap-center flex-shrink-0 w-[80vw]
                                        transition-all duration-700
                                        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                                    `}
                                    style={{ transitionDelay: `${index * 160}ms` }}
                                >
                                    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden">
                                        {/* Cover gradient area */}
                                        <div className={`
                                            h-24 relative
                                            ${index === 0 ? 'bg-gradient-to-r from-green-200 via-green-300 to-emerald-200' : index === 1 ? 'bg-gradient-to-r from-emerald-200 via-emerald-300 to-teal-200' : 'bg-gradient-to-r from-teal-200 via-teal-300 to-cyan-200'}
                                        `}>
                                            {/* Pattern overlay */}
                                            <div className="absolute inset-0 opacity-[0.15]" style={{
                                                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                                                backgroundSize: '16px 16px'
                                            }} />
                                        </div>

                                        {/* Floating emoji */}
                                        <div className="relative -mt-7 ml-5 mb-3">
                                            <div className="w-14 h-14 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-3xl">
                                                {emojis[index]}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="px-5 pb-5 flex flex-col flex-1">
                                            {/* Title row */}
                                            <h3 className="text-slate-900 font-extrabold text-[19px] leading-tight mb-1">{step.title}</h3>

                                            {/* Meta tags */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`
                                                    text-[10px] font-bold px-2 py-0.5 rounded
                                                    ${index === 0 ? 'bg-green-100 text-green-700' : index === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-teal-100 text-teal-700'}
                                                `}>
                                                    Schritt {step.number}
                                                </span>
                                                <span className="text-slate-300 text-[10px]">|</span>
                                                <span className="text-slate-400 text-[10px] font-medium">{step.time}</span>
                                            </div>

                                            {/* Description */}
                                            <p className="text-slate-500 text-[13px] leading-relaxed mb-4 flex-1">{step.description}</p>

                                            {/* Features as checklist */}
                                            <div className="space-y-2 border-t border-slate-100 pt-3">
                                                {step.features.map((f, i) => (
                                                    <div key={i} className="flex items-center gap-2.5">
                                                        <div className={`
                                                            w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0 border
                                                            ${index === 0 ? 'bg-green-500 border-green-500' : index === 1 ? 'bg-emerald-500 border-emerald-500' : 'bg-teal-500 border-teal-500'}
                                                        `}>
                                                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M1.5 5L4 7.5L8.5 2.5" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-slate-700 text-[12.5px] font-medium">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Page indicator */}
                    <div className="flex justify-center gap-2">
                        {steps.map((_, i) => (
                            <div key={i} className={`
                                h-1.5 rounded-full
                                ${i === 0 ? 'w-7 bg-green-500' : 'w-1.5 bg-slate-200'}
                            `} />
                        ))}
                    </div>
                </div>

                {/* ===== DESKTOP ONLY: Original Card Design ===== */}
                <div className="hidden sm:grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`
                                relative
                                transition-all duration-1000
                                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                            `}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Card */}
                            <div className="relative h-full bg-white rounded-3xl p-6 lg:p-8 border-2 border-green-200 shadow-xl hover:shadow-2xl hover:border-green-300 transition-all duration-300 group">
                                {/* Icon */}
                                <div className="text-center mb-6">
                                    <div className={`
                                        w-20 h-20 mx-auto rounded-2xl
                                        flex items-center justify-center text-4xl
                                        bg-gradient-to-br ${step.bgGradient}
                                        border-2 border-green-200
                                        transition-all duration-300
                                        group-hover:scale-105
                                    `}>
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    {/* Title */}
                                    <h3 className="text-xl lg:text-2xl font-black text-slate-900 text-center group-hover:text-green-700 transition-colors duration-300">
                                        {step.title}
                                    </h3>

                                    {/* Swiss Value Badge */}
                                    <div className="flex justify-center">
                                        <div className={`
                                            inline-flex items-center gap-2 px-4 py-2 rounded-full
                                            bg-gradient-to-r ${step.bgGradient}
                                            border border-green-200
                                            text-xs font-bold text-green-700
                                        `}>
                                            <SwissFlagIcon className="w-3.5 h-3.5" />
                                            {step.swissValue}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 leading-relaxed text-sm lg:text-base text-center">
                                        {step.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 pt-4 border-t border-green-100">
                                        {step.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <div className={`
                                                    flex-shrink-0 w-5 h-5 rounded-md
                                                    flex items-center justify-center
                                                    bg-gradient-to-br ${step.bgGradient}
                                                    border border-green-200
                                                `}>
                                                    <svg 
                                                        className="w-3 h-3 text-green-600"
                                                        fill="currentColor" 
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-slate-600">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Accent */}
                                <div className={`
                                    absolute bottom-0 left-0 right-0 h-1
                                    bg-gradient-to-r ${step.gradient}
                                    rounded-b-3xl
                                `}></div>
                            </div>

                            {/* Connecting Arrow (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-6 transform -translate-y-1/2 z-20">
                                    <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center text-green-600 shadow-lg">
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default RadialJourney;
