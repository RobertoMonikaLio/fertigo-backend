import React, { useEffect, useState } from 'react';
import { useAppContext } from '../pages/AppContext';

const translations = {
    de: {
        title: "Live",
        prefix: "Neue Anfrage:",
        items: [
            "Umzug 3.5 Zimmer in Zürich",
            "Endreinigung mit Abgabegarantie in Bern",
            "Malerarbeiten 4 Zimmer in Basel",
            "Bodenlegen Parkett in Luzern",
            "Badrenovierung komplett in St. Gallen",
            "Gartenumgestaltung in Winterthur",
            "Klaviertransport nach Genf"
        ]
    },
    fr: {
        title: "En direct",
        prefix: "Nouvelle demande :",
        items: [
            "Déménagement 3.5 pièces à Zurich",
            "Nettoyage final à Berne",
            "Peinture 4 pièces à Bâle",
            "Pose de parquet à Lucerne",
            "Rénovation complète de salle de bain à St-Gall",
            "Aménagement de jardin à Winterthour",
            "Transport de piano à Genève"
        ]
    }
};

const LiveActivity: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;

    // Duplicate data for infinite scroll effect
    const activities = [...t.items, ...t.items, ...t.items];

    return (
        <div className="bg-slate-900 border-b border-slate-800 py-3 overflow-hidden whitespace-nowrap relative z-20">
            <div className="container mx-auto flex items-center gap-6">

                {/* Live Badge */}
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 shrink-0">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest">{t.title}</span>
                </div>

                {/* Scrolling Text */}
                <div className="flex-1 overflow-hidden relative mask-linear-fade">
                    <div className="inline-block animate-marquee-left hover:[animation-play-state:paused] whitespace-nowrap">
                        {activities.map((item: string, i: number) => (
                            <span key={i} className="inline-flex items-center mx-6 text-slate-400 text-sm font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mr-3"></span>
                                <span className="text-slate-500 mr-1">{t.prefix}</span>
                                <span className="text-slate-200">{item}</span>
                                <span className="ml-3 text-xs text-slate-600 block sm:inline-block">
                                    {Math.floor(Math.random() * 5) + 1} min
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveActivity;
