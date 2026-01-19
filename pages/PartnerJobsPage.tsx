import React, { useState, useMemo, useEffect } from 'react';
import { 
    PencilIcon, TrashIcon, XMarkIcon, UsersIcon, CheckCircleIcon, PlusIcon, EyeIcon, 
    CalendarDaysIcon, MapPinIcon, MagnifyingGlassIcon, ChevronUpDownIcon, BriefcaseIcon,
    ClockIcon, ArrowLeftIcon, UserIcon, MailIcon, PhoneIcon
} from '../components/icons';
import JobPostings from '../components/JobPostings';

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
    salary?: string;
    contact?: {
        person: string;
        email: string;
        phone: string;
    };
}

const mockJobs: Job[] = [
    { id: 1, title: 'Maler EFZ (m/w/d)', status: 'Aktiv', created: '15. Juli 2024', applicants: 12, location: 'Zürich', type: 'Vollzeit', description: 'Wir suchen einen erfahrenen Maler für Renovationsprojekte. Sie arbeiten selbständig und im Team an verschiedenen Objekten.', salary: 'CHF 5\'200 - 6\'000 / Monat', contact: { person: 'Hans Meier', email: 'jobs@mueller-bau.ch', phone: '044 123 45 67' } },
    { id: 2, title: 'Sanitärinstallateur/in EFZ', status: 'Aktiv', created: '10. Juli 2024', applicants: 8, location: 'Bern', type: 'Vollzeit', description: 'Installation und Wartung von Sanitäranlagen in Neubauten und Renovationen.', salary: 'CHF 5\'500 - 6\'500 / Monat', contact: { person: 'Hans Meier', email: 'jobs@mueller-bau.ch', phone: '044 123 45 67' } },
    { id: 3, title: 'Schreiner EFZ (Entwurf)', status: 'Entwurf', created: '05. Juli 2024', applicants: 0, location: 'Luzern', type: 'Vollzeit', description: 'Herstellung von massgefertigten Möbeln und Innenausbauten.', salary: 'Nach Vereinbarung', contact: { person: 'Hans Meier', email: 'jobs@mueller-bau.ch', phone: '044 123 45 67' } },
    { id: 4, title: 'Gärtner/in mit Erfahrung', status: 'Inaktiv', created: '01. Juni 2024', applicants: 25, location: 'Basel', type: 'Teilzeit', description: 'Pflege von Privatgärten und öffentlichen Anlagen. Erfahrung im Garten- und Landschaftsbau erwünscht.', salary: 'CHF 28 - 32 / Stunde', contact: { person: 'Hans Meier', email: 'jobs@mueller-bau.ch', phone: '044 123 45 67' } },
];

const statusConfig: { [key in JobStatus]: { color: string, dotColor: string, bgColor: string } } = {
    'Aktiv': { color: 'text-emerald-800', dotColor: 'bg-emerald-500', bgColor: 'bg-emerald-100' },
    'Entwurf': { color: 'text-amber-800', dotColor: 'bg-amber-500', bgColor: 'bg-amber-100' },
    'Inaktiv': { color: 'text-slate-700', dotColor: 'bg-slate-400', bgColor: 'bg-slate-100' },
};

const allStatuses: JobStatus[] = ['Aktiv', 'Entwurf', 'Inaktiv'];

