import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon, SwissFlagIcon } from '../components/icons';

const ProvidersPage: React.FC = () => {
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: stepsRef, inView: stepsInView } = useInView({ triggerOnce: true, threshold: 0.05 });
    const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: categoriesRef, inView: categoriesInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [openFaq, setOpenFaq] = React.useState<number | null>(null);

    return (
        <div className="mx-auto overflow-hidden">

            {/* ══════════ HERO – ASYMMETRIC SPLIT SHOWCASE ══════════ */}
            <section ref={heroRef} className="relative overflow-hidden bg-slate-950 min-h-[100vh]">
                {/* ── Background ── */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                    <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-green-500/[0.04] via-emerald-500/[0.02] to-transparent" />
                    <div className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-gradient-to-tr from-green-600/[0.06] to-transparent blur-[80px]" />
                    <div className="absolute top-20 right-[20%] w-[350px] h-[350px] border border-green-500/[0.06] rounded-full" />
                    <div className="absolute top-40 right-[15%] w-[500px] h-[500px] border border-emerald-500/[0.04] rounded-full" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                        {/* ── LEFT: Content ── */}
                        <div className={`lg:col-span-5 xl:col-span-5 transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full px-4 py-2 mb-7">
                                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" /></span>
                                <span className="text-white/60 text-xs font-medium">Bereits <span className="text-green-400 font-semibold">2'847</span> Handwerker aktiv</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
                                Leads erhalten.{' '}
                                <span className="hero-gradient-text">Umsatz steigern.</span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                                Fertigo verbindet Sie mit Kunden, die genau Ihren Service brauchen. Ohne Abo-Fallen, ohne Provision – direkt und transparent.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-start gap-3 mb-10">
                                <Link to="/register" className="group inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-green-500/20 hover:shadow-green-400/25 hover:-translate-y-0.5 transition-all duration-300">
                                    Kostenlos registrieren
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <a href="#so-funktionierts" className="group inline-flex items-center gap-2.5 text-white/60 hover:text-white font-medium text-sm px-5 py-3.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    So funktioniert's
                                </a>
                            </div>

                            {/* Inline Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { value: 'CHF 0.–', label: 'Monatlich' },
                                    { value: '0%', label: 'Provision' },
                                    { value: '<5 Min', label: 'Zum Lead' },
                                ].map((s, i) => (
                                    <div key={i} className="text-center py-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                                        <div className="text-white font-black text-lg sm:text-xl leading-none">{s.value}</div>
                                        <div className="text-slate-500 text-[10px] sm:text-xs font-medium mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT: Dashboard Showcase ── */}
                        <div className={`lg:col-span-7 xl:col-span-7 relative transition-all duration-1000 delay-300 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent blur-3xl scale-110 rounded-3xl" />

                            {/* ── Premium Dashboard Card Stack ── */}
                            <div className="relative space-y-3">

                                {/* ── Top: Revenue Highlight Card ── */}
                                <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-950/90 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/30 overflow-hidden">
                                    {/* Ambient glow inside card */}
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/[0.06] rounded-full blur-3xl" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/[0.04] rounded-full blur-3xl" />

                                    <div className="relative p-5 sm:p-6">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
                                                </div>
                                                <div>
                                                    <div className="text-white/40 text-[10px] font-medium uppercase tracking-widest">Umsatz diesen Monat</div>
                                                    <div className="text-white font-black text-2xl sm:text-3xl leading-none mt-0.5 tracking-tight">CHF 8'400</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5">
                                                <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>
                                                <span className="text-green-400 text-[11px] font-bold">+18%</span>
                                            </div>
                                        </div>

                                        {/* Mini Revenue Chart */}
                                        <div className="relative h-20 mb-1">
                                            <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                                                <defs>
                                                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="rgb(74,222,128)" stopOpacity="0.3" />
                                                        <stop offset="100%" stopColor="rgb(74,222,128)" stopOpacity="0" />
                                                    </linearGradient>
                                                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                                        <stop offset="0%" stopColor="rgb(52,211,153)" />
                                                        <stop offset="100%" stopColor="rgb(74,222,128)" />
                                                    </linearGradient>
                                                </defs>
                                                <path d="M0 65 Q30 58 60 52 T120 40 T180 45 T240 30 T300 20 T360 22 T400 10" fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" />
                                                <path d="M0 65 Q30 58 60 52 T120 40 T180 45 T240 30 T300 20 T360 22 T400 10 L400 80 L0 80 Z" fill="url(#chartGrad)" />
                                                {/* Data points */}
                                                <circle cx="120" cy="40" r="3" fill="rgb(74,222,128)" opacity="0.6" />
                                                <circle cx="240" cy="30" r="3" fill="rgb(74,222,128)" opacity="0.6" />
                                                <circle cx="400" cy="10" r="4" fill="rgb(74,222,128)">
                                                    <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                                                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                                                </circle>
                                            </svg>
                                            {/* Chart labels */}
                                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-slate-600 font-medium px-1">
                                                <span>Jan</span><span>Feb</span><span>Mär</span><span>Apr</span><span>Mai</span><span>Jun</span><span>Jul</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Middle Row: Stats Grid ── */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: '24', label: 'Neue Leads', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>, change: '+6', color: 'from-green-400 to-emerald-500' },
                                        { value: '94%', label: 'Erfolgsquote', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>, change: '+3%', color: 'from-emerald-400 to-teal-500' },
                                        { value: '<5m', label: 'Reaktionszeit', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>, change: 'Top', color: 'from-teal-400 to-cyan-500' },
                                    ].map((stat, i) => (
                                        <div key={i} className="relative bg-slate-800/60 backdrop-blur-xl rounded-xl border border-white/[0.06] p-4 overflow-hidden group hover:border-white/[0.12] transition-all duration-300">
                                            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.color} opacity-[0.06] rounded-full blur-2xl group-hover:opacity-[0.12] transition-opacity`} />
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3 shadow-lg`} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                                                {stat.icon}
                                            </div>
                                            <div className="text-white font-black text-xl leading-none">{stat.value}</div>
                                            <div className="text-slate-500 text-[9px] font-medium uppercase tracking-wider mt-1">{stat.label}</div>
                                            <div className="flex items-center gap-1 mt-2">
                                                <div className="w-1 h-1 rounded-full bg-green-400" />
                                                <span className="text-green-400 text-[9px] font-bold">{stat.change}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* ── Bottom: Live Leads Ticker ── */}
                                <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-white/[0.06] overflow-hidden">
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-5 pt-4 pb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                            </span>
                                            <span className="text-white text-xs font-bold">Live-Anfragen</span>
                                            <span className="bg-green-500/15 text-green-400 text-[9px] font-bold px-2 py-0.5 rounded-full">3 neu</span>
                                        </div>
                                    </div>

                                    {/* Lead Items */}
                                    <div className="px-4 pb-4 space-y-1.5">
                                        {[
                                            { emoji: '🛁', name: 'Badezimmer sanieren', loc: 'Zürich', val: 'CHF 5\'200', time: 'Jetzt', urgent: true },
                                            { emoji: '🔧', name: 'Küche montieren', loc: 'Bern', val: 'CHF 2\'800', time: '8 Min', urgent: false },
                                            { emoji: '🎨', name: 'Wand streichen', loc: 'Luzern', val: 'CHF 900', time: '15 Min', urgent: false },
                                        ].map((lead, i) => (
                                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${lead.urgent ? 'bg-green-500/[0.08] border border-green-500/20 shadow-sm shadow-green-500/5' : 'bg-white/[0.02] border border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]'}`}>
                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${lead.urgent ? 'bg-green-500/15 shadow-inner' : 'bg-white/[0.04]'}`}>
                                                    {lead.emoji}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white text-[11px] font-semibold truncate">{lead.name}</span>
                                                        {lead.urgent && (
                                                            <span className="flex-shrink-0 bg-green-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Neu</span>
                                                        )}
                                                    </div>
                                                    <div className="text-slate-500 text-[9px] mt-0.5">📍 {lead.loc} · {lead.time}</div>
                                                </div>
                                                <div className={`text-xs font-black flex-shrink-0 ${lead.urgent ? 'text-green-400' : 'text-slate-400'}`}>{lead.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>


                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

                {/* CSS Animations */}
                <style>{`
                    .hero-gradient-text {
                        background: linear-gradient(135deg, #4ade80 0%, #34d399 40%, #2dd4bf 70%, #4ade80 100%);
                        background-size: 300% 300%;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: hero-shimmer 8s ease-in-out infinite;
                    }
                    @keyframes hero-shimmer {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                    .hero-float {
                        animation: hero-bob 6s ease-in-out infinite;
                    }
                    @keyframes hero-bob {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `}</style>
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
                                    <path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradientProvider)" strokeWidth="4" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="underlineGradientProvider" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#16a34a" />
                                            <stop offset="50%" stopColor="#10b981" />
                                            <stop offset="100%" stopColor="#14b8a6" />
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
