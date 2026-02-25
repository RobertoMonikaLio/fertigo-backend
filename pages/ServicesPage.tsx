import React, { useState, useMemo, useEffect } from 'react';
import {
    ArrowRightIcon,
    ColoredSparklesIcon,
    ColoredLeafIcon,
    ColoredPartyPopperIcon,
    ColoredPaintRollerIcon,
    ColoredWrenchScrewdriverIcon,
    ColoredSquares2X2Icon,
    ColoredLightbulbIcon,
    ColoredWindowIcon,
    ColoredHomeModernIcon,
    ColoredBuildingOffice2Icon,
    ColoredTrashIcon,
    ColoredToolboxIcon,
    ColoredPencilIcon,
    ColoredArchiveBoxIcon,
    ColoredTruckIcon,
    ColoredDiggerIcon,
    ColoredUserIcon,
    SunIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    StarIcon,
    CheckIcon,
    XMarkIcon,
    FireIcon,
    CheckCircleIcon,
    SwissFlagIcon,
} from '../components/icons';
import { Link } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { useInView } from 'react-intersection-observer';

interface ServiceItem {
    name: string;
    category: string;
    description: string;
    icon: React.ReactNode;
    popular?: boolean;
}

// SVG Vector Icons für Services
const getServiceIcon = (serviceName: string): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
        // Bau & Rohbau
        'Maurerarbeiten': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 3v18" />
            </svg>
        ),
        'Zimmermannarbeiten': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        'Dachdecker': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M4 18h16M6 15h12M8 12h8M10 9h4M12 3l10 6H2l10-6z" />
            </svg>
        ),
        'Fassadenbau': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <circle cx="9" cy="7" r="1" fill="currentColor" /><circle cx="15" cy="7" r="1" fill="currentColor" />
                <circle cx="9" cy="12" r="1" fill="currentColor" /><circle cx="15" cy="12" r="1" fill="currentColor" />
                <circle cx="9" cy="17" r="1" fill="currentColor" /><circle cx="15" cy="17" r="1" fill="currentColor" />
            </svg>
        ),
        // Innenausbau
        'Schreiner': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        'Gipserarbeiten': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
        ),
        'Bodenleger': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        'Plattenleger': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        'Fenstermontage': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 12h18M12 3v18" />
            </svg>
        ),
        // Sanitär, Heizungen & Klima
        'Sanitär': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        'Sanitärinstallation': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        'Badezimmerumbau': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z" />
                <path d="M6 12V5a2 2 0 0 1 2-2h1" />
                <circle cx="17" cy="6" r="2" />
            </svg>
        ),
        'Badrenovation': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z" />
                <path d="M6 12V5a2 2 0 0 1 2-2h1" />
                <circle cx="17" cy="6" r="2" />
            </svg>
        ),
        'Heizungsinstallation': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 8h8M8 12h8M8 16h8" />
            </svg>
        ),
        'Wärmepumpe Installation': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 8h8M8 12h8M8 16h8" />
            </svg>
        ),
        'Klimaanlagen-Service': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="10" rx="2" />
                <path d="M7 20v-4M17 20v-4M12 20v-4M7 10h.01M10 10h.01M13 10h.01M16 10h.01" />
            </svg>
        ),
        'Klimaanlagen Installation': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="10" rx="2" />
                <path d="M7 20v-4M17 20v-4M12 20v-4M7 10h.01M10 10h.01M13 10h.01M16 10h.01" />
            </svg>
        ),
        'Lüftungsanlagen': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="10" rx="2" />
                <path d="M7 20v-4M17 20v-4M12 20v-4M7 10h.01M10 10h.01M13 10h.01M16 10h.01" />
            </svg>
        ),

        // Renovation & Gestaltung
        'Malerarbeiten': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                <path d="M12 11v8M8 21h8" />
            </svg>
        ),
        'Küchenbau': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="9" width="18" height="12" rx="2" />
                <path d="M3 15h18M9 9V3M15 9V3" />
            </svg>
        ),
        // Umzug & Transport
        'Privatumzug': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="6" width="15" height="12" rx="2" />
                <path d="M16 16h4l3-5h-7" />
                <circle cx="6" cy="20" r="2" /><circle cx="18" cy="20" r="2" />
            </svg>
        ),
        'Firmenumzug': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="6" width="15" height="12" rx="2" />
                <path d="M16 16h4l3-5h-7" />
                <circle cx="6" cy="20" r="2" /><circle cx="18" cy="20" r="2" />
            </svg>
        ),
        'Möbeltransport': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="8" width="16" height="12" rx="2" />
                <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M12 12v4" />
            </svg>
        ),
        'Spezialumzug': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
        ),
        'Transport': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="8" width="16" height="12" rx="2" />
                <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M12 12v4" />
            </svg>
        ),
        'Entsorgung': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
            </svg>
        ),
        'Räumung': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6m4-6v6" />
            </svg>
        ),
        'Einlagerung': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
        // Reinigung & Pflege
        'Umzugsreinigung': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3l4 4M19 3l-4 4M12 3v4M5 21l4-4M19 21l-4-4M12 21v-4M3 12h4M21 12h-4" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        'Gebäudereinigung': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3l4 4M19 3l-4 4M12 3v4M5 21l4-4M19 21l-4-4M12 21v-4M3 12h4M21 12h-4" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        'Fensterreinigung': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 12h18M12 3v18" />
            </svg>
        ),
        'Baureinigung': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3l4 4M19 3l-4 4M12 3v4M5 21l4-4M19 21l-4-4M12 21v-4M3 12h4M21 12h-4" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        'Dachreinigung': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M12 3l10 7H2l10-7z" />
                <path d="M5 10v11M19 10v11" />
            </svg>
        ),
        'Hauswartung': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        // Garten & Aussenbereich
        'Gartenpflege': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 10a4 4 0 0 0-4-4C5 6 3 9 3 12s3 6 4 6h10c1 0 4-3 4-6s-2-6-5-6a4 4 0 0 0-4 4z" />
                <path d="M12 10v12" />
            </svg>
        ),
        'Gartenbau': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 10a4 4 0 0 0-4-4C5 6 3 9 3 12s3 6 4 6h10c1 0 4-3 4-6s-2-6-5-6a4 4 0 0 0-4 4z" />
                <path d="M12 10v12" />
            </svg>
        ),
        'Baumpflege': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-8M12 14l4-4M12 14l-4-4" />
                <circle cx="12" cy="8" r="6" />
            </svg>
        ),
        'Zaunbau': (
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6v14M10 6v14M16 6v14M22 6v14M2 10h6M8 10h6M14 10h6" />
            </svg>
        ),
    };

    // Default icon wenn kein spezifisches gefunden wird
    const defaultIcon = (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    );

    return iconMap[serviceName] || defaultIcon;
};

const allServicesData: ServiceItem[] = [
    { name: 'Maurerarbeiten', category: 'Bau & Rohbau', description: 'Neubau, Umbau und Reparaturen von Mauerwerk.', icon: getServiceIcon('Maurerarbeiten') },
    { name: 'Zimmermannarbeiten', category: 'Bau & Rohbau', description: 'Dachstühle, Holzkonstruktionen und Holzbauten.', icon: getServiceIcon('Zimmermannarbeiten') },
    { name: 'Dachdecker', category: 'Bau & Rohbau', description: 'Reparaturen, Sanierungen und Neubau von Dächern.', icon: getServiceIcon('Dachdecker') },
    { name: 'Fassadenbau', category: 'Bau & Rohbau', description: 'Isolation, Verputz und Gestaltung von Fassaden.', icon: getServiceIcon('Fassadenbau') },
    { name: 'Schreiner', category: 'Innenausbau', description: 'Massgefertigte Möbel, Reparaturen und Holzarbeiten.', icon: getServiceIcon('Schreiner') },
    { name: 'Gipserarbeiten', category: 'Innenausbau', description: 'Verputz, Trockenbau und Stuckatur für perfekte Oberflächen.', icon: getServiceIcon('Gipserarbeiten') },
    { name: 'Bodenleger', category: 'Innenausbau', description: 'Verlegung von Parkett, Laminat, Vinyl und Teppich.', icon: getServiceIcon('Bodenleger') },
    { name: 'Plattenleger', category: 'Innenausbau', description: 'Verlegung von Keramik-, Naturstein- und Mosaikplatten.', icon: getServiceIcon('Plattenleger') },
    { name: 'Fenstermontage', category: 'Innenausbau', description: 'Einbau und Austausch von Fenstern und Türen.', icon: getServiceIcon('Fenstermontage') },
    { name: 'Sanitär', category: 'Sanitär, Heizungen & Klima', description: 'Alle Installationen und Reparaturen rund um Bad und Küche.', icon: getServiceIcon('Sanitär'), popular: true },
    { name: 'Sanitärinstallation', category: 'Sanitär, Heizungen & Klima', description: 'Verlegung, Anpassung und Wartung von Wasser- und Abwasserleitungen.', icon: getServiceIcon('Sanitärinstallation') },
    { name: 'Heizungsinstallation', category: 'Sanitär, Heizungen & Klima', description: 'Installation und Wartung von modernen Heizungssystemen.', icon: getServiceIcon('Heizungsinstallation') },
    { name: 'Wärmepumpe Installation', category: 'Sanitär, Heizungen & Klima', description: 'Beratung und fachgerechter Einbau von effizienten Wärmepumpen.', icon: getServiceIcon('Wärmepumpe Installation') },
    { name: 'Klimaanlagen-Service', category: 'Sanitär, Heizungen & Klima', description: 'Wartung und Service-Arbeiten für Ihre bestehende Klimaanlage.', icon: getServiceIcon('Klimaanlagen-Service') },
    { name: 'Klimaanlagen Installation', category: 'Sanitär, Heizungen & Klima', description: 'Beratung und Montage passender und moderner Klimaanlagen.', icon: getServiceIcon('Klimaanlagen Installation') },
    { name: 'Lüftungsanlagen', category: 'Sanitär, Heizungen & Klima', description: 'Planung und Aufbau zuverlässiger Wohnraumlüftungen.', icon: getServiceIcon('Lüftungsanlagen') },
    { name: 'Badezimmerumbau', category: 'Sanitär, Heizungen & Klima', description: 'Komplettsanierung und Modernisierung Ihres Badezimmers.', icon: getServiceIcon('Badezimmerumbau') },
    { name: 'Badrenovation', category: 'Sanitär, Heizungen & Klima', description: 'Erneuerung der sanitären Einrichtungen und Badmöbel.', icon: getServiceIcon('Badrenovation') },
    { name: 'Malerarbeiten', category: 'Renovation & Gestaltung', description: 'Frische Farbe für Wände, Decken und Fassaden.', icon: getServiceIcon('Malerarbeiten'), popular: true },
    { name: 'Küchenbau', category: 'Renovation & Gestaltung', description: 'Planung und Montage Ihrer neuen Traumküche.', icon: getServiceIcon('Küchenbau') },
    { name: 'Privatumzug', category: 'Umzug & Transport', description: 'Stressfreier Wohnungswechsel mit erfahrenen Zügelprofis.', icon: getServiceIcon('Privatumzug'), popular: true },
    { name: 'Firmenumzug', category: 'Umzug & Transport', description: 'Effiziente und planmässige Verlagerung Ihres Unternehmens.', icon: getServiceIcon('Firmenumzug') },
    { name: 'Spezialumzug', category: 'Umzug & Transport', description: 'Spezialtransport für schwere und empfindliche Objekte.', icon: getServiceIcon('Spezialumzug') },
    { name: 'Möbeltransport', category: 'Umzug & Transport', description: 'Sicherer Transport für einzelne Möbelstücke oder ganze Ladungen.', icon: getServiceIcon('Möbeltransport') },
    { name: 'Transport', category: 'Umzug & Transport', description: 'Allgemeine Transportdienste für Ihre Güter.', icon: getServiceIcon('Transport') },
    { name: 'Räumung', category: 'Umzug & Transport', description: 'Komplette Räumung und Haushaltsauflösungen.', icon: getServiceIcon('Räumung') },
    { name: 'Entsorgung', category: 'Umzug & Transport', description: 'Fachgerechte Entsorgung von Sperrmüll.', icon: getServiceIcon('Entsorgung') },
    { name: 'Einlagerung', category: 'Umzug & Transport', description: 'Sichere Lagerung Ihrer Möbel und Güter.', icon: getServiceIcon('Einlagerung') },
    { name: 'Umzugsreinigung', category: 'Reinigung & Pflege', description: 'Mit Abnahmegarantie für eine reibungslose Wohnungsübergabe.', icon: getServiceIcon('Umzugsreinigung'), popular: true },
    { name: 'Gebäudereinigung', category: 'Reinigung & Pflege', description: 'Regelmässige Unterhaltsreinigung für Büro- und Wohngebäude.', icon: getServiceIcon('Gebäudereinigung') },
    { name: 'Fensterreinigung', category: 'Reinigung & Pflege', description: 'Streifenfreie Sauberkeit für Fenster und Glasfassaden.', icon: getServiceIcon('Fensterreinigung') },
    { name: 'Baureinigung', category: 'Reinigung & Pflege', description: 'Reinigung während und nach der Bauphase.', icon: getServiceIcon('Baureinigung') },
    { name: 'Dachreinigung', category: 'Reinigung & Pflege', description: 'Professionelle Reinigung und Imprägnierung von Dächern.', icon: getServiceIcon('Dachreinigung') },
    { name: 'Hauswartung', category: 'Reinigung & Pflege', description: 'Kompletter Service für Ihre Liegenschaft, von Reinigung bis Unterhalt.', icon: getServiceIcon('Hauswartung') },
    { name: 'Gartenpflege', category: 'Garten & Aussenbereich', description: 'Heckenschnitt, Rasenmähen und saisonale Gartenarbeiten.', icon: getServiceIcon('Gartenpflege'), popular: true },
    { name: 'Gartenbau', category: 'Garten & Aussenbereich', description: 'Neuanlagen, Umgestaltungen und Pflasterarbeiten.', icon: getServiceIcon('Gartenbau') },
    { name: 'Baumpflege', category: 'Garten & Aussenbereich', description: 'Fachgerechter Schnitt und Fällung von Bäumen.', icon: getServiceIcon('Baumpflege') },
    { name: 'Zaunbau', category: 'Garten & Aussenbereich', description: 'Errichtung von Zäunen aus Holz, Metall und Kunststoff.', icon: getServiceIcon('Zaunbau') },
];

