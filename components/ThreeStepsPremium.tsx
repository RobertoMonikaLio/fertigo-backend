import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../pages/AppContext';
import { translations } from './translations';
import { ArrowRightIcon, SwissFlagIcon } from './icons';

// --- Custom Modern Vectors ---
const VectorDescription = () => (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-700 ease-out border border-slate-100">
        <img
            src="/images/journey/step1.png"
            alt="Projekt beschreiben"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
);

const VectorComparison = () => (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-700 ease-out border border-slate-100">
        <img
            src="/images/journey/step2.png"
            alt="Anbieter vergleichen"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
);

const VectorCompletion = () => (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-700 ease-out border border-slate-100">
        <img
            src="/images/journey/step3.png"
            alt="Projekt abschliessen"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
);


const ThreeStepsPremium: React.FC = () => {
    const { language, openQuoteModal } = useAppContext();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    const [activeStep, setActiveStep] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollPosition = scrollRef.current.scrollLeft;
        const cardWidth = scrollRef.current.offsetWidth * 0.85;
        const index = Math.round(scrollPosition / cardWidth);
        if (index !== activeStep) {
            setActiveStep(index);
        }
    };

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
                    className={`mx-auto mb-12 sm:mb-20 max-w-3xl text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
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

                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex flex-row overflow-x-auto snap-x snap-mandatory pb-8 lg:pb-0 lg:overflow-visible items-stretch justify-start lg:justify-between gap-6 lg:gap-4 no-scrollbar"
                    >
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex flex-row items-center shrink-0 w-[85%] sm:w-[70%] lg:w-auto lg:flex-1 snap-center">
                                <React.Fragment>

                                    {/* Card Wrapper */}
                                    <div
                                        className={`group flex-1 w-full lg:w-auto flex flex-col items-center transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                                            }`}
                                        style={{ transitionDelay: `${index * 200}ms` }}
                                    >
                                        <div className="relative w-full max-w-2xl lg:max-w-sm mx-auto bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center">

                                            {/* Illustration on top */}
                                            <div className="mb-8 mt-2 w-48 sm:w-56 lg:w-full">
                                                {step.vector}
                                            </div>

                                            {/* Content Area below illustration */}
                                            <div className="w-full">
                                                <div className={`text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 ${step.colorClass}`}>
                                                    Schritt {index + 1}
                                                </div>
                                                <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-4 tracking-tight">
                                                    {index === 0 ? 'Projekt beschreiben' : step.title}
                                                </h3>
                                                <p className="text-slate-500 font-medium leading-relaxed mb-8 text-sm lg:text-base">
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

                                    {/* Mobile Arrow (Hidden if on one line) */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:hidden items-center justify-center px-2">
                                            <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    )}
                                </React.Fragment>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Pagination Dots */}
                    <div className="flex lg:hidden justify-center gap-2 mt-4">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 transition-all duration-300 rounded-full ${activeStep === i ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-200'
                                    }`}
                            />
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
};

export default ThreeStepsPremium;
