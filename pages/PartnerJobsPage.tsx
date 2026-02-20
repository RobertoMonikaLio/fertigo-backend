import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
    PencilIcon, TrashIcon, XMarkIcon, UsersIcon, CheckCircleIcon, PlusIcon, EyeIcon,
    CalendarDaysIcon, MapPinIcon, MagnifyingGlassIcon, ChevronUpDownIcon, BriefcaseIcon,
    ClockIcon, ArrowLeftIcon, UserIcon, MailIcon, PhoneIcon, SpinnerIcon
} from '../components/icons';
import JobPostings from '../components/JobPostings';
import { useAppContext } from './AppContext';
import { translations } from '../components/translations';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const stored = localStorage.getItem('fertigo_provider');
    const token = stored ? JSON.parse(stored)?.token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

type JobStatus = 'Aktiv' | 'Inaktiv' | 'Entwurf';

interface Job {
    _id: string;
    title: string;
    status: JobStatus;
    createdAt: string;
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

const statusConfig: { [key in JobStatus]: { color: string, dotColor: string, bgColor: string, statusKey: string } } = {
    'Aktiv': { color: 'text-emerald-800', dotColor: 'bg-emerald-500', bgColor: 'bg-emerald-100', statusKey: 'active' },
    'Entwurf': { color: 'text-amber-800', dotColor: 'bg-amber-500', bgColor: 'bg-amber-100', statusKey: 'draft' },
    'Inaktiv': { color: 'text-slate-700', dotColor: 'bg-slate-400', bgColor: 'bg-slate-100', statusKey: 'inactive' },
};

const allStatuses: JobStatus[] = ['Aktiv', 'Entwurf', 'Inaktiv'];

const formatDate = (dateStr: string, language: string) => {
    return new Date(dateStr).toLocaleDateString(language === 'de' ? 'de-CH' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const JobDetailModal: React.FC<{
    job: Job;
    onClose: () => void;
    t: any;
    language: string;
}> = ({ job, onClose, t, language }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const config = statusConfig[job.status] || statusConfig['Entwurf'];
    // Use translated status if available
    const statusLabel = t.statuses?.[config.statusKey] || job.status;

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="grid-job" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid-job)" />
                        </svg>
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-2.5 rounded-xl transition-all" aria-label={t.close}>
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${config.bgColor} ${config.color}`}>
                                <div className={`w-2 h-2 rounded-full ${config.dotColor}`}></div>
                                {statusLabel}
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
                                <span className="font-semibold">{formatDate(job.createdAt, language)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {job.salary && (
                            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4">
                                <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">{t.salary}</p>
                                <p className="text-lg font-black text-primary-700">{job.salary}</p>
                            </div>
                        )}
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t.applicants}</p>
                            <p className="text-lg font-black text-slate-900">{job.applicants}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-black text-slate-800 mb-3">{t.description}</h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{job.description}</p>
                    </div>

                    {job.contact && (
                        <div className="bg-slate-50 rounded-2xl p-5">
                            <h3 className="font-black text-slate-800 mb-4">{t.contactPerson}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UserIcon className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{t.contact?.name || 'Name'}</p>
                                        <p className="font-bold text-slate-700 truncate">{job.contact.person}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MailIcon className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">E-Mail</p>
                                        <a href={`mailto:${job.contact.email}`} className="font-bold text-primary-600 hover:underline truncate block">{job.contact.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <PhoneIcon className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{t.contact?.phone || 'Telefon'}</p>
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
                        {t.edit}
                    </button>
                    <button onClick={onClose} className="bg-primary-600 text-white font-black py-3 px-8 rounded-xl hover:bg-primary-700 transition-colors shadow-lg">
                        {t.close}
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
    t: any;
    language: string;
}> = ({ job, onView, onDelete, t, language }) => {
    const config = statusConfig[job.status] || statusConfig['Entwurf'];
    const statusLabel = t.statuses?.[config.statusKey] || job.status;

    return (
        <article
            onClick={onView}
            className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 cursor-pointer overflow-hidden p-5"
        >
            <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${config.bgColor} ${config.color}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></div>
                        {statusLabel}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg bg-blue-50 text-blue-600">
                        {job.type}
                    </span>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight min-h-[3rem]">
                    {job.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mt-2">{job.description}</p>
            </div>

            <div className="flex flex-col gap-2 text-xs text-slate-400 mb-6">
                <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="font-semibold text-slate-600">{job.location || '–'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span className="font-semibold text-slate-600">{formatDate(job.createdAt, language)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4" />
                    <span className="font-semibold text-slate-600">{job.applicants} {t.applicants}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100" onClick={e => e.stopPropagation()}>
                <button
                    onClick={onView}
                    className="flex-1 py-2.5 rounded-xl font-black text-xs bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <EyeIcon className="w-4 h-4" />
                    {t.details}
                </button>
                <button
                    onClick={onDelete}
                    className="ml-3 p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-slate-100 hover:border-red-200"
                    title={t.delete}
                >
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </article>
    );
};

// --- Skeleton ---
const JobsSkeleton = () => (
    <div className="max-w-7xl mx-auto animate-pulse">
        <div className="h-14 bg-white rounded-2xl border-2 border-slate-100 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4">
                    <div className="flex gap-2">
                        <div className="h-6 bg-slate-100 rounded-lg w-16" />
                        <div className="h-6 bg-slate-100 rounded-lg w-16" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-6 bg-slate-100 rounded-xl w-3/4" />
                        <div className="h-6 bg-slate-100 rounded-xl w-1/2" />
                    </div>
                    <div className="h-20 bg-slate-50 rounded-2xl w-full" />
                    <div className="h-10 bg-slate-100 rounded-xl w-full pt-4" />
                </div>
            ))}
        </div>
    </div>
);

const PartnerJobsPage: React.FC = () => {
    const { language } = useAppContext();
    const t = translations[language]?.partner?.jobs || translations['de'].partner.jobs;

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Alle');
    const [isCreatingJob, setIsCreatingJob] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const [viewingJob, setViewingJob] = useState<Job | null>(null);

    const fetchJobs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_URL}/api/partner/jobs`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error(language === 'de' ? 'Stellen konnten nicht geladen werden' : 'Job postings could not be loaded');
            const data = await response.json();
            setJobs(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [language]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

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

    const handleCreateJobSuccess = async (posted: boolean) => {
        if (posted) {
            try {
                const response = await fetch(`${API_URL}/api/partner/jobs`, {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: JSON.stringify({
                        title: language === 'de' ? 'Neue Stelle' : 'New Job Posting',
                        status: 'Aktiv',
                        location: '',
                        type: 'Vollzeit',
                        description: '',
                    }),
                });
                if (response.ok) {
                    await fetchJobs();
                    setShowSuccessMessage(t.createSuccess);
                }
            } catch (err) {
                console.error('Error creating job:', err);
            }
        }
        setIsCreatingJob(false);
    };

    const handleDeleteJob = async (jobId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(t.deleteConfirm)) {
            try {
                const response = await fetch(`${API_URL}/api/partner/jobs/${jobId}`, {
                    method: 'DELETE',
                    headers: getAuthHeaders(),
                });
                if (response.ok) {
                    setJobs(prev => prev.filter(j => j._id !== jobId));
                    setShowSuccessMessage(t.deleteSuccess);
                }
            } catch (err) {
                console.error('Error deleting job:', err);
            }
        }
    };

    if (loading) return <JobsSkeleton />;

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-3xl p-12 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XMarkIcon className="w-8 h-8 text-red-600" />
                    </div>
                    <p className="text-red-900 font-bold text-lg mb-2">{language === 'de' ? 'Fehler beim Laden' : 'Loading Error'}</p>
                    <p className="text-red-500 mb-6">{error}</p>
                    <button onClick={() => { setLoading(true); fetchJobs(); }} className="bg-red-600 text-white font-black px-8 py-3 rounded-2xl hover:bg-red-700 transition-all shadow-lg active:scale-95">
                        {language === 'de' ? 'Erneut versuchen' : 'Try Again'}
                    </button>
                </div>
            </div>
        );
    }

