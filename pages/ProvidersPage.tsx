import React, { useState, useMemo, useRef, useEffect } from 'react';
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
    HandshakeIcon,
    CheckIcon
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

const OnboardingStep2Icon = () => (<svg viewBox="0 0 140 100" className="w-auto h-20 text-primary-800"><g fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="20" y="15" width="100" height="70" rx="8" fill="#dcfce7" /><circle cx="50" cy="40" r="12" fill="#fff" /><path d="M35 70 a15 15 0 0 1 30 0" fill="#fff" /><path d="M75 35 h35 M75 55 h25" /></g></svg>);
const OnboardingStep3Icon = () => (<svg viewBox="0 0 140 100" className="w-auto h-20 text-primary-800"><g fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M70 15 L110 35 L70 95 L30 35 Z" fill="#dcfce7" /><path d="M55 50 l10 10 l20 -20" stroke="#22c55e" strokeWidth="5" /></g></svg>);
const OnboardingStep4Icon = () => (<svg viewBox="0 0 140 100" className="w-auto h-20 text-primary-800"><g fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M40 80 L70 20 L100 80 Z" fill="#dcfce7" /><path d="M55 70 h30" /><path d="M70 20 L60 10" /><path d="M70 20 L80 10" /><path d="M50 90 a20 20 0 0 1 40 0" strokeDasharray="5 5" /></g></svg>);

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
                <stop offset="0%" style={{ stopColor: '#bbf7d0', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
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
                <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3" /> {item.location}</span>
            </div>
        </div>
        <div className="text-right">
            <span className="block text-sm font-bold text-primary-400">{item.budget}</span>
            <span className="text-[10px] text-slate-500">{item.time}</span>
        </div>
    </div>
);



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

    const [activeStep, setActiveStep] = useState(0);
    const stepsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!stepsContainerRef.current) return;
            
            const steps = stepsContainerRef.current.children;
            const viewportHeight = window.innerHeight;
            const triggerPoint = viewportHeight * 0.5; // Active when element is at 50% of viewport

            for (let i = 0; i < steps.length; i++) {
                const step = steps[i] as HTMLElement;
                const rect = step.getBoundingClientRect();
                
                if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                    setActiveStep(i);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const dashboardFeatures = [
        { icon: <Squares2X2Icon className="w-8 h-8 text-primary-700" />, title: t.feature1Title, description: t.feature1Desc },
        { icon: <PencilSquareIcon className="w-8 h-8 text-primary-700" />, title: t.feature2Title, description: t.feature2Desc },
        { icon: <AdjustmentsHorizontalIcon className="w-8 h-8 text-primary-700" />, title: t.feature3Title, description: t.feature3Desc },
        { icon: <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary-700" />, title: t.feature4Title, description: t.feature4Desc },
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
                                {t.heroTitle} <br />
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
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">
                                                <UserIcon className="w-4 h-4 text-slate-400" />
                                            </div>
                                        ))}
                                        <div className="w-9 h-9 rounded-full bg-primary-600 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">+2k</div>
                                    </div>
                                    <span>Partner dabei</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full"></div>
                                <div className="flex items-center gap-2">
                                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
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


            {/* ZIG-ZAG PROCESS SECTION */}
            <section id="how-it-works" className="relative bg-gradient-to-b from-slate-50 to-white py-24 lg:py-32 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="zigzag-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M0 30 L15 15 L30 30 L45 15 L60 30" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary-600"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#zigzag-pattern)" />
                    </svg>
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-[120px]"></div>
                    <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-100 text-primary-700 text-sm font-bold mb-6">
                            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                            3 EINFACHE SCHRITTE
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
                            {t.howItWorksTitle}
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            {t.howItWorksSubtitle}
                        </p>
                    </div>

                    {/* Zig-Zag Steps */}
                    <div className="max-w-6xl mx-auto space-y-8 lg:space-y-0">
                        
                        {/* Step 1 - Image Left, Content Right */}
                        <div className="relative group">
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                                {/* Visual */}
                                <div className="relative order-2 lg:order-1">
                                    <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-primary-500/20 overflow-hidden group-hover:shadow-primary-500/30 transition-shadow duration-500">
                                        {/* Decorative circles */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                                        
                                        {/* Mock UI */}
                                        <div className="relative space-y-4">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                                </div>
                                                <div className="text-xs text-white/60 font-medium">Marktplatz</div>
                                            </div>
                                            {[1,2,3].map((_, i) => (
                                                <div key={i} className={`bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10 ${i === 0 ? 'ring-2 ring-white/30' : ''}`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                            <BriefcaseIcon className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="h-3 bg-white/40 rounded w-3/4 mb-2"></div>
                                                            <div className="h-2 bg-white/20 rounded w-1/2"></div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-sm font-bold text-white">CHF {1200 + i * 800}</div>
                                                            <div className="text-xs text-white/50">Zürich</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Connector Line (Desktop) */}
                                    <div className="hidden lg:block absolute -right-8 top-1/2 w-16 h-[2px] bg-gradient-to-r from-primary-400 to-transparent"></div>
                                </div>
                                
                                {/* Content */}
                                <div className="order-1 lg:order-2 lg:pl-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 text-2xl font-black mb-6 group-hover:scale-110 transition-transform duration-300">
                                        01
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                                        {t.howItWorksStep1.replace(/^[0-9]+\.\s*/, '')}
                                    </h3>
                                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                        {t.howItWorksStep1Desc}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                                            <CheckIcon className="w-4 h-4 text-emerald-500" />
                                            Echtzeit-Updates
                                        </span>
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                                            <CheckIcon className="w-4 h-4 text-emerald-500" />
                                            Geprüfte Leads
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Mobile Connector */}
                            <div className="lg:hidden flex justify-center my-8">
                                <div className="w-[2px] h-16 bg-gradient-to-b from-primary-400 to-emerald-400"></div>
                            </div>
                        </div>

                        {/* Step 2 - Content Left, Image Right */}
                        <div className="relative group lg:pt-8">
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                                {/* Content */}
                                <div className="lg:pr-8 lg:text-right">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 text-2xl font-black mb-6 group-hover:scale-110 transition-transform duration-300">
                                        02
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                                        {t.howItWorksStep2.replace(/^[0-9]+\.\s*/, '')}
                                    </h3>
                                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                        {t.howItWorksStep2Desc}
                                    </p>
                                    <div className="flex flex-wrap gap-3 lg:justify-end">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                                            <CheckIcon className="w-4 h-4 text-emerald-500" />
                                            Direkter Kontakt
                                        </span>
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                                            <CheckIcon className="w-4 h-4 text-emerald-500" />
                                            Alle Details
                                        </span>
                                    </div>
                                </div>

                                {/* Visual */}
                                <div className="relative">
                                    <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-emerald-500/20 overflow-hidden group-hover:shadow-emerald-500/30 transition-shadow duration-500">
                                        {/* Decorative */}
                                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
                                        
                                        {/* Mock Offer Form */}
                                        <div className="relative">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                    <PencilSquareIcon className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="text-white font-bold">Angebot erstellen</div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                                                    <div className="text-xs text-white/60 mb-2">Kunde</div>
                                                    <div className="h-3 bg-white/30 rounded w-2/3"></div>
                                                </div>
                                                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                                                    <div className="text-xs text-white/60 mb-2">Preis</div>
                                                    <div className="text-2xl font-bold text-white">CHF 2'450.-</div>
                                                </div>
                                                <button className="w-full bg-white text-emerald-700 font-bold py-3 rounded-xl hover:bg-white/90 transition-colors">
                                                    Angebot senden
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Connector Line (Desktop) */}
                                    <div className="hidden lg:block absolute -left-8 top-1/2 w-16 h-[2px] bg-gradient-to-l from-emerald-400 to-transparent"></div>
                                </div>
                            </div>
                            
                            {/* Mobile Connector */}
                            <div className="lg:hidden flex justify-center my-8">
                                <div className="w-[2px] h-16 bg-gradient-to-b from-emerald-400 to-amber-400"></div>
                            </div>
                        </div>

                        {/* Step 3 - Full Width Success */}
                        <div className="relative group lg:pt-8">
                            <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 lg:p-16 overflow-hidden">
                                {/* Background Elements */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"></div>
                                
                                <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                                    {/* Content */}
                                    <div>
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white text-2xl font-black mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                                            03
                                        </div>
                                        <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                                            {t.howItWorksStep3.replace(/^[0-9]+\.\s*/, '')}
                                        </h3>
                                        <p className="text-lg text-slate-400 leading-relaxed mb-8">
                                            {t.howItWorksStep3Desc}
                                        </p>
                                        <Link 
                                            to="/register" 
                                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white font-bold rounded-2xl hover:from-primary-600 hover:to-emerald-600 transition-all shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-1"
                                        >
                                            Jetzt kostenlos starten
                                            <ArrowRightIcon className="w-5 h-5" />
                                        </Link>
                                    </div>
                                    
                                    {/* Success Visual */}
                                    <div className="relative flex justify-center">
                                        <div className="relative">
                                            {/* Celebration Circles */}
                                            <div className="absolute -inset-8">
                                                <div className="absolute top-0 left-1/4 w-4 h-4 bg-amber-400 rounded-full animate-bounce-slow"></div>
                                                <div className="absolute top-1/4 right-0 w-3 h-3 bg-emerald-400 rounded-full animate-bounce-slow [animation-delay:200ms]"></div>
                                                <div className="absolute bottom-0 left-0 w-5 h-5 bg-primary-400 rounded-full animate-bounce-slow [animation-delay:400ms]"></div>
                                            </div>
                                            
                                            {/* Success Card */}
                                            <div className="bg-white rounded-3xl p-8 shadow-2xl">
                                                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/30">
                                                    <CheckIcon className="w-10 h-10 text-white" />
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-black text-slate-900 mb-2">Auftrag gewonnen!</div>
                                                    <div className="text-slate-500 mb-4">Malerarbeiten Innen</div>
                                                    <div className="text-3xl font-black text-emerald-600">CHF 2'450.-</div>
                                                </div>
                                                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-4 text-sm text-slate-500">
                                                    <div className="flex items-center gap-1">
                                                        <MapPinIcon className="w-4 h-4" />
                                                        <span>Zürich</span>
                                                    </div>
                                                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                                                    <div className="flex items-center gap-1">
                                                        <ClockIcon className="w-4 h-4" />
                                                        <span>Heute</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

            {/* Zen Animation Engine */}
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
                @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
                
                /* Zen-specific animations */
                @keyframes breathe {
                    0%, 100% { 
                        transform: translate(-50%, -50%) scale(1); 
                        opacity: 0.2; 
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(1.2); 
                        opacity: 0.1; 
                    }
                }
                
                @keyframes fade-in-up {
                    0% { 
                        opacity: 0; 
                        transform: translateY(30px); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                @keyframes subtle-glow {
                    0%, 100% { 
                        box-shadow: 0 0 0 0 rgba(148, 163, 184, 0.1); 
                    }
                    50% { 
                        box-shadow: 0 0 20px 5px rgba(148, 163, 184, 0.05); 
                    }
                }
                
                @keyframes text-reveal {
                    0% { 
                        opacity: 0; 
                        transform: translateY(10px); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                @keyframes line-grow {
                    0% { 
                        width: 0; 
                    }
                    100% { 
                        width: 100%; 
                    }
                }
                
                .animate-breathe {
                    animation: breathe 8s ease-in-out infinite;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 1.2s ease-out forwards;
                }
                
                .animate-subtle-glow {
                    animation: subtle-glow 4s ease-in-out infinite;
                }
                
                .animate-text-reveal {
                    animation: text-reveal 0.8s ease-out forwards;
                }
                
                .animate-line-grow {
                    animation: line-grow 1.5s ease-out forwards;
                }
                
                /* Zen states */
                .zen-element {
                    transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .zen-element:hover {
                    transform: translateY(-2px);
                }
                
                .zen-focus {
                    outline: none;
                    border-color: #475569;
                }
                
                .zen-focus:focus {
                    border-color: #1e293b;
                    box-shadow: 0 0 0 3px rgba(30, 41, 59, 0.1);
                }
                
                /* Staggered animations for zen flow */
                .stagger-zen-1 { animation-delay: 0.2s; }
                .stagger-zen-2 { animation-delay: 0.4s; }
                .stagger-zen-3 { animation-delay: 0.6s; }
                
                /* Minimalist button states */
                .zen-button {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.7s ease;
                }
                
                .zen-button::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    transform: translate(-50%, -50%);
                    transition: width 0.7s, height 0.7s;
                }
                
                .zen-button:hover::before {
                    width: 300px;
                    height: 300px;
                }
                
                /* Calming typography */
                .zen-heading {
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                }
                
                .zen-text {
                    line-height: 1.7;
                    letter-spacing: 0.01em;
                }
                
                /* Subtle borders */
                .zen-border {
                    border: 1px solid #e2e8f0;
                    transition: border-color 0.7s ease;
                }
                
                .zen-border:hover {
                    border-color: #cbd5e1;
                }
            `}</style>
            
            {/* Zen Experience JavaScript */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    class ZenExperience {
                        constructor() {
                            this.currentStep = 0;
                            this.isScrolling = false;
                            this.init();
                        }
                        
                        init() {
                            this.bindEvents();
                            this.initAnimations();
                            this.startBreathing();
                        }
                        
                        bindEvents() {
                            // Smooth scroll for exploration buttons
                            const exploreButtons = document.querySelectorAll('.group');
                            exploreButtons.forEach((button, index) => {
                                button.addEventListener('click', () => this.exploreStep(index));
                            });
                            
                            // Scroll-based progress
                            window.addEventListener('scroll', () => this.handleScroll());
                            
                            // Keyboard navigation
                            document.addEventListener('keydown', (e) => this.handleKeyboard(e));
                        }
                        
                        initAnimations() {
                            // Staggered fade-in for steps
                            const steps = document.querySelectorAll('.relative.mb-32');
                            steps.forEach((step, index) => {
                                step.style.opacity = '0';
                                step.style.transform = 'translateY(30px)';
                                
                                setTimeout(() => {
                                    step.style.transition = 'all 1.2s ease-out';
                                    step.style.opacity = '1';
                                    step.style.transform = 'translateY(0)';
                                }, index * 300);
                            });
                            
                            // Animate connection lines
                            const lines = document.querySelectorAll('.w-px.bg-slate-200');
                            lines.forEach((line, index) => {
                                const height = line.parentElement.offsetHeight - 128; // Subtract spacing
                                line.style.height = '0';
                                line.style.transition = 'height 1.5s ease-out';
                                line.style.transitionDelay = \`\${index * 0.5 + 1}s\`;
                                
                                setTimeout(() => {
                                    line.style.height = \`\${height}px\`;
                                }, 100);
                            });
                        }
                        
                        startBreathing() {
                            // Enhanced breathing animation
                            const breatheCircle = document.querySelector('.animate-breathe');
                            if (breatheCircle) {
                                // Add subtle color variation
                                setInterval(() => {
                                    const hue = 200 + Math.sin(Date.now() * 0.0001) * 20;
                                    breatheCircle.style.backgroundColor = \`hsl(\${hue}, 20%, 95%)\`;
                                }, 50);
                            }
                        }
                        
                        exploreStep(stepIndex) {
                            // Smooth scroll to step
                            const steps = document.querySelectorAll('.relative.mb-32');
                            const targetStep = steps[stepIndex];
                            
                            if (targetStep) {
                                targetStep.scrollIntoView({ 
                                    behavior: 'smooth', 
                                    block: 'center' 
                                });
                                
                                // Highlight the step temporarily
                                this.highlightStep(stepIndex);
                            }
                        }
                        
                        highlightStep(stepIndex) {
                            const steps = document.querySelectorAll('.relative.mb-32');
                            const step = steps[stepIndex];
                            
                            if (step) {
                                // Add subtle glow
                                step.style.boxShadow = '0 0 30px rgba(148, 163, 184, 0.2)';
                                
                                setTimeout(() => {
                                    step.style.boxShadow = 'none';
                                }, 2000);
                            }
                        }
                        
                        handleScroll() {
                            if (this.isScrolling) return;
                            
                            this.isScrolling = true;
                            
                            // Update current step based on scroll position
                            const steps = document.querySelectorAll('.relative.mb-32');
                            const scrollPosition = window.scrollY + window.innerHeight / 2;
                            
                            steps.forEach((step, index) => {
                                const stepTop = step.offsetTop;
                                const stepBottom = stepTop + step.offsetHeight;
                                
                                if (scrollPosition >= stepTop && scrollPosition <= stepBottom) {
                                    if (this.currentStep !== index) {
                                        this.currentStep = index;
                                        this.updateStepIndicator(index);
                                    }
                                }
                            });
                            
                            setTimeout(() => {
                                this.isScrolling = false;
                            }, 100);
                        }
                        
                        updateStepIndicator(stepIndex) {
                            // Update visual indicators
                            const stepNumbers = document.querySelectorAll('.w-16.h-16.rounded-full');
                            stepNumbers.forEach((number, index) => {
                                if (index <= stepIndex) {
                                    number.style.borderColor = '#475569';
                                    number.querySelector('span').style.color = '#1e293b';
                                } else {
                                    number.style.borderColor = '#e2e8f0';
                                    number.querySelector('span').style.color = '#94a3b8';
                                }
                            });
                        }
                        
                        handleKeyboard(e) {
                            // Arrow key navigation
                            if (e.key === 'ArrowDown' && this.currentStep < 2) {
                                this.exploreStep(this.currentStep + 1);
                            } else if (e.key === 'ArrowUp' && this.currentStep > 0) {
                                this.exploreStep(this.currentStep - 1);
                            }
                        }
                    }
                    
                    // Initialize zen experience when DOM is ready
                    document.addEventListener('DOMContentLoaded', () => {
                        new ZenExperience();
                    });
                `
            }} />
        </div>
    );
};

export default ProvidersPage;