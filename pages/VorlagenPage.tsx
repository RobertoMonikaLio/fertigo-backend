import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import { ArrowDownTrayIcon, ArrowRightIcon, DocumentTextIcon, ClipboardDocumentListIcon, SwissFlagIcon } from '../components/icons';

const translations = {
    de: {
        title: 'Vorlagen & Dokumente',
        subtitle: 'Nützliche Dokumentenvorlagen für Ihre Projekte',
        description: 'Laden Sie kostenlos professionelle Vorlagen herunter, die Ihnen bei der Planung und Durchführung Ihrer Projekte helfen.',
        download: 'Herunterladen',
        category: 'Kategorie',
        allCategories: 'Alle Kategorien',
        projectPlanning: 'Projektplanung',
        contracts: 'Verträge',
        checklists: 'Checklisten',
        invoices: 'Rechnungen',
        noTemplates: 'Keine Vorlagen in dieser Kategorie gefunden.',
    },
    fr: {
        title: 'Modèles & Documents',
        subtitle: 'Modèles de documents utiles pour vos projets',
        description: 'Téléchargez gratuitement des modèles professionnels qui vous aideront à planifier et réaliser vos projets.',
        download: 'Télécharger',
        category: 'Catégorie',
        allCategories: 'Toutes les catégories',
        projectPlanning: 'Planification de projet',
        contracts: 'Contrats',
        checklists: 'Listes de contrôle',
        invoices: 'Factures',
        noTemplates: 'Aucun modèle trouvé dans cette catégorie.',
    },
    en: {
        title: 'Templates & Documents',
        subtitle: 'Useful document templates for your projects',
        description: 'Download free professional templates that will help you plan and execute your projects.',
        download: 'Download',
        category: 'Category',
        allCategories: 'All Categories',
        projectPlanning: 'Project Planning',
        contracts: 'Contracts',
        checklists: 'Checklists',
        invoices: 'Invoices',
        noTemplates: 'No templates found in this category.',
    },
};

interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    fileType: string;
    fileSize: string;
    downloadUrl: string;
    icon: React.ComponentType<{ className?: string }>;
}

