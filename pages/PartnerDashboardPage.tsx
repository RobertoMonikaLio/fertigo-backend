

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowTrendingUpIcon, BanknotesIcon, EyeIcon, TestsiegerIcon,
    BellIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, BanknotesIcon as StatusBanknotesIcon,
    TestsiegerIcon as StatusTestsiegerIcon, XCircleIcon,
    CalendarDaysIcon, TagIcon, AdjustmentsHorizontalIcon
} from '../components/icons';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext, Request } from './AppContext';
import { LeadQuickViewModal } from '../components/LeadQuickViewModal';

const StatCard: React.FC<{ icon: React.ReactNode, value: string, label: string }> = ({ icon, value, label }) => (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-card-light p-5 shadow-sm dark:border-slate-800 dark:bg-card-dark">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-500/20">
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-text-light dark:text-text-dark">{value}</p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
        </div>
    </div>
);

type Status = 'Neu' | 'Kontaktiert' | 'In Verhandlung' | 'Gewonnen' | 'Verloren / Abgelehnt';

const statusConfig: { [key in Status]: { icon: React.ReactNode; color: string; bgColor: string; title: string } } = {
    'Neu': { icon: <BellIcon className="w-4 h-4" />, color: 'text-blue-800', bgColor: 'bg-blue-100', title: 'Neu' },
    'Kontaktiert': { icon: <ChatBubbleLeftRightIcon className="w-4 h-4" />, color: 'text-cyan-800', bgColor: 'bg-cyan-100', title: 'Kontaktiert' },
    'In Verhandlung': { icon: <StatusBanknotesIcon className="w-4 h-4" />, color: 'text-orange-800', bgColor: 'bg-orange-100', title: 'Verhandlung' },
    'Gewonnen': { icon: <StatusTestsiegerIcon className="w-4 h-4" />, color: 'text-green-800', bgColor: 'bg-green-100', title: 'Gewonnen' },
    'Verloren / Abgelehnt': { icon: <XCircleIcon className="w-4 h-4" />, color: 'text-red-800', bgColor: 'bg-red-100', title: 'Verloren' },
};

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
    const config = statusConfig[status] || statusConfig['Neu'];
    return (
        <span className={`inline-flex items-center gap-2 px-2.5 py-1 text-xs font-semibold rounded-full ${config.bgColor} ${config.color}`}>
            {config.icon}
            {config.title}
        </span>
    );
};


const PartnerDashboardPage: React.FC = () => {
    const { requests, purchasedLeadIds, openQuickView, isQuickViewOpen, closeQuickView, quickViewLeadId } = useAppContext();

    // Filter States
    const [filterStatus, setFilterStatus] = useState<string>('Alle');
    const [filterMinPrice, setFilterMinPrice] = useState<string>('');
    const [filterDateFrom, setFilterDateFrom] = useState<string>('');

    const stats = [
        { icon: <TestsiegerIcon className="size-6" />, value: '12', label: 'Gewonnene Aufträge' },
        { icon: <ArrowTrendingUpIcon className="size-6" />, value: '45%', label: 'Erfolgsquote' },
        { icon: <EyeIcon className="size-6" />, value: '50', label: 'Profilaufrufe (30 T)' },
        { icon: <BanknotesIcon className="size-6" />, value: 'CHF 2,500', label: 'Ø Auftragswert' },
    ];

    const purchasedLeads = useMemo(() => {
        const parseGermanDate = (dateString: string) => {
            const months: { [key: string]: number } = {
                'Januar': 0, 'Februar': 1, 'März': 2, 'April': 3, 'Mai': 4, 'Juni': 5,
                'Juli': 6, 'August': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Dezember': 11
            };
            const parts = dateString.replace('.', '').split(' ');
            if (parts.length < 3) return new Date(0);
            const day = parseInt(parts[0], 10);
            const month = months[parts[1]];
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        };

        return requests
            .filter(req => {
                // 1. Check if lead is purchased
                if (!purchasedLeadIds.includes(req.id)) return false;

                // 2. Filter by Status
                if (filterStatus !== 'Alle' && req.status !== filterStatus) return false;

                // 3. Filter by Price (Min Price)
                if (filterMinPrice) {
                    const price = parseFloat(filterMinPrice);
                    if (!isNaN(price) && req.price < price) return false;
                }

                // 4. Filter by Date (From Date)
                if (filterDateFrom) {
                    const reqDate = parseGermanDate(req.date);
                    const filterDate = new Date(filterDateFrom);
                    // Reset hours to compare dates only
                    reqDate.setHours(0, 0, 0, 0);
                    filterDate.setHours(0, 0, 0, 0);
                    if (reqDate < filterDate) return false;
                }

                return true;
            })
            .sort((a, b) => parseGermanDate(b.date).getTime() - parseGermanDate(a.date).getTime());
    }, [requests, purchasedLeadIds, filterStatus, filterMinPrice, filterDateFrom]);

    // We show up to 10 items in the dashboard view, or 5 if not filtered much
    const displayLeads = purchasedLeads.slice(0, 10);

    // Available leads to purchase (not yet purchased)
    const availableLeads = useMemo(() => {
        return requests
            .filter(req => !purchasedLeadIds.includes(req.id))
            .slice(0, 6); // Show up to 6 available leads
    }, [requests, purchasedLeadIds]);

    return (
        <div className="mx-auto max-w-4xl">
            {/* PageHeading */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <p className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">Guten Morgen, Herr Meier</p>
                    <p className="text-base font-normal text-slate-600 dark:text-slate-400">Hier ist Ihre Zusammenfassung für heute. Ihr Assistent hat alles für Sie vorbereitet.</p>
                </div>
                {/* ButtonGroup */}
                <div className="flex gap-3">
                    <button className="flex h-12 max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-slate-200 px-5 text-base font-bold text-text-light hover:bg-slate-300 dark:bg-slate-800 dark:text-text-dark dark:hover:bg-slate-700">
                        <span className="truncate">Angebot erstellen</span>
                    </button>
                    <Link to="/partner/requests" className="flex h-12 max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-5 text-base font-bold text-white hover:bg-primary/90">
                        <span className="truncate">Neue Leads suchen</span>
                    </Link>
                </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <StatCard key={index} icon={stat.icon} value={stat.value} label={stat.label} />
                ))}
            </div>

            {/* Verfügbare Leads zum Kaufen */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Verfügbare Leads</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Neue Aufträge, die Sie jetzt kaufen können</p>
                    </div>
                    <Link 
                        to="/partner/requests" 
                        className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                        Alle anzeigen →
                    </Link>
                </div>
                
                {availableLeads.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {availableLeads.map((lead) => (
                            <div
                                key={lead.id}
                                className="group bg-white rounded-xl border-2 border-slate-200 hover:border-primary-500 p-5 shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-900 mb-1 truncate group-hover:text-primary-600 transition-colors">
                                            {lead.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span>{lead.location}</span>
                                            <span>•</span>
                                            <span>{lead.service}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mb-3">
                                    <div>
                                        <div className="text-lg font-black text-primary-600">CHF {lead.price.toFixed(0)}</div>
                                        <div className="text-xs text-slate-500">Lead-Preis</div>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        openQuickView(lead.id);
                                    }}
                                    className="w-full px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold text-sm hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    Details ansehen →
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
                        <p className="font-semibold text-slate-700 mb-2">Aktuell keine neuen Leads verfügbar</p>
                        <p className="text-sm text-slate-500 mb-4">Schauen Sie später wieder vorbei oder besuchen Sie den Lead-Marktplatz.</p>
                        <Link 
                            to="/partner/requests" 
                            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
                        >
                            Zum Marktplatz
                        </Link>
                    </div>
                )}
            </div>

            {/* Aktuelle Projekte Section */}
            <div className="mt-8">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-card-light shadow-sm dark:border-slate-800 dark:bg-card-dark">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark whitespace-nowrap">Aktuelle Projekte</h2>
                        
                        {/* Filter Controls */}
                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                            {/* Status Filter */}
                            <div className="relative min-w-[140px] flex-1 sm:flex-none">
                                <AdjustmentsHorizontalIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <select 
                                    value={filterStatus} 
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300"
                                >
                                    <option value="Alle">Alle Status</option>
                                    <option value="Neu">Neu</option>
                                    <option value="Kontaktiert">Kontaktiert</option>
                                    <option value="In Verhandlung">In Verhandlung</option>
                                    <option value="Gewonnen">Gewonnen</option>
                                    <option value="Verloren / Abgelehnt">Verloren</option>
                                </select>
                            </div>

                            {/* Date Filter */}
                            <div className="relative min-w-[140px] flex-1 sm:flex-none">
                                <CalendarDaysIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="date" 
                                    value={filterDateFrom}
                                    onChange={(e) => setFilterDateFrom(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 placeholder-slate-400"
                                    placeholder="Ab Datum"
                                />
                            </div>

                            {/* Price Filter */}
                            <div className="relative w-[120px] flex-1 sm:flex-none">
                                <TagIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="number" 
                                    placeholder="Min. CHF"
                                    value={filterMinPrice}
                                    onChange={(e) => setFilterMinPrice(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300"
                                />
                            </div>
                        </div>
                    </div>

                    {displayLeads.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-900/50 dark:text-slate-400">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Auftrag</th>
                                        <th className="px-6 py-3 font-semibold">Kunde & Standort</th>
                                        <th className="px-6 py-3 font-semibold">Datum</th>
                                        <th className="px-6 py-3 font-semibold">Preis</th>
                                        <th className="px-6 py-3 font-semibold">Status</th>
                                        <th className="px-6 py-3 font-semibold text-right">Aktion</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {displayLeads.map(lead => (
                                        <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                                            <td className="px-6 py-4 font-bold text-text-light dark:text-text-dark">{lead.title}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-700 dark:text-slate-300">{lead.customer}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400">{lead.location}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{lead.date}</td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">CHF {lead.price.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={lead.status} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link to={`/partner/requests/${lead.id}`} className="flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-primary/90 sm:w-auto">
                                                    Öffnen
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <p className="font-semibold text-slate-700">Keine Projekte gefunden.</p>
                            <p className="mt-1 text-sm text-slate-500">
                                {requests.some(r => purchasedLeadIds.includes(r.id)) 
                                    ? "Passen Sie Ihre Filter an, um Ergebnisse zu sehen." 
                                    : "Sie haben noch keine aktiven Projekte. Besuchen Sie den Lead-Marktplatz."}
                            </p>
                            {requests.some(r => purchasedLeadIds.includes(r.id)) ? (
                                <button 
                                    onClick={() => { setFilterStatus('Alle'); setFilterMinPrice(''); setFilterDateFrom(''); }}
                                    className="mt-4 inline-flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-200 px-4 text-sm font-bold text-slate-700 hover:bg-slate-300"
                                >
                                    Filter zurücksetzen
                                </button>
                            ) : (
                                <Link to="/partner/requests" className="mt-4 inline-flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-primary/90">
                                    Zum Marktplatz
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Assistant Feed */}
            <div className="mt-8 flex flex-col gap-6">
                {/* Card: New Lead */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-card-light shadow-sm dark:border-slate-800 dark:bg-card-dark">
                    <div className="flex flex-col items-stretch justify-start @container md:flex-row md:items-start">
                        <div className="w-full bg-cover bg-center bg-no-repeat md:w-1/3" data-alt="Image of a modern bathroom with grey tiles" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcUUT_Cj3Kh-Tq8WOXh-hK7Zezyx8A6MOtYVg-VP1_YKTbV5U8FnT_ZgLtLpr8Rvi3gNxLH5GBaDOOpUpT0deog5x6bXw6uWkgfRF2aptMrRj8KmTu4dbtK8lFF0MAjg07g5QYknTOLgB1iVn2H69cT1vmGr31yOQlhuvS4r9afcBa9WoUH5B5PB0X_3NDFo5y83UNsBGqgAk5f7xcaGjFKJEHdxftJD8Gf4iTpT77h4l9FhPKtf-wexLeD2v7HqQC08CwFG2gRFU")', minHeight: '200px' }}></div>
                        <div className="flex w-full grow flex-col items-stretch justify-center gap-3 p-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary">star</span>
                                <p className="text-sm font-bold text-secondary">Neue Lead-Empfehlung</p>
                            </div>
                            <p className="text-xl font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">Neuer passender Auftrag in Zürich: Badezimmerrenovierung</p>
                            <p className="text-base font-normal text-slate-600 dark:text-slate-400">Ein neuer Auftrag, der perfekt zu Ihren Fähigkeiten passt, ist verfügbar. Geschätztes Budget: CHF 15'000.</p>
                            <div className="mt-2 flex items-center gap-3">
                                <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-secondary px-4 text-sm font-bold text-black hover:bg-secondary/90">
                                    <span className="truncate">Details ansehen</span>
                                </button>
                                <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-200 px-4 text-sm font-medium text-text-light hover:bg-slate-300 dark:bg-slate-800 dark:text-text-dark dark:hover:bg-slate-700">
                                    <span className="truncate">Ablehnen</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Card: Task Reminder */}
                <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-card-light p-6 shadow-sm dark:border-slate-800 dark:bg-card-dark">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-500/20">
                        <span className="material-symbols-outlined">task_alt</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-primary">Aufgaben-Erinnerung</p>
                        <p className="mt-1 text-lg font-bold text-text-light dark:text-text-dark">Nicht vergessen: Senden Sie das Angebot für das Projekt 'Küchenumbau Fam. Brunner' bis heute Abend.</p>
                        <div className="mt-3 flex items-center gap-3">
                            <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-primary/90">
                                <span className="truncate">Angebot jetzt senden</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Card: Profile Optimization */}
                <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-card-light p-6 shadow-sm dark:border-slate-800 dark:bg-card-dark">
                    <div className="flex size-10 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                        <span className="material-symbols-outlined">lightbulb</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-secondary">Profil-Optimierung</p>
                        <p className="mt-1 text-lg font-bold text-text-light dark:text-text-dark">Fügen Sie ein neues Projektbild hinzu, um Ihre Chancen um 20% zu erhöhen.</p>
                        <p className="mt-1 text-base text-slate-600 dark:text-slate-400">Ihr Profil ist zu 85% vollständig. Das Hinzufügen von Referenzprojekten schafft Vertrauen bei potenziellen Kunden.</p>
                        <div className="mt-3 flex items-center gap-3">
                            <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-secondary px-4 text-sm font-bold text-black hover:bg-secondary/90">
                                <span className="truncate">Profil bearbeiten</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Card: Statistic Highlight */}
                <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-card-light p-6 shadow-sm dark:border-slate-800 dark:bg-card-dark">
                    <div className="flex size-10 items-center justify-center rounded-full bg-green-500/10 text-green-500 dark:bg-green-500/20">
                        <span className="material-symbols-outlined">trending_up</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-green-500">Statistik-Highlight</p>
                        <p className="mt-1 text-lg font-bold text-text-light dark:text-text-dark">Glückwunsch! Ihr Profil wurde diese Woche 50 Mal aufgerufen.</p>
                        <p className="mt-1 text-base text-slate-600 dark:text-slate-400">Ihre Angebots-Erfolgsquote ist im letzten Monat um 10% gestiegen. Weiter so!</p>
                        <div className="mt-3 flex items-center gap-3">
                            <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-200 px-4 text-sm font-medium text-text-light hover:bg-slate-300 dark:bg-slate-800 dark:text-text-dark dark:hover:bg-slate-700">
                                <span className="truncate">Alle Statistiken ansehen</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Empty State Card */}
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-slate-300 bg-transparent py-12 text-center dark:border-slate-700">
                    <div className="flex size-12 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <span className="material-symbols-outlined">inbox</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-bold text-text-light dark:text-text-dark">Sie sind auf dem neuesten Stand</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Aktuell gibt es keine neuen Aufgaben. Nutzen Sie die Zeit, um Ihr Portfolio zu aktualisieren.</p>
                    </div>
                </div>
            </div>
            
            {/* Lead Quick View Modal */}
            {isQuickViewOpen && quickViewLeadId && (
                <LeadQuickViewModal 
                    leadId={quickViewLeadId}
                    isOpen={isQuickViewOpen}
                    onClose={closeQuickView}
                />
            )}
        </div>
    );
};

export default PartnerDashboardPage;
