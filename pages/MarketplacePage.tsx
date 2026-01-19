import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPinIcon,
  ShieldCheckIcon,
  PhoneIcon,
  MailIcon,
  XMarkIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  TagIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
  SparklesIcon,
} from '../components/icons';

interface Item {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  image: string;
  provider: string;
  verified: boolean;
  description: string;
  rating: number;
  available: boolean;
}

const items: Item[] = [
  { id: '1', name: 'Minibagger 1.8t Kubota', category: 'Baumaschinen', location: 'Zürich', price: 250, image: 'https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=600', provider: 'BauRent AG', verified: true, description: '1.8 Tonnen, Diesel, Baujahr 2021', rating: 4.9, available: true },
  { id: '2', name: 'Hilti Bohrhammer TE 70', category: 'Werkzeuge', location: 'Bern', price: 45, image: 'https://images.unsplash.com/photo-1581155694820-a1e33d49f257?q=80&w=600', provider: 'Werkzeug Profi', verified: true, description: '1600W, SDS-Max, inkl. Koffer', rating: 4.8, available: true },
  { id: '3', name: 'Teleskoplader 7m', category: 'Baumaschinen', location: 'Basel', price: 380, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600', provider: 'Maschinen Meyer', verified: true, description: '7m Hubhöhe, 3t Traglast, Allrad', rating: 5.0, available: false },
  { id: '4', name: 'Gartenfräse 6.5 PS', category: 'Garten', location: 'Luzern', price: 70, image: 'https://images.unsplash.com/photo-1621997385536-235163153f3e?q=80&w=600', provider: 'Garten-Geräte', verified: false, description: '6.5 PS Benzinmotor, 50cm Arbeitsbreite', rating: 4.5, available: true },
  { id: '5', name: 'Gerüst 50m² komplett', category: 'Gerüste', location: 'Winterthur', price: 120, image: 'https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=600', provider: 'Gerüstbau Keller', verified: true, description: '50m² Alu-Gerüst, inkl. Montage', rating: 4.7, available: true },
  { id: '6', name: 'Kompressor 400L', category: 'Werkzeuge', location: 'St. Gallen', price: 85, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600', provider: 'Luft & Druck AG', verified: true, description: '400L Tank, 10 bar, 400V Anschluss', rating: 4.6, available: true },
  { id: '7', name: 'Betonmischer 150L', category: 'Baumaschinen', location: 'Zürich', price: 55, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600', provider: 'BauRent AG', verified: true, description: '150L Trommelvolumen, 230V', rating: 4.4, available: true },
  { id: '8', name: 'Hochdruckreiniger Kärcher', category: 'Reinigung', location: 'Bern', price: 35, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600', provider: 'Clean Pro', verified: true, description: '180 bar, inkl. Zubehör', rating: 4.9, available: true },
];

const categoryIcons: Record<string, React.ReactNode> = {
  'Baumaschinen': <TruckIcon className="w-5 h-5" />,
  'Werkzeuge': <WrenchScrewdriverIcon className="w-5 h-5" />,
  'Garten': <SparklesIcon className="w-5 h-5" />,
  'Gerüste': <CubeIcon className="w-5 h-5" />,
  'Reinigung': <SparklesIcon className="w-5 h-5" />,
};

const categoryGradients: Record<string, string> = {
  'Baumaschinen': 'from-amber-400 to-orange-500',
  'Werkzeuge': 'from-blue-400 to-indigo-500',
  'Garten': 'from-green-400 to-emerald-500',
  'Gerüste': 'from-slate-400 to-slate-600',
  'Reinigung': 'from-cyan-400 to-blue-500',
};

const FeedCard: React.FC<{ item: Item }> = ({ item }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-4 rounded-xl flex items-center gap-4 shadow-lg">
    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
      <div className="flex items-center text-xs text-slate-400 gap-2 mt-1">
        <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3" /> {item.location}</span>
      </div>
    </div>
    <div className="text-right">
      <span className="block text-sm font-bold text-primary-400">CHF {item.price}/Tag</span>
      <span className="text-[10px] text-slate-500">{item.provider}</span>
    </div>
  </div>
);

const MarketplacePage: React.FC = () => {
  const [selected, setSelected] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = [...new Set(items.map(i => i.category))];
    return cats;
  }, []);

  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, Item[]> = {};
    categories.forEach(cat => grouped[cat] = []);
    items.forEach(item => {
      if (grouped[item.category]) {
        grouped[item.category].push(item);
      }
    });
    return grouped;
  }, [categories]);

  const filteredItems = useMemo(() => {
    let result = selectedCategory ? itemsByCategory[selectedCategory] : items;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.provider.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [selectedCategory, searchQuery, itemsByCategory]);

  const stats = [
    { label: "Verfügbare Geräte", value: "500+", icon: <CubeIcon className="w-6 h-6 text-primary-600" /> },
    { label: "Verifizierte Anbieter", value: "120+", icon: <ShieldCheckIcon className="w-6 h-6 text-primary-600" /> },
    { label: "Standorte", value: "50+", icon: <MapPinIcon className="w-6 h-6 text-primary-600" /> },
    { label: "Kundenbewertung", value: "4.8", icon: <StarIcon className="w-6 h-6 text-primary-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img src={selected.image} alt={selected.name} className="w-full h-64 object-cover" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                <XMarkIcon className="w-5 h-5 text-slate-600" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${selected.available ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                  {selected.available ? 'Verfügbar' : 'Reserviert'}
                </span>
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-slate-700 shadow-lg">
                  {selected.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-bold text-slate-900">{selected.name}</h2>
                <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
                  <StarIcon className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-amber-700 text-sm">{selected.rating}</span>
                </div>
              </div>
              <p className="text-slate-600 mb-4">{selected.description}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full">
                  <MapPinIcon className="w-4 h-4" />
                  {selected.location}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full">
                  {selected.verified ? (
                    <>
                      <ShieldCheckIcon className="w-4 h-4 text-primary-600" />
                      <span className="text-primary-700 font-medium">{selected.provider}</span>
                    </>
                  ) : (
                    <span>{selected.provider}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <div>
                  <p className="text-3xl font-black text-slate-900">CHF {selected.price}</p>
                  <p className="text-sm text-slate-500">pro Tag inkl. MwSt.</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-12 h-12 rounded-xl border-2 border-slate-200 hover:border-primary-300 hover:bg-primary-50 flex items-center justify-center transition-all">
                    <PhoneIcon className="w-5 h-5 text-slate-600" />
                  </button>
                  <button className="h-12 px-6 rounded-xl bg-primary-600 text-white font-bold flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30">
                    <MailIcon className="w-5 h-5" />
                    Anfragen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden bg-slate-900 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-primary-800/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-900/20 rounded-full blur-[80px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        </div>

        <div className="lg:hidden absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <img 
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/45c6d003-83de-48d7-81d6-f98a7eb703fd/Bildschirm_foto_2026-01-19_um_20.08.12-removebg-preview-1768849801699.png?width=8000&height=8000&resize=contain" 
            alt="Background Beaver" 
            className="w-full h-auto object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/40"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative z-20 text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm text-primary-300 text-xs font-bold uppercase tracking-wider mb-8">
                <CubeIcon className="w-4 h-4" />
                Equipment Marktplatz
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.15]">
                Professionelles Equipment. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-green-300">
                  Einfach mieten.
                </span>
              </h1>

              <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Finden Sie Baumaschinen, Werkzeuge und Geräte von geprüften Anbietern in Ihrer Nähe. Transparent, günstig und sofort verfügbar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#equipment" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-900/50 hover:-translate-y-1 ring-1 ring-white/20">
                  Equipment durchsuchen
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </a>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-sm text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <span>Geprüfte Anbieter</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <span>Faire Preise</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <span>Sofort verfügbar</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex relative animate-fade-in [animation-delay:200ms] lg:h-[550px] items-center justify-center">
              <div className="absolute -inset-4 bg-primary-500/20 rounded-[3rem] blur-3xl"></div>
              
              <div className="relative w-full max-w-xl">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/45c6d003-83de-48d7-81d6-f98a7eb703fd/Bildschirm_foto_2026-01-19_um_20.08.12-removebg-preview-1768849801699.png?width=8000&height=8000&resize=contain" 
                  alt="Equipment Marktplatz Beaver" 
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-2 hover:rotate-0 transition-transform duration-700"
                />
                
                <div className="absolute -right-6 top-1/4 bg-white p-3 rounded-xl shadow-xl animate-float hidden xl:block">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-900">12 neue heute</span>
                  </div>
                </div>

                <div className="absolute -left-10 bottom-1/4 bg-slate-800/90 backdrop-blur border border-white/10 p-4 rounded-2xl shadow-2xl animate-float [animation-delay:1s] hidden xl:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                      <ShieldCheckIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">Geprüft</div>
                      <div className="text-[10px] text-slate-400">Qualitäts-Garantie</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="hidden lg:grid grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-black text-primary-600 mb-2 tracking-tight">{stat.value}</p>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="lg:hidden grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm text-center">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  {stat.icon}
                </div>
                <p className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="equipment" className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 max-w-7xl py-4">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Equipment suchen..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
              >
                <XMarkIcon className="w-3 h-3 text-slate-600" />
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
                  <CubeIcon className={`w-5 h-5 ${selectedCategory === null ? 'text-white' : 'text-slate-400'}`} />
                  <span className="font-semibold">Alle Geräte</span>
                  <span className={`ml-auto text-sm px-2 py-0.5 rounded-full ${
                    selectedCategory === null ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {items.length}
                  </span>
                </button>

                {categories.map(category => {
                  const isActive = selectedCategory === category;
                  const count = itemsByCategory[category]?.length || 0;

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
                      <span className={isActive ? 'text-white' : 'text-slate-400'}>
                        {categoryIcons[category] || <CubeIcon className="w-5 h-5" />}
                      </span>
                      <span className="font-medium text-sm">{category}</span>
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 p-5 bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl border border-primary-100">
                <h3 className="font-bold text-slate-900 mb-2">Equipment anbieten?</h3>
                <p className="text-sm text-slate-600 mb-4">Verdienen Sie mit Ihrem ungenutzten Equipment.</p>
                <Link to="/register" className="block text-center px-4 py-2.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors text-sm">
                  Jetzt inserieren
                </Link>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {selectedCategory && (
              <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-r ${categoryGradients[selectedCategory] || 'from-slate-400 to-slate-600'} text-white`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    {React.cloneElement((categoryIcons[selectedCategory] || <CubeIcon className="w-8 h-8" />) as React.ReactElement, { className: 'w-8 h-8 text-white' })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCategory}</h2>
                    <p className="text-white/80">{itemsByCategory[selectedCategory]?.length || 0} Geräte verfügbar</p>
                  </div>
                </div>
              </div>
            )}

            {searchQuery && (
              <div className="mb-6 flex items-center gap-2 text-slate-600">
                <span className="font-semibold text-slate-900">{filteredItems.length}</span>
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

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden text-left hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.available ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                          {item.available ? 'Verfügbar' : 'Reserviert'}
                        </span>
                      </div>
                      {item.verified && (
                        <div className="absolute top-3 right-3">
                          <span className="flex items-center gap-1 px-2.5 py-1 bg-primary-500 text-white text-xs font-bold rounded-full shadow-lg">
                            <ShieldCheckIcon className="w-3.5 h-3.5" />
                            Geprüft
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-slate-700">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors pr-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-lg flex-shrink-0">
                          <StarIcon className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-xs font-bold text-amber-700">{item.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mb-3 line-clamp-1">{item.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{item.location}</span>
                        <span className="text-slate-300">•</span>
                        <span className="truncate">{item.provider}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                          <span className="text-2xl font-black text-slate-900">CHF {item.price}</span>
                          <span className="text-sm text-slate-500 ml-1">/Tag</span>
                        </div>
                        <span className="flex items-center gap-1 text-primary-600 font-semibold text-sm group-hover:gap-2 transition-all">
                          Details
                          <ArrowRightIcon className="w-4 h-4" />
                        </span>
                      </div>
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
                  Wir konnten keine passenden Geräte finden. Versuchen Sie einen anderen Suchbegriff.
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

      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Sie haben Equipment zu vermieten?
              </h2>
              <p className="text-slate-400">
                Erreichen Sie tausende potenzielle Mieter und verdienen Sie mit Ihrem ungenutzten Equipment.
              </p>
            </div>
            <Link
              to="/register"
              className="flex-shrink-0 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-primary-600/30"
            >
              Equipment anbieten
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-12 pt-12 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-sm text-slate-400 mt-2">Kostenlos inserieren</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-sm text-slate-400 mt-2">Geprüfte Mieter</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-sm text-slate-400 mt-2">Sichere Abwicklung</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-sm text-slate-400 mt-2">Schnelle Auszahlung</div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-up {
          animation: scroll-up 40s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MarketplacePage;
