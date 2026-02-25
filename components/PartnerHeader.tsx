import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronDownIcon, UserIcon, ExclamationTriangleIcon, Bars3Icon,
    CreditCardIcon, XMarkIcon, ClipboardDocumentListIcon, AdjustmentsHorizontalIcon,
    BuildingOfficeIcon, ArrowLeftOnRectangleIcon, BuildingOffice2Icon, BriefcaseIcon, BanknotesIcon,
    Squares2X2Icon, UsersIcon, PhoneIcon, QuestionMarkCircleIcon, SparklesIcon, HandshakeIcon, TagIcon,
    BellIcon, CheckCircleIcon
} from './icons';
import { NavLink, Link, useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_provider');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

interface Provider {
    _id: string;
    name: string;
    email: string;
    balance: number;
    companyName?: string;
    isVerified?: boolean;
}

const MarketplaceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const ToolsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);

const CustomersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M9 21v-2a4 4 0 0 1 4-4h2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

const navLinks = [
    { name: 'Lead-Marktplatz', icon: MarketplaceIcon, href: '/partner/requests' },
    { name: 'Kunden', icon: CustomersIcon, href: '/partner/customers' },
    { name: 'Tools', icon: ToolsIcon, href: '/partner/tools' },
    { name: 'Einstellungen', icon: SettingsIcon, href: '/partner/settings' },
];

interface Notification {
    id: string;
    title: string;
    body: string;
    time: string;
    read: boolean;
    type: 'lead' | 'system' | 'billing';
}

const INITIAL_NOTIFICATIONS: Notification[] = [
    { id: '1', title: 'Neuer Lead verfügbar', body: 'Umzug in Zürich · CHF 180', time: 'Vor 5 Min.', read: false, type: 'lead' },
    { id: '2', title: 'Lead gekauft', body: 'Reinigung in Luzern wurde Ihrem Portfolio hinzugefügt', time: 'Vor 1 Std.', read: false, type: 'lead' },
    { id: '3', title: 'Guthaben aufgeladen', body: 'CHF 200 wurden Ihrem Konto gutgeschrieben', time: 'Gestern', read: true, type: 'billing' },
    { id: '4', title: 'System-Update', body: 'Neue Funktionen im Lead-Marktplatz verfügbar', time: 'Vor 2 Tagen', read: true, type: 'system' },
];


