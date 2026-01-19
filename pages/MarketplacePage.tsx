import React, { useState } from 'react';
import { MapPinIcon, ShieldCheckIcon, PhoneIcon, MailIcon, XMarkIcon, ArrowRightIcon, CheckCircleIcon } from '../components/icons';

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
}

const items: Item[] = [
  { id: '1', name: 'Minibagger 1.8t Kubota', category: 'Baumaschinen', location: 'Zürich', price: 250, image: 'https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=600', provider: 'BauRent AG', verified: true, description: '1.8 Tonnen, Diesel, Baujahr 2021' },
  { id: '2', name: 'Hilti Bohrhammer TE 70', category: 'Werkzeuge', location: 'Bern', price: 45, image: 'https://images.unsplash.com/photo-1581155694820-a1e33d49f257?q=80&w=600', provider: 'Werkzeug Profi', verified: true, description: '1600W, SDS-Max, inkl. Koffer' },
  { id: '3', name: 'Teleskoplader 7m', category: 'Baumaschinen', location: 'Basel', price: 380, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600', provider: 'Maschinen Meyer', verified: true, description: '7m Hubhöhe, 3t Traglast, Allrad' },
  { id: '4', name: 'Gartenfräse 6.5 PS', category: 'Garten', location: 'Luzern', price: 70, image: 'https://images.unsplash.com/photo-1621997385536-235163153f3e?q=80&w=600', provider: 'Garten-Geräte', verified: false, description: '6.5 PS Benzinmotor, 50cm Arbeitsbreite' },
  { id: '5', name: 'Gerüst 50m² komplett', category: 'Gerüste', location: 'Winterthur', price: 120, image: 'https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=600', provider: 'Gerüstbau Keller', verified: true, description: '50m² Alu-Gerüst, inkl. Montage' },
  { id: '6', name: 'Kompressor 400L', category: 'Werkzeuge', location: 'St. Gallen', price: 85, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600', provider: 'Luft & Druck AG', verified: true, description: '400L Tank, 10 bar, 400V Anschluss' },
];

const MarketplacePage: React.FC = () => {
  const [selected, setSelected] = useState<Item | null>(null);
  const [activeCategory, setActiveCategory] = useState('Alle');

  const categories = ['Alle', ...new Set(items.map(i => i.category))];
  const filtered = activeCategory === 'Alle' ? items : items.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img src={selected.image} alt={selected.name} className="w-full h-56 object-cover" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors">
                <XMarkIcon className="w-5 h-5 text-slate-600" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1.5 bg-white rounded-full text-xs font-bold text-slate-700 shadow-sm">
                  {selected.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-bold text-slate-900">{selected.name}</h2>
                {selected.verified && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full">
                    <ShieldCheckIcon className="w-3.5 h-3.5" />
                    Verifiziert
                  </span>
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4">{selected.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                <div className="flex items-center gap-1.5">
                  <MapPinIcon className="w-4 h-4" />
                  {selected.location}
                </div>
                <span className="text-slate-300">|</span>
                <span>{selected.provider}</span>
              </div>
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <div>
                  <p className="text-3xl font-black text-slate-900">CHF {selected.price}</p>
                  <p className="text-sm text-slate-500">pro Tag</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-12 h-12 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center transition-all">
                    <PhoneIcon className="w-5 h-5 text-slate-600" />
                  </button>
                  <button className="h-12 px-6 rounded-xl bg-primary-600 text-white font-bold flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20">
                    <MailIcon className="w-5 h-5" />
                    Anfragen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="bg-[#f5f5f5] pt-12 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
              Equipment Marktplatz
            </span>
            <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Professionelles Equipment mieten
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Finden Sie Maschinen, Werkzeuge und Geräte von geprüften Anbietern in Ihrer Nähe.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="group text-left bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  {item.verified && (
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1 px-2 py-1 bg-primary-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <ShieldCheckIcon className="w-3 h-3" />
                        Geprüft
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3 line-clamp-1">{item.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <MapPinIcon className="w-4 h-4" />
                    {item.location}
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

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="text-xl font-bold text-slate-900 mb-2">Keine Ergebnisse</p>
              <p className="text-slate-500 mb-4">Für diese Kategorie sind noch keine Angebote verfügbar.</p>
              <button
                onClick={() => setActiveCategory('Alle')}
                className="text-primary-600 font-semibold hover:underline"
              >
                Alle Kategorien anzeigen
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Sie haben Equipment zu vermieten?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Erreichen Sie tausende potenzielle Mieter und verdienen Sie mit Ihrem ungenutzten Equipment.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircleIcon className="w-5 h-5 text-primary-400" />
              <span>Kostenlos inserieren</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircleIcon className="w-5 h-5 text-primary-400" />
              <span>Geprüfte Mieter</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircleIcon className="w-5 h-5 text-primary-400" />
              <span>Sichere Abwicklung</span>
            </div>
          </div>
          <button className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 inline-flex items-center gap-2">
            Jetzt Equipment anbieten
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default MarketplacePage;
