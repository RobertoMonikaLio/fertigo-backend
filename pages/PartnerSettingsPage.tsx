import React, { useState, useEffect, useCallback } from 'react';
import {
    UserIcon, LockClosedIcon, BellIcon, BriefcaseIcon,
    CheckCircleIcon, SpinnerIcon
} from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_provider');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const PartnerSettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Profile Data
    const [companyName, setCompanyName] = useState('');
    const [contactPerson, setContactPerson] = useState(''); // Note: Backend schema might not have separate contact person name, usually it's 'name' which is company name or person name.
    // Provider model has 'name' (for company/provider name) and 'contact.person' isn't explicit in schema but let's map 'name' to companyName.
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');

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
            // 'contactPerson' is not in standard schema, ignoring or mapping if needed. Using name as main identifier.

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const handleSave = async () => {
        setSaving(true);
        setSaveSuccess(false);
        try {
            const response = await fetch(`${API_URL}/api/partner/profile`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    name: companyName,
                    email,
                    about: description,
                    contact: {
                        phone,
                        website,
                        address
                    }
                }),
            });

            if (!response.ok) throw new Error('Speichern fehlgeschlagen');
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Firmenprofil', icon: <UserIcon className="w-5 h-5" /> },
        // Removed non-functional tabs to avoid dummy data
    ];

    if (loading) return <div className="p-8 text-center text-slate-500">Lade Einstellungen...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Einstellungen</h1>
                <p className="text-slate-500 mt-1">Verwalten Sie Ihr Firmenprofil</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <nav className="lg:w-56 flex-shrink-0">
                    <div className="flex lg:flex-col gap-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors ${activeTab === tab.id
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

                <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    {activeTab === 'profile' && (
                        <div className="p-6 lg:p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Firmenprofil bearbeiten</h2>

                            {/* Live Data Indicator */}
                            <div className="mb-6 flex items-center justify-end">
                                <span className="text-green-600 font-semibold text-xs bg-green-50 px-2 py-1 rounded-full border border-green-100">● Live-Daten</span>
                            </div>

                            <div className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Firmenname</label>
                                        <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-Mail</label>
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Telefon</label>
                                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Website</label>
                                        <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Adresse</label>
                                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Firmenbeschreibung</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="px-6 lg:px-8 py-4 border-t border-slate-200 flex items-center justify-between">
                        <div>
                            {saveSuccess && (
                                <span className="text-sm text-green-600 font-semibold flex items-center gap-1.5 animate-fade-in">
                                    <CheckCircleIcon className="w-4 h-4" />
                                    Änderungen gespeichert
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
                        >
                            {saving ? (
                                <>
                                    <SpinnerIcon className="w-4 h-4 animate-spin" />
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
