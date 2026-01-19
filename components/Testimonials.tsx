import React, { useState, useRef, useEffect } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import { useAppContext } from '../pages/AppContext';
import { useInView } from 'react-intersection-observer';

export interface TestimonialData {
    name: string;
    location: string;
    review: string;
    rating: number;
    image?: string;
    role?: string;
    service?: string;
}

const translations = {
    de: {
        defaultTitle: "Das sagen unsere Kunden",
        defaultSubtitle: "Über 2'500 zufriedene Kunden vertrauen Fertigo",
        verified: "Verifiziert",
    },
    fr: {
        defaultTitle: "Ce que disent nos clients",
        defaultSubtitle: "Plus de 2'500 clients satisfaits font confiance à Fertigo",
        verified: "Vérifié",
    },
    it: {
        defaultTitle: "Cosa dicono i nostri clienti",
        defaultSubtitle: "Oltre 2'500 clienti soddisfatti si fidano di Fertigo",
        verified: "Verificato",
    },
    en: {
        defaultTitle: "What our customers say",
        defaultSubtitle: "Over 2'500 satisfied customers trust Fertigo",
        verified: "Verified",
    }
};

const defaultTestimonials: TestimonialData[] = [
    {
        name: 'Sarah Keller',
        location: 'Zürich',
        role: 'Privatperson',
        service: 'Umzug',
        review: 'Ich war überwältigt von der Professionalität. Innerhalb von 3 Stunden hatte ich 6 Angebote und der Umzug lief absolut reibungslos.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
    },
    {
        name: 'Michael Roth',
        location: 'Basel',
        role: 'Eigenheimbesitzer',
        service: 'Sanierung',
        review: 'Die Sanierung meiner Wohnung war dank Fertigo ein voller Erfolg. Qualität und Preis waren perfekt abgestimmt.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
        name: 'Lisa Meyer',
        location: 'Bern',
        role: 'Praxisinhaberin',
        service: 'Reinigung',
        review: 'Super zuverlässig. Ich habe eine Reinigungsfirma für meine Praxis gesucht und wurde sofort fündig. Top Service!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
    },
    {
        name: 'Familie Baumann',
        location: 'Winterthur',
        role: 'Familie',
        service: 'Küchenbau',
        review: 'Unsere neue Küche ist ein Traum! Von der Planung bis zur Montage lief alles reibungslos und professionell.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
    },
    {
        name: 'Reto B.',
        location: 'Luzern',
        role: 'Vermieter',
        service: 'Bodenleger',
        review: 'Der Parkettboden sieht fantastisch aus. Super Beratung bei der Materialauswahl und eine sehr saubere Ausführung.',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    },
    {
        name: 'Thomas F.',
        location: 'Genf',
        role: 'Gartenbesitzer',
        service: 'Gartenbau',
        review: 'Unser Garten wurde in eine Oase verwandelt. Das Team war pünktlich, kompetent und hat unsere Erwartungen weit übertroffen.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop'
    }
];

interface TestimonialsProps {
    bgColor?: string;
    testimonials?: TestimonialData[];
    title?: string;
    subtitle?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({
    bgColor = 'bg-slate-50',
    testimonials = defaultTestimonials,
    title,
    subtitle,
}) => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            return () => el.removeEventListener('scroll', checkScroll);
        }
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 340;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section ref={ref} className={`${bgColor} py-16 sm:py-20 overflow-hidden`}>
            <div className="container mx-auto px-6 max-w-7xl">
                <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div>
                        <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                            {title || t.defaultTitle}
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 max-w-xl">
                            {subtitle || t.defaultSubtitle}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {testimonials.slice(0, 4).map((t, i) => (
                                    <img
                                        key={i}
                                        src={t.image}
                                        alt=""
                                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                    />
                                ))}
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-slate-900">4.9</span>
                                <span className="text-slate-500"> von 5</span>
                            </div>
                        </div>
                        
                        <div className="hidden sm:flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                                    canScrollLeft 
                                        ? 'border-slate-300 hover:border-primary-500 hover:bg-primary-50 text-slate-600 hover:text-primary-600' 
                                        : 'border-slate-200 text-slate-300 cursor-not-allowed'
                                }`}
                            >
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                                    canScrollRight 
                                        ? 'border-slate-300 hover:border-primary-500 hover:bg-primary-50 text-slate-600 hover:text-primary-600' 
                                        : 'border-slate-200 text-slate-300 cursor-not-allowed'
                                }`}
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div 
                    ref={scrollRef}
                    className={`flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[320px] snap-start"
                        >
                            <div className="h-full bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">{testimonial.name}</div>
                                            <div className="text-xs text-slate-500">{testimonial.location}</div>
                                        </div>
                                    </div>
                                    {testimonial.service && (
                                        <span className="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                                            {testimonial.service}
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-0.5 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                                    "{testimonial.review}"
                                </p>

                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs text-slate-400">{testimonial.role}</span>
                                    <div className="flex items-center gap-1 text-xs text-green-600">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {t.verified}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 transition-all duration-1000 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                            <div className="text-sm text-slate-500">Bewertung</div>
                        </div>
                    </div>
                    
                    <div className="w-px h-10 bg-slate-200 hidden md:block"></div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">2'500+</div>
                            <div className="text-sm text-slate-500">Zufriedene Kunden</div>
                        </div>
                    </div>
                    
                    <div className="w-px h-10 bg-slate-200 hidden md:block"></div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900">100%</div>
                            <div className="text-sm text-slate-500">Geprüfte Anbieter</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
