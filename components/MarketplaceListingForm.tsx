import React, { useState, useRef } from 'react';
import { 
    TagIcon, MapPinIcon, ArrowRightIcon, 
    CheckCircleIcon, RocketLaunchIcon, BanknotesIcon, 
    PhotoIcon, XMarkIcon, ChevronDownIcon, EyeIcon,
    ClockIcon, TrashIcon, ArrowUpTrayIcon,
    BoldIcon, ItalicIcon, ListBulletIcon,
    ColoredTruckIcon, ColoredDiggerIcon, ColoredToolboxIcon,
    UserIcon, MailIcon, PhoneIcon
} from './icons';

const initialFormData = {
    type: 'Miet-Inserat', // or 'Verkaufs-Inserat'
    title: '',
    category: 'Baumaschinen',
    location: '',
    price: '',
    condition: 'Neuwertig', // Only for Sales
    description: '',
    images: [] as string[],
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
};

// --- Helper Components (reused style from JobPostings) ---

const InputField = ({ id, name, label, type = 'text', placeholder, value, onChange, required = false, icon, children, className }: any) => (
    <div className={className}>
        <label htmlFor={id} className="block text-sm font-bold text-slate-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
        <div className="relative">
            {icon && <div className="h-5 w-5 text-slate-400 pointer-events-none absolute inset-y-0 left-3.5 flex items-center">{icon}</div>}
            {children ? children : (
                <input 
                    type={type} 
                    name={name} 
                    id={id} 
                    className={`w-full rounded-xl border-slate-200 bg-white ${icon ? 'pl-11' : 'px-4'} shadow-sm py-3.5 text-slate-700 transition focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border`} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange} 
                    required={required} 
                    aria-required={required}
                />
            )}
        </div>
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

        switch (format) {
            case 'bold': replacement = `**${selectedText}**`; break;
            case 'italic': replacement = `*${selectedText}*`; break;
            case 'bullet': replacement = `\n* ${selectedText}`; break;
        }

        const newValue = `${value.substring(0, start)}${replacement}${value.substring(end)}`;
        const event = { target: { name, value: newValue } } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(event);
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

const MultiImageUploader = ({ images, onChange }: { images: string[], onChange: (images: string[]) => void }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) processFiles(Array.from(e.target.files));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) processFiles(Array.from(e.dataTransfer.files));
    };

    const processFiles = (files: File[]) => {
        const remainingSlots = 5 - images.length;
        const filesToProcess = files.slice(0, remainingSlots);

        Promise.all(filesToProcess.map(file => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.readAsDataURL(file);
            });
        })).then(newImages => {
            onChange([...images, ...newImages]);
        });
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">Bilder (Max. 5)</label>
            
            {images.length < 5 && (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`group relative w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50'}`}
                    role="button"
                    aria-label="Bilder hochladen"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                >
                    <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                         <ArrowUpTrayIcon className={`w-6 h-6 ${isDragging ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-500'}`} />
                    </div>
                    <p className="text-sm text-slate-600 font-medium"><span className="text-primary-600">Klicken</span> oder Bilder hierher ziehen</p>
                    <input ref={fileInputRef} type="file" className="hidden" accept="image/*" multiple onChange={handleFileChange} aria-hidden="true" />
                </div>
            )}

            {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-slate-200 shadow-sm bg-white">
                            <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => onChange(images.filter((_, i) => i !== idx))} className="absolute top-1 right-1 p-1 bg-white rounded-full text-red-600 shadow-sm opacity-0 group-hover:opacity-100 transition-all" aria-label={`Entferne Bild ${idx + 1}`}>
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Main Component ---

interface MarketplaceListingFormProps {
    onSuccess: (posted: boolean) => void;
}

const STEPS = [
    { id: 1, title: "Kategorie", icon: <TagIcon className="w-5 h-5"/> },
    { id: 2, title: "Basisdaten", icon: <BanknotesIcon className="w-5 h-5"/> },
    { id: 3, title: "Details & Bilder", icon: <PhotoIcon className="w-5 h-5"/> },
    { id: 4, title: "Kontakt", icon: <UserIcon className="w-5 h-5"/> },
    { id: 5, title: "Vorschau", icon: <EyeIcon className="w-5 h-5"/> },
];

