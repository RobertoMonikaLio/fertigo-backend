

import React from 'react';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from '../pages/AppContext';

const translations = {
    de: {
        title: "Bekannt aus & von führenden Schweizer Unternehmen genutzt"
    },
    fr: {
        title: "Présent dans les médias & utilisé par de grandes entreprises suisses"
    },
    it: {
        title: "Riconosciuto dai media e utilizzato dalle principali aziende svizzere"
    },
    en: {
        title: "As seen in & used by leading Swiss companies"
    },
    es: {
        title: "Como se ve en y utilizado por empresas suizas líderes"
    },
    pt: {
        title: "Como visto em e usado por empresas suíças líderes"
    },
    nl: {
        title: "Bekend van & gebruikt door toonaangevende Zwitserse bedrijven"
    },
    pl: {
        title: "Znane z i używane przez wiodące szwajcarskie firmy"
    },
    tr: {
        title: "Medyada görüldüğü gibi ve önde gelen İsviçre şirketleri tarafından kullanılıyor"
    },
    ru: {
        title: "Как видно в и используется ведущими швейцарскими компаниями"
    }
};

const partners = [
    { name: 'SRF', logo: <svg viewBox="0 0 100 40" className="h-8"><text x="50" y="28" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">SRF</text></svg> },
    { name: 'NZZ', logo: <svg viewBox="0 0 100 40" className="h-8"><text x="50" y="28" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">NZZ</text></svg> },
    { name: '20 Minuten', logo: <svg viewBox="0 0 100 40" className="h-8"><text x="50" y="28" fontFamily="Helvetica, sans-serif" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">20min</text></svg> },
    { name: 'Tages-Anzeiger', logo: <svg viewBox="0 0 120 40" className="h-8"><text x="60" y="28" fontFamily="Times New Roman, serif" fontSize="18" fontWeight="bold" textAnchor="middle" fill="currentColor">Tages-Anzeiger</text></svg> },
    { name: 'Blick', logo: <svg viewBox="0 0 100 40" className="h-8"><text x="50" y="28" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#D52B1E" textAnchor="middle">Blick</text></svg> },
    { name: 'Der Bote', logo: <svg viewBox="0 0 100 40" className="h-8"><text x="50" y="28" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" textAnchor="middle" fill="currentColor">Der Bote</text></svg> },
    { name: 'Watson', logo: <svg viewBox="0 0 100 40" className="h-8"><text x="50" y="28" fontFamily="Helvetica, sans-serif" fontSize="24" fontWeight="bold" fill="#00AEEF" textAnchor="middle">watson</text></svg> },
];

const PartnerLogos: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;

    // Triple the partners for seamless infinite scroll on wide screens
    const marqueePartners = [...partners, ...partners, ...partners];

    return (
        <section className="bg-slate-50 py-16 sm:py-20 md:py-24 overflow-hidden border-b border-slate-100">
            <div className="container mx-auto px-6 max-w-6xl mb-10">
                <h2 className="text-center text-sm font-bold tracking-widest text-slate-400 uppercase">
                    {t.title}
                </h2>
            </div>

            <div className="relative w-full">
                {/* Gradient Masks for fade effect */}
                <div className="absolute top-0 left-0 w-20 sm:w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-20 sm:w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

                {/* Marquee Container */}
                <div className="flex w-full overflow-hidden">
                    <div className="flex animate-marquee-left hover:[animation-play-state:paused] items-center gap-12 sm:gap-20">
                        {marqueePartners.map((partner, index) => (
                            <div
                                key={index}
                                title={partner.name}
                                className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-110 cursor-pointer"
                            >
                                {React.cloneElement(partner.logo as React.ReactElement, { className: "h-8 sm:h-10" })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerLogos;