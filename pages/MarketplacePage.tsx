import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
    ToolboxIcon, 
    BanknotesIcon, 
    MagnifyingGlassIcon,
    MapPinIcon,
    AdjustmentsHorizontalIcon,
    ChevronDownIcon,
    TagIcon,
    XMarkIcon,
    Squares2X2Icon,
    ListBulletIcon,
    ShieldCheckIcon,
    MailIcon,
    UserIcon,
    PhoneIcon,
    ClockIcon,
    CalendarDaysIcon,
} from '../components/icons';

// --- TYPES & MOCK DATA ---
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
  provider: { name: string; isVerified: boolean; memberSince: number; logoChar: string; };
  createdAt: string;
}

const marketplaceItems: MarketplaceItem[] = [
  { id: 'rent-1', type: 'rent', name: 'Minibagger 1.8t', category: 'Baumaschinen', location: '8001 Zürich', price: 250, priceUnit: '/ Tag', images: ['https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=800&auto=format=fit'], year: 2021, description: 'Kompakter und leistungsstarker Minibagger für Aushubarbeiten.', provider: { name: 'BauRent AG', isVerified: true, memberSince: 2020, logoChar: 'B' }, createdAt: '2024-07-28' },
  { id: 'buy-1', type: 'buy', name: 'Occasion Minibagger 2.5t', category: 'Baumaschinen', location: '8004 Zürich', price: 28500, priceUnit: '', images: ['https://images.unsplash.com/photo-1604325379430-1cd17b78a9c3?q=80&w=800&auto=format=fit-crop', 'https://images.unsplash.com/photo-1629910361909-5a578f7a610f?q=80&w=800&auto=format=fit-crop'], condition: 'Sehr gut', year: 2020, description: 'Zuverlässiger Minibagger, Service regelmässig durchgeführt.', provider: { name: 'Müller Baugeräte', isVerified: true, memberSince: 2019, logoChar: 'M' }, createdAt: '2024-07-27' },
  { id: 'rent-2', type: 'rent', name: 'Bohrhammer Hilti', category: 'Werkzeuge', location: '3000 Bern', price: 45, priceUnit: '/ Tag', images: ['https://images.unsplash.com/photo-1581155694820-a1e33d49f257?q=80&w=800&auto=format=fit'], year: 2023, description: 'Professioneller Bohrhammer für schwere Bohr- und Meisselarbeiten.', provider: { name: 'Werkzeug Profi', isVerified: true, memberSince: 2021, logoChar: 'W' }, createdAt: '2024-07-26' },
  { id: 'buy-2', type: 'buy', name: 'Lieferwagen Ford Transit', category: 'Fahrzeuge', location: '3000 Bern', price: 19900, priceUnit: '', images: ['https://images.unsplash.com/photo-1587582423116-803717d74149?q=80&w=800&auto=format=fit-crop'], condition: 'Gut', year: 2020, description: 'Gepflegter Ford Transit Kastenwagen. Hochdach, Anhängerkupplung.', provider: { name: 'Auto Handel AG', isVerified: false, memberSince: 2022, logoChar: 'A' }, createdAt: '2024-07-25' },
  { id: 'rent-3', type: 'rent', name: 'Gartenfräse Benzin', category: 'Garten', location: '4051 Basel', price: 70, priceUnit: '/ Tag', images: ['https://images.unsplash.com/photo-1621997385536-235163153f3e?q=80&w=800&auto=format=fit'], year: 2022, description: 'Leistungsstarke Gartenfräse zur Auflockerung von Böden.', provider: { name: 'Garten-Geräte Basel', isVerified: true, memberSince: 2021, logoChar: 'G' }, createdAt: '2024-07-24' },
  { id: 'buy-3', type: 'buy', name: 'Fassadengerüst Occasion 100m²', category: 'Gerüste', location: '6000 Luzern', price: 4200, priceUnit: '', images: ['https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=800&auto=format=fit-crop'], condition: 'Gebraucht', year: 2018, description: 'Komplettes Fassadengerüst zu verkaufen. Stahlrahmen, Holzböden.', provider: { name: 'Gerüstbau Meier', isVerified: true, memberSince: 2020, logoChar: 'M' }, createdAt: '2024-07-23' },
];

