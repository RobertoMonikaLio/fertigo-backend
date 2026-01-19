import React, { useState } from 'react';
import { BanknotesIcon, ClockIcon, CheckIcon, XMarkIcon } from './icons';

// Mock data for the comparison
const comparisonData = {
    'Malerarbeiten': {
        price: 'ab CHF 800',
        time: '2-5 Tage',
        benefits: ['Professionelles Finish', 'Farbberatung inklusive', 'Hochwertige Materialien']
    },
    'Umzug': {
        price: 'ab CHF 450',
        time: '1 Tag',
        benefits: ['Versicherter Transport', 'Ein- & Auspackservice', 'Möbelmontage möglich']
    },
    'Reinigung': {
        price: 'ab CHF 250',
        time: '< 24h für Offerte',
        benefits: ['Abnahmegarantie', 'Umweltfreundliche Mittel', 'Flexibel buchbar']
    },
    'Gartenpflege': {
        price: 'CHF 60-90 / Std.',
        time: 'Regelmässig',
        benefits: ['Jahres-Abonnement', 'Heckenschnitt & Rasenpflege', 'Entsorgung inklusive']
    },
    'Handwerker': {
        price: 'Nach Aufwand',
        time: 'Schnell verfügbar',
        benefits: ['Alle Gewerke', 'Reparatur-Service', 'Notfall-Einsätze']
    }
};

type ServiceName = keyof typeof comparisonData;
const availableServices: ServiceName[] = ['Malerarbeiten', 'Umzug', 'Reinigung', 'Gartenpflege', 'Handwerker'];

const QuickCompare: React.FC = () => {
    const [selectedServices, setSelectedServices] = useState<ServiceName[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectService = (service: ServiceName) => {
        setSelectedServices(prev => {
            if (prev.includes(service)) {
                return prev.filter(s => s !== service);
            }
            if (prev.length < 3) {
                return [...prev, service];
            }
            return prev;
        });
    };

    const openModal = () => {
        if (selectedServices.length >= 2) {
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden';
        }
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const canCompare = selectedServices.length >= 2 && selectedServices.length <= 3;

    return (
        <>
            <section className="py-24 sm:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Schnellvergleich</h2>
                        <p className="text-lg text-slate-600">
                            Wählen Sie 2-3 Dienstleistungen aus, um einen schnellen Überblick über durchschnittliche Preise und Vorteile zu erhalten.
                        </p>
                    </div>

                    <div className="mt-12 max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                        {availableServices.map(service => (
                            <button
                                key={service}
                                onClick={() => handleSelectService(service)}
                                className={`px-6 py-3 rounded-full font-semibold border-2 transition-all duration-200 ${
                                    selectedServices.includes(service)
                                        ? 'bg-primary-700 text-white border-primary-700 shadow-md'
                                        : 'bg-white text-slate-700 border-slate-300 hover:border-primary-500 hover:text-primary-700'
                                }`}
                            >
                                {service}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <button
                            onClick={openModal}
                            disabled={!canCompare}
                            className="bg-primary-700 text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:bg-primary-800 transition-all text-lg transform hover:-translate-y-1 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {`Services vergleichen (${selectedServices.length})`}
                        </button>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal} role="dialog" aria-modal="true">
                    <div className="bg-slate-50 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-5 border-b border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900">Dienstleistungsvergleich</h3>
                            <button onClick={closeModal} className="text-slate-500 hover:text-slate-800"><XMarkIcon className="w-6 h-6"/></button>
                        </div>
                        <div className="p-6 sm:p-8 overflow-y-auto">
                            <div className={`grid gap-6 sm:gap-8 grid-cols-1 ${selectedServices.length === 2 ? 'md:grid-cols-2' : ''} ${selectedServices.length === 3 ? 'md:grid-cols-3' : ''}`}>
                                {selectedServices.map(service => {
                                    const data = comparisonData[service];
                                    return (
                                        <div key={service} className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg">
                                            <h4 className="text-2xl font-bold text-slate-900 mb-6 text-center">{service}</h4>
                                            
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <BanknotesIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="font-semibold text-slate-600">Durchschnittspreis</p>
                                                        <p className="text-lg font-bold text-slate-800">{data.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <ClockIcon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="font-semibold text-slate-600">Zeitrahmen</p>
                                                        <p className="text-lg font-bold text-slate-800">{data.time}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-slate-200">
                                                <p className="font-semibold text-slate-600 mb-3">Top-Vorteile:</p>
                                                <ul className="space-y-2">
                                                    {data.benefits.map((benefit, i) => (
                                                        <li key={i} className="flex items-center gap-2">
                                                            <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                            <span className="text-slate-700">{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuickCompare;
