import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';
import { translations } from './translations';
import { ArrowRightIcon, SwissFlagIcon } from './icons';

// --- Custom Modern Vectors ---
const VectorDescription = () => (
    <div className="relative w-28 h-28 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <div className="absolute inset-0 bg-blue-50 rounded-full scale-110 opacity-80 group-hover:bg-blue-100 transition-colors duration-500"></div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-200 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-2 left-0 w-3 h-3 bg-blue-300 rounded-full opacity-40"></div>
        <svg viewBox="0 0 24 24" fill="none" className="relative z-10 w-16 h-16 text-blue-600 drop-shadow-sm" stroke="currentColor" strokeWidth="1.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
        </svg>
    </div>
);

const VectorComparison = () => (
    <div className="relative w-28 h-28 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <div className="absolute inset-0 bg-emerald-50 rounded-full scale-110 opacity-80 group-hover:bg-emerald-100 transition-colors duration-500"></div>
        <div className="absolute top-2 left-1 w-4 h-4 bg-emerald-300 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-200 rounded-lg rotate-12 opacity-50"></div>
        <svg viewBox="0 0 24 24" fill="none" className="relative z-10 w-16 h-16 text-emerald-600 drop-shadow-sm" stroke="currentColor" strokeWidth="1.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    </div>
);

const VectorCompletion = () => (
    <div className="relative w-28 h-28 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <div className="absolute inset-0 bg-purple-50 rounded-[2rem] rotate-3 scale-110 opacity-80 group-hover:bg-purple-100 transition-colors duration-500"></div>
        <div className="absolute -top-2 left-1/2 w-6 h-6 border-2 border-purple-200 rounded-full opacity-60"></div>
        <div className="absolute bottom-2 -right-2 w-4 h-4 bg-purple-300 rounded-full opacity-50"></div>
        <svg viewBox="0 0 24 24" fill="none" className="relative z-10 w-16 h-16 text-purple-600 drop-shadow-sm" stroke="currentColor" strokeWidth="1.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
    </div>
);


const ThreeStepsPremium: React.FC = () => {
    const { language, openQuoteModal } = useAppContext();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    const t = translations[language] || translations['de'];
    const journey = t.journey;

    const steps = [
        {
            number: "01",
            title: journey.step1.title,
            description: journey.step1.description,
            features: journey.step1.features,
            vector: <VectorDescription />,
            colorClass: "text-blue-600",
            bgClass: "bg-blue-50"
        },
        {
            number: "02",
            title: journey.step2.title,
            description: journey.step2.description,
            features: journey.step2.features,
            vector: <VectorComparison />,
            colorClass: "text-emerald-600",
            bgClass: "bg-emerald-50"
        },
        {
            number: "03",
            title: journey.step3.title,
            description: journey.step3.description,
            features: journey.step3.features,
            vector: <VectorCompletion />,
            colorClass: "text-purple-600",
            bgClass: "bg-purple-50"
        }
    ];

    return (
        <section ref={ref} className="relative py-24 sm:py-32 bg-white overflow-hidden font-sans">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* Header Sequence */}
                <div
                    className={`mx-auto mb-20 max-w-3xl text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 shadow-sm">
                        <SwissFlagIcon className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Der einfachste Weg zum Ziel
                        </span>
                    </div>
                    <h2 className="mb-6 text-4xl sm:text-5xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                        {journey.titlePrefix}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                            {journey.titleHighlight}
                        </span>
                    </h2>
                    <p className="text-lg text-slate-500 font-medium">
                        {journey.description}
                    </p>
                </div>

                {/* Horizontal Flow Container */}
                <div className="relative">
                    {/* Connecting dashed line (Desktop only) */}
                    <div className="hidden lg:block absolute top-[100px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200 -z-10"></div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.number}>

                                {/* Card */}
                                <div
                                    className={`group flex-1 w-full lg:w-auto flex flex-col items-center text-center transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <div className="relative w-full max-w-sm mx-auto bg-white rounded-[2rem] p-8 lg:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-500">

                                        {/* Step Number Badge */}
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-slate-100 shadow-sm text-sm font-black text-slate-300 tracking-wider">
                                            {step.number}
                                        </div>

                                        {/* Vector Graphic Area */}
                                        <div className="mb-10 mt-4">
                                            {step.vector}
                                        </div>

                                        {/* Content Area */}
                                        <div className={`text-sm font-bold uppercase tracking-widest mb-3 ${step.colorClass}`}>
                                            Schritt {index + 1}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                                            {index === 0 ? 'Projekt beschreiben' : step.title}
                                        </h3>
                                        <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                            {step.description}
                                        </p>

                                        {/* Feature Checklist */}
                                        <ul className="text-left space-y-3">
                                            {step.features.map((feature, i) => (
                                                <li key={i} className="flex items-start text-sm text-slate-600 font-medium">
                                                    <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full mt-0.5 mr-3 ${step.bgClass} ${step.colorClass}`}>
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Desktop Arrow between cards */}
                                {index < steps.length - 1 && (
                                    <div
                                        className={`hidden lg:flex shrink-0 w-16 h-16 items-center justify-center transition-all duration-1000 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                                            }`}
                                        style={{ transitionDelay: `${index * 200 + 100}ms` }}
                                    >
                                        <svg className="w-10 h-10 text-emerald-400 opacity-60 animate-[pulse_3s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                )}

                                {/* Mobile Arrow (Chevron Down) */}
                                {index < steps.length - 1 && (
                                    <div className="lg:hidden flex items-center justify-center h-8">
                                        <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Main CTA */}
                <div className={`mt-24 text-center transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="relative inline-block">
                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl opacity-60" />
                        <button
                            onClick={() => openQuoteModal()}
                            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-slate-900 px-10 py-4 font-bold text-white shadow-xl transition-all hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 hover:ring-4 hover:ring-slate-900/10"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-lg">
                                Jetzt gratis & unverbindlich anfragen
                                <ArrowRightIcon className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                        </button>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
                        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        In 2 Minuten ausgefüllt
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ThreeStepsPremium;
