import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BanknotesIcon, ArrowTrendingUpIcon, CheckCircleIcon, ArrowRightIcon } from './icons';

const ROICalculator: React.FC = () => {
    const [contractValue, setContractValue] = useState(1500);
    const [successRateDenominator, setSuccessRateDenominator] = useState(4); // Represents "1 in X"

    const LEAD_COST = 15;

    const calculations = useMemo(() => {
        const leadsPurchased = successRateDenominator;
        const investment = leadsPurchased * LEAD_COST;
        const revenue = contractValue; // Assuming 1 contract is won
        const profit = revenue - investment;
        const roi = investment > 0 ? (profit / investment) * 100 : 0;

        return {
            investment: investment.toLocaleString('de-CH'),
            revenue: revenue.toLocaleString('de-CH'),
            profit: profit.toLocaleString('de-CH'),
            roi: roi.toLocaleString('de-CH', { maximumFractionDigits: 0 }),
        };
    }, [contractValue, successRateDenominator]);

    return (
        <section className="py-20 md:py-24 lg:py-32 bg-slate-900 text-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                        Eine kleine Investition, ein grosser Ertrag
                    </h2>
                    <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                        Nutzen Sie unseren interaktiven Rechner, um Ihr potenzielles Wachstum mit OffertenVergleich zu visualisieren. Sehen Sie selbst, wie sich der Kauf von Leads für Sie auszahlt.
                    </p>
                </div>
                
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-800/50 p-8 lg:p-12 rounded-2xl border border-slate-700 shadow-2xl">
                    {/* Left side: Sliders */}
                    <div className="space-y-8">
                        <div>
                            <label htmlFor="contractValue" className="block text-lg font-bold mb-3">
                                Durchschnittlicher Auftragswert
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    id="contractValue"
                                    type="range"
                                    min="500"
                                    max="10000"
                                    step="100"
                                    value={contractValue}
                                    onChange={(e) => setContractValue(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer range-thumb:bg-primary-500"
                                />
                                <span className="font-bold text-xl bg-slate-700/80 px-4 py-2 rounded-lg w-32 text-center">
                                    CHF {contractValue.toLocaleString('de-CH')}
                                </span>
                            </div>
                        </div>

                        <div>
                             <label htmlFor="successRate" className="block text-lg font-bold mb-3">
                                Ihre Erfolgsquote (1 Auftrag pro X Leads)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    id="successRate"
                                    type="range"
                                    min="2"
                                    max="10"
                                    step="1"
                                    value={successRateDenominator}
                                    onChange={(e) => setSuccessRateDenominator(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="font-bold text-xl bg-slate-700/80 px-4 py-2 rounded-lg w-32 text-center">
                                    1 von {successRateDenominator}
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="text-lg font-bold mb-3">Durchschnittliche Lead-Kosten</p>
                            <p className="font-bold text-xl bg-slate-700/80 px-4 py-2 rounded-lg inline-block">
                                CHF {LEAD_COST.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {/* Right side: Results */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col justify-center items-center text-center">
                        <p className="text-base font-semibold text-slate-300">Basierend auf <span className="font-bold text-white">{successRateDenominator}</span> gekauften Leads, um <span className="font-bold text-white">1</span> Auftrag zu gewinnen:</p>

                        <div className="w-full my-8 space-y-6">
                            <div className="flex justify-between items-center text-left">
                                <span className="text-slate-300 font-medium">Ihre Investition:</span>
                                <span className="font-bold text-2xl text-red-400">- CHF {calculations.investment}</span>
                            </div>
                            <div className="flex justify-between items-center text-left">
                                <span className="text-slate-300 font-medium">Ihr potenzieller Umsatz:</span>
                                <span className="font-bold text-2xl text-green-400">+ CHF {calculations.revenue}</span>
                            </div>
                        </div>

                        <div className="w-full pt-6 border-t border-white/10">
                            <p className="text-lg font-semibold text-slate-200">Geschätzter Reingewinn:</p>
                            <p className="text-5xl font-extrabold text-white my-2">CHF {calculations.profit}</p>
                            <div className="mt-4 flex justify-center items-center gap-2 text-green-300 font-bold bg-green-500/10 px-4 py-2 rounded-full">
                                <ArrowTrendingUpIcon className="w-6 h-6"/>
                                <span className="text-xl">ROI: {calculations.roi}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-16">
                    <Link to="/register" className="bg-primary-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-primary-700 transition-all shadow-lg transform hover:-translate-y-1 text-lg inline-flex items-center gap-2">
                        Jetzt Wachstum starten
                        <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