const PartnerHeader: React.FC = () => {
    const location = useLocation();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [provider, setProvider] = useState<Provider | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;
    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    const notifTypeStyle = (type: Notification['type']) =>
        type === 'lead' ? 'bg-primary-100 text-primary-600' : type === 'billing' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500';
    const notifTypeIcon = (type: Notification['type']) =>
        type === 'lead' ? <TagIcon className="w-3.5 h-3.5" /> : type === 'billing' ? <BanknotesIcon className="w-3.5 h-3.5" /> : <BellIcon className="w-3.5 h-3.5" />;

    const fetchProviderData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/partner/profile`, {
                headers: getAuthHeaders(),
            });
            if (response.ok) {
                const data = await response.json();
                setProvider(data);
            }
        } catch (error) {
            console.error('Failed to fetch provider data:', error);
        }
    };

    useEffect(() => {
        fetchProviderData();

        // Listen for balance updates from other components
        const handleBalanceUpdate = () => {
            fetchProviderData();
        };
        window.addEventListener('balanceUpdated', handleBalanceUpdate);

        return () => {
            window.removeEventListener('balanceUpdated', handleBalanceUpdate);
        };
    }, []);

    const currentBalance = provider?.balance || 0;
    const isBalanceLow = currentBalance < 50;
    // Helper to get initials
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setIsUserMenuOpen(false);
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMobileMenuOpen]);

    const NavLinkItem: React.FC<{ link: typeof navLinks[0]; isMobile?: boolean; onClick?: () => void }> = ({ link, isMobile, onClick }) => {
        const location = useLocation();

        // Custom active check: match both pathname and query string
        const linkUrl = new URL(link.href, 'http://x');
        const isActive = location.pathname === linkUrl.pathname && location.search === (linkUrl.search || '');

        const baseClasses = "flex items-center gap-3 rounded-md font-semibold transition-colors";
        const mobileClasses = `${baseClasses} p-4 text-lg ${isActive ? 'bg-primary-100 text-primary-700' : 'text-slate-700 hover:bg-slate-100'}`;
        const desktopClasses = `flex items-center gap-1.5 rounded-md font-semibold transition-colors px-3 py-2 text-sm ${isActive ? 'text-primary-600' : 'text-slate-600 hover:text-slate-900'}`;

        return (
            <Link
                to={link.href}
                onClick={onClick}
                className={isMobile ? mobileClasses : desktopClasses}
            >
                <link.icon className={`${isMobile ? 'w-6 h-6' : 'w-4 h-4'} flex-shrink-0 ${isActive ? 'text-primary-500' : ''}`} />
                <span>{link.name}</span>
            </Link>
        );
    };

    return (
        <div className="fixed top-0 left-0 w-full z-40 flex flex-col shadow-sm font-sans">
            {/* Utility Bar */}
            <div className="h-8 bg-slate-900 text-slate-400 text-xs flex items-center justify-center border-b border-slate-800 relative z-50">
                <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/partner/settings" className="flex items-center gap-1.5 hover:text-white transition-colors hidden sm:flex">
                            <QuestionMarkCircleIcon className="w-3 h-3" />
                            Hilfe & FAQ
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-medium text-green-500 hidden sm:inline">System operational</span>
                        </div>
                        <div className="h-3 w-px bg-slate-700"></div>
                        <Link to="/" target="_blank" className="hover:text-white transition-colors font-medium flex items-center gap-1">
                            Website <span className="hidden sm:inline">öffnen</span> &rarr;
                        </Link>
                    </div>
                </div>
            </div>

            <header className="bg-white border-b border-slate-200 h-16 flex items-center relative z-40">
                <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
                    {/* Left Side */}
                    <div className="flex items-center gap-6">
                        <Link to="/partner/requests" className="flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary-600">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6 2H14V6H18V10H22V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2ZM7 6V18H11V14H15V11H11V9H17V6H7Z" />
                                <rect x="15" y="2" width="3" height="3" rx="0.5" />
                                <rect x="19" y="2" width="3" height="3" rx="0.5" />
                                <rect x="19" y="6" width="3" height="3" rx="0.5" />
                            </svg>
                            <span className="font-extrabold text-lg text-slate-900 tracking-tight hidden sm:block">Fertigo<span className="text-primary-600">Portal</span></span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1 ml-4">
                            {navLinks.map(link => <NavLinkItem key={link.href} link={link} />)}
                        </nav>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2 md:gap-4">

                        <Link
                            to="/partner/billing"
                            className="hidden lg:flex items-center group"
                            title={isBalanceLow ? "Ihr Guthaben ist niedrig. Jetzt aufladen!" : "Guthaben verwalten"}
                        >
                            <div className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 hover:shadow-md ${isBalanceLow
                                ? 'bg-amber-50 border-amber-200 hover:border-amber-300'
                                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                }`}>
                                <div className={`flex items-center justify-center w-8 h-8 rounded-md ${isBalanceLow ? 'bg-amber-100' : 'bg-primary-100'
                                    }`}>
                                    <BanknotesIcon className={`w-4 h-4 ${isBalanceLow ? 'text-amber-600' : 'text-primary-600'}`} />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className={`text-lg font-bold ${isBalanceLow ? 'text-amber-700' : 'text-slate-800'}`}>
                                        CHF {currentBalance.toFixed(2)}
                                    </span>
                                </div>
                                {isBalanceLow && (
                                    <ExclamationTriangleIcon className="w-4 h-4 text-amber-500 ml-1" />
                                )}
                            </div>
                        </Link>

                        {/* Notification Bell */}
                        <div className="relative hidden lg:block" ref={notifRef}>
                            <button
                                onClick={() => { setIsNotifOpen(prev => !prev); setIsUserMenuOpen(false); }}
                                className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 transition-colors"
                                title="Benachrichtigungen"
                            >
                                <BellIcon className="w-5 h-5 text-slate-500" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {isNotifOpen && (
                                <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <BellIcon className="w-4 h-4 text-slate-700" />
                                            <span className="font-bold text-slate-900 text-sm">Benachrichtigungen</span>
                                            {unreadCount > 0 && (
                                                <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount} neu</span>
                                            )}
                                        </div>
                                        {unreadCount > 0 && (
                                            <button onClick={markAllRead} className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1">
                                                <CheckCircleIcon className="w-3.5 h-3.5" />
                                                Alle gelesen
                                            </button>
                                        )}
                                    </div>
                                    <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                                        {notifications.map(n => (
                                            <button key={n.id} onClick={() => markRead(n.id)}
                                                className={`w-full flex items-start gap-3 px-5 py-3.5 text-left hover:bg-slate-50 transition-colors ${n.read ? 'opacity-60' : ''}`}
                                            >
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${notifTypeStyle(n.type)}`}>
                                                    {notifTypeIcon(n.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-semibold text-slate-800 truncate">{n.title}</p>
                                                        {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />}
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-0.5 truncate">{n.body}</p>
                                                    <p className="text-[10px] text-slate-400 mt-1 font-medium">{n.time}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50">
                                        <Link to="/partner/requests" onClick={() => setIsNotifOpen(false)} className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors">
                                            Alle Leads ansehen →
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative" ref={userMenuRef}>
                            <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors">
                                <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-sm text-sm">
                                    {provider ? getInitials(provider.name) : '?'}
                                </div>
                                <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform hidden md:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-10 animate-fade-in overflow-hidden">
                                    {/* Profile Header */}
                                    <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                                                {provider ? getInitials(provider.name) : '?'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-slate-900">{provider?.name || 'Laden...'}</p>
                                                <p className="text-sm text-slate-500 truncate">{provider?.email || ''}</p>
                                                {provider && <p className="text-xs text-primary-600 font-medium mt-0.5">Verifizierter Partner</p>}
                                            </div>
                                        </div>
                                        <Link
                                            to="/partner/profile"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                                        >
                                            <UserIcon className="w-4 h-4" />
                                            Profil anzeigen
                                        </Link>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="p-2">
                                        <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Konto</p>
                                        <Link to="/partner/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"><BuildingOfficeIcon className="w-4 h-4 text-slate-500" /></div>
                                            <div>
                                                <span className="text-sm">Unternehmensprofil</span>
                                                <p className="text-xs text-slate-400">Firmeninfos bearbeiten</p>
                                            </div>
                                        </Link>
                                        <Link to="/partner/customers" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"><BriefcaseIcon className="w-4 h-4 text-slate-500" /></div>
                                            <div>
                                                <span className="text-sm">Meine Kunden</span>
                                                <p className="text-xs text-slate-400">Kunden & Projekte verwalten</p>
                                            </div>
                                        </Link>
                                        <Link to="/partner/billing" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"><CreditCardIcon className="w-4 h-4 text-slate-500" /></div>
                                            <div>
                                                <span className="text-sm">Abrechnung</span>
                                                <p className="text-xs text-slate-400">Guthaben & Rechnungen</p>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="p-2 border-t border-slate-100">
                                        <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Support</p>
                                        <Link to="/partner/settings" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"><QuestionMarkCircleIcon className="w-4 h-4 text-slate-500" /></div>
                                            <div>
                                                <span className="text-sm">Hilfe & FAQ</span>
                                                <p className="text-xs text-slate-400">Antworten finden</p>
                                            </div>
                                        </Link>
                                        <Link to="/kontakt" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"><PhoneIcon className="w-4 h-4 text-slate-500" /></div>
                                            <div>
                                                <span className="text-sm">Kontakt</span>
                                                <p className="text-xs text-slate-400">Support kontaktieren</p>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Logout */}
                                    <div className="p-2 border-t border-slate-100">
                                        <Link to="/login" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
                                            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center"><ArrowLeftOnRectangleIcon className="w-4 h-4 text-red-500" /></div>
                                            <span className="text-sm">Abmelden</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                            <Bars3Icon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── NEW FLOATING BOTTOM SHEET MENU (MOBILE) ── */}
            <div className={`fixed inset-0 z-50 flex flex-col justify-end lg:hidden transition-all duration-300 ease-out ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>

                {/* Bottom Sheet Island */}
                <div className={`relative w-full max-h-[90vh] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[2.5rem] flex flex-col transition-transform duration-500 cubic-bezier(0.32,0.72,0,1) ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>

                    {/* Handle */}
                    <div className="flex justify-center pt-4 pb-2">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 pb-10 scrollbar-hide">
                        {/* Header Navbar */}
                        <div className="flex items-center justify-between mb-8 mt-2">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg shadow-emerald-500/30 border border-emerald-200/50">
                                    {provider ? getInitials(provider.name) : '?'}
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-bold text-slate-900 leading-tight">{provider?.name || 'Hier Name'}</h2>
                                    <p className="text-xs font-semibold text-emerald-600">Partner Account</p>
                                </div>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:scale-95 transition-all">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Quick Wallet Row */}
                        <div className="mb-6">
                            <div className="flex items-end justify-between mb-3 px-1">
                                <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">Aktuelles Guthaben</p>
                            </div>
                            <Link
                                to="/partner/billing"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between p-5 rounded-3xl border transition-all active:scale-[0.98] ${isBalanceLow ? 'bg-amber-50 border-amber-200 shadow-sm shadow-amber-500/10' : 'bg-slate-50 border-slate-200 shadow-sm'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${isBalanceLow ? 'bg-amber-100 text-amber-600' : 'bg-white text-slate-600 border border-slate-100'}`}>
                                        <BanknotesIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-slate-900 tracking-tight">
                                            <span className="text-sm font-bold opacity-50 mr-1 inline-block -translate-y-px">CHF</span>
                                            {currentBalance.toFixed(2)}
                                        </p>
                                        {isBalanceLow ? (
                                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1 mt-0.5"><ExclamationTriangleIcon className="w-3 h-3" /> Aufladen nötig</span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Aktiv</span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 bg-white shadow-sm">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </Link>
                        </div>

                        {/* Vertical App Navigation */}
                        <div className="mb-6 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                            <div className="px-5 pt-4 pb-2">
                                <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">Hauptmenü</p>
                            </div>
                            <div className="flex flex-col">
                                {navLinks.map((link, index) => {
                                    const linkUrl = new URL(link.href, 'http://x');
                                    const isActive = location.pathname === linkUrl.pathname;
                                    const isLast = index === navLinks.length - 1;
                                    return (
                                        <div key={link.href} className="px-2">
                                            <Link
                                                to={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center gap-4 p-3 rounded-2xl transition-all active:scale-[0.98] ${isActive ? 'bg-emerald-50 mb-1' : 'hover:bg-slate-50'}`}
                                            >
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-100 text-slate-500'}`}>
                                                    <link.icon className="w-5 h-5" />
                                                </div>
                                                <span className={`text-base flex-1 font-bold ${isActive ? 'text-emerald-700' : 'text-slate-700'}`}>
                                                    {link.name}
                                                </span>
                                                {isActive && (
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                                                )}
                                            </Link>
                                            {!isLast && !isActive && <div className="h-px bg-slate-100 mx-14 my-0.5"></div>}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Quick Actions List */}
                        <div className="flex flex-col bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-sm p-2">
                            <Link to="/partner/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-sm transition-all active:scale-[0.98]">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm"><QuestionMarkCircleIcon className="w-5 h-5 text-slate-500" /></div>
                                <div className="flex-1 text-slate-700 font-bold">Hilfe & Support</div>
                                <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                            <div className="h-px bg-slate-200 mx-14 my-0.5"></div>
                            <Link to="/login" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-sm transition-all active:scale-[0.98]">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shadow-sm"><ArrowLeftOnRectangleIcon className="w-5 h-5 text-rose-500" /></div>
                                <div className="flex-1 text-rose-600 font-bold">Abmelden</div>
                                <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PartnerHeader;