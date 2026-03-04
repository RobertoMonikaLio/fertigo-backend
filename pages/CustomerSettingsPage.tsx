import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const getCustomerHeaders = () => {
    const stored = localStorage.getItem('fertigo_customer');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const CustomerSettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '', phone: '' });
    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileSaving, setProfileSaving] = useState(false);
    const [pwSaving, setPwSaving] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState(false);
    const [pwSuccess, setPwSuccess] = useState(false);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [pwError, setPwError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/customer/me`, { headers: getCustomerHeaders() });
            if (res.ok) {
                const data = await res.json();
                setProfile({ firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone || '' });
            }
        } finally {
            setProfileLoading(false);
        }
    }, []);

    useEffect(() => { fetchProfile(); }, [fetchProfile]);

    const handleProfileSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileSaving(true);
        setProfileError(null);
        setProfileSuccess(false);
        try {
            const res = await fetch(`${API_URL}/api/customer/me`, {
                method: 'PUT',
                headers: getCustomerHeaders(),
                body: JSON.stringify({ firstName: profile.firstName, lastName: profile.lastName, phone: profile.phone }),
            });
            if (res.ok) {
                const data = await res.json();
                // Update localStorage
                const stored = localStorage.getItem('fertigo_customer');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    localStorage.setItem('fertigo_customer', JSON.stringify({ ...parsed, firstName: data.firstName, lastName: data.lastName }));
                }
                setProfileSuccess(true);
                setTimeout(() => setProfileSuccess(false), 3000);
            } else {
                const data = await res.json();
                setProfileError(data.message || 'Fehler beim Speichern');
            }
        } catch {
            setProfileError('Server nicht erreichbar');
        } finally {
            setProfileSaving(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPwError(null);
        setPwSuccess(false);
        if (passwords.newPass !== passwords.confirm) {
            setPwError('Passwörter stimmen nicht überein');
            return;
        }
        if (passwords.newPass.length < 8) {
            setPwError('Passwort muss mindestens 8 Zeichen lang sein');
            return;
        }
        setPwSaving(true);
        try {
            const res = await fetch(`${API_URL}/api/customer/password`, {
                method: 'PUT',
                headers: getCustomerHeaders(),
                body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.newPass }),
            });
            if (res.ok) {
                setPwSuccess(true);
                setPasswords({ current: '', newPass: '', confirm: '' });
                setTimeout(() => setPwSuccess(false), 3000);
            } else {
                const data = await res.json();
                setPwError(data.message || 'Fehler');
            }
        } catch {
            setPwError('Server nicht erreichbar');
        } finally {
            setPwSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('fertigo_customer');
        navigate('/');
    };

    if (profileLoading) {
        return (
            <div>
                <header className="mb-8">
                    <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">Profil & Einstellungen</h1>
                </header>
                <div className="animate-pulse space-y-4">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
            </div>
        );
    }

    const inputClass = "w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">Profil & Einstellungen</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal mt-2">Verwalten Sie Ihre persönlichen Daten und Ihr Passwort.</p>
            </header>

            <div className="max-w-2xl space-y-8">
                {/* Profile Card */}
                <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-lg border border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">Persönliche Daten</h2>
                    <form onSubmit={handleProfileSave} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Vorname</label>
                                <input className={inputClass} value={profile.firstName} onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Nachname</label>
                                <input className={inputClass} value={profile.lastName} onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))} required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1.5">E-Mail (nicht änderbar)</label>
                            <input className={`${inputClass} opacity-60 cursor-not-allowed`} value={profile.email} disabled />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Telefonnummer</label>
                            <input className={inputClass} value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} placeholder="+41 XX XXX XX XX" />
                        </div>

                        {profileError && <p className="text-red-600 text-sm font-semibold">{profileError}</p>}
                        {profileSuccess && <p className="text-green-600 text-sm font-semibold">✓ Profil gespeichert!</p>}

                        <button type="submit" disabled={profileSaving} className="w-full sm:w-auto bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-all">
                            {profileSaving ? 'Speichern...' : 'Änderungen speichern'}
                        </button>
                    </form>
                </div>

                {/* Password Card */}
                <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-lg border border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">Passwort ändern</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Aktuelles Passwort</label>
                            <input type="password" className={inputClass} value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Neues Passwort</label>
                            <input type="password" className={inputClass} value={passwords.newPass} onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} required minLength={8} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Neues Passwort bestätigen</label>
                            <input type="password" className={inputClass} value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} required />
                        </div>

                        {pwError && <p className="text-red-600 text-sm font-semibold">{pwError}</p>}
                        {pwSuccess && <p className="text-green-600 text-sm font-semibold">✓ Passwort erfolgreich geändert!</p>}

                        <button type="submit" disabled={pwSaving} className="w-full sm:w-auto bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-all">
                            {pwSaving ? 'Ändern...' : 'Passwort ändern'}
                        </button>
                    </form>
                </div>

                {/* Logout */}
                <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-lg border border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">Abmelden</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Sie werden sicher von Ihrem Konto abgemeldet.</p>
                    <button onClick={handleLogout} className="bg-red-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-red-700 transition-all">
                        Jetzt abmelden
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerSettingsPage;
