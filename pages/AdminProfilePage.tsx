
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import {
    PencilIcon, MailIcon, PhoneIcon, LockClosedIcon,
    UserIcon as SimpleUserIcon, CheckCircleIcon, XMarkIcon
} from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL;

interface ProfileData {
    person: {
        anrede: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        position: string;
    };
}

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; actionButton?: React.ReactNode; children: React.ReactNode; }> = ({ title, icon, actionButton, children }) => (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg">
        <div className="p-5 border-b border-slate-200/80 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="text-primary-700">{icon}</div>
                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            </div>
            {actionButton}
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const InfoItem: React.FC<{ label: string, value: React.ReactNode, icon: React.ReactNode }> = ({ label, value, icon }) => (
    <li className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-b-0">
        <div className="w-8 text-slate-400 flex-shrink-0">{icon}</div>
        <div className="flex-1">
            <p className="text-xs text-slate-500 font-medium">{label}</p>
            <div className="font-semibold text-slate-700 break-words">{value}</div>
        </div>
    </li>
);

const EditField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; icon: React.ReactNode }> = ({ label, name, value, onChange, icon }) => (
    <div>
        <label htmlFor={name} className="text-xs text-slate-500 font-medium flex items-center gap-2 mb-1">
            <div className="w-5">{icon}</div>
            {label}
        </label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full font-semibold text-slate-700 bg-slate-50 rounded-md p-2 border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
        />
    </div>
);

