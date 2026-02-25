import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
    MagnifyingGlassIcon, MapPinIcon, ArrowPathIcon, CheckCircleIcon,
    XMarkIcon, CalendarDaysIcon, ArrowRightIcon, ChevronDownIcon,
    ChevronLeftIcon, ChevronRightIcon, UsersIcon, XCircleIcon,
    BriefcaseIcon, PhoneIcon, EnvelopeIcon,
    ClockIcon, BanknotesIcon, ChartBarIcon, UserIcon
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

// --- Utilities ---
const formatPrice = (price: number) =>
    new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(price);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('de-CH', { day: '2-digit', month: 'short', year: 'numeric' });

const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const avatarColors = [
    'bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500',
    'bg-rose-500', 'bg-cyan-500', 'bg-fuchsia-500', 'bg-orange-500'
];
const getAvatarColor = (str: string) => avatarColors[str.charCodeAt(0) % avatarColors.length];

// --- Interfaces ---
interface Lead {
    _id: string;
    title: string;
    description: string;
    service: string;
    location: string;
    price: number;
    date: string;
    status: string;
    customerName: string;
    customerInfo?: {
        name: string;
        email: string;
        phone: string;
        mobile?: string;
        address?: string;
    };
    details?: { label: string; value: string }[];
}

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    location: string;
    leads: Lead[];
    totalLeads: number;
    wonLeads: number;
    activeLeads: number;
    lostLeads: number;
    totalValue: number;
    latestDate: string;
    primaryStatus: string;
    avatarColor: string;
}

// --- Status Config ---
const STATUS_ORDER = ['Neu', 'Kontaktiert', 'Angebot gesendet', 'In Verhandlung', 'Gewonnen', 'Verloren / Abgelehnt'];