const categories = [...new Set(marketplaceItems.map(item => item.category))];
const conditions: (MarketplaceItem['condition'])[] = ['Neuwertig', 'Sehr gut', 'Gut', 'Gebraucht'];

const MarketplacePage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: 'Alle',
        location: '',
        conditions: [] as string[],
        priceMin: '',
        priceMax: '',
    });
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        document.body.style.overflow = isFilterOpen || selectedItem ? 'hidden' : 'auto';
    }, [isFilterOpen, selectedItem]);
    
    const filteredItems = useMemo(() => {
        let items = marketplaceItems
            .filter(item => item.type === 'rent')
            .filter(item => searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(item => filters.category === 'Alle' || item.category === filters.category)
            .filter(item => filters.location === '' || item.location.toLowerCase().includes(filters.location.toLowerCase()));

        if (filters.priceMin) items = items.filter(item => item.price >= parseFloat(filters.priceMin));
        if (filters.priceMax) items = items.filter(item => item.price <= parseFloat(filters.priceMax));
        
        if (sortOrder === 'price_asc') {
            items.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price_desc') {
            items.sort((a, b) => b.price - a.price);
        } else if (sortOrder === 'newest') {
            items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return items;
    }, [searchTerm, filters, sortOrder]);
    
    const resetFilters = () => setFilters({ category: 'Alle', location: '', conditions: [], priceMin: '', priceMax: ''});
    
    const FilterSidebar: React.FC<{ inModal?: boolean }> = ({ inModal }) => (
        <div className={`space-y-5 ${inModal ? 'p-4' : ''}`}>
            {/* Kategorie */}
            <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 block flex items-center gap-2">
                    <TagIcon className="w-4 h-4" />
                    <span>Kategorie</span>
                </label>
                <div className="space-y-2">
                    <button
                        onClick={() => setFilters(f => ({...f, category: 'Alle'}))}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            filters.category === 'Alle'
                                ? 'bg-primary-600 text-white shadow-md'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                        Alle Kategorien
                    </button>
                    {categories.map(c => (
                        <button
                            key={c}
                            onClick={() => setFilters(f => ({...f, category: c}))}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                filters.category === c
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ort / PLZ */}
            <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 block flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span>Standort</span>
                </label>
                <div className="relative">
                    <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="z.B. Zürich, 8001" 
                        value={filters.location} 
                        onChange={e => setFilters(f => ({...f, location: e.target.value}))} 
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-slate-200 bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition" 
                    />
                </div>
            </div>

            {/* Preis */}
            <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 block flex items-center gap-2">
                    <BanknotesIcon className="w-4 h-4" />
                    <span>Preis (CHF)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">Min</span>
                        <input 
                            type="number" 
                            placeholder="0" 
                            value={filters.priceMin} 
                            onChange={e => setFilters(f => ({...f, priceMin: e.target.value}))} 
                            className="w-full pl-12 pr-4 py-2.5 rounded-lg border-2 border-slate-200 bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">Max</span>
                        <input 
                            type="number" 
                            placeholder="∞" 
                            value={filters.priceMax} 
                            onChange={e => setFilters(f => ({...f, priceMax: e.target.value}))} 
                            className="w-full pl-12 pr-4 py-2.5 rounded-lg border-2 border-slate-200 bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                        />
                    </div>
                </div>
            </div>

            {/* Reset Button */}
            {(filters.category !== 'Alle' || filters.location || filters.priceMin || filters.priceMax) && (
                <button 
                    onClick={resetFilters} 
                    className="w-full mt-6 pt-5 border-t-2 border-slate-200 text-center text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                    <XMarkIcon className="w-4 h-4" />
                    <span>Alle Filter zurücksetzen</span>
                </button>
            )}
        </div>
    );

    const ItemCard: React.FC<{ item: MarketplaceItem }> = ({ item }) => (
        <button 
            onClick={() => setSelectedItem(item)} 
            className="bg-white rounded-xl border border-slate-200 text-left flex flex-col h-full transition-all duration-200 hover:shadow-lg hover:border-slate-300 group overflow-hidden"
        >
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    loading="lazy" 
                />
                {item.provider.isVerified && (
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full p-1" title="Verifiziert">
                        <ShieldCheckIcon className="w-4 h-4 text-green-500"/>
                    </div>
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <div className="mb-2">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">{item.category}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 flex-grow">
                    {item.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <MapPinIcon className="w-3.5 h-3.5" /> 
                    <span className="truncate">{item.location}</span>
                    </div>
                <div className="mt-auto pt-3 border-t border-slate-100">
                    <p className="text-lg font-black text-slate-900">
                        CHF {item.price.toLocaleString('de-CH')}<span className="text-sm font-medium text-slate-500">{item.priceUnit}</span>
                    </p>
                </div>
            </div>
        </button>
    );

    const ItemRow: React.FC<{ item: MarketplaceItem }> = ({ item }) => (
         <button onClick={() => setSelectedItem(item)} className="bg-white rounded-2xl border border-slate-200 p-4 w-full text-left flex flex-col sm:flex-row gap-4 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex flex-col flex-grow">
                 <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">{item.category}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">{item.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
                    <MapPinIcon className="w-4 h-4" /> <span>{item.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                    {item.year && <span className="bg-slate-100 px-2 py-1 rounded font-medium flex items-center gap-1"><CalendarDaysIcon className="w-3 h-3"/> {item.year}</span>}
                    {item.condition && <span className="bg-slate-100 px-2 py-1 rounded font-medium">{item.condition}</span>}
                </div>
                 <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
                    <div>
                        <p className="text-2xl font-extrabold text-slate-900">CHF {item.price.toLocaleString('de-CH')}{item.priceUnit}</p>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-sm text-primary-600">
                        Details ansehen
                    </div>
                </div>
            </div>
        </button>
    );

    const ItemDetailModal = () => {
        if (!selectedItem) return null;
        return (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedItem(null)}>
                <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                    <div className="p-4 border-b flex justify-between items-center"><h2 className="text-xl font-bold text-slate-900 truncate pr-4">{selectedItem.name}</h2><button onClick={() => setSelectedItem(null)} className="p-2 rounded-full hover:bg-slate-100"><XMarkIcon className="w-6 h-6"/></button></div>
                    <div className="p-6 overflow-y-auto grid lg:grid-cols-2 gap-8">
                        {/* Image Gallery */}
                        <div>
                             <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-2 shadow-inner"><img src={selectedItem.images[0]} alt={selectedItem.name} className="w-full h-full object-cover"/></div>
                        </div>
                        {/* Details */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wide bg-primary-50 px-2 py-1 rounded">{selectedItem.category}</span>
                                <p className="text-4xl font-extrabold text-slate-900 mt-2">{`CHF ${selectedItem.price.toLocaleString('de-CH')}`}<span className="text-lg font-medium text-slate-500">{selectedItem.priceUnit}</span></p>
                            </div>
                            <div className="space-y-3 text-sm border-t pt-4">
                                <p className="flex items-center gap-2"><strong>Standort:</strong> <MapPinIcon className="w-4 h-4 text-slate-400"/> {selectedItem.location}</p>
                                {selectedItem.condition && <p><strong>Zustand:</strong> {selectedItem.condition}</p>}
                                {selectedItem.year && <p><strong>Jahrgang:</strong> {selectedItem.year}</p>}
                            </div>
                            <p className="text-sm text-slate-600">{selectedItem.description}</p>
                            
                            {/* Provider info */}
                            <div className="mt-6 border-t pt-6">
                                <p className="text-xs font-bold text-slate-500 uppercase mb-3">Anbieter</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-primary-700">{selectedItem.provider.logoChar}</div>
                                        <div>
                                            <p className="font-bold text-slate-800">{selectedItem.provider.name}</p>
                                            <p className="text-xs text-slate-500">Partner seit {selectedItem.provider.memberSince}</p>
                                        </div>
                                    </div>
                                    {selectedItem.provider.isVerified && <p className="text-xs text-green-600 font-semibold flex items-center gap-1"><ShieldCheckIcon className="w-4 h-4"/> Verifiziert</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-50 border-t flex justify-end gap-3"><button onClick={() => setSelectedItem(null)} className="px-4 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-200">Schliessen</button><button className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 flex items-center gap-2"><MailIcon className="w-4 h-4"/> Anbieter kontaktieren</button></div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {selectedItem && <ItemDetailModal />}
            {isFilterOpen && (
                 <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setIsFilterOpen(false)}>
                    <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
                       <div className="flex justify-between items-center p-4 border-b"><h3 className="font-bold text-lg">Filter</h3><button onClick={() => setIsFilterOpen(false)}><XMarkIcon className="w-6 h-6"/></button></div>
                        <FilterSidebar inModal />
                    </div>
                </div>
            )}

            {/* Hero + Search Panel */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-6 max-w-6xl py-10">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 text-primary-700 font-bold bg-primary-50 border border-primary-100 px-3 py-1 rounded-full text-xs uppercase tracking-wide mb-4">
                                <ToolboxIcon className="w-3.5 h-3.5"/>
                                Miet-Marktplatz
                            </div>
                            <h1 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                Equipment mieten in der Schweiz
                            </h1>
                            <p className="text-slate-600 text-base md:text-lg">
                                Schnelle Suche, klare Preise und verifizierte Anbieter.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3 text-xs">
                                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Verifiziert</span>
                                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Transparente Preise</span>
                                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Schweizer Anbieter</span>
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2 block">Suche</label>
                                    <div className="relative">
                                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Minibagger, Bohrhammer, Gerüst..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2 block">Kategorie</label>
                                        <select
                                            value={filters.category}
                                            onChange={(e) => setFilters(f => ({...f, category: e.target.value}))}
                                            className="w-full h-12 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                                        >
                                            <option value="Alle">Alle Kategorien</option>
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2 block">Ort / PLZ</label>
                                        <div className="relative">
                                            <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Zürich, 8001"
                                                value={filters.location}
                                                onChange={(e) => setFilters(f => ({...f, location: e.target.value}))}
                                                className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-slate-200 bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2 block">Preis min</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={filters.priceMin}
                                            onChange={(e) => setFilters(f => ({...f, priceMin: e.target.value}))}
                                            className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2 block">Preis max</label>
                                        <input
                                            type="number"
                                            placeholder="∞"
                                            value={filters.priceMax}
                                            onChange={(e) => setFilters(f => ({...f, priceMax: e.target.value}))}
                                            className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <button className="flex-1 bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors">
                                        Suchen
                                    </button>
                                    <button onClick={resetFilters} className="flex-1 bg-white text-slate-700 font-semibold px-6 py-3 rounded-xl border-2 border-slate-200 hover:bg-slate-100 transition-colors">
                                        Filter zurücksetzen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Area */}
            <section className="py-10">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div>
                        <main className="min-w-0">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                                <div className="text-sm text-slate-600">
                                    <span className="font-bold text-slate-900">{filteredItems.length}</span> Angebote
                                </div>
                                <div className="flex items-center gap-2">
                                    <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="h-11 px-4 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white">
                                        <option value="newest">Neueste zuerst</option>
                                        <option value="price_asc">Preis aufsteigend</option>
                                        <option value="price_desc">Preis absteigend</option>
                                    </select>
                                    <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1">
                                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode==='grid' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'}`}><Squares2X2Icon className="w-5 h-5"/></button>
                                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode==='list' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'}`}><ListBulletIcon className="w-5 h-5"/></button>
                                    </div>
                                    <button onClick={() => setIsFilterOpen(true)} className="lg:hidden p-3 h-11 bg-white border-2 border-slate-200 rounded-xl text-slate-600"><AdjustmentsHorizontalIcon className="w-5 h-5"/></button>
                                </div>
                            </div>

                            {filteredItems.length > 0 ? (
                                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                                    {filteredItems.map(item => viewMode === 'grid' ? <ItemCard key={item.id} item={item} /> : <ItemRow key={item.id} item={item} />)}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                                    <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                                    <h3 className="text-lg font-semibold text-slate-700">Keine Angebote gefunden</h3>
                                    <p className="mt-1 text-sm text-slate-500">Passen Sie Ihre Filter an oder schauen Sie später wieder vorbei.</p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MarketplacePage;