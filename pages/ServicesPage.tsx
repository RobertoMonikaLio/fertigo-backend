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
} from '../components/icons';
import { useAppContext } from './AppContext';
import { useInView } from 'react-intersection-observer';

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

const categoryColors: Record<string, { bg: string; text: string; border: string; light: string }> = {
    'Bau & Rohbau': { bg: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-200', light: 'bg-amber-50' },
    'Innenausbau': { bg: 'bg-orange-500', text: 'text-orange-700', border: 'border-orange-200', light: 'bg-orange-50' },
    'Haustechnik': { bg: 'bg-yellow-500', text: 'text-yellow-700', border: 'border-yellow-200', light: 'bg-yellow-50' },
    'Renovation & Gestaltung': { bg: 'bg-rose-500', text: 'text-rose-700', border: 'border-rose-200', light: 'bg-rose-50' },
    'Umzug & Transport': { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-200', light: 'bg-blue-50' },
    'Reinigung & Pflege': { bg: 'bg-cyan-500', text: 'text-cyan-700', border: 'border-cyan-200', light: 'bg-cyan-50' },
    'Garten & Aussenbereich': { bg: 'bg-green-500', text: 'text-green-700', border: 'border-green-200', light: 'bg-green-50' },
    'Fahrzeuge & Maschinen': { bg: 'bg-slate-500', text: 'text-slate-700', border: 'border-slate-200', light: 'bg-slate-50' },
    'IT & Digital': { bg: 'bg-violet-500', text: 'text-violet-700', border: 'border-violet-200', light: 'bg-violet-50' },
    'Events & Kreatives': { bg: 'bg-pink-500', text: 'text-pink-700', border: 'border-pink-200', light: 'bg-pink-50' },
    'Business & Finanzen': { bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200', light: 'bg-emerald-50' },
    'Persönliche Dienste': { bg: 'bg-indigo-500', text: 'text-indigo-700', border: 'border-indigo-200', light: 'bg-indigo-50' },
    'Gesundheit & Wellness': { bg: 'bg-teal-500', text: 'text-teal-700', border: 'border-teal-200', light: 'bg-teal-50' },
    'Bildung & Unterricht': { bg: 'bg-purple-500', text: 'text-purple-700', border: 'border-purple-200', light: 'bg-purple-50' },
    'Tierdienstleistungen': { bg: 'bg-lime-500', text: 'text-lime-700', border: 'border-lime-200', light: 'bg-lime-50' },
};

const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
        'Bau & Rohbau': <ColoredBuildingOffice2Icon className="w-5 h-5" />,
        'Innenausbau': <ColoredWindowIcon className="w-5 h-5" />,
        'Haustechnik': <ColoredLightbulbIcon className="w-5 h-5" />,
        'Renovation & Gestaltung': <ColoredPaintRollerIcon className="w-5 h-5" />,
        'Umzug & Transport': <ColoredTruckIcon className="w-5 h-5" />,
        'Reinigung & Pflege': <ColoredSparklesIcon className="w-5 h-5" />,
        'Garten & Aussenbereich': <ColoredLeafIcon className="w-5 h-5" />,
        'Fahrzeuge & Maschinen': <ColoredDiggerIcon className="w-5 h-5" />,
        'IT & Digital': <ColoredPencilIcon className="w-5 h-5" />,
        'Events & Kreatives': <ColoredPartyPopperIcon className="w-5 h-5" />,
        'Business & Finanzen': <ColoredArchiveBoxIcon className="w-5 h-5" />,
        'Persönliche Dienste': <ColoredUserIcon className="w-5 h-5" />,
        'Gesundheit & Wellness': <ColoredUserIcon className="w-5 h-5" />,
        'Bildung & Unterricht': <ColoredPencilIcon className="w-5 h-5" />,
        'Tierdienstleistungen': <ColoredHomeModernIcon className="w-5 h-5" />,
    };
    return iconMap[category] || <ColoredWrenchScrewdriverIcon className="w-5 h-5" />;
};

const ServicesPage: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

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
        let services = activeCategory 
            ? servicesByCategory[activeCategory] || []
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
    }, [activeCategory, searchQuery, servicesByCategory]);

    const handleRequestService = (serviceName: string) => {
        openQuoteModal({ projectTitle: serviceName, service: serviceName });
    };

    const stats = [
        { value: "50+", label: "Dienstleistungen" },
        { value: "500+", label: "Partner" },
        { value: "2'500+", label: "Zufriedene Kunden" },
        { value: "4.9", label: "Bewertung", icon: <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" /> },
    ];

    return (
        <div className="bg-white min-h-screen">
            <section 
                ref={heroRef}
                className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-32 overflow-hidden"
            >
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative container mx-auto px-6 max-w-6xl">
                    <div className={`text-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-white/90 text-sm font-medium">Über 50 Dienstleistungen verfügbar</span>
                        </div>
                        
                        <h1 className="font-title text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Finden Sie den perfekten
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-400">
                                Dienstleister
                            </span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                            Von Umzug bis Renovation – entdecken Sie unser breites Angebot an professionellen Services für Ihr Projekt.
                        </p>

                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="w-6 h-6 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Was suchen Sie? z.B. Umzug, Maler, Elektriker..."
                                    className="w-full pl-14 pr-6 py-5 rounded-2xl border-0 bg-white text-slate-900 text-lg placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/30 shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            <section className="py-12 -mt-16 relative z-10">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                                activeCategory === null
                                    ? 'bg-slate-900 text-white shadow-lg'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            Alle Services
                        </button>
                        {categoryOrder.filter(cat => servicesByCategory[cat]?.length > 0 && cat !== 'Business & Finanzen').map(category => {
                            const colors = categoryColors[category];
                            const isActive = activeCategory === category;
                            
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(isActive ? null : category)}
                                    className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                                        isActive
                                            ? `${colors.bg} text-white shadow-lg`
                                            : `bg-white ${colors.text} hover:${colors.light} border ${colors.border}`
                                    }`}
                                >
                                    {getCategoryIcon(category)}
                                    <span className="hidden sm:inline">{category}</span>
                                    <span className="sm:hidden">{category.split(' ')[0]}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-slate-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                {activeCategory || 'Alle Dienstleistungen'}
                            </h2>
                            <p className="text-slate-500 mt-1">
                                {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'} gefunden
                            </p>
                        </div>
                        
                        {(searchQuery || activeCategory) && (
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory(null); }}
                                className="text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Filter zurücksetzen
                            </button>
                        )}
                    </div>

                    {filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredServices.map((service) => {
                                const colors = categoryColors[service.category];
                                
                                return (
                                    <button
                                        key={service.name}
                                        onClick={() => handleRequestService(service.name)}
                                        className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 text-left flex flex-col"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`w-12 h-12 rounded-xl ${colors.light} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                {React.cloneElement(service.icon as React.ReactElement, { 
                                                    className: `w-6 h-6 ${colors.text}` 
                                                })}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                                                    {service.name}
                                                </h3>
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors.light} ${colors.text}`}>
                                                    {service.category}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-2">
                                            {service.description}
                                        </p>
                                        
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className="text-sm font-semibold text-primary-600">
                                                Offerte anfragen
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-primary-50 group-hover:bg-primary-600 flex items-center justify-center transition-colors">
                                                <ArrowRightIcon className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MagnifyingGlassIcon className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Keine Ergebnisse</h3>
                            <p className="text-slate-500 mb-6">Versuchen Sie andere Suchbegriffe oder wählen Sie eine andere Kategorie.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory(null); }}
                                className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                            >
                                Alle Services anzeigen
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section ref={statsRef} className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className={`text-center mb-12 transition-all duration-1000 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <h2 className="font-title text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Warum Fertigo?
                        </h2>
                        <p className="text-slate-600 max-w-xl mx-auto">
                            Tausende Kunden vertrauen auf unsere Plattform für ihre Projekte.
                        </p>
                    </div>
                    
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center p-6 bg-slate-50 rounded-2xl">
                                <div className="flex items-center justify-center gap-1 text-4xl font-bold text-slate-900 mb-2">
                                    {stat.value}
                                    {stat.icon}
                                </div>
                                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className={`mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 sm:p-12 text-center transition-all duration-1000 delay-400 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Bereit für Ihr Projekt?
                        </h3>
                        <p className="text-primary-100 mb-8 max-w-lg mx-auto">
                            Erhalten Sie kostenlos und unverbindlich bis zu 5 Offerten von geprüften Anbietern.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button 
                                onClick={() => openQuoteModal({})}
                                className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg flex items-center gap-2"
                            >
                                Jetzt Offerte anfragen
                                <ArrowRightIcon className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-2 text-white/80 text-sm">
                                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                                100% kostenlos & unverbindlich
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
