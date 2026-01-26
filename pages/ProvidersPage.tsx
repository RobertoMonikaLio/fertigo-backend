import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from './AppContext';

const ProvidersPage: React.FC = () => {
    const { language } = useAppContext();
    const [activeFeature, setActiveFeature] = useState(0);
    
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: stepsRef, inView: stepsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const stats = [
        { value: "2'847", label: "Aktive Anfragen", suffix: "" },
        { value: "12.4", label: "Mio. CHF vermittelt", suffix: "+" },
        { value: "1'523", label: "Partner-Firmen", suffix: "" },
        { value: "94", label: "Zufriedenheit", suffix: "%" },
    ];

    const features = [
        {
            title: "Live-Marktplatz",
            description: "Sehen Sie neue Anfragen in Echtzeit. Filtern Sie nach Region, Branche und Budget – und reagieren Sie als Erster.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
            ),
            preview: (
                <div className="space-y-3">
                    {[
                        { title: "Malerarbeiten 3-Zi Wohnung", location: "8004 Zürich", budget: "CHF 2'400", time: "vor 2 Min" },
                        { title: "Umzug & Möbeltransport", location: "3000 Bern", budget: "CHF 1'800", time: "vor 8 Min" },
                        { title: "Gartenpflege Einfamilienhaus", location: "6000 Luzern", budget: "CHF 950", time: "vor 15 Min" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-slate-900 text-sm truncate">{item.title}</div>
                                <div className="text-xs text-slate-500">{item.location}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-primary-600 text-sm">{item.budget}</div>
                                <div className="text-xs text-slate-400">{item.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        {
            title: "Detaillierte Lead-Infos",
            description: "Alle wichtigen Projektdetails auf einen Blick – bevor Sie einen Lead kaufen. Keine bösen Überraschungen.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            ),
            preview: (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Neu</span>
                            <span className="text-xs text-slate-500">ID: #28471</span>
                        </div>
                        <h4 className="font-bold text-slate-900">Malerarbeiten Wohnung</h4>
                        <p className="text-sm text-slate-500 mt-1">Streichen von 3 Zimmern inkl. Decken</p>
                    </div>
                    <div className="p-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Standort</span>
                            <span className="font-medium text-slate-900">8004 Zürich</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Budget</span>
                            <span className="font-medium text-slate-900">CHF 2'000 - 3'000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Zeitrahmen</span>
                            <span className="font-medium text-slate-900">Nächste 2 Wochen</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Fläche</span>
                            <span className="font-medium text-slate-900">ca. 65 m²</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Status-Management",
            description: "Verfolgen Sie jede Anfrage von 'Neu' bis 'Gewonnen'. Behalten Sie den Überblick über Ihre Pipeline.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
            ),
            preview: (
                <div className="space-y-4">
                    <div className="flex gap-2">
                        {['Neu', 'Kontaktiert', 'Offerte', 'Gewonnen'].map((status, i) => (
                            <div key={status} className={`flex-1 text-center py-2 rounded-lg text-xs font-semibold ${
                                i === 0 ? 'bg-blue-100 text-blue-700' :
                                i === 1 ? 'bg-amber-100 text-amber-700' :
                                i === 2 ? 'bg-purple-100 text-purple-700' :
                                'bg-emerald-100 text-emerald-700'
                            }`}>
                                {status}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="text-2xl font-bold text-slate-900">12</div>
                        <div className="text-2xl font-bold text-slate-900">8</div>
                        <div className="text-2xl font-bold text-slate-900">5</div>
                        <div className="text-2xl font-bold text-emerald-600">3</div>
                    </div>
                    <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div className="h-full flex">
                            <div className="bg-blue-500 w-[43%]"></div>
                            <div className="bg-amber-500 w-[29%]"></div>
                            <div className="bg-purple-500 w-[18%]"></div>
                            <div className="bg-emerald-500 w-[10%]"></div>
                        </div>
                    </div>
                </div>
            )
        },
    ];

    const steps = [
        {
            num: "01",
            title: "Lead prüfen",
            description: "Sehen Sie alle Projektdetails, bevor Sie kaufen. Region, Budget, Anforderungen – transparent und klar.",
            color: "from-blue-500 to-indigo-600",
        },
        {
            num: "02", 
            title: "Kunde kontaktieren",
            description: "Nach dem Kauf erhalten Sie sofort die Kontaktdaten. Rufen Sie an, senden Sie eine E-Mail oder eine Nachricht.",
            color: "from-violet-500 to-purple-600",
        },
        {
            num: "03",
            title: "Auftrag gewinnen",
            description: "Überzeugen Sie mit Ihrem Angebot und Ihrer Expertise. Der Auftrag gehört Ihnen – ohne Provision.",
            color: "from-emerald-500 to-teal-600",
        },
    ];

    return (
        <div className="bg-white">
            
            {/* Hero Section - Split Design */}
            <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
                {/* Left Side - Dark */}
                <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/30 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500/30 rounded-full blur-[100px]" />
                    </div>
                </div>
                
                {/* Right Side - Light (Desktop) */}
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-slate-50 to-white hidden lg:block" />

                <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10 py-20 lg:py-0">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        {/* Left Content */}
                        <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/10 mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                </span>
                                <span className="text-emerald-400 text-sm font-medium">2'847 aktive Anfragen</span>
                            </div>
                            
                            {/* Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
                                Der schnellste Weg zu
                                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-emerald-400 to-primary-400">
                                    neuen Aufträgen
                                </span>
                            </h1>
                            
                            {/* Description */}
                            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-md">
                                Verbinden Sie sich mit Kunden in Ihrer Region. Keine monatlichen Gebühren, keine Provision – nur echte Aufträge.
                            </p>
                            
                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <Link
                                    to="/register"
                                    className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all"
                                >
                                    Kostenlos registrieren
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/partner/pricing"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-4 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/5 transition-all"
                                >
                                    Preise ansehen
                                </Link>
                            </div>
                            
                            {/* Stats Row */}
                            <div className="flex items-center gap-8">
                                {[
                                    { value: "12.5k+", label: "Partner" },
                                    { value: "847", label: "Täglich neu" },
                                    { value: "98%", label: "Zufrieden" },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-2xl font-black text-white">{stat.value}</div>
                                        <div className="text-slate-500 text-sm">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Content - Cards Stack */}
                        <div className={`relative transition-all duration-1000 delay-300 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                            
                            {/* Main Card */}
                            <div className="bg-white rounded-3xl shadow-2xl p-6 relative z-20">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">Live Anfragen</div>
                                            <div className="text-slate-500 text-xs">Aktualisiert vor 2 Sek.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-emerald-700 text-xs font-semibold">Live</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    {[
                                        { title: "Badezimmer Renovation", loc: "8004 Zürich", budget: "CHF 8'500", time: "Gerade eben", color: "bg-blue-500" },
                                        { title: "Malerarbeiten 4-Zi", loc: "3012 Bern", budget: "CHF 3'200", time: "vor 3 Min", color: "bg-amber-500" },
                                        { title: "Küche montieren", loc: "4051 Basel", budget: "CHF 2'800", time: "vor 8 Min", color: "bg-violet-500" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group">
                                            <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                                                {item.title.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-slate-900 truncate">{item.title}</div>
                                                <div className="text-slate-500 text-sm">{item.loc} • {item.time}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-slate-900">{item.budget}</div>
                                                <button className="text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Details →
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-slate-500 text-sm">+24 weitere in Ihrer Region</span>
                                    <Link to="/partner/marketplace" className="text-primary-600 font-semibold text-sm hover:text-primary-700">
                                        Alle ansehen →
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Background Cards */}
                            <div className="absolute top-4 -right-4 w-full h-full bg-slate-200 rounded-3xl -z-10 transform rotate-2" />
                            <div className="absolute top-8 -right-8 w-full h-full bg-slate-300 rounded-3xl -z-20 transform rotate-4" />
                            
                            {/* Floating Elements */}
                            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 z-30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">Keine Gebühren</div>
                                        <div className="text-slate-500 text-xs">Nur zahlen was Sie nutzen</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 z-30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">Sofort starten</div>
                                        <div className="text-slate-500 text-xs">In unter 2 Minuten</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Features Section - Dashboard Design */}
            <section ref={featuresRef} className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                    
                    {/* Header */}
                    <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Ihr Dashboard für Erfolg
                        </h2>
                        <p className="text-xl text-slate-500 leading-relaxed">
                            Ein leistungsstarkes Control Center, das Ihnen hilft, Anfragen zu finden, 
                            Kunden zu kontaktieren und Ihr Geschäft zu skalieren.
                        </p>
                    </div>

                    {/* Main Content - Two Columns */}
                    <div className={`grid lg:grid-cols-2 gap-12 items-start transition-all duration-700 delay-200 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        
                        {/* Left Column - Why Our Dashboard */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-8">Warum unser Dashboard?</h3>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Intelligente Lead-Filterung",
                                        desc: "Filtern Sie Anfragen nach Region, Budget, Dienstleistungsart und Dringlichkeit.",
                                        icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
                                        color: "bg-blue-100 text-blue-600"
                                    },
                                    {
                                        title: "Vollständige Kundendetails",
                                        desc: "Alle wichtigen Informationen auf einen Blick – bevor Sie kaufen.",
                                        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                                        color: "bg-emerald-100 text-emerald-600"
                                    },
                                    {
                                        title: "Performance-Tracking",
                                        desc: "Verfolgen Sie Erfolgsquote, Umsatz und ROI in Echtzeit.",
                                        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                                        color: "bg-violet-100 text-violet-600"
                                    },
                                    {
                                        title: "Multi-Channel Kontakt",
                                        desc: "Kontaktieren Sie Kunden per Telefon, E-Mail oder Chat.",
                                        icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                                        color: "bg-amber-100 text-amber-600"
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Trust Badge */}
                            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200 mt-8">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-bold text-emerald-800 text-sm">Schweizer Datenschutz</div>
                                    <div className="text-emerald-600 text-xs">DSGVO-konform</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Dashboard Illustration */}
                        <div className="relative">
                            <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
                                
                                {/* Dashboard Header */}
                                <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </div>
                                        <span className="text-white font-semibold text-sm">Dashboard</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                                </svg>
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">3</div>
                                        </div>
                                        <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center text-white text-[10px] font-bold">MS</div>
                                    </div>
                                </div>

                                {/* Dashboard Content */}
                                <div className="p-4 space-y-4">
                                    
                                    {/* Stats Row */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { label: "Neue Leads", value: "24", icon: "📋", color: "from-blue-500/20 to-blue-600/10" },
                                            { label: "Erfolgsquote", value: "67%", icon: "📈", color: "from-emerald-500/20 to-emerald-600/10" },
                                            { label: "Umsatz", value: "12.4k", icon: "💰", color: "from-amber-500/20 to-amber-600/10" },
                                        ].map((stat, i) => (
                                            <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-xl p-3 border border-white/5`}>
                                                <div className="text-lg mb-1">{stat.icon}</div>
                                                <div className="text-white text-lg font-bold">{stat.value}</div>
                                                <div className="text-slate-500 text-[10px]">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Lead List */}
                                    <div className="bg-slate-800/50 rounded-xl p-3">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-white text-xs font-semibold">Aktuelle Anfragen</span>
                                            <div className="flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                                <span className="text-emerald-400 text-[10px]">Live</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {[
                                                { title: "Malerarbeiten", loc: "Zürich", price: "45", hot: true },
                                                { title: "Reinigung 3.5 Zi", loc: "Bern", price: "35", hot: true },
                                                { title: "Umzug lokal", loc: "Basel", price: "40", hot: false },
                                            ].map((lead, i) => (
                                                <div key={i} className="flex items-center gap-2 p-2 bg-slate-900/50 rounded-lg">
                                                    <div className="w-7 h-7 rounded-md bg-primary-500/20 flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-white text-[11px] font-medium truncate">{lead.title}</span>
                                                            {lead.hot && <span className="px-1 py-0.5 bg-orange-500/20 text-orange-400 text-[8px] font-bold rounded">HOT</span>}
                                                        </div>
                                                        <div className="text-slate-500 text-[9px]">{lead.loc}</div>
                                                    </div>
                                                    <div className="px-2 py-1 bg-primary-500 text-white text-[9px] font-bold rounded-md">
                                                        CHF {lead.price}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Chart */}
                                    <div className="bg-slate-800/50 rounded-xl p-3">
                                        <span className="text-white text-xs font-semibold">Performance</span>
                                        <div className="flex items-end gap-1 h-16 mt-2">
                                            {[35, 52, 41, 68, 45, 72, 58].map((h, i) => (
                                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                                    <div 
                                                        className={`w-full rounded-sm ${i === 5 ? 'bg-primary-500' : 'bg-slate-700'}`} 
                                                        style={{ height: `${h}%` }} 
                                                    />
                                                    <span className="text-[8px] text-slate-600">{['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][i]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-xs font-bold text-slate-900">Live-Updates</span>
                            </div>
                        </div>
                    </div>

                    {/* Feature List Below */}
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-16 border-t border-slate-200 transition-all duration-700 delay-400 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {[
                            { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", title: "Live-Marktplatz", desc: "Echtzeit-Anfragen" },
                            { icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", title: "Push-Alerts", desc: "Sofort informiert" },
                            { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", title: "Direktkontakt", desc: "Tel, Mail & Chat" },
                            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "100% Sicher", desc: "SSL-verschlüsselt" },
                        ].map((feature, i) => (
                            <div key={i} className="text-center">
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-7 h-7 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                                    </svg>
                                </div>
                                <div className="font-bold text-slate-900 mb-1">{feature.title}</div>
                                <div className="text-slate-500 text-sm">{feature.desc}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* How It Works - Immersive Design */}
            <section ref={stepsRef} className="relative overflow-hidden">
                
                {/* Step 1 */}
                <div className={`relative bg-gradient-to-br from-emerald-50 to-emerald-100 transition-all duration-700 ${stepsInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
                    <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-20 lg:py-32">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className={`transition-all duration-700 delay-200 ${stepsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium mb-6">
                                    <span className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center font-black">1</span>
                                    Schritt eins
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                                    Lead prüfen & kaufen
                                </h2>
                                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                    Durchstöbern Sie den Live-Marktplatz und finden Sie Anfragen, die zu Ihrem Angebot passen. Alle Details sind transparent – Sie entscheiden, welche Leads Sie kaufen.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {['Echtzeit-Updates', 'Regionen-Filter', 'Faire Preise'].map((tag) => (
                                        <span key={tag} className="px-4 py-2 bg-emerald-200/50 rounded-full text-emerald-800 text-sm font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className={`transition-all duration-700 delay-400 ${stepsInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                                <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100">
                                    <div className="space-y-4">
                                        {[
                                            { title: "Malerarbeiten 4-Zi", loc: "8004 Zürich", price: "CHF 45", budget: "2'400" },
                                            { title: "Umzug lokal", loc: "3000 Bern", price: "CHF 35", budget: "1'800" },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-slate-900">{item.title}</div>
                                                    <div className="text-sm text-slate-500">{item.loc} • Budget: CHF {item.budget}</div>
                                                </div>
                                                <button className="px-4 py-2 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors">
                                                    {item.price}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Wave Divider */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f1f5f9"/>
                        </svg>
                    </div>
                </div>

                {/* Step 2 */}
                <div className={`relative bg-gradient-to-br from-slate-100 to-slate-200 transition-all duration-700 delay-200 ${stepsInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-20 lg:py-32">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className={`order-2 lg:order-1 transition-all duration-700 delay-400 ${stepsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
                                    <div className="bg-white rounded-2xl overflow-hidden">
                                        <div className="p-5 border-b border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">👤</div>
                                                <div>
                                                    <div className="font-bold text-slate-900">Anna Müller</div>
                                                    <div className="text-sm text-slate-500">Zürich • Verifiziert</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 space-y-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span className="text-slate-700">+41 79 *** ** **</span>
                                                <span className="text-emerald-600 text-xs font-medium">Sichtbar nach Kauf</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-slate-700">anna.m***@gmail.com</span>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-emerald-50">
                                            <button className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                Jetzt anrufen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${stepsInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700 text-white text-sm font-medium mb-6">
                                    <span className="w-8 h-8 rounded-full bg-white text-slate-700 flex items-center justify-center font-black">2</span>
                                    Schritt zwei
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                                    Direkt Kontakt aufnehmen
                                </h2>
                                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                    Nach dem Kauf erhalten Sie sofort alle Kontaktdaten. Rufen Sie an, schreiben Sie eine E-Mail oder senden Sie eine Nachricht – der erste Eindruck zählt!
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {['Sofortiger Zugang', 'Telefon & E-Mail', 'Keine Wartezeit'].map((tag) => (
                                        <span key={tag} className="px-4 py-2 bg-slate-300/50 rounded-full text-slate-700 text-sm font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Wave Divider */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ecfdf5"/>
                        </svg>
                    </div>
                </div>

                {/* Step 3 */}
                <div className={`relative bg-gradient-to-br from-emerald-50 to-emerald-100 transition-all duration-700 delay-400 ${stepsInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-20 lg:py-32">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className={`transition-all duration-700 delay-600 ${stepsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium mb-6">
                                    <span className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center font-black">3</span>
                                    Schritt drei
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                                    Auftrag gewinnen
                                </h2>
                                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                    Überzeugen Sie mit Ihrer Expertise und einem fairen Angebot. Gewinnen Sie den Auftrag – und behalten Sie 100% des Gewinns. Keine Provision, keine versteckten Kosten.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {['Keine Provision', '100% Ihr Gewinn', 'Unbegrenzt'].map((tag) => (
                                        <span key={tag} className="px-4 py-2 bg-emerald-200/50 rounded-full text-emerald-800 text-sm font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center gap-3 mt-10 px-8 py-4 bg-emerald-600 text-white font-bold text-lg rounded-2xl hover:bg-emerald-700 transition-all shadow-xl"
                                >
                                    Jetzt Partner werden
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                            <div className={`transition-all duration-700 delay-800 ${stepsInView ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-12 rotate-6'}`}>
                                <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100">
                                    <div className="bg-white rounded-2xl p-6 text-center">
                                        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                                            <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-2xl font-black text-slate-900 mb-2">Auftrag gewonnen!</div>
                                        <div className="text-slate-500 mb-6">Malerarbeiten 4-Zimmer Wohnung</div>
                                        <div className="bg-emerald-50 rounded-xl p-4">
                                            <div className="text-sm text-emerald-600 font-medium mb-1">Auftragswert</div>
                                            <div className="text-4xl font-black text-emerald-700">CHF 2'400</div>
                                            <div className="text-sm text-emerald-600 mt-1">100% Ihr Gewinn</div>
                                        </div>
                                        <div className="flex items-center justify-center gap-1 mt-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="text-sm text-slate-500 ml-2">Kunde zufrieden</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                    
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Über 12'500 zufriedene Partner
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                            Das sagen unsere Partner
                        </h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            Erfahren Sie, wie andere Handwerker mit uns erfolgreich neue Kunden gewinnen
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                quote: "Seit ich bei FertigLosFragen bin, habe ich meinen Umsatz um 40% gesteigert. Die Anfragen sind qualitativ hochwertig und die Kunden sind ernsthaft interessiert.",
                                name: "Marco Brunner",
                                role: "Malermeister",
                                location: "Zürich",
                                rating: 5,
                                image: "MB"
                            },
                            {
                                quote: "Endlich eine Plattform ohne versteckte Kosten! Ich zahle nur für die Leads, die ich wirklich haben möchte. Das ist fair und transparent.",
                                name: "Sarah Keller",
                                role: "Reinigungsunternehmen",
                                location: "Bern",
                                rating: 5,
                                image: "SK"
                            },
                            {
                                quote: "Die App ist super einfach zu bedienen. Ich bekomme sofort eine Benachrichtigung, wenn eine neue Anfrage in meiner Region reinkommt.",
                                name: "Thomas Müller",
                                role: "Elektriker",
                                location: "Basel",
                                rating: 5,
                                image: "TM"
                            },
                        ].map((testimonial, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                
                                {/* Quote */}
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    "{testimonial.quote}"
                                </p>
                                
                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold">
                                        {testimonial.image}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">{testimonial.name}</div>
                                        <div className="text-slate-500 text-sm">{testimonial.role} • {testimonial.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                        {[
                            { value: "4.8/5", label: "Durchschnittliche Bewertung" },
                            { value: "98%", label: "Weiterempfehlungsrate" },
                            { value: "2.4 Mio", label: "Vermittelte Aufträge" },
                            { value: "< 24h", label: "Ø Zeit bis zum ersten Lead" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                                <div className="text-slate-500 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section ref={ctaRef} className="py-24 bg-slate-900 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
                    <div className={`text-center transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Bereit für neue Aufträge?
                        </h2>
                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                            Registrieren Sie sich jetzt kostenlos und erhalten Sie sofort Zugang zu hunderten von Kundenanfragen.
                        </p>
                        
                        <Link
                            to="/register"
                            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-slate-900 font-bold text-lg rounded-2xl hover:bg-slate-100 transition-all hover:shadow-2xl hover:shadow-white/20"
                        >
                            Jetzt kostenlos registrieren
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        
                        <p className="mt-6 text-slate-500 text-sm">
                            Keine Kreditkarte erforderlich • Keine monatlichen Gebühren • Jederzeit kündbar
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ProvidersPage;
