import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SpinnerIcon } from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_provider');
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
    customerName: string;
    customerAvatar: string;
    projectTitle: string;
    messages: Message[];
    unread: boolean;
    updatedAt: string;
}

const getInitials = (name: string) => {
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

// --- Skeleton ---
const ToolsSkeleton = () => (
    <div className="flex h-[calc(100vh-5rem)] w-[calc(100%+4rem)] -my-10 -mx-8">
        <div className="flex bg-white rounded-xl border border-slate-200 shadow-sm w-full h-full animate-pulse">
            <aside className="w-full max-w-sm border-r border-slate-200 p-4 space-y-4">
                <div className="h-8 bg-slate-200 rounded w-32" />
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3 p-3">
                        <div className="w-12 h-12 rounded-full bg-slate-200" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-slate-200 rounded w-24" />
                            <div className="h-3 bg-slate-100 rounded w-full" />
                        </div>
                    </div>
                ))}
            </aside>
            <main className="flex-1 flex items-center justify-center">
                <div className="h-6 bg-slate-200 rounded w-48" />
            </main>
        </div>
    </div>
);

const PartnerToolsPage: React.FC = () => {
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
            const response = await fetch(`${API_URL}/api/partner/conversations`, {
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
    }, []);

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
        setConversations(convs => convs.map(c => c._id === id ? { ...c, unread: false } : c));
        try {
            await fetch(`${API_URL}/api/partner/conversations/${id}`, {
                headers: getAuthHeaders(),
            });
        } catch (err) { /* silent */ }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !activeConversationId) return;

        setSending(true);
        try {
            const response = await fetch(`${API_URL}/api/partner/conversations/${activeConversationId}/messages`, {
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

    if (loading) return <ToolsSkeleton />;

    if (error) {
        return (
            <div className="flex h-[calc(100vh-5rem)] w-[calc(100%+4rem)] -my-10 -mx-8 items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
                    <p className="text-red-600 font-bold text-lg mb-2">Fehler beim Laden</p>
                    <p className="text-red-500 mb-4">{error}</p>
                    <button onClick={() => { setLoading(true); fetchConversations(); }} className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700">
                        Erneut versuchen
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-5rem)] w-[calc(100%+4rem)] -my-10 -mx-8">
            <div className="flex bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full">
                {/* Conversations List */}
                <aside className="w-full max-w-sm border-r border-slate-200 dark:border-slate-800 flex flex-col">
                    <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Nachrichten</h2>
                        <span className="text-green-600 font-semibold text-sm">● Live</span>
                    </header>
                    <div className="overflow-y-auto flex-grow">
                        {conversations.length === 0 ? (
                            <div className="p-6 text-center text-slate-500">
                                <p className="font-semibold">Keine Nachrichten</p>
                                <p className="text-sm mt-1">Nachrichten von Kunden erscheinen hier.</p>
                            </div>
                        ) : (
                            conversations.map(conv => (
                                <button
                                    key={conv._id}
                                    onClick={() => handleSelectConversation(conv._id)}
                                    className={`w-full text-left p-4 flex items-start gap-4 transition-colors border-l-4 ${activeConversationId === conv._id ? 'bg-primary/10 dark:bg-primary/20 border-primary' : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                >
                                    {conv.customerAvatar ? (
                                        <img src={conv.customerAvatar} alt={conv.customerName} className="w-12 h-12 rounded-full flex-shrink-0" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-700 font-bold">
                                            {getInitials(conv.customerName)}
                                        </div>
                                    )}
                                    <div className="flex-grow overflow-hidden">
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-text-light dark:text-text-dark truncate">{conv.customerName}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
                                                {conv.messages.length > 0 ? formatTimestamp(conv.messages[conv.messages.length - 1].timestamp) : ''}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                                                {conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].text : conv.projectTitle}
                                            </p>
                                            {conv.unread && <div className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0 mt-1 animate-pulse"></div>}
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </aside>

                {/* Active Chat */}
                <main className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark">
                    {activeConversation ? (
                        <>
                            <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0 bg-white dark:bg-card-dark">
                                <h3 className="font-bold text-lg text-text-light dark:text-text-dark">{activeConversation.customerName}</h3>
                                <p className="text-sm text-primary dark:text-primary/80">{activeConversation.projectTitle}</p>
                            </header>
                            <div className="flex-grow p-6 overflow-y-auto">
                                <div className="space-y-6">
                                    {activeConversation.messages.map((msg, idx) => (
                                        <div key={msg._id || idx} className={`flex items-end gap-3 max-w-xl ${msg.sender === 'partner' ? 'flex-row-reverse ml-auto' : 'mr-auto'}`}>
                                            {msg.sender === 'customer' && (
                                                activeConversation.customerAvatar ? (
                                                    <img src={activeConversation.customerAvatar} alt={activeConversation.customerName} className="w-8 h-8 rounded-full mb-1 flex-shrink-0" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mb-1 text-primary-700 text-xs font-bold">
                                                        {getInitials(activeConversation.customerName)}
                                                    </div>
                                                )
                                            )}
                                            <div className={`p-3 rounded-2xl shadow-sm ${msg.sender === 'partner' ? 'bg-primary text-white rounded-br-lg' : 'bg-white dark:bg-slate-700 text-text-light dark:text-text-dark rounded-bl-lg'}`}>
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                <p className={`text-xs mt-1.5 ${msg.sender === 'partner' ? 'text-blue-100/70 text-right' : 'text-slate-400 dark:text-slate-500 text-left'}`}>
                                                    {formatTimestamp(msg.timestamp)}
                                                </p>
                                            </div>
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
                                        placeholder="Nachricht eingeben..."
                                        className="flex-grow h-12 bg-slate-100 dark:bg-slate-800 rounded-full px-5 focus:outline-none focus:ring-2 focus:ring-primary dark:text-text-dark"
                                    />
                                    <button type="submit" className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 hover:bg-primary/90 disabled:bg-primary/50 transition-colors" disabled={!newMessage.trim() || sending}>
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
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <p className="text-slate-500 font-semibold">
                                    {conversations.length === 0 ? 'Noch keine Nachrichten vorhanden.' : 'Wählen Sie eine Konversation aus.'}
                                </p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default PartnerToolsPage;
