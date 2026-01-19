import React from 'react';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon, MagnifyingGlassIcon, MapPinIcon, StarIcon, CalendarDaysIcon } from './icons';
import { Link } from 'react-router-dom';

const RecommendedLeads: React.FC = () => {
    const { requests, purchasedLeadIds, leadPurchaseCounts, openQuickView } = useAppContext();

    const parseGermanDate = (dateString: string) => {
        const months: { [key: string]: number } = {
            'Januar': 0, 'Februar': 1, 'März': 2, 'April': 3, 'Mai': 4, 'Juni': 5,
            'Juli': 6, 'August': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Dezember': 11
        };
        const parts = dateString.replace('.', '').split(' ');
        if (parts.length < 3) return new Date(0); // return a very old date if parsing fails
        const day = parseInt(parts[0], 10);
        const month = months[parts[1]];
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    };

    // "Intelligent" recommendation logic:
    // - Not already purchased by the user
    // - Not sold out (less than 5 purchases)
    // - Sort by newest date
    // - Take top 5
    const recommended = requests
        .filter(req => !purchasedLeadIds.includes(req.id) && (leadPurchaseCounts[req.id] || 0) < 5)
        .sort((a, b) => parseGermanDate(b.date).getTime() - parseGermanDate(a.date).getTime())
        .slice(0, 5);

    if (recommended.length === 0) {
        return null; // Don't show the section if there are no recommendations
    }
    
    return (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg">
            <div className="p-6 border-b border-slate-200/80 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <StarIcon className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-xl font-bold text-slate-800">Für Sie empfohlene Leads</h2>
                </div>
                <Link to="/partner/requests" className="flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors text-sm">
                    Alle Leads anzeigen <ArrowRightIcon className="w-4 h-4" />
                </Link>
            </div>
            <div className="p-6">
                <div className="flex gap-6 overflow-x-auto pb-4 -mb-4">
                    {recommended.map(lead => (
                        <div key={lead.id} className="flex-shrink-0 w-72 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col group transition-shadow hover:shadow-lg">
                            <h4 className="font-bold text-lg text-slate-900 mb-2 truncate">{lead.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                <div className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4" /><span>{lead.location}</span></div>
                                <div className="flex items-center gap-1.5"><CalendarDaysIcon className="w-4 h-4" /><span>{lead.date}</span></div>
                            </div>
                             <div className="mt-auto pt-4 border-t border-slate-200">
                                <button
                                    onClick={() => openQuickView(lead.id)}
                                    className="w-full bg-primary-600 text-white font-bold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition-all shadow-sm transform group-hover:-translate-y-0.5"
                                >
                                    Details & Kaufen
                                </button>
                             </div>
                        </div>
                    ))}
                     <div className="flex-shrink-0 w-72 bg-transparent border-2 border-dashed border-slate-300 rounded-xl p-5 flex flex-col items-center justify-center text-center group hover:border-primary-400 hover:bg-primary-50/50 transition-all">
                        <MagnifyingGlassIcon className="w-10 h-10 text-slate-400 group-hover:text-primary-600"/>
                        <p className="font-semibold text-slate-700 mt-3">Mehr Chancen entdecken?</p>
                        <p className="text-sm text-slate-500 mt-1">Durchsuchen Sie den gesamten Marktplatz nach neuen Aufträgen.</p>
                        <Link to="/partner/requests" className="mt-4 bg-white text-slate-700 font-bold px-4 py-2 rounded-lg border border-slate-300 shadow-sm hover:bg-slate-100">
                           Zum Marktplatz
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendedLeads;
