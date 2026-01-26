import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';
import { useAppContext, Request } from './AppContext';
import { LeadQuickViewModal } from '../components/LeadQuickViewModal';
import {
    MagnifyingGlassIcon, MapPinIcon, CalendarDaysIcon, BanknotesIcon,
    ArrowRightIcon, SpinnerIcon, UsersIcon, CheckCircleIcon, BriefcaseIcon, ChevronUpDownIcon,
    BellIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, TestsiegerIcon, XCircleIcon,
    AdjustmentsHorizontalIcon, XMarkIcon, Squares2X2Icon, ListBulletIcon, StarIcon,
    EyeIcon, PhoneIcon, MailIcon, UserIcon
} from '../components/icons';

const ITEMS_PER_PAGE = 12;

const parseGermanDate = (dateString: string) => {
    const months: { [key: string]: number } = {
        'Januar': 0, 'Februar': 1, 'März': 2, 'April': 3, 'Mai': 4, 'Juni': 5,
        'Juli': 6, 'August': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Dezember': 11
    };
    const parts = dateString.replace('.', '').split(' ');
    if (parts.length < 3) return new Date(0);
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]];
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
};

const statuses: Request['status'][] = ['Neu', 'Kontaktiert', 'Angebot gesendet', 'In Verhandlung', 'Gewonnen', 'Verloren / Abgelehnt'];

const statusConfig: { [key in Request['status']]: { icon: React.ReactNode; color: string; bgColor: string; title: string; dotColor: string } } = {
    'Neu': { icon: <BellIcon className="w-4 h-4" />, color: 'text-blue-800', bgColor: 'bg-blue-100', title: 'Neu', dotColor: 'bg-blue-500' },
    'Kontaktiert': { icon: <ChatBubbleLeftRightIcon className="w-4 h-4" />, color: 'text-cyan-800', bgColor: 'bg-cyan-100', title: 'Kontaktiert', dotColor: 'bg-cyan-500' },
    'Angebot gesendet': { icon: <PaperAirplaneIcon className="w-4 h-4" />, color: 'text-purple-800', bgColor: 'bg-purple-100', title: 'Angebot gesendet', dotColor: 'bg-purple-500' },
    'In Verhandlung': { icon: <BanknotesIcon className="w-4 h-4" />, color: 'text-orange-800', bgColor: 'bg-orange-100', title: 'Verhandlung', dotColor: 'bg-orange-500' },
    'Gewonnen': { icon: <TestsiegerIcon className="w-4 h-4" />, color: 'text-green-800', bgColor: 'bg-green-100', title: 'Gewonnen', dotColor: 'bg-green-500' },
    'Verloren / Abgelehnt': { icon: <XCircleIcon className="w-4 h-4" />, color: 'text-red-800', bgColor: 'bg-red-100', title: 'Verloren', dotColor: 'bg-red-500' },
};

const StatusDropdown: React.FC<{ lead: Request, onStatusChange: (id: number, status: Request['status']) => void }> = ({ lead, onStatusChange }) => {
    const currentConfig = statusConfig[lead.status];
    
    return (
        <div className="relative group min-w-[160px]">
            <select
                value={lead.status}
                onChange={e => onStatusChange(lead.id, e.target.value as Request['status'])}
                className={`w-full appearance-none cursor-pointer rounded-lg border border-transparent px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${currentConfig.bgColor} ${currentConfig.color}`}
            >
                {statuses.map(s => <option key={s} value={s}>{statusConfig[s].title}</option>)}
            </select>
            <ChevronUpDownIcon className={`w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${currentConfig.color} opacity-70`} />
        </div>
    );
};

