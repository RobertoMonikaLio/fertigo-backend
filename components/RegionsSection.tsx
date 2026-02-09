import React from 'react';
import { useInView } from 'react-intersection-observer';

const RegionsSection: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const cities = [
        { name: 'Zürich', count: 847 },
        { name: 'Bern', count: 612 },
        { name: 'Basel', count: 423 },
        { name: 'Genf', count: 389 },
    ];

    return (
        <section ref={ref} className="relative py-20 lg:py-28 bg-slate-900 overflow-hidden">
            
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-green-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Bento Grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Main Card - Left */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-5xl">🇨🇭</span>
                                <div>
                                    <div className="text-white/80 text-sm font-medium">Schweizweit aktiv</div>
                                    <div className="text-white font-bold text-xl">26 Kantone</div>
                                </div>
                            </div>
                            
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                                Handwerker in<br />Ihrer Nähe
                            </h2>
                            
                            <p className="text-green-100 text-lg mb-8 max-w-md">
                                Über 2'500 geprüfte Profis – vom Maler bis zum Elektriker.
                            </p>

                            <a
                                href="/regionen"
                                className="inline-flex items-center gap-2 bg-white hover:bg-green-50 text-green-700 font-bold px-6 py-4 rounded-xl transition-all"
                            >
                                Jetzt Handwerker finden
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Stats */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 flex-1">
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                                2'500+
                            </div>
                            <div className="text-white font-semibold mb-1">Handwerker</div>
                            <div className="text-slate-500 text-sm">Geprüft & bewertet</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 flex-1">
                            <div className="text-6xl font-black text-white mb-2">
                                50k+
                            </div>
                            <div className="text-white font-semibold mb-1">Projekte</div>
                            <div className="text-slate-500 text-sm">Erfolgreich vermittelt</div>
                        </div>
                    </div>
                </div>

                {/* Bottom - City Pills */}
                <div className={`mt-8 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="text-slate-500 text-sm mr-2">Top Städte:</span>
                    {cities.map((city, index) => (
                        <a
                            key={index}
                            href={`/regionen/${city.name.toLowerCase()}`}
                            className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all"
                        >
                            <span className="text-white font-medium">{city.name}</span>
                            <span className="text-green-400 text-sm">{city.count}</span>
                        </a>
                    ))}
                    <a href="/regionen" className="text-green-400 hover:text-green-300 text-sm font-medium ml-2">
                        +200 mehr →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default RegionsSection;
