import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
    ArrowRightIcon, MagnifyingGlassIcon, MapPinIcon, CheckCircleIcon, ShieldCheckIcon, BanknotesIcon, CalendarDaysIcon, 
    ChevronDownIcon, QuoteIcon, StarIcon, RocketLaunchIcon, 
    PhoneIcon, ClockIcon, XMarkIcon, BuildingOfficeIcon, UserIcon, MailIcon,
    ChevronUpDownIcon, PencilIcon, AdjustmentsHorizontalIcon, ToolboxIcon,
    ColoredDiggerIcon, ColoredToolboxIcon, ColoredLeafIcon, ColoredTruckIcon, ColoredPartyPopperIcon, ColoredVacuumCleanerIcon,
    ColoredScaffoldingIcon, ColoredCarIcon, ChevronLeftIcon, ChevronRightIcon
} from '../components/icons';
import { Link, useLocation } from 'react-router-dom';


// --- MOCK DATA ---
interface RentalItem {
    id: number;
    name: string;
    category: string;
    location: string;
    price: string;
    images: string[];
    availability: 'Sofort verfügbar' | 'Auf Anfrage';
    deposit: number;
    description: string;
    specs: { label: string; value: string }[];
    accessories: string[];
    transport: 'Abholung' | 'Lieferung möglich' | 'Abholung & Lieferung';
    minRental: string;
    provider: {
        name: string;
        rating: number;
        reviewCount: number;
        logo: string;
    };
    mapPosition: { top: string; left: string };
}

