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

            {/* ══════════ HERO ══════════ */}
            <section ref={heroRef} className="relative overflow-hidden bg-white">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.08),transparent)]" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-28 lg:pt-36 pb-20 lg:pb-28">
                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Left - Content */}
                        <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                                <span className="text-green-700 text-sm font-semibold">Für Handwerker & Betriebe</span>
                                <SwissFlagIcon className="w-3.5 h-3.5" />
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-slate-900 leading-[1.08] tracking-tight mb-6">
                                Aufträge, die zu
                                <br />
                                Ihnen{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">kommen.</span>
                            </h1>

                            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
                                Qualifizierte Anfragen aus Ihrer Region, direkt aufs Handy. Keine Kaltakquise, keine Streuverluste.
                            </p>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-10">
                                <Link
                                    to="/register"
                                    className="group inline-flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-3.5 rounded-xl text-base shadow-lg shadow-green-600/25 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Kostenlos starten
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link
                                    to="/so-funktionierts"
                                    className="inline-flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 font-semibold px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-300"
                                >
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    So funktioniert's
                                </Link>
                            </div>

                            {/* Stats Row */}
                            <div className="flex items-center gap-6 sm:gap-8">
                                {[
                                    { val: '0%', label: 'Provision' },
                                    { val: '0.-', label: 'Monatlich' },
                                    { val: '5 Min', label: 'bis zum Lead' },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        {i > 0 && <div className="w-px h-8 bg-slate-200 -ml-3 sm:-ml-4" />}
                                        <div>
                                            <div className="text-slate-900 font-black text-xl">{s.val}</div>
                                            <div className="text-slate-400 text-xs font-medium">{s.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Mascot + Cards */}
                        <div className={`relative transition-all duration-1000 delay-200 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {/* Main Card with Mascot */}
                            <div className="relative bg-gradient-to-br from-slate-50 to-green-50/50 rounded-3xl border border-slate-200 p-8 sm:p-10">
                                {/* Mascot */}
                                <div className="flex justify-center mb-6">
                                    <img
                                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/45c6d003-83de-48d7-81d6-f98a7eb703fd/Gemini_Generated_Image_odao5jodao5jodao-removebg-preview-1769627881340.png?width=8000&height=8000&resize=contain"
                                        alt="Fertigo Maskottchen"
                                        className="w-44 sm:w-52 drop-shadow-lg"
                                    />
                                </div>

                                {/* Mini Lead Cards */}
                                <div className="space-y-2.5">
                                    {[
                                        { service: 'Badezimmer sanieren', loc: 'Zürich', price: 'CHF 5\'200', time: 'vor 3 Min', icon: '🛁' },
                                        { service: 'Küche montieren', loc: 'Bern', price: 'CHF 2\'800', time: 'vor 8 Min', icon: '🍳' },
                                        { service: 'Parkett verlegen', loc: 'Basel', price: 'CHF 1\'900', time: 'vor 12 Min', icon: '🪵' },
                                    ].map((lead, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 px-4 py-3 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300">
                                            <div className="w-9 h-9 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-base flex-shrink-0">{lead.icon}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-slate-900 text-sm font-bold truncate">{lead.service}</div>
                                                <div className="text-slate-400 text-xs">{lead.loc} · {lead.time}</div>
                                            </div>
                                            <div className="text-green-600 font-black text-sm flex-shrink-0">{lead.price}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Live indicator */}
                                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-slate-200/60">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                    </span>
                                    <span className="text-slate-400 text-xs font-medium">47 neue Leads heute</span>
                                </div>
                            </div>

                            {/* Floating Testimonial */}
                            <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 max-w-[240px] hidden sm:block">
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-slate-600 text-xs leading-relaxed italic mb-3">"5 neue Kunden letzte Woche. Fertigo hat alles verändert."</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-[10px]">MK</div>
                                    <div>
                                        <div className="text-slate-900 font-bold text-[11px]">Marco K.</div>
                                        <div className="text-slate-400 text-[10px]">Sanitär · Winterthur</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating stat */}
                            <div className="absolute -top-4 -right-3 sm:-right-6 bg-slate-900 text-white rounded-2xl shadow-xl px-4 py-3 hidden sm:block">
                                <div className="text-green-400 font-black text-lg leading-none">+127%</div>
                                <div className="text-slate-400 text-[10px] font-medium mt-0.5">mehr Aufträge</div>
                            </div>
                        </div>
                    </div>
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

            {/* ══════════ DASHBOARD - IMMERSIVE DARK DESIGN ══════════ */}
            <section ref={dashboardRef} className={`relative py-24 sm:py-32 overflow-hidden bg-slate-950 transition-all duration-700 ${dashboardInView ? 'opacity-100' : 'opacity-0'}`}>
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-500/[0.07] rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/[0.05] rounded-full blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }} />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    {/* Header */}
                    <div className={`text-center mb-16 transition-all duration-1000 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm font-semibold text-green-400 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </span>
                            Live Dashboard Preview
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                            Ihr persönliches{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Dashboard</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-lg mx-auto">
                            Leads verwalten, Umsatz tracken, Aufträge gewinnen — alles an einem Ort.
                        </p>
                    </div>

                    {/* Dashboard Mock */}
                    <div className={`relative transition-all duration-1000 delay-200 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                        {/* Sidebar + Main Layout */}
                        <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 overflow-hidden shadow-2xl shadow-black/40">

                            {/* Top Nav */}
                            <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-slate-800/80">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                                    </div>
                                    <span className="text-white font-bold text-sm hidden sm:block">Fertigo Dashboard</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2">
                                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                                        <span className="text-slate-500 text-sm">Suchen...</span>
                                    </div>
                                    <div className="relative">
                                        <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                                            <svg className="w-4.5 h-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-slate-900 flex items-center justify-center">
                                            <span className="text-[8px] font-bold text-white">3</span>
                                        </div>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xs">MK</div>
                                </div>
                            </div>

                            <div className="p-5 sm:p-8">
                                {/* Welcome Bar */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                    <div>
                                        <h3 className="text-white font-black text-xl sm:text-2xl">Guten Morgen, Marco</h3>
                                        <p className="text-slate-500 text-sm mt-1">Sie haben <span className="text-green-400 font-bold">12 neue Leads</span> seit gestern</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                                            </span>
                                            <span className="text-green-400 text-sm font-bold">Live</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                                    {[
                                        { val: '47', label: 'Leads', change: '+12', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>, gradient: 'from-green-500 to-emerald-500' },
                                        { val: 'CHF 18k', label: 'Umsatz', change: '+24%', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>, gradient: 'from-emerald-500 to-teal-500' },
                                        { val: '82%', label: 'Erfolgsrate', change: 'Top 10%', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>, gradient: 'from-amber-500 to-orange-500' },
                                        { val: '4.9', label: 'Bewertung', change: '128 Reviews', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>, gradient: 'from-yellow-500 to-amber-500' },
                                    ].map((s, i) => (
                                        <div key={i} className="group bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                                                    {s.icon}
                                                </div>
                                                <span className="text-green-400 text-[11px] font-bold bg-green-500/10 px-2 py-0.5 rounded-full">{s.change}</span>
                                            </div>
                                            <div className="text-white font-black text-2xl sm:text-3xl leading-none mb-1">{s.val}</div>
                                            <div className="text-slate-500 text-xs font-medium">{s.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Two Column Layout */}
                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                                    {/* Lead Pipeline - 3 cols */}
                                    <div className="lg:col-span-3 bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 sm:p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-white font-black flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                                Lead Pipeline
                                            </h3>
                                            <span className="text-slate-500 text-xs font-medium">Heute</span>
                                        </div>

                                        {/* Pipeline Stages */}
                                        <div className="flex items-center gap-1 mb-6">
                                            {[
                                                { label: 'Neu', count: 12, pct: 100 },
                                                { label: 'Kontaktiert', count: 8, pct: 67 },
                                                { label: 'Offerte', count: 5, pct: 42 },
                                                { label: 'Gewonnen', count: 3, pct: 25 },
                                            ].map((stage, i) => (
                                                <div key={i} className="flex-1 group/stage cursor-pointer">
                                                    <div className={`h-2 rounded-full transition-all duration-300 group-hover/stage:h-3 ${i === 3 ? 'bg-gradient-to-r from-green-500 to-emerald-400' : i === 0 ? 'bg-slate-600' : 'bg-slate-700'}`} 
                                                         style={{ opacity: 0.3 + (stage.pct / 100) * 0.7 }} />
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-slate-500 text-[10px] font-medium">{stage.label}</span>
                                                        <span className="text-slate-400 text-[10px] font-bold">{stage.count}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Recent Leads */}
                                        <div className="space-y-2.5">
                                            {[
                                                { name: 'Badezimmer Renovation', loc: 'Zürich', budget: 'CHF 5\'200', status: 'Neu', statusColor: 'green', time: '3 Min.' },
                                                { name: 'Küche montieren', loc: 'Bern', budget: 'CHF 2\'800', status: 'Kontaktiert', statusColor: 'blue', time: '15 Min.' },
                                                { name: 'Parkett verlegen', loc: 'Basel', budget: 'CHF 1\'900', status: 'Offerte', statusColor: 'amber', time: '42 Min.' },
                                                { name: 'Fassade streichen', loc: 'Luzern', budget: 'CHF 8\'400', status: 'Neu', statusColor: 'green', time: '1 Std.' },
                                            ].map((lead, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-slate-900/50 hover:bg-slate-900 border border-slate-700/30 hover:border-green-500/30 rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer group/lead">
                                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${lead.statusColor === 'green' ? 'bg-green-400' : lead.statusColor === 'blue' ? 'bg-blue-400' : 'bg-amber-400'}`} />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-white text-sm font-bold truncate group-hover/lead:text-green-400 transition-colors">{lead.name}</div>
                                                        <div className="text-slate-500 text-[11px]">{lead.loc} · vor {lead.time}</div>
                                                    </div>
                                                    <div className="hidden sm:block">
                                                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                                                            lead.statusColor === 'green' ? 'bg-green-500/15 text-green-400' :
                                                            lead.statusColor === 'blue' ? 'bg-blue-500/15 text-blue-400' :
                                                            'bg-amber-500/15 text-amber-400'
                                                        }`}>{lead.status}</span>
                                                    </div>
                                                    <div className="text-green-400 font-black text-sm flex-shrink-0">{lead.budget}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right Side - 2 cols */}
                                    <div className="lg:col-span-2 space-y-5">
                                        {/* Revenue Chart */}
                                        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5">
                                            <div className="flex items-center justify-between mb-5">
                                                <h3 className="text-white font-black text-sm">Umsatz</h3>
                                                <span className="text-green-400 text-xs font-bold">+127%</span>
                                            </div>
                                            {/* Chart Area */}
                                            <div className="relative h-28 mb-3">
                                                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                                                    <defs>
                                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                                                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                                                        </linearGradient>
                                                    </defs>
                                                    <path d="M0 80 Q30 70 60 65 T120 45 T180 35 T240 20 T300 10 V100 H0 Z" fill="url(#chartGradient)" />
                                                    <path d="M0 80 Q30 70 60 65 T120 45 T180 35 T240 20 T300 10" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                                                    <circle cx="300" cy="10" r="4" fill="#22c55e" />
                                                    <circle cx="300" cy="10" r="8" fill="#22c55e" opacity="0.2" />
                                                </svg>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d, i) => (
                                                    <span key={i} className={`text-[10px] font-medium ${i === 6 ? 'text-green-400' : 'text-slate-600'}`}>{d}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Activity Feed */}
                                        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5">
                                            <h3 className="text-white font-black text-sm mb-4">Aktivität</h3>
                                            <div className="space-y-3">
                                                {[
                                                    { text: 'Auftrag gewonnen', sub: 'Badezimmer · CHF 5\'200', color: 'green', icon: '✅' },
                                                    { text: 'Offerte gesendet', sub: 'Küche · CHF 2\'800', color: 'blue', icon: '📄' },
                                                    { text: 'Neue Bewertung', sub: '5 Sterne von Fam. Weber', color: 'amber', icon: '⭐' },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-sm flex-shrink-0">
                                                            {item.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-slate-300 text-xs font-semibold">{item.text}</div>
                                                            <div className="text-slate-600 text-[11px]">{item.sub}</div>
                                                        </div>
                                                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                                                            item.color === 'green' ? 'bg-green-400' :
                                                            item.color === 'blue' ? 'bg-blue-400' : 'bg-amber-400'
                                                        }`} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quick CTA */}
                                        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-5 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.06] rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
                                            <h4 className="text-white font-black text-sm mb-1.5 relative z-10">Leads entdecken</h4>
                                            <p className="text-green-200/70 text-xs mb-4 relative z-10">47 neue Anfragen warten auf Sie</p>
                                            <button className="relative z-10 w-full flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-sm rounded-xl px-4 py-2.5 transition-all duration-300">
                                                Zum Marktplatz
                                                <ArrowRightIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className={`mt-16 text-center transition-all duration-1000 delay-400 ${dashboardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <Link
                            to="/register"
                            className="group inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-black px-10 py-4 rounded-2xl text-lg shadow-xl shadow-green-500/25 hover:-translate-y-1 transition-all duration-300"
                        >
                            Dashboard kostenlos testen
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="mt-4 text-slate-500 text-sm">Keine Kreditkarte nötig · In 2 Minuten startklar</p>
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
