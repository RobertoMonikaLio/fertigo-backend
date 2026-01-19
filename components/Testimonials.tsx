import React, { useState, useEffect, useRef } from 'react';
import { StarIcon, ShieldCheckIcon, QuoteIcon, MapPinIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from './icons';
import { useAppContext } from '../pages/AppContext';
import { useInView } from 'react-intersection-observer';

export interface TestimonialData {
    name: string;
    location: string;
    review: string;
    rating: number;
    image?: string;
    role?: string;
}

const translations = {
    de: {
        defaultTitle: "Das sagen unsere Kunden",
        defaultSubtitle: "Echte Erfahrungen. Echte Projekte.",
        verified: "Verifiziertes Projekt",
        next: "Nächste Bewertung",
        prev: "Vorherige Bewertung"
    },
    fr: {
        defaultTitle: "Ce que disent nos clients",
        defaultSubtitle: "Expériences réelles. Projets réels.",
        verified: "Projet vérifié",
        next: "Avis suivant",
        prev: "Avis précédent"
    },
    it: {
        defaultTitle: "Cosa dicono i nostri clienti",
        defaultSubtitle: "Esperienze reali. Progetti reali.",
        verified: "Progetto verificato",
        next: "Recensione successiva",
        prev: "Recensione precedente"
    },
    en: {
        defaultTitle: "What our customers say",
        defaultSubtitle: "Real experiences. Real projects.",
        verified: "Verified Project",
        next: "Next review",
        prev: "Previous review"
    }
};

const defaultTestimonials: TestimonialData[] = [
    {
        name: 'Sarah Keller',
        location: 'Zürich',
        role: 'Privatperson',
        review: 'Ich war überwältigt von der Professionalität. Innerhalb von 3 Stunden hatte ich 6 Angebote und der Umzug lief absolut reibungslos.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop'
    },
    {
        name: 'Michael Roth',
        location: 'Basel',
        role: 'Eigenheimbesitzer',
        review: 'Die Sanierung meiner Wohnung war dank Fertigo ein voller Erfolg. Qualität und Preis waren perfekt abgestimmt.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1581094794329-cd56b5095bb4?q=80&w=2668&auto=format&fit=crop'
    },
    {
        name: 'Lisa Meyer',
        location: 'Bern',
        role: 'Praxisinhaberin',
        review: 'Super zuverlässig. Ich habe eine Reinigungsfirma für meine Praxis gesucht und wurde sofort fündig. Top Service!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop'
    },
    {
        name: 'Familie Baumann',
        location: 'Winterthur',
        role: 'Familie',
        review: 'Unsere neue Küche ist ein Traum! Von der Planung bis zur Montage lief alles reibungslos und professionell.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2670&auto=format&fit=crop'
    },
    {
        name: 'Reto B.',
        location: 'Luzern',
        role: 'Vermieter',
        review: 'Der Parkettboden sieht fantastisch aus. Super Beratung bei der Materialauswahl und eine sehr saubere Ausführung.',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=2574&auto=format&fit=crop'
    },
    {
        name: 'Thomas F.',
        location: 'Genf',
        role: 'Gartenbesitzer',
        review: 'Unser Garten wurde in eine Oase verwandelt. Das Team war pünktlich, kompetent und hat unsere Erwartungen weit übertroffen.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2670&auto=format&fit=crop'
    }
];

interface TestimonialsProps {
    bgColor?: string;
    testimonials?: TestimonialData[];
    title?: string;
    subtitle?: string;
    showSocialProof?: boolean;
}

// Kompakte Karte für horizontale Anordnung
const InlineCard: React.FC<{ 
    testimonial: TestimonialData; 
    index: number;
    inView: boolean;
}> = ({ testimonial, index, inView }) => {
    return (
        <div 
            className={`flex-shrink-0 w-full md:w-96 bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {/* Review Text */}
            <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed mb-6 min-h-[80px]">
                "{testimonial.review}"
            </p>
            
            {/* Rating - Als Text */}
            <div className="mb-4">
                <div className="text-xl text-yellow-500 mb-1">
                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                </div>
                <span className="text-sm font-black text-slate-600">{testimonial.rating}.0</span>
            </div>
            
            {/* Autor Name */}
            <div className="pt-4 border-t border-slate-100">
                <div className="font-black text-slate-900 text-sm">{testimonial.name}</div>
            </div>
        </div>
    );
};

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
        rootMargin: '0px 0px -50px 0px',
    });

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    return (
        <section ref={ref} className={`${bgColor} py-20 sm:py-24 md:py-32 overflow-hidden relative`}>
            {/* Hintergrund */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-50/30 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-black uppercase tracking-wider mb-6">
                        <StarIcon className="w-4 h-4 text-primary-600" />
                        <span>KUNDENBEWERTUNGEN</span>
                    </div>
                    <h2 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                        {title || t.defaultTitle}
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        {subtitle || t.defaultSubtitle}
                    </p>
                </div>

                {/* Horizontale Scroll-Container mit Navigation */}
                <div className="relative mb-16">
                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-2xl border border-slate-200 flex items-center justify-center hover:bg-primary-50 transition-all hover:scale-110 hidden md:flex"
                        aria-label={t.prev}
                    >
                        <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-2xl border border-slate-200 flex items-center justify-center hover:bg-primary-50 transition-all hover:scale-110 hidden md:flex"
                        aria-label={t.next}
                    >
                        <ChevronRightIcon className="w-6 h-6 text-slate-700" />
                    </button>

                    {/* Scroll Container */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <InlineCard
                                key={index}
                                testimonial={testimonial}
                                index={index}
                                inView={inView}
                            />
                        ))}
                    </div>
                </div>

            </div>

            {/* CSS für scrollbar-hide */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
