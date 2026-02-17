
import React, { useState, useEffect, useCallback } from 'react';
import {
    PencilIcon, CheckCircleIcon, SpinnerIcon, XMarkIcon,
    MapPinIcon, MailIcon, PhoneIcon, UsersIcon, CalendarDaysIcon,
    BriefcaseIcon, ShieldCheckIcon, StarIcon, LockClosedIcon, EyeIcon
} from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_provider');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

interface ProviderProfile {
    _id: string;
    name: string;
    email: string;
    location: string;
    services: string[];
    rating: number;
    reviewCount: number;
    balance: number;
    about: string;
    contact: {
        phone: string;
        website: string;
        address: string;
    };
    details: {
        founded: string;
        employees: string;
        uid: string;
    };
}

// --- Skeleton ---
const ProfileSkeleton = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-200" />
            <div className="flex-1 space-y-2">
                <div className="h-7 bg-slate-200 rounded w-52" />
                <div className="h-5 bg-slate-100 rounded w-36" />
            </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-24" />
                    <div className="h-10 bg-slate-100 rounded" />
                </div>
            ))}
        </div>
    </div>
);

const PartnerProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<ProviderProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState('profile');

    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [about, setAbout] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');
    const [founded, setFounded] = useState('');
    const [employees, setEmployees] = useState('');
    const [uid, setUid] = useState('');
    const [services, setServices] = useState<string[]>([]);
    const [newService, setNewService] = useState('');

    // Password
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    const fetchProfile = useCallback(async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/partner/profile`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error('Profil konnte nicht geladen werden');
            const data = await response.json();
            setProfile(data);
            // Populate form fields
            setName(data.name || '');
            setEmail(data.email || '');
            setLocation(data.location || '');
            setAbout(data.about || '');
            setPhone(data.contact?.phone || '');
            setWebsite(data.contact?.website || '');
            setAddress(data.contact?.address || '');
            setFounded(data.details?.founded || '');
            setEmployees(data.details?.employees || '');
            setUid(data.details?.uid || '');
            setServices(data.services || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleSave = async () => {
        setSaving(true);
        setSaveSuccess(false);
        try {
            const response = await fetch(`${API_URL}/api/partner/profile`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    name, email, location, about, services,
                    contact: { phone, website, address },
                    details: { founded, employees, uid },
                }),
            });
            if (!response.ok) throw new Error('Speichern fehlgeschlagen');
            const data = await response.json();
            setProfile(data);
            setSaveSuccess(true);
            setIsEditing(false);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess(false);

        if (newPassword.length < 6) {
            setPasswordError('Neues Passwort muss mindestens 6 Zeichen lang sein');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwörter stimmen nicht überein');
            return;
        }

        setPasswordSaving(true);
        try {
            const response = await fetch(`${API_URL}/api/partner/password`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Passwort konnte nicht geändert werden');
            setPasswordSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setPasswordSuccess(false), 3000);
        } catch (err: any) {
            setPasswordError(err.message);
        } finally {
            setPasswordSaving(false);
        }
    };

    const addService = () => {
        if (newService.trim() && !services.includes(newService.trim())) {
            setServices([...services, newService.trim()]);
            setNewService('');
        }
    };

    const removeService = (service: string) => {
        setServices(services.filter(s => s !== service));
    };

    if (loading) return <ProfileSkeleton />;

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <p className="text-red-600 font-bold text-lg mb-2">Fehler beim Laden</p>
                    <p className="text-red-500 mb-4">{error}</p>
                    <button onClick={() => { setLoading(true); fetchProfile(); }} className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700">
                        Erneut versuchen
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-black text-white">{profile?.name?.charAt(0)?.toUpperCase() || 'P'}</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{profile?.name}</h1>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> {profile?.location}</span>
                            {profile?.rating !== undefined && profile.rating > 0 && (
                                <span className="flex items-center gap-1"><StarIcon className="w-4 h-4 text-yellow-500" /> {profile.rating} ({profile.reviewCount})</span>
                            )}
                            <span className="text-green-600 font-semibold">● Live</span>
                        </div>
                    </div>
                </div>
                {!isEditing && activeSection === 'profile' && (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-md transition-all">
                        <PencilIcon className="w-4 h-4" /> Profil bearbeiten
                    </button>
                )}
            </div>

            {/* Success Banner */}
            {saveSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl flex items-center gap-2 animate-fade-in">
                    <CheckCircleIcon className="w-5 h-5" /> Profil erfolgreich gespeichert!
                </div>
            )}

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-slate-200 pb-1">
                {[
                    { id: 'profile', label: 'Profil', icon: <UsersIcon className="w-4 h-4" /> },
                    { id: 'security', label: 'Sicherheit', icon: <LockClosedIcon className="w-4 h-4" /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSection(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-t-lg transition-colors ${activeSection === tab.id
                                ? 'text-primary-700 border-b-2 border-primary-600 bg-primary-50/50'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Profile Section */}
            {activeSection === 'profile' && (
                <div className="space-y-6">
                    {/* General Info */}
                    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                            <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
                            <h2 className="text-lg font-bold text-slate-800">Allgemeine Informationen</h2>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Firmenname</label>
                                    <input value={name} onChange={e => setName(e.target.value)} disabled={!isEditing}
                                        className={`w-full p-3 rounded-lg border ${isEditing ? 'border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500' : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'} outline-none transition-all`} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-Mail</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} disabled={!isEditing} type="email"
                                        className={`w-full p-3 rounded-lg border ${isEditing ? 'border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500' : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'} outline-none transition-all`} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Standort</label>
                                    <input value={location} onChange={e => setLocation(e.target.value)} disabled={!isEditing}
                                        className={`w-full p-3 rounded-lg border ${isEditing ? 'border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500' : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'} outline-none transition-all`} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Über uns</label>
                                <textarea value={about} onChange={e => setAbout(e.target.value)} disabled={!isEditing} rows={4}
                                    className={`w-full p-3 rounded-lg border ${isEditing ? 'border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500' : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'} outline-none transition-all resize-none`} />
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                            <PhoneIcon className="w-6 h-6 text-primary-600" />
                            <h2 className="text-lg font-bold text-slate-800">Kontaktdaten</h2>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Telefon</label>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} disabled={!isEditing}
                                        className={`w-full p-3 rounded-lg border ${isEditing ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'} outline-none transition-all`} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Webseite</label>
                                    <input value={website} onChange={e => setWebsite(e.target.value)} disabled={!isEditing}
                                        className={`w-full p-3 rounded-lg border ${isEditing ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'} outline-none transition-all`} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Adresse</label>
                                <input value={address} onChange={e => setAddress(e.target.value)} disabled={!isEditing}
                                    className={`w-full p-3 rounded-lg border ${isEditing ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'} outline-none transition-all`} />
                            </div>
                        </div>
                    </div>

                    {/* Company Details */}
                    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                            <BriefcaseIcon className="w-6 h-6 text-primary-600" />
                            <h2 className="text-lg font-bold text-slate-800">Firmendaten</h2>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gegründet</label>
                                    <input value={founded} onChange={e => setFounded(e.target.value)} disabled={!isEditing}
                                        className={`w-full p-3 rounded-lg border ${isEditing ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'} outline-none transition-all`} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mitarbeiter</label>
                                    <input value={employees} onChange={e => setEmployees(e.target.value)} disabled={!isEditing}
                                        className={`w-full p-3 rounded-lg border ${isEditing ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'} outline-none transition-all`} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">UID</label>
                                    <input value={uid} onChange={e => setUid(e.target.value)} disabled={!isEditing}
                                        className={`w-full p-3 rounded-lg border ${isEditing ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'} outline-none transition-all`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                            <CheckCircleIcon className="w-6 h-6 text-primary-600" />
                            <h2 className="text-lg font-bold text-slate-800">Dienstleistungen</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {services.map(service => (
                                    <span key={service} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full border border-primary-200">
                                        {service}
                                        {isEditing && (
                                            <button onClick={() => removeService(service)} className="text-primary-400 hover:text-red-500 transition-colors">
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </span>
                                ))}
                                {services.length === 0 && <p className="text-slate-500 text-sm">Keine Dienstleistungen hinzugefügt</p>}
                            </div>
                            {isEditing && (
                                <div className="flex gap-2">
                                    <input
                                        value={newService}
                                        onChange={e => setNewService(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addService())}
                                        placeholder="z.B. Malerarbeiten"
                                        className="flex-1 p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    />
                                    <button onClick={addService} className="px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors">
                                        Hinzufügen
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Save / Cancel buttons */}
                    {isEditing && (
                        <div className="flex justify-end gap-3 pt-2">
                            <button onClick={() => { setIsEditing(false); fetchProfile(); }} className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                                Abbrechen
                            </button>
                            <button onClick={handleSave} disabled={saving} className="px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 disabled:opacity-70 shadow-md transition-all flex items-center gap-2">
                                {saving ? <><SpinnerIcon className="w-5 h-5 animate-spin" /> Speichern...</> : <><CheckCircleIcon className="w-5 h-5" /> Änderungen speichern</>}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                        <LockClosedIcon className="w-6 h-6 text-primary-600" />
                        <h2 className="text-lg font-bold text-slate-800">Passwort ändern</h2>
                    </div>
                    <form onSubmit={handlePasswordChange} className="p-6 space-y-5">
                        {passwordError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-sm font-medium">
                                {passwordError}
                            </div>
                        )}
                        {passwordSuccess && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4" /> Passwort erfolgreich geändert!
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Aktuelles Passwort</label>
                            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required
                                className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Neues Passwort</label>
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6}
                                className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Neues Passwort bestätigen</label>
                            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required minLength={6}
                                className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
                        </div>
                        <div className="flex justify-end pt-3">
                            <button type="submit" disabled={passwordSaving} className="px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 disabled:opacity-70 shadow-md transition-all flex items-center gap-2">
                                {passwordSaving ? <><SpinnerIcon className="w-5 h-5 animate-spin" /> Speichern...</> : <><LockClosedIcon className="w-5 h-5" /> Passwort ändern</>}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PartnerProfilePage;
