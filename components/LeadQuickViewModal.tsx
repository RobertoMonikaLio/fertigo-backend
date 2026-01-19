import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useAppContext } from '../pages/AppContext';
import QualityScoreIndicator from './QualityScoreIndicator';
import { 
    XMarkIcon, SpinnerIcon, CheckCircleIcon,
    ListBulletIcon, PaperClipIcon, UserIcon, MapPinIcon,
    MailIcon, PhoneIcon, TagIcon, CalendarDaysIcon, HomeModernIcon, LockClosedIcon,
    ChevronDownIcon, PaperAirplaneIcon, TestsiegerIcon, XCircleIcon, ChatBubbleLeftRightIcon, BanknotesIcon, BellIcon,
    ToolboxIcon, ArrowRightIcon, ArrowDownTrayIcon, PencilSquareIcon, ExclamationTriangleIcon, UsersIcon,
    BriefcaseIcon, StarIcon
} from './icons';


interface LeadQuickViewModalProps {
    leadId: number;
    isOpen: boolean;
    onClose: () => void;
}

type Status = 'Neu' | 'Kontaktiert' | 'Angebot gesendet' | 'In Verhandlung' | 'Gewonnen' | 'Verloren / Abgelehnt';

const statusConfig: { [key in Status]: { icon: React.ReactNode; color: string; bgColor: string; title: string } } = {
    'Neu': { icon: <BellIcon className="w-4 h-4" />, color: 'text-blue-800', bgColor: 'bg-blue-100', title: 'Neu' },
    'Kontaktiert': { icon: <ChatBubbleLeftRightIcon className="w-4 h-4" />, color: 'text-cyan-800', bgColor: 'bg-cyan-100', title: 'Kontaktiert' },
    'Angebot gesendet': { icon: <PaperAirplaneIcon className="w-4 h-4" />, color: 'text-purple-800', bgColor: 'bg-purple-100', title: 'Angebot gesendet' },
    'In Verhandlung': { icon: <BanknotesIcon className="w-4 h-4" />, color: 'text-orange-800', bgColor: 'bg-orange-100', title: 'In Verhandlung' },
    'Gewonnen': { icon: <TestsiegerIcon className="w-4 h-4" />, color: 'text-green-800', bgColor: 'bg-green-100', title: 'Gewonnen' },
    'Verloren / Abgelehnt': { icon: <XCircleIcon className="w-4 h-4" />, color: 'text-red-800', bgColor: 'bg-red-100', title: 'Verloren' },
};

