import React, { lazy } from 'react';
import Hero from '../components/Hero';
import LazyLoad from '../components/LazyLoad';
import StickyCta from '../components/StickyCta';

// Lazy load components that are likely below the fold
const HowItWorksNew = lazy(() => import('../components/HowItWorksNew'));
const TrustBar = lazy(() => import('../components/TrustBar'));
const PriceExamples = lazy(() => import('../components/PriceExamples'));
const CompetitorComparison = lazy(() => import('../components/CompetitorComparison'));
const WhyChooseFertigo = lazy(() => import('../components/WhyChooseFertigo'));
const PopularServices = lazy(() => import('../components/PopularServices'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const PartnerLogos = lazy(() => import('../components/PartnerLogos'));
const FAQ = lazy(() => import('../components/FAQ'));
const CTA = lazy(() => import('../components/CTA'));


// --- Custom Skeleton Loaders for each section ---

const SocialProofSkeleton: React.FC = () => (
    <div className="bg-slate-900 border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-6 animate-pulse">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-3">
                <div className="h-6 w-48 bg-slate-700 rounded-md"></div>
                <div className="h-5 w-72 bg-slate-700 rounded-md"></div>
            </div>
        </div>
    </div>
);

const StatsSkeleton: React.FC = () => (
    <div className="bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4 py-6 animate-pulse">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center justify-center space-y-2">
                        <div className="h-8 w-24 bg-slate-700 rounded-md"></div>
                        <div className="h-4 w-32 bg-slate-700 rounded-md"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const FeaturesSkeleton: React.FC = () => (
    <div className="py-24 sm:py-32 bg-white w-full">
        <div className="container mx-auto px-6">
            <div className="animate-pulse max-w-3xl mx-auto">
                <div className="h-8 bg-slate-200 rounded-md w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-slate-200 rounded-md w-5/6 mx-auto mt-2"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center animate-pulse">
                        <div className="w-20 h-20 bg-slate-200 rounded-full mb-6"></div>
                        <div className="h-6 bg-slate-200 rounded-md w-1/2 mb-2"></div>
                        <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                        <div className="h-4 bg-slate-200 rounded-md w-3/4 mt-2"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const PopularServicesSkeleton: React.FC = () => (
    <div className="py-20 sm:py-24 bg-slate-50 w-full">
        <div className="container mx-auto px-6">
            <div className="animate-pulse text-center mb-12">
                <div className="h-8 bg-slate-300 rounded-md w-1/2 mx-auto mb-2"></div>
                <div className="h-4 bg-slate-300 rounded-md w-2/3 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-lg animate-pulse">
                        <div className="bg-slate-200 h-48"></div>
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-7 h-7 bg-slate-200 rounded-full"></div>
                                <div className="h-6 bg-slate-200 rounded-md w-1/3"></div>
                            </div>
                            <div className="h-4 bg-slate-100 rounded-md w-full mb-2"></div>
                            <div className="h-4 bg-slate-100 rounded-md w-3/4"></div>
                            <div className="mt-4 h-4 bg-slate-200 rounded-md w-1/4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const CompetitorComparisonSkeleton: React.FC = () => (
    <div className="py-24 sm:py-32 bg-slate-50 w-full">
        <div className="container mx-auto px-6 animate-pulse">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <div className="h-10 bg-slate-300 rounded-md w-3/4 mx-auto mb-4"></div>
                <div className="h-5 bg-slate-300 rounded-md w-full mx-auto mt-2"></div>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {[...Array(2)].map((_, colIndex) => (
                    <div key={colIndex} className={`p-8 rounded-2xl ${colIndex === 0 ? 'bg-slate-200' : 'bg-white'}`}>
                        <div className="h-8 w-1/2 bg-slate-300 rounded-md mb-8 mx-auto"></div>
                        <div className="flex justify-center items-center h-48 mb-8">
                            <div className="w-48 h-48 bg-slate-300 rounded-full"></div>
                        </div>
                        <div className="space-y-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-slate-300 rounded-full flex-shrink-0"></div>
                                    <div className="flex-1 space-y-2 pt-1">
                                        <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                                        <div className="h-3 bg-slate-300 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


const TestimonialsSkeleton: React.FC = () => (
    <div className="bg-slate-50 py-20 sm:py-24 w-full overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="animate-pulse text-center mb-16 max-w-3xl mx-auto">
                <div className="h-9 bg-slate-200 rounded-md w-3/4 mx-auto"></div>
                <div className="h-5 bg-slate-200 rounded-md w-full mx-auto mt-4"></div>
            </div>
        </div>
        <div className="w-full">
            <ul className="flex gap-8 px-6 lg:px-8">
                {[...Array(3)].map((_, i) => (
                    <li key={i} className="w-[90%] max-w-sm sm:w-96 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg p-6 space-y-4 animate-pulse">
                            <div className="h-6 w-2/3 bg-slate-200 rounded-md"></div>
                            <div className="flex items-center">
                                <div className="h-5 w-24 bg-slate-200 rounded-md"></div>
                            </div>
                            <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                            <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                            <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>
                            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                                <div className="w-1/2">
                                    <div className="h-5 bg-slate-200 rounded-md w-2/3"></div>
                                    <div className="h-4 bg-slate-200 rounded-md w-1/3 mt-2"></div>
                                </div>
                                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className="container mx-auto px-6 mt-16">
            <div className="animate-pulse flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3">
                <div className="h-6 w-40 bg-slate-300 rounded-md"></div>
                <div className="h-5 w-64 bg-slate-300 rounded-md"></div>
            </div>
        </div>
    </div>
);

const PartnerLogosSkeleton: React.FC = () => (
    <div className="bg-slate-50 py-16 sm:py-20 animate-pulse">
        <div className="container mx-auto px-6">
            <div className="h-6 w-3/4 bg-slate-200 rounded-md mx-auto mb-12"></div>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 w-24 bg-slate-200 rounded-md"></div>
                ))}
            </div>
        </div>
    </div>
);

const CTASkeleton: React.FC = () => (
    <div className="bg-slate-900 py-20 animate-pulse">
        <div className="container mx-auto px-6 text-center">
            <div className="h-10 w-1/2 bg-slate-700 rounded-md mx-auto mb-4"></div>
            <div className="h-5 w-3/4 bg-slate-700 rounded-md mx-auto mb-8"></div>
            <div className="h-12 w-64 bg-slate-700 rounded-lg mx-auto"></div>
        </div>
    </div>
);



const HomePage: React.FC = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Fertigo",
        "url": "https://fertigo.ch/",
        "logo": "https://fertigo.ch/favicon.svg",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+41-44-123-45-67",
            "contactType": "Customer Service"
        },
        "description": "Vergleichen Sie kostenlose Offerten von über 2'500 geprüften Dienstleistern in der Schweiz. Beschreiben Sie Ihr Projekt und erhalten Sie Angebote für Handwerker, Umzug, Reinigung und mehr. Sparen Sie Zeit und Geld."
    };

    return (
        <div className="mx-auto lg:w-full overflow-hidden lg:overflow-visible">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Hero />
            <LazyLoad fallback={<FeaturesSkeleton />}>
                <HowItWorksNew />
            </LazyLoad>
            <LazyLoad fallback={<PopularServicesSkeleton />}>
                <PopularServices />
            </LazyLoad>
            <LazyLoad fallback={<SocialProofSkeleton />}>
                <TrustBar />
            </LazyLoad>
            <LazyLoad fallback={<FeaturesSkeleton />}>
                <PriceExamples />
            </LazyLoad>
            <LazyLoad fallback={<FeaturesSkeleton />}>
                <WhyChooseFertigo />
            </LazyLoad>
            <LazyLoad fallback={<TestimonialsSkeleton />}>
                <Testimonials />
            </LazyLoad>
            <LazyLoad fallback={<FeaturesSkeleton />}>
                <FAQ />
            </LazyLoad>
            <LazyLoad fallback={<PartnerLogosSkeleton />}>
                <PartnerLogos />
            </LazyLoad>
            <LazyLoad fallback={<CTASkeleton />}>
                <CTA />
            </LazyLoad>
            <StickyCta />
        </div>
    );
};

export default HomePage;