    if (isCreatingJob) {
        return (
            <div className="animate-fade-in max-w-4xl mx-auto">
                <button
                    onClick={() => setIsCreatingJob(false)}
                    className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-extrabold transition-all group"
                >
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> {t.backToOverview}
                </button>
                <JobPostings onSuccess={handleCreateJobSuccess} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {viewingJob && <JobDetailModal job={viewingJob} onClose={() => setViewingJob(null)} t={t} language={language} />}

            {showSuccessMessage && (
                <div className="mb-8 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 p-5 rounded-2xl flex items-center gap-4 animate-fade-in shadow-xl shadow-emerald-500/10" role="alert">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="font-bold">{showSuccessMessage}</p>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t.title}</h1>
                    <p className="text-slate-500 mt-1 font-medium">{t.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-green-700 font-bold text-xs uppercase tracking-widest">{t.liveData}</span>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-10">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                            type="search"
                            placeholder={t.searchPlaceholder}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative min-w-[180px]">
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="w-full h-14 px-5 pr-10 rounded-2xl bg-slate-50 border-none font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 outline-none appearance-none transition-all cursor-pointer"
                            >
                                <option value="Alle">{t.allStatuses}</option>
                                {allStatuses.map(s => {
                                    const config = statusConfig[s];
                                    return <option key={s} value={s}>{t.statuses?.[config.statusKey] || s}</option>;
                                })}
                            </select>
                            <ChevronUpDownIcon className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        <button
                            onClick={() => setIsCreatingJob(true)}
                            className="h-14 px-8 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <PlusIcon className="w-5 h-5" />
                            {t.createJob}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        {filteredJobs.length} {filteredJobs.length === 1 ? t.found : t.foundPlural}
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {stats.active} {t.active}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                            <UsersIcon className="w-4 h-4" />
                            {stats.applicants} {t.totalApplicants}
                        </span>
                    </div>
                </div>
            </div>

            {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map(job => (
                        <JobCard
                            key={job._id}
                            job={job}
                            onView={() => setViewingJob(job)}
                            onDelete={(e: any) => handleDeleteJob(job._id, e)}
                            t={t}
                            language={language}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
                        <BriefcaseIcon className="w-10 h-10 text-slate-200" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{t.noJobsFound}</h3>
                    <p className="text-slate-500 max-w-xs mb-8 font-medium">{t.noJobsDesc}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => { setSearchTerm(''); setStatusFilter('Alle'); }}
                            className="px-8 py-3.5 bg-white border border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
                        >
                            {t.resetFilters}
                        </button>
                        <button
                            onClick={() => setIsCreatingJob(true)}
                            className="px-8 py-3.5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95"
                        >
                            {t.createJob}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerJobsPage;