const MarketplaceListingForm: React.FC<MarketplaceListingFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => { if (currentStep < 5) setCurrentStep(s => s + 1); };
    const prevStep = () => { if (currentStep > 1) setCurrentStep(s => s - 1); };

    const handleConfirmAndSubmit = () => {
        // Simulation of API call
        onSuccess(true);
    };

    const FeeConfirmationModal = () => (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsFeeModalOpen(false)} role="dialog" aria-modal="true" aria-labelledby="fee-modal-title">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h3 id="fee-modal-title" className="text-xl font-bold text-slate-900">Bestätigung erforderlich</h3>
                    <button onClick={() => setIsFeeModalOpen(false)} className="text-slate-500 hover:text-slate-800" aria-label="Schliessen"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600">
                        <BanknotesIcon className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 mt-2">Inserat veröffentlichen</h4>
                    <p className="text-slate-500 mt-2 mb-6">
                        Ihr Inserat wird für 30 Tage auf dem Marktplatz sichtbar sein.
                    </p>
                    
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                        <div className="flex justify-between items-baseline">
                            <span className="text-slate-600 font-medium">Gebühr</span>
                            <span className="text-3xl font-black text-slate-900">CHF 9.90</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4">Der Betrag wird von Ihrem Guthaben abgebucht.</p>
                </div>
                <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-end items-center gap-3 rounded-b-2xl">
                    <button onClick={() => setIsFeeModalOpen(false)} className="px-5 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors">Abbrechen</button>
                    <button onClick={handleConfirmAndSubmit} className="bg-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-700 shadow-lg transition-all">Kostenpflichtig bestellen</button>
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
                        Marktplatz
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">Neues Inserat erstellen</h2>
                    <p className="text-lg text-slate-600">
                        Verkaufen oder vermieten Sie Ihr Equipment an andere Profis.
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
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive ? 'bg-primary-600 border-primary-600 text-white shadow-lg' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>
                                                {isCompleted ? <CheckCircleIcon className="w-6 h-6"/> : step.icon}
                                            </div>
                                            <span className={`font-bold text-sm ${isActive ? 'text-primary-700' : isCompleted ? 'text-green-600' : 'text-slate-500'}`}>{step.title}</span>
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
                                
                                {/* STEP 1: TYP & KATEGORIE */}
                                {currentStep === 1 && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Neues Miet-Inserat erstellen</h3>
                                            <p className="text-slate-500">Wählen Sie eine passende Kategorie für Ihr Mietobjekt.</p>
                                        </div>
                                        
                                        <SelectField 
                                            id="category" 
                                            name="category" 
                                            label="Kategorie" 
                                            value={formData.category} 
                                            onChange={handleChange} 
                                            icon={<TagIcon />}
                                            options={['Baumaschinen', 'Werkzeuge & Geräte', 'Fahrzeuge & Anhänger', 'Gerüste & Bauzubehör', 'Reinigung', 'Garten & Landschaft', 'Event & Party', 'Sonstiges']}
                                        />
                                    </div>
                                )}

                                {/* STEP 2: BASISDATEN */}
                                {currentStep === 2 && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Basisdaten</h3>
                                            <p className="text-slate-500">Geben Sie Titel, Preis und Standort an.</p>
                                        </div>
                                        <InputField id="title" name="title" label="Titel des Inserats" placeholder="z.B. Profi-Bohrhammer Hilti TE-60" value={formData.title} onChange={handleChange} required />
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField id="price" name="price" label={formData.type === 'Miet-Inserat' ? "Mietpreis (pro Tag/Woche)" : "Verkaufspreis"} placeholder="CHF" value={formData.price} onChange={handleChange} required icon={<BanknotesIcon />} />
                                            <InputField id="location" name="location" label="Standort" placeholder="PLZ, Ort" value={formData.location} onChange={handleChange} required icon={<MapPinIcon />} />
                                        </div>

                                        {formData.type === 'Verkaufs-Inserat' && (
                                             <SelectField 
                                                id="condition" 
                                                name="condition" 
                                                label="Zustand" 
                                                value={formData.condition} 
                                                onChange={handleChange} 
                                                options={['Neuwertig', 'Sehr gut', 'Gut', 'Gebraucht', 'Defekt / Für Bastler']}
                                            />
                                        )}
                                    </div>
                                )}

                                {/* STEP 3: DETAILS & BILDER */}
                                {currentStep === 3 && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Details & Bilder</h3>
                                            <p className="text-slate-500">Beschreiben Sie Ihr Angebot und laden Sie Bilder hoch.</p>
                                        </div>
                                        <RichTextEditor id="description" name="description" label="Beschreibung" value={formData.description} onChange={handleChange} required rows={6} placeholder="Technische Daten, Besonderheiten, Zubehör..." />
                                        <MultiImageUploader images={formData.images} onChange={(newImages) => setFormData(prev => ({ ...prev, images: newImages }))} />
                                    </div>
                                )}

                                {/* STEP 4: KONTAKT */}
                                {currentStep === 4 && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Kontaktinformationen</h3>
                                            <p className="text-slate-500">Wie sollen Interessenten Sie erreichen?</p>
                                        </div>
                                        <InputField id="contactPerson" name="contactPerson" label="Ansprechperson" placeholder="Ihr Name" value={formData.contactPerson} onChange={handleChange} icon={<UserIcon />} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField id="contactEmail" name="contactEmail" label="E-Mail" type="email" placeholder="ihre.email@firma.ch" value={formData.contactEmail} onChange={handleChange} icon={<MailIcon />} />
                                            <InputField id="contactPhone" name="contactPhone" label="Telefon / Mobile" type="tel" placeholder="+41 79 ..." value={formData.contactPhone} onChange={handleChange} icon={<PhoneIcon />} />
                                        </div>
                                    </div>
                                )}

                                {/* STEP 5: VORSCHAU */}
                                {currentStep === 5 && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-slate-900">Vorschau</h3>
                                            <p className="text-slate-500">Überprüfen Sie Ihr Inserat vor der Veröffentlichung.</p>
                                        </div>

                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden max-w-2xl mx-auto">
                                            <div className="aspect-video bg-slate-100 relative">
                                                {formData.images.length > 0 ? (
                                                    <img src={formData.images[0]} alt="Vorschau" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400"><PhotoIcon className="w-16 h-16"/></div>
                                                )}
                                                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${formData.type === 'Miet-Inserat' ? 'bg-blue-600' : 'bg-green-600'}`}>
                                                    {formData.type === 'Miet-Inserat' ? 'Mieten' : 'Kaufen'}
                                                </span>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-xs font-bold text-primary-600 uppercase tracking-wide bg-primary-50 px-2 py-0.5 rounded">{formData.category}</span>
                                                    <span className="text-xl font-extrabold text-slate-900">{formData.price}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{formData.title || 'Titel'}</h3>
                                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                                                    <MapPinIcon className="w-4 h-4" /> {formData.location || 'Ort'}
                                                </div>
                                                <div className="prose prose-slate max-w-none text-sm text-slate-600 border-t border-slate-100 pt-4">
                                                    <p className="whitespace-pre-wrap">{formData.description || 'Keine Beschreibung'}</p>
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
                                <button onClick={prevStep} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all">Zurück</button>
                            ) : <div></div>}
                            
                            {currentStep < 5 ? (
                                <button onClick={nextStep} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20 transform active:scale-95">
                                    Nächster Schritt <ArrowRightIcon className="w-5 h-5" />
                                </button>
                            ) : (
                                <button onClick={() => setIsFeeModalOpen(true)} className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center gap-2 shadow-lg shadow-primary-600/30 transform active:scale-95">
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

export default MarketplaceListingForm;