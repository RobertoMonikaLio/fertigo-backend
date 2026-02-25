import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon, SwissFlagIcon } from '../components/icons';
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
            <section ref={heroRef} className="relative overflow-hidden bg-slate-50 min-h-[90vh] pb-24 pt-32 lg:pt-40">
                {/* ── Background Elements ── */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                    {/* Soft gradient blobs for depth */}
                    <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-green-50 to-transparent rounded-full blur-3xl opacity-70" />
                    <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-emerald-50 to-transparent rounded-full blur-3xl opacity-60" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

                        {/* ── LEFT: Content ── */}
                        <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                            {/* Headline */}
                            <h1 className="text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-slate-900 leading-[1.1] tracking-tight mb-6" dangerouslySetInnerHTML={{ __html: t.hero?.title?.replace('Leads erhalten.', 'Qualifizierte Aufträge erhalten.').replace('Umsatz steigern.', '<br/><span class="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 pb-1 sm:pb-2">Umsatz steigern.<svg class="absolute bottom-0 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#heroUnderlineGradient)" stroke-width="4" stroke-linecap="round"></path><defs><linearGradient id="heroUnderlineGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#16a34a"></stop><stop offset="50%" stop-color="#10b981"></stop><stop offset="100%" stop-color="#14b8a6"></stop></linearGradient></defs></svg></span>') || 'Qualifizierte Aufträge erhalten.<br/><span class="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 pb-1 sm:pb-2">Umsatz steigern.<svg class="absolute bottom-0 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#heroUnderlineGradient)" stroke-width="4" stroke-linecap="round"></path><defs><linearGradient id="heroUnderlineGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#16a34a"></stop><stop offset="50%" stop-color="#10b981"></stop><stop offset="100%" stop-color="#14b8a6"></stop></linearGradient></defs></svg></span>' }} />

                            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-10 max-w-lg font-medium">
                                {t.hero?.description || 'Fertigo verbindet Sie mit Kunden, die genau Ihren Service brauchen. Ohne Abo-Fallen, ohne Provision – direkt und transparent.'}
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
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
                        <div className={`relative lg:h-[600px] flex items-center justify-center transition-all duration-1000 delay-300 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                            {/* Subtle Decorative abstract shape behind */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-500/[0.05] to-emerald-500/[0.05] rotate-12 rounded-[5vw] z-0 pointer-events-none" />

                            {/* Main Featured Image/Card */}
                            <div className="relative z-10 w-full max-w-[420px] rounded-[32px] overflow-hidden bg-white shadow-2xl shadow-green-900/5 border border-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                {/* Top Image Header */}
                                <div className="relative h-64 bg-slate-100">
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
                                    number: '1', emoji: '🔍', title: t.steps.step1.title,
                                    time: t.steps.step1.time, desc: t.steps.step1.desc,
                                    features: t.steps.step1.features,
                                    gradient: 'from-green-200 via-green-300 to-emerald-200', chipBg: 'bg-green-100 text-green-700', checkBg: 'bg-green-500 border-green-500',
                                    swissValue: t.steps.step1.swiss,
                                },
                                {
                                    number: '2', emoji: '📞', title: t.steps.step2.title,
                                    time: t.steps.step2.time, desc: t.steps.step2.desc,
                                    features: t.steps.step2.features,
                                    gradient: 'from-emerald-200 via-emerald-300 to-teal-200', chipBg: 'bg-emerald-100 text-emerald-700', checkBg: 'bg-emerald-500 border-emerald-500',
                                    swissValue: t.steps.step2.swiss,
                                },
                                {
                                    number: '3', emoji: '✅', title: t.steps.step3.title,
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
                                            <div className="w-14 h-14 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-3xl">
                                                {step.emoji}
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
                                emoji: '🔍', title: t.steps.step1.title,
                                desc: t.steps.step1.desc,
                                features: t.steps.step1.features,
                                gradient: 'from-green-500 to-emerald-500', bgGradient: 'from-green-50 to-emerald-50',
                                swissValue: t.steps.step1.swiss,
                            },
                            {
                                emoji: '📞', title: t.steps.step2.title,
                                desc: t.steps.step2.desc,
                                features: t.steps.step2.features,
                                gradient: 'from-emerald-500 to-teal-500', bgGradient: 'from-emerald-50 to-teal-50',
                                swissValue: t.steps.step2.swiss,
                            },
                            {
                                emoji: '✅', title: t.steps.step3.title,
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
                            {t.benefits.badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4" dangerouslySetInnerHTML={{ __html: t.benefits.title }} />
                    </div>

                    {/* ===== COMPLETELY DIFFERENT DESIGN: MIDNIGHT BENTO GRID ===== */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 max-w-[1400px] mx-auto mb-16 relative z-10 auto-rows-[auto] md:auto-rows-[250px]">
                        {t.benefits.rows.map((row: any, i: number) => {
                            // Bento Layout classes for 6 items in a 4-col grid:
                            // 0: span 2, 1: span 2
                            // 2: span 1 (tall), 3: span 2, 4: span 1 (tall)
                            // 5: span 2
                            const gridClass =
                                i === 0 ? "md:col-span-2 md:row-span-1" :
                                    i === 1 ? "md:col-span-2 md:row-span-1" :
                                        i === 2 ? "md:col-span-1 md:row-span-2" :
                                            i === 3 ? "md:col-span-2 md:row-span-1" :
                                                i === 4 ? "md:col-span-1 md:row-span-2" :
                                                    "md:col-span-2 md:row-span-1";

                            return (
                                <div
                                    key={i}
                                    className={`group relative rounded-[2.5rem] overflow-hidden bg-slate-950 border border-slate-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:border-green-500/40 hover:shadow-[0_0_50px_rgba(34,197,94,0.15)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between p-7 sm:p-9 ${gridClass} ${benefitsInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                    style={{ transitionDelay: `${150 + i * 100}ms` }}
                                >
                                    {/* Deep Space Background Glow & Noise */}
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 opacity-80 z-0"></div>
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay z-0"></div>

                                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
                                    <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-green-500/20 rounded-full blur-[80px] group-hover:bg-green-400/40 transition-all duration-700 pointer-events-none z-0" />

                                    {/* Top Row: Category & Icon */}
                                    <div className="flex justify-between items-start z-10 relative">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:animate-ping" />
                                                {row.label}
                                            </span>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-green-400 group-hover:bg-green-500/20 group-hover:border-green-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                                            {/* Dynamic Icons */}
                                            {i === 0 ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                                                : i === 1 ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.866 8.21 8.21 0 0 0 3 2.48Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /></svg>
                                                    : i === 2 ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
                                                        : i === 3 ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>
                                                            : i === 4 ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>
                                                                : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" /></svg>}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="relative z-10 mt-10 flex flex-col justify-end gap-3 flex-1">
                                        {/* The Old Way (Small, red/gray) */}
                                        <div className="flex items-center gap-2 opacity-50 group-hover:opacity-40 transition-opacity">
                                            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest line-through decoration-red-900/50">{row.before}</span>
                                        </div>

                                        {/* The New Way (Huge, bright pure white) */}
                                        <div className={`${(i === 2 || i === 4) ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'} font-black text-white group-hover:text-green-50 transition-colors leading-[1.15] tracking-tight`}>
                                            {row.after}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pricing Strip */}
                    <div className={`mt-10 grid grid-cols-3 gap-3 sm:gap-5 transition-all duration-1000 delay-500 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {[
                            { icon: '💰', title: t.benefits.pricing.lead, desc: t.benefits.pricing.leadDesc },
                            { icon: '🔒', title: t.benefits.pricing.provision, desc: t.benefits.pricing.provisionDesc },
                            { icon: '🚫', title: t.benefits.pricing.noAbo, desc: t.benefits.pricing.noAboDesc },
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
                            {t.categories.badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4" dangerouslySetInnerHTML={{ __html: t.categories.title }} />
                        <p className="text-slate-500 text-lg max-w-xl mx-auto">
                            {t.categories.subtitle}
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
                                    <span className="text-green-600 text-xs font-bold">{cat.leads} {t.categories.leadsPerMonth}</span>
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
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3" dangerouslySetInnerHTML={{ __html: t.faq.title }} />
                        <p className="text-slate-500 text-lg">{t.faq.subtitle}</p>
                    </div>

                    <div className={`space-y-3 transition-all duration-1000 delay-200 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {t.faq.items.map((item: any, i: number) => (
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
                            <span className="text-white/80 text-sm font-semibold">{t.finalCta.badge}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                            {t.finalCta.title}
                        </h2>
                        <p className="text-white/60 text-lg mb-10 max-w-md mx-auto">
                            {t.finalCta.description}
                        </p>
                        <Link
                            to="/register"
                            className="group inline-flex items-center gap-2 bg-white text-green-700 font-black px-10 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                        >
                            {t.finalCta.button}
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="mt-4 text-white/40 text-sm">{t.finalCta.noCard}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProvidersPage;
