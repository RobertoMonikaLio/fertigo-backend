import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';
import { useAppContext } from './AppContext';
import { LeadQuickViewModal } from '../components/LeadQuickViewModal';
import { translations } from '../components/translations';
import {
    MagnifyingGlassIcon, MapPinIcon, CalendarDaysIcon, BanknotesIcon,
    ArrowPathIcon, UsersIcon, CheckCircleIcon, BriefcaseIcon, ChevronUpDownIcon,
    BellIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, TestsiegerIcon, XCircleIcon,
    XMarkIcon, Squares2X2Icon, TableCellsIcon, QueueListIcon,
    EyeIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon, TagIcon, ChevronDownIcon, ArrowRightIcon
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

const statusConfig: { [key in Status]: { icon: React.ReactNode; color: string; bgColor: string; borderColor: string; key: string } } = {
    'Neu': { icon: <BellIcon className="w-3.5 h-3.5" />, color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', key: 'Neu' },
    'Kontaktiert': { icon: <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />, color: 'text-cyan-700', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200', key: 'Kontaktiert' },
    'Angebot gesendet': { icon: <PaperAirplaneIcon className="w-3.5 h-3.5" />, color: 'text-violet-700', bgColor: 'bg-violet-50', borderColor: 'border-violet-200', key: 'Angebot' },
    'In Verhandlung': { icon: <BanknotesIcon className="w-3.5 h-3.5" />, color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', key: 'Verhandlung' },
    'Gewonnen': { icon: <TestsiegerIcon className="w-3.5 h-3.5" />, color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', key: 'Gewonnen' },
    'Verloren / Abgelehnt': { icon: <XCircleIcon className="w-3.5 h-3.5" />, color: 'text-rose-700', bgColor: 'bg-rose-50', borderColor: 'border-rose-200', key: 'Verloren' },
};

const formatPrice = (price: number) =>
    new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(price);

const formatDate = (dateStr: string, language: string) =>
    new Date(dateStr).toLocaleDateString(language === 'de' ? 'de-CH' : 'en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const config = statusConfig[status as Status] || statusConfig['Neu'];
    return (
        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 ${config.bgColor} ${config.color} border ${config.borderColor}`}>
            {config.icon}
            {status === 'Verloren / Abgelehnt' ? 'Verloren' : status}
        </span>
    );
};

const AvailabilityDots: React.FC<{ count: number; max: number }> = ({ count, max }) => {
    const available = max - count;
    return (
        <div className="flex items-center gap-1" title={`${available} von ${max} verfügbar`}>
            {Array.from({ length: max }).map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${i < available ? 'bg-emerald-500' : 'bg-slate-200'}`}
                />
            ))}
        </div>
    );
};

const LeadCard: React.FC<{ lead: Lead; isPurchased: boolean; language: string; onClick: () => void }> = ({ lead, isPurchased, language, onClick }) => {
    const availableCount = 5 - (lead.purchaseCount || 0);
    const isSoldOut = !isPurchased && availableCount <= 0;
    const isHot = !isPurchased && availableCount <= 2 && availableCount > 0;
    const leadDate = new Date(lead.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    leadDate.setHours(0, 0, 0, 0);
    const isNew = leadDate.getTime() >= today.getTime();

    return (
        <article
            onClick={isSoldOut ? undefined : onClick}
            className={`group relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${isSoldOut
                ? 'border-slate-200 opacity-60 cursor-not-allowed'
                : 'border-slate-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100/50 cursor-pointer hover:-translate-y-1'
                }`}
        >
            {/* Top accent bar */}
            <div className={`h-1 w-full ${isSoldOut ? 'bg-slate-300' : isHot ? 'bg-gradient-to-r from-orange-400 to-red-500' : 'bg-gradient-to-r from-primary-500 to-primary-600'}`} />

            <div className="p-5 flex-1 flex flex-col">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {isPurchased && <StatusBadge status={lead.status} />}
                    {isNew && !isSoldOut && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-primary-50 text-primary-700 border border-primary-200 inline-flex items-center gap-1">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-600"></span>
                            </span>
                            Neu
                        </span>
                    )}
                    {isHot && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                            Beliebt
                        </span>
                    )}
                    {isSoldOut && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                            Ausverkauft
                        </span>
                    )}
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-50 text-slate-600 border border-slate-200 ml-auto">
                        {lead.service}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-primary-700 transition-colors">
                    {lead.title}
                </h3>

                {/* Meta info */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPinIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="font-medium truncate">{lead.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDaysIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="font-medium">{formatDate(lead.date, language)}</span>
                    </div>
                    {isPurchased && lead.customerName && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <UserIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span className="font-medium truncate">{lead.customerName}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    {!isPurchased ? (
                        <>
                            <div>
                                <p className="text-lg font-extrabold text-slate-900">{formatPrice(lead.price)}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <AvailabilityDots count={lead.purchaseCount || 0} max={5} />
                                    <span className="text-[11px] text-slate-400 font-medium">{availableCount}/5</span>
                                </div>
                            </div>
                            {!isSoldOut && (
                                <div className="bg-primary-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold group-hover:bg-primary-700 transition-colors flex items-center gap-1.5 shadow-sm group-hover:shadow-md">
                                    Ansehen
                                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2].map(p => (
                                        <div key={p} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                                            <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs text-slate-400 font-medium">{lead.purchaseCount} Käufer</span>
                            </div>
                            <div className="text-primary-600 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Details
                                <ArrowRightIcon className="w-3.5 h-3.5" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
};

const TableRow: React.FC<{ lead: Lead; isPurchased: boolean; language: string; onClick: () => void }> = ({ lead, isPurchased, language, onClick }) => {
    const availableCount = 5 - (lead.purchaseCount || 0);
    return (
        <tr onClick={onClick} className="group hover:bg-primary-50/50 cursor-pointer transition-colors border-b border-slate-100 last:border-0">
            <td className="py-4 px-5">
                <div>
                    <p className="font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-1">{lead.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{lead.service}</p>
                </div>
            </td>
            <td className="py-4 px-5">
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <MapPinIcon className="w-3.5 h-3.5 text-slate-400" />
                    {lead.location}
                </div>
            </td>
            <td className="py-4 px-5 text-sm text-slate-600 font-medium">
                {formatDate(lead.date, language)}
            </td>
            {isPurchased && (
                <td className="py-4 px-5">
                    <StatusBadge status={lead.status} />
                </td>
            )}
            {!isPurchased && (
                <>
                    <td className="py-4 px-5">
                        <span className="font-bold text-slate-900">{formatPrice(lead.price)}</span>
                    </td>
                    <td className="py-4 px-5">
                        <AvailabilityDots count={lead.purchaseCount || 0} max={5} />
                    </td>
                </>
            )}
            <td className="py-4 px-5 text-right">
                <span className="text-primary-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                    Öffnen <ArrowRightIcon className="w-3.5 h-3.5" />
                </span>
            </td>
        </tr>
    );
};

const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
        <div className="h-1 w-full bg-slate-200" />
        <div className="p-5 space-y-4">
            <div className="flex gap-2">
                <div className="h-6 w-14 bg-slate-100 rounded-lg" />
                <div className="h-6 w-20 bg-slate-100 rounded-lg" />
            </div>
            <div className="h-5 bg-slate-200 rounded w-4/5" />
            <div className="h-4 bg-slate-100 rounded w-3/5" />
            <div className="h-4 bg-slate-100 rounded w-2/5" />
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="h-6 w-20 bg-slate-200 rounded" />
                <div className="h-9 w-24 bg-slate-100 rounded-xl" />
            </div>
        </div>
    </div>
);

const PartnerRequestsPage: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations[language] as any)?.partner?.requests || (translations['de'] as any).partner.requests;

    const [isPurchasedView, setIsPurchasedView] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [purchasedLeads, setPurchasedLeads] = useState<Lead[]>([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCanton, setSelectedCanton] = useState(language === 'de' ? 'Alle Kantone' : t.filterAllCantons);
    const [selectedService, setSelectedService] = useState(language === 'de' ? 'Alle Services' : t.filterAllServices);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [sortOption, setSortOption] = useState(language === 'de' ? 'Neueste zuerst' : t.sort.newest);

    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const [quickViewLeadId, setQuickViewLeadId] = useState<string | null>(null);

    const fetchLeads = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const endpoint = isPurchasedView ? '/api/partner/leads/purchased' : '/api/partner/leads/available';
            const response = await fetch(`${API_URL}${endpoint}`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error(language === 'de' ? 'Das Laden der Leads ist fehlgeschlagen' : 'Failed to load leads');
            const data = await response.json();
            if (isPurchasedView) {
                setPurchasedLeads(data);
            } else {
                setLeads(data);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [isPurchasedView, language]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const activeList = isPurchasedView ? purchasedLeads : leads;

    const filteredRequests = useMemo(() => {
        return activeList
            .filter(lead => {
                const searchStr = (lead.title + (lead.customerName || '') + lead.location).toLowerCase();
                if (searchTerm && !searchStr.includes(searchTerm.toLowerCase())) return false;
                if (!isPurchasedView) {
                    if (selectedCanton !== (language === 'de' ? 'Alle Kantone' : t.filterAllCantons) && lead.location !== selectedCanton) return false;
                    if (selectedService !== (language === 'de' ? 'Alle Services' : t.filterAllServices) && lead.service !== selectedService) return false;
                    if (lead.price > maxPrice) return false;
                }
                return true;
            })
            .sort((a, b) => {
                if (sortOption === (language === 'de' ? 'Neueste zuerst' : (t.sort?.newest || 'Neueste zuerst'))) {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                }
                if (sortOption === (language === 'de' ? 'Preis aufsteigend' : (t.sort?.priceAsc || 'Preis aufsteigend'))) {
                    return a.price - b.price;
                }
                if (sortOption === (language === 'de' ? 'Preis absteigend' : (t.sort?.priceDesc || 'Preis absteigend'))) {
                    return b.price - a.price;
                }
                return 0;
            });
    }, [activeList, searchTerm, selectedCanton, selectedService, maxPrice, sortOption, isPurchasedView, language, t]);

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const stats = useMemo(() => {
        if (!isPurchasedView) return null;
        return {
            total: purchasedLeads.length,
            new: purchasedLeads.filter(l => l.status === 'Neu').length,
            inProgress: purchasedLeads.filter(l => ['Kontaktiert', 'Angebot gesendet', 'In Verhandlung'].includes(l.status)).length,
            won: purchasedLeads.filter(l => l.status === 'Gewonnen').length
        };
    }, [purchasedLeads, isPurchasedView]);

    const handleStatusChange = async (leadId: string, newStatus: string) => {
        try {
            const response = await fetch(`${API_URL}/api/partner/leads/${leadId}/status`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                setPurchasedLeads(prev => prev.map(l => l._id === leadId ? { ...l, status: newStatus as Status } : l));
            }
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCanton(language === 'de' ? 'Alle Kantone' : t.filterAllCantons);
        setSelectedService(language === 'de' ? 'Alle Services' : t.filterAllServices);
        setMaxPrice(1000);
    };

    const availableLeadCount = leads.filter(l => (5 - (l.purchaseCount || 0)) > 0).length;

    return (
        <div className="max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="mb-4 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
                    <div>
                        <div className="flex items-center justify-between sm:justify-start gap-3 mb-2">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] sm:text-xs font-bold text-emerald-700">
                                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
                                    </span>
                                    Live
                                </span>
                                {!isPurchasedView && (
                                    <span className="text-xs sm:text-sm text-slate-500 font-medium">
                                        {availableLeadCount} {availableLeadCount === 1 ? 'Lead' : 'Leads'} verfügbar
                                    </span>
                                )}
                            </div>

                            {/* Refresh Button moved up on Mobile for space efficiency */}
                            <button
                                onClick={fetchLeads}
                                className="sm:hidden p-2 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                                title="Aktualisieren"
                            >
                                <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin text-primary-600' : ''}`} />
                            </button>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {isPurchasedView ? t.myLeadsTitle : t.title}
                        </h1>
                        <p className="text-slate-500 mt-1 font-medium text-sm sm:text-base hidden sm:block">
                            {isPurchasedView ? t.leadsInPortfolio : 'Entdecken Sie neue Projektanfragen und gewinnen Sie Aufträge.'}
                        </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-3">
                        <button
                            onClick={fetchLeads}
                            className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300 transition-all shadow-sm active:scale-95"
                            title="Aktualisieren"
                        >
                            <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin text-primary-600' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats (Purchased View) */}
            {isPurchasedView && stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {[
                        { label: 'Gesamt', value: stats.total, icon: <Squares2X2Icon className="w-5 h-5" />, color: 'primary' },
                        { label: 'Neue Leads', value: stats.new, icon: <BellIcon className="w-5 h-5" />, color: 'blue' },
                        { label: 'In Bearbeitung', value: stats.inProgress, icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />, color: 'amber' },
                        { label: 'Gewonnen', value: stats.won, icon: <TestsiegerIcon className="w-5 h-5" />, color: 'emerald' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-${stat.color}-50 border border-${stat.color}-200 flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Filter Bar — same design as Kunden */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                {/* Search */}
                <div className="relative flex-1 min-w-0 w-full">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder={isPurchasedView ? (t.searchPurchasedPlaceholder || 'Auftrag oder Kunde suchen...') : (t.searchPlaceholder || 'Leads durchsuchen...')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-100 rounded-lg transition-colors">
                            <XMarkIcon className="w-4 h-4 text-slate-400" />
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide flex-nowrap snap-x">
                    {!isPurchasedView && (
                        <>
                            {/* Kanton Dropdown */}
                            <div className="relative flex-shrink-0 snap-start">
                                <select
                                    value={selectedCanton}
                                    onChange={(e) => { setSelectedCanton(e.target.value); setCurrentPage(1); }}
                                    className="h-10 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 appearance-none cursor-pointer"
                                >
                                    <option>{t.filterAllCantons}</option>
                                    {['Zürich', 'Bern', 'Luzern', 'Aargau', 'St. Gallen'].map(c => <option key={c}>{c}</option>)}
                                </select>
                                <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>

                            {/* Dienstleistung Dropdown */}
                            <div className="relative flex-shrink-0 snap-start">
                                <select
                                    value={selectedService}
                                    onChange={(e) => { setSelectedService(e.target.value); setCurrentPage(1); }}
                                    className="h-10 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 appearance-none cursor-pointer"
                                >
                                    <option>{t.filterAllServices}</option>
                                    {['Umzug', 'Reinigung', 'Maler', 'Bodenleger'].map(s => <option key={s}>{s}</option>)}
                                </select>
                                <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </>
                    )}

                    {/* Sort */}
                    <div className="relative flex-shrink-0 snap-start">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="h-10 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 appearance-none cursor-pointer"
                        >
                            <option>{t.sort?.newest || 'Neueste zuerst'}</option>
                            <option>{t.sort?.priceAsc || 'Preis aufsteigend'}</option>
                            <option>{t.sort?.priceDesc || 'Preis absteigend'}</option>
                        </select>
                        <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    {/* View Toggle */}
                    <div className="hidden sm:flex items-center h-10 p-1 bg-slate-100 rounded-xl gap-0.5 flex-shrink-0">
                        <button
                            onClick={() => setViewMode('cards')}
                            title="Karten-Ansicht"
                            className={`h-8 px-3 rounded-lg text-sm font-medium transition-all ${viewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Squares2X2Icon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            title="Tabellen-Ansicht"
                            className={`h-8 px-3 rounded-lg text-sm font-medium transition-all ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <TableCellsIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4 px-1">
                <p className="text-sm font-semibold text-slate-500">
                    {filteredRequests.length} {filteredRequests.length === 1 ? 'Ergebnis' : 'Ergebnisse'}
                    {searchTerm && <span className="text-slate-400"> für «{searchTerm}»</span>}
                </p>
                {(searchTerm || selectedCanton !== (language === 'de' ? 'Alle Kantone' : t.filterAllCantons) || selectedService !== (language === 'de' ? 'Alle Services' : t.filterAllServices)) && (
                    <button onClick={resetFilters} className="text-xs font-bold text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1">
                        <XMarkIcon className="w-3.5 h-3.5" />
                        Filter zurücksetzen
                    </button>
                )}
            </div>

            {/* Content */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                </div>
            ) : error ? (
                <div className="bg-white rounded-2xl border border-red-200 p-12 text-center">
                    <div className="w-16 h-16 mx-auto bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                        <XCircleIcon className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Fehler beim Laden</h3>
                    <p className="text-slate-500 mb-6 max-w-md mx-auto">{error}</p>
                    <button
                        onClick={fetchLeads}
                        className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
                    >
                        Erneut versuchen
                    </button>
                </div>
            ) : paginatedRequests.length > 0 ? (
                viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {paginatedRequests.map(lead => (
                            <LeadCard
                                key={lead._id}
                                lead={lead}
                                isPurchased={isPurchasedView}
                                language={language}
                                onClick={() => setQuickViewLeadId(lead._id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left py-3.5 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Projekt</th>
                                    <th className="text-left py-3.5 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Standort</th>
                                    <th className="text-left py-3.5 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Datum</th>
                                    {isPurchasedView && <th className="text-left py-3.5 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>}
                                    {!isPurchasedView && (
                                        <>
                                            <th className="text-left py-3.5 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Preis</th>
                                            <th className="text-left py-3.5 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Verfügbar</th>
                                        </>
                                    )}
                                    <th className="py-3.5 px-5"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRequests.map(lead => (
                                    <TableRow
                                        key={lead._id}
                                        lead={lead}
                                        isPurchased={isPurchasedView}
                                        language={language}
                                        onClick={() => setQuickViewLeadId(lead._id)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : (
                <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-16 text-center">
                    <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                        <MagnifyingGlassIcon className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {isPurchasedView ? 'Keine gekauften Leads' : 'Keine Leads gefunden'}
                    </h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-6 font-medium">
                        {isPurchasedView
                            ? 'Kaufen Sie Leads auf dem Marktplatz, um Ihre Aufträge hier zu verwalten.'
                            : 'Passen Sie Ihre Filter an oder schauen Sie später nochmals vorbei.'}
                    </p>
                    <div className="flex justify-center gap-3">
                        {!isPurchasedView && (
                            <button onClick={resetFilters} className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                                Filter zurücksetzen
                            </button>
                        )}
                        {isPurchasedView && (
                            <button
                                onClick={() => { setIsPurchasedView(false); setCurrentPage(1); }}
                                className="px-5 py-2.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
                            >
                                Leads entdecken
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                    >
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1.5">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${currentPage === i + 1
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                    >
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Quick View Modal */}
            {quickViewLeadId && (
                <LeadQuickViewModal
                    leadId={quickViewLeadId}
                    isOpen={!!quickViewLeadId}
                    onClose={() => setQuickViewLeadId(null)}
                />
            )}
        </div>
    );
};

export default PartnerRequestsPage;
