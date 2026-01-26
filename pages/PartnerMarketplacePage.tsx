import React, { useState, useMemo, useEffect } from 'react';
import { 
    TagIcon, PlusIcon, PencilIcon, TrashIcon,
    CheckCircleIcon, PhotoIcon, MapPinIcon, MagnifyingGlassIcon, ChevronUpDownIcon,
    UsersIcon, EyeIcon, ArrowLeftIcon, CalendarDaysIcon,
    UserIcon, MailIcon, PhoneIcon, XMarkIcon, BriefcaseIcon
} from '../components/icons';
import MarketplaceListingForm from '../components/MarketplaceListingForm';

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

const mockListings: MarketplaceListing[] = [
    { id: 101, name: 'Hochdruckreiniger Kärcher K7', type: 'Miet-Inserat', images: ['https://images.unsplash.com/photo-1628135543633-b5f70d74b868?q=80&w=800&auto=format=fit'], category: 'Reinigung', location: '8004 Zürich', price: 'CHF 60 / Tag', status: 'Aktiv', views: 258, inquiries: 12, createdAt: '20.07.2024', description: 'Leistungsstarker Hochdruckreiniger für alle Flächen.', contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' } },
    { id: 201, name: 'Occasion Minibagger 2.5t', type: 'Verkaufs-Inserat', images: ['https://images.unsplash.com/photo-1550508123-54de5f115e61?q=80&w=800&auto=format=fit-crop'], category: 'Baumaschinen', location: '8004 Zürich', price: 'CHF 28\'500', status: 'Aktiv', views: 480, inquiries: 7, createdAt: '18.07.2024', description: 'Gut erhaltener Minibagger, sofort einsatzbereit.', contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' } },
    { id: 102, name: 'Fassadengerüst, 50m²', type: 'Miet-Inserat', images: ['https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=800&auto=format=fit'], category: 'Gerüste & Bauzubehör', location: '8004 Zürich', price: 'CHF 25 / Tag', status: 'In Verhandlung', views: 150, inquiries: 3, createdAt: '15.07.2024', description: 'Stabiles Gerüst für Fassadenarbeiten.', contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' } },
    { id: 202, name: 'Lieferwagen Ford Transit', type: 'Verkaufs-Inserat', images: ['https://images.unsplash.com/photo-1621992011153-f3fb15bad52f?q=80&w=800&auto=format=fit-crop'], category: 'Nutzfahrzeuge', location: '8004 Zürich', price: 'CHF 19\'900', status: 'Verkauft/Vermietet', views: 890, inquiries: 25, createdAt: '28.06.2024', description: 'Zuverlässiger Transporter, frisch ab Service.', contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' } },
    { id: 103, name: 'Maler-Abdeckset Profi', type: 'Miet-Inserat', images: [], category: 'Werkzeuge & Geräte', location: '8004 Zürich', price: 'CHF 25 / Tag', status: 'Entwurf', views: 0, inquiries: 0, createdAt: '22.07.2024', description: 'Alles was man zum Abdecken braucht.', contact: { person: 'Markus Müller', email: 'verkauf@mueller-bau.ch', phone: '079 123 45 67' } },
];

const statusConfig: { [key in ListingStatus]: { color: string, title: string, dotColor: string, bgColor: string } } = {
    'Entwurf': { color: 'text-amber-800', title: 'Entwurf', dotColor: 'bg-amber-500', bgColor: 'bg-amber-100' },
    'Aktiv': { color: 'text-emerald-800', title: 'Aktiv', dotColor: 'bg-emerald-500', bgColor: 'bg-emerald-100' },
    'In Verhandlung': { color: 'text-blue-800', title: 'In Verhandlung', dotColor: 'bg-blue-500', bgColor: 'bg-blue-100' },
    'Verkauft/Vermietet': { color: 'text-slate-700', title: 'Archiviert', dotColor: 'bg-slate-400', bgColor: 'bg-slate-100' },
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
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="relative h-64 bg-slate-100">
                    {item.images[0] ? (
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                            <PhotoIcon className="w-20 h-20 text-slate-300" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-2.5 rounded-xl transition-all" aria-label="Schliessen">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-6 right-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1.5 text-xs uppercase font-black tracking-wider rounded-lg ${item.type === 'Miet-Inserat' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}`}>
                                {item.type === 'Miet-Inserat' ? 'Mieten' : 'Kaufen'}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${statusConfig[item.status].bgColor} ${statusConfig[item.status].color}`}>
                                <div className={`w-2 h-2 rounded-full ${statusConfig[item.status].dotColor}`}></div>
                                {statusConfig[item.status].title}
                            </span>
                        </div>
                        <h2 className="text-2xl font-black text-white">{item.name}</h2>
                    </div>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4">
                            <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Preis</p>
                            <p className="text-xl font-black text-primary-700">{item.price}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Aufrufe</p>
                            <p className="text-xl font-black text-slate-900">{item.views}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Anfragen</p>
                            <p className="text-xl font-black text-slate-900">{item.inquiries}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Erstellt</p>
                            <p className="text-xl font-black text-slate-900">{item.createdAt}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600 mb-6">
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                            <MapPinIcon className="w-4 h-4 text-slate-500" />
                            <span className="font-semibold">{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                            <BriefcaseIcon className="w-4 h-4 text-slate-500" />
                            <span className="font-semibold">{item.category}</span>
                        </div>
                    </div>

                    {item.description && (
                        <div className="mb-6">
                            <h3 className="font-black text-slate-800 mb-3">Beschreibung</h3>
                            <p className="text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                    )}
                    
                    {item.contact && (
                        <div className="bg-slate-50 rounded-2xl p-5">
                            <h3 className="font-black text-slate-800 mb-4">Kontaktinformationen</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UserIcon className="w-5 h-5 text-primary-600"/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 font-bold">Name</p>
                                        <p className="font-bold text-slate-700 truncate">{item.contact.person}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MailIcon className="w-5 h-5 text-primary-600"/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 font-bold">E-Mail</p>
                                        <a href={`mailto:${item.contact.email}`} className="font-bold text-primary-600 hover:underline truncate block">{item.contact.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <PhoneIcon className="w-5 h-5 text-primary-600"/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 font-bold">Telefon</p>
                                        <a href={`tel:${item.contact.phone}`} className="font-bold text-primary-600 hover:underline">{item.contact.phone}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                    <button className="flex items-center gap-2 px-5 py-2.5 text-slate-600 hover:text-slate-800 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                        <PencilIcon className="w-5 h-5" />
                        Bearbeiten
                    </button>
                    <button onClick={onClose} className="bg-primary-600 text-white font-black py-3 px-8 rounded-xl hover:bg-primary-700 transition-colors shadow-lg">
                        Schliessen
                    </button>
                </div>
            </div>
        </div>
    );
};

const ListingCard: React.FC<{
    item: MarketplaceListing;
    onView: () => void;
    onDelete: (e: React.MouseEvent) => void;
}> = ({ item, onView, onDelete }) => {
    const config = statusConfig[item.status];
    
    return (
        <article 
            onClick={onView}
            className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
        >
            <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap gap-1.5">
                        <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md ${item.type === 'Miet-Inserat' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {item.type === 'Miet-Inserat' ? 'Mieten' : 'Kaufen'}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold ${config.bgColor} ${config.color}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></div>
                            {config.title}
                        </span>
                    </div>
                </div>

                <div className="flex gap-3 mb-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                        {item.images[0] ? (
                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <PhotoIcon className="w-6 h-6"/>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">{item.category}</p>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">
                            {item.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                            <MapPinIcon className="w-3.5 h-3.5 flex-shrink-0"/>
                            <span className="truncate font-medium">{item.location}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <div className="font-bold text-primary-600">{item.price}</div>
                    <div className="flex items-center gap-2 ml-auto">
                        <span className="flex items-center gap-1 text-slate-600 font-medium">
                            <EyeIcon className="w-3.5 h-3.5 text-slate-400" />{item.views}
                        </span>
                        <span className="flex items-center gap-1 text-slate-600 font-medium">
                            <UsersIcon className="w-3.5 h-3.5 text-slate-400" />{item.inquiries}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <button 
                        onClick={onView}
                        className="flex-1 py-2 rounded-xl font-bold text-xs bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                        <EyeIcon className="w-4 h-4"/>
                        Details
                    </button>
                    <button 
                        onClick={onDelete}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200 hover:border-red-200" 
                        title="Löschen"
                    >
                        <TrashIcon className="w-4 h-4"/>
                    </button>
                </div>
            </div>
        </article>
    );
};

const PartnerMarketplacePage: React.FC = () => {
    const [listings, setListings] = useState<MarketplaceListing[]>(mockListings);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [typeFilter, setTypeFilter] = useState('Alle');
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
            (typeFilter === 'Alle' || item.type === typeFilter) &&
            (statusFilter === 'Alle' || item.status === statusFilter) &&
            (item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        ),
        [listings, searchTerm, statusFilter, typeFilter]
    );

    const stats = useMemo(() => ({
        total: listings.length,
        active: listings.filter(l => l.status === 'Aktiv').length,
        views: listings.reduce((sum, l) => sum + l.views, 0),
        inquiries: listings.reduce((sum, l) => sum + l.inquiries, 0),
    }), [listings]);

    const handleDelete = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Möchten Sie dieses Inserat wirklich löschen?")) {
            setListings(prev => prev.filter(item => item.id !== id));
            setShowSuccess("Inserat erfolgreich gelöscht!");
        }
    };
    
    const handleCreateSuccess = (posted: boolean) => {
        if (posted) {
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
            <div className="animate-fade-in max-w-4xl mx-auto">
                 <button 
                    onClick={() => setIsCreatingListing(false)} 
                    className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors group"
                >
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Zurück zur Übersicht
                </button>
                <MarketplaceListingForm onSuccess={handleCreateSuccess} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {viewingItem && <ListingDetailModal item={viewingItem} onClose={() => setViewingItem(null)} />}
            
            {showSuccess && (
                <div className="mb-6 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl flex items-center gap-3 animate-fade-in shadow-lg" role="alert">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="font-bold">{showSuccess}</p>
                </div>
            )}

            {/* Modern Filter Section */}
            <div className="mb-8 space-y-4">
                {/* Main Search Bar */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
                    </div>
                    <input 
                        type="search" 
                        placeholder="Inserate durchsuchen..."
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                        className="w-full h-12 pl-12 pr-4 rounded-full border border-slate-200 bg-white font-medium text-slate-700 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all shadow-sm"
                    />
                </div>

                {/* Filter Pills Row */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Type Filter */}
                    <div className="relative">
                        <TagIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select 
                            value={typeFilter} 
                            onChange={e => setTypeFilter(e.target.value)} 
                            className="h-10 pl-9 pr-8 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium text-slate-700 outline-none appearance-none cursor-pointer transition-all shadow-sm"
                        >
                            <option value="Alle">Alle Typen</option>
                            <option value="Miet-Inserat">Miet-Inserate</option>
                            <option value="Verkaufs-Inserat">Verkaufs-Inserate</option>
                        </select>
                        <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    
                    {/* Status Filter */}
                    <div className="relative">
                        <select 
                            value={statusFilter} 
                            onChange={e => setStatusFilter(e.target.value)} 
                            className="h-10 pl-4 pr-8 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium text-slate-700 outline-none appearance-none cursor-pointer transition-all shadow-sm"
                        >
                            <option value="Alle">Alle Status</option>
                            {Object.entries(statusConfig).map(([key, {title}]) => <option key={key} value={key}>{title}</option>)}
                        </select>
                        <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Create Button */}
                    <button 
                        onClick={() => setIsCreatingListing(true)} 
                        className="ml-auto h-10 px-5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all shadow-sm flex items-center gap-2"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Neues Inserat
                    </button>
                </div>
            </div>

            {/* Results Header */}
            <div className="mb-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Left: Count & Info */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/30">
                                <span className="text-2xl font-black text-white">{filteredListings.length}</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    {filteredListings.length === 1 ? 'Inserat gefunden' : 'Inserate gefunden'}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Ihre aktiven Angebote
                                </p>
                            </div>
                        </div>

                        {/* Right: Stats Pills */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span className="text-sm font-semibold text-green-700">{stats.active} Aktiv</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-sm font-semibold text-blue-700">{stats.views.toLocaleString()} Aufrufe</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                <span className="text-sm font-semibold text-orange-700">{stats.inquiries} Anfragen</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredListings.map(item => (
                        <ListingCard 
                            key={item.id}
                            item={item}
                            onView={() => setViewingItem(item)}
                            onDelete={(e) => handleDelete(item.id, e)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-300">
                    <MagnifyingGlassIcon className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                    <h3 className="text-xl font-black text-slate-700 mb-2">Keine Inserate gefunden</h3>
                    <p className="text-sm text-slate-500 font-semibold mb-6">Passen Sie Ihre Filter an oder erstellen Sie ein neues Inserat.</p>
                    <div className="flex justify-center gap-3">
                        <button 
                            onClick={() => {setSearchTerm(''); setStatusFilter('Alle'); setTypeFilter('Alle');}} 
                            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors border-2 border-slate-200"
                        >
                            Filter zurücksetzen
                        </button>
                        <button 
                            onClick={() => setIsCreatingListing(true)}
                            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-colors shadow-lg"
                        >
                            Neues Inserat
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerMarketplacePage;
