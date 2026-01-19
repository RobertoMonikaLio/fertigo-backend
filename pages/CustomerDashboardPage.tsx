
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from './AppContext';

interface Project {
    id: string;
    title: string;
    status: 'Offen' | 'In Arbeit' | 'Abgeschlossen';
    statusDetail: string;
    image: string;
    location: string;
    dueDate: string;
}

const projectsData: Project[] = [
    {
        id: 'proj-1',
        title: 'Badezimmer renovieren',
        status: 'Offen',
        statusDetail: 'Wartet auf Angebote',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwvJvJCJNko23rmVk__8axel6oQNNfKnXLuIx0tCVDdNP03-UtqhJN8wNlrYtsDMwvkVv7LMqQrRl37pah3ai2DRpPjArgok3C74eQdhPMtsA1u204NaclZ0pNFJDt5NF9-TNu2qoWbhC8NDJ1O764wHXFqzqwLget4jvunTFJAEqqF7uiaR6OddorLZuu-AGK-2FMc9eUVPitTJOmTRiQjHoodHOSXn8PJcfchDqVb8hlQf3HQncO5V7dwkW3IrlRROw_a9d2kVg',
        location: 'Zürich, Schweiz',
        dueDate: '30.12.2024',
    },
    {
        id: 'proj-2',
        title: 'Küchenboden neu verlegen',
        status: 'In Arbeit',
        statusDetail: 'Handwerker ausgewählt',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZv7Ksh49VFfk7vAMoNXDpt4u9AupcxPU_uMW-v8nf2JdS4h7nV9EMuPb9K3pvueFWwL4uWXTs0f6HXr1g3nLpwIGZU2KtCzQb0nk2yChi5fxFF4QvnApEC9w3PcAb27Mc64a3ynxotsHUAyJvxxIXY_UeHnDMjOTfcIXw3ns0CYyajjIV25D2E5wYo5LFsVWtjNfTRG71lzq8RjrxRjEMUYg6Uv29w_IqAMDUcWw2h4QCs17jhQLVdSOWVyeQCa1hHnQ35ib-06w',
        location: 'Genf, Schweiz',
        dueDate: '15.11.2024',
    },
    {
        id: 'proj-3',
        title: 'Gartenhaus streichen',
        status: 'Abgeschlossen',
        statusDetail: 'Abgeschlossen am: 01.09.2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjINKniiLDkCgQIJ6ffM8VsOAk-XE_Qe1oEXvb7ZS7fcVea-0Phr5bPU2ma_srbIlhAVqPcV4HdUxw9fLJpBGujtl5UjBLgsbASJnDrtswK5mdN9U76eqiAWdRpt6ECTUjwMoPPRSNhf45LEZpqTDU7VnKOvgmeSRizY0mF_PqN2ocslLha2c-x8GQYKCSye5d2EiJZke6bpTUNe3NwS4-1-25pjEks1ZFQR3-bodFnvTRjRO1CUX1HzqiIJOMNFU4Y0uDEkL0iRs',
        location: 'Bern, Schweiz',
        dueDate: '01.09.2024',
    },
];

const getStatusBadge = (status: Project['status']) => {
    switch (status) {
        case 'Offen':
            return 'bg-status-blue/20 text-status-blue';
        case 'In Arbeit':
            return 'bg-status-yellow/20 text-yellow-800 dark:text-yellow-300';
        case 'Abgeschlossen':
            return 'bg-status-green/20 text-status-green';
        default:
            return 'bg-gray-200/20 text-gray-500';
    }
};

const CustomerDashboardPage: React.FC = () => {
    const { openQuoteModal } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('Alle');

    const filteredProjects = useMemo(() => {
        return projectsData
            .filter(p => activeFilter === 'Alle' || p.status === activeFilter)
            .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, activeFilter]);

    return (
        <>
            <header className="mb-8">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">Ihre Projektübersicht</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal mt-2">Verwalten Sie Ihre Projekte und sehen Sie die neuesten Angebote ein.</p>
            </header>

            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-border-light dark:border-border-dark mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex flex-col h-12 w-full sm:w-2/3">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                            <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-transparent h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                                placeholder="Suche nach Projekttitel oder Handwerker..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </label>
                    <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-2">
                        {['Alle', 'Offen', 'In Arbeit', 'Abgeschlossen'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 ${activeFilter === filter ? 'bg-primary/10 text-primary' : 'bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-text-light dark:text-text-dark'}`}
                            >
                                <p className="text-sm font-medium leading-normal">{filter}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map(project => (
                    <Link to={`/kunden/anfragen/${project.id.split('-')[1]}`} key={project.id} className="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-lg bg-surface-light dark:bg-surface-dark p-6 border border-border-light dark:border-border-dark shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="flex flex-[2_2_0px] flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(project.status)}`}>{project.status}</span>
                                    
                                </div>
                                <p className="text-text-light dark:text-text-dark text-xl font-bold leading-tight">{project.title}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">{project.location} | Fällig am: {project.dueDate}</p>
                            </div>
                            {project.status === 'Offen' && (
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal w-fit hover:bg-primary/90">
                                    <span className="truncate">Details ansehen</span>
                                </button>
                            )}
                             {project.status === 'In Arbeit' && (
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-white/10 text-text-light dark:text-text-dark text-sm font-medium leading-normal w-fit hover:bg-gray-300 dark:hover:bg-white/20">
                                    <span className="truncate">Projektdetails ansehen</span>
                                </button>
                            )}
                             {project.status === 'Abgeschlossen' && (
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-white/10 text-text-light dark:text-text-dark text-sm font-medium leading-normal w-fit hover:bg-gray-300 dark:hover:bg-white/20">
                                    <span className="truncate">Bewertung abgeben</span>
                                </button>
                            )}
                        </div>
                        <div className="w-full sm:w-1/3 h-40 sm:h-auto bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1" style={{ backgroundImage: `url("${project.image}")` }}></div>
                    </Link>
                ))}
                
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-6 border-2 border-dashed border-border-light dark:border-border-dark text-center lg:col-span-2 min-h-[240px]">
                    <span className="material-symbols-outlined text-5xl text-gray-400 dark:text-gray-500">add_circle</span>
                    <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Sie haben noch kein offenes Projekt</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto mt-2">Starten Sie jetzt und finden Sie den perfekten Handwerker für Ihre Bedürfnisse. Erstellen Sie Ihr erstes Projekt kostenlos.</p>
                    <button onClick={() => openQuoteModal()} className="mt-2 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-secondary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-secondary/90">
                        <span className="truncate">Jetzt Projekt erstellen</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default CustomerDashboardPage;
