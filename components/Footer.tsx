import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from '../pages/AppContext';

type Language = 'de' | 'fr' | 'it' | 'en' | 'es' | 'pt' | 'nl' | 'pl' | 'tr' | 'ru';

import { ChevronDownIcon, ChevronRightIcon, ArrowRightIcon } from './icons';
import { translations } from './translations';

const Footer: React.FC = () => {
    const { language } = useAppContext();
    const t = translations[language];

    const linkSections = {
        [t.services]: [
            { name: t.move, to: '/services' },
            { name: t.cleaning, to: '/services' },
            { name: t.painting, to: '/services' },
            { name: t.craftsmen, to: '/services' },
            { name: t.gardening, to: '/services' },
        ],
        [t.company]: [
            { name: t.aboutUs, to: '/ueber-uns' },
            { name: t.contact, to: '/kontakt' },
            { name: t.career, to: '/jobs' },
            { name: t.press, to: '#' },
            { name: t.becomePartnerFooter, to: '/providers' },
        ],
        [t.legal]: [
            { name: t.imprint, to: '/impressum' },
            { name: t.agb, to: '/agb' },
            { name: t.privacy, to: '/datenschutz' },
        ]
    };

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const toggleSection = (title: string) => {
        setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="container mx-auto px-4 pt-24 pb-8 md:px-6 md:py-20">
                {/* Mobile View (Modern Card Group Layout) */}
                <div className="md:hidden flex flex-col space-y-6">
                    {/* Brand Header */}
                    <div className="flex flex-col items-start">
                        <Link to="/" className="flex items-center gap-2 mb-3">
                            <span className="font-extrabold text-3xl text-white tracking-tighter">Fertigo<span className="text-primary-500">.</span></span>
                        </Link>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">{t.footerSlogan}</p>
                    </div>

                    {/* Navigation Cards */}
                    <div className="space-y-4">
                        {Object.entries(linkSections)
                            .filter(([title]) => title !== t.services)
                            .map(([title, links]) => (
                                <div key={title} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm">
                                    <h3 className="bg-slate-800/60 px-5 py-3 text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] border-b border-slate-700/50">
                                        {title}
                                    </h3>
                                    <div className="flex flex-col divide-y divide-slate-700/30">
                                        {links.map(link => (
                                            <Link
                                                key={link.name}
                                                to={link.to}
                                                className="flex items-center justify-between px-5 py-3.5 group active:bg-slate-700/50 transition-colors"
                                            >
                                                <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                                                    {link.name}
                                                </span>
                                                <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-primary-500 transition-colors" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>

                </div>

                {/* Desktop View (Original Grid) */}
                <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
                    <div className="col-span-2 lg:col-span-2 mb-8 lg:mb-0">
                        <Link to="/" className="flex flex-col mb-4">
                            <span className="font-extrabold text-xl text-white tracking-tight">Fertigo</span>
                            <span className="text-xs font-normal text-primary-400 tracking-tight -mt-1">Clever, Günstig, Flexibel</span>
                        </Link>
                        <p className="text-slate-400 text-sm md:text-base max-w-sm mt-4">{t.footerSlogan}</p>
                    </div>

                    {Object.entries(linkSections).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">{title}</h3>
                            <ul className="space-y-3 text-sm md:text-base">
                                {links.map(link => (
                                    <li key={link.name}>
                                        <Link to={link.to} className="hover:text-white transition-colors hover:underline underline-offset-2">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
            </div>

            <div className="bg-slate-950/50 py-4">
                <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-[10px] sm:text-xs font-medium text-center sm:text-left uppercase tracking-wide">
                        &copy; {new Date().getFullYear()} Fertigo. {t.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;