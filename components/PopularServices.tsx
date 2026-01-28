import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon } from './icons';
import { useAppContext } from '../pages/AppContext';
import { useInView } from 'react-intersection-observer';

const services = [
    {
        id: 'umzug',
        name: 'Umzug & Transport',
        shortName: 'Umzug',
        tagline: 'Ihr neues Zuhause wartet',
        description: 'Von der Planung bis zum Auspacken – wir machen Ihren Umzug stressfrei.',
        image: '/assets/umzug-service.png',
        stats: { partners: '250+', rating: '4.9', jobs: '5.2k' },
        features: ['Verpackung', 'Transport', 'Versicherung', 'Einlagerung', 'Möbelmontage', 'Entrümpelung'],
        accent: '#22C55E',
        icon: '🚚',
    },
    {
        id: 'reinigung',
        name: 'Reinigung & Pflege',
        shortName: 'Reinigung',
        tagline: 'Glänzend sauber',
        description: 'Professionelle Reinigung für Ihr Zuhause oder Geschäft.',
        image: '/assets/reinigung-service.png',
        stats: { partners: '180+', rating: '4.8', jobs: '3.8k' },
        features: ['Umzugsreinigung', 'Büroreinigung', 'Fenster', 'Teppichreinigung', 'Grundreinigung', 'Unterhaltsreinigung'],
        accent: '#22C55E',
        icon: '✨',
    },
    {
        id: 'maler',
        name: 'Maler & Gipser',
        shortName: 'Maler',
        tagline: 'Farbe für Ihr Leben',
        description: 'Kreative Wandgestaltung und professionelle Malerarbeiten.',
        image: '/assets/maler-service-v2.png',
        stats: { partners: '150+', rating: '4.9', jobs: '2.1k' },
        features: ['Innenbereich', 'Fassaden', 'Tapezieren', 'Spachteln', 'Streichen', 'Lackieren'],
        accent: '#22C55E',
        icon: '🎨',
    },
    {
        id: 'garten',
        name: 'Garten & Landschaft',
        shortName: 'Garten',
        tagline: 'Grüne Träume',
        description: 'Professionelle Gartenpflege und Landschaftsgestaltung.',
        image: '/assets/garten-service.png',
        stats: { partners: '120+', rating: '4.7', jobs: '1.5k' },
        features: ['Rasenpflege', 'Baumschnitt', 'Gestaltung', 'Heckenschnitt', 'Bepflanzung', 'Bewässerung'],
        accent: '#22C55E',
        icon: '🌳',
    },
    {
        id: 'handwerker',
        name: 'All. Handwerker',
        shortName: 'Handwerker',
        tagline: 'Für jedes Projekt',
        description: 'Reparaturen, Montagen und Renovierungen aus einer Hand.',
        image: '/assets/boden-service.png',
        stats: { partners: '200+', rating: '4.8', jobs: '4.3k' },
        features: ['Montage', 'Reparatur', 'Renovierung', 'Installation', 'Wartung', 'Notdienst'],
        accent: '#22C55E',
        icon: '🔧',
    },
];