const LeadCard: React.FC<{ lead: Request, onViewDetails: (id: number) => void }> = ({ lead, onViewDetails }) => {
    const { leadPurchaseCounts } = useAppContext();
    const purchaseCount = leadPurchaseCounts[lead.id] || 0;
    const isSoldOut = purchaseCount >= 5;
    const availableCount = 5 - purchaseCount;

    const leadDate = parseGermanDate(lead.date);
    const today = new Date();
    today.setHours(0,0,0,0);
    leadDate.setHours(0,0,0,0);
    const isNew = leadDate.getTime() >= today.getTime();

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isSoldOut) {
            onViewDetails(lead.id);
        }
    };

    return (
        <article className={`group relative bg-white rounded-2xl border ${isSoldOut ? 'border-slate-200 opacity-60' : 'border-slate-200 hover:border-primary-400'} shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden`}>
            <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-primary-700 text-xs font-bold px-2 py-1 rounded-md bg-primary-50 truncate">
                        <BriefcaseIcon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{lead.service}</span>
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        {isNew && (
                            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                                <StarIcon className="w-3 h-3" />
                                NEU
                            </span>
                        )}
                        {isSoldOut && (
                            <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full">
                                AUSVERKAUFT
                            </span>
                        )}
                    </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors leading-snug">
                    {lead.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                        <MapPinIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium">{lead.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium">{lead.date}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Preis</div>
                            <div className={`text-base font-black ${isSoldOut ? 'text-slate-400' : 'text-primary-600'}`}>
                                {isSoldOut ? '—' : `CHF ${lead.price.toFixed(0)}`}
                            </div>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Verfügbar</div>
                            <div className={`text-base font-black ${isSoldOut ? 'text-red-400' : availableCount >= 3 ? 'text-green-600' : 'text-orange-500'}`}>
                                {availableCount}<span className="text-xs text-slate-400 font-normal">/5</span>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        disabled={isSoldOut}
                        className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                            isSoldOut
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md'
                        }`}
                    >
                        <span>Details</span>
                        {!isSoldOut && <ArrowRightIcon className="w-3.5 h-3.5" />}
                    </button>
                </div>
            </div>
        </article>
    );
};

const PurchasedLeadCard: React.FC<{ 
    lead: Request, 
    onStatusChange: (id: number, status: Request['status']) => void 
}> = ({ lead, onStatusChange }) => {
    const config = statusConfig[lead.status];
    
    return (
        <article className={`group relative bg-white rounded-2xl border ${config.bgColor.includes('green') ? 'border-green-200' : config.bgColor.includes('blue') ? 'border-blue-200' : config.bgColor.includes('red') ? 'border-red-200' : 'border-slate-200'} shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden`}>
            <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold ${config.bgColor} ${config.color}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></div>
                        {config.title}
                    </span>
                    <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-slate-100 text-slate-500">
                        #{lead.id}
                    </span>
                </div>

                <div className="mb-2">
                    <p className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">{lead.service}</p>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">
                        {lead.title}
                    </h3>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                        <MapPinIcon className="w-3.5 h-3.5 text-slate-400"/>
                        <span className="font-medium">{lead.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="w-3.5 h-3.5 text-slate-400"/>
                        <span className="font-medium">{lead.date}</span>
                    </div>
                </div>

                {lead.customer && (
                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2.5 py-1.5 mb-3 border border-slate-100">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <UserIcon className="w-3 h-3 text-primary-600"/>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-700 truncate">{lead.customer}</p>
                            {lead.customerEmail && (
                                <p className="text-[10px] text-slate-500 truncate">{lead.customerEmail}</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="mb-3">
                    <StatusDropdown lead={lead} onStatusChange={onStatusChange} />
                </div>

                <Link 
                    to={`/partner/requests/${lead.id}`}
                    className="w-full py-2 rounded-xl font-bold text-xs bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                    <EyeIcon className="w-4 h-4"/>
                    Details
                </Link>
            </div>
        </article>
    );
};

const PurchasedLeadsTable: React.FC<{ 
    leads: Request[],
    onStatusChange: (id: number, status: Request['status']) => void 
}> = ({ leads, onStatusChange }) => {
    return (
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left font-black text-slate-700 uppercase text-xs tracking-wider">Auftrag</th>
                            <th scope="col" className="px-6 py-4 text-left font-black text-slate-700 uppercase text-xs tracking-wider">Kunde</th>
                            <th scope="col" className="px-6 py-4 text-left font-black text-slate-700 uppercase text-xs tracking-wider">Datum</th>
                            <th scope="col" className="px-6 py-4 text-left font-black text-slate-700 uppercase text-xs tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-4 text-right font-black text-slate-700 uppercase text-xs tracking-wider">Aktion</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {leads.map(lead => {
                            const config = statusConfig[lead.status];
                            return (
                                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-black text-slate-900 text-base">{lead.title}</div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                            <span className="font-semibold">#{lead.id}</span>
                                            <span>•</span>
                                            <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded font-semibold">
                                                <BriefcaseIcon className="w-3 h-3" />
                                                {lead.service}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                                            <MapPinIcon className="w-3 h-3" /> {lead.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {lead.customer ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <UserIcon className="w-4 h-4 text-primary-600"/>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-slate-700 truncate">{lead.customer}</p>
                                                    {lead.customerEmail && (
                                                        <p className="text-xs text-slate-500 truncate">{lead.customerEmail}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-semibold">{lead.date}</td>
                                    <td className="px-6 py-4">
                                        <StatusDropdown lead={lead} onStatusChange={onStatusChange} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            to={`/partner/requests/${lead.id}`}
                                            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-black text-sm hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg transition-all"
                                        >
                                            <EyeIcon className="w-4 h-4" />
                                            Öffnen
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PartnerRequestsPage: React.FC = () => {
    const context = useAppContext();
    const { 
        requests = [], 
        purchasedLeadIds = [], 
        openQuickView, 
        updateRequestStatus, 
        leadPurchaseCounts = {}, 
        isQuickViewOpen = false, 
        closeQuickView, 
        quickViewLeadId = null 
    } = context || {};

    const location = useLocation();
    const [localSelectedLeadId, setLocalSelectedLeadId] = useState<number | null>(null);

    const isPurchasedView = useMemo(() => new URLSearchParams(location.search).get('view') === 'purchased', [location.search]);

    const [purchasedViewMode, setPurchasedViewMode] = useState<'cards' | 'table' | 'board'>('cards');
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [serviceFilter, setServiceFilter] = useState('Alle');
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [priceFilter, setPriceFilter] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const availableServices = useMemo(() => {
        const services = new Set(requests.map(r => r.service));
        return ['Alle', ...Array.from(services).sort()];
    }, [requests]);

    const swissCantons = [
        'Alle Kantone',
        'Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft', 
        'Basel-Stadt', 'Bern', 'Freiburg', 'Genf', 'Glarus', 'Graubünden', 
        'Jura', 'Luzern', 'Neuenburg', 'Nidwalden', 'Obwalden', 'Schaffhausen', 
        'Schwyz', 'Solothurn', 'St. Gallen', 'Tessin', 'Thurgau', 'Uri', 
        'Waadt', 'Wallis', 'Zug', 'Zürich'
    ];

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (isPurchasedView) {
            setPurchasedViewMode('cards');
        }
    }, [isPurchasedView]);

    const filteredRequests = useMemo(() => {
        let leads: Request[];
        if (isPurchasedView) {
            leads = requests.filter(req => purchasedLeadIds.includes(req.id));
        } else {
            leads = requests.filter(req => !purchasedLeadIds.includes(req.id));
        }

        const filtered = leads
            .filter(req => 
                (req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (isPurchasedView && req.customer.toLowerCase().includes(searchTerm.toLowerCase())))
            )
            .filter(req => 
                req.location.toLowerCase().includes(locationFilter.toLowerCase())
            )
            .filter(req => 
                serviceFilter === 'Alle' || req.service === serviceFilter
            )
            .filter(req => {
                if (!isPurchasedView || statusFilter === 'Alle') return true;
                return req.status === statusFilter;
            })
            .filter(req => {
                if (!priceFilter) return true;
                const maxPrice = parseFloat(priceFilter);
                return !isNaN(maxPrice) && req.price <= maxPrice;
            });

        if (!isPurchasedView) {
             filtered.sort((a, b) => {
                switch (sortOption) {
                    case 'price_asc': return a.price - b.price;
                    case 'price_desc': return b.price - a.price;
                    case 'availability': return (leadPurchaseCounts[b.id] || 0) - (leadPurchaseCounts[a.id] || 0);
                    case 'newest': default: return parseGermanDate(b.date).getTime() - parseGermanDate(a.date).getTime();
                }
            });
        } else {
            filtered.sort((a,b) => parseGermanDate(b.date).getTime() - parseGermanDate(a.date).getTime());
        }

        return filtered;
    }, [searchTerm, locationFilter, serviceFilter, statusFilter, priceFilter, sortOption, isPurchasedView, purchasedLeadIds, requests, leadPurchaseCounts]);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, locationFilter, serviceFilter, statusFilter, priceFilter, sortOption, isPurchasedView]);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, [isPurchasedView, searchTerm, locationFilter, serviceFilter, statusFilter, priceFilter, sortOption, currentPage]);

    const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
    const paginatedRequests = filteredRequests.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const stats = useMemo(() => {
        const purchasedLeads = requests.filter(req => purchasedLeadIds.includes(req.id));
        return {
            total: purchasedLeads.length,
            won: purchasedLeads.filter(l => l.status === 'Gewonnen').length,
            inProgress: purchasedLeads.filter(l => ['Kontaktiert', 'Angebot gesendet', 'In Verhandlung'].includes(l.status)).length,
            new: purchasedLeads.filter(l => l.status === 'Neu').length,
        };
    }, [requests, purchasedLeadIds]);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Modern Filter Section */}
            <div className="mb-8 space-y-4">
                {/* Main Search Bar */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
                    </div>
                    <input 
                        type="search" 
                        placeholder={isPurchasedView ? "Auftrag oder Kunde suchen..." : "Nach Aufträgen suchen..."}
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                        className="w-full h-12 pl-12 pr-4 rounded-full border border-slate-200 bg-white font-medium text-slate-700 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all shadow-sm"
                    />
                </div>

                {/* Filter Pills Row */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Kanton Filter */}
                    <div className="relative">
                        <MapPinIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select 
                            value={locationFilter || 'Alle Kantone'} 
                            onChange={e => setLocationFilter(e.target.value === 'Alle Kantone' ? '' : e.target.value)} 
                            className="h-10 pl-9 pr-8 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium text-slate-700 outline-none appearance-none cursor-pointer transition-all shadow-sm"
                        >
                            {swissCantons.map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                        <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {!isPurchasedView ? (
                        <>
                            {/* Service Filter */}
                            <div className="relative">
                                <select 
                                    value={serviceFilter} 
                                    onChange={e => setServiceFilter(e.target.value)} 
                                    className="h-10 pl-4 pr-8 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium text-slate-700 outline-none appearance-none cursor-pointer transition-all shadow-sm"
                                >
                                    {availableServices.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Price Filter */}
                            <div className="relative">
                                <button 
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 h-10 px-4 rounded-full border text-sm font-medium transition-all shadow-sm ${
                                        priceFilter 
                                            ? 'bg-primary-50 border-primary-200 text-primary-700' 
                                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                                    }`}
                                >
                                    <BanknotesIcon className="w-4 h-4" />
                                    {priceFilter ? `Max. CHF ${priceFilter}` : 'Preis'}
                                </button>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative ml-auto">
                                <select 
                                    value={sortOption} 
                                    onChange={e => setSortOption(e.target.value)} 
                                    className="h-10 pl-4 pr-8 rounded-full bg-slate-100 border-0 text-sm font-medium text-slate-600 outline-none appearance-none cursor-pointer transition-all"
                                >
                                    <option value="newest">Neueste</option>
                                    <option value="price_asc">Preis ↑</option>
                                    <option value="price_desc">Preis ↓</option>
                                    <option value="availability">Verfügbarkeit</option>
                                </select>
                                <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Status Filter */}
                            <div className="relative">
                                <select 
                                    value={statusFilter} 
                                    onChange={e => setStatusFilter(e.target.value)} 
                                    className="h-10 pl-4 pr-8 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium text-slate-700 outline-none appearance-none cursor-pointer transition-all shadow-sm"
                                >
                                    <option value="Alle">Alle Status</option>
                                    {statuses.map(s => <option key={s} value={s}>{statusConfig[s].title}</option>)}
                                </select>
                                <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            
                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1 ml-auto">
                                <button 
                                    onClick={() => setPurchasedViewMode('cards')} 
                                    className={`p-2 rounded-full transition-all ${
                                        purchasedViewMode === 'cards' 
                                            ? 'bg-white text-primary-600 shadow-sm' 
                                            : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                    title="Karten"
                                >
                                    <Squares2X2Icon className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => setPurchasedViewMode('table')} 
                                    className={`p-2 rounded-full transition-all ${
                                        purchasedViewMode === 'table' 
                                            ? 'bg-white text-primary-600 shadow-sm' 
                                            : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                    title="Liste"
                                >
                                    <ListBulletIcon className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => setPurchasedViewMode('board')} 
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                        purchasedViewMode === 'board' 
                                            ? 'bg-white text-primary-600 shadow-sm' 
                                            : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                >
                                    Board
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Expanded Price Filter */}
                {!isPurchasedView && showFilters && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-semibold text-slate-600">Max. Lead-Preis:</label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500">CHF</span>
                                <input 
                                    type="number" 
                                    placeholder="0" 
                                    value={priceFilter} 
                                    onChange={e => setPriceFilter(e.target.value)} 
                                    className="w-24 h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
                                />
                            </div>
                            <button 
                                onClick={() => { setPriceFilter(''); setShowFilters(false); }}
                                className="ml-auto text-sm font-medium text-slate-500 hover:text-slate-700"
                            >
                                Zurücksetzen
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Header */}
            <div className="mb-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Left: Count & Info */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/30">
                                <span className="text-2xl font-black text-white">{filteredRequests.length}</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    {filteredRequests.length === 1 ? 'Lead gefunden' : 'Leads gefunden'}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    {isPurchasedView ? 'In Ihrem Portfolio' : 'Verfügbar zum Kaufen'}
                                </p>
                            </div>
                        </div>

                        {/* Right: Stats Pills */}
                        {isPurchasedView ? (
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span className="text-sm font-semibold text-blue-700">{stats.new} Neu</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    <span className="text-sm font-semibold text-orange-700">{stats.inProgress} In Bearbeitung</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-sm font-semibold text-green-700">{stats.won} Gewonnen</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Live aktualisiert
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center p-20">
                    <SpinnerIcon className="w-12 h-12 text-primary-600 animate-spin" />
                </div>
            ) : (
                <>
                    {isPurchasedView && purchasedViewMode === 'board' ? (
                        <KanbanBoard leads={filteredRequests} />
                    ) : isPurchasedView && purchasedViewMode === 'table' ? (
                        <PurchasedLeadsTable leads={filteredRequests} onStatusChange={updateRequestStatus} />
                    ) : isPurchasedView && purchasedViewMode === 'cards' ? (
                        paginatedRequests.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                    {paginatedRequests.map(lead => (
                                        <PurchasedLeadCard 
                                            key={lead.id} 
                                            lead={lead} 
                                            onStatusChange={updateRequestStatus}
                                        />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button 
                                                key={page} 
                                                onClick={() => setCurrentPage(page)} 
                                                className={`w-12 h-12 rounded-xl font-black text-sm transition-all ${
                                                    currentPage === page 
                                                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg scale-110' 
                                                        : 'bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 hover:border-primary-300'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-300">
                                <UsersIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                                <h3 className="text-xl font-black text-slate-700 mb-2">Keine gekauften Leads</h3>
                                <p className="text-sm text-slate-500 font-semibold mb-6">Kaufen Sie Leads, um hier Ihre Aufträge zu verwalten.</p>
                                <Link 
                                    to="/partner/requests"
                                    className="inline-flex px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-colors shadow-lg"
                                >
                                    Verfügbare Leads ansehen
                                </Link>
                            </div>
                        )
                    ) : paginatedRequests.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                {paginatedRequests.map(lead => (
                                    <LeadCard 
                                        key={lead.id} 
                                        lead={lead} 
                                        onViewDetails={(id) => {
                                            setLocalSelectedLeadId(id);
                                            openQuickView(id);
                                        }}
                                    />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button 
                                            key={page} 
                                            onClick={() => setCurrentPage(page)} 
                                            className={`w-12 h-12 rounded-xl font-black text-sm transition-all ${
                                                currentPage === page 
                                                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg scale-110' 
                                                    : 'bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 hover:border-primary-300'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-300">
                            <MagnifyingGlassIcon className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                            <h3 className="text-xl font-black text-slate-700 mb-2">Keine Leads gefunden</h3>
                            <p className="text-sm text-slate-500 font-semibold">Passen Sie Ihre Filter an oder schauen Sie später wieder vorbei.</p>
                        </div>
                    )}
                </>
            )}
            
            <LeadQuickViewModal 
                leadId={localSelectedLeadId || quickViewLeadId || 0}
                isOpen={(isQuickViewOpen && !!quickViewLeadId) || !!localSelectedLeadId}
                onClose={() => {
                    setLocalSelectedLeadId(null);
                    closeQuickView();
                }}
            />
        </div>
    );
};

export default PartnerRequestsPage;
