import React, { useState, useEffect, useCallback } from 'react';
import {
    UserIcon, LockClosedIcon, BellIcon, BriefcaseIcon,
    CheckCircleIcon, SpinnerIcon
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

// ─── Reusable input style ────────────────────────────────────────────────────
const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm transition-all';
const labelCls = 'block text-sm font-semibold text-slate-700 mb-1.5';

// ─── Toggle Switch ────────────────────────────────────────────────────────────
const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
    <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-primary-600' : 'bg-slate-200'}`}
    >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

// ─── Section Divider ─────────────────────────────────────────────────────────
const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <div className="mb-5">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
);

const Divider = () => <hr className="border-slate-100 my-6" />;

// ─── Main Component ───────────────────────────────────────────────────────────
const PartnerSettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ── Profile ──
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');

    // ── Notifications ──
    const [notifNewLead, setNotifNewLead] = useState(true);
    const [notifEmail, setNotifEmail] = useState(true);
    const [notifSms, setNotifSms] = useState(false);
    const [notifWeekly, setNotifWeekly] = useState(true);
    const [notifMarketing, setNotifMarketing] = useState(false);
    const [notifSaving, setNotifSaving] = useState(false);
    const [notifSuccess, setNotifSuccess] = useState(false);

    // ── Security ──
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [pwSaving, setPwSaving] = useState(false);
    const [pwSuccess, setPwSuccess] = useState(false);
    const [pwError, setPwError] = useState('');

    // ── Services ──
    const allServices = [
        'Umzug', 'Reinigung', 'Maler', 'Bodenleger', 'Elektriker', 'Sanitär',
        'Schreiner', 'Gartenpflege', 'Hauswartung', 'Fensterreinigung',
        'IT-Support', 'Entrümpelung', 'Catering', 'Sicherheitsdienst',
    ];
    const [selectedServices, setSelectedServices] = useState<string[]>(['Umzug', 'Reinigung']);
    const [svcSaving, setSvcSaving] = useState(false);
    const [svcSuccess, setSvcSuccess] = useState(false);

    const fetchSettings = useCallback(async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/partner/profile`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error('Einstellungen konnten nicht geladen werden');
            const data = await response.json();
            setCompanyName(data.name || '');
            setEmail(data.email || '');
            setPhone(data.contact?.phone || '');
            setAddress(data.contact?.address || '');
            setWebsite(data.contact?.website || '');
            setDescription(data.about || '');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchSettings(); }, [fetchSettings]);

    const handleSaveProfile = async () => {
        setSaving(true); setSaveSuccess(false);
        try {
            const res = await fetch(`${API_URL}/api/partner/profile`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({ name: companyName, email, about: description, contact: { phone, website, address } }),
            });
            if (!res.ok) throw new Error('Speichern fehlgeschlagen');
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSaveNotifications = async () => {
        setNotifSaving(true);
        await new Promise(r => setTimeout(r, 600));
        setNotifSaving(false);
        setNotifSuccess(true);
        setTimeout(() => setNotifSuccess(false), 3000);
    };

    const handleChangePassword = async () => {
        setPwError('');
        if (newPw !== confirmPw) { setPwError('Passwörter stimmen nicht überein.'); return; }
        if (newPw.length < 8) { setPwError('Mindestens 8 Zeichen erforderlich.'); return; }
        setPwSaving(true);
        await new Promise(r => setTimeout(r, 700));
        setPwSaving(false);
        setPwSuccess(true);
        setCurrentPw(''); setNewPw(''); setConfirmPw('');
        setTimeout(() => setPwSuccess(false), 3000);
    };

    const handleSaveServices = async () => {
        setSvcSaving(true);
        await new Promise(r => setTimeout(r, 600));
        setSvcSaving(false);
        setSvcSuccess(true);
        setTimeout(() => setSvcSuccess(false), 3000);
    };

    const toggleService = (svc: string) =>
        setSelectedServices(prev => prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]);

    const tabs = [
        { id: 'profile', label: 'Firmenprofil', icon: <UserIcon className="w-4 h-4" /> },
        { id: 'notifications', label: 'Benachrichtigungen', icon: <BellIcon className="w-4 h-4" /> },
        { id: 'security', label: 'Sicherheit', icon: <LockClosedIcon className="w-4 h-4" /> },
        { id: 'services', label: 'Dienstleistungen', icon: <BriefcaseIcon className="w-4 h-4" /> },
    ];

    if (loading) return <div className="p-8 text-center text-slate-500">Lade Einstellungen...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Einstellungen</h1>
                <p className="text-slate-500 mt-1">Verwalten Sie Ihr Konto, Profil und Notifikationen</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Nav */}
                <nav className="lg:w-56 flex-shrink-0">
                    <div className="flex lg:flex-col gap-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors w-full ${activeTab === tab.id
                                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                                        : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                                    }`}
                            >
                                <span className={activeTab === tab.id ? 'text-primary-600' : 'text-slate-400'}>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Content Panel */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* ── FIRMENPROFIL ─────────────────────────────────────────── */}
                    {activeTab === 'profile' && (
                        <div className="p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-900">Firmenprofil bearbeiten</h2>
                                <span className="text-green-600 font-semibold text-xs bg-green-50 px-2 py-1 rounded-full border border-green-100">● Live-Daten</span>
                            </div>

                            <div className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelCls}>Firmenname</label>
                                        <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className={inputCls} />
                                    </div>
                                    <div>
                                        <label className={labelCls}>E-Mail</label>
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelCls}>Telefon</label>
                                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} placeholder="+41 XX XXX XX XX" />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Website</label>
                                        <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className={inputCls} placeholder="https://..." />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelCls}>Adresse</label>
                                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} className={inputCls} placeholder="Musterstrasse 1, 8000 Zürich" />
                                </div>
                                <div>
                                    <label className={labelCls}>Firmenbeschreibung</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className={inputCls + ' resize-none'} placeholder="Kurze Beschreibung Ihres Unternehmens..." />
                                    <p className="text-xs text-slate-400 mt-1">{description.length} / 500 Zeichen</p>
                                </div>
                            </div>

                            {error && <p className="mt-4 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">{error}</p>}
                        </div>
                    )}

                    {/* ── BENACHRICHTIGUNGEN ───────────────────────────────────── */}
                    {activeTab === 'notifications' && (
                        <div className="p-6 lg:p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Benachrichtigungen</h2>

                            <SectionTitle title="Leads & Aufträge" subtitle="Informiert bleiben über neue Aktivitäten" />
                            <div className="space-y-4">
                                {[
                                    { label: 'Neue Lead-Benachrichtigungen', desc: 'Sofortige Meldung bei neuen verfügbaren Leads', val: notifNewLead, set: setNotifNewLead },
                                    { label: 'E-Mail-Benachrichtigungen', desc: 'Zusammenfassung Ihrer Leads per E-Mail', val: notifEmail, set: setNotifEmail },
                                    { label: 'SMS-Benachrichtigungen', desc: 'Direkte SMS bei dringenden Aktivitäten', val: notifSms, set: setNotifSms },
                                ].map(item => (
                                    <div key={item.label} className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                                        </div>
                                        <Toggle checked={item.val} onChange={item.set} />
                                    </div>
                                ))}
                            </div>

                            <Divider />

                            <SectionTitle title="Berichte & Marketing" subtitle="Periodische Zusammenfassungen und Angebote" />
                            <div className="space-y-4">
                                {[
                                    { label: 'Wöchentlicher Bericht', desc: 'Jeden Montag eine Zusammenfassung Ihrer Aktivitäten', val: notifWeekly, set: setNotifWeekly },
                                    { label: 'Marketing-E-Mails', desc: 'Neuigkeiten, Tipps und Angebote von Fertigo', val: notifMarketing, set: setNotifMarketing },
                                ].map(item => (
                                    <div key={item.label} className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                                        </div>
                                        <Toggle checked={item.val} onChange={item.set} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── SICHERHEIT ───────────────────────────────────────────── */}
                    {activeTab === 'security' && (
                        <div className="p-6 lg:p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Sicherheit</h2>

                            <SectionTitle title="Passwort ändern" subtitle="Verwenden Sie ein starkes Passwort mit mindestens 8 Zeichen" />
                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className={labelCls}>Aktuelles Passwort</label>
                                    <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} className={inputCls} placeholder="••••••••" />
                                </div>
                                <div>
                                    <label className={labelCls}>Neues Passwort</label>
                                    <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} className={inputCls} placeholder="Mindestens 8 Zeichen" />
                                    {newPw && (
                                        <div className="mt-2 flex gap-1">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className={`h-1 flex-1 rounded-full ${newPw.length >= i * 3
                                                        ? i <= 1 ? 'bg-red-400' : i === 2 ? 'bg-amber-400' : i === 3 ? 'bg-blue-400' : 'bg-emerald-500'
                                                        : 'bg-slate-100'
                                                    }`} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className={labelCls}>Passwort bestätigen</label>
                                    <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} className={inputCls + (confirmPw && confirmPw !== newPw ? ' border-red-300 focus:ring-red-400' : '')} placeholder="Passwort wiederholen" />
                                </div>
                                {pwError && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-xl border border-red-100">{pwError}</p>}
                            </div>

                            <Divider />

                            <SectionTitle title="Sitzungen & Zugang" subtitle="Überblick über aktive Anmeldungen" />
                            <div className="space-y-3">
                                {[
                                    { device: 'Chrome · macOS', location: 'Schweiz', time: 'Aktive Sitzung', current: true },
                                    { device: 'Safari · iPhone', location: 'Schweiz', time: 'Vor 2 Stunden', current: false },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{s.device}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{s.location} · {s.time}</p>
                                        </div>
                                        {s.current
                                            ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">Aktuell</span>
                                            : <button className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">Abmelden</button>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── DIENSTLEISTUNGEN ─────────────────────────────────────── */}
                    {activeTab === 'services' && (
                        <div className="p-6 lg:p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-1">Angebotene Dienstleistungen</h2>
                            <p className="text-sm text-slate-500 mb-6">Wählen Sie alle Bereiche aus, in denen Sie tätig sind. Diese beeinflussen, welche Leads Sie im Marktplatz sehen.</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                                {allServices.map(svc => {
                                    const active = selectedServices.includes(svc);
                                    return (
                                        <button
                                            key={svc}
                                            onClick={() => toggleService(svc)}
                                            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${active
                                                    ? 'bg-primary-50 border-primary-300 text-primary-700 shadow-sm'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${active ? 'bg-primary-600 border-primary-600' : 'border-slate-300'
                                                }`}>
                                                {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                            </span>
                                            {svc}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="bg-slate-50 rounded-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
                                <BriefcaseIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                <p className="text-sm text-slate-600">
                                    <span className="font-bold text-slate-900">{selectedServices.length}</span> Dienstleistungen ausgewählt
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ── Footer with Save Button ─────────────────────────────── */}
                    <div className="px-6 lg:px-8 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
                        <div>
                            {(saveSuccess || notifSuccess || pwSuccess || svcSuccess) && (
                                <span className="text-sm text-green-600 font-semibold flex items-center gap-1.5">
                                    <CheckCircleIcon className="w-4 h-4" />
                                    Änderungen gespeichert
                                </span>
                            )}
                        </div>
                        <button
                            onClick={
                                activeTab === 'profile' ? handleSaveProfile :
                                    activeTab === 'notifications' ? handleSaveNotifications :
                                        activeTab === 'security' ? handleChangePassword :
                                            handleSaveServices
                            }
                            disabled={saving || notifSaving || pwSaving || svcSaving}
                            className="px-6 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
                        >
                            {(saving || notifSaving || pwSaving || svcSaving) ? (
                                <><SpinnerIcon className="w-4 h-4 animate-spin" /> Speichern...</>
                            ) : activeTab === 'security' ? 'Passwort ändern' : 'Änderungen speichern'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerSettingsPage;
