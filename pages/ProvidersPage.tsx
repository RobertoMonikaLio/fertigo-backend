import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon, SwissFlagIcon, MapPinIcon, ColoredMagnifyingGlassIcon, ColoredChatBubbleLeftRightIcon, ColoredCheckCircleIcon, ColoredBanknotesIcon, ColoredLockClosedIcon, ColoredPaintRollerIcon, ColoredBoltIcon, ColoredWrenchScrewdriverIcon, ColoredScaffoldingIcon, ColoredLeafIcon, ColoredVacuumCleanerIcon, ColoredGardenIcon, ColoredHomeModernIcon, ColoredClockIcon, ColoredBriefcaseIcon, ColoredUsersIcon, ColoredWindowIcon, ColoredMapPinIcon, ColoredSparklesIcon, ChevronDownIcon, CheckIcon } from '../components/icons';
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

    const categories = [
        { name: 'Maler & Gipser', icon: <ColoredPaintRollerIcon className="w-8 h-8" />, leads: '120+' },
        { name: 'Reinigung', icon: <ColoredVacuumCleanerIcon className="w-8 h-8" />, leads: '450+' },
        { name: 'Umzug & Transport', icon: <ColoredBriefcaseIcon className="w-8 h-8" />, leads: '380+' },
        { name: 'Elektro & Solar', icon: <ColoredBoltIcon className="w-8 h-8" />, leads: '150+' },
        { name: 'Garten & Aussen', icon: <ColoredGardenIcon className="w-8 h-8" />, leads: '240+' },
        { name: 'Sanitär & Heizung', icon: <ColoredWrenchScrewdriverIcon className="w-8 h-8" />, leads: '180+' },
        { name: 'Fenster & Türen', icon: <ColoredWindowIcon className="w-8 h-8" />, leads: '90+' },
        { name: 'Bau & Reno', icon: <ColoredScaffoldingIcon className="w-8 h-8" />, leads: '210+' }
    ];

    return (
        <div className="mx-auto overflow-hidden bg-white">

            {/* ══════════ HERO SECTION – PROFESSIONAL IMAGE DESIGN ══════════ */}
            <section
                ref={heroRef}
                className="relative overflow-hidden min-h-[90vh] pt-32 lg:pt-40 flex flex-col items-center justify-center border-b border-slate-200"
            >
                {/* ── Background Image & Overlays ── */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/provider-hero.jpg"
                        alt="Handyman in action"
                        className="w-full h-full object-cover grayscale brightness-[0.95]"
                    />
                    {/* Multi-layered gradients for depth and readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.05),transparent_50%)]"></div>
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                <div className="relative z-20 flex flex-col items-center text-center lg:items-start lg:text-left px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto mb-16 lg:mb-24">
                    <div className="max-w-3xl">
                        <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8 shadow-sm">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
                                    Partner-Programm Schweiz
                                </span>
                            </div>
                        </div>

                        <h1 className={`text-[2.5rem] sm:text-6xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8 transition-all duration-1000 delay-100 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            Mehr Kunden.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 block sm:inline">
                                Einfach online.
                            </span>
                        </h1>

                        <p className={`text-lg sm:text-2xl text-slate-700 leading-relaxed mb-10 max-w-2xl transition-all duration-1000 delay-200 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            Verbinden Sie Ihren Betrieb mit tausenden aktiven Kundenanfragen in der Schweiz.
                            Fair, effizient und <strong className="text-slate-900 font-bold underline decoration-emerald-500 decoration-4 underline-offset-4">ohne Provision.</strong>
                        </p>

                        <div className={`flex flex-col sm:flex-row items-center gap-5 transition-all duration-1000 delay-300 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <Link
                                to="/register"
                                className="group relative inline-flex items-center justify-center gap-3 bg-emerald-600 text-white font-black px-10 py-5 rounded-2xl text-xl hover:bg-emerald-700 hover:scale-105 transition-all duration-300 shadow-2xl shadow-emerald-500/20"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Jetzt kostenlos Partner werden
                                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <div className="flex items-center gap-3 px-6 py-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 font-bold shadow-sm">
                                <SwissFlagIcon className="w-5 h-5" />
                                <span>Nr. 1 Handwerker-Portal</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── REDESIGNED STAT STRIPS (floating cards) ── */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 transition-all duration-1000 delay-500 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {[
                            { label: "Aktive Partner", value: "2'847+", icon: <ColoredUsersIcon className="w-6 h-6" />, color: "border-blue-100 bg-blue-50/50" },
                            { label: "Lead-Provision", value: "0%", icon: <ColoredBanknotesIcon className="w-6 h-6" />, color: "border-emerald-100 bg-emerald-50/50" },
                            { label: "Zufriedenheit", value: "98%", icon: <ColoredCheckCircleIcon className="w-6 h-6" />, color: "border-amber-100 bg-amber-50/50" },
                            { label: "Anfragen/Mt.", value: "5'000+", icon: <ColoredSparklesIcon className="w-6 h-6" />, color: "border-purple-100 bg-purple-50/50" }
                        ].map((stat, i) => (
                            <div key={i} className={`relative overflow-hidden group p-6 sm:p-8 rounded-[2rem] border ${stat.color} backdrop-blur-xl shadow-lg hover:-translate-y-2 transition-all duration-500`}>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/60 transition-colors"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="mb-4 p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">{stat.value}</div>
                                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-[0.2em] font-black text-center">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ 3 SCHRITTE - HOMEPAGE PREMIUM STYLE ══════════ */}
            <section
                ref={stepsRef}
                className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-white"
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className={`text-center max-w-3xl mx-auto mb-16 sm:mb-24 transition-all duration-1000 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="mb-6 text-4xl sm:text-5xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]" dangerouslySetInnerHTML={{ __html: t.steps.title }} />
                        <p className="text-lg text-slate-500 font-medium">{t.steps.subtitle}</p>
                    </div>

                    {/* Horizontal Flow Container */}
                    <div className="relative">
                        {/* Connecting dashed line (Desktop only) */}
                        <div className="hidden lg:block absolute top-[100px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200 -z-10"></div>

                        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory pb-8 lg:pb-0 lg:overflow-visible items-stretch justify-start lg:justify-between gap-6 lg:gap-4 no-scrollbar">
                            {[
                                { step: t.steps.step1, number: "01", icon: <ColoredMagnifyingGlassIcon className="w-12 h-12" />, colorClass: "text-emerald-600", bgClass: "bg-emerald-50", delay: 0 },
                                { step: t.steps.step2, number: "02", icon: <ColoredChatBubbleLeftRightIcon className="w-12 h-12" />, colorClass: "text-blue-600", bgClass: "bg-blue-50", delay: 200 },
                                { step: t.steps.step3, number: "03", icon: <ColoredCheckCircleIcon className="w-12 h-12" />, colorClass: "text-purple-600", bgClass: "bg-purple-50", delay: 400 }
                            ].map((item, index) => (
                                <React.Fragment key={item.number}>
                                    <div className={`flex flex-row items-center shrink-0 w-[85%] sm:w-[70%] lg:w-auto lg:flex-1 snap-center transition-all duration-1000 transform ${stepsInView ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{ transitionDelay: `${item.delay}ms` }}>
                                        <div className="relative w-full max-w-2xl lg:max-w-sm mx-auto bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group">

                                            {/* Illustration Area */}
                                            <div className="mb-10 w-full flex justify-center">
                                                <div className="relative w-40 h-40 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-700">
                                                    {item.icon}
                                                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-lg flex items-center justify-center text-xl font-black text-slate-900">
                                                        {item.number}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Area */}
                                            <div className="w-full">
                                                <div className={`text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 ${item.colorClass}`}>
                                                    Schritt {index + 1}
                                                </div>
                                                <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-4 tracking-tight">
                                                    {item.step.title}
                                                </h3>
                                                <p className="text-slate-500 font-medium leading-relaxed mb-8 text-sm lg:text-base">
                                                    {item.step.desc}
                                                </p>

                                                {/* Features */}
                                                <ul className="text-left space-y-3">
                                                    {item.step.features.map((feature: string, fIdx: number) => (
                                                        <li key={fIdx} className="flex items-start text-sm text-slate-600 font-medium">
                                                            <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full mt-0.5 mr-3 ${item.bgClass} ${item.colorClass}`}>
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </span>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aufwand:</span>
                                                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                                        {item.step.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop Arrow between cards */}
                                    {index < 2 && (
                                        <div className={`hidden lg:flex shrink-0 w-16 h-16 items-center justify-center transition-all duration-1000 ${stepsInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: `${item.delay + 100}ms` }}>
                                            <svg className="w-10 h-10 text-emerald-400 opacity-60 animate-[pulse_3s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ COMPARISON SHOWCASE ══════════ */}
            <div ref={benefitsRef}>
                <ProviderComparison t={t} language={language} />
            </div>

            {/* ══════════ CATEGORIES Showcase ══════════ */}
            <section ref={categoriesRef} className="py-24 sm:py-32 lg:py-40 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${categoriesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: t.categories.title }} />
                        <p className="text-slate-600 text-lg font-medium">{t.categories.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
                        {categories.map((cat, idx) => (
                            <div key={idx} className={`group relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl ${categoriesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${idx * 50}ms` }}>
                                <div className="mb-6 w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-500">
                                    {cat.icon}
                                </div>
                                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">{cat.name}</h3>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <span className="text-emerald-600">{cat.leads}</span>
                                    <span>{t.categories.leadsPerMonth}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ FAQ SECTION ══════════ */}
            <section ref={faqRef} className="py-24 sm:py-32 lg:py-40 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className={`text-center mb-20 transition-all duration-1000 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6" dangerouslySetInnerHTML={{ __html: t.faq.title }} />
                        <p className="text-slate-600 text-lg font-medium">{t.faq.subtitle}</p>
                    </div>

                    <div className="space-y-4">
                        {t.faq.items.map((item: any, idx: number) => (
                            <div key={idx} className={`rounded-2xl border border-slate-200 transition-all duration-500 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none group"
                                >
                                    <span className="text-lg font-black text-slate-800 group-hover:text-emerald-600 transition-colors">{item.q}</span>
                                    <ChevronDownIcon className={`w-6 h-6 text-slate-400 transition-transform duration-500 ${openFaq === idx ? 'rotate-180 text-emerald-500' : ''}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 animate-fade-in text-slate-600 font-medium leading-relaxed">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ FINAL CTA ══════════ */}
            <section ref={ctaRef} className="py-24 sm:py-32 lg:py-40 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5 blur-[150px] -translate-y-1/2"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className={`max-w-5xl mx-auto rounded-[40px] bg-gradient-to-br from-emerald-500 to-teal-600 p-8 sm:p-16 lg:p-24 text-center text-white shadow-2xl transition-all duration-1000 ${ctaInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/20">
                            <SwissFlagIcon className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-widest">{t.finalCta.badge}</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">{t.finalCta.title}</h2>
                        <p className="text-lg sm:text-2xl text-white/80 font-medium mb-12 max-w-2xl mx-auto">{t.finalCta.description}</p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/register" className="w-full sm:w-auto px-10 py-5 bg-white text-emerald-700 font-black text-xl rounded-2xl hover:scale-105 transition-all shadow-2xl">
                                {t.finalCta.button}
                            </Link>
                        </div>

                        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-bold opacity-80">
                            <div className="flex items-center gap-2"><CheckIcon className="w-5 h-5" /> {t.finalCta.noCard}</div>
                            <div className="flex items-center gap-2"><CheckIcon className="w-5 h-5" /> 100% Kostenlos</div>
                            <div className="flex items-center gap-2"><CheckIcon className="w-5 h-5" /> Schweizer Support</div>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    );
};

export default ProvidersPage;
