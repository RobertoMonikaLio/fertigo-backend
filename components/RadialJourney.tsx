import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';
import { ArrowRightIcon, SwissFlagIcon, ColoredPencilIcon, ColoredMagnifyingGlassIcon, ColoredCheckCircleIcon } from './icons';
import { translations } from './translations';

const RadialJourney: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false
    });
    const { language } = useAppContext();
    const t = translations[language] || translations['de'];
    const journey = t.journey;

    const steps = [
        {
            id: 0,
            number: journey.step1.number,
            icon: <ColoredPencilIcon className="w-10 h-10" />,
            title: journey.step1.title,
            time: journey.step1.time,
            description: journey.step1.description,
            features: journey.step1.features,
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-50 to-emerald-50",
            swissValue: journey.step1.swissValue
        },
        {
            id: 1,
            number: journey.step2.number,
            icon: <ColoredMagnifyingGlassIcon className="w-10 h-10" />,
            title: journey.step2.title,
            time: journey.step2.time,
            description: journey.step2.description,
            features: journey.step2.features,
            gradient: "from-emerald-500 to-teal-500",
            bgGradient: "from-emerald-50 to-teal-50",
            swissValue: journey.step2.swissValue
        },
        {
            id: 2,
            number: journey.step3.number,
            icon: <ColoredCheckCircleIcon className="w-10 h-10" />,
            title: journey.step3.title,
            time: journey.step3.time,
            description: journey.step3.description,
            features: journey.step3.features,
            gradient: "from-teal-500 to-cyan-500",
            bgGradient: "from-teal-50 to-cyan-50",
            swissValue: journey.step3.swissValue
        }
    ];

    return (
        <section
            ref={ref}
            className="relative py-12 sm:py-28 lg:py-36 overflow-hidden bg-white"
        >

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
                {/* Header */}
                <div className={`text-center mb-8 sm:mb-16 lg:mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 mb-3 sm:mb-4 leading-tight lg:whitespace-nowrap">
                        In 3 Schritten zum{' '}
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                            perfekten Handwerker
                            <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                                <path d="M2 8C30 2 60 10 100 6C140 2 170 10 198 4" stroke="url(#underlineGradient)" strokeWidth="4" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#16a34a" />
                                        <stop offset="50%" stopColor="#10b981" />
                                        <stop offset="100%" stopColor="#14b8a6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-600 mx-auto lg:whitespace-nowrap max-w-xs sm:max-w-none">
                        Schweizer Qualität, Präzision und Vertrauen – so einfach finden Sie den passenden Experten
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-12 sm:mt-24 mb-8 lg:mb-16">

                    {/* ===== STEP 1: Main Feature Box (Bento Large) ===== */}
                    <div
                        className={`
                            w-full lg:w-7/12 relative bg-slate-50/50 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]
                            rounded-[2.5rem] overflow-hidden flex flex-col group
                            transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                        `}
                    >
                        {/* Floating background Number */}
                        <div className="absolute top-6 right-8 text-[180px] leading-none font-black text-slate-900/[0.03] select-none pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 z-0">
                            {steps[0].number}
                        </div>

                        <div className="p-8 sm:p-10 lg:p-14 relative z-10 flex-1 flex flex-col">
                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white font-bold text-sm shadow-md">
                                    <span className="opacity-60 text-xs font-medium uppercase tracking-wider">Step</span>
                                    {steps[0].number}
                                </div>
                                <span className={`text-sm font-bold px-4 py-1.5 rounded-full bg-gradient-to-r ${steps[0].bgGradient} text-slate-800 shadow-sm border border-white`}>
                                    {steps[0].time}
                                </span>
                                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                                    <SwissFlagIcon className="w-4 h-4 grayscale opacity-60" />
                                    {steps[0].swissValue}
                                </div>
                            </div>

                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight group-hover:text-green-700 transition-colors duration-300">
                                {steps[0].title}
                            </h3>

                            <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-md">
                                {steps[0].description}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-12 lg:mb-16 mt-auto">
                                {steps[0].features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                            <svg className="w-3.5 h-3.5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700 font-semibold text-sm sm:text-base leading-snug">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Giant Icon Visual Display */}
                            <div className="relative w-full aspect-[21/9] rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 overflow-hidden">
                                <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${steps[0].gradient}`} />
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${steps[0].gradient} transition-opacity duration-700`} />
                                <div className="scale-[2.5] sm:scale-[3] group-hover:scale-[3.3] group-hover:-rotate-3 transition-transform duration-700 drop-shadow-md">
                                    {steps[0].icon}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== STEP 2 & 3: Stacked Boxes ===== */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-6 lg:gap-8">

                        {/* Step 2 Box */}
                        <div
                            className={`
                                flex-1 relative bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]
                                rounded-[2.5rem] p-8 lg:p-10 overflow-hidden flex flex-col group
                                transition-all duration-1000 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                            `}
                        >
                            <div className="absolute -bottom-6 -right-6 text-[180px] leading-none font-black text-slate-900/[0.03] select-none pointer-events-none group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 z-0">
                                {steps[1].number}
                            </div>

                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                        <div className="scale-125">{steps[1].icon}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Step {steps[1].number}</span>
                                        <span className="text-sm font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">{steps[1].time}</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4 tracking-tight relative z-10 group-hover:text-emerald-600 transition-colors duration-300">
                                {steps[1].title}
                            </h3>

                            <p className="text-slate-500 leading-relaxed mb-8 flex-1 relative z-10">
                                {steps[1].description}
                            </p>

                            <div className="space-y-3 relative z-10 border-t border-slate-100 pt-6">
                                {steps[1].features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center mt-[2px]">
                                            <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-600 font-medium text-sm leading-snug">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step 3 Box - Premium Dark Mode Inversion */}
                        <div
                            className={`
                                flex-1 relative bg-slate-900 shadow-[0_20px_40px_rgb(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgb(0,0,0,0.25)]
                                rounded-[2.5rem] p-8 lg:p-10 overflow-hidden flex flex-col group
                                transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                            `}
                        >
                            {/* Glowing orb inside dark block */}
                            <div className={`absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full blur-[80px] opacity-40 bg-gradient-to-bl from-teal-400 to-cyan-500 pointer-events-none group-hover:opacity-70 group-hover:scale-110 transition-all duration-700`} />

                            <div className="absolute -bottom-6 -right-6 text-[180px] leading-none font-black text-white/[0.04] select-none pointer-events-none group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 z-0">
                                {steps[2].number}
                            </div>

                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300">
                                        <div className="scale-125 brightness-0 invert filter">{steps[2].icon}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white/50 uppercase tracking-wider mb-0.5">Step {steps[2].number}</span>
                                        <span className="text-sm font-bold text-teal-100 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">{steps[2].time}</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight relative z-10 group-hover:text-teal-300 transition-colors duration-300">
                                {steps[2].title}
                            </h3>

                            <p className="text-slate-300 leading-relaxed mb-8 flex-1 relative z-10">
                                {steps[2].description}
                            </p>

                            <div className="space-y-3 relative z-10 border-t border-slate-700 pt-6 mt-auto">
                                {steps[2].features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center mt-[2px]">
                                            <svg className="w-3 h-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-200 font-medium text-sm leading-snug">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RadialJourney;
