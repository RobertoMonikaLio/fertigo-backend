import React from 'react';
import { useInView } from 'react-intersection-observer';

const GuaranteeSection: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
            
            {/* Split Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-slate-900" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="max-w-5xl mx-auto">
                    
                    {/* Header */}
                    <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                            Unser Versprechen
                        </h2>
                        <p className="text-slate-400 text-lg">
                            4 Garantien für Ihre Sicherheit
                        </p>
                    </div>

                    {/* Floating Cards */}
                    <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {[
                            { emoji: '💰', value: 'CHF 0.–', label: 'Kostenlos für Sie' },
                            { emoji: '⚡', value: '< 24h', label: 'Erste Offerten' },
                            { emoji: '✅', value: '100%', label: 'Geprüfte Profis' },
                            { emoji: '🔒', value: 'DSG', label: 'Datenschutz CH' },
                        ].map((item, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-2xl p-6 text-center shadow-xl shadow-slate-900/10 hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="text-4xl mb-3">{item.emoji}</div>
                                <div className="text-2xl font-black text-slate-900 mb-1">{item.value}</div>
                                <div className="text-slate-500 text-sm">{item.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Trust Line */}
                    <div className={`mt-12 text-center transition-all duration-700 delay-400 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-white rounded-full px-8 py-4 shadow-lg">
                            <div className="flex items-center gap-2">
                                <span className="text-amber-500">★★★★★</span>
                                <span className="font-bold text-slate-900">4.9</span>
                            </div>
                            <div className="h-5 w-px bg-slate-200" />
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🇨🇭</span>
                                <span className="text-slate-600">Swiss Made</span>
                            </div>
                            <div className="h-5 w-px bg-slate-200" />
                            <div className="text-slate-600">
                                <span className="font-bold text-slate-900">50'000+</span> Kunden
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuaranteeSection;
