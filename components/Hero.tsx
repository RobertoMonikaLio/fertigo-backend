
import React from 'react';
import { Link } from 'react-router-dom';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from '../pages/AppContext';
import {
    CheckCircleIcon,
    SwissFlagIcon,
    ArrowRightIcon,
    StarIcon
} from './icons';


const Hero: React.FC = () => {
    const { openQuoteModal } = useAppContext();

    // Mock data for the mobile project stream
    const feedItems = [
        {
            type: 'new_request',
            title: 'Malerarbeiten in Zürich',
            location: '8004 Zürich',
            service: 'Malerarbeiten',
            // icon: <ColoredPaintRollerIcon className="w-6 h-6" />,
            time: 'vor 5 Min.'
        },
        {
            type: 'completed',
            title: 'Wohnungsrenovierung',
            location: 'Bern',
            image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=75&w=400&auto=format&fit=crop',
            review: '"Super Arbeit, sehr sauber und pünktlich."',
            author: 'Anna M.'
        },
        {
            type: 'new_request',
            title: 'Umzug von Basel nach Genf',
            location: '4051 Basel',
            service: 'Umzug',
            // icon: <ColoredTruckIcon className="w-6 h-6" />,
            time: 'vor 12 Min.'
        },
        {
            type: 'completed',
            title: 'Gartenneugestaltung',
            location: 'Luzern',
            image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=75&w=400&auto=format&fit=crop',
            review: '"Unser Garten sieht wieder fantastisch aus!"',
            author: 'Peter K.'
        },
        {
            type: 'new_request',
            title: 'Umzugsreinigung 4.5 Zimmer',
            location: '8400 Winterthur',
            service: 'Reinigung',
            // icon: <ColoredSparklesIcon className="w-6 h-6" />,
            time: 'vor 28 Min.'
        }
    ];

    return (
        <section className="relative bg-[#f5f5f5] lg:pt-20 lg:pb-20 overflow-hidden">

            {/* Desktop Background - Off-white matching mascot image */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[#f5f5f5]"></div>
            </div>

            {/* --- UPDATED MOBILE HERO with OFF-WHITE BACKGROUND --- */}
            <div className="lg:hidden relative min-h-[70vh] flex flex-col text-slate-900 overflow-hidden">
                {/* Off-white Background matching mascot image */}
                <div className="absolute inset-0 bg-[#f5f5f5]"></div>

                {/* Content */}
                <div className="relative z-10 p-6 pb-8 animate-fade-in flex-grow flex flex-col">
                    <div className="flex-grow flex flex-col justify-center">
                        <h1 className="text-[32px] font-black leading-tight tracking-tight mb-2 text-slate-900">
                            Handwerker & Dienstleistungen in der Schweiz – einfach vergleichen
                        </h1>
                        <p className="text-slate-600 mb-6 max-w-xs">
                            Erhalten Sie kostenlos mehrere Offerten von geprüften Fachbetrieben aus Ihrer Region.
                        </p>
                    </div>

                    {/* Mobile Mascot - Peaking in */}
                    <div className="absolute right-[-20px] bottom-[200px] w-48 h-48 pointer-events-none animate-float lg:hidden">
                        <img
                            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/45c6d003-83de-48d7-81d6-f98a7eb703fd/Gemini_Generated_Image_6iuvj6iuvj6iuvj6-removebg-preview-1768829294450.png?width=400&height=400&resize=contain"
                            alt="Ferti Maskottchen"
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    </div>

                    <div>
                        <button
                            onClick={() => openQuoteModal()}
                            className="w-full bg-primary-600 text-white font-black text-base py-3.5 rounded-xl shadow-[0_10px_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 group"
                        >
                            <span>Jetzt kostenlose Offerten erhalten</span>
                            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>

                        <div className="mt-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex text-yellow-400">
                                    <StarIcon className="w-4 h-4" />
                                    <StarIcon className="w-4 h-4" />
                                    <StarIcon className="w-4 h-4" />
                                    <StarIcon className="w-4 h-4" />
                                    <StarIcon className="w-4 h-4" />
                                </div>
                                <p className="text-xs font-medium text-slate-500">
                                    <span className="font-bold text-slate-900">4.9 / 5</span> bei über <span className="font-bold text-slate-900">5'000+</span> Kunden
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Bottom Bar */}
                <div className="relative z-10 mt-auto p-6 w-full">
                    <div className="pt-4 border-t border-slate-200 flex justify-around items-start gap-4 text-center text-xs font-semibold text-slate-600">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl h-6 flex items-center" role="img" aria-label="Geprüfte Qualität">🏅</span>
                            <span className="leading-tight text-slate-900">Geprüfte Firmen</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl h-6 flex items-center" role="img" aria-label="Geld Ersparnis">💰</span>
                            <span className="leading-tight text-slate-900">100% Kostenlos</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <SwissFlagIcon className="w-6 h-6" />
                            <span className="leading-tight text-slate-900">Schweizweit</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* --- DESKTOP HERO DESIGN with Mascot --- */}
            <div className="hidden lg:block max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-6">
                    {/* Left Column - Content */}
                    <div className="relative z-10">
                        <div className="flex justify-start">
                            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/90 backdrop-blur-sm border border-primary-100 text-primary-700 text-xs sm:text-sm font-bold mb-6 tracking-wide uppercase shadow-sm">
                                <SwissFlagIcon className="w-4 h-4 rounded-[1px] shadow-sm" />
                                Nr. 1 Handwerker-Plattform
                            </span>
                        </div>

                        <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1] drop-shadow-sm">
                            Finden Sie den
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400"> perfekten Handwerker</span>
                            <br />für Ihr Projekt
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-700 mb-10 leading-relaxed font-medium">
                            Erhalten Sie kostenlos mehrere Offerten von geprüften Fachbetrieben aus Ihrer Region. Vergleichen Sie Preise und sparen Sie bis zu 30%.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button
                                onClick={() => openQuoteModal()}
                                className="w-full sm:w-auto bg-primary-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:shadow-primary-600/40 flex items-center justify-center gap-3 transform hover:-translate-y-1 text-xl animate-pulse-subtle"
                            >
                                Jetzt kostenlos Offerten erhalten
                                <ArrowRightIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-bold text-slate-700 mb-12">
                            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm">
                                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                <span>Geprüfte Firmen</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm">
                                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                <span>100% Kostenlos</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm">
                                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                <span>Unverbindlich</span>
                            </div>
                        </div>

                        {/* Stats Strip - Desktop */}
                        <div className="border-t border-slate-200/60 pt-10">
                            <div className="flex items-center gap-12 lg:gap-16">
                                <div className="flex flex-col items-start">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-slate-900">2'500</span>
                                        <span className="text-2xl font-bold text-primary-600">+</span>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-600 mt-1">Geprüfte Firmen</span>
                                </div>

                                <div className="w-px bg-slate-200 h-10"></div>

                                <div className="flex flex-col items-start">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-slate-900">50k</span>
                                        <span className="text-2xl font-bold text-primary-600">+</span>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-600 mt-1">Projekte</span>
                                </div>

                                <div className="w-px bg-slate-200 h-10"></div>

                                <div className="flex flex-col items-start">
                                    <div className="flex items-center gap-2">
                                        <span className="text-4xl font-extrabold text-slate-900">4.9</span>
                                        <div className="flex text-yellow-400">
                                            <StarIcon className="w-6 h-6 fill-current" />
                                            <StarIcon className="w-6 h-6 fill-current" />
                                            <StarIcon className="w-6 h-6 fill-current" />
                                            <StarIcon className="w-6 h-6 fill-current" />
                                            <StarIcon className="w-6 h-6 fill-current" />
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-600 mt-1">Kundenbewertung</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Mascot */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative animate-float lg:-mt-32">
                            <img
                                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/45c6d003-83de-48d7-81d6-f98a7eb703fd/Gemini_Generated_Image_6iuvj6iuvj6iuvj6-removebg-preview-1768829294450.png?width=1200&height=1200&resize=contain"
                                alt="Ferti - Ihr Handwerkerportal Maskottchen"
                                className="w-full max-w-lg drop-shadow-2xl transform transition-transform duration-700 hover:scale-105"
                            />
                            {/* Decorative elements */}
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-slate-900/10 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;