


import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from '../pages/AppContext';
import {
    ChevronDownIcon, ChevronRightIcon, GermanFlagIcon, FrenchFlagIcon, ItalianFlagIcon, EnglishFlagIcon,
    SpanishFlagIcon, PortugueseFlagIcon, DutchFlagIcon, PolishFlagIcon, TurkishFlagIcon,
    RussianFlagIcon, Bars3Icon, XMarkIcon, ShieldCheckIcon,
    PhoneIcon, CheckCircleIcon, ArrowRightIcon,
    BriefcaseIcon, UserIcon,
    ColoredHomeModernIcon, ColoredSquares2X2Icon, ColoredBuildingOffice2Icon,
    ColoredBriefcaseIcon, ColoredLightbulbIcon, ColoredUserIcon,
    ColoredBuildingStorefrontIcon, ColoredMailIcon, ColoredToolboxIcon, ColoredUsersIcon,
    HomeModernIcon, Squares2X2Icon, LightbulbIcon, BuildingStorefrontIcon, EnvelopeIcon
} from './icons';

import { translations } from './translations';

type Language = keyof typeof translations;

const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 2H14V6H18V10H22V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2ZM7 6V18H11V14H15V11H11V9H17V6H7Z"
        />
        <rect x="15" y="2" width="3" height="3" rx="0.5" />
        <rect x="19" y="2" width="3" height="3" rx="0.5" />
        <rect x="19" y="6" width="3" height="3" rx="0.5" />
    </svg>
);


const LanguageOption: React.FC<{ lang: Language, name: string, currentLang: Language, onClick: (lang: Language) => void }> = ({ lang, name, currentLang, onClick }) => {
    const FlagIcon = {
        de: GermanFlagIcon,
        fr: FrenchFlagIcon,
        it: ItalianFlagIcon,
        en: EnglishFlagIcon,
        es: SpanishFlagIcon,
        pt: PortugueseFlagIcon,
        nl: DutchFlagIcon,
        pl: PolishFlagIcon,
        tr: TurkishFlagIcon,
        ru: RussianFlagIcon,
    }[lang];

    return (
        <li>
            <button onClick={() => onClick(lang)} className="w-full text-left flex items-center space-x-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors rounded-lg">
                <FlagIcon className="w-6 h-auto rounded-sm shadow-sm" />
                <span className={`flex-1 ${currentLang === lang ? 'font-bold text-primary-700' : 'font-medium'}`}>{name}</span>
                {currentLang === lang && <CheckCircleIcon className="ml-auto w-5 h-5 text-primary-600" />}
            </button>
        </li>
    );
};

