import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from './AppContext';

const API_URL = import.meta.env.VITE_API_URL;

const getCustomerHeaders = () => {
    const stored = localStorage.getItem('fertigo_customer');
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
    location: string;
    date: string;
    status: string;
    description?: string;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const map: Record<string, string> = {
        'Neu': 'bg-blue-100 text-blue-700',
        'Kontaktiert': 'bg-yellow-100 text-yellow-700',
        'Angebot gesendet': 'bg-orange-100 text-orange-700',
        'In Verhandlung': 'bg-purple-100 text-purple-700',
        'Gewonnen': 'bg-green-100 text-green-700',
        'Verloren / Abgelehnt': 'bg-red-100 text-red-700',
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status] || 'bg-gray-100 text-gray-600'}`}>
            {status}
        </span>
    );
};

const LeadSkeleton = () => (
    <div className="animate-pulse bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark p-6">
        <div className="flex justify-between mb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
    </div>
);

const CustomerDashboardPage: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('Alle');

    const customerData = (() => {
        try {
            const stored = localStorage.getItem('fertigo_customer');
            return stored ? JSON.parse(stored) : null;
        } catch { return null; }
    })();

    const fetchLeads = useCallback(async () => {
        try {
            setError(null);
            const res = await fetch(`${API_URL}/api/customer/leads`, {
                headers: getCustomerHeaders(),
            });
            if (!res.ok) throw new Error('Anfragen konnten nicht geladen werden');
            const data = await res.json();
            setLeads(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const allStatuses = ['Alle', ...Array.from(new Set(leads.map(l => l.status)))];

    const filteredLeads = leads
        .filter(l => activeFilter === 'Alle' || l.status === activeFilter)
        .filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.service.toLowerCase().includes(searchTerm.toLowerCase()));

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <>
            <header className="mb-8">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">
                    Willkommen{customerData?.firstName ? `, ${customerData.firstName}` : ''}!
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal mt-2">
                    Hier sehen Sie all Ihre Anfragen und deren aktuellen Status.
                </p>
            </header>

            {/* Filters */}
            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-border-light dark:border-border-dark mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex flex-col h-12 w-full sm:w-2/3">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                            <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-transparent h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                                placeholder="Suche nach Titel oder Dienstleistung..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </label>
                    <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-2">
                        {allStatuses.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 text-sm font-medium transition-colors ${activeFilter === filter
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-text-light dark:text-text-dark'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Leads Grid */}
            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2, 3].map(i => <LeadSkeleton key={i} />)}
                </div>
            ) : error ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-red-400 mb-2 block">error</span>
                    <p className="text-red-600 dark:text-red-400 font-bold mb-4">{error}</p>
                    <button onClick={() => { setLoading(true); fetchLeads(); }} className="bg-red-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-red-700">
                        Erneut versuchen
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredLeads.map(lead => (
                        <Link
                            to={`/kunden/anfragen/${lead._id}`}
                            key={lead._id}
                            className="flex flex-col gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-6 border border-border-light dark:border-border-dark shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <StatusBadge status={lead.status} />
                                <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(lead.date)}</span>
                            </div>
                            <div>
                                <p className="text-text-light dark:text-text-dark text-xl font-bold leading-tight mb-1">
                                    {lead.title}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    {lead.service} · {lead.location}
                                </p>
                            </div>
                            {lead.description && (
                                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                                    {lead.description}
                                </p>
                            )}
                            <div className="flex items-center gap-2 text-primary text-sm font-semibold mt-auto">
                                <span>Details ansehen</span>
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </div>
                        </Link>
                    ))}

                    {/* New Request CTA */}
                    <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-6 border-2 border-dashed border-border-light dark:border-border-dark text-center min-h-[200px]">
                        <span className="material-symbols-outlined text-5xl text-gray-400 dark:text-gray-500">add_circle</span>
                        <h3 className="text-text-light dark:text-text-dark text-lg font-bold">
                            {leads.length === 0 ? 'Noch keine Anfragen' : 'Neue Anfrage erstellen'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
                            {leads.length === 0
                                ? 'Starten Sie jetzt und finden Sie den perfekten Handwerker für Ihr Projekt.'
                                : 'Haben Sie ein weiteres Projekt? Erstellen Sie eine neue Anfrage.'}
                        </p>
                        <button
                            onClick={() => openQuoteModal()}
                            className="mt-2 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-secondary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-secondary/90"
                        >
                            <span className="truncate">Jetzt Anfrage erstellen</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomerDashboardPage;
