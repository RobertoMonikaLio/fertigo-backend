


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
    ColoredBuildingStorefrontIcon, ColoredMailIcon
} from './icons';

const translations = {
    de: {
        home: 'Home',
        services: 'Dienstleistungen',
        marktplatz: 'Mieten',
        tipps: 'Ratgeber',
        forProviders: 'Für Anbieter',
        becomePartner: 'Für Handwerker',
        jobs: 'Stellen',
        getQuote: 'Offerten vergleichen',
        changeLang: 'Sprache wählen',
        menu: 'Menü',
        closeMenu: 'Menü schliessen',
        login: 'Anmelden',
        register: 'Registrieren',
        slogan: 'Schweizweit führendes Handwerker-Portal',
        support: 'Support',
        partnerLogin: 'Partner Login',
        aboutUs: 'Über uns',
        contact: 'Kontakt',
        vorlagen: 'Vorlagen',
    },
    fr: {
        home: 'Accueil',
        services: 'Services',
        marktplatz: 'Marché',
        tipps: 'Conseils',
        forProviders: 'Pour les fournisseurs',
        becomePartner: 'Devenir partenaire',
        jobs: 'Emplois',
        getQuote: 'Comparer les devis',
        changeLang: 'Choisir la langue',
        menu: 'Menu',
        closeMenu: 'Fermer le menu',
        login: 'Connexion',
        register: 'S\'inscrire',
        slogan: 'Portail leader de l\'artisanat en Suisse',
        support: 'Support',
        partnerLogin: 'Connexion Partenaire',
        aboutUs: 'À propos de nous',
        contact: 'Contact',
        vorlagen: 'Modèles',
    },
    it: {
        home: 'Home',
        services: 'Servizi',
        marktplatz: 'Mercato',
        tipps: 'Consigli',
        forProviders: 'Per fornitori',
        becomePartner: 'Diventa partner',
        jobs: 'Lavori',
        getQuote: 'Confronta preventivi',
        changeLang: 'Scegli la lingua',
        menu: 'Menu',
        closeMenu: 'Chiudi menu',
        login: 'Accesso',
        register: 'Registrati',
        slogan: 'Portale leader dell\'artigianato in Svizzera',
        support: 'Supporto',
        partnerLogin: 'Login Partner',
        aboutUs: 'Chi siamo',
        contact: 'Contatto',
        vorlagen: 'Modelli',
    },
    en: {
        home: 'Home',
        services: 'Services',
        marktplatz: 'Marketplace',
        tipps: 'Advice',
        forProviders: 'For Providers',
        becomePartner: 'Become a Partner',
        jobs: 'Jobs',
        getQuote: 'Compare Quotes',
        changeLang: 'Choose Language',
        menu: 'Menu',
        closeMenu: 'Close menu',
        login: 'Login',
        register: 'Register',
        slogan: 'Leading craftsman portal in Switzerland',
        support: 'Support',
        partnerLogin: 'Partner Login',
        aboutUs: 'About Us',
        contact: 'Contact',
        vorlagen: 'Templates',
    },
    es: {
        home: 'Inicio',
        services: 'Services',
        marktplatz: 'Mercado',
        tipps: 'Consejos',
        forProviders: 'Para proveedores',
        becomePartner: 'Convertirse en socio',
        jobs: 'Empleos',
        getQuote: 'Comparar presupuestos',
        changeLang: 'Elegir idioma',
        menu: 'Menú',
        closeMenu: 'Cerrar menú',
        login: 'Iniciar sesión',
        register: 'Registrarse',
        slogan: 'Portal líder de artesanía en Suiza',
        support: 'Soporte',
        partnerLogin: 'Acceso Socios',
        aboutUs: 'Sobre nosotros',
        contact: 'Contacto',
        vorlagen: 'Plantillas',
    },
    pt: {
        home: 'Início',
        services: 'Serviços',
        marktplatz: 'Mercado',
        tipps: 'Dicas',
        forProviders: 'Para fornecedores',
        becomePartner: 'Torne-se um parceiro',
        jobs: 'Vagas',
        getQuote: 'Comparar orçamentos',
        changeLang: 'Escolher idioma',
        menu: 'Menu',
        closeMenu: 'Fechar menu',
        login: 'Login',
        register: 'Registar',
        slogan: 'Portal líder de artesanato na Suíça',
        support: 'Suporte',
        partnerLogin: 'Login Parceiro',
        aboutUs: 'Sobre nós',
        contact: 'Contato',
        vorlagen: 'Modelos',
    },
    nl: {
        home: 'Home',
        services: 'Diensten',
        marktplatz: 'Marktplaats',
        tipps: 'Tips',
        forProviders: 'Voor aanbieders',
        becomePartner: 'Partner worden',
        jobs: 'Vacatures',
        getQuote: 'Vergelijk offertes',
        changeLang: 'Taal kiezen',
        menu: 'Menu',
        closeMenu: 'Menu sluiten',
        login: 'Inloggen',
        register: 'Registreren',
        slogan: 'Toonaangevend vakmanschapsportaal in Zwitserland',
        support: 'Ondersteuning',
        partnerLogin: 'Partner Login',
        aboutUs: 'Over ons',
        contact: 'Contact',
        vorlagen: 'Sjablonen',
    },
    pl: {
        home: 'Start',
        services: 'Usługi',
        marktplatz: 'Rynek',
        tipps: 'Porady',
        forProviders: 'Dla dostawców',
        becomePartner: 'Zostań partnerem',
        jobs: 'Praca',
        getQuote: 'Porównaj oferty',
        changeLang: 'Wybierz język',
        menu: 'Menu',
        closeMenu: 'Zamknij menu',
        login: 'Zaloguj się',
        register: 'Zarejestruj się',
        slogan: 'Wiodący portal rzemieślniczy w Szwajcarii',
        support: 'Wsparcie',
        partnerLogin: 'Logowanie Partnera',
        aboutUs: 'O nas',
        contact: 'Kontakt',
        vorlagen: 'Szablony',
    },
    tr: {
        home: 'Anasayfa',
        services: 'Hizmetler',
        marktplatz: 'Pazaryeri',
        tipps: 'İpuçları',
        forProviders: 'Sağlayıcılar İçin',
        becomePartner: 'Partner Olun',
        jobs: 'İş İlanları',
        getQuote: 'Teklifleri Karşılaştır',
        changeLang: 'Dil Seçin',
        menu: 'Menü',
        closeMenu: 'Menüyü kapat',
        login: 'Giriş Yap',
        register: 'Kaydol',
        slogan: 'İsviçre\'nin önde gelen zanaatkar portalı',
        support: 'Destek',
        partnerLogin: 'Partner Girişi',
        aboutUs: 'Hakkımızda',
        contact: 'İletişim',
        vorlagen: 'Şablonlar',
    },
    ru: {
        home: 'Главная',
        services: 'Услуги',
        marktplatz: 'Торговая площадка',
        tipps: 'Советы',
        forProviders: 'Для поставщиков',
        becomePartner: 'Стать партнером',
        jobs: 'Вакансии',
        getQuote: 'Сравнить предложения',
        changeLang: 'Выберите язык',
        menu: 'Меню',
        closeMenu: 'Закрыть меню',
        login: 'Войти',
        register: 'Зарегистрироваться',
        slogan: 'Ведущий портал ремесленников в Швейцарии',
        support: 'Поддержка',
        partnerLogin: 'Вход для партнеров',
        aboutUs: 'О нас',
        contact: 'Контакты',
        vorlagen: 'Шаблоны',
    }
};

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


