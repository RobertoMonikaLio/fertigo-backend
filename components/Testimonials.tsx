import React from 'react';
import { StarIcon } from './icons';
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
    },
    {
        name: 'Andrea Müller',
        location: 'St. Gallen',
        role: 'Büroleitung',
        service: 'Elektriker',
        review: 'Schnelle Reaktion und faire Preise. Der Elektriker hat unsere Beleuchtung fachgerecht installiert – sehr empfehlenswert!',
        rating: 5,
    },
    {
        name: 'Peter Wyss',
        location: 'Aarau',
        role: 'Hausbesitzer',
        service: 'Malerarbeiten',
        review: 'Die Malerarbeiten wurden termingerecht und sauber erledigt. Tolle Farbberatung und faire Kostenvoranschläge.',
        rating: 5,
    },
    {
        name: 'Claudia Steiner',
        location: 'Lugano',
        role: 'Restaurantbesitzerin',
        service: 'Küchenmontage',
        review: 'Professionelle Küche für unser Restaurant – von der Planung bis zur Abnahme alles perfekt. Fertigo hat uns den richtigen Partner vermittelt.',
        rating: 5,
    },
    {
        name: 'Markus Jäger',
        location: 'Biel',
        role: 'Vermieter',
        service: 'Badezimmerumbau',
        review: 'Zwei Bäder saniert, pünktlich und innerhalb des Budgets. Die Handwerker waren zuverlässig und die Qualität stimmt.',
        rating: 5,
    },
    {
        name: 'Simone Brunner',
        location: 'Chur',
        role: 'Privatperson',
        service: 'Fensterreinigung',
        review: 'Endlich eine Plattform, die hält, was sie verspricht. Die Fensterreinigung wurde zuverlässig durchgeführt – gerne wieder!',
        rating: 5,
    },
    {
        name: 'Daniel Koller',
        location: 'Schaffhausen',
        role: 'Geschäftsführer',
        service: 'Gebäudereinigung',
        review: 'Für unser Bürogebäude suchen wir regelmässig Reinigungspersonal. Über Fertigo haben wir einen super Partner gefunden.',
        rating: 4,
    },
    {
        name: 'Nadia Fontana',
        location: 'Lausanne',
        role: 'Architektin',
        service: 'Innenausbau',
        review: 'Als Architektin schätze ich qualifizierte Handwerker. Fertigo liefert passende Kontakte – die Zusammenarbeit war reibungslos.',
        rating: 5,
    },
    {
        name: 'Urs Meier',
        location: 'Solothurn',
        role: 'Hausbesitzer',
        service: 'Heizungsinstallation',
        review: 'Neue Heizung einbauen lassen – von der Beratung bis zur Inbetriebnahme alles top. Preis-Leistung stimmt.',
        rating: 5,
    },
    {
        name: 'Elena Weber',
        location: 'Thun',
        role: 'Privatperson',
        service: 'Umzugsreinigung',
        review: 'Nach unserem Umzug die alte Wohnung professionell reinigen lassen. Schnell organisiert und sehr gründlich erledigt.',
        rating: 5,
    },
    {
        name: 'Hans-Peter Graf',
        location: 'Zug',
        role: 'Unternehmer',
        service: 'Bürorenovation',
        review: 'Unser Büro wurde pünktlich und sauber renoviert. Die Koordination über Fertigo hat perfekt funktioniert.',
        rating: 5,
    },
    {
        name: 'Monika Fischer',
        location: 'Frauenfeld',
        role: 'Hausbesitzerin',
        service: 'Dachdecker',
        review: 'Dachreparatur nach Sturmschaden – schnell vermittelt und professionell ausgeführt. Sehr zufrieden!',
        rating: 5,
    },
    {
        name: 'René Lüthi',
        location: 'Neuenburg',
        role: 'Vermieter',
        service: 'Gipserarbeiten',
        review: 'Mehrere Wohnungen verputzen lassen. Gute Handwerker, faire Preise und termingerechte Ausführung.',
        rating: 4,
    },
    {
        name: 'Sabine Hofmann',
        location: 'Köniz',
        role: 'Privatperson',
        service: 'Möbeltransport',
        review: 'Klavier umziehen lassen – vorsichtig und zuverlässig. Würde Fertigo jederzeit weiterempfehlen.',
        rating: 5,
    },
    {
        name: 'Philipp Zaugg',
        location: 'Baden',
        role: 'Eigenheimbesitzer',
        service: 'Sanitär',
        review: 'Neues Badezimmer geplant und umgesetzt. Von der ersten Anfrage bis zur Fertigstellung alles top.',
        rating: 5,
    },
    {
        name: 'Veronika Marti',
        location: 'Fribourg',
        role: 'Gastronomin',
        service: 'Küchenreinigung',
        review: 'Regelmässige professionelle Küchenreinigung für unser Restaurant. Immer pünktlich und gründlich.',
        rating: 5,
    },
    {
        name: 'Stefan Zimmermann',
        location: 'Rapperswil',
        role: 'Hausbesitzer',
        service: 'Zaunbau',
        review: 'Gartenzaun neu errichten lassen – solide Arbeit und faire Absprachen. Gerne wieder über Fertigo.',
        rating: 5,
    },
    {
        name: 'Laura Bertolini',
        location: 'Bellinzona',
        role: 'Privatperson',
        service: 'Malerarbeiten',
        review: 'Wohnung streichen lassen vor dem Einzug. Schnelle Vermittlung und sehr nette Maler. Danke!',
        rating: 5,
    },
    {
        name: 'Martin Egli',
        location: 'Olten',
        role: 'Geschäftsinhaber',
        service: 'Baureinigung',
        review: 'Nach dem Umbau die Baureinigung über Fertigo gebucht. Alles blitzblank – sehr empfehlenswert.',
        rating: 5,
    },
    {
        name: 'Katharina Rüegg',
        location: 'Wil SG',
        role: 'Privatperson',
        service: 'Umzug',
        review: 'Unser zweiter Umzug über Fertigo. Wieder reibungslos – von der Anfrage bis zum letzten Karton.',
        rating: 5,
    },
    {
        name: 'Beat Ammann',
        location: 'Burgdorf',
        role: 'Landwirt',
        service: 'Zaunbau',
        review: 'Weidezaun erneuert. Der Handwerker kannte sich aus und die Arbeit war schnell erledigt.',
        rating: 4,
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

    const items = testimonials;

    return (
        <section ref={ref} className={`${bgColor} py-20 sm:py-28 lg:py-36 overflow-hidden border-t border-slate-200`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                {/* Header – zentriert */}
                <div className={`text-center mb-14 lg:mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 mb-3 leading-tight">
                        {title ? (
                            title
                        ) : (
                            <>
                                Das sagen unsere{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                                    Kunden
                                </span>
                            </>
                        )}
                    </h2>
                    <p className="text-slate-600 text-base lg:text-lg max-w-2xl mx-auto">
                        {subtitle || t.defaultSubtitle}
                    </p>
                </div>

                {/* Alle Testimonials in einer Zeile – horizontal scrollbar */}
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scroll-smooth snap-x snap-mandatory">
                    {items.map((testimonial, index) => (
                        <div
                            key={testimonial.name + index}
                            className={`group relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px] rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm hover:border-green-300 hover:shadow-lg transition-all duration-300 flex flex-col snap-start ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                            style={{ transitionDelay: inView ? `${index * 50}ms` : '0ms' }}
                        >
                            {/* Dekoratives Anführungszeichen */}
                            <div className="absolute top-5 right-5 text-5xl font-serif text-green-100 group-hover:text-green-200 transition-colors select-none" aria-hidden>
                                "
                            </div>
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`w-4 h-4 flex-shrink-0 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 flex-1 line-clamp-4">
                                „{testimonial.review}"
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                                    {getInitials(testimonial.name)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="font-semibold text-slate-900 text-sm truncate">{testimonial.name}</div>
                                    <div className="text-xs text-slate-500 truncate">
                                        {[testimonial.role, testimonial.location].filter(Boolean).join(' · ')}
                                        {testimonial.service && ` · ${testimonial.service}`}
                                    </div>
                                </div>
                                <span className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">
                                    {t.verified}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
