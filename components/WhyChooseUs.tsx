import React, { useState } from 'react';
import { useAppContext } from '../pages/AppContext';
import { useInView } from 'react-intersection-observer';
import { SwissFlagIcon, CheckCircleIcon } from './icons';

const translations = {
    de: {
        badge: "Warum Fertigo?",
        title: "Die smarte Art,",
        titleHighlight: "Dienstleister zu finden",
        benefits: [
            {
                id: 1,
                emoji: "🎯",
                title: "Perfekte Matches",
                description: "Unser Algorithmus findet genau die Anbieter, die zu Ihrem Projekt passen.",
                color: "from-violet-500 to-purple-600",
                size: "large"
            },
            {
                id: 2,
                emoji: "⚡",
                title: "Blitzschnell",
                description: "Erste Angebote in unter 24 Stunden",
                color: "from-amber-400 to-orange-500",
                size: "small"
            },
            {
                id: 3,
                emoji: "🛡️",
                title: "100% Sicher",
                description: "Geprüfte Partner & Datenschutz",
                color: "from-emerald-400 to-teal-500",
                size: "small"
            },
            {
                id: 4,
                emoji: "🇨🇭",
                title: "Lokal & Vertrauenswürdig",
                description: "Nur Schweizer Betriebe mit echten Bewertungen und nachweisbarer Erfahrung in Ihrer Region.",
                color: "from-red-500 to-rose-600",
                size: "large"
            },
            {
                id: 5,
                emoji: "💰",
                title: "Kostenlos vergleichen",
                description: "Keine versteckten Gebühren für Kunden – Sie zahlen nur, wenn Sie sich entscheiden.",
                color: "from-cyan-400 to-blue-500",
                size: "medium"
            },
            {
                id: 6,
                emoji: "✨",
                title: "Premium Support",
                description: "Persönliche Beratung bei Fragen",
                color: "from-pink-400 to-rose-500",
                size: "small"
            },
        ],
        bottomStats: [
            { value: "15'000+", label: "zufriedene Kunden" },
            { value: "500+", label: "geprüfte Partner" },
            { value: "4.8", label: "Sterne Bewertung", icon: "⭐" },
        ],
        cta: "Jetzt kostenlos starten"
    },
    fr: {
        badge: "Pourquoi Fertigo?",
        title: "La manière intelligente de",
        titleHighlight: "trouver des prestataires",
        benefits: [
            {
                id: 1,
                emoji: "🎯",
                title: "Correspondances parfaites",
                description: "Notre algorithme trouve exactement les prestataires adaptés à votre projet.",
                color: "from-violet-500 to-purple-600",
                size: "large"
            },
            {
                id: 2,
                emoji: "⚡",
                title: "Ultra rapide",
                description: "Premières offres en moins de 24h",
                color: "from-amber-400 to-orange-500",
                size: "small"
            },
            {
                id: 3,
                emoji: "🛡️",
                title: "100% Sécurisé",
                description: "Partenaires vérifiés & données protégées",
                color: "from-emerald-400 to-teal-500",
                size: "small"
            },
            {
                id: 4,
                emoji: "🇨🇭",
                title: "Local & Fiable",
                description: "Uniquement des entreprises suisses avec de vrais avis et une expérience prouvée dans votre région.",
                color: "from-red-500 to-rose-600",
                size: "large"
            },
            {
                id: 5,
                emoji: "💰",
                title: "Comparez gratuitement",
                description: "Aucun frais caché pour les clients – payez uniquement si vous décidez.",
                color: "from-cyan-400 to-blue-500",
                size: "medium"
            },
            {
                id: 6,
                emoji: "✨",
                title: "Support Premium",
                description: "Conseil personnalisé pour vos questions",
                color: "from-pink-400 to-rose-500",
                size: "small"
            },
        ],
        bottomStats: [
            { value: "15'000+", label: "clients satisfaits" },
            { value: "500+", label: "partenaires vérifiés" },
            { value: "4.8", label: "étoiles", icon: "⭐" },
        ],
        cta: "Commencer gratuitement"
    },
};

const WhyChooseUs: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    return (
        <section
            ref={ref}
            className={`relative overflow-hidden bg-slate-950 py-20 sm:py-24 md:py-32 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-[200px]" />
            </div>

            {/* Grid pattern overlay */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="container mx-auto px-6 max-w-6xl relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 text-sm font-medium text-white/90 mb-6">
                        <span className="h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
                        {t.badge}
                    </div>
                    <h2 className="font-title text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                        {t.title}
                        <br />
                        <span className="bg-gradient-to-r from-primary-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {t.titleHighlight}
                        </span>
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[140px] md:auto-rows-[160px]">
                    {t.benefits.map((benefit: any, index: number) => {
                        const isLarge = benefit.size === 'large';
                        const isMedium = benefit.size === 'medium';
                        const isHovered = hoveredCard === benefit.id;

                        return (
                            <div
                                key={benefit.id}
                                className={`
                                    relative group rounded-3xl overflow-hidden cursor-pointer
                                    transition-all duration-500 ease-out
                                    ${isLarge ? 'col-span-2 row-span-2' : isMedium ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'}
                                    ${isHovered ? 'scale-[1.02] z-10' : 'scale-100'}
                                `}
                                onMouseEnter={() => setHoveredCard(benefit.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {/* Background gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-90 transition-opacity duration-300 group-hover:opacity-100`} />
                                
                                {/* Shine effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full p-5 md:p-6 flex flex-col justify-between">
                                    <div>
                                        <span className={`text-3xl md:text-4xl ${isLarge ? 'md:text-5xl' : ''} block mb-3 transform group-hover:scale-110 transition-transform duration-300`}>
                                            {benefit.emoji}
                                        </span>
                                        <h3 className={`font-bold text-white ${isLarge ? 'text-xl md:text-2xl' : 'text-base md:text-lg'} mb-2`}>
                                            {benefit.title}
                                        </h3>
                                    </div>
                                    <p className={`text-white/90 ${isLarge ? 'text-sm md:text-base' : 'text-xs md:text-sm'} leading-relaxed line-clamp-3`}>
                                        {benefit.description}
                                    </p>
                                </div>

                                {/* Corner decoration */}
                                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Stats Bar */}
                <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-6 md:gap-12">
                    {t.bottomStats.map((stat: any, index: number) => (
                        <div key={index} className="text-center group">
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-3xl md:text-4xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                                    {stat.value}
                                </span>
                                {stat.icon && <span className="text-2xl">{stat.icon}</span>}
                            </div>
                            <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-12 text-center">
                    <button className="group relative inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-xl shadow-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20 hover:scale-105">
                        <span>{t.cta}</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
