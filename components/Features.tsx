import React from 'react';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon, HowItWorksStep1Icon, HowItWorksStep2Icon, HowItWorksStep3Icon, HowItWorksStep1IconDesktop, HowItWorksStep2IconDesktop, HowItWorksStep3IconDesktop, ColoredPencilIcon } from './icons';
import { useInView } from 'react-intersection-observer';

const translations = {
    de: {
        title: "So funktioniert's",
        step1Label: "Schritt 1",
        step1Title: "Projekt beschreiben",
        step1Subtitle: "In 2–3 Minuten Anfrage erstellen",
        step2Label: "Schritt 2",
        step2Title: "Offerten erhalten",
        step2Subtitle: "Mehrere passende Betriebe melden sich",
        step3Label: "Schritt 3",
        step3Title: "Entscheiden & beauftragen",
        cta: "Jetzt Projekt starten"
    },
    fr: {
        title: "Comment trouver le bon artisan",
        step1Label: "Étape 1",
        step1Title: "Décrivez votre projet",
        step1Subtitle: "Créez une demande en 2-3 minutes",
        step2Label: "Étape 2",
        step2Title: "Recevez des devis",
        step2Subtitle: "Plusieurs entreprises qualifiées vous contactent",
        step3Label: "Étape 3",
        step3Title: "Décidez & mandatez",
        cta: "Démarrer le projet maintenant"
    },
};

// Handgezeichnete Desktop-Computer Illustration (Schritt 1)
const HandDrawnDesktopIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Monitor - handgezeichnet, leicht unregelmäßig */}
        <path 
            d="M 30 20 Q 25 15, 30 10 L 170 10 Q 175 15, 170 20 L 170 100 Q 175 105, 170 110 L 30 110 Q 25 105, 30 100 Z" 
            stroke="#616161" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        {/* Screen */}
        <rect x="40" y="30" width="120" height="70" rx="2" fill="#4CAF50" stroke="#616161" strokeWidth="2"/>
        {/* Fertigo Logo auf Screen */}
        <text x="100" y="65" textAnchor="middle" fill="white" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="bold">Fertigo.</text>
        <rect x="75" y="50" width="12" height="12" fill="white" rx="2"/>
        {/* Stand - leicht unregelmäßig */}
        <path 
            d="M 85 110 Q 90 120, 100 120 Q 110 120, 115 110" 
            stroke="#616161" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round"
        />
        <rect x="92" y="120" width="16" height="20" rx="2" stroke="#616161" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Keyboard - handgezeichnet */}
        <path 
            d="M 50 145 Q 45 150, 50 155 L 150 155 Q 155 150, 150 145 L 50 145" 
            stroke="#616161" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        <line x1="60" y1="150" x2="140" y2="150" stroke="#616161" strokeWidth="2" strokeLinecap="round"/>
        <line x1="60" y1="155" x2="140" y2="155" stroke="#616161" strokeWidth="2" strokeLinecap="round"/>
        {/* Mouse - leicht oval */}
        <ellipse cx="160" cy="150" rx="12" ry="18" stroke="#616161" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
);

