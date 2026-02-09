import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon, SwissFlagIcon } from '../components/icons';

export const providersData: Array<{ id: string; location: string; [key: string]: any }> = [];

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
            {/* ══════════ HERO ══════════ */}
            <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-green-50/40">

                {/* Hintergrund-Dekor */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                    <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-green-200/30 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                </div>

                {/* Inhalt */}
                <div className="relative z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28">
                            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                                {/* ── Linke Spalte: Text ── */}
                                <div className={`max-w-xl transition-all duration-[1200ms] ease-out ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-6">
                                        <SwissFlagIcon className="w-4 h-4 flex-shrink-0" />
                                        <span className="text-green-700 text-xs sm:text-sm font-semibold">Für Handwerker & Dienstleister</span>
                                    </div>

                                    {/* Headline */}
                                    <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black leading-[1.08] tracking-tight text-slate-900 mb-5">
                                        Mehr Aufträge,{' '}
                                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                                            weniger Aufwand.
                                            <svg className="absolute -bottom-1.5 left-0 w-full h-2.5" viewBox="0 0 300 10" fill="none" preserveAspectRatio="none"><path d="M2 7C50 1 100 9 150 5C200 1 250 8 298 3" stroke="url(#heroUL)" strokeWidth="3.5" strokeLinecap="round"/><defs><linearGradient id="heroUL" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#16a34a"/><stop offset="100%" stopColor="#14b8a6"/></linearGradient></defs></svg>
                                        </span>
                                    </h1>

                                    {/* Beschreibung */}
                                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                                        Qualifizierte Kundenanfragen aus Ihrer Region — <span className="text-slate-800 font-semibold">ohne Abo, ohne Provision</span>. Sie entscheiden, welche Leads Sie kaufen.
                                    </p>

                                    {/* CTA + Secondary */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8">
                                        <Link
                                            to="/register"
                                            className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold px-7 py-4 rounded-2xl text-base sm:text-lg shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                                        >
                                            Kostenlos starten
                                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <span className="text-slate-400 text-xs sm:text-sm">Keine Kreditkarte nötig</span>
                                    </div>

                                    {/* Trust-Zeile */}
                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                        {[
                                            'PLZ-genaue Leads',
                                            'Pay-per-Lead',
                                            '0% Provision',
                                        ].map((text, i) => (
                                            <span key={i} className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400">
                                                <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                                                    <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                                </span>
                                                {text}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Rechte Spalte: Feature-Cards ── */}
                                <div className={`transition-all duration-[1500ms] delay-300 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                    <div className="relative">
                                        {/* Hintergrund-Glow */}
                                        <div className="absolute -inset-8 bg-gradient-to-br from-green-200/40 via-transparent to-emerald-100/30 rounded-[2rem] blur-2xl pointer-events-none" />

                                        <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                                            {[
                                                { icon: '📈', value: '+40%', label: 'Mehr Aufträge', desc: 'Durch qualifizierte Leads', color: 'bg-green-50 border-green-200' },
                                                { icon: '⚡', value: '<5 Min', label: 'Bis zum Lead', desc: 'Sofort nach Registrierung', color: 'bg-amber-50 border-amber-200' },
                                                { icon: '🎯', value: 'PLZ-genau', label: 'Ihre Region', desc: 'Nur relevante Anfragen', color: 'bg-blue-50 border-blue-200' },
                                                { icon: '💰', value: '0%', label: 'Provision', desc: '100% Ihr Gewinn', color: 'bg-emerald-50 border-emerald-200' },
                                            ].map((card, i) => (
                                                <div
                                                    key={i}
                                                    className={`${card.color} border rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                                                        heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                                    }`}
                                                    style={{ transitionDelay: `${500 + i * 120}ms` }}
                                                >
                                                    <span className="text-2xl sm:text-3xl block mb-2 sm:mb-3">{card.icon}</span>
                                                    <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none mb-0.5">{card.value}</p>
                                                    <p className="text-sm sm:text-base font-bold text-slate-700">{card.label}</p>
                                                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{card.desc}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Floating Badge */}
                                        <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-2.5 shadow-xl transition-all duration-1000 delay-[900ms] ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                            <span className="flex h-2 w-2 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                            </span>
                                            <span className="text-xs sm:text-sm font-semibold text-slate-700">2'500+ aktive Partner schweizweit</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* So funktioniert's – wie Home „In 3 Schritten“ (RadialJourney-Stil) */}
            <section ref={stepsRef} className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-white">
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

                    {/* ===== MOBILE ONLY: Scroll Cards ===== */}
                    <div className="sm:hidden -mx-4 mb-10">
                        <div className="flex gap-4 pl-4 pr-8 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide">
                            {steps.map((item, index) => (
                                <div
                                    key={item.step}
                                    className={`
                                        snap-center flex-shrink-0 w-[80vw]
                                        transition-all duration-700
                                        ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                                    `}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className={`
                                        h-full rounded-3xl border-2 overflow-hidden flex flex-col
                                        ${index === 0 ? 'border-green-200 bg-gradient-to-b from-green-50 to-white' : index === 1 ? 'border-emerald-200 bg-gradient-to-b from-emerald-50 to-white' : 'border-teal-200 bg-gradient-to-b from-teal-50 to-white'}
                                    `}>
                                        <div className="p-5 flex flex-col h-full">
                                            {/* Top: Emoji centered + number badge */}
                                            <div className="text-center mb-4">
                                                <div className="relative inline-block">
                                                    <div className={`
                                                        w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl
                                                        ${index === 0 ? 'bg-green-100' : index === 1 ? 'bg-emerald-100' : 'bg-teal-100'}
                                                    `}>
                                                        {item.icon}
                                                    </div>
                                                    <div className={`
                                                        absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full text-[11px] font-black flex items-center justify-center text-white shadow-sm
                                                        ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-emerald-500' : 'bg-teal-500'}
                                                    `}>
                                                        {item.number}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Title centered */}
                                            <h3 className="text-slate-900 font-black text-lg text-center leading-tight mb-1.5">{item.title}</h3>

                                            {/* Swiss value */}
                                            <div className="flex justify-center mb-3">
                                                <div className={`
                                                    inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full
                                                    ${index === 0 ? 'bg-green-100 text-green-700' : index === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-teal-100 text-teal-700'}
                                                `}>
                                                    <SwissFlagIcon className="w-3 h-3" />
                                                    {item.swissValue}
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-slate-500 text-[13px] leading-relaxed text-center flex-1 mb-4">{item.desc}</p>

                                            {/* Features */}
                                            <div className="space-y-2 pt-3 border-t border-slate-100">
                                                {item.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <svg className={`w-4 h-4 flex-shrink-0 ${index === 0 ? 'text-green-500' : index === 1 ? 'text-emerald-500' : 'text-teal-500'}`} viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-slate-700 text-[12.5px] font-medium">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Scroll dots */}
                        <div className="flex justify-center gap-2">
                            {steps.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'w-7 bg-green-500' : 'w-1.5 bg-slate-200'}`} />
                            ))}
                        </div>
                    </div>

                    {/* ===== DESKTOP ONLY: Original Card Grid ===== */}
                    <div className="hidden sm:grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
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




            {/* Beliebte Kategorien */}
            <section ref={categoriesRef} className={`py-16 sm:py-24 bg-white border-t border-slate-200 transition-all duration-700 ${categoriesInView ? 'opacity-100' : 'opacity-0'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className={`text-center mb-10 sm:mb-14 transition-all duration-1000 ${categoriesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-[26px] sm:text-4xl lg:text-5xl font-black text-slate-900 mb-2 sm:mb-4">
                            Beliebte{' '}
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                                Kategorien
                                <svg className="absolute -bottom-2 left-0 w-full h-3 hidden sm:block" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradientC)" strokeWidth="4" strokeLinecap="round"/><defs><linearGradient id="underlineGradientC" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#16a34a"/><stop offset="50%" stopColor="#10b981"/><stop offset="100%" stopColor="#14b8a6"/></linearGradient></defs></svg>
                            </span>
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto">
                            Anfragen aus über 50 Branchen warten auf qualifizierte Partner
                        </p>
                    </div>

                    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 transition-all duration-1000 delay-200 ${categoriesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {[
                            { emoji: '🎨', name: 'Maler & Gipser', leads: '320+' },
                            { emoji: '⚡', name: 'Elektriker', leads: '280+' },
                            { emoji: '🔧', name: 'Sanitär & Heizung', leads: '250+' },
                            { emoji: '🏗️', name: 'Bauunternehmen', leads: '210+' },
                            { emoji: '🪵', name: 'Schreiner', leads: '190+' },
                            { emoji: '🧹', name: 'Reinigung', leads: '350+' },
                            { emoji: '🌿', name: 'Garten & Landschaft', leads: '270+' },
                            { emoji: '🏠', name: 'Umzug & Transport', leads: '230+' },
                        ].map((cat, i) => (
                            <div key={i} className="bg-slate-50 hover:bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-green-200 transition-all duration-300 group cursor-default">
                                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
                                <div className="font-bold text-slate-900 text-[13px] sm:text-sm mb-1">{cat.name}</div>
                                <div className="text-green-600 text-[11px] sm:text-xs font-semibold">{cat.leads} Leads/Monat</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Das Fertigo Dashboard – Split Showcase */}
            <section ref={dashboardRef} className={`relative py-16 sm:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden transition-all duration-700 ${dashboardInView ? 'opacity-100' : 'opacity-0'}`}>

                {/* Dekor */}
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-green-100/50 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                    {/* Header */}
                    <div className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-green-700 mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Alles an einem Ort
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3 sm:mb-4">
                            Ihr persönliches{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Dashboard</span>
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-lg max-w-xl mx-auto">
                            Leads, Aufträge, Statistiken und Kunden — alles in einer übersichtlichen Oberfläche.
                        </p>
                    </div>

                    {/* ═══ Dashboard Mockup — Full Width ═══ */}
                    <div className={`mb-14 sm:mb-20 transition-all duration-1000 delay-200 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="relative mx-auto max-w-4xl">
                            {/* Schatten-Glow */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-green-200/30 via-transparent to-emerald-200/20 rounded-[2rem] blur-2xl pointer-events-none" />

                            <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
                                {/* Browser Bar */}
                                <div className="flex items-center gap-3 px-4 sm:px-5 py-3 bg-slate-50 border-b border-slate-200">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <div className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] sm:text-xs text-slate-400 font-mono">
                                            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                            app.fertigo.ch/dashboard
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard Content */}
                                <div className="p-2 sm:p-6 lg:p-8">
                                    {/* Mobile: Alles in einer Card, harmonisch gestapelt */}
                                    <div className="sm:hidden flex flex-col gap-4">
                                        {/* Stats Row */}
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { label: 'Neue Leads', value: '12', change: '+3 heute', changeColor: 'text-green-600', bg: 'bg-green-50 border-green-200', icon: '📩' },
                                                { label: 'Monatsumsatz', value: 'CHF 8.4k', change: '+12%', changeColor: 'text-green-600', bg: 'bg-emerald-50 border-emerald-200', icon: '💰' },
                                                { label: 'Conversion', value: '68%', change: '+5%', changeColor: 'text-green-600', bg: 'bg-teal-50 border-teal-200', icon: '🎯' },
                                                { label: 'Bewertung', value: '4.9 ★', change: '142 Reviews', changeColor: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: '⭐' },
                                            ].map((stat, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex flex-col items-center justify-center ${stat.bg} border rounded-xl p-3 transition-all duration-700 ${dashboardInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                                                >
                                                    <span className="text-xl mb-1">{stat.icon}</span>
                                                    <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                                                    <div className="text-lg font-black text-slate-900 leading-none">{stat.value}</div>
                                                    <div className={`text-[10px] font-semibold ${stat.changeColor}`}>{stat.change}</div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Chart */}
                                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-sm font-bold text-slate-800">Aufträge · 7 Tage</span>
                                                <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                                                    +28%
                                                </span>
                                            </div>
                                            <div className="flex items-end gap-1.5 sm:gap-2.5 h-24 sm:h-32">
                                                {[30, 45, 38, 60, 52, 75, 90].map((h, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex-1 rounded-lg transition-all duration-700"
                                                        style={{
                                                            height: dashboardInView ? `${h}%` : '0%',
                                                            background: i === 6
                                                                ? 'linear-gradient(to top, #16a34a, #10b981)'
                                                                : i >= 4
                                                                ? '#bbf7d0'
                                                                : '#e2e8f0',
                                                            transitionDelay: `${600 + i * 80}ms`,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex gap-1.5 sm:gap-2.5 mt-2">
                                                {['Mo','Di','Mi','Do','Fr','Sa','So'].map((d, i) => (
                                                    <span key={i} className="flex-1 text-center text-[9px] sm:text-[10px] text-slate-400 font-medium">{d}</span>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Live Leads */}
                                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-bold text-slate-800">Neueste Leads</span>
                                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                                                    <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-600" /></span>
                                                    Live
                                                </span>
                                            </div>
                                            <div className="space-y-2.5">
                                                {[
                                                    { name: 'Malerarbeiten 3-Zi Wohnung', loc: 'Zürich 8001', time: 'vor 2 Min.', price: 'CHF 18' },
                                                    { name: 'Sanitär Notfall Bad', loc: 'Bern 3011', time: 'vor 8 Min.', price: 'CHF 24' },
                                                    { name: 'Küche Renovation', loc: 'Basel 4051', time: 'vor 15 Min.', price: 'CHF 32' },
                                                ].map((lead, i) => (
                                                    <div
                                                        key={i}
                                                        className={`flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-slate-200 transition-all duration-700 ${dashboardInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                                                        style={{ transitionDelay: `${800 + i * 120}ms` }}
                                                    >
                                                        <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-base flex-shrink-0">📩</div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-semibold text-slate-800 text-xs truncate">{lead.name}</p>
                                                            <p className="text-slate-400 text-[10px]">{lead.loc} · {lead.time}</p>
                                                        </div>
                                                        <span className="text-green-700 font-black text-xs flex-shrink-0">{lead.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Floating Badges */}
                                        <div className="flex gap-2">
                                            <div className="flex-1 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 flex items-center gap-2">
                                                <div className="relative">
                                                    <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-lg">🔔</div>
                                                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-900 font-bold text-[11px]">Neuer Lead!</p>
                                                    <p className="text-slate-400 text-[10px]">Zürich · gerade eben</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 flex items-center gap-2">
                                                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-lg">📈</div>
                                                <div>
                                                    <p className="text-slate-900 font-bold text-[11px]">+40% Aufträge</p>
                                                    <p className="text-slate-400 text-[10px]">diesen Monat</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Desktop bleibt unverändert */}
                                    <div className="hidden sm:block">
                                        {/* Stats Row - Mobile optimiert */}
                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-4 mb-4 sm:mb-6">
                                            {[
                                                { label: 'Neue Leads', value: '12', change: '+3 heute', changeColor: 'text-green-600', bg: 'bg-green-50 border-green-200', icon: '📩' },
                                                { label: 'Monatsumsatz', value: 'CHF 8.4k', change: '+12%', changeColor: 'text-green-600', bg: 'bg-emerald-50 border-emerald-200', icon: '💰' },
                                                { label: 'Conversion', value: '68%', change: '+5%', changeColor: 'text-green-600', bg: 'bg-teal-50 border-teal-200', icon: '🎯' },
                                                { label: 'Bewertung', value: '4.9 ★', change: '142 Reviews', changeColor: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: '⭐' },
                                            ].map((stat, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex items-center gap-3 ${stat.bg} border rounded-xl sm:rounded-2xl p-3 transition-all duration-700 ${dashboardInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                                                >
                                                    <span className="text-xl flex-shrink-0">{stat.icon}</span>
                                                    <div>
                                                        <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                                                        <div className="text-lg font-black text-slate-900 leading-none">{stat.value}</div>
                                                        <div className={`text-[10px] font-semibold ${stat.changeColor}`}>{stat.change}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Chart + Leads - Mobile optimiert: untereinander */}
                                        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[1.2fr_1fr] sm:gap-5">
                                            {/* Chart */}
                                            <div className="bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-sm font-bold text-slate-800">Aufträge · 7 Tage</span>
                                                    <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                                                        +28%
                                                    </span>
                                                </div>
                                                <div className="flex items-end gap-1.5 sm:gap-2.5 h-24 sm:h-32">
                                                    {[30, 45, 38, 60, 52, 75, 90].map((h, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex-1 rounded-lg transition-all duration-700"
                                                            style={{
                                                                height: dashboardInView ? `${h}%` : '0%',
                                                                background: i === 6
                                                                    ? 'linear-gradient(to top, #16a34a, #10b981)'
                                                                    : i >= 4
                                                                    ? '#bbf7d0'
                                                                    : '#e2e8f0',
                                                                transitionDelay: `${600 + i * 80}ms`,
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex gap-1.5 sm:gap-2.5 mt-2">
                                                    {['Mo','Di','Mi','Do','Fr','Sa','So'].map((d, i) => (
                                                        <span key={i} className="flex-1 text-center text-[9px] sm:text-[10px] text-slate-400 font-medium">{d}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Live Leads */}
                                            <div className="bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-sm font-bold text-slate-800">Neueste Leads</span>
                                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                                                        <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-600" /></span>
                                                        Live
                                                    </span>
                                                </div>
                                                <div className="space-y-2.5">
                                                    {[
                                                        { name: 'Malerarbeiten 3-Zi Wohnung', loc: 'Zürich 8001', time: 'vor 2 Min.', price: 'CHF 18' },
                                                        { name: 'Sanitär Notfall Bad', loc: 'Bern 3011', time: 'vor 8 Min.', price: 'CHF 24' },
                                                        { name: 'Küche Renovation', loc: 'Basel 4051', time: 'vor 15 Min.', price: 'CHF 32' },
                                                    ].map((lead, i) => (
                                                        <div
                                                            key={i}
                                                            className={`flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-slate-200 transition-all duration-700 ${dashboardInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                                                            style={{ transitionDelay: `${800 + i * 120}ms` }}
                                                        >
                                                            <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-base flex-shrink-0">📩</div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-semibold text-slate-800 text-xs truncate">{lead.name}</p>
                                                                <p className="text-slate-400 text-[10px]">{lead.loc} · {lead.time}</p>
                                                            </div>
                                                            <span className="text-green-700 font-black text-xs flex-shrink-0">{lead.price}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Notification & Stats Badge - Mobile optimiert */}
                    <div className="flex sm:hidden gap-2 mt-3">
                        <div className="flex-1 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 flex items-center gap-2">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-lg">🔔</div>
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                            </div>
                            <div>
                                <p className="text-slate-900 font-bold text-[11px]">Neuer Lead!</p>
                                <p className="text-slate-400 text-[10px]">Zürich · gerade eben</p>
                            </div>
                        </div>
                        <div className="flex-1 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-lg">📈</div>
                            <div>
                                <p className="text-slate-900 font-bold text-[11px]">+40% Aufträge</p>
                                <p className="text-slate-400 text-[10px]">diesen Monat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Feature Grid — 6 Karten ═══ */}
            <div className={`grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 transition-all duration-1000 delay-400 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {[
                    { emoji: '📩', title: 'Live Lead-Marktplatz', desc: 'Anfragen in Echtzeit sehen und sofort kaufen.', color: 'border-green-200 bg-green-50/50' },
                    { emoji: '📊', title: 'Statistiken & Insights', desc: 'Umsatz, Conversion und Trends auf einen Blick.', color: 'border-emerald-200 bg-emerald-50/50' },
                    { emoji: '🔔', title: 'Push-Notifications', desc: 'Sofort informiert bei neuen passenden Leads.', color: 'border-teal-200 bg-teal-50/50' },
                    { emoji: '📍', title: 'Regionale Filter', desc: 'Nur Leads aus Ihrem Einzugsgebiet — per PLZ.', color: 'border-blue-200 bg-blue-50/50' },
                    { emoji: '⭐', title: 'Bewertungssystem', desc: 'Kundenbewertungen steigern Ihre Sichtbarkeit.', color: 'border-amber-200 bg-amber-50/50' },
                    { emoji: '🔒', title: 'Schweizer Datenschutz', desc: 'DSGVO-konform, Hosting in der Schweiz.', color: 'border-slate-200 bg-slate-50/50' },
                ].map((feat, i) => (
                    <div
                        key={i}
                        className={`${feat.color} border rounded-2xl p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${
                            dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                        style={{ transitionDelay: `${600 + i * 80}ms` }}
                    >
                        <span className="text-2xl sm:text-3xl block mb-2.5 sm:mb-3">{feat.emoji}</span>
                        <h3 className="font-black text-slate-900 text-sm sm:text-base mb-1">{feat.title}</h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                ))}
            </div>

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