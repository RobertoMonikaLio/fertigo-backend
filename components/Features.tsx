import React, { useState, useEffect } from 'react';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon, HowItWorksStep2IconDesktop, HowItWorksStep3IconDesktop } from './icons';
import { useInView } from 'react-intersection-observer';

const translations = {
    de: {
        title: "So funktioniert's",
        subtitle: "In 3 Schritten zum perfekten Handwerker",
        description: "Geben Sie Ihr Projekt in Auftrag und erhalten Sie schnell unverbindliche Angebote. Wir machen den Prozess so einfach wie nie zuvor.",
        step1Label: "Schritt 1",
        step1Title: "Projekt beschreiben",
        step1Subtitle: "Beantworten Sie ein paar kurze Fragen zu Ihrem Vorhaben und laden Sie bei Bedarf Bilder hoch.",
        step1Features: ["Kategorie auswählen", "Details & Fotos hinzufügen", "Kostenlos anfragen"],
        step2Label: "Schritt 2",
        step2Title: "Offerten erhalten",
        step2Subtitle: "Wir leiten Ihre Anfrage an passende Betriebe in Ihrer Region weiter. Sie erhalten zeitnah Angebote.",
        step2Features: ["Regionale Fachbetriebe", "Geprüfte Qualität", "Völlig unverbindlich"],
        step3Label: "Schritt 3",
        step3Title: "Entscheiden & beauftragen",
        step3Subtitle: "Vergleichen Sie Profile, Bewertungen und Offerten. Wählen Sie das beste Angebot aus.",
        step3Features: ["Echte Bewertungen", "Transparente Preise", "Direkter Kontakt"],
        cta: "Jetzt Projekt starten"
    },
    fr: {
        title: "Comment ça marche",
        subtitle: "En 3 étapes vers l'artisan idéal",
        description: "Confiez-nous votre projet et recevez rapidement des devis sans engagement. Nous rendons le processus plus simple que jamais.",
        step1Label: "Étape 1",
        step1Title: "Décrivez votre projet",
        step1Subtitle: "Répondez à quelques questions courtes sur votre projet et téléchargez des photos si nécessaire.",
        step1Features: ["Sélectionner la catégorie", "Ajouter des détails", "Demande gratuite"],
        step2Label: "Étape 2",
        step2Title: "Recevez des devis",
        step2Subtitle: "Nous transmettons votre demande à des entreprises qualifiées. Vous recevrez des offres à comparer.",
        step2Features: ["Artisans régionaux", "Qualité vérifiée", "Sans engagement"],
        step3Label: "Étape 3",
        step3Title: "Décidez & mandatez",
        step3Subtitle: "Comparez les profils, avis et offres. Choisissez la meilleure offre et mandatez l'entreprise.",
        step3Features: ["Vrais avis", "Prix transparents", "Contact direct"],
        cta: "Démarrer le projet"
    },
};

const SparklesIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
);

const FileCheckIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
    </svg>
);

const ShieldCheckIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const Step1Illustration = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full p-4 lg:p-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#f0fdf4" />
        <rect x="22" y="18" width="48" height="65" rx="5" fill="#fff" stroke="#16a34a" strokeWidth="2.5" />
        <rect x="22" y="18" width="48" height="12" rx="5" fill="#16a34a" />
        <circle cx="30" cy="24" r="3" fill="#fff" />
        <rect x="37" y="22" width="22" height="4" rx="2" fill="#fff" opacity="0.8" />
        <rect x="29" y="36" width="28" height="3" rx="1.5" fill="#bbf7d0" />
        <rect x="29" y="44" width="34" height="3" rx="1.5" fill="#dcfce7" />
        <rect x="29" y="52" width="22" height="3" rx="1.5" fill="#dcfce7" />
        <rect x="29" y="60" width="30" height="3" rx="1.5" fill="#dcfce7" />
        <rect x="29" y="68" width="18" height="3" rx="1.5" fill="#dcfce7" />
        <circle cx="15" cy="22" r="3" fill="#4ade80" opacity="0.6" />
        <circle cx="12" cy="75" r="2" fill="#4ade80" opacity="0.4" />
        <circle cx="85" cy="65" r="2.5" fill="#fbbf24" opacity="0.6" />
        <path d="M 82 45 L 84 47 L 86 45 L 84 43 Z" fill="#4ade80" />
        <path d="M 10 50 L 12 52 L 14 50 L 12 48 Z" fill="#fbbf24" />
    </svg>
);

