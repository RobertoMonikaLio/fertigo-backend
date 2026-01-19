
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRightIcon, MagnifyingGlassIcon, MapPinIcon,
    BanknotesIcon, CheckCircleIcon, TagIcon,
    ChevronDownIcon, StarIcon, ShieldCheckIcon,
    XMarkIcon, MailIcon, PhoneIcon, EyeIcon, UserIcon,
    ColoredTruckIcon, ColoredDiggerIcon, ColoredToolboxIcon,
    ColoredScaffoldingIcon, ColoredLeafIcon, ColoredPartyPopperIcon
} from '../components/icons';

// --- ICONS for How it Works ---
const BuyStep1Icon = () => (
  <svg viewBox="0 0 140 100" className="w-auto h-24 text-primary-800">
    <g fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="20" y="10" width="100" height="80" rx="8" fill="#dcfce7"/>
      <rect x="30" y="20" width="80" height="60" rx="3" fill="#fff"/>
      <path d="M40 30 h50" />
      <path d="M40 45 h60" />
      <path d="M40 60 h45" />
      <circle cx="80" cy="50" r="15" strokeWidth="4"/>
      <path d="M92 62 l10 10" strokeWidth="4"/>
    </g>
  </svg>
);

const BuyStep2Icon = () => (
  <svg viewBox="0 0 140 100" className="w-auto h-24 text-primary-800">
    <g fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M110 70 v10 a5 5 0 0 1 -5 5 H45 a5 5 0 0 1 -5 -5 V20 a5 5 0 0 1 5 -5 h60 a5 5 0 0 1 5 5 v10" fill="#dcfce7"/>
        <rect x="50" y="25" width="50" height="40" fill="#fff"/>
        <path d="M30 70 h-5 a5 5 0 0 1 -5 -5 v-10 a5 5 0 0 1 5 -5 h10 l5 5 v10 a5 5 0 0 1 -5 5 z" fill="#22c55e"/>
    </g>
  </svg>
);

const BuyStep3Icon = () => (
  <svg viewBox="0 0 140 100" className="w-auto h-24 text-primary-800">
    <g fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 60 l15 -15 a10 10 0 0 1 14 0 l5 5" />
      <path d="M95 40 l-15 15 a10 10 0 0 1 -14 0 l-5 -5" />
      <path d="M40 70 v-20 M50 75 v-20 M60 80 v-20" />
      <path d="M105 50 v20 M95 45 v20 M85 40 v20" />
      <path d="M20 90 a 70 70 0 0 1 100 0 Z" fill="#dcfce7" />
      <path d="M60 40 l10 10 l20 -20" stroke="#22c55e" strokeWidth="5"/>
    </g>
  </svg>
);

interface PurchaseItem {
    id: number;
    name: string;
    category: string;
    location: string;
    price: string;
    image: string;
    images?: string[];
    year?: number;
    operatingHours?: number;
    condition: 'Neuwertig' | 'Sehr gut' | 'Gut' | 'Gebraucht';
    description: string;
    provider: {
        name: string;
        rating: number;
        count: number;
        memberSince: string;
    };
}