const categoryOrder = [
    'Bau & Rohbau',
    'Innenausbau',
    'Sanitär, Heizungen & Klima',
    'Renovation & Gestaltung',
    'Umzug & Transport',
    'Reinigung & Pflege',
    'Garten & Aussenbereich',
];

const categoryGradients: Record<string, string> = {
    'Bau & Rohbau': 'from-amber-500 to-orange-600',
    'Innenausbau': 'from-orange-500 to-red-600',
    'Sanitär, Heizungen & Klima': 'from-yellow-500 to-amber-600',
    'Renovation & Gestaltung': 'from-rose-500 to-pink-600',
    'Umzug & Transport': 'from-blue-500 to-indigo-600',
    'Reinigung & Pflege': 'from-cyan-500 to-blue-600',
    'Garten & Aussenbereich': 'from-green-500 to-emerald-600',

};

const categoryIcons: Record<string, React.ReactNode> = {
    'Bau & Rohbau': <ColoredBuildingOffice2Icon className="w-full h-full" />,
    'Innenausbau': <ColoredWindowIcon className="w-full h-full" />,
    'Sanitär, Heizungen & Klima': <ColoredLightbulbIcon className="w-full h-full" />,
    'Renovation & Gestaltung': <ColoredPaintRollerIcon className="w-full h-full" />,
    'Umzug & Transport': <ColoredTruckIcon className="w-full h-full" />,
    'Reinigung & Pflege': <ColoredSparklesIcon className="w-full h-full" />,
    'Garten & Aussenbereich': <ColoredLeafIcon className="w-full h-full" />,

};

