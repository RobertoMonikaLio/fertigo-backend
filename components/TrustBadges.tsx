import React from 'react';
import { SwissFlagIcon } from './icons';

const TrustBadges: React.FC = () => {
    return (
        <section className="bg-white py-12 lg:py-16 border-b border-green-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8 max-w-5xl mx-auto">
                    {/* Trust Badges */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center shadow-lg border-2 border-green-200 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                            <span className="text-2xl">✅</span>
                        </div>
                        <div className="text-sm font-bold text-slate-700 group-hover:text-green-700 transition-colors">Geprüfte Firmen</div>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center shadow-lg border-2 border-green-200 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                            <span className="text-2xl">💰</span>
                        </div>
                        <div className="text-sm font-bold text-slate-700 group-hover:text-green-700 transition-colors">100% Kostenlos</div>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center shadow-lg border-2 border-green-200 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                            <SwissFlagIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="text-sm font-bold text-slate-700 group-hover:text-green-700 transition-colors">Schweizweit</div>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center shadow-lg border-2 border-green-200 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <div className="text-sm font-bold text-slate-700 group-hover:text-green-700 transition-colors">Schnelle Antwort</div>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center shadow-lg border-2 border-green-200 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                            <span className="text-2xl">🔒</span>
                        </div>
                        <div className="text-sm font-bold text-slate-700 group-hover:text-green-700 transition-colors">DSGVO-Konform</div>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center shadow-lg border-2 border-green-200 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                            <span className="text-2xl">⭐</span>
                        </div>
                        <div className="text-sm font-bold text-slate-700 group-hover:text-green-700 transition-colors">Top Bewertungen</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
