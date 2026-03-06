import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRightIcon, BuildingOfficeIcon, UserIcon, MailIcon, BriefcaseIcon,
    SpinnerIcon, CheckCircleIcon, LockClosedIcon, EyeIcon, EyeSlashIcon,
    ArrowUpTrayIcon, TrashIcon, CreditCardIcon, ShieldCheckIcon,
    XMarkIcon, QuestionMarkCircleIcon, ExclamationTriangleIcon,
    TwintIcon, PencilIcon, ArrowTrendingUpIcon, UsersIcon, ArrowLeftIcon,
    EnvelopeIcon, PhoneIcon, WrenchScrewdriverIcon, DocumentCheckIcon, SwissFlagIcon,
    SparklesIcon
} from '../components/icons';
import { useAppContext } from './AppContext';
import { translations } from '../components/translations';


// --- MOCK DATA & CONFIG ---

const DIENSTE_LIST = [
    'Alarmanlagen', 'Architektur & Bauplanung', 'Badrenovation', 'Badezimmerumbau', 'Baum schneiden / fällen', 'Baumpflege', 'Baureinigung', 'Bewässerungssysteme', 'Bodenleger', 'Bohrarbeiten', 'Büroreinigung', 'Dachdecker', 'Dachreinigung', 'Deckenbau', 'Einbruchschutz', 'Einlagerung', 'Elektriker', 'Elektriker Notdienst', 'Entsorgung', 'Fassadenbau', 'Fensterbau', 'Fenstermontage', 'Fensterreinigung', 'Firmenumzug', 'Gartenbau', 'Gartenpflege', 'Gebäudereinigung', 'Gipser', 'Gipserarbeiten', 'Handwerker Allgemein', 'Hauswartung', 'Hecken schneiden', 'Heizungen', 'Heizung Notdienst', 'Heizungsinstallation', 'Isolierung / Dämmung', 'IT-Dienstleistungen', 'Kleinreparaturen', 'Klimaanlagen & Lüftungen', 'Klimaanlagen Installation', 'Klimaanlagen-Service', 'Küchenbau', 'Küchenmontage', 'Lampen montieren', 'Laminat verlegen', 'Lüftungsanlagen', 'Malerarbeiten', 'Maurerarbeiten', 'Möbelmontage', 'Möbeltransport', 'Netzwerk / WLAN Installationen', 'Parkett schleifen', 'Parkett verlegen', 'Parkettlegen', 'Plattenleger', 'Polsterreinigung', 'Privatumzug', 'Rasen mähen', 'Rasen verlegen', 'Reinigung', 'Renovationen', 'Reparaturservice', 'Räumung', 'Sanitär', 'Sanitär Notdienst', 'Schlüsseldienst', 'Schlösser austauschen', 'Schreiner', 'Schreinerei', 'Sicherheitssysteme', 'Smart Home Installationen', 'Solaranlagen Montage', 'Spezialumzug', 'Teppichreinigung', 'Terrassenbau', 'Transport', 'Trockenbau', 'Türenmontage', 'TV-Wandmontage', 'Umzugsreinigung', 'Videoüberwachung', 'Vinylboden verlegen', 'Vorhangschienen montieren', 'Wallbox Installation (E-Auto)', 'Winterdienst', 'Wohnungsreinigung', 'Wärmepumpen Installationen', 'Zaunbau', 'Zimmerarbeiten'
];

// --- HELPER & SUB-COMPONENTS ---

