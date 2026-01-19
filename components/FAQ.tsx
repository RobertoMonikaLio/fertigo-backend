import React, { useState } from 'react';
import { useAppContext } from '../pages/AppContext';
import { useInView } from 'react-intersection-observer';

const translations = {
    de: {
        title: "Häufig gestellte Fragen",
        subtitle: "Alles, was Sie wissen müssen, um Ihr Projekt zu starten.",
        items: [
            {
                q: "Ist die Nutzung von Fertigo wirklich kostenlos?",
                a: "Ja, für Auftraggeber ist die Nutzung von Fertigo zu 100% kostenlos. Sie beschreiben Ihr Projekt und erhalten unverbindliche Offerten."
            },
            {
                q: "Wie schnell erhalte ich Offerten?",
                a: "In der Regel erhalten Sie innerhalb von 2 bis 24 Stunden die ersten Angebote von interessierten Dienstleistern aus Ihrer Region."
            },
            {
                q: "Sind die Handwerker geprüft?",
                a: "Wir legen grossen Wert auf Qualität. Unsere Partner werden regelmässig geprüft und durch Bewertungen anderer Nutzer transparent bewertet."
            },
            {
                q: "Bin ich verpflichtet, eine Offerte anzunehmen?",
                a: "Nein. Sie vergleichen die Angebote in Ruhe und entscheiden selbst, ob und wen Sie beauftragen möchten. Es besteht keine Verpflichtung."
            },
            {
                q: "Welche Informationen muss ich angeben?",
                a: "Je genauer Sie Ihr Projekt beschreiben (z.B. Grösse, gewünschtes Datum), desto präziser können die Firmen ihre Offerten kalkulieren."
            }
        ]
    },
    fr: {
        title: "Questions fréquentes",
        subtitle: "Tout ce que vous devez savoir pour démarrer votre projet.",
        items: [
            {
                q: "L'utilisation de Fertigo est-elle vraiment gratuite ?",
                a: "Oui, pour les clients, l'utilisation de Fertigo est 100% gratuite. Vous décrivez votre projet et recevez des offres sans engagement."
            },
            {
                q: "À quelle vitesse vais-je recevoir des offres ?",
                a: "En règle générale, vous recevez les premières offres de prestataires intéressés de votre région dans un délai de 2 à 24 heures."
            },
            {
                q: "Les artisans sont-ils vérifiés ?",
                a: "Nous attachons une grande importance à la qualité. Nos partenaires sont régulièrement contrôlés et évalués de manière transparente par les avis d'autres utilisateurs."
            },
            {
                q: "Suis-je obligé d'accepter une offre ?",
                a: "Non. Vous comparez les offres tranquillement et décidez vous-même si et qui vous souhaitez mandater. Il n'y a aucune obligation."
            },
            {
                q: "Quelles informations dois-je fournir ?",
                a: "Plus vous décrivez votre projet avec précision (par ex. taille, date souhaitée), plus les entreprises peuvent calculer leurs offres avec exactitude."
            }
        ]
    }
};

const FAQ: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    // State to track open item (only one at a time for cleanliness)
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-slate-50">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">{t.title}</h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">{t.subtitle}</p>
                </div>

                <div className={`space-y-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {t.items.map((item: any, index: number) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-primary-200 bg-primary-50/30' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                                <button
                                    onClick={() => toggleIndex(index)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                >
                                    <span className={`text-lg font-bold ${isOpen ? 'text-primary-800' : 'text-slate-800'}`}>
                                        {item.q}
                                    </span>
                                    <span className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-500'}`}>
                                        {isOpen ? (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        )}
                                    </span>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;