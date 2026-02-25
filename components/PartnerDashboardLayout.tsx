
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PartnerHeader from './PartnerHeader';

const PartnerDashboardLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-100 font-display text-text-light dark:bg-background-dark dark:text-text-dark">
            <PartnerHeader />

            <main className="pt-24"> {/* Adjusted padding top for the fixed header with utility bar (h-16 + h-8 = 24) */}
                <div className="p-4 sm:p-6 lg:p-8">
                    <Suspense fallback={
                        <div className="flex justify-center items-center py-40">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                        </div>
                    }>
                        <Outlet />
                    </Suspense>
                </div>
            </main>


        </div>
    );
}

export default PartnerDashboardLayout;
