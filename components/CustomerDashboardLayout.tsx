
import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerHeader from './CustomerHeader';

const CustomerDashboardLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
            <CustomerHeader />
            <main className="pt-16">
                 <div className="p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                 </div>
            </main>
        </div>
    );
};

export default CustomerDashboardLayout;