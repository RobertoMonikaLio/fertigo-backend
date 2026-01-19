
import React, { useState } from 'react';
import { BellIcon, AdjustmentsHorizontalIcon, LockClosedIcon, CheckCircleIcon } from '../components/icons';

const services = [
    'Malerarbeiten', 'Gipserarbeiten', 'Bodenleger', 'Reinigung', 'Umzugsreinigung', 
    'Umzug & Transport', 'Gartenpflege', 'Sanitär & Heizung', 'Elektriker', 
    'Schreiner', 'Küchenbau', 'Dachdecker', 'Fenstermontage'
];

const ToggleSwitch: React.FC<{ label: string; description: string; enabled: boolean; setEnabled: (enabled: boolean) => void; }> = ({ label, description, enabled, setEnabled }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-200 last:border-b-0">
        <div>
            <p className="font-semibold text-slate-800">{label}</p>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
        <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`${enabled ? 'bg-primary' : 'bg-slate-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2`}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
        </button>
    </div>
);

const PartnerSettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('notifications');
    const [showSuccess, setShowSuccess] = useState(false);
    
    // States for notifications
    const [leadNotifications, setLeadNotifications] = useState(true);
    const [messageNotifications, setMessageNotifications] = useState(true);
    const [weeklyReport, setWeeklyReport] = useState(false);

    // States for lead filters
    const [zipCodes, setZipCodes] = useState('8000-8999, 6000-6999');
    const [selectedServices, setSelectedServices] = useState(['Malerarbeiten', 'Gipserarbeiten']);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleServiceToggle = (service: string) => {
        setSelectedServices(prev => 
            prev.includes(service) 
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'notifications':
                return (
                    <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-1">Benachrichtigungen</h2>
                        <p className="text-slate-600 mb-6">Legen Sie fest, wie wir Sie informieren dürfen.</p>
                        <ToggleSwitch label="Neue Lead-Empfehlungen" description="Sofortige E-Mail bei neuen, passenden Leads." enabled={leadNotifications} setEnabled={setLeadNotifications} />
                        <ToggleSwitch label="Neue Nachrichten" description="Benachrichtigung bei neuen Nachrichten von Kunden." enabled={messageNotifications} setEnabled={setMessageNotifications} />
                        <ToggleSwitch label="Wöchentlicher Report" description="Erhalten Sie jeden Montag eine Zusammenfassung." enabled={weeklyReport} setEnabled={setWeeklyReport} />
                        <div className="mt-6 flex justify-end">
                            <button type="submit" className="bg-primary px-5 py-2.5 text-sm font-bold text-white rounded-lg hover:bg-primary/90">Änderungen speichern</button>
                        </div>
                    </form>
                );
            case 'lead-filters':
                 return (
                    <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-1">Lead-Filter</h2>
                            <p className="text-slate-600">Definieren Sie, welche Aufträge für Sie relevant sind.</p>
                        </div>
                        <div>
                            <label htmlFor="zip-codes" className="block text-sm font-medium text-slate-700 mb-2">Bevorzugte Regionen (PLZ-Bereiche)</label>
                            <textarea id="zip-codes" value={zipCodes} onChange={e => setZipCodes(e.target.value)} rows={3} className="w-full border-slate-300 rounded-lg p-3" placeholder="z.B. 8000-8999, 6000-6999, 3000-3999"></textarea>
                            <p className="text-xs text-slate-500 mt-1">Trennen Sie einzelne PLZ oder Bereiche mit Kommas.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Bevorzugte Dienstleistungen</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {services.map(service => (
                                    <label key={service} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${selectedServices.includes(service) ? 'bg-primary/10 border-primary text-primary' : 'border-slate-300 hover:bg-slate-50'}`}>
                                        <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => handleServiceToggle(service)} className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                                        <span className="text-sm font-medium">{service}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                         <div className="mt-6 flex justify-end">
                            <button type="submit" className="bg-primary px-5 py-2.5 text-sm font-bold text-white rounded-lg hover:bg-primary/90">Filter speichern</button>
                        </div>
                    </form>
                );
            case 'security':
                return (
                    <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h2 className="text-xl font-bold text-slate-900 mb-1">Sicherheit</h2>
                        <p className="text-slate-600 mb-6">Ändern Sie hier Ihr Passwort.</p>
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-slate-700 mb-2">Aktuelles Passwort</label>
                            <input type="password" id="current-password" className="w-full border-slate-300 rounded-lg p-3" />
                        </div>
                         <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 mb-2">Neues Passwort</label>
                            <input type="password" id="new-password" className="w-full border-slate-300 rounded-lg p-3" />
                        </div>
                         <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-2">Neues Passwort bestätigen</label>
                            <input type="password" id="confirm-password" className="w-full border-slate-300 rounded-lg p-3" />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button type="submit" className="bg-primary px-5 py-2.5 text-sm font-bold text-white rounded-lg hover:bg-primary/90">Passwort ändern</button>
                        </div>
                    </form>
                );
            default: return null;
        }
    };
    
    const TabButton: React.FC<{ tabId: string, label: string, icon: React.ReactNode }> = ({ tabId, label, icon }) => (
        <button 
            onClick={() => setActiveTab(tabId)}
            className={`flex items-center gap-3 p-3 rounded-lg font-bold w-full text-left transition-colors ${activeTab === tabId ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    return (
        <div className="max-w-4xl mx-auto">
            {showSuccess && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-3" role="alert">
                    <CheckCircleIcon className="w-6 h-6" />
                    <p className="font-bold">Einstellungen erfolgreich gespeichert!</p>
                </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3 w-full">
                    <nav className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <TabButton tabId="notifications" label="Benachrichtigungen" icon={<BellIcon className="w-5 h-5"/>} />
                        <TabButton tabId="lead-filters" label="Lead-Filter" icon={<AdjustmentsHorizontalIcon className="w-5 h-5"/>} />
                        <TabButton tabId="security" label="Sicherheit" icon={<LockClosedIcon className="w-5 h-5"/>} />
                    </nav>
                </div>
                <div className="md:w-2/3 w-full">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default PartnerSettingsPage;
