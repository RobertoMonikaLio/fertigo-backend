import React, { useState, useMemo, useEffect } from 'react';
import {
    ArrowRightIcon,
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
const getServiceIcon = (serviceName: string): string => {
    const iconMap: Record<string, string> = {
        // Bau & Rohbau
        'Maurerarbeiten': '🏗️',
        'Zimmerarbeiten': '🪵',
        'Dachdecker': '🏠',
        'Fassadenbau': '🏢',

        // Innenausbau
        'Schreinerei': '🪵',
        'Schreiner': '🪚',
        'Gipser': '🎨',
        'Gipserarbeiten': '🎨',
        'Bodenleger': '🧱',
        'Plattenleger': '🔲',
        'Fenstermontage': '🪟',
        'Türenmontage': '🚪',
        'Fensterbau': '🪟',
        'Sicherheitssysteme': '🛡️',
        'Videoüberwachung': '📹',

        // Sanitär, Heizungen & Klima
        'Sanitär': '🔧',
        'Sanitär/Installateur': '🔧',
        'Sanitärinstallation': '🚽',
        'Badezimmerumbau': '🛁',
        'Badrenovation': '🚿',
        'Heizungsinstallation': '🌡️',
        'Heizungen': '🔥',
        'Elektriker': '💡',
        'Wärmepumpe Installation': '♨️',
        'Solaranlagen': '☀️',
        'Wallbox': '🔌',
        'Klimaanlagen-Service': '❄️',
        'Klimaanlagen Installation': '❄️',
        'Lüftungsanlagen': '🌬️',

        // Renovation & Gestaltung
        'Malerarbeiten': '🖌️',
        'Küchenbau': '👨‍🍳',

        // Umzug & Transport
        'Privatumzug': '📦',
        'Firmenumzug': '🚛',
        'Möbeltransport': '🛋️',
        'Spezialumzug': '🎹',
        'Transport': '🚚',
        'Entsorgung': '♻️',
        'Räumung': '🧹',
        'Einlagerung': '🏢',

        // Reinigung & Pflege
        'Umzugsreinigung': '✨',
        'Wohnungsreinigung': '🏠',
        'Büroreinigung': '🏢',
        'Fensterreinigung': '🪟',
        'Gebäudereinigung': '🏢',
        'Teppichreinigung': '🧹',
        'Polsterreinigung': '🧼',
        'Baureinigung': '🏗️',
        'Dachreinigung': '🧹',
        'Hauswartung': '🛠️',

        // Gartenbau & Pflege
        'Gartenpflege': '🏡',
        'Gartenbau': '🚜',
        'Baumpflege': '🌳',
        'Zaunbau': '🚧',
        'Rasen mähen': '🎋',
        'Hecken schneiden': '🎋',
        'Baum schneiden / fällen': '🪵',
        'Terrassenbau': '🪵',
        'Winterdienst': '❄️',
        'Rasen verlegen': '🎋',
        'Bewässerungssysteme': '💧',

        // Sonstige Handwerker
        'Renovationen': '🏠',
        'Küchenmontage': '🔧',
        'Reparaturen': '🔧',
        'Trockenbau': '🧱',
        'Deckenbau': '🏗️',
        'Isolierung': '🧥',
        'Isolierung / Dämmung': '🧥',
        'Möbelmontage': '🛋️',
        'Lampen': '💡',
        'Lampen montieren': '💡',
        'TV-Wandmontage': '📺',
        'Vorhangschienen montieren': '🪟',
        'Bohrarbeiten': '🔨',
        'Kleinreparaturen': '🛠️',
        'Notdienst': '🆘',
        'Schlüsseldienst': '🔑',
        'Smart Home': '📱',
        'Netzwerk': '🌐',
        'TV': '📺',
        'Vorhang': '🪟',
        'Bohren': '🔨',
    };

    return iconMap[serviceName] || '🛠️';
};

const allServicesData: ServiceItem[] = [
    { name: 'Sanitär Notdienst', category: 'Notfall-Services', description: '24/7 Hilfe bei Wasserschäden, Rohrbrüchen und Verstopfungen.', icon: getServiceIcon('Notdienst'), popular: true },
    { name: 'Elektriker Notdienst', category: 'Notfall-Services', description: 'Sofortige Hilfe bei Stromausfall und Kurzschlüssen.', icon: getServiceIcon('Notdienst'), popular: true },
    { name: 'Heizung Notdienst', category: 'Notfall-Services', description: 'Schnelle Reparatur bei Heizungsausfall – auch nachts.', icon: getServiceIcon('Notdienst') },
    { name: 'Schlüsseldienst', category: 'Notfall-Services', description: 'Türöffnungen zum fairen Festpreis – rund um die Uhr.', icon: getServiceIcon('Schlüsseldienst'), popular: true },

    { name: 'Maurerarbeiten', category: 'Innen- und Aussenbau & Renovation', description: 'Neubau, Umbau und Reparaturen von Mauerwerk.', icon: getServiceIcon('Maurerarbeiten') },
    { name: 'Fassadenbau', category: 'Innen- und Aussenbau & Renovation', description: 'Isolation, Verputz und Gestaltung von Fassaden.', icon: getServiceIcon('Fassadenbau') },
    { name: 'Renovationen', category: 'Innen- und Aussenbau & Renovation', description: 'Komplettsanierungen und Teilerneuerungen Ihrer Liegenschaft.', icon: getServiceIcon('Renovationen'), popular: true },
    { name: 'Küchenmontage', category: 'Innen- und Aussenbau & Renovation', description: 'Professioneller Aufbau und Montage Ihrer neuen Küche.', icon: getServiceIcon('Küchenmontage') },

    { name: 'Elektriker', category: 'Innen- und Aussenbau & Renovation', description: 'Elektroinstallationen, Reparaturen und Neuverkabelungen.', icon: getServiceIcon('Elektriker'), popular: true },
    { name: 'Sanitär / Installateur', category: 'Handwerker', description: 'Alle Installationen und Reparaturen rund um Bad und Küche.', icon: getServiceIcon('Sanitär'), popular: true },
    { name: 'Heizungen', category: 'Handwerker', description: 'Installation und Wartung von Heizungssystemen.', icon: getServiceIcon('Heizungen') },
    { name: 'Klimaanlagen & Lüftungen', category: 'Handwerker', description: 'Montage und Wartung von Klima- und Lüftungsanlagen.', icon: getServiceIcon('Klimaanlagen Installation') },
    { name: 'Schreinerei', category: 'Handwerker', description: 'Umfassende Holzbearbeitung und massgefertigte Möbel.', icon: getServiceIcon('Schreinerei') },
    { name: 'Gipser', category: 'Innen- und Aussenbau & Renovation', description: 'Verputz, Trockenbau und Stuckatur.', icon: getServiceIcon('Gipser') },
    { name: 'Gipserarbeiten', category: 'Innen- und Aussenbau & Renovation', description: 'Umfassende Gipser- und Verputzarbeiten für Innen und Aussen.', icon: getServiceIcon('Gipserarbeiten') },
    { name: 'Malerarbeiten', category: 'Innen- und Aussenbau & Renovation', description: 'Frische Farbe für Wände, Decken und Fassaden.', icon: getServiceIcon('Malerarbeiten'), popular: true },
    { name: 'Trockenbau', category: 'Innen- und Aussenbau & Renovation', description: 'Errichtung von Leichtbauwänden und modernen Raumtrennsystemen.', icon: getServiceIcon('Trockenbau') },
    { name: 'Deckenbau', category: 'Innen- und Aussenbau & Renovation', description: 'Montage von abgehängten Decken und Akustikelementen.', icon: getServiceIcon('Deckenbau') },
    { name: 'Isolierung / Dämmung', category: 'Innen- und Aussenbau & Renovation', description: 'Optimale Wärmedämmung und Schallschutz für Ihre Immobilie.', icon: getServiceIcon('Isolierung') },
    { name: 'Dachdecker', category: 'Innen- und Aussenbau & Renovation', description: 'Reparaturen, Sanierungen und Neubau von dächern.', icon: getServiceIcon('Dachdecker') },

    { name: 'Schreiner', category: 'Schreiner & Holzbau', description: 'Massgefertigte Möbel, Reparaturen und Holzarbeiten.', icon: getServiceIcon('Schreiner') },
    { name: 'Zimmerarbeiten', category: 'Schreiner & Holzbau', description: 'Holzkonstruktionen, Dachstühle und Innenausbauten aus Holz.', icon: getServiceIcon('Zimmerarbeiten') },

    { name: 'Bodenleger', category: 'Boden & Plattenleger', description: 'Verlegung von Parkett, Laminat, Vinyl und Teppich.', icon: getServiceIcon('Bodenleger'), popular: true },
    { name: 'Plattenleger', category: 'Boden & Plattenleger', description: 'Verlegung von Keramik-, Naturstein- und Mosaikplatten.', icon: getServiceIcon('Bodenleger'), popular: true },
    { name: 'Parkett schleifen', category: 'Boden & Plattenleger', description: 'Professionelle Aufbereitung und Versiegelung von Parkettböden.', icon: getServiceIcon('Bodenleger') },
    { name: 'Parkett verlegen', category: 'Boden & Plattenleger', description: 'Fachgerechte Verlegung von hochwertigem Parkett.', icon: getServiceIcon('Bodenleger') },
    { name: 'Laminat verlegen', category: 'Boden & Plattenleger', description: 'Schnelle und präzise Verlegung von Laminatböden.', icon: getServiceIcon('Bodenleger') },
    { name: 'Vinylboden verlegen', category: 'Boden & Plattenleger', description: 'Langlebige und pflegeleichte Vinylböden für jeden Raum.', icon: getServiceIcon('Bodenleger') },
    { name: 'Parkettlegen', category: 'Boden & Plattenleger', description: 'Umfassende Lösungen für Ihren neuen Parkettboden.', icon: getServiceIcon('Bodenleger') },

    { name: 'Solaranlagen Montage', category: 'Energie & Nachhaltigkeit', description: 'Planung und Installation von Photovoltaikanlagen.', icon: getServiceIcon('Solaranlagen'), popular: true },
    { name: 'Wallbox Installation (E-Auto)', category: 'Energie & Nachhaltigkeit', description: 'Ihre eigene Ladestation für zu Hause sicher installiert.', icon: getServiceIcon('Wallbox'), popular: true },
    { name: 'Wärmepumpen Installationen', category: 'Energie & Nachhaltigkeit', description: 'Beratung und fachgerechter Einbau von effizienten Wärmepumpen.', icon: getServiceIcon('Wärmepumpe Installation') },

    { name: 'Türenmontage', category: 'Türen & Fenstermontage', description: 'Fachgerechter Einbau und Austausch von Haus- und Zimmertüren.', icon: getServiceIcon('Türenmontage'), popular: true },
    { name: 'Fensterbau', category: 'Türen & Fenstermontage', description: 'Massgefertigte Fensterlösungen für Neubau und Renovation.', icon: getServiceIcon('Fensterbau') },
    { name: 'Fenstermontage', category: 'Türen & Fenstermontage', description: 'Einbau und Austausch von Fenstern und Türen.', icon: getServiceIcon('Fenstermontage') },
    { name: 'Schlösser austauschen', category: 'Türen & Fenstermontage', description: 'Erhöhen Sie Ihre Sicherheit durch moderne Schliesssysteme.', icon: getServiceIcon('Schlüsseldienst') },

    { name: 'Einbruchschutz', category: 'Sicherheit & Alarmanlagen', description: 'Sicherheitsberatung und mechanische Absicherung für Ihr Zuhause.', icon: getServiceIcon('Sicherheitssysteme'), popular: true },
    { name: 'Sicherheitssysteme', category: 'Sicherheit & Alarmanlagen', description: 'Ganzheitliche Sicherheitskonzepte für Privat und Gewerbe.', icon: getServiceIcon('Sicherheitssysteme') },
    { name: 'Alarmanlagen', category: 'Sicherheit & Alarmanlagen', description: 'Installation moderner Alarmsysteme mit Fernüberwachung.', icon: getServiceIcon('Notdienst') },
    { name: 'Videoüberwachung', category: 'Sicherheit & Alarmanlagen', description: 'Planung und Montage hochwertiger Kamerasysteme.', icon: getServiceIcon('Videoüberwachung') },
    { name: 'Sanitärinstallation', category: 'Sanitär, Heizungen & Klima', description: 'Verlegung, Anpassung und Wartung von Wasser- und Abwasserleitungen.', icon: getServiceIcon('Sanitärinstallation') },
    { name: 'Heizungsinstallation', category: 'Sanitär, Heizungen & Klima', description: 'Installation und Wartung von modernen Heizungssystemen.', icon: getServiceIcon('Heizungsinstallation') },
    { name: 'Klimaanlagen-Service', category: 'Sanitär, Heizungen & Klima', description: 'Wartung und Service-Arbeiten für Ihre bestehende Klimaanlage.', icon: getServiceIcon('Klimaanlagen-Service') },
    { name: 'Klimaanlagen Installation', category: 'Sanitär, Heizungen & Klima', description: 'Beratung und Montage passender und moderner Klimaanlagen.', icon: getServiceIcon('Klimaanlagen Installation') },
    { name: 'Lüftungsanlagen', category: 'Sanitär, Heizungen & Klima', description: 'Planung und Aufbau zuverlässiger Wohnraumlüftungen.', icon: getServiceIcon('Lüftungsanlagen') },
    { name: 'Badezimmerumbau', category: 'Innen- und Aussenbau & Renovation', description: 'Komplettsanierung und Modernisierung Ihres Badezimmers.', icon: getServiceIcon('Badezimmerumbau') },
    { name: 'Badrenovation', category: 'Innen- und Aussenbau & Renovation', description: 'Erneuerung der sanitären Einrichtungen und Badmöbel.', icon: getServiceIcon('Badrenovation') },
    { name: 'Küchenbau', category: 'Innen- und Aussenbau & Renovation', description: 'Planung und Montage Ihrer neuen Traumküche.', icon: getServiceIcon('Küchenbau') },
    { name: 'Privatumzug', category: 'Umzug & Transport', description: 'Stressfreier Wohnungswechsel mit erfahrenen Zügelprofis.', icon: getServiceIcon('Privatumzug'), popular: true },
    { name: 'Firmenumzug', category: 'Umzug & Transport', description: 'Effiziente und planmässige Verlagerung Ihres Unternehmens.', icon: getServiceIcon('Firmenumzug') },
    { name: 'Spezialumzug', category: 'Umzug & Transport', description: 'Spezialtransport für schwere und empfindliche Objekte.', icon: getServiceIcon('Spezialumzug') },
    { name: 'Möbeltransport', category: 'Umzug & Transport', description: 'Sicherer Transport für einzelne Möbelstücke oder ganze Ladungen.', icon: getServiceIcon('Möbeltransport') },
    { name: 'Transport', category: 'Umzug & Transport', description: 'Allgemeine Transportdienste für Ihre Güter.', icon: getServiceIcon('Transport') },
    { name: 'Räumung', category: 'Umzug & Transport', description: 'Komplette Räumung und Haushaltsauflösungen.', icon: getServiceIcon('Räumung') },
    { name: 'Entsorgung', category: 'Umzug & Transport', description: 'Fachgerechte Entsorgung von Sperrmüll.', icon: getServiceIcon('Entsorgung') },
    { name: 'Einlagerung', category: 'Umzug & Transport', description: 'Sichere Lagerung Ihrer Möbel und Güter.', icon: getServiceIcon('Einlagerung') },
    { name: 'Wohnungsreinigung', category: 'Reinigung & Pflege', description: 'Gründliche Reinigung Ihrer Wohnung für ein sauberes Zuhause zum Wohlfühlen.', icon: getServiceIcon('Wohnungsreinigung'), popular: true },
    { name: 'Umzugsreinigung', category: 'Reinigung & Pflege', description: 'Mit Abnahmegarantie für eine reibungslose Wohnungsübergabe.', icon: getServiceIcon('Umzugsreinigung'), popular: true },
    { name: 'Büroreinigung', category: 'Reinigung & Pflege', description: 'Professionelle Unterhaltsreinigung für Büros und Gewerberäume.', icon: getServiceIcon('Büroreinigung') },
    { name: 'Fensterreinigung', category: 'Reinigung & Pflege', description: 'Streifenfreie Sauberkeit für Fenster und Glasfassaden.', icon: getServiceIcon('Fensterreinigung') },
    { name: 'Gebäudereinigung', category: 'Reinigung & Pflege', description: 'Regelmässige Unterhaltsreinigung für Büro- und Wohngebäude.', icon: getServiceIcon('Gebäudereinigung') },
    { name: 'Teppichreinigung', category: 'Reinigung & Pflege', description: 'Tiefenreinigung für Teppiche und Auslegeware.', icon: getServiceIcon('Teppichreinigung') },
    { name: 'Polsterreinigung', category: 'Reinigung & Pflege', description: 'Fachgerechte Reinigung von Sofas, Sesseln und Polstermöbeln.', icon: getServiceIcon('Polsterreinigung') },
    { name: 'Baureinigung', category: 'Reinigung & Pflege', description: 'Reinigung während und nach der Bauphase.', icon: getServiceIcon('Baureinigung') },
    { name: 'Dachreinigung', category: 'Reinigung & Pflege', description: 'Professionelle Reinigung und Imprägnierung von Dächern.', icon: getServiceIcon('Dachreinigung') },
    { name: 'Hauswartung', category: 'Reinigung & Pflege', description: 'Kompletter Service für Ihre Liegenschaft, von Reinigung bis Unterhalt.', icon: getServiceIcon('Hauswartung') },
    { name: 'Gartenpflege', category: 'Garten & Aussenbereich', description: 'Regelmässige Pflege für ein gepflegtes Erscheinungsbild Ihres Gartens.', icon: getServiceIcon('Gartenpflege'), popular: true },
    { name: 'Gartenbau', category: 'Garten & Aussenbereich', description: 'Neuanlagen, Umgestaltungen und Pflasterarbeiten.', icon: getServiceIcon('Gartenbau') },
    { name: 'Rasen mähen', category: 'Garten & Aussenbereich', description: 'Fachgerechtes Mähen und Trimmen Ihrer Rasenflächen.', icon: getServiceIcon('Gartenpflege') },
    { name: 'Hecken schneiden', category: 'Garten & Aussenbereich', description: 'Präziser Form- und Rückschnitt für Ihre Hecken.', icon: getServiceIcon('Gartenpflege') },
    { name: 'Baum schneiden / fällen', category: 'Garten & Aussenbereich', description: 'Fachgerechter Baumschnitt oder sichere Fällungen.', icon: getServiceIcon('Baumpflege') },
    { name: 'Terrassenbau', category: 'Garten & Aussenbereich', description: 'Planung und Bau Ihrer neuen Wohlfühl-Terrasse.', icon: getServiceIcon('Terrassenbau') },
    { name: 'Winterdienst', category: 'Garten & Aussenbereich', description: 'Zuverlässige Schneeräumung und Glatteisbekämpfung.', icon: getServiceIcon('Winterdienst') },
    { name: 'Rasen verlegen', category: 'Garten & Aussenbereich', description: 'Schnelles Grün durch professionell verlegten Rollrasen.', icon: getServiceIcon('Gartenpflege') },
    { name: 'Bewässerungssysteme', category: 'Garten & Aussenbereich', description: 'Innovative Lösungen für eine optimale Gartenbewässerung.', icon: getServiceIcon('Bewässerungssysteme') },
    { name: 'Zaunbau', category: 'Garten & Aussenbereich', description: 'Errichtung von Zäunen aus Holz, Metall und Kunststoff.', icon: getServiceIcon('Zaunbau') },

    { name: 'Smart Home Installationen', category: 'Smart Home & Technik', description: 'Vernetzung von Beleuchtung, Heizung und Sicherheitssystemen.', icon: getServiceIcon('Smart Home') },
    { name: 'Netzwerk / WLAN Installationen', category: 'Smart Home & Technik', description: 'Optimierung Ihres Heimnetzwerks für schnelles Internet überall.', icon: getServiceIcon('Netzwerk'), popular: true },
    { name: 'Lampen montieren', category: 'Kleine Handwerkerarbeiten', description: 'Fachgerechte Montage von Decken-, Wand- und Aussenleuchten.', icon: getServiceIcon('Lampen'), popular: true },
    { name: 'Möbelmontage', category: 'Kleine Handwerkerarbeiten', description: 'Professioneller Aufbau von Möbeln aller Art (IKEA, etc.).', icon: getServiceIcon('Möbelmontage'), popular: true },
    { name: 'TV-Wandmontage', category: 'Kleine Handwerkerarbeiten', description: 'Sichere Befestigung Ihres Fernsehers inklusive Kabelkanalverlegung.', icon: getServiceIcon('TV') },
    { name: 'Vorhangschienen montieren', category: 'Kleine Handwerkerarbeiten', description: 'Präzise Montage von Vorhangschienen und Stangen.', icon: getServiceIcon('Vorhang') },
    { name: 'Bohrarbeiten', category: 'Kleine Handwerkerarbeiten', description: 'Bohrungen in Beton, Stein oder Fliesen für Regale und Spiegel.', icon: getServiceIcon('Bohren') },
    { name: 'Kleinreparaturen', category: 'Kleine Handwerkerarbeiten', description: 'Kleine Ausbesserungen und Reparaturen im und am Haus.', icon: getServiceIcon('Kleinreparaturen') },
    { name: 'Reparaturservice', category: 'Kleine Handwerkerarbeiten', description: 'Schnelle und fachgerechte Reparaturen rund um Haus und Wohnung.', icon: getServiceIcon('Reparaturen') },
];

const categoryOrder = [
    'Umzug & Transport',
    'Notfall-Services',
    'Innen- und Aussenbau & Renovation',
    'Handwerker',
    'Energie & Nachhaltigkeit',
    'Boden & Plattenleger',
    'Schreiner & Holzbau',
    'Innenausbau',
    'Türen & Fenstermontage',
    'Sicherheit & Alarmanlagen',
    'Sanitär, Heizungen & Klima',
    'Smart Home & Technik',
    'Reinigung & Pflege',
    'Kleine Handwerkerarbeiten',
    'Garten & Aussenbereich',
];

const categoryGradients: Record<string, string> = {
    'Notfall-Services': 'bg-red-50 border-red-100',
    'Innen- und Aussenbau & Renovation': 'bg-orange-50 border-orange-100',
    'Handwerker': 'bg-slate-100 border-slate-200',
    'Energie & Nachhaltigkeit': 'bg-emerald-50 border-emerald-100',
    'Boden & Plattenleger': 'bg-amber-50 border-amber-100',
    'Schreiner & Holzbau': 'bg-yellow-50 border-yellow-100',
    'Innenausbau': 'bg-orange-50 border-orange-100',
    'Türen & Fenstermontage': 'bg-slate-100 border-slate-200',
    'Sicherheit & Alarmanlagen': 'bg-zinc-100 border-zinc-200',
    'Sanitär, Heizungen & Klima': 'bg-yellow-50 border-yellow-100',
    'Smart Home & Technik': 'bg-blue-50 border-blue-100',
    'Umzug & Transport': 'bg-blue-50 border-blue-100',
    'Reinigung & Pflege': 'bg-cyan-50 border-cyan-100',
    'Kleine Handwerkerarbeiten': 'bg-sky-50 border-sky-100',
    'Garten & Aussenbereich': 'bg-green-50 border-green-100',
};

const categoryIcons: Record<string, string> = {
    'Notfall-Services': '🆘',
    'Innen- und Aussenbau & Renovation': '🏗️',
    'Handwerker': '🛠️',
    'Energie & Nachhaltigkeit': '⚡',
    'Boden & Plattenleger': '🧱',
    'Schreiner & Holzbau': '🪵',
    'Innenausbau': '🏠',
    'Türen & Fenstermontage': '🚪',
    'Sicherheit & Alarmanlagen': '🛡️',
    'Sanitär, Heizungen & Klima': '🛁',
    'Smart Home & Technik': '📱',
    'Umzug & Transport': '🚚',
    'Reinigung & Pflege': '🧹',
    'Kleine Handwerkerarbeiten': '🔨',
    'Garten & Aussenbereich': '🌿',
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
        { value: '500+', label: 'Dienstleistungen', icon: '🛠️' },
        { value: '15', label: 'Kategorien', icon: '🧱' },
        { value: '1000+', label: 'Geprüfte Partner', icon: '✅' },
        { value: '24/7', label: 'Support', icon: '💡' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* All Services Section - Modern Layout */}
            <div id="services-results" className="bg-slate-50 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-4 sm:pt-6 lg:pt-10 pb-32 sm:pb-40 relative overflow-visible">
                    {/* New Premium Hero Section */}
                    <div className="relative mb-12 sm:mb-20 overflow-visible">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-100/50 rounded-full blur-3xl opacity-60 animate-pulse" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl opacity-50" />

                        <div className="relative text-center max-w-4xl mx-auto px-4 z-10">

                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                                Finden Sie den <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">passenden</span> Service
                            </h1>

                            <p className="text-slate-600 text-lg sm:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                                Entdecken Sie unser breites Angebot an professionellen Dienstleistungen – von Renovierung bis Reinigung.
                            </p>

                        </div>
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
                                <span className="text-xl">🌐</span>
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
                                        <span className={`text-xl ${isActive ? 'text-white' : ''}`}>{categoryIcons[category]}</span>
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
                                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shadow-sm">
                                                <span className="text-lg">{categoryIcons[category]}</span>
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{category}</h3>
                                        </div>

                                        {/* ===== MOBILE: Kompakte Liste ===== */}
                                        <div className="sm:hidden space-y-2">
                                            {categoryServices.map((service, index) => {
                                                const gradient = categoryGradients[category] || 'bg-emerald-50 border-emerald-100';

                                                return (
                                                    <button
                                                        key={service.name}
                                                        onClick={() => openQuoteModal({ projectTitle: service.name, service: service.name })}
                                                        className="group w-full bg-white rounded-xl p-3 border border-slate-100 active:border-green-300 active:bg-green-50/50 transition-all text-left flex items-center gap-3"
                                                    >
                                                        {/* Icon Box */}
                                                        <div className={`w-10 h-10 rounded-lg ${gradient} border flex items-center justify-center flex-shrink-0 shadow-sm text-xl`}>
                                                            {service.icon}
                                                        </div>

                                                        {/* Text */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-bold text-slate-900 text-[13px] leading-tight truncate">
                                                                    {service.name}
                                                                </h3>
                                                                {service.popular && (
                                                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold rounded-full flex-shrink-0">
                                                                        🔥 Beliebt
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
                                                const gradient = categoryGradients[category] || 'bg-emerald-50 border-emerald-100';

                                                return (
                                                    <button
                                                        key={service.name}
                                                        onClick={() => openQuoteModal({ projectTitle: service.name, service: service.name })}
                                                        className="group bg-white rounded-2xl p-4 border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100 transition-all text-left"
                                                    >
                                                        <div className={`w-12 h-12 rounded-xl ${gradient} border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm text-2xl`}>
                                                            {service.icon}
                                                        </div>
                                                        <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                                                            {service.name}
                                                        </h3>
                                                        <p className="text-xs text-slate-400">{service.category}</p>
                                                        {service.popular && (
                                                            <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">
                                                                🔥 Beliebt
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


// No Results Component - Matching Homepage Style
interface NoResultsProps {
    searchQuery: string;
    onReset: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ searchQuery, onReset }) => {
    return (
        <div className="text-center py-10 sm:py-16 px-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-md">
            <div className="inline-flex justify-center items-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-slate-100 mb-4 sm:mb-6 text-3xl sm:text-5xl">
                🔍
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