const allPurchaseItems: PurchaseItem[] = [
    { 
        id: 1, 
        name: 'Occasion Minibagger 2.5t', 
        category: 'Baumaschinen', 
        location: '8001 Zürich', 
        price: 'CHF 28\'500', 
        image: 'https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=800&auto=format=fit-crop',
        images: [
             'https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=800&auto=format=fit-crop',
             'https://images.unsplash.com/photo-1604325379430-1cd17b78a9c3?q=80&w=800&auto=format=fit-crop'
        ],
        year: 2021, 
        operatingHours: 850, 
        condition: 'Sehr gut',
        description: 'Zuverlässiger Minibagger, ideal für Gartenbau und kleinere Aushubarbeiten. Inklusive 3 Löffel und Schnellwechsler. Service wurde regelmässig durchgeführt.',
        provider: { name: 'Müller Baugeräte', rating: 4.8, count: 12, memberSince: '2020' }
    },
    { 
        id: 2, 
        name: 'Lieferwagen Ford Transit', 
        category: 'Nutzfahrzeuge', 
        location: '3000 Bern', 
        price: 'CHF 19\'900', 
        image: 'https://images.unsplash.com/photo-1621992011153-f3fb15bad52f?q=80&w=800&auto=format=fit-crop',
        year: 2020, 
        operatingHours: 65000, 
        condition: 'Gut',
        description: 'Gepflegter Ford Transit Kastenwagen. Hochdach, Anhängerkupplung. Ideal für Handwerker. MFK neu.',
        provider: { name: 'Auto Handel AG', rating: 4.5, count: 45, memberSince: '2019' }
    },
    { 
        id: 3, 
        name: 'Bohrmaschine Hilti (Neu)', 
        category: 'Werkzeuge & Geräte', 
        location: '4051 Basel', 
        price: 'CHF 650', 
        image: 'https://images.unsplash.com/photo-1581155694820-a1e33d49f257?q=80&w=800&auto=format=fit-crop', 
        year: 2024, 
        condition: 'Neuwertig',
        description: 'Originalverpackte Hilti Bohrmaschine. Fehlkauf, nie benutzt. Volle Garantie.',
        provider: { name: 'Privatverkäufer', rating: 0, count: 0, memberSince: '2024' }
    },
    { 
        id: 4, 
        name: 'Fassadengerüst Occasion 100m²', 
        category: 'Gerüste & Anhänger', 
        location: '6000 Luzern', 
        price: 'CHF 4\'200', 
        image: 'https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=800&auto=format=fit-crop', 
        year: 2019, 
        condition: 'Gut',
        description: 'Komplettes Fassadengerüst zu verkaufen. Stahlrahmen, Holzböden. Sofort einsatzbereit.',
        provider: { name: 'Gerüstbau Meier', rating: 4.7, count: 8, memberSince: '2021' }
    },
    { 
        id: 5, 
        name: 'Rüttelplatte Weber', 
        category: 'Baumaschinen', 
        location: '9000 St. Gallen', 
        price: 'CHF 2\'100', 
        image: 'https://images.unsplash.com/photo-1583522748231-3c72b9a2c206?q=80&w=800&auto=format=fit-crop', 
        year: 2022, 
        operatingHours: 120, 
        condition: 'Sehr gut',
        description: 'Vorlaufende Rüttelplatte für Pflasterarbeiten und Bodenverdichtung. Benzinmotor.',
        provider: { name: 'Bauprofi SG', rating: 4.9, count: 22, memberSince: '2022' }
    },
    { 
        id: 6, 
        name: 'Anhänger, gebremst', 
        category: 'Gerüste & Anhänger', 
        location: '8001 Zürich', 
        price: 'CHF 1\'800', 
        image: 'https://images.unsplash.com/photo-1618359556314-a57751939112?q=80&w=800&auto=format=fit-crop', 
        year: 2023, 
        condition: 'Neuwertig',
        description: 'Fast neuer Anhänger, gebremst, Nutzlast 1000kg. Mit Plane.',
        provider: { name: 'Privatverkäufer', rating: 5.0, count: 2, memberSince: '2023' }
    },
];

const categories = [
    { name: 'Baumaschinen', icon: <ColoredDiggerIcon className="w-8 h-8"/> },
    { name: 'Nutzfahrzeuge', icon: <ColoredTruckIcon className="w-8 h-8"/> },
    { name: 'Werkzeuge & Geräte', icon: <ColoredToolboxIcon className="w-8 h-8"/> },
    { name: 'Gerüste & Anhänger', icon: <ColoredScaffoldingIcon className="w-8 h-8"/> },
    { name: 'Garten', icon: <ColoredLeafIcon className="w-8 h-8"/> },
    { name: 'Events', icon: <ColoredPartyPopperIcon className="w-8 h-8"/> },
];

