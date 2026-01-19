import React, { useState, useEffect } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from './icons';
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
        defaultSubtitle: "Echte Erfahrungen von echten Menschen",
        verified: "Verifiziert",
    },
    fr: {
        defaultTitle: "Ce que disent nos clients",
        defaultSubtitle: "Expériences réelles de vraies personnes",
        verified: "Vérifié",
    },
    it: {
        defaultTitle: "Cosa dicono i nostri clienti",
        defaultSubtitle: "Esperienze reali da persone reali",
        verified: "Verificato",
    },
    en: {
        defaultTitle: "What our customers say",
        defaultSubtitle: "Real experiences from real people",
        verified: "Verified",
    }
};

const defaultTestimonials: TestimonialData[] = [
    {
        name: 'Sarah Keller',
        location: 'Zürich',
        role: 'Privatperson',
        review: 'Ich war überwältigt von der Professionalität. Innerhalb von 3 Stunden hatte ich 6 Angebote und der Umzug lief absolut reibungslos.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
    },
    {
        name: 'Michael Roth',
        location: 'Basel',
        role: 'Eigenheimbesitzer',
        review: 'Die Sanierung meiner Wohnung war dank Fertigo ein voller Erfolg. Qualität und Preis waren perfekt abgestimmt.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
        name: 'Lisa Meyer',
        location: 'Bern',
        role: 'Praxisinhaberin',
        review: 'Super zuverlässig. Ich habe eine Reinigungsfirma für meine Praxis gesucht und wurde sofort fündig. Top Service!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
    },
    {
        name: 'Familie Baumann',
        location: 'Winterthur',
        role: 'Familie',
        review: 'Unsere neue Küche ist ein Traum! Von der Planung bis zur Montage lief alles reibungslos und professionell.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
    },
    {
        name: 'Reto B.',
        location: 'Luzern',
        role: 'Vermieter',
        review: 'Der Parkettboden sieht fantastisch aus. Super Beratung bei der Materialauswahl und eine sehr saubere Ausführung.',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    },
    {
        name: 'Thomas F.',
        location: 'Genf',
        role: 'Gartenbesitzer',
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
    showSocialProof?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({
    bgColor = 'bg-white',
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

    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    const goToPrev = () => {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section ref={ref} className={`${bgColor} py-16 sm:py-20 overflow-hidden relative`}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-50/40 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className={`text-center mb-12 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
                        Kundenstimmen
                    </span>
                    <h2 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        {title || t.defaultTitle}
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                        {subtitle || t.defaultSubtitle}
                    </p>
                </div>

                <div className={`transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
                        <QuoteIcon className="absolute top-6 left-6 w-12 h-12 text-primary-200 opacity-50" />
                        
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-shrink-0">
                                    <div className="relative">
                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-primary-100 shadow-lg">
                                            <img
                                                src={activeTestimonial.image}
                                                alt={activeTestimonial.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {t.verified}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className={`w-5 h-5 ${i < activeTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
                                            />
                                        ))}
                                    </div>

                                    <blockquote className="text-lg md:text-xl lg:text-2xl text-slate-700 font-medium leading-relaxed mb-6">
                                        "{activeTestimonial.review}"
                                    </blockquote>

                                    <div>
                                        <div className="font-bold text-slate-900 text-lg">{activeTestimonial.name}</div>
                                        <div className="text-slate-500 text-sm">
                                            {activeTestimonial.role} · {activeTestimonial.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                            <div className="flex gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setIsAutoPlaying(false);
                                            setActiveIndex(index);
                                        }}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                            index === activeIndex
                                                ? 'bg-primary-600 w-8'
                                                : 'bg-slate-300 hover:bg-slate-400'
                                        }`}
                                        aria-label={`Gehe zu Bewertung ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={goToPrev}
                                    className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-all shadow-sm"
                                    aria-label="Vorherige Bewertung"
                                >
                                    <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-all shadow-sm"
                                    aria-label="Nächste Bewertung"
                                >
                                    <ChevronRightIcon className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:grid grid-cols-6 gap-3 mt-6">
                        {testimonials.map((testimonial, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setIsAutoPlaying(false);
                                    setActiveIndex(index);
                                }}
                                className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                                    index === activeIndex
                                        ? 'ring-2 ring-primary-500 ring-offset-2 scale-105'
                                        : 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
                                }`}
                            >
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-full aspect-square object-cover"
                                />
                                {index === activeIndex && (
                                    <div className="absolute inset-0 bg-primary-500/20"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`mt-12 grid grid-cols-3 gap-4 transition-all duration-1000 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="text-center p-4 rounded-2xl bg-slate-50">
                        <div className="text-2xl md:text-3xl font-black text-primary-600">4.9</div>
                        <div className="flex justify-center gap-0.5 my-1">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            ))}
                        </div>
                        <div className="text-xs text-slate-500">Durchschnitt</div>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-slate-50">
                        <div className="text-2xl md:text-3xl font-black text-primary-600">2'500+</div>
                        <div className="text-xs text-slate-500 mt-1">Bewertungen</div>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-slate-50">
                        <div className="text-2xl md:text-3xl font-black text-primary-600">98%</div>
                        <div className="text-xs text-slate-500 mt-1">Zufriedenheit</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
