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
} from '../components/icons';
import { useAppContext } from './AppContext';

interface ServiceItem {
    name: string;
    category: string;
    description: string;
    icon: React.ReactNode;
}

const allServicesData: ServiceItem[] = [
    { name: 'Maurerarbeiten', category: 'Bau & Rohbau', description: 'Neubau, Umbau und Reparaturen von Mauerwerk.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Zimmermannarbeiten', category: 'Bau & Rohbau', description: 'Dachstühle, Holzkonstruktionen und Holzbauten.', icon: <ColoredToolboxIcon className="w-8 h-8" /> },
    { name: 'Dachdecker', category: 'Bau & Rohbau', description: 'Reparaturen, Sanierungen und Neubau von Dächern.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Fassadenbau', category: 'Bau & Rohbau', description: 'Isolation, Verputz und Gestaltung von Fassaden.', icon: <ColoredBuildingOffice2Icon className="w-8 h-8" /> },
    { name: 'Schreiner', category: 'Innenausbau', description: 'Massgefertigte Möbel, Reparaturen und Holzarbeiten.', icon: <ColoredToolboxIcon className="w-8 h-8" /> },
    { name: 'Gipserarbeiten', category: 'Innenausbau', description: 'Verputz, Trockenbau und Stuckatur für perfekte Oberflächen.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Bodenleger', category: 'Innenausbau', description: 'Verlegung von Parkett, Laminat, Vinyl und Teppich.', icon: <ColoredSquares2X2Icon className="w-8 h-8" /> },
    { name: 'Plattenleger', category: 'Innenausbau', description: 'Verlegung von Keramik-, Naturstein- und Mosaikplatten.', icon: <ColoredSquares2X2Icon className="w-8 h-8" /> },
    { name: 'Fenstermontage', category: 'Innenausbau', description: 'Einbau und Austausch von Fenstern und Türen.', icon: <ColoredWindowIcon className="w-8 h-8" /> },
    { name: 'Sanitär', category: 'Haustechnik', description: 'Alle Installationen und Reparaturen rund um Bad und Küche.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" /> },
    { name: 'Heizungsinstallation', category: 'Haustechnik', description: 'Installation und Wartung von modernen Heizungssystemen.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" /> },
    { name: 'Elektriker', category: 'Haustechnik', description: 'Sichere Elektroinstallationen, von der Steckdose bis zum Smart Home.', icon: <ColoredLightbulbIcon className="w-8 h-8" /> },
    { name: 'Klimaanlagen-Service', category: 'Haustechnik', description: 'Installation und Wartung von Klimaanlagen.', icon: <SunIcon className="w-8 h-8" /> },
    { name: 'Malerarbeiten', category: 'Renovation & Gestaltung', description: 'Frische Farbe für Wände, Decken und Fassaden.', icon: <ColoredPaintRollerIcon className="w-8 h-8" /> },
    { name: 'Küchenbau', category: 'Renovation & Gestaltung', description: 'Planung und Montage Ihrer neuen Traumküche.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Badezimmerumbau', category: 'Renovation & Gestaltung', description: 'Komplettsanierung und Modernisierung Ihres Badezimmers.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" /> },
    { name: 'Architektur & Bauplanung', category: 'Renovation & Gestaltung', description: 'Planung und Begleitung Ihres Bau- oder Umbauvorhabens.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Privatumzug', category: 'Umzug & Transport', description: 'Stressfreier Wohnungswechsel mit erfahrenen Zügelprofis.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Firmenumzug', category: 'Umzug & Transport', description: 'Effiziente und planmässige Verlagerung Ihres Unternehmens.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Möbeltransport', category: 'Umzug & Transport', description: 'Sicherer Transport für einzelne Möbelstücke oder ganze Ladungen.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Klaviertransport', category: 'Umzug & Transport', description: 'Spezialtransport für Klaviere und Flügel.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Entsorgung & Räumung', category: 'Umzug & Transport', description: 'Fachgerechte Entsorgung von Sperrmüll und Haushaltsauflösungen.', icon: <ColoredTrashIcon className="w-8 h-8" /> },
    { name: 'Einlagerung', category: 'Umzug & Transport', description: 'Sichere Lagerung Ihrer Möbel und Güter.', icon: <ColoredArchiveBoxIcon className="w-8 h-8" /> },
    { name: 'Umzugsreinigung', category: 'Reinigung & Pflege', description: 'Mit Abnahmegarantie für eine reibungslose Wohnungsübergabe.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Gebäudereinigung', category: 'Reinigung & Pflege', description: 'Regelmässige Unterhaltsreinigung für Büro- und Wohngebäude.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Fensterreinigung', category: 'Reinigung & Pflege', description: 'Streifenfreie Sauberkeit für Fenster und Glasfassaden.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Baureinigung', category: 'Reinigung & Pflege', description: 'Reinigung während und nach der Bauphase.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Dachreinigung', category: 'Reinigung & Pflege', description: 'Professionelle Reinigung und Imprägnierung von Dächern.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Hauswartung', category: 'Reinigung & Pflege', description: 'Kompletter Service für Ihre Liegenschaft, von Reinigung bis Unterhalt.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Gartenpflege', category: 'Garten & Aussenbereich', description: 'Heckenschnitt, Rasenmähen und saisonale Gartenarbeiten.', icon: <ColoredLeafIcon className="w-8 h-8" /> },
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
    'Bau & Rohbau': <ColoredBuildingOffice2Icon className="w-7 h-7" />,
    'Innenausbau': <ColoredWindowIcon className="w-7 h-7" />,
    'Haustechnik': <ColoredLightbulbIcon className="w-7 h-7" />,
    'Renovation & Gestaltung': <ColoredPaintRollerIcon className="w-7 h-7" />,
    'Umzug & Transport': <ColoredTruckIcon className="w-7 h-7" />,
    'Reinigung & Pflege': <ColoredSparklesIcon className="w-7 h-7" />,
    'Garten & Aussenbereich': <ColoredLeafIcon className="w-7 h-7" />,
    'Fahrzeuge & Maschinen': <ColoredDiggerIcon className="w-7 h-7" />,
    'IT & Digital': <ColoredPencilIcon className="w-7 h-7" />,
    'Events & Kreatives': <ColoredPartyPopperIcon className="w-7 h-7" />,
    'Business & Finanzen': <ColoredArchiveBoxIcon className="w-7 h-7" />,
    'Persönliche Dienste': <ColoredUserIcon className="w-7 h-7" />,
    'Gesundheit & Wellness': <ColoredUserIcon className="w-7 h-7" />,
    'Bildung & Unterricht': <ColoredPencilIcon className="w-7 h-7" />,
    'Tierdienstleistungen': <ColoredHomeModernIcon className="w-7 h-7" />,
};

const categoryGradients: Record<string, string> = {
    'Bau & Rohbau': 'from-amber-400 to-orange-500',
    'Innenausbau': 'from-orange-400 to-red-500',
    'Haustechnik': 'from-yellow-400 to-amber-500',
    'Renovation & Gestaltung': 'from-rose-400 to-pink-500',
    'Umzug & Transport': 'from-blue-400 to-indigo-500',
    'Reinigung & Pflege': 'from-cyan-400 to-blue-500',
    'Garten & Aussenbereich': 'from-green-400 to-emerald-500',
    'Fahrzeuge & Maschinen': 'from-slate-400 to-slate-600',
    'IT & Digital': 'from-violet-400 to-purple-500',
    'Events & Kreatives': 'from-pink-400 to-rose-500',
    'Business & Finanzen': 'from-emerald-400 to-teal-500',
    'Persönliche Dienste': 'from-indigo-400 to-violet-500',
    'Gesundheit & Wellness': 'from-teal-400 to-cyan-500',
    'Bildung & Unterricht': 'from-purple-400 to-indigo-500',
    'Tierdienstleistungen': 'from-lime-400 to-green-500',
};

const ServicesPage: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

    const filteredServices = useMemo(() => {
        let services = selectedCategory 
            ? servicesByCategory[selectedCategory] 
            : allServicesData;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            services = services.filter(service =>
                service.name.toLowerCase().includes(query) ||
                service.description.toLowerCase().includes(query) ||
                service.category.toLowerCase().includes(query)
            );
        }

        return services;
    }, [selectedCategory, searchQuery, servicesByCategory]);

    const handleRequestService = (serviceName: string) => {
        openQuoteModal({ projectTitle: serviceName, service: serviceName });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gradient-to-b from-primary-50 to-white pt-24 pb-8">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="max-w-3xl">
                        <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                            Unsere Dienstleistungen
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600">
                            Entdecken Sie über 50 professionelle Services für Ihr nächstes Projekt.
                        </p>
                    </div>
                </div>
            </div>

            <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6 max-w-7xl py-4">
                    <div className="relative max-w-md">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Service suchen..."
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl py-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    <aside className="lg:w-72 flex-shrink-0">
                        <div className="lg:sticky lg:top-36">
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Kategorien</h2>
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                                        selectedCategory === null
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                            : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                                >
                                    <span className="font-semibold">Alle Services</span>
                                    <span className={`ml-auto text-sm px-2 py-0.5 rounded-full ${
                                        selectedCategory === null ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                                    }`}>
                                        {allServicesData.length}
                                    </span>
                                </button>
                                
                                {categoryOrder.filter(cat => servicesByCategory[cat]?.length > 0).map(category => {
                                    const isActive = selectedCategory === category;
                                    const count = servicesByCategory[category].length;
                                    
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(isActive ? null : category)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                                                isActive
                                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                                    : 'text-slate-700 hover:bg-slate-100'
                                            }`}
                                        >
                                            <span className={`flex-shrink-0 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                                {React.cloneElement(categoryIcons[category] as React.ReactElement, { 
                                                    className: `w-5 h-5 ${isActive ? 'text-white' : ''}` 
                                                })}
                                            </span>
                                            <span className="font-medium text-sm truncate">{category}</span>
                                            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                                                isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                                            }`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0">
                        {selectedCategory && (
                            <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-r ${categoryGradients[selectedCategory]} text-white`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                                        {React.cloneElement(categoryIcons[selectedCategory] as React.ReactElement, { className: 'w-8 h-8 text-white' })}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedCategory}</h2>
                                        <p className="text-white/80">{servicesByCategory[selectedCategory].length} Dienstleistungen verfügbar</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {searchQuery && (
                            <div className="mb-6 flex items-center gap-2 text-slate-600">
                                <span className="font-semibold text-slate-900">{filteredServices.length}</span>
                                <span>Ergebnisse für</span>
                                <span className="font-semibold text-primary-600">"{searchQuery}"</span>
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="ml-2 text-sm text-slate-500 hover:text-slate-700 underline"
                                >
                                    Zurücksetzen
                                </button>
                            </div>
                        )}

                        {filteredServices.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {filteredServices.map((service) => (
                                    <button
                                        key={service.name}
                                        onClick={() => handleRequestService(service.name)}
                                        className="group relative bg-white border border-slate-200 rounded-2xl p-5 text-left hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-primary-100 flex items-center justify-center flex-shrink-0 transition-colors">
                                                {React.cloneElement(service.icon as React.ReactElement, { className: 'w-6 h-6' })}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors mb-1">
                                                    {service.name}
                                                </h3>
                                                <p className="text-sm text-slate-500 line-clamp-2">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                            <ArrowRightIcon className="w-4 h-4 text-white" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MagnifyingGlassIcon className="w-10 h-10 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Keine Ergebnisse</h3>
                                <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                                    Wir konnten keine passenden Dienstleistungen finden. Versuchen Sie einen anderen Suchbegriff.
                                </p>
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                                    className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                                >
                                    Filter zurücksetzen
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <div className="bg-slate-900 py-16">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Nicht gefunden, was Sie suchen?
                            </h2>
                            <p className="text-slate-400">
                                Beschreiben Sie uns Ihr Projekt – wir finden den passenden Anbieter.
                            </p>
                        </div>
                        <button 
                            onClick={() => openQuoteModal({})}
                            className="flex-shrink-0 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
                        >
                            Individuelle Anfrage
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="mt-12 pt-12 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-1">50+</div>
                            <div className="text-sm text-slate-400">Services</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-1">500+</div>
                            <div className="text-sm text-slate-400">Partner</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-1">2'500+</div>
                            <div className="text-sm text-slate-400">Kunden</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                                <span className="text-4xl font-bold text-white">4.9</span>
                                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                            </div>
                            <div className="text-sm text-slate-400">Bewertung</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
