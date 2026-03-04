import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const getCustomerHeaders = () => {
    const stored = localStorage.getItem('fertigo_customer');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

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
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${map[status] || 'bg-gray-100 text-gray-600'}`}>
            {status}
        </span>
    );
};

// This component can now receive requestId from parent or from params
const CustomerRequestDetailPage: React.FC<{ requestId?: string }> = ({ requestId: propRequestId }) => {
    const params = useParams<{ requestId: string }>();
    const requestId = propRequestId || params.requestId;

    const [lead, setLead] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!requestId) return;
        const fetchLead = async () => {
            try {
                const res = await fetch(`${API_URL}/api/customer/leads`, { headers: getCustomerHeaders() });
                if (!res.ok) throw new Error('Anfrage konnte nicht geladen werden');
                const leads = await res.json();
                const found = leads.find((l: any) => l._id === requestId);
                if (!found) throw new Error('Anfrage nicht gefunden');
                setLead(found);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLead();
    }, [requestId]);

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' });

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-8" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
        );
    }

    if (error || !lead) {
        return (
            <div>
                <Link to="/kunden/dashboard" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary mb-6">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Zurück zur Übersicht
                </Link>
                <div className="text-center py-20">
                    <span className="material-symbols-outlined text-5xl text-red-300 block mb-4">error</span>
                    <p className="text-text-light dark:text-text-dark font-bold">{error || 'Anfrage nicht gefunden'}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Link to="/kunden/dashboard" className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-6">
                <span className="material-symbols-outlined">arrow_back</span>
                Zurück zur Projektübersicht
            </Link>

            <header className="mb-8">
                <div className="flex items-start justify-between gap-4 mb-2">
                    <h1 className="text-text-light dark:text-text-dark text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
                        {lead.title}
                    </h1>
                    <StatusBadge status={lead.status} />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-base">
                    {lead.service} · {lead.location} · {formatDate(lead.date)}
                </p>
            </header>

            <div className="space-y-6 max-w-3xl">
                {/* Description */}
                {lead.description && (
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-3">Ihre Anfragebeschreibung</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{lead.description}</p>
                    </div>
                )}

                {/* Details */}
                {lead.details && lead.details.length > 0 && (
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Projektdetails</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {lead.details.map((detail: { label: string; value: string }, idx: number) => (
                                <div key={idx}>
                                    <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 mb-0.5">{detail.label}</p>
                                    <p className="text-text-light dark:text-text-dark font-medium">{detail.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Status info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
                    <h3 className="text-blue-800 dark:text-blue-300 font-bold mb-2">Was passiert als nächstes?</h3>
                    <p className="text-blue-700 dark:text-blue-400 text-sm leading-relaxed">
                        Handwerker in Ihrer Region können Ihre Anfrage einsehen und werden sich bei Interesse direkt bei Ihnen melden.
                        Sie erhalten Kontakt per E-Mail oder Telefon, die Sie in der Anfrage angegeben haben.
                    </p>
                </div>
            </div>
        </>
    );
};

export default CustomerRequestDetailPage;
