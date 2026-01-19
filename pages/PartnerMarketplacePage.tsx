import React, { useState, useMemo, useEffect } from 'react';
import { 
    TagIcon, PlusIcon, PencilIcon, TrashIcon,
    CheckCircleIcon, PhotoIcon, MapPinIcon, MagnifyingGlassIcon, ChevronDownIcon,
    UsersIcon, EyeIcon, ArrowLeftIcon, CalendarDaysIcon,
    UserIcon, MailIcon, PhoneIcon, XMarkIcon
} from '../components/icons';
import MarketplaceListingForm from '../components/MarketplaceListingForm';

// --- TYPES ---
type ListingStatus = 'Entwurf' | 'Aktiv' | 'In Verhandlung' | 'Verkauft/Vermietet';
type ListingType = 'Miet-Inserat' | 'Verkaufs-Inserat';

interface MarketplaceListing {
    id: number;
    name: string;
    type: ListingType;
    images: string[];
    category: string;
    location: string;
    price: string;
    status: ListingStatus;
    views: number;
    inquiries: number;
    description?: string;
    createdAt: string;
    contact?: {
        person: string;
        email: string;
        phone: string;
    };
}

// --- MOCK DATA ---
const mockListings: MarketplaceListing[] = [
    { id: 101, name: 'Hochdruckreiniger Kärcher K7', type: 'Miet-Inserat', images: ['https://images.unsplash.com/photo-1628135543633-b5f70d74b868?q=80&w=800&auto=format=fit'], category: 'Reinigung', location: '8004 Zürich', price: 'CHF 60 / Tag', status: 'Aktiv', views: 258, inquiries: 12, createdAt: '20.07.2024', description: 'Leistungsstarker Hochdruckreiniger für alle Flächen.', contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' } },
    { id: 201, name: 'Occasion Minibagger 2.5t', type: 'Verkaufs-Inserat', images: ['https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=800&auto=format=fit-crop'], category: 'Baumaschinen', location: '8004 Zürich', price: 'CHF 28\'500', status: 'Aktiv', views: 480, inquiries: 7, createdAt: '18.07.2024', description: 'Gut erhaltener Minibagger, sofort einsatzbereit.', contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' } },
    { id: 102, name: 'Fassadengerüst, 50m²', type: 'Miet-Inserat', images: ['https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=800&auto=format=fit'], category: 'Gerüste & Bauzubehör', location: '8004 Zürich', price: 'CHF 25 / Tag', status: 'In Verhandlung', views: 150, inquiries: 3, createdAt: '15.07.2024', description: 'Stabiles Gerüst für Fassadenarbeiten.', contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' } },
    { id: 202, name: 'Lieferwagen Ford Transit', type: 'Verkaufs-Inserat', images: ['https://images.unsplash.com/photo-1621992011153-f3fb15bad52f?q=80&w=800&auto=format=fit-crop'], category: 'Nutzfahrzeuge', location: '8004 Zürich', price: 'CHF 19\'900', status: 'Verkauft/Vermietet', views: 890, inquiries: 25, createdAt: '28.06.2024', description: 'Zuverlässiger Transporter, frisch ab Service.', contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' } },
    { id: 103, name: 'Maler-Abdeckset Profi', type: 'Miet-Inserat', images: [], category: 'Werkzeuge & Geräte', location: '8004 Zürich', price: 'CHF 25 / Tag', status: 'Entwurf', views: 0, inquiries: 0, createdAt: '22.07.2024', description: 'Alles was man zum Abdecken braucht.', contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' } },
];

const statusConfig: { [key in ListingStatus]: { color: string, title: string, dotColor: string } } = {
    'Entwurf': { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', title: 'Entwurf', dotColor: 'bg-yellow-400' },
    'Aktiv': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', title: 'Aktiv', dotColor: 'bg-emerald-500' },
    'In Verhandlung': { color: 'bg-blue-50 text-blue-700 border-blue-200', title: 'In Verhandlung', dotColor: 'bg-blue-500' },
    'Verkauft/Vermietet': { color: 'bg-slate-100 text-slate-600 border-slate-200', title: 'Archiviert', dotColor: 'bg-slate-400' },
};

const ListingDetailModal: React.FC<{
    item: MarketplaceListing;
    onClose: () => void;
}> = ({ item, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 truncate pr-4">{item.name}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 flex-shrink-0" aria-label="Schliessen">
                        <XMarkIcon className="w-7 h-7" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left column: Image */}
                        <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-inner">
                            {item.images[0] ? (
                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                                    <PhotoIcon className="w-16 h-16" />
                                </div>
                            )}
                        </div>
                        {/* Right column: Key info */}
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-lg border">
                                <p className="text-xs font-bold text-slate-400 uppercase">Preis</p>
                                <p className="text-3xl font-extrabold text-slate-900">{item.price}</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg border">
                                <p className="text-xs font-bold text-slate-400 uppercase">Standort</p>
                                <p className="font-semibold text-slate-700 flex items-center gap-2"><MapPinIcon className="w-4 h-4" /> {item.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                        <div>
                            <h3 className="font-bold text-slate-800 mb-2">Beschreibung</h3>
                            <p className="text-slate-600 text-sm whitespace-pre-wrap">{item.description}</p>
                        </div>
                    )}
                    
                    {/* Contact */}
                    {item.contact && (
                        <div className="pt-4 border-t border-slate-100">
                             <h3 className="font-bold text-slate-800 mb-3">Kontakt</h3>
                             <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border">
                                    <UserIcon className="w-5 h-5 text-slate-400"/>
                                    <span className="font-medium text-slate-700">{item.contact.person}</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border">
                                    <MailIcon className="w-5 h-5 text-slate-400"/>
                                    <a href={`mailto:${item.contact.email}`} className="font-medium text-primary-600 hover:underline">{item.contact.email}</a>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border">
                                    <PhoneIcon className="w-5 h-5 text-slate-400"/>
                                    <a href={`tel:${item.contact.phone}`} className="font-medium text-primary-600 hover:underline">{item.contact.phone}</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                 <div className="p-5 bg-slate-50/70 rounded-b-2xl flex justify-end">
                    <button onClick={onClose} className="bg-slate-200 text-slate-800 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-300 transition-colors">
                        Schliessen
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
const PartnerMarketplacePage: React.FC = () => {
    const [listings, setListings] = useState<MarketplaceListing[]>(mockListings);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [showSuccess, setShowSuccess] = useState('');
    const [isCreatingListing, setIsCreatingListing] = useState(false);
    const [viewingItem, setViewingItem] = useState<MarketplaceListing | null>(null);
    
    useEffect(() => {
        if(showSuccess) {
            const timer = setTimeout(() => setShowSuccess(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const filteredListings = useMemo(() => 
        listings.filter(item => 
            item.type === 'Miet-Inserat' &&
            (statusFilter === 'Alle' || item.status === statusFilter) &&
            (item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        ),
        [listings, searchTerm, statusFilter]
    );

    const handleDelete = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Möchten Sie dieses Inserat wirklich löschen?")) {
            setListings(prev => prev.filter(item => item.id !== id));
            setShowSuccess("Inserat gelöscht!");
        }
    };
    
    const handleCreateSuccess = (posted: boolean) => {
        if (posted) {
            // Simulate adding a new listing
            const newListing: MarketplaceListing = {
                id: Date.now(),
                name: 'Neues Inserat (Demo)',
                type: 'Miet-Inserat',
                images: [],
                category: 'Sonstiges',
                location: 'Zürich',
                price: 'Auf Anfrage',
                status: 'Aktiv',
                views: 0,
                inquiries: 0,
                createdAt: new Date().toLocaleDateString('de-CH'),
                description: 'Neu erstelltes Inserat',
                contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' }
            };
            setListings(prev => [newListing, ...prev]);
            setShowSuccess("Inserat erfolgreich erstellt und veröffentlicht!");
        }
        setIsCreatingListing(false);
    };

    if (isCreatingListing) {
        return (
            <div className="animate-fade-in">
                 <button 
                    onClick={() => setIsCreatingListing(false)} 
                    className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5" /> Zurück zur Übersicht
                </button>
                <MarketplaceListingForm onSuccess={handleCreateSuccess} />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {viewingItem && <ListingDetailModal item={viewingItem} onClose={() => setViewingItem(null)} />}
            {showSuccess && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center gap-3 animate-fade-in" role="alert">
                    <CheckCircleIcon className="w-6 h-6" />
                    <p className="font-bold">{showSuccess}</p>
                </div>
            )}
            
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Meine Inserate</h1>
                    <p className="text-slate-500 mt-1">Verwalten Sie Ihre Miet- und Verkaufsangebote effizient.</p>
                </div>
                <button onClick={() => setIsCreatingListing(true)} className="flex items-center justify-center gap-2 bg-primary-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-primary-700 transition-all shadow-md hover:-translate-y-0.5">
                    <PlusIcon className="w-5 h-5" />
                    Neues Inserat
                </button>
            </div>
            
            {/* Filter Bar */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex flex-col md:flex-row gap-3 items-center">
                <div className="relative flex-grow w-full md:w-auto">
                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
                    <input type="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Suchen..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all font-medium text-slate-700"/>
                </div> 
                <div className="relative w-full md:w-48">
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-200 cursor-pointer font-medium text-slate-600">
                        <option value="Alle">Alle Status</option>
                        {Object.entries(statusConfig).map(([key, {title}]) => <option key={key} value={key}>{title}</option>)}
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>

            {/* Content List - Redesigned List View */}
            <div className="space-y-4">
                {filteredListings.length > 0 ? (
                    filteredListings.map(item => (
                        <div 
                            key={item.id} 
                            onClick={() => setViewingItem(item)}
                            className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all duration-300 items-start md:items-center cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-100">
                                {item.images[0] ? (
                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <PhotoIcon className="w-8 h-8"/>
                                    </div>
                                )}
                                <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded shadow-sm backdrop-blur-sm border border-white/10 ${item.type === 'Miet-Inserat' ? 'bg-blue-600/90 text-white' : 'bg-emerald-600/90 text-white'}`}>
                                    {item.type === 'Miet-Inserat' ? 'Mieten' : 'Kaufen'}
                                </span>
                            </div>

                            {/* Main Info */}
                            <div className="flex-grow min-w-0 w-full">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded">{item.category}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1"><CalendarDaysIcon className="w-3 h-3"/> {item.createdAt}</span>
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2 truncate">{item.name}</h3>
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                        <MapPinIcon className="w-4 h-4 text-slate-400"/>
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="font-extrabold text-lg text-slate-900">{item.price}</div>
                                </div>
                            </div>

                            {/* Stats & Status */}
                            <div className="flex flex-row md:flex-col gap-4 md:gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto md:min-w-[150px] justify-between md:justify-center">
                                <div>
                                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${statusConfig[item.status].color}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[item.status].dotColor}`}></div>
                                        {statusConfig[item.status].title}
                                    </span>
                                </div>
                                <div className="flex gap-6 md:gap-4">
                                    <div>
                                        <span className="block text-lg font-bold text-slate-700 leading-none">{item.views}</span>
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1 mt-1">
                                            <EyeIcon className="w-3 h-3"/> Views
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-lg font-bold text-slate-700 leading-none">{item.inquiries}</span>
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1 mt-1">
                                            <UsersIcon className="w-3 h-3"/> Anfragen
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col gap-2 w-full md:w-auto justify-end md:justify-center border-t md:border-t-0 border-slate-100 pt-4 md:pt-0" onClick={e => e.stopPropagation()}>
                                <button onClick={() => {}} className="flex-1 md:flex-none p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors border border-slate-200 hover:border-primary-100 flex justify-center" title="Bearbeiten">
                                    <PencilIcon className="w-5 h-5"/>
                                </button>
                                <button onClick={(e) => handleDelete(item.id, e)} className="flex-1 md:flex-none p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-slate-200 hover:border-red-100 flex justify-center" title="Löschen">
                                    <TrashIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-16 bg-white rounded-xl border-2 border-dashed border-slate-300">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TagIcon className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700">Keine Inserate gefunden</h3>
                        <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
                            Ihre Suche oder Filter ergaben keine Treffer. Versuchen Sie, die Filter anzupassen oder erstellen Sie ein neues Inserat.
                        </p>
                        <button onClick={() => {setSearchTerm(''); setStatusFilter('Alle');}} className="mt-4 text-primary-600 font-bold hover:underline">
                            Filter zurücksetzen
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartnerMarketplacePage;