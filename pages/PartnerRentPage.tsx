import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    PlusIcon, TrashIcon, XMarkIcon, EyeIcon, CheckCircleIcon, MapPinIcon,
    PencilIcon, PhotoIcon, SpinnerIcon, MagnifyingGlassIcon, ChevronUpDownIcon
} from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_provider');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

type ItemStatus = 'Aktiv' | 'Entwurf' | 'Inaktiv';

interface RentalItem {
    _id: string;
    name: string;
    description: string;
    images: string[];
    category: string;
    location: string;
    price: string;
    pricePerDay: number;
    status: ItemStatus;
    views: number;
    inquiries: number;
    createdAt: string;
}

const statusConfig: { [key in ItemStatus]: { color: string, dotColor: string, bgColor: string } } = {
    'Aktiv': { color: 'text-emerald-800', dotColor: 'bg-emerald-500', bgColor: 'bg-emerald-100' },
    'Entwurf': { color: 'text-amber-800', dotColor: 'bg-amber-500', bgColor: 'bg-amber-100' },
    'Inaktiv': { color: 'text-slate-700', dotColor: 'bg-slate-400', bgColor: 'bg-slate-100' },
};

const categories = ['Alle', 'Baumaschinen', 'Werkzeuge', 'Fahrzeuge', 'Gerüste', 'Container', 'Sonstiges'];

const formatDate = (d: string) => new Date(d).toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' });

// --- Multi Image Uploader ---
const MultiImageUploader: React.FC<{
    images: string[];
    onChange: (images: string[]) => void;
}> = ({ images, onChange }) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                onChange([...images, reader.result as string]);
            };
            reader.readAsDataURL(file as any);
        });
    };

    const removeImage = (idx: number) => {
        onChange(images.filter((_, i) => i !== idx));
    };

    return (
        <div>
            <div className="flex flex-wrap gap-3 mb-3">
                {images.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            <XMarkIcon className="w-3 h-3" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-400 transition-colors"
                >
                    <PhotoIcon className="w-6 h-6" />
                    <span className="text-xs mt-1">Bild</span>
                </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
        </div>
    );
};

// --- New Listing Form ---
const NewListingForm: React.FC<{
    onCancel: () => void;
    onSubmit: (data: any) => void;
    saving: boolean;
}> = ({ onCancel, onSubmit, saving }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Baumaschinen');
    const [location, setLocation] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [images, setImages] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit({
            name,
            description,
            type: 'Miet-Inserat',
            category,
            location,
            price: `CHF ${pricePerDay}/Tag`,
            pricePerDay: Number(pricePerDay),
            images,
            status: 'Aktiv',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-5">
            <h2 className="text-xl font-black text-slate-900">Neues Miet-Inserat erstellen</h2>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Bezeichnung *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" required />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Beschreibung</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full h-28 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Kategorie</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 outline-none">
                        {categories.filter(c => c !== 'Alle').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Standort</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Preis/Tag (CHF)</label>
                    <input type="number" value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Bilder</label>
                <MultiImageUploader images={images} onChange={setImages} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onCancel} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl border-2 border-slate-200">Abbrechen</button>
                <button type="submit" disabled={saving || !name.trim()} className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-black rounded-xl hover:from-primary-700 hover:to-primary-800 shadow-lg disabled:opacity-50 flex items-center gap-2">
                    {saving && <SpinnerIcon className="w-4 h-4 animate-spin" />}
                    Inserat veröffentlichen
                </button>
            </div>
        </form>
    );
};

// --- Edit Listing Form ---
const EditListingForm: React.FC<{
    item: RentalItem;
    onCancel: () => void;
    onSubmit: (data: any) => void;
    saving: boolean;
}> = ({ item, onCancel, onSubmit, saving }) => {
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [category, setCategory] = useState(item.category);
    const [location, setLocation] = useState(item.location);
    const [pricePerDay, setPricePerDay] = useState(String(item.pricePerDay));
    const [images, setImages] = useState<string[]>(item.images);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            description,
            category,
            location,
            price: `CHF ${pricePerDay}/Tag`,
            pricePerDay: Number(pricePerDay),
            images,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-5">
            <h2 className="text-xl font-black text-slate-900">Inserat bearbeiten</h2>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Bezeichnung *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" required />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Beschreibung</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full h-28 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Kategorie</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 outline-none">
                        {categories.filter(c => c !== 'Alle').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Standort</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Preis/Tag (CHF)</label>
                    <input type="number" value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 outline-none" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Bilder</label>
                <MultiImageUploader images={images} onChange={setImages} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onCancel} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl border-2 border-slate-200">Abbrechen</button>
                <button type="submit" disabled={saving || !name.trim()} className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-black rounded-xl shadow-lg disabled:opacity-50 flex items-center gap-2">
                    {saving && <SpinnerIcon className="w-4 h-4 animate-spin" />}
                    Speichern
                </button>
            </div>
        </form>
    );
};

