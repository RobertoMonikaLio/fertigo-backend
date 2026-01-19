

import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { UsersIcon, BriefcaseIcon, BanknotesIcon, ArrowTrendingUpIcon, TagIcon, ChartBarIcon } from '../components/icons';

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
            </div>
        </div>
    );
};

interface RevenueData {
    month: string;
    revenue: number;
    previousRevenue: number;
}

const RevenueChart: React.FC<{ data: RevenueData[] }> = ({ data }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const chartHeight = 250;
    const chartWidth = 600; 
    const yAxisWidth = 50;
    const xAxisHeight = 30;
    const chartAreaWidth = chartWidth - yAxisWidth;
    const chartAreaHeight = chartHeight - xAxisHeight;

    const maxRevenue = data.length > 0 ? Math.ceil(Math.max(...data.map(d => Math.max(d.revenue, d.previousRevenue))) / 5000) * 5000 : 1;

    const yAxisLabels = Array.from({ length: 3 }, (_, i) => maxRevenue * (i / 2));

    const formatCurrency = (value: number) => `CHF ${value.toLocaleString('de-CH', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;

    const linePoints = data.map((d, index) => {
        const x = (index + 0.5) * (chartAreaWidth / data.length);
        const y = chartAreaHeight - (d.previousRevenue / maxRevenue) * chartAreaHeight;
        return { x, y };
    });

    const linePath = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg h-full flex flex-col">
            <div className="p-6 border-b border-slate-200/80">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <BanknotesIcon className="w-6 h-6 text-primary-700" />
                    <span>Umsatzentwicklung (Letzte 6 Monate)</span>
                </h2>
            </div>
            <div className="p-6">
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

                        {/* Chart content: Bars, Lines, Tooltips */}
                        <g transform={`translate(${yAxisWidth}, 0)`}>
                            {data.map((d, index) => {
                                const barWidth = (chartAreaWidth / data.length) * 0.6;
                                const x = index * (chartAreaWidth / data.length) + (chartAreaWidth / data.length - barWidth) / 2;
                                const barHeight = (d.revenue / maxRevenue) * chartAreaHeight;
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
                                            <foreignObject x={x + barWidth / 2 - 80} y={y - 70} width="160" height="60">
                                                <div className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-md shadow-lg animate-fade-in">
                                                    <p className="font-semibold text-sm mb-1">{d.month}</p>
                                                    <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary-500"></span>Umsatz: {formatCurrency(d.revenue)}</p>
                                                    <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400"></span>Vormonat: {formatCurrency(d.previousRevenue)}</p>
                                                </div>
                                            </foreignObject>
                                        )}
                                    </g>
                                );
                            })}
                            
                            {/* Line path */}
                            <path d={linePath} stroke="#fb923c" strokeWidth="2" fill="none" />
                            {linePoints.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#fb923c" stroke="white" strokeWidth="1.5" />
                            ))}
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
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-primary-500"></div><span className="font-medium text-slate-600">Aktueller Umsatz</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-orange-400 border-y border-orange-400"></div><span className="font-medium text-slate-600">Umsatz Vormonat</span></div>
                </div>
            </div>
        </div>
    );
};


// --- Data Generators ---

const baseKpiData: any[] = [
    { label: 'Gesamtumsatz', value: 250780, icon: <BanknotesIcon className="w-7 h-7"/>, isCurrency: true },
    { label: 'Total Gekaufte Leads', value: 17892, icon: <TagIcon className="w-7 h-7"/> },
    { label: 'Total Partner', value: 1523, icon: <UsersIcon className="w-7 h-7"/>, change: 12, changeType: 'increase' },
    { label: 'Umsatz (30T)', value: 12450, icon: <BanknotesIcon className="w-7 h-7"/>, change: 8.1, changeType: 'increase', isPercentage: true, isCurrency: true },
    { label: 'Gekaufte Leads (30T)', value: 831, icon: <TagIcon className="w-7 h-7"/>, change: 3.4, changeType: 'increase', isPercentage: true },
    { label: 'Neue Partner (30T)', value: 88, icon: <UsersIcon className="w-7 h-7"/> },
];

const generateKpiData = () => baseKpiData.map(item => {
    const randomFactor = 1 + (Math.random() - 0.5) * 0.02; // +/- 1% variation
    const newValue = item.value * randomFactor;
    
    let displayValue: string;
    if (item.isCurrency) {
        displayValue = 'CHF ' + newValue.toLocaleString('de-CH', { minimumFractionDigits: item.label.includes('Preis') ? 2 : 0, maximumFractionDigits: item.label.includes('Preis') ? 2 : 0 });
    } else {
        displayValue = Math.round(newValue).toLocaleString('de-CH');
    }

    let changeDisplay;
    if (item.change) {
        if(item.isPercentage) {
            changeDisplay = `${(item.change * randomFactor).toFixed(1)}%`;
        } else {
             changeDisplay = `${item.changeType === 'increase' ? '+' : ''}${Math.round(item.change * randomFactor)}`;
        }
    }

    return { ...item, value: displayValue, change: changeDisplay };
});

const baseCategoryData: Omit<CategoryData, 'color'>[] = [
    { name: 'Malerarbeiten', count: 450 },
    { name: 'Umzug & Transport', count: 320 },
    { name: 'Reinigung', count: 280 },
    { name: 'Gartenpflege', count: 150 },
    { name: 'Sonstige', count: 210 },
];

const generateCategoryData = () => baseCategoryData.map(item => ({
    ...item,
    count: item.count + Math.floor(Math.random() * 20) - 10
})).sort((a, b) => b.count - a.count);

const baseRevenueData: RevenueData[] = [
    { month: 'Feb', revenue: 8200, previousRevenue: 7500 },
    { month: 'Mär', revenue: 9500, previousRevenue: 8900 },
    { month: 'Apr', revenue: 11200, previousRevenue: 10500 },
    { month: 'Mai', revenue: 10500, previousRevenue: 11800 },
    { month: 'Jun', revenue: 13800, previousRevenue: 12100 },
    { month: 'Jul', revenue: 12450, previousRevenue: 13200 },
];

const generateRevenueData = () => baseRevenueData.map(item => ({
    ...item,
    revenue: item.revenue + Math.floor(Math.random() * 800) - 400,
    previousRevenue: item.previousRevenue + Math.floor(Math.random() * 800) - 400
}));

// --- Main Page Component ---
const AdminDashboardPage: React.FC = () => {
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [kpiData, setKpiData] = useState(generateKpiData());
    const [categoryData, setCategoryData] = useState(generateCategoryData());
    const [revenueData, setRevenueData] = useState(generateRevenueData());

    const refreshData = () => {
        setKpiData(generateKpiData());
        setCategoryData(generateCategoryData());
        setRevenueData(generateRevenueData());
        setLastUpdated(new Date());
    };
    
    useEffect(() => {
        // Update every hour (3600 * 1000 milliseconds)
        const intervalId = setInterval(refreshData, 3600 * 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // New ordered KPI data based on user request
    const orderedKpiLabels = [
        'Gesamtumsatz',
        'Total Gekaufte Leads',
        'Total Partner',
        'Umsatz (30T)',
        'Gekaufte Leads (30T)',
        'Neue Partner (30T)',
    ];
    
    const orderedKpiData = orderedKpiLabels.map(label => kpiData.find(item => item.label === label)).filter(Boolean);


    return (
        <div className="min-h-screen bg-slate-100 flex">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <AdminHeader title="Dashboard" onRefresh={refreshData} />
                
                <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-screen-2xl mx-auto space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Willkommen zurück, Admin!</h2>
                            <p className="text-slate-500 mt-1">
                                Hier ist eine Übersicht. Letzte Aktualisierung: {lastUpdated.toLocaleTimeString('de-CH')}
                            </p>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {orderedKpiData.map(item => <KpiCard key={item!.label} {...item!} />)}
                        </div>

                        {/* Lower Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                             <RevenueChart data={revenueData} />
                             <RequestsByCategoryChart data={categoryData} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardPage;