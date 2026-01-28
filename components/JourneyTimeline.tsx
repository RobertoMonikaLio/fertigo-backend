import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const JourneyTimeline: React.FC = () => {
    const [activeMilestone, setActiveMilestone] = useState(0);
    const [progress, setProgress] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);
    const { ref: sectionRef, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false
    });

    // Auto-progress animation
    useEffect(() => {
        if (!inView) return;
        
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setActiveMilestone(prevMilestone => (prevMilestone + 1) % 4);
                    return 0;
                }
                return prev + 0.5;
            });
        }, 50);
        
        return () => clearInterval(interval);
    }, [inView]);

    const milestones = [
        {
            id: 0,
            title: "Start",
            subtitle: "Projektidee erfassen",
            description: "Beginnen Sie Ihre Reise mit einer einfachen Projektbeschreibung",
            time: "0 min",
            icon: (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <linearGradient id="startGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="40" fill="url(#startGradient)" opacity="0.1" stroke="url(#startGradient)" strokeWidth="3"/>
                    <path d="M30 50 L45 65 L70 35" stroke="url(#startGradient)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="50" cy="50" r="8" fill="url(#startGradient)"/>
                </svg>
            ),
            color: "from-blue-500 to-purple-500"
        },
        {
            id: 1,
            title: "Match",
            subtitle: "KI findet Experten",
            description: "Unsere KI analysiert Ihr Projekt und vermittelt passende Fachkräfte",
            time: "30 sec",
            icon: (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <filter id="pulse">
                            <feGaussianBlur stdDeviation="2" result="blur"/>
                            <feMerge>
                                <feMergeNode in="blur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <g filter="url(#pulse)">
                        <circle cx="30" cy="40" r="12" fill="url(#matchGradient)" opacity="0.7"/>
                        <circle cx="70" cy="40" r="12" fill="url(#matchGradient)" opacity="0.7"/>
                        <circle cx="50" cy="70" r="12" fill="url(#matchGradient)" opacity="0.7"/>
                    </g>
                    <line x1="30" y1="40" x2="50" y2="70" stroke="url(#matchGradient)" strokeWidth="3"/>
                    <line x1="70" y1="40" x2="50" y2="70" stroke="url(#matchGradient)" strokeWidth="3"/>
                    <line x1="30" y1="40" x2="70" y2="40" stroke="url(#matchGradient)" strokeWidth="3"/>
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3s" repeatCount="indefinite"/>
                </svg>
            ),
            color: "from-emerald-500 to-cyan-500"
        },
        {
            id: 2,
            title: "Compare",
            subtitle: "Angebote bewerten",
            description: "Vergleichen Sie transparent alle Angebote und wählen Sie das beste",
            time: "2 min",
            icon: (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <linearGradient id="compareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                    </defs>
                    <rect x="15" y="25" width="25" height="35" rx="4" fill="white" stroke="url(#compareGradient)" strokeWidth="2"/>
                    <rect x="45" y="15" width="25" height="45" rx="4" fill="url(#compareGradient)" stroke="url(#compareGradient)" strokeWidth="2"/>
                    <rect x="75" y="35" width="25" height="25" rx="4" fill="white" stroke="#cbd5e1" strokeWidth="1"/>
                    
                    <line x1="40" y1="42" x2="45" y2="42" stroke="url(#compareGradient)" strokeWidth="2"/>
                    <line x1="70" y1="42" x2="75" y2="42" stroke="url(#compareGradient)" strokeWidth="2"/>
                    
                    <circle cx="57" cy="45" r="12" fill="white"/>
                    <path d="M52 45 L56 49 L62 43" stroke="url(#compareGradient)" strokeWidth="3" fill="none"/>
                </svg>
            ),
            color: "from-amber-500 to-red-500"
        },
        {
            id: 3,
            title: "Success",
            subtitle: "Projekt starten",
            description: "Beginnen Sie Ihr Projekt mit dem perfekt gewählten Partner",
            time: "5 min",
            icon: (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                        <radialGradient id="sparkle">
                            <stop offset="0%" stopColor="#fbbf24"/>
                            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                        </radialGradient>
                    </defs>
                    <circle cx="50" cy="50" r="35" fill="url(#successGradient)" opacity="0.1" stroke="url(#successGradient)" strokeWidth="3"/>
                    <path d="M35 50 L45 60 L65 40" stroke="url(#successGradient)" strokeWidth="6" fill="none" strokeLinecap="round"/>
                    <circle cx="50" cy="50" r="25" fill="none" stroke="url(#successGradient)" strokeWidth="2" strokeDasharray="4,4">
                        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite"/>
                    </circle>
                    
                    {/* Sparkles */}
                    <circle cx="25" cy="25" r="3" fill="url(#sparkle)">
                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="75" cy="25" r="2" fill="url(#sparkle)">
                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                    </circle>
                    <circle cx="25" cy="75" r="2.5" fill="url(#sparkle)">
                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s"/>
                    </circle>
                    <circle cx="75" cy="75" r="3" fill="url(#sparkle)">
                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1.5s"/>
                    </circle>
                </svg>
            ),
            color: "from-purple-500 to-pink-500"
        }
    ];

    return (
        <section ref={sectionRef} className="relative py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute top-1/3 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-40" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-50" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-20 right-1/3 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping opacity-30" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                {/* Header */}
                <div className={`text-center mb-24 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse"></div>
                        <span className="text-sm font-bold text-white/90 uppercase tracking-wider">Interactive Journey</span>
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse"></div>
                    </div>
                    
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1]">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                            Ihre Reise zum
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            perfekten Angebot
                        </span>
                    </h2>
                    
                    <p className="text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto font-medium leading-relaxed">
                        Ein interaktiver Wegweiser durch jeden Schritt Ihrer Projektfindung
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative" ref={timelineRef}>
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-white/10 rounded-full -translate-y-1/2 transform origin-left">
                        <div 
                            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                        
                        {/* Progress Percentage */}
                        <div className="absolute -top-12 right-0 transform -translate-x-1/2">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                                <span className="text-white font-bold text-lg">{Math.round(progress)}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Milestones */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {milestones.map((milestone, index) => {
                            const isActive = activeMilestone === index;
                            const isCompleted = activeMilestone > index;
                            const isInViewMilestone = inView;
                            
                            return (
                                <div
                                    key={milestone.id}
                                    className={`relative group transition-all duration-700 ${
                                        isInViewMilestone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                    onClick={() => {
                                        setActiveMilestone(index);
                                        setProgress(index * 33.33);
                                    }}
                                >
                                    {/* Milestone Connector */}
                                    {index < milestones.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                                                isCompleted 
                                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 scale-110' 
                                                    : isActive 
                                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-105' 
                                                        : 'bg-white/20 border-2 border-white/30'
                                            }`}>
                                                {isCompleted ? (
                                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        isActive ? 'bg-white' : 'bg-white/50'
                                                    }`}></div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Milestone Card */}
                                    <div className={`relative h-full rounded-3xl p-8 transition-all duration-500 transform ${
                                        isActive 
                                            ? 'bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl scale-105 ring-2 ring-white/30 -translate-y-2' 
                                            : isCompleted
                                                ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 backdrop-blur-lg hover:scale-105 hover:-translate-y-1' 
                                                : 'bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:scale-102'
                                    } border border-white/20`}>
                                        
                                        {/* Milestone Number/Icon */}
                                        <div className={`absolute -top-5 -left-5 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl transition-all duration-500 ${
                                            isActive 
                                                ? `bg-gradient-to-br ${milestone.color} scale-110 rotate-6` 
                                                : isCompleted
                                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 scale-100'
                                                    : `bg-gradient-to-br ${milestone.color} group-hover:scale-105 group-hover:rotate-3`
                                        }`}>
                                            {isCompleted ? (
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                milestone.id + 1
                                            )}
                                        </div>

                                        {/* Icon */}
                                        <div className={`w-20 h-20 mx-auto mb-6 transition-all duration-500 ${
                                            isActive 
                                                ? 'scale-110 -rotate-3 filter drop-shadow-2xl' 
                                                : 'group-hover:scale-105 group-hover:-rotate-1'
                                        }`}>
                                            {milestone.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-2 mb-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                                                    isActive 
                                                        ? `bg-gradient-to-r ${milestone.color} text-white` 
                                                        : isCompleted
                                                            ? 'bg-emerald-500/30 text-emerald-300'
                                                            : 'bg-white/10 text-white/70 group-hover:bg-white/20'
                                                }`}>
                                                    {milestone.time}
                                                </span>
                                            </div>
                                            
                                            <h3 className={`text-2xl lg:text-3xl font-black mb-3 transition-colors duration-300 ${
                                                isActive 
                                                    ? 'text-white' 
                                                    : isCompleted 
                                                        ? 'text-emerald-300' 
                                                        : 'text-white/80 group-hover:text-white'
                                            }`}>
                                                {milestone.title}
                                            </h3>
                                            
                                            <h4 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                                                isActive 
                                                    ? 'text-cyan-300' 
                                                    : isCompleted 
                                                        ? 'text-emerald-400' 
                                                        : 'text-white/60 group-hover:text-white/80'
                                            }`}>
                                                {milestone.subtitle}
                                            </h4>
                                            
                                            <p className={`leading-relaxed transition-colors duration-300 ${
                                                isActive 
                                                    ? 'text-white/90' 
                                                    : isCompleted 
                                                        ? 'text-white/70' 
                                                        : 'text-white/60 group-hover:text-white/80'
                                            }`}>
                                                {milestone.description}
                                            </p>
                                        </div>

                                        {/* Completion Badge */}
                                        {isCompleted && (
                                            <div className="absolute top-4 right-4">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Progress Indicator */}
                    <div className="flex justify-center mt-12 lg:hidden space-x-2">
                        {milestones.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    activeMilestone === index 
                                        ? 'bg-gradient-to-r from-cyan-400 to-purple-500 w-12' 
                                        : activeMilestone > index
                                            ? 'bg-emerald-500 w-8'
                                            : 'bg-white/20 w-4'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className={`text-center mt-24 transition-all duration-1000 delay-700 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="inline-flex items-center gap-6 px-8 py-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 border-2 border-white flex items-center justify-center shadow-lg">
                                    <span className="text-lg font-black text-slate-900">★</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-left text-white">
                            <div className="font-black text-xl">50.000+ zufriedene Kunden</div>
                            <div className="text-white/70">Vertrauen in unsere Reise</div>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center animate-pulse">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneyTimeline;