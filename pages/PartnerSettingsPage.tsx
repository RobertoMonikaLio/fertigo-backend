import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const PartnerSettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Profile settings
    const [companyName, setCompanyName] = useState('Maler Müller AG');
    const [contactPerson, setContactPerson] = useState('Markus Müller');
    const [email, setEmail] = useState('info@malermueller.ch');
    const [phone, setPhone] = useState('+41 44 123 45 67');
    const [address, setAddress] = useState('Bahnhofstrasse 12, 8001 Zürich');
    const [website, setWebsite] = useState('www.malermueller.ch');
    const [description, setDescription] = useState('Professionelle Malerarbeiten seit über 20 Jahren. Wir bieten Innen- und Aussenmalerarbeiten, Tapezierarbeiten und Fassadenrenovationen.');

    // Notification settings
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [newLeadNotification, setNewLeadNotification] = useState(true);
    const [messageNotification, setMessageNotification] = useState(true);
    const [billingNotification, setBillingNotification] = useState(true);

    // Lead preferences
    const [maxDistance, setMaxDistance] = useState(30);
    const [autoAccept, setAutoAccept] = useState(false);
    const [minBudget, setMinBudget] = useState(500);

    const handleSave = async () => {
        setSaving(true);
        // Simulate save
        await new Promise(r => setTimeout(r, 800));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const tabs = [
        { id: 'profile', label: 'Firmenprofil', icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        )},
        { id: 'notifications', label: 'Benachrichtigungen', icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
        )},
        { id: 'leads', label: 'Lead-Präferenzen', icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        )},
        { id: 'security', label: 'Sicherheit', icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        )},
    ];

    const Toggle: React.FC<{ enabled: boolean; onChange: (v: boolean) => void }> = ({ enabled, onChange }) => (
        <button
            type="button"
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-primary-600' : 'bg-slate-300'}`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    );

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Einstellungen</h1>
                <p className="text-slate-500 mt-1">Verwalten Sie Ihr Konto und Ihre Präferenzen</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Tabs */}
                <nav className="lg:w-56 flex-shrink-0">
                    <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
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

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="p-6 lg:p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Firmenprofil</h2>
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Firmenname</label>
                                        <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ansprechpartner</label>
                                        <input type="text" value={contactPerson} onChange={e => setContactPerson(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-Mail</label>
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Telefon</label>
                                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Adresse</label>
                                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Website</label>
                                        <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Firmenbeschreibung</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div className="p-6 lg:p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Benachrichtigungen</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Kanäle</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">E-Mail-Benachrichtigungen</p>
                                                <p className="text-xs text-slate-500">Erhalten Sie Updates per E-Mail</p>
                                            </div>
                                            <Toggle enabled={emailNotifications} onChange={setEmailNotifications} />
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">Push-Benachrichtigungen</p>
                                                <p className="text-xs text-slate-500">Browser-Benachrichtigungen aktivieren</p>
                                            </div>
                                            <Toggle enabled={pushNotifications} onChange={setPushNotifications} />
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">SMS-Benachrichtigungen</p>
                                                <p className="text-xs text-slate-500">Wichtige Updates per SMS erhalten</p>
                                            </div>
                                            <Toggle enabled={smsNotifications} onChange={setSmsNotifications} />
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-slate-200" />
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Ereignisse</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">Neue Leads</p>
                                                <p className="text-xs text-slate-500">Bei neuen passenden Leads benachrichtigen</p>
                                            </div>
                                            <Toggle enabled={newLeadNotification} onChange={setNewLeadNotification} />
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">Neue Nachrichten</p>
                                                <p className="text-xs text-slate-500">Bei neuen Kundennachrichten benachrichtigen</p>
                                            </div>
                                            <Toggle enabled={messageNotification} onChange={setMessageNotification} />
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">Abrechnungen</p>
                                                <p className="text-xs text-slate-500">Bei Guthabenänderungen benachrichtigen</p>
                                            </div>
                                            <Toggle enabled={billingNotification} onChange={setBillingNotification} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Lead Preferences Tab */}
                    {activeTab === 'leads' && (
                        <div className="p-6 lg:p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Lead-Präferenzen</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Maximale Entfernung: <span className="text-primary-600">{maxDistance} km</span></label>
                                    <input type="range" min="5" max="100" value={maxDistance} onChange={e => setMaxDistance(Number(e.target.value))} className="w-full accent-primary-600" />
                                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                                        <span>5 km</span>
                                        <span>100 km</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mindestbudget: <span className="text-primary-600">CHF {minBudget}</span></label>
                                    <input type="range" min="0" max="5000" step="100" value={minBudget} onChange={e => setMinBudget(Number(e.target.value))} className="w-full accent-primary-600" />
                                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                                        <span>CHF 0</span>
                                        <span>CHF 5'000</span>
                                    </div>
                                </div>
                                <hr className="border-slate-200" />
                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Auto-Accept Leads</p>
                                        <p className="text-xs text-slate-500">Passende Leads automatisch annehmen (Guthaben wird belastet)</p>
                                    </div>
                                    <Toggle enabled={autoAccept} onChange={setAutoAccept} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="p-6 lg:p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Sicherheit</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Passwort ändern</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Aktuelles Passwort</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Neues Passwort</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Passwort bestätigen</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-slate-200" />
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Konto</h3>
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <p className="text-sm font-semibold text-red-700">Konto löschen</p>
                                        <p className="text-xs text-red-500 mt-1 mb-3">Diese Aktion kann nicht rückgängig gemacht werden. Alle Daten werden permanent gelöscht.</p>
                                        <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
                                            Konto unwiderruflich löschen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="px-6 lg:px-8 py-4 border-t border-slate-200 flex items-center justify-between">
                        <div>
                            {saved && (
                                <span className="text-sm text-green-600 font-semibold flex items-center gap-1.5">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Änderungen gespeichert
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Speichern...
                                </>
                            ) : 'Änderungen speichern'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerSettingsPage;
