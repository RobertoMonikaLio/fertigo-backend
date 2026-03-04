import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const CustomerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('fertigo_customer');
        if (!stored) {
            setIsVerified(false);
            return;
        }
        try {
            const data = JSON.parse(stored);
            const thirtyDays = 30 * 24 * 60 * 60 * 1000;
            if (!data.token || Date.now() - (data.loggedInAt || 0) > thirtyDays) {
                localStorage.removeItem('fertigo_customer');
                setIsVerified(false);
                return;
            }
            setIsVerified(true);
        } catch {
            setIsVerified(false);
        }
    }, []);

    if (isVerified === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isVerified) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default CustomerRoute;
