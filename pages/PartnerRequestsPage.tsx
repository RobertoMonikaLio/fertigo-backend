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
    EyeIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon, TagIcon, ChevronDownIcon
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

const statusConfig: { [key in Status]: { icon: React.ReactNode; color: string; bgColor: string; key: string } } = {
    'Neu': { icon: <BellIcon className="w-3.5 h-3.5" />, color: 'text-blue-700', bgColor: 'bg-blue-50', key: 'Neu' },
    'Kontaktiert': { icon: <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />, color: 'text-cyan-700', bgColor: 'bg-cyan-50', key: 'Kontaktiert' },
    'Angebot gesendet': { icon: <PaperAirplaneIcon className="w-3.5 h-3.5" />, color: 'text-violet-700', bgColor: 'bg-violet-50', key: 'Angebot' },
    'In Verhandlung': { icon: <BanknotesIcon className="w-3.5 h-3.5" />, color: 'text-amber-700', bgColor: 'bg-amber-50', key: 'Verhandlung' },
    'Gewonnen': { icon: <TestsiegerIcon className="w-3.5 h-3.5" />, color: 'text-emerald-700', bgColor: 'bg-emerald-50', key: 'Gewonnen' },
    'Verloren / Abgelehnt': { icon: <XCircleIcon className="w-3.5 h-3.5" />, color: 'text-rose-700', bgColor: 'bg-rose-50', key: 'Verloren' },
};

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(price);
};

