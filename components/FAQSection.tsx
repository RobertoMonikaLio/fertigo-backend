import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAppContext } from '../pages/AppContext';
import { translations } from './translations';

const FAQSection: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [openIndex, setOpenIndex] = useState<number>(0);
    const { language } = useAppContext();
    const t = translations[language] || translations['de'];
    const faqs = t.faq.items;

    return (
        <section ref={ref} className="relative py-14 sm:py-20 lg:py-28 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

                {/* Header */}
                <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-2xl sm:text-3xl sm:text-4xl font-black text-slate-900">
                        {t.faq.title}
                    </h2>
                </div>

                {/* FAQ List */}
                <div className={`space-y-2 sm:space-y-3 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${openIndex === index
                                ? 'border-green-500 shadow-lg shadow-green-500/10'
                                : 'border-transparent shadow-sm hover:shadow-md'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                            >
                                <span className={`font-bold text-sm sm:text-base transition-colors ${openIndex === index ? 'text-green-600' : 'text-slate-900'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3 transition-all duration-300 ${openIndex === index
                                    ? 'bg-green-500 rotate-180'
                                    : 'bg-slate-100'
                                    }`}>
                                    <svg
                                        className={`w-4 h-4 transition-colors ${openIndex === index ? 'text-white' : 'text-slate-500'
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40' : 'max-h-0'
                                }`}>
                                <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