const JobDetailModal: React.FC<{
    job: Job;
    onClose: () => void;
}> = ({ job, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const config = statusConfig[job.status];

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="grid-job" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid-job)" />
                        </svg>
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-2.5 rounded-xl transition-all" aria-label="Schliessen">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${config.bgColor} ${config.color}`}>
                                <div className={`w-2 h-2 rounded-full ${config.dotColor}`}></div>
                                {job.status}
                            </span>
                            <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/20 text-white">
                                {job.type}
                            </span>
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">{job.title}</h2>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="flex items-center gap-1.5">
                                <MapPinIcon className="w-4 h-4" />
                                <span className="font-semibold">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CalendarDaysIcon className="w-4 h-4" />
                                <span className="font-semibold">{job.created}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {job.salary && (
                            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4">
                                <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Lohn</p>
                                <p className="text-lg font-black text-primary-700">{job.salary}</p>
                            </div>
                        )}
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Bewerbungen</p>
                            <p className="text-lg font-black text-slate-900">{job.applicants}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-black text-slate-800 mb-3">Stellenbeschreibung</h3>
                        <p className="text-slate-600 leading-relaxed">{job.description}</p>
                    </div>
                    
                    {job.contact && (
                        <div className="bg-slate-50 rounded-2xl p-5">
                            <h3 className="font-black text-slate-800 mb-4">Kontaktperson</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UserIcon className="w-5 h-5 text-primary-600"/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 font-bold">Name</p>
                                        <p className="font-bold text-slate-700 truncate">{job.contact.person}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MailIcon className="w-5 h-5 text-primary-600"/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 font-bold">E-Mail</p>
                                        <a href={`mailto:${job.contact.email}`} className="font-bold text-primary-600 hover:underline truncate block">{job.contact.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <PhoneIcon className="w-5 h-5 text-primary-600"/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 font-bold">Telefon</p>
                                        <a href={`tel:${job.contact.phone}`} className="font-bold text-primary-600 hover:underline">{job.contact.phone}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                    <button className="flex items-center gap-2 px-5 py-2.5 text-slate-600 hover:text-slate-800 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                        <PencilIcon className="w-5 h-5" />
                        Bearbeiten
                    </button>
                    <button onClick={onClose} className="bg-primary-600 text-white font-black py-3 px-8 rounded-xl hover:bg-primary-700 transition-colors shadow-lg">
                        Schliessen
                    </button>
                </div>
            </div>
        </div>
    );
};

const JobCard: React.FC<{
    job: Job;
    onView: () => void;
    onDelete: () => void;
}> = ({ job, onView, onDelete }) => {
    const config = statusConfig[job.status];
    
    return (
        <article 
            onClick={onView}
            className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
        >
            <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap gap-1.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold ${config.bgColor} ${config.color}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></div>
                            {job.status}
                        </span>
                        <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-blue-100 text-blue-700">
                            {job.type}
                        </span>
                    </div>
                </div>

                <div className="mb-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">
                        {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{job.description}</p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                        <MapPinIcon className="w-3.5 h-3.5 text-slate-400"/>
                        <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="w-3.5 h-3.5 text-slate-400"/>
                        <span className="font-medium">{job.created}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    {job.salary && (
                        <div className="font-bold text-primary-600 truncate">{job.salary}</div>
                    )}
                    <div className="flex items-center gap-1 ml-auto">
                        <UsersIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-600">{job.applicants} Bewerbungen</span>
                    </div>
                </div>

                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <button 
                        onClick={onView}
                        className="flex-1 py-2 rounded-xl font-bold text-xs bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                        <EyeIcon className="w-4 h-4"/>
                        Details
                    </button>
                    <button 
                        onClick={onDelete}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200 hover:border-red-200" 
                        title="Löschen"
                    >
                        <TrashIcon className="w-4 h-4"/>
                    </button>
                </div>
            </div>
        </article>
    );
};

const PartnerJobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>(mockJobs);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [isCreatingJob, setIsCreatingJob] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const [viewingJob, setViewingJob] = useState<Job | null>(null);

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

    const stats = useMemo(() => ({
        total: jobs.length,
        active: jobs.filter(j => j.status === 'Aktiv').length,
        applicants: jobs.reduce((sum, j) => sum + j.applicants, 0),
    }), [jobs]);

    const handleCreateJobSuccess = (posted: boolean) => {
        if (posted) {
            const newJob: Job = {
                id: Date.now(),
                title: 'Neue Stelle (Demo)',
                status: 'Aktiv',
                created: new Date().toLocaleDateString('de-CH'),
                applicants: 0,
                location: 'Zürich',
                type: 'Vollzeit',
                description: 'Dies ist eine neu erstellte Stelle.',
                salary: 'Nach Vereinbarung',
                contact: { person: 'Hans Meier', email: 'jobs@mueller-bau.ch', phone: '044 123 45 67' }
            };
            setJobs(prev => [newJob, ...prev]);
            setShowSuccessMessage("Stelle erfolgreich veröffentlicht!");
        }
        setIsCreatingJob(false);
    };

    const handleDeleteJob = (jobId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Möchten Sie diese Stelle wirklich löschen?")) {
            setJobs(prev => prev.filter(j => j.id !== jobId));
            setShowSuccessMessage("Stelle gelöscht!");
        }
    };

    if (isCreatingJob) {
        return (
            <div className="animate-fade-in max-w-4xl mx-auto">
                <button 
                    onClick={() => setIsCreatingJob(false)} 
                    className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors group"
                >
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Zurück zur Übersicht
                </button>
                <JobPostings onSuccess={handleCreateJobSuccess} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {viewingJob && <JobDetailModal job={viewingJob} onClose={() => setViewingJob(null)} />}
            
            {showSuccessMessage && (
                <div className="mb-6 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl flex items-center gap-3 animate-fade-in shadow-lg" role="alert">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="font-bold">{showSuccessMessage}</p>
                </div>
            )}

            <div className="mb-8">
                <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input 
                                type="search" 
                                placeholder="Stellen durchsuchen..."
                                value={searchTerm} 
                                onChange={e => setSearchTerm(e.target.value)} 
                                className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="relative">
                                <select 
                                    value={statusFilter} 
                                    onChange={e => setStatusFilter(e.target.value)} 
                                    className="h-14 px-4 pr-10 rounded-xl border-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none appearance-none transition-all min-w-[160px]"
                                >
                                    <option value="Alle">Alle Status</option>
                                    {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <button 
                                onClick={() => setIsCreatingJob(true)} 
                                className="h-14 px-6 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white font-black rounded-xl hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                            >
                                <PlusIcon className="w-5 h-5" />
                                Stelle ausschreiben
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'Stelle gefunden' : 'Stellen gefunden'}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1 font-semibold">
                        {stats.active} aktiv • {stats.applicants} Bewerbungen total
                    </p>
                </div>
            </div>

            {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredJobs.map(job => (
                        <JobCard 
                            key={job.id}
                            job={job}
                            onView={() => setViewingJob(job)}
                            onDelete={(e: any) => handleDeleteJob(job.id, e)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-300">
                    <BriefcaseIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-black text-slate-700 mb-2">Keine Stellen gefunden</h3>
                    <p className="text-sm text-slate-500 font-semibold mb-6">Passen Sie Ihre Filter an oder erstellen Sie eine neue Stelle.</p>
                    <div className="flex justify-center gap-3">
                        <button 
                            onClick={() => {setSearchTerm(''); setStatusFilter('Alle');}} 
                            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors border-2 border-slate-200"
                        >
                            Filter zurücksetzen
                        </button>
                        <button 
                            onClick={() => setIsCreatingJob(true)}
                            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-colors shadow-lg"
                        >
                            Stelle ausschreiben
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerJobsPage;
