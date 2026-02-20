import React, { useState, useMemo, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { BanknotesIcon, ArrowTrendingUpIcon, TagIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, ChevronUpDownIcon, ChartBarIcon, UsersIcon, CheckCircleIcon, SpinnerIcon } from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL;

// --- Reusable Components ---

const KpiCard: React.FC<{ icon: React.ReactNode, label: string, value: string, change?: string, changeType?: 'increase' | 'decrease' }> = ({ icon, label, value, change, changeType }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-lg flex items-center gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700">
                {icon}
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                <p className="text-3xl font-bold text-slate-800">{value}</p>
                {change && (
                    <div className={`mt-1 text-xs font-semibold flex items-center gap-1 ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                        <ArrowTrendingUpIcon className={`w-4 h-4 ${changeType === 'decrease' ? 'transform -scale-y-100' : ''}`} />
                        <span>{change} vs. Vormonat</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- TYPES ---

interface Transaction {
    id: string;
    date: string;
    partner: string;
    description: string;
    type: string;
    amount: number;
    status: string;
}

interface KpiItem {
    label: string;
    value: string;
    icon?: React.ReactNode;
    change?: string;
    changeType?: 'increase' | 'decrease';
}

const AmountDisplay: React.FC<{ amount: number }> = ({ amount }) => {
    const isPositive = amount > 0;
    const colorClass = isPositive ? 'text-green-600' : 'text-slate-800';
    const sign = isPositive ? '+' : '';
    return (
        <span className={`font-bold ${colorClass}`}>
            {sign} CHF {Math.abs(amount).toFixed(2)}
        </span>
    );
};

const RevenueByCategoryChart: React.FC<{ data: { category: string, revenue: number }[] }> = ({ data }) => {
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const sortedData = [...data].sort((a, b) => b.revenue - a.revenue);

    return (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg h-full">
            <div className="p-5 border-b border-slate-200/80">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <ChartBarIcon className="w-6 h-6 text-primary-700" />
                    <span>Umsatz nach Kategorie (30 Tage)</span>
                </h2>
            </div>
            <div className="p-6">
                {sortedData.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">Keine Daten vorhanden</p>
                ) : (
                    <ul className="space-y-4">
                        {sortedData.map((item) => {
                            const percentage = totalRevenue > 0 ? (item.revenue / totalRevenue) * 100 : 0;
                            return (
                                <li key={item.category}>
                                    <div className="flex justify-between items-center mb-1 text-sm">
                                        <span className="font-semibold text-slate-700">{item.category}</span>
                                        <span className="font-bold text-slate-800">CHF {item.revenue.toLocaleString('de-CH')}</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                                        <div
                                            className="bg-primary-500 h-2.5 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

const TopPartnersList: React.FC<{ data: { rank: number, name: string, amount: number }[] }> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg h-full">
            <div className="p-5 border-b border-slate-200/80">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <UsersIcon className="w-6 h-6 text-primary-700" />
                    <span>Top Partner (Umsatz 30 Tage)</span>
                </h2>
            </div>
            <div className="p-6">
                {data.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">Keine Daten vorhanden</p>
                ) : (
                    <ul className="divide-y divide-slate-100">
                        {data.map((partner) => (
                            <li key={partner.rank} className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-slate-400 w-6 text-center">{partner.rank}.</span>
                                    <span className="font-semibold text-slate-800">{partner.name}</span>
                                </div>
                                <span className="font-bold text-slate-900">CHF {partner.amount.toLocaleString('de-CH')}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};


type SortKey = 'date' | 'partner' | 'amount';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const baseClass = "px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit";
    if (status === 'Bezahlt') {
        return <span className={`${baseClass} bg-green-100 text-green-800`}><CheckCircleIcon className="w-3 h-3" /> {status}</span>;
    }
    return <span className={`${baseClass} bg-yellow-100 text-yellow-800`}><SpinnerIcon className="w-3 h-3" /> {status}</span>;
};

const AdminFinancePage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [kpiData, setKpiData] = useState<KpiItem[]>([]);
    const [revenueByCategoryData, setRevenueByCategoryData] = useState<{ category: string, revenue: number }[]>([]);
    const [topPartnersData, setTopPartnersData] = useState<{ rank: number, name: string, amount: number }[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('Alle');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });

    const kpiIcons = [
        <BanknotesIcon className="w-7 h-7" />,
        <BanknotesIcon className="w-7 h-7" />,
        <TagIcon className="w-7 h-7" />,
    ];

    const fetchFinance = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/admin/finance`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Fehler beim Laden der Finanzdaten');
            const data = await response.json();
            setKpiData(data.kpi || []);
            setTransactions(data.transactions || []);
            setRevenueByCategoryData(data.revenueByCategoryData || []);
            setTopPartnersData(data.topPartnersData || []);
        } catch (err: any) {
            setError(err.message || 'Verbindungsfehler');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFinance();
    }, []);

    const sortedTransactions = useMemo(() => {
        let sortableItems = [...transactions].filter(t => {
            const term = searchTerm.toLowerCase();
            const matchesSearch = t.partner.toLowerCase().includes(term) || t.description.toLowerCase().includes(term) || t.id.toLowerCase().includes(term);
            const matchesType = typeFilter === 'Alle' || t.type === typeFilter;
            return matchesSearch && matchesType;
        });

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

        return sortableItems;
    }, [searchTerm, typeFilter, sortConfig, transactions]);

    const requestSort = (key: SortKey) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const SortableHeader: React.FC<{ sortKey: SortKey, children: React.ReactNode, className?: string }> = ({ sortKey, children, className }) => {
        const isSorted = sortConfig?.key === sortKey;
        const directionIcon = isSorted ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '';
        return (
            <th scope="col" className={`px-6 py-3 cursor-pointer ${className}`} onClick={() => requestSort(sortKey)}>
                <div className={`flex items-center gap-2 ${className?.includes('text-right') ? 'justify-end' : ''}`}>
                    {children} <span className="text-xs">{directionIcon}</span>
                </div>
            </th>
        );
    };

    const exportToCSV = () => {
        const header = "Transaktions-ID,Datum,Partner,Beschreibung,Typ,Betrag,Status\n";
        const rows = sortedTransactions.map(t =>
            [t.id, t.date, `"${t.partner}"`, `"${t.description}"`, t.type, t.amount.toFixed(2), t.status].join(',')
        ).join('\n');
        const csvContent = header + rows;
        const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "finanz-export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Loading skeleton for KPI cards
    const KpiSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-lg animate-pulse flex items-center gap-6">
                    <div className="w-14 h-14 bg-slate-200 rounded-lg"></div>
                    <div className="space-y-2 flex-1">
                        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const TableSkeleton = () => (
        <div className="animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 border-b">
                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                    <div className="h-4 bg-slate-200 rounded w-20"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                </div>
            ))}
        </div>
    );

    // Get unique transaction types for filter
    const transactionTypes = useMemo(() => {
        const types = new Set<string>();
        transactions.forEach(t => types.add(t.type));
        return ['Alle', ...Array.from(types).sort()];
    }, [transactions]);

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <AdminHeader title="Finanzen" />

                <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Live data indicator */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                {loading ? 'Lade Finanzdaten...' : 'Finanzdaten geladen'}
                                <span className="ml-2 text-green-600 font-semibold">● Live-Daten</span>
                            </p>
                            <button onClick={fetchFinance} className="text-sm text-primary-600 hover:text-primary-800 font-semibold">
                                ↻ Aktualisieren
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                                <p className="font-bold">Fehler</p>
                                <p>{error}</p>
                                <button onClick={fetchFinance} className="mt-2 text-sm font-semibold text-red-800 hover:underline">Erneut versuchen</button>
                            </div>
                        )}

                        {/* KPI Cards */}
                        {loading ? <KpiSkeleton /> : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {kpiData.map((item, i) => <KpiCard key={item.label} icon={kpiIcons[i] || <BanknotesIcon className="w-7 h-7" />} {...item} />)}
                            </div>
                        )}

                        {/* Charts Section */}
                        {!loading && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <RevenueByCategoryChart data={revenueByCategoryData} />
                                <TopPartnersList data={topPartnersData} />
                            </div>
                        )}

                        {/* Transactions Table */}
                        <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg">
                            <div className="p-4 border-b border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                <div className="relative">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input type="search" placeholder="Suche..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div className="relative">
                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full appearance-none px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                                        {transactionTypes.map(type => (
                                            <option key={type} value={type}>{type === 'Alle' ? 'Alle Transaktionstypen' : type}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={exportToCSV} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold text-sm">
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                    <span>Exportieren</span>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                {loading ? <TableSkeleton /> : (
                                    <table className="w-full text-sm text-left text-slate-600">
                                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Transaktions-ID</th>
                                                <SortableHeader sortKey="date">Datum</SortableHeader>
                                                <SortableHeader sortKey="partner">Partner</SortableHeader>
                                                <th scope="col" className="px-6 py-3">Beschreibung</th>
                                                <SortableHeader sortKey="amount" className="text-right">Betrag</SortableHeader>
                                                <th scope="col" className="px-6 py-3 text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedTransactions.map(t => (
                                                <tr key={t.id} className="bg-white border-b hover:bg-slate-50">
                                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{t.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{t.date ? new Date(t.date).toLocaleDateString('de-CH') : '–'}</td>
                                                    <td className="px-6 py-4 font-bold text-slate-900">{t.partner}</td>
                                                    <td className="px-6 py-4">
                                                        <div>{t.description}</div>
                                                        <div className="text-xs text-slate-500">{t.type}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right"><AmountDisplay amount={t.amount} /></td>
                                                    <td className="px-6 py-4 flex justify-center">
                                                        <StatusBadge status={t.status} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {!loading && sortedTransactions.length === 0 && (
                                    <div className="text-center p-12">
                                        <h3 className="text-lg font-semibold text-slate-700">
                                            {transactions.length === 0 ? 'Noch keine Transaktionen vorhanden' : 'Keine Transaktionen gefunden'}
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {transactions.length === 0
                                                ? 'Transaktionen erscheinen hier, sobald Leads gekauft werden.'
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

export default AdminFinancePage;