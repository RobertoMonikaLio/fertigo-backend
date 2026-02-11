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
    const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [openFaq, setOpenFaq] = React.useState<number | null>(null);

    return (
        <div className="mx-auto overflow-hidden">

            {/* ══════════ HERO - SPLIT SCREEN DESIGN ══════════ */}
            <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
                {/* Linke Seite - Dunkel */}
                <div className="absolute inset-0 lg:w-1/2 bg-slate-900">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                
                {/* Rechte Seite - Grün */}
                <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-20 right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-300/20 rounded-full blur-3xl" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen py-24 lg:py-0">
                        
                        {/* Linke Spalte - Text */}
                        <div className={`lg:pr-16 xl:pr-24 transition-all duration-1000 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-3 mb-8">
                                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                    </span>
                                    <span className="text-green-400 text-sm font-bold">Live — 47 neue Leads</span>
                                </div>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6">
                                Der schnellste
                                <br />
                                Weg zu{' '}
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Aufträgen</span>
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                        <path d="M2 8C50 2 150 2 198 8" stroke="url(#underline-gradient)" strokeWidth="4" strokeLinecap="round" />
                                        <defs>
                                            <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                                                <stop stopColor="#22c55e" />
                                                <stop offset="1" stopColor="#10b981" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                            </h1>

                            <p className="text-white/50 text-lg sm:text-xl leading-relaxed max-w-md mb-10">
                                Qualifizierte Kundenanfragen aus Ihrer Region. 
                                <span className="text-white font-semibold"> Ohne Abo. Ohne Provision. 100% Ihr Gewinn.</span>
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link
                                    to="/register"
                                    className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-black px-8 py-4 rounded-2xl text-lg shadow-2xl shadow-green-500/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span>Kostenlos starten</span>
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </Link>
                                <Link
                                    to="/so-funktionierts"
                                    className="group inline-flex items-center justify-center gap-2 text-white/70 hover:text-white font-bold px-6 py-4 rounded-2xl text-lg transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <span>So funktioniert's</span>
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex items-center gap-6 pt-8 border-t border-white/10">
                                <div className="flex -space-x-3">
                                    {['🧑‍🔧', '👷', '🧑‍🏭', '👨‍🔬'].map((emoji, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-lg">
                                            {emoji}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 mb-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-white/40 text-sm"><span className="text-white font-bold">2'400+</span> zufriedene Handwerker</p>
                                </div>
                            </div>
                        </div>

                        {/* Rechte Spalte - Bild & Cards */}
                        <div className={`relative lg:pl-8 transition-all duration-1000 delay-300 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            {/* Floating Stats Card - Oben Links */}
                            <div className="absolute top-8 -left-4 lg:left-0 z-20 bg-white rounded-2xl shadow-2xl p-4 animate-float">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                        <span className="text-2xl">📈</span>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-slate-900">+127%</div>
                                        <div className="text-slate-500 text-xs">mehr Aufträge</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats Card - Unten Rechts */}
                            <div className="absolute bottom-16 -right-4 lg:right-8 z-20 bg-white rounded-2xl shadow-2xl p-4 animate-float-delayed">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                        <span className="text-2xl">⚡</span>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-slate-900">5 Min</div>
                                        <div className="text-slate-500 text-xs">Setup-Zeit</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Lead Card - Mitte Links */}
                            <div className="absolute top-1/2 -translate-y-1/2 -left-8 lg:-left-4 z-20 bg-slate-900 rounded-2xl shadow-2xl p-4 border border-white/10 animate-float-slow hidden sm:block">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                                        <span className="text-lg">🛁</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Neuer Lead!</div>
                                        <div className="text-white/50 text-xs">vor 2 Min.</div>
                                    </div>
                                </div>
                                <div className="text-xs text-white/60">Badezimmer Renovation</div>
                                <div className="text-green-400 font-bold text-sm">📍 Zürich</div>
                            </div>

                            {/* Hauptbild */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent rounded-3xl" />
                                <img
                                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/45c6d003-83de-48d7-81d6-f98a7eb703fd/Gemini_Generated_Image_odao5jodao5jodao-removebg-preview-1769627881340.png?width=8000&height=8000&resize=contain"
                                    alt="Fertigo Maskottchen"
                                    className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
                                />
                            </div>

                            {/* Bottom Stats Row */}
                            <div className="flex justify-center gap-6 mt-8">
                                {[
                                    { val: '0%', label: 'Provision' },
                                    { val: 'CHF 0.-', label: 'Monatl. Kosten' },
                                    { val: '1200+', label: 'Leads/Monat' },
                                ].map((s, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-xl sm:text-2xl font-black text-white">{s.val}</div>
                                        <div className="text-white/60 text-xs">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom CSS for floating animation */}
                <style>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    @keyframes float-delayed {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-8px); }
                    }
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(-50%); }
                        50% { transform: translateY(calc(-50% - 12px)); }
                    }
                    .animate-float { animation: float 4s ease-in-out infinite; }
                    .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite 1s; }
                    .animate-float-slow { animation: float-slow 6s ease-in-out infinite 0.5s; }
                `}</style>
            </section>

            {/* ══════════ 3 SCHRITTE - KARTEN DESIGN ══════════ */}
            <section ref={stepsRef} className="py-20 sm:py-28 lg:py-32 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    {/* Header */}
                    <div className={`text-center mb-16 transition-all duration-1000 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm font-semibold text-green-700 mb-5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            So einfach geht's
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            In drei Schritten zum{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Auftrag</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-xl mx-auto">
                            Vom Lead zum zufriedenen Kunden — transparent und fair.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                num: '01', emoji: '🔍', title: 'Lead prüfen & kaufen',
                                desc: 'Durchstöbern Sie den Live-Marktplatz und wählen Sie passende Anfragen aus Ihrer Region.',
                                features: ['Live-Marktplatz', 'Regionale Filterung', 'Transparente Preise'],
                                color: 'green',
                            },
                            {
                                num: '02', emoji: '📞', title: 'Direkt Kontakt aufnehmen',
                                desc: 'Nach dem Kauf erhalten Sie sofort alle Kontaktdaten. Rufen Sie an oder schreiben Sie eine Nachricht.',
                                features: ['Sofort Kontaktdaten', 'Telefon & E-Mail', 'Schnelle Reaktion'],
                                color: 'emerald',
                            },
                            {
                                num: '03', emoji: '✅', title: 'Auftrag gewinnen',
                                desc: 'Überzeugen Sie mit Ihrer Expertise. 100% Ihr Gewinn — keine Provision, keine versteckten Kosten.',
                                features: ['100% Ihr Gewinn', '0% Provision', 'Keine versteckten Kosten'],
                                color: 'teal',
                            },
                        ].map((step, i) => (
                            <div
                                key={i}
                                className={`group relative bg-white border-2 border-slate-100 hover:border-green-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${200 + i * 150}ms` }}
                            >
                                {/* Nummer */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="text-6xl font-black text-slate-100 group-hover:text-green-100 transition-colors">{step.num}</div>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                                        {step.emoji}
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">{step.desc}</p>

                                <div className="space-y-2.5 pt-5 border-t border-slate-100">
                                    {step.features.map((f, j) => (
                                        <div key={j} className="flex items-center gap-2.5">
                                            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                            <span className="text-slate-600 text-sm font-medium">{f}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Verbindungspfeil (Desktop) */}
                                {i < 2 && (
                                    <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border-2 border-green-200 rounded-full items-center justify-center shadow-sm">
                                        <ArrowRightIcon className="w-4 h-4 text-green-500" />
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

            {/* ══════════ DASHBOARD - NEUES BENTO DESIGN ══════════ */}
            <section ref={dashboardRef} className={`relative py-24 sm:py-32 overflow-hidden bg-slate-900 transition-all duration-700 ${dashboardInView ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="absolute top-[-20%] left-[20%] w-[700px] h-[700px] bg-green-500/[0.08] rounded-full blur-[160px]" />
                    <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-emerald-500/[0.06] rounded-full blur-[140px]" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    {/* Header */}
                    <div className={`text-center mb-16 transition-all duration-1000 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] rounded-full px-4 py-2 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            <span className="text-white/60 text-sm font-bold">Ihre Kommandozentrale</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                            Ihr persönliches{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Dashboard</span>
                        </h2>
                        <p className="text-white/40 text-lg max-w-lg mx-auto">
                            Leads, Statistiken und Aufträge — alles in Echtzeit
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Stats */}
                        <div className={`lg:col-span-2 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 sm:p-8 transition-all duration-1000 delay-200 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-black text-lg flex items-center gap-2">
                                    <span className="text-2xl">📊</span> Übersicht
                                </h3>
                                <span className="text-green-400 text-xs font-bold bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">Live</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { val: '47', label: 'Neue Leads', icon: '📬', change: '+12' },
                                    { val: 'CHF 18k', label: 'Umsatz', icon: '💰', change: '+24%' },
                                    { val: '82%', label: 'Erfolgsrate', icon: '🎯', change: 'Top 10%' },
                                ].map((s, i) => (
                                    <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-green-500/20 transition-all duration-300">
                                        <div className="text-2xl mb-2">{s.icon}</div>
                                        <div className="text-2xl sm:text-3xl font-black text-white">{s.val}</div>
                                        <div className="text-white/40 text-xs mb-1">{s.label}</div>
                                        <span className="text-green-400 text-xs font-bold">{s.change}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className={`bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-2xl p-6 sm:p-8 transition-all duration-1000 delay-300 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h3 className="text-white font-black text-lg flex items-center gap-2 mb-5">
                                <span className="text-2xl">⚡</span> Schnellstart
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Leads durchsuchen', icon: '🔍' },
                                    { label: 'Neue Anfragen', icon: '📋' },
                                    { label: 'Profil bearbeiten', icon: '✏️' },
                                ].map((a, i) => (
                                    <button key={i} className="w-full flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-3.5 transition-all duration-300 group/btn">
                                        <span className="text-lg">{a.icon}</span>
                                        <span className="text-white/60 text-sm font-bold group-hover/btn:text-white transition-colors">{a.label}</span>
                                        <ArrowRightIcon className="w-4 h-4 ml-auto text-white/20 group-hover/btn:text-green-400 group-hover/btn:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Lead Feed */}
                        <div className={`lg:col-span-2 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 sm:p-8 transition-all duration-1000 delay-400 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h3 className="text-white font-black text-lg flex items-center gap-2 mb-5">
                                <span className="text-2xl">🔥</span> Neueste Leads
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { title: 'Badezimmer Renovation', loc: 'Zürich', time: '5 Min.', price: 'CHF 22', icon: '🛁', tag: 'Neu' },
                                    { title: 'Küche Modernisierung', loc: 'Bern', time: '12 Min.', price: 'CHF 28', icon: '🍳', tag: 'Hot' },
                                    { title: 'Garten Neugestaltung', loc: 'Basel', time: '18 Min.', price: 'CHF 35', icon: '🌿', tag: 'Neu' },
                                ].map((lead, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-green-500/20 rounded-xl p-4 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl flex-shrink-0 shadow-lg shadow-green-500/20">
                                            {lead.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h4 className="text-white font-bold text-sm truncate">{lead.title}</h4>
                                                <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-full ${lead.tag === 'Hot' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}`}>{lead.tag}</span>
                                            </div>
                                            <p className="text-white/40 text-xs">📍 {lead.loc} · vor {lead.time}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <div className="text-green-400 font-black text-lg">{lead.price}</div>
                                            <div className="text-white/30 text-[10px]">pro Lead</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Wachstum */}
                        <div className={`bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 sm:p-8 transition-all duration-1000 delay-500 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h3 className="text-white font-black text-lg flex items-center gap-2 mb-5">
                                <span className="text-2xl">📈</span> Wachstum
                            </h3>
                            <div className="relative h-28 mb-5">
                                <div className="absolute inset-0 flex items-end justify-between gap-1.5">
                                    {[35, 55, 40, 70, 50, 85, 65].map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-gradient-to-t from-green-500/40 to-green-500/10 rounded-t-md hover:from-green-500/60 hover:to-green-500/20 transition-all duration-300"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/[0.03] border border-white/[0.05] rounded-lg p-3">
                                    <div className="text-white/40 text-xs">Woche</div>
                                    <div className="text-white font-black text-lg">+34%</div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/[0.05] rounded-lg p-3">
                                    <div className="text-white/40 text-xs">Monat</div>
                                    <div className="text-white font-black text-lg">+127%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className={`mt-14 text-center transition-all duration-1000 delay-600 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <Link
                            to="/register"
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-xl shadow-green-500/25 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Dashboard testen
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="mt-3 text-white/30 text-sm">Kostenlos — Keine Kreditkarte nötig</p>
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