const StatusDropdown: React.FC<{ currentStatus: Status; onStatusChange: (newStatus: Status) => void; }> = ({ currentStatus, onStatusChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentConfig = statusConfig[currentStatus];

    return (
        <div className="relative w-full">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all bg-white font-bold text-sm ${
                    isOpen ? 'border-primary-500 ring-4 ring-primary-100' : 'border-slate-200 hover:border-primary-300'
                }`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${currentConfig.bgColor} ${currentConfig.color}`}>
                        {currentConfig.icon}
                    </div>
                    <span className="text-slate-800">{currentConfig.title}</span>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <ul className="divide-y divide-slate-100">
                        {Object.keys(statusConfig).map(status => {
                            const config = statusConfig[status as Status];
                            const isSelected = currentStatus === status;
                            return (
                                <li key={status}>
                                    <button 
                                        onClick={() => { onStatusChange(status as Status); setIsOpen(false); }} 
                                        className={`w-full text-left flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 transition-colors ${
                                            isSelected ? 'bg-primary-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`${config.color}`}>
                                                {config.icon}
                                            </div>
                                            <span className={`font-bold ${isSelected ? 'text-primary-800' : 'text-slate-700'}`}>{config.title}</span>
                                        </div>
                                        {isSelected && <CheckCircleIcon className="w-5 h-5 text-primary-600" />}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export const LeadQuickViewModal: React.FC<LeadQuickViewModalProps> = ({ leadId, isOpen, onClose }) => {
    const { requests, purchaseLead, purchasedLeadIds, leadPurchaseCounts, updateRequestStatus } = useAppContext();
    const [purchaseState, setPurchaseState] = useState<'idle' | 'loading' | 'success'>('idle');
    const [mounted, setMounted] = useState(false);
    const request = requests.find(r => r.id === leadId);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const isAlreadyPurchased = purchasedLeadIds.includes(leadId);
            setPurchaseState(isAlreadyPurchased ? 'success' : 'idle');
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            if (isOpen) {
                document.body.style.overflow = 'auto';
            }
        };
    }, [isOpen, leadId, purchasedLeadIds]);

    const handleConfirmPurchase = () => {
        if (!request) return;
        setPurchaseState('loading');
        setTimeout(() => {
            purchaseLead(request.id);
            setPurchaseState('success');
        }, 1500);
    };

    const handleClose = () => {
        onClose();
    };

    const handleStatusChange = (newStatus: Status) => {
        if (request) {
            updateRequestStatus(request.id, newStatus);
        }
    }

    // Early returns - but ensure we check mounted state
    if (typeof document === 'undefined' || !document.body) {
        return null;
    }
    
    // Always render the portal when isOpen is true, even if request is not found
    if (!isOpen) {
        return null;
    }
    
    // Wait for mount to ensure portal target exists
    if (!mounted) {
        return null;
    }
    
    // If request not found, show error modal
    if (!request) {
        return createPortal(
            <div 
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-[99999]"
                onClick={handleClose}
                style={{ 
                    zIndex: 99999,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    visibility: 'visible',
                    opacity: 1
                }}
            >
                <div 
                    className="bg-white rounded-2xl p-8 max-w-md m-4"
                    onClick={e => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold mb-4">Lead nicht gefunden</h2>
                    <p className="text-slate-600 mb-6">Der Lead mit der ID {leadId} konnte nicht gefunden werden.</p>
                    <button 
                        onClick={handleClose}
                        className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-700"
                    >
                        Schließen
                    </button>
                </div>
            </div>,
            document.body
        );
    }

    const isPurchased = purchaseState === 'success';
    const isSoldOut = !isPurchased && (leadPurchaseCounts[request.id] || 0) >= 5;
    const availableCount = 5 - (leadPurchaseCounts[request.id] || 0);
    
    const parseGermanDate = (dateString: string) => {
        const months: { [key: string]: number } = {
            'Januar': 0, 'Februar': 1, 'März': 2, 'April': 3, 'Mai': 4, 'Juni': 5,
            'Juli': 6, 'August': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Dezember': 11
        };
        const parts = dateString.replace('.', '').split(' ');
        if (parts.length < 3) return new Date(0);
        const day = parseInt(parts[0], 10);
        const month = months[parts[1]];
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    };

    const leadDate = parseGermanDate(request.date);
    const today = new Date();
    today.setHours(0,0,0,0);
    leadDate.setHours(0,0,0,0);
    const isNew = leadDate.getTime() >= today.getTime();
    
    const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; className?: string }> = ({ icon, title, children, className = '' }) => (
        <div className={`bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden ${className}`}>
            <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b-2 border-slate-100">
                <h3 className="flex items-center gap-3 font-black text-slate-900 text-lg">
                    <div className="p-2 rounded-xl bg-primary-100 text-primary-600">
                        {icon}
                    </div>
                    <span>{title}</span>
                </h3>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
    
    const DetailItem: React.FC<{icon: React.ReactNode, label: string, value: React.ReactNode}> = ({icon, label, value}) => (
        <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">{label}</span>
                <div className="font-bold text-slate-900 text-base">{value}</div>
            </div>
        </div>
    );

    // Ensure we have a valid portal target
    if (!document.body) {
        return null;
    }

    const modalContent = (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            style={{ 
                zIndex: 99999, 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                visibility: 'visible',
                opacity: 1,
                pointerEvents: 'auto',
                overflow: 'auto'
            }}
        >
            <div 
                className="bg-gradient-to-br from-white to-slate-50 w-full max-w-7xl max-h-[95vh] rounded-3xl shadow-2xl flex flex-col border-2 border-slate-200 overflow-hidden"
                onClick={e => e.stopPropagation()}
                style={{ 
                    transform: 'scale(1)',
                    opacity: 1
                }}
            >
                {/* Header */}
                <header className="flex-shrink-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 p-8 rounded-t-3xl relative overflow-hidden">
                    <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}
                    ></div>
                    
                    <div className="relative flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                {isNew && (
                                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                        <StarIcon className="w-4 h-4" />
                                        NEU
                                    </span>
                                )}
                                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-black px-4 py-2 rounded-full border border-white/30">
                                    #{request.id}
                                </span>
                            </div>
                            <h2 className="text-3xl font-black text-white mb-4 leading-tight">{request.title}</h2>
                            <div className="flex flex-wrap items-center gap-4 text-white/90 font-semibold">
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                                    <BriefcaseIcon className="w-5 h-5" />
                                    <span>{request.service}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                                    <MapPinIcon className="w-5 h-5" />
                                    <span>{request.location}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                                    <CalendarDaysIcon className="w-5 h-5" />
                                    <span>{request.date}</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            type="button" 
                            onClick={handleClose} 
                            className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 transition-all hover:scale-110"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </header>
                
                {/* Main Content */}
                <main className="flex-grow p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Left Column - Details */}
                        <div className="lg:col-span-7 space-y-6">
                           <InfoCard title="Projektbeschreibung" icon={<ListBulletIcon className="w-5 h-5"/>}>
                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                                    {request.description}
                                </p>
                            </InfoCard>

                             <InfoCard title="Eckdaten & Anforderungen" icon={<HomeModernIcon className="w-5 h-5"/>}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <DetailItem icon={<BanknotesIcon className="w-5 h-5" />} label="Kundenbudget" value={request.budget || 'Nicht angegeben'} />
                                    <DetailItem icon={<CalendarDaysIcon className="w-5 h-5" />} label="Zeitrahmen" value={request.details.find(d => d.label.includes('Zeitrahmen'))?.value || 'Nicht angegeben'} />
                                    <DetailItem icon={<HomeModernIcon className="w-5 h-5" />} label="Objekttyp" value={request.details.find(d => d.label.includes('Objekttyp'))?.value || 'Nicht angegeben'} />
                                    <DetailItem icon={<UsersIcon className="w-5 h-5" />} label="Besichtigung" value={request.onSiteVisit || 'Nicht angegeben'} />
                                    <DetailItem icon={<ToolboxIcon className="w-5 h-5" />} label="Materialbeschaffung" value={request.materialProcurement || 'Nicht angegeben'} />
                                    {request.onSiteService !== undefined && (
                                        <DetailItem icon={<MapPinIcon className="w-5 h-5" />} label="Vor-Ort-Service" value={request.onSiteService ? 'Zwingend erforderlich' : 'Nicht zwingend'} />
                                    )}
                                     {request.details.filter(d => !['Objekttyp', 'Zeitrahmen'].includes(d.label)).map((d, i) => (
                                        <DetailItem key={i} icon={<CheckCircleIcon className="w-5 h-5" />} label={d.label} value={d.value} />
                                    ))}
                                </div>
                            </InfoCard>
                            
                            {request.additionalNotes && (
                                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl flex items-start gap-4 shadow-lg">
                                    <div className="p-3 rounded-xl bg-amber-100 text-amber-600 flex-shrink-0">
                                        <ExclamationTriangleIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-amber-900 text-sm uppercase mb-2 tracking-wider">Zusätzliche Hinweise vom Kunden</h4>
                                        <p className="text-amber-900 text-sm whitespace-pre-wrap font-medium">{request.additionalNotes}</p>
                                    </div>
                                </div>
                            )}

                            {request.files.length > 0 && (
                                <InfoCard title="Anhänge" icon={<PaperClipIcon className="w-5 h-5"/>}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {request.files.map(file => (
                                            <div key={file.name} className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-slate-200 hover:border-primary-300 transition-all">
                                                <div className="flex items-center gap-3 overflow-hidden flex-1">
                                                    <div className="bg-primary-100 p-2 rounded-lg border border-primary-200">
                                                        <PaperClipIcon className="w-5 h-5 text-primary-600"/>
                                                    </div>
                                                    <span className="font-bold text-sm text-slate-700 truncate">{file.name}</span>
                                                </div>
                                                {isPurchased ? (
                                                    <a href={file.url} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Herunterladen">
                                                        <ArrowDownTrayIcon className="w-5 h-5"/>
                                                    </a>
                                                ) : (
                                                    <div className="p-2 text-slate-400" title="Nach dem Kauf sichtbar">
                                                        <LockClosedIcon className="w-5 h-5"/>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </InfoCard>
                            )}
                        </div>

                        {/* Right Column - Actions */}
                        <div className="lg:col-span-5">
                            <div className="space-y-6 lg:sticky lg:top-8">
                                {isPurchased ? (
                                    <>
                                        <InfoCard title="Status verwalten" icon={<PencilSquareIcon className="w-5 h-5"/>}>
                                            <StatusDropdown currentStatus={request.status as Status} onStatusChange={handleStatusChange} />
                                        </InfoCard>
                                        
                                        <InfoCard title="Kontaktinformationen" icon={<UserIcon className="w-5 h-5"/>}>
                                            <div className="space-y-4">
                                                <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200">
                                                    <p className="font-black text-slate-900 text-lg mb-1">{request.customerInfo.name}</p>
                                                    <p className="text-sm text-slate-600 font-semibold">{request.customerInfo.address}</p>
                                                </div>
                                                <div className="space-y-3 pt-4 border-t border-slate-200">
                                                    <a 
                                                        href={`mailto:${request.customerInfo.email}`} 
                                                        className="flex items-center gap-4 p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-slate-200 hover:border-primary-400 hover:bg-primary-50 transition-all group"
                                                    >
                                                        <div className="p-2 rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-200 transition-colors">
                                                            <MailIcon className="w-5 h-5"/>
                                                        </div>
                                                        <span className="font-bold text-slate-700 group-hover:text-primary-600 transition-colors">{request.customerInfo.email}</span>
                                                    </a>
                                                    {(request.customerInfo.phone || request.customerInfo.mobile) && (
                                                        <a 
                                                            href={`tel:${request.customerInfo.mobile || request.customerInfo.phone}`} 
                                                            className="flex items-center gap-4 p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-slate-200 hover:border-primary-400 hover:bg-primary-50 transition-all group"
                                                        >
                                                            <div className="p-2 rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-200 transition-colors">
                                                                <PhoneIcon className="w-5 h-5"/>
                                                            </div>
                                                            <span className="font-bold text-slate-700 group-hover:text-primary-600 transition-colors">
                                                                {request.customerInfo.mobile || request.customerInfo.phone}
                                                            </span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </InfoCard>

                                        <Link
                                            to={`/partner/requests/${request.id}`}
                                            className="block w-full"
                                        >
                                            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-black text-sm hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                                                Vollständige Ansicht öffnen →
                                            </button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border-2 border-primary-500 shadow-2xl overflow-hidden">
                                            <div className="p-6 text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                                                {isSoldOut ? (
                                                    <div className="p-6 bg-red-50 text-red-700 rounded-xl border-2 border-red-200">
                                                        <XCircleIcon className="w-12 h-12 mx-auto mb-3"/>
                                                        <p className="font-black text-lg mb-2">Ausverkauft</p>
                                                        <p className="text-sm font-semibold">Das Limit von 5 Käufern ist erreicht.</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="flex justify-between items-center mb-6 px-4">
                                                            <div className="text-left">
                                                                <p className="text-xs font-black uppercase tracking-wider opacity-90 mb-1">Lead-Preis</p>
                                                                <p className="text-4xl font-black">CHF {request.price.toFixed(0)}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xs font-black uppercase tracking-wider opacity-90 mb-1">Verfügbar</p>
                                                                <p className={`text-3xl font-black ${availableCount <= 2 ? 'text-orange-300' : 'text-green-300'}`}>
                                                                    {availableCount} <span className="text-lg opacity-75">/ 5</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={handleConfirmPurchase} 
                                                            disabled={purchaseState === 'loading'} 
                                                            className="w-full flex items-center justify-center gap-3 bg-white text-primary-700 font-black px-6 py-4 rounded-xl hover:bg-primary-50 transition-all shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait disabled:transform-none"
                                                        >
                                                            {purchaseState === 'loading' ? (
                                                                <>
                                                                    <SpinnerIcon className="w-5 h-5 animate-spin"/> 
                                                                    Verarbeite...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Lead jetzt kaufen <ArrowRightIcon className="w-5 h-5"/>
                                                                </>
                                                            )}
                                                        </button>
                                                        <p className="text-xs opacity-75 mt-4 font-semibold">Preis exkl. MwSt. • Sofortiger Zugriff</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <InfoCard title="Kundeninformation" icon={<LockClosedIcon className="w-5 h-5"/>} className="relative">
                                            <div className="relative">
                                                <div className="space-y-4 filter blur-sm select-none opacity-40">
                                                    <div className="h-6 bg-slate-200 rounded-lg w-3/4"></div>
                                                    <div className="h-6 bg-slate-200 rounded-lg w-1/2"></div>
                                                    <div className="h-6 bg-slate-200 rounded-lg w-full"></div>
                                                </div>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl border-2 border-dashed border-slate-300">
                                                    <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-2xl shadow-lg mb-3">
                                                        <LockClosedIcon className="w-8 h-8 text-primary-600"/>
                                                    </div>
                                                    <p className="font-black text-slate-800 text-base">Nach dem Kauf sichtbar</p>
                                                    <p className="text-xs text-slate-500 mt-1 font-semibold">Kontaktdaten werden freigeschaltet</p>
                                                </div>
                                            </div>
                                        </InfoCard>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};
