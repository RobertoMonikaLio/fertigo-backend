



import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRightIcon,
    CheckCircleIcon,
    BellIcon,
    ArrowTrendingUpIcon,
    StarIcon,
    Squares2X2Icon,
    PencilSquareIcon,
    AdjustmentsHorizontalIcon,
    ChatBubbleLeftRightIcon,
    UsersIcon,
    UserIcon,
    ShieldCheckIcon,
    BriefcaseIcon,
    BanknotesIcon,
    RocketLaunchIcon,
    MapPinIcon,
    ClockIcon,
    ColoredPaintRollerIcon,
    ColoredTruckIcon,
    ColoredSparklesIcon,
    ColoredLeafIcon,
    TestsiegerIcon,
    MagnifyingGlassIcon,
    ClipboardDocumentListIcon,
    PencilIcon,
    EyeIcon,
    HandshakeIcon
} from '../components/icons';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from './AppContext';
import ForProvidersSection from '../components/ForProvidersSection';
import ROICalculator from '../components/ROICalculator';
import LazyLoad from '../components/LazyLoad';

const translations = {
    de: {
        heroBadge: "PARTNER PORTAL",
        heroTitle: "Die besten Aufträge.",
        heroTitleHighlight: "Direkt auf Ihr Smartphone.",
        heroSubtitle: "Schliessen Sie sich dem grössten Handwerker-Netzwerk der Schweiz an. Erhalten Sie täglich geprüfte Anfragen aus Ihrer Region und füllen Sie Ihre Auftragsbücher.",
        heroCta: "Kostenlos registrieren",
        heroSecondary: "Preise & Konditionen",
        howItWorksTitle: "So einfach geht's",
        howItWorksSubtitle: "Unser Prozess ist darauf ausgelegt, Ihnen schnell und unkompliziert neue Aufträge zu vermitteln.",
        howItWorksStep1: "1. LEAD PRÜFEN & KAUFEN",
        howItWorksStep1Desc: "Prüfen Sie die Details und kaufen Sie den Lead, um die Kontaktdaten zu erhalten.",
        howItWorksStep2: "2. ANGEBOT ERSTELLEN",
        howItWorksStep2Desc: "Kontaktieren Sie den Kunden direkt und unterbreiten Sie ein konkurrenzfähiges Angebot.",
        howItWorksStep3: "3. AUFTRAG GEWINNEN",
        howItWorksStep3Desc: "Überzeugen Sie mit Ihrer Expertise und Ihrem Angebot, um den Auftrag zu gewinnen.",
        toolsTitle: "Ihre Werkzeuge zum Erfolg",
        toolsSubtitle: "Unser intuitives Partner-Dashboard ist Ihre Kommandozentrale. Hier verwalten Sie Anfragen, verfolgen Ihren Erfolg und gewinnen neue Aufträge – alles an einem Ort.",
        feature1Title: "Live-Marktplatz",
        feature1Desc: "Sehen Sie alle neuen Anfragen in Echtzeit und filtern Sie nach Region und Branche.",
        feature2Title: "Detaillierte Lead-Infos",
        feature2Desc: "Erhalten Sie alle wichtigen Projekt-Details, bevor Sie einen Lead kaufen.",
        feature3Title: "Einfaches Status-Management",
        feature3Desc: "Verfolgen Sie den Status jeder Anfrage – von 'Neu' über 'Angebot gesendet' bis 'Gewonnen'.",
        feature4Title: "Direkter Kundenkontakt",
        feature4Desc: "Nach dem Kauf erhalten Sie die Kontaktdaten, um Details zu besprechen.",
        onboardingTitle: "So werden Sie Partner in 3 Schritten",
        onboardingSubtitle: "Unser Anmeldeprozess ist einfach, transparent und darauf ausgelegt, Sie schnell startklar zu machen.",
        onboardingStep1: "1. Registrieren & Profilieren",
        onboardingStep1Desc: "Füllen Sie unser kurzes Registrierungsformular aus und vervollständigen Sie Ihr Firmenprofil.",
        onboardingStep2: "2. Verifizierung & Freischaltung",
        onboardingStep2Desc: "Unser Team prüft Ihre Angaben und schaltet Ihr Konto in der Regel innert 24 Stunden frei.",
        onboardingStep3: "3. Aufträge erhalten",
        onboardingStep3Desc: "Sobald Ihr Profil aktiv ist, erhalten Sie sofort Zugriff auf passende Kundenanfragen.",
    },
    fr: {
        heroBadge: "PORTAIL PARTENAIRE",
        heroTitle: "Les meilleures commandes.",
        heroTitleHighlight: "Directement sur votre smartphone.",
        heroSubtitle: "Rejoignez le plus grand réseau d'artisans de Suisse. Recevez chaque jour des demandes vérifiées de votre région.",
        heroCta: "S'inscrire gratuitement",
        heroSecondary: "Prix & Conditions",
        howItWorksTitle: "C'est aussi simple que ça",
        howItWorksSubtitle: "Notre processus est conçu pour vous fournir de nouvelles commandes rapidement et sans complication.",
        howItWorksStep1: "1. VÉRIFIER & ACHETER LE LEAD",
        howItWorksStep1Desc: "Vérifiez les détails et achetez le lead pour obtenir les coordonnées.",
        howItWorksStep2: "2. CRÉER UNE OFFRE",
        howItWorksStep2Desc: "Contactez directement le client et soumettez une offre compétitive.",
        howItWorksStep3: "3. GAGNER LE CONTRAT",
        howItWorksStep3Desc: "Convainquez avec votre expertise et votre offre pour remporter le contrat.",
        toolsTitle: "Vos outils pour le succès",
        toolsSubtitle: "Notre tableau de bord partenaire intuitif est votre centre de commande. Gérez les demandes, suivez votre succès et remportez de nouveaux contrats - le tout en un seul endroit.",
        feature1Title: "Place de marché en direct",
        feature1Desc: "Consultez toutes les nouvelles demandes en temps réel et filtrez par région et par secteur.",
        feature2Title: "Informations détaillées sur le lead",
        feature2Desc: "Obtenez tous les détails importants du projet avant d'acheter un lead.",
        feature3Title: "Gestion simple du statut",
        feature3Desc: "Suivez le statut de chaque demande - de 'Nouveau' à 'Offre envoyée' à 'Gagné'.",
        feature4Title: "Contact direct avec le client",
        feature4Desc: "Après l'achat, vous recevrez les coordonnées pour discuter des détails.",
        onboardingTitle: "Devenez partenaire en 3 étapes",
        onboardingSubtitle: "Notre processus d'inscription est simple, transparent et conçu pour vous rendre opérationnel rapidement.",
        onboardingStep1: "1. S'inscrire & Profiler",
        onboardingStep1Desc: "Remplissez notre court formulaire d'inscription et complétez le profil de votre entreprise.",
        onboardingStep2: "2. Vérification & Activation",
        onboardingStep2Desc: "Notre équipe vérifie vos informations et active généralement votre compte dans les 24 heures.",
        onboardingStep3: "3. Recevoir des commandes",
        onboardingStep3Desc: "Une fois votre profil actif, vous aurez un accès immédiat aux demandes de clients correspondantes.",
    },
    it: {
        heroBadge: "PORTALE PARTNER",
        heroTitle: "I migliori ordini.",
        heroTitleHighlight: "Direttamente sul tuo smartphone.",
        heroSubtitle: "Unisciti alla più grande rete di artigiani in Svizzera. Ricevi richieste verificate dalla tua regione ogni giorno.",
        heroCta: "Registrati gratis",
        heroSecondary: "Prezzi & Condizioni",
        howItWorksTitle: "È così semplice",
        howItWorksSubtitle: "Il nostro processo è progettato per fornirti nuovi ordini in modo rapido e semplice.",
        howItWorksStep1: "1. VERIFICA E ACQUISTA IL LEAD",
        howItWorksStep1Desc: "Controlla i dettagli e acquista il lead per ottenere i dati di contatto.",
        howItWorksStep2: "2. CREA UN'OFFERTA",
        howItWorksStep2Desc: "Contatta direttamente il cliente e presenta un'offerta competitiva.",
        howItWorksStep3: "3. VINCI L'APPALTO",
        howItWorksStep3Desc: "Convinci con la tua esperienza e la tua offerta per vincere l'appalto.",
        toolsTitle: "I tuoi strumenti per il successo",
        toolsSubtitle: "La nostra intuitiva dashboard per i partner è il tuo centro di comando. Gestisci le richieste, monitora il tuo successo e vinci nuovi contratti, tutto in un unico posto.",
        feature1Title: "Mercato in tempo reale",
        feature1Desc: "Visualizza tutte le nuove richieste in tempo reale e filtra per regione e settore.",
        feature2Title: "Informazioni dettagliate sui lead",
        feature2Desc: "Ottieni tutti i dettagli importanti del progetto prima di acquistare un lead.",
        feature3Title: "Gestione semplice dello stato",
        feature3Desc: "Tieni traccia dello stato di ogni richiesta - da 'Nuovo' a 'Offerta inviata' a 'Vinto'.",
        feature4Title: "Contatto diretto con il cliente",
        feature4Desc: "Dopo l'acquisto, riceverai i dati di contatto per discutere i dettagli.",
        onboardingTitle: "Diventa partner in 3 passaggi",
        onboardingSubtitle: "Il nostro processo di registrazione è semplice, trasparente e progettato per renderti operativo rapidamente.",
        onboardingStep1: "1. Registrati e profila",
        onboardingStep1Desc: "Compila il nostro breve modulo di registrazione e completa il profilo della tua azienda.",
        onboardingStep2: "2. Verifica e attivazione",
        onboardingStep2Desc: "Il nostro team esamina le tue informazioni e di solito attiva il tuo account entro 24 ore.",
        onboardingStep3: "3. Ricevi ordini",
        onboardingStep3Desc: "Once your profile is active, you'll get immediate access to matching customer inquiries.",
    },
    en: {
        heroBadge: "PARTNER PORTAL",
        heroTitle: "The best jobs.",
        heroTitleHighlight: "Directly to your smartphone.",
        heroSubtitle: "Join Switzerland's largest network of craftsmen. Receive verified inquiries from your region daily.",
        heroCta: "Register for free",
        heroSecondary: "Pricing & Conditions",
        howItWorksTitle: "It's That Simple",
        howItWorksSubtitle: "Our process is designed to get you new orders quickly and easily.",
        howItWorksStep1: "1. CHECK & BUY LEAD",
        howItWorksStep1Desc: "Check the details and buy the lead to get the contact information.",
        howItWorksStep2: "2. CREATE AN OFFER",
        howItWorksStep2Desc: "Contact the customer directly and submit a competitive offer.",
        howItWorksStep3: "3. WIN THE JOB",
        howItWorksStep3Desc: "Convince with your expertise and your offer to win the job.",
        toolsTitle: "Your Tools for Success",
        toolsSubtitle: "Our intuitive partner dashboard is your command center. Manage inquiries, track your success, and win new jobs - all in one place.",
        feature1Title: "Live Marketplace",
        feature1Desc: "See all new inquiries in real-time and filter by region and industry.",
        feature2Title: "Detailed Lead Info",
        feature2Desc: "Get all important project details before you buy a lead.",
        feature3Title: "Easy Status Management",
        feature3Desc: "Track the status of every inquiry - from 'New' to 'Offer Sent' to 'Won'.",
        feature4Title: "Direct Customer Contact",
        feature4Desc: "After purchase, you'll receive contact details to discuss specifics.",
        onboardingTitle: "Become a Partner in 3 Steps",
        onboardingSubtitle: "Our registration process is simple, transparent, and designed to get you started quickly.",
        onboardingStep1: "1. Register & Profile",
        onboardingStep1Desc: "Fill out our short registration form and complete your company profile.",
        onboardingStep2: "2. Verification & Activation",
        onboardingStep2Desc: "Our team reviews your information and typically activates your account within 24 hours.",
        onboardingStep3: "3. Receive Jobs",
        onboardingStep3Desc: "Once your profile is active, you'll get immediate access to matching customer inquiries.",
    }
};

export const providersData = [
    {
        id: '1',
        name: 'Maler Müller AG',
        coverImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
        logo: 'https://ui-avatars.com/api/?name=Maler+Müller&background=random',
        tagline: 'Ihr Experte für Farbe und Raum',
        rating: 4.8,
        reviewCount: 124,
        location: 'Zürich',
        services: ['Malerarbeiten', 'Tapezieren', 'Fassaden'],
        gallery: [
            'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14',
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
            'https://images.unsplash.com/photo-1595846519845-68e298c2edd8'
        ],
        reviews: [
            { author: 'Hans Muster', rating: 5, text: 'Super Arbeit, sehr sauber und pünktlich.' },
            { author: 'Verena S.', rating: 4, text: 'Gute Beratung, gerne wieder.' }
        ],
        about: 'Wir sind ein Traditionsunternehmen in Zürich mit über 20 Jahren Erfahrung.',
        contact: {
            phone: '044 123 45 67',
            email: 'info@maler-mueller.ch',
            website: 'www.maler-mueller.ch',
            address: 'Musterstrasse 1, 8000 Zürich'
        },
        details: {
            founded: '2001',
            employees: '15',
            uid: 'CHE-123.456.789'
        }
    },
    {
        id: '2',
        name: 'Gartenbau Grün',
        coverImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f01',
        logo: 'https://ui-avatars.com/api/?name=Gartenbau+Grün&background=random',
        tagline: 'Wir bringen Natur in Ihren Garten',
        rating: 4.9,
        reviewCount: 85,
        location: 'Bern',
        services: ['Gartenpflege', 'Gartenbau'],
        gallery: [
            'https://images.unsplash.com/photo-1558904541-efa843a96f01',
            'https://images.unsplash.com/photo-1598902168093-192747da933e'
        ],
        reviews: [
            { author: 'Peter K.', rating: 5, text: 'Unser Garten sieht wieder fantastisch aus.' }
        ],
        about: 'Ihr Partner für Gartenbau und Pflege in der Region Bern.',
        contact: {
            phone: '031 987 65 43',
            email: 'kontakt@garten-gruen.ch',
            website: 'www.garten-gruen.ch',
            address: 'Gartenweg 5, 3000 Bern'
        },
        details: {
            founded: '2010',
            employees: '8',
            uid: 'CHE-987.654.321'
        }
    },
    {
        id: '3',
        name: 'Umzug Plus',
        coverImage: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b',
        logo: 'https://ui-avatars.com/api/?name=Umzug+Plus&background=random',
        tagline: 'Stressfrei umziehen',
        rating: 4.7,
        reviewCount: 210,
        location: 'Basel',
        services: ['Umzug', 'Reinigung', 'Lagerung'],
        gallery: [
            'https://images.unsplash.com/photo-1600518464441-9154a4dea21b'
        ],
        reviews: [
            { author: 'Sarah L.', rating: 5, text: 'Alles heil angekommen, super Team.' }
        ],
        about: 'Professionelle Umzüge in der ganzen Schweiz.',
        contact: {
            phone: '061 555 11 22',
            email: 'info@umzug-plus.ch',
            website: 'www.umzug-plus.ch',
            address: 'Logistikstrasse 10, 4000 Basel'
        },
        details: {
            founded: '2015',
            employees: '25',
            uid: 'CHE-111.222.333'
        }
    }
];

