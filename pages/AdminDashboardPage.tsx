

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { UsersIcon, BanknotesIcon, ArrowTrendingUpIcon, TagIcon, ChartBarIcon, ColoredSparklesIcon } from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL;

// --- Reusable Components ---

const KpiCard: React.FC<{ icon: React.ReactNode, label: string, value: string, change?: string, changeType?: 'increase' | 'decrease' }> = ({ icon, label, value, change, changeType }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-lg flex items-center gap-6 transition-all hover:shadow-xl hover:-translate-y-1">
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

interface CategoryData {
    name: string;
    count: number;
}
const RequestsByCategoryChart: React.FC<{ data: CategoryData[] }> = ({ data }) => {
    const totalRequests = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg h-full">
            <div className="p-6 border-b border-slate-200/80">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <ChartBarIcon className="w-6 h-6 text-primary-700" />
                    <span>Anfragen nach Kategorie (30 Tage)</span>
                </h2>
            </div>
            <div className="p-6">
                {data.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">Noch keine Daten vorhanden</p>
                ) : (
                    <ul className="space-y-5">
                        {data.map((item) => {
                            const percentage = totalRequests > 0 ? (item.count / totalRequests) * 100 : 0;
                            return (
                                <li key={item.name}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="font-semibold text-slate-700">{item.name}</span>
                                        <span className="font-bold text-slate-800">
                                            {item.count.toLocaleString('de-CH')}
                                            <span className="text-sm font-medium text-slate-500 ml-2">({percentage.toFixed(1)}%)</span>
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${percentage}%` }}
                                            aria-valuenow={percentage}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            role="progressbar"
                                            aria-label={`${item.name} ${percentage.toFixed(1)}%`}
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

interface RevenueMonthData {
    month: string;
    revenue: number;
}

const RevenueChart: React.FC<{ data: RevenueMonthData[] }> = ({ data }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const chartHeight = 250;
    const chartWidth = 600;
    const yAxisWidth = 50;
    const xAxisHeight = 30;
    const chartAreaWidth = chartWidth - yAxisWidth;
    const chartAreaHeight = chartHeight - xAxisHeight;

    const maxRevenue = data.length > 0 ? Math.ceil(Math.max(...data.map(d => d.revenue), 1) / 1000) * 1000 : 1000;

    const yAxisLabels = Array.from({ length: 3 }, (_, i) => maxRevenue * (i / 2));

    const formatCurrency = (value: number) => `CHF ${value.toLocaleString('de-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    return (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg h-full flex flex-col">
            <div className="p-6 border-b border-slate-200/80">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <BanknotesIcon className="w-6 h-6 text-primary-700" />
                    <span>Umsatzentwicklung (Letzte 6 Monate)</span>
                </h2>
            </div>
            <div className="p-6">
                {data.every(d => d.revenue === 0) ? (
                    <p className="text-slate-400 text-center py-8">Noch keine Umsätze vorhanden</p>
                ) : (
                    <>
                        <div className="relative" style={{ height: `${chartHeight}px` }}>
                            <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
                                {/* Y-Axis */}
                                <g transform={`translate(${yAxisWidth}, 0)`}>
                                    {yAxisLabels.map((label, i) => {
                                        const y = chartAreaHeight - (label / maxRevenue * chartAreaHeight);
                                        return (
                                            <g key={i} className="text-xs text-slate-500">
                                                <line x1={0} y1={y} x2={chartAreaWidth} y2={y} stroke="#e2e8f0" strokeDasharray="2 4" />
                                                <text x={-10} y={y} dy="0.3em" textAnchor="end">{`${Math.round(label / 1000)}k`}</text>
                                            </g>
                                        );
                                    })}
                                </g>

                                {/* Chart content: Bars + Tooltips */}
                                <g transform={`translate(${yAxisWidth}, 0)`}>
                                    {data.map((d, index) => {
                                        const barWidth = (chartAreaWidth / data.length) * 0.6;
                                        const x = index * (chartAreaWidth / data.length) + (chartAreaWidth / data.length - barWidth) / 2;
                                        const barHeight = maxRevenue > 0 ? (d.revenue / maxRevenue) * chartAreaHeight : 0;
                                        const y = chartAreaHeight - barHeight;

                                        return (
                                            <g key={d.month}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                                className="group cursor-pointer"
                                            >
                                                <rect
                                                    x={x}
                                                    y={y}
                                                    width={barWidth}
                                                    height={barHeight > 0 ? barHeight : 0}
                                                    className="fill-current text-primary-500 group-hover:text-primary-600 transition-colors animate-grow-up"
                                                    style={{ animationDelay: `${index * 50}ms` }}
                                                    rx="2"
                                                />
                                                {hoveredIndex === index && (
                                                    <foreignObject x={x + barWidth / 2 - 80} y={y - 50} width="160" height="40">
                                                        <div className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-md shadow-lg animate-fade-in">
                                                            <p className="font-semibold text-sm">{d.month}: {formatCurrency(d.revenue)}</p>
                                                        </div>
                                                    </foreignObject>
                                                )}
                                            </g>
                                        );
                                    })}
                                </g>

                                {/* X-Axis */}
                                <g transform={`translate(${yAxisWidth}, ${chartAreaHeight})`}>
                                    {data.map((d, index) => (
                                        <text
                                            key={d.month}
                                            x={(index + 0.5) * (chartAreaWidth / data.length)}
                                            y={xAxisHeight / 2}
                                            textAnchor="middle"
                                            dy="0.3em"
                                            className="text-xs font-semibold text-slate-500"
                                        >
                                            {d.month}
                                        </text>
                                    ))}
                                </g>
                            </svg>
                        </div>
                        {/* Legend */}
                        <div className="flex justify-center items-center gap-6 mt-4 text-sm">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-primary-500"></div><span className="font-medium text-slate-600">Monatlicher Umsatz</span></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// --- Loading Skeleton ---
const SkeletonCard: React.FC = () => (
    <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-lg flex items-center gap-6 animate-pulse">
        <div className="flex-shrink-0 w-14 h-14 bg-slate-200 rounded-lg"></div>
        <div className="flex-1">
            <div className="h-3 bg-slate-200 rounded w-24 mb-3"></div>
            <div className="h-7 bg-slate-200 rounded w-32"></div>
        </div>
    </div>
);

// --- Main Page Component ---
const AdminDashboardPage: React.FC = () => {
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Real data states
    const [kpiData, setKpiData] = useState<any[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
    const [revenueData, setRevenueData] = useState<RevenueMonthData[]>([]);
    const [recentActivity, setRecentActivity] = useState<{ leadPurchases: any[], registrations: any[] }>({ leadPurchases: [], registrations: [] });

    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);

            const storedAdmin = localStorage.getItem('fertigo_admin');
            const token = storedAdmin ? JSON.parse(storedAdmin).token : null;
            const response = await fetch(`${API_URL}/api/admin/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Fehler beim Laden der Statistiken');
            }

            const data = await response.json();

            // Build KPI cards from real data
            const { kpi, categoryData: cats, revenueByMonth, recentActivity: activities } = data;

            const formatNum = (n: number) => n.toLocaleString('de-CH');
            const formatCHF = (n: number) => `CHF ${n.toLocaleString('de-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

            const kpis = [
                {
                    label: 'Gesamtumsatz',
                    value: formatCHF(kpi.totalRevenue),
                    icon: <BanknotesIcon className="w-7 h-7" />,
                },
                {
                    label: 'Total Gekaufte Leads',
                    value: formatNum(kpi.totalPurchasedLeads),
                    icon: <TagIcon className="w-7 h-7" />,
                },
                {
                    label: 'Total Partner',
                    value: formatNum(kpi.totalPartners),
                    icon: <UsersIcon className="w-7 h-7" />,
                    change: kpi.partnersChange !== 0 ? `${kpi.partnersChange > 0 ? '+' : ''}${kpi.partnersChange}` : undefined,
                    changeType: kpi.partnersChange >= 0 ? 'increase' : 'decrease',
                },
                {
                    label: 'Umsatz (30T)',
                    value: formatCHF(kpi.revenue30d),
                    icon: <BanknotesIcon className="w-7 h-7" />,
                    change: kpi.revenueChange !== 0 ? `${kpi.revenueChange > 0 ? '+' : ''}${kpi.revenueChange}%` : undefined,
                    changeType: kpi.revenueChange >= 0 ? 'increase' : 'decrease',
                },
                {
                    label: 'Gekaufte Leads (30T)',
                    value: formatNum(kpi.leadsPurchased30d),
                    icon: <TagIcon className="w-7 h-7" />,
                    change: kpi.leadsChange !== 0 ? `${kpi.leadsChange > 0 ? '+' : ''}${kpi.leadsChange}%` : undefined,
                    changeType: kpi.leadsChange >= 0 ? 'increase' : 'decrease',
                },
                {
                    label: 'Neue Partner (30T)',
                    value: formatNum(kpi.newPartners30d),
                    icon: <UsersIcon className="w-7 h-7" />,
                },
            ];

            setKpiData(kpis);
            setCategoryData(cats || []);
            setRevenueData(revenueByMonth || []);
            setRecentActivity(activities || { leadPurchases: [], registrations: [] });
            setLastUpdated(new Date());
        } catch (err: any) {
            console.error('Failed to fetch stats:', err);
            setError(err.message || 'Verbindungsfehler');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();

        // Auto-refresh every 15 seconds for "Real-time" feel
        const intervalId = setInterval(fetchStats, 15 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <AdminHeader title="Dashboard" onRefresh={fetchStats} />

                <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-screen-2xl mx-auto space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Willkommen zurück, Admin!</h2>
                            <p className="text-slate-500 mt-1">
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                        Lade Echtzeit-Daten...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                        Letzte Aktualisierung: {lastUpdated.toLocaleTimeString('de-CH')} &middot; <span className="text-green-600 font-medium tracking-tight">Echtzeit-Daten aktiv</span>
                                    </span>
                                )}
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 flex items-center gap-3">
                                <span className="text-xl">⚠️</span>
                                <div>
                                    <p className="font-semibold">Fehler beim Laden</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                                <button onClick={fetchStats} className="ml-auto px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-semibold transition-colors">
                                    Erneut versuchen
                                </button>
                            </div>
                        )}

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading && kpiData.length === 0 ? (
                                Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                            ) : (
                                kpiData.map(item => <KpiCard key={item.label} {...item} />)
                            )}
                        </div>

                        {/* Middle Activity Section */}
                        {!loading && (
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                {/* Recent Activity */}
                                <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-lg overflow-hidden">
                                    <div className="p-6 border-b border-slate-200/80 bg-slate-50/50 flex justify-between items-center">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-3">
                                            <ColoredSparklesIcon className="w-5 h-5 text-amber-500" />
                                            <span>Aktuelle Lead-Verkäufe (Live)</span>
                                        </h2>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Echtzeit</span>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-slate-50/30 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                    <th className="px-6 py-4">Zeit</th>
                                                    <th className="px-6 py-4">Partner</th>
                                                    <th className="px-6 py-4">Lead</th>
                                                    <th className="px-6 py-4 text-right">Umsatz</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 text-sm">
                                                {recentActivity.leadPurchases.length > 0 ? (
                                                    recentActivity.leadPurchases.map((t, i) => (
                                                        <tr key={t.id || i} className="hover:bg-slate-50/80 transition-colors animate-fade-in group">
                                                            <td className="px-6 py-4 font-bold text-slate-400">{t.timeLabel}</td>
                                                            <td className="px-6 py-4 font-bold text-slate-700 group-hover:text-primary-700">{t.partnerName}</td>
                                                            <td className="px-6 py-4 text-slate-500 font-medium truncate max-w-[200px]">{t.description}</td>
                                                            <td className="px-6 py-4 text-right">
                                                                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-black text-xs">
                                                                    CHF {Math.abs(t.amount).toLocaleString('de-CH')}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-300 italic">Keine aktuellen Verkäufe</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Recent Registrations Short Feed */}
                                <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg flex flex-col">
                                    <div className="p-6 border-b border-slate-200/80 bg-slate-50/50">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-3">
                                            <UsersIcon className="w-5 h-5 text-primary-600" />
                                            <span>Neue Partnerschaften</span>
                                        </h2>
                                    </div>
                                    <div className="p-6 flex-1 space-y-4">
                                        {recentActivity.registrations.map((p, i) => (
                                            <div key={p.id || i} className="flex items-center gap-4 text-sm animate-fade-in">
                                                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs ring-4 ring-primary-50">
                                                    {p.companyName.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-slate-800 truncate">{p.companyName}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{p.timeLabel} &middot; {p.status}</div>
                                                </div>
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Lower Charts Grid */}
                        {!loading && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
                                <RevenueChart data={revenueData} />
                                <RequestsByCategoryChart data={categoryData} />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardPage;