
import React from 'react';

const stats = [
    {
        value: '2\'500+',
        label: 'Geprüfte Partner',
    },
    {
        value: '50\'000+',
        label: 'Projekte',
    },
    {
        value: '30%',
        label: 'Ersparnis',
    },
    {
        value: '< 24h',
        label: 'Erste Offerten',
    }
];

const Stats: React.FC = () => {
    return (
        <section className="bg-slate-900 border-y border-slate-800">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 text-center items-center justify-center">
                    {stats.map((stat, index) => (
                       <div key={index} className="flex flex-col items-center justify-center px-2 lg:border-r lg:last:border-r-0 lg:border-slate-800/50">
                            <p className="text-2xl md:text-3xl font-black tracking-tight text-white mb-1">
                                {stat.value === '30%' ? <span className="text-primary-400">bis 30%</span> : stat.value}
                            </p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
