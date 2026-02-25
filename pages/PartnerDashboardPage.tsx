

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowTrendingUpIcon, BanknotesIcon, EyeIcon, TestsiegerIcon,
    BellIcon, ChatBubbleLeftRightIcon, BanknotesIcon as StatusBanknotesIcon,
    TestsiegerIcon as StatusTestsiegerIcon, XCircleIcon,
    TagIcon,
    PaperAirplaneIcon
} from '../components/icons';
import { LeadQuickViewModal } from '../components/LeadQuickViewModal';
import { useAppContext } from './AppContext';
import { translations } from '../components/translations';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_provider');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// --- Skeleton components ---
const StatSkeleton = () => (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse">
        <div className="w-12 h-12 rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
            <div className="h-6 bg-slate-200 rounded w-16" />
            <div className="h-4 bg-slate-100 rounded w-28" />
        </div>
    </div>
);
const LeadSkeleton = () => (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse space-y-3">
        <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-200 rounded-xl hidden sm:block flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
            </div>
            <div className="h-10 w-20 bg-slate-200 rounded-xl" />
        </div>
    </div>
);

// --- Types ---
interface DashboardLead {
    _id: string;
    title: string;
    service: string;
    customerName?: string;
    location: string;
    date: string;
    status: string;
    price: number;
    budget?: string;
    qualityScore: number;
    description?: string;
    details?: { label: string; value: string }[];
    customerInfo?: any;
    purchaseCount: number;
}

interface DashboardStats {
    wonLeads: number;
    successRate: string;
    totalPurchased: number;
    totalSpent: string;
}

interface ProviderInfo {
    _id: string;
    name: string;
    email: string;
    balance: number;
}

// --- Sub-components ---
const StatCard: React.FC<{ icon: React.ReactNode, value: string, label: string }> = ({ icon, value, label }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-xl border border-slate-200 bg-card-light p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-card-dark">
        <div className="flex w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-500/20">
            {icon}
        </div>
        <div>
            <p className="text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark">{value}</p>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
        </div>
    </div>
);

type Status = 'Neu' | 'Kontaktiert' | 'Angebot gesendet' | 'In Verhandlung' | 'Gewonnen' | 'Verloren / Abgelehnt';

const statusConfig: { [key in Status]: { icon: React.ReactNode; color: string; bgColor: string; key: string } } = {
    'Neu': { icon: <BellIcon className="w-4 h-4" />, color: 'text-blue-800', bgColor: 'bg-blue-100', key: 'Neu' },
    'Kontaktiert': { icon: <ChatBubbleLeftRightIcon className="w-4 h-4" />, color: 'text-cyan-800', bgColor: 'bg-cyan-100', key: 'Kontaktiert' },
    'Angebot gesendet': { icon: <PaperAirplaneIcon className="w-4 h-4" />, color: 'text-purple-800', bgColor: 'bg-purple-100', key: 'Angebot' },
    'In Verhandlung': { icon: <StatusBanknotesIcon className="w-4 h-4" />, color: 'text-orange-800', bgColor: 'bg-orange-100', key: 'Verhandlung' },
    'Gewonnen': { icon: <StatusTestsiegerIcon className="w-4 h-4" />, color: 'text-green-800', bgColor: 'bg-green-100', key: 'Gewonnen' },
    'Verloren / Abgelehnt': { icon: <XCircleIcon className="w-4 h-4" />, color: 'text-red-800', bgColor: 'bg-red-100', key: 'Verloren' },
};

const StatusBadge: React.FC<{ status: string, t: any }> = ({ status, t }) => {
    const config = statusConfig[status as Status] || statusConfig['Neu'];
    const title = t.projects.allStatuses === 'Alle Status' || t.projects.allStatuses === 'All Statuses'
        ? (status === 'Verloren / Abgelehnt' ? 'Verloren' : status)
        : (config.key === 'Neu' ? 'Neu' : config.key); // This needs careful mapping if we want full translation of statuses

    // Fallback if we don't have a direct map for statuses in translations yet
    // For now let's use the config key or a more robust mapping from partner.requests.stats or similar if available
    const statusLabel = status === 'Verloren / Abgelehnt' ? 'Verloren' : status;

    return (
        <span className={`inline-flex items-center gap-2 px-2.5 py-1 text-xs font-semibold rounded-full ${config.bgColor} ${config.color}`}>
            {config.icon}
            {statusLabel}
        </span>
    );
};


