import React, { useState, useMemo } from 'react';
import { 
    MagnifyingGlassIcon,
    MapPinIcon,
    XMarkIcon,
    ShieldCheckIcon,
    MailIcon,
    CalendarDaysIcon,
    ArrowRightIcon,
    StarIcon,
    PhoneIcon,
} from '../components/icons';

interface MarketplaceItem {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  priceUnit: string;
  image: string;
  year: number;
  description: string;
  provider: { name: string; isVerified: boolean; avatar: string; rating: number; reviews: number };
  tags: string[];
}

const marketplaceItems: MarketplaceItem[] = [
  { id: '1', name: 'Minibagger 1.8t Kubota', category: 'Baumaschinen', location: 'Zürich', price: 250, priceUnit: '/Tag', image: 'https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=600', year: 2021, description: 'Kompakter Minibagger für Aushubarbeiten, perfekt für enge Baustellen.', provider: { name: 'BauRent AG', isVerified: true, avatar: 'B', rating: 4.9, reviews: 127 }, tags: ['Sofort verfügbar', 'Lieferung möglich'] },
  { id: '2', name: 'Hilti Bohrhammer TE 70', category: 'Werkzeuge', location: 'Bern', price: 45, priceUnit: '/Tag', image: 'https://images.unsplash.com/photo-1581155694820-a1e33d49f257?q=80&w=600', year: 2023, description: 'Professioneller Bohrhammer für schwere Bohr- und Meisselarbeiten.', provider: { name: 'Werkzeug Profi', isVerified: true, avatar: 'W', rating: 4.8, reviews: 64 }, tags: ['Inkl. Zubehör'] },
  { id: '3', name: 'Teleskoplader 7m', category: 'Baumaschinen', location: 'Basel', price: 380, priceUnit: '/Tag', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600', year: 2020, description: 'Vielseitiger Teleskoplader mit 7m Hubhöhe und 3t Tragkraft.', provider: { name: 'Maschinen Meyer', isVerified: true, avatar: 'M', rating: 4.7, reviews: 89 }, tags: ['Mit Fahrer buchbar'] },
  { id: '4', name: 'Gartenfräse 6.5 PS', category: 'Garten', location: 'Luzern', price: 70, priceUnit: '/Tag', image: 'https://images.unsplash.com/photo-1621997385536-235163153f3e?q=80&w=600', year: 2022, description: 'Leistungsstarke Benzin-Gartenfräse zur Bodenauflockerung.', provider: { name: 'Garten-Geräte', isVerified: false, avatar: 'G', rating: 4.5, reviews: 42 }, tags: ['Wochenendrabatt'] },
  { id: '5', name: 'Gerüst 50m² komplett', category: 'Gerüste', location: 'Winterthur', price: 120, priceUnit: '/Tag', image: 'https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=600', year: 2019, description: 'Komplettes Fassadengerüst inkl. Aufbau und Abbau.', provider: { name: 'Gerüstbau Keller', isVerified: true, avatar: 'K', rating: 4.6, reviews: 51 }, tags: ['Inkl. Montage'] },
  { id: '6', name: 'Kompressor 400L', category: 'Werkzeuge', location: 'St. Gallen', price: 85, priceUnit: '/Tag', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600', year: 2021, description: 'Industriekompressor mit 400L Kessel, ideal für Lackierarbeiten.', provider: { name: 'Luft & Druck AG', isVerified: true, avatar: 'L', rating: 4.8, reviews: 73 }, tags: ['Sofort verfügbar'] },
];

const allCategories = ['Alle', ...new Set(marketplaceItems.map(item => item.category))];

const MarketplacePage: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Alle');
    const [locationFilter, setLocationFilter] = useState('');

    const filteredItems = useMemo(() => {
        return marketplaceItems
            .filter(item => searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(item => activeCategory === 'Alle' || item.category === activeCategory)
            .filter(item => locationFilter === '' || item.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }, [searchTerm, activeCategory, locationFilter]);

    const clearFilters = () => {
        setSearchTerm('');
        setActiveCategory('Alle');
        setLocationFilter('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {selectedItem && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setSelectedItem(null)}>
                    <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-hidden animate-slideUp" onClick={e => e.stopPropagation()}>
                        <div className="relative h-56 sm:h-72">
                            <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full mb-2">{selectedItem.category}</span>
                                <h2 className="text-2xl font-bold text-white">{selectedItem.name}</h2>
                            </div>
                        </div>
                        
                        <div className="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-slate-500">Mietpreis ab</span>
                                    <p className="text-3xl font-black text-slate-900">CHF {selectedItem.price}<span className="text-base font-medium text-slate-500">{selectedItem.priceUnit}</span></p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-full">
                                    <MapPinIcon className="w-4 h-4" />
                                    {selectedItem.location}
                                </div>
                            </div>

                            <p className="text-slate-600 leading-relaxed">{selectedItem.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {selectedItem.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">{tag}</span>
                                ))}
                                <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full flex items-center gap-1">
                                    <CalendarDaysIcon className="w-3.5 h-3.5" />
                                    Baujahr {selectedItem.year}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">{selectedItem.provider.avatar}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-slate-900">{selectedItem.provider.name}</p>
                                        {selectedItem.provider.isVerified && <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <StarIcon className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        <span className="font-semibold">{selectedItem.provider.rating}</span>
                                        <span className="text-slate-400">({selectedItem.provider.reviews} Bewertungen)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <button className="flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-500/20">
                                    <MailIcon className="w-5 h-5" />
                                    Anfragen
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition">
                                    <PhoneIcon className="w-5 h-5" />
                                    Anrufen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Equipment Marktplatz</h1>
                    <p className="text-slate-500 max-w-lg mx-auto">Professionelle Baumaschinen und Werkzeuge von verifizierten Anbietern in der Schweiz</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-3 mb-8">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Equipment suchen..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-primary-500 text-sm"
                            />
                        </div>
                        <div className="sm:w-44 relative">
                            <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Standort"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-primary-500 text-sm"
                            />
                        </div>
                        <button className="h-12 px-6 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition flex items-center justify-center gap-2">
                            <MagnifyingGlassIcon className="w-5 h-5" />
                            Suchen
                        </button>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                    {allCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                                activeCategory === cat 
                                    ? 'bg-slate-900 text-white shadow-lg' 
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {filteredItems.length > 0 ? (
                    <>
                        <p className="text-sm text-slate-500 mb-6"><span className="font-bold text-slate-900">{filteredItems.length}</span> Angebote gefunden</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
                                >
                                    <div className="relative h-44 overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-semibold rounded-full">{item.category}</span>
                                        </div>
                                        {item.provider.isVerified && (
                                            <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">{item.name}</h3>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                                            <span className="flex items-center gap-1"><MapPinIcon className="w-3.5 h-3.5" />{item.location}</span>
                                            <span className="flex items-center gap-1"><StarIcon className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />{item.provider.rating}</span>
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <span className="text-xs text-slate-400">ab</span>
                                                <p className="text-xl font-black text-slate-900">CHF {item.price}<span className="text-sm font-medium text-slate-500">{item.priceUnit}</span></p>
                                            </div>
                                            <div className="flex items-center gap-1 text-primary-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                                Details <ArrowRightIcon className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                            <MagnifyingGlassIcon className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Keine Ergebnisse</h3>
                        <p className="text-slate-500 mb-6">Versuchen Sie andere Suchbegriffe</p>
                        <button onClick={clearFilters} className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition">
                            Filter zurücksetzen
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slideUp { animation: slideUp 0.3s ease-out; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default MarketplacePage;
