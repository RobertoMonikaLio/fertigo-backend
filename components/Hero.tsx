
import React from 'react';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from '../pages/AppContext';
import {
    SwissFlagIcon,
    ArrowRightIcon,
    StarIcon
} from './icons';


const Hero: React.FC = () => {
    const { openQuoteModal } = useAppContext();

    const services = [
        { name: 'Malerarbeiten', icon: '🎨', color: 'bg-orange-100 text-orange-600' },
        { name: 'Umzug', icon: '📦', color: 'bg-blue-100 text-blue-600' },
        { name: 'Reinigung', icon: '✨', color: 'bg-emerald-100 text-emerald-600' },
        { name: 'Elektriker', icon: '⚡', color: 'bg-yellow-100 text-yellow-600' },
        { name: 'Sanitär', icon: '🔧', color: 'bg-cyan-100 text-cyan-600' },
        { name: 'Gartenbau', icon: '🌿', color: 'bg-green-100 text-green-600' },
    ];

    return (
        <section className="relative min-h-[80vh] md:min-h-screen overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-50"></div>
            
            {/* Animated Background Elements (nur ab md sichtbar) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
                <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-200/20 rounded-full blur-3xl"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        {/* Left Column - Text Content */}
                        <div className="text-center lg:text-left">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 border border-emerald-500 mb-8 shadow-lg">
                                <SwissFlagIcon className="w-5 h-5" />
                                <span className="text-white text-sm font-semibold">Nr. 1 Schweizer Handwerker-Plattform</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.1] mb-6">
                                Finden Sie den
                                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
                                    perfekten Handwerker
                                </span>
                            </h1>

                            {/* Subheadline */}
                            <p className="text-lg sm:text-xl text-slate-700 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Erhalten Sie kostenlos mehrere Offerten von geprüften Fachbetrieben aus Ihrer Region. 
                                <span className="text-slate-800 font-semibold"> Sparen Sie bis zu 30%.</span>
                            </p>

                            {/* CTA Button */}
                            <div className="flex justify-center lg:justify-start mb-10">
                                <button
                                    onClick={() => openQuoteModal()}
                                    className="group relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
                                >
                                    <span>Kostenlose Offerten erhalten</span>
                                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl"></div>
                                </button>
                            </div>

                        </div>

                        {/* Right Column - Interactive Cards */}
                        <div className="relative hidden lg:block">
                            {/* Main Card - Service Selection */}
                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 z-10">
                                <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    Beliebt
                                </div>
                                
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Was brauchen Sie?</h3>
                                <p className="text-slate-500 mb-6">Wählen Sie eine Kategorie oder beschreiben Sie Ihr Projekt</p>
                                
                                {/* Service Grid */}
                                <div className="grid grid-cols-3 gap-3">
                                    {services.map((service, i) => (
                                        <button
                                            key={i}
                                            onClick={() => openQuoteModal({ service: service.name })}
                                            className={`${service.color} p-4 rounded-xl text-center hover:scale-105 transition-transform cursor-pointer`}
                                        >
                                            <span className="text-2xl mb-1 block">{service.icon}</span>
                                            <span className="text-xs font-semibold">{service.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Floating Stats Cards */}
                            <div className="absolute -left-8 -top-20 bg-white rounded-2xl p-4 shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">🏆</span>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-slate-900">2'500+</div>
                                        <div className="text-sm text-slate-500">Geprüfte Partner</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-4 -bottom-8 bg-white rounded-2xl p-4 shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="flex text-yellow-400">
                                        <StarIcon className="w-5 h-5" />
                                        <StarIcon className="w-5 h-5" />
                                        <StarIcon className="w-5 h-5" />
                                        <StarIcon className="w-5 h-5" />
                                        <StarIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-black text-slate-900">4.9/5</div>
                                        <div className="text-xs text-slate-500">5'000+ Bewertungen</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Stats Bar */}
                    <div className="mt-12 lg:mt-24 pt-8 border-t border-emerald-200">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">
                            {/* Trust Badges */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-emerald-100 mb-2">
                                    <span className="text-2xl">✅</span>
                                </div>
                                <div className="text-sm font-semibold text-slate-700">Geprüfte Firmen</div>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-emerald-100 mb-2">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <div className="text-sm font-semibold text-slate-700">100% Kostenlos</div>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-emerald-100 mb-2">
                                    <SwissFlagIcon className="w-6 h-6" />
                                </div>
                                <div className="text-sm font-semibold text-slate-700">Schweizweit</div>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-emerald-100 mb-2">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <div className="text-sm font-semibold text-slate-700">Schnelle Antwort</div>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-emerald-100 mb-2">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <div className="text-sm font-semibold text-slate-700">Datenschutz</div>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-emerald-100 mb-2">
                                    <span className="text-2xl">⭐</span>
                                </div>
                                <div className="text-sm font-semibold text-slate-700">Top Bewertungen</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Version */}
            <div className="lg:hidden relative z-10 px-4 pb-8">
                {/* Mobile Service Cards */}
                <div className="relative bg-white rounded-2xl p-6 shadow-xl mb-6 border border-emerald-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Beliebte Services</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {services.slice(0, 6).map((service, i) => (
                            <button
                                key={i}
                                onClick={() => openQuoteModal({ service: service.name })}
                                className={`${service.color} p-3 rounded-xl text-center`}
                            >
                                <span className="text-xl mb-1 block">{service.icon}</span>
                                <span className="text-[10px] font-semibold leading-tight block">{service.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
                </svg>
            </div>
        </section>
    );
};

export default Hero;