

import React from 'react';
import { EyeIcon, ShieldCheckIcon, ClockIcon } from '../components/icons';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from './AppContext';

const translations = {
    de: {
        missionTitle: "Unsere Mission",
        missionSubtitle: "Die Suche nach qualifizierten Dienstleistern in der Schweiz einfach, transparent und effizient gestalten.",
        storyTitle: "Wie alles begann",
        storyParagraph1: "Fertigo wurde 2025 aus der Frustration heraus gegründet, dass die Suche nach Handwerkern und anderen Dienstleistern oft einem Glücksspiel glich. Wir wollten eine Plattform schaffen, auf der sich Kunden auf Qualität verlassen und Anbieter faire Chancen auf neue Aufträge erhalten können.",
        storyParagraph2: "Heute sind wir stolz darauf, Tausende von erfolgreichen Projekten vermittelt zu haben und sowohl für unsere Kunden als auch für unsere Partner einen echten Mehrwert zu schaffen. Wir verbinden Menschen mit den richtigen Profis – schnell, sicher und unkompliziert.",
        valuesTitle: "Unsere Werte",
        valuesSubtitle: "Das Fundament unserer Arbeit und unser Versprechen an Sie.",
        value1Name: "Transparenz",
        value1Desc: "Wir schaffen klare Verhältnisse bei Preisen und Leistungen.",
        value2Name: "Qualität",
        value2Desc: "Wir arbeiten nur mit geprüften und bewährten Fachbetrieben zusammen.",
        value3Name: "Effizienz",
        value3Desc: "Wir sparen unseren Kunden Zeit und Geld durch smarte Vermittlung."
    },
    fr: {
        missionTitle: "Notre Mission",
        missionSubtitle: "Rendre la recherche de prestataires de services qualifiés en Suisse simple, transparente et efficace.",
        storyTitle: "Comment tout a commencé",
        storyParagraph1: "Fertigo a été fondée en 2023 par frustration face au fait que la recherche d'artisans et d'autres prestataires de services ressemblait souvent à un jeu de hasard. Nous voulions créer une plateforme où les clients peuvent compter sur la qualité et où les fournisseurs ont des chances équitables d'obtenir de nouvelles commandes.",
        storyParagraph2: "Aujourd'hui, nous sommes fiers d'avoir négocié des milliers de projets réussis et de créer une réelle valeur ajoutée pour nos clients et nos partenaires. Nous mettons en relation les gens avec les bons professionnels - rapidement, en toute sécurité et sans complication.",
        valuesTitle: "Nos Valeurs",
        valuesSubtitle: "Le fondement de notre travail et notre promesse envers vous.",
        value1Name: "Transparence",
        value1Desc: "Nous créons de la clarté sur les prix et les services.",
        value2Name: "Qualité",
        value2Desc: "Nous ne travaillons qu'avec des entreprises spécialisées éprouvées et vérifiées.",
        value3Name: "Efficacité",
        value3Desc: "Nous faisons gagner du temps et de l'argent à nos clients grâce à une mise en relation intelligente."
    },
    it: {
        missionTitle: "La nostra missione",
        missionSubtitle: "Rendere la ricerca di fornitori di servizi qualificati in Svizzera semplice, trasparente ed efficiente.",
        storyTitle: "Come tutto è iniziato",
        storyParagraph1: "Fertigo è stata fondata nel 2023 dalla frustrazione che la ricerca di artigiani e altri fornitori di servizi fosse spesso un gioco d'azzardo. Volevamo creare una piattaforma in cui i clienti potessero fare affidamento sulla qualità e i fornitori avessero eque opportunità di ottenere nuovi incarichi.",
        storyParagraph2: "Oggi siamo orgogliosi di aver mediato migliaia di progetti di successo e di creare un reale valore aggiunto sia per i nostri clienti che per i nostri partner. Mettiamo in contatto le persone con i professionisti giusti - in modo rapido, sicuro e senza complicazioni.",
        valuesTitle: "I nostri valori",
        valuesSubtitle: "Il fondamento del nostro lavoro e la nostra promessa per voi.",
        value1Name: "Trasparenza",
        value1Desc: "Creiamo chiarezza su prezzi e servizi.",
        value2Name: "Qualità",
        value2Desc: "Lavoriamo solo con aziende specializzate verificate e comprovate.",
        value3Name: "Efficienza",
        value3Desc: "Risparmiamo tempo e denaro ai nostri clienti attraverso un'intermediazione intelligente."
    },
    en: {
        missionTitle: "Our Mission",
        missionSubtitle: "To make the search for qualified service providers in Switzerland simple, transparent, and efficient.",
        storyTitle: "How It All Began",
        storyParagraph1: "Fertigo was founded in 2023 out of the frustration that finding craftsmen and other service providers often felt like a lottery. We wanted to create a platform where customers can rely on quality and providers get fair chances for new orders.",
        storyParagraph2: "Today, we are proud to have mediated thousands of successful projects and to create real added value for both our customers and our partners. We connect people with the right professionals – fast, secure, and uncomplicated.",
        valuesTitle: "Our Values",
        valuesSubtitle: "The foundation of our work and our promise to you.",
        value1Name: "Transparency",
        value1Desc: "We create clarity in prices and services.",
        value2Name: "Quality",
        value2Desc: "We only work with verified and proven professional companies.",
        value3Name: "Efficiency",
        value3Desc: "We save our customers time and money through smart mediation."
    }
};

const AboutPage: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;

    const values = [
        { name: t.value1Name, description: t.value1Desc, icon: EyeIcon },
        { name: t.value2Name, description: t.value2Desc, icon: ShieldCheckIcon },
        { name: t.value3Name, description: t.value3Desc, icon: ClockIcon },
    ];

    const imageUrl = "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=75&fm=webp";

    return (
        <div className="bg-white">

            <div className="py-24 sm:py-32">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-6">{t.storyTitle}</h2>
                        <p className="text-slate-700 mb-4 text-lg leading-relaxed">
                            {t.storyParagraph1}
                        </p>
                        <p className="text-slate-700 text-lg leading-relaxed">
                            {t.storyParagraph2}
                        </p>
                    </div>
                    <div className="order-1 md:order-2">
                        <img
                            src={`${imageUrl}&w=1200`}
                            srcSet={`${imageUrl}&w=600 600w, ${imageUrl}&w=1200 1200w`}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            alt="Unser Team bei der Arbeit"
                            className="rounded-2xl shadow-xl w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-primary-50 py-24 sm:py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-4">{t.valuesTitle}</h2>
                        <p className="text-lg text-slate-600">{t.valuesSubtitle}</p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map(value => {
                            const Icon = value.icon;
                            return (
                                <div key={value.name} className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center transform transition-transform hover:-translate-y-2">
                                    <div className="inline-flex items-center justify-center w-14 h-14 mb-5 rounded-full bg-primary-100 text-primary-700">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{value.name}</h3>
                                    <p className="text-slate-600">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;