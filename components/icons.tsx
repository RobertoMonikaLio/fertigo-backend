import React from 'react';

interface IconProps {
    className?: string;
    filled?: boolean;
    color?: string;
}

// --- NEW ICONS for Features Section ---
// Handgezeichneter skizzenhafter Stil für Schritt 1
export const HowItWorksStep1Icon: React.FC<IconProps> = ({
    className,
    color = "#16a34a"
}) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
    >
        {/* Schwarzer Hintergrund */}
        <rect width="100" height="100" fill="#000000" />

        {/* Notizblock/Clipboard mit Stift - handgezeichneter Stil */}
        <g stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Clipboard/Notizblock - leicht schief und unregelmäßig */}
            <path d="M 25 20 Q 24 18, 26 18 L 74 18 Q 76 18, 75 20 L 75 75 Q 76 77, 74 77 L 26 77 Q 24 77, 25 75 Z"
                strokeWidth="3" />

            {/* Clip oben - handgezeichnet */}
            <path d="M 45 18 Q 47 15, 50 15 Q 53 15, 55 18" strokeWidth="3" />
            <path d="M 47 15 Q 48 12, 50 12 Q 52 12, 53 15" strokeWidth="2.5" />

            {/* Linien auf dem Papier - leicht wellig */}
            <path d="M 30 30 Q 32 28, 35 30 T 40 30 T 45 30 T 50 30 T 55 30 T 60 30 T 65 30 T 70 30"
                strokeWidth="1.5" opacity="0.6" />
            <path d="M 30 38 Q 32 36, 35 38 T 40 38 T 45 38 T 50 38 T 55 38 T 60 38 T 65 38 T 70 38"
                strokeWidth="1.5" opacity="0.6" />
            <path d="M 30 46 Q 32 44, 35 46 T 40 46 T 45 46 T 50 46 T 55 46 T 60 46 T 65 46 T 70 46"
                strokeWidth="1.5" opacity="0.6" />
            <path d="M 30 54 Q 32 52, 35 54 T 40 54 T 45 54 T 50 54 T 55 54 T 60 54 T 65 54 T 70 54"
                strokeWidth="1.5" opacity="0.5" />

            {/* Text/Projektbeschreibung - handgeschrieben */}
            <path d="M 32 62 Q 34 60, 36 62 Q 38 64, 40 62 Q 42 60, 44 62" strokeWidth="2" />
            <path d="M 32 68 Q 34 66, 36 68 Q 38 70, 40 68" strokeWidth="2" />

            {/* Stift - schräg positioniert */}
            <g transform="translate(68, 25) rotate(25)">
                {/* Stift Körper */}
                <rect x="0" y="0" width="12" height="3" rx="1.5" fill={color} opacity="0.9" />
                {/* Stift Spitze */}
                <path d="M 12 1.5 L 16 0.5 L 16 2.5 Z" fill={color} />
                {/* Stift Details */}
                <line x1="2" y1="0" x2="2" y2="3" stroke="#000000" strokeWidth="0.5" opacity="0.3" />
                <line x1="6" y1="0" x2="6" y2="3" stroke="#000000" strokeWidth="0.5" opacity="0.3" />
            </g>

            {/* Handgezeichnete Akzente - kleine Striche */}
            <path d="M 28 22 L 30 20" strokeWidth="1.5" opacity="0.4" />
            <path d="M 72 22 L 70 20" strokeWidth="1.5" opacity="0.4" />
            <path d="M 28 75 L 30 77" strokeWidth="1.5" opacity="0.4" />
            <path d="M 72 75 L 70 77" strokeWidth="1.5" opacity="0.4" />
        </g>
    </svg>
);

