import React, { useState, useMemo, useEffect } from 'react';
import { 
    ToolboxIcon, 
    BanknotesIcon, 
    MagnifyingGlassIcon,
    MapPinIcon,
    AdjustmentsHorizontalIcon,
    XMarkIcon,
    Squares2X2Icon,
    ListBulletIcon,
    ShieldCheckIcon,
    MailIcon,
    ClockIcon,
    CalendarDaysIcon,
    SparklesIcon,
    ArrowRightIcon,
    HeartIcon,
    EyeIcon,
    StarIcon,
    CheckCircleIcon,
    PhoneIcon,
} from '../components/icons';

interface MarketplaceItem {
  id: string;
  type: 'rent' | 'buy';
  name: string;
  category: string;
  location: string;
  price: number;
  priceUnit: string;
  images: string[];
  condition?: 'Neuwertig' | 'Sehr gut' | 'Gut' | 'Gebraucht';
  year?: number;
  description: string;
  provider: { name: string; isVerified: boolean; memberSince: number; logoChar: string; rating: number; reviews: number };
  createdAt: string;
  views: number;
  isFeatured?: boolean;
}

const marketplaceItems: MarketplaceItem[] = [
  { id: 'rent-1', type: 'rent', name: 'Minibagger 1.8t', category: 'Baumaschinen', location: '8001 Zürich', price: 250, priceUnit: '/ Tag', images: ['https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=800&auto=format=fit'], year: 2021, description: 'Kompakter und leistungsstarker Minibagger für Aushubarbeiten. Perfekt für kleine bis mittlere Bauprojekte.', provider: { name: 'BauRent AG', isVerified: true, memberSince: 2020, logoChar: 'B', rating: 4.9, reviews: 127 }, createdAt: '2024-07-28', views: 342, isFeatured: true },
  { id: 'buy-1', type: 'buy', name: 'Occasion Minibagger 2.5t', category: 'Baumaschinen', location: '8004 Zürich', price: 28500, priceUnit: '', images: ['https://images.unsplash.com/photo-1604325379430-1cd17b78a9c3?q=80&w=800&auto=format=fit-crop', 'https://images.unsplash.com/photo-1629910361909-5a578f7a610f?q=80&w=800&auto=format=fit-crop'], condition: 'Sehr gut', year: 2020, description: 'Zuverlässiger Minibagger, Service regelmässig durchgeführt.', provider: { name: 'Müller Baugeräte', isVerified: true, memberSince: 2019, logoChar: 'M', rating: 4.7, reviews: 89 }, createdAt: '2024-07-27', views: 256 },
  { id: 'rent-2', type: 'rent', name: 'Bohrhammer Hilti TE 70', category: 'Werkzeuge', location: '3000 Bern', price: 45, priceUnit: '/ Tag', images: ['https://images.unsplash.com/photo-1581155694820-a1e33d49f257?q=80&w=800&auto=format=fit'], year: 2023, description: 'Professioneller Bohrhammer für schwere Bohr- und Meisselarbeiten. Inkl. Koffer und Zubehör.', provider: { name: 'Werkzeug Profi', isVerified: true, memberSince: 2021, logoChar: 'W', rating: 4.8, reviews: 64 }, createdAt: '2024-07-26', views: 189, isFeatured: true },
  { id: 'buy-2', type: 'buy', name: 'Lieferwagen Ford Transit', category: 'Fahrzeuge', location: '3000 Bern', price: 19900, priceUnit: '', images: ['https://images.unsplash.com/photo-1587582423116-803717d74149?q=80&w=800&auto=format=fit-crop'], condition: 'Gut', year: 2020, description: 'Gepflegter Ford Transit Kastenwagen. Hochdach, Anhängerkupplung.', provider: { name: 'Auto Handel AG', isVerified: false, memberSince: 2022, logoChar: 'A', rating: 4.2, reviews: 23 }, createdAt: '2024-07-25', views: 445 },
  { id: 'rent-3', type: 'rent', name: 'Gartenfräse Benzin 6.5 PS', category: 'Garten', location: '4051 Basel', price: 70, priceUnit: '/ Tag', images: ['https://images.unsplash.com/photo-1621997385536-235163153f3e?q=80&w=800&auto=format=fit'], year: 2022, description: 'Leistungsstarke Gartenfräse zur Auflockerung von Böden. Ideal für Gartenumgestaltung.', provider: { name: 'Garten-Geräte Basel', isVerified: true, memberSince: 2021, logoChar: 'G', rating: 4.6, reviews: 51 }, createdAt: '2024-07-24', views: 167 },
  { id: 'buy-3', type: 'buy', name: 'Fassadengerüst Occasion 100m²', category: 'Gerüste', location: '6000 Luzern', price: 4200, priceUnit: '', images: ['https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=800&auto=format=fit-crop'], condition: 'Gebraucht', year: 2018, description: 'Komplettes Fassadengerüst zu verkaufen. Stahlrahmen, Holzböden.', provider: { name: 'Gerüstbau Meier', isVerified: true, memberSince: 2020, logoChar: 'M', rating: 4.5, reviews: 38 }, createdAt: '2024-07-23', views: 298 },
];