const OnboardingStep2Icon = () => ( <svg viewBox="0 0 140 100" className="w-auto h-20 text-primary-800"><g fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="20" y="15" width="100" height="70" rx="8" fill="#dcfce7"/><circle cx="50" cy="40" r="12" fill="#fff"/><path d="M35 70 a15 15 0 0 1 30 0" fill="#fff"/><path d="M75 35 h35 M75 55 h25" /></g></svg> );
const OnboardingStep3Icon = () => ( <svg viewBox="0 0 140 100" className="w-auto h-20 text-primary-800"><g fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M70 15 L110 35 L70 95 L30 35 Z" fill="#dcfce7"/><path d="M55 50 l10 10 l20 -20" stroke="#22c55e" strokeWidth="5"/></g></svg> );
const OnboardingStep4Icon = () => ( <svg viewBox="0 0 140 100" className="w-auto h-20 text-primary-800"><g fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M40 80 L70 20 L100 80 Z" fill="#dcfce7"/><path d="M55 70 h30" /><path d="M70 20 L60 10" /><path d="M70 20 L80 10" /><path d="M50 90 a20 20 0 0 1 40 0" strokeDasharray="5 5"/></g></svg> );

// --- MOCK LIVE FEED DATA ---
const feedItems = [
    { title: "Wohnungsreinigung 4.5 Zi.", location: "8004 Zürich", budget: "CHF 890", time: "gerade eben", icon: <ColoredSparklesIcon className="w-6 h-6" /> },
    { title: "Malerarbeiten Innen", location: "3000 Bern", budget: "CHF 2'400", time: "vor 5 Min", icon: <ColoredPaintRollerIcon className="w-6 h-6" /> },
    { title: "Umzug & Transport", location: "8400 Winterthur", budget: "CHF 1'800", time: "vor 12 Min", icon: <ColoredTruckIcon className="w-6 h-6" /> },
    { title: "Gartenpflege / Schnitt", location: "6000 Luzern", budget: "CHF 1'500", time: "vor 18 Min", icon: <ColoredLeafIcon className="w-6 h-6" /> },
    { title: "Parkett verlegen", location: "4000 Basel", budget: "CHF 4'200", time: "vor 26 Min", icon: <BriefcaseIcon className="w-6 h-6 text-primary-600" /> },
];

const DashboardIllustration: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#bbf7d0', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#16a34a', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        {/* Main Frame */}
        <rect x="2" y="2" width="196" height="116" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        
        {/* Header */}
        <path d="M 2 10 a 8 8 0 0 1 8 -8 H 190 a 8 8 0 0 1 8 8 V 20 H 2 Z" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="15" cy="11" r="3" fill="#ef4444" />
        <circle cx="25" cy="11" r="3" fill="#f59e0b" />
        <circle cx="35" cy="11" r="3" fill="#22c55e" />

        {/* Sidebar */}
        <rect x="10" y="30" width="40" height="80" rx="4" fill="#f1f5f9" />
        <rect x="18" y="38" width="24" height="6" rx="2" fill="#cbd5e1" />
        <rect x="18" y="50" width="18" height="4" rx="2" fill="#e2e8f0" />
        <rect x="18" y="60" width="18" height="4" rx="2" fill="#e2e8f0" />
        <rect x="18" y="70" width="18" height="4" rx="2" fill="#e2e8f0" />
        <rect x="18" y="90" width="24" height="12" rx="3" fill="#dcfce7" />

        {/* Main Content Area */}
        {/* Card 1 */}
        <rect x="60" y="30" width="60" height="40" rx="4" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
        <rect x="68" y="38" width="44" height="5" rx="2" fill="#e2e8f0" />
        <path d="M 70 60 l 10 -10 l 10 12 l 10 -8 l 10 5" stroke="url(#grad1)" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Card 2 */}
        <rect x="130" y="30" width="60" height="40" rx="4" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="160" cy="50" r="12" stroke="#e2e8f0" strokeWidth="2" fill="none" />
        <path d="M 160 38 A 12 12 0 0 1 170.39 44" stroke="url(#grad1)" strokeWidth="3" fill="none" />

        {/* List */}
        <rect x="60" y="80" width="130" height="30" rx="4" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
        <rect x="68" y="87" width="20" height="5" rx="2" fill="#e2e8f0" />
        <rect x="100" y="87" width="80" height="5" rx="2" fill="#f1f5f9" />
        <rect x="68" y="98" width="20" height="5" rx="2" fill="#e2e8f0" />
        <rect x="100" y="98" width="60" height="5" rx="2" fill="#f1f5f9" />
    </svg>
);

