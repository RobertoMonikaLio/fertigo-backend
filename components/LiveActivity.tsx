import React from 'react';
import { useInView } from 'react-intersection-observer';

const LiveActivity: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const recentSearches = [
        { service: 'Badezimmer Renovation', location: 'Zürich', time: 'vor 2 Min.' },
        { service: 'Malerarbeiten', location: 'Bern', time: 'vor 5 Min.' },
        { service: 'Küche montieren', location: 'Basel', time: 'vor 8 Min.' },
        { service: 'Gartenpflege', location: 'Luzern', time: 'vor 12 Min.' },
        { service: 'Umzug 3.5 Zimmer', location: 'Winterthur', time: 'vor 15 Min.' },
        { service: 'Elektriker gesucht', location: 'St. Gallen', time: 'vor 18 Min.' },
    ];

    const trendingServices = [
        { name: 'Badezimmer Renovation', searches: 234, trend: '+18%' },
        { name: 'Malerarbeiten', searches: 189, trend: '+12%' },
        { name: 'Küchenmontage', searches: 156, trend: '+24%' },
        { name: 'Bodenbeläge', searches: 134, trend: '+8%' },
    ];

    return (
        <section ref={ref} className="relative py-20 lg:py-28 bg-slate-900 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-green-400 text-sm font-medium">Live-Aktivität</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                        Das wird gerade gesucht
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Echte Anfragen von Schweizer Auftraggebern in Echtzeit
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Recent Searches - Takes 2 columns */}
                    <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-bold text-lg">Aktuelle Anfragen</h3>
                                <span className="text-slate-500 text-sm">Letzte 20 Minuten</span>
                            </div>
                            
                            <div className="space-y-4">
                                {recentSearches.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">{item.service}</div>
                                                <div className="text-slate-500 text-sm">{item.location}</div>
                                            </div>
                                        </div>
                                        <div className="text-slate-500 text-sm">{item.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Trending Services */}
                    <div className={`transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-6 lg:p-8 h-full">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-2xl">🔥</span>
                                <h3 className="text-white font-bold text-lg">Trending</h3>
                            </div>
                            
                            <div className="space-y-4">
                                {trendingServices.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-white/10 rounded-xl"
                                    >
                                        <div>
                                            <div className="text-white font-medium text-sm">{item.name}</div>
                                            <div className="text-green-200 text-xs">{item.searches} Anfragen</div>
                                        </div>
                                        <div className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {item.trend}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Stats */}
                            <div className="mt-6 pt-6 border-t border-white/20">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-black text-white">127</div>
                                        <div className="text-green-200 text-xs">Anfragen heute</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-white">89%</div>
                                        <div className="text-green-200 text-xs">Erfolgsquote</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className={`mt-12 text-center transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-slate-400 mb-4">
                        Auch ein Projekt? Starten Sie jetzt Ihre Anfrage.
                    </p>
                    <div className="inline-flex items-center gap-2 text-green-400 font-semibold hover:text-green-300 transition-colors cursor-pointer">
                        <span>Kostenlos Offerten erhalten</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveActivity;
