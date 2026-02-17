
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';
import { useAppContext } from './AppContext';
import { LeadQuickViewModal } from '../components/LeadQuickViewModal';
import {
    MagnifyingGlassIcon, MapPinIcon, CalendarDaysIcon, BanknotesIcon,
    ArrowRightIcon, SpinnerIcon, UsersIcon, CheckCircleIcon, BriefcaseIcon, ChevronUpDownIcon,
    BellIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, TestsiegerIcon, XCircleIcon,
    XMarkIcon, Squares2X2Icon, ListBulletIcon, StarIcon,
    EyeIcon, UserIcon
} from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const ITEMS_PER_PAGE = 12;

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_provider');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

interface Lead {
    _id: string;
    title: string;
    service: string;
    customerName: string;
    location: string;
    date: string;
    status: 'Neu' | 'Kontaktiert' | 'Angebot gesendet' | 'In Verhandlung' | 'Gewonnen' | 'Verloren / Abgelehnt';
    price: number;
    budget?: string;
    qualityScore: number;
    description?: string;
    details?: { label: string; value: string }[];
    customerInfo?: any;
    purchaseCount: number;
    isPurchased?: boolean;
}

type Status = Lead['status'];

const statuses: Status[] = ['Neu', 'Kontaktiert', 'Angebot gesendet', 'In Verhandlung', 'Gewonnen', 'Verloren / Abgelehnt'];

