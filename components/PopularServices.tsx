import React, { useState, useMemo } from 'react';
import { ArrowRightIcon } from './icons';
import { Link } from 'react-router-dom';
import {
    ColoredTruckIcon,
    ColoredSparklesIcon,
    ColoredPaintRollerIcon,
    ColoredLeafIcon,
    ColoredSquares2X2Icon,
    ColoredWrenchScrewdriverIcon,
    ColoredTrashIcon
} from './icons';
import { useAppContext } from '../pages/AppContext';
import { useInView } from 'react-intersection-observer';

const translations = {
    de: {
        title: 'Entdecken Sie unsere Dienstleistungen',
        subtitle: 'Finden Sie den richtigen Profi für jedes Projekt – von Umzug bis Renovation.',
        viewAll: 'Alle Dienstleistungen entdecken',
        startRequest: 'Anfrage starten',
        services: {
            umzug: 'Umzug',
            umzugDesc: 'Stressfreier Wohnungs- oder Bürowechsel mit Profis.',
            transport: 'Transport',
            transportDesc: 'Sicherer Transport von Möbeln, Waren und Sperrgut.',
            reinigung: 'Reinigung',
            reinigungDesc: 'Professionelle Sauberkeit für Privat & Geschäft.',
            maler: 'Malerarbeiten',
            malerDesc: 'Frische Farbe für Wände, Decken und Fassaden.',
            garten: 'Gartenpflege',
            gartenDesc: 'Heckenschnitt, Rasenpflege und Aussenbereich.',
            boden: 'Bodenleger',
            bodenDesc: 'Verlegung von Parkett, Laminat, Teppich und mehr.',
            handwerker: 'Handwerker',
            handwerkerDesc: 'Allgemeine Reparaturen, Montagen und Umbauten.',
            entsorgung: 'Entsorgung & Räumung',
            entsorgungDesc: 'Fachgerechte Entsorgung und Haushaltsauflösungen.',
            umzugsreinigung: 'Umzugsreinigung'
        },
    },
    // Other languages omitted for brevity
};

