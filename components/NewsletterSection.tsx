import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAppContext } from '../pages/AppContext';
import { translations } from './translations';

const NewsletterSection: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { language } = useAppContext();
    const t = translations[language] || translations['de'];
    const content = t.newsletter;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setEmail('');
        }
    };

    return (
        <section ref={ref} className="relative py-12 sm:py-16 lg:py-20 bg-green-600 overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="nlDots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#nlDots)" />
                </svg>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                    {/* ===== MOBILE ONLY ===== */}
                    <div className="sm:hidden text-center px-1">
                        {/* Mail icon */}
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h9" />
                                <path d="M22 6l-10 7L2 6" />
                                <circle cx="19" cy="19" r="3" fill="white" fillOpacity="0.2" stroke="white" />
                                <path d="M19 17.5v3M19 17.5l1.5 1.5M19 17.5l-1.5 1.5" strokeWidth={1.5} />
                            </svg>
                        </div>

                        {/* Headline */}
                        <h2 className="text-white font-black text-xl leading-tight mb-1.5">
                            {content.mobileTitle}
                        </h2>
                        <p className="text-white/60 text-xs leading-relaxed mb-5 mx-auto max-w-[260px]">
                            {content.mobileSubtitle}
                        </p>

                        {/* Form */}
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-2.5 text-left">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={content.placeholder}
                                    required
                                    className="w-full px-4 py-3.5 bg-white rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-white/20 text-sm font-medium shadow-lg"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl transition-all duration-200 text-sm active:scale-[0.98] shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                                >
                                    {content.mobileButton}
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>
                        ) : (
                            <div className="bg-white rounded-xl p-4 shadow-lg flex flex-col items-center gap-1.5">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-0.5">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-bold text-slate-900 text-sm">{content.successTitle}</span>
                                <span className="text-slate-500 text-xs">{content.successSubtitle}</span>
                            </div>
                        )}

                        {/* Trust */}
                        <div className="mt-4 flex items-center justify-center gap-3 text-white/40 text-[10px] font-medium">
                            {content.trust.map((item, index) => (
                                <React.Fragment key={index}>
                                    <span>{item}</span>
                                    {index < content.trust.length - 1 && <span>·</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* ===== DESKTOP (unchanged) ===== */}
                    <div className="hidden sm:block">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">

                            {/* Left Content */}
                            <div className="lg:max-w-lg">
                                <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                                    {content.title}
                                </h2>
                                <p className="text-green-100 text-lg">
                                    {content.subtitle}
                                </p>
                            </div>

                            {/* Right Form */}
                            <div className="flex-1 lg:max-w-xl">
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder={content.placeholder}
                                            required
                                            className="flex-1 px-5 py-4 bg-white rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all text-lg"
                                        />
                                        <button
                                            type="submit"
                                            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2"
                                        >
                                            {content.button}
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </form>
                                ) : (
                                    <div className="flex items-center gap-3 bg-white rounded-xl px-6 py-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{content.successTitle}</div>
                                            <div className="text-slate-500 text-sm">{content.successSubtitle}</div>
                                        </div>
                                    </div>
                                )}

                                {/* Trust Points */}
                                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-green-100">
                                    {content.trust.map((item, index) => (
                                        <span key={index} className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
