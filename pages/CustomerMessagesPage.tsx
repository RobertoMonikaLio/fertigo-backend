import React from 'react';

const CustomerMessagesPage: React.FC = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">Nachrichten</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal mt-2">Kommunizieren Sie direkt mit den Anbietern.</p>
            </header>
            <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-lg border border-border-light dark:border-border-dark text-center min-h-[400px] flex flex-col justify-center items-center">
                <span className="material-symbols-outlined text-5xl text-gray-400 dark:text-gray-500">chat</span>
                <h3 className="text-text-light dark:text-text-dark text-lg font-bold mt-4">Nachrichten-Funktion in Kürze verfügbar</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto mt-2">Wir arbeiten daran, Ihnen hier eine nahtlose Kommunikation mit den Handwerkern zu ermöglichen.</p>
            </div>
        </div>
    );
};

export default CustomerMessagesPage;
