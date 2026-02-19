import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from './icons';
import { useAppContext } from '../pages/AppContext';
import { translations } from './translations';

const StickyCta: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { openQuoteModal, language } = useAppContext();
    const t = translations[language] || translations['de'];

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky CTA after scrolling past hero section (approximately 600px)
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 600);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Desktop Version */}
            <div className="hidden md:block fixed bottom-8 right-8 z-50 animate-slide-up">
                <button
                    onClick={() => openQuoteModal()}
                    className="group bg-primary-600 text-white font-bold px-6 py-4 rounded-full shadow-2xl hover:bg-primary-700 transition-all duration-300 flex items-center gap-3 hover:shadow-primary-600/50 hover:-translate-y-1 animate-pulse-subtle"
                >
                    <span className="text-base">{t.stickyCta.desktopText}</span>
                    <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
            </div>

            {/* Mobile Version - Full Width Bottom Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
                <div className="bg-white border-t border-slate-200 shadow-2xl p-4">
                    <button
                        onClick={() => openQuoteModal()}
                        className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary-700 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                    >
                        <span className="text-base">{t.stickyCta.mobileText}</span>
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default StickyCta;
