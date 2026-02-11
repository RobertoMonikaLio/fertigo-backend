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

            {/* ══════════ HERO - HANDWERKER PERSPEKTIVE ══════════ */}
            <section ref={heroRef} className="relative min-h-screen overflow-hidden">
                {/* Warm Light Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-green-50/30" />
                {/* Subtle diagonal stripes */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px)`,
                }} />
                {/* Green accent blob */}
                <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-green-400/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-300/8 rounded-full blur-[100px]" />

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-28 lg:pt-32 pb-16">

                    {/* Top - Centered Intro */}
                    <div className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* Handwerker Badge */}
                        <div className="inline-flex items-center gap-2.5 bg-amber-50 border border-amber-200/60 rounded-full px-5 py-2 mb-8">
                            <span className="text-lg">🔨</span>
                            <span className="text-amber-800 text-sm font-bold uppercase tracking-wide">Für Handwerker & Betriebe</span>
                            <SwissFlagIcon className="w-4 h-4" />
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                            Ihr Werkzeug war noch nie
                            <br />
                            <span className="relative inline-block mt-2">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Ihr Handy.</span>
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 8C50 2 150 2 198 8" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" className="opacity-40" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                            Aufträge kommen direkt zu Ihnen - passend zu Ihrem Fachgebiet und Standort. 
                            Kein Suchen, kein Bitten, <span className="text-slate-800 font-semibold">einfach arbeiten.</span>
                        </p>
                    </div>

                    {/* Main Grid - 3 Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

                        {/* Left Column - "Typischer Tag" Timeline */}
                        <div className={`transition-all duration-1000 delay-200 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-lg">☀️</div>
                                    <div>
                                        <h3 className="text-slate-900 font-bold text-base">Ihr Tag mit Fertigo</h3>
                                        <p className="text-slate-400 text-xs">So einfach geht's</p>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    {[
                                        { time: '07:15', text: 'Push-Benachrichtigung: Neuer Auftrag in Ihrer Nähe', icon: '📱', color: 'bg-blue-50 text-blue-600 border-blue-100' },
                                        { time: '07:16', text: 'Auftrag angenommen - Badumbau in Zürich', icon: '✅', color: 'bg-green-50 text-green-600 border-green-100' },
                                        { time: '08:00', text: 'Kunde kontaktiert, Termin vereinbart', icon: '🤝', color: 'bg-purple-50 text-purple-600 border-purple-100' },
                                        { time: '17:00', text: 'Auftrag abgeschlossen - CHF 3\'400', icon: '💰', color: 'bg-amber-50 text-amber-600 border-amber-100' },
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-sm ${step.color}`}>{step.icon}</div>
                                                {i < 3 && <div className="w-px h-full min-h-[20px] bg-slate-200 mt-1" />}
                                            </div>
                                            <div className="pt-1">
                                                <span className="text-slate-400 text-xs font-mono">{step.time}</span>
                                                <p className="text-slate-700 text-sm font-medium leading-snug">{step.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Center Column - Mascot + CTA */}
                        <div className={`transition-all duration-1000 delay-300 ${heroInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
                            {/* Mascot */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-gradient-to-b from-green-400/10 to-transparent rounded-[2rem] blur-2xl scale-105" />
                                <div className="relative bg-gradient-to-b from-green-50 to-white rounded-[2rem] border border-green-200/50 p-6 text-center">
                                    <img
                                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/45c6d003-83de-48d7-81d6-f98a7eb703fd/Gemini_Generated_Image_odao5jodao5jodao-removebg-preview-1769627881340.png?width=8000&height=8000&resize=contain"
                                        alt="Fertigo Maskottchen"
                                        className="w-full max-w-[220px] mx-auto drop-shadow-xl"
                                    />
                                    <div className="mt-4 flex items-center justify-center gap-2">
                                        <div className="flex -space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-slate-500 text-sm font-medium">4.9 von 2'400+ Handwerkern</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="space-y-3">
                                <Link
                                    to="/register"
                                    className="group w-full inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-xl shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <span>Kostenlos registrieren</span>
                                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/so-funktionierts"
                                    className="group w-full inline-flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                                >
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    <span>Video ansehen · 90 Sek.</span>
                                </Link>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-3 mt-6">
                                {[
                                    { val: '0.-', label: 'Monatlich', icon: '🏷️' },
                                    { val: '0%', label: 'Provision', icon: '✨' },
                                    { val: '5 Min', label: 'Setup', icon: '⚡' },
                                ].map((s, i) => (
                                    <div key={i} className="text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <span className="text-sm">{s.icon}</span>
                                        <div className="text-slate-900 font-black text-lg">{s.val}</div>
                                        <div className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Testimonial + Live Feed */}
                        <div className={`space-y-6 transition-all duration-1000 delay-400 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                            
                            {/* Testimonial */}
                            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed italic mb-5">
                                    "Seit ich bei Fertigo bin, muss ich keine Kaltakquise mehr machen. Die Aufträge kommen direkt aufs Handy - passend zu meinem Fachgebiet. Letzte Woche allein 5 neue Kunden."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">MK</div>
                                    <div>
                                        <div className="text-slate-900 font-bold text-sm">Marco K.</div>
                                        <div className="text-slate-400 text-xs">Sanitär · Winterthur</div>
                                    </div>
                                </div>
                            </div>

                            {/* Live Aufträge Feed */}
                            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                                        </span>
                                        <span className="text-white font-bold text-sm">Live Aufträge</span>
                                    </div>
                                    <span className="text-slate-500 text-xs">Letzte 30 Min</span>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { service: 'Küche montieren', loc: 'Bern', price: 'CHF 2\'800', time: 'vor 3 Min' },
                                        { service: 'Badezimmer sanieren', loc: 'Zürich', price: 'CHF 5\'200', time: 'vor 8 Min' },
                                        { service: 'Parkett verlegen', loc: 'Basel', price: 'CHF 1\'900', time: 'vor 15 Min' },
                                    ].map((lead, i) => (
                                        <div key={i} className="flex items-center justify-between bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700/50">
                                            <div>
                                                <div className="text-white text-sm font-semibold">{lead.service}</div>
                                                <div className="text-slate-500 text-xs">{lead.loc} · {lead.time}</div>
                                            </div>
                                            <div className="text-green-400 font-bold text-sm">{lead.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

            {/* ══════════ DASHBOARD - HELLES MODERNES DESIGN ══════════ */}
            <section ref={dashboardRef} className={`relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white transition-all duration-700 ${dashboardInView ? 'opacity-100' : 'opacity-0'}`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    {/* Header */}
                    <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 transition-all duration-1000 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div>
                            <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm font-semibold text-green-700 mb-5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                                Ihre Kommandozentrale
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
                                Ihr persönliches{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Dashboard</span>
                            </h2>
                        </div>
                        <p className="text-slate-500 text-lg max-w-md lg:text-right">
                            Alles im Blick: Leads, Statistiken und Aufträge in Echtzeit verwalten.
                        </p>
                    </div>

                    {/* Dashboard Preview */}
                    <div className={`relative transition-all duration-1000 delay-200 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* Browser Window Frame */}
                        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                            {/* Browser Bar */}
                            <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 max-w-md mx-auto">
                                    <div className="bg-white border border-slate-200 rounded-lg px-4 py-1.5 text-sm text-slate-400 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>
                                        app.fertigo.ch/dashboard
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Content */}
                            <div className="p-6 sm:p-8 bg-slate-50">
                                {/* Top Stats Row */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    {[
                                        { val: '47', label: 'Neue Leads', icon: '📬', change: '+12 heute', color: 'green' },
                                        { val: 'CHF 18k', label: 'Umsatz (Monat)', icon: '💰', change: '+24%', color: 'emerald' },
                                        { val: '82%', label: 'Erfolgsrate', icon: '🎯', change: 'Top 10%', color: 'amber' },
                                        { val: '4.9', label: 'Bewertung', icon: '⭐', change: '128 Reviews', color: 'yellow' },
                                    ].map((s, i) => (
                                        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-green-200 transition-all duration-300 group cursor-pointer">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                                    {s.icon}
                                                </div>
                                                <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">{s.change}</span>
                                            </div>
                                            <div className="text-2xl sm:text-3xl font-black text-slate-900">{s.val}</div>
                                            <div className="text-slate-500 text-sm">{s.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Main Content Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Lead Feed - Takes 2 columns */}
                                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                                        <div className="flex items-center justify-between mb-5">
                                            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                                                <span className="text-xl">🔥</span> Neueste Leads
                                            </h3>
                                            <button className="text-green-600 text-sm font-bold hover:text-green-700 flex items-center gap-1">
                                                Alle anzeigen
                                                <ArrowRightIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { title: 'Badezimmer Renovation', loc: 'Zürich', time: '5 Min.', price: 'CHF 22', icon: '🛁', tag: 'Neu', tagColor: 'green' },
                                                { title: 'Küche Modernisierung', loc: 'Bern', time: '12 Min.', price: 'CHF 28', icon: '🍳', tag: 'Hot', tagColor: 'amber' },
                                                { title: 'Garten Neugestaltung', loc: 'Basel', time: '18 Min.', price: 'CHF 35', icon: '🌿', tag: 'Neu', tagColor: 'green' },
                                            ].map((lead, i) => (
                                                <div key={i} className="flex items-center gap-4 bg-slate-50 hover:bg-green-50 border border-slate-100 hover:border-green-200 rounded-xl p-4 transition-all duration-300 cursor-pointer group">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl flex-shrink-0 shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform">
                                                        {lead.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <h4 className="text-slate-900 font-bold text-sm truncate">{lead.title}</h4>
                                                            <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-full ${lead.tagColor === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{lead.tag}</span>
                                                        </div>
                                                        <p className="text-slate-500 text-xs">📍 {lead.loc} · vor {lead.time}</p>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <div className="text-green-600 font-black text-lg">{lead.price}</div>
                                                        <div className="text-slate-400 text-[10px]">pro Lead</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Side Panel */}
                                    <div className="space-y-5">
                                        {/* Chart */}
                                        <div className="bg-white rounded-2xl border border-slate-200 p-5">
                                            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 mb-4">
                                                <span className="text-lg">📈</span> Wachstum
                                            </h3>
                                            <div className="relative h-24 mb-4">
                                                <div className="absolute inset-0 flex items-end justify-between gap-1">
                                                    {[35, 55, 40, 70, 50, 85, 95].map((h, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t-md hover:from-green-400 hover:to-green-200 transition-all duration-300"
                                                            style={{ height: `${h}%` }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-slate-400">Diese Woche</span>
                                                <span className="text-green-600 font-black">+127%</span>
                                            </div>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-5 text-white">
                                            <h3 className="font-black text-sm flex items-center gap-2 mb-4">
                                                <span className="text-lg">⚡</span> Schnellstart
                                            </h3>
                                            <div className="space-y-2">
                                                {[
                                                    { label: 'Leads durchsuchen', icon: '🔍' },
                                                    { label: 'Profil bearbeiten', icon: '✏️' },
                                                ].map((a, i) => (
                                                    <button key={i} className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-3 transition-all duration-300 group/btn text-left">
                                                        <span className="text-base">{a.icon}</span>
                                                        <span className="text-white/90 text-sm font-semibold">{a.label}</span>
                                                        <ArrowRightIcon className="w-4 h-4 ml-auto opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 hidden lg:flex items-center gap-3 animate-bounce-slow">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                <span className="text-xl">🔔</span>
                            </div>
                            <div>
                                <div className="text-slate-900 font-bold text-sm">Neuer Lead!</div>
                                <div className="text-slate-500 text-xs">vor 2 Sekunden</div>
                            </div>
                        </div>

                        <div className="absolute -bottom-4 -left-4 bg-slate-900 rounded-2xl shadow-xl p-4 hidden lg:flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <span className="text-xl">✅</span>
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">Auftrag gewonnen</div>
                                <div className="text-green-400 text-xs font-bold">+CHF 2'400</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className={`mt-16 text-center transition-all duration-1000 delay-400 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <Link
                            to="/register"
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-black px-10 py-4 rounded-2xl text-lg shadow-xl shadow-green-500/25 hover:-translate-y-1 transition-all duration-300"
                        >
                            Dashboard kostenlos testen
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="mt-4 text-slate-500 text-sm">Keine Kreditkarte nötig · In 2 Minuten startklar</p>
                    </div>
                </div>

                {/* Animation */}
                <style>{`
                    @keyframes bounce-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }
                    .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
                `}</style>
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
