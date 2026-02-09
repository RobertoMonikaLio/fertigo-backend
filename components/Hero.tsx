import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon, SwissFlagIcon } from './icons';

const rotatingWords = ['Maler', 'Umzugsfirma', 'Reinigung', 'Elektriker', 'Gärtner', 'Handwerker'];
const rotatingImages = [
    '/hero-maler.png',
    '/hero-umzug.png',
    '/hero-reinigung.png',
    '/hero-elektriker.jpg',
    '/hero-garten.png',
    '/hero-handwerker.jpg',
];

const Hero: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const [mounted, setMounted] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFlipping(true);
            setTimeout(() => {
                setWordIndex(p => (p + 1) % rotatingWords.length);
                setIsFlipping(false);
            }, 350);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    const handleCTA = useCallback(() => {
        openQuoteModal({});
    }, [openQuoteModal]);

    return (
        <section className="relative overflow-hidden bg-[#0a0f1a]">

            {/* ══════════ HINTERGRUND ══════════ */}
            <div className="absolute inset-0 pointer-events-none select-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1424] to-[#071210]" />
                <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-green-600/[0.07] rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/[0.06] rounded-full blur-[130px]" />
                <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-teal-400/[0.04] rounded-full blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.035]" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
            </div>

            {/* ══════════ BILD: Komplette rechte Hälfte (nur Desktop) ══════════ */}
            <div className={`hidden lg:block absolute top-0 bottom-0 right-0 w-1/2 z-[1] transition-opacity duration-[1500ms] delay-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                {/* Gradient-Overlays */}
                <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a0f1a]/80 via-transparent to-[#0a0f1a]/40 pointer-events-none" />

                {/* Synchronisierte Bilder */}
                {rotatingImages.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt={rotatingWords[i]}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                            i === wordIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    />
                ))}
            </div>

            {/* ══════════ MOBIL: Bild als Block ══════════ */}
            <div className={`relative lg:hidden w-full h-[300px] sm:h-[400px] transition-opacity duration-1000 delay-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0f1a] via-transparent to-[#0a0f1a]/50 pointer-events-none" />
                {rotatingImages.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt={rotatingWords[i]}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                            i === wordIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
                        }`}
                    />
                ))}
            </div>

            {/* ══════════ TEXT-INHALT ══════════ */}
            <div className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="lg:min-h-[calc(100vh-80px)] lg:flex lg:items-center py-10 sm:py-16 lg:py-20">
                        <div className={`max-w-xl transition-all duration-[1200ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                            {/* Schweiz-Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-full px-4 py-2 mb-7 group hover:bg-white/[0.1] transition-colors">
                                <SwissFlagIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="text-white/60 text-xs sm:text-sm font-medium">Schweizer Handwerker-Plattform</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black leading-[1.08] tracking-tight mb-6 whitespace-nowrap">
                                <span className="text-white">Finden Sie den perfekten</span>
                                <br />
                                <span className="relative inline-block overflow-hidden" style={{ minWidth: '220px' }}>
                                    <span
                                        className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 animate-text-gradient transition-all duration-300 ${
                                            isFlipping ? 'opacity-0 -translate-y-6 blur-sm' : 'opacity-100 translate-y-0 blur-0'
                                        }`}
                                        style={{ backgroundSize: '200% auto' }}
                                    >
                                        {rotatingWords[wordIndex]}
                                    </span>
                                </span>
                            </h1>

                            {/* Beschreibung */}
                            <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                                Beschreiben Sie Ihr Projekt und erhalten Sie innert Stunden <span className="text-white/70 font-medium">bis zu 5 Offerten</span> von geprüften Fachbetrieben aus Ihrer Region.
                            </p>

                            {/* CTA Button */}
                            <button
                                onClick={handleCTA}
                                className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mb-8"
                            >
                                Offerte erhalten
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Trust-Zeile */}
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                {[
                                    { icon: '✓', text: '100% Kostenlos' },
                                    { icon: '✓', text: 'Unabhängig und neutral' },
                                    { icon: '✓', text: 'Geprüfte Handwerker' },
                                ].map((item, i) => (
                                    <span key={i} className="flex items-center gap-1.5 text-xs sm:text-sm text-white/30">
                                        <span className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 text-[10px] font-bold">{item.icon}</span>
                                        {item.text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Unterer Übergang */}
            <div className="relative z-20 h-16 sm:h-20 lg:h-24 -mt-px">
                <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none">
                    <path d="M0 96H1440V32C1440 32 1320 0 1200 16C1080 32 960 64 720 64C480 64 360 32 240 16C120 0 0 32 0 32V96Z" fill="white" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
