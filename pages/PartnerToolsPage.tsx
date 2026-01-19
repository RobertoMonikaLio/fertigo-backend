
import React, { useState, useRef, useEffect } from 'react';

// MOCK DATA
const mockConversations = [
    {
        id: 'conv-1',
        customerName: 'Anna Meier',
        projectTitle: 'Malerarbeiten - 3-Zimmer-Wohnung',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        messages: [
            { id: 1, sender: 'customer' as 'customer', text: 'Guten Tag, ich habe eine Frage zu Ihrem Angebot. Sind die Kosten für die Farbberatung inklusive?', timestamp: '14:20' },
            { id: 2, sender: 'partner' as 'partner', text: 'Guten Tag Frau Meier. Ja, eine kurze Farbberatung vor Ort ist im Preis inbegriffen. Haben Sie bereits eine Vorstellung?', timestamp: '14:22' },
            { id: 3, sender: 'customer' as 'customer', text: 'Perfekt, danke! Ich bin mir noch unsicher, wahrscheinlich ein helles Grau.', timestamp: '14:25' },
        ],
        unread: false,
    },
    {
        id: 'conv-2',
        customerName: 'Peter Schmidt',
        projectTitle: 'Gartenpflege für Einfamilienhaus',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        messages: [
            { id: 1, sender: 'customer' as 'customer', text: 'Hallo, danke für das Angebot. Wann hätten Sie Zeit für eine Besichtigung?', timestamp: 'Gestern' },
            { id: 2, sender: 'partner' as 'partner', text: 'Hallo Herr Schmidt. Ich könnte morgen Vormittag um 10:00 Uhr vorbeikommen. Passt das für Sie?', timestamp: 'Gestern' },
            { id: 3, sender: 'customer' as 'customer', text: 'Ja, das passt super. Bis morgen!', timestamp: 'Gestern' },
        ],
        unread: false,
    },
    {
        id: 'conv-3',
        customerName: 'Sandra Keller',
        projectTitle: 'Umzugsreinigung mit Abnahmegarantie',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        messages: [
            { id: 1, sender: 'customer' as 'customer', text: 'Super, vielen Dank für die Bestätigung! Wir freuen uns auf die Zusammenarbeit.', timestamp: 'Vorgestern' },
        ],
        unread: true,
    },
    {
        id: 'conv-4',
        customerName: 'Markus Weber',
        projectTitle: 'Parkettboden schleifen',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        messages: [
            { id: 1, sender: 'partner' as 'partner', text: 'Hallo Herr Weber, ich habe versucht Sie anzurufen. Bitte melden Sie sich, um die Details zu besprechen.', timestamp: '18. Juli' },
        ],
        unread: false,
    },
];

const PartnerToolsPage: React.FC = () => {
    const [conversations, setConversations] = useState(mockConversations);
    const [activeConversationId, setActiveConversationId] = useState('conv-1');
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const activeConversation = conversations.find(c => c.id === activeConversationId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation, conversations]);
    
    const handleSelectConversation = (id: string) => {
        setActiveConversationId(id);
        setConversations(convs => convs.map(c => c.id === id ? {...c, unread: false} : c));
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const newMsg = {
            id: Date.now(),
            sender: 'partner' as 'partner',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' }),
        };

        setConversations(convs =>
            convs.map(c =>
                c.id === activeConversationId
                    ? { ...c, messages: [...c.messages, newMsg] }
                    : c
            )
        );
        setNewMessage('');
    };

    return (
        <div className="flex h-[calc(100vh-5rem)] w-[calc(100%+4rem)] -my-10 -mx-8">
            <div className="flex bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full">
                {/* Conversations List */}
                <aside className="w-full max-w-sm border-r border-slate-200 dark:border-slate-800 flex flex-col">
                    <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Nachrichten</h2>
                         <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                             <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">more_vert</span>
                        </button>
                    </header>
                    <div className="overflow-y-auto flex-grow">
                        {conversations.map(conv => (
                            <button
                                key={conv.id}
                                onClick={() => handleSelectConversation(conv.id)}
                                className={`w-full text-left p-4 flex items-start gap-4 transition-colors border-l-4 ${activeConversationId === conv.id ? 'bg-primary/10 dark:bg-primary/20 border-primary' : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                            >
                                <img src={conv.avatarUrl} alt={conv.customerName} className="w-12 h-12 rounded-full flex-shrink-0" />
                                <div className="flex-grow overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-text-light dark:text-text-dark truncate">{conv.customerName}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">{conv.messages[conv.messages.length - 1].timestamp}</p>
                                    </div>
                                    <div className="flex justify-between items-start gap-2">
                                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{conv.messages[conv.messages.length - 1].text}</p>
                                        {conv.unread && <div className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0 mt-1 animate-pulse"></div>}
                                    </div>
                                </div>
                            </button>
                        ))}
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
                                    {activeConversation.messages.map(msg => (
                                        <div key={msg.id} className={`flex items-end gap-3 max-w-xl ${msg.sender === 'partner' ? 'flex-row-reverse ml-auto' : 'mr-auto'}`}>
                                             {msg.sender === 'customer' && <img src={activeConversation.avatarUrl} alt={activeConversation.customerName} className="w-8 h-8 rounded-full mb-1 flex-shrink-0"/>}
                                            <div className={`p-3 rounded-2xl shadow-sm ${msg.sender === 'partner' ? 'bg-primary text-white rounded-br-lg' : 'bg-white dark:bg-slate-700 text-text-light dark:text-text-dark rounded-bl-lg'}`}>
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                 <p className={`text-xs mt-1.5 ${msg.sender === 'partner' ? 'text-blue-100/70 text-right' : 'text-slate-400 dark:text-slate-500 text-left'}`}>{msg.timestamp}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                            <footer className="p-4 bg-white dark:bg-card-dark border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
                                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                                    <button type="button" className="p-3 text-slate-500 dark:text-slate-400 hover:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                        <span className="material-symbols-outlined">attachment</span>
                                    </button>
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        placeholder="Nachricht eingeben..."
                                        className="flex-grow h-12 bg-slate-100 dark:bg-slate-800 rounded-full px-5 focus:outline-none focus:ring-2 focus:ring-primary dark:text-text-dark"
                                    />
                                    <button type="submit" className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 hover:bg-primary/90 disabled:bg-primary/50 transition-colors" disabled={!newMessage.trim()}>
                                        <span className="material-symbols-outlined">send</span>
                                    </button>
                                </form>
                            </footer>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-slate-500">Wählen Sie eine Konversation aus.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default PartnerToolsPage;
