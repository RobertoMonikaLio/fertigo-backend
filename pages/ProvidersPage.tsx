import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon, SwissFlagIcon } from '../components/icons';

const ProvidersPage: React.FC = () => {
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: stepsRef, inView: stepsInView } = useInView({ triggerOnce: true, threshold: 0.05 });
    const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: categoriesRef, inView: categoriesInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: dashboardRef, inView: dashboardInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [openFaq, setOpenFaq] = React.useState<number | null>(null);

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


    return (
        <div className="mx-auto overflow-hidden">
            {/* ══════════ HERO - MATCHING HOMEPAGE STYLE ══════════ */}
            <section ref={heroRef} className="relative overflow-hidden bg-[#0a0f1a]">
                {/* ══════════ HINTERGRUND (wie Homepage) ══════════ */}
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

                {/* ══════════ BILD: Rechte Hälfte (nur Desktop) ══════════ */}
                <div className={`hidden lg:block absolute top-0 bottom-0 right-0 w-1/2 z-[1] transition-opacity duration-[1500ms] delay-200 ${heroInView ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Gradient-Overlays */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/50 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a0f1a]/80 via-transparent to-[#0a0f1a]/40 pointer-events-none" />
                    
                    {/* Dashboard Preview Image */}
                    <img
                        src="/assets/provider_dashboard_illustration_1766521172052.png"
                        alt="Provider Dashboard"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* ══════════ MOBIL: Bild als Block ══════════ */}
                <div className={`relative lg:hidden w-full h-[300px] sm:h-[400px] transition-opacity duration-1000 delay-200 ${heroInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0f1a] via-transparent to-[#0a0f1a]/50 pointer-events-none" />
                    <img
                        src="/assets/provider_dashboard_illustration_1766521172052.png"
                        alt="Provider Dashboard"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* ══════════ TEXT-INHALT ══════════ */}
                <div className="relative z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="lg:min-h-[calc(100vh-80px)] lg:flex lg:items-center py-16 sm:py-20 lg:py-24">
                            <div className={`max-w-2xl transition-all duration-[1200ms] ease-out ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                                {/* Schweiz-Badge */}
                                <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-full px-4 py-2 mb-7 group hover:bg-white/[0.1] transition-colors">
                                    <SwissFlagIcon className="w-4 h-4 flex-shrink-0" />
                                    <span className="text-white/60 text-xs sm:text-sm font-medium">Schweizweit · 0% Provision · Provisionsfrei</span>
                                </div>

                                {/* Headline */}
                                <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black leading-[1.08] tracking-tight mb-6">
                                    <span className="text-white">Mehr Aufträge.</span>
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 animate-text-gradient" style={{ backgroundSize: '200% auto' }}>
                                        Weniger Leerlauf.
                                    </span>
                                </h1>

                                {/* Beschreibung */}
                                <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                                    Fertigo verbindet Sie mit hochwertigen Anfragen aus Ihrer Region. 
                                    <span className="text-white/70 font-medium"> Sie wählen Leads gezielt aus</span> — ohne Abo, ohne Provision.
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <Link
                                        to="/register"
                                        className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                                    >
                                        Kostenlos starten
                                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/preise"
                                        className="group inline-flex items-center justify-center gap-2.5 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15] text-white font-bold px-8 py-4 rounded-2xl text-base sm:text-lg transition-all duration-300"
                                    >
                                        Preise ansehen
                                    </Link>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {[
                                        { label: 'Setup', value: '5 Min', icon: '⚡' },
                                        { label: 'Provision', value: '0%', icon: '💰' },
                                        { label: 'Modell', value: 'Pay/Lead', icon: '🎯' }
                                    ].map((stat, i) => (
                                        <div key={i} className="group bg-white/[0.04] backdrop-blur-md border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] rounded-2xl p-4 transition-all duration-300">
                                            <div className="text-2xl mb-2">{stat.icon}</div>
                                            <div className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1">{stat.label}</div>
                                            <div className="text-xl font-black text-white">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Trust-Zeile */}
                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                    {[
                                        { icon: '✓', text: 'Keine Einrichtungskosten' },
                                        { icon: '✓', text: 'Keine versteckten Gebühren' },
                                        { icon: '✓', text: 'Sofort startklar' },
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

                {/* Unterer Übergang (wie Homepage) */}
                <div className="relative z-20 h-16 sm:h-20 lg:h-24 -mt-px">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none">
                        <path d="M0 96H1440V32C1440 32 1320 0 1200 16C1080 32 960 64 720 64C480 64 360 32 240 16C120 0 0 32 0 32V96Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* ══════════ IN 3 SCHRITTEN - KOMPLETT NEUES TIMELINE DESIGN ══════════ */}
            <section ref={stepsRef} className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-[#0a0f1a]">
                {/* Dunkler Hintergrund mit Glow-Effekten */}
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1424] to-[#071210]" />
                    <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-green-600/[0.08] rounded-full blur-[150px]" />
                    <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/[0.06] rounded-full blur-[130px]" />
                    <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-teal-400/[0.04] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
                    {/* Header */}
                    <div className={`text-center mb-16 lg:mb-24 transition-all duration-1000 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-full px-5 py-2.5 mb-8">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <span className="text-white/70 text-sm font-bold">In 3 einfachen Schritten</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-5 leading-tight">
                            <span className="text-white">Vom Lead zum</span>
                            <br className="sm:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400"> Auftrag</span>
                        </h2>
                        <p className="text-white/40 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                            So einfach gewinnen Sie neue Kunden mit Fertigo
                        </p>
                    </div>

                    {/* ══════════ DESKTOP: Horizontale Timeline ══════════ */}
                    <div className="hidden lg:block mb-20">
                        {/* Timeline Line */}
                        <div className="relative">
                            <div className={`absolute top-[60px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-green-500/20 via-emerald-500/40 to-teal-500/20 rounded-full transition-all duration-1500 ${stepsInView ? 'opacity-100' : 'opacity-0'}`} />
                            <div className={`absolute top-[60px] left-[10%] h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full transition-all duration-2000 ease-out ${stepsInView ? 'w-[80%]' : 'w-0'}`} />
                        </div>

                        {/* Steps */}
                        <div className="grid grid-cols-3 gap-8">
                            {steps.map((item, index) => (
                                <div
                                    key={item.step}
                                    className={`relative transition-all duration-1000 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: `${300 + index * 200}ms` }}
                                >
                                    {/* Number Circle */}
                                    <div className="flex justify-center mb-8">
                                        <div className={`relative w-[120px] h-[120px] rounded-full bg-gradient-to-br ${item.gradient} p-[3px] shadow-2xl shadow-${index === 0 ? 'green' : index === 1 ? 'emerald' : 'teal'}-500/30`}>
                                            <div className="w-full h-full rounded-full bg-[#0a0f1a] flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-5xl mb-1">{item.icon}</div>
                                                    <div className={`text-xs font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}>
                                                        Schritt {item.number}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="group bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-3xl p-8 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2">
                                        <h3 className="text-2xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 transition-all duration-300">
                                            {item.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 mb-4">
                                            <SwissFlagIcon className="w-4 h-4" />
                                            <span className="text-green-400 text-sm font-bold">{item.swissValue}</span>
                                        </div>

                                        <p className="text-white/50 text-base leading-relaxed mb-6">
                                            {item.desc}
                                        </p>

                                        <div className="space-y-3 pt-5 border-t border-white/[0.08]">
                                            {item.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-white/70 text-sm font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ══════════ TABLET: Vertikale Timeline ══════════ */}
                    <div className="hidden sm:block lg:hidden">
                        <div className="relative">
                            {/* Vertikale Linie */}
                            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/20 via-emerald-500/40 to-teal-500/20 rounded-full" />
                            
                            <div className="space-y-12">
                                {steps.map((item, index) => (
                                    <div
                                        key={item.step}
                                        className={`relative pl-20 transition-all duration-1000 ${stepsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                        style={{ transitionDelay: `${300 + index * 200}ms` }}
                                    >
                                        {/* Circle auf der Timeline */}
                                        <div className={`absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl shadow-xl`}>
                                            {item.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-300">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${item.gradient} text-white text-xs font-black`}>
                                                    Schritt {item.number}
                                                </span>
                                                <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold">
                                                    <SwissFlagIcon className="w-3 h-3" />
                                                    {item.swissValue}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                                            <p className="text-white/50 text-sm leading-relaxed mb-4">{item.desc}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.features.map((feature, i) => (
                                                    <span key={i} className="px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full text-white/60 text-xs font-medium">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ══════════ MOBILE: Swipe Cards ══════════ */}
                    <div className="sm:hidden -mx-4">
                        <div className="flex gap-4 pl-4 pr-8 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide">
                            {steps.map((item, index) => (
                                <div
                                    key={item.step}
                                    className={`snap-center flex-shrink-0 w-[85vw] transition-all duration-700 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className="h-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 relative overflow-hidden">
                                        {/* Glow */}
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-10 blur-3xl`} />
                                        
                                        <div className="relative">
                                            {/* Top Row */}
                                            <div className="flex items-center justify-between mb-5">
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                                                    {item.icon}
                                                </div>
                                                <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${item.gradient} text-white text-sm font-black shadow-lg`}>
                                                    {item.number}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                                            
                                            <div className="flex items-center gap-2 mb-4">
                                                <SwissFlagIcon className="w-4 h-4" />
                                                <span className="text-green-400 text-sm font-bold">{item.swissValue}</span>
                                            </div>

                                            <p className="text-white/50 text-sm leading-relaxed mb-5">{item.desc}</p>

                                            <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                                                {item.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-white/60 text-xs font-medium">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Progress Dots */}
                        <div className="flex justify-center gap-2 px-4">
                            {steps.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === 0 ? 'w-8 bg-gradient-to-r from-green-500 to-emerald-500' : 'w-1.5 bg-white/20'}`} />
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className={`mt-16 lg:mt-20 text-center transition-all duration-1000 delay-700 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <Link
                            to="/register"
                            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold px-10 py-5 rounded-2xl text-lg shadow-2xl shadow-green-500/30 hover:shadow-green-500/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                        >
                            Jetzt kostenlos starten
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="mt-4 text-white/30 text-sm">
                            Keine Kreditkarte erforderlich - In 5 Minuten startklar
                        </p>
                    </div>
                </div>

                {/* Bottom Wave Transition */}
                <div className="relative z-20 h-16 sm:h-20 lg:h-24 -mt-px">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none">
                        <path d="M0 96H1440V32C1440 32 1320 0 1200 16C1080 32 960 64 720 64C480 64 360 32 240 16C120 0 0 32 0 32V96Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Für Sie als Partner – wie „Warum Fertigo?“ auf ServicesPage */}
            <section ref={benefitsRef} className={`relative py-16 sm:py-28 bg-gradient-to-b from-slate-50 to-white overflow-hidden transition-all duration-700 ${benefitsInView ? 'opacity-100' : 'opacity-0'}`}>

                {/* Dekor */}
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-green-100/40 rounded-full blur-[160px]" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                    {/* Header */}
                    <div className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-green-700 mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Der Fertigo-Effekt
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3 sm:mb-4">
                            Von Frustration zu{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Wachstum</span>
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-lg max-w-xl mx-auto">
                            Sehen Sie, was sich mit Fertigo für Ihr Geschäft verändert.
                        </p>
                    </div>

                    {/* ═══ Vergleich: Gegenüberstellung pro Zeile ═══ */}
                    <div className={`transition-all duration-1000 delay-200 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                        {/* Desktop/Tablet Column Headers */}
                        <div className="hidden sm:grid grid-cols-[1fr_48px_1fr] gap-4 mb-4 px-1">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ohne Fertigo</span>
                            </div>
                            <div />
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                                </div>
                                <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Mit Fertigo</span>
                            </div>
                        </div>

                        {/* Zeilen */}
                        <div className="space-y-3">
                            {[
                                { label: 'Aufträge', emoji: '📈', before: 'Mundpropaganda & Zufall', after: '+40% qualifizierte Leads' },
                                { label: 'Akquise', emoji: '⚡', before: 'Stunden für Kundensuche', after: 'Neue Leads in unter 5 Min.' },
                                { label: 'Verwaltung', emoji: '📱', before: 'Excel, Zettel, Papierchaos', after: 'Ein digitales Dashboard' },
                                { label: 'Planung', emoji: '📊', before: 'Nächster Monat? Unklar.', after: 'Konstanter Auftragsfluss' },
                                { label: 'Kosten', emoji: '💰', before: 'Teure Werbung ohne Garantie', after: 'Pay-per-Lead, 0% Provision' },
                                { label: 'Reichweite', emoji: '🌍', before: 'Nur Stammkunden im Umfeld', after: 'Schweizweite Sichtbarkeit' },
                            ].map((row, i) => (
                                <div
                                    key={i}
                                    className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                    style={{ transitionDelay: `${300 + i * 80}ms` }}
                                >
                                    {/* Desktop */}
                                    <div className="hidden sm:grid grid-cols-[1fr_48px_1fr] items-center">
                                        <div className="flex items-center gap-3 px-5 py-4 lg:px-6 lg:py-5">
                                            <span className="text-slate-300 text-sm line-through font-medium">{row.before}</span>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 flex items-center justify-center text-lg">{row.emoji}</div>
                                        </div>
                                        <div className="flex items-center gap-3 px-5 py-4 lg:px-6 lg:py-5">
                                            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                                            <span className="text-slate-800 text-sm font-semibold">{row.after}</span>
                                        </div>
                                    </div>

                                    {/* Mobile - NEUES DESIGN */}
                                    <div className="sm:hidden p-4 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 shadow-md flex flex-col gap-2 animate-fade-in-up">
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <span className="text-xl bg-white border border-emerald-200 rounded-full w-9 h-9 flex items-center justify-center shadow-sm">{row.emoji}</span>
                                            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider drop-shadow">{row.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <svg className="w-3.5 h-3.5 text-red-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                                            <span className="text-slate-400 text-xs line-through italic">{row.before}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                                            <span className="text-emerald-700 text-sm font-bold drop-shadow">{row.after}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ═══ Resultat-Banner ═══ */}
                    <div className={`mt-8 sm:mt-12 transition-all duration-1000 delay-500 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden">
                            <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5">
                                <div className="flex items-center gap-4 text-center sm:text-left">
                                    <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm items-center justify-center text-3xl">🚀</div>
                                    <div>
                                        <p className="font-black text-white text-lg sm:text-xl">Bereit für mehr Aufträge?</p>
                                        <p className="text-green-100/70 text-sm">Starten Sie in unter 5 Minuten — kostenlos und unverbindlich.</p>
                                    </div>
                                </div>
                                <Link
                                    to="/register"
                                    className="group inline-flex items-center gap-2 bg-white text-green-700 font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex-shrink-0"
                                >
                                    Jetzt starten
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ═══ Pricing Strip ═══ */}
                    <div className={`mt-8 sm:mt-10 transition-all duration-1000 delay-600 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="grid grid-cols-3 gap-3 sm:gap-5">
                            {[
                                { icon: '💰', title: 'Pay-per-Lead', desc: 'Keine monatlichen Gebühren' },
                                { icon: '🔒', title: '0% Provision', desc: '100% Ihr Gewinn' },
                                { icon: '🚫', title: 'Kein Abo', desc: 'Jederzeit kündbar' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-center hover:border-green-200 hover:shadow-sm transition-all duration-300">
                                    <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{item.icon}</div>
                                    <h4 className="font-black text-slate-900 text-xs sm:text-sm mb-0.5">{item.title}</h4>
                                    <p className="text-slate-400 text-[10px] sm:text-xs">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>




            {/* Beliebte Kategorien - Vergrössert */}
            <section ref={categoriesRef} className={`py-20 sm:py-28 lg:py-32 bg-white border-t border-slate-200 transition-all duration-700 ${categoriesInView ? 'opacity-100' : 'opacity-0'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${categoriesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 text-sm font-semibold text-green-700 mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            50+ Branchen verfügbar
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 mb-4 sm:mb-5">
                            Beliebte{' '}
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                                Kategorien
                                <svg className="absolute -bottom-2 left-0 w-full h-3 hidden sm:block" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradientC)" strokeWidth="4" strokeLinecap="round"/><defs><linearGradient id="underlineGradientC" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#16a34a"/><stop offset="50%" stopColor="#10b981"/><stop offset="100%" stopColor="#14b8a6"/></linearGradient></defs></svg>
                            </span>
                        </h2>
                        <p className="text-slate-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                            Anfragen aus über 50 Branchen warten auf qualifizierte Partner
                        </p>
                    </div>

                    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 transition-all duration-1000 delay-200 ${categoriesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {[
                            { emoji: '🎨', name: 'Maler & Gipser', leads: '320+', color: 'from-orange-50 to-amber-50', border: 'border-orange-200', hoverBorder: 'hover:border-orange-300' },
                            { emoji: '⚡', name: 'Elektriker', leads: '280+', color: 'from-yellow-50 to-amber-50', border: 'border-yellow-200', hoverBorder: 'hover:border-yellow-300' },
                            { emoji: '🔧', name: 'Sanitär & Heizung', leads: '250+', color: 'from-blue-50 to-cyan-50', border: 'border-blue-200', hoverBorder: 'hover:border-blue-300' },
                            { emoji: '🏗️', name: 'Bauunternehmen', leads: '210+', color: 'from-slate-50 to-gray-50', border: 'border-slate-200', hoverBorder: 'hover:border-slate-300' },
                            { emoji: '🪵', name: 'Schreiner', leads: '190+', color: 'from-amber-50 to-orange-50', border: 'border-amber-200', hoverBorder: 'hover:border-amber-300' },
                            { emoji: '🧹', name: 'Reinigung', leads: '350+', color: 'from-cyan-50 to-teal-50', border: 'border-cyan-200', hoverBorder: 'hover:border-cyan-300' },
                            { emoji: '🌿', name: 'Garten & Landschaft', leads: '270+', color: 'from-green-50 to-emerald-50', border: 'border-green-200', hoverBorder: 'hover:border-green-300' },
                            { emoji: '🏠', name: 'Umzug & Transport', leads: '230+', color: 'from-indigo-50 to-purple-50', border: 'border-indigo-200', hoverBorder: 'hover:border-indigo-300' },
                        ].map((cat, i) => (
                            <div 
                                key={i} 
                                className={`group bg-gradient-to-br ${cat.color} ${cat.hoverBorder} rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 border-2 ${cat.border} hover:shadow-xl transition-all duration-300 cursor-default hover:-translate-y-1`}
                            >
                                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                                    <span className="text-3xl sm:text-4xl">{cat.emoji}</span>
                                </div>
                                <div className="font-black text-slate-900 text-base sm:text-lg mb-2">{cat.name}</div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-green-600 text-sm font-bold">{cat.leads} Leads/Monat</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ IHR PERSÖNLICHES DASHBOARD - KOMPLETT NEUES DESIGN ══════════ */}
            <section ref={dashboardRef} className={`relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-[#0a0f1a] transition-all duration-700 ${dashboardInView ? 'opacity-100' : 'opacity-0'}`}>

                {/* Dunkler Hintergrund mit Premium Glow-Effekten */}
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1424] to-[#071210]" />
                    <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-green-600/[0.06] rounded-full blur-[180px]" />
                    <div className="absolute bottom-[-10%] right-[10%] w-[700px] h-[700px] bg-emerald-500/[0.05] rounded-full blur-[150px]" />
                    <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-teal-400/[0.03] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute inset-0 opacity-[0.025]" style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }} />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Header */}
                    <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-full px-5 py-2.5 mb-8">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <span className="text-white/70 text-sm font-bold">Ihre Kommandozentrale</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
                            <span className="text-white">Ihr persönliches</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 animate-text-gradient" style={{ backgroundSize: '200% auto' }}>Dashboard</span>
                        </h2>
                        <p className="text-white/40 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                            Alles im Blick — Leads, Statistiken und Aufträge <span className="text-white/70 font-bold">in Echtzeit</span>
                        </p>
                    </div>

                    {/* ══════════ BENTO GRID DASHBOARD ══════════ */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 transition-all duration-1000 delay-200 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        
                        {/* ─── Haupt-Stats Bereich ─── */}
                        <div 
                            className="lg:col-span-8 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 sm:p-8 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500 group"
                            style={{ transitionDelay: '300ms' }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-black text-xl flex items-center gap-3">
                                    <span className="text-3xl">📊</span>
                                    Live-Übersicht
                                </h3>
                                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                    </span>
                                    <span className="text-green-400 text-xs font-black uppercase tracking-wider">Echtzeit</span>
                                </div>
                            </div>
                            
                            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                                {[
                                    { value: '47', label: 'Neue Leads', change: '+12 heute', icon: '📬', color: 'green' },
                                    { value: 'CHF 18.5k', label: 'Monatsumsatz', change: '+24%', icon: '💰', color: 'emerald' },
                                    { value: '82%', label: 'Erfolgsrate', change: 'Top 10%', icon: '🎯', color: 'teal' },
                                ].map((stat, i) => (
                                    <div 
                                        key={i} 
                                        className={`relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-2xl p-5 hover:border-${stat.color}-500/30 transition-all duration-300 hover:-translate-y-1 group/stat`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/5 to-transparent rounded-2xl opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300`} />
                                        <div className="relative">
                                            <div className="text-3xl mb-3">{stat.icon}</div>
                                            <div className="text-3xl sm:text-4xl font-black text-white mb-1">{stat.value}</div>
                                            <div className="text-white/40 text-sm font-medium mb-2">{stat.label}</div>
                                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                                <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                                                <span className="text-green-400 text-xs font-bold">{stat.change}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ─── Quick Actions ─── */}
                        <div 
                            className="lg:col-span-4 bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-md border border-green-500/20 rounded-3xl p-6 sm:p-8 hover:border-green-500/30 transition-all duration-500"
                            style={{ transitionDelay: '400ms' }}
                        >
                            <h3 className="text-white font-black text-xl flex items-center gap-3 mb-6">
                                <span className="text-3xl">⚡</span>
                                Schnellstart
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Leads durchsuchen', icon: '🔍' },
                                    { label: 'Neue Anfragen', icon: '📋' },
                                    { label: 'Profil bearbeiten', icon: '✏️' },
                                ].map((action, i) => (
                                    <button 
                                        key={i}
                                        className="w-full flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-4 transition-all duration-300 group/btn"
                                    >
                                        <span className="text-xl">{action.icon}</span>
                                        <span className="text-white/70 text-sm font-bold group-hover/btn:text-white">{action.label}</span>
                                        <ArrowRightIcon className="w-4 h-4 ml-auto text-white/30 group-hover/btn:text-green-400 group-hover/btn:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ─── Neueste Leads Feed ─── */}
                        <div 
                            className="lg:col-span-7 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 sm:p-8 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500"
                            style={{ transitionDelay: '500ms' }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-black text-xl flex items-center gap-3">
                                    <span className="text-3xl">🔥</span>
                                    Neueste Leads
                                </h3>
                                <span className="text-white/40 text-xs font-medium">Jetzt aktualisiert</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { title: 'Badezimmer Renovation', location: 'Zürich', time: '5 Min.', price: 'CHF 22', icon: '🛁', isNew: true },
                                    { title: 'Küche Modernisierung', location: 'Bern', time: '12 Min.', price: 'CHF 28', icon: '🍳', isHot: true },
                                    { title: 'Garten Neugestaltung', location: 'Basel', time: '18 Min.', price: 'CHF 35', icon: '🌿', isNew: true },
                                ].map((lead, i) => (
                                    <div 
                                        key={i} 
                                        className="group/lead flex items-center gap-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-green-500/20 rounded-2xl p-4 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-green-500/20">
                                            {lead.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-white font-bold text-sm truncate">{lead.title}</h4>
                                                {lead.isNew && <span className="px-2 py-0.5 bg-green-500 text-white text-[9px] font-black uppercase rounded-full">Neu</span>}
                                                {lead.isHot && <span className="px-2 py-0.5 bg-amber-500 text-white text-[9px] font-black uppercase rounded-full">Hot</span>}
                                            </div>
                                            <p className="text-white/40 text-xs">📍 {lead.location} · ⏱️ vor {lead.time}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-400 font-black text-lg">{lead.price}</div>
                                            <div className="text-white/30 text-[10px] font-medium">pro Lead</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ─── Performance Chart Placeholder ─── */}
                        <div 
                            className="lg:col-span-5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 sm:p-8 hover:border-white/[0.12] transition-all duration-500"
                            style={{ transitionDelay: '600ms' }}
                        >
                            <h3 className="text-white font-black text-xl flex items-center gap-3 mb-6">
                                <span className="text-3xl">📈</span>
                                Ihr Wachstum
                            </h3>
                            {/* Simulated Chart Area */}
                            <div className="relative h-32 mb-6">
                                <div className="absolute inset-0 flex items-end justify-between gap-2">
                                    {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                                        <div 
                                            key={i} 
                                            className="flex-1 bg-gradient-to-t from-green-500/40 to-green-500/10 rounded-t-lg transition-all duration-500 hover:from-green-500/60 hover:to-green-500/20"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4">
                                    <div className="text-white/40 text-xs mb-1">Diese Woche</div>
                                    <div className="text-white font-black text-xl">+34%</div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4">
                                    <div className="text-white/40 text-xs mb-1">Diesen Monat</div>
                                    <div className="text-white font-black text-xl">+127%</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ══════════ FEATURE GRID ══════════ */}
                    <div className={`mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transition-all duration-1000 delay-700 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {[
                            { emoji: '📊', title: 'Live-Stats' },
                            { emoji: '🔔', title: 'Alerts' },
                            { emoji: '📍', title: 'Regional' },
                            { emoji: '⚡', title: 'Schnell' },
                            { emoji: '⭐', title: 'Bewertungen' },
                            { emoji: '🔒', title: 'Sicher' },
                        ].map((feat, i) => (
                            <div 
                                key={i} 
                                className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-green-500/20 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{feat.emoji}</div>
                                <div className="text-white/60 text-sm font-bold group-hover:text-white/80">{feat.title}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className={`mt-16 text-center transition-all duration-1000 delay-800 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <Link
                            to="/register"
                            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold px-10 py-5 rounded-2xl text-lg shadow-2xl shadow-green-500/30 hover:shadow-green-500/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                        >
                            Dashboard testen
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="mt-4 text-white/30 text-sm">
                            Kostenlos starten - Keine Kreditkarte erforderlich
                        </p>
                    </div>
                </div>

                {/* Bottom Wave Transition to light */}
                <div className="relative z-20 h-16 sm:h-20 lg:h-24 -mt-px">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none">
                        <path d="M0 96H1440V32C1440 32 1320 0 1200 16C1080 32 960 64 720 64C480 64 360 32 240 16C120 0 0 32 0 32V96Z" fill="#f8fafc" />
                    </svg>
                </div>
            </section>

                {/* FAQ für Partner */}
                <section ref={faqRef} className={`py-16 sm:py-24 bg-slate-50 border-t border-slate-200 transition-all duration-700 ${faqInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <div className={`text-center mb-10 sm:mb-14 transition-all duration-1000 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h2 className="text-[26px] sm:text-4xl lg:text-5xl font-black text-slate-900 mb-2 sm:mb-4">
                                Häufig gestellte{' '}
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                                    Fragen
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 hidden sm:block" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradientF)" strokeWidth="4" strokeLinecap="round"/><defs><linearGradient id="underlineGradientF" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#16a34a"/><stop offset="50%" stopColor="#10b981"/><stop offset="100%" stopColor="#14b8a6"/></linearGradient></defs></svg>
                                </span>
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-lg max-w-xl mx-auto">
                                Alles, was Sie als Partner wissen müssen
                            </p>
                        </div>

                        <div className={`space-y-3 transition-all duration-1000 delay-200 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            {[
                                { q: 'Was kostet die Registrierung?', a: 'Die Registrierung ist komplett kostenlos. Es gibt keine monatliche Gebühr und keine Mindestabnahme. Sie zahlen nur für Leads, die Sie aktiv kaufen.' },
                                { q: 'Wie funktioniert das Pay-per-Lead Modell?', a: 'Sie sehen alle verfügbaren Anfragen auf dem Live-Marktplatz. Wählen Sie die Leads aus, die zu Ihrem Betrieb passen, und kaufen Sie diese einzeln. Sie behalten 100% des Auftrags – keine Provision.' },
                                { q: 'In welchen Regionen gibt es Leads?', a: 'Fertigo ist in allen 26 Kantonen der Schweiz aktiv. Sie können Ihr Einzugsgebiet bis auf PLZ-Ebene definieren und erhalten nur passende Anfragen.' },
                                { q: 'Wie schnell erhalte ich Leads?', a: 'Viele Partner erhalten bereits innerhalb der ersten 24 Stunden ihre ersten Leads. Die Geschwindigkeit hängt von Ihrer Region und Branche ab.' },
                                { q: 'Kann ich jederzeit pausieren oder kündigen?', a: 'Ja, absolut. Es gibt keine Vertragsbindung. Sie können Ihr Konto jederzeit pausieren oder löschen – ohne Kosten oder Fristen.' },
                                { q: 'Sind die Leads exklusiv?', a: 'Leads werden an maximal 3 Partner vermittelt, um faire Chancen zu gewährleisten. So bleibt die Qualität hoch und der Wettbewerb überschaubar.' },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`bg-white rounded-xl sm:rounded-2xl border transition-all duration-300 ${openFaq === i ? 'border-green-200 shadow-md' : 'border-slate-200'}`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                                >
                                    <span className="font-bold text-slate-900 text-[14px] sm:text-base pr-4">{item.q}</span>
                                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-green-500 rotate-45' : 'bg-slate-100'}`}>
                                        <svg className={`w-4 h-4 transition-colors ${openFaq === i ? 'text-white' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48 pb-4 sm:pb-5' : 'max-h-0'}`}>
                                    <p className="px-4 sm:px-5 text-slate-500 text-[13px] sm:text-sm leading-relaxed">{item.a}</p>
                                </div>
                            </div>
                        ))}
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
                            Bereit für neue Aufträge
                        </h2>
                        {/* Hier kann weitere CTA-Beschreibung oder Button eingefügt werden */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProvidersPage;