


import React, { useState, useEffect, useRef } from 'react';
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
    ChevronDownIcon,
    ArrowLeftIcon,
    PencilIcon,
    UsersIcon,
    CheckCircleIcon,
    ColoredDiggerIcon,
    ColoredUserIcon,
    SunIcon,
    ColoredScaffoldingIcon,
    ColoredCarIcon,
} from '../components/icons';
// Fix: Import useAppContext to get props from context instead of props.
import { useAppContext } from './AppContext';

// --- DATA ---
interface ServiceItem {
    name: string;
    category: string;
    description: string;
    icon: React.ReactNode;
}

const allServicesData: ServiceItem[] = [
    // Bau & Rohbau
    { name: 'Maurerarbeiten', category: 'Bau & Rohbau', description: 'Neubau, Umbau und Reparaturen von Mauerwerk.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Zimmermannarbeiten', category: 'Bau & Rohbau', description: 'Dachstühle, Holzkonstruktionen und Holzbauten.', icon: <ColoredToolboxIcon className="w-8 h-8" /> },
    { name: 'Dachdecker', category: 'Bau & Rohbau', description: 'Reparaturen, Sanierungen und Neubau von Dächern.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Fassadenbau', category: 'Bau & Rohbau', description: 'Isolation, Verputz und Gestaltung von Fassaden.', icon: <ColoredBuildingOffice2Icon className="w-8 h-8" /> },

    // Innenausbau
    { name: 'Schreiner', category: 'Innenausbau', description: 'Massgefertigte Möbel, Reparaturen und Holzarbeiten.', icon: <ColoredToolboxIcon className="w-8 h-8" /> },
    { name: 'Gipserarbeiten', category: 'Innenausbau', description: 'Verputz, Trockenbau und Stuckatur für perfekte Oberflächen.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Bodenleger', category: 'Innenausbau', description: 'Verlegung von Parkett, Laminat, Vinyl und Teppich.', icon: <ColoredSquares2X2Icon className="w-8 h-8" /> },
    { name: 'Plattenleger', category: 'Innenausbau', description: 'Verlegung von Keramik-, Naturstein- und Mosaikplatten.', icon: <ColoredSquares2X2Icon className="w-8 h-8" /> },
    { name: 'Fenstermontage', category: 'Innenausbau', description: 'Einbau und Austausch von Fenstern und Türen.', icon: <ColoredWindowIcon className="w-8 h-8" /> },

    // Haustechnik
    { name: 'Sanitär', category: 'Haustechnik', description: 'Alle Installationen und Reparaturen rund um Bad und Küche.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" /> },
    { name: 'Heizungsinstallation', category: 'Haustechnik', description: 'Installation und Wartung von modernen Heizungssystemen.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" /> },
    { name: 'Elektriker', category: 'Haustechnik', description: 'Sichere Elektroinstallationen, von der Steckdose bis zum Smart Home.', icon: <ColoredLightbulbIcon className="w-8 h-8" /> },
    { name: 'Klimaanlagen-Service', category: 'Haustechnik', description: 'Installation und Wartung von Klimaanlagen.', icon: <SunIcon className="w-8 h-8" /> },

    // Renovation & Gestaltung
    { name: 'Malerarbeiten', category: 'Renovation & Gestaltung', description: 'Frische Farbe für Wände, Decken und Fassaden.', icon: <ColoredPaintRollerIcon className="w-8 h-8" /> },
    { name: 'Küchenbau', category: 'Renovation & Gestaltung', description: 'Planung und Montage Ihrer neuen Traumküche.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Badezimmerumbau', category: 'Renovation & Gestaltung', description: 'Komplettsanierung und Modernisierung Ihres Badezimmers.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" /> },
    { name: 'Architektur & Bauplanung', category: 'Renovation & Gestaltung', description: 'Planung und Begleitung Ihres Bau- oder Umbauvorhabens.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    
    // Umzug & Transport
    { name: 'Privatumzug', category: 'Umzug & Transport', description: 'Stressfreier Wohnungswechsel mit erfahrenen Zügelprofis.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Firmenumzug', category: 'Umzug & Transport', description: 'Effiziente und planmässige Verlagerung Ihres Unternehmens.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Möbeltransport', category: 'Umzug & Transport', description: 'Sicherer Transport für einzelne Möbelstücke oder ganze Ladungen.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Klaviertransport', category: 'Umzug & Transport', description: 'Spezialtransport für Klaviere und Flügel.', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Entsorgung & Räumung', category: 'Umzug & Transport', description: 'Fachgerechte Entsorgung von Sperrmüll und Haushaltsauflösungen.', icon: <ColoredTrashIcon className="w-8 h-8" /> },
    { name: 'Einlagerung', category: 'Umzug & Transport', description: 'Sichere Lagerung Ihrer Möbel und Güter.', icon: <ColoredArchiveBoxIcon className="w-8 h-8" /> },

    // Reinigung & Pflege
    { name: 'Umzugsreinigung', category: 'Reinigung & Pflege', description: 'Mit Abnahmegarantie für eine reibungslose Wohnungsübergabe.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Gebäudereinigung', category: 'Reinigung & Pflege', description: 'Regelmässige Unterhaltsreinigung für Büro- und Wohngebäude.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Fensterreinigung', category: 'Reinigung & Pflege', description: 'Streifenfreie Sauberkeit für Fenster und Glasfassaden.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Baureinigung', category: 'Reinigung & Pflege', description: 'Reinigung während und nach der Bauphase.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Dachreinigung', category: 'Reinigung & Pflege', description: 'Professionelle Reinigung und Imprägnierung von Dächern.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Hauswartung', category: 'Reinigung & Pflege', description: 'Kompletter Service für Ihre Liegenschaft, von Reinigung bis Unterhalt.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },

    // Garten & Aussenbereich
    { name: 'Gartenpflege', category: 'Garten & Aussenbereich', description: 'Heckenschnitt, Rasenmähen und saisonale Gartenarbeiten.', icon: <ColoredLeafIcon className="w-8 h-8" /> },
    { name: 'Gartenbau', category: 'Garten & Aussenbereich', description: 'Neuanlagen, Umgestaltungen und Pflasterarbeiten.', icon: <ColoredLeafIcon className="w-8 h-8" /> },
    { name: 'Baumpflege', category: 'Garten & Aussenbereich', description: 'Fachgerechter Schnitt und Fällung von Bäumen.', icon: <ColoredLeafIcon className="w-8 h-8" /> },
    { name: 'Zaunbau', category: 'Garten & Aussenbereich', description: 'Errichtung von Zäunen aus Holz, Metall und Kunststoff.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },

    // Fahrzeuge & Maschinen
    { name: 'Autoreparatur', category: 'Fahrzeuge & Maschinen', description: 'Professionelle Reparatur und Wartung für alle Fahrzeugmarken.', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" /> },
    { name: 'Fahrzeugreinigung', category: 'Fahrzeuge & Maschinen', description: 'Innen- und Aussenreinigung für Ihr Fahrzeug.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Maschinenvermietung', category: 'Fahrzeuge & Maschinen', description: 'Mieten Sie Baumaschinen und spezielle Geräte für Ihr Projekt.', icon: <ColoredDiggerIcon className="w-8 h-8" /> },

    // IT & Digital
    { name: 'Webdesign & Entwicklung', category: 'IT & Digital', description: 'Erstellung von modernen und responsiven Websites.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Online Marketing', category: 'IT & Digital', description: 'Steigern Sie Ihre Sichtbarkeit mit SEO, SEA und Social Media.', icon: <ColoredLightbulbIcon className="w-8 h-8" /> },
    { name: 'Grafikdesign', category: 'IT & Digital', description: 'Logos, Flyer und Corporate Design von Kreativprofis.', icon: <ColoredPaintRollerIcon className="w-8 h-8" /> },
    { name: 'IT-Dienstleistungen', category: 'IT & Digital', description: 'Support, Netzwerk und IT-Lösungen für KMU.', icon: <ColoredBuildingOffice2Icon className="w-8 h-8" /> },

    // Events & Kreatives
    { name: 'Catering & Partyservice', category: 'Events & Kreatives', description: 'Kulinarische Highlights für Ihren privaten oder geschäftlichen Anlass.', icon: <ColoredPartyPopperIcon className="w-8 h-8" /> },
    { name: 'Eventorganisation', category: 'Events & Kreatives', description: 'Planung und Durchführung von Events, von A bis Z.', icon: <ColoredPartyPopperIcon className="w-8 h-8" /> },
    { name: 'Fotografie & Video', category: 'Events & Kreatives', description: 'Professionelle Aufnahmen für Events, Porträts und mehr.', icon: <ColoredPartyPopperIcon className="w-8 h-8" /> },

    // Business & Finanzen
    { name: 'Buchhaltung & Treuhand', category: 'Business & Finanzen', description: 'Zuverlässige Buchführung und Steuerberatung für Ihr KMU.', icon: <ColoredArchiveBoxIcon className="w-8 h-8" /> },
    
    // Persönliche Dienste
    { name: 'Personal Training', category: 'Persönliche Dienste', description: 'Erreichen Sie Ihre Fitnessziele mit einem persönlichen Coach.', icon: <ColoredUserIcon className="w-8 h-8" /> },
    { name: 'Ernährungsberatung', category: 'Persönliche Dienste', description: 'Individuelle Ernährungspläne für ein gesünderes Leben.', icon: <ColoredLeafIcon className="w-8 h-8" /> },

    // Gesundheit & Wellness
    { name: 'Massage', category: 'Gesundheit & Wellness', description: 'Entspannungs- und therapeutische Massagen.', icon: <ColoredUserIcon className="w-8 h-8" /> },
    { name: 'Physiotherapie', category: 'Gesundheit & Wellness', description: 'Rehabilitation und Schmerztherapie.', icon: <ColoredUserIcon className="w-8 h-8" /> },
    { name: 'Yoga-Unterricht', category: 'Gesundheit & Wellness', description: 'Private oder Gruppen-Yogastunden.', icon: <ColoredUserIcon className="w-8 h-8" /> },

    // Bildung & Unterricht
    { name: 'Nachhilfe', category: 'Bildung & Unterricht', description: 'Unterstützung in allen Schulfächern.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Musikunterricht', category: 'Bildung & Unterricht', description: 'Lernen Sie ein Instrument von Profis.', icon: <ColoredPencilIcon className="w-8 h-8" /> },
    { name: 'Sprachkurse', category: 'Bildung & Unterricht', description: 'Verbessern Sie Ihre Sprachkenntnisse.', icon: <ColoredPencilIcon className="w-8 h-8" /> },

    // Tierdienstleistungen
    { name: 'Tierbetreuung', category: 'Tierdienstleistungen', description: 'Liebevolle Betreuung für Ihre Haustiere.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Hundetraining', category: 'Tierdienstleistungen', description: 'Professionelles Training für Ihren Hund.', icon: <ColoredHomeModernIcon className="w-8 h-8" /> },
    { name: 'Tierpflege / Grooming', category: 'Tierdienstleistungen', description: 'Fellpflege und mehr für Ihr Haustier.', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
];


const ServicesPage: React.FC = () => {
    // Fix: Get openQuoteModal from context instead of props.
    const { openQuoteModal } = useAppContext();
    
    const servicesByCategory = React.useMemo<Record<string, ServiceItem[]>>(() => {
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
        const grouped: Record<string, ServiceItem[]> = {};
        categoryOrder.forEach(cat => grouped[cat] = []); // Initialize with order
        
        allServicesData.forEach(service => {
            if (grouped[service.category]) {
                grouped[service.category].push(service);
            } else { // Fallback for services with unlisted categories
                 grouped[service.category] = [service];
            }
        });
        return grouped;
    }, []);
    
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

    // --- Desktop Scroll-Spy Logic ---
    const [activeDesktopCategory, setActiveDesktopCategory] = useState<string | null>(null);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveDesktopCategory(entry.target.id);
                }
            });
        }, observerOptions);

        Object.values(sectionRefs.current).forEach(section => {
            // Fix: Cast section to Element to satisfy observer.observe, resolving 'unknown' type error.
            if (section) observer.observe(section as Element);
        });

        return () => {
             Object.values(sectionRefs.current).forEach(section => {
                // Fix: Cast section to Element to satisfy observer.unobserve, resolving 'unknown' type error.
                if (section) observer.unobserve(section as Element);
            });
        };
    }, [servicesByCategory]);


    const handleRequestService = (serviceName: string) => {
        openQuoteModal({ projectTitle: serviceName, service: serviceName });
    };
    
    const getCategoryIcon = (category: string) => {
        const services = servicesByCategory[category];
        // Fix: Add Array.isArray check to ensure services is an array before accessing its properties.
        if (Array.isArray(services) && services.length > 0) {
            // Try to find a representative icon, e.g., the first service's icon
            if (category === 'Bau & Rohbau') return <ColoredBuildingOffice2Icon className="w-8 h-8"/>;
            if (category === 'Innenausbau') return <ColoredWindowIcon className="w-8 h-8"/>;
            if (category === 'Haustechnik') return <ColoredLightbulbIcon className="w-8 h-8"/>;
            if (category === 'Renovation & Gestaltung') return <ColoredPaintRollerIcon className="w-8 h-8"/>;
            return services[0].icon;
        }
        return <ColoredWrenchScrewdriverIcon className="w-8 h-8" />; // fallback
    };

    // Filter logic
    const toggleCategoryFilter = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const filteredServices = React.useMemo(() => {
        let allServices: ServiceItem[] = [];
        
        // Get all services from selected categories or all if none selected
        const categoriesToShow = selectedCategories.length > 0 
            ? selectedCategories 
            : Object.keys(servicesByCategory);
        
        categoriesToShow.forEach(category => {
            const services = servicesByCategory[category];
            if (Array.isArray(services)) {
                allServices = [...allServices, ...services];
            }
        });

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            allServices = allServices.filter(service => 
                service.name.toLowerCase().includes(query) ||
                service.description.toLowerCase().includes(query) ||
                service.category.toLowerCase().includes(query)
            );
        }

        return allServices;
    }, [selectedCategories, searchQuery, servicesByCategory]);


    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">Dienstleistungen</h1>
                            <p className="text-slate-600">
                                {filteredServices.length} von {Object.values(servicesByCategory).reduce((acc, services) => 
                                    acc + (Array.isArray(services) ? services.length : 0), 0
                                )} Services
                            </p>
                        </div>
                    </div>
                    {/* Search Bar */}
                    <div className="max-w-2xl">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Dienstleistung suchen..."
                            className="w-full px-6 py-4 rounded-xl border-2 border-slate-300 focus:border-primary-500 focus:outline-none text-lg bg-white"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex gap-8">
                    {/* Left Sidebar Filter */}
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-24 bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-lg">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-slate-200">
                                <h3 className="text-lg font-black text-slate-900">Kategorien</h3>
                                {selectedCategories.length > 0 && (
                                    <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                                        {selectedCategories.length}
                                    </span>
                                )}
                            </div>
                            
                            {/* Category Filter */}
                            <div className="mb-6">
                                <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                                    {Object.entries(servicesByCategory).map(([category, services]) => {
                                        if (!Array.isArray(services) || services.length === 0 || category === 'Business & Finanzen') return null;
                                        const isSelected = selectedCategories.includes(category);
                                        
                                        return (
                                            <button
                                                key={category}
                                                onClick={() => toggleCategoryFilter(category)}
                                                className={`group w-full relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                                                    isSelected
                                                        ? 'bg-primary-50 border-2 border-primary-500 shadow-md'
                                                        : 'bg-slate-50 border-2 border-transparent hover:border-slate-300 hover:bg-white hover:shadow-sm'
                                                }`}
                                            >
                                                {/* Selected Indicator Bar */}
                                                {isSelected && (
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-l-2xl"></div>
                                                )}
                                                
                                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                                                    isSelected
                                                        ? 'bg-primary-600 scale-105'
                                                        : 'bg-white group-hover:bg-primary-50'
                                                }`}>
                                                    {React.cloneElement(getCategoryIcon(category) as React.ReactElement, { 
                                                        className: `w-7 h-7 transition-colors ${
                                                            isSelected ? 'text-white' : 'text-slate-600 group-hover:text-primary-600'
                                                        }` 
                                                    })}
                                                </div>
                                                
                                                <div className="flex-1 min-w-0 text-left">
                                                    <div className={`font-bold text-base mb-1 ${
                                                        isSelected ? 'text-primary-900' : 'text-slate-900'
                                                    }`}>
                                                        {category}
                                                    </div>
                                                    <div className={`text-sm ${
                                                        isSelected ? 'text-primary-700' : 'text-slate-500'
                                                    }`}>
                                                        {services.length} {services.length === 1 ? 'Service' : 'Services'}
                                                    </div>
                                                </div>
                                                
                                                {/* Checkbox Indicator */}
                                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                                    isSelected
                                                        ? 'bg-primary-600 border-primary-600'
                                                        : 'bg-white border-slate-300 group-hover:border-primary-400'
                                                }`}>
                                                    {isSelected && (
                                                        <CheckCircleIcon className="w-4 h-4 text-white" />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Clear Filters & Results Count */}
                            <div className="space-y-3 pt-4 border-t-2 border-slate-200">
                                {selectedCategories.length > 0 && (
                                    <div className="bg-primary-50 rounded-xl p-4 border border-primary-200">
                                        <div className="text-sm font-bold text-primary-900 mb-1">
                                            {filteredServices.length} Ergebnisse
                                        </div>
                                        <div className="text-xs text-primary-700">
                                            {selectedCategories.length} {selectedCategories.length === 1 ? 'Kategorie' : 'Kategorien'} aktiv
                                        </div>
                                    </div>
                                )}
                                
                                {(selectedCategories.length > 0 || searchQuery) && (
                                    <button
                                        onClick={() => {
                                            setSelectedCategories([]);
                                            setSearchQuery('');
                                        }}
                                        className="w-full px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors text-sm"
                                    >
                                        Alle Filter zurücksetzen
                                    </button>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {/* Mobile Category Selection */}
                        <div className="lg:hidden mb-6">
                            {selectedCategory === null ? (
                                <div>
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-black text-slate-900 mb-2">Kategorien</h2>
                                        <p className="text-slate-600">
                                            {Object.values(servicesByCategory).reduce((acc, services) => 
                                                acc + (Array.isArray(services) ? services.length : 0), 0
                                            )} Services verfügbar
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(servicesByCategory).map(([category, services]) => {
                                            if (!Array.isArray(services) || services.length === 0 || category === 'Business & Finanzen') return null;
                                            return (
                                                <button
                                                    key={category}
                                                    onClick={() => setSelectedCategory(category)}
                                                    className="group relative aspect-square bg-white rounded-2xl p-5 border-2 border-slate-200 hover:border-primary-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
                                                >
                                                    {/* Gradient Overlay on Hover */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/20 transition-all duration-300"></div>
                                                    
                                                    {/* Content */}
                                                    <div className="relative h-full flex flex-col items-center justify-center text-center">
                                                        <div className="w-16 h-16 rounded-2xl bg-primary-50 group-hover:bg-primary-600 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                                            {React.cloneElement(getCategoryIcon(category) as React.ReactElement, { 
                                                                className: 'w-8 h-8 text-primary-600 group-hover:text-white transition-colors' 
                                                            })}
                                                        </div>
                                                        <h3 className="font-bold text-slate-900 text-sm mb-2 leading-tight group-hover:text-primary-700 transition-colors">
                                                            {category}
                                                        </h3>
                                                        <div className="px-3 py-1 bg-slate-100 group-hover:bg-primary-100 rounded-full">
                                                            <span className="text-xs font-bold text-slate-600 group-hover:text-primary-700 transition-colors">
                                                                {services.length}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Corner Badge */}
                                                    <div className="absolute top-2 right-2 w-3 h-3 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <button 
                                        onClick={() => setSelectedCategory(null)} 
                                        className="flex items-center gap-2 text-slate-600 mb-6 font-medium hover:text-slate-900 transition-colors"
                                    >
                                        <ArrowLeftIcon className="w-5 h-5" />
                                        Zurück zu Kategorien
                                    </button>
                                    <div className="bg-white rounded-2xl p-6 border-2 border-primary-200 mb-6">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-14 h-14 rounded-xl bg-primary-600 flex items-center justify-center">
                                                {selectedCategory && getCategoryIcon(selectedCategory)}
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-slate-900">{selectedCategory}</h2>
                                                <p className="text-sm text-slate-600">
                                                    {Array.isArray(servicesByCategory[selectedCategory]) 
                                                        ? `${servicesByCategory[selectedCategory].length} Dienstleistungen`
                                                        : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Services Grid */}
                        {filteredServices.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredServices.map((service, index) => (
                                    <button
                                        key={service.name}
                                        onClick={() => handleRequestService(service.name)}
                                        className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 text-left h-full flex flex-col"
                                    >
                                        {/* Icon Section */}
                                        <div className="mb-5">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 group-hover:from-primary-500 group-hover:to-primary-600 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                                                {React.cloneElement(service.icon as React.ReactElement, { 
                                                    className: 'w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300' 
                                                })}
                                            </div>
                                            
                                            {/* Category Tag */}
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 group-hover:bg-primary-50 rounded-lg transition-colors">
                                                <span className="text-xs font-semibold text-slate-600 group-hover:text-primary-700">
                                                    {service.category}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Content Section */}
                                        <div className="flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-primary-700 transition-colors">
                                                {service.name}
                                            </h3>
                                            
                                            <p className="text-sm text-slate-600 mb-6 leading-relaxed line-clamp-3 flex-grow">
                                                {service.description}
                                            </p>
                                            
                                            {/* CTA Button */}
                                            <div className="mt-auto pt-4 border-t border-slate-100 group-hover:border-primary-100 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-slate-700 group-hover:text-primary-600 transition-colors">
                                                        Kostenlose Anfrage
                                                    </span>
                                                    <div className="w-9 h-9 rounded-lg bg-primary-600 group-hover:bg-primary-700 flex items-center justify-center transition-all group-hover:scale-110 shadow-sm group-hover:shadow-md">
                                                        <ArrowRightIcon className="w-5 h-5 text-white transition-transform group-hover:translate-x-0.5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Hover Indicator */}
                                        <div className="absolute top-4 right-4 w-2 h-2 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                                <div className="text-slate-400 mb-4">
                                    <UsersIcon className="w-16 h-16 mx-auto" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Keine Ergebnisse gefunden</h3>
                                <p className="text-slate-600 mb-6">Versuchen Sie andere Suchbegriffe oder Filter</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategories([]);
                                        setSearchQuery('');
                                    }}
                                    className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                                >
                                    Filter zurücksetzen
                                </button>
                            </div>
                        )}

                        {/* Mobile: Show selected category services */}
                        {selectedCategory && (
                            <div className="lg:hidden mt-6 space-y-4">
                                {Array.isArray(servicesByCategory[selectedCategory]) && 
                                    (servicesByCategory[selectedCategory] as ServiceItem[]).map(service => (
                                        <button
                                            key={service.name}
                                            onClick={() => handleRequestService(service.name)}
                                            className="w-full bg-white rounded-xl p-4 border border-slate-200 hover:border-primary-500 text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
                                                    {React.cloneElement(service.icon as React.ReactElement, { className: 'w-6 h-6' })}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-slate-900 mb-1">{service.name}</h4>
                                                    <p className="text-xs text-slate-600 line-clamp-2">{service.description}</p>
                                                </div>
                                                <ArrowRightIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                            </div>
                                        </button>
                                    ))
                                }
                            </div>
                        )}
                    </main>
                </div>
            </div>
            
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default ServicesPage;
