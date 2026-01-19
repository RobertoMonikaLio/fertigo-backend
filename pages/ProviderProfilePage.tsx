

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { providersData } from './ProvidersPage';
import { useAppContext } from './AppContext';
import { 
    StarIcon, MapPinIcon, ShieldCheckIcon, MailIcon, PhoneIcon, ArrowRightIcon,
    PencilIcon, CalendarDaysIcon, UsersIcon, BriefcaseIcon, CheckCircleIcon, QuoteIcon, SpinnerIcon
} from '../components/icons';

interface ProviderProfilePageProps {
    providerId: string;
}

// Component to handle individual image loading state
const GalleryImage: React.FC<{ imgUrl: string; index: number }> = ({ imgUrl, index }) => {
    const [isLoading, setIsLoading] = useState(true);
    const baseUrl = `${imgUrl.split('?')[0]}?auto=format&fit=crop&q=75&fm=webp`;

    return (
        <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden relative group border border-slate-200">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
                    <SpinnerIcon className="w-8 h-8 text-primary-600 animate-spin" />
                </div>
            )}
            <img 
                src={`${baseUrl}&w=400`}
                srcSet={`${baseUrl}&w=200 200w, ${baseUrl}&w=400 400w, ${baseUrl}&w=800 800w`}
                sizes="(min-width: 768px) 25vw, 50vw"
                alt={`Projektbild ${index + 1}`} 
                className={`w-full h-full object-cover transition-all duration-500 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100 group-hover:scale-105'}`}
                onLoad={() => setIsLoading(false)}
                loading="lazy"
                decoding="async"
            />
        </div>
    );
};

