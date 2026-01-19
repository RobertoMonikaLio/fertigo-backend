
import React from 'react';
import {
    ArrowRightIcon,
    BanknotesIcon,
    CheckCircleIcon,
    RocketLaunchIcon,
    QuoteIcon,
    StarIcon
} from './icons';
import { Link } from 'react-router-dom';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from '../pages/AppContext';

const translations = {
    de: {
        title: "Echte Aufträge. Echter Umsatz.",
        subtitle: "Wir verbinden Sie direkt mit Kunden, die bereit sind, Ihr Projekt zu starten. Konzentrieren Sie sich auf Ihre Arbeit, während wir Ihnen qualifizierte Anfragen liefern.",
        benefit1Title: "Qualifizierte Anfragen",
        benefit1Desc: "Erhalten Sie nur geprüfte Anfragen von echten Kunden.",
        benefit2Title: "Keine Fixkosten",
        benefit2Desc: "Zahlen Sie nur für die Anfragen, die Sie interessieren. Keine Abos, keine Gebühren.",
        benefit3Title: "Schneller wachsen",
        benefit3Desc: "Füllen Sie Ihre Auftragsbücher und steigern Sie Ihren Umsatz nachhaltig.",
        cta: "Jetzt Partner werden",
        testimonialName: "Reto Steiner",
        testimonialCompany: "Steiner Gartenbau, Luzern",
        testimonialQuote: `"Seit wir bei Fertigo sind, hat sich unsere Auftragslage um 30% verbessert. Die Anfragen sind hochwertig und wir verschwenden keine Zeit mehr mit Kaltakquise."`,
        verifiedPartner: "Geprüfter Partner",
        stat1Label: "Aufträge diesen Monat",
        stat2Label: "CHF Umsatz durch uns"
    },
    fr: {
        title: "De vrais mandats. Un vrai chiffre d'affaires.",
        subtitle: "Nous vous mettons directement en relation avec des clients prêts à démarrer leur projet. Concentrez-vous sur votre travail, nous vous fournissons des demandes qualifiées.",
        benefit1Title: "Demandes qualifiées",
        benefit1Desc: "Ne recevez que des demandes vérifiées de vrais clients.",
        benefit2Title: "Pas de frais fixes",
        benefit2Desc: "Payez uniquement pour les demandes qui vous intéressent. Pas d'abonnements, pas de frais.",
        benefit3Title: "Croissance rapide",
        benefit3Desc: "Remplissez vos carnets de commandes et augmentez durablement votre chiffre d'affaires.",
        cta: "Devenir partenaire maintenant",
        testimonialName: "Reto Steiner",
        testimonialCompany: "Steiner Paysagisme, Lucerne",
        testimonialQuote: `"Depuis que nous sommes sur Fertigo, notre carnet de commandes a augmenté de 30%. Les demandes sont de haute qualité et nous ne perdons plus de temps en prospection."`,
        verifiedPartner: "Partenaire vérifié",
        stat1Label: "Mandats ce mois-ci",
        stat2Label: "CHF de CA grâce à nous"
    },
    it: {
        title: "Incarichi reali. Fatturato reale.",
        subtitle: "Ti mettiamo in contatto diretto con clienti pronti a iniziare il loro progetto. Concentrati sul tuo lavoro, mentre noi ti forniamo richieste qualificate.",
        benefit1Title: "Richieste qualificate",
        benefit1Desc: "Ricevi solo richieste verificate da clienti reali.",
        benefit2Title: "Nessun costo fisso",
        benefit2Desc: "Paga solo per le richieste che ti interessano. Nessun abbonamento, nessuna commissione.",
        benefit3Title: "Crescita più rapida",
        benefit3Desc: "Riempi i tuoi libri degli ordini e aumenta il tuo fatturato in modo sostenibile.",
        cta: "Diventa partner ora",
        testimonialName: "Reto Steiner",
        testimonialCompany: "Steiner Giardinaggio, Lucerna",
        testimonialQuote: `"Da quando siamo su Fertigo, il nostro portafoglio ordini è aumentato del 30%. Le richieste sono di alta qualità e non perdiamo più tempo con l'acquisizione a freddo."`,
        verifiedPartner: "Partner verificato",
        stat1Label: "Incarichi questo mese",
        stat2Label: "CHF di fatturato tramite noi"
    },
    en: {
        title: "Real Jobs. Real Revenue.",
        subtitle: "We connect you directly with customers who are ready to start their project. Focus on your work while we deliver qualified inquiries.",
        benefit1Title: "Qualified Inquiries",
        benefit1Desc: "Receive only verified inquiries from real customers.",
        benefit2Title: "No Fixed Costs",
        benefit2Desc: "Pay only for the inquiries that interest you. No subscriptions, no fees.",
        benefit3Title: "Grow Faster",
        benefit3Desc: "Fill your order books and sustainably increase your revenue.",
        cta: "Become a Partner Now",
        testimonialName: "Reto Steiner",
        testimonialCompany: "Steiner Gardening, Lucerne",
        testimonialQuote: `"Since we joined Fertigo, our order situation has improved by 30%. The inquiries are high-quality, and we no longer waste time on cold calling."`,
        verifiedPartner: "Verified Partner",
        stat1Label: "Jobs this month",
        stat2Label: "CHF revenue through us"
    }
};


