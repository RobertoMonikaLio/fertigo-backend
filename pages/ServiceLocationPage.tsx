import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../components/AppContext';
import { providersData } from './providersData';
import { StarIcon, MapPinIcon, ShieldCheckIcon, ArrowRightIcon } from '../components/icons';

// Helper function to capitalize strings
const capitalize = (s: string) => {
    if (!s) return "";
    // Handle special cases for Swiss cities
    const cityMap: { [key: string]: string } = {
        'zuerich': 'Zürich',
        'genf': 'Genf',
        'biel-bienne': 'Biel/Bienne'
    };
    if (cityMap[s]) return cityMap[s];
    
    return s.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

const ServiceLocationPage: React.FC = () => {
    const { service, location } = useParams<{ service: string, location: string }>();
    const { openQuoteModal } = useAppContext();

    const formattedService = useMemo(() => capitalize(service || ''), [service]);
    const formattedLocation = useMemo(() => capitalize(location || ''), [location]);
    
    // Set dynamic meta tags for SEO
    useEffect(() => {
        if (formattedService && formattedLocation) {
            const newTitle = `Die besten ${formattedService} in ${formattedLocation} | OffertenVergleich`;
            document.title = newTitle;
            
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', `Finden und vergleichen Sie Offerten für ${formattedService} in ${formattedLocation}. Erhalten Sie kostenlose Angebote von geprüften Anbietern in Ihrer Region.`);
            }
        }
    }, [formattedService, formattedLocation]);
    
    const relevantProviders = useMemo(() => {
        // Simple filtering logic for demonstration
        return providersData.filter(p => 
            p.location.toLowerCase().includes((location || 'zuerich').toLowerCase())
        ).slice(0, 3);
    }, [location]);

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": formattedService,
        "provider": {
            "@type": "Organization",
            "name": "OffertenVergleich"
        },
        "areaServed": {
            "@type": "City",
            "name": formattedLocation
        },
        "description": `Vergleichen Sie kostenlose Offerten für ${formattedService} von geprüften Anbietern in ${formattedLocation}.`
    };

    return (
        <div className="bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            {/* Header Section */}
            <header className="bg-primary-700 pt-24 pb-16 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        {formattedService} in {formattedLocation}
                    </h1>
                    <p className="mt-4 text-lg text-primary-200 max-w-2xl mx-auto">
                        Finden Sie hier die besten, geprüften Anbieter für Ihr Projekt und holen Sie sich kostenlose Offerten.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left/Main Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-800">Top-Anbieter in {formattedLocation}</h2>
                        {relevantProviders.length > 0 ? (
                            <div className="space-y-6">
                                {relevantProviders.map(provider => (
                                    <div key={provider.id} className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-md flex flex-col sm:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <img src={provider.logo} alt={`${provider.name} logo`} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold text-slate-900">{provider.name}</h3>
                                            <p className="text-slate-600 mt-1">{provider.tagline}</p>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mt-3 text-slate-500">
                                                <div className="flex items-center gap-1.5"><StarIcon className="w-4 h-4 text-yellow-400" /> <span className="font-semibold text-slate-700">{provider.rating}</span> ({provider.reviewCount} Bewertungen)</div>
                                                <div className="flex items-center gap-1.5"><ShieldCheckIcon className="w-4 h-4 text-green-500" /> Geprüfter Partner</div>
                                            </div>
                                            <div className="mt-4">
                                                <Link to={`/providers/${provider.id}`} className="font-semibold text-primary-600 hover:underline flex items-center gap-1">
                                                    Profil ansehen <ArrowRightIcon className="w-4 h-4"/>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-600">Für {formattedLocation} wurden leider keine Top-Anbieter gefunden.</p>
                        )}
                         <div className="text-center pt-8">
                            <Link to="/providers" className="font-semibold text-primary-600 hover:underline">
                                Alle Anbieter durchsuchen &rarr;
                            </Link>
                        </div>
                    </div>
                    
                    {/* Right/Sidebar Column */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-xl border-2 border-primary-500 shadow-2xl sticky top-28">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Projekt starten</h3>
                            <p className="text-slate-700 mb-6">Erhalten Sie jetzt kostenlos und unverbindlich Offerten für Ihr Projekt in {formattedLocation}.</p>
                            <button 
                                onClick={() => openQuoteModal({ service: formattedService, location: formattedLocation, projectTitle: `${formattedService} in ${formattedLocation}` })}
                                className="w-full bg-primary-600 text-white font-bold px-5 py-3 rounded-lg hover:bg-primary-700 transition-all shadow-md text-lg"
                            >
                                Jetzt Offerten anfordern
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ServiceLocationPage;
