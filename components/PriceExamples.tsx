import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon } from './icons';

// Service Icons
const TruckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const PaintBrushIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
);

const LayersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
);

interface PriceBreakdown {
    label: string;
    percentage: number;
    color: string;
}

const translations = {
    de: {
        title: "Die Rechnung, bitte.",
        subtitle: "Transparente Preise auf einen Blick",
        getQuote: "Jetzt Offerte einholen",
        included: "Was ist enthalten:",
        disclaimer: "* Alle Preise sind Richtwerte und können je nach Aufwand variieren.",
        items: [
            {
                id: 'umzug',
                service: "Umzug",
                desc: "3.5 Zimmer Wohnung (80m²)",
                priceMin: 900,
                priceMax: 1400,
                icon: TruckIcon,
                color: "cyan",
                breakdown: [
                    { label: "Transport & Fahrzeug", percentage: 35, color: "bg-cyan-500" },
                    { label: "Arbeitszeit (2-3 Personen)", percentage: 45, color: "bg-cyan-400" },
                    { label: "Versicherung & Material", percentage: 20, color: "bg-cyan-300" }
                ]
            },
            {
                id: 'reinigung',
                service: "Endreinigung",
                desc: "Mit Abgabegarantie (3.5 Zimmer)",
                priceMin: 800,
                priceMax: 1100,
                icon: SparklesIcon,
                color: "primary",
                bestseller: true,
                breakdown: [
                    { label: "Grundreinigung alle Räume", percentage: 50, color: "bg-primary-500" },
                    { label: "Küche & Bad intensiv", percentage: 30, color: "bg-primary-400" },
                    { label: "Fenster & Abgabegarantie", percentage: 20, color: "bg-primary-300" }
                ]
            },
            {
                id: 'maler',
                service: "Maler",
                desc: "Zimmer streichen (20m²)",
                priceMin: 400,
                priceMax: 600,
                icon: PaintBrushIcon,
                color: "purple",
                breakdown: [
                    { label: "Arbeitszeit Fachperson", percentage: 60, color: "bg-purple-500" },
                    { label: "Farbe & Material", percentage: 25, color: "bg-purple-400" },
                    { label: "Vorbereitung & Abdeckung", percentage: 15, color: "bg-purple-300" }
                ]
            },
            {
                id: 'bodenleger',
                service: "Bodenleger",
                desc: "Parkett schleifen & versiegeln (pro m²)",
                priceMin: 45,
                priceMax: 85,
                icon: LayersIcon,
                color: "amber",
                breakdown: [
                    { label: "Schleifen (mehrere Durchgänge)", percentage: 50, color: "bg-amber-500" },
                    { label: "Versiegelung & Finish", percentage: 35, color: "bg-amber-400" },
                    { label: "Vorbereitung & Reinigung", percentage: 15, color: "bg-amber-300" }
                ]
            }
        ]
    },
    fr: {
        title: "L'addition, s'il vous plaît.",
        subtitle: "Prix transparents en un coup d'œil",
        getQuote: "Obtenir une offre maintenant",
        included: "Qu'est-ce qui est inclus:",
        disclaimer: "* Tous les prix sont indicatifs et peuvent varier selon l'effort.",
        items: [
            {
                id: 'umzug',
                service: "Déménagement",
                desc: "Appartement 3.5 pièces (80m²)",
                priceMin: 900,
                priceMax: 1400,
                icon: TruckIcon,
                color: "cyan",
                breakdown: [
                    { label: "Transport & véhicule", percentage: 35, color: "bg-cyan-500" },
                    { label: "Temps de travail (2-3 personnes)", percentage: 45, color: "bg-cyan-400" },
                    { label: "Assurance & matériel", percentage: 20, color: "bg-cyan-300" }
                ]
            },
            {
                id: 'reinigung',
                service: "Nettoyage final",
                desc: "Avec garantie de remise (3.5 pièces)",
                priceMin: 800,
                priceMax: 1100,
                icon: SparklesIcon,
                color: "primary",
                bestseller: true,
                breakdown: [
                    { label: "Nettoyage de base toutes pièces", percentage: 50, color: "bg-primary-500" },
                    { label: "Cuisine & salle de bain intensif", percentage: 30, color: "bg-primary-400" },
                    { label: "Fenêtres & garantie", percentage: 20, color: "bg-primary-300" }
                ]
            },
            {
                id: 'maler',
                service: "Peintre",
                desc: "Peindre une pièce (20m²)",
                priceMin: 400,
                priceMax: 600,
                icon: PaintBrushIcon,
                color: "purple",
                breakdown: [
                    { label: "Temps de travail professionnel", percentage: 60, color: "bg-purple-500" },
                    { label: "Peinture & matériel", percentage: 25, color: "bg-purple-400" },
                    { label: "Préparation & protection", percentage: 15, color: "bg-purple-300" }
                ]
            },
            {
                id: 'bodenleger',
                service: "Parqueteur",
                desc: "Ponçage et vitrification (par m²)",
                priceMin: 45,
                priceMax: 85,
                icon: LayersIcon,
                color: "amber",
                breakdown: [
                    { label: "Ponçage (plusieurs passages)", percentage: 50, color: "bg-amber-500" },
                    { label: "Vitrification & finition", percentage: 35, color: "bg-amber-400" },
                    { label: "Préparation & nettoyage", percentage: 15, color: "bg-amber-300" }
                ]
            }
        ]
    }
};