const ForProvidersSection: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;
    const imageUrl = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=75&fm=webp";

    return (
        <section id="providers" className="bg-white py-24 sm:py-32 hidden lg:block">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Content */}
                    <div>
                        <span className="font-semibold bg-primary-100 text-primary-800 px-4 py-1.5 rounded-full">
                            FÜR ANBIETER
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-6">
                            {t.title}
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            {t.subtitle}
                        </p>

                        <ul className="mt-10 space-y-6">
                            <li className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shadow-sm">
                                    <CheckCircleIcon className="w-6 h-6 text-primary-700" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{t.benefit1Title}</h3>
                                    <p className="text-slate-600 mt-1">{t.benefit1Desc}</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shadow-sm">
                                    <BanknotesIcon className="w-6 h-6 text-primary-700" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{t.benefit2Title}</h3>
                                    <p className="text-slate-600 mt-1">{t.benefit2Desc}</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shadow-sm">
                                    <RocketLaunchIcon className="w-6 h-6 text-primary-700" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{t.benefit3Title}</h3>
                                    <p className="text-slate-600 mt-1">{t.benefit3Desc}</p>
                                </div>
                            </li>
                        </ul>
                        
                        <Link to="/register" className="mt-12 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 hover:-translate-y-1">
                            {t.cta}
                            <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </Link>
                    </div>

                    {/* Right Column: Visual Showcase */}
                    <div className="relative">
                        <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-2 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-slate-100 rounded-xl overflow-hidden aspect-[4/3]">
                                <img 
                                    src={`${imageUrl}&w=800`}
                                    srcSet={`${imageUrl}&w=400 400w, ${imageUrl}&w=800 800w`}
                                    sizes="(min-width: 1024px) 40vw, 90vw"
                                    alt="Zufriedener Handwerker"
                                    className="w-full h-full object-cover" 
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </div>

                        {/* Floating Testimonial */}
                        <div className="absolute -bottom-10 -left-10 w-72 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/50 animate-bounce-slow">
                            <QuoteIcon className="w-8 h-8 text-slate-200 mb-2" />
                            <p className="text-slate-700 font-medium italic mb-4 text-sm">
                                {t.testimonialQuote}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-primary-700">R</div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{t.testimonialName}</p>
                                    <p className="text-xs text-slate-500">{t.testimonialCompany}</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Stats */}
                         <div className="absolute top-0 -right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl animate-bounce-slow-delay">
                            <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <StarIcon className="w-5 h-5"/>
                                 </div>
                                <div>
                                     <p className="text-xs font-bold text-slate-500">{t.verifiedPartner}</p>
                                     <p className="font-bold text-sm text-slate-900">4.9 / 5.0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Fix: Add default export to make the component importable.
export default ForProvidersSection;
