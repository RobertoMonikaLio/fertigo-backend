import React, { useState, useMemo, useEffect } from 'react';
import { 
    TagIcon, PlusIcon, PencilIcon, TrashIcon,
    CheckCircleIcon, PhotoIcon, MapPinIcon, MagnifyingGlassIcon,
    UsersIcon, EyeIcon, ArrowLeftIcon,
    UserIcon, MailIcon, PhoneIcon, XMarkIcon, BriefcaseIcon,
    SparklesIcon
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

const statusConfig: { [key in ListingStatus]: { color: string, title: string, dotColor: string, bgColor: string, borderColor: string } } = {
    'Entwurf': { color: 'text-amber-700', title: 'Entwurf', dotColor: 'bg-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    'Aktiv': { color: 'text-emerald-700', title: 'Aktiv', dotColor: 'bg-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    'In Verhandlung': { color: 'text-blue-700', title: 'In Verhandlung', dotColor: 'bg-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    'Verkauft/Vermietet': { color: 'text-slate-600', title: 'Archiviert', dotColor: 'bg-slate-400', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                {/* Header with Image */}
                <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200">
                    {item.images[0] ? (
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <PhotoIcon className="w-16 h-16 text-slate-300" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full transition-all shadow-lg" aria-label="Schliessen">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-5 right-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${item.type === 'Miet-Inserat' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'}`}>
                                {item.type === 'Miet-Inserat' ? 'Mieten' : 'Kaufen'}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statusConfig[item.status].bgColor} ${statusConfig[item.status].color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[item.status].dotColor}`}></span>
                                {statusConfig[item.status].title}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-white">{item.name}</h2>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-5 overflow-y-auto flex-1 space-y-5">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-3">
                        <div className="bg-primary-50 rounded-xl p-3 text-center">
                            <p className="text-xs font-semibold text-primary-600 mb-0.5">Preis</p>
                            <p className="text-sm font-bold text-primary-700">{item.price}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 text-center">
                            <p className="text-xs font-semibold text-slate-500 mb-0.5">Aufrufe</p>
                            <p className="text-sm font-bold text-slate-800">{item.views}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 text-center">
                            <p className="text-xs font-semibold text-slate-500 mb-0.5">Anfragen</p>
                            <p className="text-sm font-bold text-slate-800">{item.inquiries}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 text-center">
                            <p className="text-xs font-semibold text-slate-500 mb-0.5">Erstellt</p>
                            <p className="text-sm font-bold text-slate-800">{item.createdAt}</p>
                        </div>
                    </div>

                    {/* Location & Category */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                            <MapPinIcon className="w-4 h-4 text-slate-500" />
                            {item.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                            <BriefcaseIcon className="w-4 h-4 text-slate-500" />
                            {item.category}
                        </span>
                    </div>

                    {/* Description */}
                    {item.description && (
                        <div>
                            <h3 className="font-bold text-slate-800 mb-2">Beschreibung</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    )}
                    
                    {/* Contact */}
                    {item.contact && (
                        <div className="bg-slate-50 rounded-xl p-4">
                            <h3 className="font-bold text-slate-800 mb-3">Kontakt</h3>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg">
                                    <UserIcon className="w-4 h-4 text-primary-600"/>
                                    <span className="text-sm font-medium text-slate-700 truncate">{item.contact.person}</span>
                                </div>
                                <a href={`mailto:${item.contact.email}`} className="flex items-center gap-2 p-2.5 bg-white rounded-lg hover:bg-primary-50 transition-colors">
                                    <MailIcon className="w-4 h-4 text-primary-600"/>
                                    <span className="text-sm font-medium text-primary-600 truncate">{item.contact.email}</span>
                                </a>
                                <a href={`tel:${item.contact.phone}`} className="flex items-center gap-2 p-2.5 bg-white rounded-lg hover:bg-primary-50 transition-colors">
                                    <PhoneIcon className="w-4 h-4 text-primary-600"/>
                                    <span className="text-sm font-medium text-primary-600">{item.contact.phone}</span>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <button className="flex items-center gap-1.5 px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                        <PencilIcon className="w-4 h-4" />
                        Bearbeiten
                    </button>
                    <button onClick={onClose} className="bg-primary-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-primary-700 transition-colors">
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
            className="group relative bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200 hover:border-primary-200"
        >
            {/* Image Section */}
            <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                {item.images[0] ? (
                    <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <PhotoIcon className="w-12 h-12 text-slate-300"/>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full shadow-lg ${item.type === 'Miet-Inserat' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'}`}>
                        {item.type === 'Miet-Inserat' ? 'Mieten' : 'Kaufen'}
                    </span>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold shadow-lg ${config.bgColor} ${config.color} border ${config.borderColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} ${item.status === 'Aktiv' ? 'animate-pulse' : ''}`}></span>
                        {config.title}
                    </span>
                </div>
                
                {/* Price Tag */}
                <div className="absolute bottom-3 right-3">
                    <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold text-primary-700 shadow-lg">
                        {item.price}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Category */}
                <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-1">{item.category}</p>
                
                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-1 mb-2">
                    {item.name}
                </h3>
                
                {/* Location */}
                <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0"/>
                    <span className="truncate">{item.location}</span>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-slate-500">
                            <EyeIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.views}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                            <UsersIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.inquiries}</span>
                        </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                        <button 
                            onClick={onView}
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" 
                            title="Details"
                        >
                            <EyeIcon className="w-4 h-4"/>
                        </button>
                        <button 
                            onClick={onDelete}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Löschen"
                        >
                            <TrashIcon className="w-4 h-4"/>
                        </button>
                    </div>
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
                    className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold transition-colors group"
                >
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Zurück zur Übersicht
                </button>
                <MarketplaceListingForm onSuccess={handleCreateSuccess} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {viewingItem && <ListingDetailModal item={viewingItem} onClose={() => setViewingItem(null)} />}
            
            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-5 py-3 rounded-xl flex items-center gap-3 animate-fade-in shadow-xl z-50" role="alert">
                    <CheckCircleIcon className="w-5 h-5" />
                    <p className="font-semibold">{showSuccess}</p>
                </div>
            )}

            {/* Hero Stats Section */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Title & CTA */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <SparklesIcon className="w-5 h-5 text-primary-400" />
                            <span className="text-sm font-semibold text-primary-400 uppercase tracking-wide">Lead-Marktplatz</span>
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Ihre Inserate</h1>
                        <p className="text-slate-400 text-sm mb-4 max-w-md">
                            Verwalten Sie Ihre Miet- und Verkaufsinserate. Erreichen Sie tausende potenzielle Kunden.
                        </p>
                        <button 
                            onClick={() => setIsCreatingListing(true)} 
                            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-primary-500/30"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Neues Inserat erstellen
                        </button>
                    </div>
                    
                    {/* Right: Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                            <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <TagIcon className="w-5 h-5 text-primary-400" />
                            </div>
                            <p className="text-2xl font-bold">{stats.total}</p>
                            <p className="text-xs text-slate-400">Inserate</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                            </div>
                            <p className="text-2xl font-bold">{stats.active}</p>
                            <p className="text-xs text-slate-400">Aktiv</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <EyeIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <p className="text-2xl font-bold">{stats.views.toLocaleString()}</p>
                            <p className="text-xs text-slate-400">Aufrufe</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <UsersIcon className="w-5 h-5 text-orange-400" />
                            </div>
                            <p className="text-2xl font-bold">{stats.inquiries}</p>
                            <p className="text-xs text-slate-400">Anfragen</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="search" 
                            placeholder="Inserate suchen..."
                            value={searchTerm} 
                            onChange={e => setSearchTerm(e.target.value)} 
                            className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-700 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        />
                    </div>
                    
                    {/* Filters */}
                    <div className="flex items-center gap-2">
                        {/* Type Pills */}
                        <div className="flex items-center bg-slate-100 rounded-lg p-1">
                            {['Alle', 'Miet-Inserat', 'Verkaufs-Inserat'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setTypeFilter(type)}
                                    className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all ${
                                        typeFilter === type 
                                            ? 'bg-white text-slate-900 shadow-sm' 
                                            : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                >
                                    {type === 'Alle' ? 'Alle' : type === 'Miet-Inserat' ? 'Mieten' : 'Kaufen'}
                                </button>
                            ))}
                        </div>
                        
                        {/* Status Dropdown */}
                        <select 
                            value={statusFilter} 
                            onChange={e => setStatusFilter(e.target.value)} 
                            className="h-11 px-4 rounded-lg bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 outline-none cursor-pointer hover:border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                        >
                            <option value="Alle">Alle Status</option>
                            {Object.entries(statusConfig).map(([key, {title}]) => (
                                <option key={key} value={key}>{title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            {filteredListings.length > 0 ? (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            <span className="font-bold text-slate-700">{filteredListings.length}</span> {filteredListings.length === 1 ? 'Inserat' : 'Inserate'} gefunden
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filteredListings.map(item => (
                            <ListingCard 
                                key={item.id}
                                item={item}
                                onView={() => setViewingItem(item)}
                                onDelete={(e) => handleDelete(item.id, e)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MagnifyingGlassIcon className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-2">Keine Inserate gefunden</h3>
                    <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                        Passen Sie Ihre Filter an oder erstellen Sie Ihr erstes Inserat.
                    </p>
                    <div className="flex justify-center gap-3">
                        <button 
                            onClick={() => {setSearchTerm(''); setStatusFilter('Alle'); setTypeFilter('Alle');}} 
                            className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                        >
                            Filter zurücksetzen
                        </button>
                        <button 
                            onClick={() => setIsCreatingListing(true)}
                            className="px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
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