export const HowItWorksStep1IconDesktop: React.FC<IconProps> = ({
    className,
    color = "#16a34a"
}) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
    >
        {/* Schwarzer Hintergrund */}
        <rect width="100" height="100" fill="#000000" />

        {/* Desktop-Computer - handgezeichneter skizzenhafter Stil */}
        <g stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Monitor - leicht unregelmäßig und skizzenhaft */}
            <path d="M 15 20 Q 14 18, 16 18 L 84 18 Q 86 18, 85 20 L 85 60 Q 86 62, 84 62 L 16 62 Q 14 62, 15 60 Z"
                strokeWidth="3" />

            {/* Monitor Standfuß */}
            <path d="M 40 62 L 42 75 L 58 75 L 60 62" strokeWidth="2.5" />
            <path d="M 35 75 L 65 75" strokeWidth="3" />

            {/* Bildschirminhalt - Fertigo Logo und Text */}
            <g fill={color}>
                {/* Fertigo Logo (stilisiertes F mit Quadraten) */}
                <g transform="translate(30, 32)">
                    {/* F Form */}
                    <path d="M 0 0 L 0 12 L 6 12 L 6 8 L 3 8 L 3 4 L 6 4 L 6 0 Z"
                        stroke={color} strokeWidth="2" fill="none" />
                    {/* Kleine Quadrate oben rechts */}
                    <rect x="8" y="0" width="3" height="3" stroke={color} strokeWidth="1.5" fill="none" />
                    <rect x="12" y="0" width="3" height="3" stroke={color} strokeWidth="1.5" fill="none" />
                </g>

                {/* "Fertigo." Text */}
                <text x="50" y="45" fontSize="6" fontFamily="sans-serif" fontWeight="bold" fill={color}>
                    Fertigo.
                </text>
            </g>

            {/* Tastatur - unterhalb des Monitors */}
            <g transform="translate(20, 78)">
                <path d="M 0 0 Q 2 -1, 4 0 L 36 0 Q 38 -1, 40 0 L 40 8 Q 38 9, 36 8 L 4 8 Q 2 9, 0 8 Z"
                    strokeWidth="2.5" />
                {/* Tastatur-Tasten (vereinfacht) */}
                <line x1="8" y1="2" x2="12" y2="2" strokeWidth="1.5" opacity="0.6" />
                <line x1="16" y1="2" x2="20" y2="2" strokeWidth="1.5" opacity="0.6" />
                <line x1="24" y1="2" x2="28" y2="2" strokeWidth="1.5" opacity="0.6" />
                <line x1="8" y1="5" x2="16" y2="5" strokeWidth="1.5" opacity="0.6" />
                <line x1="20" y1="5" x2="28" y2="5" strokeWidth="1.5" opacity="0.6" />
            </g>

            {/* Computermaus - rechts neben der Tastatur */}
            <g transform="translate(65, 80)">
                <ellipse cx="6" cy="4" rx="5" ry="3" strokeWidth="2.5" />
                {/* Mauskabel - verbindet mit Monitor */}
                <path d="M 0 4 Q -5 0, -8 -3" strokeWidth="2" opacity="0.7" />
            </g>

            {/* Handgezeichnete Akzente - kleine unregelmäßige Striche für skizzenhaften Look */}
            <path d="M 18 20 L 20 18" strokeWidth="1.5" opacity="0.4" />
            <path d="M 82 20 L 80 18" strokeWidth="1.5" opacity="0.4" />
            <path d="M 18 60 L 20 62" strokeWidth="1.5" opacity="0.4" />
            <path d="M 82 60 L 80 62" strokeWidth="1.5" opacity="0.4" />
        </g>
    </svg>
);

export const HowItWorksStep2Icon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(15,10) scale(0.7)">
            {/* Body */}
            <path d="M 20 100 L 20 50 C 20 30, 30 20, 50 20 C 70 20, 80 30, 80 50 L 80 100 Z" fill="#16a34a" />
            {/* Arms */}
            <path d="M 20 55 C 30 65, 70 65, 80 55" stroke="#16a34a" strokeWidth="15" fill="none" strokeLinecap="round" />
            {/* Head */}
            <circle cx="50" cy="25" r="15" fill="#ffedd5" />
            <path d="M 50 25 V 15" stroke="#94a3b8" strokeWidth="2" />
            {/* Helmet */}
            <path d="M 35 15 C 35 5, 65 5, 65 15 Z" fill="#4ade80" stroke="#166534" strokeWidth="2" />
            <rect x="33" y="14" width="34" height="4" fill="#4ade80" stroke="#166534" strokeWidth="2" />
            {/* Speech bubble */}
            <rect x="70" y="20" width="30" height="20" rx="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
            <path d="M75 40 l5 -5 l-5 -5 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="85" cy="30" r="5" fill="#4ade80" />
            <path d="M82 30 l2 2.5 l4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
    </svg>
);