const statusConfig: Record<string, { label: string; dot: string; text: string; bg: string; border: string }> = {
    'Neu': { label: 'Neu', dot: 'bg-blue-400', text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100' },
    'Kontaktiert': { label: 'Kontaktiert', dot: 'bg-sky-400', text: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-100' },
    'Angebot gesendet': { label: 'Offerte', dot: 'bg-violet-400', text: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-100' },
    'In Verhandlung': { label: 'Verhandlung', dot: 'bg-amber-400', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100' },
    'Gewonnen': { label: 'Gewonnen', dot: 'bg-emerald-400', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    'Verloren / Abgelehnt': { label: 'Verloren', dot: 'bg-rose-400', text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-100' },
};

const StatusPill: React.FC<{ status: string; size?: 'sm' | 'md' }> = ({ status, size = 'sm' }) => {
    const cfg = statusConfig[status] ?? statusConfig['Neu'];
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border} ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}>
            <span className={`w-1.5 h-1.5 rounded-full inline-block ${cfg.dot}`} />
            {cfg.label}
        </span>
    );
};

// ┌─────────────────────────────────────────────────────┐
// │  KUNDENDETAILS — 2-Spalten-Design                   │
// │  Links: Kundendaten  |  Rechts: Projektdetails       │
// └─────────────────────────────────────────────────────┘
const CustomerSheet: React.FC<{ customer: Customer; onClose: () => void }> = ({ customer, onClose }) => {
    const [activeLeadIdx, setActiveLeadIdx] = useState(0);
    const sortedLeads = [...customer.leads].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const activeLead = sortedLeads[activeLeadIdx] ?? null;
    const initials = getInitials(customer.name);
    const winRate = customer.totalLeads > 0 ? Math.round((customer.wonLeads / customer.totalLeads) * 100) : 0;

    // Accent color from avatarColor
    const accentHex: Record<string, string> = {
        'bg-violet-500': '#7c3aed', 'bg-blue-500': '#2563eb',
        'bg-emerald-500': '#059669', 'bg-amber-500': '#d97706',
        'bg-rose-500': '#059669', 'bg-cyan-500': '#0891b2',
        'bg-fuchsia-500': '#c026d3', 'bg-orange-500': '#ea580c',
    };
    const accent = accentHex[customer.avatarColor] ?? '#2563eb';

    // Extract structured details from active lead
    const getDetail = (label: string) =>
        activeLead?.details?.find(d => d.label.toLowerCase().includes(label.toLowerCase()))?.value ?? null;

    const vonDetail = getDetail('von');
    const nachDetail = getDetail('nach');
    const zeitDetail = getDetail('zeitrahmen') ?? getDetail('zeit');
    const zimmerDetail = getDetail('zimmer');
    const stockDetail = getDetail('stockwerk') ?? getDetail('stock');
    const besondereDetail = getDetail('besondere') ?? getDetail('objekte') ?? getDetail('gegenst') ?? getDetail('sperrgut');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-8" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full h-full sm:h-auto bg-white sm:rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col sheet-pop"
                style={{ maxWidth: 1140, maxHeight: '100%' }}
                onClick={e => e.stopPropagation()}
            >

                {/* ── MODAL HEADER ─────────────────────────────── */}
                <div className="flex-shrink-0 flex items-center justify-between px-3 py-3 md:px-6 md:py-4 border-b border-slate-200 bg-slate-100">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
                        {/* Dienstleistung */}
                        <div className="bg-white rounded-xl border border-slate-200 px-3 py-2 md:px-4 md:py-2.5 min-w-0 flex-shrink-0">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Dienstleistung</p>
                            <p className="text-[13px] md:text-sm font-bold text-slate-900 truncate">{activeLead?.service || '—'}</p>
                        </div>
                        {/* Lead-Preis */}
                        <div className="bg-white rounded-xl border border-slate-200 px-3 py-2 md:px-4 md:py-2.5 flex-shrink-0">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Lead-Preis</p>
                            <p className="text-[13px] md:text-sm font-black text-slate-900">
                                {activeLead ? formatPrice(activeLead.price) : '—'}
                            </p>
                        </div>
                        {/* Datum */}
                        <div className="bg-white rounded-xl border border-slate-200 px-3 py-2 md:px-4 md:py-2.5 flex-shrink-0">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Datum</p>
                            <p className="text-[13px] md:text-sm font-semibold text-slate-700 flex items-center gap-1">
                                <CalendarDaysIcon className="w-3.5 h-3.5 text-slate-400" />
                                {activeLead ? formatDate(activeLead.date) : '—'}
                            </p>
                        </div>
                    </div>
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 ml-2 md:ml-4 w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all shadow-sm"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                </div>

                {/* ── BODY: 2 Spalten ────────────────────────── */}
                <div className="flex-1 min-h-0 grid md:grid-cols-[460px_1fr] overflow-y-auto md:overflow-hidden">

                    {/* ══ LINKE SPALTE: Kundendaten ══════════════ */}
                    <div className="flex flex-col flex-none md:flex-initial overflow-visible md:overflow-y-auto border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/60">

                        <div className="px-4 py-5 md:px-6 md:pt-6 md:pb-6 space-y-5 md:space-y-6">
                            {/* Section title */}
                            <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4" style={{ color: accent }} />
                                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-slate-500">Kundendaten</h3>
                            </div>


                            {/* ── Kontaktfelder ── */}
                            <div className="space-y-0 bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm divide-y divide-slate-50">
                                {[
                                    { label: 'Anrede', value: (customer as any).anrede ?? null, icon: '👤' },
                                    { label: 'Vorname', value: customer.name ? customer.name.split(' ')[0] : null, icon: '🪪' },
                                    { label: 'Name', value: customer.name ? customer.name.split(' ').slice(1).join(' ') || null : null, icon: '🪪' },
                                    { label: 'Strasse & Nr.', value: customer.address ? customer.address.split(',')[0].trim() : null, icon: '🏠' },
                                    { label: 'PLZ', value: (() => { const loc = customer.location || (customer.address ? customer.address.split(',').slice(1).join(',').trim() : null); return loc ? loc.trim().split(' ')[0] : null; })(), icon: '📮' },
                                    { label: 'Ort', value: (() => { const loc = customer.location || (customer.address ? customer.address.split(',').slice(1).join(',').trim() : null); return loc ? loc.trim().split(' ').slice(1).join(' ') || null : null; })(), icon: '🏘️' },
                                    { label: 'Kanton', value: (customer as any).kanton ?? null, icon: '🗺️' },
                                    { label: 'E-Mail', value: customer.email, icon: '✉️', href: customer.email ? `mailto:${customer.email}` : undefined },
                                    { label: 'Telefon', value: customer.phone, icon: '📞', href: customer.phone ? `tel:${customer.phone}` : undefined },
                                    { label: 'Mobile', value: (customer as any).mobile ?? null, icon: '📱' },
                                ].map((field, i) => {
                                    const Tag = field.href ? 'a' : 'div';
                                    return (
                                        <Tag
                                            key={i}
                                            {...(field.href ? { href: field.href } : {})}
                                            className={`flex items-start gap-3 px-4 py-3 group transition-colors ${field.href ? 'hover:bg-slate-50 cursor-pointer' : ''}`}
                                        >
                                            <span className="text-base flex-shrink-0 mt-0.5 w-5 text-center">{field.icon}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{field.label}</p>
                                                {field.value ? (
                                                    <p
                                                        className={`text-sm font-semibold text-slate-800 truncate transition-colors ${field.href ? 'group-hover:underline' : ''}`}
                                                        style={field.href ? { color: accent } : {}}
                                                    >
                                                        {field.value}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-slate-300 italic">Nicht angegeben</p>
                                                )}
                                            </div>
                                        </Tag>
                                    );
                                })}
                            </div>

                            {/* ── CTA ── */}
                            <div className="space-y-2">
                                {customer.email && (
                                    <a href={`mailto:${customer.email}`}
                                        className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-white text-sm font-bold shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                                        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
                                    >
                                        <EnvelopeIcon className="w-4 h-4" />
                                        E-Mail senden
                                    </a>
                                )}
                                {customer.phone && (
                                    <a href={`tel:${customer.phone}`}
                                        className="flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-white text-slate-700 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-all">
                                        <PhoneIcon className="w-4 h-4 text-slate-400" />
                                        Anrufen
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ══ RECHTE SPALTE: Projektdetails ══════ */}
                    <div className="flex flex-col flex-auto md:flex-1 overflow-visible md:overflow-hidden bg-white">
                        {/* Project tabs */}
                        {sortedLeads.length > 1 && (
                            <div className="flex-shrink-0 flex items-center gap-1.5 px-4 pt-4 pb-0 md:px-6 md:pt-5 overflow-x-auto scrollbar-hide">
                                {sortedLeads.map((lead, i) => (
                                    <button
                                        key={lead._id}
                                        onClick={() => setActiveLeadIdx(i)}
                                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${i === activeLeadIdx
                                            ? 'text-white border-transparent shadow-sm'
                                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'}`}
                                        style={i === activeLeadIdx ? { background: accent, borderColor: accent } : {}}
                                    >
                                        #{i + 1} {lead.service || lead.title?.split(' ')[0] || 'Projekt'}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="flex-1 overflow-visible md:overflow-y-auto px-4 py-4 md:px-6 md:py-5">
                            {!activeLead ? (
                                <div className="flex flex-col items-center justify-center h-full gap-3 py-20">
                                    <BriefcaseIcon className="w-8 h-8 text-slate-300" />
                                    <p className="text-sm text-slate-400">Keine Projekte vorhanden</p>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {/* Project Header */}
                                    <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                                        <BriefcaseIcon className="w-4 h-4" style={{ color: accent }} />
                                        <h3 className="text-xs font-black uppercase tracking-[0.15em] text-slate-500">Projektdetails</h3>
                                    </div>

                                    {/* Beschreibung — ganz oben */}
                                    {activeLead.description && (
                                        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
                                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">📝 Beschreibung</p>
                                            <p className="text-sm text-slate-700 leading-relaxed italic">„{activeLead.description}"</p>
                                        </div>
                                    )}

                                    {/* Grid: Route + Zeitrahmen */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Von → Nach — Route Block */}
                                        {(vonDetail || nachDetail) && (
                                            <div className="col-span-2 rounded-2xl overflow-hidden border border-slate-100">
                                                {/* Header */}
                                                <div className="flex items-center gap-2 px-4 pt-3 pb-2 bg-slate-50 border-b border-slate-100">
                                                    <span className="text-base">📦</span>
                                                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Umzugsroute</p>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                                                    {/* VON — hellrot */}
                                                    <div className="p-3 sm:p-4" style={{ background: '#fff5f5' }}>
                                                        <div className="flex items-center gap-1.5 mb-3">
                                                            <span className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0" />
                                                            <p className="text-[11px] font-black uppercase tracking-wider text-rose-500">Von (Auszug)</p>
                                                        </div>
                                                        <div className="bg-white/70 rounded-xl px-3 py-2 border border-rose-100 mb-2">
                                                            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider mb-0.5">Standort</p>
                                                            <p className="text-sm font-semibold text-slate-800">{vonDetail || '—'}</p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {activeLead.details?.filter(d => {
                                                                const l = d.label.toLowerCase();
                                                                return l.includes('auszug') || l.includes('zimmer') || l.includes('stockwerk') && !l.includes('einzug') || l.includes('lift') && !l.includes('einzug') || l.includes('etage') && !l.includes('einzug') || l.includes('fläche') && !l.includes('einzug');
                                                            }).map((d, i) => (
                                                                <div key={i} className="bg-white/70 rounded-xl px-3 py-2 border border-rose-100">
                                                                    <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider mb-0.5">{d.label}</p>
                                                                    <p className="text-sm font-semibold text-slate-800">{d.value}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* NACH — hellgrün */}
                                                    <div className="p-3 sm:p-4" style={{ background: '#f0fdf4' }}>
                                                        <div className="flex items-center gap-1.5 mb-3">
                                                            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                                                            <p className="text-[11px] font-black uppercase tracking-wider text-emerald-600">Nach (Einzug)</p>
                                                        </div>
                                                        <div className="bg-white/70 rounded-xl px-3 py-2 border border-emerald-100 mb-2">
                                                            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mb-0.5">Standort</p>
                                                            <p className="text-sm font-semibold text-slate-800">{nachDetail || '—'}</p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {activeLead.details?.filter(d => {
                                                                const l = d.label.toLowerCase();
                                                                return l.includes('einzug') || (l.includes('stockwerk') && !l.includes('auszug')) || (l.includes('lift') && !l.includes('auszug')) || (l.includes('etage') && !l.includes('auszug')) || (l.includes('fläche') && !l.includes('auszug'));
                                                            }).map((d, i) => (
                                                                <div key={i} className="bg-white/70 rounded-xl px-3 py-2 border border-emerald-100">
                                                                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mb-0.5">{d.label}</p>
                                                                    <p className="text-sm font-semibold text-slate-800">{d.value}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Weitere Angaben */}
                                    {(() => {
                                        const excluded = (l: string) => {
                                            const ll = l.toLowerCase();
                                            // Besondere Objekte / Gegenstände immer zeigen
                                            if (ll.includes('objekte') || ll.includes('gegenst') || ll.includes('besondere') || ll.includes('speziell') || ll.includes('sperrgut')) return false;
                                            return ll === 'von' || ll === 'nach' ||
                                                ll.includes('zimmer') ||
                                                ll.includes('stockwerk') ||
                                                ll.includes('lift') ||
                                                ll.includes('etage');
                                        };
                                        const filtered = activeLead.details?.filter(d => !excluded(d.label)) ?? [];
                                        if (filtered.length === 0) return null;
                                        return (
                                            <div className="rounded-2xl overflow-hidden border border-slate-100">
                                                {/* Header — gleich wie Umzugsroute */}
                                                <div className="flex items-center gap-2 px-4 pt-3 pb-2 bg-slate-50 border-b border-slate-100">
                                                    <span className="text-base">📋</span>
                                                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Weitere Angaben</p>
                                                </div>
                                                <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {/* Besondere Objekte — immer oben */}
                                                    <div className="col-span-1 sm:col-span-2 bg-white rounded-xl border border-slate-100 px-3.5 py-2.5 shadow-sm">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Besondere Objekte</p>
                                                        <p className="text-sm font-semibold text-slate-800">{besondereDetail || 'Nicht angegeben'}</p>
                                                    </div>
                                                    {filtered.filter(d => {
                                                        const ll = d.label.toLowerCase();
                                                        return !ll.includes('besondere') && !ll.includes('objekte') && !ll.includes('gegenst') && !ll.includes('sperrgut');
                                                    }).map((d, i) => (
                                                        <div key={i} className="bg-white rounded-xl border border-slate-100 px-3.5 py-2.5 shadow-sm">
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{d.label}</p>
                                                            <p className="text-sm font-semibold text-slate-800 truncate">{d.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {/* Bilder Placeholder (wenn später vorhanden) */}
                                    <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center">
                                        <p className="text-2xl mb-2">🖼️</p>
                                        <p className="text-xs font-semibold text-slate-400">Keine Bilder vom Kunden hochgeladen</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes sheetPop {
                    0%   { opacity: 0; transform: scale(0.96) translateY(16px); }
                    100% { opacity: 1; transform: scale(1)    translateY(0);    }
                }
                .sheet-pop { animation: sheetPop 0.28s cubic-bezier(0.16, 1, 0.3, 1) both; }
            `}</style>
        </div>
    );
};

const calcScore = (lead: Lead | undefined): number => {
    if (!lead) return 0;
    let s = 0;
    if (lead.description) s += 30;
    s += Math.min((lead.details?.length ?? 0) * 5, 20);
    if (lead.location) s += 20;
    if (lead.customerInfo?.phone) s += 20;
    if (lead.price > 0) s += 10;
    return s;
};

const scoreToStars = (score: number) => score === 0 ? 1 : Math.min(5, Math.ceil(score / 20));

const StarRow: React.FC<{ stars: number }> = ({ stars }) => (
    <span className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
            <span key={i} className={`text-sm leading-none ${i <= stars ? 'text-amber-400' : 'text-slate-200'}`}>&#9733;</span>
        ))}
    </span>
);

const CustomerRow: React.FC<{ customer: Customer; onClick: () => void; idx: number }> = ({ customer, onClick }) => {
    const plz = customer.location ? customer.location.trim().split(' ')[0] : '';
    const locParts = customer.location ? customer.location.trim().split(' ') : [];
    const kanton = locParts.length >= 2 ? locParts[locParts.length - 1].toUpperCase() : '';
    const ort = locParts.length >= 3 ? locParts.slice(1, locParts.length - 1).join(' ') : (locParts[1] ?? '');
    const latestLead = [...customer.leads].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    const service = latestLead?.service || '—';
    const score = calcScore(latestLead);
    const stars = scoreToStars(score);

    return (
        <tr
            onClick={onClick}
            className="group cursor-pointer border-b border-slate-100 last:border-0 hover:bg-gradient-to-r hover:from-slate-50/70 hover:to-transparent transition-all duration-150"
        >
            {/* Kunde */}
            <td className="py-3.5 pl-6 pr-4">
                <span className="text-sm font-semibold text-slate-800 truncate block max-w-[180px]">
                    {customer.name || '—'}
                </span>
            </td>

            {/* Dienstleistung — violet rounded pill */}
            <td className="py-3.5 px-4 hidden md:table-cell">
                <span className="inline-flex items-center text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100 rounded-full px-3 py-1 whitespace-nowrap">
                    {service}
                </span>
            </td>

            {/* Lead-Qualität — Unicode ★/☆ stars */}
            <td className="py-3.5 px-4 hidden sm:table-cell w-36">
                <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                        <span key={i} className={`text-[15px] leading-none select-none ${i <= stars ? 'text-amber-400' : 'text-slate-200'}`}>
                            {i <= stars ? '★' : '☆'}
                        </span>
                    ))}
                </div>
            </td>

            {/* Kanton — inverted dark chip */}
            <td className="py-3.5 px-4 hidden lg:table-cell w-20 text-center">
                {kanton ? (
                    <span className="inline-flex items-center justify-center text-[10px] font-bold text-white bg-slate-800 rounded-md px-2.5 py-1 tracking-wider">{kanton}</span>
                ) : <span className="text-slate-300">—</span>}
            </td>

            {/* PLZ */}
            <td className="py-3.5 px-4 hidden md:table-cell w-16 text-center">
                <span className="text-sm text-slate-400 font-mono tabular-nums">{plz || '—'}</span>
            </td>

            {/* Ort */}
            <td className="py-3.5 px-4 hidden md:table-cell">
                <span className="text-sm text-slate-600 truncate block max-w-[110px]">{ort || '—'}</span>
            </td>

            {/* Datum */}
            <td className="py-3.5 pl-4 pr-6 hidden lg:table-cell text-right">
                <span className="text-xs text-slate-400 tabular-nums whitespace-nowrap">{formatDate(customer.latestDate)}</span>
            </td>
        </tr>
    );
};

// --- Pipeline Kanban Card ---
const KanbanCard: React.FC<{ customer: Customer; onClick: () => void }> = ({ customer, onClick }) => {
    const latestLead = [...customer.leads].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    return (
        <div
            onClick={onClick}
            className="group bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:shadow-md hover:border-slate-300 transition-all select-none"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg ${customer.avatarColor} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                    {getInitials(customer.name)}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate leading-tight group-hover:text-blue-600 transition-colors">{customer.name || '—'}</p>
                    <p className="text-xs text-slate-400 truncate">{customer.location || 'Schweiz'}</p>
                </div>
            </div>
            {latestLead && (
                <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">{latestLead.title}</p>
            )}
            <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                    {customer.totalLeads} Projekt{customer.totalLeads !== 1 ? 'e' : ''}
                </span>
                <span className="text-xs font-bold text-slate-700">{formatPrice(customer.totalValue)}</span>
            </div>
        </div>
    );
};

// ==========================================
// --- Main Page ---
// ==========================================
const PartnerCustomersPage: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('Alle');
    const [kantonFilter, setKantonFilter] = useState('');
    const [dienstleistungFilter, setDienstleistungFilter] = useState('');
    const [sortOption, setSortOption] = useState('Neueste');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [viewMode, setViewMode] = useState<'table' | 'pipeline'>('table');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    const fetchLeads = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_URL}/api/partner/leads/purchased`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error('Kundendaten konnten nicht geladen werden.');
            const data = await response.json();
            setLeads(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchLeads(); }, [fetchLeads]);

    // Aggregate leads → customers
    const customers = useMemo<Customer[]>(() => {
        const map = new Map<string, Customer>();
        leads.forEach(lead => {
            const email = lead.customerInfo?.email || lead.customerName || lead._id;
            const key = email.toLowerCase();

            if (!map.has(key)) {
                const name = lead.customerInfo?.name || lead.customerName || 'Unbekannt';
                map.set(key, {
                    id: key,
                    name,
                    email: lead.customerInfo?.email || '',
                    phone: lead.customerInfo?.phone || '',
                    address: lead.customerInfo?.address || '',
                    location: lead.location,
                    leads: [],
                    totalLeads: 0,
                    wonLeads: 0,
                    activeLeads: 0,
                    lostLeads: 0,
                    totalValue: 0,
                    latestDate: lead.date,
                    primaryStatus: lead.status,
                    avatarColor: getAvatarColor(name),
                });
            }

            const c = map.get(key)!;
            c.leads.push(lead);
            c.totalLeads++;
            c.totalValue += lead.price;

            if (lead.status === 'Gewonnen') c.wonLeads++;
            else if (lead.status === 'Verloren / Abgelehnt') c.lostLeads++;
            else c.activeLeads++;

            if (new Date(lead.date) > new Date(c.latestDate)) c.latestDate = lead.date;

            const priorityMap: Record<string, number> = {
                'Gewonnen': 0, 'In Verhandlung': 1, 'Angebot gesendet': 2,
                'Kontaktiert': 3, 'Neu': 4, 'Verloren / Abgelehnt': 5
            };
            if ((priorityMap[lead.status] ?? 6) < (priorityMap[c.primaryStatus] ?? 6)) {
                c.primaryStatus = lead.status;
            }
        });
        return Array.from(map.values());
    }, [leads]);

    const stats = useMemo(() => ({
        total: customers.length,
        active: customers.filter(c => !['Gewonnen', 'Verloren / Abgelehnt'].includes(c.primaryStatus)).length,
        won: customers.filter(c => c.wonLeads > 0).length,
        totalRevenue: customers.reduce((s, c) => s + c.totalValue, 0),
    }), [customers]);

    // Unique Kantons & Dienstleistungen for dropdowns
    const uniqueKantons = useMemo(() => {
        const set = new Set<string>();
        customers.forEach(c => {
            const parts = c.location?.trim().split(' ');
            if (parts && parts.length >= 2) set.add(parts[parts.length - 1].toUpperCase());
        });
        return Array.from(set).sort();
    }, [customers]);

    const uniqueServices = useMemo(() => {
        const set = new Set<string>();
        customers.forEach(c => c.leads.forEach(l => { if (l.service) set.add(l.service); }));
        return Array.from(set).sort();
    }, [customers]);

    const filteredCustomers = useMemo(() => {
        return customers
            .filter(c => {
                const s = searchTerm.toLowerCase();
                if (s && !c.name.toLowerCase().includes(s) && !c.email.toLowerCase().includes(s) &&
                    !c.location.toLowerCase().includes(s) && !c.leads.some(l => l.title?.toLowerCase().includes(s))) return false;
                if (kantonFilter) {
                    const kanton = c.location?.trim().split(' ').pop()?.toUpperCase() ?? '';
                    if (kanton !== kantonFilter.toUpperCase()) return false;
                }
                if (dienstleistungFilter && !c.leads.some(l => l.service === dienstleistungFilter)) return false;
                return true;
            })
            .sort((a, b) => {
                if (sortOption === 'Neueste') return new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime();
                if (sortOption === 'Name A-Z') return a.name.localeCompare(b.name, 'de');
                if (sortOption === 'Meiste Projekte') return b.totalLeads - a.totalLeads;
                if (sortOption === 'Höchster Wert') return b.totalValue - a.totalValue;
                return 0;
            });
    }, [customers, searchTerm, kantonFilter, dienstleistungFilter, sortOption]);

    const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
    const pageCustomers = filteredCustomers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const pipelineGroups = useMemo(() => {
        const groups = STATUS_ORDER.map(status => ({
            status,
            customers: filteredCustomers.filter(c => c.primaryStatus === status),
        }));
        return groups.filter(g => g.customers.length > 0);
    }, [filteredCustomers]);

    return (
        <div className="min-h-screen bg-slate-50/70">
            {/* Page Header */}
            <div className="bg-white border-b border-slate-200 px-4 sm:px-6 md:px-10 py-4 md:py-6">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Kunden</h1>
                        <p className="text-sm text-slate-500 mt-0.5">Alle erworbenen Leads und Kundenbeziehungen im Überblick</p>
                    </div>
                    <button
                        onClick={fetchLeads}
                        className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors self-start md:self-auto shadow-sm"
                    >
                        <CheckCircleIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Aktualisieren
                    </button>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-8 space-y-6">


                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 min-w-0 w-full">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Name, E-Mail, Ort oder Projekt suchen..."
                            value={searchTerm}
                            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                        {/* Kanton Dropdown */}
                        <div className="relative">
                            <select
                                value={kantonFilter}
                                onChange={e => { setKantonFilter(e.target.value); setCurrentPage(1); }}
                                className="h-10 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 appearance-none cursor-pointer"
                            >
                                <option value="">Alle Kantone</option>
                                {uniqueKantons.map(k => <option key={k} value={k}>{k}</option>)}
                            </select>
                            <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>

                        {/* Dienstleistung Dropdown */}
                        <div className="relative">
                            <select
                                value={dienstleistungFilter}
                                onChange={e => { setDienstleistungFilter(e.target.value); setCurrentPage(1); }}
                                className="h-10 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 appearance-none cursor-pointer"
                            >
                                <option value="">Alle Dienstleistungen</option>
                                {uniqueServices.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>

                        <div className="relative">
                            <select
                                value={sortOption}
                                onChange={e => setSortOption(e.target.value)}
                                className="h-10 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 appearance-none cursor-pointer"
                            >
                                {['Neueste', 'Name A-Z', 'Meiste Projekte', 'Höchster Wert'].map(o => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                            <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center h-10 p-1 bg-slate-100 rounded-xl gap-0.5">
                            {[
                                { mode: 'table', label: 'Tabelle', icon: '≡' },
                                { mode: 'pipeline', label: 'Pipeline', icon: '⊞' },
                            ].map(v => (
                                <button
                                    key={v.mode}
                                    onClick={() => setViewMode(v.mode as 'table' | 'pipeline')}
                                    title={v.label}
                                    className={`h-8 px-3 rounded-lg text-sm font-medium transition-all ${viewMode === v.mode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {v.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between -mt-2">
                    <p className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-900">{filteredCustomers.length}</span> Kunden gefunden
                    </p>
                    {(searchTerm || kantonFilter || dienstleistungFilter) && (
                        <button
                            onClick={() => { setSearchTerm(''); setKantonFilter(''); setDienstleistungFilter(''); setCurrentPage(1); }}
                            className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
                        >
                            <XMarkIcon className="w-4 h-4" />
                            Filter zurücksetzen
                        </button>
                    )}
                </div>

                {/* CONTENT */}
                {loading ? (
                    <div className="bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-slate-200 border-t-slate-900 animate-spin" />
                        <p className="text-sm text-slate-400 font-medium">Kundendaten werden geladen…</p>
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-2xl border border-rose-200 flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center">
                            <XCircleIcon className="w-6 h-6 text-rose-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-base font-semibold text-slate-900 mb-1">Fehler beim Laden</p>
                            <p className="text-sm text-slate-500 mb-4">{error}</p>
                            <button onClick={fetchLeads} className="h-9 px-5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors">
                                Erneut versuchen
                            </button>
                        </div>
                    </div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center py-28 gap-4">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                            <UsersIcon className="w-7 h-7 text-slate-300" />
                        </div>
                        <div className="text-center max-w-sm">
                            <p className="text-base font-semibold text-slate-900 mb-1">Keine Kunden gefunden</p>
                            <p className="text-sm text-slate-500">
                                {searchTerm || statusFilter !== 'Alle'
                                    ? 'Versuchen Sie andere Suchbegriffe oder setzen Sie die Filter zurück.'
                                    : 'Erwerben Sie Leads auf dem Marktplatz, um Ihre Kundenliste aufzubauen.'}
                            </p>
                        </div>
                        {!(searchTerm || statusFilter !== 'Alle') && (
                            <a href="#/partner/requests" className="mt-2 inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors">
                                Zum Marktplatz
                                <ArrowRightIcon className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                ) : viewMode === 'table' ? (
                    <>
                        {/* Floating Card-Row Table */}
                        {/* Premium SaaS Table */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-x-auto">
                            <table className="w-full min-w-[700px]">
                                <thead>
                                    <tr className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
                                        <th className="py-3.5 pl-6 pr-4 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Kunde</th>
                                        <th className="py-3.5 px-4 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Dienstleistung</th>
                                        <th className="py-3.5 px-4 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell w-36">Lead-Qualität</th>
                                        <th className="py-3.5 px-4 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell w-20">Kanton</th>
                                        <th className="py-3.5 px-4 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell w-16">PLZ</th>
                                        <th className="py-3.5 px-4 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Ort</th>
                                        <th className="py-3.5 pl-4 pr-6 text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Datum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageCustomers.map((customer, idx) => (
                                        <CustomerRow
                                            key={customer.id}
                                            idx={idx}
                                            customer={customer}
                                            onClick={() => setSelectedCustomer(customer)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Seite {currentPage} von {totalPages} · {filteredCustomers.length} Ergebnisse
                                </p>
                                <div className="flex items-center gap-1">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => p - 1)}
                                        className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeftIcon className="w-4 h-4" />
                                    </button>
                                    {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                                        const page = i + 1;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${currentPage === page ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => p + 1)}
                                        className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* PIPELINE VIEW */
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:-mx-10 md:px-10">
                        {pipelineGroups.map(group => {
                            const cfg = statusConfig[group.status] ?? statusConfig['Neu'];
                            return (
                                <div key={group.status} className="flex-shrink-0 w-72 flex flex-col gap-2">
                                    {/* Column Header */}
                                    <div className={`flex items-center justify-between px-3 py-2 rounded-xl ${cfg.bg} border ${cfg.border}`}>
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                                            <span className={`text-xs font-semibold ${cfg.text}`}>{cfg.label}</span>
                                        </div>
                                        <span className={`text-xs font-bold ${cfg.text} opacity-60`}>{group.customers.length}</span>
                                    </div>
                                    {/* Cards */}
                                    <div className="space-y-2">
                                        {group.customers.map(customer => (
                                            <KanbanCard
                                                key={customer.id}
                                                customer={customer}
                                                onClick={() => setSelectedCustomer(customer)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        {pipelineGroups.length === 0 && (
                            <div className="flex-1 bg-white rounded-2xl border border-slate-200 flex items-center justify-center py-20">
                                <p className="text-slate-400 text-sm">Keine Kunden in dieser Ansicht.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Detail Sheet */}
            {selectedCustomer && (
                <CustomerSheet customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
            )}

            {/* Slide-in animation CSS */}
            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0.5; }
                    to   { transform: translateX(0);    opacity: 1;   }
                }
                .animate-slide-in-right {
                    animation: slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default PartnerCustomersPage;
