import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SpinnerIcon } from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_customer');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

interface Message {
    _id?: string;
    sender: 'partner' | 'customer';
    text: string;
    timestamp: string;
}

interface Conversation {
    _id: string;
    providerId: any; // Can be object if populated
    providerName?: string; // We'll try to get this
    customerName: string;
    projectTitle: string;
    messages: Message[];
    unread: boolean;
    updatedAt: string;
}

const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return date.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 1) return 'Gestern';
    if (diffDays < 7) return `Vor ${diffDays} Tagen`;
    return date.toLocaleDateString('de-CH');
};

const MessagesSkeleton = () => (
    <div className="flex h-[calc(100vh-10rem)] w-full">
        <div className="flex bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full animate-pulse">
            <aside className="w-full max-w-sm border-r border-slate-200 dark:border-slate-800 p-4 space-y-4">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-32" />
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3 p-3">
                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24" />
                            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full" />
                        </div>
                    </div>
                ))}
            </aside>
            <main className="flex-1 flex items-center justify-center">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-48" />
            </main>
        </div>
    </div>
);

const CustomerMessagesPage: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const activeConversation = conversations.find(c => c._id === activeConversationId);

    const fetchConversations = useCallback(async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/customer/conversations`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error('Nachrichten konnten nicht geladen werden');
            const data = await response.json();
            setConversations(data);
            if (data.length > 0 && !activeConversationId) {
                setActiveConversationId(data[0]._id);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [activeConversationId]);

    useEffect(() => {
        fetchConversations();
    }, [fetchConversations]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation, conversations]);

    const handleSelectConversation = async (id: string) => {
        setActiveConversationId(id);
        // Local update for unread status
        setConversations(convs => convs.map(c => c._id === id ? { ...c, unread: false } : c));
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !activeConversationId) return;

        setSending(true);
        try {
            const response = await fetch(`${API_URL}/api/customer/conversations/${activeConversationId}/messages`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ text: newMessage }),
            });
            if (!response.ok) throw new Error('Nachricht konnte nicht gesendet werden');
            const updatedConv = await response.json();

            setConversations(convs =>
                convs.map(c => c._id === activeConversationId ? updatedConv : c)
            );
            setNewMessage('');
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSending(false);
        }
    };

    if (loading) return (
        <div>
            <header className="mb-8">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">Nachrichten</h1>
            </header>
            <MessagesSkeleton />
        </div>
    );

    if (error) {
        return (
            <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center max-w-md">
                    <p className="text-red-600 dark:text-red-400 font-bold text-lg mb-2">Fehler beim Laden</p>
                    <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                    <button onClick={() => { setLoading(true); fetchConversations(); }} className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700">
                        Erneut versuchen
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <header className="mb-8">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">Nachrichten</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal mt-2">
                    Kommunizieren Sie direkt mit Handwerkern zu Ihren Projekten.
                </p>
            </header>

            <div className="flex bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-[600px] overflow-hidden">
                {/* Conversations List */}
                <aside className="w-full max-w-sm border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-card-dark">
                    <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Posteingang</h2>
                    </header>
                    <div className="overflow-y-auto flex-grow">
                        {conversations.length === 0 ? (
                            <div className="p-10 text-center text-slate-500">
                                <span className="material-symbols-outlined text-4xl mb-4 opacity-20">chat_bubble</span>
                                <p className="font-semibold">Keine Nachrichten</p>
                                <p className="text-sm mt-1">Sobald ein Handwerker auf Ihre Anfrage antwortet, erscheint das Gespräch hier.</p>
                            </div>
                        ) : (
                            conversations.map(conv => (
                                <button
                                    key={conv._id}
                                    onClick={() => handleSelectConversation(conv._id)}
                                    className={`w-full text-left p-4 flex items-start gap-4 transition-colors border-l-4 ${activeConversationId === conv._id ? 'bg-primary/5 dark:bg-primary/10 border-primary' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-slate-400 font-bold">
                                        {getInitials(conv.providerName || 'Partner')}
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-text-light dark:text-text-dark truncate">{conv.providerName || 'Fachpartner'}</p>
                                            <p className="text-[10px] text-slate-400 flex-shrink-0 uppercase font-medium">
                                                {conv.messages.length > 0 ? formatTimestamp(conv.messages[conv.messages.length - 1].timestamp) : ''}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                                {conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].text : conv.projectTitle}
                                            </p>
                                            {conv.unread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5 shadow-sm shadow-primary/50"></div>}
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </aside>

                {/* Active Chat */}
                <main className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark/50">
                    {activeConversation ? (
                        <>
                            <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0 bg-white dark:bg-card-dark flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-text-light dark:text-text-dark">{activeConversation.providerName || 'Fachpartner'}</h3>
                                    <p className="text-xs text-primary font-medium">{activeConversation.projectTitle}</p>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded uppercase tracking-wider">Aktiv</span>
                                </div>
                            </header>
                            <div className="flex-grow p-6 overflow-y-auto">
                                <div className="space-y-4">
                                    {activeConversation.messages.map((msg, idx) => (
                                        <div key={msg._id || idx} className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'}`}>
                                            <div className={`max-w-[80%] p-3 px-4 rounded-2xl shadow-sm text-sm ${msg.sender === 'customer' ? 'bg-primary text-white rounded-br-none' : 'bg-white dark:bg-slate-700 text-text-light dark:text-text-dark rounded-bl-none'}`}>
                                                <p className="leading-relaxed">{msg.text}</p>
                                            </div>
                                            <span className="text-[10px] text-slate-400 mt-1 px-1">
                                                {msg.sender === 'customer' ? 'Gesendet' : 'Empfangen'} • {formatTimestamp(msg.timestamp)}
                                            </span>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                            <footer className="p-4 bg-white dark:bg-card-dark border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
                                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        placeholder="Nachricht schreiben..."
                                        className="flex-grow h-12 bg-slate-100 dark:bg-slate-800 rounded-xl px-5 focus:outline-none focus:ring-2 focus:ring-primary dark:text-text-dark border-none transition-all"
                                    />
                                    <button
                                        type="submit"
                                        className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-primary/90 disabled:bg-slate-300 dark:disabled:bg-slate-800 transition-all shadow-md shadow-primary/20"
                                        disabled={!newMessage.trim() || sending}
                                    >
                                        {sending ? (
                                            <SpinnerIcon className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <span className="material-symbols-outlined">send</span>
                                        )}
                                    </button>
                                </form>
                            </footer>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-center p-10">
                            <div>
                                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-4xl text-slate-300">chat</span>
                                </div>
                                <h3 className="text-slate-400 font-bold text-lg">Keine Unterhaltung ausgewählt</h3>
                                <p className="text-slate-400 text-sm mt-1 max-w-xs block mx-auto">Wählen Sie links einen Kontakt aus, um die Nachrichten zu sehen.</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CustomerMessagesPage;
