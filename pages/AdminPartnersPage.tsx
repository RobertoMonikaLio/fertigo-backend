

import React, { useState, useMemo, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import {
    MagnifyingGlassIcon, EyeIcon, PencilIcon, TrashIcon, UsersIcon, CheckCircleIcon,
    ArrowDownTrayIcon, ChevronUpDownIcon, MapPinIcon, TagIcon, XMarkIcon, MailIcon,
    PhoneIcon, BriefcaseIcon, StarIcon, CalendarDaysIcon, UserIcon, ShieldCheckIcon, PaperClipIcon
} from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL;

interface Partner {
    id: string;
    companyName: string;
    contactPerson: {
        anrede: string;
        name: string;
        position: string;
    };
    email: string;
    phone: string;
    mobile: string;
    services: string[];
    location: string;
    kanton: string;
    status: 'Aktiv' | 'In Prüfung' | 'Gesperrt';
    registrationDate: string;
    uid: string;
    website: string;
    employees: string;
    insuranceProvider: string;
    insuranceDocuments: { name: string; url: string; }[];
    balance: number;
}

const getStatusBadge = (status: Partner['status']) => {
    switch (status) {
        case 'Aktiv': return 'bg-green-100 text-green-800';
        case 'In Prüfung': return 'bg-yellow-100 text-yellow-800';
        case 'Gesperrt': return 'bg-red-100 text-red-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const DetailSection: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="p-4 bg-slate-50 rounded-lg border">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            {icon}
            {title}
        </h3>
        {children}
    </div>
);

const DetailItem: React.FC<{ label: string, value: React.ReactNode }> = ({ label, value }) => (
    <div className="py-1.5 grid grid-cols-3 gap-2">
        <span className="text-slate-500 col-span-1">{label}:</span>
        <span className="text-slate-800 font-medium col-span-2 break-words">{value}</span>
    </div>
);

const PartnerDetailModal: React.FC<{ partner: Partner; onClose: () => void }> = ({ partner, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-detail-title"
        >
            <div
                className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h2 id="partner-detail-title" className="text-xl font-bold text-slate-900 flex items-center gap-3">
                        <UsersIcon className="w-6 h-6 text-primary-700" />
                        Partnerdetails: {partner.companyName}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Schliessen">
                        <XMarkIcon className="w-7 h-7" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    <DetailSection title="Firmendetails" icon={<BriefcaseIcon className="w-5 h-5 text-slate-500" />}>
                        <div className="space-y-1 text-sm">
                            <DetailItem label="Firma" value={partner.companyName} />
                            <DetailItem label="Standort" value={partner.location || '–'} />
                            <DetailItem label="Kanton" value={partner.kanton || '–'} />
                            <DetailItem label="Webseite" value={partner.website ? <a href={`https://${partner.website}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{partner.website}</a> : '–'} />
                            <DetailItem label="Registriert seit" value={partner.registrationDate} />
                            <DetailItem label="Status" value={<span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(partner.status)}`}>{partner.status}</span>} />
                            <DetailItem label="Guthaben" value={`CHF ${(partner.balance || 0).toFixed(2)}`} />
                        </div>
                    </DetailSection>

                    <DetailSection title="Kontaktperson" icon={<UserIcon className="w-5 h-5 text-slate-500" />}>
                        <div className="space-y-1 text-sm">
                            <DetailItem label="Anrede" value={partner.contactPerson.anrede} />
                            <DetailItem label="Name" value={partner.contactPerson.name} />
                            <DetailItem label="Position" value={partner.contactPerson.position} />
                            <DetailItem label="E-Mail" value={partner.email ? <a href={`mailto:${partner.email}`} className="text-primary-600 hover:underline">{partner.email}</a> : '–'} />
                            <DetailItem label="Telefon" value={partner.phone ? <a href={`tel:${partner.phone}`} className="text-primary-600 hover:underline">{partner.phone}</a> : '–'} />
                            <DetailItem label="Mobile" value={partner.mobile ? <a href={`tel:${partner.mobile}`} className="text-primary-600 hover:underline">{partner.mobile}</a> : '–'} />
                        </div>
                    </DetailSection>

                    <DetailSection title="Versicherung" icon={<ShieldCheckIcon className="w-5 h-5 text-slate-500" />}>
                        <div className="space-y-1 text-sm">
                            <DetailItem label="Versicherer" value={partner.insuranceProvider || '–'} />
                            <div className="py-1.5 grid grid-cols-3 gap-2">
                                <span className="text-slate-500 col-span-1">Dokumente:</span>
                                <div className="text-slate-800 font-medium col-span-2">
                                    {partner.insuranceDocuments && partner.insuranceDocuments.length > 0 ? (
                                        <ul className="space-y-2">
                                            {partner.insuranceDocuments.map((doc, index) => (
                                                <li key={index}>
                                                    <a href={doc.url} download className="flex items-center gap-2 text-primary-600 hover:underline">
                                                        <PaperClipIcon className="w-4 h-4" />
                                                        <span>{doc.name}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span>Keine Dokumente hochgeladen</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DetailSection>

                    <DetailSection title="Angebotene Dienstleistungen" icon={<TagIcon className="w-5 h-5 text-slate-500" />}>
                        <div className="flex flex-wrap gap-2">
                            {partner.services && partner.services.length > 0 ? (
                                partner.services.map(service => (
                                    <span key={service} className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-1 rounded-full">{service}</span>
                                ))
                            ) : (
                                <span className="text-sm text-slate-500">Keine Dienstleistungen angegeben</span>
                            )}
                        </div>
                    </DetailSection>
                </div>

                <div className="p-5 bg-slate-100/70 rounded-b-2xl flex justify-end items-center gap-3">
                    <button onClick={onClose} className="bg-slate-200 text-slate-800 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-300 transition-colors">
                        Schliessen
                    </button>
                </div>
            </div>
        </div>
    );
};


const AdminPartnersPage: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [serviceFilter, setServiceFilter] = useState<string>('Alle');
    const [kantonFilter, setKantonFilter] = useState<string>('Alle');
    const [notification, setNotification] = useState<string | null>(null);
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

    const fetchPartners = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/admin/partners`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Fehler beim Laden der Partner');
            const data = await response.json();
            setPartners(data);
        } catch (err: any) {
            setError(err.message || 'Verbindungsfehler');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleDeletePartner = async (partnerId: string) => {
        if (!confirm('Sind Sie sicher, dass Sie diesen Partner löschen möchten?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/admin/partners/${partnerId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Fehler beim Löschen');
            setPartners(partners.filter(p => p.id !== partnerId));
            setNotification('Partner wurde erfolgreich gelöscht.');
            setTimeout(() => setNotification(null), 4000);
        } catch (err: any) {
            setNotification('Fehler: ' + (err.message || 'Konnte nicht gelöscht werden'));
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const availableServices = useMemo(() => {
        const allServices = new Set<string>();
        partners.forEach(p => p.services?.forEach(s => allServices.add(s)));
        return ['Alle', ...Array.from(allServices).sort()];
    }, [partners]);

    const kantons = ['Alle', 'AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH'];

    const filteredPartners = useMemo(() => {
        return partners.filter(p => {
            const term = searchTerm.toLowerCase();

            const matchesSearch = p.companyName.toLowerCase().includes(term) ||
                p.contactPerson.name.toLowerCase().includes(term) ||
                p.email.toLowerCase().includes(term) ||
                (p.location || '').toLowerCase().includes(term) ||
                (p.status || '').toLowerCase().includes(term);

            const matchesService = serviceFilter === 'Alle' || (p.services && p.services.includes(serviceFilter));
            const matchesKanton = kantonFilter === 'Alle' || p.kanton === kantonFilter;

            return matchesSearch && matchesService && matchesKanton;
        });
    }, [searchTerm, serviceFilter, kantonFilter, partners]);

    const exportPartnersToCSV = () => {
        const header = "ID,Firmenname,Ansprechperson,E-Mail,Telefon,Mobile,Standort,Kanton,Status,Registriert,Guthaben,Dienstleistungen\n";
        const rows = filteredPartners.map(p =>
            [
                p.id,
                `"${(p.companyName || '').replace(/"/g, '""')}"`,
                `"${(p.contactPerson.name || '').replace(/"/g, '""')}"`,
                p.email,
                p.phone,
                p.mobile,
                `"${p.location || ''}"`,
                p.kanton,
                p.status,
                p.registrationDate,
                (p.balance || 0).toFixed(2),
                `"${(p.services || []).join(', ')}"`
            ].join(',')
        ).join('\n');

        const csvContent = header + rows;
        const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "partner-export.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewDetails = (partner: Partner) => {
        setSelectedPartner(partner);
    };

    const handleCloseModal = () => {
        setSelectedPartner(null);
    };

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className="animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 border-b">
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/5"></div>
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
                <AdminHeader title="Partner Verwalten" />

                {selectedPartner && <PartnerDetailModal partner={selectedPartner} onClose={handleCloseModal} />}

                <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {/* Live data indicator */}
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                {loading ? 'Lade Daten...' : `${partners.length} Partner gefunden`}
                                <span className="ml-2 text-green-600 font-semibold">● Live-Daten</span>
                            </p>
                            <button onClick={fetchPartners} className="text-sm text-primary-600 hover:text-primary-800 font-semibold">
                                ↻ Aktualisieren
                            </button>
                        </div>

                        {notification && (
                            <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center gap-3 animate-fade-in" role="alert">
                                <CheckCircleIcon className="w-6 h-6" />
                                <div>
                                    <p className="font-bold">Erfolgreich!</p>
                                    <p>{notification}</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                                <p className="font-bold">Fehler</p>
                                <p>{error}</p>
                                <button onClick={fetchPartners} className="mt-2 text-sm font-semibold text-red-800 hover:underline">Erneut versuchen</button>
                            </div>
                        )}

                        <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg">
                            <div className="p-4 border-b border-slate-200/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                                <div className="relative lg:col-span-2">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="search"
                                        placeholder="Suche nach Firma, Person, Ort..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                                <div className="relative">
                                    <TagIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        value={serviceFilter}
                                        onChange={e => setServiceFilter(e.target.value)}
                                        className="w-full appearance-none pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    >
                                        {availableServices.map(service => <option key={service} value={service}>{service === 'Alle' ? 'Alle Dienstleistungen' : service}</option>)}
                                    </select>
                                </div>
                                <div className="relative">
                                    <MapPinIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        value={kantonFilter}
                                        onChange={e => setKantonFilter(e.target.value)}
                                        className="w-full appearance-none pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    >
                                        {kantons.map(kanton => <option key={kanton} value={kanton}>{kanton === 'Alle' ? 'Alle Kantone' : kanton}</option>)}
                                    </select>
                                </div>
                                <button
                                    onClick={exportPartnersToCSV}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold text-sm"
                                >
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                    <span>Exportieren</span>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                {loading ? <LoadingSkeleton /> : (
                                    <table className="w-full text-sm text-left text-slate-600">
                                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Firma</th>
                                                <th scope="col" className="px-6 py-3">Ansprechperson</th>
                                                <th scope="col" className="px-6 py-3">Standort</th>
                                                <th scope="col" className="px-6 py-3">Guthaben</th>
                                                <th scope="col" className="px-6 py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPartners.map(partner => (
                                                <tr key={partner.id} className="bg-white border-b hover:bg-slate-50 cursor-pointer" onClick={() => handleViewDetails(partner)}>
                                                    <td className="px-6 py-4 font-bold text-slate-900">{partner.companyName}</td>
                                                    <td className="px-6 py-4">{partner.contactPerson.name}</td>
                                                    <td className="px-6 py-4">{partner.location || '–'}</td>
                                                    <td className="px-6 py-4 font-semibold">CHF {(partner.balance || 0).toFixed(2)}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusBadge(partner.status)}`}>
                                                            {partner.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {!loading && filteredPartners.length === 0 && (
                                    <div className="text-center p-12">
                                        <UsersIcon className="w-12 h-12 mx-auto text-slate-300" />
                                        <h3 className="mt-4 text-lg font-semibold text-slate-700">
                                            {partners.length === 0 ? 'Noch keine Partner registriert' : 'Keine Partner gefunden'}
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {partners.length === 0
                                                ? 'Sobald sich Handwerker registrieren, erscheinen sie hier.'
                                                : 'Ihre Suche ergab keine Treffer. Versuchen Sie, die Filter anzupassen.'
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

export default AdminPartnersPage;