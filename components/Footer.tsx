import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from '../pages/AppContext';

type Language = 'de' | 'fr' | 'it' | 'en' | 'es' | 'pt' | 'nl' | 'pl' | 'tr' | 'ru';

import { ChevronDownIcon, ChevronRightIcon, ArrowRightIcon, SwissFlagIcon } from './icons';
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
            { name: t.career, to: '/ueber-uns' }, // Changed from /jobs to /ueber-uns
            { name: t.press, to: '/kontakt' },    // Changed from # to /kontakt
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
            <div className="container mx-auto px-4 pt-40 pb-12 md:px-6 md:py-20">
                {/* Mobile View – neues Design */}
                <div className="md:hidden space-y-8">
                    {/* Oberer Streifen im Footer (nur Mobile) */}
                    <div className="w-full h-4 bg-slate-900" />

                    {/* Brand-Titel & Beschreibung (nur Mobile) */}
                    <div className="text-center space-y-3">
                        <Link to="/" className="inline-block">
                            <span className="text-3xl font-black text-white tracking-tight">
                                Fertigo<span className="text-green-500">.</span>
                            </span>
                        </Link>
                        <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                            {t.footerSlogan}
                        </p>
                    </div>

                    {/* Navigations-Blöcke als kompakte Listen mit Akkordeon */}
                    <div className="space-y-6">
                        {Object.entries(linkSections).map(([title, links]) => (
                            <div
                                key={title}
                                className="rounded-2xl bg-white/5 border border-white/10 px-4 py-4"
                            >
                                <button
                                    onClick={() => toggleSection(title)}
                                    className="w-full flex items-center justify-between text-left"
                                >
                                    <span className="text-xs font-semibold text-slate-200 uppercase tracking-[0.16em]">
                                        {title}
                                    </span>
                                    <span
                                        className={`
                                            inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5 text-slate-400
                                            transition-all duration-200
                                            ${openSections[title] ? 'rotate-180 bg-green-500/10 text-green-400' : ''}
                                        `}
                                    >
                                        <ChevronDownIcon className="w-3.5 h-3.5" />
                                    </span>
                                </button>

                                <div
                                    className={`
                                        grid transition-all duration-300 ease-in-out
                                        ${openSections[title] ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}
                                    `}
                                >
                                    <div className="overflow-hidden">
                                        <ul className="pt-1 space-y-1.5">
                                            {links.map(link => (
                                                <li key={link.name}>
                                                    <Link
                                                        to={link.to}
                                                        className="flex items-center justify-between rounded-xl px-3 py-2 text-[13px] text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors"
                                                    >
                                                        <span>{link.name}</span>
                                                        <ChevronRightIcon className="w-3.5 h-3.5 text-slate-500" />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Unterer Streifen unterhalb der letzten Karte (nur Mobile) */}
                    <div className="w-full h-4 bg-slate-900" />
                </div>

                {/* Desktop View (Original Grid) */}
                <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
                    <div className="col-span-2 lg:col-span-2 mb-8 lg:mb-0">
                        <Link to="/" className="flex flex-col mb-4">
                            <span className="font-extrabold text-xl text-white tracking-tight">Fertigo<span className="text-primary-600">.</span></span>
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