const formatDate = (dateStr: string, language: string) => {
    return new Date(dateStr).toLocaleDateString(language === 'de' ? 'de-CH' : 'en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const StatusBadge: React.FC<{ status: string; t: any }> = ({ status, t }) => {
    const config = statusConfig[status as Status] || statusConfig['Neu'];
    // For now we use the key or a simple mapping if available in translations
    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${config.bgColor} ${config.color}`}>
            {config.icon}
            {status === 'Verloren / Abgelehnt' ? 'Verloren' : status}
        </span>
    );
};

const PartnerRequestsPage: React.FC = () => {
    const { language } = useAppContext();
    const t = translations[language]?.partner?.requests || translations['de'].partner.requests;

    const [isPurchasedView, setIsPurchasedView] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [purchasedLeads, setPurchasedLeads] = useState<Lead[]>([]);

    // Filters & Sorting
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCanton, setSelectedCanton] = useState(language === 'de' ? 'Alle Kantone' : t.filterAllCantons);
    const [selectedService, setSelectedService] = useState(language === 'de' ? 'Alle Services' : t.filterAllServices);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [sortOption, setSortOption] = useState(language === 'de' ? 'Neueste zuerst' : t.sort.newest);

    // View Options
    const [purchasedViewMode, setPurchasedViewMode] = useState<'cards' | 'table' | 'board'>('cards');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Quick View
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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <div className="flex bg-slate-100 p-1 rounded-xl w-fit mb-4">
                        <button
                            onClick={() => { setIsPurchasedView(false); setCurrentPage(1); }}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${!isPurchasedView ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {t.leadsAvailable}
                        </button>
                        <button
                            onClick={() => { setIsPurchasedView(true); setCurrentPage(1); }}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${isPurchasedView ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {t.myLeadsTitle}
                        </button>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        {isPurchasedView ? t.myLeadsTitle : (t.title || 'Lead-Marktplatz')}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        {isPurchasedView ? t.leadsInPortfolio : `${leads.length} ${t.leadsAvailable}`}
                        {!isPurchasedView && (
                            <span className="ml-3 inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full ring-1 ring-inset ring-green-600/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                {t.live || 'LIVE'}
                            </span>
                        )}
                    </p>
                </div>

                <button
                    onClick={fetchLeads}
                    className="flex items-center justify-center gap-2 h-11 px-5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-primary transition-all font-bold shadow-sm"
                >
                    <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    {t.refresh}
                </button>
            </div>

            {/* Stats Dashboard for My Leads */}
            {isPurchasedView && stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.stats?.total || 'Gesamt'}</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.stats?.new || 'Neu'}</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">{stats.new}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-orange-500">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.stats?.inProgress || 'In Bearbeitung'}</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">{stats.inProgress}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-green-500">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.stats?.won || 'Gewonnen'}</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">{stats.won}</p>
                    </div>
                </div>
            )}

            {/* Filters Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-4 relative">
                        <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder={isPurchasedView ? (t.searchPurchasedPlaceholder || "Auftrag oder Kunde suchen...") : (t.searchPlaceholder || "Leads durchsuchen...")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-slate-50 border-none rounded-xl text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>

                    {!isPurchasedView && (
                        <>
                            <div className="lg:col-span-2 relative">
                                <MapPinIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <select
                                    value={selectedCanton}
                                    onChange={(e) => setSelectedCanton(e.target.value)}
                                    className="w-full h-12 pl-10 pr-8 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                >
                                    <option>{t.filterAllCantons}</option>
                                    {['Zürich', 'Bern', 'Luzern', 'Aargau', 'St. Gallen'].map(c => <option key={c}>{c}</option>)}
                                </select>
                                <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <div className="lg:col-span-2 relative">
                                <TagIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <select
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    className="w-full h-12 pl-10 pr-8 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                >
                                    <option>{t.filterAllServices}</option>
                                    {['Umzug', 'Reinigung', 'Maler', 'Bodenleger'].map(s => <option key={s}>{s}</option>)}
                                </select>
                                <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <div className="lg:col-span-2 hidden sm:block">
                                <div className="flex items-center gap-3 h-12 px-4 bg-slate-50 rounded-xl">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">{t.filterMaxPrice || 'Max. CHF'}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2000"
                                        step="50"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <span className="text-sm font-bold text-primary w-10 text-right">{maxPrice}</span>
                                </div>
                            </div>
                        </>
                    )}

                    <div className={`${isPurchasedView ? 'lg:col-span-8' : 'lg:col-span-2'} flex gap-3`}>
                        <div className="relative flex-1">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="w-full h-12 pl-4 pr-10 bg-slate-100 border-none rounded-xl text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                            >
                                <option>{t.sort?.newest || 'Neueste zuerst'}</option>
                                <option>{t.sort?.priceAsc || 'Preis aufsteigend'}</option>
                                <option>{t.sort?.priceDesc || 'Preis absteigend'}</option>
                            </select>
                            <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {isPurchasedView && (
                            <div className="flex bg-slate-100 p-1 rounded-xl h-12">
                                <button
                                    onClick={() => setPurchasedViewMode('cards')}
                                    className={`p-2 rounded-lg transition-all ${purchasedViewMode === 'cards' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Squares2X2Icon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setPurchasedViewMode('table')}
                                    className={`p-2 rounded-lg transition-all ${purchasedViewMode === 'table' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <TableCellsIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setPurchasedViewMode('board')}
                                    className={`p-2 rounded-lg transition-all ${purchasedViewMode === 'board' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <QueueListIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reset Filters Prompt */}
                {(searchTerm || (selectedCanton !== (language === 'de' ? 'Alle Kantone' : t.filterAllCantons)) || (selectedService !== (language === 'de' ? 'Alle Services' : t.filterAllServices)) || maxPrice < 2000) && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                        <button
                            onClick={resetFilters}
                            className="text-xs font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5"
                        >
                            <XMarkIcon className="w-3.5 h-3.5" />
                            {t.resetFilters}
                        </button>
                    </div>
                )}
            </div>

            {/* Content Section */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-72 bg-white border border-slate-100 rounded-3xl animate-pulse" />
                    ))}
                </div>
            ) : error ? (
                <div className="p-16 text-center bg-red-50 rounded-3xl border border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircleIcon className="w-8 h-8 text-red-600" />
                    </div>
                    <p className="text-red-900 font-bold text-lg mb-2">{language === 'de' ? 'Ein Fehler ist aufgetreten' : 'An error occurred'}</p>
                    <p className="text-red-600 text-sm mb-6 max-w-md mx-auto">{error}</p>
                    <button onClick={fetchLeads} className="bg-red-600 text-white font-black px-8 py-3 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95">
                        {t.refresh}
                    </button>
                </div>
            ) : paginatedRequests.length > 0 ? (
                <div className="space-y-10">
                    {isPurchasedView && purchasedViewMode === 'board' ? (
                        <KanbanBoard leads={filteredRequests as any} />
                    ) : isPurchasedView && purchasedViewMode === 'table' ? (
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.projects?.table?.lead || 'Auftrag'}</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.projects?.table?.customerLocation || 'Kunde'}</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.projects?.table?.date || 'Datum'}</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.projects?.table?.status || 'Status'}</th>
                                        <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.projects?.table?.action || 'Aktion'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paginatedRequests.map(lead => (
                                        <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">{lead.title}</div>
                                                <div className="text-xs text-slate-400 mt-0.5">{lead.service}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-700">{lead.customerName}</div>
                                                <div className="text-xs text-slate-400">{lead.location}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{formatDate(lead.date, language)}</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={lead.status} t={t} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => setQuickViewLeadId(lead._id)} className="text-primary font-bold text-sm hover:underline">{t.projects?.table?.open || 'Details'}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedRequests.map(lead => (
                                <div
                                    key={lead._id}
                                    onClick={() => setQuickViewLeadId(lead._id)}
                                    className="group bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-200 transition-all cursor-pointer relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-wider">{lead.service}</span>
                                        {!isPurchasedView && (
                                            <span className="text-lg font-black text-primary">{formatPrice(lead.price)}</span>
                                        )}
                                        {isPurchasedView && <StatusBadge status={lead.status} t={t} />}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem] leading-tight">{lead.title}</h3>
                                    <div className="space-y-3 text-sm text-slate-500 mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                                <MapPinIcon className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">{lead.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                                <CalendarDaysIcon className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">{formatDate(lead.date, language)}</span>
                                        </div>
                                        {isPurchasedView && (
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
                                                    <UserIcon className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-slate-700">{lead.customerName}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                                        <div className="flex items-center gap-2">
                                            {!isPurchasedView && (
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                    <CheckCircleIcon className="w-3.5 h-3.5" />
                                                    {t.card?.available || 'Verfügbar'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 font-black text-sm text-primary group-hover:gap-2.5 transition-all">
                                            {t.card?.view || 'Details'}
                                            <ChevronRightIcon className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination Bar */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-3 pt-6">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                className="w-12 h-12 flex items-center justify-center border border-slate-200 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                            >
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-12 h-12 rounded-2xl font-black text-sm transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-xl shadow-primary-500/30' : 'hover:bg-slate-100 text-slate-600'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                className="w-12 h-12 flex items-center justify-center border border-slate-200 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
                        <MagnifyingGlassIcon className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{isPurchasedView ? (t.empty?.noPurchasedTitle || 'Keine gekauften Leads') : (t.empty?.noResultsTitle || 'Keine Leads gefunden')}</h3>
                    <p className="text-slate-500 max-w-sm mb-8">{isPurchasedView ? (t.empty?.noPurchasedDesc || 'Kaufen Sie Leads, um hier Ihre Aufträge zu verwalten.') : (t.empty?.noResultsDesc || 'Passen Sie Ihre Filter an oder schauen Sie später wieder vorbei.')}</p>
                    <button
                        onClick={isPurchasedView ? () => setIsPurchasedView(false) : resetFilters}
                        className="px-8 py-3 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary-500/20 active:scale-95 transition-all"
                    >
                        {isPurchasedView ? (t.empty?.noPurchasedButton || 'Leads entdecken') : t.resetFilters}
                    </button>
                </div>
            )}

            {/* Modal for Details */}
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