export const HowItWorksStep2IconDesktop: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(5, 5) scale(0.9)">
            {/* Phone */}
            <rect x="25" y="5" width="50" height="90" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
            <rect x="28" y="8" width="44" height="84" rx="5" fill="#fff" />
            <line x1="40" y1="12" x2="60" y2="12" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />

            {/* Main Request on screen */}
            <rect x="35" y="20" width="30" height="5" rx="2.5" fill="#e5e7eb" />
            <rect x="35" y="30" width="20" height="3" rx="1.5" fill="#f1f5f9" />

            {/* Pop-up notifications from craftsmen */}

            {/* Notification 1 (left) */}
            <g transform="translate(10, 35)">
                <rect x="0" y="0" width="30" height="15" rx="7.5" fill="#fff" stroke="#4ade80" strokeWidth="2" />
                <circle cx="7" cy="7.5" r="4" fill="#dcfce7" /> {/* Avatar */}
                <rect x="13" y="4.5" width="12" height="3" rx="1.5" fill="#94a3b8" />
                <rect x="13" y="9.5" width="8" height="2" rx="1" fill="#cbd5e1" />
            </g>

            {/* Notification 2 (right) */}
            <g transform="translate(60, 50)">
                <rect x="0" y="0" width="30" height="15" rx="7.5" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="7" cy="7.5" r="4" fill="#e5e7eb" /> {/* Avatar */}
                <rect x="13" y="4.5" width="14" height="3" rx="1.5" fill="#94a3b8" />
                <rect x="13" y="9.5" width="10" height="2" rx="1" fill="#cbd5e1" />
            </g>

            {/* Notification 3 (bottom-left) */}
            <g transform="translate(15, 65)">
                <rect x="0" y="0" width="30" height="15" rx="7.5" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="7" cy="7.5" r="4" fill="#e5e7eb" /> {/* Avatar */}
                <rect x="13" y="4.5" width="11" height="3" rx="1.5" fill="#94a3b8" />
                <rect x="13" y="9.5" width="9" height="2" rx="1" fill="#cbd5e1" />
            </g>

            {/* Decorative elements */}
            <path d="M 0 10 L 10 20" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
            <circle cx="90" cy="80" r="8" fill="#dcfce7" />
            <path d="M 95 5 L 85 15" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
        </g>
    </svg>
);

export const HowItWorksStep3Icon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 5) scale(0.8)">
            {/* Card */}
            <rect x="20" y="15" width="60" height="80" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
            {/* Person */}
            <path d="M 30 80 L 30 50 C 30 35, 70 35, 70 50 L 70 80 Z" fill="#16a34a" />
            <circle cx="50" cy="35" r="10" fill="#d2b48c" />
            {/* Cap */}
            <path d="M 40 28 C 40 23, 60 23, 60 28 Z" fill="#4ade80" stroke="#166534" strokeWidth="1.5" />
            <path d="M 60 28 C 65 28, 68 26, 68 24" stroke="#166534" strokeWidth="1.5" fill="none" />
            {/* Lines on card */}
            <rect x="30" y="65" width="40" height="5" rx="2" fill="#d1d5db" />
            <rect x="30" y="75" width="30" height="5" rx="2" fill="#d1d5db" />
            {/* Checkmark */}
            <circle cx="75" cy="25" r="10" fill="#4ade80" stroke="#166534" strokeWidth="2" />
            <path d="M70 25 l3 4 l6-6" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
    </svg>
);

export const HowItWorksStep3IconDesktop: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(5, 5) scale(0.9)">
            {/* Monitor */}
            <rect x="5" y="10" width="90" height="65" rx="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 5 20 H 95" stroke="#e5e7eb" strokeWidth="1.5" />
            <circle cx="12" cy="15" r="2" fill="#f87171" />
            <circle cx="18" cy="15" r="2" fill="#fbbf24" />
            <circle cx="24" cy="15" r="2" fill="#4ade80" />

            {/* Monitor Stand */}
            <path d="M 40 75 L 45 90 H 55 L 60 75 Z" fill="#e5e7eb" stroke="#94a3b8" strokeWidth="2" />
            <rect x="30" y="90" width="40" height="3" rx="1.5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Background faded profiles */}
            <rect x="15" y="30" width="20" height="30" rx="3" fill="#e5e7eb" opacity="0.7" />
            <rect x="75" y="35" width="15" height="25" rx="3" fill="#e5e7eb" opacity="0.7" />

            {/* Main Profile Card (in focus) */}
            <g transform="translate(25, 25)">
                <rect x="0" y="0" width="50" height="45" rx="4" fill="#fff" stroke="#4ade80" strokeWidth="2" />
                <circle cx="25" cy="10" r="6" fill="#d2b48c" />
                <rect x="15" y="18" width="20" height="4" rx="2" fill="#94a3b8" />
                <text x="25" y="28" textAnchor="middle" fontSize="4" fill="#fbbf24">★★★★★</text>

                {/* Hire Button */}
                <rect x="10" y="32" width="30" height="8" rx="3" fill="#16a34a" />
                <text x="25" y="37.5" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="bold">Beauftragen</text>
            </g>

            {/* Cursor */}
            <g transform="translate(50, 58) rotate(-15)">
                <path d="M0 0 l8 12 l-3 1 l-5 -13z" fill="#334155" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
            </g>
        </g>
    </svg>
);


