import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon, SwissFlagIcon, ColoredMagnifyingGlassIcon, ColoredChatBubbleLeftRightIcon, ColoredCheckCircleIcon, ColoredBanknotesIcon, ColoredLockClosedIcon, ColoredPaintRollerIcon, ColoredBoltIcon, ColoredWrenchScrewdriverIcon, ColoredScaffoldingIcon, ColoredLeafIcon, ColoredVacuumCleanerIcon, ColoredGardenIcon, ColoredHomeModernIcon, ColoredClockIcon, ColoredBriefcaseIcon, ColoredUsersIcon, ColoredWindowIcon, ColoredMapPinIcon, ColoredSparklesIcon } from '../components/icons';
import { useAppContext } from './AppContext';
import { translations } from '../components/translations';

const ProvidersPage: React.FC = () => {
    const { language } = useAppContext();
    // @ts-ignore - partner might not exist on all languages yet
    const t = (translations[language] as any).partner.providers;

    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: stepsRef, inView: stepsInView } = useInView({ triggerOnce: true, threshold: 0.05 });
    const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: categoriesRef, inView: categoriesInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [openFaq, setOpenFaq] = React.useState<number | null>(null);

    return (
        <div className="mx-auto overflow-hidden">

            {/* ══════════ HERO REIMAGINED – LIGHT, PREMIUM & TRUST-FOCUSED ══════════ */}
            <section
                ref={heroRef}
                className="relative overflow-hidden bg-slate-50 min-h-[80vh] sm:min-h-[90vh] pb-20 sm:pb-24 pt-28 sm:pt-32 lg:pt-40"
            >
                {/* ── Background Elements ── */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                    {/* Soft gradient blobs for depth */}
                    <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-green-50 to-transparent rounded-full blur-3xl opacity-70" />
                    <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-emerald-50 to-transparent rounded-full blur-3xl opacity-60" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Mobile Hero – Revolutionary 2024 Design */}
                    <div
                        className={`sm:hidden ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700`}
                    >
                        {/* Revolutionary Headline Section */}
                        <div className="mb-8 text-center">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full px-3 py-1 mb-4">
                                <span className="text-2xl">🔥</span>
                                <span className="text-[11px] font-black text-amber-700 uppercase tracking-[0.2em]">
                                    Top-Rated 2024
                                </span>
                            </div>

                            <h1
                                className="text-[2.5rem] font-black leading-[1.05] tracking-tight mb-6"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        t.hero?.title
                                            ?.replace('Leads erhalten.', 'Qualifizierte Aufträge erhalten.')
                                            .replace(
                                                'Umsatz steigern.',
                                                '<br/><span class="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">Umsatz steigern.</span>'
                                            ) ||
                                        'Qualifizierte Aufträge erhalten.<br/><span class="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">Umsatz steigern.</span>'
                                }}
                            />

                            <p className="text-base text-slate-600 leading-relaxed font-medium mb-6">
                                {t.hero?.description || 'Fertigo bringt Ihnen passende Kundenanfragen – ohne Abo, ohne Provision, direkt auf Ihr Smartphone.'}
                            </p>
                        </div>


                        {/* Main CTA Section */}
                        <div className="space-y-4">
                            <Link
                                to="/register"
                                className="w-full flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black px-6 py-3.5 rounded-xl text-sm shadow-xl shadow-slate-900/25 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {t.hero?.ctaRegister || 'Kostenlos registrieren'}
                                <ArrowRightIcon className="w-4 h-4 text-green-400" />
                            </Link>
                            <p className="text-[11px] text-slate-400 text-center">
                                Kein Abo · Keine Provision · In wenigen Minuten startklar
                            </p>
                        </div>

                        {/* Final Trust Section */}                        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-6 text-center">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="flex items-center gap-1">
                                    <SwissFlagIcon className="w-4 h-4" />
                                    <span className="text-xs font-black text-slate-700">Schweizer Qualität</span>
                                </div>
                                <div className="w-px h-4 bg-slate-300"></div>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm">✅</span>
                                    <span className="text-xs font-black text-slate-700">Geprüfte Kunden</span>
                                </div>
                                <div className="w-px h-4 bg-slate-300"></div>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm">🛡️</span>
                                    <span className="text-xs font-black text-slate-700">Datenschutz</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium">
                                Über 2'500 Schweizer Unternehmen vertrauen Fertigo
                            </p>
                        </div>
                    </div>

                    {/* Desktop/Tablet Hero – bestehendes Layout */}
                    <div className="hidden sm:grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

                        {/* ── LEFT: Content ── */}
                        <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                            {/* Headline */}
                            <h1
                                className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-slate-900 leading-[1.12] tracking-tight mb-5 sm:mb-6"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        t.hero?.title
                                            ?.replace('Leads erhalten.', 'Qualifizierte Aufträge erhalten.')
                                            .replace(
                                                'Umsatz steigern.',
                                                '<br/><span class="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 pb-1 sm:pb-2">Umsatz steigern.<svg class="absolute bottom-0 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#heroUnderlineGradient)" stroke-width="4" stroke-linecap="round"></path><defs><linearGradient id="heroUnderlineGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#16a34a"></stop><stop offset="50%" stop-color="#10b981"></stop><stop offset="100%" stop-color="#14b8a6"></stop></linearGradient></defs></svg></span>'
                                            ) ||
                                        'Qualifizierte Aufträge erhalten.<br/><span class="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 pb-1 sm:pb-2">Umsatz steigern.<svg class="absolute bottom-0 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#heroUnderlineGradient)" stroke-width="4" stroke-linecap="round"></path><defs><linearGradient id="heroUnderlineGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#16a34a"></stop><stop offset="50%" stop-color="#10b981"></stop><stop offset="100%" stop-color="#14b8a6"></stop></linearGradient></defs></svg></span>'
                                }}
                            />

                            <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed mb-8 sm:mb-10 max-w-lg font-medium">
                                {t.hero?.description || 'Fertigo verbindet Sie mit Kunden, die genau Ihren Service brauchen. Ohne Abo-Fallen, ohne Provision – direkt und transparent.'}
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 sm:mb-8">
                                <Link to="/register" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl text-base shadow-xl shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300">
                                    {t.hero?.ctaRegister || 'Kostenlos registrieren'}
                                    <ArrowRightIcon className="w-5 h-5 text-green-400" />
                                </Link>
                            </div>

                            {/* Key Benefits */}
                            <ul className="flex flex-col gap-3">
                                {[
                                    'Kein Abo',
                                    'Nur 100% Qualifizierte Leads',
                                    'Schweizweit Faire Preise'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── RIGHT: Dynamic Visual Composition ── */}
                        <div
                            className={`relative mt-10 sm:mt-0 lg:h-[600px] flex items-center justify-center transition-all duration-1000 delay-300 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                        >

                            {/* Subtle Decorative abstract shape behind */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-500/[0.05] to-emerald-500/[0.05] rotate-12 rounded-[5vw] z-0 pointer-events-none" />

                            {/* Main Featured Image/Card */}
                            <div className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white shadow-2xl shadow-green-900/5 border border-slate-100 transform rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-500">
                                {/* Top Image Header */}
                                <div className="relative h-56 sm:h-64 bg-slate-100">
                                    <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop" alt="Craftsman working" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                                    {/* Swiss Quality Badge inside image */}
                                    <div className="absolute bottom-5 left-5 flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 shadow-lg">
                                        <SwissFlagIcon className="w-4 h-4" />
                                        <span className="text-xs font-black text-slate-800 uppercase tracking-wide">Swiss Quality</span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-7">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 mb-1.5 leading-tight">Neue Anfrage:<br />Badezimmer Sanierung</h3>
                                            <p className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                Zürich, CH
                                            </p>
                                        </div>
                                        <div className="bg-green-100 text-green-700 font-extrabold px-3 py-1.5 rounded-lg text-xs tracking-wider animate-pulse flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div> LIVE
                                        </div>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-2 gap-4 mb-7">
                                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/50 hover:bg-green-50 hover:border-green-100 transition-colors cursor-default">
                                            <div className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">Budget ca.</div>
                                            <div className="text-[19px] font-black text-green-600">CHF 12'000</div>
                                        </div>
                                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/50 hover:bg-blue-50 hover:border-blue-100 transition-colors cursor-default">
                                            <div className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">Zeitrahmen</div>
                                            <div className="text-[19px] font-black text-slate-900">In 2 Wochen</div>
                                        </div>
                                    </div>

                                    {/* Fake Accept Button */}
                                    <div className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-xl text-center shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Jetzt Offerte senden
                                    </div>
                                </div>
                            </div>

                            {/* Floating UI Elements */}


                        </div>
                    </div>
                </div>

                <style>{`
                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                        100% { transform: translateY(0px); }
                    }
                `}</style>
            </section>


            {/* ══════════ 3 SCHRITTE - STYLE WIE HOME PAGE ══════════ */}
            <section ref={stepsRef} className="relative py-12 sm:py-28 lg:py-36 overflow-hidden bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">

                    {/* Header */}
                    <div className={`text-center mb-8 sm:mb-16 lg:mb-20 transition-all duration-1000 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 mb-3 sm:mb-4 leading-tight lg:whitespace-nowrap" dangerouslySetInnerHTML={{ __html: t.steps.title }} />
                        <p className="text-sm sm:text-base lg:text-lg text-slate-600 mx-auto lg:whitespace-nowrap max-w-xs sm:max-w-none">
                            {t.steps.subtitle}
                        </p>
                    </div>

                    {/* ===== MOBILE ONLY: Scroll Cards ===== */}
                    <div className="sm:hidden -mx-4">
                        <div className="flex gap-4 pl-4 pr-8 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide">
                            {[
                                {
                                    number: '1', icon: <ColoredMagnifyingGlassIcon className="w-8 h-8" />, title: t.steps.step1.title,
                                    time: t.steps.step1.time, desc: t.steps.step1.desc,
                                    features: t.steps.step1.features,
                                    gradient: 'from-green-200 via-green-300 to-emerald-200', chipBg: 'bg-green-100 text-green-700', checkBg: 'bg-green-500 border-green-500',
                                    swissValue: t.steps.step1.swiss,
                                },
                                {
                                    number: '2', icon: <ColoredChatBubbleLeftRightIcon className="w-8 h-8" />, title: t.steps.step2.title,
                                    time: t.steps.step2.time, desc: t.steps.step2.desc,
                                    features: t.steps.step2.features,
                                    gradient: 'from-emerald-200 via-emerald-300 to-teal-200', chipBg: 'bg-emerald-100 text-emerald-700', checkBg: 'bg-emerald-500 border-emerald-500',
                                    swissValue: t.steps.step2.swiss,
                                },
                                {
                                    number: '3', icon: <ColoredCheckCircleIcon className="w-8 h-8" />, title: t.steps.step3.title,
                                    time: t.steps.step3.time, desc: t.steps.step3.desc,
                                    features: t.steps.step3.features,
                                    gradient: 'from-teal-200 via-teal-300 to-cyan-200', chipBg: 'bg-teal-100 text-teal-700', checkBg: 'bg-teal-500 border-teal-500',
                                    swissValue: t.steps.step3.swiss,
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
                                            <div className="w-14 h-14 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <div className="px-5 pb-5 flex flex-col flex-1">
                                            <h3 className="text-slate-900 font-extrabold text-[19px] leading-tight mb-1">{step.title}</h3>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${step.chipBg}`}>
                                                    {language === 'de' ? 'Schritt' : language === 'fr' ? 'Étape' : language === 'it' ? 'Passo' : 'Step'} {step.number}
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
                                icon: <ColoredMagnifyingGlassIcon className="w-10 h-10" />, title: t.steps.step1.title,
                                desc: t.steps.step1.desc,
                                features: t.steps.step1.features,
                                gradient: 'from-green-500 to-emerald-500', bgGradient: 'from-green-50 to-emerald-50',
                                swissValue: t.steps.step1.swiss,
                            },
                            {
                                icon: <ColoredChatBubbleLeftRightIcon className="w-10 h-10" />, title: t.steps.step2.title,
                                desc: t.steps.step2.desc,
                                features: t.steps.step2.features,
                                gradient: 'from-emerald-500 to-teal-500', bgGradient: 'from-emerald-50 to-teal-50',
                                swissValue: t.steps.step2.swiss,
                            },
                            {
                                icon: <ColoredCheckCircleIcon className="w-10 h-10" />, title: t.steps.step3.title,
                                desc: t.steps.step3.desc,
                                features: t.steps.step3.features,
                                gradient: 'from-teal-500 to-cyan-500', bgGradient: 'from-teal-50 to-cyan-50',
                                swissValue: t.steps.step3.swiss,
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
                                        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br ${step.bgGradient} border-2 border-green-200 transition-all duration-300 group-hover:scale-105`}>
                                            {step.icon}
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

            {/* ══════════ COMPARISON SHOWCASE - WAS SICH ÄNDERT ══════════ */}
            <section ref={benefitsRef} className="py-24 sm:py-32 relative bg-white overflow-hidden">
                {/* Subtle Background Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-green-50/50 via-emerald-50/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-50/40 to-transparent rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

                    {/* Header */}
                    <div className={`text-center max-w-3xl mx-auto mb-16 sm:mb-24 transition-all duration-1000 ease-out ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-800 tracking-wide uppercase mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            {t.benefits.badge}
                        </div>
                        <h2
                            className="text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6"
                            dangerouslySetInnerHTML={{ __html: t.benefits.title }}
                        />
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-4">
                            Die alten Wege kosten Zeit, Geld und Nerven. So sieht Ihr Alltag aus, wenn Sie mit den modernsten Werkzeugen arbeiten.
                        </p>
                    </div>

                        {/* ─── NEW: Faux Slider Comparison (2024 Redesign v2) ─── */}
                        <div className="sm:hidden">
                            <div className="text-center mb-10">
                                <h3 className="text-3xl font-black text-slate-900 mb-2 leading-tight">
                                    Der direkte Vergleich
                                </h3>
                                <p className="text-sm text-slate-600 font-medium max-w-xs mx-auto">
                                    So revolutioniert Fertigo Ihren Arbeitsalltag.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {t.benefits.rows.map((row: any, i: number) => (
                                    <div key={i} className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
                                        {/* Card Header */}
                                        <div className="flex items-center gap-3 p-4 border-b border-slate-100 bg-slate-50/70">
                                            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg">
                                                {["💼", "👥", "🖥️", "⏰", "💳", "📍", "✅"][i]}
                                            </div>
                                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">{row.label}</h4>
                                        </div>
                                        
                                        {/* Faux Slider Body */}
                                        <div className="relative">
                                            <div className="flex">
                                                {/* Before (Left side) */}
                                                <div className="w-1/2 bg-slate-100/50 p-4">
                                                    <div className="text-[10px] font-bold text-red-500 mb-1.5 opacity-80">Ohne Fertigo</div>
                                                    <p className="text-xs font-medium text-slate-500 line-through decoration-red-200 decoration-2">
                                                        {row.before}
                                                    </p>
                                                </div>
                                                {/* After (Right side) */}
                                                <div className="w-1/2 bg-green-50/60 p-4">
                                                    <div className="text-[10px] font-bold text-green-600 mb-1.5 flex items-center gap-1">
                                                        <ColoredSparklesIcon className="w-3 h-3" />
                                                        Mit Fertigo
                                                    </div>
                                                    <p className="text-xs font-semibold text-green-900">
                                                        {row.after}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Slider Handle */}
                                            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                                                <div className="w-1 h-full bg-white/50" />
                                                <div className="absolute w-8 h-8 rounded-full bg-white shadow-md border-2 border-slate-200 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Desktop Table View */}
                        <div className={`hidden sm:block relative max-w-5xl mx-auto transition-all duration-1000 delay-200 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                            {/* Absolute Highlight Column Background (Desktop) */}
                            <div className="hidden sm:block absolute top-0 bottom-0 left-[33.333333%] w-[33.333333%] bg-red-50/40 rounded-2xl border border-red-100/50 z-0">
                                <div className="absolute inset-0 bg-gradient-to-b from-red-50/50 to-transparent rounded-[2rem] pointer-events-none" />
                            </div>

                            <div className="hidden sm:block absolute top-0 bottom-0 right-0 w-[33.333333%] bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(52,211,153,0.3)] ring-1 ring-emerald-100/50 transform scale-y-[1.03] z-0">
                                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent rounded-[2rem] pointer-events-none" />
                            </div>

                            {/* Column Headers */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-0 px-4 sm:px-6 mb-8 relative z-10">
                                <div className="hidden sm:block sm:col-span-4"></div>
                                <div className="sm:col-span-4 flex flex-col justify-end text-center pb-4 relative z-10">
                                    <span className="text-sm font-bold text-red-500/70 mb-1 line-through decoration-red-300">Konventionell</span>
                                    <span className="text-xl font-black text-red-900/80">Ohne Fertigo</span>
                                </div>
                                <div className="sm:col-span-4 flex flex-col justify-end text-center pb-4 -mt-6">
                                    {/* Badge that breaks out of grid slightly */}
                                    <div className="mx-auto mb-3">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest rounded-full shadow-sm shadow-emerald-200">
                                            <ColoredSparklesIcon className="w-3.5 h-3.5" />
                                            Die Zukunft
                                        </span>
                                    </div>
                                    <span className="text-2xl font-black text-slate-900">Mit Fertigo</span>
                                </div>
                            </div>

                            {/* Rows */}
                            <div className="relative z-10 border-t border-slate-200/60 sm:border-none flex flex-col pt-4 sm:pt-0 gap-4 sm:gap-0">
                                {t.benefits.rows.map((row: any, i: number) => {
                                    const isFirst = i === 0;
                                    const isLast = i === t.benefits.rows.length - 1;

                                    return (
                                        <div key={i} className={`group grid grid-cols-1 sm:grid-cols-12 items-center sm:min-h-[96px] transition-colors relative
                                            ${!isLast ? 'sm:border-b sm:border-slate-200/60' : ''}
                                            bg-white sm:bg-transparent rounded-2xl sm:rounded-none border border-slate-100 sm:border-transparent shadow-sm sm:shadow-none
                                        `}>

                                            {/* Label Area */}
                                            <div className="sm:col-span-4 flex items-center gap-4 py-4 sm:py-6 px-4 sm:px-6 border-b border-slate-100/80 sm:border-b-0">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:bg-white group-hover:shadow-sm group-hover:scale-105 transition-all flex-shrink-0">
                                                    {i === 0 && "💼"}
                                                    {i === 1 && "👥"}
                                                    {i === 2 && "🖥️"}
                                                    {i === 3 && "⏰"}
                                                    {i === 4 && "💳"}
                                                    {i === 5 && "📍"}
                                                    {i > 5 && "✅"}
                                                </div>
                                                <span className="text-sm font-black text-slate-800 uppercase tracking-widest leading-snug">{row.label}</span>
                                            </div>

                                            {/* Values Data */}
                                            <div className="sm:col-span-8 flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-0 pb-5 sm:pb-0 px-4 sm:px-0 h-full items-center relative z-10">
                                                {/* Before */}
                                                <div className="w-full sm:w-auto col-span-1 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center p-3 sm:p-0 bg-red-50/40 sm:bg-transparent rounded-xl sm:rounded-none border border-red-100/50 sm:border-none relative">
                                                    <div className="sm:hidden text-[10px] font-black uppercase text-red-500/80 mb-1">Ohne Fertigo</div>
                                                    <span className="text-sm font-medium text-red-600/70 line-through decoration-red-300 group-hover:decoration-red-400 group-hover:text-red-700/80 transition-colors">
                                                        {row.before}
                                                    </span>
                                                </div>

                                                {/* Mobile Arrow */}
                                                <div className="sm:hidden flex justify-center w-full -my-2 relative z-20">
                                                    <div className="bg-white rounded-full p-1 border border-slate-100 shadow-sm">
                                                        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* After */}
                                                <div className="w-full sm:w-auto col-span-1 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center p-4 sm:p-0 bg-emerald-50/80 sm:bg-transparent rounded-xl sm:rounded-none border border-emerald-100/60 sm:border-none relative transition-colors shadow-sm sm:shadow-none shadow-emerald-100/50">
                                                    <div className="sm:hidden text-[10px] font-black uppercase text-emerald-600 mb-1 flex items-center gap-1">
                                                        <ColoredSparklesIcon className="w-3 h-3" /> Mit Fertigo
                                                    </div>
                                                    <div className="flex items-center gap-2 transform group-hover:translate-x-1 transition-transform">
                                                        <div className="hidden sm:flex w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                                        <span className="text-lg sm:text-lg font-black text-emerald-950 sm:text-slate-900 group-hover:text-emerald-700 transition-colors pointer-events-none">
                                                            {row.after}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    {/* Pricing Core Pillars (Bottom Strip) */}
                    <div className={`mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* 1 */}
                        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all group">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4 text-emerald-600 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h4 className="font-extrabold text-slate-900 text-lg mb-1">{t.benefits.pricing.lead}</h4>
                            <p className="text-sm text-slate-500 font-medium text-center">{t.benefits.pricing.leadDesc}</p>
                        </div>
                        {/* 2 */}
                        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all group">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">💰</span>
                            </div>
                            <h4 className="font-extrabold text-slate-900 text-lg mb-1">{t.benefits.pricing.provision}</h4>
                            <p className="text-sm text-slate-500 font-medium text-center">{t.benefits.pricing.provisionDesc}</p>
                        </div>
                        {/* 3 */}
                        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all group">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-orange-600 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">⏳</span>
                            </div>
                            <h4 className="font-extrabold text-slate-900 text-lg mb-1">{t.benefits.pricing.noAbo}</h4>
                            <p className="text-sm text-slate-500 font-medium text-center">{t.benefits.pricing.noAboDesc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ PARTNER VORTEILE - MOBILE ONLY ══════════ */}
            <section className={`sm:hidden py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 transition-all duration-700`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    {/* Mobile Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-4 py-2 mb-6 shadow-xl shadow-blue-600/40">
                            <span className="text-2xl">🎯</span>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                                Warum Fertigo?
                            </span>
                        </div>
                        <h2 className="text-[2.2rem] font-black text-slate-900 mb-4 leading-tight">
                            Die Vorteile<br />
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">
                                die überzeugen
                            </span>
                        </h2>
                        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl p-6 border border-blue-200 shadow-xl">
                            <p className="text-lg font-black text-blue-900">
                                💼 Alles, was Sie als Partner brauchen
                            </p>
                        </div>
                    </div>

                    {/* Partner Benefits Cards */}
                    <div className="space-y-6 mb-12">
                        {[
                            {
                                icon: '💰',
                                title: t.benefits.pricing.lead,
                                desc: t.benefits.pricing.leadDesc
                            },
                            {
                                icon: '🔒',
                                title: t.benefits.pricing.provision,
                                desc: t.benefits.pricing.provisionDesc
                            },
                            {
                                icon: '⏰',
                                title: t.benefits.pricing.noAbo,
                                desc: t.benefits.pricing.noAboDesc
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-center hover:border-green-200 hover:shadow-sm transition-all duration-300 flex flex-col items-center">
                                <div className="mb-2">{item.icon}</div>
                                <h4 className="font-black text-slate-900 text-xs sm:text-sm mb-0.5">{item.title}</h4>
                                <p className="text-slate-400 text-[10px] sm:text-xs">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProvidersPage;
