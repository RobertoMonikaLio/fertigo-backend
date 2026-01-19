import React, { useState } from 'react';
import { useAppContext, Request } from '../pages/AppContext';
import { BellIcon, PaperAirplaneIcon, TestsiegerIcon, XCircleIcon, LockClosedIcon, MapPinIcon, CalendarDaysIcon, UserIcon, ChatBubbleLeftRightIcon, BanknotesIcon } from './icons';

type Status = 'Neu' | 'Kontaktiert' | 'In Verhandlung' | 'Gewonnen' | 'Verloren / Abgelehnt';

const statusConfig: { [key in Status]: { icon: React.ReactNode; color: string; title: string } } = {
    'Neu': { icon: <BellIcon className="w-5 h-5" />, color: 'text-blue-600', title: 'Neu Gekauft' },
    'Kontaktiert': { icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />, color: 'text-cyan-600', title: 'Kontaktiert' },
    'In Verhandlung': { icon: <BanknotesIcon className="w-5 h-5" />, color: 'text-orange-600', title: 'In Verhandlung' },
    'Gewonnen': { icon: <TestsiegerIcon className="w-5 h-5" />, color: 'text-green-600', title: 'Gewonnen' },
    'Verloren / Abgelehnt': { icon: <XCircleIcon className="w-5 h-5" />, color: 'text-red-600', title: 'Verloren / Abgelehnt' },
};

const KanbanCard: React.FC<{ lead: Request }> = ({ lead }) => {
    const { openQuickView } = useAppContext();
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('leadId', lead.id.toString());
    };
    
    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onClick={() => openQuickView(lead.id)}
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary-300 cursor-pointer transition-all mb-4"
        >
            <h4 className="font-bold text-slate-800">{lead.title}</h4>
            <div className="text-xs text-slate-500 mt-2 space-y-1.5">
                <div className="flex items-center gap-2"><UserIcon className="w-4 h-4" /><span>{lead.customer}</span></div>
                <div className="flex items-center gap-2"><MapPinIcon className="w-4 h-4" /><span>{lead.location}</span></div>
                <div className="flex items-center gap-2 pt-2 mt-2 border-t border-slate-100"><CalendarDaysIcon className="w-4 h-4" /><span>{lead.date}</span></div>
            </div>
        </div>
    );
};

const KanbanColumn: React.FC<{ status: Status; leads: Request[]; onDrop: (status: Status, event: React.DragEvent<HTMLDivElement>) => void }> = ({ status, leads, onDrop }) => {
    const { icon, color, title } = statusConfig[status];
    const [isOver, setIsOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        setIsOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOver(false);
        onDrop(status, e);
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-72 bg-slate-100 rounded-xl p-4 flex-shrink-0 transition-colors ${isOver ? 'bg-primary-50' : ''}`}
        >
            <div className={`flex items-center gap-2 mb-4 pb-2 border-b-2 ${isOver ? 'border-primary-300' : 'border-slate-200'}`}>
                <div className={`${color}`}>{icon}</div>
                <h3 className={`font-bold text-lg ${color}`}>{title}</h3>
                <span className="ml-2 bg-slate-200 text-slate-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {leads.length}
                </span>
            </div>
            <div className="space-y-4 h-full">
                {leads.map(lead => (
                    <KanbanCard key={lead.id} lead={lead} />
                ))}
            </div>
        </div>
    );
};

const KanbanBoard: React.FC<{ leads: Request[] }> = ({ leads }) => {
    const { updateRequestStatus } = useAppContext();
    const columns: Status[] = ['Neu', 'Kontaktiert', 'In Verhandlung', 'Gewonnen', 'Verloren / Abgelehnt'];

    const handleDrop = (leadId: number, newStatus: Status) => {
        updateRequestStatus(leadId, newStatus);
    };

    return (
        <div className="flex gap-6 overflow-x-auto pb-4">
            {columns.map(status => (
                <KanbanColumn
                    key={status}
                    status={status}
                    leads={leads.filter(lead => lead.status === status)}
                    onDrop={(droppedStatus, event) => {
                        const leadId = Number(event.dataTransfer.getData('leadId'));
                        if (leadId) {
                            handleDrop(leadId, droppedStatus);
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default KanbanBoard;
