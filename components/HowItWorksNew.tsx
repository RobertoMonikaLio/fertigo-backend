import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon } from './icons';

const HowItWorksNew: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const steps = [
        {
            number: '1',
            title: 'Projekt beschreiben',
            description: 'Beschreiben Sie Ihr Vorhaben in wenigen Sätzen. Keine Registrierung nötig – einfach und schnell.',
            benefits: [
                'Kostenlose Anfrage',
                'Keine Registrierung',
                'In 2 Minuten erledigt'
            ],
            primaryColor: 'blue',
            secondaryColor: 'cyan',
            icon: '✍️',
            time: '2 Min',
            position: 'left'
        },
        {
            number: '2',
            title: 'Offerten erhalten',
            description: 'Erhalten Sie bis zu 5 passende Angebote von geprüften Fachbetrieben aus Ihrer Region – innerhalb von 24 Stunden.',
            benefits: [
                'Bis zu 5 Offerten',
                'Innerhalb 24 Stunden',
                'Von geprüften Profis'
            ],
            primaryColor: 'emerald',
            secondaryColor: 'teal',
            icon: '📧',
            time: '24h',
            position: 'right'
        },
        {
            number: '3',
            title: 'Profi wählen',
            description: 'Vergleichen Sie die Angebote, treffen Sie Ihre Entscheidung und starten Sie Ihr Projekt mit dem passenden Partner.',
            benefits: [
                'Vergleichen & entscheiden',
                'Direkter Kontakt',
                'Sofort starten'
            ],
            primaryColor: 'purple',
            secondaryColor: 'pink',
            icon: '✅',
            time: 'Sofort',
            position: 'left'
        },
    ];

    const getColorClasses = (primary: string, secondary: string, type: 'bg' | 'text' | 'border' | 'gradient') => {
        const colors: Record<string, Record<string, string>> = {
            blue: {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                border: 'border-blue-500',
                gradient: 'from-blue-500 to-cyan-500'
            },
            emerald: {
                bg: 'bg-emerald-50',
                text: 'text-emerald-700',
                border: 'border-emerald-500',
                gradient: 'from-emerald-500 to-teal-500'
            },
            purple: {
                bg: 'bg-purple-50',
                text: 'text-purple-700',
                border: 'border-purple-500',
                gradient: 'from-purple-500 to-pink-500'
            }
        };
        return colors[primary]?.[type] || '';
    };

    return (
        <section ref={ref} className="relative py-14 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 right-20 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
                {/* Header */}
                <div className={`text-center mb-12 sm:mb-20 lg:mb-28 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 mb-4 sm:mb-6 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Einfacher Prozess</span>
                    </div>
                    <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-3 sm:mb-6 leading-[1.1]">
                        In drei Schritte zum
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
                            perfekten Angebot
                        </span>
                    </h2>
                    <p className="text-base sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto font-medium px-2">
                        So einfach finden Sie den idealen Handwerker für Ihr Projekt
                    </p>
                </div>

                {/* Steps - Asymmetric Layout */}
                <div className="space-y-12 sm:space-y-24 lg:space-y-32">
                    {steps.map((step, index) => {
                        const isHovered = hoveredIndex === index;
                        const isLeft = step.position === 'left';
                        const isLast = index === steps.length - 1;
                        
                        return (
                            <div
                                key={index}
                                className={`relative transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className={`flex flex-col lg:flex-row items-center gap-5 sm:gap-8 lg:gap-16 ${
                                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                }`}>
                                    {/* Visual Side */}
                                    <div className={`flex-1 w-full lg:w-1/2 ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}>
                                        <div className="relative">
                                            {/* Large Background Circle */}
                                            <div 
                                                className={`absolute -inset-4 sm:-inset-8 rounded-full opacity-20 transition-all duration-500 ${
                                                    isHovered ? 'scale-110' : 'scale-100'
                                                }`}
                                                style={{
                                                    background: step.primaryColor === 'blue' 
                                                        ? 'linear-gradient(135deg, #3B82F6, #06B6D4)'
                                                        : step.primaryColor === 'emerald'
                                                        ? 'linear-gradient(135deg, #10B981, #14B8A6)'
                                                        : 'linear-gradient(135deg, #8B5CF6, #EC4899)'
                                                }}
                                            ></div>
                                            
                                            {/* Main Visual Container */}
                                            <div className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 bg-white border-2 transition-all duration-500 ${
                                                isHovered 
                                                    ? (step.primaryColor === 'blue' ? 'border-blue-500' :
                                                       step.primaryColor === 'emerald' ? 'border-emerald-500' :
                                                       'border-purple-500') + ' shadow-2xl scale-[1.02]'
                                                    : 'border-slate-200 shadow-xl'
                                            }`}>
                                                {/* Step Number - Large */}
                                                <div className={`absolute -top-4 sm:-top-6 ${isLeft ? '-left-3 sm:-left-6' : '-right-3 sm:-right-6'} w-14 h-14 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br ${getColorClasses(step.primaryColor, step.secondaryColor, 'gradient')} flex items-center justify-center transform transition-all duration-500 ${
                                                    isHovered ? 'scale-110 rotate-12' : 'rotate-6'
                                                }`}>
                                                    <span className="text-white text-2xl sm:text-4xl font-black">{step.number}</span>
                                                </div>

                                                {/* Icon Display */}
                                                <div className="flex justify-center mb-4 sm:mb-8">
                                                    <div className={`w-20 h-20 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${getColorClasses(step.primaryColor, step.secondaryColor, 'gradient')} flex items-center justify-center text-4xl sm:text-6xl transform transition-all duration-500 ${
                                                        isHovered ? 'scale-110 -rotate-6' : ''
                                                    }`}>
                                                        {step.icon}
                                                    </div>
                                                </div>

                                                {/* Time Badge */}
                                                <div className="flex justify-center">
                                                    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-gradient-to-r ${getColorClasses(step.primaryColor, step.secondaryColor, 'gradient')} text-white shadow-lg`}>
                                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-xs sm:text-sm font-black">{step.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className={`flex-1 w-full lg:w-1/2 ${isLeft ? 'lg:pl-8' : 'lg:pr-8'}`}>
                                        <div className="space-y-3 sm:space-y-6">
                                            {/* Title */}
                                            <h3 className={`text-2xl sm:text-4xl lg:text-5xl font-black mb-2 sm:mb-4 transition-colors duration-300 ${
                                                isHovered ? getColorClasses(step.primaryColor, step.secondaryColor, 'text') : 'text-slate-900'
                                            }`}>
                                                {step.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm sm:text-lg lg:text-xl text-slate-600 leading-relaxed mb-4 sm:mb-8">
                                                {step.description}
                                            </p>

                                            {/* Benefits */}
                                            <div className="space-y-2.5 sm:space-y-4">
                                                {step.benefits.map((benefit, benefitIndex) => (
                                                    <div 
                                                        key={benefitIndex}
                                                        className="flex items-center gap-2.5 sm:gap-4 transform transition-all duration-300"
                                                        style={{
                                                            transform: isHovered ? `translateX(${benefitIndex * 4}px)` : 'translateX(0)',
                                                            transitionDelay: `${benefitIndex * 50}ms`
                                                        }}
                                                    >
                                                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${getColorClasses(step.primaryColor, step.secondaryColor, 'gradient')} flex items-center justify-center flex-shrink-0 transform transition-all duration-300 ${
                                                            isHovered ? 'scale-110 rotate-12' : ''
                                                        }`}>
                                                            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Connection Line - Between Steps */}
                                {!isLast && (
                                    <div className="hidden lg:flex justify-center my-12">
                                        <div className="relative">
                                            <div className={`w-1 h-20 bg-gradient-to-b ${getColorClasses(step.primaryColor, step.secondaryColor, 'gradient')} ${getColorClasses(steps[index + 1].primaryColor, steps[index + 1].secondaryColor, 'gradient')}`}></div>
                                            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 ${getColorClasses(step.secondaryColor, step.primaryColor, 'border')} flex items-center justify-center shadow-xl`}>
                                                <ArrowRightIcon className={`w-6 h-6 ${getColorClasses(step.secondaryColor, step.primaryColor, 'text')}`} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className={`text-center mt-14 sm:mt-24 lg:mt-32 transition-all duration-1000 delay-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <button 
                        onClick={() => openQuoteModal()}
                        className="group relative inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-black text-base sm:text-lg lg:text-xl px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-7 rounded-2xl shadow-2xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 overflow-hidden w-full sm:w-auto"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Jetzt kostenlos Offerten erhalten
                            <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12 mt-6 sm:mt-8 text-xs sm:text-sm font-bold text-slate-600">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Kostenlos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Unverbindlich</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>In 2 Minuten</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksNew;