const allRentalItems: RentalItem[] = [
    { 
        id: 1, name: 'Minibagger 1.8t', category: 'Baumaschinen', location: '8001 Zürich', price: 'CHF 250 / Tag', 
        images: [
            'https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=800&auto=format=fit',
            'https://images.unsplash.com/photo-1629910361909-5a578f7a610f?q=80&w=800&auto=format=fit',
        ],
        availability: 'Sofort verfügbar', deposit: 1000,
        description: 'Kompakter und leistungsstarker Minibagger für Aushubarbeiten in Gärten, Fundamenten und kleinen Baustellen. Einfach zu bedienen und transportieren.',
        specs: [{ label: 'Gewicht', value: '1.8 Tonnen' }, { label: 'Grabtiefe', value: '2.5 Meter' }],
        accessories: ['Tieflöffel 30cm', 'Grabenräumlöffel 100cm'],
        transport: 'Lieferung möglich',
        minRental: '1 Tag',
        provider: { name: 'BauRent AG', rating: 4.8, reviewCount: 45, logo: 'https://ui-avatars.com/api/?name=BauRent' },
        mapPosition: { top: '33%', left: '55%' }
    },
    { 
        id: 2, name: 'Bohrhammer Hilti', category: 'Werkzeuge & Geräte', location: '3000 Bern', price: 'CHF 45 / Tag', 
        images: ['https://images.unsplash.com/photo-1581155694820-a1e33d49f257?q=80&w=800&auto=format=fit'], 
        availability: 'Sofort verfügbar', deposit: 200,
        description: 'Professioneller Bohrhammer für schwere Bohr- und Meisselarbeiten in Beton und Mauerwerk. Inklusive robustem Transportkoffer.',
        specs: [{ label: 'Leistung', value: '850 W' }],
        accessories: ['Spitzmeissel', 'Flachmeissel', 'Bohrerset (6-16mm)'],
        transport: 'Abholung',
        minRental: '1 Tag',
        provider: { name: 'Werkzeug-Profi Bern', rating: 4.9, reviewCount: 112, logo: 'https://ui-avatars.com/api/?name=Werkzeug+Profi' },
        mapPosition: { top: '45%', left: '30%' }
    },
    { 
        id: 3, name: 'Gartenfräse Benzin', category: 'Garten & Landschaft', location: '4051 Basel', price: 'CHF 70 / Tag', 
        images: ['https://images.unsplash.com/photo-1621997385536-235163153f3e?q=80&w=800&auto=format=fit'], 
        availability: 'Auf Anfrage', deposit: 250,
        description: 'Leistungsstarke Gartenfräse zur Auflockerung von Böden und Vorbereitung von Saatbeeten.',
        specs: [{ label: 'Arbeitsbreite', value: '60 cm' }],
        accessories: [],
        transport: 'Abholung',
        minRental: '1 Tag',
        provider: { name: 'Garten-Geräte Basel', rating: 4.7, reviewCount: 32, logo: 'https://ui-avatars.com/api/?name=Garten+Geräte' },
        mapPosition: { top: '25%', left: '32%' }
    },
    { 
        id: 4, name: 'Lieferwagen 3.5t', category: 'Transport & Umzug', location: '6000 Luzern', price: 'CHF 120 / Tag', 
        images: ['https://images.unsplash.com/photo-1621992011153-f3fb15bad52f?q=80&w=800&auto=format=fit'], 
        availability: 'Sofort verfügbar', deposit: 500,
        description: 'Geräumiger Lieferwagen mit Hebebühne, perfekt für Umzüge und grosse Transporte.',
        specs: [{ label: 'Ladevolumen', value: '20 m³' }],
        accessories: ['Sackkarre', 'Spanngurte (Set)'],
        transport: 'Abholung',
        minRental: '4 Stunden',
        provider: { name: 'Zügle-Blitz GmbH', rating: 4.9, reviewCount: 88, logo: 'https://ui-avatars.com/api/?name=Zuegle+Blitz' },
        mapPosition: { top: '48%', left: '48%' }
    },
    { 
        id: 5, name: 'Festzelt 5x10m', category: 'Event & Party', location: '9000 St. Gallen', price: 'CHF 350 / Wochenende', 
        images: ['https://images.unsplash.com/photo-1567595655380-e0b0333a7637?q=80&w=800&auto=format=fit'], 
        availability: 'Sofort verfügbar', deposit: 400,
        description: 'Professionelles Festzelt für bis zu 80 Personen. Wasserdicht und robust.',
        specs: [{ label: 'Grösse', value: '5m x 10m' }],
        accessories: ['Festbankgarnituren (optional)'],
        transport: 'Abholung & Lieferung',
        minRental: '1 Wochenende',
        provider: { name: 'Event-Miet SG', rating: 4.8, reviewCount: 61, logo: 'https://ui-avatars.com/api/?name=Event+Miet' },
        mapPosition: { top: '30%', left: '75%' }
    },
    { 
        id: 6, name: 'Teppichreinigungsgerät', category: 'Reinigung', location: '1201 Genf', price: 'CHF 50 / Tag', 
        images: ['https://images.unsplash.com/photo-1628135543633-b5f70d74b868?q=80&w=800&auto=format=fit'], 
        availability: 'Auf Anfrage', deposit: 150,
        description: 'Profi-Sprühextraktionsgerät zur Tiefenreinigung von Teppichen und Polstern.',
        specs: [{ label: 'Frischwassertank', value: '8 Liter' }],
        accessories: ['Polsterdüse', 'Bodendüse'],
        transport: 'Abholung',
        minRental: '1 Tag',
        provider: { name: 'Sauber-Mieten', rating: 4.6, reviewCount: 28, logo: 'https://ui-avatars.com/api/?name=Sauber+Mieten' },
        mapPosition: { top: '65%', left: '8%' }
    },
];

const categories = [
    { name: 'Alle', icon: <ToolboxIcon /> },
    { name: 'Baumaschinen', icon: <ColoredDiggerIcon /> },
    { name: 'Werkzeuge & Geräte', icon: <ColoredToolboxIcon /> },
    { name: 'Garten & Landschaft', icon: <ColoredLeafIcon /> },
    { name: 'Transport & Umzug', icon: <ColoredTruckIcon /> },
    { name: 'Event & Party', icon: <ColoredPartyPopperIcon /> },
    { name: 'Reinigung', icon: <ColoredVacuumCleanerIcon /> },
    { name: 'Gerüste & Bauzubehör', icon: <ColoredScaffoldingIcon /> },
    { name: 'Fahrzeuge', icon: <ColoredCarIcon /> },
];

