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
        <div className="bg-[#020617] min-h-screen text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-400 font-sans pb-32">
            {/* Immersive Background Aura */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-emerald-600/10 rounded-full blur-[160px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-20%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '3s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] opacity-50"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-12 py-16">
                {/* Luxury Header */}
                <div className="relative mb-24">
                    <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-16">
                        <div className="space-y-10 max-w-4xl">
                            <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400 drop-shadow-sm">System Live // {leads.length} Dossiers found</span>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-8xl sm:text-[10rem] font-black text-white tracking-tighter leading-[0.75] italic">
                                    {isPurchasedView ? 'Dossier' : 'Market'}
                                    <span className="text-emerald-500 not-italic">.</span>
                                </h1>
                                <p className="text-2xl sm:text-3xl text-slate-400 font-light leading-snug max-w-3xl border-l-2 border-slate-800 pl-10 py-2">
                                    {isPurchasedView ? t.leadsInPortfolio : 'Strategischer Zugriff auf exklusive Projekt-Daten und High-Value Marktopportunitäten.'}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch gap-6 w-full xl:w-auto">
                            <div className="flex bg-white/[0.03] backdrop-blur-3xl p-2 rounded-[2.5rem] border border-white/10 shadow-2xl ring-1 ring-white/5">
                                <button
                                    onClick={() => { setIsPurchasedView(false); setCurrentPage(1); }}
                                    className={`flex items-center justify-center gap-4 px-12 py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.25em] transition-all duration-700 ${!isPurchasedView ? 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.15)] scale-105' : 'text-slate-500 hover:text-white'}`}
                                >
                                    <Squares2X2Icon className="w-4 h-4" />
                                    {t.leadsAvailable}
                                </button>
                                <button
                                    onClick={() => { setIsPurchasedView(true); setCurrentPage(1); }}
                                    className={`flex items-center justify-center gap-4 px-12 py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.25em] transition-all duration-700 ${isPurchasedView ? 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.15)] scale-105' : 'text-slate-500 hover:text-white'}`}
                                >
                                    <QueueListIcon className="w-4 h-4" />
                                    {t.myLeadsTitle}
                                </button>
                            </div>

                            <button
                                onClick={fetchLeads}
                                className="h-20 w-20 flex items-center justify-center bg-white/[0.03] border border-white/10 text-white rounded-[2.5rem] hover:bg-white/[0.08] transition-all duration-500 group active:scale-90 shadow-xl"
                            >
                                <ArrowPathIcon className={`w-8 h-8 group-hover:rotate-180 transition-transform duration-1000 ${loading ? 'animate-spin text-emerald-500' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Bento Stats area for purchased leads */}
                    {isPurchasedView && stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'TOTAL_ASSETS', value: stats.total, color: 'emerald', icon: Squares2X2Icon },
                                { label: 'LIVE_ALERTS', value: stats.new, color: 'blue', icon: BellIcon },
                                { label: 'PROCESS_UNITS', value: stats.inProgress, color: 'amber', icon: ChatBubbleLeftRightIcon },
                                { label: 'SUCCESS_RATE', value: stats.won, color: 'emerald', icon: TestsiegerIcon }
                            ].map((stat, i) => (
                                <div key={i} className="group relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/5 shadow-2xl hover:border-emerald-500/30 transition-all duration-700">
                                    <div className="relative z-10 flex flex-col justify-between h-full">
                                        <div className="flex items-start justify-between mb-10">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{stat.label}</p>
                                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                                                <stat.icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <h4 className="text-6xl font-black text-white tracking-tighter mb-2 group-hover:translate-x-2 transition-transform duration-700">
                                            {stat.value.toString().padStart(2, '0')}
                                        </h4>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className={`h-full bg-${stat.color}-500 w-2/3 group-hover:w-full transition-all duration-1000`}></div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sophisticated Filter Bar */}
                    <div className="sticky top-8 z-40">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[3rem] blur-2xl opacity-50"></div>
                        <div className="relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-4 shadow-2xl flex flex-col xl:flex-row gap-6 items-center">
                            <div className="relative flex-grow w-full group">
                                <MagnifyingGlassIcon className="w-7 h-7 text-slate-600 absolute left-8 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors duration-500" />
                                <input
                                    type="text"
                                    placeholder={t.searchPlaceholder || "SYSTEM_SCAN: Dienstleistung, Ort..."}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-16 pl-20 pr-10 bg-white/[0.03] border-none rounded-[2.2rem] text-white font-medium placeholder:text-slate-600 focus:ring-1 focus:ring-emerald-500/30 transition-all text-lg"
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                                {!isPurchasedView && (
                                    <>
                                        <div className="relative flex-grow sm:flex-grow-0 group">
                                            <select
                                                value={selectedCanton}
                                                onChange={(e) => setSelectedCanton(e.target.value)}
                                                className="h-16 pl-8 pr-16 bg-white/[0.03] border-none rounded-[2rem] text-sm font-black text-slate-300 appearance-none focus:ring-1 focus:ring-emerald-500/30 cursor-pointer min-w-[200px]"
                                            >
                                                <option>{t.filterAllCantons}</option>
                                                {['Zürich', 'Bern', 'Luzern', 'Aargau', 'St. Gallen'].map(c => <option key={c}>{c}</option>)}
                                            </select>
                                            <ChevronUpDownIcon className="w-5 h-5 text-slate-600 absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-emerald-500 transition-colors" />
                                        </div>
                                        <div className="relative flex-grow sm:flex-grow-0 group">
                                            <select
                                                value={selectedService}
                                                onChange={(e) => setSelectedService(e.target.value)}
                                                className="h-16 pl-8 pr-16 bg-white/[0.03] border-none rounded-[2rem] text-sm font-black text-slate-300 appearance-none focus:ring-1 focus:ring-emerald-500/30 cursor-pointer min-w-[200px]"
                                            >
                                                <option>{t.filterAllServices}</option>
                                                {['Umzug', 'Reinigung', 'Maler', 'Bodenleger'].map(s => <option key={s}>{s}</option>)}
                                            </select>
                                            <ChevronUpDownIcon className="w-5 h-5 text-slate-600 absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-emerald-500 transition-colors" />
                                        </div>
                                    </>
                                )}

                                <div className="h-16 flex items-center bg-white/[0.03] p-2 rounded-[2rem] gap-2">
                                    <button onClick={() => setPurchasedViewMode('cards')} className={`w-12 h-12 flex items-center justify-center rounded-[1.2rem] transition-all duration-500 ${purchasedViewMode === 'cards' ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                                        <Squares2X2Icon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => setPurchasedViewMode('table')} className={`w-12 h-12 flex items-center justify-center rounded-[1.2rem] transition-all duration-500 ${purchasedViewMode === 'table' ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                                        <TableCellsIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Grid - Cyber Luxury Cards */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 min-h-[520px] animate-pulse relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent"></div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="py-32 flex flex-col items-center justify-center bg-red-500/5 rounded-[4rem] border border-red-500/20 text-center">
                            <XMarkIcon className="w-20 h-20 text-red-500 mb-8" />
                            <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">INTEGRITY_COMPROMISED</h3>
                            <p className="text-xl text-slate-400 mb-10 max-w-lg">{error}</p>
                            <button onClick={fetchLeads} className="px-12 py-5 bg-white text-black font-black rounded-[2rem] hover:scale-105 transition-transform active:scale-95">RETRY_PROTOCOL</button>
                        </div>
                    ) : paginatedRequests.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                            {paginatedRequests.map(lead => (
                                <div
                                    key={lead._id}
                                    onClick={() => setQuickViewLeadId(lead._id)}
                                    className="group relative bg-[#0a0a0a] border border-white/[0.06] rounded-[4rem] p-12 hover:border-emerald-500/40 hover:shadow-[0_40px_100px_-20px_rgba(16,185,129,0.2)] transition-all duration-1000 cursor-pointer overflow-hidden flex flex-col min-h-[520px] hover:-translate-y-4"
                                >
                                    {/* High Contrast Accents */}
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="space-y-3">
                                            <span className="px-6 py-2.5 bg-white text-black text-[10px] font-black rounded-full uppercase tracking-[0.3em]">{lead.service}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none">SECURE_DOSSIER</span>
                                            </div>
                                        </div>
                                        {!isPurchasedView && (
                                            <div className="p-6 bg-emerald-500/5 rounded-[2.5rem] border border-emerald-500/10 backdrop-blur-xl group-hover:bg-emerald-500 group-hover:text-black transition-all duration-700">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-center mb-1 transition-colors">VALUATION</p>
                                                <p className="text-4xl font-black tracking-tighter leading-none transition-colors">{formatPrice(lead.price)}</p>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-4xl sm:text-5xl font-black text-white mb-10 leading-[0.9] tracking-tighter group-hover:text-emerald-400 transition-colors duration-700 line-clamp-3">
                                        {lead.title}
                                    </h3>

                                    <div className="space-y-6 flex-grow mb-16">
                                        <div className="flex items-center gap-6 group/item">
                                            <div className="w-16 h-16 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 group-hover:border-emerald-500/30 transition-all">
                                                <MapPinIcon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">REGION_ID</p>
                                                <p className="text-xl font-bold text-white tracking-tight">{lead.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 group-hover:border-emerald-500/30 transition-all">
                                                <CalendarDaysIcon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">RECORDED_AT</p>
                                                <p className="text-xl font-bold text-white tracking-tight">{formatDate(lead.date, language)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex -space-x-4">
                                                {[1, 2, 3].map(p => (
                                                    <div key={p} className="w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-slate-800 flex items-center justify-center shadow-lg">
                                                        <UserIcon className="w-4 h-4 text-slate-500" />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-xs font-black text-slate-500 tracking-widest uppercase">VERIFIED</span>
                                        </div>

                                        <div className="px-10 py-5 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all duration-700 group-hover:bg-emerald-500 shadow-2xl flex items-center gap-4">
                                            {language === 'de' ? 'ÖFFNEN' : 'OPEN'}
                                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>

                                    {/* Glass reflection effect */}
                                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent group-hover:left-full transition-all duration-[1500ms] skew-x-[-20deg]"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-40 flex flex-col items-center justify-center bg-white/[0.02] rounded-[5rem] border-2 border-dashed border-white/5 text-center">
                            <div className="w-32 h-32 bg-white/[0.03] rounded-full flex items-center justify-center mb-12 shadow-inner border border-white/5">
                                <MagnifyingGlassIcon className="w-14 h-14 text-slate-700" />
                            </div>
                            <h3 className="text-5xl font-black text-white mb-6 tracking-tighter">NULL_RESULTS</h3>
                            <p className="text-2xl text-slate-500 font-light max-w-xl mb-16 px-6 leading-relaxed">System scan complete. No dossiers match your current filter parameters. Adjust your strategy.</p>
                            <button onClick={resetFilters} className="px-16 py-6 bg-white text-black font-black rounded-full hover:bg-emerald-500 transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">RESET_SYSTEM</button>
                        </div>
                    )}

                    {/* Mechanical Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 py-20">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="h-20 w-20 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-[2.5rem] text-slate-500 hover:text-white hover:border-emerald-500/50 transition-all disabled:opacity-5"
                            >
                                <ChevronLeftIcon className="w-8 h-8" />
                            </button>
                            <div className="flex items-center gap-3">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className={`h-20 w-20 rounded-[2.5rem] font-black text-lg p-0 transition-all duration-700 ${currentPage === i + 1 ? 'bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.15)] scale-110' : 'bg-white/[0.03] border border-white/10 text-slate-500 hover:text-white'}`}
                                    >
                                        {(i + 1).toString().padStart(2, '0')}
                                    </button>
                                ))}
                            </div>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="h-20 w-20 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-[2.5rem] text-slate-500 hover:text-white hover:border-emerald-500/50 transition-all disabled:opacity-5"
                            >
                                <ChevronRightIcon className="w-8 h-8" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Secure Modal context */}
                {quickViewLeadId && (
                    <LeadQuickViewModal
                        leadId={quickViewLeadId}
                        isOpen={!!quickViewLeadId}
                        onClose={() => setQuickViewLeadId(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default PartnerRequestsPage;