const ProgressIndicator: React.FC<{ currentStep: number; steps: any[]; t: any }> = ({ currentStep, steps, t }) => (
    <div className="w-full mb-12" aria-label={t.form.progress}>
        <div className="flex items-center justify-between">
            {steps.map((step, index) => {
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
                                {isCompleted ? <CheckCircleIcon className="w-7 h-7" /> : step.icon}
                            </div>
                            <p className={`mt-2 text-xs font-bold transition-colors ${isActive || isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>{step.name}</p>
                        </div>
                        {index < steps.length - 1 && (
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
    t: any;
    language: string;
}> = ({ selectedServices, setSelectedServices, error, isMobile, t, language }) => {
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
            <label className={`block text-sm font-medium mb-1.5 ${isMobile ? 'text-slate-700' : 'text-slate-700'}`}>{t.form.services}<span className="text-red-500 ml-1">*</span></label>
            <div className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}>
                {selectedServices.map(service => (
                    <div key={service} className={`flex items-center gap-1.5 text-sm font-semibold px-2 py-1 rounded ${isMobile ? 'bg-primary-100 text-primary-800' : 'bg-primary-100 text-primary-800'}`}>
                        <span>{service}</span>
                        <button type="button" onClick={() => toggleService(service)} className={`${isMobile ? 'text-primary-600 hover:text-primary-800' : 'text-primary-600 hover:text-primary-800'}`} aria-label={t.form.removeService.replace('{service}', service)}><XMarkIcon className="w-4 h-4" /></button>
                    </div>
                ))}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); setIsOpen(true); }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={selectedServices.length === 0 ? t.form.servicesSearch : t.form.servicesAdd}
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
                                onClick={() => { toggleService(service); setIsOpen(false); setSearchTerm(''); }}
                                className={`w-full text-left px-4 py-2 ${isMobile ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-700 hover:bg-slate-100'}`}
                                role="option"
                            >
                                {service}
                            </button>
                        ))
                    ) : (
                        <p className={`px-4 py-2 ${isMobile ? 'text-slate-500' : 'text-slate-500'}`}>{language === 'de' ? 'Keine Ergebnisse' : language === 'fr' ? 'Aucun résultat' : language === 'it' ? 'Nessun risultato' : 'No results'}</p>
                    )}
                </div>
            )}
            {error && <p role="alert" className={`mt-1 text-xs flex items-center gap-1 ${isMobile ? 'text-red-600' : 'text-red-600'}`}><ExclamationTriangleIcon className="w-3 h-3" /> {error}</p>}
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
    required?: boolean;
    icon?: React.ReactNode;
    t: any;
}> = ({ title, files, setFiles, helpText, infoText, error, isMobile, required, icon, t }) => {
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

    return (
        <div
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${isUploaded
                ? 'border-green-400 bg-green-50'
                : isDragging
                    ? 'border-primary-500 bg-primary-50'
                    : error
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 bg-white hover:border-primary-300 hover:shadow-md'
                }`}
        >
            {/* Status Bar */}
            <div className={`px-5 py-3 flex items-center justify-between ${isUploaded ? 'bg-green-100' : 'bg-slate-50'}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isUploaded ? 'bg-green-500 text-white' : 'bg-white border border-slate-200 text-slate-500'}`}>
                        {isUploaded ? <CheckCircleIcon className="w-6 h-6" /> : icon || <ArrowUpTrayIcon className="w-5 h-5" />}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                            {title}
                            {required && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">{t.verification.mandatory}</span>}
                        </h4>
                        <p className="text-xs text-slate-500">{helpText}</p>
                    </div>
                </div>
                {isUploaded && (
                    <span className="text-sm font-semibold text-green-700 bg-green-200 px-3 py-1 rounded-full">
                        {files.length} {files.length === 1 ? t.verification.file : t.verification.files}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                {files.length > 0 ? (
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 group hover:border-slate-300 transition-all">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFile(file)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    aria-label={t.form.removeFile.replace('{file}', file.name)}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full mt-2 py-2.5 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowUpTrayIcon className="w-4 h-4" />
                            {t.verification.addMore}
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center py-8 cursor-pointer"
                        role="button"
                        aria-label={t.form.uploadFile}
                    >
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${isDragging ? 'bg-primary-100' : 'bg-slate-100'}`}>
                            <ArrowUpTrayIcon className={`w-8 h-8 ${isDragging ? 'text-primary-600' : 'text-slate-400'}`} />
                        </div>
                        <p className="text-sm font-semibold text-slate-700 mb-1" dangerouslySetInnerHTML={{ __html: t.verification.uploadTitle }} />
                        <p className="text-xs text-slate-500">{t.verification.uploadNote}</p>
                    </div>
                )}
            </div>

            <input ref={fileInputRef} type="file" className="sr-only" multiple accept="image/png, image/jpeg, application/pdf" onChange={handleFileChange} aria-hidden="true" />
            {error && (
                <div className="px-5 pb-4">
                    <p role="alert" className="text-xs text-red-600 flex items-center gap-1.5 bg-red-100 px-3 py-2 rounded-lg">
                        <ExclamationTriangleIcon className="w-4 h-4 flex-shrink-0" /> {error}
                    </p>
                </div>
            )}
        </div>
    );
};

