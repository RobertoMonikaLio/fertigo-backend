
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeftIcon, PhoneIcon, MailIcon, MapPinIcon,
    CalendarDaysIcon, BanknotesIcon, TagIcon,
    CheckCircleIcon, UserIcon,
    ChevronDownIcon, BellIcon, ChatBubbleLeftRightIcon,
    TestsiegerIcon, XCircleIcon, PaperClipIcon, ListBulletIcon,
    BriefcaseIcon, HomeModernIcon, EyeIcon, ToolboxIcon,
    ExclamationTriangleIcon, PaperAirplaneIcon, SpinnerIcon, XMarkIcon, ArrowRightIcon
} from '../components/icons';
import QualityScoreIndicator from '../components/QualityScoreIndicator';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_provider');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

type Status = 'Neu' | 'Kontaktiert' | 'Angebot gesendet' | 'In Verhandlung' | 'Gewonnen' | 'Verloren / Abgelehnt';

const statusConfig: { [key in Status]: { icon: React.ReactNode; color: string; bgColor: string; title: string } } = {
    'Neu': { icon: <BellIcon className="w-4 h-4" />, color: 'text-blue-700', bgColor: 'bg-blue-50', title: 'Neu' },
    'Kontaktiert': { icon: <ChatBubbleLeftRightIcon className="w-4 h-4" />, color: 'text-cyan-700', bgColor: 'bg-cyan-50', title: 'Kontaktiert' },
    'Angebot gesendet': { icon: <PaperAirplaneIcon className="w-4 h-4" />, color: 'text-purple-700', bgColor: 'bg-purple-50', title: 'Angebot gesendet' },
    'In Verhandlung': { icon: <BanknotesIcon className="w-4 h-4" />, color: 'text-orange-700', bgColor: 'bg-orange-50', title: 'In Verhandlung' },
    'Gewonnen': { icon: <TestsiegerIcon className="w-4 h-4" />, color: 'text-green-700', bgColor: 'bg-green-50', title: 'Gewonnen' },
    'Verloren / Abgelehnt': { icon: <XCircleIcon className="w-4 h-4" />, color: 'text-red-700', bgColor: 'bg-red-50', title: 'Verloren' },
};

interface Lead {
    _id: string;
    title: string;
    service: string;
    customerName: string;
    location: string;
    date: string;
    status: Status;
    price: number;
    budget?: string;
    qualityScore: number;
    description?: string;
    details?: { label: string; value: string }[];
    customerInfo?: { name: string; email: string; phone: string; mobile?: string; address: string };
    purchaseCount: number;
    isPurchased?: boolean;
    additionalNotes?: string;
    onSiteVisit?: string;
    materialProcurement?: string;
    onSiteService?: boolean;
    files?: { name: string; url: string }[];
}

// --- Skeleton ---
const DetailSkeleton = () => (
    <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-32" />
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="flex gap-4">
                <div className="h-4 bg-slate-100 rounded w-24" />
                <div className="h-4 bg-slate-100 rounded w-28" />
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                    <div className="h-5 bg-slate-200 rounded w-40" />
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-4 bg-slate-100 rounded w-5/6" />
                </div>
            </div>
            <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                    <div className="h-5 bg-slate-200 rounded w-20" />
                    <div className="h-10 bg-slate-100 rounded" />
                </div>
            </div>
        </div>
    </div>
);