const getServicesData = (t: typeof translations.de) => [
    { name: t.services.umzug, description: t.services.umzugDesc, image: '/assets/umzug-service.png', icon: <ColoredTruckIcon className="w-10 h-10 flex-shrink-0" /> },
    { name: t.services.reinigung, description: t.services.reinigungDesc, image: '/assets/reinigung-service.png', icon: <ColoredSparklesIcon className="w-10 h-10 flex-shrink-0" /> },
    { name: t.services.maler, description: t.services.malerDesc, image: '/assets/maler-service-v2.png', icon: <ColoredPaintRollerIcon className="w-10 h-10 flex-shrink-0" /> },
    { name: t.services.garten, description: t.services.gartenDesc, image: '/assets/garten-service.png', icon: <ColoredLeafIcon className="w-10 h-10 flex-shrink-0" /> },
    { name: t.services.boden, description: t.services.bodenDesc, image: '/assets/boden-service.png', icon: <ColoredSquares2X2Icon className="w-10 h-10 flex-shrink-0" /> },
    { name: t.services.handwerker, description: t.services.handwerkerDesc, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2000&auto=format&fit=crop', icon: <ColoredWrenchScrewdriverIcon className="w-10 h-10 flex-shrink-0" /> }
];

const PopularServices: React.FC = () => {
    const { language, openQuoteModal } = useAppContext();
    const t = (translations as any)[language] || translations.de;
    const services = useMemo(() => getServicesData(t), [t]);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    const handleServiceClick = (serviceName: string) => {
        openQuoteModal({ service: serviceName, projectTitle: serviceName });
    };

    const SmallServiceCard: React.FC<{ service: any }> = ({ service }) => (
        <button onClick={() => handleServiceClick(service.name)} className="group relative aspect-square rounded-2xl overflow-hidden shadow-md border border-slate-200/50">
            <img src={`${service.image.split('?')[0]}?auto=format&fit=crop&q=75&w=400`} alt={service.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-3 left-3 text-white">
                {React.cloneElement(service.icon, { className: "w-5 h-5 mb-1" })}
                <h4 className="font-bold text-sm leading-tight">{service.name}</h4>
            </div>
        </button>
    );

    return (
        <section
            ref={ref}
            id="services"
            className={`py-10 sm:py-12 md:py-14 bg-slate-50 transition-all duration-700 ease-out lg:opacity-100 lg:transform-none ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="font-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">{t.title}</h2>
                    <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">{t.subtitle}</p>
                </div>

                {/* --- NEW MOBILE VIEW --- */}
                <div className="lg:hidden space-y-4">
                    <button onClick={() => handleServiceClick(services[0].name)} className="group bg-white w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 transition-all duration-300 active:scale-95">
                        <div className="bg-white">
                            <img src={`https://img.freepik.com/free-vector/hand-drawn-flat-design-moving-house-illustration_23-2149429584.jpg`} alt={services[0].name} className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {React.cloneElement(services[0].icon, { className: "w-7 h-7" })}
                                <h3 className="text-lg font-bold text-slate-800">{services[0].name}</h3>
                            </div>
                            <ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                        <SmallServiceCard service={services[1]} />
                        <SmallServiceCard service={services[2]} />
                        <SmallServiceCard service={services[3]} />
                        <Link to="/services" className="group bg-slate-100 p-4 rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center text-center hover:bg-slate-200 transition-colors">
                            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full mb-2 shadow-sm">
                                <ArrowRightIcon className="w-5 h-5 text-slate-600 group-hover:text-primary-600 transition-colors" />
                            </div>
                            <h4 className="font-bold text-sm text-slate-800 leading-tight">Alle Services</h4>
                        </Link>
                    </div>
                </div>

                {/* Desktop grid view */}
                <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.slice(0, 6).map((service, index) => {
                        const baseUrl = `${service.image.split('?')[0]}?auto=format&fit=crop&q=75&fm=webp`;
                        const isPopular = index < 3; // Top 3 services are popular
                        const partnerCount = index === 0 ? '250+' : index === 1 ? '180+' : index === 2 ? '150+' : '100+';
                        const rating = '4.8';

                        return (
                            <button
                                onClick={() => handleServiceClick(service.name)}
                                key={service.name}
                                className="group text-left bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] hover:border-primary-300 flex flex-col animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={`${baseUrl}&w=400`}
                                        srcSet={`${baseUrl}&w=400 400w, ${baseUrl}&w=800 800w`}
                                        sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        alt={service.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                        decoding="async"
                                        width="400"
                                        height="256"
                                    />
                                    {/* Popular Badge */}
                                    {isPopular && (
                                        <div className="absolute top-3 right-3 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            Beliebt
                                        </div>
                                    )}

                                    {/* Hover Info Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <div className="text-white space-y-1">
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-yellow-400">★</span>
                                                <span className="font-bold">{rating}</span>
                                                <span className="text-slate-300">Bewertung</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span>👥</span>
                                                <span className="font-bold">{partnerCount}</span>
                                                <span className="text-slate-300">Partner</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-3">
                                        {React.cloneElement(service.icon, { className: 'w-7 h-7' })}
                                        <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                                    </div>
                                    <p className="text-slate-600 text-sm flex-grow mb-4">{service.description}</p>
                                    <div className="mt-auto font-bold text-primary-700 flex items-center gap-2 group-hover:text-primary-800 transition-colors text-sm">
                                        {t.startRequest}
                                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="text-center mt-8 hidden lg:inline-flex lg:w-full lg:justify-center">
                    <Link
                        to="/services"
                        className="bg-primary-700 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-flex items-center gap-2 text-base"
                    >
                        {t.viewAll}
                        <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularServices;