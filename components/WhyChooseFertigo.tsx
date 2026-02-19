import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';
import { translations } from './translations';

const rowsConfig = [
    { competition: '✗', fertigo: '✓', competitionClass: 'text-red-600 bg-red-50', fertigoClass: 'text-green-600 bg-green-50' },
    { competition: '✗', fertigo: '✓', competitionClass: 'text-red-600 bg-red-50', fertigoClass: 'text-green-600 bg-green-50' },
    { competition: '✗', fertigo: '✓', competitionClass: 'text-red-600 bg-red-50', fertigoClass: 'text-green-600 bg-green-50' },
    { competition: '~', fertigo: '✓', competitionClass: 'text-amber-600 bg-red-50', fertigoClass: 'text-green-600 bg-green-50' },
    { competition: '✗', fertigo: '✓', competitionClass: 'text-red-600 bg-red-50', fertigoClass: 'text-green-600 bg-green-50' },
    { competition: '✗', fertigo: '✓', competitionClass: 'text-red-600 bg-red-50', fertigoClass: 'text-green-600 bg-green-50' },
];

const WhyChooseFertigo: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const { language } = useAppContext();
    const t = translations[language] || translations['de'];
    const content = t.whyChooseFertigo;

    return (
        <section ref={ref} className="relative py-14 sm:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                            {content.titlePart1}{' '}
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                                {content.titleHighlight}
                                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                                    <path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#fertigoUnderline)" strokeWidth="4" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="fertigoUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#16a34a" />
                                            <stop offset="50%" stopColor="#10b981" />
                                            <stop offset="100%" stopColor="#14b8a6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                            {' '}{content.titlePart2}
                        </h2>
                        <p className="text-slate-600 mt-2 text-sm sm:text-base">{content.subtitle}</p>
                    </div>

                    {/* Simple Checklist Table */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-visible mt-4 sm:mt-6">
                        <table className="w-full text-left text-sm sm:text-base">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="px-3 py-2.5 sm:p-4 font-medium text-xs sm:text-base">{content.table.feature}</th>
                                    <th className="px-2 py-2.5 sm:p-4 font-medium text-center w-16 sm:w-28 bg-red-500 text-xs sm:text-base">{content.table.competition}</th>
                                    <th className="px-2 py-2.5 sm:p-4 font-bold text-center w-16 sm:w-28 bg-gradient-to-b from-green-500 to-green-600 relative overflow-visible text-xs sm:text-base">
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                            <div className="bg-white text-green-600 text-[9px] sm:text-[11px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md border border-green-200 whitespace-nowrap">
                                                {content.table.choice}
                                            </div>
                                        </div>
                                        {content.table.fertigo}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {content.table.rows.map((row, index) => {
                                    const config = rowsConfig[index] || rowsConfig[0];
                                    return (
                                        <tr key={index}>
                                            <td className="px-3 py-2.5 sm:p-4 text-slate-700">
                                                <span className="inline-flex items-center gap-2 sm:gap-3">
                                                    <span className="text-base sm:text-xl">{row.icon}</span>
                                                    <span className="text-xs sm:text-base">{row.text}</span>
                                                </span>
                                            </td>
                                            <td className={`px-2 py-2.5 sm:p-4 text-center text-base sm:text-xl ${config.competitionClass}`}>
                                                {config.competition}
                                            </td>
                                            <td className={`px-2 py-2.5 sm:p-4 text-center text-base sm:text-xl ${config.fertigoClass}`}>
                                                {config.fertigo}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseFertigo;
