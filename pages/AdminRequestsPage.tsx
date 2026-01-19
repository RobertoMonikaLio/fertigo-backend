
import React, { useState, useMemo, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { 
    MagnifyingGlassIcon, EyeIcon, TrashIcon, BriefcaseIcon, ArrowDownTrayIcon, 
    ChevronUpDownIcon, MapPinIcon, TagIcon, XMarkIcon, MailIcon, PhoneIcon, UserIcon, PencilIcon, CheckCircleIcon
} from '../components/icons';

interface Request {
    id: number;
    title: string;
    location: string;
    date: string;
    purchaseCount: number;
    status: 'Aktiv' | 'Abgelaufen';
    service: string;
    kanton: string;
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    description: string;
    details: { label: string; value: string }[];
}

const mockRequests: Request[] = [
    { 
        id: 1, title: 'Malerarbeiten - 3-Zimmer-Wohnung', location: '8004 Zürich', date: '25. Juli 2024', purchaseCount: 3, status: 'Aktiv', service: 'Malerarbeiten', kanton: 'ZH',
        customer: { name: 'Anna Meier', email: 'anna.meier@example.com', phone: '079 123 45 67' },
        description: 'Guten Tag, ich suche einen Maler für meine 3-Zimmer-Wohnung. Die Wände und Decken sollen neu in weiss gestrichen werden. Es sind ein paar kleine Dübellöcher und feine Risse vorhanden, die vor dem Streichen fachmännisch verspachtelt werden sollten. Die Wohnung ist unmöbliert.',
        details: [
            { label: 'Objekttyp', value: 'Wohnung' },
            { label: 'Anzahl Zimmer', value: '3' },
            { label: 'Fläche', value: 'ca. 85m²' },
            { label: 'Zeitrahmen', value: 'Innerhalb 1 Monat' }
        ]
    },
    { 
        id: 2, title: 'Gartenpflege für Einfamilienhaus', location: '6000 Luzern', date: '24. Juli 2024', purchaseCount: 5, status: 'Abgelaufen', service: 'Gartenpflege', kanton: 'LU',
        customer: { name: 'Peter Schmidt', email: 'p.schmidt@example.com', phone: '078 234 56 78' },
        description: 'Wir benötigen einen Gärtner für unsere Liegenschaft. Die Hecke (ca. 20m lang) muss geschnitten werden und der Rasen gemäht.',
        details: [
            { label: 'Objekttyp', value: 'Einfamilienhaus' },
            { label: 'Gartenfläche', value: 'ca. 200m²' },
            { label: 'Arbeiten', value: 'Heckenschnitt, Rasenpflege' },
            { label: 'Zeitrahmen', value: 'So schnell wie möglich' }
        ]
    },
    { 
        id: 3, title: 'Umzugsreinigung mit Abnahmegarantie', location: '8050 Oerlikon', date: '23. Juli 2024', purchaseCount: 4, status: 'Aktiv', service: 'Reinigung', kanton: 'ZH',
        customer: { name: 'Sandra Keller', email: 's.keller@example.com', phone: '077 345 67 89' },
        description: 'Reinigung einer 4-Zimmer-Wohnung nach Auszug, inklusive Abnahmegarantie.',
        details: [
            { label: 'Objekttyp', value: 'Wohnung' },
            { label: 'Anzahl Zimmer', value: '4' },
            { label: 'Fenster', value: 'Ja, inklusive' },
        ]
    },
    { 
        id: 4, title: 'Parkettboden schleifen und versiegeln', location: '1201 Genf', date: '22. Juli 2024', purchaseCount: 1, status: 'Aktiv', service: 'Bodenleger', kanton: 'GE',
        customer: { name: 'Markus Weber', email: 'm.weber@example.com', phone: '076 456 78 90' },
        description: 'Der Parkettboden im Wohnzimmer hat einige Kratzer und sollte professionell geschliffen und neu versiegelt werden.',
        details: [
            { label: 'Objekttyp', value: 'Wohnung' },
            { label: 'Fläche', value: 'ca. 50m²' },
            { label: 'Bodenart', value: 'Eichenparkett' },
        ]
    },
    { 
        id: 6, title: 'Sanitär-Reparatur Wasserhahn', location: '8400 Winterthur', date: '20. Juli 2024', purchaseCount: 0, status: 'Aktiv', service: 'Sanitär', kanton: 'ZH',
        customer: { name: 'Hans Frei', email: 'h.frei@example.com', phone: '079 567 89 01' },
        description: 'Mein Wasserhahn im Badezimmer tropft. Er muss repariert oder eventuell ersetzt werden.',
        details: [
            { label: 'Anliegen', value: 'Reparatur' },
            { label: 'Ort', value: 'Badezimmer' },
        ]
    },
];

const getStatusBadge = (status: Request['status']) => {
    switch (status) {
        case 'Aktiv': return 'bg-green-100 text-green-800';
        case 'Abgelaufen': return 'bg-slate-100 text-slate-800';
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

const RequestDetailModal: React.FC<{ request: Request; onClose: () => void }> = ({ request, onClose }) => {
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
            aria-labelledby="request-detail-title"
        >
            <div 
                className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h2 id="request-detail-title" className="text-xl font-bold text-slate-900 flex items-center gap-3">
                        <BriefcaseIcon className="w-6 h-6 text-primary-700"/>
                        Anfragedetails: #{request.id}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Schliessen">
                        <XMarkIcon className="w-7 h-7" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    <DetailSection title="Projektdetails" icon={<PencilIcon className="w-5 h-5 text-slate-500" />}>
                        <div className="space-y-1 text-sm">
                            <DetailItem label="Titel" value={request.title} />
                            <DetailItem label="Dienstleistung" value={request.service} />
                            <DetailItem label="Standort" value={request.location} />
                            <DetailItem label="Datum" value={request.date} />
                            <DetailItem label="Status" value={<span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(request.status)}`}>{request.status}</span>} />
                            {request.details.map(detail => <DetailItem key={detail.label} label={detail.label} value={detail.value} />)}
                        </div>
                    </DetailSection>

                    <DetailSection title="Beschreibung" icon={<PencilIcon className="w-5 h-5 text-slate-500" />}>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{request.description}</p>
                    </DetailSection>

                    <DetailSection title="Kundeninformation" icon={<UserIcon className="w-5 h-5 text-slate-500" />}>
                        <div className="space-y-1 text-sm">
                            <DetailItem label="Name" value={request.customer.name} />
                            <DetailItem label="E-Mail" value={<a href={`mailto:${request.customer.email}`} className="text-primary-600 hover:underline">{request.customer.email}</a>} />
                            <DetailItem label="Telefon" value={<a href={`tel:${request.customer.phone}`} className="text-primary-600 hover:underline">{request.customer.phone}</a>} />
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


const AdminRequestsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [serviceFilter, setServiceFilter] = useState<string>('Alle');
    const [kantonFilter, setKantonFilter] = useState<string>('Alle');
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

    const availableServices = useMemo(() => {
        const allServices = new Set<string>();
        mockRequests.forEach(r => allServices.add(r.service));
        return ['Alle', ...Array.from(allServices).sort()];
    }, []);

    const kantons = ['Alle', 'AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH'];

    const filteredRequests = useMemo(() => {
        return mockRequests.filter(r => {
            const term = searchTerm.toLowerCase();
            
            const matchesSearch = r.title.toLowerCase().includes(term) ||
                r.location.toLowerCase().includes(term);
            
            const matchesService = serviceFilter === 'Alle' || r.service === serviceFilter;
            const matchesKanton = kantonFilter === 'Alle' || r.kanton === kantonFilter;

            return matchesSearch && matchesService && matchesKanton;
        });
    }, [searchTerm, serviceFilter, kantonFilter]);
    
    const exportRequestsToCSV = () => {
        const header = "ID,Projekt,Ort,Datum,Käufe,Status,Dienstleistung,Kanton\n";
        const rows = filteredRequests.map(r =>
            [r.id, `"${r.title.replace(/"/g, '""')}"`, r.location, r.date, r.purchaseCount, r.status, r.service, r.kanton].join(',')
        ).join('\n');

        const csvContent = header + rows;
        const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "anfragen-export.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <AdminHeader title="Anfragen Verwalten" />

                {selectedRequest && <RequestDetailModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />}
                
                <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                         <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg">
                            <div className="p-4 border-b border-slate-200/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                                <div className="relative lg:col-span-2">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="search"
                                        placeholder="Anfragen suchen (Titel, Kunde, Ort)..."
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
                                    onClick={exportRequestsToCSV}
                                    className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold text-sm"
                                >
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                    <span>Exportieren</span>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-slate-600">
                                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Dienstleistungen</th>
                                            <th scope="col" className="px-6 py-3">Datum</th>
                                            <th scope="col" className="px-6 py-3">Käufe</th>
                                            <th scope="col" className="px-6 py-3">Status</th>
                                            <th scope="col" className="px-6 py-3 text-right">Aktionen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRequests.map(req => (
                                            <tr key={req.id} className="bg-white border-b hover:bg-slate-50">
                                                <td className="px-6 py-4 font-bold text-slate-900">{req.service}</td>
                                                <td className="px-6 py-4">{req.date}</td>
                                                <td className="px-6 py-4 font-semibold text-slate-800">{req.purchaseCount} / 5</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusBadge(req.status)}`}>
                                                        {req.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button onClick={() => setSelectedRequest(req)} className="p-2 text-slate-500 hover:text-blue-600" title="Details ansehen"><EyeIcon className="w-5 h-5"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                 {filteredRequests.length === 0 && (
                                    <div className="text-center p-12">
                                        <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-slate-300" />
                                        <h3 className="mt-4 text-lg font-semibold text-slate-700">Keine Anfragen gefunden</h3>
                                        <p className="mt-1 text-sm text-slate-500">Ihre Suche ergab keine Treffer.</p>
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

export default AdminRequestsPage;
