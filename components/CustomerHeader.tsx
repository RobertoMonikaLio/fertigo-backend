
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAppContext } from '../pages/AppContext';
import { 
    UserIcon, Bars3Icon,
    XMarkIcon, ClipboardDocumentListIcon,
    ArrowLeftOnRectangleIcon, BanknotesIcon,
    ChatBubbleLeftRightIcon,
    PlusIcon, HomeModernIcon, ChevronDownIcon
} from './icons';

const navLinks = [
    { name: 'Meine Projekte', icon: ClipboardDocumentListIcon, href: '/kunden/dashboard' },
    { name: 'Nachrichten', icon: ChatBubbleLeftRightIcon, href: '/kunden/nachrichten' },
    { name: 'Angebote vergleichen', icon: BanknotesIcon, href: '/kunden/vergleich/1' }, // Assuming a default/example link
    { name: 'Einstellungen', icon: UserIcon, href: '/kunden/einstellungen' },
];

const CustomerHeader: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
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
        const isEnd = link.href === '/kunden/dashboard';
    
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
            <header className="bg-white border-b border-slate-200 h-16 flex items-center relative z-40">
                <div className="w-full px-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                         <Link to="/kunden/dashboard" className="flex items-center gap-2">
                            <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                                <HomeModernIcon className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-lg text-slate-900 tracking-tight hidden sm:block">Mein Fertigo</span>
                        </Link>
                        <nav className="hidden lg:flex items-center gap-1 ml-4">
                            {navLinks.map(link => <NavLinkItem key={link.href} link={link} />)}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button 
                            onClick={() => openQuoteModal()}
                            className="hidden sm:flex items-center gap-2 bg-secondary text-white font-bold px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors shadow-sm text-sm"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Neues Projekt
                        </button>

                        <div className="relative" ref={userMenuRef}>
                            <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors">
                                <div className="w-9 h-9 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-sm text-sm">AM</div>
                                <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform hidden md:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-10 animate-fade-in">
                                    <div className="p-4 border-b border-slate-200">
                                        <p className="font-bold text-slate-800">Anna Muster</p>
                                        <p className="text-xs text-slate-500 truncate font-medium">anna.muster@example.com</p>
                                    </div>
                                    <ul className="py-2">
                                        <li><Link to="/kunden/einstellungen" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium transition-colors"><UserIcon className="w-5 h-5 text-slate-400"/><span>Mein Profil</span></Link></li>
                                        <li><Link to="/" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 font-medium transition-colors"><ArrowLeftOnRectangleIcon className="w-5 h-5 text-red-500"/><span>Abmelden</span></Link></li>
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

            <div className={`fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
            
            <div className={`fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="p-5 h-20 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center font-bold text-white shadow-md">AM</div>
                        <div>
                             <span className="font-bold text-slate-900 block">Anna Muster</span>
                             <span className="text-xs text-slate-500 font-medium">Kundenkonto</span>
                        </div>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-slate-500"><XMarkIcon className="w-6 h-6"/></button>
                 </div>
                 
                 <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                     <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Menu</p>
                     {navLinks.map(link => <NavLinkItem key={link.href} link={link} isMobile onClick={() => setIsMobileMenuOpen(false)} />)}
                 </nav>

                 <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
                    <button 
                        onClick={() => { openQuoteModal(); setIsMobileMenuOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 bg-secondary text-white font-bold px-4 py-3 rounded-xl hover:bg-yellow-600 transition-colors shadow-sm"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Neues Projekt erstellen
                    </button>
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-600 font-bold hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                        Abmelden
                    </Link>
                 </div>
            </div>
        </div>
    );
};

export default CustomerHeader;
