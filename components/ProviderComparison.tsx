import React from 'react';
import { ColoredSparklesIcon, SwissFlagIcon } from './icons';

interface ComparisonRow {
    label: string;
    before: string;
    after: string;
}

interface ProviderComparisonProps {
    t: {
        benefits: {
            title: string;
            rows: ComparisonRow[];
        }
    };
    language: string;
}

const ProviderComparison: React.FC<ProviderComparisonProps> = ({ t }) => {
    const iconMap = ["💼", "👥", "🖥️", "⏰", "💳", "📍", "✅"];

    return (
        <section className="py-16 sm:py-32 relative bg-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-full sm:w-[500px] h-[300px] sm:h-[500px] bg-green-50/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />

            <div className="container mx-auto px-1 sm:px-6 lg:px-8 max-w-5xl relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20 px-4">
                    <h2 className="text-[2rem] sm:text-5xl font-black text-slate-900 leading-[1.1] mb-5 sm:mb-8" dangerouslySetInnerHTML={{ __html: t.benefits.title }} />
                    <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed">
                        Der moderne Weg zur Neukunden-Gewinnung. Effizient, transparent und profitabel.
                    </p>
                </div>

                {/* Optimized Comparison Table */}
                <div className="relative bg-white sm:border border-slate-200 sm:rounded-2xl overflow-hidden sm:shadow-2xl">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead className="bg-slate-900 text-white">
                            <tr>
                                <th className="px-3 py-4 sm:p-6 font-bold text-[10px] sm:text-lg uppercase tracking-wider w-[35%] sm:w-auto">
                                    Feature
                                </th>
                                <th className="px-2 py-4 sm:p-6 font-bold text-center w-[30%] sm:w-48 bg-red-600 text-white text-[9px] sm:text-sm uppercase tracking-[0.1em] sm:tracking-widest border-x border-slate-700/50">
                                    ALT
                                </th>
                                <th className="px-2 py-4 sm:p-6 font-black text-center w-[35%] sm:w-64 bg-green-600 text-white text-[10px] sm:text-lg">
                                    FERTIGO
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {t.benefits.rows.map((row, i) => (
                                <tr key={i} className="group hover:bg-slate-50/40 transition-colors">
                                    {/* Feature Column Optimized Width/Size */}
                                    <td className="px-3 py-5 sm:p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg sm:text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                                                {iconMap[i] || "✨"}
                                            </div>
                                            <span className="text-[9px] sm:text-sm font-black text-slate-500 sm:text-slate-800 uppercase tracking-tighter sm:tracking-widest leading-none sm:leading-tight">
                                                {row.label}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Competition Spalte - Light Red Background */}
                                    <td className="px-2 py-5 sm:p-6 text-center bg-red-50/50 italic border-x border-slate-100/50">
                                        <span className="text-[10px] sm:text-base font-medium text-red-500 line-through decoration-red-300 decoration-1">
                                            {row.before}
                                        </span>
                                    </td>

                                    {/* Fertigo Spalte - Light Green Background */}
                                    <td className="px-2 py-5 sm:p-6 text-center bg-green-50/70 relative">
                                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                                            <ColoredSparklesIcon className="w-3 h-3 text-green-500 hidden sm:block flex-shrink-0" />
                                            <span className="text-[11px] sm:text-lg font-black text-slate-950 group-hover:text-green-700 transition-colors leading-tight">
                                                {row.after}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Revolutionary New USP Section */}
                <div className="mt-16 sm:mt-24">
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-2">
                        {[
                            { label: "Kein Abo", icon: "🛡️", color: "from-blue-500/10 to-indigo-500/10", text: "text-blue-700", border: "border-blue-100" },
                            { label: "0% Provision", icon: "💰", color: "from-emerald-500/10 to-green-500/10", text: "text-emerald-700", border: "border-emerald-100" },
                            { label: "Sofort Leads", icon: "⚡", color: "from-amber-500/10 to-orange-500/10", text: "text-amber-700", border: "border-amber-100" },
                            { label: "Swiss Made", icon: "🇨🇭", color: "from-red-500/10 to-rose-500/10", text: "text-rose-700", border: "border-rose-100" }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-br ${item.color} ${item.border} border backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group`}
                            >
                                <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </span>
                                <div className="flex flex-col">
                                    <span className={`text-[11px] sm:text-sm font-black uppercase tracking-wider ${item.text}`}>
                                        {item.label}
                                    </span>
                                    <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-current opacity-30 mt-0.5`} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Subtle Trust Line */}
                    <div className="mt-10 flex items-center justify-center gap-4 opacity-40">
                        <div className="h-px w-12 bg-slate-300" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Trusted by 2'500+ Partners</span>
                        <div className="h-px w-12 bg-slate-300" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProviderComparison;
