

import React from 'react';
import { EyeIcon, ShieldCheckIcon, ClockIcon } from '../components/icons';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from './AppContext';
import { translations } from '../components/translations';

const AboutPage: React.FC = () => {
    const { language } = useAppContext();
    const t = translations[language] || translations['de'];
    const content = t.aboutPage;

    const values = [
        { name: content.value1Name, description: content.value1Desc, icon: EyeIcon },
        { name: content.value2Name, description: content.value2Desc, icon: ShieldCheckIcon },
        { name: content.value3Name, description: content.value3Desc, icon: ClockIcon },
    ];

    const imageUrl = "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=75&fm=webp";

    return (
        <div className="bg-white">

            <div className="py-24 sm:py-32">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-6">{content.storyTitle}</h2>
                        <p className="text-slate-700 mb-4 text-lg leading-relaxed">
                            {content.storyParagraph1}
                        </p>
                        <p className="text-slate-700 text-lg leading-relaxed">
                            {content.storyParagraph2}
                        </p>
                    </div>
                    <div className="order-1 md:order-2">
                        <img
                            src={`${imageUrl}&w=1200`}
                            srcSet={`${imageUrl}&w=600 600w, ${imageUrl}&w=1200 1200w`}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            alt={content.teamImageAlt}
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-4">{content.valuesTitle}</h2>
                        <p className="text-lg text-slate-600">{content.valuesSubtitle}</p>
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