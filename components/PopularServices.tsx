import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon } from './icons';
import { useAppContext } from '../pages/AppContext';
import { translations } from './translations';
import { useInView } from 'react-intersection-observer';

const servicesConfig: Record<string, { image: string, stats: { partners: string, rating: string, jobs: string }, accent: string, icon: string }> = {
    umzug: {
        image: '/assets/umzug-service.png',
        stats: { partners: '250+', rating: '4.9', jobs: '5.2k' },
        accent: '#22C55E',
        icon: '🚚',
    },
    reinigung: {
        image: '/assets/reinigung-service.png',
        stats: { partners: '180+', rating: '4.8', jobs: '3.8k' },
        accent: '#22C55E',
        icon: '✨',
    },
    maler: {
        image: '/assets/maler-service-v2.png',
        stats: { partners: '150+', rating: '4.9', jobs: '2.1k' },
        accent: '#22C55E',
        icon: '🎨',
    },
    garten: {
        image: '/assets/garten-service.png',
        stats: { partners: '120+', rating: '4.7', jobs: '1.5k' },
        accent: '#22C55E',
        icon: '🌳',
    },
    handwerker: {
        image: '/assets/boden-service.png',
        stats: { partners: '200+', rating: '4.8', jobs: '4.3k' },
        accent: '#22C55E',
        icon: '🔧',
    }
};

interface Service {
    id: string;
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    image: string;
    stats: { partners: string, rating: string, jobs: string };
    features: string[];
    accent: string;
    icon: string;
}

interface ServiceCardProps {
    service: Service;
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
    const { language } = useAppContext();
    const t = translations[language];
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
                    relative h-full rounded-2xl sm:rounded-3xl overflow-hidden
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
                <div className="relative h-28 sm:h-48 lg:h-56 overflow-hidden flex-shrink-0">
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
                <div className="p-3 sm:p-6 lg:p-8 flex flex-col flex-1 min-h-0">
                    {/* Title */}
                    <h3
                        className="text-sm sm:text-xl lg:text-2xl font-black text-slate-900 mb-1 sm:mb-3 leading-tight"
                        style={{
                            color: isHovered ? service.accent : undefined,
                            transition: 'color 0.3s ease',
                        }}
                    >
                        {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-6 flex-grow line-clamp-2 sm:line-clamp-none">
                        {service.description}
                    </p>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-center pt-2 sm:pt-4 border-t-2 border-slate-100 mt-auto">
                        {/* CTA Button */}
                        <button
                            onClick={() => {
                                openQuoteModal({ service: service.name, projectTitle: service.name });
                            }}
                            className={`
                                flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl
                                font-bold text-white text-[11px] sm:text-sm w-full
                                transition-all duration-300 group/btn
                                shadow-lg hover:shadow-xl
                            `}
                            style={{
                                background: 'linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129))',
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
                            <span>{t.ctaButtonLabel}</span>
                            <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Corner Accent */}
                <div
                    className={`
                        absolute top-0 right-0 w-0 h-0
                        border-l-[30px] sm:border-l-[60px] border-l-transparent
                        border-t-[30px] sm:border-t-[60px] transition-opacity duration-500
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
            className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
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
    const { language } = useAppContext();
    const t = translations[language] || translations['de'];

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
                    relative h-full rounded-2xl sm:rounded-3xl overflow-hidden
                    bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-300
                    transition-all duration-700 flex flex-col
                    ${isHovered
                        ? 'shadow-2xl scale-[1.02] border-slate-400'
                        : 'shadow-lg scale-100'
                    }
                `}
            >
                {/* Content Section */}
                <div className="p-3 sm:p-6 lg:p-8 flex flex-col flex-1 min-h-0">
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 sm:space-y-6 py-2 sm:py-0">
                        {/* Icon */}
                        <div
                            className={`
                                w-10 h-10 sm:w-20 sm:h-20 rounded-lg sm:rounded-2xl bg-slate-300
                                flex items-center justify-center
                                text-4xl transition-all duration-500
                                ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}
                            `}
                        >
                            <svg className="w-5 h-5 sm:w-10 sm:h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                            {t.moreServicesTitle}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 text-[11px] sm:text-sm leading-relaxed max-w-xs line-clamp-2 sm:line-clamp-none">
                            {t.moreServicesRef}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto pt-2 sm:pt-4 border-t-2 border-slate-200">
                        <button
                            className={`
                                flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl
                                font-bold text-white text-[11px] sm:text-sm w-full
                                transition-all duration-300 group/btn
                                shadow-lg hover:shadow-xl
                                bg-gradient-to-r from-green-600 to-emerald-500
                            `}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            }}
                        >
                            <span>{t.popularServicesViewAll}</span>
                            <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Corner Accent */}
                <div
                    className={`
                        absolute top-0 right-0 w-0 h-0
                        border-l-[30px] sm:border-l-[60px] border-l-transparent
                        border-t-[30px] sm:border-t-[60px] transition-opacity duration-500
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
    const { language } = useAppContext();
    const t = translations[language] || translations['de'];

    // Combine translations with config
    const services: Service[] = (t.servicesList || translations['de'].servicesList).map(service => ({
        ...service,
        ...(servicesConfig[service.id] || { image: '', stats: { partners: '', rating: '', jobs: '' }, accent: '#cccccc', icon: '❓' })
    }));

    return (
        <section
            ref={ref}
            id="services"
            className="relative py-10 sm:py-28 lg:py-36 overflow-hidden bg-slate-50"
        >
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div
                    className={`
                        text-center mb-6 sm:mb-16 lg:mb-20 max-w-2xl mx-auto
                        transition-all duration-1000
                        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    `}
                >
                    {/* Title */}
                    <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 mb-3 sm:mb-4 leading-tight lg:whitespace-nowrap">
                        <span className="sm:hidden">{t.popularServicesTitlePrefix}<br /></span>
                        <span className="hidden sm:inline">{t.popularServicesTitlePrefix}{' '}</span>
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                            {t.popularServicesTitleHighlight}
                            <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                                <path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradient2)" strokeWidth="4" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="underlineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#16a34a" />
                                        <stop offset="50%" stopColor="#10b981" />
                                        <stop offset="100%" stopColor="#14b8a6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed lg:whitespace-nowrap max-w-xs sm:max-w-none mx-auto">
                        {t.popularServicesSubtitle}
                    </p>
                </div>

                {/* Services Grid */}
                <div
                    className={`
                        grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto
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
