
import React, { useState, useRef } from 'react';
import { 
    BriefcaseIcon, PencilIcon, MapPinIcon, ArrowRightIcon, UsersIcon, 
    CheckCircleIcon, RocketLaunchIcon, BuildingOfficeIcon, ClockIcon, CalendarDaysIcon, ArrowUpTrayIcon,
    BanknotesIcon, UserIcon, MailIcon, HomeModernIcon, Squares2X2Icon, UserCheckIcon, BuildingOffice2Icon, PencilSquareIcon, TruckIcon,
    BoldIcon, ItalicIcon, ListBulletIcon, XMarkIcon, ChevronDownIcon, EyeIcon
} from './icons';

const initialFormData = {
    jobTitle: '',
    companyName: '',
    location: '',
    category: 'Handwerk',
    employmentType: 'Vollzeit',
    workload: '',
    experienceLevel: 'Mit Berufserfahrung',
    drivingLicense: 'Nicht erforderlich',
    startDate: 'Ab sofort',
    tasks: '',
    requirements: '',
    weOffer: '',
    companyDescription: '',
    companyWebsite: '',
    contactPerson: '',
    applicationLink: '',
    contactEmail: '',
    applicationDeadline: '',
};

const InputField = ({ id, name, label, type = 'text', placeholder, value, onChange, required = false, icon, children, className, error }: any) => (
    <div className={className}>
        <label htmlFor={id} className="block text-sm font-bold text-slate-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
        <div className="relative">
            {icon && <div className="h-5 w-5 text-slate-400 pointer-events-none absolute inset-y-0 left-3.5 flex items-center">{icon}</div>}
            {children ? children : (
                <input 
                    type={type} 
                    name={name} 
                    id={id} 
                    className={`w-full rounded-xl border-slate-200 bg-white ${icon ? 'pl-11' : 'px-4'} shadow-sm py-3.5 text-slate-700 transition focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border ${error ? 'border-red-500' : ''}`} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange} 
                    required={required} 
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
            )}
        </div>
        {error && <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

const SelectField = ({ id, name, label, value, onChange, icon, options }: any) => (
    <div>
        <label htmlFor={id} className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
        <div className="relative">
            {icon && <div className="h-5 w-5 text-slate-400 pointer-events-none absolute inset-y-0 left-3.5 flex items-center">{icon}</div>}
            <select 
                name={name} 
                id={id} 
                value={value} 
                onChange={onChange} 
                className={`w-full rounded-xl border-slate-200 bg-white ${icon ? 'pl-11' : 'px-4'} pr-10 shadow-sm py-3.5 text-slate-700 appearance-none transition focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border`}
            >
                {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute inset-y-0 right-3.5 flex items-center top-3.5" />
        </div>
    </div>
);

const RichTextEditor = ({ id, name, label, value, onChange, rows = 5, placeholder, required = false }: any) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const applyFormat = (format: 'bold' | 'italic' | 'bullet') => {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        let replacement = '';
        let cursorOffset = 0;

        switch (format) {
            case 'bold':
                replacement = `**${selectedText}**`;
                cursorOffset = 2;
                break;
            case 'italic':
                replacement = `*${selectedText}*`;
                cursorOffset = 1;
                break;
            case 'bullet': {
                const isNewLine = start === 0 || value.charAt(start - 1) === '\n' || value.charAt(start - 1) === '';
                const prefix = isNewLine ? '* ' : '\n* ';
                replacement = `${prefix}${selectedText}`;
                cursorOffset = prefix.length;
                break;
            }
            default:
                return;
        }

        const newValue = `${value.substring(0, start)}${replacement}${value.substring(end)}`;
        
        const event = {
            target: { name, value: newValue }
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(event);
        
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                const finalCursorPos = selectedText.length > 0 ? (start + replacement.length) : (start + cursorOffset);
                textareaRef.current.setSelectionRange(finalCursorPos, finalCursorPos);
            }
        }, 0);
    };
    
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-bold text-slate-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition overflow-hidden">
                <div className="px-2 py-1.5 border-b border-slate-100 bg-slate-50 flex items-center gap-1">
                    <button type="button" onClick={() => applyFormat('bold')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors" aria-label="Fett"><BoldIcon className="w-4 h-4"/></button>
                    <button type="button" onClick={() => applyFormat('italic')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors" aria-label="Kursiv"><ItalicIcon className="w-4 h-4"/></button>
                    <button type="button" onClick={() => applyFormat('bullet')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors" aria-label="Aufzählungszeichen"><ListBulletIcon className="w-4 h-4"/></button>
                </div>
                <textarea
                    ref={textareaRef}
                    name={name}
                    id={id}
                    rows={rows}
                    className="w-full bg-transparent p-4 outline-none resize-vertical text-slate-700"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    aria-required={required}
                ></textarea>
            </div>
        </div>
    );
};

interface JobPostingsProps {
    onSuccess: (posted: boolean) => void;
}

const STEPS = [
    { id: 1, title: "Basisdaten", icon: <BriefcaseIcon className="w-5 h-5"/> },
    { id: 2, title: "Details", icon: <ClockIcon className="w-5 h-5"/> },
    { id: 3, title: "Beschreibung", icon: <PencilSquareIcon className="w-5 h-5"/> },
    { id: 4, title: "Kontakt", icon: <BuildingOfficeIcon className="w-5 h-5"/> },
    { id: 5, title: "Vorschau", icon: <EyeIcon className="w-5 h-5"/> },
];

const JobPostings: React.FC<JobPostingsProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        // Basic validation could go here
        if (currentStep < 5) setCurrentStep(s => s + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(s => s - 1);
    };

    const handleConfirmAndSubmit = () => {
        console.log("Job posting submitted:", formData);
        setFormData(initialFormData);
        setIsFeeModalOpen(false);
        onSuccess(true);
        setCurrentStep(1);
    };

    const closeFeeModal = () => setIsFeeModalOpen(false);

    const FeeConfirmationModal = () => (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={closeFeeModal} role="dialog" aria-modal="true" aria-labelledby="fee-modal-title">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h3 id="fee-modal-title" className="text-xl font-bold text-slate-900">Bestätigung erforderlich</h3>
                    <button onClick={closeFeeModal} className="text-slate-500 hover:text-slate-800" aria-label="Schliessen"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600">
                        <BanknotesIcon className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 mt-2">Stelle veröffentlichen</h4>
                    <p className="text-slate-500 mt-2 mb-6">
                        Ihr Inserat wird sofort für Tausende von Fachkräften sichtbar sein.
                    </p>
                    
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                        <div className="flex justify-between items-baseline">
                            <span className="text-slate-600 font-medium">Gebühr für 30 Tage</span>
                            <span className="text-3xl font-black text-slate-900">CHF 29.00</span>
                        </div>
                    </div>
                    
                    <p className="text-xs text-slate-400 mt-4">
                        Der Betrag wird von Ihrem Guthaben oder der hinterlegten Zahlungsmethode abgebucht.
                    </p>
                </div>
                <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-end items-center gap-3 rounded-b-2xl">
                    <button onClick={closeFeeModal} className="px-5 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors">
                        Abbrechen
                    </button>
                    <button onClick={handleConfirmAndSubmit} className="bg-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all transform active:scale-95">
                        Kostenpflichtig bestellen
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <section className="bg-slate-50 min-h-screen py-12">
             {isFeeModalOpen && <FeeConfirmationModal />}
            <div className="container mx-auto px-4 md:px-6">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-flex items-center gap-1.5 text-primary-700 font-bold bg-primary-50 border border-primary-100 px-3 py-1 rounded-full text-xs uppercase tracking-wide mb-4">
                        <RocketLaunchIcon className="w-3.5 h-3.5" />
                        Für Arbeitgeber
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">Neue Stelle ausschreiben</h2>
                    <p className="text-lg text-slate-600">
                        Finden Sie qualifizierte Fachkräfte aus unserem Netzwerk in wenigen Schritten.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Stepper */}
                    <div className="mb-8 overflow-x-auto pb-4 md:pb-0">
                        <div className="flex items-center justify-between min-w-[600px] px-2">
                            {STEPS.map((step, index) => {
                                const isActive = currentStep === step.id;
                                const isCompleted = currentStep > step.id;
                                return (
                                    <div key={step.id} className="flex items-center flex-1 last:flex-none">
                                        <div className={`flex items-center gap-3 ${isActive ? 'opacity-100' : isCompleted ? 'opacity-100' : 'opacity-50'}`}>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                                isActive ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/30' : 
                                                isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                                                'bg-white border-slate-300 text-slate-400'
                                            }`}>
                                                {isCompleted ? <CheckCircleIcon className="w-6 h-6"/> : step.icon}
                                            </div>
                                            <span className={`font-bold text-sm ${isActive ? 'text-primary-700' : isCompleted ? 'text-green-600' : 'text-slate-500'}`}>
                                                {step.title}
                                            </span>
                                        </div>
                                        {index < STEPS.length - 1 && (
                                            <div className="h-0.5 flex-1 mx-4 bg-slate-200 relative">
                                                <div className={`absolute top-0 left-0 h-full bg-green-500 transition-all duration-500`} style={{ width: isCompleted ? '100%' : '0%' }}></div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden relative">
                        {/* Progress Bar Top */}
                        <div className="h-1.5 bg-slate-100 w-full">
                            <div className="h-full bg-primary-500 transition-all duration-500 ease-out" style={{ width: `${(currentStep / STEPS.length) * 100}%` }}></div>
                        </div>

                        <div className="p-6 md:p-10">
                            <form onSubmit={(e) => e.preventDefault()}>
                                
                                {/* STEP 1: BASISDATEN */}
                                {currentStep === 1 && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Basisdaten zur Stelle</h3>
                                            <p className="text-slate-500">Worum geht es bei diesem Job?</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField id="jobTitle" name="jobTitle" label="Stellentitel" placeholder="z.B. Maler EFZ" value={formData.jobTitle} onChange={handleChange} required icon={<BriefcaseIcon />} />
                                            <InputField id="companyName" name="companyName" label="Firmenname" placeholder="Ihre Firma AG" value={formData.companyName} onChange={handleChange} required icon={<BuildingOfficeIcon />} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField id="location" name="location" label="Arbeitsort" placeholder="PLZ, Ort" value={formData.location} onChange={handleChange} required icon={<MapPinIcon />} />
                                            <SelectField 
                                                id="category" 
                                                name="category" 
                                                label="Kategorie" 
                                                value={formData.category} 
                                                onChange={handleChange} 
                                                icon={<Squares2X2Icon />}
                                                options={['Handwerk', 'Bau & Renovation', 'Reinigung & Unterhalt', 'Garten & Landschaft', 'Umzug & Transport', 'Büro & Administration', 'IT & Technik', 'Sonstiges']}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: DETAILS */}
                                {currentStep === 2 && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Rahmenbedingungen</h3>
                                            <p className="text-slate-500">Definieren Sie die Anforderungen und Konditionen.</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <SelectField 
                                                id="employmentType" 
                                                name="employmentType" 
                                                label="Anstellungsart" 
                                                value={formData.employmentType} 
                                                onChange={handleChange} 
                                                icon={<ClockIcon />}
                                                options={['Vollzeit', 'Teilzeit', 'Temporär', 'Praktikum', 'Freelance']}
                                            />
                                            <InputField id="workload" name="workload" label="Pensum (%)" placeholder="z.B. 80-100" value={formData.workload} onChange={handleChange} />
                                            <SelectField 
                                                id="startDate" 
                                                name="startDate" 
                                                label="Startdatum" 
                                                value={formData.startDate} 
                                                onChange={handleChange} 
                                                icon={<CalendarDaysIcon />}
                                                options={['Ab sofort', 'Nach Vereinbarung', 'Zum Monatserstern']}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <SelectField 
                                                id="experienceLevel" 
                                                name="experienceLevel" 
                                                label="Berufserfahrung" 
                                                value={formData.experienceLevel} 
                                                onChange={handleChange} 
                                                icon={<UserCheckIcon />}
                                                options={['Berufseinsteiger', 'Mit Berufserfahrung', 'Senior / Experte', 'Führungskraft']}
                                            />
                                            <SelectField 
                                                id="drivingLicense" 
                                                name="drivingLicense" 
                                                label="Führerausweis" 
                                                value={formData.drivingLicense} 
                                                onChange={handleChange} 
                                                icon={<TruckIcon />}
                                                options={['Nicht erforderlich', 'Kategorie B (PKW)', 'Kategorie C (LKW)', 'Kategorie D (Bus)', 'Staplerausweis', 'Sonstige']}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: BESCHREIBUNG */}
                                {currentStep === 3 && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Stellenbeschreibung</h3>
                                            <p className="text-slate-500">Nutzen Sie die Formatierungstools für eine bessere Lesbarkeit.</p>
                                        </div>
                                        <RichTextEditor id="tasks" name="tasks" label="Ihre Aufgaben" value={formData.tasks} onChange={handleChange} required rows={5} placeholder="Beschreiben Sie die Hauptaufgaben und Verantwortlichkeiten..." />
                                        <RichTextEditor id="requirements" name="requirements" label="Ihr Profil / Anforderungen" value={formData.requirements} onChange={handleChange} required rows={5} placeholder="Welche Qualifikationen, Fähigkeiten und Erfahrungen sind erforderlich?" />
                                        <RichTextEditor id="weOffer" name="weOffer" label="Was wir bieten" value={formData.weOffer} onChange={handleChange} rows={4} placeholder="Benefits, Teamkultur, Weiterbildungsmöglichkeiten etc." />
                                    </div>
                                )}

                                {/* STEP 4: KONTAKT */}
                                {currentStep === 4 && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Bewerbung & Kontakt</h3>
                                            <p className="text-slate-500">Wie sollen sich Kandidaten bewerben?</p>
                                        </div>
                                        <InputField id="applicationLink" name="applicationLink" label="Bewerbungslink oder E-Mail" placeholder="https://... oder jobs@firma.ch" value={formData.applicationLink} onChange={handleChange} required icon={<ArrowUpTrayIcon />} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField id="contactPerson" name="contactPerson" label="Kontaktperson (optional)" placeholder="Max Mustermann" value={formData.contactPerson} onChange={handleChange} icon={<UserIcon />} />
                                            <InputField id="applicationDeadline" name="applicationDeadline" label="Bewerbungsfrist (optional)" type="date" value={formData.applicationDeadline} onChange={handleChange} icon={<CalendarDaysIcon />} />
                                        </div>
                                        
                                        <div className="pt-6 border-t border-slate-100">
                                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><BuildingOffice2Icon className="w-5 h-5 text-primary-600"/> Über Ihre Firma (Optional)</h4>
                                            <div className="space-y-4">
                                                <InputField id="companyDescription" name="companyDescription" label="Kurzbeschreibung" value={formData.companyDescription} onChange={handleChange}>
                                                    <textarea name="companyDescription" id="companyDescription" rows={3} className="w-full rounded-xl border-slate-200 bg-white shadow-sm py-3 px-4 text-slate-700 border focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Stellen Sie Ihre Firma kurz vor..." value={formData.companyDescription} onChange={handleChange}></textarea>
                                                </InputField>
                                                <InputField id="companyWebsite" name="companyWebsite" label="Webseite" type="url" placeholder="https://..." value={formData.companyWebsite} onChange={handleChange} icon={<PencilIcon />} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 5: VORSCHAU */}
                                {currentStep === 5 && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-slate-900">Vorschau Ihrer Anzeige</h3>
                                            <p className="text-slate-500">So wird die Stelle für Bewerber aussehen.</p>
                                        </div>

                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden max-w-3xl mx-auto">
                                            {/* Preview Header */}
                                            <div className="bg-slate-50 border-b border-slate-100 p-6 md:p-8">
                                                <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-bold mb-4 uppercase tracking-wider">{formData.category}</span>
                                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{formData.jobTitle || 'Stellentitel'}</h2>
                                                <div className="flex flex-wrap gap-y-2 gap-x-6 text-slate-600 font-medium text-sm">
                                                    <span className="flex items-center gap-1.5"><BuildingOfficeIcon className="w-4 h-4"/> {formData.companyName || 'Firmenname'}</span>
                                                    <span className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4"/> {formData.location || 'Ort'}</span>
                                                    <span className="flex items-center gap-1.5"><ClockIcon className="w-4 h-4"/> {formData.employmentType}, {formData.workload || '100'}%</span>
                                                </div>
                                            </div>
                                            
                                            {/* Preview Body */}
                                            <div className="p-6 md:p-8 space-y-8">
                                                <div className="prose prose-slate max-w-none">
                                                    <h4 className="text-lg font-bold text-slate-900 mb-2">Ihre Aufgaben</h4>
                                                    <p className="whitespace-pre-wrap">{formData.tasks || 'Keine Aufgaben definiert.'}</p>
                                                    
                                                    <h4 className="text-lg font-bold text-slate-900 mb-2 mt-6">Das bringen Sie mit</h4>
                                                    <p className="whitespace-pre-wrap">{formData.requirements || 'Keine Anforderungen definiert.'}</p>
                                                    
                                                    <h4 className="text-lg font-bold text-slate-900 mb-2 mt-6">Wir bieten</h4>
                                                    <p className="whitespace-pre-wrap">{formData.weOffer || 'Keine Benefits definiert.'}</p>
                                                </div>

                                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                                    <div>
                                                        <p className="font-bold text-slate-900">Haben wir Ihr Interesse geweckt?</p>
                                                        <p className="text-sm text-slate-500">Bewerben Sie sich jetzt direkt online.</p>
                                                    </div>
                                                    <button className="bg-primary-600 text-white font-bold py-3 px-6 rounded-lg shadow-md pointer-events-none opacity-90">
                                                        Jetzt bewerben
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Actions Footer */}
                        <div className="bg-slate-50 border-t border-slate-200 p-6 flex justify-between items-center">
                             {currentStep > 1 ? (
                                <button 
                                    onClick={prevStep}
                                    className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all"
                                >
                                    Zurück
                                </button>
                            ) : (
                                <div></div> 
                            )}
                            
                            {currentStep < 5 ? (
                                <button 
                                    onClick={nextStep}
                                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20 transform active:scale-95"
                                >
                                    Nächster Schritt <ArrowRightIcon className="w-5 h-5" />
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setIsFeeModalOpen(true)}
                                    className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center gap-2 shadow-lg shadow-primary-600/30 transform active:scale-95"
                                >
                                    Kostenpflichtig veröffentlichen <RocketLaunchIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobPostings;
