import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
    PlusIcon, MagnifyingGlassIcon, ChevronUpDownIcon, XMarkIcon, TrashIcon,
    EyeIcon, CheckCircleIcon, MapPinIcon, CalendarDaysIcon, ShoppingBagIcon,
    PhotoIcon, UserIcon, MailIcon, PhoneIcon, CurrencyIcon, SpinnerIcon
} from '../components/icons';
import MarketplaceListingForm from '../components/MarketplaceListingForm';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_provider');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

type ListingStatus = 'Aktiv' | 'Entwurf' | 'In Verhandlung' | 'Verkauft/Vermietet' | 'Inaktiv';
type ListingType = 'Miet-Inserat' | 'Verkaufs-Inserat';

interface MarketplaceListing {
    _id: string;
    name: string;
    description?: string;
    type: ListingType;
    images: string[];
    category: string;
    location: string;
    price: string;
    pricePerDay?: number;
    status: ListingStatus;
    views: number;
    inquiries: number;
    contact?: {
        person: string;
        email: string;
        phone: string;
    };
    createdAt: string;
}

const statusConfig: { [key in ListingStatus]: { color: string, dotColor: string, bgColor: string } } = {
    'Aktiv': { color: 'text-emerald-800', dotColor: 'bg-emerald-500', bgColor: 'bg-emerald-100' },
    'Entwurf': { color: 'text-amber-800', dotColor: 'bg-amber-500', bgColor: 'bg-amber-100' },
    'In Verhandlung': { color: 'text-blue-800', dotColor: 'bg-blue-500', bgColor: 'bg-blue-100' },
    'Verkauft/Vermietet': { color: 'text-purple-800', dotColor: 'bg-purple-500', bgColor: 'bg-purple-100' },
    'Inaktiv': { color: 'text-slate-700', dotColor: 'bg-slate-400', bgColor: 'bg-slate-100' },
};

const allStatuses: ListingStatus[] = ['Aktiv', 'Entwurf', 'In Verhandlung', 'Verkauft/Vermietet', 'Inaktiv'];
const allTypes: ListingType[] = ['Miet-Inserat', 'Verkaufs-Inserat'];

const formatDate = (d: string) => new Date(d).toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' });

