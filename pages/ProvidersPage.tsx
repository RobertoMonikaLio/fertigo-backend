import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon, SwissFlagIcon } from '../components/icons';

export const providersData: Array<{ id: string; location: string; [key: string]: any }> = [];

const ProvidersPage: React.FC = () => {
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: stepsRef, inView: stepsInView } = useInView({ triggerOnce: true, threshold: 0.05 });
    const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const benefits = [
        { title: "Alles auf einen Blick", desc: "Anfragen, Status und Kennzahlen an einem Ort.", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
        { title: "Keine Zettelwirtschaft", desc: "Kontakte und Notizen digital – immer aktuell.", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
        { title: "Echte Zahlen", desc: "Keine Schätzungen – nur reale Daten aus dem Markt.", icon: "M3 13v-4a2 2 0 012-2h14a2 2 0 012 2v4M3 13h18M3 13l2-8h14l2 8M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" },
        { title: "Immer aktuell", desc: "Live-Updates bei neuen Anfragen in Ihrer Region.", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
    ];

    const steps = [
        { step: 1, number: "1", icon: "🔍", title: "Lead prüfen & kaufen", desc: "Live-Marktplatz durchstöbern, passende Anfragen wählen. Alle Details sichtbar – Sie entscheiden.", features: ["Live-Marktplatz", "Alle Details sichtbar", "Sie entscheiden"], gradient: "from-green-500 to-emerald-500", bgGradient: "from-green-50 to-emerald-50", swissValue: "Fair & transparent" },
        { step: 2, number: "2", icon: "📞", title: "Direkt Kontakt aufnehmen", desc: "Nach dem Kauf sofort alle Kontaktdaten. Anrufen oder schreiben – der erste Eindruck zählt.", features: ["Sofort Kontaktdaten", "Anrufen oder schreiben", "Erster Eindruck zählt"], gradient: "from-emerald-500 to-teal-500", bgGradient: "from-emerald-50 to-teal-50", swissValue: "Direkt zum Kunden" },
        { step: 3, number: "3", icon: "✅", title: "Auftrag gewinnen", desc: "Überzeugen Sie mit Ihrer Expertise. 100% Ihr Gewinn – keine Provision, keine versteckten Kosten.", features: ["100% Ihr Gewinn", "Keine Provision", "Keine versteckten Kosten"], gradient: "from-teal-500 to-cyan-500", bgGradient: "from-teal-50 to-cyan-50", swissValue: "Schweizer Qualität" },
    ];

    const testimonials = [
        { quote: "Seit ich dabei bin, habe ich meinen Umsatz um 40% gesteigert. Die Anfragen sind qualitativ hochwertig – die Kunden sind ernsthaft interessiert.", name: "Marco Brunner", role: "Malermeister", location: "Zürich", initials: "MB" },
        { quote: "Endlich eine Plattform ohne versteckte Kosten! Ich zahle nur für die Leads, die ich haben möchte. Fair und transparent.", name: "Sarah Keller", role: "Reinigungsunternehmen", location: "Bern", initials: "SK" },
        { quote: "Die App ist einfach zu bedienen. Sofort eine Benachrichtigung, wenn eine neue Anfrage in meiner Region reinkommt.", name: "Thomas Müller", role: "Elektriker", location: "Basel", initials: "TM" },
    ];

    return (
        <div className="mx-auto overflow-hidden">
            {/* Hero – Zwei-Spalten: Text links, Illustration rechts */}
            <section ref={heroRef} className="relative overflow-hidden bg-green-50">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 max-w-2xl bg-gradient-to-l from-green-100/60 to-transparent pointer-events-none" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:pt-40 lg:pb-36 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
                        {/* Linke Spalte: Text */}
                        <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight mb-5 -mt-12">
                                Mehr Aufträge aus{' '}
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700">Ihrer Region<svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradient5)" strokeWidth="4" strokeLinecap="round"/><defs><linearGradient id="underlineGradient5" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#16a34a"/><stop offset="50%" stopColor="#10b981"/><stop offset="100%" stopColor="#14b8a6"/></linearGradient></defs></svg></span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                Fair, transparent, ohne Abo. Nur Leads kaufen, die zu Ihrem Betrieb passen – Schweizer Datenschutz, DSGVO-konform.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">🚫 Kein Abo</span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">📍 Ihre Region</span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">💰 Faire Preise</span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">⚡ Sofort Leads</span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">✅ Geprüfte Anfragen</span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-800 text-sm font-medium"><SwissFlagIcon className="w-4 h-4 text-green-600" /> Schweizer Datenschutz</span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <Link
                                    to="/register"
                                    className="group inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
                                >
                                    Kostenlos Partner werden
                                    <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Rechte Spalte: SVG-Illustration */}
                        <div className={`hidden lg:flex items-center justify-center transition-all duration-1000 delay-300 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <svg viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md h-auto">
                                {/* Hintergrund */}
                                <rect x="20" y="20" width="360" height="380" rx="30" fill="#f8fafc" />
                                
                                {/* Dashboard Card */}
                                <g transform="translate(40, 40)">
                                    <rect width="320" height="340" rx="24" fill="white" stroke="#e2e8f0" strokeWidth="2" />
                                    
                                    {/* Header */}
                                    <rect x="0" y="0" width="320" height="70" rx="24" fill="url(#dashGradient)" />
                                    <rect x="0" y="40" width="320" height="30" fill="url(#dashGradient)" />
                                    <text x="25" y="35" fill="white" fontSize="14" fontWeight="700">Partner Dashboard</text>
                                    <text x="25" y="52" fill="white" fontSize="10" opacity="0.8">Willkommen zurück!</text>
                                    
                                    {/* Notification Bell */}
                                    <g transform="translate(275, 25)">
                                        <circle cx="12" cy="12" r="16" fill="white" opacity="0.2" />
                                        <text x="12" y="17" textAnchor="middle" fontSize="14">🔔</text>
                                        <circle cx="20" cy="6" r="6" fill="#ef4444" />
                                        <text x="20" y="9" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">3</text>
                                    </g>
                                    
                                    {/* Stats Cards Row */}
                                    <g transform="translate(20, 85)">
                                        {/* Neue Leads */}
                                        <rect width="130" height="70" rx="12" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
                                        <text x="15" y="25" fill="#64748b" fontSize="9">Neue Leads</text>
                                        <text x="15" y="50" fill="#22c55e" fontSize="24" fontWeight="800">12</text>
                                        <text x="55" y="50" fill="#22c55e" fontSize="10">+3 heute</text>
                                        <circle cx="110" cy="35" r="18" fill="#dcfce7" />
                                        <text x="110" y="40" textAnchor="middle" fontSize="16">📩</text>
                                        
                                        {/* Umsatz */}
                                        <g transform="translate(150, 0)">
                                            <rect width="130" height="70" rx="12" fill="#fefce8" stroke="#fef08a" strokeWidth="1" />
                                            <text x="15" y="25" fill="#64748b" fontSize="9">Umsatz Monat</text>
                                            <text x="15" y="50" fill="#ca8a04" fontSize="20" fontWeight="800">8'450</text>
                                            <text x="80" y="50" fill="#ca8a04" fontSize="10">CHF</text>
                                            <circle cx="110" cy="35" r="18" fill="#fef9c3" />
                                            <text x="110" y="40" textAnchor="middle" fontSize="16">💰</text>
                                        </g>
                                    </g>
                                    
                                    {/* Chart Area */}
                                    <g transform="translate(20, 170)">
                                        <text x="0" y="0" fill="#1e293b" fontSize="11" fontWeight="700">Aufträge letzte 7 Tage</text>
                                        
                                        {/* Mini Bar Chart */}
                                        <g transform="translate(0, 15)">
                                            <rect x="0" y="40" width="30" height="25" rx="4" fill="#dcfce7" />
                                            <rect x="40" y="30" width="30" height="35" rx="4" fill="#bbf7d0" />
                                            <rect x="80" y="20" width="30" height="45" rx="4" fill="#86efac" />
                                            <rect x="120" y="35" width="30" height="30" rx="4" fill="#bbf7d0" />
                                            <rect x="160" y="10" width="30" height="55" rx="4" fill="#22c55e" />
                                            <rect x="200" y="25" width="30" height="40" rx="4" fill="#86efac" />
                                            <rect x="240" y="5" width="30" height="60" rx="4" fill="url(#barGrad)" />
                                            
                                            {/* X-Axis Labels */}
                                            <text x="15" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Mo</text>
                                            <text x="55" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Di</text>
                                            <text x="95" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Mi</text>
                                            <text x="135" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Do</text>
                                            <text x="175" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Fr</text>
                                            <text x="215" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">Sa</text>
                                            <text x="255" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">So</text>
                                        </g>
                                    </g>
                                    
                                    {/* Recent Lead Card */}
                                    <g transform="translate(20, 275)">
                                        <rect width="280" height="50" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                                        <circle cx="30" cy="25" r="18" fill="#dbeafe" />
                                        <text x="30" y="30" textAnchor="middle" fontSize="16">👤</text>
                                        <text x="58" y="20" fill="#1e293b" fontSize="10" fontWeight="600">Neuer Lead: Malerarbeiten</text>
                                        <text x="58" y="35" fill="#64748b" fontSize="9">Zürich • vor 5 Min</text>
                                        <rect x="220" y="15" width="50" height="22" rx="6" fill="#22c55e" />
                                        <text x="245" y="30" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Öffnen</text>
                                    </g>
                                </g>
                                
                                {/* Floating Notification */}
                                <g transform="translate(300, 100)">
                                    <rect width="90" height="55" rx="12" fill="white" stroke="#22c55e" strokeWidth="2" />
                                    <circle cx="25" cy="27" r="15" fill="#dcfce7" />
                                    <text x="25" y="32" textAnchor="middle" fontSize="14">✅</text>
                                    <text x="60" y="22" textAnchor="middle" fill="#1e293b" fontSize="9" fontWeight="600">Lead</text>
                                    <text x="60" y="35" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="700">+1 neu</text>
                                    <animate attributeName="transform" values="translate(300, 100);translate(300, 90);translate(300, 100)" dur="2s" repeatCount="indefinite" />
                                </g>
                                
                                <defs>
                                    <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#22c55e" />
                                        <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                    <linearGradient id="barGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                                        <stop offset="0%" stopColor="#22c55e" />
                                        <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* So funktioniert's – wie Home „In 3 Schritten“ (RadialJourney-Stil) */}
            <section ref={stepsRef} className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-white border-t border-slate-200">
                {/* Hintergrund wie RadialJourney */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.05),transparent_50%)]" />
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]" />
                    <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,transparent_48%,rgba(34,197,94,1)_49%,rgba(34,197,94,1)_51%,transparent_52%),linear-gradient(-45deg,transparent_48%,rgba(34,197,94,1)_49%,rgba(34,197,94,1)_51%,transparent_52%)] bg-[length:80px_80px]" aria-hidden />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
                    {/* Header wie RadialJourney */}
                    <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            So funktioniert's –{' '}
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                                in 3 Schritten
                                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                                    <path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradient3)" strokeWidth="4" strokeLinecap="round"/>
                                    <defs>
                                        <linearGradient id="underlineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#16a34a"/>
                                            <stop offset="50%" stopColor="#10b981"/>
                                            <stop offset="100%" stopColor="#14b8a6"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h2>
                        <p className="text-base lg:text-lg text-slate-600 mx-auto">
                            Mehr Aufträge aus Ihrer Region – fair, transparent und ohne Abo
                        </p>
                    </div>

                    {/* Schritte – Karten wie RadialJourney mit Verbindungspfeilen */}
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                        {steps.map((item, index) => (
                            <div
                                key={item.step}
                                className={`relative transition-all duration-1000 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="relative h-full bg-white rounded-3xl p-6 lg:p-8 border-2 border-green-200 shadow-xl hover:shadow-2xl hover:border-green-300 transition-all duration-300 group">
                                    {/* Icon oben */}
                                    <div className="text-center mb-6">
                                        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl bg-gradient-to-br ${item.bgGradient} border-2 border-green-200 transition-all duration-300 group-hover:scale-105`}>
                                            {item.icon}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl lg:text-2xl font-black text-slate-900 text-center group-hover:text-green-700 transition-colors duration-300">
                                            {item.title}
                                        </h3>

                                        <div className="flex justify-center">
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.bgGradient} border border-green-200 text-xs font-bold text-green-700`}>
                                                <SwissFlagIcon className="w-3.5 h-3.5" />
                                                {item.swissValue}
                                            </div>
                                        </div>

                                        <p className="text-slate-600 leading-relaxed text-sm lg:text-base text-center">
                                            {item.desc}
                                        </p>

                                        <div className="space-y-2 pt-4 border-t border-green-100">
                                            {item.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <div className={`flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center bg-gradient-to-br ${item.bgGradient} border border-green-200`}>
                                                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-600">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} rounded-b-3xl`} aria-hidden />
                                </div>

                                {/* Verbindungspfeil zwischen Karten (Desktop) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-6 transform -translate-y-1/2 z-20">
                                        <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center text-green-600 shadow-lg">
                                            <ArrowRightIcon className="w-5 h-5" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Für Sie als Partner – wie „Warum Fertigo?“ auf ServicesPage */}
            <section ref={benefitsRef} className={`py-20 sm:py-28 bg-slate-50 transition-all duration-700 ${benefitsInView ? 'opacity-100' : 'opacity-0'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    
                    {/* Centered Header */}
                    <div className={`text-center mb-16 transition-all duration-1000 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            Vorher vs. <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">Nachher<svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradient4)" strokeWidth="4" strokeLinecap="round"/><defs><linearGradient id="underlineGradient4" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#16a34a"/><stop offset="50%" stopColor="#10b981"/><stop offset="100%" stopColor="#14b8a6"/></linearGradient></defs></svg></span>
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Sehen Sie den Unterschied, den Fertigo für Ihr Geschäft macht
                        </p>
                    </div>

                    {/* Comparison Cards */}
                    <div className={`grid md:grid-cols-2 gap-6 lg:gap-8 transition-all duration-1000 delay-200 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        
                        {/* OHNE Fertigo */}
                        <div className="relative bg-white rounded-3xl p-8 border-2 border-slate-200 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                                    <span className="text-slate-500 text-xl">✗</span>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ohne</span>
                                    <h3 className="text-xl font-black text-slate-400">Fertigo</h3>
                                </div>
                            </div>
                            
                            {/* Pain Points */}
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-red-500">📉</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-700">Unregelmässige Aufträge</div>
                                        <div className="text-slate-500 text-sm">Abhängig von Mundpropaganda</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-red-500">⏰</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-700">Zeitaufwändige Akquise</div>
                                        <div className="text-slate-500 text-sm">Stunden für Kundensuche</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-red-500">📋</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-700">Papierchaos</div>
                                        <div className="text-slate-500 text-sm">Manuelle Verwaltung</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-red-500">❓</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-700">Keine Planbarkeit</div>
                                        <div className="text-slate-500 text-sm">Unsichere Auftragslage</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Diagonal Stripe */}
                            <div className="absolute top-4 right-4 px-3 py-1 bg-slate-200 text-slate-500 text-xs font-bold rounded-full">
                                Status Quo
                            </div>
                        </div>

                        {/* MIT Fertigo */}
                        <div className="relative bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 text-white overflow-hidden shadow-2xl shadow-green-600/30">
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            
                            {/* Header */}
                            <div className="relative flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                    <span className="text-green-600 text-xl">✓</span>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-green-200 uppercase tracking-wider">Mit</span>
                                    <h3 className="text-xl font-black text-white">Fertigo</h3>
                                </div>
                            </div>
                            
                            {/* Benefits */}
                            <div className="relative space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span>📈</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">+40% mehr Aufträge</div>
                                        <div className="text-green-200 text-sm">Kontinuierlicher Lead-Flow</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span>⚡</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">Sofortige Leads</div>
                                        <div className="text-green-200 text-sm">In unter 5 Minuten</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span>📱</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">100% Digital</div>
                                        <div className="text-green-200 text-sm">Alles in einer App</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span>📊</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">Volle Kontrolle</div>
                                        <div className="text-green-200 text-sm">Echtzeit-Dashboard 24/7</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Recommended Badge */}
                            <div className="absolute top-4 right-4 px-3 py-1 bg-white text-green-700 text-xs font-black rounded-full shadow-lg">
                                Empfohlen ⭐
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats */}
                    <div className={`mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-400 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-white rounded-2xl p-5 text-center border border-slate-200">
                            <div className="text-3xl font-black text-slate-900">2'500+</div>
                            <div className="text-slate-500 text-sm">Partner schweizweit</div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 text-center border border-slate-200">
                            <div className="text-3xl font-black text-slate-900">4.9 ⭐</div>
                            <div className="text-slate-500 text-sm">Bewertung</div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 text-center border border-slate-200">
                            <div className="text-3xl font-black text-green-600">&lt;24h</div>
                            <div className="text-slate-500 text-sm">Erster Lead</div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 text-center border border-slate-200 flex items-center justify-center gap-2">
                            <SwissFlagIcon className="w-6 h-6" />
                            <span className="font-bold text-slate-700">Swiss Made</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials – 3 Karten gleich, eine Zeile Stats darunter */}
            <section ref={testimonialsRef} className="relative py-16 lg:py-24 overflow-hidden bg-white border-t border-slate-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-2">
                            Das sagen unsere Partner
                        </h2>
                        <p className="text-slate-600">Handwerker und Dienstleister aus der ganzen Schweiz.</p>
                    </div>
                    <div className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {testimonials.map((t, i) => (
                            <div key={i} className="rounded-2xl border-2 border-slate-200 bg-green-50/30 p-6 hover:border-green-200 transition-all">
                                <p className="text-slate-600 leading-relaxed mb-5 text-sm">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">{t.initials}</div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                                        <div className="text-slate-500 text-xs">{t.role} · {t.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
                        <span><strong className="text-slate-700">4.8/5</strong> Bewertung</span>
                        <span><strong className="text-slate-700">98%</strong> Weiterempfehlung</span>
                        <span><strong className="text-slate-700">&lt; 24h</strong> Erster Lead</span>
                    </div>
                </div>
            </section>

            {/* CTA – dunkler Block */}
            <section ref={ctaRef} className="relative py-16 lg:py-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
                    <div className={`text-center transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-600 mb-6">
                            <SwissFlagIcon className="w-4 h-4 text-green-400" />
                            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Kostenlos starten</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
                            Bereit für neue Aufträge aus Ihrer Region?
                        </h2>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                            Registrieren Sie sich kostenlos – sofort Zugang zu Kundenanfragen. Keine Kreditkarte, keine monatlichen Gebühren.
                        </p>
                        <Link
                            to="/register"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-xl hover:bg-green-400 transition-colors shadow-lg shadow-green-500/30"
                        >
                            Jetzt kostenlos registrieren
                            <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <p className="mt-6 text-slate-500 text-sm">
                            Keine Kreditkarte · Keine monatlichen Gebühren · Jederzeit kündbar
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProvidersPage;