{/* Fix: Add missing flag icons used in Header.tsx */ }
{/* --- FLAG & BRAND ICONS --- */ }
export const GermanFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><rect width="5" height="3" fill="#000" /><rect width="5" height="2" y="1" fill="#D00" /><rect width="5" height="1" y="2" fill="#FFCE00" /></svg>);
export const FrenchFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="1" height="2" fill="#0055A4" /><rect width="1" height="2" x="1" fill="#FFF" /><rect width="1" height="2" x="2" fill="#EF4135" /></svg>);
export const ItalianFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="1" height="2" fill="#009246" /><rect width="1" height="2" x="1" fill="#FFF" /><rect width="1" height="2" x="2" fill="#CE2B37" /></svg>);
export const EnglishFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" > <clipPath id="a"><path d="M0 0v30h60V0z" /></clipPath> <clipPath id="b"><path d="M30 15h30v15H30zM0 0h30v15H0z" /></clipPath> <g clipPath="url(#a)"> <path d="M0 0v30h60V0z" fill="#012169" /> <path d="m0 0 60 30m0-30L0 30" stroke="#fff" strokeWidth="6" /> <path d="m0 0 60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4" /> <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" /> <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" /> </g> </svg>);
export const SpanishFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="2" fill="#C60B1E" /><rect width="3" height="1" y="0.5" fill="#FFC400" /></svg>);
export const PortugueseFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect fill="#006600" width="360" height="600" /><rect fill="#ff0000" x="360" width="540" height="600" /><circle cx="360" cy="300" r="75" fill="#fff" /><circle cx="360" cy="300" r="60" fill="#da291c" /></svg>);
export const DutchFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6"><rect width="9" height="6" fill="#21468B" /><rect width="9" height="4" fill="#fff" /><rect width="9" height="2" fill="#AE1C28" /></svg>);
export const PolishFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5"><rect width="8" height="5" fill="#DC143C" /><rect width="8" height="2.5" fill="#fff" /></svg>);
export const TurkishFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500"><path fill="#e30a17" d="M0 0h750v500H0z" /><path fill="#fff" d="M375 250a125 125 0 100-1 100 100 0 110 1z" /><path fill="#fff" d="M384.015 250l80.902-27.91-49.99 73.11V176.89l-49.99 73.11z" /></svg>);
export const RussianFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6"><rect width="9" height="6" fill="#D52B1E" /><rect width="9" height="4" fill="#0039A6" /><rect width="9" height="2" fill="#fff" /></svg>);
export const SwissFlagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#D52B1E" /><path d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7V6z" fill="#fff" /></svg>);
export const TwintIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="black" /><text x="20" y="27" fontFamily="sans-serif" fontSize="20" fontWeight="bold" textAnchor="middle" fill="white">TW</text></svg>);

// --- COLORED SERVICE ICONS (SVG) ---
// Using modern, gradient-enhanced SVGs for a more vibrant and professional look.

export const ColoredPaintRollerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="paint-roller-g" x1="3" y1="8" x2="21" y2="16" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <rect x="3" y="8" width="18" height="8" rx="2" fill="url(#paint-roller-g)" stroke="#14532D" strokeWidth="2" />
        <path d="M8 16v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 8V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredTruckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="truck-g" x1="1" y1="5" x2="21" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M1 17V6a2 2 0 0 1 2-2h10v14H4a3 3 0 0 1-3-3Z" fill="url(#truck-g)" stroke="#14532D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 5h5a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1h-6V5Z" stroke="#14532D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6.5" cy="18.5" r="2.5" fill="#fff" stroke="#14532D" strokeWidth="2" /><circle cx="16.5" cy="18.5" r="2.5" fill="#fff" stroke="#14532D" strokeWidth="2" />
    </svg>
);
export const ColoredSparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="sparkles-g" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="m11.164 3.19-1.22 2.492a.5.5 0 0 1-.376.26L7.13 6.447a.5.5 0 0 0-.272.86l2.13 2.077a.5.5 0 0 1 .145.44l-.503 2.924a.5.5 0 0 0 .732.522l2.61-1.372a.5.5 0 0 1 .466 0l2.61 1.372a.5.5 0 0 0 .732-.522l-.503-2.924a.5.5 0 0 1 .145-.44l2.13-2.077a.5.5 0 0 0-.272-.86l-2.438-.505a.5.5 0 0 1-.376-.26L12.836 3.19a.5.5 0 0 0-.894 0Z" stroke="#14532D" strokeWidth="2" fill="url(#sparkles-g)" />
        <path d="M5 3v4m14-4v4m-9 14v-4" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredWrenchScrewdriverIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="wrench-g" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#14532D" strokeWidth="2" fill="url(#wrench-g)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12 6 6" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredLeafIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="leaf-g" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" fill="url(#leaf-g)" stroke="#14532D" strokeWidth="2" />
        <path d="M12 2a10 10 0 0 0-2 19.5" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredPencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="pencil-g" x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M4 20h16M13.5 6.5l4 4L7 21H3v-4l10.5-10.5z" stroke="#14532D" strokeWidth="2" fill="url(#pencil-g)" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ColoredSwatchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="swatch-g" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#14532D" strokeWidth="2" fill="url(#swatch-g)" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