const ServicesPage: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        // Scroll animation on mount
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const servicesByCategory = useMemo(() => {
        const grouped: Record<string, ServiceItem[]> = {};
        grouped['Alle'] = allServicesData;
        categoryOrder.forEach(cat => grouped[cat] = []);
        allServicesData.forEach(service => {
            if (grouped[service.category]) {
                grouped[service.category].push(service);
            }
        });
        return grouped;
    }, []);


    const filteredServices = useMemo(() => {
        let services = selectedCategory === 'Alle'
            ? allServicesData
            : servicesByCategory[selectedCategory] || [];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            services = services.filter(s =>
                s.name.toLowerCase().includes(query) ||
                s.description.toLowerCase().includes(query) ||
                s.category.toLowerCase().includes(query)
            );
        }

        // Sort: popular first (alphabetically), then rest alphabetically
        services.sort((a, b) => {
            if (a.popular && !b.popular) return -1;
            if (!a.popular && b.popular) return 1;
            return a.name.localeCompare(b.name, 'de');
        });

        return services;
    }, [selectedCategory, searchQuery, servicesByCategory]);

    const stats = [
        { value: '500+', label: 'Dienstleistungen', icon: <ColoredToolboxIcon className="w-6 h-6" /> },
        { value: '15', label: 'Kategorien', icon: <ColoredSquares2X2Icon className="w-6 h-6" /> },
        { value: '1000+', label: 'Geprüfte Partner', icon: <CheckIcon className="w-6 h-6 text-green-600" /> },
        { value: '24/7', label: 'Support', icon: <ColoredLightbulbIcon className="w-6 h-6" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* All Services Section - Modern Layout */}
            <div id="services-results" className="bg-slate-50 pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                    {/* Top Header */}
                    <div className="mb-8 px-1 sm:px-0 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                            Finden Sie den passenden Service
                        </h2>
                        <p className="text-slate-600 text-base sm:text-lg font-medium">
                            Entdecken Sie unser breites Angebot. Von Renovierung bis Reinigung — finden Sie den passenden Fachbetrieb für Ihr Projekt.
                        </p>
                    </div>


                    {/* Category Pills - Horizontal Scroll */}
                    <div className="mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 flex justify-center">
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide snap-x" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
                            <button
                                onClick={() => setSelectedCategory('Alle')}
                                className={`snap-center flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${selectedCategory === 'Alle'
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-600/25 shadow-lg scale-105'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-green-300 hover:text-green-600 hover:shadow-md'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                                <span>Alle Services</span>
                            </button>
                            {categoryOrder.map((category) => {
                                const count = (servicesByCategory[category] || []).length;
                                const isActive = selectedCategory === category;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`snap-center flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${isActive
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-600/25 shadow-lg scale-105'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:border-green-300 hover:text-green-600 hover:shadow-md'
                                            }`}
                                    >
                                        <span className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 opacity-80'}`}>{categoryIcons[category]}</span>
                                        <span>{category}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Services Grid - Grouped by Category */}
                    {filteredServices.length > 0 ? (
                        <div className="space-y-12 sm:space-y-16">
                            {categoryOrder.map(category => {
                                const categoryServices = filteredServices.filter(s => s.category === category);
                                if (categoryServices.length === 0) return null;

                                return (
                                    <div key={category} className="space-y-4 sm:space-y-6">
                                        {/* Category Title Header */}
                                        <div className="flex items-center gap-3 px-1 sm:px-0 mb-4 sm:mb-6">
                                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                                                <span className="w-5 h-5">{categoryIcons[category]}</span>
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{category}</h3>
                                        </div>

                                        {/* ===== MOBILE: Kompakte Liste ===== */}
                                        <div className="sm:hidden space-y-2">
                                            {categoryServices.map((service, index) => {
                                                const serviceEmojis: Record<string, string> = {
                                                    'Maurerarbeiten': '🧱', 'Zimmermannarbeiten': '🪵', 'Dachdecker': '🏠', 'Fassadenbau': '🏢',
                                                    'Schreiner': '🪚', 'Gipserarbeiten': '🪣', 'Bodenleger': '🪵', 'Plattenleger': '🔲', 'Fenstermontage': '🪟',
                                                    'Sanitär': '🚿', 'Sanitärinstallation': '🚿', 'Heizungsinstallation': '🔥', 'Klimaanlagen-Service': '❄️', 'Klimaanlagen Installation': '❄️', 'Wärmepumpe Installation': '♨️', 'Lüftungsanlagen': '💨',
                                                    'Malerarbeiten': '🎨', 'Küchenbau': '🍳', 'Badezimmerumbau': '🛁', 'Badrenovation': '🛁',
                                                    'Privatumzug': '📦', 'Firmenumzug': '🏬', 'Spezialumzug': '🎹', 'Möbeltransport': '🛋️', 'Transport': '🚛',
                                                    'Räumung': '🗑️', 'Entsorgung': '🗑️', 'Einlagerung': '📦',
                                                    'Umzugsreinigung': '🧹', 'Gebäudereinigung': '🏢', 'Fensterreinigung': '🪟',
                                                    'Baureinigung': '🧽', 'Dachreinigung': '🏠', 'Hauswartung': '🔧',
                                                    'Gartenpflege': '🌿', 'Gartenbau': '🌳', 'Baumpflege': '🌲', 'Zaunbau': '🚧',
                                                };
                                                const emoji = serviceEmojis[service.name] || '🔨';

                                                return (
                                                    <button
                                                        key={service.name}
                                                        onClick={() => openQuoteModal({ projectTitle: service.name, service: service.name })}
                                                        className="group w-full bg-white rounded-xl p-3 border border-slate-100 active:border-green-300 active:bg-green-50/50 transition-all text-left flex items-center gap-3"
                                                    >
                                                        {/* Emoji */}
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center flex-shrink-0">
                                                            <span className="text-lg">{emoji}</span>
                                                        </div>

                                                        {/* Text */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-bold text-slate-900 text-[13px] leading-tight truncate">
                                                                    {service.name}
                                                                </h3>
                                                                {service.popular && (
                                                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold rounded-full flex-shrink-0">
                                                                        <FireIcon className="w-2.5 h-2.5" /> Beliebt
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{service.description}</p>
                                                        </div>

                                                        {/* Arrow */}
                                                        <ArrowRightIcon className="w-4 h-4 text-slate-300 flex-shrink-0" />
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* ===== DESKTOP: Grid ===== */}
                                        <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                            {categoryServices.map((service, index) => {
                                                const serviceEmojis: Record<string, string> = {
                                                    'Maurerarbeiten': '🧱', 'Zimmermannarbeiten': '🪵', 'Dachdecker': '🏠', 'Fassadenbau': '🏢',
                                                    'Schreiner': '🪚', 'Gipserarbeiten': '🪣', 'Bodenleger': '🪵', 'Plattenleger': '🔲', 'Fenstermontage': '🪟',
                                                    'Sanitär': '🚿', 'Sanitärinstallation': '🚿', 'Heizungsinstallation': '🔥', 'Klimaanlagen-Service': '❄️', 'Klimaanlagen Installation': '❄️', 'Wärmepumpe Installation': '♨️', 'Lüftungsanlagen': '💨',
                                                    'Malerarbeiten': '🎨', 'Küchenbau': '🍳', 'Badezimmerumbau': '🛁', 'Badrenovation': '🛁',
                                                    'Privatumzug': '📦', 'Firmenumzug': '🏬', 'Spezialumzug': '🎹', 'Möbeltransport': '🛋️', 'Transport': '🚛',
                                                    'Räumung': '🗑️', 'Entsorgung': '🗑️', 'Einlagerung': '📦',
                                                    'Umzugsreinigung': '🧹', 'Gebäudereinigung': '🏢', 'Fensterreinigung': '🪟',
                                                    'Baureinigung': '🧽', 'Dachreinigung': '🏠', 'Hauswartung': '🔧',
                                                    'Gartenpflege': '🌿', 'Gartenbau': '🌳', 'Baumpflege': '🌲', 'Zaunbau': '🚧',
                                                };
                                                const emoji = serviceEmojis[service.name] || '🔨';

                                                return (
                                                    <button
                                                        key={service.name}
                                                        onClick={() => openQuoteModal({ projectTitle: service.name, service: service.name })}
                                                        className="group bg-white rounded-2xl p-4 border border-slate-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-100/50 transition-all text-left"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                            <span className="text-2xl">{emoji}</span>
                                                        </div>
                                                        <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1 group-hover:text-green-600 transition-colors">
                                                            {service.name}
                                                        </h3>
                                                        <p className="text-xs text-slate-400">{service.category}</p>
                                                        {service.popular && (
                                                            <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">
                                                                <FireIcon className="w-3 h-3" /> Beliebt
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <NoResults searchQuery={searchQuery} onReset={() => { setSearchQuery(''); setSelectedCategory('Alle'); }} />
                    )}

                </div>
            </div>


        </div>
    );
};

// Service Card Component - Matching Homepage Style
interface ServiceCardProps {
    service: ServiceItem;
    gradient: string;
    onSelect: () => void;
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, gradient, onSelect, index }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`group animate-fade-in ${inView ? 'opacity-100' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <button
                onClick={onSelect}
                className="w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-primary-300 hover:-translate-y-1 text-left h-full flex flex-col"
            >
                {/* Icon Header */}
                <div className={`relative p-6 bg-gradient-to-br ${gradient}`}>
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                            <div className="w-6 h-6">{service.icon}</div>
                        </div>
                        {service.popular && (
                            <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full">
                                <StarIcon className="w-3 h-3" />
                                <span className="text-xs font-bold">Beliebt</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {service.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1 leading-relaxed">
                        {service.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-500">
                            {service.category}
                        </span>
                        <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                    </div>
                </div>
            </button>
        </div>
    );
};

// List Item Component - Matching Homepage Style
interface ServiceListItemProps {
    service: ServiceItem;
    gradient: string;
    onSelect: () => void;
    index: number;
}

const ServiceListItem: React.FC<ServiceListItemProps> = ({ service, gradient, onSelect, index }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`animate-fade-in ${inView ? 'opacity-100' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 30}ms` }}
        >
            <button
                onClick={onSelect}
                className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-slate-200 hover:border-primary-300 flex items-center gap-5 group text-left"
            >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md`}>
                    <div className="w-7 h-7 text-white">{service.icon}</div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                            {service.name}
                        </h3>
                        {service.popular && (
                            <span className="flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                                <StarIcon className="w-3 h-3" />
                                Beliebt
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-600 mb-1.5 leading-relaxed">
                        {service.description}
                    </p>
                    <span className="text-xs font-bold text-slate-500">
                        {service.category}
                    </span>
                </div>

                {/* Arrow */}
                <ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </button>
        </div>
    );
};

// Trust Section Component - Alternativer Look für "Warum Fertigo statt die Konkurrenz?"
const TrustSection: React.FC = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <section ref={ref} className={`py-16 bg-white transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
                        Warum <span className="text-primary-600">Fertigo</span> statt die Konkurrenz?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                        Wir setzen neue Maßstäbe für Service-Vermittlung in der Schweiz. Überzeugen Sie sich selbst im direkten Vergleich:
                    </p>
                </div>
                <div className="relative overflow-x-auto rounded-3xl shadow-2xl border border-slate-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
                    <table className="min-w-full text-sm md:text-base text-left">
                        <thead>
                            <tr className="bg-emerald-200/60">
                                <th className="px-6 py-4 font-bold text-slate-700">&nbsp;</th>
                                <th className="px-6 py-4 font-bold text-emerald-700 text-center">Fertigo</th>
                                <th className="px-6 py-4 font-bold text-slate-400 text-center">Andere Plattformen</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100">
                                <td className="px-6 py-5 font-semibold">Geprüfte Partner</td>
                                <td className="px-6 py-5 text-center text-emerald-600 font-bold"><span className="inline-block bg-emerald-100 px-3 py-1 rounded-full">✔️</span></td>
                                <td className="px-6 py-5 text-center text-slate-400 font-bold"><span className="inline-block bg-slate-100 px-3 py-1 rounded-full">❌</span></td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="px-6 py-5 font-semibold">Schnelle Vermittlung</td>
                                <td className="px-6 py-5 text-center text-emerald-600 font-bold"><span className="inline-block bg-emerald-100 px-3 py-1 rounded-full">⏱️ 24h</span></td>
                                <td className="px-6 py-5 text-center text-slate-400 font-bold"><span className="inline-block bg-slate-100 px-3 py-1 rounded-full">⏳ Tage</span></td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="px-6 py-5 font-semibold">Persönliche Beratung</td>
                                <td className="px-6 py-5 text-center text-emerald-600 font-bold"><span className="inline-block bg-emerald-100 px-3 py-1 rounded-full">🤝</span></td>
                                <td className="px-6 py-5 text-center text-slate-400 font-bold"><span className="inline-block bg-slate-100 px-3 py-1 rounded-full">-</span></td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="px-6 py-5 font-semibold">Transparente Preise</td>
                                <td className="px-6 py-5 text-center text-emerald-600 font-bold"><span className="inline-block bg-emerald-100 px-3 py-1 rounded-full">💡</span></td>
                                <td className="px-6 py-5 text-center text-slate-400 font-bold"><span className="inline-block bg-slate-100 px-3 py-1 rounded-full">❓</span></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-5 font-semibold">Kundenzufriedenheit</td>
                                <td className="px-6 py-5 text-center text-emerald-600 font-bold"><span className="inline-block bg-emerald-100 px-3 py-1 rounded-full">4.8★</span></td>
                                <td className="px-6 py-5 text-center text-slate-400 font-bold"><span className="inline-block bg-slate-100 px-3 py-1 rounded-full">3.5★</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-10 flex justify-center">
                    <Link to="/register" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow hover:bg-emerald-700 transition text-lg">
                        Jetzt kostenlos testen
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};


// Inline SVG Icon Component
const ServiceIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6" }) => {
    const icons: Record<string, React.ReactNode> = {
        // Bau
        'Maurerarbeiten': <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />,
        'Zimmermannarbeiten': <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />,
        'Dachdecker': <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />,
        'Fassadenbau': <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-.75 3h.75m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />,
        // Innenausbau
        'Schreiner': <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />,
        'Gipserarbeiten': <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />,
        'Bodenleger': <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />,
        'Plattenleger': <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />,
        'Fenstermontage': <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0021 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />,
        // Sanitär, Heizungen & Klima
        'Sanitär': <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />,
        'Sanitärinstallation': <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />,
        'Heizungsinstallation': <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />,
        'Wärmepumpe Installation': <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />,

        'Klimaanlagen-Service': <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />,
        'Klimaanlagen Installation': <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />,
        'Lüftungsanlagen': <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />,
        // Renovation
        'Malerarbeiten': <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />,
        'Küchenbau': <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />,
        'Badezimmerumbau': <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
        'Badrenovation': <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
        // Transport
        'Privatumzug': <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />,
        'Firmenumzug': <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />,
        'Möbeltransport': <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />,
        'Klaviertransport': <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />,
        'Entsorgung & Räumung': <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />,
        'Einlagerung': <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />,
        // Reinigung
        'Umzugsreinigung': <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />,
        'Gebäudereinigung': <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />,
        'Fensterreinigung': <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0021 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />,
        'Baureinigung': <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />,
        'Dachreinigung': <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />,
        'Hauswartung': <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />,
        // Garten
        'Gartenpflege': <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 007.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />,
        'Gartenbau': <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 007.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />,
        'Baumpflege': <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />,
        'Zaunbau': <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />,
    };

    // Default icon
    const defaultIcon = <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />;

    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {icons[name] || defaultIcon}
        </svg>
    );
};

// Service Cards - Clean Modern Design
interface MagazineServicesGridProps {
    services: ServiceItem[];
    categoryGradients: Record<string, string>;
    onServiceClick: (name: string) => void;
}

// Single Service Card Component (with its own hook)
const ServiceCardItem: React.FC<{
    service: ServiceItem;
    index: number;
    onServiceClick: (name: string) => void;
}> = ({ service, index, onServiceClick }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${Math.min(index * 30, 300)}ms` }}
        >
            <button
                type="button"
                onClick={() => onServiceClick(service.name)}
                className="group w-full bg-white rounded-xl p-5 border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200 text-left h-full flex flex-col"
            >
                {/* Top Row: Icon + Title */}
                <div className="flex items-start gap-4 mb-3">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 group-hover:border-primary-200 transition-colors">
                        <ServiceIcon name={service.name} className="w-5 h-5 text-primary-600" />
                    </div>

                    {/* Title + Category */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 leading-tight mb-1 group-hover:text-primary-700 transition-colors">
                            {service.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                            {service.category}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2 flex-1">
                    {service.description}
                </p>

                {/* CTA */}
                <div className="flex items-center text-xs font-semibold text-primary-600 group-hover:text-primary-700">
                    <span>Anfragen</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </button>
        </div>
    );
};

const MagazineServicesGrid: React.FC<MagazineServicesGridProps> = ({
    services,
    onServiceClick
}) => {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {services.map((service, index) => (
                <div key={service.name} className="flex-shrink-0 w-64">
                    <ServiceCardItem
                        service={service}
                        index={index}
                        onServiceClick={onServiceClick}
                    />
                </div>
            ))}
        </div>
    );
};

// No Results Component - Matching Homepage Style
interface NoResultsProps {
    searchQuery: string;
    onReset: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ searchQuery, onReset }) => {
    return (
        <div className="text-center py-10 sm:py-16 px-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-md">
            <div className="inline-flex justify-center items-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-slate-100 mb-4 sm:mb-6">
                <MagnifyingGlassIcon className="w-7 h-7 sm:w-10 sm:h-10 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 sm:mb-3">Keine Services gefunden</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto">
                Für <span className="font-bold text-slate-900">"{searchQuery}"</span> wurden leider keine passenden Services gefunden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={onReset}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-primary-600 text-white text-sm sm:text-base font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg inline-flex items-center gap-2 justify-center"
                >
                    Filter zurücksetzen
                </button>
            </div>
        </div>
    );
};

export default ServicesPage;
