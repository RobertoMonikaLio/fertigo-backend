import React from 'react';
import { useInView } from 'react-intersection-observer';
import { CheckCircleIcon, XMarkIcon, ArrowRightIcon } from './icons';

interface ComparisonData {
    metric: string;
    competitor: string;
    fertigo: string;
    improvement: string;
    icon: string;
}

const CompetitorChart: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    const comparisons: ComparisonData[] = [
        {
            metric: 'Zeitaufwand',
            competitor: '5+ Stunden',
            fertigo: '2 Minuten',
            improvement: '150x schneller',
            icon: '⏱️'
        },
        {
            metric: 'Qualität',
            competitor: 'Gemischt',
            fertigo: 'Geprüft',
            improvement: '100% verifiziert',
            icon: '⭐'
        },
        {
            metric: 'Angebote',
            competitor: '1–2',
            fertigo: '3–5',
            improvement: '2.5x mehr',
            icon: '📊'
        },
        {
            metric: 'Komfort',
            competitor: 'Viele Anrufe',
            fertigo: '100% Digital',
            improvement: 'Keine Anrufe',
            icon: '📱'
        }
    ];

    return (
        <section ref={ref} className="relative py-12 sm:py-16 md:py-20 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Header */}
                <div className={`text-center mb-10 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <h2 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 leading-tight">
                        Warum Fertigo statt Konkurrenz?
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                        Der direkte Vergleich
                    </p>
                </div>

                {/* Vergleichs-Tabelle - Modern Table Design */}
                <div className={`mb-10 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        {/* Tabellen-Header */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-100 border-b-2 border-slate-200">
                            <div className="text-sm font-black text-slate-700 uppercase tracking-wide">Kategorie</div>
                            <div className="text-center text-sm font-black text-red-600 uppercase tracking-wide">Konkurrenz</div>
                            <div className="text-center text-sm font-black text-primary-600 uppercase tracking-wide">Fertigo</div>
                        </div>

                        {/* Tabellen-Rows */}
                        <div className="divide-y divide-slate-100">
                            {comparisons.map((item, index) => (
                                <div 
                                    key={index}
                                    className={`grid grid-cols-3 gap-4 p-4 hover:bg-slate-50 transition-colors ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {/* Kategorie */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{item.icon}</span>
                                        <span className="text-base font-bold text-slate-900">{item.metric}</span>
                                    </div>
                                    
                                    {/* Konkurrenz */}
                                    <div className="flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-2 mb-1">
                                                <XMarkIcon className="w-5 h-5 text-red-500" />
                                                <span className="text-lg font-black text-red-600">{item.competitor}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Fertigo */}
                                    <div className="flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-2 mb-1">
                                                <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                                                <span className="text-lg font-black text-primary-600">{item.fertigo}</span>
                                            </div>
                                            <div className="text-xs font-bold text-primary-600 mt-1">{item.improvement}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CompetitorChart;
