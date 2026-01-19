
import React from 'react';
import { StarIcon } from './icons';

const SocialProof: React.FC = () => {
    const aggregateRatingSchema = {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        "itemReviewed": {
            "@type": "Organization",
            "name": "Fertigo",
             "url": "https://fertigo.ch/"
        },
        "ratingValue": "4.9",
        "bestRating": "5",
        "ratingCount": "1238"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
            />
            <div className="bg-slate-900 border-b border-slate-700/50">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-3 text-center">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-white">Ausgezeichnet</p>
                            <div className="flex">
                                <StarIcon className="w-5 h-5 text-yellow-400" />
                                <StarIcon className="w-5 h-5 text-yellow-400" />
                                <StarIcon className="w-5 h-5 text-yellow-400" />
                                <StarIcon className="w-5 h-5 text-yellow-400" />
                                <StarIcon className="w-5 h-5 text-yellow-400" />
                            </div>
                        </div>
                        <p className="text-slate-300 font-medium">
                            <span className="font-bold text-white">4.9 / 5</span> basierend auf über <span className="font-bold text-white">1'200+</span> echten Bewertungen.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SocialProof;
