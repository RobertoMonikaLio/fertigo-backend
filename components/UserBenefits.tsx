import React from 'react';
import { useInView } from 'react-intersection-observer';

const UserBenefits: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section
            ref={ref}
            className="relative py-16 sm:py-20 bg-slate-900 overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Scrolling Pills Row 1 */}
                <div className={`mb-4 overflow-hidden transition-all duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex gap-4 animate-marquee">
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex gap-4 shrink-0">
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/10 shrink-0">
                                    <span className="text-2xl">💰</span>
                                    <span className="text-white font-semibold">100% Kostenlos</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/20 backdrop-blur border border-green-500/30 shrink-0">
                                    <span className="text-2xl">⚡</span>
                                    <span className="text-green-400 font-semibold">In 2 Minuten</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/10 shrink-0">
                                    <span className="text-2xl">📋</span>
                                    <span className="text-white font-semibold">5+ Offerten</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/10 shrink-0">
                                    <span className="text-2xl">🛡️</span>
                                    <span className="text-white font-semibold">Geprüfte Partner</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/20 backdrop-blur border border-green-500/30 shrink-0">
                                    <span className="text-2xl">⭐</span>
                                    <span className="text-green-400 font-semibold">4.9 Bewertung</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/10 shrink-0">
                                    <span className="text-2xl">📍</span>
                                    <span className="text-white font-semibold">Lokale Experten</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center Content */}
                <div className={`text-center py-12 lg:py-16 transition-all duration-1000 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                        Ihre Vorteile{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            bei Fertigo
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
                        Für Auftraggeber – schnell, einfach und kostenlos zum perfekten Dienstleister
                    </p>
                    
                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                        <div className="text-center">
                            <div className="text-4xl lg:text-5xl font-black text-white">2'500+</div>
                            <div className="text-slate-500 text-sm mt-1">Partner</div>
                        </div>
                        <div className="w-px h-12 bg-slate-700 hidden sm:block" />
                        <div className="text-center">
                            <div className="text-4xl lg:text-5xl font-black text-white">50k+</div>
                            <div className="text-slate-500 text-sm mt-1">Projekte</div>
                        </div>
                        <div className="w-px h-12 bg-slate-700 hidden sm:block" />
                        <div className="text-center">
                            <div className="text-4xl lg:text-5xl font-black text-green-400">0.-</div>
                            <div className="text-slate-500 text-sm mt-1">Für Sie</div>
                        </div>
                        <div className="w-px h-12 bg-slate-700 hidden sm:block" />
                        <div className="text-center">
                            <div className="text-4xl lg:text-5xl font-black text-white">🇨🇭</div>
                            <div className="text-slate-500 text-sm mt-1">Schweiz</div>
                        </div>
                    </div>
                </div>

                {/* Scrolling Pills Row 2 - Reverse */}
                <div className={`overflow-hidden transition-all duration-1000 delay-300 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex gap-4 animate-marquee-reverse">
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex gap-4 shrink-0">
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/10 shrink-0">
                                    <span className="text-2xl">✅</span>
                                    <span className="text-white font-semibold">Unverbindlich</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/20 backdrop-blur border border-green-500/30 shrink-0">
                                    <span className="text-2xl">🔒</span>
                                    <span className="text-green-400 font-semibold">DSGVO-konform</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/10 shrink-0">
                                    <span className="text-2xl">🎯</span>
                                    <span className="text-white font-semibold">Passende Matches</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/10 shrink-0">
                                    <span className="text-2xl">💬</span>
                                    <span className="text-white font-semibold">Direkter Kontakt</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/20 backdrop-blur border border-green-500/30 shrink-0">
                                    <span className="text-2xl">🚀</span>
                                    <span className="text-green-400 font-semibold">Schnelle Antwort</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/10 shrink-0">
                                    <span className="text-2xl">💎</span>
                                    <span className="text-white font-semibold">Premium Qualität</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CSS for Marquee Animation */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse 30s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default UserBenefits;
