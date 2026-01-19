import React, { useState } from 'react';
import { XMarkIcon, MapPinIcon, ShieldCheckIcon, PhoneIcon, MailIcon } from '../components/icons';

interface Item {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  image: string;
  provider: string;
  verified: boolean;
  specs: string;
}

const items: Item[] = [
  { id: '1', name: 'Minibagger 1.8t Kubota', category: 'Baumaschinen', location: 'Zürich', price: 250, image: 'https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=600', provider: 'BauRent AG', verified: true, specs: '1.8 Tonnen • Diesel • 2021' },
  { id: '2', name: 'Hilti Bohrhammer TE 70', category: 'Werkzeuge', location: 'Bern', price: 45, image: 'https://images.unsplash.com/photo-1581155694820-a1e33d49f257?q=80&w=600', provider: 'Werkzeug Profi', verified: true, specs: '1600W • SDS-Max • Koffer' },
  { id: '3', name: 'Teleskoplader 7m', category: 'Baumaschinen', location: 'Basel', price: 380, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600', provider: 'Maschinen Meyer', verified: true, specs: '7m Höhe • 3t Last • 4x4' },
  { id: '4', name: 'Gartenfräse 6.5 PS', category: 'Garten', location: 'Luzern', price: 70, image: 'https://images.unsplash.com/photo-1621997385536-235163153f3e?q=80&w=600', provider: 'Garten-Geräte', verified: false, specs: '6.5 PS • Benzin • 50cm' },
  { id: '5', name: 'Gerüst 50m² komplett', category: 'Gerüste', location: 'Winterthur', price: 120, image: 'https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=600', provider: 'Gerüstbau Keller', verified: true, specs: '50m² • Alu • inkl. Montage' },
  { id: '6', name: 'Kompressor 400L', category: 'Werkzeuge', location: 'St. Gallen', price: 85, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600', provider: 'Luft & Druck AG', verified: true, specs: '400L • 10 bar • 400V' },
];

const MarketplacePage: React.FC = () => {
  const [selected, setSelected] = useState<Item | null>(null);
  const [filter, setFilter] = useState('');

  const filtered = items.filter(i => 
    filter === '' || i.category === filter
  );

  const cats = [...new Set(items.map(i => i.category))];

  return (
    <div className="min-h-screen bg-black text-white">
      {selected && (
        <div className="fixed inset-0 z-50 bg-black">
          <img src={selected.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="p-4 flex justify-end">
              <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="max-w-lg w-full">
                <p className="text-orange-400 text-sm font-mono mb-2">{selected.category}</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{selected.name}</h1>
                <p className="text-white/60 mb-6">{selected.specs}</p>
                <div className="flex items-center gap-3 mb-8">
                  <MapPinIcon className="w-4 h-4 text-white/40" />
                  <span className="text-white/60">{selected.location}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/60">{selected.provider}</span>
                  {selected.verified && <ShieldCheckIcon className="w-4 h-4 text-green-400" />}
                </div>
                <div className="text-5xl font-bold mb-8">
                  CHF {selected.price}<span className="text-lg text-white/40 font-normal">/Tag</span>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-4 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-400 flex items-center justify-center gap-2">
                    <MailIcon className="w-5 h-5" /> Anfragen
                  </button>
                  <button className="w-14 h-14 border border-white/20 rounded-lg hover:bg-white/10 flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">MARKTPLATZ</h1>
            <p className="text-white/50 text-lg">Professionelles Equipment. Sofort verfügbar.</p>
          </div>

          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            <button 
              onClick={() => setFilter('')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${filter === '' ? 'bg-orange-500 text-black' : 'bg-white/10 hover:bg-white/20'}`}
            >
              Alle
            </button>
            {cats.map(c => (
              <button 
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${filter === c ? 'bg-orange-500 text-black' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`group relative overflow-hidden rounded-2xl text-left ${i === 0 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-[4/3]'}`}
              >
                <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                  <p className="text-orange-400 text-xs font-mono mb-1">{item.category}</p>
                  <h3 className={`font-bold mb-2 ${i === 0 ? 'text-3xl' : 'text-xl'}`}>{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <MapPinIcon className="w-3 h-3" />
                      {item.location}
                      {item.verified && <ShieldCheckIcon className="w-3 h-3 text-green-400" />}
                    </div>
                    <p className="text-xl font-bold">CHF {item.price}<span className="text-xs text-white/50 font-normal">/Tag</span></p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/40">
              <p className="text-xl mb-4">Keine Ergebnisse</p>
              <button onClick={() => setFilter('')} className="text-orange-400 underline">Zurücksetzen</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
