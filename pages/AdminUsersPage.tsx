
import React, { useState, useMemo, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import {
    MagnifyingGlassIcon, EyeIcon, TrashIcon, BriefcaseIcon,
    ChevronUpDownIcon, MapPinIcon, XMarkIcon, MailIcon,
    PhoneIcon, UserIcon, CalendarDaysIcon, LockClosedIcon, UsersIcon, PencilIcon
} from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL;

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    requestCount: number;
    registeredSince: string;
    status: 'Aktiv' | 'Gesperrt';
    requests: { id: string; title: string; }[];
}

const getStatusBadge = (status: User['status']) => {
    switch (status) {
        case 'Aktiv': return 'bg-green-100 text-green-800';
        case 'Gesperrt': return 'bg-red-100 text-red-800';
    }
};

const UserDetailModal: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                        <UserIcon className="w-6 h-6 text-primary-700" />
                        Benutzerdetails: {user.name}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-slate-50 rounded-lg border">
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><UserIcon className="w-5 h-5" /> Stammdaten</h3>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Standort:</strong> {user.location || '–'}</p>
                            <p><strong>Registriert seit:</strong> {user.registeredSince ? new Date(user.registeredSince).toLocaleDateString('de-CH') : '–'}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border">
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><MailIcon className="w-5 h-5" /> Kontaktdaten</h3>
                            <p><strong>E-Mail:</strong> <a href={`mailto:${user.email}`} className="text-primary-600 hover:underline">{user.email}</a></p>
                            <p><strong>Telefon:</strong> {user.phone || '–'}</p>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border">
                        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><BriefcaseIcon className="w-5 h-5" /> Anfragen ({user.requestCount})</h3>
                        {user.requests.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1">
                                {user.requests.map(req => <li key={req.id}>{req.title}</li>)}
                            </ul>
                        ) : <p>Keine Anfragen vorhanden.</p>}
                    </div>
                </div>
                <div className="p-5 bg-slate-100/70 rounded-b-2xl flex justify-end"><button onClick={onClose} className="bg-slate-200 text-slate-800 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-300">Schliessen</button></div>
            </div>
        </div>
    );
};

type SortKey = 'name' | 'email' | 'location' | 'status' | 'requestCount' | 'registeredSince';

const AdminUsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>({ key: 'name', direction: 'asc' });
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Fehler beim Laden der Benutzer');
            const data = await response.json();
            setUsers(data);
        } catch (err: any) {
            setError(err.message || 'Verbindungsfehler');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const sortedUsers = useMemo(() => {
        let sortableItems = [...users].filter(u => {
            const term = searchTerm.toLowerCase();
            const matchesSearch = u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term) || (u.location || '').toLowerCase().includes(term);
            const matchesStatus = statusFilter === 'Alle' || u.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const valA = (a as any)[sortConfig.key];
                const valB = (b as any)[sortConfig.key];

                let comparison = 0;
                if (valA > valB) {
                    comparison = 1;
                } else if (valA < valB) {
                    comparison = -1;
                }
                return sortConfig.direction === 'desc' ? comparison * -1 : comparison;
            });
        }
        return sortableItems;
    }, [searchTerm, statusFilter, users, sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleToggleStatus = (userId: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Aktiv' ? 'Gesperrt' : 'Aktiv' } : u));
    };

    const SortableHeader: React.FC<{ sortKey: SortKey, children: React.ReactNode }> = ({ sortKey, children }) => {
        const isSorted = sortConfig?.key === sortKey;
        const directionIcon = isSorted ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '';
        return (
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort(sortKey)}>
                <div className="flex items-center gap-2">
                    {children} <span className="text-xs">{directionIcon}</span>
                </div>
            </th>
        );
    };

    const LoadingSkeleton = () => (
        <div className="animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 border-b">
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <AdminHeader title="Benutzer Verwalten" />
                {selectedUser && <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
                <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {/* Live data indicator */}
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                {loading ? 'Lade Daten...' : `${users.length} Benutzer gefunden`}
                                <span className="ml-2 text-green-600 font-semibold">● Live-Daten</span>
                            </p>
                            <button onClick={fetchUsers} className="text-sm text-primary-600 hover:text-primary-800 font-semibold">
                                ↻ Aktualisieren
                            </button>
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                                <p className="font-bold">Fehler</p>
                                <p>{error}</p>
                                <button onClick={fetchUsers} className="mt-2 text-sm font-semibold text-red-800 hover:underline">Erneut versuchen</button>
                            </div>
                        )}

                        <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg">
                            <div className="p-4 border-b border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                <div className="relative md:col-span-2">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input type="search" placeholder="Suche nach Name, E-Mail, Ort..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div className="relative">
                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full appearance-none px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                                        <option value="Alle">Alle Status</option>
                                        <option value="Aktiv">Aktiv</option>
                                        <option value="Gesperrt">Gesperrt</option>
                                    </select>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                {loading ? <LoadingSkeleton /> : (
                                    <table className="w-full text-sm text-left text-slate-600">
                                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                            <tr>
                                                <SortableHeader sortKey="name">Name</SortableHeader>
                                                <SortableHeader sortKey="email">E-Mail</SortableHeader>
                                                <SortableHeader sortKey="location">Ort</SortableHeader>
                                                <SortableHeader sortKey="requestCount">Anfragen</SortableHeader>
                                                <SortableHeader sortKey="status">Status</SortableHeader>
                                                <th scope="col" className="px-6 py-3 text-right">Aktionen</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedUsers.map(user => (
                                                <tr key={user.id} className="bg-white border-b hover:bg-slate-50">
                                                    <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                                                    <td className="px-6 py-4">{user.email}</td>
                                                    <td className="px-6 py-4">{user.location || '–'}</td>
                                                    <td className="px-6 py-4 font-semibold">{user.requestCount}</td>
                                                    <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>{user.status}</span></td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button onClick={() => setSelectedUser(user)} className="p-2 text-slate-500 hover:text-blue-600" title="Details ansehen"><EyeIcon className="w-5 h-5" /></button>
                                                            <button onClick={() => handleToggleStatus(user.id)} className="p-2 text-slate-500 hover:text-yellow-600" title={user.status === 'Aktiv' ? 'Sperren' : 'Aktivieren'}><LockClosedIcon className="w-5 h-5" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {!loading && sortedUsers.length === 0 && (
                                    <div className="text-center p-12">
                                        <UsersIcon className="w-12 h-12 mx-auto text-slate-300" />
                                        <h3 className="mt-4 text-lg font-semibold text-slate-700">
                                            {users.length === 0 ? 'Noch keine Benutzer vorhanden' : 'Keine Benutzer gefunden'}
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {users.length === 0
                                                ? 'Sobald Kunden Anfragen erstellen, erscheinen sie hier.'
                                                : 'Ihre Suche oder Filter ergaben keine Treffer.'
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminUsersPage;
