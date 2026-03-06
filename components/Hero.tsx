import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon, SwissFlagIcon } from './icons';
import { translations } from './translations';

const rotatingImages = [
    '/hero-maler.png',
    '/hero-umzug.png',
    '/hero-reinigung.png',
    '/hero-elektriker.jpg',
    '/hero-garten.png',
    '/hero-handwerker.jpg',
];

const Hero: React.FC = () => {
    const { openQuoteModal, language } = useAppContext();
    const [mounted, setMounted] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    const t = translations[language];
    const rotatingWords = t.heroRotatingWords;

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
    }, [rotatingWords.length]);

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
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out grayscale brightness-[0.6] ${i === wordIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    />
                ))}
            </div>

            {/* ══════════ MOBIL: Bild als Background (nimmt die ganze Sektion ein) ══════════ */}
            <div className={`absolute inset-0 lg:hidden transition-opacity duration-1000 delay-200 ${mounted ? 'opacity-100' : 'opacity-0'} z-0`}>
                {/* Dunklerer Gradient für optimale Lesbarkeit der weissen Schrift auf Mobile */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none" />

                {rotatingImages.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt={rotatingWords[i]}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out grayscale brightness-[0.5] ${i === wordIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}
            </div>

            {/* ══════════ TEXT-INHALT ══════════ */}
            <div className="relative z-10 w-full">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full flex flex-col">
                    <div className="flex-grow min-h-[520px] sm:min-h-[700px] lg:min-h-[calc(100vh-80px)] flex flex-col py-8 sm:py-16 lg:py-20">
                        <div className={`flex flex-col flex-grow max-w-xl transition-all duration-[1200ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                            {/* Schweiz-Badge – Premium-Design, zentriert */}
                            <div className="flex justify-center sm:justify-start mb-12 sm:mb-20">
                                <div className="inline-flex items-center gap-2.5">
                                    <div className="w-6 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent rounded-full" />
                                    <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-900/40 to-teal-900/20 backdrop-blur-md border border-emerald-500/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                                        <SwissFlagIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                        <span className="text-emerald-300/90 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]">{t.heroBadge}</span>
                                    </div>
                                    <div className="w-6 h-[2px] bg-gradient-to-l from-emerald-500 to-transparent rounded-full" />
                                </div>
                            </div>

                            {/* Headline */}
                            <h1 className="text-3xl sm:text-6xl lg:text-[3.25rem] xl:text-[3.75rem] font-black leading-[1.1] tracking-tight mb-12 sm:mb-20 lg:whitespace-nowrap drop-shadow-2xl">
                                <span className="text-white drop-shadow-md">{t.heroTitlePrefix}</span>
                                <br />
                                <span className="relative inline-block pb-2">
                                    <span className="relative inline-block align-bottom" style={{ minWidth: '200px' }}>
                                        <span
                                            className={`inline-block text-5xl sm:text-7xl lg:text-[5rem] xl:text-[5.5rem] text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 animate-text-gradient transition-all duration-300 drop-shadow-md ${isFlipping ? 'opacity-0 -translate-y-6 blur-sm' : 'opacity-100 translate-y-0'}`}
                                            style={{ backgroundSize: '200% auto' }}
                                        >
                                            {rotatingWords[wordIndex]}
                                        </span>
                                    </span>
                                </span>
                            </h1>

                            {/* Beschreibung */}
                            <p
                                className="text-white/90 lg:text-white/40 text-sm sm:text-xl leading-relaxed mb-4 sm:mb-10 max-w-md font-medium drop-shadow-md"
                                dangerouslySetInnerHTML={{ __html: t.heroDescription }}
                            />

                            {/* Micro Benefits */}
                            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6 mt-3 sm:mt-6 mb-12 sm:mb-20">
                                {[
                                    { text: "100% Kostenlos", icon: "✓" },
                                    { text: "Unverbindlich", icon: "✓" },
                                    { text: "Geprüfte Handwerker", icon: "✓" }
                                ].map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-2 text-white/80 text-xs sm:text-sm font-medium">
                                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                                            {benefit.icon}
                                        </span>
                                        {benefit.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* CTA Button & Security */}
                        <div className="mt-auto w-full pb-6 sm:pb-0">
                            <button
                                onClick={handleCTA}
                                className="group relative overflow-hidden inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-black px-8 py-4 sm:px-12 sm:py-5 rounded-2xl text-base sm:text-lg shadow-2xl shadow-green-900/50 hover:shadow-green-500/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 w-full sm:w-auto"
                            >
                                <span className="relative z-10">
                                    {t.heroCta}
                                </span>
                            </button>

                            {/* Security badges – zentriert unterhalb des Buttons */}
                            <div className="flex items-center justify-center gap-3 mt-3 sm:mt-4">
                                <div className="flex items-center gap-1.5 text-white/45 text-[10px] sm:text-xs font-medium">
                                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    SSL-Verschlüsselt
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/20" />
                                <div className="flex items-center gap-1.5 text-white/45 text-[10px] sm:text-xs font-medium">
                                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    100% Datenschutz
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bekannt aus Banner – nur ab sm sichtbar (Desktop / Tablet) */}
                <div className="hidden sm:flex absolute bottom-24 lg:bottom-28 left-0 w-full z-20 justify-center px-4">
                    <div className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em]">Bekannt aus</span>
                        <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
                            {["NZZ", "20 Minuten", "SRF", "Blick"].map((media, i) => (
                                <span key={i} className="text-white/70 font-black text-sm sm:text-base tracking-tighter mix-blend-overlay">
                                    {media}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Unterer Übergang (nur ab sm) */}
            <div className="relative z-20 hidden sm:block sm:h-20 lg:h-24 -mt-px">
                <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none">
                    <path d="M0 96H1440V32C1440 32 1320 0 1200 16C1080 32 960 64 720 64C480 64 360 32 240 16C120 0 0 32 0 32V96Z" fill="white" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
