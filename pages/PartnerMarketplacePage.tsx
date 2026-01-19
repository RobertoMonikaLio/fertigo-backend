import React, { useState, useMemo, useEffect } from 'react';
import { 
    TagIcon, PlusIcon, PencilIcon, TrashIcon,
    CheckCircleIcon, PhotoIcon, MapPinIcon, MagnifyingGlassIcon, ChevronDownIcon,
    UsersIcon, EyeIcon, ArrowLeftIcon, CalendarDaysIcon,
    UserIcon, MailIcon, PhoneIcon, XMarkIcon
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

const statusConfig: { [key in ListingStatus]: { color: string, title: string, dotColor: string, bgGradient: string, iconBg: string } } = {
    'Entwurf': { color: 'text-amber-700', title: 'Entwurf', dotColor: 'bg-amber-400', bgGradient: 'from-amber-500 to-orange-500', iconBg: 'bg-amber-100' },
    'Aktiv': { color: 'text-emerald-700', title: 'Aktiv', dotColor: 'bg-emerald-500', bgGradient: 'from-emerald-500 to-teal-500', iconBg: 'bg-emerald-100' },
    'In Verhandlung': { color: 'text-blue-700', title: 'In Verhandlung', dotColor: 'bg-blue-500', bgGradient: 'from-blue-500 to-indigo-500', iconBg: 'bg-blue-100' },
    'Verkauft/Vermietet': { color: 'text-slate-600', title: 'Archiviert', dotColor: 'bg-slate-400', bgGradient: 'from-slate-400 to-slate-500', iconBg: 'bg-slate-100' },
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
                <div className="relative">
                    <div className={`h-32 bg-gradient-to-r ${statusConfig[item.status].bgGradient}`}></div>
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-2 rounded-xl transition-all" aria-label="Schliessen">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                    <div className="absolute -bottom-16 left-8">
                        <div className="w-32 h-32 rounded-2xl bg-white shadow-xl border-4 border-white overflow-hidden">
                            {item.images[0] ? (
                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                    <PhotoIcon className="w-12 h-12" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="pt-20 px-8 pb-8 overflow-y-auto">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
                        <div>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 ${statusConfig[item.status].iconBg} ${statusConfig[item.status].color}`}>
                                <div className={`w-2 h-2 rounded-full ${statusConfig[item.status].dotColor}`}></div>
                                {statusConfig[item.status].title}
                            </span>
                            <h2 className="text-2xl font-bold text-slate-900">{item.name}</h2>
                            <p className="text-slate-500 mt-1 flex items-center gap-2">
                                <MapPinIcon className="w-4 h-4" />
                                {item.location}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-5 text-center min-w-[180px]">
                            <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Preis</p>
                            <p className="text-2xl font-black text-primary-700">{item.price}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-slate-50 rounded-xl p-4 text-center">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                <EyeIcon className="w-5 h-5 text-slate-600" />
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{item.views}</p>
                            <p className="text-xs text-slate-500 font-medium">Aufrufe</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 text-center">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                <UsersIcon className="w-5 h-5 text-slate-600" />
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{item.inquiries}</p>
                            <p className="text-xs text-slate-500 font-medium">Anfragen</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 text-center">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                <CalendarDaysIcon className="w-5 h-5 text-slate-600" />
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{item.createdAt.split('.')[0]}</p>
                            <p className="text-xs text-slate-500 font-medium">Erstellt am</p>
                        </div>
                    </div>

                    {item.description && (
                        <div className="mb-8">
                            <h3 className="font-bold text-slate-800 mb-3 text-lg">Beschreibung</h3>
                            <p className="text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                    )}
                    
                    {item.contact && (
                        <div className="bg-slate-50 rounded-2xl p-6">
                            <h3 className="font-bold text-slate-800 mb-4 text-lg">Kontaktinformationen</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <UserIcon className="w-5 h-5 text-primary-600"/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 font-medium">Name</p>
                                        <p className="font-semibold text-slate-700 truncate">{item.contact.person}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MailIcon className="w-5 h-5 text-primary-600"/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 font-medium">E-Mail</p>
                                        <a href={`mailto:${item.contact.email}`} className="font-semibold text-primary-600 hover:underline truncate block">{item.contact.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <PhoneIcon className="w-5 h-5 text-primary-600"/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 font-medium">Telefon</p>
                                        <a href={`tel:${item.contact.phone}`} className="font-semibold text-primary-600 hover:underline">{item.contact.phone}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                    <button className="flex items-center gap-2 px-5 py-2.5 text-slate-600 hover:text-slate-800 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                        <PencilIcon className="w-5 h-5" />
                        Bearbeiten
                    </button>
                    <button onClick={onClose} className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
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
    return (
        <div 
            onClick={onView}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300 cursor-pointer flex flex-col"
        >
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                {item.images[0] ? (
                    <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 bg-gradient-to-br from-slate-50 to-slate-100">
                        <PhotoIcon className="w-16 h-16"/>
                    </div>
                )}
                
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-3 py-1.5 text-xs uppercase font-bold tracking-wider rounded-lg shadow-lg backdrop-blur-sm border border-white/20 ${item.type === 'Miet-Inserat' ? 'bg-blue-600/90 text-white' : 'bg-emerald-600/90 text-white'}`}>
                        {item.type === 'Miet-Inserat' ? 'Mieten' : 'Kaufen'}
                    </span>
                </div>

                <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 backdrop-blur-sm shadow-lg ${statusConfig[item.status].color}`}>
                        <div className={`w-2 h-2 rounded-full ${statusConfig[item.status].dotColor} animate-pulse`}></div>
                        {statusConfig[item.status].title}
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center gap-4 text-white/90">
                        <div className="flex items-center gap-1.5">
                            <EyeIcon className="w-4 h-4" />
                            <span className="text-sm font-semibold">{item.views}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <UsersIcon className="w-4 h-4" />
                            <span className="text-sm font-semibold">{item.inquiries}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                </div>
                
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {item.name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0"/>
                    <span className="truncate">{item.location}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Preis</p>
                        <p className="text-xl font-black text-slate-900">{item.price}</p>
                    </div>
                    <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                        <button 
                            onClick={onView}
                            className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors" 
                            title="Ansehen"
                        >
                            <EyeIcon className="w-5 h-5"/>
                        </button>
                        <button 
                            onClick={onDelete}
                            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" 
                            title="Löschen"
                        >
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
                    className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold transition-colors group"
                >
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Zurück zur Übersicht
                </button>
                <MarketplaceListingForm onSuccess={handleCreateSuccess} />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {viewingItem && <ListingDetailModal item={viewingItem} onClose={() => setViewingItem(null)} />}
            
            {showSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl flex items-center gap-3 animate-fade-in shadow-lg" role="alert">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="font-bold">{showSuccess}</p>
                </div>
            )}
            
            <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-500 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid-marketplace" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid-marketplace)" />
                    </svg>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-6">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black mb-2">Meine Inserate</h1>
                        <p className="text-white/80 text-lg">Verwalten Sie Ihre Miet- und Verkaufsangebote.</p>
                    </div>
                    <button 
                        onClick={() => setIsCreatingListing(true)} 
                        className="flex items-center justify-center gap-3 bg-white text-primary-700 font-bold px-6 py-4 rounded-2xl hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 self-start"
                    >
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                            <PlusIcon className="w-5 h-5" />
                        </div>
                        <span>Neues Inserat erstellen</span>
                    </button>
                </div>

                <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <p className="text-white/70 text-sm font-medium">Gesamt</p>
                        <p className="text-3xl font-black">{stats.total}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <p className="text-white/70 text-sm font-medium">Aktiv</p>
                        <p className="text-3xl font-black">{stats.active}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <p className="text-white/70 text-sm font-medium">Aufrufe</p>
                        <p className="text-3xl font-black">{stats.views.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <p className="text-white/70 text-sm font-medium">Anfragen</p>
                        <p className="text-3xl font-black">{stats.inquiries}</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full lg:w-auto">
                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                        type="search" 
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                        placeholder="Inserate durchsuchen..." 
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                    />
                </div>
                <div className="flex gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-44">
                        <select 
                            value={typeFilter} 
                            onChange={e => setTypeFilter(e.target.value)} 
                            className="w-full appearance-none pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 cursor-pointer font-medium text-slate-600"
                        >
                            <option value="Alle">Alle Typen</option>
                            <option value="Miet-Inserat">Miet-Inserate</option>
                            <option value="Verkaufs-Inserat">Verkaufs-Inserate</option>
                        </select>
                        <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="relative flex-1 lg:w-44">
                        <select 
                            value={statusFilter} 
                            onChange={e => setStatusFilter(e.target.value)} 
                            className="w-full appearance-none pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 cursor-pointer font-medium text-slate-600"
                        >
                            <option value="Alle">Alle Status</option>
                            {Object.entries(statusConfig).map(([key, {title}]) => <option key={key} value={key}>{title}</option>)}
                        </select>
                        <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <TagIcon className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Keine Inserate gefunden</h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-6">
                        Ihre Suche oder Filter ergaben keine Treffer. Versuchen Sie, die Filter anzupassen oder erstellen Sie ein neues Inserat.
                    </p>
                    <div className="flex justify-center gap-3">
                        <button 
                            onClick={() => {setSearchTerm(''); setStatusFilter('Alle'); setTypeFilter('Alle');}} 
                            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            Filter zurücksetzen
                        </button>
                        <button 
                            onClick={() => setIsCreatingListing(true)}
                            className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
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