export const ColoredSquares2X2Icon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="squares-g" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <rect width="9" height="9" x="3" y="3" rx="1" stroke="#14532D" strokeWidth="2" fill="url(#squares-g)" />
        <rect width="9" height="9" x="3" y="12" rx="1" stroke="#14532D" strokeWidth="2" fill="url(#squares-g)" />
        <rect width="9" height="9" x="12" y="3" rx="1" stroke="#14532D" strokeWidth="2" fill="url(#squares-g)" />
        <rect width="9" height="9" x="12" y="12" rx="1" stroke="#14532D" strokeWidth="2" fill="url(#squares-g)" />
    </svg>
);
export const ColoredLightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="lightbulb-g" x1="7" y1="2" x2="17" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M9 18h6m-3-3v3m-4-5a8 8 0 1 1 8 0c0 2.5-1.5 4.5-3 5.5V15h-2v-1.5c-1.5-1-3-3-3-5.5z" stroke="#14532D" strokeWidth="2" fill="url(#lightbulb-g)" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
export const ColoredWindowIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="window-g" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#14532D" strokeWidth="2" fill="url(#window-g)" />
        <path d="M3 12h18M12 3v18" stroke="#14532D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
export const ColoredHomeModernIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="home-modern-g" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M3 9.5 12 4l9 5.5M19 13v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6" stroke="#14532D" strokeWidth="2" fill="url(#home-modern-g)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16h4" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredBuildingStorefrontIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="storefront-g" x1="4" y1="22" x2="20" y2="4" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M4 22h16M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M4 22V12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" stroke="#14532D" strokeWidth="2" fill="url(#storefront-g)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 16h4M9 6a3 3 0 1 0 6 0" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredBuildingOffice2Icon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="office-g" x1="4" y1="22" x2="20" y2="4" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M9 22h6m-3-3v3m-6-2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2" stroke="#14532D" strokeWidth="2" fill="url(#office-g)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 6h6m-6 4h6m-6 4h6" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredArchiveBoxIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="archive-g" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#14532D" strokeWidth="2" fill="url(#archive-g)" />
        <path d="M9 12h6" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredTrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="trash-g" x1="5" y1="6" x2="19" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M5 6h14m-1 16H6a2 2 0 0 1-2-2V8h12v12a2 2 0 0 1-2 2zM9 2h6" stroke="#14532D" strokeWidth="2" fill="url(#trash-g)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 12v4m4-4v4" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredSunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="sun-g" x1="12" y1="7" x2="12" y2="17" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <circle cx="12" cy="12" r="5" stroke="#14532D" strokeWidth="2" fill="url(#sun-g)" />
        <path d="M12 1v2m0 18v2m-9-9h2m18 0h-2m-6.364-6.364 1.414-1.414m12.728 12.728-1.414-1.414M4.929 4.929l1.414 1.414m12.728 12.728 1.414 1.414" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredToolboxIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="toolbox-g" x1="3" y1="8" x2="21" y2="16" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <rect x="3" y="8" width="18" height="12" rx="2" stroke="#14532D" strokeWidth="2" fill="url(#toolbox-g)" />
        <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 14h.01" stroke="#14532D" strokeWidth="3" strokeLinecap="round" />
    </svg>
);
export const ColoredMapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="mappin-g" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" stroke="#14532D" strokeWidth="2" fill="url(#mappin-g)" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" stroke="#14532D" strokeWidth="2" fill="white" />
    </svg>
);
export const ColoredUserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="user-g" x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#14532D" strokeWidth="2" fill="url(#user-g)" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" stroke="#14532D" strokeWidth="2" fill="url(#user-g)" />
    </svg>
);
export const ColoredMailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="mail-g" x1="3" y1="4" x2="21" y2="20" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="#14532D" strokeWidth="2" fill="url(#mail-g)" />
        <path d="m3 6 9 6 9-6" stroke="#14532D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
