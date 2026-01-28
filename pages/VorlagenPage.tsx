import React from 'react';
import { useAppContext } from './AppContext';
import { ArrowDownTrayIcon, DocumentTextIcon, ClipboardDocumentListIcon } from '../components/icons';

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
        // Hier würde normalerweise der Download-Link geöffnet werden
        // Für Demo-Zwecke zeigen wir eine Alert
        alert(`Download: ${template.name}\n\nIn einer echten Anwendung würde hier die Datei heruntergeladen werden.`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
            {/* Hero Section – Dokumentenhub mit Fokus auf Übersicht */}
            <section className="relative overflow-hidden py-14 md:py-18">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-200/50 rounded-full blur-3xl" />
                    <div className="absolute -bottom-32 right-0 w-72 h-72 bg-primary-200/40 rounded-full blur-3xl" />
                    <div className="absolute inset-0 opacity-60 mix-blend-overlay bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.25),transparent_60%)]" />
                </div>

                <div className="relative z-10 container mx-auto px-6 max-w-6xl">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
                        {/* Linke Spalte: Claim & „Dokumentenarbeitsplatz“ */}
                        <div className="space-y-5">
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] sm:text-xs font-semibold text-emerald-800 border border-emerald-100">
                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white">
                                    ✓
                                </span>
                                Für Offerten, Verträge, Checklisten & Rechnungen
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                                {t.title}
                            </h1>
                            <p className="text-base sm:text-lg text-slate-700 font-semibold">
                                {t.subtitle}
                            </p>
                            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                                {t.description} Statt jedes Dokument neu zu schreiben, starten Sie mit einer geprüften Struktur und passen
                                nur noch Inhalte wie Kunde, Projekt und Preise an.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                <div className="rounded-xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
                                    <p className="text-xs font-semibold text-slate-500 mb-1">Zeit sparen</p>
                                    <p className="text-sm font-bold text-slate-900">In wenigen Minuten einsatzbereit</p>
                                </div>
                                <div className="rounded-xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
                                    <p className="text-xs font-semibold text-slate-500 mb-1">Struktur</p>
                                    <p className="text-sm font-bold text-slate-900">Klare Gliederung für jedes Dokument</p>
                                </div>
                                <div className="rounded-xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
                                    <p className="text-xs font-semibold text-slate-500 mb-1">Formate</p>
                                    <p className="text-sm font-bold text-slate-900">DOCX, PDF &amp; Excel-Vorlagen</p>
                                </div>
                            </div>
                        </div>

                        {/* Rechte Spalte: „Vorlagen-Board“ mit Kategorien & Infos */}
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-100/70 via-white to-primary-100/60 blur-xl opacity-80" />
                            <div className="relative rounded-3xl border border-slate-200 bg-white/90 shadow-xl p-5 sm:p-6 flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                            Dokumentenübersicht
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            {templates.length} vorbereitete Vorlagen in {categories.length - 1} Kategorien
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-100">
                                        <ArrowDownTrayIcon className="w-3.5 h-3.5" />
                                        Gratis-Download
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-[11px] sm:text-xs">
                                    {categories
                                        .filter(c => c.id !== 'all')
                                        .map(cat => (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`flex flex-col items-start gap-1 rounded-xl border px-3 py-2 text-left transition-all ${
                                                    selectedCategory === cat.id
                                                        ? 'bg-primary-600 text-white border-primary-500 shadow-md shadow-primary-500/30'
                                                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                                }`}
                                            >
                                                <span className="text-[10px] uppercase tracking-[0.18em] opacity-70">
                                                    Kategorie
                                                </span>
                                                <span className="font-semibold line-clamp-2">{cat.name}</span>
                                                {selectedCategory === cat.id && (
                                                    <span className="text-[10px] opacity-80">
                                                        Zeigt unten nur {cat.name}-Vorlagen
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                                    <span className="inline-flex items-center gap-1.5">
                                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Ideal für Handwerker, Bau & Renovation
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Direkte Bearbeitung in Word, Excel & PDF-Editor
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            <section className="py-12 md:py-16">
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
