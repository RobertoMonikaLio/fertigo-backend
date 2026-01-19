
import React, { useState, useMemo, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { 
    MagnifyingGlassIcon, EyeIcon, TrashIcon, BriefcaseIcon, 
    ChevronUpDownIcon, MapPinIcon, XMarkIcon, MailIcon, 
    PhoneIcon, UserIcon, CalendarDaysIcon, LockClosedIcon, UsersIcon, PencilIcon
} from '../components/icons';

interface User {
    id: number;
    name: string;
    email: string;
    location: string;
    requestCount: number;
    registeredSince: string;
    status: 'Aktiv' | 'Gesperrt';
    requests: { id: number; title: string; }[];
}

const mockUsers: User[] = [
    { id: 101, name: 'Anna Meier', email: 'anna.meier@example.com', location: '8004 Zürich', requestCount: 3, registeredSince: '2024-05-12', status: 'Aktiv', requests: [{id: 1, title: 'Malerarbeiten'}, {id: 10, title: 'Gartenpflege'}] },
    { id: 102, name: 'Peter Schmidt', email: 'p.schmidt@example.com', location: '6000 Luzern', requestCount: 1, registeredSince: '2024-05-10', status: 'Aktiv', requests: [{id: 2, title: 'Gartenpflege'}] },
    { id: 103, name: 'Sandra Keller', email: 's.keller@example.com', location: '8050 Oerlikon', requestCount: 2, registeredSince: '2024-05-05', status: 'Gesperrt', requests: [{id: 3, title: 'Umzugsreinigung'}] },
    { id: 104, name: 'Markus Weber', email: 'm.weber@example.com', location: '1201 Genf', requestCount: 1, registeredSince: '2024-04-01', status: 'Aktiv', requests: [{id: 4, title: 'Bodenleger'}] },
    { id: 105, name: 'Hans Frei', email: 'h.frei@example.com', location: '8400 Winterthur', requestCount: 5, registeredSince: '2024-03-15', status: 'Aktiv', requests: [{id: 6, title: 'Sanitär-Reparatur'}] },
];

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
                        <UserIcon className="w-6 h-6 text-primary-700"/>
                        Benutzerdetails: {user.name}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-slate-50 rounded-lg border">
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><UserIcon className="w-5 h-5"/> Stammdaten</h3>
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Standort:</strong> {user.location}</p>
                            <p><strong>Registriert seit:</strong> {new Date(user.registeredSince).toLocaleDateString('de-CH')}</p>
                        </div>
                         <div className="p-4 bg-slate-50 rounded-lg border">
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><MailIcon className="w-5 h-5"/> Kontaktdaten</h3>
                            <p><strong>E-Mail:</strong> <a href={`mailto:${user.email}`} className="text-primary-600 hover:underline">{user.email}</a></p>
                            <p><strong>Telefon:</strong> 07x xxx xx xx</p>
                        </div>
                    </div>
                     <div className="p-4 bg-slate-50 rounded-lg border">
                        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><BriefcaseIcon className="w-5 h-5"/> Anfragen ({user.requestCount})</h3>
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

const UserEditModal: React.FC<{ user: User; onClose: () => void; onSave: (updatedUser: User) => void; }> = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedUser);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3"><PencilIcon className="w-6 h-6 text-primary-700"/> Benutzer bearbeiten</h2>
                    <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <div className="p-6 space-y-4">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input type="text" id="name" name="name" value={editedUser.name} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">E-Mail</label>
                        <input type="email" id="email" name="email" value={editedUser.email} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Ort</label>
                        <input type="text" id="location" name="location" value={editedUser.location} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md" />
                    </div>
                </div>
                <div className="p-5 bg-slate-100/70 rounded-b-2xl flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">Abbrechen</button>
                    <button type="submit" className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700">Speichern</button>
                </div>
            </form>
        </div>
    );
};

type SortKey = keyof Omit<User, 'id'>;

const AdminUsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>({ key: 'name', direction: 'asc' });
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const sortedUsers = useMemo(() => {
        let sortableItems = [...users].filter(u => {
            const term = searchTerm.toLowerCase();
            const matchesSearch = u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term) || u.location.toLowerCase().includes(term);
            const matchesStatus = statusFilter === 'Alle' || u.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];
                
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

    const handleToggleStatus = (userId: number) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Aktiv' ? 'Gesperrt' : 'Aktiv' } : u));
    };
    
    const handleSaveUser = (updatedUser: User) => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setEditingUser(null);
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

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <AdminHeader title="Benutzer Verwalten" />
                {selectedUser && <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
                {editingUser && <UserEditModal user={editingUser} onClose={() => setEditingUser(null)} onSave={handleSaveUser} />}
                <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
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
                                <table className="w-full text-sm text-left text-slate-600">
                                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                        <tr>
                                            <SortableHeader sortKey="name">Name</SortableHeader>
                                            <SortableHeader sortKey="email">E-Mail</SortableHeader>
                                            <SortableHeader sortKey="location">Ort</SortableHeader>
                                            <SortableHeader sortKey="status">Status</SortableHeader>
                                            <th scope="col" className="px-6 py-3 text-right">Aktionen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedUsers.map(user => (
                                            <tr key={user.id} className="bg-white border-b hover:bg-slate-50">
                                                <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                                                <td className="px-6 py-4">{user.email}</td>
                                                <td className="px-6 py-4">{user.location}</td>
                                                <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>{user.status}</span></td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button onClick={() => setSelectedUser(user)} className="p-2 text-slate-500 hover:text-blue-600" title="Details ansehen"><EyeIcon className="w-5 h-5"/></button>
                                                        <button onClick={() => setEditingUser(user)} className="p-2 text-slate-500 hover:text-green-600" title="Bearbeiten"><PencilIcon className="w-5 h-5"/></button>
                                                        <button onClick={() => handleToggleStatus(user.id)} className="p-2 text-slate-500 hover:text-yellow-600" title={user.status === 'Aktiv' ? 'Sperren' : 'Aktivieren'}><LockClosedIcon className="w-5 h-5"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {sortedUsers.length === 0 && (
                                    <div className="text-center p-12">
                                        <UsersIcon className="w-12 h-12 mx-auto text-slate-300" />
                                        <h3 className="mt-4 text-lg font-semibold text-slate-700">Keine Benutzer gefunden</h3>
                                        <p className="mt-1 text-sm text-slate-500">Ihre Suche oder Filter ergaben keine Treffer.</p>
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
