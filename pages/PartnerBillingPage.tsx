
import React, { useState, useEffect } from 'react';
import { 
    BanknotesIcon, ArrowDownTrayIcon, CreditCardIcon, 
    CheckCircleIcon, TwintIcon, PencilIcon, XMarkIcon, PlusIcon, SpinnerIcon,
    ArrowRightIcon, ShieldCheckIcon, LockClosedIcon
} from '../components/icons';

// --- DATA & TYPES ---

interface PaymentMethod {
    id: number;
    type: 'Kreditkarte' | 'Twint';
    details: string;
    expiry?: string;
    icon: React.ReactNode;
}

const initialPaymentMethods: PaymentMethod[] = [
    { id: 1, type: 'Kreditkarte', details: '**** 4242', expiry: '12/25', icon: <CreditCardIcon className="w-8 h-8"/> },
];

interface Purchase {
    date: string;
    description: string;
    invoiceId: string;
    amount: number; // Positive for top-up, negative for purchase
    status: 'Bezahlt' | 'Ausstehend';
}

const purchaseHistory: Purchase[] = [
    { date: '24. Juli 2024', description: 'Kauf: Lead #2 (Gartenpflege)', invoiceId: '2024-07-24-01', amount: -15.00, status: 'Bezahlt' },
    { date: '23. Juli 2024', description: 'Guthaben aufgeladen', invoiceId: '2024-07-23-02', amount: 100.00, status: 'Bezahlt' },
    { date: '23. Juli 2024', description: 'Kauf: Lead #3 (Umzugsreinigung)', invoiceId: '2024-07-23-01', amount: -15.00, status: 'Bezahlt' },
    { date: '18. Juli 2024', description: 'Kauf: Lead #8 (Umzug)', invoiceId: '2024-07-18-01', amount: -25.00, status: 'Bezahlt' },
    { date: '15. Juli 2024', description: 'Kauf: Lead #12 (Maler)', invoiceId: '2024-07-15-01', amount: -20.00, status: 'Bezahlt' },
];

// --- SUB-COMPONENTS ---