const statusConfig: { [key in Status]: { icon: React.ReactNode; color: string; bgColor: string; textColor: string; title: string; dotColor: string } } = {
    'Neu': { icon: <BellIcon className="w-3.5 h-3.5" />, color: 'text-blue-700', bgColor: 'bg-blue-50', textColor: 'text-blue-600', title: 'Neu', dotColor: 'bg-blue-500' },
    'Kontaktiert': { icon: <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />, color: 'text-cyan-700', bgColor: 'bg-cyan-50', textColor: 'text-cyan-600', title: 'Kontaktiert', dotColor: 'bg-cyan-500' },
    'Angebot gesendet': { icon: <PaperAirplaneIcon className="w-3.5 h-3.5" />, color: 'text-violet-700', bgColor: 'bg-violet-50', textColor: 'text-violet-600', title: 'Angebot gesendet', dotColor: 'bg-violet-500' },
    'In Verhandlung': { icon: <BanknotesIcon className="w-3.5 h-3.5" />, color: 'text-amber-700', bgColor: 'bg-amber-50', textColor: 'text-amber-600', title: 'Verhandlung', dotColor: 'bg-amber-500' },
    'Gewonnen': { icon: <TestsiegerIcon className="w-3.5 h-3.5" />, color: 'text-emerald-700', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', title: 'Gewonnen', dotColor: 'bg-emerald-500' },
    'Verloren / Abgelehnt': { icon: <XCircleIcon className="w-3.5 h-3.5" />, color: 'text-rose-700', bgColor: 'bg-rose-50', textColor: 'text-rose-600', title: 'Verloren', dotColor: 'bg-rose-500' },
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('de-CH', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatRelativeDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffHours < 1) return 'Gerade eben';
    if (diffHours < 24) return `Vor ${diffHours}h`;
    if (diffDays < 7) return `Vor ${diffDays}d`;
    return formatDate(dateStr);
};

// --- Skeleton ---
const CardSkeleton = () => (
    <div className="bg-white rounded-xl border border-slate-100 p-5 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
            <div className="h-5 bg-slate-100 rounded-full w-20" />
            <div className="h-5 bg-slate-100 rounded-full w-16 ml-auto" />
        </div>
        <div className="h-5 bg-slate-100 rounded w-4/5 mb-2" />
        <div className="h-4 bg-slate-50 rounded w-3/5 mb-4" />
        <div className="flex gap-2 mb-4">
            <div className="h-8 bg-slate-50 rounded-lg w-24" />
            <div className="h-8 bg-slate-50 rounded-lg w-28" />
        </div>
        <div className="h-px bg-slate-100 mb-4" />
        <div className="flex items-center justify-between">
            <div className="h-7 bg-slate-100 rounded w-20" />
            <div className="h-9 bg-slate-100 rounded-lg w-24" />
        </div>
    </div>
);

// --- Status Dropdown for Purchased ---
const StatusDropdown: React.FC<{ lead: Lead; onStatusChange: (id: string, status: Status) => void }> = ({ lead, onStatusChange }) => {
    const currentConfig = statusConfig[lead.status];
    return (
        <div className="relative">
            <select
                value={lead.status}
                onChange={e => onStatusChange(lead._id, e.target.value as Status)}
                className={`appearance-none cursor-pointer rounded-lg border-0 px-3 py-1.5 pr-7 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all ${currentConfig.bgColor} ${currentConfig.color}`}
            >
                {statuses.map(s => <option key={s} value={s}>{statusConfig[s].title}</option>)}
            </select>
            <ChevronUpDownIcon className={`w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${currentConfig.color} opacity-60`} />
        </div>
    );
};

// --- Available Lead Card (Marketplace) ---
const LeadCard: React.FC<{ lead: Lead; onViewDetails: (id: string) => void }> = ({ lead, onViewDetails }) => {
    const purchaseCount = lead.purchaseCount || 0;
    const isSoldOut = purchaseCount >= 5;
    const availableCount = 5 - purchaseCount;

    const leadDate = new Date(lead.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    leadDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - leadDate.getTime()) / (1000 * 60 * 60 * 24));
    const isNew = diffDays <= 1;
    const isHot = availableCount <= 2 && !isSoldOut;

    return (
        <article
            onClick={() => { if (!isSoldOut) onViewDetails(lead._id); }}
            className={`group relative bg-white rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                isSoldOut
                    ? 'border-slate-100 opacity-50 cursor-not-allowed'
                    : 'border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-0.5'
            }`}
        >
            {/* Top accent line */}
            {!isSoldOut && (
                <div className={`h-0.5 ${isHot ? 'bg-gradient-to-r from-orange-400 via-red-400 to-pink-400' : 'bg-gradient-to-r from-primary-400 to-primary-600'}`} />
            )}

            <div className="p-5">
                {/* Tags row */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md">
                        <BriefcaseIcon className="w-3 h-3 text-slate-400" />
                        {lead.service}
                    </span>
                    {isNew && (
                        <span className="inline-flex items-center gap-1 bg-primary-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                            Neu
                        </span>
                    )}
                    {isHot && (
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                            Beliebt
                        </span>
                    )}
                    {isSoldOut && (
                        <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                            Vergeben
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-primary-700 transition-colors">
                    {lead.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                    <div className="flex items-center gap-1.5">
                        <MapPinIcon className="w-3.5 h-3.5" />
                        <span>{lead.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CalendarDaysIcon className="w-3.5 h-3.5" />
                        <span>{formatRelativeDate(lead.date)}</span>
                    </div>
                </div>

                {/* Availability bar */}
                {!isSoldOut && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                            <span>{availableCount} von 5 verfuegbar</span>
                            <span className={`font-semibold ${availableCount <= 2 ? 'text-orange-500' : 'text-emerald-500'}`}>
                                {Math.round((availableCount / 5) * 100)}%
                            </span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                    availableCount <= 2 ? 'bg-gradient-to-r from-orange-400 to-red-400' : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                                }`}
                                style={{ width: `${(availableCount / 5) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Lead-Preis</span>
                        <p className={`text-lg font-extrabold ${isSoldOut ? 'text-slate-300' : 'text-slate-900'}`}>
                            {isSoldOut ? '---' : `CHF ${lead.price.toFixed(0)}`}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); if (!isSoldOut) onViewDetails(lead._id); }}
                        disabled={isSoldOut}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                            isSoldOut
                                ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                                : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95 shadow-sm shadow-primary-600/20'
                        }`}
                    >
                        Ansehen
                        {!isSoldOut && <ArrowRightIcon className="w-3 h-3" />}
                    </button>
                </div>
            </div>
        </article>
    );
};

// --- Purchased Lead Card ---
const PurchasedLeadCard: React.FC<{ lead: Lead; onStatusChange: (id: string, status: Status) => void }> = ({ lead, onStatusChange }) => {
    const config = statusConfig[lead.status];
    return (
        <article className="group bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                    <StatusDropdown lead={lead} onStatusChange={onStatusChange} />
                    <span className="text-[11px] text-slate-400 font-medium">{formatRelativeDate(lead.date)}</span>
                </div>

                <div className="mb-3">
                    <p className="text-[10px] font-semibold text-primary-500 uppercase tracking-wider mb-0.5">{lead.service}</p>
                    <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">
                        {lead.title}
                    </h3>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                    <div className="flex items-center gap-1.5">
                        <MapPinIcon className="w-3.5 h-3.5" />
                        <span>{lead.location}</span>
                    </div>
                </div>

                {lead.customerName && lead.customerName !== 'Vertraulich' && (
                    <div className="flex items-center gap-2.5 bg-slate-50 rounded-lg px-3 py-2 mb-4">
                        <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <UserIcon className="w-3.5 h-3.5 text-primary-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-700 truncate">{lead.customerName}</p>
                            {lead.customerInfo?.email && (
                                <p className="text-[10px] text-slate-400 truncate">{lead.customerInfo.email}</p>
                            )}
                        </div>
                    </div>
                )}

                <Link
                    to={`/partner/requests/${lead._id}`}
                    className="w-full py-2 rounded-lg font-semibold text-xs bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                    <EyeIcon className="w-3.5 h-3.5" />
                    Details anzeigen
                </Link>
            </div>
        </article>
    );
};

// --- Purchased Leads Table ---
const PurchasedLeadsTable: React.FC<{ leads: Lead[]; onStatusChange: (id: string, status: Status) => void }> = ({ leads, onStatusChange }) => (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-slate-100">
                        <th scope="col" className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Auftrag</th>
                        <th scope="col" className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Kunde</th>
                        <th scope="col" className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Datum</th>
                        <th scope="col" className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-5 py-3.5 text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Aktion</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {leads.map(lead => (
                        <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-5 py-4">
                                <div className="font-semibold text-slate-900">{lead.title}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                        <BriefcaseIcon className="w-3 h-3" />
                                        {lead.service}
                                    </span>
                                    <span className="text-slate-200">|</span>
                                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                        <MapPinIcon className="w-3 h-3" />
                                        {lead.location}
                                    </span>
                                </div>
                            </td>
                            <td className="px-5 py-4">
                                {lead.customerName && lead.customerName !== 'Vertraulich' ? (
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                                            <UserIcon className="w-3.5 h-3.5 text-primary-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-slate-700 text-sm truncate">{lead.customerName}</p>
                                            {lead.customerInfo?.email && (
                                                <p className="text-[11px] text-slate-400 truncate">{lead.customerInfo.email}</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-slate-300">---</span>
                                )}
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-500">{formatDate(lead.date)}</td>
                            <td className="px-5 py-4">
                                <StatusDropdown lead={lead} onStatusChange={onStatusChange} />
                            </td>
                            <td className="px-5 py-4 text-right">
                                <Link
                                    to={`/partner/requests/${lead._id}`}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 active:scale-95 transition-all"
                                >
                                    <EyeIcon className="w-3.5 h-3.5" />
                                    Oeffnen
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Stat Card ---
const StatCard: React.FC<{ label: string; value: number; icon: React.ReactNode; color: string }> = ({ label, value, icon, color }) => (
    <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-2xl font-extrabold text-slate-900">{value}</p>
            <p className="text-[11px] text-slate-400 font-medium">{label}</p>
        </div>
    </div>
);

// --- Main Page ---
const PartnerRequestsPage: React.FC = () => {
    const context = useAppContext();
    const { openQuickView, isQuickViewOpen = false, closeQuickView, quickViewLeadId = null } = context || {};

    const locationHook = useLocation();
    const [localSelectedLeadId, setLocalSelectedLeadId] = useState<string | null>(null);

    const isPurchasedView = useMemo(() => new URLSearchParams(locationHook.search).get('view') === 'purchased', [locationHook.search]);

    const [availableLeads, setAvailableLeads] = useState<Lead[]>([]);
    const [purchasedLeads, setPurchasedLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [purchasedViewMode, setPurchasedViewMode] = useState<'cards' | 'table' | 'board'>('cards');
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [serviceFilter, setServiceFilter] = useState('Alle');
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [priceFilter, setPriceFilter] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchLeads = useCallback(async () => {
        try {
            setError(null);
            const headers = getAuthHeaders();

            if (isPurchasedView) {
                const response = await fetch(`${API_URL}/api/partner/leads/purchased`, { headers });
                if (!response.ok) throw new Error('Leads konnten nicht geladen werden');
                const data = await response.json();
                setPurchasedLeads(data);
            } else {
                const response = await fetch(`${API_URL}/api/partner/leads/available`, { headers });
                if (!response.ok) throw new Error('Leads konnten nicht geladen werden');
                const data = await response.json();
                setAvailableLeads(data);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [isPurchasedView]);

    useEffect(() => {
        setLoading(true);
        fetchLeads();
    }, [fetchLeads]);

    useEffect(() => {
        if (isPurchasedView) setPurchasedViewMode('cards');
    }, [isPurchasedView]);

    const handleStatusChange = async (leadId: string, newStatus: Status) => {
        try {
            const response = await fetch(`${API_URL}/api/partner/leads/${leadId}/status`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) throw new Error('Status konnte nicht geaendert werden');
            setPurchasedLeads(prev => prev.map(l => l._id === leadId ? { ...l, status: newStatus } : l));
        } catch (err: any) {
            alert(err.message);
        }
    };

    const leads = isPurchasedView ? purchasedLeads : availableLeads;

    const availableServices = useMemo(() => {
        const services = new Set(leads.map(r => r.service));
        return ['Alle', ...Array.from(services).sort()];
    }, [leads]);

    const swissCantons = [
        'Alle Kantone',
        'Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft',
        'Basel-Stadt', 'Bern', 'Freiburg', 'Genf', 'Glarus', 'Graubuenden',
        'Jura', 'Luzern', 'Neuenburg', 'Nidwalden', 'Obwalden', 'Schaffhausen',
        'Schwyz', 'Solothurn', 'St. Gallen', 'Tessin', 'Thurgau', 'Uri',
        'Waadt', 'Wallis', 'Zug', 'Zuerich'
    ];

    const filteredRequests = useMemo(() => {
        const filtered = leads
            .filter(req =>
                req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (isPurchasedView && req.customerName?.toLowerCase().includes(searchTerm.toLowerCase()))
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

        filtered.sort((a, b) => {
            if (!isPurchasedView) {
                switch (sortOption) {
                    case 'price_asc': return a.price - b.price;
                    case 'price_desc': return b.price - a.price;
                    case 'availability': return (b.purchaseCount || 0) - (a.purchaseCount || 0);
                    case 'newest': default: return new Date(b.date).getTime() - new Date(a.date).getTime();
                }
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return filtered;
    }, [searchTerm, locationFilter, serviceFilter, statusFilter, priceFilter, sortOption, isPurchasedView, leads]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, locationFilter, serviceFilter, statusFilter, priceFilter, sortOption, isPurchasedView]);

    const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
    const paginatedRequests = filteredRequests.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const stats = useMemo(() => ({
        total: purchasedLeads.length,
        won: purchasedLeads.filter(l => l.status === 'Gewonnen').length,
        inProgress: purchasedLeads.filter(l => ['Kontaktiert', 'Angebot gesendet', 'In Verhandlung'].includes(l.status)).length,
        new: purchasedLeads.filter(l => l.status === 'Neu').length,
    }), [purchasedLeads]);

    const kanbanLeads = useMemo(() => filteredRequests.map(l => ({
        ...l,
        id: l._id as any,
        customer: l.customerName,
        customerEmail: l.customerInfo?.email || '',
    })), [filteredRequests]);

    const activeFiltersCount = [
        locationFilter,
        serviceFilter !== 'Alle' ? serviceFilter : '',
        statusFilter !== 'Alle' ? statusFilter : '',
        priceFilter,
    ].filter(Boolean).length;

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            {isPurchasedView ? 'Meine Leads' : 'Lead-Marktplatz'}
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            {isPurchasedView
                                ? `${filteredRequests.length} Leads in Ihrem Portfolio`
                                : `${filteredRequests.length} Leads verfuegbar`
                            }
                        </p>
                    </div>
                    {!isPurchasedView && (
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs text-slate-400 font-medium">Live</span>
                            <button
                                onClick={() => { setLoading(true); fetchLeads(); }}
                                className="ml-2 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                Aktualisieren
                            </button>
                        </div>
                    )}
                </div>

                {/* Stats for purchased view */}
                {isPurchasedView && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        <StatCard
                            label="Gesamt"
                            value={stats.total}
                            icon={<BriefcaseIcon className="w-4 h-4 text-slate-600" />}
                            color="bg-slate-50"
                        />
                        <StatCard
                            label="Neu"
                            value={stats.new}
                            icon={<BellIcon className="w-4 h-4 text-blue-600" />}
                            color="bg-blue-50"
                        />
                        <StatCard
                            label="In Bearbeitung"
                            value={stats.inProgress}
                            icon={<ChatBubbleLeftRightIcon className="w-4 h-4 text-amber-600" />}
                            color="bg-amber-50"
                        />
                        <StatCard
                            label="Gewonnen"
                            value={stats.won}
                            icon={<CheckCircleIcon className="w-4 h-4 text-emerald-600" />}
                            color="bg-emerald-50"
                        />
                    </div>
                )}

                {/* Search + Filters */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <MagnifyingGlassIcon className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="search"
                                placeholder={isPurchasedView ? "Auftrag oder Kunde suchen..." : "Leads durchsuchen..."}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none transition-all"
                            />
                        </div>

                        {isPurchasedView && (
                            <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                                <button
                                    onClick={() => setPurchasedViewMode('cards')}
                                    className={`p-2 rounded-md transition-all ${purchasedViewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    title="Karten"
                                >
                                    <Squares2X2Icon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setPurchasedViewMode('table')}
                                    className={`p-2 rounded-md transition-all ${purchasedViewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    title="Tabelle"
                                >
                                    <ListBulletIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setPurchasedViewMode('board')}
                                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${purchasedViewMode === 'board' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Board
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Filter chips */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <MapPinIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                                value={locationFilter || 'Alle Kantone'}
                                onChange={e => setLocationFilter(e.target.value === 'Alle Kantone' ? '' : e.target.value)}
                                className="h-8 pl-8 pr-7 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 outline-none appearance-none cursor-pointer hover:border-slate-300 transition-all"
                            >
                                {swissCantons.map(k => <option key={k} value={k}>{k}</option>)}
                            </select>
                            <ChevronUpDownIcon className="w-3.5 h-3.5 text-slate-300 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {!isPurchasedView ? (
                            <>
                                <div className="relative">
                                    <select
                                        value={serviceFilter}
                                        onChange={e => setServiceFilter(e.target.value)}
                                        className="h-8 pl-3 pr-7 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 outline-none appearance-none cursor-pointer hover:border-slate-300 transition-all"
                                    >
                                        {availableServices.map(s => <option key={s} value={s}>{s === 'Alle' ? 'Alle Services' : s}</option>)}
                                    </select>
                                    <ChevronUpDownIcon className="w-3.5 h-3.5 text-slate-300 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>

                                <div className="relative">
                                    <BanknotesIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="number"
                                        placeholder="Max. CHF"
                                        value={priceFilter}
                                        onChange={e => setPriceFilter(e.target.value)}
                                        className="h-8 w-28 pl-8 pr-3 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 outline-none placeholder:text-slate-300 hover:border-slate-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
                                    />
                                </div>

                                <div className="relative ml-auto">
                                    <select
                                        value={sortOption}
                                        onChange={e => setSortOption(e.target.value)}
                                        className="h-8 pl-3 pr-7 rounded-lg bg-slate-50 border-0 text-xs font-medium text-slate-500 outline-none appearance-none cursor-pointer transition-all"
                                    >
                                        <option value="newest">Neueste zuerst</option>
                                        <option value="price_asc">Preis aufsteigend</option>
                                        <option value="price_desc">Preis absteigend</option>
                                        <option value="availability">Verfuegbarkeit</option>
                                    </select>
                                    <ChevronUpDownIcon className="w-3.5 h-3.5 text-slate-300 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </>
                        ) : (
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={e => setStatusFilter(e.target.value)}
                                    className="h-8 pl-3 pr-7 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 outline-none appearance-none cursor-pointer hover:border-slate-300 transition-all"
                                >
                                    <option value="Alle">Alle Status</option>
                                    {statuses.map(s => <option key={s} value={s}>{statusConfig[s].title}</option>)}
                                </select>
                                <ChevronUpDownIcon className="w-3.5 h-3.5 text-slate-300 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        )}

                        {activeFiltersCount > 0 && (
                            <button
                                onClick={() => { setLocationFilter(''); setServiceFilter('Alle'); setStatusFilter('Alle'); setPriceFilter(''); }}
                                className="h-8 px-3 rounded-lg text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all flex items-center gap-1.5"
                            >
                                <XMarkIcon className="w-3 h-3" />
                                Filter zuruecksetzen
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
                </div>
            ) : error ? (
                <div className="bg-white border border-rose-100 rounded-xl p-10 text-center">
                    <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <XCircleIcon className="w-6 h-6 text-rose-400" />
                    </div>
                    <p className="text-base font-bold text-slate-900 mb-1">Fehler beim Laden</p>
                    <p className="text-sm text-slate-400 mb-5">{error}</p>
                    <button
                        onClick={() => { setLoading(true); fetchLeads(); }}
                        className="bg-slate-900 text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors"
                    >
                        Erneut versuchen
                    </button>
                </div>
            ) : (
                <>
                    {isPurchasedView && purchasedViewMode === 'board' ? (
                        <KanbanBoard leads={kanbanLeads as any} />
                    ) : isPurchasedView && purchasedViewMode === 'table' ? (
                        <PurchasedLeadsTable leads={filteredRequests} onStatusChange={handleStatusChange} />
                    ) : isPurchasedView && purchasedViewMode === 'cards' ? (
                        paginatedRequests.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {paginatedRequests.map(lead => (
                                        <PurchasedLeadCard key={lead._id} lead={lead} onStatusChange={handleStatusChange} />
                                    ))}
                                </div>
                                {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
                            </>
                        ) : (
                            <EmptyState
                                icon={<UsersIcon className="w-10 h-10 text-slate-300" />}
                                title="Keine gekauften Leads"
                                description="Kaufen Sie Leads, um hier Ihre Auftraege zu verwalten."
                                action={<Link to="/partner/requests" className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">Leads entdecken <ArrowRightIcon className="w-3.5 h-3.5" /></Link>}
                            />
                        )
                    ) : paginatedRequests.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {paginatedRequests.map(lead => (
                                    <LeadCard key={lead._id} lead={lead} onViewDetails={(id) => setLocalSelectedLeadId(id)} />
                                ))}
                            </div>
                            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
                        </>
                    ) : (
                        <EmptyState
                            icon={<MagnifyingGlassIcon className="w-10 h-10 text-slate-300" />}
                            title="Keine Leads gefunden"
                            description="Passen Sie Ihre Filter an oder schauen Sie spaeter wieder vorbei."
                        />
                    )}
                </>
            )}

            {localSelectedLeadId && (
                <LeadQuickViewModal
                    leadId={localSelectedLeadId as any}
                    isOpen={!!localSelectedLeadId}
                    onClose={() => setLocalSelectedLeadId(null)}
                />
            )}
        </div>
    );
};

// --- Pagination ---
const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-center items-center gap-1.5 mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 rounded-lg text-xs font-semibold transition-all ${
                    currentPage === page
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700'
                }`}
            >
                {page}
            </button>
        ))}
    </div>
);

// --- Empty State ---
const EmptyState: React.FC<{ icon: React.ReactNode; title: string; description: string; action?: React.ReactNode }> = ({ icon, title, description, action }) => (
    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
        <div className="mb-4">{icon}</div>
        <h3 className="text-base font-bold text-slate-700 mb-1">{title}</h3>
        <p className="text-sm text-slate-400 mb-5">{description}</p>
        {action}
    </div>
);

export default PartnerRequestsPage;
