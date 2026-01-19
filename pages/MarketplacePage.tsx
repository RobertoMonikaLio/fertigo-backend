import React, { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, XMarkIcon, ShieldCheckIcon, PhoneIcon, MailIcon } from '../components/icons';

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

const categories = ['Alle', 'Baumaschinen', 'Werkzeuge', 'Garten', 'Gerüste'];

const MarketplacePage: React.FC = () => {
  const [selected, setSelected] = useState<Item | null>(null);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Alle');

  const filtered = items.filter(i => 
    (cat === 'Alle' || i.category === cat) &&
    (search === '' || i.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-stone-100">
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white max-w-md w-full rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <img src={selected.image} alt={selected.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wide">{selected.category}</p>
                  <h2 className="text-xl font-semibold text-stone-900">{selected.name}</h2>
                </div>
                <button onClick={() => setSelected(null)} className="text-stone-400 hover:text-stone-600">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-600 mb-4">
                <MapPinIcon className="w-4 h-4" />
                {selected.location}
                {selected.verified && <ShieldCheckIcon className="w-4 h-4 text-green-600 ml-2" />}
                <span className="text-stone-400">|</span>
                {selected.provider}
              </div>
              <div className="border-t pt-4 flex items-center justify-between">
                <p className="text-2xl font-bold">CHF {selected.price}<span className="text-sm font-normal text-stone-500">/Tag</span></p>
                <div className="flex gap-2">
                  <button className="p-2 border border-stone-300 rounded hover:bg-stone-50"><PhoneIcon className="w-5 h-5" /></button>
                  <button className="px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-800 flex items-center gap-2">
                    <MailIcon className="w-4 h-4" /> Anfragen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Suchen..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded text-sm focus:outline-none focus:border-stone-500"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-2 text-sm whitespace-nowrap rounded transition ${cat === c ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <p className="text-sm text-stone-500 mb-4">{filtered.length} Ergebnisse</p>
        
        <div className="space-y-3">
          {filtered.map(item => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="w-full bg-white rounded-lg p-3 flex gap-4 hover:shadow-md transition text-left"
            >
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-stone-500 uppercase tracking-wide">{item.category}</p>
                <h3 className="font-medium text-stone-900 truncate">{item.name}</h3>
                <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                  <MapPinIcon className="w-3 h-3" />
                  {item.location}
                  {item.verified && <ShieldCheckIcon className="w-3 h-3 text-green-600" />}
                </div>
                <p className="mt-2 text-lg font-semibold">CHF {item.price}<span className="text-xs font-normal text-stone-500">/Tag</span></p>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-500">
            <p>Keine Ergebnisse</p>
            <button onClick={() => { setSearch(''); setCat('Alle'); }} className="mt-2 text-sm underline">Filter zurücksetzen</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
