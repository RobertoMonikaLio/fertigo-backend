import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon } from './icons';

const RadialJourney: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const [activeStep, setActiveStep] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    // Auto-rotate effect (pauses on hover)
    useEffect(() => {
        if (!inView || isHovering) return;
        const interval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, [inView, isHovering]);

    const handleStepClick = useCallback((index: number) => {
        setActiveStep(index);
    }, []);

    const steps = [
        {
            id: 0,
            number: "01",
            icon: "📝",
            title: "Projekt beschreiben",
            time: "60 Sekunden",
            description: "Erzählen Sie uns in wenigen Klicks von Ihrem Vorhaben. Unser intelligentes System führt Sie intuitiv durch den Prozess.",
            highlights: ["Intuitive Eingabe", "KI-Unterstützung", "100% kostenlos"],
            color: "emerald"
        },
        {
            id: 1,
            number: "02",
            icon: "🔍",
            title: "Experten finden",
            time: "30 Sekunden",
            description: "Unsere KI durchsucht über 2'500 geprüfte Schweizer Fachbetriebe und findet die perfekten Partner für Ihr Projekt.",
            highlights: ["Smart-Matching", "Regionale Experten", "Geprüfte Qualität"],
            color: "teal"
        },
        {
            id: 2,
            number: "03",
            icon: "✅",
            title: "Angebot wählen",
            time: "2 Minuten",
            description: "Vergleichen Sie transparente Offerten, prüfen Sie Bewertungen und entscheiden Sie sich für den besten Anbieter.",
            highlights: ["Preisvergleich", "Echte Bewertungen", "Qualitätsgarantie"],
            color: "emerald"
        }
    ];

    return (
        <section
            ref={ref}
            className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-white"
        >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
                {/* Section Header */}
                <div className={`text-center mb-12 lg:mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 mb-4">
                        In 3 Schritten zum{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                            perfekten Handwerker
                        </span>
                    </h2>

                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Sparen Sie Zeit und Geld mit unserem einfachen Prozess
                    </p>
                </div>

                {/* Desktop Layout */}
                <div
                    className="hidden lg:block"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Progress Bar */}
                    <div className="relative mb-16">
                        {/* Background Line */}
                        <div className="absolute top-10 left-0 right-0 h-1 bg-slate-200 rounded-full" />

                        {/* Active Progress */}
                        <div
                            className="absolute top-10 left-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${((activeStep + 1) / 3) * 100}%` }}
                        />

                        {/* Step Indicators */}
                        <div className="relative flex justify-between">
                            {steps.map((step, index) => {
                                const isActive = activeStep === index;
                                const isPast = index < activeStep;

                                return (
                                    <button
                                        key={step.id}
                                        onClick={() => handleStepClick(index)}
                                        className="relative flex flex-col items-center group"
                                    >
                                        {/* Step Circle */}
                                        <div
                                            className={`
                                                relative w-20 h-20 rounded-full flex items-center justify-center
                                                transition-all duration-500 cursor-pointer
                                                ${isActive
                                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 scale-110'
                                                    : isPast
                                                        ? 'bg-emerald-500 shadow-md'
                                                        : 'bg-white border-2 border-slate-200 group-hover:border-emerald-300 group-hover:shadow-md'
                                                }
                                            `}
                                        >
                                            {/* Pulse Animation for Active */}
                                            {isActive && (
                                                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
                                            )}

                                            <span className={`relative z-10 text-3xl ${isActive || isPast ? '' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'} transition-all duration-300`}>
                                                {step.icon}
                                            </span>
                                        </div>

                                        {/* Step Number Badge */}
                                        <div className={`
                                            absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center
                                            text-xs font-black transition-all duration-300
                                            ${isActive || isPast
                                                ? 'bg-emerald-600 text-white shadow-md'
                                                : 'bg-slate-100 text-slate-400 border border-slate-200'
                                            }
                                        `}>
                                            {step.number}
                                        </div>

                                        {/* Step Title */}
                                        <div className="mt-4 text-center">
                                            <h4 className={`font-bold transition-colors duration-300 ${isActive ? 'text-emerald-700' : 'text-slate-700'}`}>
                                                {step.title}
                                            </h4>
                                            <span className={`text-sm transition-colors duration-300 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                {step.time}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Detail Cards */}
                    <div className="grid grid-cols-3 gap-6">
                        {steps.map((step, index) => {
                            const isActive = activeStep === index;

                            return (
                                <div
                                    key={step.id}
                                    onClick={() => handleStepClick(index)}
                                    className={`
                                        relative bg-white rounded-3xl p-6 cursor-pointer
                                        transition-all duration-500 ease-out
                                        ${isActive
                                            ? 'shadow-2xl shadow-emerald-500/10 border-2 border-emerald-200 scale-[1.02]'
                                            : 'shadow-lg border border-slate-100 hover:shadow-xl hover:border-emerald-100'
                                        }
                                    `}
                                >
                                    {/* Active Indicator */}
                                    {isActive && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                                            Aktueller Schritt
                                        </div>
                                    )}

                                    {/* Card Header */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`
                                            w-14 h-14 rounded-2xl flex items-center justify-center
                                            transition-all duration-300
                                            ${isActive
                                                ? 'bg-gradient-to-br from-emerald-100 to-teal-100'
                                                : 'bg-slate-50'
                                            }
                                        `}>
                                            <span className="text-2xl">{step.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-lg transition-colors duration-300 ${isActive ? 'text-emerald-700' : 'text-slate-800'}`}>
                                                {step.title}
                                            </h4>
                                            <div className={`
                                                inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full
                                                ${isActive
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-slate-100 text-slate-500'
                                                }
                                            `}>
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {step.time}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className={`text-sm leading-relaxed mb-5 transition-colors duration-300 ${isActive ? 'text-slate-600' : 'text-slate-500'}`}>
                                        {step.description}
                                    </p>

                                    {/* Highlights */}
                                    <div className="flex flex-wrap gap-2">
                                        {step.highlights.map((highlight, i) => (
                                            <span
                                                key={i}
                                                className={`
                                                    inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
                                                    transition-all duration-300
                                                    ${isActive
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-slate-50 text-slate-500 border border-slate-100'
                                                    }
                                                `}
                                            >
                                                <svg className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-500' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                </svg>
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div
                    className="lg:hidden space-y-4"
                    onTouchStart={() => setIsHovering(true)}
                    onTouchEnd={() => setTimeout(() => setIsHovering(false), 3000)}
                >
                    {steps.map((step, index) => {
                        const isActive = activeStep === index;

                        return (
                            <button
                                key={step.id}
                                onClick={() => handleStepClick(index)}
                                className={`
                                    w-full text-left bg-white rounded-2xl p-5 
                                    transition-all duration-500
                                    ${isActive
                                        ? 'shadow-xl shadow-emerald-500/10 border-2 border-emerald-200'
                                        : 'shadow-md border border-slate-100'
                                    }
                                `}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon Container */}
                                    <div className={`
                                        relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center
                                        transition-all duration-300
                                        ${isActive
                                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md'
                                            : 'bg-slate-100'
                                        }
                                    `}>
                                        <span className={`text-2xl ${isActive ? '' : 'grayscale opacity-70'} transition-all`}>
                                            {step.icon}
                                        </span>

                                        {/* Number Badge */}
                                        <div className={`
                                            absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center
                                            text-[10px] font-black
                                            ${isActive
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-slate-200 text-slate-500'
                                            }
                                        `}>
                                            {step.number}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className={`font-bold text-base ${isActive ? 'text-emerald-700' : 'text-slate-800'}`}>
                                                {step.title}
                                            </h4>
                                            <span className={`
                                                text-xs font-medium px-2 py-0.5 rounded-full
                                                ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}
                                            `}>
                                                {step.time}
                                            </span>
                                        </div>

                                        <p className={`text-sm mb-3 transition-all duration-300 ${isActive ? 'text-slate-600' : 'text-slate-400'}`}>
                                            {step.description}
                                        </p>

                                        {/* Highlights - Only show when active */}
                                        <div className={`flex flex-wrap gap-1.5 transition-all duration-300 ${isActive ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                                            {step.highlights.map((highlight, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                >
                                                    <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-emerald-100' : 'bg-slate-50'}`}>
                                        <ArrowRightIcon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-emerald-600' : 'text-slate-300'}`} />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className={`mt-12 lg:mt-16 text-center transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <button
                        onClick={() => openQuoteModal()}
                        className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
                    >
                        <span>Jetzt kostenlos starten</span>
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-4 text-sm text-slate-500">
                        ✓ 100% kostenlos · ✓ Unverbindlich · ✓ In unter 3 Minuten
                    </p>
                </div>

            </div>
        </section>
    );
};

export default RadialJourney;