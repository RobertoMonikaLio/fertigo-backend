

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Squares2X2Icon, UsersIcon, BriefcaseIcon, ArrowRightIcon, BanknotesIcon, UserIcon } from './icons';

const AdminSidebar: React.FC = () => {
    const navLinks = [
        { name: 'Dashboard', icon: Squares2X2Icon, href: '/admin/dashboard' },
        { name: 'Partner Verwalten', icon: UsersIcon, href: '/admin/partners' },
        { name: 'Anfragen Verwalten', icon: BriefcaseIcon, href: '/admin/requests' },
        { name: 'Benutzer Verwalten', icon: UsersIcon, href: '/admin/users' },
        { name: 'Finanzen', icon: BanknotesIcon, href: '/admin/finance' },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-slate-200 border-r border-slate-700">
             <div className="px-6 py-6 border-b border-slate-700/50">
                <NavLink to="/admin/dashboard" className="flex flex-col">
                    <span className="font-extrabold text-xl text-white tracking-tight">OffertenVergleich</span>
                    <span className="text-xs font-medium text-red-400 tracking-tight -mt-1">ADMIN-BEREICH</span>
                </NavLink>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navLinks.map(link => (
                    <NavLink 
                        key={link.name} 
                        to={link.href} 
                        className={({ isActive }) => 
                            `flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-colors ${
                                isActive ? 'bg-red-600 text-white' : 'hover:bg-slate-700/50'
                            }`
                        }
                    >
                        <link.icon className="w-6 h-6" />
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="px-4 py-4 border-t border-slate-700/50">
                <NavLink 
                    to="/admin/profile" 
                    className={({ isActive }) => 
                        `flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-colors ${
                            isActive ? 'bg-red-600 text-white' : 'hover:bg-slate-700/50'
                        }`
                    }
                >
                    <UserIcon className="w-6 h-6" />
                    <span>Mein Profil</span>
                </NavLink>
            </div>
        </aside>
    );
};

export default AdminSidebar;