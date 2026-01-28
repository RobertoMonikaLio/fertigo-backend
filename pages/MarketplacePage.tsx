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
    categories.forEach(cat => (grouped[cat] = []));
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
    { label: 'Verfügbare Geräte', value: '500+', icon: <CubeIcon className="w-5 h-5 text-primary-600" /> },
    { label: 'Verifizierte Anbieter', value: '120+', icon: <ShieldCheckIcon className="w-5 h-5 text-primary-600" /> },
    { label: 'Standorte', value: '50+', icon: <MapPinIcon className="w-5 h-5 text-primary-600" /> },
    { label: 'Ø Bewertung', value: '4.8', icon: <StarIcon className="w-5 h-5 text-primary-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Detail-Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selected.image} alt={selected.name} className="w-full h-64 object-cover" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-slate-600" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                    selected.available ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
                  }`}
                >
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

      {/* Hero: Live-Marktplatz mit Fokus auf aktuelle Aktivität */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-emerald-50 pt-24 sm:pt-28 pb-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-24 w-72 h-72 bg-primary-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-[-120px] right-[-80px] w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),transparent_60%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            {/* Linke Spalte: Claim & Nutzen */}
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-slate-200 px-3 py-1 text-[11px] sm:text-xs font-semibold text-slate-700 backdrop-blur">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[9px] text-white">
                  <SparklesIcon className="w-3 h-3" />
                </span>
                Fertigo Equipment-Marktplatz
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Finden statt suchen:
                <span className="block text-slate-700">
                  Mietgeräte aus der ganzen Schweiz in einem einzigen Marktplatz.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                Egal ob Umbau, Neubau oder einmalige Gartenaktion – vergleichen Sie geprüfte Anbieter, freie Geräte und
                Preise in Sekunden, statt Dutzende Webseiten zu durchsuchen.
              </p>

              {/* Key-Benefits & Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div className="rounded-2xl bg-white/80 border border-slate-200 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
                    <CubeIcon className="w-4 h-4 text-primary-600" />
                    Verfügbare Geräte
                  </div>
                  <p className="text-xl font-black text-slate-900">{stats[0].value}</p>
                  <p className="text-[11px] text-slate-500 mt-1">direkt anfragbar</p>
                </div>
                <div className="rounded-2xl bg-white/80 border border-slate-200 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
                    <ShieldCheckIcon className="w-4 h-4 text-primary-600" />
                    Geprüfte Anbieter
                  </div>
                  <p className="text-xl font-black text-slate-900">{stats[1].value}</p>
                  <p className="text-[11px] text-slate-500 mt-1">mit klaren Konditionen</p>
                </div>
                <div className="rounded-2xl bg-white/80 border border-slate-200 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
                    <ClockIcon className="w-4 h-4 text-primary-600" />
                    Zeit bis zur Anfrage
                  </div>
                  <p className="text-xl font-black text-slate-900">⩽ 1 Min.</p>
                  <p className="text-[11px] text-slate-500 mt-1">vom Bedarf zur Kontaktaufnahme</p>
                </div>
              </div>

              {/* Kompakter Suchstreifen */}
              <div className="mt-2 bg-slate-900 text-white rounded-2xl px-4 sm:px-5 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 shadow-lg">
                <div className="relative flex-1 w-full">
                  <MagnifyingGlassIcon className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Wonach suchen Sie? z.B. „Minibagger Zürich“"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-slate-800/80 border border-slate-600 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      <XMarkIcon className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px] sm:text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSearchQuery('Minibagger')}
                    className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400"
                  >
                    Minibagger
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('Gerüst')}
                    className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-100 border border-slate-600 hover:border-emerald-400"
                  >
                    Gerüst
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('Reiniger')}
                    className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-100 border border-slate-600 hover:border-emerald-400"
                  >
                    Hochdruckreiniger
                  </button>
                </div>
              </div>
            </div>

            {/* Rechte Spalte: Live-Feed & Kategorie-Schnellauswahl */}
            <div className="space-y-4 lg:pl-6">
              <div className="rounded-3xl bg-white/90 border border-slate-200 shadow-xl p-4 sm:p-5 backdrop-blur">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.18em]">
                      Live vom Marktplatz
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      Zuletzt angefragte Geräte
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-100">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Aktiv
                  </span>
                </div>
                <div className="space-y-3">
                  {items.slice(0, 3).map(item => (
                    <FeedCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-slate-900 text-white px-4 sm:px-5 py-4 shadow-xl border border-slate-800">
                <p className="text-xs font-semibold text-slate-300 mb-2">
                  Schnell nach Kategorie filtern
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border ${
                      selectedCategory === null
                        ? 'bg-emerald-400 text-slate-900 border-emerald-300'
                        : 'bg-slate-800 text-slate-100 border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    Alle
                  </button>
                  {categories.map(category => {
                    const isActive = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(isActive ? null : category)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border ${
                          isActive
                            ? 'bg-emerald-300 text-slate-900 border-emerald-200'
                            : 'bg-slate-800 text-slate-100 border-slate-700 hover:border-emerald-400'
                        }`}
                      >
                        <span className="text-slate-200">
                          {categoryIcons[category] || <CubeIcon className="w-3.5 h-3.5" />}
                        </span>
                        <span>{category}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  Tipp: Kategorie wählen und oben im Suchfeld den Ort eingeben – schon sehen Sie passende Geräte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ergebnis-Bereich */}
      <div id="equipment" className="container mx-auto px-4 sm:px-6 max-w-6xl py-10">
        {/* Filter-Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">{filteredItems.length}</span>
            <span>Geräte gefunden</span>
            {selectedCategory && (
              <>
                <span>in</span>
                <span className="font-semibold text-primary-600">{selectedCategory}</span>
              </>
            )}
          </div>
          {(searchQuery || selectedCategory) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              <XMarkIcon className="w-3 h-3" />
              Filter zurücksetzen
            </button>
          )}
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden text-left hover:border-primary-500 hover:ring-1 hover:ring-primary-500 hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col h-full"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                {/* Bild */}
                <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide shadow-sm border ${
                        item.available
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {item.available ? '● Verfügbar' : '○ Reserviert'}
                    </span>
                  </div>
                </div>

                {/* Inhalt */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="mb-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-primary-700 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                        <StarIcon className="w-3 h-3 text-amber-500" />
                        <span className="text-xs font-bold text-slate-700">{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {item.category}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[120px]">
                        {item.provider}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 py-3 border-t border-dashed border-slate-200 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPinIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    {item.verified && (
                      <div className="flex items-center gap-2 text-xs text-primary-700">
                        <ShieldCheckIcon className="w-3.5 h-3.5" />
                        <span className="font-medium">Geprüfter Anbieter</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-1 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                        Mietpreis
                      </span>
                      <span className="text-xl font-black text-slate-900">
                        CHF {item.price}
                        <span className="text-xs font-normal text-slate-400 ml-1">/Tag</span>
                      </span>
                    </div>
                    <div className="h-9 px-4 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center gap-2 group-hover:bg-primary-600 transition-colors shadow-sm">
                      Details
                      <ArrowRightIcon className="w-3 h-3" />
                    </div>
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
              Wir konnten keine passenden Geräte finden. Versuchen Sie einen anderen Suchbegriff oder setzen Sie die
              Filter zurück.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
