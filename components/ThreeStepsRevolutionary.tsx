import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ThreeStepsRevolutionary: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    // Auto-rotate steps
    useEffect(() => {
        if (!inView) return;
        
        const interval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % 3);
        }, 4000);
        
        return () => clearInterval(interval);
    }, [inView]);

    const steps = [
        {
            id: 0,
            number: "01",
            title: "Projekt beschreiben",
            subtitle: "In 60 Sekunden zum ersten Angebot",
            description: "Beschreiben Sie Ihr Vorhaben in wenigen Sätzen. Keine Registrierung, kein Stress – einfach und unverbindlich.",
            features: [
                "✨ KI-unterstützte Projektanalyse",
                "⏱️ Nur 60 Sekunden Zeit",
                "🔒 100% kostenlos & unverbindlich",
                "🌍 Sofortige regionale Zuordnung"
            ],
            color: {
                primary: "from-blue-500 to-cyan-500",
                secondary: "from-blue-400 to-cyan-400",
                accent: "bg-blue-500",
                light: "bg-blue-50"
            },
            icon: (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <linearGradient id="penGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                    {/* Creative Notebook */}
                    <rect x="15" y="20" width="70" height="60" rx="8" fill="url(#penGradient)" opacity="0.1" stroke="url(#penGradient)" strokeWidth="2"/>
                    <path d="M25 25 L75 25" stroke="url(#penGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                    <path d="M25 35 L65 35" stroke="url(#penGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                    <path d="M25 45 L70 45" stroke="url(#penGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                    <path d="M25 55 L55 55" stroke="url(#penGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                    
                    {/* Floating Pen */}
                    <g transform="translate(65, 65) rotate(-20)">
                        <rect x="-8" y="-2" width="16" height="4" rx="2" fill="url(#penGradient)"/>
                        <polygon points="-6,-2 -4,-8 4,-8 6,-2" fill="url(#penGradient)"/>
                        <circle cx="0" cy="-10" r="2" fill="#fbbf24"/>
                    </g>
                    
                    {/* Sparkles */}
                    <circle cx="20" cy="25" r="1.5" fill="#fbbf24" className="animate-pulse"/>
                    <circle cx="80" cy="30" r="1" fill="#fbbf24" className="animate-pulse" style={{animationDelay: '1s'}}/>
                    <circle cx="30" cy="70" r="1.2" fill="#fbbf24" className="animate-pulse" style={{animationDelay: '2s'}}/>
                </svg>
            )
        },
        {
            id: 1,
            number: "02",
            title: "KI-Matching aktiv",
            subtitle: "Intelligente Partnervermittlung in Echtzeit",
            description: "Unsere KI analysiert Ihr Projekt und findet die perfekten Fachkräfte aus Ihrer Region – innerhalb von Sekunden.",
            features: [
                "🤖 KI-gestützte Profilvergleiche",
                "⚡ Echtzeit-Matching",
                "📍 Exakte Regionszuordnung",
                "🏆 Qualitätsbewertung inklusive"
            ],
            color: {
                primary: "from-emerald-500 to-teal-500",
                secondary: "from-emerald-400 to-teal-400",
                accent: "bg-emerald-500",
                light: "bg-emerald-50"
            },
            icon: (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#14b8a6" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Brain/Network */}
                    <g filter="url(#glow)">
                        <circle cx="50" cy="30" r="8" fill="url(#brainGradient)" opacity="0.8"/>
                        <circle cx="35" cy="45" r="6" fill="url(#brainGradient)" opacity="0.8"/>
                        <circle cx="65" cy="45" r="6" fill="url(#brainGradient)" opacity="0.8"/>
                        <circle cx="50" cy="60" r="7" fill="url(#brainGradient)" opacity="0.8"/>
                        <circle cx="25" cy="60" r="5" fill="url(#brainGradient)" opacity="0.8"/>
                        <circle cx="75" cy="60" r="5" fill="url(#brainGradient)" opacity="0.8"/>
                    </g>
                    
                    {/* Connecting Lines */}
                    <line x1="50" y1="38" x2="38" y2="42" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.6"/>
                    <line x1="50" y1="38" x2="62" y2="42" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.6"/>
                    <line x1="50" y1="38" x2="50" y2="52" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.6"/>
                    <line x1="35" y1="51" x2="28" y2="57" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.6"/>
                    <line x1="65" y1="51" x2="72" y2="57" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.6"/>
                    
                    {/* Animated Pulses */}
                    <circle cx="50" cy="30" r="12" fill="none" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.3">
                        <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
                    </circle>
                </svg>
            )
        },
        {
            id: 2,
            number: "03",
            title: "Perfekte Wahl treffen",
            subtitle: "Transparenter Vergleich, fundierte Entscheidung",
            description: "Vergleichen Sie Angebote, Bewertungen und Preise auf einen Blick. Treffen Sie Ihre Entscheidung mit voller Sicherheit.",
            features: [
                "📊 Visueller Angebotsvergleich",
                "⭐ Echte Kundenbewertungen",
                "💰 Transparente Preisangaben",
                "🛡️ Qualitätsgarantie"
            ],
            color: {
                primary: "from-purple-500 to-pink-500",
                secondary: "from-purple-400 to-pink-400",
                accent: "bg-purple-500",
                light: "bg-purple-50"
            },
            icon: (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <linearGradient id="compareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                    
                    {/* Comparison Cards */}
                    <g transform="translate(0, 10)">
                        {/* Card 1 */}
                        <rect x="10" y="15" width="30" height="40" rx="4" fill="white" stroke="url(#compareGradient)" strokeWidth="2"/>
                        <rect x="15" y="20" width="20" height="3" rx="1.5" fill="url(#compareGradient)" opacity="0.7"/>
                        <rect x="15" y="28" width="15" height="2" rx="1" fill="#94a3b8"/>
                        <rect x="15" y="35" width="18" height="2" rx="1" fill="#94a3b8"/>
                        <circle cx="25" cy="50" r="8" fill="#fbbf24"/>
                        <text x="25" y="54" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">★</text>
                        
                        {/* Card 2 - Highlighted */}
                        <rect x="45" y="5" width="35" height="50" rx="5" fill="url(#compareGradient)" stroke="url(#compareGradient)" strokeWidth="3"/>
                        <rect x="50" y="12" width="25" height="4" rx="2" fill="white" opacity="0.9"/>
                        <rect x="50" y="22" width="20" height="3" rx="1.5" fill="white" opacity="0.7"/>
                        <rect x="50" y="32" width="22" height="3" rx="1.5" fill="white" opacity="0.7"/>
                        <circle cx="67" cy="45" r="10" fill="white"/>
                        <text x="67" y="50" textAnchor="middle" fontSize="12" fill="url(#compareGradient)" fontWeight="bold">✓</text>
                        
                        {/* Card 3 */}
                        <rect x="15" y="65" width="25" height="35" rx="3" fill="white" stroke="#cbd5e1" strokeWidth="1"/>
                        <rect x="20" y="70" width="15" height="3" rx="1.5" fill="#cbd5e1"/>
                        <rect x="20" y="78" width="12" height="2" rx="1" fill="#e2e8f0"/>
                    </g>
                    
                    {/* Arrows */}
                    <path d="M42 30 L48 30" stroke="url(#compareGradient)" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <path d="M42 40 L48 40" stroke="url(#compareGradient)" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="url(#compareGradient)" />
                        </marker>
                    </defs>
                </svg>
            )
        }
    ];

    return (
        <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-20"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-bounce opacity-20" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-20" style={{animationDelay: '2s'}}></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 mb-8 shadow-lg">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 animate-pulse"></div>
                        <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Revolutionäres System</span>
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 via-emerald-500 to-blue-500 animate-pulse"></div>
                    </div>
                    
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-8 leading-[1.1]">
                        <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                            Drei Schritte.
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
                            Eine Revolution.
                        </span>
                    </h2>
                    
                    <p className="text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                        Die intelligenteste Art, den perfekten Partner für Ihr Projekt zu finden
                    </p>
                </div>

                {/* Interactive Steps Container */}
                <div className="relative">
                    {/* Progress Track */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 rounded-full -translate-y-1/2 hidden lg:block">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${(activeStep + 1) * 33.33}%` }}
                        ></div>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
                        {steps.map((step, index) => {
                            const isActive = activeStep === index;
                            const isHovered = hoveredStep === index;
                            const isVisible = inView;
                            
                            return (
                                <div
                                    key={step.id}
                                    className={`relative group cursor-pointer transition-all duration-700 ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                    onMouseEnter={() => setHoveredStep(index)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                    onClick={() => setActiveStep(index)}
                                >
                                    {/* Step Card */}
                                    <div className={`relative h-full rounded-3xl p-8 transition-all duration-500 ${
                                        isActive || isHovered 
                                            ? 'bg-white shadow-2xl scale-105 -translate-y-2 border-2 border-opacity-30' 
                                            : 'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1'
                                    } ${
                                        step.color.light
                                    } border ${isActive ?                         step.color.accent?.replace('bg-', 'border-') || 'border-slate-200' : 'border-slate-200'}`}>
                                        
                                        {/* Step Number */}
                                        <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl transition-all duration-500 ${
                                            isActive || isHovered 
                                                ? `bg-gradient-to-br ${step.color.primary} scale-110 rotate-6` 
                                                : `bg-gradient-to-br ${step.color.primary} group-hover:scale-105 group-hover:rotate-3`
                                        }`}>
                                            {step.number}
                                        </div>

                                        {/* Icon */}
                                        <div className={`w-24 h-24 mx-auto mb-8 transition-all duration-500 ${
                                            isActive || isHovered 
                                                ? 'scale-110 -rotate-3' 
                                                : 'group-hover:scale-105 group-hover:-rotate-1'
                                        }`}>
                                            {step.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="text-center">
                                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 transition-all duration-300 ${
                                                isActive 
                                                    ? `bg-gradient-to-r ${step.color.primary} text-white` 
                                                    : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                                            }`}>
                                                {step.subtitle}
                                            </span>
                                            
                                            <h3 className={`text-2xl lg:text-3xl font-black mb-4 transition-colors duration-300 ${
                                                isActive ? `text-transparent bg-clip-text bg-gradient-to-r ${step.color.primary}` : 'text-slate-900 group-hover:text-slate-700'
                                            }`}>
                                                {step.title}
                                            </h3>
                                            
                                            <p className="text-slate-600 mb-6 leading-relaxed">
                                                {step.description}
                                            </p>

                                            {/* Features */}
                                            <div className="space-y-3">
                                                {step.features.map((feature, featIndex) => (
                                                    <div 
                                                        key={featIndex}
                                                        className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                                                            isActive || isHovered 
                                                                ? 'translate-x-0 opacity-100' 
                                                                : 'translate-x-2 opacity-0'
                                                        }`}
                                                        style={{ transitionDelay: `${featIndex * 100}ms` }}
                                                    >
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            isActive ? step.color.accent : 'bg-slate-300'
                                                        }`}></div>
                                                        <span className={isActive ? 'font-medium' : ''}>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        {(isActive || isHovered) && (
                                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color.primary} opacity-5 blur-xl -z-10`}></div>
                                        )}
                                    </div>

                                    {/* Connector Line (Desktop) */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
                                                isActive 
                                                    ? `bg-gradient-to-br ${steps[index].color.primary} scale-110` 
                                                    : 'bg-white border-2 border-slate-200'
                                            }`}>
                                                <svg className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-white rotate-90' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Navigation Dots */}
                    <div className="flex justify-center mt-12 lg:hidden space-x-3">
                        {steps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveStep(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    activeStep === index 
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8' 
                                        : 'bg-slate-300 hover:bg-slate-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className={`text-center mt-20 transition-all duration-1000 delay-500 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-2xl">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 border-2 border-white flex items-center justify-center">
                                    <span className="text-xs font-black text-slate-800">★</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-left text-white">
                            <div className="font-black text-lg">50.000+ zufriedene Kunden</div>
                            <div className="text-slate-300 text-sm">Vertrauen in unseren Prozess</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThreeStepsRevolutionary;