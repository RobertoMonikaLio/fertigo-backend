import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, ColoredTruckIcon, ColoredSparklesIcon, ColoredPaintRollerIcon, ColoredGardenIcon, ColoredWrenchScrewdriverIcon } from './icons';
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

const iconMap: Record<string, { emoji: string, bg: string }> = {
    'umzug': { emoji: '🚚', bg: 'bg-blue-50 border-blue-100' },
    'reinigung': { emoji: '✨', bg: 'bg-emerald-50 border-emerald-100' },
    'maler': { emoji: '🎨', bg: 'bg-amber-50 border-amber-100' },
    'garten': { emoji: '🌳', bg: 'bg-green-50 border-green-100' },
    'handwerker': { emoji: '🔧', bg: 'bg-slate-50 border-slate-100' },
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
    const iconData = iconMap[service.id] || { emoji: '🛠️', bg: 'bg-slate-50 border-slate-100' };

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
            {/* Main Card */}
            <div
                className={`
                    relative h-full rounded-2xl sm:rounded-[32px] overflow-hidden
                    bg-white transition-all duration-500 flex flex-col border border-slate-100
                    ${isHovered
                        ? 'shadow-2xl shadow-slate-200 -translate-y-2'
                        : 'shadow-lg shadow-slate-200/50 translate-y-0'
                    }
                `}
            >
                {/* Top Image Section */}
                <div className="relative h-32 sm:h-52 lg:h-60 overflow-hidden flex-shrink-0">
                    <div
                        className={`
                            absolute inset-0 transition-transform duration-1000
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
                <div className="p-4 sm:p-7 lg:p-9 flex flex-col flex-1 min-h-0">
                    {/* Title */}
                    <div className="mb-2 sm:mb-4">
                        <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                            {service.name}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 flex-grow line-clamp-2 sm:line-clamp-none font-medium opacity-80">
                        {service.description}
                    </p>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-center pt-4 sm:pt-6 border-t border-slate-100 mt-auto">
                        {/* CTA Button */}
                        <button
                            onClick={() => {
                                openQuoteModal({ service: service.name, projectTitle: service.name });
                            }}
                            className={`
                                flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl
                                font-black text-white text-sm sm:text-base w-full
                                transition-all duration-300 group/btn
                                bg-green-600 hover:bg-green-700
                                shadow-xl shadow-green-600/10 hover:shadow-green-600/20
                            `}
                        >
                            <span>{t.ctaButtonLabel}</span>
                            <ArrowRightIcon className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
                        </button>
                    </div>
                </div>
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
            className="px-8 py-4 rounded-2xl font-black text-white bg-slate-900 hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 group text-lg"
        >
            <span>Jetzt Offerten anfordern</span>
            <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
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
                    relative h-full rounded-2xl sm:rounded-[32px] overflow-hidden
                    bg-slate-50 border-2 border-dashed border-slate-200
                    transition-all duration-500 flex flex-col
                    ${isHovered
                        ? 'shadow-2xl shadow-slate-200 -translate-y-2 border-slate-300'
                        : 'shadow-lg shadow-slate-200/50 translate-y-0'
                    }
                `}
            >
                {/* Content Section */}
                <div className="p-4 sm:p-7 lg:p-9 flex flex-col flex-1 min-h-0">
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-8 py-4 sm:py-0">
                        {/* Icon */}
                        <div
                            className={`
                                w-12 h-12 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200
                                flex items-center justify-center
                                text-4xl transition-all duration-500 shadow-sm
                                ${isHovered ? 'scale-110 rotate-6 shadow-md' : 'scale-100 rotate-0'}
                            `}
                        >
                            <svg className="w-6 h-6 sm:w-10 sm:h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                            {t.moreServicesTitle}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xs font-medium opacity-80 line-clamp-2 sm:line-clamp-none">
                            {t.moreServicesRef}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto pt-4 sm:pt-6">
                        <button
                            className={`
                                flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl
                                font-black text-slate-700 text-sm sm:text-base w-full
                                transition-all duration-300 group/btn
                                bg-white border border-slate-200 hover:border-slate-300
                                shadow-lg shadow-slate-200/50 hover:shadow-xl
                            `}
                        >
                            <span>{t.popularServicesViewAll}</span>
                            <ArrowRightIcon className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
                        </button>
                    </div>
                </div>
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
            className="relative py-14 sm:py-32 lg:py-40 overflow-hidden bg-white"
        >
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div
                    className={`
                        text-center mb-8 sm:mb-20 lg:mb-24 max-w-3xl mx-auto
                        transition-all duration-1000
                        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    `}
                >
                    {/* Title */}
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
                        <span className="sm:hidden">{t.popularServicesTitlePrefix}<br /></span>
                        <span className="hidden sm:inline">{t.popularServicesTitlePrefix}{' '}</span>
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                            {t.popularServicesTitleHighlight}
                            <svg className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-3 sm:h-4" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                                <path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradient2)" strokeWidth="6" strokeLinecap="round" />
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
                    <p className="text-sm sm:text-xl lg:text-2xl text-slate-500 font-medium opacity-80 max-w-md sm:max-w-2xl mx-auto">
                        {t.popularServicesSubtitle}
                    </p>
                </div>

                {/* Services Grid */}
                <div
                    className={`
                        grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto
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