const FeedCard: React.FC<{ item: typeof feedItems[0] }> = ({ item }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-4 rounded-xl flex items-center gap-4 shadow-lg">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
            {item.icon}
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="font-bold text-white text-sm truncate">{item.title}</h4>
            <div className="flex items-center text-xs text-slate-400 gap-2 mt-1">
                <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3"/> {item.location}</span>
            </div>
        </div>
        <div className="text-right">
            <span className="block text-sm font-bold text-primary-400">{item.budget}</span>
            <span className="text-[10px] text-slate-500">{item.time}</span>
        </div>
    </div>
);

const mobileHowItWorksIcons = [
    <MagnifyingGlassIcon className="w-7 h-7 text-primary-700" />,
    <ClipboardDocumentListIcon className="w-7 h-7 text-primary-700" />,
    <TestsiegerIcon className="w-7 h-7 text-primary-700" />
];

const ProvidersPage: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;

    const stats = [
        { label: "Aktive Anfragen", value: "2'000+", icon: <BellIcon className="w-8 h-8 text-primary-600" /> },
        { label: "Vermitteltes Volumen", value: "CHF 10M+", icon: <BanknotesIcon className="w-8 h-8 text-primary-600" /> },
        { label: "Partnerfirmen", value: "1'500+", icon: <UsersIcon className="w-8 h-8 text-primary-600" /> },
        { label: "Erfolgsquote", value: "45%", icon: <ArrowTrendingUpIcon className="w-8 h-8 text-primary-600" /> }
    ];

    const howItWorksSteps = [
        { icon: <MagnifyingGlassIcon className="w-8 h-8 text-primary-700" />, title: t.howItWorksStep1, description: t.howItWorksStep1Desc },
        { icon: <PencilSquareIcon className="w-8 h-8 text-primary-700" />, title: t.howItWorksStep2, description: t.howItWorksStep2Desc },
        { icon: <TestsiegerIcon className="w-8 h-8 text-primary-700" />, title: t.howItWorksStep3, description: t.howItWorksStep3Desc },
    ];

    const dashboardFeatures = [
        { icon: <Squares2X2Icon className="w-8 h-8 text-primary-700"/>, title: t.feature1Title, description: t.feature1Desc },
        { icon: <PencilSquareIcon className="w-8 h-8 text-primary-700"/>, title: t.feature2Title, description: t.feature2Desc },
        { icon: <AdjustmentsHorizontalIcon className="w-8 h-8 text-primary-700"/>, title: t.feature3Title, description: t.feature3Desc },
        { icon: <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary-700"/>, title: t.feature4Title, description: t.feature4Desc },
    ];

    const onboardingSteps = [
        { icon: <OnboardingStep2Icon />, title: t.onboardingStep1, description: t.onboardingStep1Desc },
        { icon: <OnboardingStep3Icon />, title: t.onboardingStep2, description: t.onboardingStep2Desc },
        { icon: <OnboardingStep4Icon />, title: t.onboardingStep3, description: t.onboardingStep3Desc },
    ];
    
    return (
        <div className="bg-white">
            {/* DARK HERO */}
            <section className="relative overflow-hidden bg-primary-950 pt-40 pb-20 lg:pt-40 lg:pb-32">
                
                {/* Background Decor */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-primary-800/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-900/20 rounded-full blur-[80px]"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
                </div>

                {/* Mobile Hero Background with Live Feed */}
                <div className="lg:hidden absolute inset-0">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="animate-scroll-up space-y-4 p-4">
                            {/* Quadrupled for seamless loop */}
                            {[...feedItems, ...feedItems, ...feedItems, ...feedItems].map((item, idx) => (
                                <FeedCard key={idx} item={item} />
                            ))}
                        </div>
                    </div>
                    {/* Darker overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
                </div>


                <div className="max-w-6xl mx-auto px-6 relative z-10 lg:z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        
                        {/* Left Column: Text & Value Prop */}
                        <div className="relative z-20 text-center lg:text-left animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm text-primary-300 text-xs font-bold uppercase tracking-wider mb-8">
                                <BriefcaseIcon className="w-4 h-4" />
                                {t.heroBadge}
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.15]">
                                {t.heroTitle} <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-green-300">
                                    {t.heroTitleHighlight}
                                </span>
                            </h1>
                            
                            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                                {t.heroSubtitle}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-900/50 hover:-translate-y-1 ring-1 ring-white/20">
                                    {t.heroCta}
                                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                                </Link>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-sm text-slate-400 font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-3">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">
                                                <UserIcon className="w-4 h-4 text-slate-400"/>
                                            </div>
                                        ))}
                                        <div className="w-9 h-9 rounded-full bg-primary-600 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">+2k</div>
                                    </div>
                                    <span>Partner dabei</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full"></div>
                                <div className="flex items-center gap-2">
                                    <CheckCircleIcon className="w-5 h-5 text-green-500"/>
                                    <span>Täglich neue Leads</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Live Feed Visual (DESKTOP ONLY) */}
                        <div className="hidden lg:flex relative animate-fade-in [animation-delay:200ms] lg:h-[600px] items-center">
                            <div className="absolute -inset-4 bg-gradient-to-b from-primary-500/20 to-transparent rounded-[3rem] blur-3xl"></div>
                            
                            <div className="relative w-full max-w-md mx-auto">
                                {/* Phone/App Container */}
                                <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden relative min-h-[500px]">
                                    {/* Mock Header */}
                                    <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Feed</div>
                                    </div>
                                    
                                    {/* Feed Content with Animation */}
                                    <div className="p-4 relative h-[450px] overflow-hidden">
                                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-900 to-transparent z-10"></div>
                                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 to-transparent z-10 flex flex-col justify-end items-center pb-6">
                                            <Link to="/register" className="bg-primary-600 text-white text-sm font-bold py-2 px-6 rounded-full shadow-lg hover:bg-primary-500 transition-colors">
                                                Jetzt Zugriff sichern
                                            </Link>
                                        </div>
                                        
                                        <div className="animate-scroll-up space-y-4">
                                            {/* Doubled list for seamless loop */}
                                            {[...feedItems, ...feedItems, ...feedItems].map((item, idx) => (
                                                <FeedCard key={idx} item={item} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Decorative Floating Elements */}
                                <div className="absolute -right-8 top-1/4 bg-white p-3 rounded-xl shadow-xl animate-float hidden sm:block">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-bold text-slate-900">Live Aktivität</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <section className="bg-white py-12 border-b border-slate-100">
                <div className="container mx-auto px-6">
                    {/* Desktop View */}
                    <div className="hidden lg:grid grid-cols-4 gap-8 text-center">
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <p className="text-4xl font-black text-primary-600 mb-2 tracking-tight">{stat.value}</p>
                                <p className="text-slate-500 font-bold text-sm uppercase tracking-wide">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                     {/* OPTIMIZED Mobile View - 2x2 Grid */}
                    <div className="lg:hidden grid grid-cols-2 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm text-center">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-6 h-6 text-primary-600' })}
                                </div>
                                <p className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section id="how-it-works" className="py-20 sm:py-28 bg-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid-pattern)" />
                    </svg>
                    <svg className="absolute -top-20 -right-20 w-[500px] h-[500px] text-primary-100 opacity-50" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"/>
                        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"/>
                    </svg>
                    <svg className="absolute -bottom-10 -left-10 w-[400px] h-[400px] text-green-100 opacity-50" viewBox="0 0 200 200">
                        <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        <polygon points="100,30 170,70 170,130 100,170 30,130 30,70" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3"/>
                    </svg>
                </div>

                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center mx-auto mb-16">
                        <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                            Ihr Weg zum Erfolg
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                           {t.howItWorksTitle}
                        </h2>
                         <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                           {t.howItWorksSubtitle}
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-400 to-green-400"></div>
                        
                        <div className="space-y-8 lg:space-y-0">
                            {howItWorksSteps.map((step, index) => (
                                <div key={step.title} className="relative">
                                    <div className="lg:hidden">
                                        <div className="flex items-start gap-4">
                                            <div className="relative flex flex-col items-center">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-green-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-500/30">
                                                    {index + 1}
                                                </div>
                                                {index < howItWorksSteps.length - 1 && (
                                                    <div className="flex flex-col items-center mt-4">
                                                        <div className="w-0.5 h-6 bg-gradient-to-b from-primary-400 to-primary-300"></div>
                                                        <svg className="w-6 h-6 text-primary-500 my-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                        </svg>
                                                        <div className="w-0.5 h-6 bg-gradient-to-b from-primary-300 to-primary-400"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 pb-8">
                                                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-5 border border-slate-200 shadow-md">
                                                    <div className="w-12 h-12 rounded-xl bg-white border border-primary-100 flex items-center justify-center mb-4 shadow-sm">
                                                        {React.cloneElement(step.icon as React.ReactElement, { className: 'w-6 h-6 text-primary-600' })}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title.replace(/^\d+\.\s*/, '')}</h3>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`hidden lg:grid grid-cols-[1fr_auto_1fr] gap-8 items-center ${index > 0 ? 'mt-[-2rem]' : ''}`}>
                                        <div className={`${index % 2 === 0 ? 'order-1' : 'order-3'}`}>
                                            <div className={`group bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl hover:border-primary-300 transition-all duration-300 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-50 to-green-50 border border-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                        {React.cloneElement(step.icon as React.ReactElement, { className: 'w-7 h-7 text-primary-600' })}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-slate-900">{step.title.replace(/^\d+\.\s*/, '')}</h3>
                                                </div>
                                                <p className="text-slate-600 leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>

                                        <div className="order-2 relative flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-full bg-white border-4 border-primary-400 flex items-center justify-center text-primary-600 font-black text-2xl shadow-xl shadow-primary-200/50 z-10 relative">
                                                {index + 1}
                                            </div>
                                            {index < howItWorksSteps.length - 1 && (
                                                <div className="flex flex-col items-center mt-4">
                                                    <div className="w-0.5 h-12 bg-gradient-to-b from-primary-400 to-primary-300"></div>
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-green-100 flex items-center justify-center my-2 shadow-md">
                                                        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                        </svg>
                                                    </div>
                                                    <div className="w-0.5 h-12 bg-gradient-to-b from-primary-300 to-primary-400"></div>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`${index % 2 === 0 ? 'order-3' : 'order-1'}`}>
                                            <div className={`flex items-center ${index % 2 === 0 ? 'justify-start ml-8' : 'justify-end mr-8'}`}>
                                                <svg className="w-32 h-32 text-primary-100" viewBox="0 0 100 100">
                                                    {index === 0 && (
                                                        <>
                                                            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
                                                            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
                                                            <line x1="50" y1="35" x2="50" y2="15" stroke="currentColor" strokeWidth="2"/>
                                                            <line x1="65" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="2"/>
                                                            <circle cx="50" cy="50" r="5" fill="currentColor"/>
                                                        </>
                                                    )}
                                                    {index === 1 && (
                                                        <>
                                                            <rect x="20" y="20" width="60" height="60" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                                                            <line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="2"/>
                                                            <line x1="30" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="2"/>
                                                            <line x1="30" y1="65" x2="50" y2="65" stroke="currentColor" strokeWidth="2"/>
                                                            <path d="M 65 55 L 75 65 L 90 45" fill="none" stroke="currentColor" strokeWidth="3"/>
                                                        </>
                                                    )}
                                                    {index === 2 && (
                                                        <>
                                                            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
                                                            <path d="M 35 50 L 45 60 L 70 35" fill="none" stroke="currentColor" strokeWidth="4"/>
                                                            <circle cx="50" cy="15" r="3" fill="currentColor"/>
                                                            <circle cx="85" cy="50" r="3" fill="currentColor"/>
                                                            <circle cx="50" cy="85" r="3" fill="currentColor"/>
                                                            <circle cx="15" cy="50" r="3" fill="currentColor"/>
                                                        </>
                                                    )}
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-primary-600 to-green-600 rounded-xl hover:from-primary-700 hover:to-green-700 transition-all shadow-lg shadow-primary-500/30 hover:-translate-y-1">
                            Jetzt kostenlos starten
                            <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>
            
            <section className="py-20 md:py-24 lg:py-32 bg-slate-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">{t.toolsTitle}</h2>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                            {t.toolsSubtitle}
                        </p>
                        {/* NEW MOBILE VIEW with Illustration */}
                        <div className="md:hidden mt-10 space-y-10">
                            <div className="px-4">
                                <DashboardIllustration className="w-full h-auto" />
                            </div>
                            <div className="space-y-8">
                                {dashboardFeatures.map((feature) => (
                                    <div key={feature.title} className="flex items-start gap-5">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shadow-sm">
                                            {React.cloneElement(feature.icon as React.ReactElement, { className: 'w-6 h-6 text-primary-700' })}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">{feature.title}</h3>
                                            <p className="text-slate-600 mt-1 text-sm leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DESKTOP: Grid */}
                        <div className="hidden md:grid mt-10 grid-cols-1 sm:grid-cols-2 gap-6">
                            {dashboardFeatures.map((feature) => (
                                <div key={feature.title} className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-md">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">{feature.title}</h3>
                                    <p className="text-slate-600 mt-1 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="hidden lg:block">
                <LazyLoad fallback={<div></div>}>
                    <ROICalculator />
                </LazyLoad>
            </div>

            <LazyLoad fallback={<div></div>}>
                <ForProvidersSection />
            </LazyLoad>
            
            {/* Animation Keyframes */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes scroll-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                .animate-scroll-up {
                    animation: scroll-up 40s linear infinite;
                }
                @keyframes float { 0% { transform: translate(0, 0); } 50% { transform: translate(0, -10px); } 100% { transform: translate(0, 0); } }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-bounce-slow { animation: float 4s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default ProvidersPage;