const VorlagenPage: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;
    const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const templates: Template[] = [
        {
            id: '1',
            name: 'Projektbeschreibung Vorlage',
            description: 'Professionelle Vorlage zur detaillierten Beschreibung Ihres Projekts',
            category: 'projectPlanning',
            fileType: 'DOCX',
            fileSize: '45 KB',
            downloadUrl: '#',
            icon: DocumentTextIcon,
        },
        {
            id: '2',
            name: 'Handwerker-Vertrag Vorlage',
            description: 'Standardvertrag für Handwerkeraufträge mit allen wichtigen Klauseln',
            category: 'contracts',
            fileType: 'PDF',
            fileSize: '120 KB',
            downloadUrl: '#',
            icon: ClipboardDocumentListIcon,
        },
        {
            id: '3',
            name: 'Projekt-Checkliste',
            description: 'Umfassende Checkliste für die Planung und Durchführung von Projekten',
            category: 'checklists',
            fileType: 'XLSX',
            fileSize: '35 KB',
            downloadUrl: '#',
            icon: ClipboardDocumentListIcon,
        },
        {
            id: '4',
            name: 'Angebotsvergleich Vorlage',
            description: 'Vorlage zum systematischen Vergleich mehrerer Angebote',
            category: 'projectPlanning',
            fileType: 'XLSX',
            fileSize: '28 KB',
            downloadUrl: '#',
            icon: DocumentTextIcon,
        },
        {
            id: '5',
            name: 'Mustervertrag für Renovierung',
            description: 'Rechtssichere Vorlage für Renovierungsprojekte',
            category: 'contracts',
            fileType: 'DOCX',
            fileSize: '95 KB',
            downloadUrl: '#',
            icon: DocumentTextIcon,
        },
        {
            id: '6',
            name: 'Qualitätskontrolle Checkliste',
            description: 'Checkliste zur Qualitätskontrolle nach Abschluss der Arbeiten',
            category: 'checklists',
            fileType: 'PDF',
            fileSize: '52 KB',
            downloadUrl: '#',
            icon: ClipboardDocumentListIcon,
        },
        {
            id: '7',
            name: 'Rechnungsvorlage',
            description: 'Professionelle Rechnungsvorlage für Handwerker',
            category: 'invoices',
            fileType: 'DOCX',
            fileSize: '38 KB',
            downloadUrl: '#',
            icon: DocumentTextIcon,
        },
        {
            id: '8',
            name: 'Projektzeitplan Vorlage',
            description: 'Excel-Vorlage für die detaillierte Projektplanung mit Zeitachse',
            category: 'projectPlanning',
            fileType: 'XLSX',
            fileSize: '42 KB',
            downloadUrl: '#',
            icon: DocumentTextIcon,
        },
    ];

    const categories = [
        { id: 'all', name: t.allCategories },
        { id: 'projectPlanning', name: t.projectPlanning },
        { id: 'contracts', name: t.contracts },
        { id: 'checklists', name: t.checklists },
        { id: 'invoices', name: t.invoices },
    ];

    const filteredTemplates = selectedCategory === 'all' 
        ? templates 
        : templates.filter(t => t.category === selectedCategory);

    const handleDownload = (template: Template) => {
        alert(`Download: ${template.name}\n\nIn einer echten Anwendung würde hier die Datei heruntergeladen werden.`);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* ══════════ HERO ══════════ */}
            <section className="relative overflow-hidden bg-[#0a0f1a]">

                {/* Hintergrund-Effekte */}
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1424] to-[#071210]" />
                    <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-green-600/[0.07] rounded-full blur-[140px]" />
                    <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/[0.06] rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
                </div>

                {/* Inhalt */}
                <div className="relative z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="min-h-[70vh] lg:min-h-[calc(100vh-80px)] flex items-center py-28 sm:py-32 lg:py-20">
                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

                                {/* ── Linke Spalte: Text ── */}
                                <div className={`max-w-xl transition-all duration-[1200ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-full px-4 py-2 mb-7 hover:bg-white/[0.1] transition-colors">
                                        <SwissFlagIcon className="w-4 h-4 flex-shrink-0" />
                                        <span className="text-white/60 text-xs sm:text-sm font-medium">Kostenlose Vorlagen &amp; Dokumente</span>
                                    </div>

                                    {/* Headline */}
                                    <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black leading-[1.08] tracking-tight mb-6">
                                        <span className="text-white">Professionelle Vorlagen</span>
                                        <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400">für Ihr Projekt.</span>
                                    </h1>

                                    {/* Beschreibung */}
                                    <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                                        Verträge, Checklisten, Rechnungen und mehr — laden Sie <span className="text-white/70 font-medium">kostenlos professionelle Vorlagen</span> herunter und sparen Sie wertvolle Zeit.
                                    </p>

                                    {/* CTA */}
                                    <a
                                        href="#vorlagen"
                                        className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mb-8"
                                    >
                                        Vorlagen entdecken
                                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>

                                    {/* Trust-Zeile */}
                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                        {[
                                            { icon: '✓', text: '100% Kostenlos' },
                                            { icon: '✓', text: 'Sofort einsatzbereit' },
                                            { icon: '✓', text: 'Ohne Registrierung' },
                                        ].map((item, i) => (
                                            <span key={i} className="flex items-center gap-1.5 text-xs sm:text-sm text-white/30">
                                                <span className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 text-[10px] font-bold">{item.icon}</span>
                                                {item.text}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Rechte Spalte: Floating Dokumente ── */}
                                <div className={`hidden lg:block transition-all duration-[1500ms] delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                    <div className="relative">
                                        {/* Glow */}
                                        <div className="absolute -inset-10 bg-gradient-to-tr from-green-500/[0.08] via-transparent to-emerald-500/[0.06] rounded-full blur-3xl" />

                                        {/* Dokument-Karten Stack */}
                                        <div className="relative space-y-4">
                                            {[
                                                { icon: '📄', title: 'Handwerker-Vertrag', desc: 'Rechtssichere Vorlage mit allen Klauseln', tag: 'PDF', tagColor: 'from-red-500 to-rose-500' },
                                                { icon: '📋', title: 'Projekt-Checkliste', desc: 'Umfassende Liste für Ihre Projektplanung', tag: 'XLSX', tagColor: 'from-green-500 to-emerald-500' },
                                                { icon: '📝', title: 'Angebotsvergleich', desc: 'Systematischer Vergleich mehrerer Offerten', tag: 'XLSX', tagColor: 'from-green-500 to-emerald-500' },
                                                { icon: '🧾', title: 'Rechnungsvorlage', desc: 'Professionelle Vorlage für Handwerker', tag: 'DOCX', tagColor: 'from-blue-500 to-indigo-500' },
                                            ].map((doc, i) => (
                                                <div
                                                    key={i}
                                                    className={`relative bg-white/[0.05] backdrop-blur-lg border border-white/[0.08] rounded-2xl px-5 py-4 flex items-center gap-4 group hover:bg-white/[0.09] hover:border-white/[0.15] transition-all duration-500 ${
                                                        mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                                                    }`}
                                                    style={{ transitionDelay: `${400 + i * 150}ms` }}
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                        {doc.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white/90 font-semibold text-sm truncate">{doc.title}</p>
                                                        <p className="text-white/30 text-xs truncate">{doc.desc}</p>
                                                    </div>
                                                    <span className={`flex-shrink-0 text-[10px] font-bold text-white px-2.5 py-1 rounded-lg bg-gradient-to-r ${doc.tagColor}`}>
                                                        {doc.tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Stats Mini-Badges */}
                                        <div className="flex items-center gap-3 mt-6">
                                            {[
                                                { value: '8+', label: 'Vorlagen' },
                                                { value: '4', label: 'Kategorien' },
                                                { value: '∞', label: 'Downloads' },
                                            ].map((stat, i) => (
                                                <div key={i} className="flex-1 bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl px-4 py-3 text-center">
                                                    <p className="text-white/80 font-black text-lg">{stat.value}</p>
                                                    <p className="text-white/25 text-[10px] font-medium uppercase tracking-wider">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Welle */}
                <div className="relative z-20 h-16 sm:h-20 lg:h-24 -mt-px">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none">
                        <path d="M0 96H1440V32C1440 32 1320 0 1200 16C1080 32 960 64 720 64C480 64 360 32 240 16C120 0 0 32 0 32V96Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Templates Section */}
            <section id="vorlagen" className="py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-6xl">
                    {/* Category Filter */}
                    <div className="mb-8 flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                                    selectedCategory === category.id
                                        ? 'bg-primary-600 text-white shadow-lg'
                                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Templates Grid */}
                    {filteredTemplates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTemplates.map((template) => {
                                const IconComponent = template.icon;
                                return (
                                    <div
                                        key={template.id}
                                        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                                                <IconComponent className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                                                    {template.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                                    <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 font-medium">
                                                        {template.fileType}
                                                    </span>
                                                    <span>{template.fileSize}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                                            {template.description}
                                        </p>
                                        <button
                                            onClick={() => handleDownload(template)}
                                            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-primary-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                        >
                                            <ArrowDownTrayIcon className="w-5 h-5" />
                                            <span>{t.download}</span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-slate-500 text-lg">{t.noTemplates}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default VorlagenPage;