const SwitzerlandMapSVG = () => (
    <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M104.6,156.4l-3.3,0.3l-2.6-1.5l-4.2,0.9l-2.1,1.9l-4-1.7l-2.9,1.1l-1.9-2.1l-4.2,0.7l-2.1-3.3l-4.4,0.7l-0.7-3.1l-5.3-0.9l-1.9-2.1l-2.4,1.7l-4.4-1.5l-4.2-4.2l-1.9-3.7l-4.4-1.9l-1.9-3.1l-2.9-1.3l-2.2-4l-1.5-4.4l-1.1-4.2l-3.5-3.1l-1.9-4.2l-3.1-2.9l-1.7-4.4l0.4-3.7l2.2-2.1l1.1-4l0.9-4.4l3.1-2.9l3.5-2.2l4.2-1.9l4-0.4l3.1-1.7l4-1.1l3.5,0.4l2.4-1.1l2.9-2.4l3.7-1.1l3.5,1.1l2.4-1.5l2.1-2.6l2.9-0.7l2.2,1.1l2.4-1.1l2.6,1.1l2.4,2.6l2.9-0.4l2.2,1.1l2.4-1.1l3.1,1.5l2.9,2.9l4.4,0.7l3.7,2.2l4.2,0.2l3.7,2.4l4.4-0.7l3.7,1.9l4,0.4l3.5-1.5l4.2,1.1l3.7-1.1l3.5,1.5l2.6-1.1l2.9,1.1l2.6,2.2l3.1,0.2l2.6,2.2l2.9-0.2l2.9,1.9l3.1,0.4l2.9,2.2l3.3,0.2l3.1,2.4l2.9-0.7l3.1,1.9l2.9,0.2l3.1,2.2l2.9,0.2l3.1,2.4l2.9-0.4l3.1,2.2l2.9,0.2l3.1,2.2l2.9-0.2l3.1,2.2l2.9-0.2l3.1,2.4l2.9-0.2l3.1,2.2l2.9,0.2l3.1,2.2l2.9,0.2l3.1,2.4l2.9-0.4l3.1,2.2l2.9,0.2l3.1,2.2l2.9,0.2l3.1,2.4l2.9-0.2l3.1,2.2l2.9,0.2l3.1,2.2l2.9,0.2l3.1,2.4l2.9-0.4z" 
              fill="currentColor" 
              opacity="0.15" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeOpacity="0.3" />
    </svg>
);