interface ServiceCardProps {
    service: typeof services[0];
    index: number;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
    service, 
    index, 
    isHovered, 
    onMouseEnter, 
    onMouseLeave 
}) => {
    const { openQuoteModal } = useAppContext();
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={cardRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative h-full"
            style={{
                transitionDelay: `${index * 100}ms`,
            }}
        >
            {/* Main Card - Split Design */}
            <div
                className={`
                    relative h-full rounded-3xl overflow-hidden
                    bg-white transition-all duration-700 flex flex-col
                    ${isHovered 
                        ? 'shadow-2xl scale-[1.02]' 
                        : 'shadow-lg scale-100'
                    }
                `}
                style={{
                    boxShadow: isHovered
                        ? `0 30px 100px -20px ${service.accent}30, 0 0 0 2px ${service.accent}20`
                        : '0 10px 40px -10px rgba(0,0,0,0.1)',
                }}
            >
                {/* Top Image Section */}
                <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden flex-shrink-0">
                    <div
                        className={`
                            absolute inset-0 transition-transform duration-700
                            ${isHovered ? 'scale-110' : 'scale-100'}
                        `}
                    >
                        <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 lg:p-8 flex flex-col flex-1 min-h-0">
                    {/* Title */}
                    <h3 
                        className="text-xl lg:text-2xl font-black text-slate-900 mb-3 leading-tight"
                        style={{
                            color: isHovered ? service.accent : undefined,
                            transition: 'color 0.3s ease',
                        }}
                    >
                        {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                        {service.description}
                    </p>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-center pt-4 border-t-2 border-slate-100 mt-auto">
                        {/* CTA Button */}
                        <button
                            onClick={() => {
                                openQuoteModal({ service: service.name, projectTitle: service.name });
                            }}
                            className={`
                                flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                                font-bold text-white text-sm w-full
                                transition-all duration-300 group/btn
                                shadow-lg hover:shadow-xl
                            `}
                            style={{ 
                                backgroundColor: service.accent,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                                e.currentTarget.style.boxShadow = `0 15px 30px -10px ${service.accent}60`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0,0,0,0.2)';
                            }}
                        >
                            <span>Offerten</span>
                            <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Corner Accent */}
                <div
                    className={`
                        absolute top-0 right-0 w-0 h-0
                        border-l-[60px] border-l-transparent
                        border-t-[60px] transition-opacity duration-500
                        ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{
                        borderTopColor: service.accent,
                    }}
                />
            </div>
        </div>
    );
};

// CTA Button Component
const CTAButton: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    
    return (
        <button
            onClick={() => {
                openQuoteModal({});
            }}
            className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
        >
            <span>Jetzt Offerten anfordern</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
    );
};

// Additional Services Card Component
const MoreServicesCard: React.FC<{
    index: number;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ index, isHovered, onMouseEnter, onMouseLeave }) => {
    const navigate = useNavigate();

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => navigate('/services')}
            className="group relative h-full cursor-pointer"
            style={{
                transitionDelay: `${index * 100}ms`,
            }}
        >
            <div
                className={`
                    relative h-full rounded-3xl overflow-hidden
                    bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-300
                    transition-all duration-700 flex flex-col
                    ${isHovered 
                        ? 'shadow-2xl scale-[1.02] border-slate-400' 
                        : 'shadow-lg scale-100'
                    }
                `}
            >
                {/* Content Section */}
                <div className="p-6 lg:p-8 flex flex-col flex-1 min-h-0">
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                        {/* Icon */}
                        <div
                            className={`
                                w-20 h-20 rounded-2xl bg-slate-300
                                flex items-center justify-center
                                text-4xl transition-all duration-500
                                ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}
                            `}
                        >
                            <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                            Weitere Dienstleistungen
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                            Entdecken Sie alle unsere Service-Kategorien und finden Sie den perfekten Partner für Ihr Projekt.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto pt-4 border-t-2 border-slate-200">
                        <button
                            className={`
                                flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                                font-bold text-white text-sm w-full
                                transition-all duration-300 group/btn
                                shadow-lg hover:shadow-xl
                                bg-gradient-to-r from-slate-700 to-slate-900
                            `}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            }}
                        >
                            <span>Alle Services ansehen</span>
                            <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Corner Accent */}
                <div
                    className={`
                        absolute top-0 right-0 w-0 h-0
                        border-l-[60px] border-l-transparent
                        border-t-[60px] transition-opacity duration-500
                        ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{
                        borderTopColor: '#475569',
                    }}
                />
            </div>
        </div>
    );
};

const PopularServices: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section
            ref={ref}
            id="services"
            className="relative py-16 sm:py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
        >
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 1px 1px, #000 1px, transparent 0)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                {/* Header */}
                <div
                    className={`
                        text-center mb-12 lg:mb-16 max-w-2xl mx-auto
                        transition-all duration-1000
                        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    `}
                >
                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 mb-4">
                        Was dürfen wir{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                            für Sie tun?
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                        Über 2'500 geprüfte Partner stehen bereit, um Ihr Projekt zu realisieren.
                    </p>
                </div>

                {/* Services Grid */}
                <div
                    className={`
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 max-w-5xl mx-auto
                        items-stretch
                        transition-all duration-1000
                        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    `}
                >
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                            isHovered={hoveredIndex === index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        />
                    ))}
                    {/* More Services Card */}
                    <MoreServicesCard
                        index={services.length}
                        isHovered={hoveredIndex === services.length}
                        onMouseEnter={() => setHoveredIndex(services.length)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    />
                </div>


            </div>
        </section>
    );
};

export default PopularServices;
