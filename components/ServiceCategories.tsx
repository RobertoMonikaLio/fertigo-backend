import React from 'react';
import { CheckIcon } from './icons';

const allServices = [
    'Architektur & Bauplanung',
    'Badezimmerumbau',
    'Badrenovation',
    'Baumpflege',
    'Baureinigung',
    'Bodenleger',

    'Dachdecker',
    'Dachreinigung',
    'Einlagerung',
    'Entsorgung & Räumung',

    'Fassadenbau',
    'Fenstermontage',
    'Fensterreinigung',
    'Firmenumzug',

    'Gartenbau',
    'Gartenpflege',
    'Gebäudereinigung',
    'Gipserarbeiten',
    'Handwerker',
    'Hauswartung',
    'Heizungsinstallation',
    'IT-Dienstleistungen',
    'Klaviertransport',
    'Klimaanlagen Installation',
    'Klimaanlagen-Service',
    'Küchenbau',
    'Lüftungsanlagen',
    'Malerarbeiten',
    'Maurerarbeiten',
    'Möbeltransport',
    'Plattenleger',
    'Privatumzug',
    'Reinigung',
    'Sanitär',
    'Sanitärinstallation',
    'Schreiner',
    'Umzug',
    'Umzugsreinigung',
    'Wärmepumpe Installation',
    'Zaunbau',
    'Zimmermannarbeiten',
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