const LanguageOption: React.FC<{lang: Language, name: string, currentLang: Language, onClick: (lang: Language) => void}> = ({ lang, name, currentLang, onClick }) => {
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
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setIsLangDropdownOpen(false);
            }
             if (mobileLangDropdownRef.current && !mobileLangDropdownRef.current.contains(event.target as Node)) {
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
        { name: t.home, to: '/', icon: ColoredHomeModernIcon },
        { name: t.services, to: '/services', icon: ColoredSquares2X2Icon },
        { name: t.becomePartner, to: '/providers', icon: ColoredUserIcon },
        { name: t.vorlagen, to: '/vorlagen', icon: ColoredLightbulbIcon },
        { name: t.aboutUs, to: '/ueber-uns', icon: ColoredBuildingStorefrontIcon },
        { name: t.contact, to: '/kontakt', icon: ColoredMailIcon }
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
                        `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                            isActive 
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
       
    {/* Fullscreen Mobile Menu Overlay - Optimized */}
    <div
      className={`fixed inset-0 z-[60] bg-slate-50 text-slate-900 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
    >
      <div className="flex flex-col h-full">
        {/* Header inside overlay */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200 flex-shrink-0">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary-600" />
            <span id="mobile-menu-title" className="font-black text-2xl tracking-tighter text-slate-900">Fertigo<span className="text-primary-600">.</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
                aria-label={t.login}
            >
                <UserIcon className="w-6 h-6" />
            </Link>
            <div className="relative" ref={mobileLangDropdownRef}>
                <button onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 transition-colors">
                    <CurrentFlagIcon className="w-6 h-auto rounded-sm" />
                </button>
                {isLangDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl z-10 animate-fade-in py-1">
                         <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">{t.changeLang}</div>
                         <ul className="max-h-60 overflow-y-auto">
                            {supportedLanguages.map(lang => {
                                const FlagIcon = { de: GermanFlagIcon, fr: FrenchFlagIcon, it: ItalianFlagIcon, en: EnglishFlagIcon, es: SpanishFlagIcon, pt: PortugueseFlagIcon, nl: DutchFlagIcon, pl: PolishFlagIcon, tr: TurkishFlagIcon, ru: RussianFlagIcon }[lang.code];
                                return (
                                    <li key={lang.code}>
                                        <button onClick={() => handleLanguageChange(lang.code)} className="w-full text-left flex items-center space-x-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition-colors rounded-lg">
                                            <FlagIcon className="w-6 h-auto rounded-sm shadow-sm" />
                                            <span className={`flex-1 ${language === lang.code ? 'font-bold text-primary-700' : 'font-medium'}`}>{lang.label}</span>
                                            {language === lang.code && <CheckCircleIcon className="ml-auto w-5 h-5 text-primary-600" />}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
             <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
                aria-label={t.closeMenu}
            >
                <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Content - List-based Navigation */}
        <main className="flex-1 p-3 overflow-y-auto flex flex-col justify-center">
            <nav className="flex flex-col space-y-2">
                {mobileNavItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) => 
                            `flex items-center gap-4 p-3 rounded-xl transition-colors duration-200
                            ${isActive 
                                ? 'bg-primary-100 text-primary-700' 
                                : 'text-slate-700 hover:bg-slate-200'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className="w-6 h-6 flex-shrink-0" />
                                <span className="font-bold text-base">{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </main>

        {/* Fixed Bottom Actions Area */}
        <footer className="p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 flex-shrink-0">
            <button
                onClick={handleQuoteButtonClick}
                className="w-full bg-primary-600 text-white font-black text-base py-3.5 rounded-xl shadow-lg shadow-primary-500/30 flex items-center justify-center gap-3 transition-all group active:scale-95"
            >
                <span>{t.getQuote}</span>
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
        </footer>
      </div>
    </div>
    </>
  );
};

export default Header;