const ListingDetailModal: React.FC<{ listing: MarketplaceListing; onClose: () => void; }> = ({ listing, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = 'auto'; };
    }, [onClose]);

    const config = statusConfig[listing.status];

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8">
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 text-white hover:bg-white/30 p-2.5 rounded-xl" aria-label="Schliessen">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${config.bgColor} ${config.color}`}>
                                <div className={`w-2 h-2 rounded-full ${config.dotColor}`}></div>
                                {listing.status}
                            </span>
                            <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/20 text-white">{listing.type}</span>
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">{listing.name}</h2>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4" /><span className="font-semibold">{listing.location}</span></div>
                            <div className="flex items-center gap-1.5"><CalendarDaysIcon className="w-4 h-4" /><span className="font-semibold">{formatDate(listing.createdAt)}</span></div>
                        </div>
                    </div>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    {listing.images.length > 0 && (
                        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                            {listing.images.map((img, idx) => (
                                <img key={idx} src={img} alt={listing.name} className="h-32 w-40 object-cover rounded-xl border border-slate-200 flex-shrink-0" />
                            ))}
                        </div>
                    )}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4">
                            <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Preis</p>
                            <p className="text-lg font-black text-primary-700">{listing.price}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Aufrufe</p>
                            <p className="text-lg font-black text-slate-900">{listing.views}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Anfragen</p>
                            <p className="text-lg font-black text-slate-900">{listing.inquiries}</p>
                        </div>
                    </div>
                    {listing.description && (
                        <div className="mb-6">
                            <h3 className="font-black text-slate-800 mb-3">Beschreibung</h3>
                            <p className="text-slate-600 leading-relaxed">{listing.description}</p>
                        </div>
                    )}
                    {listing.contact && (
                        <div className="bg-slate-50 rounded-2xl p-5">
                            <h3 className="font-black text-slate-800 mb-4">Kontakt</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0"><UserIcon className="w-5 h-5 text-primary-600" /></div>
                                    <div className="min-w-0"><p className="text-xs text-slate-400 font-bold">Name</p><p className="font-bold text-slate-700 truncate">{listing.contact.person}</p></div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0"><MailIcon className="w-5 h-5 text-primary-600" /></div>
                                    <div className="min-w-0"><p className="text-xs text-slate-400 font-bold">E-Mail</p><a href={`mailto:${listing.contact.email}`} className="font-bold text-primary-600 hover:underline truncate block">{listing.contact.email}</a></div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0"><PhoneIcon className="w-5 h-5 text-primary-600" /></div>
                                    <div className="min-w-0"><p className="text-xs text-slate-400 font-bold">Telefon</p><a href={`tel:${listing.contact.phone}`} className="font-bold text-primary-600 hover:underline">{listing.contact.phone}</a></div>
                                </div>
                            </div>
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

const ListingCard: React.FC<{
    listing: MarketplaceListing;
    onView: () => void;
    onDelete: () => void;
}> = ({ listing, onView, onDelete }) => {
    const config = statusConfig[listing.status];

    return (
        <article onClick={onView} className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
            {listing.images.length > 0 ? (
                <div className="w-full h-40 overflow-hidden">
                    <img src={listing.images[0]} alt={listing.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
            ) : (
                <div className="w-full h-40 bg-slate-100 flex items-center justify-center">
                    <PhotoIcon className="w-12 h-12 text-slate-300" />
                </div>
            )}
            <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold ${config.bgColor} ${config.color}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></div>
                        {listing.status}
                    </span>
                    <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-blue-100 text-blue-700">{listing.type}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-1 mb-1">{listing.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <MapPinIcon className="w-3.5 h-3.5" /><span className="font-medium truncate">{listing.location || '–'}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-bold text-primary-600">{listing.price}</span>
                    <span className="text-slate-400">{listing.views} Aufrufe • {listing.inquiries} Anfragen</span>
                </div>
                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <button onClick={onView} className="flex-1 py-2 rounded-xl font-bold text-xs bg-primary-600 text-white hover:bg-primary-700 flex items-center justify-center gap-1.5">
                        <EyeIcon className="w-4 h-4" />Details
                    </button>
                    <button onClick={onDelete} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 hover:border-red-200" title="Löschen">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </article>
    );
};

// --- Skeleton ---
const MarketplaceSkeleton = () => (
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

const PartnerMarketplacePage: React.FC = () => {
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [typeFilter, setTypeFilter] = useState('Alle');
    const [isCreating, setIsCreating] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const [viewingListing, setViewingListing] = useState<MarketplaceListing | null>(null);

    const fetchListings = useCallback(async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/partner/marketplace`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error('Inserate konnten nicht geladen werden');
            const data = await response.json();
            setListings(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => setShowSuccessMessage(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage]);

    const filteredListings = useMemo(() =>
        listings.filter(l =>
            (statusFilter === 'Alle' || l.status === statusFilter) &&
            (typeFilter === 'Alle' || l.type === typeFilter) &&
            (l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.location.toLowerCase().includes(searchTerm.toLowerCase()))
        ),
        [listings, searchTerm, statusFilter, typeFilter]
    );

    const stats = useMemo(() => ({
        total: listings.length,
        active: listings.filter(l => l.status === 'Aktiv').length,
        views: listings.reduce((s, l) => s + l.views, 0),
        inquiries: listings.reduce((s, l) => s + l.inquiries, 0),
    }), [listings]);

    const handleCreateSuccess = async (newListing: any) => {
        try {
            const response = await fetch(`${API_URL}/api/partner/marketplace`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(newListing),
            });
            if (response.ok) {
                await fetchListings();
                setShowSuccessMessage("Inserat erfolgreich erstellt!");
            }
        } catch (err) {
            console.error('Error creating listing:', err);
        }
        setIsCreating(false);
    };

    const handleDeleteListing = async (listingId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Möchten Sie dieses Inserat wirklich löschen?")) {
            try {
                const response = await fetch(`${API_URL}/api/partner/marketplace/${listingId}`, {
                    method: 'DELETE',
                    headers: getAuthHeaders(),
                });
                if (response.ok) {
                    setListings(prev => prev.filter(l => l._id !== listingId));
                    setShowSuccessMessage("Inserat gelöscht!");
                }
            } catch (err) {
                console.error('Error deleting listing:', err);
            }
        }
    };

    if (loading) return <MarketplaceSkeleton />;

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <p className="text-red-600 font-bold text-lg mb-2">Fehler beim Laden</p>
                    <p className="text-red-500 mb-4">{error}</p>
                    <button onClick={() => { setLoading(true); fetchListings(); }} className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700">Erneut versuchen</button>
                </div>
            </div>
        );
    }

    if (isCreating) {
        return (
            <div className="animate-fade-in max-w-4xl mx-auto">
                <button onClick={() => setIsCreating(false)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Zurück zur Übersicht
                </button>
                <MarketplaceListingForm onSuccess={handleCreateSuccess} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {viewingListing && <ListingDetailModal listing={viewingListing} onClose={() => setViewingListing(null)} />}

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

            <div className="mb-8">
                <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input type="search" placeholder="Inserate durchsuchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="relative">
                                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="h-14 px-4 pr-10 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 outline-none appearance-none min-w-[180px]">
                                    <option value="Alle">Alle Typen</option>
                                    {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-14 px-4 pr-10 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 outline-none appearance-none min-w-[180px]">
                                    <option value="Alle">Alle Status</option>
                                    {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <button onClick={() => setIsCreating(true)} className="h-14 px-6 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white font-black rounded-xl hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                                <PlusIcon className="w-5 h-5" />Inserat erstellen
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">{filteredListings.length} {filteredListings.length === 1 ? 'Inserat' : 'Inserate'}</h2>
                    <p className="text-sm text-slate-600 mt-1 font-semibold">{stats.active} aktiv • {stats.views} Aufrufe • {stats.inquiries} Anfragen</p>
                </div>
            </div>

            {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredListings.map(listing => (
                        <ListingCard
                            key={listing._id}
                            listing={listing}
                            onView={() => setViewingListing(listing)}
                            onDelete={(e: any) => handleDeleteListing(listing._id, e)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-300">
                    <ShoppingBagIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-black text-slate-700 mb-2">Keine Inserate gefunden</h3>
                    <p className="text-sm text-slate-500 font-semibold mb-6">Passen Sie Ihre Filter an oder erstellen Sie ein neues Inserat.</p>
                    <div className="flex justify-center gap-3">
                        <button onClick={() => { setSearchTerm(''); setStatusFilter('Alle'); setTypeFilter('Alle'); }} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl border-2 border-slate-200">Filter zurücksetzen</button>
                        <button onClick={() => setIsCreating(true)} className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl shadow-lg">Inserat erstellen</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerMarketplacePage;
