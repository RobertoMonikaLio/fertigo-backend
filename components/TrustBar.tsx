import React from 'react';
import { SwissFlagIcon } from './icons';
import { useInView } from 'react-intersection-observer';

const TrustBar: React.FC = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const handleScrollToForm = () => {
        const formElement = document.getElementById('hero-form');
        if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const items = [
        {
            title: 'Geprüfte Betriebe',
            description: 'Verifizierung von Firma & Identität. Fokus auf Schweizer Qualität.',
            badge: 'Verifiziert',
            icon: '🏅',
        },
        {
            title: 'Schnelle Offerten',
            description: 'Sie erhalten mehrere Angebote – ohne Telefonmarathon.',
            badge: 'oft < 24h',
            icon: '⚡',
        },
        {
            title: 'Besser vergleichen',
            description: 'Preise, Leistungen & Bewertungen übersichtlich nebeneinander.',
            badge: 'transparent',
            icon: '⚖️',
        },
        {
            title: 'Fairer Preis',
            description: 'Durch Wettbewerb zahlen Sie weniger – ohne Abstriche bei Qualität.',
            badge: 'Sparpotenzial',
            icon: '💰',
        },
        {
            title: 'Schweizer Datenschutz',
            description: 'Datensparsam, nachvollziehbar, DSG-konform (CH).',
            badge: 'CH',
            icon: '🔒',
        },
        {
            title: 'Support, der hilft',
            description: 'Wenn etwas unklar ist: wir unterstützen – schnell & menschlich.',
            badge: 'Support',
            icon: '🧩',
        },
    ];

    return (
        <section ref={ref} className="relative bg-white py-16 sm:py-20 overflow-hidden">
            {/* Subtle Swiss accent background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-20 -right-24 h-64 w-64 rounded-full bg-red-500/5 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-slate-900/5 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative">
                <div className={`grid lg:grid-cols-12 gap-10 lg:gap-12 items-start transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    {/* Left: copy + trust strip */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                                <SwissFlagIcon className="w-4 h-4" />
                                Schweiz‑fokussiert
                            </div>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                            Ihre Vorteile mit Fertigo
                        </h2>
                        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl">
                            Finden Sie passende Anbieter, vergleichen Sie Offerten und beauftragen Sie mit gutem Gefühl – klar, effizient und schweiz‑konform.
                        </p>

                        {/* Trust strip */}
                        <div className="mt-6 grid gap-3">
                            {[
                                { label: 'Datenschutz (CH)', desc: 'Datensparsam & transparent', icon: '🔒' },
                                { label: 'Verifiziert', desc: 'Geprüfte Partnerprofile', icon: '✅' },
                                { label: 'Support', desc: 'Schnelle Hilfe bei Fragen', icon: '🧑‍💼' },
                            ].map((t, i) => (
                                <div key={i} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                                    <div className="mt-0.5 w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                        <span className="text-lg">{t.icon}</span>
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-semibold text-slate-900">{t.label}</div>
                                        <div className="text-sm text-slate-600">{t.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={handleScrollToForm}
                                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-white font-bold hover:bg-red-700 transition-colors"
                            >
                                Kostenlos Offerten anfordern
                            </button>
                            <div className="sm:pt-1 text-sm text-slate-500">
                                Ohne Anmeldung · unverbindlich · in 2 Minuten
                            </div>
                        </div>
                    </div>

                    {/* Right: benefit cards */}
                    <div className="lg:col-span-7">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {items.map((it, idx) => (
                                <div
                                    key={idx}
                                    className="group rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-lg hover:border-red-200 transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                                                <span className="text-xl">{it.icon}</span>
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-slate-900 truncate">{it.title}</div>
                                                <div className="mt-1 text-sm text-slate-600 line-clamp-2">{it.description}</div>
                                            </div>
                                        </div>
                                        <div className="shrink-0">
                                            <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white/90">
                                                {it.badge}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Proof row */}
                        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {[
                                { value: "50'000+", label: 'Projekte' },
                                { value: "2'500+", label: 'Partner' },
                                { value: '4.8/5', label: 'Bewertung' },
                                { value: '98%', label: 'Zufriedenheit' },
                            ].map((s, i) => (
                                <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-4 text-center">
                                    <div className="text-lg sm:text-xl font-black text-slate-900">{s.value}</div>
                                    <div className="text-xs sm:text-sm text-slate-600">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
