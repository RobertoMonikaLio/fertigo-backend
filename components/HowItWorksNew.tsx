import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';

const HowItWorksNew: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            id: 1,
            title: 'Anfrage stellen',
            subtitle: 'In nur 2 Minuten',
            description: 'Beschreiben Sie Ihr Projekt mit wenigen Klicks. Kein Login erforderlich.',
            icon: '📝',
            visual: (
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Form Mockup */}
                    <div className="w-64 bg-white rounded-2xl shadow-2xl p-6 transform rotate-[-2deg]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-xl">🏠</span>
                            </div>
                            <div>
                                <div className="h-3 w-24 bg-slate-200 rounded"></div>
                                <div className="h-2 w-16 bg-slate-100 rounded mt-1"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-10 bg-slate-100 rounded-lg border-2 border-primary-300"></div>
                            <div className="h-10 bg-slate-100 rounded-lg"></div>
                            <div className="h-20 bg-slate-100 rounded-lg"></div>
                            <div className="h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-bold">Absenden →</span>
                            </div>
                        </div>
                    </div>
                    {/* Floating elements */}
                    <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                        ✓ Kostenlos
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            title: 'Offerten erhalten',
            subtitle: 'Innerhalb von 24h',
            description: 'Geprüfte Handwerker senden Ihnen konkrete Angebote. Ohne Anrufe.',
            icon: '📬',
            visual: (
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Notifications Stack */}
                    <div className="space-y-3">
                        {[
                            { name: 'Malermeister Müller', price: 'CHF 2\'400', rating: '4.9', delay: '0s' },
                            { name: 'Farben Schmidt AG', price: 'CHF 2\'150', rating: '4.8', delay: '0.1s' },
                            { name: 'Pro Paint GmbH', price: 'CHF 2\'680', rating: '4.7', delay: '0.2s' },
                        ].map((offer, i) => (
                            <div 
                                key={i}
                                className="w-72 bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform"
                                style={{ 
                                    transform: `translateX(${i * 8}px) rotate(${i * -1}deg)`,
                                    animationDelay: offer.delay 
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                                            {offer.name[0]}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">{offer.name}</div>
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <span className="text-yellow-500">★</span> {offer.rating}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-primary-600">{offer.price}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Badge */}
                    <div className="absolute top-2 left-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        3 neue Offerten
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            title: 'Vergleichen',
            subtitle: 'Transparent & fair',
            description: 'Vergleichen Sie Preise, Bewertungen und wählen Sie den besten Anbieter.',
            icon: '⚖️',
            visual: (
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Comparison Cards */}
                    <div className="flex gap-4">
                        <div className="w-36 bg-white rounded-xl shadow-lg p-4 border-2 border-slate-200">
                            <div className="text-center mb-3">
                                <div className="w-12 h-12 rounded-full bg-slate-200 mx-auto mb-2"></div>
                                <div className="text-sm font-bold text-slate-700">Anbieter A</div>
                            </div>
                            <div className="text-center text-2xl font-black text-slate-900 mb-2">CHF 2'400</div>
                            <div className="flex justify-center gap-0.5 mb-2">
                                {[1,2,3,4].map(i => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                                <span className="text-slate-300 text-sm">★</span>
                            </div>
                        </div>
                        <div className="w-40 bg-white rounded-xl shadow-2xl p-4 border-2 border-primary-500 transform scale-110 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                BESTE WAHL
                            </div>
                            <div className="text-center mb-3">
                                <div className="w-12 h-12 rounded-full bg-primary-100 mx-auto mb-2 flex items-center justify-center">
                                    <span className="text-xl">👷</span>
                                </div>
                                <div className="text-sm font-bold text-slate-700">Anbieter B</div>
                            </div>
                            <div className="text-center text-2xl font-black text-primary-600 mb-2">CHF 2'150</div>
                            <div className="flex justify-center gap-0.5 mb-2">
                                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                            </div>
                        </div>
                        <div className="w-36 bg-white rounded-xl shadow-lg p-4 border-2 border-slate-200">
                            <div className="text-center mb-3">
                                <div className="w-12 h-12 rounded-full bg-slate-200 mx-auto mb-2"></div>
                                <div className="text-sm font-bold text-slate-700">Anbieter C</div>
                            </div>
                            <div className="text-center text-2xl font-black text-slate-900 mb-2">CHF 2'680</div>
                            <div className="flex justify-center gap-0.5 mb-2">
                                {[1,2,3,4].map(i => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                                <span className="text-slate-300 text-sm">★</span>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 4,
            title: 'Beauftragen',
            subtitle: 'Mit einem Klick',
            description: 'Wählen Sie Ihren Favoriten und starten Sie das Projekt. Fertig!',
            icon: '🚀',
            visual: (
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Success State */}
                    <div className="text-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mx-auto mb-6 flex items-center justify-center shadow-xl shadow-green-500/30 animate-pulse">
                            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-xs mx-auto">
                            <div className="text-xl font-bold text-slate-900 mb-2">Auftrag bestätigt!</div>
                            <div className="text-slate-500 text-sm mb-4">Ihr Handwerker wurde benachrichtigt</div>
                            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                                <span>🎉</span>
                                <span>Projekt startet bald</span>
                            </div>
                        </div>
                    </div>
                    {/* Confetti-like elements */}
                    <div className="absolute top-8 left-8 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🎊</div>
                    <div className="absolute top-12 right-12 text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
                    <div className="absolute bottom-16 left-16 text-xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎉</div>
                </div>
            ),
        },
    ];

    return (
        <section ref={ref} className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                
                {/* Header */}
                <div className={`text-center mb-10 sm:mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3">
                        So funktioniert's
                    </h2>
                    <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
                        Von der Anfrage bis zum fertigen Projekt – in 4 einfachen Schritten
                    </p>
                </div>

                {/* Main Content */}
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-10 items-center transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    
                    {/* Left: Step Navigation */}
                    <div className="order-2 lg:order-1">
                        <div className="space-y-3">
                            {steps.map((step, index) => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(index)}
                                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 ${
                                        activeStep === index 
                                            ? 'bg-white shadow-xl border-2 border-primary-500' 
                                            : 'bg-white/50 border-2 border-transparent hover:bg-white hover:shadow-md'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Step Number */}
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-base sm:text-lg transition-colors ${
                                            activeStep === index 
                                                ? 'bg-primary-500 text-white' 
                                                : 'bg-slate-100 text-slate-400'
                                        }`}>
                                            {step.id}
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xl sm:text-2xl">{step.icon}</span>
                                                <h3 className={`text-base sm:text-lg font-bold ${activeStep === index ? 'text-slate-900' : 'text-slate-600'}`}>
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <div className={`text-xs sm:text-sm font-medium mb-1 ${activeStep === index ? 'text-primary-600' : 'text-slate-400'}`}>
                                                {step.subtitle}
                                            </div>
                                            <p className={`text-xs sm:text-sm leading-relaxed ${activeStep === index ? 'text-slate-600' : 'text-slate-400'}`}>
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                            activeStep === index 
                                                ? 'bg-primary-100 text-primary-600' 
                                                : 'bg-slate-100 text-slate-300'
                                        }`}>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-6 sm:mt-8">
                            <button 
                                onClick={() => openQuoteModal()}
                                className="w-full bg-slate-900 hover:bg-primary-600 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl inline-flex items-center justify-center gap-2 group"
                            >
                                Jetzt ausprobieren
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                            <p className="text-center text-sm text-slate-500 mt-3">
                                Kostenlos & unverbindlich starten
                            </p>
                        </div>
                    </div>

                    {/* Right: Visual Preview */}
                    <div className="order-1 lg:order-2">
                        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl p-8 min-h-[400px] sm:min-h-[500px]">
                            {/* Phone Frame */}
                            <div className="absolute inset-4 sm:inset-8 bg-white rounded-[2rem] shadow-2xl overflow-hidden">
                                {/* Status Bar */}
                                <div className="h-8 bg-slate-100 flex items-center justify-between px-6">
                                    <div className="text-xs text-slate-500">9:41</div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-4 h-2 bg-slate-400 rounded-sm"></div>
                                    </div>
                                </div>
                                
                                {/* Content */}
                                <div className="p-4 h-[calc(100%-2rem)] overflow-hidden">
                                    {steps.map((step, index) => (
                                        <div
                                            key={step.id}
                                            className={`absolute inset-0 pt-12 px-4 transition-all duration-500 ${
                                                activeStep === index 
                                                    ? 'opacity-100 translate-x-0' 
                                                    : 'opacity-0 translate-x-8 pointer-events-none'
                                            }`}
                                        >
                                            {step.visual}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full blur-2xl opacity-50"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-50"></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorksNew;
