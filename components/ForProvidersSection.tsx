
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

    return (
        <section id="providers" className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-24 sm:py-32 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-amber-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-yellow-200/30 to-orange-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #fbbf2440 0%, transparent 50%), radial-gradient(circle at 75% 75%, #fb923c40 0%, transparent 50%)`
                }}></div>
            </div>
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-bounce"></div>
                        <span className="text-orange-700 font-bold tracking-wider uppercase text-sm bg-orange-100 px-4 py-1 rounded-full">FÜR HANDWERKER & DIENSTLEISTER</span>
                        <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-bounce"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        So einfach geht's
                    </h2>
                    <p className="text-xl text-slate-700 max-w-3xl mx-auto font-medium">
                        In nur 3 Minuten zum ersten Auftrag - so funktioniert unser einfacher Prozess
                    </p>
                </div>
                
                {/* Vertical Accordion Process */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="space-y-6">
                        {/* Step 1 - Registration */}
                        <div className="group bg-white rounded-3xl p-8 shadow-xl border border-orange-100 hover:border-orange-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="flex flex-col md:flex-row items-start gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-3xl font-black text-white">1</span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                                            <CheckCircleIcon className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900">Kostenlos registrieren</h3>
                                    </div>
                                    <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                                        Erstellen Sie Ihr Unternehmensprofil in wenigen Minuten. Fügen Sie Ihre Dienstleistungen, Qualifikationen und Portfolio hinzu.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                            ⏱️ 3 Minuten
                                        </span>
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                            ✓ Kostenlos
                                        </span>
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                            ✓ Sofort aktiv
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Step 2 - Leads */}
                        <div className="group bg-white rounded-3xl p-8 shadow-xl border border-amber-100 hover:border-amber-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="flex flex-col md:flex-row items-start gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-3xl font-black text-white">2</span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                                            <BanknotesIcon className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900">Qualifizierte Leads erhalten</h3>
                                    </div>
                                    <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                                        Erhalten Sie täglich neue Anfragen aus Ihrer Region. Alle Leads sind vorab geprüft und haben konkrete Projektanforderungen.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                            📨 Täglich neue Leads
                                        </span>
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                            ✓ Geprüfte Kunden
                                        </span>
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                            ✓ Direktkontakt
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Step 3 - Orders */}
                        <div className="group bg-white rounded-3xl p-8 shadow-xl border border-yellow-100 hover:border-yellow-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="flex flex-col md:flex-row items-start gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-3xl font-black text-white">3</span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-300">
                                            <RocketLaunchIcon className="w-6 h-6 text-yellow-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900">Aufträge sichern & umsetzen</h3>
                                    </div>
                                    <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                                        Erstellen Sie professionelle Angebote, gewinnen Sie Aufträge und führen Sie Projekte erfolgreich durch. Alles über eine Plattform.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                            💼 Sofort Aufträge
                                        </span>
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                            ✓ Transparente Abwicklung
                                        </span>
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                            ✓ Zahlungsgarantie
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Interactive Benefit Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <div className="group bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircleIcon className="w-7 h-7 text-orange-600" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">98% Erfolgsrate</h4>
                        <p className="text-slate-600 text-sm">Qualifizierte Leads garantieren hohe Conversion-Raten</p>
                    </div>
                    
                    <div className="group bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:border-amber-300 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <BanknotesIcon className="w-7 h-7 text-amber-600" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">CHF 15/Lead</h4>
                        <p className="text-slate-600 text-sm">Transparente Preise ohne versteckte Kosten</p>
                    </div>
                    
                    <div className="group bg-white rounded-2xl p-6 shadow-lg border border-yellow-100 hover:border-yellow-300 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <RocketLaunchIcon className="w-7 h-7 text-yellow-600" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">24h Durchschnitt</h4>
                        <p className="text-slate-600 text-sm">Schnelle Reaktionszeiten von Kunden</p>
                    </div>
                    
                    <div className="group bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-7 h-7 text-orange-600 font-bold text-xl">✓</div>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">Sofort aktiv</h4>
                        <p className="text-slate-600 text-sm">Starten Sie noch heute mit Aufträgen</p>
                    </div>
                </div>
                
                {/* CTA with Progress Visualization */}
                <div className="bg-white rounded-3xl p-12 shadow-2xl border border-orange-200 max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Bereit für Ihren ersten Auftrag?</h3>
                        <p className="text-lg text-slate-700 mb-8">Treten Sie unserem erfolgreichen Netzwerk bei - über 500 Handwerker vertrauen uns bereits</p>
                    </div>
                    
                    {/* Progress Steps */}
                    <div className="grid grid-cols-3 gap-8 mb-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-orange-300">
                                <span className="text-xl font-bold text-orange-700">1</span>
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2">Registrieren</h4>
                            <p className="text-sm text-slate-600">Profil erstellen</p>
                        </div>
                        
                        <div className="text-center relative">
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full h-1 bg-orange-200 z-0"></div>
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-orange-300 relative z-10">
                                <span className="text-xl font-bold text-orange-700">2</span>
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2">Leads erhalten</h4>
                            <p className="text-sm text-slate-600">Anfragen bekommen</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-orange-300 shadow-lg">
                                <span className="text-xl font-bold text-white">3</span>
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2">Aufträge sichern</h4>
                            <p className="text-sm text-slate-600">Projekte gewinnen</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Jetzt kostenlos starten
                            <ArrowRightIcon className="w-5 h-5 ml-3" />
                        </Link>
                        <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-orange-700 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-all border-2 border-orange-200 hover:border-orange-300">
                            Wie es funktioniert
                        </button>
                    </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-200 max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-slate-700 font-bold ml-2">4.9/5.0</span>
                            </div>
                            <p className="text-slate-600 italic">"Exzellenter Service und qualifizierte Leads"</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto mb-3">
                                RS
                            </div>
                            <p className="font-bold text-slate-900">Reto Steiner</p>
                            <p className="text-slate-600 text-sm">Steiner Sanitär GmbH</p>
                        </div>
                        
                        <div className="text-center md:text-right">
                            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-black text-green-600">+40%</div>
                                    <div className="text-xs text-slate-600">Umsatzsteigerung</div>
                                </div>
                                <div className="h-12 w-px bg-slate-200"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-black text-blue-600">500+</div>
                                    <div className="text-xs text-slate-600">Zufriedene Partner</div>
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