const Header: React.FC = () => {
    const { language, setLanguage, openQuoteModal } = useAppContext();
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const mobileLangDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isOutsideDesktop = !langDropdownRef.current || !langDropdownRef.current.contains(target);
            const isOutsideMobile = !mobileLangDropdownRef.current || !mobileLangDropdownRef.current.contains(target);

            // Only close if clicked outside BOTH dropdowns
            if (isOutsideDesktop && isOutsideMobile) {
                setIsLangDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const t = translations[language];

    const navItems = [
        { name: t.home, to: '/' },
        { name: t.services, to: '/services' },
        { name: t.becomePartner, to: '/providers' },
        { name: t.vorlagen, to: '/vorlagen' },
        { name: t.contact, to: '/kontakt' },
    ];

    const mobileNavItems = [
        { name: t.home, to: '/', emoji: '🏠' },
        { name: t.services, to: '/services', emoji: '🛠️' },
        { name: t.becomePartner, to: '/providers', emoji: '👷' },
        { name: t.vorlagen, to: '/vorlagen', emoji: '💡' },
        { name: t.aboutUs, to: '/ueber-uns', emoji: '👥' },
        { name: t.contact, to: '/kontakt', emoji: '📬' }
    ];

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setIsLangDropdownOpen(false);
    };

    const handleQuoteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        openQuoteModal();
        setIsMobileMenuOpen(false);
    };

    const CurrentFlagIcon = {
        de: GermanFlagIcon,
        fr: FrenchFlagIcon,
        it: ItalianFlagIcon,
        en: EnglishFlagIcon,
        es: SpanishFlagIcon,
        pt: PortugueseFlagIcon,
        nl: DutchFlagIcon,
        pl: PolishFlagIcon,
        tr: TurkishFlagIcon,
        ru: RussianFlagIcon,
    }[language];

    const supportedLanguages: { code: Language; label: string }[] = [
        { code: 'de', label: 'Deutsch' },
        { code: 'fr', label: 'Français' },
        { code: 'it', label: 'Italiano' },
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'pt', label: 'Português' },
        { code: 'nl', label: 'Nederlands' },
        { code: 'pl', label: 'Polski' },
        { code: 'tr', label: 'Türkçe' },
        { code: 'ru', label: 'Русский' }
    ];

    return (
        <>
            {/* Top Utility Bar - Gray Theme (Desktop Only) */}
            <div className="bg-gray-100 text-slate-600 text-xs hidden lg:block border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 h-10 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        {/* Left side items if needed */}
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/login" className="hover:text-primary-600 transition-colors font-medium flex items-center gap-1.5">
                            <UserIcon className="w-3.5 h-3.5" />
                            {t.login}
                        </Link>

                        {/* Language Switcher in Top Bar */}
                        <div className="relative" ref={langDropdownRef}>
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center gap-1.5 hover:text-primary-600 transition-colors py-1 px-2 ml-2 rounded-md hover:bg-white"
                                aria-haspopup="true"
                                aria-expanded={isLangDropdownOpen}
                                aria-label={t.changeLang}
                                aria-controls="language-dropdown"
                            >
                                <CurrentFlagIcon className="w-4 h-auto rounded-[1px]" />
                                <span className="uppercase font-bold tracking-wider">{language}</span>
                                <ChevronDownIcon className="w-3 h-3" />
                            </button>
                            {isLangDropdownOpen && (
                                <div id="language-dropdown" className="absolute top-full right-0 mt-2 w-48 bg-white text-slate-800 border border-slate-200 rounded-lg shadow-xl z-50 animate-fade-in py-1">
                                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">Sprache wählen</div>
                                    {supportedLanguages.map(lang => (
                                        <LanguageOption key={lang.code} lang={lang.code} name={lang.label} currentLang={language} onClick={handleLanguageChange} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="sticky top-0 z-[49] transition-all duration-300 border-b bg-white/95 backdrop-blur-lg shadow-sm border-slate-200/80 py-2 lg:py-0">
                <div className="max-w-6xl mx-auto px-6 h-16 lg:h-20 flex justify-between items-center">

                    {/* Logo Area */}
                    <Link to="/" className="flex items-center gap-3 group relative z-50" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-200 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                            <Logo className="w-10 h-10 text-primary-600 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-10deg]" />
                        </div>
                        <span className="font-black text-2xl text-slate-900 tracking-tight leading-none transition-colors">
                            Fertigo<span className="text-primary-600">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-100">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.to}
                                end={item.to === '/'}
                                className={({ isActive }) =>
                                    `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${isActive
                                        ? 'bg-white text-primary-700 shadow-sm ring-1 ring-black/5'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* CTA & Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 relative z-50">
                        <button
                            onClick={handleQuoteButtonClick}
                            className="hidden lg:inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                        >
                            <span>{t.getQuote}</span>
                            <ArrowRightIcon className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden p-2 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                            aria-label={isMobileMenuOpen ? t.closeMenu : t.menu}
                            aria-haspopup="dialog"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Premium Mobile Menu Overlay - Glass Morphic Card Stack Redesign */}
            <div
                className={`fixed inset-0 z-[60] flex flex-col bg-slate-50/95 backdrop-blur-xl text-slate-900 transition-all duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="relative z-20 flex items-center justify-between px-6 py-5 border-b border-slate-200/50 bg-white/50 backdrop-blur-sm">
                    <Logo className="h-8 w-auto text-primary-600" />

                    <div className="flex items-center gap-3">
                        {/* Language Selection */}
                        <div className="relative" ref={mobileLangDropdownRef}>
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="p-2 rounded-full bg-white border border-slate-200 hover:border-primary-200 shadow-sm transition-all flex items-center justify-center"
                            >
                                <CurrentFlagIcon className="w-5 h-5 rounded-sm" />
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-40 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl z-50 animate-fade-in overflow-hidden">
                                    {supportedLanguages.map(lang => {
                                        const FlagIcon = {
                                            de: GermanFlagIcon,
                                            fr: FrenchFlagIcon,
                                            it: ItalianFlagIcon,
                                            en: EnglishFlagIcon,
                                            es: SpanishFlagIcon,
                                            pt: PortugueseFlagIcon,
                                            nl: DutchFlagIcon,
                                            pl: PolishFlagIcon,
                                            tr: TurkishFlagIcon,
                                            ru: RussianFlagIcon,
                                        }[lang.code];

                                        return (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase hover:bg-slate-50 flex items-center gap-3 transition-colors ${language === lang.code ? 'text-primary-600 bg-primary-50' : 'text-slate-500'}`}
                                            >
                                                <FlagIcon className="w-4 h-4 rounded-[1px] shadow-sm" />
                                                <span>{lang.label}</span>
                                                {language === lang.code && <CheckCircleIcon className="w-3.5 h-3.5 ml-auto text-primary-600" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* User/Login */}
                        <Link
                            to="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 shadow-sm transition-all"
                        >
                            <ColoredUserIcon className="w-6 h-6" />
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-full bg-white hover:bg-slate-100 transition-all border border-slate-200 shadow-sm"
                        >
                            <XMarkIcon className="w-6 h-6 text-slate-500" />
                        </button>
                    </div>
                </div>

                {/* Main Navigation - Floating Cards Stack */}
                <div className="flex-1 overflow-y-auto px-6 py-8">
                    <nav className="flex flex-col gap-4">
                        {mobileNavItems.map((item, index) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/'}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="group block"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {({ isActive }) => (
                                    <div className={`
                                        relative flex items-center p-3.5 rounded-2xl border transition-all duration-300
                                        ${isActive
                                            ? 'bg-gradient-to-r from-primary-600 to-emerald-500 border-transparent shadow-lg shadow-primary-500/30 scale-[1.02] translate-x-1'
                                            : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200'
                                        }
                                    `}>
                                        {/* Icon Container */}
                                        <div className={`
                                            w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300
                                            ${isActive
                                                ? 'bg-white/20 backdrop-blur-sm shadow-inner'
                                                : 'bg-slate-50 border border-slate-100 group-hover:bg-slate-100'
                                            }
                                            group-hover:scale-110 drop-shadow-sm
                                        `}>
                                            <span className="text-2xl drop-shadow-sm leading-none">{item.emoji}</span>
                                        </div>

                                        {/* Text Section */}
                                        <div className="ml-4 flex-1">
                                            <span className={`block text-lg font-bold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                                {item.name}
                                            </span>
                                        </div>

                                        {/* Right Action/Indicator */}
                                        <div className="flex items-center justify-center w-8 h-8 mr-1">
                                            {isActive ? (
                                                <div className="bg-white/20 rounded-full p-1.5 backdrop-blur-sm">
                                                    <ArrowRightIcon className="w-5 h-5 text-white" />
                                                </div>
                                            ) : (
                                                <ChevronRightIcon className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-white border-t border-slate-200/50 safe-area-pb">
                    {/* CTA */}
                    <button
                        onClick={handleQuoteButtonClick}
                        className="w-full h-14 rounded-xl bg-primary-600 text-white font-black uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg active:scale-95 shadow-primary-500/20"
                    >
                        <span className="text-sm">
                            {{
                                de: 'Offerten erhalten 🚀',
                                fr: 'Recevoir des offres 🚀',
                                it: 'Ricevi offerte 🚀',
                                en: 'Get quotes 🚀',
                                es: 'Recibir presupuestos 🚀',
                                pt: 'Receber orçamentos 🚀',
                                nl: 'Ontvang offertes 🚀',
                                pl: 'Otrzymaj oferty 🚀',
                                tr: 'Teklif al 🚀',
                                ru: 'Получить предложения 🚀',
                            }[language] || `${t.getQuote} 🚀`}
                        </span>
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;