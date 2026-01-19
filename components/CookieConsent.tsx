import React, { useState, useEffect } from 'react';
import { CookieIcon } from './icons';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent_v2');
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500); // Delay appearance
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAction = (consentValue: 'accepted' | 'rejected') => {
        localStorage.setItem('cookie_consent_v2', consentValue);
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsExiting(false);
        }, 500); // Match animation duration
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div 
            className={`fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto z-[101] transition-transform duration-500 ease-in-out ${isExiting ? 'animate-slide-out-down' : 'animate-slide-in-up'}`}
            role="dialog"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
        >
            <div className="max-w-lg bg-white/95 backdrop-blur-lg border border-slate-200/80 text-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex-shrink-0 mt-1">
                    <CookieIcon className="h-10 w-10 text-primary-600"/>
                </div>
                <div className="flex-grow text-center sm:text-left">
                    <h2 id="cookie-consent-title" className="font-bold text-base text-slate-900">Wir verwenden Cookies</h2>
                    <p id="cookie-consent-description" className="text-sm text-slate-600 mt-1">
                        Wir nutzen Cookies für ein optimales Erlebnis. Mehr in unserer <Link to="/impressum" className="font-semibold text-primary-600 hover:underline">Datenschutzerklärung</Link>.
                    </p>
                    <div className="mt-4 flex items-center justify-center sm:justify-start gap-3 w-full">
                        <button
                            onClick={() => handleAction('accepted')}
                            className="flex-1 sm:flex-none bg-primary-700 text-white font-bold px-5 py-2 rounded-lg hover:bg-primary-800 transition-all shadow-sm transform hover:scale-105"
                        >
                            Alle akzeptieren
                        </button>
                        <button
                            onClick={() => handleAction('rejected')}
                            className="flex-1 sm:flex-none bg-slate-100 text-slate-700 font-bold px-5 py-2 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            Ablehnen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;