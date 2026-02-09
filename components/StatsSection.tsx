import React from 'react';
import { useInView } from 'react-intersection-observer';

const StatsSection: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const stats = [
        { value: '50\'000', suffix: '+', label: 'Erfolgreiche Projekte', desc: 'in der ganzen Schweiz' },
        { value: '2\'500', suffix: '+', label: 'Geprüfte Handwerker', desc: 'bereit für Ihr Projekt' },
        { value: '4.9', suffix: '/5', label: 'Kundenbewertung', desc: 'Durchschnitt aller Reviews' },
        { value: '2', suffix: ' Min', label: 'Projekt erfassen', desc: 'schnell & unkompliziert' },
    ];

    return (
        <section ref={ref} className="relative py-20 lg:py-28 bg-slate-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Gradient Accents */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                        Fertigo in Zahlen
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Die führende Handwerker-Plattform der Schweiz
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`relative group transition-all duration-700 ${
                                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 text-center hover:bg-white/10 hover:border-green-500/30 transition-all duration-300">
                                {/* Number */}
                                <div className="mb-2">
                                    <span className="text-4xl lg:text-5xl xl:text-6xl font-black text-white">
                                        {stat.value}
                                    </span>
                                    <span className="text-2xl lg:text-3xl font-bold text-green-400">
                                        {stat.suffix}
                                    </span>
                                </div>
                                
                                {/* Label */}
                                <div className="text-white font-semibold mb-1">{stat.label}</div>
                                <div className="text-slate-500 text-sm">{stat.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className={`mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-10 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-6 h-6 text-white" fill="currentColor">
                                <rect x="40" y="20" width="20" height="60"/>
                                <rect x="20" y="40" width="60" height="20"/>
                            </svg>
                        </div>
                        <div>
                            <div className="text-white font-bold">Swiss Made</div>
                            <div className="text-slate-500 text-xs">100% Schweiz</div>
                        </div>
                    </div>
                    
                    <div className="w-px h-10 bg-slate-700 hidden sm:block" />
                    
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-white font-bold">DSG-konform</div>
                            <div className="text-slate-500 text-xs">Datenschutz garantiert</div>
                        </div>
                    </div>
                    
                    <div className="w-px h-10 bg-slate-700 hidden sm:block" />
                    
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl">★</span>
                        </div>
                        <div>
                            <div className="text-white font-bold">Top bewertet</div>
                            <div className="text-slate-500 text-xs">4.9 von 5 Sternen</div>
                        </div>
                    </div>
                    
                    <div className="w-px h-10 bg-slate-700 hidden sm:block" />
                    
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">26</span>
                        </div>
                        <div>
                            <div className="text-white font-bold">Alle Kantone</div>
                            <div className="text-slate-500 text-xs">Schweizweit verfügbar</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
