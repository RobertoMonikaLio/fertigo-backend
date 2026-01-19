
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from './AppContext';

const CustomerRequestDetailPage: React.FC<{ requestId: string }> = ({ requestId }) => {
    const { requests } = useAppContext();
    const request = requests.find(r => r.id.toString() === requestId);

    if (!request) {
        return <div className="p-10 text-center">Anfrage nicht gefunden.</div>;
    }

    return (
        <>
            <Link to="/kunden/dashboard" className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-text-light dark:hover:text-text-dark mb-6">
                <span className="material-symbols-outlined">arrow_back</span>
                Zurück zur Projektübersicht
            </Link>

            <header className="mb-8">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">{request.title}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal mt-2">Hier sehen Sie die Zusammenfassung Ihres Projekts.</p>
            </header>
            
            <div className="space-y-8">
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Projektdetails</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                         <div>
                            <p className="font-semibold text-gray-500 dark:text-gray-400 mb-1">Beschreibung</p>
                            <p className="text-text-light dark:text-text-dark">{request.description}</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold text-gray-500 dark:text-gray-400 mb-1">Dienstleistung</p>
                                <p className="text-text-light dark:text-text-dark">{request.service}</p>
                            </div>
                             <div>
                                <p className="font-semibold text-gray-500 dark:text-gray-400 mb-1">Standort</p>
                                <p className="text-text-light dark:text-text-dark">{request.location}</p>
                            </div>
                             <div>
                                <p className="font-semibold text-gray-500 dark:text-gray-400 mb-1">Erstellt am</p>
                                <p className="text-text-light dark:text-text-dark">{request.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CustomerRequestDetailPage;