const PartnerDashboardPage: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language]?.partner?.dashboard || translations['de'].partner.dashboard;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [purchasedLeads, setPurchasedLeads] = useState<DashboardLead[]>([]);
    const [availableLeads, setAvailableLeads] = useState<DashboardLead[]>([]);
    const [provider, setProvider] = useState<ProviderInfo | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // Quick View
    const [quickViewLeadId, setQuickViewLeadId] = useState<string | null>(null);

    const fetchDashboard = useCallback(async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/partner/dashboard`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error(language === 'de' ? 'Daten konnten nicht geladen werden' : 'Data could not be loaded');
            const data = await response.json();
            setStats(data.stats);
            setPurchasedLeads(data.purchasedLeads);
            setAvailableLeads(data.availableLeads);
            setProvider(data.provider);
            setLastUpdated(new Date());
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [language]);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);


    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(language === 'de' ? 'de-CH' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    // --- LOADING STATE ---
    if (loading) {
        return (
            <div className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-2">
                    <div className="h-8 bg-slate-200 rounded w-72 animate-pulse" />
                    <div className="h-5 bg-slate-100 rounded w-96 animate-pulse" />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => <StatSkeleton key={i} />)}
                </div>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => <LeadSkeleton key={i} />)}
                </div>
            </div>
        );
    }

    // --- ERROR STATE ---
    if (error) {
        const errorTitle = language === 'de' ? 'Fehler beim Laden' : 'Error loading';
        const retryText = language === 'de' ? 'Erneut versuchen' : 'Try again';
        return (
            <div className="mx-auto max-w-4xl">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <p className="text-red-600 font-bold text-lg mb-2">{errorTitle}</p>
                    <p className="text-red-500 mb-4">{error}</p>
                    <button onClick={() => { setLoading(true); fetchDashboard(); }} className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700">
                        {retryText}
                    </button>
                </div>
            </div>
        );
    }

    const greeting = (() => {
        const h = new Date().getHours();
        if (h < 12) return t.greeting.morning;
        if (h < 18) return t.greeting.day;
        return t.greeting.evening;
    })();

    const partnerName = provider?.name?.split(' ')?.[0] || 'Partner';

    return (
        <div className="mx-auto max-w-4xl">
            {/* PageHeading */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex flex-col gap-1 text-left">
                    <p className="text-2xl sm:text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">{greeting}, {partnerName}</p>
                    <p className="text-sm sm:text-base font-normal text-slate-600 dark:text-slate-400 max-w-sm sm:max-w-none">
                        <span className="hidden sm:inline">{t.summary}</span>
                        <span className="sm:hidden">{t.summary?.split('.')[0] + '.'}</span>
                        {lastUpdated && (
                            <span className="block sm:inline sm:ml-2 text-green-600 font-semibold mt-1 sm:mt-0">● {t.liveData}</span>
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <button onClick={() => { setLoading(true); fetchDashboard(); }} className="flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-slate-100 sm:bg-slate-200 px-4 sm:px-5 text-sm sm:text-base font-bold text-slate-600 sm:text-text-light hover:bg-slate-200 sm:hover:bg-slate-300 dark:bg-slate-800 dark:text-text-dark dark:hover:bg-slate-700 transition-colors shadow-sm sm:shadow-none">
                        ↻ <span className="hidden sm:inline">{t.refresh}</span>
                    </button>
                    <Link to="/partner/requests" className="flex-1 sm:flex-none flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 sm:px-5 text-sm sm:text-base font-bold text-white hover:bg-primary-700 transition-colors shadow-sm sm:shadow-none">
                        <span className="truncate">{t.searchLeads}</span>
                    </Link>
                </div>
            </div>

            {/* Stats Section */}
            <div className="mt-6 sm:mt-8 flex sm:grid flex-nowrap overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-hide snap-x gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="min-w-[160px] sm:min-w-0 flex-shrink-0 snap-start">
                    <StatCard icon={<TestsiegerIcon className="size-6" />} value={String(stats?.wonLeads ?? 0)} label={t.stats.wonLeads} />
                </div>
                <div className="min-w-[160px] sm:min-w-0 flex-shrink-0 snap-start">
                    <StatCard icon={<ArrowTrendingUpIcon className="size-6" />} value={stats?.successRate ?? '0%'} label={t.stats.successRate} />
                </div>
                <div className="min-w-[160px] sm:min-w-0 flex-shrink-0 snap-start">
                    <StatCard icon={<EyeIcon className="size-6" />} value={String(stats?.totalPurchased ?? 0)} label={t.stats.purchasedLeads} />
                </div>
                <div className="min-w-[160px] sm:min-w-0 flex-shrink-0 snap-start">
                    <StatCard icon={<BanknotesIcon className="size-6" />} value={`CHF ${provider?.balance?.toFixed(2) ?? '0.00'}`} label={t.stats.balance} />
                </div>
            </div>

            {/* Lead-Marktplatz Section */}
            <div className="mt-10">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-bold text-green-600 uppercase tracking-wider">{t.marketplace.title.split(' ')[0]} Marktplatz</span>
                        </div>
                        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">{t.marketplace.title}</h2>
                    </div>
                    <Link
                        to="/partner/requests"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                    >
                        {t.marketplace.allLeads}
                        <PaperAirplaneIcon className="w-4 h-4" />
                    </Link>
                </div>

                {availableLeads.length > 0 ? (
                    <div className="space-y-3">
                        {availableLeads.slice(0, 5).map((lead, index) => (
                            <div
                                key={lead._id}
                                onClick={() => setQuickViewLeadId(lead._id)}
                                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-500 p-4 sm:p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/10"
                            >
                                {index < 2 && (
                                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                                        {language === 'de' ? 'NEU' : 'NEW'}
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="hidden sm:flex w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/50 dark:to-primary-800/30 rounded-xl items-center justify-center flex-shrink-0">
                                        <TagIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start sm:items-center gap-2 flex-wrap mb-1">
                                            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                {lead.title}
                                            </h3>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
                                                {lead.service}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {lead.location}
                                            </span>
                                            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">|</span>
                                            <span className="hidden sm:flex items-center gap-1">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {formatDate(lead.date)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800 mt-2 sm:mt-0">
                                        <div className="flex-1 sm:flex-none text-left sm:text-right">
                                            <div className="text-lg sm:text-2xl font-black text-primary-600 dark:text-primary-400">
                                                CHF {lead.price.toFixed(0)}
                                            </div>
                                            <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{t.marketplace.leadPrice}</div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setQuickViewLeadId(lead._id);
                                            }}
                                            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors shadow-lg shadow-primary-500/30 group-hover:scale-110 transform duration-200 flex-shrink-0"
                                        >
                                            <EyeIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Link
                            to="/partner/requests"
                            className="flex sm:hidden items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
                        >
                            {t.marketplace.allLeads}
                            <PaperAirplaneIcon className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-700">
                        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TagIcon className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="font-bold text-slate-700 dark:text-slate-300 mb-2">{t.marketplace.empty.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">{t.marketplace.empty.desc}</p>
                        <Link
                            to="/partner/requests"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-primary-500/30"
                        >
                            <PaperAirplaneIcon className="w-4 h-4" />
                            {t.marketplace.empty.button}
                        </Link>
                    </div>
                )}
            </div>



            {/* Empty State Card */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-slate-300 bg-transparent py-12 text-center dark:border-slate-700">
                <div className="flex size-12 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <span className="material-symbols-outlined">inbox</span>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-text-light dark:text-text-dark">{t.upToDate.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{t.upToDate.desc}</p>
                </div>
            </div>

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

export default PartnerDashboardPage;

