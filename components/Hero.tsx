import React from 'react';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon } from './icons';

const Hero: React.FC = () => {
    const { openQuoteModal } = useAppContext();

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Split Background */}
            <div className="absolute inset-0 flex">
                <div className="w-1/2 bg-white" />
                <div className="w-1/2 bg-gradient-to-br from-green-600 to-emerald-700" />
            </div>

            {/* Diagonal Overlay */}
            <div className="absolute inset-0">
                <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <polygon points="0,0 65,0 45,100 0,100" fill="white" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-20">
                    
                    {/* Left Side - Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-green-700 text-sm font-semibold">Jetzt über 2'500 Partner</span>
                        </div>

                        {/* Headline */}
                        <div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.95] tracking-tight">
                                Ihr Projekt.
                                <br />
                                <span className="text-green-600">Unsere Profis.</span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                            Erhalten Sie in Minuten kostenlose Offerten von verifizierten 
                            Schweizer Handwerkern. Einfach, schnell, zuverlässig.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => openQuoteModal()}
                                className="group flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-green-600/25 hover:shadow-2xl hover:shadow-green-600/30 transition-all"
                            >
                                <span>Offerte anfragen</span>
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-200 hover:border-green-300 rounded-xl font-semibold text-slate-700 hover:text-green-700 transition-all">
                                <span>So funktioniert's</span>
                            </button>
                        </div>

                        {/* Trust Points */}
                        <div className="flex flex-wrap gap-6 pt-4">
                            <div className="flex items-center gap-2 text-slate-600">
                                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span>
                                <span className="text-sm font-medium">Kostenlos</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span>
                                <span className="text-sm font-medium">Unverbindlich</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">✓</span>
                                <span className="text-sm font-medium">Schweizweit</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Visual: Isometric 3D Style */}
                    <div className="relative lg:pl-4">
                        <div className="relative w-full max-w-xl mx-auto">
                            {/* Main SVG Scene */}
                            <svg viewBox="0 0 500 400" className="w-full drop-shadow-2xl">
                                <defs>
                                    {/* Gradients */}
                                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#f0fdf4" />
                                        <stop offset="100%" stopColor="#dcfce7" />
                                    </linearGradient>
                                    <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#22c55e" />
                                        <stop offset="100%" stopColor="#16a34a" />
                                    </linearGradient>
                                    <linearGradient id="wallLight" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ffffff" />
                                        <stop offset="100%" stopColor="#f1f5f9" />
                                    </linearGradient>
                                    <linearGradient id="wallDark" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#e2e8f0" />
                                        <stop offset="100%" stopColor="#cbd5e1" />
                                    </linearGradient>
                                    <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#86efac" />
                                        <stop offset="100%" stopColor="#4ade80" />
                                    </linearGradient>
                                    
                                    {/* Shadow Filter */}
                                    <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.15"/>
                                    </filter>
                                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="3" result="blur"/>
                                        <feMerge>
                                            <feMergeNode in="blur"/>
                                            <feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Background */}
                                <rect width="500" height="400" rx="24" fill="url(#skyGrad)" />
                                
                                {/* Ground Plane (Isometric) */}
                                <path d="M50 320 L250 380 L450 320 L250 260 Z" fill="url(#groundGrad)" opacity="0.6" />
                                
                                {/* Grid Lines on Ground */}
                                <g opacity="0.2" stroke="#16a34a" strokeWidth="1">
                                    <line x1="100" y1="300" x2="300" y2="360" />
                                    <line x1="150" y1="280" x2="350" y2="340" />
                                    <line x1="200" y1="260" x2="400" y2="320" />
                                    <line x1="150" y1="340" x2="350" y2="280" />
                                    <line x1="200" y1="360" x2="400" y2="300" />
                                </g>

                                {/* === ISOMETRIC HOUSE === */}
                                <g filter="url(#softShadow)" transform="translate(250, 200)">
                                    {/* House Shadow */}
                                    <ellipse cx="0" cy="100" rx="80" ry="20" fill="rgba(0,0,0,0.1)" />
                                    
                                    {/* Left Wall */}
                                    <path d="M-70 0 L-70 80 L0 120 L0 40 Z" fill="url(#wallDark)" />
                                    
                                    {/* Right Wall */}
                                    <path d="M70 0 L70 80 L0 120 L0 40 Z" fill="url(#wallLight)" />
                                    
                                    {/* Roof Left */}
                                    <path d="M0 -60 L-80 0 L-70 0 L0 40 Z" fill="#16a34a" />
                                    
                                    {/* Roof Right */}
                                    <path d="M0 -60 L80 0 L70 0 L0 40 Z" fill="#22c55e" />
                                    
                                    {/* Roof Top Edge */}
                                    <path d="M0 -60 L-80 0 L0 -50 L80 0 Z" fill="#4ade80" />
                                    
                                    {/* Door */}
                                    <path d="M-10 120 L-10 70 L20 55 L20 105 Z" fill="#78350f" />
                                    <path d="M-5 115 L-5 75 L15 62 L15 102 Z" fill="#92400e" />
                                    <circle cx="12" cy="90" r="2" fill="#fbbf24" />
                                    
                                    {/* Window Left */}
                                    <path d="M-50 30 L-50 60 L-25 75 L-25 45 Z" fill="#7dd3fc" />
                                    <line x1="-37" y1="37" x2="-37" y2="67" stroke="white" strokeWidth="2" />
                                    <line x1="-50" y1="52" x2="-25" y2="60" stroke="white" strokeWidth="2" />
                                    
                                    {/* Window Right */}
                                    <path d="M50 30 L50 60 L25 75 L25 45 Z" fill="#7dd3fc" />
                                    <line x1="37" y1="37" x2="37" y2="67" stroke="white" strokeWidth="2" />
                                    <line x1="50" y1="52" x2="25" y2="60" stroke="white" strokeWidth="2" />
                                    
                                    {/* Chimney */}
                                    <path d="M35 -45 L35 -15 L50 -8 L50 -38 Z" fill="#64748b" />
                                    <path d="M50 -38 L50 -8 L60 -12 L60 -42 Z" fill="#475569" />
                                    <path d="M35 -45 L50 -38 L60 -42 L45 -49 Z" fill="#94a3b8" />
                                </g>

                                {/* === HANDWERKER 1: MALER (Links) === */}
                                <g transform="translate(100, 270)" className="cursor-pointer">
                                    {/* Person Shadow */}
                                    <ellipse cx="15" cy="65" rx="20" ry="6" fill="rgba(0,0,0,0.1)" />
                                    
                                    {/* Body */}
                                    <rect x="0" y="30" width="30" height="35" rx="4" fill="#3b82f6" />
                                    
                                    {/* Head */}
                                    <circle cx="15" cy="18" r="14" fill="#fcd34d" />
                                    <circle cx="10" cy="15" r="2" fill="#1e293b" />
                                    <circle cx="20" cy="15" r="2" fill="#1e293b" />
                                    <path d="M12 22 Q15 25 18 22" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                                    
                                    {/* Cap */}
                                    <path d="M0 12 Q15 -5 30 12 L28 15 Q15 5 2 15 Z" fill="#1d4ed8" />
                                    
                                    {/* Paint Roller */}
                                    <rect x="32" y="35" width="25" height="8" rx="3" fill="#f97316" />
                                    <rect x="28" y="38" width="8" height="3" fill="#78350f" />
                                    
                                    {/* Legs */}
                                    <rect x="5" y="65" width="8" height="3" rx="1" fill="#1e40af" />
                                    <rect x="17" y="65" width="8" height="3" rx="1" fill="#1e40af" />
                                    
                                    {/* Info Card */}
                                    <g transform="translate(-15, -50)">
                                        <rect width="70" height="35" rx="8" fill="white" filter="url(#softShadow)" />
                                        <text x="10" y="15" fontSize="9" fontWeight="bold" fill="#1e293b">Maler Pro</text>
                                        <text x="10" y="27" fontSize="8" fill="#3b82f6">★★★★★ 4.9</text>
                                        <text x="45" y="27" fontSize="7" fill="#64748b">CHF 1.8k</text>
                                    </g>
                                </g>

                                {/* === HANDWERKER 2: ELEKTRIKER (Rechts) === */}
                                <g transform="translate(370, 250)" className="cursor-pointer">
                                    {/* Person Shadow */}
                                    <ellipse cx="15" cy="65" rx="20" ry="6" fill="rgba(0,0,0,0.1)" />
                                    
                                    {/* Body */}
                                    <rect x="0" y="30" width="30" height="35" rx="4" fill="#f97316" />
                                    
                                    {/* Head */}
                                    <circle cx="15" cy="18" r="14" fill="#fcd34d" />
                                    <circle cx="10" cy="15" r="2" fill="#1e293b" />
                                    <circle cx="20" cy="15" r="2" fill="#1e293b" />
                                    <path d="M12 22 Q15 25 18 22" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                                    
                                    {/* Safety Helmet */}
                                    <ellipse cx="15" cy="6" rx="16" ry="10" fill="#facc15" />
                                    <rect x="0" y="4" width="30" height="4" fill="#eab308" />
                                    
                                    {/* Tool - Drill */}
                                    <rect x="-18" y="40" width="20" height="12" rx="3" fill="#dc2626" />
                                    <rect x="-25" y="44" width="10" height="4" fill="#64748b" />
                                    
                                    {/* Legs */}
                                    <rect x="5" y="65" width="8" height="3" rx="1" fill="#c2410c" />
                                    <rect x="17" y="65" width="8" height="3" rx="1" fill="#c2410c" />
                                    
                                    {/* Info Card */}
                                    <g transform="translate(-5, -50)">
                                        <rect width="70" height="35" rx="8" fill="white" filter="url(#softShadow)" />
                                        <text x="10" y="15" fontSize="9" fontWeight="bold" fill="#1e293b">Elektro Swiss</text>
                                        <text x="10" y="27" fontSize="8" fill="#f97316">★★★★★ 4.8</text>
                                        <text x="45" y="27" fontSize="7" fill="#64748b">CHF 2.3k</text>
                                    </g>
                                </g>

                                {/* === HANDWERKER 3: SANITÄR (Vorne) === */}
                                <g transform="translate(200, 310)" className="cursor-pointer">
                                    {/* Person Shadow */}
                                    <ellipse cx="15" cy="65" rx="20" ry="6" fill="rgba(0,0,0,0.1)" />
                                    
                                    {/* Body */}
                                    <rect x="0" y="30" width="30" height="35" rx="4" fill="#06b6d4" />
                                    
                                    {/* Head */}
                                    <circle cx="15" cy="18" r="14" fill="#fcd34d" />
                                    <circle cx="10" cy="15" r="2" fill="#1e293b" />
                                    <circle cx="20" cy="15" r="2" fill="#1e293b" />
                                    <path d="M12 22 Q15 25 18 22" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                                    
                                    {/* Cap */}
                                    <path d="M0 12 Q15 -5 30 12 L28 15 Q15 5 2 15 Z" fill="#0891b2" />
                                    
                                    {/* Wrench */}
                                    <rect x="32" y="42" width="22" height="6" rx="2" fill="#94a3b8" />
                                    <circle cx="52" cy="45" r="6" fill="#64748b" />
                                    <circle cx="52" cy="45" r="3" fill="#94a3b8" />
                                    
                                    {/* Legs */}
                                    <rect x="5" y="65" width="8" height="3" rx="1" fill="#0e7490" />
                                    <rect x="17" y="65" width="8" height="3" rx="1" fill="#0e7490" />
                                    
                                    {/* Info Card */}
                                    <g transform="translate(-5, -50)">
                                        <rect width="70" height="35" rx="8" fill="white" filter="url(#softShadow)" />
                                        <text x="10" y="15" fontSize="9" fontWeight="bold" fill="#1e293b">Sanitär Plus</text>
                                        <text x="10" y="27" fontSize="8" fill="#06b6d4">★★★★☆ 4.7</text>
                                        <text x="45" y="27" fontSize="7" fill="#64748b">CHF 3.1k</text>
                                    </g>
                                </g>

                                {/* Connection Lines with Dots */}
                                <g opacity="0.4">
                                    <path d="M130 290 Q190 250 250 240" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 4" fill="none" />
                                    <path d="M385 270 Q320 250 250 240" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 4" fill="none" />
                                    <path d="M215 330 Q230 290 250 260" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 4" fill="none" />
                                </g>
                                
                                {/* Animated Dots on Lines */}
                                <circle r="4" fill="#22c55e" filter="url(#glow)">
                                    <animateMotion dur="3s" repeatCount="indefinite" path="M130 290 Q190 250 250 240" />
                                </circle>
                                <circle r="4" fill="#22c55e" filter="url(#glow)">
                                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M385 270 Q320 250 250 240" />
                                </circle>
                                <circle r="4" fill="#22c55e" filter="url(#glow)">
                                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M215 330 Q230 290 250 260" />
                                </circle>

                                {/* Top Badge - Live Offerten */}
                                <g transform="translate(20, 20)">
                                    <rect width="110" height="32" rx="16" fill="white" filter="url(#softShadow)" />
                                    <circle cx="20" cy="16" r="5" fill="#22c55e">
                                        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                                    </circle>
                                    <text x="32" y="20" fontSize="11" fontWeight="600" fill="#1e293b">3 Offerten live</text>
                                </g>

                                {/* Swiss Badge */}
                                <g transform="translate(370, 20)">
                                    <rect width="100" height="32" rx="16" fill="#dc2626" filter="url(#softShadow)" />
                                    <rect x="12" y="10" width="12" height="12" rx="2" fill="white" />
                                    <text x="14" y="20" fontSize="10" fontWeight="bold" fill="#dc2626">+</text>
                                    <text x="32" y="20" fontSize="10" fontWeight="600" fill="white">Swiss Made</text>
                                </g>

                                {/* Project Label on House */}
                                <g transform="translate(205, 115)">
                                    <rect width="90" height="26" rx="13" fill="white" filter="url(#softShadow)" />
                                    <text x="12" y="17" fontSize="10" fontWeight="bold" fill="#16a34a">🏠 Ihr Projekt</text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Swiss Quality Badge - Fixed */}
            <div className="absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-lg border border-slate-100">
                <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">Swiss Made</span>
            </div>
        </section>
    );
};

export default Hero;
