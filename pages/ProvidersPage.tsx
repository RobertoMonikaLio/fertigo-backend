import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon, SwissFlagIcon, ColoredMagnifyingGlassIcon, ColoredChatBubbleLeftRightIcon, ColoredCheckCircleIcon, ColoredBanknotesIcon, ColoredLockClosedIcon, ColoredPaintRollerIcon, ColoredBoltIcon, ColoredWrenchScrewdriverIcon, ColoredScaffoldingIcon, ColoredLeafIcon, ColoredVacuumCleanerIcon, ColoredGardenIcon, ColoredHomeModernIcon, ColoredClockIcon, ColoredBriefcaseIcon, ColoredUsersIcon, ColoredWindowIcon, ColoredMapPinIcon, ColoredSparklesIcon } from '../components/icons';
import { useAppContext } from './AppContext';
import { translations } from '../components/translations';
import ProviderComparison from '../components/ProviderComparison';

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
                className="relative overflow-hidden bg-slate-50 min-h-[85vh] sm:min-h-[90vh] pb-20 sm:pb-24 pt-28 sm:pt-32 lg:pt-40 flex flex-col justify-center"
            >
                {/* ── Desktop Background Elements ── */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block">
                    <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                    <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-green-50 to-transparent rounded-full blur-3xl opacity-70" />
                    <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-emerald-50 to-transparent rounded-full blur-3xl opacity-60" />
                </div>

                {/* ── Mobile Background Image (New Premium UI) ── */}
                <div className="absolute inset-0 z-0 sm:hidden pointer-events-none">
                    <img
                        src="/images/providers-hero-mobile.png"
                        alt="Craftsman background"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for Text Readability - Sharpness Optimized */}
                    <div className="absolute inset-0 bg-white/40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/5 via-white/50 to-white" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Mobile Hero – Revolutionary 2024 Design */}
                    <div
                        className={`sm:hidden ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700`}
                    >
                        {/* Revolutionary Headline Section */}
                        <div className="mb-8 text-center">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full px-3 py-1 -mt-10 mb-6">
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

                            {/* Key Benefits removed as requested */}
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
            <div ref={benefitsRef}>
                <ProviderComparison t={t} language={language} />
            </div>

        </div >
    );
};

export default ProvidersPage;
