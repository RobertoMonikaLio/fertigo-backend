import React from 'react';
import { useInView } from 'react-intersection-observer';
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
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const iconMap = ["💼", "👥", "🖥️", "⏰", "💳", "📍", "✅"];

    return (
        <section
            ref={ref}
            className="py-24 sm:py-32 lg:py-40 relative bg-white overflow-hidden"
        >
            {/* ── Background Aesthetics ── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] opacity-50"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiIC8+CjxwYXRoIGQ9Ik00MCAuNWwtNDAgMCIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiIC8+CjxwYXRoIGQ9Ik0uNSAwbDAgNDAiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIiAvPgo8L3N2Zz4=')] opacity-50"></div>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className={`text-center max-w-3xl mx-auto mb-16 sm:mb-24 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="inline-block text-emerald-600 font-black text-xs uppercase tracking-[0.2em] mb-4">
                        Benchmark
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8"
                        dangerouslySetInnerHTML={{ __html: t.benefits.title }}
                    />
                    <p className="text-slate-600 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                        Der moderne Weg zur Neukunden-Gewinnung. Effizient, transparent und profitabel.
                    </p>
                </div>

                {/* Glass Comparison Table */}
                <div className={`relative transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50">
                                    <th className="px-4 py-6 sm:p-8 font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 w-[40%] sm:w-auto">
                                        Fokus-Bereich
                                    </th>
                                    <th className="px-4 py-6 sm:p-8 text-center w-[30%] sm:w-56 bg-rose-50 border-l border-slate-100">
                                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-rose-500">
                                            Handelsüblich
                                        </span>
                                    </th>
                                    <th className="px-4 py-6 sm:p-8 text-center w-[30%] sm:w-72 bg-emerald-50 border-l border-slate-100 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                                        <span className="text-[11px] sm:text-lg font-black uppercase tracking-[0.1em] text-emerald-600">
                                            FERTIGO
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {t.benefits.rows.map((row, i) => (
                                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                                        {/* Feature Label */}
                                        <td className="px-4 py-6 sm:p-8">
                                            <div className="flex items-center gap-4 sm:gap-6">
                                                <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl sm:text-3xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                    {iconMap[i] || "✨"}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">
                                                        {row.label}
                                                    </span>
                                                    <div className="h-0.5 w-0 group-hover:w-full bg-emerald-500 transition-all duration-700 mt-1"></div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* OLD WAY */}
                                        <td className="px-4 py-6 sm:p-8 text-center bg-rose-50/30 italic align-middle border-l border-slate-100">
                                            <span className="text-xs sm:text-base font-medium text-slate-500 line-through decoration-rose-300">
                                                {row.before}
                                            </span>
                                        </td>

                                        {/* FERTIGO WAY */}
                                        <td className="px-4 py-6 sm:p-8 text-center bg-emerald-50/50 align-middle border-l border-slate-100 relative">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-[13px] sm:text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors tracking-tight">
                                                    {row.after}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Highlights / Badges Row */}
                <div className={`mt-20 sm:mt-32 transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                        {[
                            { label: "Kein Abo", icon: "🛡️", color: "from-blue-50 to-indigo-50", border: "border-blue-100", text: "text-blue-700" },
                            { label: "0% Provision", icon: "💰", color: "from-emerald-50 to-teal-50", border: "border-emerald-100", text: "text-emerald-700" },
                            { label: "Sofort Leads", icon: "⚡", color: "from-amber-50 to-orange-50", border: "border-amber-100", text: "text-amber-700" },
                            { label: "Swiss Made", icon: "🇨🇭", color: "from-red-50 to-rose-50", border: "border-red-100", text: "text-red-700" }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border} shadow-sm hover:scale-105 transition-transform duration-500 group`}
                            >
                                <span className="text-2xl sm:text-3xl group-hover:rotate-12 transition-transform">{item.icon}</span>
                                <span className={`text-xs sm:text-sm font-black uppercase tracking-[0.2em] ${item.text}`}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Trust Footer */}
                    <div className="mt-16 flex items-center justify-center gap-6 opacity-30">
                        <div className="h-px w-20 bg-gradient-to-r from-transparent to-slate-200" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Trusted by 5k+ Partners</span>
                        <div className="h-px w-20 bg-gradient-to-l from-transparent to-slate-200" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProviderComparison;
