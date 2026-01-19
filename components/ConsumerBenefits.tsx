import React from 'react';
import { useAppContext } from '../pages/AppContext';
import { useInView } from 'react-intersection-observer';
import { CheckCircleIcon, PhoneIcon, BanknotesIcon, ArrowPathIcon, ClockIcon, ShieldCheckIcon } from './icons';

const translations = {
    de: {
        title: "Vorteile für Konsumenten",
        subtitle: "Warum Fertigo besser ist",
        benefit1Title: "Keine Telefonate",
        benefit1Desc: "Alles digital – keine Warteschleifen oder Rückrufe nötig",
        benefit2Title: "Keine versteckten Kosten",
        benefit2Desc: "100% transparent und kostenlos. Keine Gebühren, keine Abos.",
        benefit3Title: "Vergleich mehrerer Angebote",
        benefit3Desc: "Erhalten Sie 3-5 Angebote auf einen Blick und vergleichen Sie einfach",
        benefit4Title: "Zeitersparnis",
        benefit4Desc: "Von 5+ Stunden auf nur 2 Minuten reduziert – 150x schneller",
        benefit5Title: "Rechtssichere Bewertungen",
        benefit5Desc: "Alle Bewertungen werden verifiziert und sind rechtssicher",
        benefit6Title: "Geprüfte Anbieter",
        benefit6Desc: "Über 2'500 geprüfte Partner – Qualität garantiert",
    },
    fr: {
        title: "Avantages pour les consommateurs",
        subtitle: "Pourquoi Fertigo est meilleur",
        benefit1Title: "Pas d'appels téléphoniques",
        benefit1Desc: "Tout est numérique – pas d'attente ni de rappels nécessaires",
        benefit2Title: "Pas de coûts cachés",
        benefit2Desc: "100% transparent et gratuit. Pas de frais, pas d'abonnements.",
        benefit3Title: "Comparaison de plusieurs offres",
        benefit3Desc: "Recevez 3-5 offres en un coup d'œil et comparez facilement",
        benefit4Title: "Gain de temps",
        benefit4Desc: "De 5+ heures à seulement 2 minutes – 150x plus rapide",
        benefit5Title: "Avis juridiquement sûrs",
        benefit5Desc: "Tous les avis sont vérifiés et juridiquement sûrs",
        benefit6Title: "Prestataires vérifiés",
        benefit6Desc: "Plus de 2'500 partenaires vérifiés – qualité garantie",
    },
    en: {
        title: "Benefits for Consumers",
        subtitle: "Why Fertigo is Better",
        benefit1Title: "No Phone Calls",
        benefit1Desc: "Everything digital – no waiting lines or callbacks needed",
        benefit2Title: "No Hidden Costs",
        benefit2Desc: "100% transparent and free. No fees, no subscriptions.",
        benefit3Title: "Compare Multiple Offers",
        benefit3Desc: "Receive 3-5 offers at a glance and compare easily",
        benefit4Title: "Time Savings",
        benefit4Desc: "From 5+ hours to just 2 minutes – 150x faster",
        benefit5Title: "Legally Safe Reviews",
        benefit5Desc: "All reviews are verified and legally safe",
        benefit6Title: "Verified Providers",
        benefit6Desc: "Over 2'500 verified partners – quality guaranteed",
    },
};

// Mini-Illustrationen als SVG
const NoPhoneIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="15" width="60" height="70" rx="8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 30 25 L 70 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M 45 55 L 55 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 20 80 L 30 85 L 25 90 L 15 85 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
);

const NoHiddenCostsIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="20" width="50" height="60" rx="4" stroke="currentColor" strokeWidth="3" fill="none"/>
        <path d="M 30 30 L 70 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 30 45 L 60 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 30 60 L 55 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="75" cy="25" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M 71 25 L 79 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const CompareIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="25" height="60" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="37.5" y="30" width="25" height="50" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="65" y="25" width="25" height="55" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M 22.5 15 L 22.5 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 50 15 L 50 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 77.5 15 L 77.5 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const TimeSavingIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="3" fill="none"/>
        <path d="M 50 30 L 50 50 L 65 65" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 15 15 L 25 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 85 15 L 75 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 85 85 L 75 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 15 85 L 25 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const LegalReviewsIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 20 20 L 80 20 L 80 80 L 20 80 Z" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 30 35 L 70 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 30 50 L 65 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 30 65 L 60 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="75" cy="25" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M 72 25 L 78 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 75 22 L 75 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const VerifiedProvidersIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none"/>
        <path d="M 40 50 L 47 57 L 60 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 20 20 L 30 15 L 25 25 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 80 20 L 70 15 L 75 25 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
);

const ConsumerBenefits: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    const benefits = [
        {
            icon: NoPhoneIcon,
            title: t.benefit1Title,
            description: t.benefit1Desc,
        },
        {
            icon: NoHiddenCostsIcon,
            title: t.benefit2Title,
            description: t.benefit2Desc,
        },
        {
            icon: CompareIcon,
            title: t.benefit3Title,
            description: t.benefit3Desc,
        },
        {
            icon: TimeSavingIcon,
            title: t.benefit4Title,
            description: t.benefit4Desc,
        },
        {
            icon: LegalReviewsIcon,
            title: t.benefit5Title,
            description: t.benefit5Desc,
        },
        {
            icon: VerifiedProvidersIcon,
            title: t.benefit6Title,
            description: t.benefit6Desc,
        },
    ];

    return (
        <section
            ref={ref}
            className={`relative py-16 sm:py-20 md:py-24 bg-white overflow-hidden transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
            {/* Hintergrund */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-semibold mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                        Für Konsumenten
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                        {t.title}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                {/* Benefits Grid - 3 Spalten */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {benefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
                            >
                                {/* Icon */}
                                <div className="mb-4 flex justify-center">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 flex items-center justify-center group-hover:border-primary-400 group-hover:scale-110 transition-all duration-300">
                                        <IconComponent className="w-12 h-12 text-primary-600" />
                                    </div>
                                </div>

                                {/* Titel */}
                                <h3 className="text-xl font-bold text-slate-900 mb-3 text-center group-hover:text-primary-600 transition-colors">
                                    {benefit.title}
                                </h3>

                                {/* Beschreibung */}
                                <p className="text-sm text-slate-600 text-center leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ConsumerBenefits;
