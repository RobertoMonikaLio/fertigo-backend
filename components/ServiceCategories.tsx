import React from 'react';
import { CheckIcon } from './icons';

const allServices = [
    'Alarmanlagen',
    'Architektur & Bauplanung',
    'Badezimmerumbau',
    'Badrenovation',
    'Baum schneiden / fällen',
    'Baumpflege',
    'Baureinigung',
    'Bewässerungssysteme',
    'Bodenleger',
    'Bohrarbeiten',
    'Büroreinigung',
    'Dachdecker',
    'Dachreinigung',
    'Deckenbau',
    'Einbruchschutz',
    'Einlagerung',
    'Elektriker',
    'Elektriker Notdienst',
    'Entsorgung',
    'Fassadenbau',
    'Fensterbau',
    'Fenstermontage',
    'Fensterreinigung',
    'Firmenumzug',
    'Gartenbau',
    'Gartenpflege',
    'Gebäudereinigung',
    'Gipser',
    'Gipserarbeiten',
    'Handwerker',
    'Hauswartung',
    'Hecken schneiden',
    'Heizungen',
    'Heizung Notdienst',
    'Heizungsinstallation',
    'Isolierung / Dämmung',
    'IT-Dienstleistungen',
    'Kleinreparaturen',
    'Klimaanlagen & Lüftungen',
    'Klimaanlagen Installation',
    'Klimaanlagen-Service',
    'Küchenbau',
    'Küchenmontage',
    'Lampen montieren',
    'Laminat verlegen',
    'Lüftungsanlagen',
    'Malerarbeiten',
    'Maurerarbeiten',
    'Möbelmontage',
    'Möbeltransport',
    'Netzwerk / WLAN Installationen',
    'Parkett schleifen',
    'Parkett verlegen',
    'Parkettlegen',
    'Plattenleger',
    'Polsterreinigung',
    'Privatumzug',
    'Rasen mähen',
    'Rasen verlegen',
    'Reinigung',
    'Renovationen',
    'Reparaturservice',
    'Räumung',
    'Sanitär',
    'Sanitär / Installateur',
    'Sanitär Notdienst',
    'Sanitärinstallation',
    'Schlüsseldienst',
    'Schlösser austauschen',
    'Schreiner',
    'Schreinerei',
    'Sicherheitssysteme',
    'Smart Home Installationen',
    'Solaranlagen Montage',
    'Spezialumzug',
    'Teppichreinigung',
    'Terrassenbau',
    'Transport',
    'Trockenbau',
    'Türenmontage',
    'TV-Wandmontage',
    'Umzugsreinigung',
    'Videoüberwachung',
    'Vinylboden verlegen',
    'Vorhangschienen montieren',
    'Wallbox Installation (E-Auto)',
    'Wärmepumpen Installationen',
    'Winterdienst',
    'Wohnungsreinigung',
    'Zaunbau',
    'Zimmerarbeiten',
];

const ServiceCategories: React.FC = () => {
    return (
        <section className="py-24 sm:py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Alle Service-Kategorien im Überblick</h2>
                    <p className="text-lg text-slate-600">
                        Von A wie Architektur bis Z wie Zügeltransport – finden Sie für jedes Anliegen den passenden Profi.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto p-8 sm:p-10 bg-slate-50 border border-slate-200/70 rounded-2xl">
                    <ul className="columns-1 sm:columns-2 lg:columns-3 gap-x-8 gap-y-4">
                        {allServices.map((service, index) => (
                            <li key={index} className="flex items-start gap-3 mb-4">
                                <CheckIcon className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                                <span className="text-slate-700 font-medium">{service}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ServiceCategories;