export default function RentPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const filteredItems = useMemo(() => {
        return allRentalItems.filter(item => {
            const matchesCategory = selectedCategory === 'Alle' || item.category === selectedCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 item.location.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <SwitzerlandMapSVG />
                </div>
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Baumaschinen & Geräte mieten
                        </h1>
                        <p className="text-lg md:text-xl text-primary-100 mb-8">
                            Finden Sie schnell und einfach das passende Gerät für Ihr Projekt
                        </p>
                        
                        {/* Search Bar */}
                        <div className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2">
                            <div className="flex-1 flex items-center gap-3 px-4">
                                <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Was suchen Sie? (z.B. Minibagger, Bohrmaschine...)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 py-3 text-slate-900 placeholder-slate-400 focus:outline-none"
                                />
                            </div>
                            <button className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                                <span>Suchen</span>
                                <ArrowRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                                    selectedCategory === category.name
                                        ? 'bg-primary-600 text-white shadow-lg'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                <span className="w-5 h-5">{category.icon}</span>
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 max-w-6xl py-12">
                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-slate-600">
                        <span className="font-bold text-slate-900">{filteredItems.length}</span> Geräte gefunden
                    </p>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-slate-100">
                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                        item.availability === 'Sofort verfügbar'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-orange-500 text-white'
                                    }`}>
                                        {item.availability}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                                <div className="flex items-center gap-2 text-slate-600 mb-3">
                                    <MapPinIcon className="w-4 h-4" />
                                    <span className="text-sm">{item.location}</span>
                                </div>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                                
                                {/* Price & Rating */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                                    <div>
                                        <div className="text-2xl font-black text-primary-600">{item.price}</div>
                                        <div className="text-xs text-slate-500">Mindestmiete: {item.minRental}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 mb-1">
                                            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-bold text-slate-900">{item.provider.rating}</span>
                                        </div>
                                        <div className="text-xs text-slate-500">{item.provider.reviewCount} Bewertungen</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-slate-600 mb-4">Keine Ergebnisse gefunden</p>
                        <p className="text-slate-500">Versuchen Sie es mit anderen Suchbegriffen oder Kategorien</p>
                    </div>
                )}
            </div>

            {/* Item Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        {/* Image Gallery */}
                        <div className="relative h-64 md:h-96 bg-slate-100">
                            <img
                                src={selectedItem.images[currentImageIndex]}
                                alt={selectedItem.name}
                                className="w-full h-full object-cover"
                            />
                            {selectedItem.images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedItem.images.length - 1));
                                        }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
                                    >
                                        <ChevronLeftIcon className="w-6 h-6 text-slate-900" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex((prev) => (prev < selectedItem.images.length - 1 ? prev + 1 : 0));
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
                                    >
                                        <ChevronRightIcon className="w-6 h-6 text-slate-900" />
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {selectedItem.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex(index);
                                                }}
                                                className={`w-2 h-2 rounded-full transition-all ${
                                                    currentImageIndex === index ? 'bg-white w-8' : 'bg-white/50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6 text-slate-900" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedItem.name}</h2>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <MapPinIcon className="w-5 h-5" />
                                        <span>{selectedItem.location}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-black text-primary-600 mb-1">{selectedItem.price}</div>
                                    <div className="text-sm text-slate-500">Mindestmiete: {selectedItem.minRental}</div>
                                </div>
                            </div>

                            {/* Provider Info */}
                            <div className="bg-slate-50 rounded-xl p-4 mb-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                                    <span className="text-primary-600 font-bold">{selectedItem.provider.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-slate-900">{selectedItem.provider.name}</div>
                                    <div className="flex items-center gap-2">
                                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-semibold">{selectedItem.provider.rating}</span>
                                        <span className="text-sm text-slate-500">({selectedItem.provider.reviewCount} Bewertungen)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Beschreibung</h3>
                                <p className="text-slate-600">{selectedItem.description}</p>
                            </div>

                            {/* Specs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">Technische Daten</h3>
                                    <div className="space-y-2">
                                        {selectedItem.specs.map((spec, index) => (
                                            <div key={index} className="flex justify-between py-2 border-b border-slate-200">
                                                <span className="text-slate-600">{spec.label}</span>
                                                <span className="font-semibold text-slate-900">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between py-2 border-b border-slate-200">
                                            <span className="text-slate-600">Kaution</span>
                                            <span className="font-semibold text-slate-900">CHF {selectedItem.deposit}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-200">
                                            <span className="text-slate-600">Transport</span>
                                            <span className="font-semibold text-slate-900">{selectedItem.transport}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-200">
                                            <span className="text-slate-600">Verfügbarkeit</span>
                                            <span className={`font-semibold ${
                                                selectedItem.availability === 'Sofort verfügbar' ? 'text-green-600' : 'text-orange-600'
                                            }`}>
                                                {selectedItem.availability}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Accessories */}
                            {selectedItem.accessories.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">Zubehör inklusive</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.accessories.map((accessory, index) => (
                                            <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-sm font-semibold">
                                                {accessory}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                                <button className="flex-1 bg-primary-600 text-white font-bold px-6 py-4 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                                    <PhoneIcon className="w-5 h-5" />
                                    <span>Jetzt anfragen</span>
                                </button>
                                <button className="flex-1 bg-white text-primary-600 font-bold px-6 py-4 rounded-xl border-2 border-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
                                    <MailIcon className="w-5 h-5" />
                                    <span>Nachricht senden</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