export const ColoredPhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="phone-g" x1="1" y1="1" x2="20" y2="20" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#14532D" strokeWidth="2" fill="url(#phone-g)" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
export const ColoredPartyPopperIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="party-g" x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M4 20v-5.5a2.5 2.5 0 0 1 2.5-2.5h11a2.5 2.5 0 0 1 2.5 2.5V20" stroke="#14532D" strokeWidth="2" fill="url(#party-g)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20h16" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
        <path d="m14 4-2 2-2-2m6 2-2 2-2-2m-2-2 2-2 2 2m-8 6h.01M16 12h.01" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredDiggerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="digger-g" x1="1" y1="5" x2="21" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M12 21a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H4.5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2M12 13V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h10" stroke="#14532D" strokeWidth="2" fill="url(#digger-g)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 7h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2m-3 0V9" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredVacuumCleanerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="vacuum-g" x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M4 18a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2-2H6a2 2 0 0 1-2-2v-2z" stroke="#14532D" strokeWidth="2" fill="url(#vacuum-g)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 16v-8a2 2 0 0 1 2-2h1" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
        <circle cx="6" cy="19" r="2" stroke="#14532D" strokeWidth="2" fill="white" />
        <circle cx="18" cy="19" r="2" stroke="#14532D" strokeWidth="2" fill="white" />
    </svg>
);
export const ColoredScaffoldingIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="scaffolding-g" x1="4" y1="22" x2="20" y2="2" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M4 22h4m12 0h-4M10 2h4M10 22V6M14 22V6" stroke="#14532D" strokeWidth="2" fill="url(#scaffolding-g)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 6h16M4 12h16M4 18h16" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredCarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="car-g" x1="1" y1="5" x2="21" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C19.7 10.2 19 9 18 9h-2.28c-.35.6-.94 1-1.64 1H8.92c-.7 0-1.29-.4-1.64-1H5c-1 0-1.8.8-1.8 1.8v3.4c0 .5.4.8.8.8h2" stroke="#14532D" strokeWidth="2" fill="url(#car-g)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 17h8m-7-5 1.5-3.5h5L16 12" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
        <circle cx="7" cy="17" r="2" stroke="#14532D" strokeWidth="2" fill="white" /><circle cx="17" cy="17" r="2" stroke="#14532D" strokeWidth="2" fill="white" />
    </svg>
);

export const ColoredBriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="briefcase-g" x1="3" y1="7" x2="21" y2="17" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="#14532D" strokeWidth="2" fill="url(#briefcase-g)" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 13h18" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const ColoredUsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="users-g" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#4ADE80" /><stop offset="1" stopColor="#16A34A" /></linearGradient></defs>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#14532D" strokeWidth="2" fill="url(#users-g)" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="#14532D" strokeWidth="2" fill="url(#users-g)" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#14532D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// --- GENERAL PURPOSE ICONS (Heroicons style) ---
// Using a consistent style for all basic UI icons improves visual cohesion.

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>);
export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>);
export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>);
export const Bars3Icon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>);
export const XMarkIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>);
export const PhoneIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" /></svg>);
export const MailIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>);
export const RocketLaunchIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m15.58 14.37-3.08-3.07v3.44c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.44l-3.08 3.07a.75.75 0 0 1-1.06-1.06l3.07-3.08H7.41c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.44L7.77 8.57a.75.75 0 0 1 1.06-1.06l3.08 3.07V7.14c0-.414.336-.75.75-.75s.75.336.75.75v3.44l3.08-3.07a.75.75 0 0 1 1.06 1.06l-3.07 3.08h3.44c.414 0 .75.336.75.75s-.336.75-.75.75h-3.44l3.07 3.07a.75.75 0 0 1-1.06 1.06Z" /></svg>);
export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>);
export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>);
export const ChartBarIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>);
export const CheckIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>);
export const PencilIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>);
export const UserCheckIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" /></svg>);
export const ShieldCheckIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M12 21.75c2.433 0 4.721-.662 6.635-1.855C21.285 18.438 22.5 15.36 22.5 12c0-3.36-1.215-6.438-3.865-7.895C16.721 3.442 14.433 2.25 12 2.25c-2.433 0-4.721.662-6.635 1.855C2.715 5.562 1.5 8.64 1.5 12c0 3.36 1.215 6.438 3.865 7.895 1.914 1.193 4.202 1.855 6.635 1.855Z" /></svg>);
export const TagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>);
export const BanknotesIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>);
export const ClockIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>);
export const CurrencyDollarIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>);

