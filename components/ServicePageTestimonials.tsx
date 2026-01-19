import React from 'react';
import { StarIcon, CheckCircleIcon, MapPinIcon } from './icons';

const testimonialsData = [
    {
        name: 'Michael R.',
        location: 'Renovation, Basel',
        review: 'Dank OffertenVergleich habe ich einen super Handwerker für meine Wohnungssanierung gefunden. Qualität und Preis waren perfekt abgestimmt.',
        rating: 5
    },
    {
        name: 'Sarah K.',
        location: 'Umzug, Zürich',
        review: 'Unglaublich! 6 Angebote in 3 Stunden erhalten und den perfekten Partner für meinen Umzug gefunden. Stressfrei und sehr zu empfehlen!',
        rating: 5
    },
    {
        name: 'Lisa M.',
        location: 'Reinigung, Bern',
        review: 'Super professionell und zuverlässig. Ich habe eine Reinigungsfirma für meine Praxis gesucht und wurde fündig. Top Service und Abnahmegarantie!',
        rating: 5
    },
    {
        name: 'Thomas F.',
        location: 'Gartenpflege, Genf',
        review: 'Unser Garten wurde in eine Oase verwandelt. Das Team war pünktlich, kompetent und hat unsere Erwartungen weit übertroffen. Grossartige Arbeit!',
        rating: 5
    },
    {
        name: 'Lukas G.',
        location: 'Elektroinstallation, St. Gallen',
        review: 'Schnell, kompetent und sehr freundlich. Der Elektriker hat das Problem sofort gefunden und behoben. Top-Service, den ich gerne weiterempfehle.',
        rating: 5
    },
    {
        name: 'Familie Baumann',
        location: 'Küchenbau, Winterthur',
        review: 'Unsere neue Küche ist ein Traum! Von der Planung bis zur Montage lief alles reibungslos. Das Team war professionell und hat unsere Wünsche perfekt umgesetzt.',
        rating: 5
    },
     {
        name: 'Reto B.',
        location: 'Bodenleger, Luzern',
        review: 'Der Parkettboden sieht fantastisch aus. Super Beratung bei der Materialauswahl und eine sehr saubere Ausführung. Preis-Leistung stimmt.',
        rating: 4
    },
    {
        name: 'Corina H.',
        location: 'Fassadenanstrich, Thun',
        review: 'Unser Haus erstrahlt in neuem Glanz. Die Maler waren sehr sorgfältig und das Ergebnis ist makellos. Vielen Dank an das ganze Team!',
        rating: 5
    },
    {
        name: 'Jonas S.',
        location: 'Sanitär, Zug',
        review: 'Notfall am Sonntagabend – der vermittelte Sanitär war innerhalb einer Stunde da und hat den Rohrbruch behoben. Hat mir den Tag gerettet!',
        rating: 5
    },
    {
        name: 'Verwaltung AG',
        location: 'Hauswartung, Aarau',
        review: 'Wir haben einen zuverlässigen Partner für die Hauswartung unserer Liegenschaften gefunden. Die Kommunikation ist einfach und die Arbeit wird stets prompt erledigt.',
        rating: 5
    },
    {
        name: 'David L.',
        location: 'Schreiner, Winterthur',
        review: 'Der Einbauschrank passt perfekt und ist von höchster Qualität. Man merkt die Liebe zum Detail. Bin absolut begeistert von der Handwerkskunst.',
        rating: 5
    },
    {
        name: 'Nathalie M.',
        location: 'Entsorgung, St. Gallen',
        review: 'Die Wohnungsräumung ging schnell und unkompliziert über die Bühne. Ein grosses Dankeschön für die effiziente und diskrete Arbeit.',
        rating: 5
    }
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonialsData[0] }> = ({ testimonial }) => (
    <li className="w-[350px] flex-shrink-0 mx-4 animate-fade-in">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg h-full flex flex-col p-6">
            <div className="flex items-center mb-4">
                <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon 
                                key={i} 
                                className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-slate-300'}`}
                                filled={i < testimonial.rating} 
                            />
                        ))}
                    </div>
                </div>
            </div>
            <blockquote className="text-slate-700 leading-relaxed flex-grow italic mb-4">
                <p>"{testimonial.review}"</p>
            </blockquote>
            <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                <div className="flex items-center text-green-700 font-semibold">
                    <CheckCircleIcon className="w-4 h-4 mr-1.5 text-green-500"/>
                    <span>Geprüftes Projekt</span>
                </div>
                 <div className="flex items-center text-slate-500 font-medium">
                    <MapPinIcon className="w-4 h-4 mr-1.5 text-slate-400"/>
                    <span>{testimonial.location}</span>
                </div>
            </div>
        </div>
    </li>
);

const ServicePageTestimonials: React.FC = () => {
    return (
        <section className="py-16 sm:py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
                        Das sagen unsere Kunden
                    </h2>
                    <p className="text-lg text-slate-600 mt-4">
                        Echte Bewertungen von geprüften Projekten. Sehen Sie, warum Tausende auf OffertenVergleich vertrauen.
                    </p>
                </div>
            </div>

            {/* --- Single Scrolling Row --- */}
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div className="flex">
                    <ul className="flex items-stretch animate-scroll-left [animation-duration:120s] hover:[animation-play-state:paused]">
                        {testimonialsData.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
                    </ul>
                    <ul className="flex items-stretch animate-scroll-left [animation-duration:120s] hover:[animation-play-state:paused]" aria-hidden="true">
                        {testimonialsData.map((t, i) => <TestimonialCard key={i + testimonialsData.length} testimonial={t} />)}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ServicePageTestimonials;