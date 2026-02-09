import React from 'react';
import { useInView } from 'react-intersection-observer';

const TrustedBy: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const logos = [
        { name: '20 Minuten', width: 'w-28' },
        { name: 'Blick', width: 'w-20' },
        { name: 'NZZ', width: 'w-16' },
        { name: 'SRF', width: 'w-16' },
        { name: 'Handelszeitung', width: 'w-32' },
        { name: 'Startupticker', width: 'w-28' },
    ];

    return (
        <section ref={ref} className="relative py-16 bg-white border-y border-slate-100 overflow-hidden">
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className={`flex flex-col lg:flex-row items-center justify-between gap-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Left - Text */}
                    <div className="text-center lg:text-left flex-shrink-0">
                        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Bekannt aus
                        </div>
                        <div className="text-slate-900 font-bold">
                            Schweizer Medien
                        </div>
                    </div>

                    {/* Right - Logos */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-8 lg:gap-12">
                        {logos.map((logo, index) => (
                            <div
                                key={index}
                                className={`${logo.width} h-8 bg-slate-200 rounded flex items-center justify-center text-slate-400 font-bold text-sm hover:bg-slate-300 transition-colors`}
                                title={logo.name}
                            >
                                {logo.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Awards/Badges Row */}
                <div className={`mt-12 pt-8 border-t border-slate-100 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
                        
                        {/* Swiss Made */}
                        <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg viewBox="0 0 100 100" className="w-6 h-6 text-white" fill="currentColor">
                                    <rect x="40" y="20" width="20" height="60"/>
                                    <rect x="20" y="40" width="60" height="20"/>
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-sm">Swiss Made</div>
                                <div className="text-slate-500 text-xs">Software</div>
                            </div>
                        </div>

                        {/* Top Startup */}
                        <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xl">🏆</span>
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-sm">Top 50 Startup</div>
                                <div className="text-slate-500 text-xs">Schweiz 2024</div>
                            </div>
                        </div>

                        {/* Verified */}
                        <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-sm">Verifiziert</div>
                                <div className="text-slate-500 text-xs">Trusted Platform</div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-amber-400 text-lg">★</span>
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-sm">4.9 / 5 Sterne</div>
                                <div className="text-slate-500 text-xs">50'000+ Reviews</div>
                            </div>
                        </div>

                        {/* DSG */}
                        <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-sm">DSG-konform</div>
                                <div className="text-slate-500 text-xs">Datenschutz</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