const PriceExamples: React.FC = () => {
    const { language, openQuoteModal } = useAppContext();
    const t = (translations as any)[language] || translations.de;
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [activeIndex, setActiveIndex] = useState(0);

    const activeItem = t.items[activeIndex];
    const IconComponent = activeItem.icon;

    return (
        <section ref={ref} className="relative py-24 sm:py-32 bg-slate-900 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
                        {t.title}
                    </h2>
                    <p className="text-xl text-slate-300">
                        {t.subtitle}
                    </p>
                </div>

                {/* Main Content - Split Screen */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                    {/* Left Side - Service Tabs */}
                    <div className="lg:col-span-5 space-y-4">
                        {t.items.map((item: any, index: number) => {
                            const ItemIcon = item.icon;
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden ${isActive
                                            ? `border-${item.color}-500 bg-gradient-to-r from-${item.color}-500/20 to-transparent shadow-xl shadow-${item.color}-500/20`
                                            : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                                        }`}
                                >
                                    {item.bestseller && (
                                        <div className="absolute top-3 right-3">
                                            <div className="bg-gradient-to-r from-primary-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-all duration-300 ${isActive
                                                ? `bg-${item.color}-500 shadow-lg shadow-${item.color}-500/50`
                                                : 'bg-slate-700 group-hover:bg-slate-600'
                                            }`}>
                                            <ItemIcon className="w-8 h-8 text-white" />
                                        </div>

                                        <div className="flex-grow">
                                            <h3 className={`text-xl font-bold mb-1 transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                                                }`}>
                                                {item.service}
                                            </h3>
                                            <p className="text-sm text-slate-400">{item.desc}</p>
                                        </div>

                                        <ArrowRightIcon className={`w-6 h-6 transition-all duration-300 ${isActive
                                                ? `text-${item.color}-400 translate-x-1`
                                                : 'text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1'
                                            }`} />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Side - Price Display */}
                    <div className="lg:col-span-7">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 lg:p-12 border border-slate-700 shadow-2xl relative overflow-hidden">
                            {/* Decorative gradient overlay */}
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-${activeItem.color}-500/20 to-transparent rounded-full blur-3xl transition-all duration-500`}></div>

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-${activeItem.color}-500 to-${activeItem.color}-600 shadow-lg shadow-${activeItem.color}-500/50 mb-6 transition-all duration-500`}>
                                    <IconComponent className="w-12 h-12 text-white" />
                                </div>

                                {/* Service Name */}
                                <h3 className="text-3xl lg:text-4xl font-black text-white mb-2 transition-all duration-500">
                                    {activeItem.service}
                                </h3>
                                <p className="text-slate-400 mb-8 transition-all duration-500">
                                    {activeItem.desc}
                                </p>

                                {/* Price Display */}
                                <div className="mb-10">
                                    <div className="flex items-baseline gap-3 mb-2">
                                        <span className={`text-6xl lg:text-7xl font-black bg-gradient-to-r from-${activeItem.color}-400 to-${activeItem.color}-500 bg-clip-text text-transparent transition-all duration-500`}>
                                            CHF {activeItem.priceMin}
                                        </span>
                                        <span className="text-3xl text-slate-500 font-bold">–</span>
                                        <span className={`text-6xl lg:text-7xl font-black bg-gradient-to-r from-${activeItem.color}-400 to-${activeItem.color}-500 bg-clip-text text-transparent transition-all duration-500`}>
                                            {activeItem.priceMax}
                                        </span>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="mb-8">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                        {t.included}
                                    </h4>
                                    <div className="space-y-4">
                                        {activeItem.breakdown.map((item: PriceBreakdown, idx: number) => (
                                            <div key={idx} className="transition-all duration-500" style={{ transitionDelay: `${idx * 100}ms` }}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-slate-300 text-sm font-medium">{item.label}</span>
                                                    <span className="text-slate-400 text-sm font-bold">{item.percentage}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                                                        style={{
                                                            width: inView ? `${item.percentage}%` : '0%',
                                                            transitionDelay: `${300 + idx * 100}ms`
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={() => openQuoteModal({ service: activeItem.service })}
                                    className={`w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-${activeItem.color}-500 to-${activeItem.color}-600 hover:from-${activeItem.color}-600 hover:to-${activeItem.color}-700 shadow-lg shadow-${activeItem.color}-500/50 hover:shadow-xl hover:shadow-${activeItem.color}-500/60 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group`}
                                >
                                    <span className="text-lg">{t.getQuote}</span>
                                    <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className={`text-center mt-12 transition-all duration-700 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-sm text-slate-500 italic">
                        {t.disclaimer}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PriceExamples;