const Features: React.FC = () => {
    const { language, openQuoteModal } = useAppContext();
    const t = (translations as any)[language] || translations.de;

    const [activeStep, setActiveStep] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovered]);

    const stepsData = [
        {
            id: 0,
            label: t.step1Label,
            title: t.step1Title,
            subtitle: t.step1Subtitle,
            features: t.step1Features,
            icon: <Step1Illustration />,
            blobColor: "from-green-400/20 via-emerald-400/5 to-transparent",
            iconColor: "text-emerald-500",
            tabIcon: <SparklesIcon />,
            activeBorder: "bg-emerald-500",
            activeBg: "bg-emerald-50 dark:bg-emerald-900/10",
        },
        {
            id: 1,
            label: t.step2Label,
            title: t.step2Title,
            subtitle: t.step2Subtitle,
            features: t.step2Features,
            icon: <HowItWorksStep2IconDesktop className="w-full h-full p-8 text-blue-500 opacity-90 drop-shadow-md" />,
            blobColor: "from-blue-400/20 via-indigo-400/5 to-transparent",
            iconColor: "text-blue-500",
            tabIcon: <FileCheckIcon />,
            activeBorder: "bg-blue-500",
            activeBg: "bg-blue-50 dark:bg-blue-900/10",
        },
        {
            id: 2,
            label: t.step3Label,
            title: t.step3Title,
            subtitle: t.step3Subtitle,
            features: t.step3Features,
            icon: <HowItWorksStep3IconDesktop className="w-full h-full p-8 text-primary-500 opacity-90 drop-shadow-md" />,
            blobColor: "from-primary-400/20 via-primary-300/5 to-transparent",
            iconColor: "text-primary-500",
            tabIcon: <ShieldCheckIcon />,
            activeBorder: "bg-primary-500",
            activeBg: "bg-primary-50 dark:bg-primary-900/10",
        },
    ];

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className="relative py-24 sm:py-32 bg-white overflow-hidden" id="how-it-works">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-50 blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-emerald-50 blur-3xl opacity-50 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10" ref={ref}>

                {/* Header Section */}
                <div className={`text-center max-w-2xl mx-auto mb-16 lg:mb-24 transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 font-semibold text-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        {t.title}
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                        {t.subtitle}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600">
                        {t.description}
                    </p>
                </div>

                {/* Main Interactive Showcase */}
                <div
                    className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Left: Interactive Tabs */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-4">
                        {stepsData.map((step, index) => {
                            const isActive = activeStep === index;
                            return (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(index)}
                                    className={`relative text-left w-full rounded-2xl p-6 transition-all duration-300 border-2 overflow-hidden group ${isActive
                                            ?\`border-transparent shadow-lg \${step.activeBg}\`
                        : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50 shadow-sm'
                                    }`}
                                >
                        {/* Active Border Indicator (Left Edge) */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-500 scale-y-0 origin-top \${step.activeBorder} \${isActive ? 'scale-y-100' : ''}`}></div>

                        <div className="flex gap-5 items-start relative z-10">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-white text-slate-900 shadow-sm' : 'bg-slate-100 text-slate-500 group-hover:bg-white'
                                }`}>
                                <div className={isActive ? step.iconColor : ''}>
                                    {step.tabIcon}
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="text-sm font-bold tracking-wide uppercase text-slate-400 mb-1">
                                    {step.label}
                                </div>
                                <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 \${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                                    {step.title}
                                </h3>

                                {/* Expandable Content inside Tab */}
                                <div className={`grid transition-all duration-500 ease-in-out \${isActive ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                                            {step.subtitle}
                                        </p>
                                        <ul className="space-y-2">
                                            {step.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                                    <CheckCircleIcon className={`w-4 h-4 \${step.iconColor}`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar effect on active tab */}
                        {isActive && !isHovered && (
                            <div className="absolute bottom-0 left-0 h-1 bg-black/5 w-full">
                                <div className={`h-full \${step.activeBorder} animate-[progress_5s_linear_infinite]`}></div>
                            </div>
                        )}
                    </button>
                    );
                        })}
                </div>

                {/* Right: Visual Showcase */}
                <div className="w-full lg:w-7/12 relative min-h-[400px] lg:min-h-[500px]">
                    <div className="absolute inset-0 bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden lg:sticky lg:top-32">
                        {stepsData.map((step, index) => {
                            const isActive = activeStep === index;
                            return (
                                <div
                                    key={step.id}
                                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center p-8 sm:p-12 \${
                                            isActive 
                                                ? 'opacity-100 translate-y-0 scale-100 z-10' 
                                                : 'opacity-0 translate-y-8 scale-95 z-0 pointer-events-none'
                                        }`}
                                >
                                    {/* Radial Gradient Background specific to step */}
                                    <div className={`absolute inset-0 bg-gradient-to-tr \${step.blobColor} opacity-50`}></div>

                                    {/* Glowing Orb */}
                                    <div className={`absolute w-64 h-64 rounded-full blur-3xl \${step.activeBorder} opacity-10 transform -translate-y-12`}></div>

                                    <div className="relative w-full max-w-sm aspect-square transform transition-transform duration-700 hover:scale-105">
                                        {step.icon}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className={`mt-20 text-center transition-all duration-1000 delay-300 ease-out \${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <button
                    onClick={() => openQuoteModal()}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-slate-900 rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center gap-3 text-lg">
                        {t.cta}
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
                <p className="mt-4 text-sm font-medium text-slate-500">
                    {language === 'fr' ? '100% gratuit et sans engagement.' : '100% kostenlos und unverbindlich.'}
                </p>
            </div>

        </div>

            {/* Global styles for the progress animation */ }
    <style dangerouslySetInnerHTML={{
        __html: `
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}} />
        </section >
    );
};

export default Features;
