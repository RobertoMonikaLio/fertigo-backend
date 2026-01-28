import React, { useRef, useState, useEffect } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import { useAppContext } from '../pages/AppContext';
import { useInView } from 'react-intersection-observer';

export interface TestimonialData {
    name: string;
    location: string;
    review: string;
    rating: number;
    role?: string;
    service?: string;
    initials?: string;
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

const avatarColors = [
    'bg-primary-500',
    'bg-emerald-500',
    'bg-violet-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-cyan-500',
];

const defaultTestimonials: TestimonialData[] = [
    {
        name: 'Sarah Keller',
        location: 'Zürich',
        role: 'Privatperson',
        service: 'Umzug',
        review: 'Ich war überwältigt von der Professionalität. Innerhalb von 3 Stunden hatte ich 6 Angebote und der Umzug lief absolut reibungslos.',
        rating: 5,
    },
    {
        name: 'Michael Roth',
        location: 'Basel',
        role: 'Eigenheimbesitzer',
        service: 'Sanierung',
        review: 'Die Sanierung meiner Wohnung war dank Fertigo ein voller Erfolg. Qualität und Preis waren perfekt abgestimmt.',
        rating: 5,
    },
    {
        name: 'Lisa Meyer',
        location: 'Bern',
        role: 'Praxisinhaberin',
        service: 'Reinigung',
        review: 'Super zuverlässig. Ich habe eine Reinigungsfirma für meine Praxis gesucht und wurde sofort fündig. Top Service!',
        rating: 5,
    },
    {
        name: 'Familie Baumann',
        location: 'Winterthur',
        role: 'Familie',
        service: 'Küchenbau',
        review: 'Unsere neue Küche ist ein Traum! Von der Planung bis zur Montage lief alles reibungslos und professionell.',
        rating: 5,
    },
    {
        name: 'Reto B.',
        location: 'Luzern',
        role: 'Vermieter',
        service: 'Bodenleger',
        review: 'Der Parkettboden sieht fantastisch aus. Super Beratung bei der Materialauswahl und eine sehr saubere Ausführung.',
        rating: 4,
    },
    {
        name: 'Thomas F.',
        location: 'Genf',
        role: 'Gartenbesitzer',
        service: 'Gartenbau',
        review: 'Unser Garten wurde in eine Oase verwandelt. Das Team war pünktlich, kompetent und hat unsere Erwartungen weit übertroffen.',
        rating: 5,
    }
];

const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

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

    const items = testimonials.slice(0, 6);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (items.length <= 1) return;
        const id = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 7000);
        return () => clearInterval(id);
    }, [items.length]);

    const active = items[activeIndex];

    return (
        <section ref={ref} className={`${bgColor} py-16 sm:py-20 overflow-hidden`}>
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Header */}
                <div className={`mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 mb-4">
                            {title ? (
                                title
                            ) : (
                                <>
                                    Das sagen unsere{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                                        Kunden
                                    </span>
                                </>
                            )}
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                            {subtitle || t.defaultSubtitle}
                        </p>
                    </div>
                </div>

                {/* Haupt-Testimonial als Slider */}
                {active && (
                    <div className={`relative mb-8 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-100/60 via-white to-emerald-50/60 blur-sm opacity-70" />
                        <div className="relative bg-white rounded-3xl px-6 sm:px-8 py-7 shadow-xl border border-slate-100">
                            <div className="flex items-center justify-between gap-4 mb-5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${avatarColors[activeIndex % avatarColors.length]} flex items-center justify-center text-white font-semibold text-sm`}>
                                        {getInitials(active.name)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900 text-sm sm:text-base">
                                            {active.name}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {[active.role, active.location].filter(Boolean).join(' · ')}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < active.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-semibold text-slate-700">4.9/5</span>
                                </div>
                            </div>

                            <p className="text-slate-800 text-base sm:text-lg leading-relaxed mb-5">
                                “{active.review}”
                            </p>

                            <div className="flex items-center justify-between gap-3 text-[11px]">
                                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {t.verified}
                                </span>
                                {active.service && (
                                    <span className="ml-auto px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200 font-medium">
                                        {active.service}
                                    </span>
                                )}
                            </div>

                            {/* Navigation */}
                            {items.length > 1 && (
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        {items.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveIndex(i)}
                                                className={`h-1.5 rounded-full transition-all duration-200 ${
                                                    i === activeIndex ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-200'
                                                }`}
                                                aria-label={`Testimonial ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="hidden sm:flex gap-2">
                                        <button
                                            onClick={() =>
                                                setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
                                            }
                                            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                                            aria-label="Vorherige Bewertung"
                                        >
                                            <ChevronLeftIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setActiveIndex((prev) => (prev + 1) % items.length)
                                            }
                                            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                                            aria-label="Nächste Bewertung"
                                        >
                                            <ChevronRightIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Kleine „Social Proof“-Karten darunter */}
                {items.length > 1 && (
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 delay-150 ${
                            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    >
                        {items
                            .filter((_, i) => i !== activeIndex)
                            .slice(0, 3)
                            .map((testimonial, index) => (
                                <div
                                    key={testimonial.name + index}
                                    className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-200 flex flex-col h-full"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div
                                            className={`w-8 h-8 rounded-full ${
                                                avatarColors[(activeIndex + index + 1) % avatarColors.length]
                                            } flex items-center justify-center text-white font-semibold text-[11px]`}
                                        >
                                            {getInitials(testimonial.name)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-slate-900 text-sm truncate">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-[11px] text-slate-500 truncate">
                                                {[testimonial.role, testimonial.location].filter(Boolean).join(' · ')}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-700 leading-relaxed mb-3 line-clamp-3">
                                        “{testimonial.review}”
                                    </p>
                                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-100">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    className={`w-3 h-3 ${
                                                        i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[11px] text-slate-400">{t.verified}</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
