import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon, SwissFlagIcon } from '../components/icons';

const ProvidersPage: React.FC = () => {
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: stepsRef, inView: stepsInView } = useInView({ triggerOnce: true, threshold: 0.05 });
    const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: categoriesRef, inView: categoriesInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const { ref: toolsRef, inView: toolsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [openFaq, setOpenFaq] = React.useState<number | null>(null);

    return (
        <div className="mx-auto overflow-hidden">

            {/* ══════════ HERO ══════════ */}
            <section ref={heroRef} className="relative overflow-hidden bg-green-50 min-h-[90vh] flex items-center">
                {/* Background layers */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_50%,rgba(34,197,94,0.12),transparent)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(16,185,129,0.06),transparent)]" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-28 lg:pt-20 pb-16 lg:pb-20">


                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

                        {/* Left - Content (5 cols) */}
                        <div className={`lg:col-span-5 transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 leading-[1.06] tracking-tight mb-6">
                                Ihr nächster
                                <br />
                                Auftrag wartet{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">bereits.</span>
                            </h1>

                            <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-md">
                                Qualifizierte Kundenanfragen direkt aufs Handy. Kein Abo, keine Provision - nur echte Aufträge aus Ihrer Region.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-10">
                                <Link
                                    to="/register"
                                    className="group inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-400 text-slate-950 font-bold px-7 py-4 rounded-2xl text-base shadow-lg shadow-green-500/25 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Kostenlos registrieren
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>


                        </div>

                        {/* Right - Dashboard Illustration (7 cols) */}
                        <div className={`lg:col-span-7 relative transition-all duration-1000 delay-300 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                            {/* Dashboard Window */}
                            <div className="relative bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                                {/* Browser Bar */}
                                <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/80 border-b border-slate-700/60">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <div className="flex items-center gap-2 bg-slate-900/80 rounded-lg px-4 py-1 text-xs text-slate-500">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                            app.fertigo.ch/dashboard
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard Content */}
                                <div className="p-4 sm:p-5">
                                    {/* Top Row - Greeting + Stats */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <div className="text-white font-bold text-sm">Willkommen, Marco</div>
                                            <div className="text-slate-500 text-xs">Montag, 10. Februar 2026</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xs">MK</div>
                                        </div>
                                    </div>

                                    {/* Stat Cards Row */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                                        {[
                                            { label: 'Neue Leads', value: '12', change: '+3 heute', icon: '📩', bg: 'from-green-500/10 to-emerald-500/10', border: 'border-green-500/20' },
                                            { label: 'Umsatz', value: '8\'400', change: '+18%', icon: '💰', bg: 'from-amber-500/10 to-yellow-500/10', border: 'border-amber-500/20' },
                                            { label: 'Erfolgsrate', value: '94%', change: '+2%', icon: '🎯', bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20' },
                                            { label: 'Bewertung', value: '4.9', change: '52 Reviews', icon: '⭐', bg: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/20' },
                                        ].map((stat, i) => (
                                            <div key={i} className={`bg-gradient-to-br ${stat.bg} border ${stat.border} rounded-xl p-3`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-base">{stat.icon}</span>
                                                    <span className="text-green-400 text-[10px] font-semibold">{stat.change}</span>
                                                </div>
                                                <div className="text-white font-black text-lg leading-none">{stat.value}</div>
                                                <div className="text-slate-500 text-[10px] font-medium mt-1">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Two Column: Chart + Leads */}
                                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                        {/* Chart Area */}
                                        <div className="sm:col-span-3 bg-slate-800/50 border border-slate-700/40 rounded-xl p-3">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="text-slate-300 text-xs font-semibold">Umsatz-Entwicklung</div>
                                                <div className="text-green-400 text-[10px] font-bold bg-green-500/10 px-2 py-0.5 rounded-full">+18% vs. Vormonat</div>
                                            </div>
                                            <svg viewBox="0 0 300 80" className="w-full h-auto">
                                                <defs>
                                                    <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="rgb(34,197,94)" stopOpacity="0.3" />
                                                        <stop offset="100%" stopColor="rgb(34,197,94)" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                                <path d="M0,65 C30,55 50,60 80,45 C110,30 130,50 160,35 C190,20 220,40 250,25 C270,18 290,12 300,8 L300,80 L0,80Z" fill="url(#heroChartFill)" />
                                                <path d="M0,65 C30,55 50,60 80,45 C110,30 130,50 160,35 C190,20 220,40 250,25 C270,18 290,12 300,8" fill="none" stroke="rgb(34,197,94)" strokeWidth="2" strokeLinecap="round" />
                                                <circle cx="300" cy="8" r="3" fill="rgb(34,197,94)">
                                                    <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                                                </circle>
                                                {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d, i) => (
                                                    <text key={i} x={i * 50} y="78" fill="rgb(100,116,139)" fontSize="7" textAnchor="middle">{d}</text>
                                                ))}
                                            </svg>
                                        </div>

                                        {/* Live Leads Feed */}
                                        <div className="sm:col-span-2 bg-slate-800/50 border border-slate-700/40 rounded-xl p-3">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="text-slate-300 text-xs font-semibold">Neue Leads</div>
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                {[
                                                    { name: 'Badezimmer sanieren', loc: 'Zürich', val: 'CHF 5\'200', t: 'vor 3 Min' },
                                                    { name: 'Küche montieren', loc: 'Bern', val: 'CHF 2\'800', t: 'vor 8 Min' },
                                                    { name: 'Wand streichen', loc: 'Luzern', val: 'CHF 900', t: 'vor 15 Min' },
                                                ].map((l, i) => (
                                                    <div key={i} className="bg-slate-900/60 border border-slate-700/30 rounded-lg px-3 py-2">
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-white text-[11px] font-semibold">{l.name}</div>
                                                            <div className="text-green-400 text-[10px] font-bold">{l.val}</div>
                                                        </div>
                                                        <div className="text-slate-500 text-[9px] mt-0.5">{l.loc} · {l.t}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Notification - top right */}
                            <div className="absolute -top-3 -right-2 sm:-right-4 bg-white rounded-xl shadow-2xl px-4 py-3 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-sm">📩</div>
                                    <div>
                                        <div className="text-slate-900 text-xs font-bold">Neuer Lead!</div>
                                        <div className="text-slate-400 text-[10px]">Badezimmer · Zürich · jetzt</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats Banner */}
                    <div className={`mt-16 lg:mt-20 transition-all duration-1000 delay-500 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="relative border-t border-slate-800/80">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800/80">
                                {[
                                    { value: 'CHF 0.-', label: 'Monatliche Kosten', desc: 'Keine versteckten Gebühren' },
                                    { value: '0%', label: 'Provision', desc: 'Sie behalten 100% Ihres Umsatzes' },
                                    { value: '<5 Min', label: 'Bis zum ersten Lead', desc: 'Schnelle Registrierung' },
                                    { value: '94%', label: 'Zufriedenheit', desc: 'Basierend auf 2\'400+ Bewertungen' },
                                ].map((item, i) => (
                                    <div key={i} className="px-6 py-6 text-center group hover:bg-slate-800/30 transition-colors duration-300">
                                        <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-1">{item.value}</div>
                                        <div className="text-white text-sm font-semibold mb-1">{item.label}</div>
                                        <div className="text-slate-500 text-xs">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom wave transition */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
                        <path d="M0,60 L0,30 C240,50 480,10 720,30 C960,50 1200,10 1440,30 L1440,60 Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* ══════════ 3 SCHRITTE - STYLE WIE HOME PAGE ══════════ */}
            <section ref={stepsRef} className="relative py-12 sm:py-28 lg:py-36 overflow-hidden bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
                    {/* Header */}
                    <div className={`text-center mb-8 sm:mb-16 lg:mb-20 transition-all duration-1000 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 mb-3 sm:mb-4 leading-tight lg:whitespace-nowrap">
                            In 3 Schritten zum{' '}
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                                nächsten Auftrag
                                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                                    <path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradientProvider)" strokeWidth="4" strokeLinecap="round"/>
                                    <defs>
                                        <linearGradient id="underlineGradientProvider" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#16a34a"/>
                                            <stop offset="50%" stopColor="#10b981"/>
                                            <stop offset="100%" stopColor="#14b8a6"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-slate-600 mx-auto lg:whitespace-nowrap max-w-xs sm:max-w-none">
                            Vom Lead zum zufriedenen Kunden — transparent, fair und ohne Provision
                        </p>
                    </div>

                    {/* ===== MOBILE ONLY: Scroll Cards ===== */}
                    <div className="sm:hidden -mx-4">
                        <div className="flex gap-4 pl-4 pr-8 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide">
                            {[
                                {
                                    number: '1', emoji: '🔍', title: 'Lead prüfen & kaufen',
                                    time: '2 Minuten', desc: 'Durchstöbern Sie den Live-Marktplatz und wählen Sie passende Anfragen aus Ihrer Region.',
                                    features: ['Live-Marktplatz', 'Regionale Filterung', 'Transparente Preise'],
                                    gradient: 'from-green-200 via-green-300 to-emerald-200', chipBg: 'bg-green-100 text-green-700', checkBg: 'bg-green-500 border-green-500',
                                    swissValue: 'Faire Preise',
                                },
                                {
                                    number: '2', emoji: '📞', title: 'Direkt Kontakt aufnehmen',
                                    time: 'Sofort', desc: 'Nach dem Kauf erhalten Sie sofort alle Kontaktdaten. Rufen Sie an oder schreiben Sie eine Nachricht.',
                                    features: ['Sofort Kontaktdaten', 'Telefon & E-Mail', 'Schnelle Reaktion'],
                                    gradient: 'from-emerald-200 via-emerald-300 to-teal-200', chipBg: 'bg-emerald-100 text-emerald-700', checkBg: 'bg-emerald-500 border-emerald-500',
                                    swissValue: 'Direkter Draht',
                                },
                                {
                                    number: '3', emoji: '✅', title: 'Auftrag gewinnen',
                                    time: '100% Gewinn', desc: 'Überzeugen Sie mit Ihrer Expertise. 100% Ihr Gewinn — keine Provision, keine versteckten Kosten.',
                                    features: ['100% Ihr Gewinn', '0% Provision', 'Keine versteckten Kosten'],
                                    gradient: 'from-teal-200 via-teal-300 to-cyan-200', chipBg: 'bg-teal-100 text-teal-700', checkBg: 'bg-teal-500 border-teal-500',
                                    swissValue: 'Null Provision',
                                },
                            ].map((step, index) => (
                                <div
                                    key={index}
                                    className={`snap-center flex-shrink-0 w-[80vw] transition-all duration-700 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: `${index * 160}ms` }}
                                >
                                    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden">
                                        <div className={`h-24 relative bg-gradient-to-r ${step.gradient}`}>
                                            <div className="absolute inset-0 opacity-[0.15]" style={{
                                                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                                                backgroundSize: '16px 16px'
                                            }} />
                                        </div>
                                        <div className="relative -mt-7 ml-5 mb-3">
                                            <div className="w-14 h-14 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-3xl">
                                                {step.emoji}
                                            </div>
                                        </div>
                                        <div className="px-5 pb-5 flex flex-col flex-1">
                                            <h3 className="text-slate-900 font-extrabold text-[19px] leading-tight mb-1">{step.title}</h3>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${step.chipBg}`}>
                                                    Schritt {step.number}
                                                </span>
                                                <span className="text-slate-300 text-[10px]">|</span>
                                                <span className="text-slate-400 text-[10px] font-medium">{step.time}</span>
                                            </div>
                                            <p className="text-slate-500 text-[13px] leading-relaxed mb-4 flex-1">{step.desc}</p>
                                            <div className="space-y-2 border-t border-slate-100 pt-3">
                                                {step.features.map((f, i) => (
                                                    <div key={i} className="flex items-center gap-2.5">
                                                        <div className={`w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0 border ${step.checkBg}`}>
                                                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M1.5 5L4 7.5L8.5 2.5" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-slate-700 text-[12.5px] font-medium">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-2">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'w-7 bg-green-500' : 'w-1.5 bg-slate-200'}`} />
                            ))}
                        </div>
                    </div>

                    {/* ===== DESKTOP ONLY: Card Grid ===== */}
                    <div className="hidden sm:grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                        {[
                            {
                                emoji: '🔍', title: 'Lead prüfen & kaufen',
                                desc: 'Durchstöbern Sie den Live-Marktplatz und wählen Sie passende Anfragen aus Ihrer Region.',
                                features: ['Live-Marktplatz', 'Regionale Filterung', 'Transparente Preise'],
                                gradient: 'from-green-500 to-emerald-500', bgGradient: 'from-green-50 to-emerald-50',
                                swissValue: 'Faire Preise',
                            },
                            {
                                emoji: '📞', title: 'Direkt Kontakt aufnehmen',
                                desc: 'Nach dem Kauf erhalten Sie sofort alle Kontaktdaten. Rufen Sie an oder schreiben Sie eine Nachricht.',
                                features: ['Sofort Kontaktdaten', 'Telefon & E-Mail', 'Schnelle Reaktion'],
                                gradient: 'from-emerald-500 to-teal-500', bgGradient: 'from-emerald-50 to-teal-50',
                                swissValue: 'Direkter Draht',
                            },
                            {
                                emoji: '✅', title: 'Auftrag gewinnen',
                                desc: 'Überzeugen Sie mit Ihrer Expertise. 100% Ihr Gewinn — keine Provision, keine versteckten Kosten.',
                                features: ['100% Ihr Gewinn', '0% Provision', 'Keine versteckten Kosten'],
                                gradient: 'from-teal-500 to-cyan-500', bgGradient: 'from-teal-50 to-cyan-50',
                                swissValue: 'Null Provision',
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className={`relative transition-all duration-1000 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="relative h-full bg-white rounded-3xl p-6 lg:p-8 border-2 border-green-200 shadow-xl hover:shadow-2xl hover:border-green-300 transition-all duration-300 group">
                                    {/* Icon */}
                                    <div className="text-center mb-6">
                                        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl bg-gradient-to-br ${step.bgGradient} border-2 border-green-200 transition-all duration-300 group-hover:scale-105`}>
                                            {step.emoji}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl lg:text-2xl font-black text-slate-900 text-center group-hover:text-green-700 transition-colors duration-300">
                                        {step.title}
                                    </h3>

                                    {/* Swiss Value Badge */}
                                    <div className="flex justify-center mt-4">
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${step.bgGradient} border border-green-200 text-xs font-bold text-green-700`}>
                                            <SwissFlagIcon className="w-3.5 h-3.5" />
                                            {step.swissValue}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 leading-relaxed text-sm lg:text-base text-center mt-4">
                                        {step.desc}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 pt-4 mt-4 border-t border-green-100">
                                        {step.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className={`flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center bg-gradient-to-br ${step.bgGradient} border border-green-200`}>
                                                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-slate-600">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} rounded-b-3xl`} />
                                </div>

                                {/* Connecting Arrow (Desktop) */}
                                {index < 2 && (
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

            {/* ══════════ VORTEILE - VORHER/NACHHER ══════════ */}
            <section ref={benefitsRef} className={`py-20 sm:py-28 bg-slate-50 transition-all duration-700 ${benefitsInView ? 'opacity-100' : 'opacity-0'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className={`text-center mb-14 transition-all duration-1000 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm font-semibold text-green-700 mb-5">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Ihre Vorteile
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            Was sich mit Fertigo{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">ändert</span>
                        </h2>
                    </div>

                    {/* Vergleich */}
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
                                style={{ transitionDelay: `${200 + i * 80}ms` }}
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

                                {/* Mobile */}
                                <div className="sm:hidden p-4">
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <span className="text-xl">{row.emoji}</span>
                                        <span className="text-xs font-black text-slate-900 uppercase tracking-wider">{row.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <svg className="w-3.5 h-3.5 text-red-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                                        <span className="text-slate-400 text-xs line-through">{row.before}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                                        <span className="text-green-700 text-sm font-bold">{row.after}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pricing Strip */}
                    <div className={`mt-10 grid grid-cols-3 gap-3 sm:gap-5 transition-all duration-1000 delay-500 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {[
                            { icon: '💰', title: 'Pay-per-Lead', desc: 'Keine monatlichen Gebühren' },
                            { icon: '🔒', title: '0% Provision', desc: '100% Ihr Gewinn' },
                            { icon: '🚫', title: 'Kein Abo', desc: 'Jederzeit kündbar' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-center hover:border-green-200 hover:shadow-sm transition-all duration-300">
                                <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
                                <h4 className="font-black text-slate-900 text-xs sm:text-sm mb-0.5">{item.title}</h4>
                                <p className="text-slate-400 text-[10px] sm:text-xs">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ BELIEBTE KATEGORIEN ══════════ */}
            <section ref={categoriesRef} className={`py-20 sm:py-28 bg-white transition-all duration-700 ${categoriesInView ? 'opacity-100' : 'opacity-0'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className={`text-center mb-14 transition-all duration-1000 ${categoriesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm font-semibold text-green-700 mb-5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            50+ Branchen
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            Beliebte{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Kategorien</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-xl mx-auto">
                            Anfragen aus über 50 Branchen warten auf Sie
                        </p>
                    </div>

                    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 transition-all duration-1000 delay-200 ${categoriesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {[
                            { emoji: '🎨', name: 'Maler & Gipser', leads: '320+', bg: 'from-orange-50 to-amber-50', border: 'border-orange-100 hover:border-orange-300' },
                            { emoji: '⚡', name: 'Elektriker', leads: '280+', bg: 'from-yellow-50 to-amber-50', border: 'border-yellow-100 hover:border-yellow-300' },
                            { emoji: '🔧', name: 'Sanitär & Heizung', leads: '250+', bg: 'from-blue-50 to-cyan-50', border: 'border-blue-100 hover:border-blue-300' },
                            { emoji: '🏗️', name: 'Bauunternehmen', leads: '210+', bg: 'from-slate-50 to-gray-50', border: 'border-slate-100 hover:border-slate-300' },
                            { emoji: '🪵', name: 'Schreiner', leads: '190+', bg: 'from-amber-50 to-orange-50', border: 'border-amber-100 hover:border-amber-300' },
                            { emoji: '🧹', name: 'Reinigung', leads: '350+', bg: 'from-cyan-50 to-teal-50', border: 'border-cyan-100 hover:border-cyan-300' },
                            { emoji: '🌿', name: 'Garten & Landschaft', leads: '270+', bg: 'from-green-50 to-emerald-50', border: 'border-green-100 hover:border-green-300' },
                            { emoji: '🏠', name: 'Umzug & Transport', leads: '230+', bg: 'from-indigo-50 to-purple-50', border: 'border-indigo-100 hover:border-indigo-300' },
                        ].map((cat, i) => (
                            <div
                                key={i}
                                className={`group bg-gradient-to-br ${cat.bg} rounded-2xl p-5 sm:p-6 border-2 ${cat.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-2xl sm:text-3xl">{cat.emoji}</span>
                                </div>
                                <div className="font-black text-slate-900 text-sm sm:text-base mb-1">{cat.name}</div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span className="text-green-600 text-xs font-bold">{cat.leads} Leads/Mt.</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* ══════════ IHRE TOOLS AUF UNSERER PLATTFORM ══════════ */}
            <section ref={toolsRef} className="relative py-20 sm:py-28 bg-slate-950 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(34,197,94,0.08),transparent)]" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
                    {/* Header */}
                    <div className={`text-center mb-14 transition-all duration-1000 ${toolsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm font-semibold text-green-400 mb-5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>
                            Alles in einer App
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                            Ihre Tools.{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Unsere Plattform.</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Alles was Sie für Ihren Arbeitsalltag brauchen — gebündelt in einem übersichtlichen Dashboard.
                        </p>
                    </div>

                    {/* Tools Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {/* Tool 1 - Lead-Marktplatz (Large) */}
                        <div className={`lg:col-span-2 group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-green-500/40 transition-all duration-500 ${toolsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all duration-500" />
                            <div className="relative">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center text-2xl">
                                        🛒
                                    </div>
                                    <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">BELIEBTESTES TOOL</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Lead-Marktplatz</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
                                    Durchstöbern Sie qualifizierte Kundenanfragen in Echtzeit. Filtern Sie nach Region, Branche und Budget — und kaufen Sie nur die Leads, die wirklich zu Ihrem Betrieb passen.
                                </p>
                                {/* Mini Preview */}
                                <div className="bg-slate-950/60 rounded-xl border border-slate-700/40 p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" /></span>
                                        <span className="text-slate-500 text-xs font-medium">3 neue Leads verfügbar</span>
                                    </div>
                                    <div className="space-y-2">
                                        {[
                                            { title: 'Badezimmer komplett sanieren', loc: 'Zürich 8001', price: 'CHF 12\'500', time: 'vor 2 Min' },
                                            { title: 'Küche montieren & anschliessen', loc: 'Bern 3011', price: 'CHF 4\'800', time: 'vor 8 Min' },
                                        ].map((lead, i) => (
                                            <div key={i} className="flex items-center justify-between bg-slate-900/80 rounded-lg px-3 py-2.5 border border-slate-700/30">
                                                <div>
                                                    <div className="text-white text-xs font-semibold">{lead.title}</div>
                                                    <div className="text-slate-500 text-[10px]">{lead.loc} · {lead.time}</div>
                                                </div>
                                                <div className="text-green-400 text-xs font-bold">{lead.price}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tool 2 - Auftragskalender */}
                        <div className={`group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/40 transition-all duration-500 ${toolsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-2xl mb-5">
                                    📅
                                </div>
                                <h3 className="text-lg font-black text-white mb-2">Auftragskalender</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                                    Planen Sie Ihre Aufträge visuell. Drag & Drop, Erinnerungen und automatische Kunden-Benachrichtigungen.
                                </p>
                                {/* Mini Calendar */}
                                <div className="bg-slate-950/60 rounded-xl border border-slate-700/40 p-3">
                                    <div className="grid grid-cols-7 gap-1 text-center">
                                        {['Mo','Di','Mi','Do','Fr','Sa','So'].map(d => (
                                            <div key={d} className="text-slate-600 text-[8px] font-bold">{d}</div>
                                        ))}
                                        {[10,11,12,13,14,15,16].map(d => (
                                            <div key={d} className={`text-[10px] py-1 rounded ${d === 12 || d === 14 ? 'bg-green-500/20 text-green-400 font-bold' : d === 13 ? 'bg-blue-500/20 text-blue-400 font-bold' : 'text-slate-500'}`}>
                                                {d}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tool 3 - Offerten-Generator */}
                        <div className={`group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-amber-500/40 transition-all duration-500 ${toolsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all duration-500" />
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 flex items-center justify-center text-2xl mb-5">
                                    📝
                                </div>
                                <h3 className="text-lg font-black text-white mb-2">Offerten-Generator</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                                    Erstellen Sie professionelle Offerten in Sekunden. Mit Ihrem Logo, individuellen Positionen und PDF-Export.
                                </p>
                                {/* Mini Offerte */}
                                <div className="bg-slate-950/60 rounded-xl border border-slate-700/40 p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-[10px] text-slate-500 font-medium">Offerte #2024-047</div>
                                        <div className="text-[9px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">ENTWURF</div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-[10px]"><span className="text-slate-400">Badezimmer Plättli</span><span className="text-white font-semibold">CHF 3'200</span></div>
                                        <div className="flex justify-between text-[10px]"><span className="text-slate-400">Material & Zubehör</span><span className="text-white font-semibold">CHF 1'850</span></div>
                                        <div className="border-t border-slate-700/40 pt-1.5 flex justify-between text-[10px]"><span className="text-slate-300 font-bold">Total</span><span className="text-green-400 font-bold">CHF 5'050</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tool 4 - Bewertungen */}
                        <div className={`group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-purple-500/40 transition-all duration-500 ${toolsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-500" />
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-2xl mb-5">
                                    ⭐
                                </div>
                                <h3 className="text-lg font-black text-white mb-2">Bewertungs-Manager</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                                    Sammeln Sie verifizierte Kundenbewertungen automatisch. Steigern Sie Ihre Sichtbarkeit und gewinnen Sie Vertrauen.
                                </p>
                                {/* Mini Reviews */}
                                <div className="bg-slate-950/60 rounded-xl border border-slate-700/40 p-3 space-y-2">
                                    {[
                                        { name: 'S. Müller', stars: 5, text: 'Top Arbeit, sehr zuverlässig!' },
                                        { name: 'R. Weber', stars: 5, text: 'Pünktlich und sauber.' },
                                    ].map((r, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-[8px] font-bold text-purple-300 flex-shrink-0">{r.name[0]}</div>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-white text-[10px] font-semibold">{r.name}</span>
                                                    <div className="flex">{Array.from({ length: r.stars }).map((_, j) => <span key={j} className="text-amber-400 text-[8px]">★</span>)}</div>
                                                </div>
                                                <p className="text-slate-500 text-[9px]">{r.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tool 5 - Statistiken & Auswertungen (Large) */}
                        <div className={`lg:col-span-2 group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-emerald-500/40 transition-all duration-500 ${toolsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
                            <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-500" />
                            <div className="relative">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl">
                                        📊
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">LIVE-DATEN</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Statistiken & Auswertungen</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
                                    Behalten Sie den Überblick über Ihren Umsatz, Ihre Erfolgsrate und Ihr Wachstum. Datenbasierte Entscheidungen für Ihren Betrieb.
                                </p>
                                {/* Mini Chart */}
                                <div className="bg-slate-950/60 rounded-xl border border-slate-700/40 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-slate-300 text-xs font-semibold">Monatlicher Umsatz</span>
                                        <span className="text-green-400 text-[10px] font-bold bg-green-500/10 px-2 py-0.5 rounded-full">+24% ↑</span>
                                    </div>
                                    <div className="flex items-end gap-1.5 h-16">
                                        {[35, 42, 38, 55, 48, 62, 58, 72, 68, 78, 85, 92].map((h, i) => (
                                            <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-green-500/40 to-emerald-400/60 hover:from-green-500/60 hover:to-emerald-400/80 transition-colors duration-200" style={{ height: `${h}%` }} />
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-slate-600 text-[8px]">Jan</span>
                                        <span className="text-slate-600 text-[8px]">Jun</span>
                                        <span className="text-slate-600 text-[8px]">Dez</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${toolsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <p className="text-slate-500 text-sm mb-5">Alle Tools kostenlos in Ihrem Dashboard verfügbar</p>
                        <Link
                            to="/register"
                            className="group inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-slate-950 font-bold px-8 py-4 rounded-2xl text-base shadow-lg shadow-green-500/25 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Jetzt kostenlos entdecken
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══════════ FAQ ══════════ */}
            <section ref={faqRef} className={`py-20 sm:py-28 bg-white transition-all duration-700 ${faqInView ? 'opacity-100' : 'opacity-0'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <div className={`text-center mb-12 transition-all duration-1000 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3">
                            Häufige{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Fragen</span>
                        </h2>
                        <p className="text-slate-500 text-lg">Alles, was Sie wissen müssen</p>
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
                                className={`bg-slate-50 rounded-2xl border transition-all duration-300 ${openFaq === i ? 'border-green-200 shadow-md bg-white' : 'border-slate-200'}`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">{item.q}</span>
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-green-500 rotate-45' : 'bg-slate-200'}`}>
                                        <svg className={`w-4 h-4 transition-colors ${openFaq === i ? 'text-white' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48 pb-5' : 'max-h-0'}`}>
                                    <p className="px-5 text-slate-500 text-sm leading-relaxed">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ CTA ══════════ */}
            <section ref={ctaRef} className="relative py-20 sm:py-28 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/[0.05] rounded-full blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
                    <div className={`text-center transition-all duration-1000 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
                            <SwissFlagIcon className="w-4 h-4" />
                            <span className="text-white/80 text-sm font-semibold">100% Schweizer Qualität</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                            Bereit für mehr Aufträge?
                        </h2>
                        <p className="text-white/60 text-lg mb-10 max-w-md mx-auto">
                            Starten Sie kostenlos und erhalten Sie Ihre ersten Leads noch heute.
                        </p>
                        <Link
                            to="/register"
                            className="group inline-flex items-center gap-2 bg-white text-green-700 font-black px-10 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Jetzt kostenlos starten
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="mt-4 text-white/40 text-sm">Keine Kreditkarte erforderlich</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProvidersPage;
