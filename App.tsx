

import React, { Suspense, lazy, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useParams, useLocation, Outlet } from 'react-router-dom';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext, AppProvider } from './pages/AppContext';

import Header from './components/Header';
import Footer from './components/Footer';
import QuoteRequestModal from './components/QuoteRequestModal';
import CookieConsent from './components/CookieConsent';
import { LeadQuickViewModal } from './components/LeadQuickViewModal';
import LiveActivityToast from './components/LiveActivityToast';
import VideoIntro from './components/VideoIntro';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ProvidersPage = lazy(() => import('./pages/ProvidersPage'));
const ProviderProfilePage = lazy(() => import('./pages/ProviderProfilePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceLocationPage = lazy(() => import('./pages/ServiceLocationPage'));
const ImprintPage = lazy(() => import('./pages/ImprintPage'));
const TippsPage = lazy(() => import('./pages/TippsPage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const RentPage = lazy(() => import('./pages/RentPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const VorlagenPage = lazy(() => import('./pages/VorlagenPage'));

// Customer Dashboard Pages
const CustomerDashboardLayout = lazy(() => import('./components/CustomerDashboardLayout'));
const CustomerDashboardPage = lazy(() => import('./pages/CustomerDashboardPage'));
const CustomerRequestDetailPage = lazy(() => import('./pages/CustomerRequestDetailPage'));
const CustomerMessagesPage = lazy(() => import('./pages/CustomerMessagesPage'));
const CustomerSettingsPage = lazy(() => import('./pages/CustomerSettingsPage'));
const CustomerCompareOffersPage = lazy(() => import('./pages/CustomerCompareOffersPage'));


// Partner Dashboard Pages
const PartnerDashboardLayout = lazy(() => import('./components/PartnerDashboardLayout'));
const PartnerDashboardPage = lazy(() => import('./pages/PartnerDashboardPage'));
const PartnerRequestsPage = lazy(() => import('./pages/PartnerRequestsPage'));
const PartnerProfilePage = lazy(() => import('./pages/PartnerProfilePage'));
const PartnerBillingPage = lazy(() => import('./pages/PartnerBillingPage'));
const PartnerJobsPage = lazy(() => import('./pages/PartnerJobsPage'));
const PartnerMarketplacePage = lazy(() => import('./pages/PartnerMarketplacePage'));
const PartnerRequestDetailPage = lazy(() => import('./pages/PartnerRequestDetailPage'));
const PartnerMessagesPage = lazy(() => import('./pages/PartnerMessagesPage'));
const PartnerRentPage = lazy(() => import('./pages/PartnerRentPage'));
const PartnerPricingPage = lazy(() => import('./pages/PartnerPricingPage'));


// Admin Pages
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminPartnersPage = lazy(() => import('./pages/AdminPartnersPage'));
const AdminRequestsPage = lazy(() => import('./pages/AdminRequestsPage'));
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage'));
const AdminFinancePage = lazy(() => import('./pages/AdminFinancePage'));
const AdminProfilePage = lazy(() => import('./pages/AdminProfilePage'));


// A loading spinner for page transitions
const LoadingIndicator: React.FC = () => (
    <div className="flex justify-center items-center py-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error: Error | null }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white rounded-xl border-2 border-red-200 p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-red-800 mb-4">Ein Fehler ist aufgetreten</h2>
                        <p className="text-red-600 mb-4">
                            {this.state.error?.message || 'Die Seite konnte nicht geladen werden.'}
                        </p>
                        <button
                            onClick={() => {
                                this.setState({ hasError: false, error: null });
                                window.location.reload();
                            }}
                            className="w-full bg-primary-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Seite neu laden
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Wrappers for pages that need URL params
const ProviderProfilePageWrapper = () => {
  const { providerId } = useParams<{ providerId: string }>();
  return <ProviderProfilePage providerId={providerId!} />;
};

const PartnerRequestDetailPageWrapper = () => {
  const { requestId } = useParams<{ requestId: string }>();
  return <PartnerRequestDetailPage requestId={requestId!} />;
};

const CustomerRequestDetailPageWrapper = () => {
  const { requestId } = useParams<{ requestId: string }>();
  return <CustomerRequestDetailPage requestId={requestId!} />;
};


// Wrapper for the new dynamic service/location pages
const ServiceLocationPageWrapper = () => {
  return <ServiceLocationPage />;
};

// Custom hook to check for mobile viewport
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};


const AppContent: React.FC = () => {
    const location = useLocation();
    const { 
        isQuoteModalOpen, closeQuoteModal, quoteInitialData,
        isQuickViewOpen, closeQuickView, quickViewLeadId 
    } = useAppContext();

    const isMobile = useIsMobile();
    const [introPlayed, setIntroPlayed] = useState(() => sessionStorage.getItem('introPlayed_v1') === 'true');
    
    const isPublicRoute = !location.pathname.startsWith('/partner') && !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/kunden');
    const onHomePage = location.pathname === '/';

    const handleIntroFinish = () => {
        sessionStorage.setItem('introPlayed_v1', 'true');
        setIntroPlayed(true);
    };

    // Conditionally render the intro video
    if (isMobile && onHomePage && !introPlayed) {
        return <VideoIntro onFinished={handleIntroFinish} />;
    }

    return (
        <div className="bg-white font-sans text-slate-900 antialiased">
            {isPublicRoute && <Header />}
            <main className={!isPublicRoute ? "" : ""}>
                <Suspense fallback={<LoadingIndicator />}>
                    <Routes>
                        {/* Public pages */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/providers" element={<ProvidersPage />} />
                        <Route path="/providers/:providerId" element={<ProviderProfilePageWrapper />} />
                        <Route path="/kontakt" element={<ContactPage />} />
                        <Route path="/preise" element={<PricingPage />} />
                        <Route path="/services/:service/:location" element={<ServiceLocationPageWrapper />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/impressum" element={<ImprintPage />} />
                        <Route path="/ueber-uns" element={<AboutPage />} />
                        <Route path="/tipps" element={<TippsPage />} />
                        <Route path="/vorlagen" element={<VorlagenPage />} />
                        <Route path="/marktplatz" element={<MarketplacePage />} />
                        <Route path="/marktplatz/mieten" element={<RentPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        
                        {/* Customer pages */}
                        <Route element={<CustomerDashboardLayout />}>
                            <Route path="/kunden/dashboard" element={<CustomerDashboardPage />} />
                            <Route path="/kunden/anfragen/:requestId" element={<CustomerRequestDetailPageWrapper />} />
                            
                            <Route path="/kunden/nachrichten" element={<CustomerMessagesPage />} />
                            <Route path="/kunden/einstellungen" element={<CustomerSettingsPage />} />
                            <Route path="/kunden/vergleich/:requestId" element={<CustomerCompareOffersPage />} />
                        </Route>

                        {/* Partner pages with new Layout */}
                        <Route element={<PartnerDashboardLayout />}>
                            <Route path="/partner/dashboard" element={<PartnerDashboardPage />} />
                            <Route path="/partner/requests" element={<PartnerRequestsPage />} />
                            <Route path="/partner/requests/:requestId" element={<PartnerRequestDetailPageWrapper />} />
                            <Route path="/partner/profile" element={<PartnerProfilePage />} />
                            <Route path="/partner/billing" element={<PartnerBillingPage />} />
                            <Route path="/partner/jobs" element={<PartnerJobsPage />} />
                            <Route path="/partner/marketplace" element={<PartnerMarketplacePage />} />
                            <Route path="/partner/marketplace/rent" element={<PartnerRentPage />} />
                            <Route path="/partner/messages" element={<PartnerMessagesPage />} />
                            <Route path="/partner/pricing" element={<PartnerPricingPage />} />
                        </Route>

                        {/* Admin pages */}
                        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                        <Route path="/admin/partners" element={<AdminPartnersPage />} />
                        <Route path="/admin/requests" element={<AdminRequestsPage />} />
                        <Route path="/admin/users" element={<AdminUsersPage />} />
                        <Route path="/admin/finance" element={<AdminFinancePage />} />
                        <Route path="/admin/profile" element={<AdminProfilePage />} />
                        
                        {/* Default Route */}
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                </Suspense>
            </main>
            {isPublicRoute && <Footer />}
            <QuoteRequestModal 
                isOpen={isQuoteModalOpen}
                onClose={closeQuoteModal}
                initialData={quoteInitialData}
            />
            {isQuickViewOpen && quickViewLeadId ? (
                <LeadQuickViewModal 
                    leadId={quickViewLeadId}
                    isOpen={isQuickViewOpen}
                    onClose={closeQuickView}
                />
            ) : null}
            {isPublicRoute && <CookieConsent />}
            {isPublicRoute && <LiveActivityToast />}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <AppProvider>
                <HashRouter>
                    <AppContent />
                </HashRouter>
            </AppProvider>
        </ErrorBoundary>
    );
};

export default App;