const StatusDropdown: React.FC<{ currentStatus: Status; onStatusChange: (newStatus: Status) => void; }> = ({ currentStatus, onStatusChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentConfig = statusConfig[currentStatus] || statusConfig['Neu'];

    return (
        <div className="relative min-w-[200px]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border transition-all bg-white shadow-sm ${isOpen ? 'border-primary-500 ring-1 ring-primary-200' : 'border-slate-300 hover:border-slate-400'}`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-md ${currentConfig.bgColor} ${currentConfig.color}`}>
                        {currentConfig.icon}
                    </div>
                    <span className="font-semibold text-slate-700 text-sm">{currentConfig.title}</span>
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                    <ul className="divide-y divide-slate-100">
                        {Object.keys(statusConfig).map(status => {
                            const config = statusConfig[status as Status];
                            const isSelected = currentStatus === status;
                            return (
                                <li key={status}>
                                    <button
                                        onClick={() => { onStatusChange(status as Status); setIsOpen(false); }}
                                        className={`w-full text-left flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 transition-colors ${isSelected ? 'bg-primary-50/50' : ''}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`${config.color}`}>{config.icon}</div>
                                            <span className={`font-medium ${isSelected ? 'text-primary-800' : 'text-slate-700'}`}>{config.title}</span>
                                        </div>
                                        {isSelected && <CheckCircleIcon className="w-5 h-5 text-primary-600" />}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' });
};

const PartnerRequestDetailPage: React.FC<{ requestId: string }> = ({ requestId }) => {
    const [lead, setLead] = useState<Lead | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isBuying, setIsBuying] = useState(false);
    const [buyError, setBuyError] = useState('');

    const fetchLead = useCallback(async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/partner/leads/${requestId}`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) {
                if (response.status === 404) throw new Error('Lead nicht gefunden');
                throw new Error('Fehler beim Laden des Leads');
            }
            const data = await response.json();
            setLead(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [requestId]);

    useEffect(() => {
        fetchLead();
    }, [fetchLead]);

    const handleStatusChange = async (newStatus: Status) => {
        if (!lead) return;
        try {
            const response = await fetch(`${API_URL}/api/partner/leads/${lead._id}/status`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) throw new Error('Status konnte nicht aktualisiert werden');
            setLead({ ...lead, status: newStatus });
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleBuyLead = async () => {
        if (!lead) return;
        setIsBuying(true);
        setBuyError('');
        try {
            const response = await fetch(`${API_URL}/api/partner/leads/${lead._id}/purchase`, {
                method: 'POST',
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Kauf fehlgeschlagen');
            // Refetch to update view
            await fetchLead();
        } catch (err: any) {
            setBuyError(err.message);
        } finally {
            setIsBuying(false);
        }
    };

    if (loading) return <DetailSkeleton />;

    if (error || !lead) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <ArrowLeftIcon className="w-8 h-8 text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{error || 'Anfrage nicht gefunden'}</h2>
                <p className="text-slate-500 mt-2 mb-6">Die gesuchte Anfrage existiert nicht oder Sie haben keinen Zugriff.</p>
                <Link to="/partner/requests" className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary-700 transition-colors">
                    Zurück zum Marktplatz
                </Link>
            </div>
        );
    }

    const isPurchased = lead.isPurchased;

    // If the lead is NOT purchased, we show a limited view
    if (!isPurchased) {
        const purchaseCount = lead.purchaseCount || 0;
        const isSoldOut = purchaseCount >= 5;
        const availableCount = 5 - purchaseCount;

        return (
            <div className="max-w-5xl mx-auto py-8 animate-fade-in">
                {/* Header */}
                <header className="bg-white p-6 border border-slate-200 rounded-2xl flex justify-between items-start mb-8 shadow-sm">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">{lead.service}</span>
                            <span className="text-slate-300">|</span>
                            <span className="text-sm text-slate-500 flex items-center gap-1"><MapPinIcon className="w-3 h-3" /> {lead.location}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">{lead.title}</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 font-medium">
                            <div className="flex items-center gap-1.5"><CalendarDaysIcon className="w-4 h-4" /> {formatDate(lead.date)}</div>
                        </div>
                    </div>
                    <Link to="/partner/requests" className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="Schliessen"><XMarkIcon className="w-6 h-6" /></Link>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Project Details Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h3 className="flex items-center gap-3 font-bold text-slate-800 text-lg mb-5 pb-2 border-b border-slate-100">
                                <HomeModernIcon className="w-5 h-5 text-primary-600" />
                                <span>Projektdaten</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Qualität</span>
                                    <div className="flex items-center gap-2">
                                        <QualityScoreIndicator score={lead.qualityScore} />
                                    </div>
                                </div>
                                {lead.details && lead.details.map(d => (
                                    <div key={d.label} className="flex flex-col gap-1">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{d.label}</span>
                                        <div className="text-slate-800 font-medium">{d.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h3 className="flex items-center gap-3 font-bold text-slate-800 text-lg mb-4 pb-2 border-b border-slate-100">
                                <ListBulletIcon className="w-5 h-5 text-primary-600" />
                                <span>Beschreibung</span>
                            </h3>
                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{lead.description}</p>
                        </div>
                    </div>

                    {/* Right Column: Action & Preview */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6 lg:sticky lg:top-6">
                            <div className="bg-white rounded-xl border-2 border-primary-600 shadow-xl overflow-hidden">
                                <div className="bg-primary-50 p-4 text-center border-b border-primary-100">
                                    <p className="text-primary-800 font-bold text-lg">Interessiert?</p>
                                    <p className="text-primary-600/80 text-sm">Sichern Sie sich diesen Auftrag.</p>
                                </div>
                                <div className="p-6 text-center">
                                    {buyError && (
                                        <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 mb-4 text-sm font-medium">
                                            {buyError}
                                        </div>
                                    )}
                                    {isSoldOut ? (
                                        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 mb-4">
                                            <p className="font-bold flex items-center justify-center gap-2"><XCircleIcon className="w-5 h-5" /> Ausverkauft</p>
                                            <p className="text-sm mt-1">Das Limit von 5 Käufern ist erreicht.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center mb-6 px-2">
                                                <div className="text-left">
                                                    <p className="text-xs font-bold text-slate-500 uppercase">Preis</p>
                                                    <p className="text-2xl font-extrabold text-slate-900">CHF {lead.price.toFixed(0)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-bold text-slate-500 uppercase">Verfügbar</p>
                                                    <p className={`text-xl font-bold ${availableCount <= 2 ? 'text-orange-600' : 'text-green-600'}`}>{availableCount} <span className="text-sm text-slate-400 font-normal">/ 5</span></p>
                                                </div>
                                            </div>
                                            <button onClick={handleBuyLead} disabled={isBuying} className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-bold px-5 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 transform hover:-translate-y-0.5 disabled:bg-primary-400 disabled:cursor-wait">
                                                {isBuying ? (<><SpinnerIcon className="w-5 h-5 animate-spin" /> Verarbeite...</>) : (<>Lead jetzt kaufen <ArrowRightIcon className="w-5 h-5" /></>)}
                                            </button>
                                            <p className="text-xs text-slate-400 mt-4">Preis exkl. MwSt. • Sofortiger Zugriff</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- CRM VIEW FOR PURCHASED LEAD ---
    const currentConfig = statusConfig[lead.status as Status] || statusConfig['Neu'];

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-4">
                <Link to="/partner/requests?view=purchased" className="inline-flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all text-sm font-medium">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Meine Leads
                </Link>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>Lead</span>
                    <span>•</span>
                    <span>{formatDate(lead.date)}</span>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Title Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <span className="inline-block px-2.5 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-bold mb-2">{lead.service}</span>
                                <h1 className="text-xl font-bold text-slate-900 leading-tight">{lead.title}</h1>
                            </div>
                            <QualityScoreIndicator score={lead.qualityScore} />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <MapPinIcon className="w-4 h-4 text-slate-400" />
                                {lead.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CalendarDaysIcon className="w-4 h-4 text-slate-400" />
                                {formatDate(lead.date)}
                            </span>
                        </div>
                    </div>

                    {/* Description Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <ListBulletIcon className="w-5 h-5 text-primary-600" />
                            Projektbeschreibung
                        </h2>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {lead.description}
                        </p>
                        {lead.additionalNotes && (
                            <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Hinweis</p>
                                <p className="text-sm text-amber-800">{lead.additionalNotes}</p>
                            </div>
                        )}
                    </div>

                    {/* Details Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <HomeModernIcon className="w-5 h-5 text-primary-600" />
                            Projektdetails
                        </h2>
                        <div className="space-y-3">
                            {lead.budget && (
                                <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                                    <span className="text-slate-500 text-sm">Budget</span>
                                    <span className="font-bold text-green-600">{lead.budget}</span>
                                </div>
                            )}
                            {lead.details && lead.details.map((detail, idx) => (
                                <div key={idx} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                                    <span className="text-slate-500 text-sm">{detail.label}</span>
                                    <span className="font-semibold text-slate-800">{detail.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Execution & Files */}
                    {(lead.onSiteVisit || lead.materialProcurement || lead.onSiteService !== undefined || (lead.files && lead.files.length > 0)) && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            {(lead.onSiteVisit || lead.materialProcurement || lead.onSiteService !== undefined) && (
                                <div className="mb-5">
                                    <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                        <BriefcaseIcon className="w-5 h-5 text-primary-600" />
                                        Ausführung
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {lead.onSiteVisit && (
                                            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                                                <EyeIcon className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm font-medium text-blue-800">{lead.onSiteVisit}</span>
                                            </div>
                                        )}
                                        {lead.materialProcurement && (
                                            <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg">
                                                <ToolboxIcon className="w-4 h-4 text-purple-600" />
                                                <span className="text-sm font-medium text-purple-800">{lead.materialProcurement}</span>
                                            </div>
                                        )}
                                        {lead.onSiteService !== undefined && (
                                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${lead.onSiteService ? 'bg-orange-50' : 'bg-slate-100'}`}>
                                                <MapPinIcon className={`w-4 h-4 ${lead.onSiteService ? 'text-orange-600' : 'text-slate-500'}`} />
                                                <span className={`text-sm font-medium ${lead.onSiteService ? 'text-orange-800' : 'text-slate-700'}`}>
                                                    {lead.onSiteService ? 'Vor-Ort erforderlich' : 'Remote möglich'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {lead.files && lead.files.length > 0 && (
                                <div>
                                    <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                        <PaperClipIcon className="w-5 h-5 text-primary-600" />
                                        Anhänge ({lead.files.length})
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {lead.files.map((file, idx) => (
                                            <a
                                                key={idx}
                                                href={file.url}
                                                className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-primary-50 rounded-lg border border-slate-200 hover:border-primary-300 transition-all group"
                                            >
                                                <div className="w-10 h-10 bg-slate-200 group-hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
                                                    <PaperClipIcon className="w-5 h-5 text-slate-500 group-hover:text-primary-600" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 group-hover:text-primary-700 truncate">{file.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Status Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <h2 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Status</h2>
                        <StatusDropdown currentStatus={lead.status as Status} onStatusChange={handleStatusChange} />
                    </div>

                    {/* Customer Card */}
                    {lead.customerInfo && (
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 text-white shadow-lg">
                            <h2 className="font-bold mb-4 text-sm uppercase tracking-wide text-slate-300">Kunde</h2>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                                    {lead.customerInfo.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{lead.customerInfo.name}</h3>
                                    <p className="text-slate-400 text-sm">{lead.customerInfo.address}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <a
                                    href={`tel:${lead.customerInfo.mobile || lead.customerInfo.phone}`}
                                    className="flex items-center gap-3 w-full px-4 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg transition-colors font-bold text-sm"
                                >
                                    <PhoneIcon className="w-5 h-5" />
                                    <span>{lead.customerInfo.mobile || lead.customerInfo.phone}</span>
                                </a>
                                <a
                                    href={`mailto:${lead.customerInfo.email}`}
                                    className="flex items-center gap-3 w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium text-sm"
                                >
                                    <MailIcon className="w-5 h-5" />
                                    <span className="truncate">{lead.customerInfo.email}</span>
                                </a>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.customerInfo.address)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium text-sm"
                                >
                                    <MapPinIcon className="w-5 h-5" />
                                    <span>Route anzeigen</span>
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Quick Info */}
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                        <div className="flex items-center gap-3 text-sm">
                            <div className={`p-2 rounded-lg ${currentConfig.bgColor} ${currentConfig.color}`}>
                                {currentConfig.icon}
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs">Aktueller Status</p>
                                <p className="font-semibold text-slate-800">{currentConfig.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerRequestDetailPage;