const Features: React.FC = () => {
    const { language, openQuoteModal } = useAppContext();
    const t = (translations as any)[language] || translations.de;

    const steps = [
        {
            icon: (
                <>
                    {/* Neues Icon: Stift schreibt auf Dokument mit Glühbirne (Idee) */}
                    <div className="md:hidden">
                        <svg viewBox="0 0 100 100" className="w-40 h-40" xmlns="http://www.w3.org/2000/svg">
                            {/* Hintergrund-Kreis */}
                            <circle cx="50" cy="50" r="45" fill="#f0fdf4" />
                            
                            {/* Dokument */}
                            <rect x="25" y="20" width="45" height="60" rx="4" fill="#fff" stroke="#16a34a" strokeWidth="2" />
                            
                            {/* Dokument-Linien */}
                            <rect x="32" y="30" width="25" height="3" rx="1.5" fill="#bbf7d0" />
                            <rect x="32" y="38" width="30" height="3" rx="1.5" fill="#dcfce7" />
                            <rect x="32" y="46" width="20" height="3" rx="1.5" fill="#dcfce7" />
                            <rect x="32" y="54" width="28" height="3" rx="1.5" fill="#dcfce7" />
                            <rect x="32" y="62" width="15" height="3" rx="1.5" fill="#dcfce7" />
                            
                            {/* Stift */}
                            <g transform="translate(55, 35) rotate(35)">
                                <rect x="0" y="0" width="8" height="35" rx="1" fill="#fbbf24" />
                                <polygon points="0,35 4,45 8,35" fill="#1e293b" />
                                <rect x="0" y="0" width="8" height="6" rx="1" fill="#f59e0b" />
                                <rect x="1" y="30" width="6" height="5" fill="#fef3c7" />
                            </g>
                            
                            {/* Glühbirne (Idee) */}
                            <g transform="translate(70, 12)">
                                <circle cx="10" cy="10" r="10" fill="#fef08a" />
                                <path d="M 7 20 L 7 24 L 13 24 L 13 20" fill="#fbbf24" />
                                <circle cx="10" cy="10" r="6" fill="#fef9c3" />
                                <path d="M 10 6 L 10 14 M 6 10 L 14 10" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                            </g>
                            
                            {/* Kleine Sterne/Funken */}
                            <circle cx="18" cy="25" r="2" fill="#4ade80" />
                            <circle cx="80" cy="55" r="1.5" fill="#fbbf24" />
                            <circle cx="75" cy="70" r="2" fill="#4ade80" />
                        </svg>
                    </div>
                    <div className="hidden md:block">
                        <svg viewBox="0 0 100 100" className="w-40 h-40" xmlns="http://www.w3.org/2000/svg">
                            {/* Hintergrund-Kreis */}
                            <circle cx="50" cy="50" r="45" fill="#f0fdf4" />
                            
                            {/* Dokument */}
                            <rect x="22" y="18" width="48" height="65" rx="5" fill="#fff" stroke="#16a34a" strokeWidth="2.5" />
                            
                            {/* Dokument-Header */}
                            <rect x="22" y="18" width="48" height="12" rx="5" fill="#16a34a" />
                            <circle cx="30" cy="24" r="2" fill="#fff" />
                            <rect x="35" y="22" width="28" height="4" rx="2" fill="#fff" opacity="0.8" />
                            
                            {/* Dokument-Linien */}
                            <rect x="29" y="36" width="28" height="3" rx="1.5" fill="#bbf7d0" />
                            <rect x="29" y="44" width="34" height="3" rx="1.5" fill="#dcfce7" />
                            <rect x="29" y="52" width="22" height="3" rx="1.5" fill="#dcfce7" />
                            <rect x="29" y="60" width="30" height="3" rx="1.5" fill="#dcfce7" />
                            <rect x="29" y="68" width="18" height="3" rx="1.5" fill="#dcfce7" />
                            
                            {/* Stift - grösser und detaillierter */}
                            <g transform="translate(58, 32) rotate(40)">
                                <rect x="0" y="0" width="10" height="40" rx="1.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
                                <polygon points="0,40 5,52 10,40" fill="#1e293b" />
                                <rect x="0" y="0" width="10" height="8" rx="1.5" fill="#f59e0b" />
                                <rect x="1.5" y="34" width="7" height="6" fill="#fef3c7" />
                                {/* Stift-Details */}
                                <line x1="2" y1="12" x2="2" y2="30" stroke="#fcd34d" strokeWidth="1" />
                            </g>
                            
                            {/* Glühbirne (Idee) - oben rechts */}
                            <g transform="translate(68, 8)">
                                <circle cx="12" cy="12" r="12" fill="#fef08a" stroke="#fbbf24" strokeWidth="1" />
                                <path d="M 8 24 L 8 28 Q 8 30, 12 30 Q 16 30, 16 28 L 16 24" fill="#fbbf24" />
                                <circle cx="12" cy="12" r="7" fill="#fef9c3" />
                                <path d="M 12 7 L 12 17 M 7 12 L 17 12" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                            </g>
                            
                            {/* Dekorative Elemente */}
                            <circle cx="15" cy="22" r="3" fill="#4ade80" opacity="0.6" />
                            <circle cx="12" cy="75" r="2" fill="#4ade80" opacity="0.4" />
                            <circle cx="85" cy="65" r="2.5" fill="#fbbf24" opacity="0.6" />
                            
                            {/* Kleine Sterne/Funken */}
                            <path d="M 82 45 L 84 47 L 86 45 L 84 43 Z" fill="#4ade80" />
                            <path d="M 10 50 L 12 52 L 14 50 L 12 48 Z" fill="#fbbf24" />
                        </svg>
                    </div>
                </>
            ),
            label: t.step1Label,
            title: t.step1Title,
            subtitle: t.step1Subtitle,
        },
        {
            icon: (
                <>
                    <div className="md:hidden">
                        <HowItWorksStep2Icon className="w-40 h-40" />
                    </div>
                    <div className="hidden md:block">
                        <HowItWorksStep2IconDesktop className="w-40 h-40" />
                    </div>
                </>
            ),
            label: t.step2Label,
            title: t.step2Title,
            subtitle: t.step2Subtitle,
        },
        {
            icon: (
                <>
                    <div className="md:hidden">
                        <HowItWorksStep3Icon className="w-40 h-40" />
                    </div>
                    <div className="hidden md:block">
                        <HowItWorksStep3IconDesktop className="w-40 h-40" />
                    </div>
                </>
            ),
            label: t.step3Label,
            title: t.step3Title,
            subtitle: language === 'fr' ? (
                <span>Comparez, sélectionnez, <strong className="text-slate-900">FERTI</strong><strong className="text-green-600">GO</strong>.</span>
            ) : (
                <span>Vergleichen, auswählen, <strong className="text-slate-900">FERTI</strong><strong className="text-green-600">GO</strong>.</span>
            ),
        },
    ];

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    return (
        <section
            ref={ref}
            className={`relative bg-white py-16 sm:py-20 md:py-24 overflow-hidden transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
            {/* Subtiler Hintergrund */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 whitespace-nowrap">
                        {t.title}
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                        In drei einfachen Schritten zum perfekten Handwerker für Ihr Projekt
                    </p>
                </div>

                {/* Mobile - Vertikales Layout */}
                <div className="md:hidden space-y-8">
                    {steps.map((step: any, index) => (
                        <div
                            key={index}
                            className={`relative transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: inView ? `${index * 200}ms` : '0ms' }}
                        >
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md">
                                {/* Label und Titel */}
                                <div className="mb-4">
                                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                                        {step.label}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                                        {step.title}
                                    </h3>
                                </div>
                                
                                {/* Icon */}
                                {step.icon && (
                                    <div className="mb-4 flex justify-center">
                                        <div className="w-32 h-32 rounded-xl bg-primary-50 flex items-center justify-center">
                                            {step.icon}
                                        </div>
                                    </div>
                                )}

                                {/* Beschreibung */}
                                {step.subtitle && (
                                    <p className="text-sm text-slate-600 text-center">
                                        {step.subtitle}
                                    </p>
                                )}

                                {/* Pfeil nach unten */}
                                {index < steps.length - 1 && (
                                    <div className="flex justify-center mt-6">
                                        <ArrowRightIcon className="w-6 h-6 text-primary-400 rotate-90" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop - Horizontales Layout mit 3 Schritten und Pfeilen */}
                <div className="hidden md:block">
                    <div className="flex items-start justify-center gap-4 lg:gap-8 xl:gap-12">
                        {steps.map((step: any, index) => (
                            <React.Fragment key={index}>
                                {/* Schritt */}
                                <div
                                    className={`flex-1 flex flex-col items-center text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                    style={{ transitionDelay: inView ? `${index * 250}ms` : '0ms' }}
                                >
                                    {/* Icon Container */}
                                    {step.icon && (
                                        <div className="mb-6 w-full">
                                            <div className="relative mx-auto w-48 h-48 lg:w-56 lg:h-56 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300">
                                                <div className="w-40 h-40 lg:w-48 lg:h-48 flex items-center justify-center">
                                                    {step.icon}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Label */}
                                    <div className="mb-3">
                                        <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
                                            {step.label}
                                        </span>
                                    </div>

                                    {/* Titel */}
                                    <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-slate-900 mb-4">
                                        {step.title}
                                    </h3>

                                    {/* Beschreibung */}
                                    {step.subtitle && (
                                        <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                                            {step.subtitle}
                                        </p>
                                    )}
                                </div>

                                {/* Pfeil zwischen Schritten */}
                                {index < steps.length - 1 && (
                                    <div 
                                        className={`flex-shrink-0 self-start transition-all duration-1000 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                                        style={{ transitionDelay: `${(index + 1) * 300}ms`, marginTop: '96px' }}
                                    >
                                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-primary-600 flex items-center justify-center shadow-lg">
                                            <ArrowRightIcon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12 md:mt-16">
                    <button
                        onClick={() => openQuoteModal()}
                        className="bg-primary-600 text-white font-bold px-8 py-4 md:px-10 md:py-5 rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base md:text-lg inline-flex items-center gap-3"
                    >
                        <span>{t.cta}</span>
                        <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Features;
