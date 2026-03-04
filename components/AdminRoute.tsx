import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('fertigo_admin');
        if (!stored) {
            setIsVerified(false);
            return;
        }
        try {
            const data = JSON.parse(stored);
            // Check token exists and not expired (7 day client-side check)
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            if (!data.token || Date.now() - (data.loggedInAt || 0) > sevenDays) {
                localStorage.removeItem('fertigo_admin');
                setIsVerified(false);
                return;
            }
            setIsVerified(true);
        } catch {
            setIsVerified(false);
        }
    }, []);

    if (isVerified === null) {
        // Loading state
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isVerified) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default AdminRoute;
