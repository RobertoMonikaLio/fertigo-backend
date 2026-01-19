import React, { useState, useMemo } from 'react';
import {
    ArrowRightIcon,
    ColoredSparklesIcon,
    ColoredLeafIcon,
    ColoredPartyPopperIcon,
    ColoredPaintRollerIcon,
    ColoredWrenchScrewdriverIcon,
    ColoredSquares2X2Icon,
    ColoredLightbulbIcon,
    ColoredWindowIcon,
    ColoredHomeModernIcon,
    ColoredBuildingOffice2Icon,
    ColoredTrashIcon,
    ColoredToolboxIcon,
    ColoredPencilIcon,
    ColoredArchiveBoxIcon,
    ColoredTruckIcon,
    ColoredDiggerIcon,
    ColoredUserIcon,
    SunIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    StarIcon,
    ChevronRightIcon,
} from '../components/icons';
import { useAppContext } from './AppContext';
import { useInView } from 'react-intersection-observer';

interface ServiceItem {
    name: string;
    category: string;
    description: string;
    icon: React.ReactNode;
    popular?: boolean;
}

const allServicesData: ServiceItem[] = [
    { name: 'Maurerarbeiten', category: 'Bau & Rohbau', description: 'Neubau, Umbau und Reparaturen von Mauerwerk.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Zimmermannarbeiten', category: 'Bau & Rohbau', description: 'Dachstühle, Holzkonstruktionen und Holzbauten.', icon: <ColoredToolboxIcon className="w-8 h-8" /> },
    { name: 'Dachdecker', category: 'Bau & Rohbau', description: 'Reparaturen, Sanierungen und Neubau von Dächern.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Fassadenbau', category: 'Bau & Rohbau', description: 'Isolation, Verputz und Gestaltung von Fassaden.', icon: <ColoredBuildingOffice2Icon className="w-8 h-8" /> },
    { name: 'Schreiner', category: 'Innenausbau', description: 'Massgefertigte Möbel, Reparaturen und Holzarbeiten.', icon: <ColoredToolboxIcon className="w-8 h-8" /> },
    { name: 'Gipserarbeiten', category: 'Innenausbau', description: 'Verputz, Trockenbau und Stuckatur für perfekte Oberflächen.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Bodenleger', category: 'Innenausbau', description: 'Verlegung von Parkett, Laminat, Vinyl und Teppich.', icon: <ColoredSquares2X2Icon className="w-8 h-8" />, popular: true },
    { name: 'Plattenleger', category: 'Innenausbau', description: 'Verlegung von Keramik-, Naturstein- und Mosaikplatten.', icon: <ColoredSquares2X2Icon className="w-8 h-8" /> },
    { name: 'Fenstermontage', category: 'Innenausbau', description: 'Einbau und Austausch von Fenstern und Türen.', icon: <ColoredWindowIcon className="w-8 h-8" /> },
    { name: 'Sanitär', category: 'Haustechnik', description: 'Alle Installationen und Reparaturen rund um Bad und Küche.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" />, popular: true },
    { name: 'Heizungsinstallation', category: 'Haustechnik', description: 'Installation und Wartung von modernen Heizungssystemen.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" /> },
    { name: 'Elektriker', category: 'Haustechnik', description: 'Sichere Elektroinstallationen, von der Steckdose bis zum Smart Home.', icon: <ColoredLightbulbIcon className="w-8 h-8" />, popular: true },
    { name: 'Klimaanlagen-Service', category: 'Haustechnik', description: 'Installation und Wartung von Klimaanlagen.', icon: <SunIcon className="w-8 h-8" /> },
    { name: 'Malerarbeiten', category: 'Renovation & Gestaltung', description: 'Frische Farbe für Wände, Decken und Fassaden.', icon: <ColoredPaintRollerIcon className="w-8 h-8" />, popular: true },
    { name: 'Küchenbau', category: 'Renovation & Gestaltung', description: 'Planung und Montage Ihrer neuen Traumküche.', icon: <ColoredHomeModernIcon className="w-8 h-8" />, popular: true },
    { name: 'Badezimmerumbau', category: 'Renovation & Gestaltung', description: 'Komplettsanierung und Modernisierung Ihres Badezimmers.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" /> },
    { name: 'Architektur & Bauplanung', category: 'Renovation & Gestaltung', description: 'Planung und Begleitung Ihres Bau- oder Umbauvorhabens.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Privatumzug', category: 'Umzug & Transport', description: 'Stressfreier Wohnungswechsel mit erfahrenen Zügelprofis.', icon: <ColoredTruckIcon className="w-8 h-8" />, popular: true },
    { name: 'Firmenumzug', category: 'Umzug & Transport', description: 'Effiziente und planmässige Verlagerung Ihres Unternehmens.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Möbeltransport', category: 'Umzug & Transport', description: 'Sicherer Transport für einzelne Möbelstücke oder ganze Ladungen.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Klaviertransport', category: 'Umzug & Transport', description: 'Spezialtransport für Klaviere und Flügel.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Entsorgung & Räumung', category: 'Umzug & Transport', description: 'Fachgerechte Entsorgung von Sperrmüll und Haushaltsauflösungen.', icon: <ColoredTrashIcon className="w-8 h-8" /> },
    { name: 'Einlagerung', category: 'Umzug & Transport', description: 'Sichere Lagerung Ihrer Möbel und Güter.', icon: <ColoredArchiveBoxIcon className="w-8 h-8" /> },
    { name: 'Umzugsreinigung', category: 'Reinigung & Pflege', description: 'Mit Abnahmegarantie für eine reibungslose Wohnungsübergabe.', icon: <ColoredSparklesIcon className="w-8 h-8" />, popular: true },
    { name: 'Gebäudereinigung', category: 'Reinigung & Pflege', description: 'Regelmässige Unterhaltsreinigung für Büro- und Wohngebäude.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Fensterreinigung', category: 'Reinigung & Pflege', description: 'Streifenfreie Sauberkeit für Fenster und Glasfassaden.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Baureinigung', category: 'Reinigung & Pflege', description: 'Reinigung während und nach der Bauphase.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Dachreinigung', category: 'Reinigung & Pflege', description: 'Professionelle Reinigung und Imprägnierung von Dächern.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Hauswartung', category: 'Reinigung & Pflege', description: 'Kompletter Service für Ihre Liegenschaft, von Reinigung bis Unterhalt.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Gartenpflege', category: 'Garten & Aussenbereich', description: 'Heckenschnitt, Rasenmähen und saisonale Gartenarbeiten.', icon: <ColoredLeafIcon className="w-8 h-8" />, popular: true },
    { name: 'Gartenbau', category: 'Garten & Aussenbereich', description: 'Neuanlagen, Umgestaltungen und Pflasterarbeiten.', icon: <ColoredLeafIcon className="w-8 h-8" /> },
    { name: 'Baumpflege', category: 'Garten & Aussenbereich', description: 'Fachgerechter Schnitt und Fällung von Bäumen.', icon: <ColoredLeafIcon className="w-8 h-8" /> },
    { name: 'Zaunbau', category: 'Garten & Aussenbereich', description: 'Errichtung von Zäunen aus Holz, Metall und Kunststoff.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Autoreparatur', category: 'Fahrzeuge & Maschinen', description: 'Professionelle Reparatur und Wartung für alle Fahrzeugmarken.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" /> },
    { name: 'Fahrzeugreinigung', category: 'Fahrzeuge & Maschinen', description: 'Innen- und Aussenreinigung für Ihr Fahrzeug.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Maschinenvermietung', category: 'Fahrzeuge & Maschinen', description: 'Mieten Sie Baumaschinen und spezielle Geräte für Ihr Projekt.', icon: <ColoredDiggerIcon className="w-8 h-8" /> },
    { name: 'Webdesign & Entwicklung', category: 'IT & Digital', description: 'Erstellung von modernen und responsiven Websites.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Online Marketing', category: 'IT & Digital', description: 'Steigern Sie Ihre Sichtbarkeit mit SEO, SEA und Social Media.', icon: <ColoredLightbulbIcon className="w-8 h-8" /> },
    { name: 'Grafikdesign', category: 'IT & Digital', description: 'Logos, Flyer und Corporate Design von Kreativprofis.', icon: <ColoredPaintRollerIcon className="w-8 h-8" /> },
    { name: 'IT-Dienstleistungen', category: 'IT & Digital', description: 'Support, Netzwerk und IT-Lösungen für KMU.', icon: <ColoredBuildingOffice2Icon className="w-8 h-8" /> },
    { name: 'Catering & Partyservice', category: 'Events & Kreatives', description: 'Kulinarische Highlights für Ihren privaten oder geschäftlichen Anlass.', icon: <ColoredPartyPopperIcon className="w-8 h-8" /> },
    { name: 'Eventorganisation', category: 'Events & Kreatives', description: 'Planung und Durchführung von Events, von A bis Z.', icon: <ColoredPartyPopperIcon className="w-8 h-8" /> },
    { name: 'Fotografie & Video', category: 'Events & Kreatives', description: 'Professionelle Aufnahmen für Events, Porträts und mehr.', icon: <ColoredPartyPopperIcon className="w-8 h-8" /> },
    { name: 'Buchhaltung & Treuhand', category: 'Business & Finanzen', description: 'Zuverlässige Buchführung und Steuerberatung für Ihr KMU.', icon: <ColoredArchiveBoxIcon className="w-8 h-8" /> },
    { name: 'Personal Training', category: 'Persönliche Dienste', description: 'Erreichen Sie Ihre Fitnessziele mit einem persönlichen Coach.', icon: <ColoredUserIcon className="w-8 h-8" /> },
    { name: 'Ernährungsberatung', category: 'Persönliche Dienste', description: 'Individuelle Ernährungspläne für ein gesünderes Leben.', icon: <ColoredLeafIcon className="w-8 h-8" /> },
    { name: 'Massage', category: 'Gesundheit & Wellness', description: 'Entspannungs- und therapeutische Massagen.', icon: <ColoredUserIcon className="w-8 h-8" /> },
    { name: 'Physiotherapie', category: 'Gesundheit & Wellness', description: 'Rehabilitation und Schmerztherapie.', icon: <ColoredUserIcon className="w-8 h-8" /> },
    { name: 'Yoga-Unterricht', category: 'Gesundheit & Wellness', description: 'Private oder Gruppen-Yogastunden.', icon: <ColoredUserIcon className="w-8 h-8" /> },
    { name: 'Nachhilfe', category: 'Bildung & Unterricht', description: 'Unterstützung in allen Schulfächern.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Musikunterricht', category: 'Bildung & Unterricht', description: 'Lernen Sie ein Instrument von Profis.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Sprachkurse', category: 'Bildung & Unterricht', description: 'Verbessern Sie Ihre Sprachkenntnisse.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Tierbetreuung', category: 'Tierdienstleistungen', description: 'Liebevolle Betreuung für Ihre Haustiere.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Hundetraining', category: 'Tierdienstleistungen', description: 'Professionelles Training für Ihren Hund.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Tierpflege / Grooming', category: 'Tierdienstleistungen', description: 'Fellpflege und mehr für Ihr Haustier.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
];

const categoryOrder = [
    'Bau & Rohbau', 
    'Innenausbau',
    'Haustechnik',
    'Renovation & Gestaltung',
    'Umzug & Transport', 
    'Reinigung & Pflege', 
    'Garten & Aussenbereich', 
    'Fahrzeuge & Maschinen', 
    'IT & Digital', 
    'Events & Kreatives',
    'Business & Finanzen',
    'Persönliche Dienste',
    'Gesundheit & Wellness', 
    'Bildung & Unterricht', 
    'Tierdienstleistungen'
];

const categoryIcons: Record<string, React.ReactNode> = {
    'Bau & Rohbau': <ColoredBuildingOffice2Icon className="w-6 h-6" />,
    'Innenausbau': <ColoredWindowIcon className="w-6 h-6" />,
    'Haustechnik': <ColoredLightbulbIcon className="w-6 h-6" />,
    'Renovation & Gestaltung': <ColoredPaintRollerIcon className="w-6 h-6" />,
    'Umzug & Transport': <ColoredTruckIcon className="w-6 h-6" />,
    'Reinigung & Pflege': <ColoredSparklesIcon className="w-6 h-6" />,
    'Garten & Aussenbereich': <ColoredLeafIcon className="w-6 h-6" />,
    'Fahrzeuge & Maschinen': <ColoredDiggerIcon className="w-6 h-6" />,
    'IT & Digital': <ColoredPencilIcon className="w-6 h-6" />,
    'Events & Kreatives': <ColoredPartyPopperIcon className="w-6 h-6" />,
    'Business & Finanzen': <ColoredArchiveBoxIcon className="w-6 h-6" />,
    'Persönliche Dienste': <ColoredUserIcon className="w-6 h-6" />,
    'Gesundheit & Wellness': <ColoredUserIcon className="w-6 h-6" />,
    'Bildung & Unterricht': <ColoredPencilIcon className="w-6 h-6" />,
    'Tierdienstleistungen': <ColoredHomeModernIcon className="w-6 h-6" />,
};

const ServicesPage: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const servicesByCategory = useMemo(() => {
        const grouped: Record<string, ServiceItem[]> = {};
        categoryOrder.forEach(cat => grouped[cat] = []);
        allServicesData.forEach(service => {
            if (grouped[service.category]) {
                grouped[service.category].push(service);
            }
        });
        return grouped;
    }, []);

    const filteredCategories = useMemo(() => {
        if (!searchQuery.trim()) return categoryOrder;
        
        const query = searchQuery.toLowerCase();
        return categoryOrder.filter(category => {
            if (category.toLowerCase().includes(query)) return true;
            return servicesByCategory[category].some(service =>
                service.name.toLowerCase().includes(query) ||
                service.description.toLowerCase().includes(query)
            );
        });
    }, [searchQuery, servicesByCategory]);

    const getFilteredServicesForCategory = (category: string) => {
        if (!searchQuery.trim()) return servicesByCategory[category];
        
        const query = searchQuery.toLowerCase();
        return servicesByCategory[category].filter(service =>
            service.name.toLowerCase().includes(query) ||
            service.description.toLowerCase().includes(query) ||
            service.category.toLowerCase().includes(query)
        );
    };

    const handleRequestService = (serviceName: string) => {
        openQuoteModal({ projectTitle: serviceName, service: serviceName });
    };

    const popularServices = allServicesData.filter(s => s.popular);

    return (
        <div className="bg-slate-50 min-h-screen">
            <section 
                ref={heroRef}
                className="relative bg-white pt-24 pb-16 border-b border-slate-200"
            >
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className={`transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                            <span>Startseite</span>
                            <ChevronRightIcon className="w-4 h-4" />
                            <span className="text-slate-900 font-medium">Dienstleistungen</span>
                        </div>
                        
                        <h1 className="font-title text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Alle Dienstleistungen
                        </h1>
                        
                        <p className="text-lg text-slate-600 mb-8 max-w-2xl">
                            Durchsuchen Sie unser umfassendes Angebot an professionellen Services – von Handwerkern bis zu Spezialisten.
                        </p>

                        <div className="relative max-w-xl">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Dienstleistung suchen..."
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {!searchQuery && (
                <section className="py-12 bg-white border-b border-slate-200">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                Beliebte Services
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {popularServices.map((service) => (
                                <button
                                    key={service.name}
                                    onClick={() => handleRequestService(service.name)}
                                    className="group p-4 bg-slate-50 hover:bg-primary-50 rounded-xl border border-slate-200 hover:border-primary-300 transition-all text-left"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                                        {React.cloneElement(service.icon as React.ReactElement, { className: 'w-5 h-5' })}
                                    </div>
                                    <div className="font-semibold text-sm text-slate-900 group-hover:text-primary-700 transition-colors">
                                        {service.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-12">
                <div className="container mx-auto px-6 max-w-5xl">
                    {searchQuery && (
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-slate-600">
                                <span className="font-semibold text-slate-900">{filteredCategories.length}</span> Kategorien gefunden für "{searchQuery}"
                            </p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Suche zurücksetzen
                            </button>
                        </div>
                    )}

                    <div className="space-y-4">
                        {filteredCategories.filter(cat => getFilteredServicesForCategory(cat).length > 0).map((category) => {
                            const services = getFilteredServicesForCategory(category);
                            const isExpanded = expandedCategory === category || !!searchQuery;
                            
                            return (
                                <div key={category} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                    <button
                                        onClick={() => setExpandedCategory(isExpanded && !searchQuery ? null : category)}
                                        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                                                {categoryIcons[category]}
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-lg text-slate-900">{category}</h3>
                                                <p className="text-sm text-slate-500">{services.length} Dienstleistungen</p>
                                            </div>
                                        </div>
                                        <div className={`w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                                            <ChevronRightIcon className="w-5 h-5 text-slate-600" />
                                        </div>
                                    </button>
                                    
                                    {isExpanded && (
                                        <div className="px-5 pb-5 border-t border-slate-100">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                                                {services.map((service) => (
                                                    <button
                                                        key={service.name}
                                                        onClick={() => handleRequestService(service.name)}
                                                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all text-left"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-primary-100 flex items-center justify-center flex-shrink-0 transition-colors">
                                                            {React.cloneElement(service.icon as React.ReactElement, { className: 'w-5 h-5' })}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors text-sm">
                                                                {service.name}
                                                            </div>
                                                            <div className="text-xs text-slate-500 truncate">
                                                                {service.description}
                                                            </div>
                                                        </div>
                                                        <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-all" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {filteredCategories.length === 0 && (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MagnifyingGlassIcon className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Keine Ergebnisse</h3>
                            <p className="text-slate-500 mb-6">Für "{searchQuery}" wurden keine Dienstleistungen gefunden.</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                            >
                                Suche zurücksetzen
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 bg-white border-t border-slate-200">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                        
                        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    Ihr Service ist nicht dabei?
                                </h2>
                                <p className="text-slate-300 max-w-md">
                                    Kein Problem! Beschreiben Sie uns Ihr Projekt und wir finden den passenden Anbieter für Sie.
                                </p>
                            </div>
                            
                            <button 
                                onClick={() => openQuoteModal({})}
                                className="flex-shrink-0 px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg flex items-center gap-2"
                            >
                                Projekt beschreiben
                                <ArrowRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900 mb-1">50+</div>
                            <div className="text-sm text-slate-500">Dienstleistungen</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
                            <div className="text-sm text-slate-500">Geprüfte Partner</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900 mb-1">2'500+</div>
                            <div className="text-sm text-slate-500">Zufriedene Kunden</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-3xl font-bold text-slate-900 mb-1">
                                4.9
                                <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            </div>
                            <div className="text-sm text-slate-500">Durchschnittsbewertung</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
