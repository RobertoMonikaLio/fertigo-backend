import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../pages/AppContext';
import { useInView } from 'react-intersection-observer';

const translations = {
    de: {
        title: "In der ganzen Schweiz für Sie da",
        subtitle: "Finden Sie geprüfte Dienstleister in Ihrer Region.",
        cities: [
            "Zürich", "Bern", "Luzern", "Basel", "Winterthur", "St. Gallen", "Genf", "Lausanne",
            "Aarau", "Schaffhausen", "Chur", "Zug", "Thun", "Biel", "Fribourg", "Neuchâtel",
            "Lugano", "Sion", "Bellinzona", "Rapperswil"
        ],
        cantons: [
            "Zürich", "Bern", "Luzern", "Aargau", "St. Gallen", "Waadt", "Genf", "Tessin"
        ]
    },
    fr: {
        title: "Disponible dans toute la Suisse",
        subtitle: "Trouvez des prestataires vérifiés dans votre région.",
        cities: [
            "Zurich", "Berne", "Lucerne", "Bâle", "Winterthour", "Saint-Gall", "Genève", "Lausanne",
            "Aarau", "Schaffhouse", "Coire", "Zoug", "Thoune", "Bienne", "Fribourg", "Neuchâtel",
            "Lugano", "Sion", "Bellinzone", "Rapperswil"
        ],
        cantons: [
            "Zurich", "Berne", "Lucerne", "Argovie", "Saint-Gall", "Vaud", "Genève", "Tessin"
        ]
    }
};

// Switzerland Map Illustration Component
const SwitzerlandMap: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg
        viewBox="0 0 400 300"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
    >
        <defs>
            <linearGradient id="swissGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="swissBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Switzerland Outline - Simplified but recognizable shape */}
        <path
            d="M 200 50 
               L 250 60 
               L 280 80 
               L 300 100 
               L 310 130 
               L 320 160 
               L 330 190 
               L 320 220 
               L 300 240 
               L 280 250 
               L 250 255 
               L 220 250 
               L 190 245 
               L 160 240 
               L 130 230 
               L 100 220 
               L 80 200 
               L 70 170 
               L 75 140 
               L 90 110 
               L 110 85 
               L 140 70 
               L 170 60 
               L 200 50 Z"
            fill="url(#swissGradient)"
            stroke="url(#swissBorder)"
            strokeWidth="3"
            filter="url(#glow)"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
        />

        {/* Major City Markers */}
        {/* Zürich */}
        <circle cx="220" cy="120" r="6" fill="#3b82f6" className="animate-ping" style={{ animationDuration: '2s' }} />
        <circle cx="220" cy="120" r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />

        {/* Bern */}
        <circle cx="180" cy="140" r="6" fill="#6366f1" className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
        <circle cx="180" cy="140" r="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2" />

        {/* Basel */}
        <circle cx="150" cy="100" r="5" fill="#8b5cf6" className="animate-ping" style={{ animationDuration: '2.2s', animationDelay: '0.6s' }} />
        <circle cx="150" cy="100" r="3" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />

        {/* Genf */}
        <circle cx="120" cy="200" r="5" fill="#3b82f6" className="animate-ping" style={{ animationDuration: '2.4s', animationDelay: '0.9s' }} />
        <circle cx="120" cy="200" r="3" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />

        {/* Lausanne */}
        <circle cx="160" cy="180" r="5" fill="#6366f1" className="animate-ping" style={{ animationDuration: '2.3s', animationDelay: '1.2s' }} />
        <circle cx="160" cy="180" r="3" fill="#ffffff" stroke="#6366f1" strokeWidth="2" />

        {/* Luzern */}
        <circle cx="200" cy="150" r="5" fill="#8b5cf6" className="animate-ping" style={{ animationDuration: '2.1s', animationDelay: '1.5s' }} />
        <circle cx="200" cy="150" r="3" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />

        {/* St. Gallen */}
        <circle cx="260" cy="130" r="4" fill="#3b82f6" className="animate-ping" style={{ animationDuration: '2.6s', animationDelay: '1.8s' }} />
        <circle cx="260" cy="130" r="3" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />

        {/* Lugano */}
        <circle cx="250" cy="210" r="4" fill="#6366f1" className="animate-ping" style={{ animationDuration: '2.2s', animationDelay: '2.1s' }} />
        <circle cx="250" cy="210" r="3" fill="#ffffff" stroke="#6366f1" strokeWidth="2" />

        {/* Connection Lines (subtle) */}
        <path
            d="M 220 120 L 180 140 L 200 150"
            stroke="#3b82f6"
            strokeWidth="1"
            strokeOpacity="0.2"
            strokeDasharray="3,3"
        />
        <path
            d="M 160 180 L 120 200"
            stroke="#6366f1"
            strokeWidth="1"
            strokeOpacity="0.2"
            strokeDasharray="3,3"
        />
    </svg>
);

const Locations: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    // Group cities by region/canton for better organization
    const majorCities = t.cities.slice(0, 8);
    const otherCities = t.cities.slice(8);

    return (
        <section ref={ref} className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold tracking-wider uppercase mb-6">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                        Schweizweit verfügbar
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        {t.title}
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Switzerland Map Illustration */}
                    <div className="mb-12 flex justify-center">
                        <div className="relative bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200 max-w-2xl w-full">
                            <div className="aspect-video w-full flex items-center justify-center">
                                <SwitzerlandMap className="w-full h-full max-h-64" />
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-sm text-slate-600 font-medium">
                                    Über <span className="font-bold text-primary-600">100 Standorte</span> in der ganzen Schweiz
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Major Cities - Featured Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
                        {majorCities.map((city: string, index: number) => (
                            <Link
                                key={index}
                                to="/services"
                                className="px-3 py-1.5 bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 rounded-lg text-slate-700 hover:text-primary-700 text-sm font-medium transition-all duration-200"
                            >
                                {city}
                            </Link>
                        ))}
                    </div>

                    {/* Other Cities - Compact Grid */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 text-center">
                            Weitere Standorte
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {otherCities.map((city: string, index: number) => (
                                <Link
                                    key={index}
                                    to="/services"
                                    className="px-3 py-1.5 bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 rounded-lg text-slate-700 hover:text-primary-700 text-sm font-medium transition-all duration-200"
                                >
                                    {city}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { value: '26', label: 'Kantone' },
                            { value: '100+', label: 'Städte' },
                            { value: '2\'500+', label: 'Partner' },
                            { value: '24/7', label: 'Verfügbar' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-4 border border-slate-200 text-center hover:border-primary-300 hover:shadow-md transition-all"
                            >
                                <div className="text-2xl font-black text-primary-600 mb-1">{stat.value}</div>
                                <div className="text-xs text-slate-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Locations;