const AdminProfilePage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentData, setCurrentData] = useState<ProfileData>({ person: { anrede: '', firstName: '', lastName: '', email: '', phone: '', position: '' } });
    const [editableData, setEditableData] = useState<ProfileData>({ person: { anrede: '', firstName: '', lastName: '', email: '', phone: '', position: '' } });
    const [showProfileSuccess, setShowProfileSuccess] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({ current: '', newPass: '', confirmPass: '' });
    const [passwordError, setPasswordError] = useState('');
    const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/admin/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Fehler beim Laden des Profils');
            const data = await response.json();
            setCurrentData(data);
            setEditableData(data);
        } catch (err: any) {
            setError(err.message || 'Verbindungsfehler');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        setEditableData(prevData => {
            const newData = JSON.parse(JSON.stringify(prevData));
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/admin/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editableData.person)
            });
            if (!response.ok) throw new Error('Fehler beim Speichern');
            setCurrentData(editableData);
            setIsEditing(false);
            setShowProfileSuccess(true);
            setTimeout(() => setShowProfileSuccess(false), 4000);
        } catch (err: any) {
            setError(err.message || 'Speichern fehlgeschlagen');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setEditableData(currentData);
        setIsEditing(false);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        setPasswordError('');
    };

    const handlePasswordSave = async () => {
        if (passwordData.newPass.length < 8) {
            setPasswordError('Das neue Passwort muss mindestens 8 Zeichen lang sein.');
            return;
        }
        if (passwordData.newPass !== passwordData.confirmPass) {
            setPasswordError('Die neuen Passwörter stimmen nicht überein.');
            return;
        }

        try {
            setSaving(true);
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/admin/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.current,
                    newPassword: passwordData.newPass
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Fehler beim Ändern des Passworts');
            }
            setPasswordError('');
            setPasswordData({ current: '', newPass: '', confirmPass: '' });
            setIsPasswordModalOpen(false);
            setShowPasswordSuccess(true);
            setTimeout(() => setShowPasswordSuccess(false), 4000);
        } catch (err: any) {
            setPasswordError(err.message || 'Passwort konnte nicht geändert werden');
        } finally {
            setSaving(false);
        }
    };

    const PasswordChangeModal = () => (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsPasswordModalOpen(false)}>
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3"><LockClosedIcon className="w-6 h-6 text-primary-700" /> Passwort ändern</h3>
                    <button onClick={() => setIsPasswordModalOpen(false)} className="text-slate-500 hover:text-slate-800"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <div className="p-6 space-y-4">
                    {passwordError && (
                        <div className="bg-red-100 border-red-300 text-red-800 px-4 py-3 rounded-lg text-sm font-semibold">
                            {passwordError}
                        </div>
                    )}
                    <div>
                        <label htmlFor="current" className="block text-sm font-medium text-slate-700 mb-1">Aktuelles Passwort</label>
                        <input type="password" name="current" id="current" value={passwordData.current} onChange={handlePasswordChange} className="w-full p-3 border-slate-300 rounded-lg shadow-sm bg-white" />
                    </div>
                    <div>
                        <label htmlFor="newPass" className="block text-sm font-medium text-slate-700 mb-1">Neues Passwort</label>
                        <input type="password" name="newPass" id="newPass" value={passwordData.newPass} onChange={handlePasswordChange} className="w-full p-3 border-slate-300 rounded-lg shadow-sm bg-white" />
                    </div>
                    <div>
                        <label htmlFor="confirmPass" className="block text-sm font-medium text-slate-700 mb-1">Neues Passwort bestätigen</label>
                        <input type="password" name="confirmPass" id="confirmPass" value={passwordData.confirmPass} onChange={handlePasswordChange} className="w-full p-3 border-slate-300 rounded-lg shadow-sm bg-white" />
                    </div>
                </div>
                <div className="p-5 bg-slate-50/70 rounded-b-2xl flex justify-end items-center gap-3">
                    <button onClick={() => setIsPasswordModalOpen(false)} className="bg-slate-200 text-slate-800 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-300">Abbrechen</button>
                    <button onClick={handlePasswordSave} disabled={saving} className="bg-primary-600 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-primary-700 shadow-md disabled:opacity-50">
                        {saving ? 'Speichere...' : 'Passwort speichern'}
                    </button>
                </div>
            </div>
        </div>
    );

    // Loading skeleton
    const ProfileSkeleton = () => (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg p-6 animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-slate-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-16"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <AdminSidebar />
            {isPasswordModalOpen && <PasswordChangeModal />}
            <main className="flex-1 flex flex-col">
                <AdminHeader title="Mein Profil" />

                <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Live data indicator */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                {loading ? 'Lade Profil...' : 'Profildaten geladen'}
                                <span className="ml-2 text-green-600 font-semibold">● Live-Daten</span>
                            </p>
                            <button onClick={fetchProfile} className="text-sm text-primary-600 hover:text-primary-800 font-semibold">
                                ↻ Aktualisieren
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                                <p className="font-bold">Fehler</p>
                                <p>{error}</p>
                                <button onClick={fetchProfile} className="mt-2 text-sm font-semibold text-red-800 hover:underline">Erneut versuchen</button>
                            </div>
                        )}

                        {showProfileSuccess && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center gap-3" role="alert">
                                <CheckCircleIcon className="w-6 h-6" />
                                <div>
                                    <p className="font-bold">Erfolgreich gespeichert!</p>
                                    <p>Ihre Profildaten wurden aktualisiert.</p>
                                </div>
                            </div>
                        )}
                        {showPasswordSuccess && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center gap-3" role="alert">
                                <CheckCircleIcon className="w-6 h-6" />
                                <div>
                                    <p className="font-bold">Erfolgreich gespeichert!</p>
                                    <p>Ihr Passwort wurde erfolgreich geändert.</p>
                                </div>
                            </div>
                        )}

                        {loading ? <ProfileSkeleton /> : (
                            <SectionCard
                                title="Persönliche Informationen"
                                icon={<SimpleUserIcon className="w-6 h-6" />}
                                actionButton={
                                    isEditing ? (
                                        <div className="flex items-center gap-2">
                                            <button onClick={handleCancel} className="px-3 py-1.5 text-sm font-semibold text-slate-700 bg-slate-200 rounded-md hover:bg-slate-300">Abbrechen</button>
                                            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50">
                                                <CheckCircleIcon className="w-4 h-4" />
                                                <span>{saving ? 'Speichere...' : 'Speichern'}</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100">
                                            <PencilIcon className="w-4 h-4" />
                                            <span>Bearbeiten</span>
                                        </button>
                                    )
                                }
                            >
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <EditField label="Anrede" name="person.anrede" value={editableData.person.anrede} onChange={handleChange} icon={<SimpleUserIcon className="w-5 h-5" />} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <EditField label="Vorname" name="person.firstName" value={editableData.person.firstName} onChange={handleChange} icon={<SimpleUserIcon className="w-5 h-5" />} />
                                            <EditField label="Nachname" name="person.lastName" value={editableData.person.lastName} onChange={handleChange} icon={<SimpleUserIcon className="w-5 h-5" />} />
                                        </div>
                                        <EditField label="E-Mail" name="person.email" value={editableData.person.email} onChange={handleChange} icon={<MailIcon className="w-5 h-5" />} />
                                        <EditField label="Telefon" name="person.phone" value={editableData.person.phone} onChange={handleChange} icon={<PhoneIcon className="w-5 h-5" />} />
                                        <EditField label="Position" name="person.position" value={editableData.person.position} onChange={handleChange} icon={<SimpleUserIcon className="w-5 h-5" />} />
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-slate-100">
                                        <InfoItem label="Name" value={`${currentData.person.anrede} ${currentData.person.firstName} ${currentData.person.lastName}`} icon={<SimpleUserIcon className="w-5 h-5" />} />
                                        <InfoItem label="E-Mail" value={<a href={`mailto:${currentData.person.email}`} className="hover:underline text-primary-600">{currentData.person.email}</a>} icon={<MailIcon className="w-5 h-5" />} />
                                        <InfoItem label="Telefon" value={currentData.person.phone ? <a href={`tel:${currentData.person.phone}`} className="hover:underline text-primary-600">{currentData.person.phone}</a> : '–'} icon={<PhoneIcon className="w-5 h-5" />} />
                                        <InfoItem label="Position" value={currentData.person.position} icon={<SimpleUserIcon className="w-5 h-5" />} />
                                        <li className="flex items-center gap-4 py-3">
                                            <div className="w-8 text-slate-400 flex-shrink-0"><LockClosedIcon className="w-5 h-5" /></div>
                                            <div className="flex-1 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium">Passwort</p>
                                                    <div className="font-semibold text-slate-700">••••••••</div>
                                                </div>
                                                <button onClick={() => setIsPasswordModalOpen(true)} className="text-sm font-semibold text-primary-600 hover:text-primary-800 bg-primary-50 px-3 py-1.5 rounded-md hover:bg-primary-100">
                                                    Ändern
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                )}
                            </SectionCard>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminProfilePage;
