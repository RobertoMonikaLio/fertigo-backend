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
    const t = (translations[language] as any)?.partner?.requests || (translations['de'] as any).partner.requests;

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header Section - More Premium & Strategic */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-12">
                <div className="space-y-4">
                    <div className="inline-flex p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl border border-slate-200/50">
                        <button
                            onClick={() => { setIsPurchasedView(false); setCurrentPage(1); }}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${!isPurchasedView ? 'bg-white shadow-lg shadow-slate-200/50 text-slate-900 border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <Squares2X2Icon className="w-4 h-4" />
                            {t.leadsAvailable}
                        </button>
                        <button
                            onClick={() => { setIsPurchasedView(true); setCurrentPage(1); }}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${isPurchasedView ? 'bg-white shadow-lg shadow-slate-200/50 text-slate-900 border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <QueueListIcon className="w-4 h-4" />
                            {t.myLeadsTitle}
                        </button>
                    </div>

                    <div>
                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            {isPurchasedView ? t.myLeadsTitle : (t.title || 'Lead-Marktplatz')}
                        </h1>
                        <p className="text-lg text-slate-500 mt-2 flex items-center gap-2">
                            {isPurchasedView ? t.leadsInPortfolio : `${leads.length} ${t.leadsAvailable}`}
                            {!isPurchasedView && (
                                <span className="inline-flex items-center gap-2 ml-2 text-[10px] font-black tracking-tighter text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    {t.live || 'LIVE UPDATE'}
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchLeads}
                        className="group flex items-center justify-center gap-3 h-14 px-8 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-sm shadow-xl shadow-slate-900/10 active:scale-95"
                    >
                        <ArrowPathIcon className={`w-5 h-5 transition-transform duration-700 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
                        {t.refresh || 'Aktualisieren'}
                    </button>
                </div>
            </div>

            {/* Stats Dashboard for My Leads */}
            {isPurchasedView && stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: t.stats?.total || 'Gesamt', value: stats.total, color: 'slate' },
                        { label: t.stats?.new || 'Neu', value: stats.new, color: 'blue' },
                        { label: t.stats?.inProgress || 'In Bearbeitung', value: stats.inProgress, color: 'amber' },
                        { label: t.stats?.won || 'Gewonnen', value: stats.won, color: 'emerald' }
                    ].map((stat, idx) => (
                        <div key={idx} className="group bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <div className="flex items-end justify-between">
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                                <div className={`w-10 h-10 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                                    {idx === 0 ? <Squares2X2Icon className="w-5 h-5" /> : idx === 1 ? <BellIcon className="w-5 h-5" /> : idx === 2 ? <ChatBubbleLeftRightIcon className="w-5 h-5" /> : <CheckCircleIcon className="w-5 h-5" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Filters Section - Modern & Clean */}
            <div className="bg-slate-50/50 backdrop-blur-md rounded-[2rem] border border-slate-200 p-8 mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                    <div className="lg:col-span-4 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{isPurchasedView ? 'Suche' : 'Stichwort-Suche'}</label>
                        <div className="relative group">
                            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder={isPurchasedView ? (t.searchPurchasedPlaceholder || "Auftrag oder Kunde suchen...") : (t.searchPlaceholder || "Maler, Umzug, Zürich...")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 focus:border-primary focus:ring-0 transition-all font-bold placeholder:text-slate-300 shadow-sm"
                            />
                        </div>
                    </div>

                    {!isPurchasedView && (
                        <>
                            <div className="lg:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{language === 'de' ? 'Region' : 'Region'}</label>
                                <div className="relative">
                                    <MapPinIcon className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        value={selectedCanton}
                                        onChange={(e) => setSelectedCanton(e.target.value)}
                                        className="w-full h-14 pl-11 pr-10 bg-white border-2 border-slate-100 rounded-2xl text-sm font-black text-slate-700 appearance-none focus:border-primary focus:ring-0 cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                                    >
                                        <option>{t.filterAllCantons}</option>
                                        {['Zürich', 'Bern', 'Luzern', 'Aargau', 'St. Gallen', 'Genf', 'Basel'].map(c => <option key={c}>{c}</option>)}
                                    </select>
                                    <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{language === 'de' ? 'Kategorie' : 'Category'}</label>
                                <div className="relative">
                                    <TagIcon className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        value={selectedService}
                                        onChange={(e) => setSelectedService(e.target.value)}
                                        className="w-full h-14 pl-11 pr-10 bg-white border-2 border-slate-100 rounded-2xl text-sm font-black text-slate-700 appearance-none focus:border-primary focus:ring-0 cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                                    >
                                        <option>{t.filterAllServices}</option>
                                        {['Umzug', 'Reinigung', 'Maler', 'Bodenleger', 'Gartenbau', 'Elektriker'].map(s => <option key={s}>{s}</option>)}
                                    </select>
                                    <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>

                            <div className="lg:col-span-2 hidden sm:block space-y-3">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.filterMaxPrice || 'Max. CHF'}</label>
                                    <span className="text-xs font-black text-primary px-2 py-0.5 bg-primary/10 rounded-md">CHF {maxPrice}</span>
                                </div>
                                <div className="h-10 flex items-center px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="2000"
                                        step="50"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className={`${isPurchasedView ? 'lg:col-span-8' : 'lg:col-span-2'} flex gap-3 h-14 items-end`}>
                        <div className="flex-1 relative">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="w-full h-14 pl-4 pr-10 bg-white border-2 border-slate-100 rounded-2xl text-xs font-black text-slate-700 appearance-none focus:border-primary focus:ring-0 cursor-pointer shadow-sm"
                            >
                                <option>{t.sort?.newest || 'Neueste zuerst'}</option>
                                <option>{t.sort?.priceAsc || 'Preis aufsteigend'}</option>
                                <option>{t.sort?.priceDesc || 'Preis absteigend'}</option>
                            </select>
                            <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {isPurchasedView && (
                            <div className="flex bg-slate-200/50 p-1.5 rounded-2xl h-14 border border-slate-200">
                                <button
                                    onClick={() => setPurchasedViewMode('cards')}
                                    className={`px-3 rounded-xl transition-all ${purchasedViewMode === 'cards' ? 'bg-white shadow-md text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Squares2X2Icon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setPurchasedViewMode('table')}
                                    className={`px-3 rounded-xl transition-all ${purchasedViewMode === 'table' ? 'bg-white shadow-md text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <TableCellsIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setPurchasedViewMode('board')}
                                    className={`px-3 rounded-xl transition-all ${purchasedViewMode === 'board' ? 'bg-white shadow-md text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <QueueListIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reset Filters Prompt */}
                {(searchTerm || (selectedCanton !== (language === 'de' ? 'Alle Kantone' : t.filterAllCantons)) || (selectedService !== (language === 'de' ? 'Alle Services' : t.filterAllServices)) || maxPrice < 2000) && (
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200/50">
                        <span className="text-xs font-bold text-slate-400 italic">Filter aktiv</span>
                        <button
                            onClick={resetFilters}
                            className="text-xs font-black text-primary hover:text-primary-700 transition-colors flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-xl border border-primary/10"
                        >
                            <XMarkIcon className="w-4 h-4" />
                            {t.resetFilters || 'Filter zurücksetzen'}
                        </button>
                    </div>
                )}
            </div>

            {/* Content Section - The New Cards Look */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-96 bg-white border border-slate-100 rounded-[2.5rem] animate-pulse" />
                    ))}
                </div>
            ) : error ? (
                <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-red-500/5">
                    <div className="w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-red-100">
                        <XCircleIcon className="w-10 h-10 text-red-600 animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-3">{language === 'de' ? 'Ups! Etwas lief schief' : 'An error occurred'}</h2>
                    <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto">{error}</p>
                    <button onClick={fetchLeads} className="bg-slate-900 text-white font-black px-12 py-4 rounded-3xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 active:scale-95 flex items-center gap-3 mx-auto">
                        <ArrowPathIcon className="w-5 h-5" />
                        {t.refresh || 'Erneut versuchen'}
                    </button>
                </div>
            ) : paginatedRequests.length > 0 ? (
                <div className="space-y-16">
                    {isPurchasedView && purchasedViewMode === 'board' ? (
                        <KanbanBoard leads={filteredRequests as any} />
                    ) : isPurchasedView && purchasedViewMode === 'table' ? (
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/80 border-b border-slate-200">
                                    <tr>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.projects?.table?.lead || 'Auftrag'}</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.projects?.table?.customerLocation || 'Kunde'}</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.projects?.table?.date || 'Datum'}</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.projects?.table?.status || 'Status'}</th>
                                        <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.projects?.table?.action || 'Aktion'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paginatedRequests.map(lead => (
                                        <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="font-black text-slate-900 group-hover:text-primary transition-colors">{lead.title}</div>
                                                <div className="text-[10px] font-black uppercase text-slate-400 mt-1 tracking-widest">{lead.service}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-slate-700">{lead.customerName}</div>
                                                <div className="text-xs text-slate-400">{lead.location}</div>
                                            </td>
                                            <td className="px-8 py-6 text-sm font-bold text-slate-500">{formatDate(lead.date, language)}</td>
                                            <td className="px-8 py-6">
                                                <StatusBadge status={lead.status} t={t} />
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button onClick={() => setQuickViewLeadId(lead._id)} className="bg-slate-100 hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl font-black text-xs text-slate-600 transition-all uppercase tracking-widest shadow-sm">
                                                    {t.projects?.table?.open || 'Details'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {paginatedRequests.map(lead => (
                                <div
                                    key={lead._id}
                                    onClick={() => setQuickViewLeadId(lead._id)}
                                    className="group relative bg-white border border-slate-200 rounded-[3rem] p-8 hover:shadow-[0_20px_60px_-15px_rgba(22,163,74,0.12)] hover:border-primary/30 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
                                >
                                    {/* Left Accent Bar */}
                                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary/20 group-hover:bg-primary group-hover:scale-y-125 transition-all duration-500 rounded-r-full"></div>

                                    <div className="flex justify-between items-start mb-6">
                                        <span className="px-4 py-1.5 bg-slate-900 text-white text-[9px] font-black rounded-xl uppercase tracking-[0.15em]">{lead.service}</span>
                                        {!isPurchasedView && (
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">Preis</span>
                                                <span className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-primary transition-colors">{formatPrice(lead.price)}</span>
                                            </div>
                                        )}
                                        {isPurchasedView && <StatusBadge status={lead.status} t={t} />}
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:translate-x-1 transition-transform duration-300 line-clamp-2 min-h-[4rem] leading-[1.15] tracking-tight">
                                        {lead.title}
                                    </h3>

                                    <div className="space-y-4 mb-10 flex-grow">
                                        <div className="flex items-center gap-4 group/item">
                                            <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-all duration-300 border border-slate-100">
                                                <MapPinIcon className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standort</span>
                                                <span className="font-bold text-slate-700">{lead.location}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 group/item">
                                            <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-all duration-300 border border-slate-100">
                                                <CalendarDaysIcon className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Datum</span>
                                                <span className="font-bold text-slate-700">{formatDate(lead.date, language)}</span>
                                            </div>
                                        </div>

                                        {isPurchasedView && (
                                            <div className="flex items-center gap-4 group/item">
                                                <div className="w-11 h-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary-500 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 border border-primary/10">
                                                    <UserIcon className="w-5 h-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kunde</span>
                                                    <span className="font-black text-slate-900">{lead.customerName}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <div className="flex items-center gap-3">
                                            {!isPurchasedView && (
                                                <span className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.1em] text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                    {t.card?.available || 'AKTIV'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 px-6 py-3 bg-slate-50 group-hover:bg-primary group-hover:text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-slate-600 transition-all duration-300">
                                            {t.card?.view || 'Details'}
                                            <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>

                                    {/* Subtle Gradient Hover Effect */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[5rem] translate-x-32 -translate-y-32 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-700 ease-out"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination Bar - Premium Style */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-6 pt-12">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="w-14 h-14 flex items-center justify-center border-2 border-slate-100 bg-white text-slate-400 rounded-2xl shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all active:scale-90"
                            >
                                <ChevronLeftIcon className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-3 bg-white p-2 rounded-[2rem] border-2 border-slate-100 shadow-sm">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className={`w-12 h-12 rounded-[1.2rem] font-black text-sm transition-all duration-300 ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'hover:bg-slate-50 text-slate-500'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="w-14 h-14 flex items-center justify-center border-2 border-slate-100 bg-white text-slate-400 rounded-2xl shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all active:scale-90"
                            >
                                <ChevronRightIcon className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 px-10 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-center shadow-sm">
                    <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] flex items-center justify-center shadow-inner mb-8 border border-slate-100 group">
                        <MagnifyingGlassIcon className="w-12 h-12 text-slate-200 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">{isPurchasedView ? (t.empty?.noPurchasedTitle || 'Ihr Portfolio ist noch leer') : (t.empty?.noResultsTitle || 'Keine passenden Leads')}</h3>
                    <p className="text-slate-500 text-lg max-w-sm mb-12 leading-relaxed font-medium">{isPurchasedView ? (t.empty?.noPurchasedDesc || 'Sobald Sie Leads auf dem Marktplatz kaufen, werden diese hier übersichtlich für Sie aufgelistet.') : (t.empty?.noResultsDesc || 'Leider entsprechen aktuell keine Leads Ihren Filtereinstellungen. Versuchen Sie es mit einer breiteren Suche.')}</p>
                    <button
                        onClick={isPurchasedView ? () => setIsPurchasedView(false) : resetFilters}
                        className="group px-12 py-5 bg-slate-900 text-white font-black rounded-3xl shadow-2xl shadow-slate-900/20 active:scale-95 transition-all flex items-center gap-3 hover:bg-slate-800"
                    >
                        {isPurchasedView ? (t.empty?.noPurchasedButton || 'Marktplatz erkunden') : t.resetFilters}
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