const RegisterPage: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations[language] as any).partner?.register || (translations['de'] as any).partner.register;

    const STEPS = [
        { name: t.steps.company, step: 1, icon: <BuildingOfficeIcon className="w-6 h-6" /> },
        { name: t.steps.account, step: 2, icon: <UserIcon className="w-6 h-6" /> },
        { name: t.steps.final, step: 3, icon: <CreditCardIcon className="w-6 h-6" /> },
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [uid, setUid] = useState('');
    const [isUidLoading, setIsUidLoading] = useState(false);
    const [companyData, setCompanyData] = useState<{ name: string; address: string; zip: string; city: string } | null>(null);
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyZip, setCompanyZip] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const API_URL = import.meta.env.VITE_API_URL;

    const handleUidLookup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        if (!uid) { setErrors({}); return; }

        // Validate UID format (CHE-XXX.XXX.XXX)
        if (!/^CHE-\d{3}\.\d{3}\.\d{3}$/.test(uid)) {
            newErrors.uid = t.validation.uidInvalid;
            setErrors(newErrors);
            return;
        }

        setIsUidLoading(true);
        setErrors({});

        try {
            // Convert UID format: CHE-XXX.XXX.XXX -> CHEXXXXXXXXXXX
            const uidForApi = uid.replace(/-/g, '').replace(/\./g, '');

            // Call Zefix API
            const response = await fetch(`https://www.zefix.ch/ZefixREST/api/v1/firm/search.json?name=&uid=${uidForApi}&legalSeatId=&legalFormId=&activeOnly=true&searchType=exact`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('API Fehler');
            }

            const data = await response.json();

            if (data && data.list && data.list.length > 0) {
                const firm = data.list[0];
                const companyInfo = {
                    name: firm.name || '',
                    address: firm.address?.street || '',
                    zip: firm.address?.swissZipCode || '',
                    city: firm.address?.city || ''
                };

                setCompanyData(companyInfo);
                setCompanyName(companyInfo.name);
                setCompanyAddress(companyInfo.address);
                setCompanyZip(companyInfo.zip);
                setCompanyCity(companyInfo.city);
            } else {
                setErrors({ uid: t.validation.uidNotFound });
                setCompanyData(null);
            }
        } catch (error) {
            console.error('Zefix API Error:', error);
            setErrors({ uid: t.validation.uidError });
            setCompanyData(null);
        } finally {
            setIsUidLoading(false);
        }
    };

    const validateStep = (step: number) => {
        const newErrors: Record<string, string> = {};
        if (step === 1) {
            if (companyName.trim().length < 2) newErrors.companyName = t.validation.companyName;
            if (companyAddress.trim().length < 2) newErrors.companyAddress = t.validation.address;
            if (!/^\d{4}$/.test(companyZip)) newErrors.companyZip = t.validation.zip;
            if (companyCity.trim().length < 2) newErrors.companyCity = t.validation.city;
            if (!/^\S+@\S+\.\S+$/.test(companyEmail)) newErrors.companyEmail = t.validation.email;
            if (companyPhone.trim().length < 10) newErrors.companyPhone = t.validation.phone;
            if (selectedServices.length === 0) newErrors.services = t.validation.services;
        }
        if (step === 2) {
            if (firstName.trim().length < 2) newErrors.firstName = t.validation.firstName;
            if (lastName.trim().length < 2) newErrors.lastName = t.validation.lastName;
            if (position.trim().length < 3) newErrors.position = t.validation.position;
            if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = t.validation.email;
            if (password.length < 8) newErrors.password = t.validation.password;
            if (password !== passwordConfirm) newErrors.passwordConfirm = t.validation.passwordConfirm;
        }
        if (step === 3) { if (!agreed) newErrors.agreed = t.validation.agb; }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const nextStep = async () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };
    const prevStep = () => setCurrentStep(prev => prev - 1);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep(3)) {
            setFormState('loading');
            try {
                const res = await fetch(`${API_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: companyName,
                        email: email,
                        password: password,
                        location: `${companyZip} ${companyCity}`,
                        services: selectedServices,
                        firstName,
                        lastName,
                        position,
                        companyPhone,
                        companyEmail,
                        companyAddress,
                        documents: {}
                    }),
                });

                if (res.ok) {
                    setFormState('success');
                } else {
                    const data = await res.json();
                    setErrors({ submit: data.message || 'Registrierung fehlgeschlagen.' });
                    setFormState('idle');
                }
            } catch (err) {
                setErrors({ submit: 'Server nicht erreichbar.' });
                setFormState('idle');
            }
        }
    }

    const SuccessView: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
        return (
            <div className={`min-h-screen ${isMobile ? 'bg-white' : 'bg-slate-50'} flex items-center justify-center p-6 sm:p-12 overflow-hidden`}>
                <div className="max-w-2xl w-full text-center relative z-10">
                    {/* Animated Party / Success Aura */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-emerald-100/50 rounded-full blur-[120px] -z-10 animate-pulse"></div>

                    {/* Main Icon Celebration */}
                    <div className="relative inline-block mb-12">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-ping opacity-30"></div>
                        <div className="w-40 h-40 bg-white border-8 border-emerald-500/10 rounded-[3rem] shadow-2xl flex items-center justify-center relative animate-bounce-slow">
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl animate-fade-in delay-500">
                                <SparklesIcon className="w-7 h-7" />
                            </div>
                            <CheckCircleIcon className="w-24 h-24 text-emerald-500 animate-fade-in" />
                        </div>
                    </div>

                    {/* Celebration Text Stack */}
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="flex justify-center">
                            <span className="px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-sm">
                                {language === 'de' ? 'Registrierung Erfolgreich' : language === 'fr' ? 'Inscription Réussie' : language === 'it' ? 'Registrazione Completata' : 'Registration Successful'}
                            </span>
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight leading-tight italic">
                            {language === 'de' ? 'Herzlich willkommen an Bord!' : 'Welcome on Board!'}
                        </h1>
                        <p className="max-w-md mx-auto text-lg text-slate-500 font-medium leading-relaxed">
                            {t.form.successDesc}
                        </p>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-16 animate-fade-in-up delay-[400ms]">
                        <Link
                            to="/partner/requests"
                            className="inline-flex items-center gap-4 bg-slate-900 text-white text-xl font-black px-12 py-5 rounded-[1.5rem] shadow-2xl hover:bg-black hover:-translate-y-1 active:scale-95 transition-all group lg:min-w-[320px] justify-center"
                        >
                            <span>{t.form.dashboardLink}</span>
                            <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                        </Link>

                        <div className="mt-12 flex justify-center gap-8">
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                Live Profil
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                Sofort Startklar
                            </div>
                        </div>
                    </div>
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

    const MobileInputField = ({ id, name, label, type = 'text', placeholder, value, onChange, required = false, icon, error, children, disabled = false }: any) => (
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
            {error && <p role="alert" className="mt-1 text-xs flex items-center gap-1 text-red-600"><ExclamationTriangleIcon className="w-3 h-3" />{error}</p>}
        </div>
    );


    return (
        <>
            {/* --- NEW LIGHT MOBILE VIEW --- */}
            <div className="lg:hidden min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200 z-30">
                    <div className="h-full bg-primary-500 transition-all duration-500" style={{ width: `${(currentStep - 1) / (STEPS.length - 1) * 100}%` }}></div>
                </div>

                <header className="relative z-10 p-6 flex items-center justify-between">
                    <Link to="/" className="font-extrabold text-2xl tracking-tight">Fertigo</Link>
                    <p className="font-bold text-slate-500 text-sm">{language === 'de' ? 'Schritt' : language === 'fr' ? 'Étape' : language === 'it' ? 'Passo' : 'Step'} {currentStep} / {STEPS.length}</p>
                </header>

                <main className="relative z-10 flex-grow overflow-y-auto p-6 pb-28">
                    {currentStep === 1 && (
                        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6 animate-fade-in">
                            <h1 className="text-3xl font-bold">{t.steps.company}</h1>
                            <p className="text-slate-600 -mt-4">{t.verification.docDesc}</p>

                            <div>
                                <label htmlFor="uid-mobile" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.uid}</label>
                                <div className="flex items-center gap-2">
                                    <input type="text" id="uid-mobile" value={uid} onChange={e => { setUid(e.target.value); setErrors(prev => ({ ...prev, uid: undefined })); }} placeholder="CHE-XXX.XXX.XXX" className={`flex-1 w-full h-12 rounded-lg border-2 bg-white px-4 text-slate-900 disabled:opacity-50 ${errors.uid ? 'border-red-500' : 'border-slate-300'}`} disabled={isUidLoading} />
                                    <button onClick={handleUidLookup} disabled={isUidLoading} className="px-4 h-12 bg-primary-600 font-bold text-white rounded-lg hover:bg-primary-700 disabled:bg-slate-500 flex items-center justify-center w-28">
                                        {isUidLoading ? <SpinnerIcon className="w-5 h-5 animate-spin" /> : <>{t.form.lookup}</>}
                                    </button>
                                </div>
                                {errors.uid && <p role="alert" className="mt-1 text-xs text-red-600">{errors.uid}</p>}
                            </div>
                            {companyData && <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 font-medium">{t.form.dataLoaded}</div>}

                            <MobileInputField isMobile id="companyName-mobile" label={t.form.companyName} required value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={!!companyData} error={errors.companyName} />
                            <MobileInputField isMobile id="companyAddress-mobile" label={t.form.address} required value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} disabled={!!companyData} error={errors.companyAddress} />
                            <div className="grid grid-cols-3 gap-4">
                                <MobileInputField isMobile className="col-span-1" id="companyZip-mobile" label={t.form.zip} required value={companyZip} onChange={e => setCompanyZip(e.target.value)} disabled={!!companyData} error={errors.companyZip} />
                                <MobileInputField isMobile className="col-span-2" id="companyCity-mobile" label={t.form.city} required value={companyCity} onChange={e => setCompanyCity(e.target.value)} disabled={!!companyData} error={errors.companyCity} />
                            </div>
                            <MobileInputField isMobile id="companyEmail-mobile" label={t.form.companyEmail} required value={companyEmail} onChange={e => setCompanyEmail(e.target.value)} error={errors.companyEmail} type="email" placeholder="info@firma.ch" />
                            <MobileInputField isMobile id="companyPhone-mobile" label={t.form.companyPhone} required value={companyPhone} onChange={e => setCompanyPhone(e.target.value)} error={errors.companyPhone} type="tel" placeholder="+41 XX XXX XX XX" />
                            <ServiceSelector selectedServices={selectedServices} setSelectedServices={setSelectedServices} error={errors.services} isMobile t={t} language={language} />
                        </form>
                    )}
                    {currentStep === 2 && (
                        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6 animate-fade-in">
                            <h1 className="text-3xl font-bold">{t.steps.account}</h1>
                            <p className="text-slate-600 -mt-4">{t.subtitle}</p>
                            <div className="grid grid-cols-2 gap-4">
                                <MobileInputField isMobile id="firstName-mobile" label={t.form.firstName} required value={firstName} onChange={e => setFirstName(e.target.value)} error={errors.firstName} />
                                <MobileInputField isMobile id="lastName-mobile" label={t.form.lastName} required value={lastName} onChange={e => setLastName(e.target.value)} error={errors.lastName} />
                            </div>
                            <MobileInputField isMobile id="position-mobile" label={t.form.position} required value={position} onChange={e => setPosition(e.target.value)} error={errors.position} placeholder={t.form.positionPlaceholder} />
                            <MobileInputField isMobile id="email-mobile" label={t.form.email} required value={email} onChange={e => setEmail(e.target.value)} error={errors.email} type="email" />
                            <MobileInputField isMobile id="password-mobile" label={t.form.password} required value={password} onChange={e => setPassword(e.target.value)} error={errors.password} type={isPasswordVisible ? 'text' : 'password'} />
                            <MobileInputField isMobile id="passwordConfirm-mobile" label={t.form.passwordConfirm} required value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} error={errors.passwordConfirm} type="password" />
                        </form>
                    )}
                    {currentStep === 3 && (
                        <div className="space-y-8 animate-fade-in pb-12">
                            {/* Mobile Header */}
                            <div className="text-center py-6">

                                <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight italic">{t.summary.title}</h2>
                                <p className="text-slate-500 font-medium text-sm mt-3">{t.summary.subtitle}</p>
                            </div>

                            {/* Section: Company Card */}
                            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm relative overflow-hidden">
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">{t.summary.company}</h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-2xl font-black text-slate-900 leading-tight">{companyName}</p>
                                        <p className="text-[10px] font-black text-primary-600 uppercase mt-2 tracking-widest">{uid || 'CHE-PLATFORM-VERIFIED'}</p>
                                    </div>
                                    <div className="pt-6 border-t border-slate-100 flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400">
                                            <BuildingOfficeIcon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Standort</p>
                                            <p className="text-slate-600 font-bold text-sm leading-relaxed">{companyAddress},<br />{companyZip} {companyCity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Services Card */}
                            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">{t.summary.services}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedServices.map(s => (
                                        <span key={s} className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-black rounded-full italic">{s}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Section: Contact Card */}
                            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">{t.summary.contact}</h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-2xl font-black text-slate-900 leading-tight mb-1">{firstName} {lastName}</p>
                                        <span className="inline-flex items-center px-2 py-0.5 bg-primary-50 text-primary-600 rounded text-[10px] font-black uppercase tracking-widest">{position}</span>
                                    </div>
                                    <div className="space-y-4 pt-6 border-t border-slate-100">
                                        <div className="flex items-center gap-4 text-sm font-bold text-slate-600 overflow-hidden">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400"><EnvelopeIcon className="w-4 h-4" /></div>
                                            <span className="truncate">{email}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400"><PhoneIcon className="w-4 h-4" /></div>
                                            <span>{companyPhone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Checkbox */}
                            <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200/60 shadow-sm relative group transition-all hover:bg-slate-50">
                                <label className="flex items-start gap-4 cursor-pointer">
                                    <div className="relative pt-1">
                                        <input
                                            id="agree-final-mobile-audit"
                                            type="checkbox"
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                            className="h-8 w-8 rounded-xl border-2 border-slate-300 text-primary-600 transition-all cursor-pointer checked:bg-primary-600 checked:border-primary-600 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="agree-final-mobile-audit" className="text-xs text-slate-500 font-medium leading-relaxed cursor-pointer group-active:text-slate-900 transition-colors" dangerouslySetInnerHTML={{ __html: t.form.agb }} />
                                        {errors.agreed && <p className="text-[10px] text-red-500 font-black mt-2 flex items-center gap-1 animate-pulse"><ExclamationTriangleIcon className="w-3.5 h-3.5" /> {errors.agreed}</p>}
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}
                </main>

                <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 z-20">
                    <div className="flex items-center gap-4">
                        {currentStep > 1 && <button onClick={prevStep} className="font-bold text-slate-700 hover:text-slate-900 px-5 py-3 rounded-lg"><ArrowLeftIcon className="w-5 h-5" /></button>}
                        {currentStep < 3 && <button onClick={nextStep} className="flex-1 bg-primary-600 text-white font-bold py-3.5 rounded-lg hover:bg-primary-700">{t.form.next}</button>}
                        {currentStep === 3 && (
                            <button
                                onClick={handleSubmit}
                                disabled={formState === 'loading'}
                                className="flex-1 bg-primary-600 text-white font-bold py-3.5 rounded-lg hover:bg-primary-700 flex items-center justify-center gap-3 disabled:grayscale transition-all active:scale-95"
                            >
                                {formState === 'loading' ? (
                                    <SpinnerIcon className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>{t.form.submit}</span>
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </footer>
            </div>

            {/* --- DESKTOP VIEW --- */}
            <div className="hidden lg:block bg-slate-100 py-12 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{t.subtitle}</p>
                    </div>

                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-8 sm:p-12 transition-all duration-700">
                        <ProgressIndicator currentStep={currentStep} steps={STEPS} t={t} />
                        <div className="min-h-[500px] flex flex-col">
                            {/* Desktop Step Forms are here (same as before) */}
                            {currentStep === 1 && (
                                <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6 flex flex-col flex-grow animate-fade-in">
                                    <div>
                                        <label htmlFor="uid" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.uid}</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                id="uid"
                                                value={uid}
                                                onChange={e => { setUid(e.target.value); setErrors(prev => ({ ...prev, uid: undefined })); }}
                                                placeholder="CHE-XXX.XXX.XXX"
                                                className={`flex-1 block w-full rounded-lg border-2 bg-slate-50/70 py-3.5 px-4 focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-all ${errors.uid ? 'border-red-500' : 'border-slate-300'}`}
                                                disabled={isUidLoading}
                                                aria-invalid={!!errors.uid}
                                                aria-describedby={errors.uid ? "uid-error" : undefined}
                                            />
                                            {isUidLoading ? <SpinnerIcon className="w-5 h-5 animate-spin" /> : <>{t.form.lookupDesktop}</>}
                                        </div>
                                        {errors.uid && <p id="uid-error" role="alert" className="mt-1 text-xs text-red-600 flex items-center gap-1"><ExclamationTriangleIcon className="w-3 h-3" /> {errors.uid}</p>}
                                    </div>
                                    {companyData && (
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm flex items-center justify-between animate-fade-in">
                                            <p className="text-green-800 font-medium flex items-center gap-2">
                                                <CheckCircleIcon className="w-5 h-5" />
                                                {language === 'de' ? 'Firmendaten wurden geladen.' : language === 'fr' ? 'Les données de l\'entreprise ont été chargées.' : language === 'it' ? 'I dati aziendali sono stati caricati.' : 'Company data loaded.'}
                                            </p>
                                            <button type="button" onClick={() => setCompanyData(null)} className="font-semibold text-green-700 hover:underline">{t.form.back}</button>
                                        </div>
                                    )}
                                    <div className="space-y-4 pt-4 border-t border-slate-200">
                                        <div>
                                            <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.companyName}<span className="text-red-500 ml-1">*</span></label>
                                            <input id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={!!companyData} className={`block w-full rounded-lg border-2 py-3 px-4 disabled:bg-slate-200/50 disabled:text-slate-500 ${errors.companyName ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.companyName} aria-describedby={errors.companyName ? "companyName-error" : undefined} />
                                            {errors.companyName && <p id="companyName-error" role="alert" className="mt-1 text-xs text-red-600">{errors.companyName}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="companyAddress" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.address}<span className="text-red-500 ml-1">*</span></label>
                                            <input id="companyAddress" value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} disabled={!!companyData} className={`block w-full rounded-lg border-2 py-3 px-4 disabled:bg-slate-200/50 disabled:text-slate-500 ${errors.companyAddress ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.companyAddress} aria-describedby={errors.companyAddress ? "companyAddress-error" : undefined} />
                                            {errors.companyAddress && <p id="companyAddress-error" role="alert" className="mt-1 text-xs text-red-600">{errors.companyAddress}</p>}
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label htmlFor="companyZip" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.zip}<span className="text-red-500 ml-1">*</span></label>
                                                <input id="companyZip" value={companyZip} onChange={e => setCompanyZip(e.target.value)} disabled={!!companyData} className={`block w-full rounded-lg border-2 py-3 px-4 disabled:bg-slate-200/50 disabled:text-slate-500 ${errors.companyZip ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.companyZip} aria-describedby={errors.companyZip ? "companyZip-error" : undefined} />
                                                {errors.companyZip && <p id="companyZip-error" role="alert" className="mt-1 text-xs text-red-600">{errors.companyZip}</p>}
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="companyCity" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.city}<span className="text-red-500 ml-1">*</span></label>
                                                <input id="companyCity" value={companyCity} onChange={e => setCompanyCity(e.target.value)} disabled={!!companyData} className={`block w-full rounded-lg border-2 py-3 px-4 disabled:bg-slate-200/50 disabled:text-slate-500 ${errors.companyCity ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.companyCity} aria-describedby={errors.companyCity ? "companyCity-error" : undefined} />
                                                {errors.companyCity && <p id="companyCity-error" role="alert" className="mt-1 text-xs text-red-600">{errors.companyCity}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="companyEmail" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.companyEmail}<span className="text-red-500 ml-1">*</span></label>
                                                <input id="companyEmail" type="email" value={companyEmail} onChange={e => setCompanyEmail(e.target.value)} placeholder="info@firma.ch" className={`block w-full rounded-lg border-2 py-3 px-4 ${errors.companyEmail ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.companyEmail} aria-describedby={errors.companyEmail ? "companyEmail-error" : undefined} />
                                                {errors.companyEmail && <p id="companyEmail-error" role="alert" className="mt-1 text-xs text-red-600">{errors.companyEmail}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="companyPhone" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.companyPhone}<span className="text-red-500 ml-1">*</span></label>
                                                <input id="companyPhone" type="tel" value={companyPhone} onChange={e => setCompanyPhone(e.target.value)} placeholder="+41 XX XXX XX XX" className={`block w-full rounded-lg border-2 py-3 px-4 ${errors.companyPhone ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.companyPhone} aria-describedby={errors.companyPhone ? "companyPhone-error" : undefined} />
                                                {errors.companyPhone && <p id="companyPhone-error" role="alert" className="mt-1 text-xs text-red-600">{errors.companyPhone}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <ServiceSelector selectedServices={selectedServices} setSelectedServices={setSelectedServices} error={errors.services} t={t} language={language} />
                                    <div className="mt-auto pt-6">
                                        <button type="submit" className="w-full bg-primary-600 text-white font-bold py-3.5 rounded-lg hover:bg-primary-700 disabled:bg-slate-400 transition-all shadow-lg text-lg flex items-center justify-center gap-2">
                                            {t.form.next} <ArrowRightIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </form>
                            )}
                            {currentStep === 2 && (
                                <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6 flex flex-col flex-grow animate-fade-in">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.firstName}<span className="text-red-500 ml-1">*</span></label>
                                            <input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.firstName ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "firstName-error" : undefined} />
                                            {errors.firstName && <p id="firstName-error" role="alert" className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.lastName}<span className="text-red-500 ml-1">*</span></label>
                                            <input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.lastName ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "lastName-error" : undefined} />
                                            {errors.lastName && <p id="lastName-error" role="alert" className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="position" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.position}<span className="text-red-500 ml-1">*</span></label>
                                        <input type="text" id="position" value={position} onChange={e => setPosition(e.target.value)} placeholder={t.form.positionPlaceholder} className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.position ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.position} aria-describedby={errors.position ? "position-error" : undefined} />
                                        {errors.position && <p id="position-error" role="alert" className="mt-1 text-xs text-red-600">{errors.position}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.email}<span className="text-red-500 ml-1">*</span></label>
                                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.email ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                                        {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.password}<span className="text-red-500 ml-1">*</span></label>
                                            <div className="relative">
                                                <input id="password" type={isPasswordVisible ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.password ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-error" : undefined} />
                                                <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600" aria-label={isPasswordVisible ? t.form.hidePassword : t.form.showPassword}>
                                                    {isPasswordVisible ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            {errors.password && <p id="password-error" role="alert" className="mt-1 text-xs text-red-600">{errors.password}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-slate-700 mb-1.5">{t.form.passwordConfirm}<span className="text-red-500 ml-1">*</span></label>
                                            <input id="passwordConfirm" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required className={`block w-full rounded-lg border-2 bg-slate-50/70 py-3 px-4 ${errors.passwordConfirm ? 'border-red-500' : 'border-slate-300'}`} aria-required="true" aria-invalid={!!errors.passwordConfirm} aria-describedby={errors.passwordConfirm ? "passwordConfirm-error" : undefined} />
                                            {errors.passwordConfirm && <p id="passwordConfirm-error" role="alert" className="mt-1 text-xs text-red-600">{errors.passwordConfirm}</p>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pt-6 mt-auto">
                                        <button type="button" onClick={prevStep} className="font-bold text-slate-600 hover:text-slate-800">{t.form.back}</button>
                                        <button type="submit" className="bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 flex items-center gap-2">{t.form.next} <ArrowRightIcon className="w-4 h-4" /></button>
                                    </div>
                                </form>
                            )}
                            {currentStep === 3 && (
                                <form onSubmit={handleSubmit} className="flex flex-col animate-fade-in max-w-3xl mx-auto space-y-8 pb-12">


                                    {/* Summary Title */}
                                    <div className="text-center mb-8">
                                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-4 italic">{t.summary.title}</h2>
                                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">{t.summary.subtitle}</p>
                                    </div>

                                    {/* 1. DATA AUDIT CARD */}
                                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 lg:p-12 space-y-12">
                                        {/* Section: Company */}
                                        <div>
                                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">{t.summary.company}</h3>
                                            <div className="sm:grid sm:grid-cols-2 sm:gap-8 space-y-6 sm:space-y-0">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.form.companyName}</span>
                                                    <p className="text-xl font-bold text-slate-900 leading-none">{companyName}</p>
                                                    <p className="text-xs text-primary-600 font-black mt-1">{uid || 'CHE-VERIFIED-PARTNER'}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standort</span>
                                                    <p className="text-slate-600 font-medium leading-relaxed">{companyAddress},<br />{companyZip} {companyCity}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section: Contact */}
                                        <div className="pt-8 border-t border-slate-100">
                                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">{t.summary.contact}</h3>
                                            <div className="sm:grid sm:grid-cols-2 sm:gap-8 space-y-6 sm:space-y-0">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</span>
                                                    <p className="text-xl font-bold text-slate-900 leading-none">{firstName} {lastName}</p>
                                                    <p className="text-sm text-slate-500 font-medium mt-1">{position}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Erreichbarkeit</span>
                                                    <p className="text-slate-600 font-medium truncate flex items-center gap-2"><EnvelopeIcon className="w-4 h-4 text-slate-300" /> {email}</p>
                                                    <p className="text-slate-600 font-medium flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-slate-300" /> {companyPhone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section: Services */}
                                        <div className="pt-8 border-t border-slate-100">
                                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">{t.summary.services}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedServices.map(s => (
                                                    <span key={s} className="px-5 py-2 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-full italic">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. AGB CHECKBOX */}
                                    <div className="p-10 bg-slate-50/50 rounded-[2.5rem] border border-slate-200/60 shadow-sm relative group hover:bg-slate-50 transition-all">
                                        <label className="flex items-start gap-6 cursor-pointer">
                                            <div className="relative pt-1">
                                                <input
                                                    id="agree-layout-stacked"
                                                    type="checkbox"
                                                    checked={agreed}
                                                    onChange={(e) => setAgreed(e.target.checked)}
                                                    className="h-8 w-8 rounded-xl border-2 border-slate-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 transition-all cursor-pointer checked:bg-primary-600 checked:border-primary-600"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label htmlFor="agree-layout-stacked" className="text-base text-slate-500 font-medium leading-relaxed cursor-pointer group-hover:text-slate-900 transition-colors" dangerouslySetInnerHTML={{ __html: t.form.agb }} />
                                                {errors.agreed && <p className="text-sm text-red-500 font-black mt-4 flex items-center gap-2 animate-pulse"><ExclamationTriangleIcon className="w-5 h-5" /> {errors.agreed}</p>}
                                            </div>
                                        </label>
                                    </div>

                                    {/* 4. BUTTONS FOOTER */}
                                    <div className="flex justify-between items-center pt-6 mt-auto">
                                        <button type="button" onClick={prevStep} className="font-bold text-slate-600 hover:text-slate-800">{t.form.back}</button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={formState === 'loading'}
                                            className="bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 flex items-center gap-2 disabled:grayscale"
                                        >
                                            {formState === 'loading' ? (
                                                <SpinnerIcon className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <span>{t.form.submit}</span>
                                                    <ArrowRightIcon className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