const VisualCreditCard: React.FC<{ method: PaymentMethod, onEdit: () => void, compact?: boolean }> = ({ method, onEdit, compact }) => (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl transition-transform ${compact ? 'p-4 scale-100' : 'p-6 hover:scale-[1.02]'}`}>
        {/* Background decoration */}
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-primary-500/20 blur-2xl"></div>
        
        <div className={`relative z-10 flex flex-col justify-between ${compact ? 'h-28' : 'h-40'}`}>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 opacity-80">
                    {method.type === 'Twint' ? <TwintIcon className={compact ? "w-6 h-6" : "w-8 h-8"} /> : <CreditCardIcon className={compact ? "w-6 h-6" : "w-8 h-8"} />}
                    <span className="font-medium tracking-wide text-sm">{method.type}</span>
                </div>
                {!compact && (
                    <button onClick={onEdit} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <PencilIcon className="w-4 h-4 text-white" />
                    </button>
                )}
            </div>
            
            <div>
                <p className={`${compact ? 'text-lg' : 'text-2xl'} font-mono tracking-widest opacity-90 mb-4`}>{method.details}</p>
                <div className="flex justify-between items-end">
                    <div>
                        {!compact && <p className="text-[10px] uppercase tracking-wider opacity-60">Gültig bis</p>}
                        <p className="font-mono text-sm">{method.expiry || 'Unbegrenzt'}</p>
                    </div>
                    {method.type === 'Kreditkarte' && (
                        <div className="flex flex-col items-end">
                            <div className="flex -space-x-2">
                                <div className={`rounded-full bg-white/20 ${compact ? 'h-5 w-5' : 'h-6 w-6'}`}></div>
                                <div className={`rounded-full bg-white/20 ${compact ? 'h-5 w-5' : 'h-6 w-6'}`}></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const AddPaymentMethodModal: React.FC<{ onClose: () => void, onAdd: (method: Omit<PaymentMethod, 'id'>) => void }> = ({ onClose, onAdd }) => {
    const [methodType, setMethodType] = useState<'Kreditkarte' | 'Twint'>('Kreditkarte');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAdding(true);
        // Simulate API call delay
        setTimeout(() => {
            onAdd({ type: 'Kreditkarte', details: '**** 5678', expiry: '09/28', icon: <CreditCardIcon className="w-8 h-8"/> });
            setIsAdding(false);
        }, 1500);
    };

    const handleAddTwint = () => {
        setIsAdding(true);
        // Simulate API call delay
        setTimeout(() => {
            onAdd({ type: 'Twint', details: 'Verbunden', icon: <TwintIcon className="w-8 h-8"/> });
            setIsAdding(false);
        }, 1500);
    };
    
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-xl font-bold text-slate-900">Zahlungsmethode hinzufügen</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 transition-colors"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <div className="p-6">
                    <div className="flex border border-slate-200 rounded-lg p-1 bg-slate-100 mb-6">
                        <button onClick={() => setMethodType('Kreditkarte')} className={`flex-1 py-2 rounded-md font-bold text-sm transition-all ${methodType === 'Kreditkarte' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-600 hover:bg-slate-200'}`}>Kreditkarte</button>
                        <button onClick={() => setMethodType('Twint')} className={`flex-1 py-2 rounded-md font-bold text-sm transition-all ${methodType === 'Twint' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-600 hover:bg-slate-200'}`}>TWINT</button>
                    </div>

                    {methodType === 'Kreditkarte' ? (
                        <form onSubmit={handleAddCard} className="space-y-5 animate-fade-in">
                             <div>
                                <label htmlFor="card-number" className="block text-sm font-medium text-slate-700 mb-1.5">Kartennummer</label>
                                <div className="relative">
                                    <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input id="card-number" type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 p-3 border-slate-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all" required />
                                </div>
                            </div>
                             <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="expiry-date" className="block text-sm font-medium text-slate-700 mb-1.5">Gültig bis</label>
                                    <input id="expiry-date" type="text" placeholder="MM / JJ" className="w-full p-3 border-slate-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all" required />
                                </div>
                                <div>
                                    <label htmlFor="cvc" className="block text-sm font-medium text-slate-700 mb-1.5">CVC</label>
                                    <div className="relative">
                                        <input id="cvc" type="text" placeholder="123" className="w-full p-3 border-slate-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all" required />
                                        <ShieldCheckIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end border-t border-slate-100 mt-6">
                                <button onClick={onClose} type="button" className="mr-3 px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition-colors">Abbrechen</button>
                                <button type="submit" disabled={isAdding} className="bg-primary-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-primary-700 shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {isAdding ? <><SpinnerIcon className="w-5 h-5 animate-spin"/> Speichern...</> : 'Karte hinzufügen'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center p-4 animate-fade-in">
                            <div className="bg-slate-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 border-2 border-slate-100">
                                <TwintIcon className="w-12 h-12 text-slate-800" />
                            </div>
                            <h4 className="font-bold text-slate-800 text-lg">Mit TWINT verbinden</h4>
                            <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-xs mx-auto">Sie werden zur TWINT App weitergeleitet, um die Verknüpfung für automatische Zahlungen sicher zu bestätigen.</p>
                             <div className="pt-8 mt-4 flex justify-end">
                                <button onClick={handleAddTwint} disabled={isAdding} className="w-full bg-black text-white font-bold py-3.5 px-5 rounded-xl hover:bg-slate-800 shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all disabled:opacity-70">
                                    {isAdding ? <SpinnerIcon className="w-5 h-5 animate-spin"/> : <TwintIcon className="w-5 h-5 text-white"/>}
                                    {isAdding ? 'Verbinde...' : 'Jetzt mit TWINT verbinden'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TopUpConfirmationModal: React.FC<{
    amount: string;
    method: PaymentMethod;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}> = ({ amount, method, onClose, onConfirm, isLoading }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    const baseAmount = parseFloat(amount);
    const fee = baseAmount * 0.01; // 1% fee
    const total = baseAmount + fee;

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <BanknotesIcon className="w-6 h-6 text-primary-600" />
                        Guthaben aufladen
                    </h3>
                    <button onClick={onClose} disabled={isLoading} className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    <div className="text-center py-4">
                        <p className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-1">Gutschrift für Konto</p>
                        <p className="text-4xl font-extrabold text-green-600">CHF {baseAmount.toFixed(2)}</p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-3">Zahlungsmethode</p>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                            <div className="bg-slate-100 p-2 rounded-md text-slate-600">
                                {method.type === 'Twint' ? <TwintIcon className="w-5 h-5"/> : <CreditCardIcon className="w-5 h-5"/>}
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 text-sm">{method.type}</p>
                                <p className="text-xs text-slate-500">{method.details}</p>
                            </div>
                            <div className="ml-auto text-green-600">
                                <CheckCircleIcon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm border-t border-slate-100 pt-4">
                        <div className="flex justify-between text-slate-600">
                            <span>Zwischensumme (Aufladung)</span>
                            <span>CHF {baseAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Bearbeitungsgebühr (1%)</span>
                            <span>CHF {fee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-slate-900 text-lg pt-2 border-t border-slate-100 mt-2">
                            <span>Zu zahlender Betrag</span>
                            <span>CHF {total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-slate-50 border-t border-slate-200 flex gap-3">
                    <button onClick={onClose} disabled={isLoading} className="flex-1 py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50">
                        Abbrechen
                    </button>
                    <button onClick={onConfirm} disabled={isLoading} className="flex-1 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-primary-400">
                        {isLoading ? <><SpinnerIcon className="w-5 h-5 animate-spin" /> Verarbeitung...</> : <><LockClosedIcon className="w-4 h-4"/> Aufladen</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const baseClass = "px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit";
    if (status === 'Bezahlt') {
        return <span className={`${baseClass} bg-green-100 text-green-800`}><CheckCircleIcon className="w-3 h-3" /> {status}</span>;
    }
    return <span className={`${baseClass} bg-yellow-100 text-yellow-800`}><SpinnerIcon className="w-3 h-3" /> {status}</span>;
};

const TransactionAmount: React.FC<{ amount: number }> = ({ amount }) => {
    const isPositive = amount > 0;
    const colorClass = isPositive ? 'text-green-600 bg-green-50 border-green-200' : 'text-slate-700 bg-slate-50 border-slate-200';
    const sign = isPositive ? '+' : '';
    return (
        <span className={`font-bold px-3 py-1 rounded-lg border text-sm ${colorClass}`}>
            {sign} CHF {Math.abs(amount).toFixed(2)}
        </span>
    );
};

// --- MAIN PAGE COMPONENT ---
const PartnerBillingPage: React.FC = () => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
    const [defaultMethodId, setDefaultMethodId] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentBalance, setCurrentBalance] = useState(45.00);
    const [topUpAmount, setTopUpAmount] = useState('100');
    const [isToppingUp, setIsToppingUp] = useState(false);
    const [topUpSuccess, setTopUpSuccess] = useState(false);
    const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);

    
    const handleAddMethod = (newMethodData: Omit<PaymentMethod, 'id'>) => {
        const newMethod = { ...newMethodData, id: Date.now() };
        setPaymentMethods(prev => [...prev, newMethod]);
        setIsAddModalOpen(false);
    };

    const defaultMethod = paymentMethods.find(m => m.id === defaultMethodId) || paymentMethods[0];

    const initiateTopUp = () => {
        const amount = parseFloat(topUpAmount);
        if (isNaN(amount) || amount <= 0) return;
        setIsTopUpModalOpen(true);
    };

    const handleConfirmTopUp = () => {
        setIsToppingUp(true);
        setTopUpSuccess(false);

        const amount = parseFloat(topUpAmount);

        setTimeout(() => {
            setCurrentBalance(prev => prev + amount);
            setIsToppingUp(false);
            setIsTopUpModalOpen(false);
            setTopUpSuccess(true);
            setTimeout(() => setTopUpSuccess(false), 4000);
        }, 1500);
    };


    return (
        <div className="max-w-6xl mx-auto">
            {isAddModalOpen && <AddPaymentMethodModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddMethod} />}
            
            {isTopUpModalOpen && (
                <TopUpConfirmationModal 
                    amount={topUpAmount} 
                    method={defaultMethod} 
                    onClose={() => setIsTopUpModalOpen(false)} 
                    onConfirm={handleConfirmTopUp}
                    isLoading={isToppingUp}
                />
            )}
            
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* LEFT COLUMN: Transactions (Main Content) */}
                <div className="lg:w-2/3 order-2 lg:order-1 space-y-6">
                     <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h3 className="text-lg font-bold text-slate-800">Transaktionen & Rechnungen</h3>
                            <div className="flex gap-2">
                                <select className="text-sm border-slate-200 rounded-lg py-2 pl-3 pr-8 bg-slate-50 focus:ring-primary-500 focus:border-primary-500">
                                    <option>Alle</option>
                                    <option>Käufe</option>
                                    <option>Aufladungen</option>
                                </select>
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold w-32">Datum</th>
                                        <th className="px-6 py-4 font-semibold">Beschreibung</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right">Betrag</th>
                                        <th className="px-6 py-4 font-semibold text-center w-20">PDF</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {purchaseHistory.map((item, index) => (
                                        <tr key={index} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{item.date}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-700">{item.description}</div>
                                                <div className="text-xs text-slate-400">{item.invoiceId}</div>
                                            </td>
                                            <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                            <td className="px-6 py-4 text-right"><TransactionAmount amount={item.amount} /></td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="p-2 text-slate-300 hover:text-primary-600 transition-colors rounded-full hover:bg-primary-50" title="Rechnung herunterladen">
                                                    <ArrowDownTrayIcon className="w-5 h-5"/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {purchaseHistory.length === 0 && (
                            <div className="text-center p-12">
                                <p className="font-semibold text-slate-700">Noch keine Käufe getätigt.</p>
                            </div>
                        )}
                        <div className="p-4 border-t border-slate-100 bg-slate-50/30 text-center">
                            <button className="text-sm font-semibold text-primary-600 hover:text-primary-700">Mehr anzeigen</button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Wallet & Actions */}
                <div className="lg:w-1/3 order-1 lg:order-2 space-y-6">
                    
                    {/* Balance Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-bl-full -mr-8 -mt-8"></div>
                        
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Verfügbares Guthaben</p>
                                <h2 className="text-4xl font-black text-slate-900 mt-1 tracking-tight">CHF {currentBalance.toFixed(2)}</h2>
                            </div>
                            <div className="bg-green-100 p-2 rounded-full">
                                <BanknotesIcon className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        
                        {topUpSuccess && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg mb-4 text-sm font-medium flex items-center gap-2 animate-fade-in"><CheckCircleIcon className="w-4 h-4"/> Guthaben aufgeladen!</div>}
                        
                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-sm font-semibold text-slate-700 mb-3">Schnell aufladen:</p>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {['50', '100', '200'].map(amount => (
                                    <button 
                                        key={amount} 
                                        onClick={() => setTopUpAmount(amount)}
                                        className={`py-2 px-1 rounded-lg font-bold text-sm border-2 transition-all ${topUpAmount === amount ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-slate-200 bg-white text-slate-600 hover:border-primary-300'}`}
                                    >
                                        {amount}.-
                                    </button>
                                ))}
                            </div>
                            
                            <div className="relative mb-4">
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 font-bold">CHF</span>
                                <input type="number" value={topUpAmount} onChange={e => setTopUpAmount(e.target.value)} className="w-full pl-12 pr-4 py-3 border-slate-300 rounded-xl shadow-sm focus:ring-primary-500 focus:border-primary-500 font-bold text-slate-800" />
                            </div>

                            <button onClick={initiateTopUp} className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                                Guthaben aufladen <ArrowRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                        <div className="flex justify-between items-center mb-4 px-1">
                            <h3 className="text-lg font-bold text-slate-800">Zahlungsmethode</h3>
                            <button onClick={() => setIsAddModalOpen(true)} className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                                <PlusIcon className="w-4 h-4" /> Neu
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {defaultMethod && (
                                <VisualCreditCard method={defaultMethod} onEdit={() => {}} compact={true} />
                            )}
                            
                            {/* Other Methods List */}
                            {paymentMethods.length > 1 && (
                                <div className="bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
                                    {paymentMethods.filter(m => m.id !== defaultMethodId).map(method => (
                                        <div key={method.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="text-slate-400 bg-slate-100 p-2 rounded-md group-hover:bg-white group-hover:text-slate-600 transition-colors">
                                                    {method.type === 'Twint' ? <TwintIcon className="w-5 h-5" /> : <CreditCardIcon className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-700">{method.type}</p>
                                                    <p className="text-xs text-slate-500">{method.details}</p>
                                                </div>
                                            </div>
                                            <button className="text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Als Standard
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PartnerBillingPage;