export const QuestionMarkCircleIcon: React.FC<IconProps & { title?: string }> = ({ className, title }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        {title && <title>{title}</title>}
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
);
export const XCircleIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>);
export const QuoteIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.489 4.978c.328-.184.703-.278 1.08-.278.403 0 .79.094 1.13.278.337.184.62.457.818.79.198.333.297.7.297 1.093V12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-4.152a1.002 1.002 0 0 1 .15-.536c.092-.198.22-.38.38-.536.16-.155.348-.28.56-.372zM15 13a1 1 0 0 0 1-1V7.848c0-.393-.1-.76-.297-1.093a2.431 2.431 0 0 0-.818-.79c-.34-.184-.727-.278-1.13-.278-.377 0-.752.094-1.08.278a2.45 2.45 0 0 0-.94.908c-.16.27-.24.565-.24.884V12a1 1 0 0 0 1 1h2z" /></svg>);
export const StarIcon: React.FC<IconProps> = ({ className, filled = true }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} strokeWidth={filled ? 0 : 1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>);
// Fix: Add missing SunIcon used in ServicesPage.tsx
export const SunIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>);
export const MagnifyingGlassIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>);
export const MapPinIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>);
export const CalendarDaysIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18" /></svg>);
export const UserIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>);
export const LightbulbIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-1.125 6.01 6.01 0 0 0-1.5-1.125m1.5 2.25H9m6 3.75a6.01 6.01 0 0 1-1.5-1.125m1.5 1.125a6.01 6.01 0 0 0-1.5-1.125m-1.5 2.25H15M12 18v2.25m0 0h-3m3 0h3m-3-12.75a6.01 6.01 0 0 0-1.5-1.125m1.5 1.125a6.01 6.01 0 0 1-1.5-1.125m1.5 1.125V3M3.896 11.25a6.01 6.01 0 0 1 1.5-1.125m-1.5 1.125h-2.25m2.25 0a6.01 6.01 0 0 0-1.5-1.125M3.896 11.25 3 12m.896-1.875L3 9.375m2.25 0h.008v.008H5.25v-.008Zm0 9h.008v.008H5.25v-.008Zm12.75 0h.008v.008h-.008v-.008Zm0-9h.008v.008h-.008V9.375Z" /></svg>);
export const TestsiegerIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9 9 0 0 0 9 0ZM10.5 5.25h3m-3.75 3.75h4.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" /></svg>);
export const BriefcaseIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.05a2.25 2.25 0 0 1-2.25 2.25h-12a2.25 2.25 0 0 1-2.25-2.25v-4.05m16.5 0a2.25 2.25 0 0 0-2.25-2.25h-12a2.25 2.25 0 0 0-2.25 2.25m16.5 0v-4.05a2.25 2.25 0 0 0-2.25-2.25h-12a2.25 2.25 0 0 0-2.25 2.25v4.05m0 0H21" /></svg>);
export const UsersIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-2.063M15 19.128v-3.873a3.375 3.375 0 0 0-3.375-3.375h-2.25a3.375 3.375 0 0 0-3.375 3.375v3.873m0 0a9.37 9.37 0 0 0-2.625.372A9.337 9.337 0 0 0 3 17.25m6-6V9a3.375 3.375 0 0 1 3.375-3.375h2.25A3.375 3.375 0 0 1 18 9v2.25m-6 6h-2.25M12 15V9.75M15 15V9.75" /></svg>);
export const BuildingOfficeIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>);
export const ArrowUpTrayIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>);
export const ArrowTrendingUpIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 18 9-9 4.5 4.5L21.75 6" /><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 18V6h-12" /></svg>);
export const Squares2X2Icon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 8.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6A2.25 2.25 0 0 1 15.75 3.75h2.25A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75A2.25 2.25 0 0 1 15.75 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>);
export const BuildingOffice2Icon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5 0v-6a2.25 2.25 0 0 0-2.25-2.25H9.75A2.25 2.25 0 0 0 7.5 15v6m3-15h.008v.008H10.5V6m0 3h.008v.008H10.5V9m0 3h.008v.008H10.5v-3Zm2.25-6h.008v.008H12.75V6m0 3h.008v.008H12.75V9m0 3h.008v.008H12.75v-3Z" /></svg>);
export const PencilSquareIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>);
export const TruckIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a1.125 1.125 0 0 0 1.125-1.125v-6.75a1.125 1.125 0 0 0-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v6.75c0 .621.504 1.125 1.125 1.125Z" /></svg>);
export const BoldIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4V8zm0 6h9a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4v-6z" /></svg>);
export const ItalicIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 5h8M6 19h8m-1-14-4 14" /></svg>);
export const ListBulletIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>);
export const ChevronUpDownIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg>);
export const HomeModernIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>);
export const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>);
export const ArrowLeftOnRectangleIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" /></svg>);
export const TrashIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>);
export const ExclamationTriangleIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>);
export const ToolboxIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.495-2.495a1.125 1.125 0 0 1 1.591 0l3.924 3.924a1.125 1.125 0 0 1 0 1.591l-2.495 2.495M11.42 15.17 6.873 20.623a1.125 1.125 0 0 1-1.591 0L2.25 17.25a1.125 1.125 0 0 1 0-1.591L6.873 11.42m4.547 3.75.002-.001m.002.001-.002.001" /><path strokeLinecap="round" strokeLinejoin="round" d="m8.625 11.25.939-.939a2.25 2.25 0 0 1 3.182 0l2.25 2.25a2.25 2.25 0 0 1 0 3.182l-.939.939" /></svg>);
export const BeakerIcon: React.FC<IconProps> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.66-.534-1.194-1.194-1.194H10.941c-.66 0-1.194.534-1.194 1.194v1.194h4.5V6.087Zm-4.5 1.194v1.194a2.388 2.388 0 0 0 2.388 2.388h2.388a2.388 2.388 0 0 0 2.388-2.388V7.281m-9.552 1.905a.716.716 0 0 1 .716-.716h13.596a.716.716 0 0 1 .716.716v7.878a4.06 4.06 0 0 1-4.06 4.06H8.216a4.06 4.06 0 0 1-4.06-4.06V9.186Z" /></svg>);
export const ArrowDownTrayIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>);
export const LockClosedIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>);
export const ChatBubbleLeftRightIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-2.718.272a11.916 11.916 0 0 1-7.564 0l-2.718-.272A2.25 2.25 0 0 1 3 15.183V10.9c0-.97.616-1.813 1.5-2.097m15.75 0a3.493 3.493 0 0 0-3.342-2.526 3.493 3.493 0 0 0-3.342 2.526m3.342 0a3.493 3.493 0 0 0-3.342-2.526 3.493 3.493 0 0 0-3.342 2.526m6.684 0a3.493 3.493 0 0 0-3.342-2.526m0 0a3.493 3.493 0 0 0-3.342-2.526M3.75 8.511a3.493 3.493 0 0 0-3.342-2.526A3.493 3.493 0 0 0 3.75 8.51" /></svg>);
export const PaperClipIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.122 2.122l7.81-7.81" /></svg>);
export const PaperAirplaneIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>);
export const CreditCardIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>);
export const SpinnerIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
export const BellIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>);
export const PlusIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>);
export const PhotoIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>);
export const EyeIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.443-6.101a1.012 1.012 0 0 1 1.583 0l4.443 6.101a1.012 1.012 0 0 1 0 .639l-4.443 6.101a1.012 1.012 0 0 1-1.583 0l-4.443-6.101Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>);
export const EyeSlashIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" /></svg>);
export const AdjustmentsHorizontalIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 1-3 0M3.75 12H15m-1.5 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0" /></svg>);
export const Spinner: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.828a8.25 8.25 0 01-11.667 0l-3.181 3.183m13.253-10.743L19.5 3.75m0 0v4.5m0-4.5h-4.5M3.75 9.75L3 3.75m0 0v4.5m0-4.5h4.5" /></svg>);