// --- Detail Modal ---
const ListingDetailModal: React.FC<{ item: RentalItem; onClose: () => void; }> = ({ item, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = 'auto'; };
    }, [onClose]);

    const config = statusConfig[item.status as ItemStatus] || statusConfig['Aktiv'];

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8">
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 text-white hover:bg-white/30 p-2.5 rounded-xl" aria-label="Schliessen">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                    <div className="relative z-10">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${config.bgColor} ${config.color} mb-3`}>
                            <div className={`w-2 h-2 rounded-full ${config.dotColor}`}></div>
                            {item.status}
                        </span>
                        <h2 className="text-2xl font-black text-white mb-2">{item.name}</h2>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4" /><span className="font-semibold">{item.location || '–'}</span></div>
                        </div>
                    </div>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    {item.images.length > 0 && (
                        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                            {item.images.map((img, idx) => (
                                <img key={idx} src={img} alt={item.name} className="h-32 w-40 object-cover rounded-xl border border-slate-200 flex-shrink-0" />
                            ))}
                        </div>
                    )}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4">
                            <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Preis/Tag</p>
                            <p className="text-lg font-black text-primary-700">{item.price}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Aufrufe</p>
                            <p className="text-lg font-black text-slate-900">{item.views}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Anfragen</p>
                            <p className="text-lg font-black text-slate-900">{item.inquiries}</p>
                        </div>
                    </div>
                    {item.description && (
                        <div className="mb-6">
                            <h3 className="font-black text-slate-800 mb-3">Beschreibung</h3>
                            <div className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                        </div>
                    )}
                </div>
                <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-end">
                    <button onClick={onClose} className="bg-primary-600 text-white font-black py-3 px-8 rounded-xl hover:bg-primary-700 shadow-lg">Schliessen</button>
                </div>
            </div>
        </div>
    );
};

// --- Skeleton ---
const RentSkeleton = () => (
    <div className="max-w-7xl mx-auto animate-pulse">
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-8"><div className="h-14 bg-slate-200 rounded-xl" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="h-40 bg-slate-200" />
                    <div className="p-4 space-y-3"><div className="h-4 bg-slate-200 rounded w-20" /><div className="h-5 bg-slate-200 rounded w-3/4" /><div className="h-10 bg-slate-200 rounded-xl" /></div>
                </div>
            ))}
        </div>
    </div>
);

