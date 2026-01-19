import React, { useState, useEffect, useRef } from 'react';
import { 
    BellIcon, ChevronDownIcon, UserIcon, ExclamationTriangleIcon, Bars3Icon,
    CreditCardIcon, XMarkIcon, ClipboardDocumentListIcon, AdjustmentsHorizontalIcon, 
    BuildingOfficeIcon, ArrowLeftOnRectangleIcon, BuildingOffice2Icon, BriefcaseIcon, BanknotesIcon,
    Squares2X2Icon, UsersIcon, PhoneIcon, QuestionMarkCircleIcon
} from './icons';
import NotificationDropdown from './NotificationDropdown';
import { NavLink, Link } from 'react-router-dom';

interface Notification {
  id: number;
  title: string;
  time: string;
  isRead: boolean;
  link: string;
}

const navLinks = [
    { name: 'Lead-Marktplatz', icon: BuildingOffice2Icon, href: '/partner/requests' },
    { name: 'Kunden', icon: UsersIcon, href: '/partner/requests?view=purchased' },
    { name: 'Inserate', icon: ClipboardDocumentListIcon, href: '/partner/marketplace' },
];

const PartnerHeader: React.FC = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Neuer Lead in Ihrer Region: Malerarbeiten', time: 'vor 5 Min.', isRead: false, link: '#/partner/requests/1' },
        { id: 2, title: 'Ihr Guthaben ist niedrig.', time: 'vor 1 Stunde', isRead: false, link: '#/partner/billing' },
        { id: 3, title: 'Angebot für "Gartenpflege" wurde akzeptiert!', time: 'vor 3 Stunden', isRead: true, link: '#/partner/requests/2' },
    ]);

    const [currentBalance, setCurrentBalance] = useState(45.00);
    const isBalanceLow = currentBalance < 50;

    const notificationRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const toggleNotifications = () => {
        if (!isNotificationOpen) {
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        }
        setIsNotificationOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) setIsNotificationOpen(false);
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setIsUserMenuOpen(false);
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
        const isEnd = link.href === '/partner/requests';
    
        return (
             <NavLink 
                to={link.href} 
                end={isEnd}
                onClick={onClick} 
                className={({ isActive }) => {
                    const baseClasses = "flex items-center gap-3 rounded-md font-semibold transition-colors";
                    const mobileClasses = `${baseClasses} p-4 text-lg ${isActive ? 'bg-primary-100 text-primary-700' : 'text-slate-700 hover:bg-slate-100'}`;
                    const desktopClasses = `${baseClasses} px-3 py-2 text-sm ${isActive ? 'text-primary-600' : 'text-slate-600 hover:text-slate-900'}`;
                    return isMobile ? mobileClasses : desktopClasses;
                }}
            >
                {({ isActive }) => (
                    <>
                        <link.icon className={`w-6 h-6 flex-shrink-0 ${isActive && !isMobile ? 'text-primary-500' : ''}`} />
                        <span>{link.name}</span>
                    </>
                )}
            </NavLink>
        );
    };

    return (
        <div className="fixed top-0 left-0 w-full z-40 flex flex-col shadow-sm font-sans">
            {/* Utility Bar */}
            <div className="h-8 bg-slate-900 text-slate-400 text-xs flex items-center justify-between px-6 border-b border-slate-800 relative z-50">
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

            <header className="bg-white border-b border-slate-200 h-16 flex items-center relative z-40">
                <div className="w-full px-6 flex items-center justify-between">
                    {/* Left Side */}
                    <div className="flex items-center gap-6">
                         <Link to="/partner/requests" className="flex items-center gap-2">
                            <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                                <Squares2X2Icon className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-lg text-slate-900 tracking-tight hidden sm:block">FertigoPortal<span className="text-primary-600"></span></span>
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
                            className={`hidden lg:flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition-colors shadow-sm border ${
                                isBalanceLow
                                    ? 'bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100'
                                    : 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100'
                            }`}
                            title={isBalanceLow ? "Ihr Guthaben ist niedrig. Jetzt aufladen!" : "Guthaben verwalten"}
                        >
                            {isBalanceLow && <ExclamationTriangleIcon className="w-4 h-4" />}
                            <BanknotesIcon className="w-4 h-4" />
                            <span>CHF {currentBalance.toFixed(2)}</span>
                        </Link>
                        
                        <div className="relative" ref={notificationRef}>
                            <button onClick={toggleNotifications} className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                                <BellIcon className="w-6 h-6" />
                                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span></span>}
                            </button>
                            {isNotificationOpen && <NotificationDropdown notifications={notifications} />}
                        </div>
                        
                        <div className="relative" ref={userMenuRef}>
                            <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors">
                                <div className="w-9 h-9 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-sm text-sm">MM</div>
                                <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform hidden md:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-10 animate-fade-in">
                                    <div className="p-4 border-b border-slate-200">
                                        <p className="font-bold text-slate-800">Markus Müller</p>
                                        <p className="text-xs text-slate-500 truncate font-medium">Maler Müller AG</p>
                                    </div>
                                    <ul className="py-2">
                                        <li><Link to="/partner/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium transition-colors"><UserIcon className="w-5 h-5 text-slate-400"/><span>Mein Profil</span></Link></li>
                                        <li><Link to="/partner/billing" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium transition-colors"><CreditCardIcon className="w-5 h-5 text-slate-400"/><span>Abrechnung</span></Link></li>
                                        <li><Link to="/partner/settings" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium transition-colors"><AdjustmentsHorizontalIcon className="w-5 h-5 text-slate-400"/><span>Einstellungen</span></Link></li>
                                        <div className="border-t border-slate-100 my-1"></div>
                                        <li><Link to="/login" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 font-medium transition-colors"><ArrowLeftOnRectangleIcon className="w-5 h-5 text-red-500"/><span>Abmelden</span></Link></li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                            <Bars3Icon className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
            
            {/* Mobile Drawer */}
            <div className={`fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="p-5 h-24 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center text-white font-bold shadow-md">MM</div>
                        <div>
                             <span className="font-bold text-slate-900 block">Markus Müller</span>
                             <span className="text-xs text-slate-500 font-medium">Maler Müller AG</span>
                        </div>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-slate-500"><XMarkIcon className="w-6 h-6"/></button>
                 </div>
                 
                 <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    <div className="mb-6">
                        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Finanzen</p>
                        <Link 
                            to="/partner/billing"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-all border ${
                                isBalanceLow
                                    ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
                                    : 'bg-green-50 text-green-800 border-green-200'
                            }`}
                        >
                            <div className={`p-2 rounded-lg ${isBalanceLow ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                <BanknotesIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <span className="text-xs font-bold opacity-80">Verfügbares Guthaben</span>
                                <span className="block text-lg font-bold">CHF {currentBalance.toFixed(2)}</span>
                            </div>
                            {isBalanceLow && <ExclamationTriangleIcon className="w-5 h-5" />}
                        </Link>
                    </div>

                    <div>
                        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Menu</p>
                        {navLinks.map(link => <NavLinkItem key={link.href} link={link} isMobile onClick={() => setIsMobileMenuOpen(false)} />)}
                    </div>
                 </nav>

                 <div className="p-4 border-t border-slate-100 bg-slate-50">
                     <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-slate-600 font-bold hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                        Abmelden
                    </Link>
                 </div>
            </div>
        </div>
    );
};
export default PartnerHeader;