const ProviderProfilePage: React.FC<ProviderProfilePageProps> = ({ providerId }) => {
    const { openQuoteModal } = useAppContext();
    const provider = providersData.find(p => p.id === providerId);
    const [activeTab, setActiveTab] = useState('ueber-uns');

    if (!provider) {
        return (
            <div className="text-center py-40">
                <h1 className="text-2xl font-bold text-slate-800">Anbieter nicht gefunden</h1>
                <p className="text-slate-600 mt-2">Dieser Anbieter konnte nicht gefunden werden.</p>
                <Link to="/providers" className="mt-6 inline-block text-primary-600 font-semibold hover:underline">
                    Zurück zum Verzeichnis
                </Link>
            </div>
        );
    }
    
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": provider.name,
        "image": provider.coverImage,
        "telephone": provider.contact.phone,
        "email": provider.contact.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": provider.contact.address.split(',')[0],
            "addressLocality": provider.location,
            "postalCode": provider.contact.address.split(',')[1]?.trim().split(' ')[0],
            "addressCountry": "CH"
        },
        "description": provider.about,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": provider.rating.toString(),
            "reviewCount": provider.reviewCount.toString()
        },
        "review": provider.reviews.map(review => ({
            "@type": "Review",
            "author": { "@type": "Person", "name": review.author },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating.toString()
            },
            "reviewBody": review.text
        }))
    };

    const handleRequestQuote = () => {
        openQuoteModal({
            service: provider.services[0] || 'Allgemein',
            location: provider.location
        });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'services':
                return (
                    <div className="animate-fade-in">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Angebotene Dienstleistungen</h3>
                        <ul className="space-y-4">
                            {provider.services.map(service => (
                                <li key={service} className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border">
                                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                                    <span className="font-semibold text-slate-700">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'gallery':
                return (
                     <div className="animate-fade-in">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Projekt-Galerie</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {provider.gallery.map((img, index) => (
                                <GalleryImage key={index} imgUrl={img} index={index} />
                            ))}
                        </div>
                    </div>
                );
            case 'reviews':
                return (
                    <div className="animate-fade-in">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Kundenbewertungen ({provider.reviewCount})</h3>
                        <div className="space-y-6">
                            {provider.reviews.map((review, index) => (
                                <div key={index} className="bg-slate-50 p-6 rounded-lg border">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-bold text-slate-800">{review.author}</p>
                                        <div className="flex items-center">
                                            {[...Array(review.rating)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 italic">"{review.text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default: // ueber-uns
                return (
                    <div className="animate-fade-in prose max-w-none text-slate-700">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Über {provider.name}</h3>
                        <p>{provider.about}</p>
                    </div>
                );
        }
    };
    
    const TabButton: React.FC<{tabId: string, label: string}> = ({ tabId, label }) => (
        <button 
            onClick={() => setActiveTab(tabId)}
            className={`px-4 py-2.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 ${activeTab === tabId ? 'bg-primary-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
            {label}
        </button>
    );
    
    const coverImageUrl = `${provider.coverImage.split('?')[0]}?auto=format&fit=crop&q=75&fm=webp`;

    return (
        <div className="bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            {/* Header Section */}
            <header className="relative pt-24 pb-16">
                <div className="absolute inset-0">
                    <img 
                        src={`${coverImageUrl}&w=1920`}
                        srcSet={`${coverImageUrl}&w=640 640w, ${coverImageUrl}&w=1024 1024w, ${coverImageUrl}&w=1920 1920w`}
                        sizes="100vw"
                        alt="" 
                        className="h-full w-full object-cover" 
                        loading="eager" 
                        decoding="async" 
                    />
                    <div className="absolute inset-0 bg-slate-900/50" />
                </div>
                <div className="relative container mx-auto px-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full p-2 shadow-lg border-4 border-white flex-shrink-0">
                             <img src={provider.logo} alt={`${provider.name} logo`} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                        </div>
                        <div className="text-white">
                            <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>{provider.name}</h1>
                            <p className="mt-1 text-lg text-slate-200" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>{provider.tagline}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                <div className="flex items-center gap-1.5"><StarIcon className="w-5 h-5 text-yellow-400" /> <span className="font-bold">{provider.rating}</span> ({provider.reviewCount} Bewertungen)</div>
                                <div className="flex items-center gap-1.5"><MapPinIcon className="w-5 h-5 text-slate-300" /> {provider.location}</div>
                                <div className="flex items-center gap-1.5"><ShieldCheckIcon className="w-5 h-5 text-green-400" /> Geprüfter Partner</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left/Main Column */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                             <div className="flex flex-wrap justify-start gap-2 sm:gap-4">
                                <TabButton tabId="ueber-uns" label="Über uns"/>
                                <TabButton tabId="services" label="Dienstleistungen"/>
                                <TabButton tabId="gallery" label="Galerie"/>
                                <TabButton tabId="reviews" label="Bewertungen"/>
                            </div>
                        </div>
                        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80">
                            {renderContent()}
                        </div>
                    </div>
                    
                    {/* Right/Sidebar Column */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 hidden lg:block">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Interessiert?</h3>
                            <p className="text-slate-700 mb-6">Fordern Sie eine kostenlose und unverbindliche Offerte von {provider.name} an.</p>
                            <button onClick={handleRequestQuote} className="w-full bg-primary-600 text-white font-bold px-5 py-3 rounded-lg hover:bg-primary-700 transition-all shadow-md text-lg flex items-center justify-center gap-2">
                                Offerte anfragen <ArrowRightIcon className="w-5 h-5"/>
                            </button>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200/80">
                            <h3 className="p-5 text-lg font-bold text-slate-800 border-b border-slate-200">Auf einen Blick</h3>
                            <ul className="p-6 space-y-4 text-sm">
                                <li className="flex items-center gap-4"><CalendarDaysIcon className="w-5 h-5 text-slate-400"/><span className="text-slate-600">Gegründet:</span><strong className="text-slate-800">{provider.details.founded}</strong></li>
                                <li className="flex items-center gap-4"><UsersIcon className="w-5 h-5 text-slate-400"/><span className="text-slate-600">Mitarbeiter:</span><strong className="text-slate-800">{provider.details.employees}</strong></li>
                                <li className="flex items-center gap-4"><BriefcaseIcon className="w-5 h-5 text-slate-400"/><span className="text-slate-600">UID:</span><strong className="text-slate-800">{provider.details.uid}</strong></li>
                            </ul>
                        </div>
                        
                         <div className="bg-white rounded-xl border border-slate-200/80">
                            <h3 className="p-5 text-lg font-bold text-slate-800 border-b border-slate-200">Kontaktinformationen</h3>
                            <ul className="p-6 space-y-4 text-sm">
                                <li className="flex items-start gap-4"><MapPinIcon className="w-5 h-5 text-slate-400 mt-0.5"/><span className="font-semibold text-slate-700">{provider.contact.address}</span></li>
                                <li className="flex items-center gap-4"><PhoneIcon className="w-5 h-5 text-slate-400"/><a href={`tel:${provider.contact.phone}`} className="font-semibold text-primary-700 hover:underline">{provider.contact.phone}</a></li>
                                <li className="flex items-center gap-4"><MailIcon className="w-5 h-5 text-slate-400"/><a href={`mailto:${provider.contact.email}`} className="font-semibold text-primary-700 hover:underline">{provider.contact.email}</a></li>
                                <li className="flex items-center gap-4"><PencilIcon className="w-5 h-5 text-slate-400"/><a href={`https://${provider.contact.website}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-700 hover:underline">{provider.contact.website}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 border-t border-slate-200 z-40">
                <button onClick={handleRequestQuote} className="w-full bg-primary-600 text-white font-bold px-5 py-3.5 rounded-xl hover:bg-primary-700 transition-all shadow-lg text-lg flex items-center justify-center gap-2">
                    Offerte anfragen <ArrowRightIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
};

export default ProviderProfilePage;
