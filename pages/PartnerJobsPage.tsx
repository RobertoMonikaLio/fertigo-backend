
import React, { useState, useMemo, useEffect } from 'react';
import { 
    PencilIcon, TrashIcon, XMarkIcon, UsersIcon, CheckCircleIcon, PlusIcon, EyeIcon, 
    CalendarDaysIcon, MapPinIcon, MagnifyingGlassIcon, ChevronUpDownIcon, BriefcaseIcon,
    ClockIcon, ArrowLeftIcon
} from '../components/icons';
import JobPostings from '../components/JobPostings';

// --- TYPES ---
type JobStatus = 'Aktiv' | 'Inaktiv' | 'Entwurf';

interface Job {
  id: number;
  title: string;
  status: JobStatus;
  created: string;
  applicants: number;
  location: string;
  type: string;
  description: string;
}

// --- MOCK DATA ---
const mockJobs: Job[] = [
  { id: 1, title: 'Maler EFZ (m/w/d)', status: 'Aktiv', created: '15. Juli 2024', applicants: 12, location: 'Zürich', type: 'Vollzeit', description: 'Wir suchen einen erfahrenen Maler für Renovationsprojekte.' },
  { id: 2, title: 'Sanitärinstallateur/in EFZ', status: 'Aktiv', created: '10. Juli 2024', applicants: 8, location: 'Bern', type: 'Vollzeit', description: 'Installation und Wartung von Sanitäranlagen.' },
  { id: 3, title: 'Schreiner EFZ (Entwurf)', status: 'Entwurf', created: '05. Juli 2024', applicants: 0, location: 'Luzern', type: 'Vollzeit', description: 'Herstellung von massgefertigten Möbeln.' },
  { id: 4, title: 'Gärtner/in mit Erfahrung', status: 'Inaktiv', created: '01. Juni 2024', applicants: 25, location: 'Basel', type: 'Teilzeit', description: 'Pflege von Privatgärten und Anlagen.' },
];

const statusConfig: { [key in JobStatus]: { color: string, dotColor: string } } = {
    'Aktiv': { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', dotColor: 'bg-emerald-500' },
    'Entwurf': { color: 'bg-amber-100 text-amber-800 border-amber-200', dotColor: 'bg-amber-500' },
    'Inaktiv': { color: 'bg-slate-100 text-slate-600 border-slate-200', dotColor: 'bg-slate-500' },
};
const allStatuses: JobStatus[] = ['Aktiv', 'Entwurf', 'Inaktiv'];
const allTypes = ['Vollzeit', 'Teilzeit', 'Temporär', 'Praktikum'];

const PartnerJobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>(mockJobs);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [isCreatingJob, setIsCreatingJob] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState('');

    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => setShowSuccessMessage(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage]);

    const filteredJobs = useMemo(() =>
        jobs.filter(job =>
            (statusFilter === 'Alle' || job.status === statusFilter) &&
            (job.title.toLowerCase().includes(searchTerm.toLowerCase()))
        ),
        [jobs, searchTerm, statusFilter]
    );

    const handleCreateJobSuccess = (posted: boolean) => {
        if (posted) {
            // In a real app, we would fetch the new job or add it to state from the response
            // For now, we simulate adding a new job
            const newJob: Job = {
                id: Date.now(),
                title: 'Neue Stelle (Demo)',
                status: 'Aktiv',
                created: new Date().toLocaleDateString('de-CH'),
                applicants: 0,
                location: 'Zürich',
                type: 'Vollzeit',
                description: 'Dies ist eine neu erstellte Stelle.'
            };
            setJobs(prev => [newJob, ...prev]);
            setShowSuccessMessage("Stelle erfolgreich veröffentlicht!");
        }
        setIsCreatingJob(false);
    };

    const handleDeleteJob = (jobId: number) => {
        if (window.confirm("Möchten Sie diese Stelle wirklich löschen?")) {
            setJobs(prev => prev.filter(j => j.id !== jobId));
            setShowSuccessMessage("Stelle gelöscht!");
        }
    };

    if (isCreatingJob) {
        return (
            <div className="animate-fade-in">
                 <button 
                    onClick={() => setIsCreatingJob(false)} 
                    className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5" /> Zurück zur Übersicht
                </button>
                <JobPostings onSuccess={handleCreateJobSuccess} />
            </div>
        );
    }


    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {showSuccessMessage && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center gap-3 animate-fade-in" role="alert">
                    <CheckCircleIcon className="w-6 h-6" />
                    <p className="font-bold">{showSuccessMessage}</p>
                </div>
            )}
            
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Meine Stellen</h1>
                    <p className="text-slate-500 mt-1">Verwalten Sie hier Ihre offenen Positionen und Bewerbungen.</p>
                </div>
                <button onClick={() => setIsCreatingJob(true)} className="flex items-center justify-center gap-2 bg-primary-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-700 transition-all shadow-md transform hover:-translate-y-0.5">
                    <PlusIcon className="w-5 h-5" />
                    Stelle ausschreiben
                </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1 w-full">
                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                        type="search" 
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                        placeholder="Nach Titel suchen..." 
                        className="w-full pl-10 pr-4 py-2.5 border-none rounded-lg bg-transparent focus:ring-0 placeholder:text-slate-400 text-slate-700"
                    />
                </div>
                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                 <div className="relative w-full sm:w-48">
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full appearance-none pl-4 pr-10 py-2.5 border-none rounded-lg bg-transparent focus:ring-0 font-medium text-slate-700 cursor-pointer">
                        <option value="Alle">Alle Status</option>
                        {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                     <ChevronUpDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>
            
            <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div 
                            key={job.id} 
                            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row">
                                {/* Status Indicator Bar */}
                                <div className={`h-2 sm:h-auto sm:w-2 ${statusConfig[job.status].dotColor}`}></div>
                                
                                <div className="p-5 flex-1 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold text-slate-900 truncate">{job.title}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusConfig[job.status].color}`}>
                                                {job.status}
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <MapPinIcon className="w-4 h-4 text-slate-400"/>
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ClockIcon className="w-4 h-4 text-slate-400"/>
                                                {job.type}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CalendarDaysIcon className="w-4 h-4 text-slate-400"/>
                                                Veröffentlicht: {job.created}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metrics & Actions */}
                                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
                                            <div className="p-1.5 bg-white rounded-md shadow-sm text-slate-400">
                                                <UsersIcon className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bewerber</span>
                                                <span className="text-lg font-bold text-slate-900 leading-none">{job.applicants}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => setIsCreatingJob(true)} // Just a placeholder for edit
                                                className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" 
                                                title="Bearbeiten"
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteJob(job.id)} 
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                                title="Löschen"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-16 bg-white rounded-xl border border-dashed border-slate-300">
                        <BriefcaseIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-700">Keine Stellen gefunden</h3>
                        <p className="mt-1 text-sm text-slate-500">Ihre Suche oder Filter ergaben keine Treffer.</p>
                        <button onClick={() => {setSearchTerm(''); setStatusFilter('Alle');}} className="mt-4 text-primary-600 font-medium hover:underline">
                            Filter zurücksetzen
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartnerJobsPage;