const howItWorksSteps = [
    { icon: <BuyStep1Icon />, title: "1. Suchen & Finden", description: "Nutzen Sie unsere einfache Suche, um das passende Equipment in Ihrer Nähe zu finden." },
    { icon: <BuyStep2Icon />, title: "2. Direkt Anfragen", description: "Kontaktieren Sie den Verkäufer unverbindlich für Details oder eine Besichtigung." },
    { icon: <BuyStep3Icon />, title: "3. Deal Abschliessen", description: "Kaufen Sie gebrauchtes Profi-Equipment zu fairen Preisen direkt vom Anbieter." }
];


// --- Sub-Components ---

const ItemDetailModal: React.FC<{ item: PurchaseItem; onClose: () => void }> = ({ item, onClose }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const allImages = item.images && item.images.length > 0 ? item.images : [item.image];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-white z-10">
                    <h2 className="text-2xl font-bold text-slate-900">{item.name}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="aspect-[4/3] bg-slate-200 rounded-xl overflow-hidden shadow-sm">
                                <img src={allImages[selectedImageIndex]} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            {allImages.length > 1 && (
                                <div className="grid grid-cols-5 gap-2">
                                    {allImages.map((img, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === idx ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent hover:border-slate-300'}`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">{item.category}</span>
                                    <span className={`bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide`}>{item.condition}</span>
                                </div>
                                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{item.price}</h1>
                                <p className="text-slate-500 flex items-center gap-2 text-sm font-medium"><MapPinIcon className="w-4 h-4"/> {item.location}</p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                                <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">Details</h3>
                                {item.year && <div className="flex justify-between text-sm"><span className="text-slate-500">Baujahr</span><span className="font-semibold">{item.year}</span></div>}
                                {item.operatingHours && <div className="flex justify-between text-sm"><span className="text-slate-500">Betriebsstunden</span><span className="font-semibold">{item.operatingHours} h</span></div>}
                                <div className="flex justify-between text-sm"><span className="text-slate-500">Zustand</span><span className="font-semibold">{item.condition}</span></div>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 mb-2">Beschreibung</h3>
                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{item.description}</p>
                            </div>

                            <div className="bg-slate-100 p-5 rounded-xl flex items-center gap-4 border border-slate-200">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold text-primary-700 shadow-sm">
                                    {item.provider.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900">{item.provider.name}</p>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-3 h-3 ${i < Math.round(item.provider.rating) ? 'fill-current' : 'text-slate-300'}`} />)}
                                        </div>
                                        <span>({item.provider.count} Inserate)</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-3 pt-4">
                                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 active:scale-95">
                                    <MailIcon className="w-5 h-5"/> Verkäufer kontaktieren
                                </button>
                                <button className="w-full bg-white border-2 border-slate-200 hover:border-primary-500 text-slate-700 hover:text-primary-700 font-bold py-3.5 px-4 rounded-xl transition-all flex justify-center items-center gap-2">
                                    <PhoneIcon className="w-5 h-5"/> Nummer anzeigen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const BuyPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Alle');
    const [selectedItem, setSelectedItem] = useState<PurchaseItem | null>(null);

    const filteredItems = useMemo(() => {
        return allPurchaseItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = locationFilter === '' || item.location.toLowerCase().includes(locationFilter.toLowerCase());
            const matchesCategory = categoryFilter === 'Alle' || item.category === categoryFilter;
            return matchesSearch && matchesLocation && matchesCategory;
        });
    }, [searchTerm, locationFilter, categoryFilter]);

    const handleCategoryClick = (category: string) => {
        setCategoryFilter(category);
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {selectedItem && <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}

            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format=fit')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/60 to-slate-900/90"></div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        Gebraucht kaufen & sparen
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Professionelles Equipment zu fairen Preisen. Finden Sie Baumaschinen, Werkzeuge und Fahrzeuge direkt von geprüften Anbietern in Ihrer Nähe.
                    </p>

                    <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
                        <div className="relative flex-grow group">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Was suchen Sie?" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-slate-900 placeholder-slate-400 font-medium outline-none transition-all"
                            />
                        </div>
                        <div className="relative md:w-1/3 group">
                            <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Ort / PLZ" 
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-slate-900 placeholder-slate-400 font-medium outline-none transition-all"
                            />
                        </div>
                        <button onClick={() => document.getElementById('results')?.scrollIntoView({behavior: 'smooth'})} className="bg-primary-600 hover:bg-primary-700 text-white font-bold h-14 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary-600/30 flex items-center justify-center gap-2">
                            Suchen <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        <span className="text-sm text-slate-400 font-medium py-1">Beliebt:</span>
                        {['Minibagger', 'Transporter', 'Gerüst', 'Bohrmaschine'].map(tag => (
                            <button 
                                key={tag} 
                                onClick={() => { setSearchTerm(tag); document.getElementById('results')?.scrollIntoView({behavior: 'smooth'}); }}
                                className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-700 hover:text-white transition-colors"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white border-b border-slate-200">
                <div className="container mx-auto px-6">
                     <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">So einfach funktioniert's</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {howItWorksSteps.map((step, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <div className="h-24 flex items-center justify-center mb-6">{step.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-slate-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Nach Kategorie stöbern</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map(cat => (
                            <button 
                                key={cat.name} 
                                onClick={() => handleCategoryClick(cat.name)}
                                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-300 transition-all group text-center"
                            >
                                <div className="w-14 h-14 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors text-slate-400">
                                    {cat.icon}
                                </div>
                                <span className="font-semibold text-slate-700 group-hover:text-primary-700">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results */}
            <section id="results" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Aktuelle Angebote</h2>
                        <div className="hidden md:block">
                            <select 
                                value={categoryFilter} 
                                onChange={(e) => setCategoryFilter(e.target.value)} 
                                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 font-medium"
                            >
                                <option value="Alle">Alle Kategorien</option>
                                {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredItems.map(item => (
                                <div 
                                    key={item.id} 
                                    onClick={() => setSelectedItem(item)}
                                    className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full hover:-translate-y-1"
                                >
                                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wide">{item.condition}</span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="text-xs font-semibold text-primary-600 mb-1">{item.category}</div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">{item.name}</h3>
                                        <div className="flex items-center gap-1 text-sm text-slate-500 mb-4">
                                            <MapPinIcon className="w-4 h-4" />
                                            <span className="truncate">{item.location}</span>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <span className="text-xl font-black text-slate-900">{item.price}</span>
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                                <ArrowRightIcon className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <TagIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-700">Keine Angebote gefunden</h3>
                            <p className="text-slate-500 mt-2">Versuchen Sie es mit anderen Suchbegriffen oder Kategorien.</p>
                            <button onClick={() => {setSearchTerm(''); setCategoryFilter('Alle'); setLocationFilter('');}} className="mt-6 text-primary-600 font-bold hover:underline">
                                Alle Filter zurücksetzen
                            </button>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Seller CTA */}
            <section className="bg-primary-900 py-16 text-white mt-12">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Haben Sie Equipment zu verkaufen?</h2>
                    <p className="text-primary-200 max-w-2xl mx-auto mb-8 text-lg">
                        Erreichen Sie Tausende von potenziellen Käufern. Inserieren Sie Ihre Maschinen und Werkzeuge einfach und schnell auf unserem Marktplatz.
                    </p>
                    <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-900 font-bold px-8 py-4 rounded-xl hover:bg-primary-50 transition-all shadow-lg transform hover:-translate-y-1">
                        Jetzt kostenlos inserieren <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default BuyPage;
