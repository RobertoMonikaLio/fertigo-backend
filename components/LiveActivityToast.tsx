import React, { useState, useEffect } from 'react';
import { MapPinIcon, CheckCircleIcon } from './icons';

const locations = ['Zürich', 'Bern', 'Basel', 'Genf', 'Luzern', 'St. Gallen', 'Winterthur', 'Lausanne'];
const services = [
    'Malerarbeiten', 'Gartenpflege', 'Umzugsreinigung', 'Bodenlegerarbeiten', 'einen Elektriker',
    'einen Sanitär', 'einen Umzug', 'eine Fensterreinigung'
];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const LiveActivityToast: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [activity, setActivity] = useState({ location: '', service: '' });

    useEffect(() => {
        const showToast = () => {
            setActivity({
                location: getRandomItem(locations),
                service: getRandomItem(services),
            });
            setIsExiting(false);
            setIsVisible(true);

            // Hide after 5 seconds
            setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => setIsVisible(false), 500); // Wait for animation
            }, 5000);
        };

        // Initial delay before the first toast
        const initialTimeout = setTimeout(showToast, 7000);

        // Interval to show subsequent toasts (e.g., every 15 seconds)
        const interval = setInterval(showToast, 15000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div 
            className={`hidden lg:block fixed bottom-6 left-6 z-[100] transition-transform duration-500 ease-in-out ${isExiting ? 'animate-slide-out-down' : 'animate-slide-in-up'}`}
            role="status"
            aria-live="polite"
        >
            <div className="max-w-sm bg-white/95 backdrop-blur-lg border border-slate-200/80 text-slate-800 rounded-xl shadow-2xl p-4 flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                    <CheckCircleIcon className="h-8 w-8 text-green-500"/>
                </div>
                <div className="flex-grow text-sm">
                    <p className="font-bold text-slate-900">Gerade eben...</p>
                    <p className="text-slate-600 mt-0.5">
                        ...hat jemand in <span className="font-semibold">{activity.location}</span> eine Offerte für <span className="font-semibold">{activity.service}</span> angefordert.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LiveActivityToast;