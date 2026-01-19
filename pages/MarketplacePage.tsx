import React, { useState } from 'react';
import { MapPinIcon, ShieldCheckIcon, PhoneIcon, MailIcon, XMarkIcon } from '../components/icons';

interface Item {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  image: string;
  provider: string;
  verified: boolean;
}

const items: Item[] = [
  { id: '1', name: 'Minibagger 1.8t Kubota', category: 'Baumaschinen', location: 'Zürich', price: 250, image: 'https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=600', provider: 'BauRent AG', verified: true },
  { id: '2', name: 'Hilti Bohrhammer TE 70', category: 'Werkzeuge', location: 'Bern', price: 45, image: 'https://images.unsplash.com/photo-1581155694820-a1e33d49f257?q=80&w=600', provider: 'Werkzeug Profi', verified: true },
  { id: '3', name: 'Teleskoplader 7m', category: 'Baumaschinen', location: 'Basel', price: 380, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600', provider: 'Maschinen Meyer', verified: true },
  { id: '4', name: 'Gartenfräse 6.5 PS', category: 'Garten', location: 'Luzern', price: 70, image: 'https://images.unsplash.com/photo-1621997385536-235163153f3e?q=80&w=600', provider: 'Garten-Geräte', verified: false },
  { id: '5', name: 'Gerüst 50m² komplett', category: 'Gerüste', location: 'Winterthur', price: 120, image: 'https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=600', provider: 'Gerüstbau Keller', verified: true },
  { id: '6', name: 'Kompressor 400L', category: 'Werkzeuge', location: 'St. Gallen', price: 85, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600', provider: 'Luft & Druck AG', verified: true },
];

const MarketplacePage: React.FC = () => {
  const [selected, setSelected] = useState<Item | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const cats = ['Alle', ...new Set(items.map(i => i.category))];
  const filtered = activeTab === 0 ? items : items.filter(i => i.category === cats[activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-sm w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img src={selected.image} alt={selected.name} className="w-full h-52 object-cover" />
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white">
                <XMarkIcon className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-xs">
                {selected.category}
              </div>
            </div>
            <div className="p-5 text-white">
              <h2 className="text-xl font-semibold mb-1">{selected.name}</h2>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                <MapPinIcon className="w-3 h-3" />
                {selected.location}
                <span className="mx-1">•</span>
                {selected.provider}
                {selected.verified && <ShieldCheckIcon className="w-3 h-3 text-emerald-400" />}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold">CHF {selected.price}</p>
                  <p className="text-white/50 text-xs">pro Tag</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5" />
                  </button>
                  <button className="h-11 px-5 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 font-medium flex items-center gap-2 hover:opacity-90">
                    <MailIcon className="w-4 h-4" /> Anfragen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Equipment mieten</h1>
          <p className="text-white/60">Finde das richtige Gerät für dein Projekt</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/10 backdrop-blur rounded-2xl p-1">
            {cats.map((c, i) => (
              <button
                key={c}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === i ? 'bg-white text-purple-900 shadow-lg' : 'text-white/70 hover:text-white'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map(item => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="group bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden text-left hover:bg-white/15 hover:border-white/20 transition-all hover:scale-[1.02]"
            >
              <div className="aspect-square overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4 text-white">
                <p className="text-xs text-white/50 mb-1">{item.category}</p>
                <h3 className="font-medium text-sm mb-2 line-clamp-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-white/50">
                    <MapPinIcon className="w-3 h-3" />
                    {item.location}
                  </div>
                  <p className="font-bold text-lg">{item.price}<span className="text-xs text-white/50 font-normal">/d</span></p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/50">
            <p className="text-lg mb-2">Keine Geräte gefunden</p>
            <button onClick={() => setActiveTab(0)} className="text-pink-400 underline text-sm">Alle anzeigen</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