const PartnerRentPage: React.FC = () => {
    const [items, setItems] = useState<RentalItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Alle');
    const [view, setView] = useState<'list' | 'create' | 'edit' | 'detail'>('list');
    const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
    const [saving, setSaving] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState('');

    const fetchItems = useCallback(async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/partner/marketplace?type=Miet-Inserat`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error('Mietinserate konnten nicht geladen werden');
            const data = await response.json();
            setItems(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => setShowSuccessMessage(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage]);

    const filteredItems = items.filter(item =>
        (categoryFilter === 'Alle' || item.category === categoryFilter) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateSubmit = async (data: any) => {
        setSaving(true);
        try {
            const response = await fetch(`${API_URL}/api/partner/marketplace`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data),
            });
            if (response.ok) {
                await fetchItems();
                setShowSuccessMessage("Miet-Inserat erfolgreich erstellt!");
                setView('list');
            }
        } catch (err) {
            console.error('Error creating rental listing:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleEditSubmit = async (data: any) => {
        if (!selectedItem) return;
        setSaving(true);
        try {
            const response = await fetch(`${API_URL}/api/partner/marketplace/${selectedItem._id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(data),
            });
            if (response.ok) {
                await fetchItems();
                setShowSuccessMessage("Inserat erfolgreich aktualisiert!");
                setView('list');
                setSelectedItem(null);
            }
        } catch (err) {
            console.error('Error updating rental listing:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (itemId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Möchten Sie dieses Inserat wirklich löschen?")) {
            try {
                const response = await fetch(`${API_URL}/api/partner/marketplace/${itemId}`, {
                    method: 'DELETE',
                    headers: getAuthHeaders(),
                });
                if (response.ok) {
                    setItems(prev => prev.filter(i => i._id !== itemId));
                    setShowSuccessMessage("Inserat gelöscht!");
                }
            } catch (err) {
                console.error('Error deleting rental listing:', err);
            }
        }
    };

    if (loading) return <RentSkeleton />;

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <p className="text-red-600 font-bold text-lg mb-2">Fehler beim Laden</p>
                    <p className="text-red-500 mb-4">{error}</p>
                    <button onClick={() => { setLoading(true); fetchItems(); }} className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700">Erneut versuchen</button>
                </div>
            </div>
        );
    }

    if (view === 'create') {
        return (
            <div className="animate-fade-in max-w-4xl mx-auto">
                <button onClick={() => setView('list')} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Zurück
                </button>
                <NewListingForm onCancel={() => setView('list')} onSubmit={handleCreateSubmit} saving={saving} />
            </div>
        );
    }

    if (view === 'edit' && selectedItem) {
        return (
            <div className="animate-fade-in max-w-4xl mx-auto">
                <button onClick={() => { setView('list'); setSelectedItem(null); }} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Zurück
                </button>
                <EditListingForm item={selectedItem} onCancel={() => { setView('list'); setSelectedItem(null); }} onSubmit={handleEditSubmit} saving={saving} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {view === 'detail' && selectedItem && <ListingDetailModal item={selectedItem} onClose={() => { setView('list'); setSelectedItem(null); }} />}

            {showSuccessMessage && (
                <div className="mb-6 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl flex items-center gap-3 animate-fade-in shadow-lg" role="alert">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="font-bold">{showSuccessMessage}</p>
                </div>
            )}

            <div className="flex items-center justify-end mb-4">
                <span className="text-green-600 font-semibold text-sm">● Live-Daten</span>
            </div>

            {/* Search & Filters */}
            <div className="mb-8">
                <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input type="search" placeholder="Inserate durchsuchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="relative">
                                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="h-14 px-4 pr-10 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 outline-none appearance-none min-w-[180px]">
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <button onClick={() => setView('create')} className="h-14 px-6 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white font-black rounded-xl hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                                <PlusIcon className="w-5 h-5" />Neues Miet-Inserat
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-900">{filteredItems.length} Miet-Inserate</h2>
                <p className="text-sm text-slate-600 mt-1 font-semibold">{items.filter(i => i.status === 'Aktiv').length} aktiv</p>
            </div>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredItems.map(item => {
                        const config = statusConfig[item.status as ItemStatus] || statusConfig['Aktiv'];
                        return (
                            <article key={item._id} onClick={() => { setSelectedItem(item); setView('detail'); }} className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                                {item.images.length > 0 ? (
                                    <div className="w-full h-40 overflow-hidden">
                                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                ) : (
                                    <div className="w-full h-40 bg-slate-100 flex items-center justify-center">
                                        <PhotoIcon className="w-12 h-12 text-slate-300" />
                                    </div>
                                )}
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold ${config.bgColor} ${config.color}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></div>
                                            {item.status}
                                        </span>
                                        <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-blue-100 text-blue-700">{item.category}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-1 mb-1">{item.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                        <MapPinIcon className="w-3.5 h-3.5" /><span className="font-medium">{item.location || '–'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                                        <span className="font-bold text-primary-600">{item.price}</span>
                                        <span className="text-slate-400">{item.views} Aufrufe</span>
                                    </div>
                                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                        <button onClick={() => { setSelectedItem(item); setView('detail'); }} className="flex-1 py-2 rounded-xl font-bold text-xs bg-primary-600 text-white hover:bg-primary-700 flex items-center justify-center gap-1.5">
                                            <EyeIcon className="w-4 h-4" />Details
                                        </button>
                                        <button onClick={() => { setSelectedItem(item); setView('edit'); }} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl border border-slate-200" title="Bearbeiten">
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button onClick={(e) => handleDelete(item._id, e)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 hover:border-red-200" title="Löschen">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-300">
                    <PhotoIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-black text-slate-700 mb-2">Keine Miet-Inserate</h3>
                    <p className="text-sm text-slate-500 font-semibold mb-6">Erstellen Sie Ihr erstes Miet-Inserat.</p>
                    <button onClick={() => setView('create')} className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl shadow-lg">Neues Miet-Inserat</button>
                </div>
            )}
        </div>
    );
};

export default PartnerRentPage;