{/* Fix: Add missing icons used across multiple components. */ }
export const ClipboardDocumentListIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25v8.25A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6.75a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 .75.75h6.75a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75Z" /> </svg>);
export const DocumentTextIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>);
export const HandshakeIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 15c-1.246-1.246-1.246-3.26 0-4.504l1.813-1.813c1.246-1.246 3.26-1.246 4.504 0L18 11.25m-2.25 2.25l-1.813 1.813c-1.246 1.246-3.26 1.246-4.504 0l-1.813-1.813m-2.25-2.25L9 10.5M15 12.75L18 15" /> </svg>);
export const HeartIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>);
export const CookieIcon: React.FC<IconProps> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M21.25 12.003a9.25 9.25 0 11-18.5 0 9.25 9.25 0 0118.5 0z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M11.05 7.05a1 1 0 100-2 1 1 0 000 2zM15 11a1 1 0 100-2 1 1 0 000 2zM10 15a1 1 0 100-2 1 1 0 000 2zM16 16a1 1 0 100-2 1 1 0 000 2z" /> </svg>);
export const ArrowPathIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.828a8.25 8.25 0 01-11.667 0l-3.181 3.183m13.253-10.743L19.5 3.75m0 0v4.5m0-4.5h-4.5m-11.25 0L3 3.75m0 0v4.5m0-4.5h4.5" /></svg>);
export const SparklesIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>);
export const CubeIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>);
export const WrenchScrewdriverIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.83-5.83M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>);
export const FireIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /></svg>);
export const EnvelopeIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>);
export const DocumentCheckIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-12M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" /></svg>);
export const CameraIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>);
export const ShoppingBagIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>);
export const CurrencyIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>);