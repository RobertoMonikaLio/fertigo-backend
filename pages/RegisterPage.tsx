import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowRightIcon, BuildingOfficeIcon, UserIcon, MailIcon, BriefcaseIcon, 
    SpinnerIcon, CheckCircleIcon, LockClosedIcon, EyeIcon, EyeSlashIcon,
    ArrowUpTrayIcon, TrashIcon, CreditCardIcon, ShieldCheckIcon,
    XMarkIcon, QuestionMarkCircleIcon, ExclamationTriangleIcon,
    TwintIcon, PencilIcon, ArrowTrendingUpIcon, UsersIcon, ArrowLeftIcon
} from '../components/icons';


// --- MOCK DATA & CONFIG ---

const DIENSTE_LIST = [
    'Bodenleger', 'Elektriker', 'Entsorgung & Räumung', 'Fenstermontage',
    'Fensterreinigung', 'Gartenbau', 'Gartenpflege', 'Gipserarbeiten',
    'Handwerker Allgemein', 'Küchenbau', 'Malerarbeiten', 'Reinigung',
    'Sanitär', 'Schreiner', 'Umzug & Transport', 'Umzugsreinigung'
];

const STEPS = [
    { name: 'Firma', step: 1, icon: <BuildingOfficeIcon className="w-6 h-6"/> },
    { name: 'Konto', step: 2, icon: <UserIcon className="w-6 h-6"/> },
    { name: 'Verifizierung', step: 3, icon: <ShieldCheckIcon className="w-6 h-6"/> },
    { name: 'Abschluss', step: 4, icon: <CreditCardIcon className="w-6 h-6"/> },
];

// --- HELPER & SUB-COMPONENTS ---

const ProgressIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => (
    <div className="w-full mb-12" aria-label="Fortschritt der Registrierung">
        <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
                const isCompleted = currentStep > step.step;
                const isActive = currentStep === step.step;
                
                return (
                    <React.Fragment key={step.step}>
                        <div className="flex flex-col items-center text-center z-10" aria-current={isActive ? 'step' : undefined}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300
                                ${isCompleted ? 'bg-primary-600 border-primary-600 text-white' : ''}
                                ${isActive ? 'bg-white border-primary-600 text-primary-600' : ''}
                                ${!isCompleted && !isActive ? 'bg-slate-100 border-slate-300 text-slate-400' : ''}
                            `}>
                                {isCompleted ? <CheckCircleIcon className="w-7 h-7"/> : step.icon}
                            </div>
                            <p className={`mt-2 text-xs font-bold transition-colors ${isActive || isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>{step.name}</p>
                        </div>
                        {index < STEPS.length - 1 && (
                            <div className={`flex-1 h-1 transition-colors duration-500 -mx-2 ${currentStep > index + 1 ? 'bg-primary-500' : 'bg-slate-200'}`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    </div>
);


const ServiceSelector: React.FC<{
    selectedServices: string[];
    setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
    error?: string;
    isMobile?: boolean;
}> = ({ selectedServices, setSelectedServices, error, isMobile }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredServices = DIENSTE_LIST.filter(
        service => service.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedServices.includes(service)
    );

    const toggleService = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const baseClasses = "min-h-[58px] flex flex-wrap items-center gap-2 p-2 border-2 rounded-lg transition-colors";
    const mobileClasses = `bg-white ${error ? 'border-red-500' : 'border-slate-300 focus-within:border-primary-500'}`;
    const desktopClasses = `bg-slate-50/70 ${error ? 'border-red-500' : 'border-slate-300 focus-within:border-primary-500'}`;

    return (
        <div ref={wrapperRef}>
            <label className={`block text-sm font-medium mb-1.5 ${isMobile ? 'text-slate-700' : 'text-slate-700'}`}>Ihre Haupt-Dienstleistungen<span className="text-red-500 ml-1">*</span></label>
            <div className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}>
                {selectedServices.map(service => (
                    <div key={service} className={`flex items-center gap-1.5 text-sm font-semibold px-2 py-1 rounded ${isMobile ? 'bg-primary-100 text-primary-800' : 'bg-primary-100 text-primary-800'}`}>
                        <span>{service}</span>
                        <button type="button" onClick={() => toggleService(service)} className={`${isMobile ? 'text-primary-600 hover:text-primary-800' : 'text-primary-600 hover:text-primary-800'}`} aria-label={`Entferne ${service}`}><XMarkIcon className="w-4 h-4"/></button>
                    </div>
                ))}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); setIsOpen(true); }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={selectedServices.length === 0 ? "Dienstleistungen suchen..." : "Weitere hinzufügen..."}
                    className={`flex-1 bg-transparent outline-none p-2 ${isMobile ? 'text-slate-900 placeholder-slate-500' : 'placeholder-slate-500'}`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                />
            </div>
            {isOpen && (
                <div className={`absolute z-10 w-full mt-1 border rounded-lg shadow-lg max-h-60 overflow-y-auto ${isMobile ? 'bg-white border-slate-200' : 'bg-white border-slate-200'}`} role="listbox">
                    {filteredServices.length > 0 ? (
                        filteredServices.map(service => (
                            <button
                                type="button"
                                key={service}
                                onClick={() => {toggleService(service); setIsOpen(false); setSearchTerm('');}}
                                className={`w-full text-left px-4 py-2 ${isMobile ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-700 hover:bg-slate-100'}`}
                                role="option"
                            >
                                {service}
                            </button>
                        ))
                    ) : (
                        <p className={`px-4 py-2 ${isMobile ? 'text-slate-500' : 'text-slate-500'}`}>Keine Ergebnisse</p>
                    )}
                </div>
            )}
            {error && <p role="alert" className={`mt-1 text-xs flex items-center gap-1 ${isMobile ? 'text-red-600' : 'text-red-600'}`}><ExclamationTriangleIcon className="w-3 h-3"/> {error}</p>}
        </div>
    );
};

const VerificationFileUploader: React.FC<{
    title: string;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    helpText: string;
    infoText?: string;
    error?: string;
    isMobile?: boolean;
}> = ({ title, files, setFiles, helpText, infoText, error, isMobile }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)].slice(0, 5));
        }
    };
    
    const removeFile = (fileToRemove: File) => {
        setFiles(prev => prev.filter(f => f !== fileToRemove));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
        else if (e.type === "dragleave") setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        if (e.dataTransfer.files) setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files!)].slice(0, 5));
    };

    const isUploaded = files.length > 0;
    const baseClasses = `p-6 rounded-xl border-2 transition-all duration-300`;
    const mobileClasses = `${isUploaded ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-white'} hover:border-primary-500`;
    const desktopClasses = `${isUploaded ? 'border-green-500 bg-green-50/50' : 'border-slate-200/80 bg-white'} shadow-sm hover:shadow-md hover:border-primary-300`;

    return (
        <div className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}>
            <div className="flex items-center justify-between">
                <h4 className={`text-lg font-bold flex items-center gap-2 ${isMobile ? 'text-slate-800' : 'text-slate-800'}`}>
                    {title}
                    {infoText && <QuestionMarkCircleIcon className={`w-4 h-4 ${isMobile ? 'text-slate-400' : 'text-slate-400'}`} title={infoText} />}
                </h4>
                {isUploaded && <CheckCircleIcon className="w-6 h-6 text-green-500" />}
            </div>
            {files.length > 0 ? (
                <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                        <div key={index} className={`p-2 rounded-lg border flex items-center justify-between animate-fade-in ${isMobile ? 'bg-slate-100 border-slate-200' : 'bg-slate-100 border-slate-200'}`}>
                            <span className={`text-sm font-medium truncate ${isMobile ? 'text-slate-700' : 'text-slate-700'}`}>{file.name}</span>
                            <button type="button" onClick={() => removeFile(file)} className={`p-1.5 rounded-full ${isMobile ? 'text-red-500 hover:bg-red-100' : 'text-red-500 hover:bg-red-100'}`} aria-label={`Entferne ${file.name}`}><TrashIcon className="h-5 w-5"/></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => fileInputRef.current?.click()} className={`mt-2 text-sm font-semibold hover:underline ${isMobile ? 'text-primary-600' : 'text-primary-600'}`}>Weitere hinzufügen...</button>
                </div>
            ) : (
                <div 
                    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()} 
                    className={`mt-4 flex justify-center rounded-lg border-2 border-dashed px-6 pt-5 pb-6 hover:border-primary-400 transition-colors cursor-pointer ${isMobile ? 'bg-slate-50/50' : 'bg-slate-50/50'} ${isDragging ? 'border-primary-500 bg-primary-50' : (error ? 'border-red-500' : (isMobile ? 'border-slate-300' : 'border-slate-300'))}`}
                    role="button" aria-label="Datei hochladen"
                >
                    <div className="space-y-1 text-center">
                        <ArrowUpTrayIcon className={`mx-auto h-10 w-10 ${isMobile ? 'text-slate-400' : 'text-slate-400'}`}/>
                        <div className={`flex text-sm ${isMobile ? 'text-slate-600' : 'text-slate-600'}`}>
                            <span className={`relative cursor-pointer rounded-md font-medium ${isMobile ? 'text-primary-600 hover:text-primary-500' : 'text-primary-600 hover:text-primary-500'}`}>Datei hochladen</span>
                            <p className="pl-1">oder per Drag & Drop</p>
                        </div>
                        <p className={`text-xs ${isMobile ? 'text-slate-500' : 'text-slate-500'}`}>{helpText}</p>
                    </div>
                </div>
            )}
             <input ref={fileInputRef} type="file" className="sr-only" multiple accept="image/png, image/jpeg, application/pdf" onChange={handleFileChange} aria-hidden="true" />
             {error && <p role="alert" className={`mt-1 text-xs flex items-center gap-1 ${isMobile ? 'text-red-600' : 'text-red-600'}`}><ExclamationTriangleIcon className="w-3 h-3"/> {error}</p>}
        </div>
    );
};

const RegisterPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [uid, setUid] = useState('');
    const [isUidLoading, setIsUidLoading] = useState(false);
    const [companyData, setCompanyData] = useState<{name: string; address: string; zip: string; city: string} | null>(null);
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyZip, setCompanyZip] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [hrFiles, setHrFiles] = useState<File[]>([]);
    const [versicherungFiles, setVersicherungFiles] = useState<File[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleUidLookup = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        if (!uid) { setErrors({}); return; }
        if (!/^CHE-\d{3}\.\d{3}\.\d{3}$/.test(uid)) {
            newErrors.uid = 'Bitte geben Sie eine gültige UID im Format CHE-XXX.XXX.XXX ein.';
            setErrors(newErrors);
            return;
        }
        setIsUidLoading(true); setErrors({});
        setTimeout(() => {
            if (uid === "CHE-111.222.333") {
                const data = { name: "Musterbau AG", address: "Musterstrasse 1", zip: "8001", city: "Zürich" };
                setCompanyData(data); setCompanyName(data.name); setCompanyAddress(data.address); setCompanyZip(data.zip); setCompanyCity(data.city);
            } else {
                setErrors({ uid: 'Keine Firma unter dieser UID gefunden. Bitte prüfen Sie die Eingabe.' }); setCompanyData(null);
            }
            setIsUidLoading(false);
        }, 1500);
    };

    const validateStep = (step: number) => {
        const newErrors: Record<string, string> = {};
        if (step === 1) {
            if (companyName.trim().length < 2) newErrors.companyName = 'Firmenname ist erforderlich.';
            if (companyAddress.trim().length < 2) newErrors.companyAddress = 'Adresse ist erforderlich.';
            if (!/^\d{4}$/.test(companyZip)) newErrors.companyZip = 'Gültige PLZ ist erforderlich.';
            if (companyCity.trim().length < 2) newErrors.companyCity = 'Ort ist erforderlich.';
            if (selectedServices.length === 0) newErrors.services = 'Bitte wählen Sie mindestens eine Dienstleistung aus.';
        }
        if (step === 2) {
            if (firstName.trim().length < 2) newErrors.firstName = 'Vorname ist erforderlich.';
            if (lastName.trim().length < 2) newErrors.lastName = 'Nachname ist erforderlich.';
            if (position.trim().length < 3) newErrors.position = 'Bitte geben Sie Ihre Position an.';
            if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Bitte geben Sie eine gültige E-Mail ein.';
            if (password.length < 8) newErrors.password = 'Das Passwort muss mindestens 8 Zeichen lang sein.';
            if (password !== passwordConfirm) newErrors.passwordConfirm = 'Die Passwörter stimmen nicht überein.';
        }
        if (step === 3) { /* No validation needed */ }
        if (step === 4) { if (!agreed) newErrors.agreed = 'Sie müssen den AGB zustimmen.'; }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const nextStep = () => { if (validateStep(currentStep)) setCurrentStep(prev => prev + 1); };
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep(4)) {
            setFormState('loading');
            setTimeout(() => setFormState('success'), 2000);
        }
    }
    
    const SuccessView: React.FC<{isMobile?: boolean}> = ({ isMobile }) => {
        const baseClasses = "flex items-center justify-center p-4 animate-fade-in";
        const mobileClasses = "min-h-screen bg-slate-50 text-slate-900 flex-col";
        const desktopClasses = "";
        
        return (
             <div className={`${baseClasses} ${isMobile ? mobileClasses : ''}`}>
                <div className={`text-center p-8 sm:p-12 rounded-2xl max-w-lg ${isMobile ? 'bg-white border-2 border-green-200' : 'bg-white shadow-2xl border-2 border-green-200'}`}>
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
                    <h3 className={`mt-6 text-3xl font-bold ${isMobile ? 'text-slate-900' : 'text-slate-900'}`}>Willkommen bei Fertigo!</h3>
                    <p className={`mt-4 ${isMobile ? 'text-slate-600' : 'text-slate-600'}`}>Vielen Dank für Ihre Registrierung. Wir prüfen Ihre Dokumente und schalten Ihr Konto in der Regel innert 24 Stunden frei. Sie erhalten eine Bestätigung per E-Mail.</p>
                    <Link to="/partner/requests" className="mt-10 inline-flex items-center gap-2 bg-primary-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-700 transition-all shadow-md">
                        Zum Partner-Dashboard <ArrowRightIcon className="w-5 h-5"/>
                    </Link>
                </div>
            </div>
        );
    };

    if (formState === 'success') {
         return (
             <>
                <div className="lg:hidden"><SuccessView isMobile /></div>
                <div className="hidden lg:block min-h-screen bg-slate-100"><SuccessView /></div>
            </>
         );
    }
    
    const MobileInputField = ({ id, name, label, type = 'text', placeholder, value, onChange, required = false, icon, error, children, disabled=false }: any) => (
        <div>
            {/* Fix: Removed redundant ternary check for `isMobile` which was causing an error because it was undefined. The classes were identical anyway. */}
            <label htmlFor={id} className="block text-sm font-medium mb-1.5 text-slate-700">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
            <div className="relative">
                {icon && <div className="h-5 w-5 text-slate-400 pointer-events-none absolute inset-y-0 left-4 flex items-center">{icon}</div>}
                {children ? children : (
                    <input type={type} name={name} id={id}
                        className={`w-full h-14 rounded-xl border-2 bg-white ${icon ? 'pl-12' : 'px-4'} pr-4 text-slate-900 placeholder-slate-500 font-medium outline-none transition-all ${error ? 'border-red-500' : 'border-slate-300 focus:border-primary-500'}`}
                        placeholder={placeholder} value={value} onChange={onChange} required={required} disabled={disabled}
                    />
                )}
            </div>
            {/* Fix: Removed redundant ternary check for `isMobile` which was causing an error because it was undefined. The classes were identical anyway. */}
            {error && <p role="alert" className="mt-1 text-xs flex items-center gap-1 text-red-600"><ExclamationTriangleIcon className="w-3 h-3"/>{error}</p>}
        </div>
    );


    return (
        <>
            {/* --- NEW LIGHT MOBILE VIEW --- */}
            <div className="lg:hidden min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200 z-30">
                    <div className="h-full bg-primary-500 transition-all duration-500" style={{width: `${(currentStep - 1) / (STEPS.length - 1) * 100}%`}}></div>
                </div>

                <header className="relative z-10 p-6 flex items-center justify-between">
                     <Link to="/" className="font-extrabold text-2xl tracking-tight">Fertigo</Link>
                     <p className="font-bold text-slate-500 text-sm">Schritt {currentStep} / {STEPS.length}</p>
                </header>

                <main className="relative z-10 flex-grow overflow-y-auto p-6 pb-28">
                    {currentStep === 1 && (
                        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6 animate-fade-in">
                            <h1 className="text-3xl font-bold">Ihre Firma</h1>
                            <p className="text-slate-600 -mt-4">Erzählen Sie uns von Ihrem Unternehmen.</p>
                            
                            <div>
                                <label htmlFor="uid-mobile" className="block text-sm font-medium text-slate-700 mb-1.5">UID-Nummer (Optional)</label>
                                <div className="flex items-center gap-2">
                                    <input type="text" id="uid-mobile" value={uid} onChange={e => { setUid(e.target.value); setErrors(prev => ({...prev, uid: undefined})); }} placeholder="CHE-XXX.XXX.XXX" className={`flex-1 w-full h-12 rounded-lg border-2 bg-white px-4 text-slate-900 disabled:opacity-50 ${errors.uid ? 'border-red-500' : 'border-slate-300'}`} disabled={isUidLoading}/>
                                    <button onClick={handleUidLookup} disabled={isUidLoading} className="px-4 h-12 bg-primary-600 font-bold text-white rounded-lg hover:bg-primary-700 disabled:bg-slate-500 flex items-center justify-center w-28">
                                        {isUidLoading ? <SpinnerIcon className="w-5 h-5 animate-spin" /> : <>Suchen</>}
                                    </button>
                                </div>
                                {errors.uid && <p role="alert" className="mt-1 text-xs text-red-600">{errors.uid}</p>}
                            </div>
                             {companyData && <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 font-medium">Firmendaten geladen.</div>}

                            <MobileInputField isMobile id="companyName-mobile" label="Firmenname" required value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={!!companyData} error={errors.companyName} />
                            <MobileInputField isMobile id="companyAddress-mobile" label="Strasse & Nr." required value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} disabled={!!companyData} error={errors.companyAddress} />
                            <div className="grid grid-cols-3 gap-4">
                                <MobileInputField isMobile className="col-span-1" id="companyZip-mobile" label="PLZ" required value={companyZip} onChange={e => setCompanyZip(e.target.value)} disabled={!!companyData} error={errors.companyZip} />
                                <MobileInputField isMobile className="col-span-2" id="companyCity-mobile" label="Ort" required value={companyCity} onChange={e => setCompanyCity(e.target.value)} disabled={!!companyData} error={errors.companyCity} />
                            </div>
                            <ServiceSelector selectedServices={selectedServices} setSelectedServices={setSelectedServices} error={errors.services} isMobile />
                        </form>
                    )}
                     {currentStep === 2 && (
                        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6 animate-fade-in">
                            <h1 className="text-3xl font-bold">Ihr Konto</h1>
                            <p className="text-slate-600 -mt-4">Erstellen Sie Ihren persönlichen Zugang.</p>
                            <div className="grid grid-cols-2 gap-4">
                               <MobileInputField isMobile id="firstName-mobile" label="Vorname" required value={firstName} onChange={e => setFirstName(e.target.value)} error={errors.firstName}/>
                               <MobileInputField isMobile id="lastName-mobile" label="Nachname" required value={lastName} onChange={e => setLastName(e.target.value)} error={errors.lastName}/>
                            </div>
                            <MobileInputField isMobile id="position-mobile" label="Position" required value={position} onChange={e => setPosition(e.target.value)} error={errors.position} placeholder="z.B. Geschäftsführer"/>
                            <MobileInputField isMobile id="email-mobile" label="Login E-Mail" required value={email} onChange={e => setEmail(e.target.value)} error={errors.email} type="email"/>
                            <MobileInputField isMobile id="password-mobile" label="Passwort" required value={password} onChange={e => setPassword(e.target.value)} error={errors.password} type={isPasswordVisible ? 'text' : 'password'} />
                            <MobileInputField isMobile id="passwordConfirm-mobile" label="Passwort bestätigen" required value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} error={errors.passwordConfirm} type="password"/>
                        </form>
                    )}
                    {currentStep === 3 && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h1 className="text-3xl font-bold">Geprüfter Partner</h1>
                                <p className="text-slate-600 mt-2">Bauen Sie Vertrauen auf, indem Sie Ihre Dokumente hochladen (optional).</p>
                            </div>
                            <VerificationFileUploader title="Handelsregisterauszug" files={hrFiles} setFiles={setHrFiles} helpText="PDF, PNG, JPG (max. 5MB)" error={errors.hrFiles} isMobile />
                            <VerificationFileUploader title="Betriebshaftpflicht" files={versicherungFiles} setFiles={setVersicherungFiles} helpText="PDF, PNG, JPG (max. 5MB)" error={errors.versicherungFiles} isMobile />
                        </div>
                    )}
                    {currentStep === 4 && (
                        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
                            <div>
                                <h1 className="text-3xl font-bold">Fast geschafft!</h1>
                                <p className="text-slate-600 mt-2">Bitte prüfen Sie Ihre Angaben und schliessen Sie die Registrierung ab.</p>
                            </div>
                            <div className="text-center p-6 bg-white border border-slate-200 rounded-xl">
                                <span className="text-sm font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">AKTION</span>
                                <p className="text-slate-600 mt-4">Einmalige Einrichtungsgebühr:</p>
                                <div className="flex items-baseline justify-center gap-2 mt-1">
                                    <span className="text-2xl font-bold text-slate-500 line-through">CHF 9.95</span>
                                    <span className="text-4xl font-extrabold text-primary-600">CHF 4.95</span>
                                </div>
                            </div>
                            <div className="flex items-start"><div className="flex h-5 items-center"><input id="agree-mobile" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 rounded border-gray-400 bg-white text-primary-600 focus:ring-primary-500"/></div><div className="ml-3 text-sm"><label htmlFor="agree-mobile" className="text-slate-700">Ich stimme den <Link to="/impressum" className="font-medium text-primary-600 hover:underline">AGB</Link> und den <Link to="/impressum" className="font-medium text-primary-600 hover:underline">Datenschutzbestimmungen</Link> zu.<span className="text-red-500 ml-1">*</span></label></div></div>
                            {errors.agreed && <p role="alert" className="mt-1 text-xs text-red-600">{errors.agreed}</p>}
                        </form>
                    )}
                </main>

                <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 z-20">
                    <div className="flex items-center gap-4">
                        {currentStep > 1 && <button onClick={prevStep} className="font-bold text-slate-700 hover:text-slate-900 px-5 py-3 rounded-lg"><ArrowLeftIcon className="w-5 h-5"/></button>}
                        {currentStep < 4 && <button onClick={nextStep} className="flex-1 bg-primary-600 text-white font-bold py-3.5 rounded-lg hover:bg-primary-700">Weiter</button>}
                        {currentStep === 4 && <button onClick={handleSubmit} disabled={formState === 'loading'} className="flex-1 bg-green-600 text-white font-bold py-3.5 rounded-lg hover:bg-green-700 disabled:bg-slate-500">{formState === 'loading' ? 'Verarbeite...' : 'Kostenpflichtig abschliessen'}</button>}
                    </div>
                </footer>
            </div>

            {/* --- DESKTOP VIEW --- */}
            <div className="hidden lg:block bg-slate-100 py-12 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                     <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Partner werden</h1>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Registrieren Sie sich in wenigen Schritten und erhalten Sie Zugang zu qualifizierten Kundenanfragen.</p>
                    </div>

                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-8 sm:p-12">
                        <ProgressIndicator currentStep={currentStep} />
                        <div className="min-h-[500px] flex flex-col">
                           {/* Desktop Step Forms are here (same as before) */}
                           {currentStep === 1 && ( <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6 flex flex-col flex-grow animate-fade-in"> <div> <label htmlFor="uid" className="block text-sm font-medium text-slate-700 mb-1.5">UID-Nummer (Optional)</label> <div className="flex items-center gap-2"> <input type="text" id="uid" value={uid} onChange={e => { setUid(e.target.value); setErrors(prev => ({...prev, uid: undefined})); }} placeholder="CHE-XXX.XXX.XXX" className={`flex-1 block w-full rounded-lg border-2 bg-slate-50/70 py-3.5 px-4 focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all ${errors.uid ? 'border-red-500' : 'border-slate-300'}`} disabled={isUidLoading} aria-invalid={!!errors.uid} aria-describedby={errors.uid ? "uid-error" : undefined} /> <button onClick={handleUidLookup} disabled={isUidLoading} className="px-4 py-3.5 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all shadow-sm disabled:bg-slate-400 flex items-center justify-center w-36"> {isUidLoading ? <SpinnerIcon className="w-5 h-5 animate-spin" /> : <>Firma finden</>} </button> </div> {errors.uid && <p id="uid-error" role="alert" className="mt-1 text-xs text-red-600 flex items-center gap-1"><ExclamationTriangleIcon className="w-3 h-3"/> {errors.uid}</p>} </div> {companyData && ( <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm flex items-center justify-between animate-fade-in"><p className="text-green-800 font-medium flex items-center gap-2"><CheckCircleIcon className="w-5 h-5"/>Firmendaten wurden geladen.</p><button type="button" onClick={() => setCompanyData(null)} className="font-semibold text-green-700 hover:underline">Bearbeiten</button></div> )} <div className="space-y-4 pt-4 border-t border-slate-200"> <div> <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1.5">Offizieller Firmenname<span className="text-red-500 ml-1">*</span></label> <input id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={!!companyData} className={`block w-full rounded-lg border-2 py-3 px-4 disabled:bg-slate-200/50 disabled:text-slate-500 ${errors.companyName ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.companyName} aria-describedby={errors.companyName ? "companyName-error" : undefined} /> {errors.companyName && <p id="companyName-error" role="alert" className="mt-1 text-xs text-red-600">{errors.companyName}</p>} </div> <div> <label htmlFor="companyAddress" className="block text-sm font-medium text-slate-700 mb-1.5">Strasse & Nr.<span className="text-red-500 ml-1">*</span></label> <input id="companyAddress" value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} disabled={!!companyData} className={`block w-full rounded-lg border-2 py-3 px-4 disabled:bg-slate-200/50 disabled:text-slate-500 ${errors.companyAddress ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.companyAddress} aria-describedby={errors.companyAddress ? "companyAddress-error" : undefined} /> {errors.companyAddress && <p id="companyAddress-error" role="alert" className="mt-1 text-xs text-red-600">{errors.companyAddress}</p>} </div> <div className="grid grid-cols-3 gap-4"> <div className="col-span-1"><label htmlFor="companyZip" className="block text-sm font-medium text-slate-700 mb-1.5">PLZ<span className="text-red-500 ml-1">*</span></label><input id="companyZip" value={companyZip} onChange={e => setCompanyZip(e.target.value)} disabled={!!companyData} className={`block w-full rounded-lg border-2 py-3 px-4 disabled:bg-slate-200/50 disabled:text-slate-500 ${errors.companyZip ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.companyZip} aria-describedby={errors.companyZip ? "companyZip-error" : undefined} />{errors.companyZip && <p id="companyZip-error" role="alert" className="mt-1 text-xs text-red-600">{errors.companyZip}</p>}</div> <div className="col-span-2"><label htmlFor="companyCity" className="block text-sm font-medium text-slate-700 mb-1.5">Ort<span className="text-red-500 ml-1">*</span></label><input id="companyCity" value={companyCity} onChange={e => setCompanyCity(e.target.value)} disabled={!!companyData} className={`block w-full rounded-lg border-2 py-3 px-4 disabled:bg-slate-200/50 disabled:text-slate-500 ${errors.companyCity ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.companyCity} aria-describedby={errors.companyCity ? "companyCity-error" : undefined} />{errors.companyCity && <p id="companyCity-error" role="alert" className="mt-1 text-xs text-red-600">{errors.companyCity}</p>}</div> </div> </div> <ServiceSelector selectedServices={selectedServices} setSelectedServices={setSelectedServices} error={errors.services} /> <div className="mt-auto pt-6"><button type="submit" className="w-full bg-primary-600 text-white font-bold py-3.5 rounded-lg hover:bg-primary-700 disabled:bg-slate-400 transition-all shadow-lg text-lg flex items-center justify-center gap-2">Weiter <ArrowRightIcon className="w-5 h-5" /></button></div> </form> )}
                           {currentStep === 2 && ( <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6 flex flex-col flex-grow animate-fade-in"> <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> <div><label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1.5">Vorname<span className="text-red-500 ml-1">*</span></label><input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.firstName ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "firstName-error" : undefined} />{errors.firstName && <p id="firstName-error" role="alert" className="mt-1 text-xs text-red-600">{errors.firstName}</p>}</div> <div><label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1.5">Nachname<span className="text-red-500 ml-1">*</span></label><input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.lastName ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "lastName-error" : undefined} />{errors.lastName && <p id="lastName-error" role="alert" className="mt-1 text-xs text-red-600">{errors.lastName}</p>}</div> </div> <div><label htmlFor="position" className="block text-sm font-medium text-slate-700 mb-1.5">Position<span className="text-red-500 ml-1">*</span></label><input type="text" id="position" value={position} onChange={e => setPosition(e.target.value)} placeholder="z.B. Geschäftsführer" className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.position ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.position} aria-describedby={errors.position ? "position-error" : undefined} />{errors.position && <p id="position-error" role="alert" className="mt-1 text-xs text-red-600">{errors.position}</p>}</div> <div><label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Login E-Mail<span className="text-red-500 ml-1">*</span></label><input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.email ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>}</div> <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> <div><label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">Passwort<span className="text-red-500 ml-1">*</span></label><div className="relative"><input id="password" type={isPasswordVisible ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.password ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-error" : undefined} /><button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600" aria-label={isPasswordVisible ? "Passwort verbergen" : "Passwort anzeigen"}>{isPasswordVisible ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}</button></div>{errors.password && <p id="password-error" role="alert" className="mt-1 text-xs text-red-600">{errors.password}</p>}</div> <div><label htmlFor="passwordConfirm" className="block text-sm font-medium text-slate-700 mb-1.5">Passwort bestätigen<span className="text-red-500 ml-1">*</span></label><input id="passwordConfirm" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.passwordConfirm ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.passwordConfirm} aria-describedby={errors.passwordConfirm ? "passwordConfirm-error" : undefined} />{errors.passwordConfirm && <p id="passwordConfirm-error" role="alert" className="mt-1 text-xs text-red-600">{errors.passwordConfirm}</p>}</div> </div> <div className="flex justify-between items-center pt-6 mt-auto"><button type="button" onClick={prevStep} className="font-bold text-slate-600 hover:text-slate-800">Zurück</button><button type="submit" className="bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 flex items-center gap-2">Weiter <ArrowRightIcon className="w-4 h-4" /></button></div> </form> )}
                           {currentStep === 3 && ( <div className="flex flex-col h-full animate-fade-in"> <div className="text-center mb-10"> <ShieldCheckIcon className="w-16 h-16 text-primary-600 mx-auto" /> <h2 className="text-3xl font-bold text-slate-900 mt-4">Werden Sie ein "Geprüfter Partner"</h2> <p className="text-slate-600 mt-2 max-w-xl mx-auto"> Laden Sie Ihre Dokumente hoch, um Vertrauen bei Kunden aufzubauen und exklusive Vorteile freizuschalten. (Optional) </p> </div> <div className="space-y-8 flex-grow"> <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> <VerificationFileUploader title="Handelsregisterauszug" files={hrFiles} setFiles={setHrFiles} helpText="PDF, PNG, JPG (max. 5MB)" infoText="Ein aktueller Auszug (nicht älter als 6 Monate) bestätigt Ihre offizielle Geschäftstätigkeit." error={errors.hrFiles} /> <VerificationFileUploader title="Betriebshaftpflicht" files={versicherungFiles} setFiles={setVersicherungFiles} helpText="PDF, PNG, JPG (max. 5MB)" infoText="Ein Nachweis Ihrer gültigen Betriebshaftpflichtversicherung." error={errors.versicherungFiles} /> </div> <div className="p-6 bg-slate-100 rounded-lg border border-slate-200"> <h4 className="font-bold text-slate-800 mb-4 text-center">Ihre Vorteile als geprüfter Partner:</h4> <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"> <div className="flex flex-col items-center p-2"> <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border"><ArrowTrendingUpIcon className="w-6 h-6 text-primary-600" /></div> <p className="font-semibold text-slate-700 mt-3">Besseres Ranking</p> <p className="text-xs text-slate-500 mt-1">Erhöhte Sichtbarkeit in den Suchergebnissen.</p> </div> <div className="flex flex-col items-center p-2"> <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border"><ShieldCheckIcon className="w-6 h-6 text-primary-600" /></div> <p className="font-semibold text-slate-700 mt-3">Exklusiver Badge</p> <p className="text-xs text-slate-500 mt-1">Ein Vertrauenssiegel auf Ihrem Profil.</p> </div> <div className="flex flex-col items-center p-2"> <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border"><UsersIcon className="w-6 h-6 text-primary-600" /></div> <p className="font-semibold text-slate-700 mt-3">Mehr Kundenvertrauen</p> <p className="text-xs text-slate-500 mt-1">Geprüfte Firmen erhalten mehr Anfragen.</p> </div> </div> </div> </div> <div className="flex justify-between items-center pt-8 mt-auto"> <button type="button" onClick={prevStep} className="font-bold text-slate-600 hover:text-slate-800">Zurück</button> <button type="button" onClick={nextStep} className="bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 flex items-center gap-2"> Weiter <ArrowRightIcon className="w-4 h-4"/> </button> </div> </div> )}
                           {currentStep === 4 && ( <form onSubmit={handleSubmit} className="flex flex-col flex-grow animate-fade-in"> <p className="text-slate-500 mt-1 mb-6 text-sm">Bitte prüfen Sie Ihre Angaben und schliessen Sie die Registrierung ab.</p> <div className="space-y-4 text-sm bg-slate-50/70 p-5 rounded-lg border flex-grow overflow-y-auto"> <p><strong>Firma:</strong> {companyName}</p> <p><strong>Dienste:</strong> {selectedServices.join(', ')}</p> <p><strong>Ansprechperson:</strong> {firstName} {lastName} ({position})</p> <p><strong>Login E-Mail:</strong> {email}</p> <p><strong>Handelsregister:</strong> {hrFiles.length} Datei(en)</p> <p><strong>Versicherung:</strong> {versicherungFiles.length} Datei(en)</p> </div> <div className="text-right mt-6"> <span className="text-sm font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">AKTION</span> <p className="text-slate-600 mt-2">Einmalige Einrichtungsgebühr:</p> <div className="flex items-baseline justify-end gap-2 mt-1"> <span className="text-2xl font-bold text-slate-500 line-through">CHF 9.95</span> <span className="text-4xl font-extrabold text-primary-600">CHF 4.95</span> </div> </div> <div className="mt-6"><div className="flex items-start"><div className="flex h-5 items-center"><input id="agree" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" aria-required="true" aria-invalid={!!errors.agreed} aria-describedby={errors.agreed ? "agreed-error" : undefined} /></div><div className="ml-3 text-sm"><label htmlFor="agree" className="text-slate-700">Ich stimme den <Link to="/impressum" className="font-medium text-primary-600 hover:underline">AGB</Link> und den <Link to="/impressum" className="font-medium text-primary-600 hover:underline">Datenschutzbestimmungen</Link> zu.<span className="text-red-500 ml-1">*</span></label></div></div>{errors.agreed && <p id="agreed-error" role="alert" className="mt-1 text-xs text-red-600 flex items-center gap-1"><ExclamationTriangleIcon className="w-3 h-3"/> {errors.agreed}</p>}</div> <div className="flex justify-between items-center pt-8 mt-auto"> <button type="button" onClick={prevStep} className="font-bold text-slate-600 hover:text-slate-800">Zurück</button> <button type="submit" disabled={formState === 'loading'} className="bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-slate-400 flex items-center gap-4 shadow-lg text-lg" aria-busy={formState === 'loading'}> {formState === 'loading' ? <><SpinnerIcon className="w-5 h-5 animate-spin"/> Bearbeite...</> : <><span>Jetzt kostenpflichtig abschliessen</span><div className="flex items-center gap-1 pl-2 border-l border-green-500"><CreditCardIcon className="w-6 h-6"/><TwintIcon className="w-5 h-5"/></div></>} </button> </div> </form> )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