const categories = [...new Set(marketplaceItems.map(item => item.category))];

const MarketplacePage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState('Alle');

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: 'Alle',
        location: '',
        priceMin: '',
        priceMax: '',
    });
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        document.body.style.overflow = isFilterOpen || selectedItem ? 'hidden' : 'auto';
    }, [isFilterOpen, selectedItem]);

    const toggleFavorite = (id: string) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };
    
    const filteredItems = useMemo(() => {
        let items = marketplaceItems
            .filter(item => item.type === 'rent')
            .filter(item => searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(item => filters.category === 'Alle' || item.category === filters.category)
            .filter(item => filters.location === '' || item.location.toLowerCase().includes(filters.location.toLowerCase()));

        if (filters.priceMin) items = items.filter(item => item.price >= parseFloat(filters.priceMin));
        if (filters.priceMax) items = items.filter(item => item.price <= parseFloat(filters.priceMax));
        
        if (sortOrder === 'price_asc') items.sort((a, b) => a.price - b.price);
        else if (sortOrder === 'price_desc') items.sort((a, b) => b.price - a.price);
        else if (sortOrder === 'popular') items.sort((a, b) => b.views - a.views);
        else items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return items;
    }, [searchTerm, filters, sortOrder]);

    const featuredItems = filteredItems.filter(item => item.isFeatured);
    
    const resetFilters = () => {
        setFilters({ category: 'Alle', location: '', priceMin: '', priceMax: ''});
        setActiveCategory('Alle');
    };

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setFilters(f => ({...f, category}));
    };

    const ItemCard: React.FC<{ item: MarketplaceItem; featured?: boolean }> = ({ item, featured }) => (
        <div className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${featured ? 'ring-2 ring-amber-400 shadow-lg' : 'shadow-md hover:-translate-y-1'}`}>
            {featured && (
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                    <SparklesIcon className="w-3.5 h-3.5" />
                    Top-Angebot
                </div>
            )}
            
            <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${favorites.includes(item.id) ? 'bg-rose-500 text-white' : 'bg-white/90 backdrop-blur-sm text-slate-400 hover:text-rose-500'}`}
            >
                <HeartIcon className={`w-4.5 h-4.5 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
            </button>

            <button onClick={() => setSelectedItem(item)} className="w-full text-left">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                            <EyeIcon className="w-3.5 h-3.5" />
                            {item.views} Aufrufe
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700">
                            <StarIcon className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            {item.provider.rating}
                        </div>
                    </div>
                </div>
                
                <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
                            {item.category}
                        </span>
                        {item.provider.isVerified && (
                            <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                                <ShieldCheckIcon className="w-4 h-4"/>
                                Verifiziert
                            </div>
                        )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {item.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                        <MapPinIcon className="w-4 h-4 text-slate-400" /> 
                        <span>{item.location}</span>
                    </div>
                    
                    <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                        <div>
                            <p className="text-xs text-slate-400 mb-0.5">ab</p>
                            <p className="text-2xl font-black text-slate-900">
                                CHF {item.price.toLocaleString('de-CH')}
                                <span className="text-sm font-medium text-slate-500">{item.priceUnit}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-1 text-primary-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            Details
                            <ArrowRightIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );

    const ItemRow: React.FC<{ item: MarketplaceItem }> = ({ item }) => (
        <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <button onClick={() => setSelectedItem(item)} className="w-full text-left flex flex-col md:flex-row">
                <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0 bg-slate-100 overflow-hidden">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    {item.isFeatured && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                            <SparklesIcon className="w-3.5 h-3.5" />
                            Top
                        </div>
                    )}
                    <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${favorites.includes(item.id) ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-400 hover:text-rose-500'}`}
                    >
                        <HeartIcon className={`w-4.5 h-4.5 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                    </button>
                </div>
                
                <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full mb-2">
                                {item.category}
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{item.name}</h3>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="text-xs text-slate-400 mb-0.5">ab</p>
                            <p className="text-2xl font-black text-slate-900">CHF {item.price.toLocaleString('de-CH')}<span className="text-sm font-medium text-slate-500">{item.priceUnit}</span></p>
                        </div>
                    </div>
                    
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">{item.description}</p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MapPinIcon className="w-4 h-4" /> 
                                {item.location}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <StarIcon className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="font-semibold text-slate-700">{item.provider.rating}</span>
                                <span className="text-slate-400">({item.provider.reviews})</span>
                            </div>
                            {item.provider.isVerified && (
                                <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                                    <ShieldCheckIcon className="w-4 h-4"/>
                                    Verifiziert
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-1 text-primary-600 font-semibold text-sm">
                            Details ansehen
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );

    const ItemDetailModal = () => {
        if (!selectedItem) return null;
        return (
            <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
                <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                    <div className="relative">
                        <div className="aspect-video bg-slate-100 overflow-hidden">
                            <img src={selectedItem.images[0]} alt={selectedItem.name} className="w-full h-full object-cover"/>
                        </div>
                        <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                            <XMarkIcon className="w-5 h-5"/>
                        </button>
                        {selectedItem.isFeatured && (
                            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                                <SparklesIcon className="w-4 h-4" />
                                Top-Angebot
                            </div>
                        )}
                    </div>
                    
                    <div className="p-8 overflow-y-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 space-y-6">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full mb-3">
                                        {selectedItem.category}
                                    </span>
                                    <h2 className="text-3xl font-black text-slate-900 mb-2">{selectedItem.name}</h2>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <MapPinIcon className="w-4 h-4" /> 
                                            {selectedItem.location}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <EyeIcon className="w-4 h-4" /> 
                                            {selectedItem.views} Aufrufe
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CalendarDaysIcon className="w-4 h-4" /> 
                                            Baujahr {selectedItem.year}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="prose prose-slate">
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Beschreibung</h4>
                                    <p className="text-slate-600">{selectedItem.description}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500 mb-1">Zustand</p>
                                        <p className="font-bold text-slate-900">{selectedItem.condition || 'Gut gepflegt'}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <p className="text-xs text-slate-500 mb-1">Baujahr</p>
                                        <p className="font-bold text-slate-900">{selectedItem.year}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-2">
                                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 sticky top-0">
                                    <div className="text-center mb-6">
                                        <p className="text-sm text-slate-500 mb-1">Mietpreis ab</p>
                                        <p className="text-4xl font-black text-slate-900">
                                            CHF {selectedItem.price.toLocaleString('de-CH')}
                                            <span className="text-lg font-medium text-slate-500">{selectedItem.priceUnit}</span>
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-3 mb-6">
                                        <button className="w-full bg-primary-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25">
                                            <MailIcon className="w-5 h-5" />
                                            Anfrage senden
                                        </button>
                                        <button className="w-full bg-white text-slate-700 font-bold py-4 px-6 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 border-2 border-slate-200">
                                            <PhoneIcon className="w-5 h-5" />
                                            Anrufen
                                        </button>
                                    </div>
                                    
                                    <div className="border-t border-slate-200 pt-6">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">Anbieter</p>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-black text-xl">
                                                {selectedItem.provider.logoChar}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{selectedItem.provider.name}</p>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <StarIcon className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                        <span className="font-semibold">{selectedItem.provider.rating}</span>
                                                    </div>
                                                    <span className="text-slate-400">({selectedItem.provider.reviews} Bewertungen)</span>
                                                </div>
                                            </div>
                                        </div>
                                        {selectedItem.provider.isVerified && (
                                            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-2 rounded-lg">
                                                <CheckCircleIcon className="w-5 h-5"/>
                                                Verifizierter Partner seit {selectedItem.provider.memberSince}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {selectedItem && <ItemDetailModal />}
            
            {isFilterOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsFilterOpen(false)}>
                    <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-5 border-b">
                            <h3 className="font-bold text-lg">Filter</h3>
                            <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                                <XMarkIcon className="w-6 h-6"/>
                            </button>
                        </div>
                        <div className="p-5 space-y-6">
                            <div>
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3 block">Standort</label>
                                <div className="relative">
                                    <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Stadt oder PLZ"
                                        value={filters.location}
                                        onChange={(e) => setFilters(f => ({...f, location: e.target.value}))}
                                        className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3 block">Preisbereich (CHF / Tag)</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.priceMin}
                                        onChange={(e) => setFilters(f => ({...f, priceMin: e.target.value}))}
                                        className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.priceMax}
                                        onChange={(e) => setFilters(f => ({...f, priceMax: e.target.value}))}
                                        className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                            </div>
                            <div className="pt-4 space-y-3">
                                <button 
                                    onClick={() => setIsFilterOpen(false)}
                                    className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl"
                                >
                                    {filteredItems.length} Ergebnisse anzeigen
                                </button>
                                <button onClick={resetFilters} className="w-full text-slate-600 font-semibold py-3">
                                    Filter zurücksetzen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px]"></div>
                </div>
                
                <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-primary-400 font-bold bg-primary-500/10 border border-primary-500/20 px-4 py-2 rounded-full text-sm mb-6">
                            <ToolboxIcon className="w-4 h-4"/>
                            Equipment Marktplatz
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Profi-Equipment<br/>
                            <span className="bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">mieten statt kaufen</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl">
                            Schweizweit Baumaschinen, Werkzeuge und Geräte von verifizierten Anbietern zu fairen Preisen.
                        </p>
                        
                        <div className="bg-white rounded-2xl p-2 shadow-2xl">
                            <div className="flex flex-col md:flex-row gap-2">
                                <div className="flex-1 relative">
                                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Was möchten Sie mieten?"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50 border-0 text-base focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div className="md:w-52 relative">
                                    <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Ort / PLZ"
                                        value={filters.location}
                                        onChange={(e) => setFilters(f => ({...f, location: e.target.value}))}
                                        className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50 border-0 text-base focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <button className="h-14 px-8 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                                    <MagnifyingGlassIcon className="w-5 h-5" />
                                    <span className="hidden sm:inline">Suchen</span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="text-slate-400 text-sm">Beliebt:</span>
                            {['Minibagger', 'Bohrhammer', 'Gerüst', 'Lieferwagen'].map(term => (
                                <button 
                                    key={term}
                                    onClick={() => setSearchTerm(term)}
                                    className="text-sm text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 px-3 py-1.5 rounded-full transition-colors"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Pills */}
            <section className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center gap-4 py-4 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => handleCategoryClick('Alle')}
                            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                                activeCategory === 'Alle' 
                                    ? 'bg-slate-900 text-white' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Alle Kategorien
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                                    activeCategory === cat 
                                        ? 'bg-primary-600 text-white' 
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                        
                        <div className="flex-shrink-0 ml-auto flex items-center gap-2">
                            <button 
                                onClick={() => setIsFilterOpen(true)} 
                                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-200 rounded-full text-sm font-semibold text-slate-600 hover:border-slate-300"
                            >
                                <AdjustmentsHorizontalIcon className="w-4 h-4"/>
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Items */}
            {featuredItems.length > 0 && activeCategory === 'Alle' && (
                <section className="py-12 bg-gradient-to-b from-amber-50/50 to-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                                <SparklesIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Top-Angebote</h2>
                                <p className="text-sm text-slate-500">Ausgewählte Highlights unserer Partner</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredItems.map(item => (
                                <ItemCard key={item.id} item={item} featured />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Main Results */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">
                                {activeCategory === 'Alle' ? 'Alle Angebote' : activeCategory}
                            </h2>
                            <p className="text-slate-500">
                                <span className="font-semibold text-slate-900">{filteredItems.length}</span> Angebote gefunden
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <select 
                                value={sortOrder} 
                                onChange={e => setSortOrder(e.target.value)} 
                                className="h-11 px-4 pr-10 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white appearance-none cursor-pointer"
                            >
                                <option value="newest">Neueste</option>
                                <option value="popular">Beliebteste</option>
                                <option value="price_asc">Preis ↑</option>
                                <option value="price_desc">Preis ↓</option>
                            </select>
                            
                            <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1">
                                <button 
                                    onClick={() => setViewMode('grid')} 
                                    className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <Squares2X2Icon className="w-5 h-5"/>
                                </button>
                                <button 
                                    onClick={() => setViewMode('list')} 
                                    className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <ListBulletIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    {filteredItems.length > 0 ? (
                        <div className={viewMode === 'grid' 
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                            : 'space-y-4'
                        }>
                            {filteredItems.map(item => 
                                viewMode === 'grid' 
                                    ? <ItemCard key={item.id} item={item} /> 
                                    : <ItemRow key={item.id} item={item} />
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                                <MagnifyingGlassIcon className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Keine Angebote gefunden</h3>
                            <p className="text-slate-500 mb-6 max-w-md mx-auto">
                                Passen Sie Ihre Suchkriterien an oder schauen Sie später wieder vorbei.
                            </p>
                            <button 
                                onClick={resetFilters}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5" />
                                Filter zurücksetzen
                            </button>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Trust Section */}
            <section className="py-16 bg-white border-t border-slate-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-black text-slate-900 mb-2">500+</div>
                            <p className="text-slate-500 text-sm">Verfügbare Geräte</p>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-slate-900 mb-2">150+</div>
                            <p className="text-slate-500 text-sm">Verifizierte Anbieter</p>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-slate-900 mb-2">4.8</div>
                            <p className="text-slate-500 text-sm">Durchschnittliche Bewertung</p>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-slate-900 mb-2">24h</div>
                            <p className="text-slate-500 text-sm">Schnelle Reaktionszeit</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MarketplacePage;
