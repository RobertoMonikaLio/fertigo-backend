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
        <article className={`group relative bg-gradient-to-br ${isSoldOut ? 'from-slate-50 to-slate-100' : isNew ? 'from-primary-50 via-white to-slate-50' : 'from-white to-slate-50'} rounded-3xl border-2 ${isSoldOut ? 'border-slate-200' : 'border-slate-200 group-hover:border-primary-400'} shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${isSoldOut ? 'opacity-50' : ''}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${isSoldOut ? 'bg-slate-200' : isNew ? 'bg-gradient-to-br from-yellow-200/30 to-orange-200/30' : 'bg-gradient-to-br from-primary-100/30 to-primary-200/30'} rounded-bl-full`}></div>
            
            <div className="relative p-6">
                <div className="flex items-start justify-between mb-5">
                    <div className="flex-1">
                        {isNew && (
                            <div className="inline-flex items-center gap-1.5 mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                                <StarIcon className="w-3.5 h-3.5 animate-pulse" />
                                NEUER LEAD
                            </div>
                        )}
                        <div className="mb-2">
                            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary-700 text-xs font-black px-3 py-1.5 rounded-lg border border-primary-200 shadow-sm">
                                <BriefcaseIcon className="w-4 h-4" />
                                {lead.service}
                            </span>
                        </div>
                    </div>
                    {isSoldOut && (
                        <div className="bg-red-100 text-red-700 text-xs font-black px-3 py-1.5 rounded-lg border border-red-200">
                            AUSVERKAUFT
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight pr-4 group-hover:text-primary-700 transition-colors">
                    {lead.title}
                </h3>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                            <MapPinIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Standort</div>
                            <div className="text-sm font-black text-slate-900">{lead.location}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-md">
                            <CalendarDaysIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Datum</div>
                            <div className="text-sm font-black text-slate-900">{lead.date}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className={`bg-white rounded-2xl p-4 border-2 ${isSoldOut ? 'border-slate-200' : 'border-primary-200'} shadow-sm`}>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Preis</div>
                        <div className={`text-2xl font-black ${isSoldOut ? 'text-slate-400' : 'text-primary-600'}`}>
                            {isSoldOut ? '—' : `CHF ${lead.price.toFixed(0)}`}
                        </div>
                    </div>
                    <div className={`bg-white rounded-2xl p-4 border-2 ${isSoldOut ? 'border-slate-200' : availableCount >= 3 ? 'border-green-200' : 'border-orange-200'} shadow-sm`}>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Verfügbar</div>
                        <div className={`text-2xl font-black ${isSoldOut ? 'text-red-400' : availableCount >= 3 ? 'text-green-600' : 'text-orange-500'}`}>
                            {isSoldOut ? '0' : availableCount}
                            <span className="text-sm text-slate-400 font-normal">/5</span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleButtonClick}
                    disabled={isSoldOut}
                    className={`w-full py-4 rounded-2xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSoldOut
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                >
                    {isSoldOut ? (
                        'Nicht verfügbar'
                    ) : (
                        <>
                            <span>Details ansehen</span>
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>

            {!isSoldOut && (
                <div className="absolute inset-0 rounded-3xl border-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            )}
        </article>
    );
};

const PurchasedLeadCard: React.FC<{ 
    lead: Request, 
    onStatusChange: (id: number, status: Request['status']) => void 
}> = ({ lead, onStatusChange }) => {
    const config = statusConfig[lead.status];
    
    return (
        <article className="group relative bg-gradient-to-br from-white to-slate-50 rounded-3xl border-2 border-slate-200 hover:border-primary-400 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/30 to-primary-200/30 rounded-bl-full"></div>
            
            <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${config.bgColor} ${config.color}`}>
                            <div className={`w-2 h-2 rounded-full ${config.dotColor}`}></div>
                            {config.title}
                        </span>
                        <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-600">
                            #{lead.id}
                        </span>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{lead.service}</p>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                        {lead.title}
                    </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <MapPinIcon className="w-4 h-4 text-slate-400"/>
                        <span className="font-semibold">{lead.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <CalendarDaysIcon className="w-4 h-4 text-slate-400"/>
                        <span className="font-semibold">{lead.date}</span>
                    </div>
                </div>

                {lead.customer && (
                    <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Kunde</div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <UserIcon className="w-5 h-5 text-primary-600"/>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-bold text-slate-700 truncate">{lead.customer}</p>
                                {lead.customerEmail && (
                                    <p className="text-xs text-slate-500 truncate">{lead.customerEmail}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Status ändern</div>
                    <StatusDropdown lead={lead} onStatusChange={onStatusChange} />
                </div>

                <Link 
                    to={`/partner/requests/${lead.id}`}
                    className="w-full py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                    <EyeIcon className="w-5 h-5"/>
                    Details öffnen
                </Link>
            </div>

            <div className="absolute inset-0 rounded-3xl border-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
            <div className="mb-8">
                <div className="flex gap-2 bg-white rounded-2xl p-1.5 border-2 border-slate-200 shadow-sm inline-flex">
                    <Link
                        to="/partner/requests"
                        className={`px-6 py-3 rounded-xl font-black text-sm transition-all ${
                            !isPurchasedView 
                                ? 'bg-primary-600 text-white shadow-lg' 
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                        Verfügbare Leads
                    </Link>
                    <Link
                        to="/partner/requests?view=purchased"
                        className={`px-6 py-3 rounded-xl font-black text-sm transition-all ${
                            isPurchasedView 
                                ? 'bg-primary-600 text-white shadow-lg' 
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                        Meine Leads
                    </Link>
                </div>
            </div>

            <div className="mb-8">
                <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input 
                                type="search" 
                                placeholder={isPurchasedView ? "Auftrag oder Kunde suchen..." : "Nach Leads suchen..."}
                                value={searchTerm} 
                                onChange={e => setSearchTerm(e.target.value)} 
                                className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="relative">
                                <MapPinIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text" 
                                    placeholder="Ort" 
                                    value={locationFilter} 
                                    onChange={e => setLocationFilter(e.target.value)} 
                                    className="h-14 pl-10 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all min-w-[140px]"
                                />
                            </div>
                            
                            {!isPurchasedView ? (
                                <>
                                    <div className="relative">
                                        <BriefcaseIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <select 
                                            value={serviceFilter} 
                                            onChange={e => setServiceFilter(e.target.value)} 
                                            className="h-14 pl-10 pr-10 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none appearance-none transition-all min-w-[160px]"
                                        >
                                            {availableServices.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                    
                                    <div className="relative">
                                        <select 
                                            value={sortOption} 
                                            onChange={e => setSortOption(e.target.value)} 
                                            className="h-14 px-4 pr-10 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none appearance-none transition-all min-w-[180px]"
                                        >
                                            <option value="newest">Neueste zuerst</option>
                                            <option value="price_asc">Preis: Niedrig → Hoch</option>
                                            <option value="price_desc">Preis: Hoch → Niedrig</option>
                                            <option value="availability">Höchste Verfügbarkeit</option>
                                        </select>
                                        <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="relative">
                                        <select 
                                            value={statusFilter} 
                                            onChange={e => setStatusFilter(e.target.value)} 
                                            className="h-14 px-4 pr-10 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none appearance-none transition-all min-w-[180px]"
                                        >
                                            <option value="Alle">Alle Status</option>
                                            {statuses.map(s => <option key={s} value={s}>{statusConfig[s].title}</option>)}
                                        </select>
                                        <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                    
                                    <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                                        <button 
                                            onClick={() => setPurchasedViewMode('cards')} 
                                            className={`p-3 rounded-lg font-black text-sm transition-all ${
                                                purchasedViewMode === 'cards' 
                                                    ? 'bg-white text-primary-600 shadow-md' 
                                                    : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                            title="Karten-Ansicht"
                                        >
                                            <Squares2X2Icon className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => setPurchasedViewMode('table')} 
                                            className={`p-3 rounded-lg font-black text-sm transition-all ${
                                                purchasedViewMode === 'table' 
                                                    ? 'bg-white text-primary-600 shadow-md' 
                                                    : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                            title="Tabellen-Ansicht"
                                        >
                                            <ListBulletIcon className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => setPurchasedViewMode('board')} 
                                            className={`px-4 py-2 rounded-lg font-black text-sm transition-all ${
                                                purchasedViewMode === 'board' 
                                                    ? 'bg-white text-primary-600 shadow-md' 
                                                    : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                        >
                                            Board
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {!isPurchasedView && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors"
                            >
                                <AdjustmentsHorizontalIcon className="w-4 h-4" />
                                Erweiterte Filter
                                <ChevronUpDownIcon className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {showFilters && (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Max. Lead-Preis (CHF)</label>
                                        <div className="relative">
                                            <BanknotesIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            <input 
                                                type="number" 
                                                placeholder="z.B. 20" 
                                                value={priceFilter} 
                                                onChange={e => setPriceFilter(e.target.value)} 
                                                className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">
                        {filteredRequests.length} {filteredRequests.length === 1 ? 'Lead gefunden' : 'Leads gefunden'}
                    </h2>
                    {isPurchasedView ? (
                        <p className="text-sm text-slate-600 mt-1 font-semibold">
                            {stats.new} neu • {stats.inProgress} in Bearbeitung • {stats.won} gewonnen
                        </p>
                    ) : (
                        <p className="text-sm text-slate-600 mt-1 font-semibold">Neue Aufträge warten auf Sie</p>
                    )}
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
