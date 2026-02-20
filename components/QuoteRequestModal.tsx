import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { GoogleGenAI, Type } from "@google/genai";
import { useAppContext } from '../pages/AppContext';
import {
    XMarkIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon, ArrowUpTrayIcon, TrashIcon,
    ColoredWrenchScrewdriverIcon, ColoredPencilIcon,
    ShieldCheckIcon, TagIcon, ClockIcon, UserIcon,
    PencilSquareIcon, ListBulletIcon, ColoredPartyPopperIcon, RocketLaunchIcon, PencilIcon,
    ColoredMapPinIcon, ColoredUserIcon, ColoredMailIcon, ColoredPhoneIcon,
    ExclamationTriangleIcon,
    ChevronUpDownIcon,
    CalendarDaysIcon,
    BanknotesIcon,
    HomeModernIcon,
    UsersIcon,
    ToolboxIcon,
    BuildingOfficeIcon,
    ArrowDownTrayIcon,
    BriefcaseIcon,
    ColoredTruckIcon,
    ColoredSparklesIcon,
    ColoredPaintRollerIcon,
    ColoredLeafIcon,
    ColoredSquares2X2Icon,
    ColoredTrashIcon,
    SparklesIcon,
    EnvelopeIcon,
    PhoneIcon,
    ClipboardDocumentListIcon
} from './icons';

// --- PLZ to City Mapping ---
const plzToCityMap: { [key: string]: string } = {
    '8001': 'Zürich', '8002': 'Zürich', '8003': 'Zürich', '8004': 'Zürich', '8005': 'Zürich', '8006': 'Zürich', '8008': 'Zürich', '8032': 'Zürich', '8037': 'Zürich', '8038': 'Zürich', '8041': 'Zürich', '8044': 'Zürich', '8045': 'Zürich', '8046': 'Zürich', '8049': 'Zürich', '8050': 'Zürich', '8051': 'Zürich', '8052': 'Zürich', '8053': 'Zürich', '8055': 'Zürich', '8057': 'Zürich', '8064': 'Zürich',
    '3000': 'Bern', '3001': 'Bern', '3003': 'Bern', '3004': 'Bern', '3005': 'Bern', '3006': 'Bern', '3007': 'Bern', '3008': 'Bern', '3010': 'Bern', '3011': 'Bern', '3012': 'Bern', '3013': 'Bern', '3014': 'Bern', '3015': 'Bern', '3018': 'Bern', '3019': 'Bern', '3020': 'Bern', '3024': 'Bern', '3027': 'Bern',
    '4000': 'Basel', '4051': 'Basel', '4052': 'Basel', '4053': 'Basel', '4054': 'Basel', '4055': 'Basel', '4056': 'Basel', '4057': 'Basel', '4058': 'Basel',
    '1201': 'Genève', '1202': 'Genève', '1203': 'Genève', '1204': 'Genève', '1205': 'Genève', '1206': 'Genève', '1207': 'Genève', '1208': 'Genève',
    '6000': 'Luzern', '6002': 'Luzern', '6003': 'Luzern', '6004': 'Luzern', '6005': 'Luzern', '6006': 'Luzern',
    '9000': 'St. Gallen', '9001': 'St. Gallen', '9008': 'St. Gallen', '9010': 'St. Gallen', '9011': 'St. Gallen', '9012': 'St. Gallen', '9013': 'St. Gallen', '9014': 'St. Gallen', '9015': 'St. Gallen', '9016': 'St. Gallen',
    '8400': 'Winterthur', '8401': 'Winterthur', '8404': 'Winterthur', '8405': 'Winterthur', '8406': 'Winterthur', '8408': 'Winterthur',
    '1000': 'Lausanne', '1003': 'Lausanne', '1004': 'Lausanne', '1005': 'Lausanne', '1006': 'Lausanne', '1007': 'Lausanne',
    '6900': 'Lugano',
    '2502': 'Biel/Bienne', '2503': 'Biel/Bienne', '2504': 'Biel/Bienne',
    '8610': 'Uster',
    '5000': 'Aarau',
    '3600': 'Thun',
    '6300': 'Zug',
    '8200': 'Schaffhausen',
    '7000': 'Chur',
    '8304': 'Wallisellen',
};


// --- Gemini API Setup ---
let ai: GoogleGenAI | null = null;
try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
}

const questionsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: { type: Type.STRING, description: "Eine klare, einfache Frage an den Benutzer." },
            key: { type: Type.STRING, description: "Ein kurzer, einzigartiger Schlüssel für diese Frage (z.B. 'dimensions')." },
            type: { type: Type.STRING, description: "Eingabetyp: 'text', 'textarea', 'select', 'checkbox'." },
            options: { type: Type.ARRAY, description: "Optionen für 'select' oder 'checkbox'.", items: { type: Type.STRING } }
        }
    }
};

const initialFormData = {
    service: '',
    locationZip: '',
    locationCity: '',
    moveFromZip: '',
    moveFromCity: '',
    moveToZip: '',
    moveToCity: '',
    projectDescription: '',
    files: [] as File[],
    anrede: '',
    companyName: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    kanton: '',
    email: '',
    phone: '',
    mobile: '',
    showMobileToProviders: true,
    timeline: '',
    onSiteVisit: '',
    numberOfRooms: '',
    floorFrom: '',
    liftFrom: '',
    floorTo: '',
    liftTo: '',
    specialObjects: '',
    dynamicAnswers: {} as Record<string, any>,
    onSiteService: undefined as boolean | undefined,
    position: '',
};

const allServices = [
    'Architektur & Bauplanung',
    'Badezimmerumbau',
    'Baumpflege',
    'Baureinigung',
    'Bodenleger',

    'Dachdecker',
    'Dachreinigung',
    'Einlagerung',
    'Elektriker',
    'Entsorgung & Räumung',

    'Fassadenbau',
    'Fenstermontage',
    'Fensterreinigung',
    'Firmenumzug',

    'Gartenbau',
    'Gartenpflege',
    'Gebäudereinigung',
    'Gipserarbeiten',
    'Handwerker',
    'Hauswartung',
    'Heizungsinstallation',
    'IT-Dienstleistungen',
    'Klaviertransport',
    'Klimaanlagen-Service',
    'Küchenbau',
    'Malerarbeiten',
    'Maurerarbeiten',
    'Möbeltransport',
    'Plattenleger',
    'Privatumzug',
    'Reinigung',
    'Sanitär',
    'Schreiner',
    'Umzug',
    'Umzugsreinigung',
    'Zaunbau',
    'Zimmermannarbeiten',
];

const popularServicesSelection = [
    { name: 'Umzug', icon: <ColoredTruckIcon className="w-8 h-8" /> },
    { name: 'Reinigung', icon: <ColoredSparklesIcon className="w-8 h-8" /> },
    { name: 'Malerarbeiten', icon: <ColoredPaintRollerIcon className="w-8 h-8" /> },
    { name: 'Bodenleger', icon: <ColoredSquares2X2Icon className="w-8 h-8" /> },
    { name: 'Gartenpflege', icon: <ColoredLeafIcon className="w-8 h-8" /> },
    { name: 'Entsorgung & Räumung', label: 'Entsorgung', icon: <ColoredTrashIcon className="w-8 h-8" /> },
];

interface QuoteRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: { projectTitle?: string; service?: string; location?: string; };
}

// --- New Sub-Components ---

const ProgressSidebar: React.FC<{ step: number; service: string; }> = ({ step }) => {
    const stepsConfig = [
        { name: 'Ihr Projekt', step: 1, icon: <PencilSquareIcon className="w-5 h-5" /> },
        { name: 'Details klären', step: 2, icon: <ListBulletIcon className="w-5 h-5" /> },
        { name: 'Kontakt', step: 3, icon: <UserIcon className="w-5 h-5" /> },
        { name: 'Prüfen & Senden', step: 4, icon: <CheckCircleIcon className="w-5 h-5" /> }
    ];

    let currentProgressStep = step;
    if (step === 5) currentProgressStep = 5; // Verification state
    if (step === 6) currentProgressStep = 6; // Success state

    const trustPoints = [
        { icon: <TagIcon className="w-5 h-5 text-primary-700" />, text: "100% unverbindlich" },
        { icon: <ShieldCheckIcon className="w-5 h-5 text-primary-700" />, text: "Geprüfte Schweizer Anbieter" },
        { icon: <ClockIcon className="w-5 h-5 text-primary-700" />, text: "Erste Angebote in < 24h" },
    ];

    return (
        <div className="hidden lg:flex flex-col w-1/3 bg-slate-50 p-8 rounded-l-2xl border-r border-slate-200">
            <div className="flex flex-col mb-12">
                <span className="font-extrabold text-xl text-slate-800 tracking-tight">Fertigo</span>
                <span className="text-xs font-medium text-primary-700 tracking-tighter -mt-1">Clever, Günstig, Flexibel</span>
            </div>

            <nav aria-label="Fortschritt">
                <ul className="space-y-6">
                    {stepsConfig.map((s, index) => (
                        <li key={s.name} className="flex items-center gap-4" aria-current={currentProgressStep === index + 1 ? 'step' : undefined}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${currentProgressStep > index + 1 ? 'bg-primary-600 border-primary-600 text-white' :
                                currentProgressStep === index + 1 ? 'bg-white border-primary-600 text-primary-600' :
                                    'bg-slate-100 border-slate-300 text-slate-500'
                                }`}>
                                {currentProgressStep > index + 1 ? <CheckCircleIcon className="w-6 h-6" /> : s.icon}
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Schritt {index + 1}</p>
                                <p className={`font-bold transition-colors ${currentProgressStep >= index + 1 ? 'text-slate-800' : 'text-slate-500'}`}>{s.name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto pt-8 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Unser Versprechen</h3>
                <div className="space-y-5">
                    {trustPoints.map(point => (
                        <div key={point.text} className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center ring-4 ring-white">
                                {point.icon}
                            </div>
                            <span className="text-sm font-semibold text-slate-700">{point.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FileUploader: React.FC<{ files: File[]; onFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onRemoveFile: (file: File) => void; }> = ({ files, onFilesChange, onRemoveFile }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const onButtonClick = () => fileInputRef.current?.click();

    return (
        <div>
            <h3 className="font-semibold text-slate-800 mb-2">Bilder oder Dokumente hinzufügen (optional)</h3>
            <div
                onClick={onButtonClick}
                className="cursor-pointer p-6 border-2 border-dashed border-slate-300 text-center rounded-lg hover:border-primary-500 hover:bg-primary-50/50 transition-colors"
                role="button"
                aria-label="Datei hochladen"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onButtonClick(); }}
            >
                <ArrowUpTrayIcon className="w-8 h-8 mx-auto text-slate-400" />
                <p className="mt-2 text-slate-600 font-semibold">Dateien auswählen</p>
                <p className="text-sm text-slate-500">Bilder oder Dokumente hierher ziehen oder klicken, um sie auszuwählen.</p>
                <input ref={fileInputRef} type="file" multiple onChange={onFilesChange} className="hidden" aria-hidden="true" />
            </div>
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-100 p-2 rounded-md">
                            <p className="text-sm text-slate-700 truncate pr-2">{file.name}</p>
                            <button type="button" onClick={() => onRemoveFile(file)} className="text-red-500 hover:text-red-700 flex-shrink-0" aria-label={`Entferne ${file.name}`}><TrashIcon className="w-5 h-5" /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default function QuoteRequestModal({ isOpen, onClose, initialData = {} }: QuoteRequestModalProps) {
    const { addNewRequest } = useAppContext();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationError, setVerificationError] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [dynamicQuestions, setDynamicQuestions] = useState<any[]>([]);
    const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsVisible(true);
            const service = initialData.service && allServices.some(s => s === initialData.service) ? initialData.service : '';

            const newFormData = { ...initialFormData, ...initialData, service: service, projectDescription: initialData.projectTitle || '' };

            const movingServices = ['Umzug', 'Transport', 'Firmenumzug', 'Möbeltransport', 'Klaviertransport', 'Privatumzug'];
            const isMovingService = movingServices.includes(newFormData.service || '');

            if (initialData.location) {
                const zipMatch = initialData.location.match(/^(\d{4})/);
                const zip = zipMatch ? zipMatch[1] : '';
                const city = zipMatch ? initialData.location.replace(zip, '').trim() : initialData.location;

                if (isMovingService) {
                    newFormData.moveFromZip = zip;
                    newFormData.moveFromCity = city;
                } else {
                    newFormData.locationZip = zip;
                    newFormData.locationCity = city;
                }
            }
            delete (newFormData as any).location;

            setFormData(newFormData);
            setStep(1);
            setIsSuccess(false);
            setDynamicQuestions([]);
            setErrors({});
        } else {
            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }, [isOpen, initialData]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to finish
    };

    const validate = (currentStep: number): boolean => {
        const newErrors: Record<string, string> = {};
        const isMoving = ['Umzug', 'Transport', 'Firmenumzug', 'Möbeltransport', 'Klaviertransport', 'Privatumzug'].includes(formData.service);

        if (currentStep === 1) {
            if (!formData.service) newErrors.service = 'Bitte wählen Sie eine Dienstleistung aus.';
            if (formData.service) { // Only validate location fields if a service is selected
                if (isMoving) {
                    if (!/^\d{4}$/.test(formData.moveFromZip)) newErrors.moveFromZip = 'Gültige PLZ angeben.';
                    if (formData.moveFromCity.trim() === '') newErrors.moveFromCity = 'Ort angeben.';
                    if (!/^\d{4}$/.test(formData.moveToZip)) newErrors.moveToZip = 'Gültige PLZ angeben.';
                    if (formData.moveToCity.trim() === '') newErrors.moveToCity = 'Ort angeben.';
                } else {
                    if (!/^\d{4}$/.test(formData.locationZip)) newErrors.locationZip = 'Gültige PLZ angeben.';
                    if (formData.locationCity.trim() === '') newErrors.locationCity = 'Ort angeben.';
                }
            }
        }


        if (currentStep === 2) {
            if (!formData.timeline) newErrors.timeline = 'Bitte geben Sie den gewünschten Zeitrahmen an.';
            if (!formData.onSiteVisit) newErrors.onSiteVisit = 'Bitte geben Sie an, ob eine Besichtigung möglich ist.';

            if (isMoving) {
                if (!formData.numberOfRooms) newErrors.numberOfRooms = 'Bitte geben Sie die Anzahl Zimmer an.';
                if (!formData.floorFrom.trim()) newErrors.floorFrom = 'Stockwerk angeben.';
                if (!formData.liftFrom) newErrors.liftFrom = 'Bitte angeben.';
                if (!formData.floorTo.trim()) newErrors.floorTo = 'Stockwerk angeben.';
                if (!formData.liftTo) newErrors.liftTo = 'Bitte angeben.';
            }

            if (dynamicQuestions.length > 0) {
                dynamicQuestions.forEach(q => {
                    if (!formData.dynamicAnswers[q.key] || String(formData.dynamicAnswers[q.key]).trim() === '') {
                        newErrors[q.key] = 'Bitte beantworten Sie diese Frage.';
                    }
                });
            }
        }

        if (currentStep === 3) {
            if (!formData.anrede) newErrors.anrede = 'Bitte wählen Sie eine Anrede.';
            if (formData.anrede === 'Firma' && formData.companyName.trim().length < 2) {
                newErrors.companyName = 'Bitte geben Sie den Firmennamen an.';
            }
            if (formData.anrede === 'Firma' && formData.position.trim().length < 2) {
                newErrors.position = 'Bitte geben Sie Ihre Position an.';
            }
            if (formData.firstName.trim().length < 2) newErrors.firstName = 'Bitte geben Sie Ihren Vornamen an.';
            if (formData.lastName.trim().length < 2) newErrors.lastName = 'Bitte geben Sie Ihren Nachnamen an.';
            if (formData.address.trim().length < 3) newErrors.address = 'Bitte geben Sie Ihre Strasse und Hausnummer an.';
            if (!/^\d{4}$/.test(formData.postalCode)) newErrors.postalCode = 'Bitte geben Sie eine gültige PLZ an.';
            if (formData.city.trim().length < 2) newErrors.city = 'Bitte geben Sie einen Ort an.';
            if (!formData.kanton) newErrors.kanton = 'Bitte wählen Sie einen Kanton aus.';
            if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
            if (formData.mobile.trim().length < 10) newErrors.mobile = 'Bitte geben Sie eine gültige Mobilnummer an.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchDynamicQuestions = useCallback(async () => {
        if (!ai || formData.projectDescription.length < 15) {
            setDynamicQuestions([]);
            return;
        }
        setIsGeneratingQuestions(true);
        try {
            const prompt = `Sie sind ein Experte für Handwerker-Offerten in der Schweiz. Ein Benutzer hat sein Projekt beschrieben. Generieren Sie 3 bis 5 kurze, einfache und wesentliche Folgefragen, um Fachleuten zu helfen, eine genaue Offerte zu erstellen.
- Wenn die Kategorie 'Umzug' ist, fragen Sie unbedingt nach: Anzahl Zimmer, Stockwerk (Start/Ziel) und Liftverfügbarkeit (Start/Ziel).
- Wenn die Kategorie 'Reinigung' ist, fragen Sie nach: Anzahl Zimmer und Art der Reinigung (z.B. Umzugsreinigung, Fensterreinigung).
Halten Sie alle Fragen klar und einfach verständlich. Projekt-Kategorie: "${formData.service}" Benutzer-Beschreibung: "${formData.projectDescription}" Geben Sie die Fragen als JSON-Array zurück, das dem bereitgestellten Schema entspricht.`;
            const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt, config: { responseMimeType: "application/json", responseSchema: questionsSchema } });
            const responseText = response.text || (response as any).response?.text || '';
            if (!responseText) {
                throw new Error("Keine Antwort von der KI erhalten.");
            }
            const questions = JSON.parse(responseText);

            if (questions && questions.length > 0) {
                setDynamicQuestions(questions);
                setFormData(prev => ({ ...prev, dynamicAnswers: {} }))
            } else {
                setDynamicQuestions([]);
            }
        } catch (err) {
            console.error("Error fetching dynamic questions:", err);
            setDynamicQuestions([]);
        } finally {
            setIsGeneratingQuestions(false);
        }
    }, [formData.service, formData.projectDescription]);

    const handleNext = (currentStep: number) => {
        if (!validate(currentStep)) return;
        if (currentStep === 1) {
            const isMoving = ['Umzug', 'Transport', 'Firmenumzug', 'Möbeltransport', 'Klaviertransport', 'Privatumzug'].includes(formData.service);
            if (!isMoving) {
                fetchDynamicQuestions();
            }
            setStep(2);
        } else {
            setStep(s => s + 1);
        }
    };

    const handleBack = () => setStep(s => s > 1 ? s - 1 : 1);

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFormData(prev => ({ ...prev, files: [...prev.files, ...Array.from(e.target.files as FileList)] }));
    };

    const removeFile = (fileToRemove: File) => {
        setFormData(prev => ({ ...prev, files: prev.files.filter(file => file !== fileToRemove) }));
    };

    const API_URL = import.meta.env.VITE_API_URL;

    const sendVerificationEmail = async () => {
        setVerificationCode('');
        setVerificationError('');
        try {
            const res = await fetch(`${API_URL}/api/email/send-verification`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email }),
            });
            if (!res.ok) {
                const data = await res.json();
                setVerificationError(data.message || 'Fehler beim Senden des Codes.');
            }
        } catch {
            setVerificationError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(1)) { setStep(1); return; }
        if (!validate(2)) { setStep(2); return; }
        if (!validate(3)) { setStep(3); return; }

        // Send verification code via email and go to verification step
        setStep(5);
        setResendCooldown(60);
        await sendVerificationEmail();
    };

    const handleVerifyCode = async () => {
        try {
            const res = await fetch(`${API_URL}/api/email/verify-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, code: verificationCode }),
            });
            const data = await res.json();

            if (!res.ok) {
                setVerificationError(data.message || 'Der eingegebene Code ist ungültig.');
                return;
            }

            // Code verified - create lead
            const today = new Date();
            const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            const formattedDate = `${today.getDate()}. ${monthNames[today.getMonth()]} ${today.getFullYear()}`;

            const isMovingService = formData.service.toLowerCase().includes('umzug');
            const location = isMovingService
                ? `${formData.moveFromZip} ${formData.moveFromCity}`
                : `${formData.locationZip} ${formData.locationCity}`;

            const details: { label: string; value: string }[] = [
                { label: 'Zeitrahmen', value: formData.timeline },
            ];

            if (isMovingService) {
                details.push({ label: 'Von', value: `${formData.moveFromZip} ${formData.moveFromCity}` });
                details.push({ label: 'Nach', value: `${formData.moveToZip} ${formData.moveToCity}` });
                if (formData.numberOfRooms) details.push({ label: 'Anzahl Zimmer', value: formData.numberOfRooms });
                if (formData.floorFrom) details.push({ label: 'Stockwerk (Auszug)', value: formData.floorFrom });
                if (formData.liftFrom) details.push({ label: 'Lift (Auszug)', value: formData.liftFrom });
                if (formData.floorTo) details.push({ label: 'Stockwerk (Einzug)', value: formData.floorTo });
                if (formData.liftTo) details.push({ label: 'Lift (Einzug)', value: formData.liftTo });
                if (formData.specialObjects) details.push({ label: 'Besondere Objekte', value: formData.specialObjects });
            }

            if (formData.onSiteVisit) details.push({ label: 'Besichtigung', value: formData.onSiteVisit });

            dynamicQuestions.forEach(q => {
                if (formData.dynamicAnswers[q.key]) {
                    details.push({ label: q.question, value: String(formData.dynamicAnswers[q.key]) });
                }
            });

            const customerName = formData.anrede === 'Firma' && formData.companyName
                ? formData.companyName
                : `${formData.firstName} ${formData.lastName}`;

            const newRequestData = {
                title: `${formData.service} - ${location}`,
                service: formData.service,
                customerName: customerName,
                location: location,
                status: 'Neu',
                price: 15.00,
                details: details,
                description: formData.projectDescription || 'Keine Beschreibung angegeben.',
                customerInfo: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    address: `${formData.address}, ${formData.postalCode} ${formData.city}`,
                    email: formData.email,
                    phone: formData.phone || undefined,
                    mobile: formData.showMobileToProviders ? (formData.mobile || undefined) : undefined,
                },
                qualityScore: Math.floor(Math.random() * 30) + 70,
            };

            // Save to Backend
            const saveRes = await fetch(`${API_URL}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRequestData),
            });

            if (!saveRes.ok) {
                const errorData = await saveRes.json();
                setVerificationError(errorData.message || 'Fehler beim Speichern der Anfrage.');
                return;
            }

            const savedLead = await saveRes.json();
            console.log("New lead saved to backend:", savedLead);

            // Also update local context for immediate UI feedback if needed
            const newLocalRequest = { ...newRequestData, id: savedLead._id, date: formattedDate, customer: customerName, status: 'Neu' as const, files: formData.files.map(f => ({ name: f.name, url: '#' })) };
            addNewRequest(newLocalRequest as any);

            setStep(6);
            setIsSuccess(true);
            setTimeout(handleClose, 5000);
        } catch {
            setVerificationError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
        }
    };

    const handleResendCode = async () => {
        if (resendCooldown > 0) return;
        setIsResending(true);
        await sendVerificationEmail();
        setIsResending(false);
        setResendCooldown(60);
    };

    // Countdown timer for resend cooldown
    React.useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleFieldChange = (field: keyof typeof initialFormData, value: string | boolean) => {
        const newFormData = { ...formData, [field]: value };
        if (field === 'anrede' && value !== 'Firma') {
            newFormData.companyName = '';
            newFormData.position = '';
        }

        if (typeof value === 'string' && /^\d{4}$/.test(value)) {
            const city = plzToCityMap[value];
            if (city) {
                if (field === 'locationZip') {
                    newFormData.locationCity = city;
                } else if (field === 'moveFromZip') {
                    newFormData.moveFromCity = city;
                } else if (field === 'moveToZip') {
                    newFormData.moveToCity = city;
                } else if (field === 'postalCode') {
                    newFormData.city = city;
                }
            }
        }

        setFormData(newFormData);

        if (errors[field as string]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field as string];
                return newErrors;
            });
        }
    };

    const handleDynamicAnswerChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, dynamicAnswers: { ...prev.dynamicAnswers, [key]: value } }));
        if (errors[key]) setErrors(prev => { const newErrors = { ...prev }; delete newErrors[key]; return newErrors; });
    };

    const handleDownloadPDF = () => {
        const isMoving = ['Umzug', 'Transport', 'Firmenumzug', 'Möbeltransport', 'Klaviertransport', 'Privatumzug'].includes(formData.service);

        let dynamicDetailsHtml = '';
        if (dynamicQuestions.length > 0) {
            dynamicDetailsHtml = dynamicQuestions.map(q => `
                <tr>
                    <td style="padding-right: 1em; vertical-align: top;">${q.question}</td>
                    <td>${formData.dynamicAnswers[q.key] || 'Nicht beantwortet'}</td>
                </tr>
            `).join('');
        }

        let movingDetailsHtml = '';
        if (isMoving) {
            movingDetailsHtml = `
                <tr><td>Anzahl Zimmer:</td><td>${formData.numberOfRooms}</td></tr>
                <tr><td>Auszug:</td><td>${formData.floorFrom}. Stock, Lift: ${formData.liftFrom}</td></tr>
                <tr><td>Einzug:</td><td>${formData.floorTo}. Stock, Lift: ${formData.liftTo}</td></tr>
                ${formData.specialObjects ? `<tr><td>Besondere Objekte:</td><td>${formData.specialObjects}</td></tr>` : ''}
            `;
        }

        const content = `
            <html>
                <head>
                    <title>Zusammenfassung Ihrer Offertenanfrage</title>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #334155; line-height: 1.6; }
                        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
                        h1 { color: #166534; border-bottom: 2px solid #16a34a; padding-bottom: 10px; font-size: 24px; }
                        h2 { color: #15803d; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 30px; font-size: 20px;}
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
                        td { padding: 8px 0; vertical-align: top; }
                        td:first-child { font-weight: 600; width: 200px; color: #475569;}
                        .header { text-align: center; margin-bottom: 30px; }
                        .header .logo { font-size: 28px; font-weight: 800; color: #1e293b; }
                        .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #64748b; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">Fertigo</div>
                            <p>Zusammenfassung Ihrer Anfrage vom ${new Date().toLocaleDateString('de-CH')}</p>
                        </div>
    
                        <h2>Projektdaten</h2>
                        <table>
                            <tr><td>Dienstleistung:</td><td>${formData.service}</td></tr>
                            ${isMoving
                ? `<tr><td>Von:</td><td>${formData.moveFromZip} ${formData.moveFromCity}</td></tr>
                                   <tr><td>Nach:</td><td>${formData.moveToZip} ${formData.moveToCity}</td></tr>`
                : `<tr><td>Ort:</td><td>${formData.locationZip} ${formData.locationCity}</td></tr>`
            }
                            <tr><td>Beschreibung:</td><td>${formData.projectDescription.replace(/\n/g, '<br>') || 'Keine Angabe'}</td></tr>
                        </table>
    
                        <h2>Details</h2>
                        <table>
                            <tr><td>Zeitrahmen:</td><td>${formData.timeline}</td></tr>
                            <tr><td>Besichtigung möglich:</td><td>${formData.onSiteVisit || 'Keine Angabe'}</td></tr>
                            <tr><td>Dateien:</td><td>${formData.files.length > 0 ? formData.files.map(f => f.name).join(', ') : 'Keine'}</td></tr>
                            ${movingDetailsHtml}
                            ${dynamicDetailsHtml}
                        </table>
    
                        <h2>Ihre Kontaktdaten</h2>
                        <table>
                            ${formData.anrede === 'Firma' ? `
                                <tr><td>Firma:</td><td>${formData.companyName}</td></tr>
                                <tr><td>Ansprechperson:</td><td>${formData.firstName} ${formData.lastName}</td></tr>
                                <tr><td>Position:</td><td>${formData.position}</td></tr>
                            ` : `
                                <tr><td>Anrede:</td><td>${formData.anrede}</td></tr>
                                <tr><td>Name:</td><td>${formData.firstName} ${formData.lastName}</td></tr>
                            `}
                            <tr><td>Adresse:</td><td>${formData.address}<br>${formData.postalCode} ${formData.city}<br>Kanton ${formData.kanton}</td></tr>
                            <tr><td>E-Mail:</td><td>${formData.email}</td></tr>
                            ${formData.phone ? `<tr><td>Telefon:</td><td>${formData.phone}</td></tr>` : ''}
                            ${formData.mobile ? `<tr><td>Mobile:</td><td>${formData.mobile} <em style="color: ${formData.showMobileToProviders ? '#16a34a' : '#64748b'}; font-size: 12px;">(${formData.showMobileToProviders ? 'Sichtbar für Handwerker' : 'Nicht sichtbar für Handwerker'})</em></td></tr>` : ''}
                        </table>
                        
                        <div class="footer">
                            <p>Vielen Dank, dass Sie Fertigo nutzen. Die Anbieter werden sich in Kürze bei Ihnen melden.</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(content);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    };


    const renderStepContent = () => {
        const isMoving = ['Umzug', 'Transport', 'Firmenumzug', 'Möbeltransport', 'Klaviertransport', 'Privatumzug'].includes(formData.service);
        const kantons = ['AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH'];
        const roomOptions = ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', 'Grösser als 6 Zimmer'];

        switch (step) {
            case 1: // Project Step
                return (
                    <form onSubmit={(e) => { e.preventDefault(); handleNext(1); }} className="flex flex-col h-full animate-fade-in">
                        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3"><ColoredPencilIcon className="w-8 h-8" /><span>Beschreiben Sie Ihr Projekt</span></h2>
                        <p className="text-slate-600 mt-2 mb-8">Starten Sie mit der Auswahl einer Dienstleistung und dem Standort.</p>

                        <div className="space-y-6 flex-grow overflow-y-auto -mr-4 pr-4 custom-scrollbar">
                            <div>
                                <label htmlFor="modal-service" className="font-semibold text-slate-800 mb-2 block">Dienstleistung</label>

                                {/* Popular Services Quick Selection - Hidden when service is selected */}
                                {!formData.service && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                        {popularServicesSelection.map((s) => (
                                            <button
                                                key={s.name}
                                                type="button"
                                                onClick={() => handleFieldChange('service', s.name)}
                                                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-white hover:border-primary-300 hover:bg-slate-50 text-slate-600 transition-all duration-200"
                                            >
                                                <div className="mb-2">{s.icon}</div>
                                                <span className="text-xs font-bold text-center leading-tight">{s.label || s.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <div className="relative">
                                    <BriefcaseIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        id="modal-service"
                                        value={formData.service}
                                        onChange={e => handleFieldChange('service', e.target.value)}
                                        className={`w-full h-14 text-base pl-11 pr-10 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none ${errors.service ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`}
                                        aria-required="true"
                                        aria-invalid={!!errors.service}
                                        aria-describedby={errors.service ? "service-error" : undefined}
                                    >
                                        <option value="" disabled>Dienstleistung wählen...</option>
                                        {allServices.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                </div>
                                {errors.service && <div id="service-error" role="alert" className="text-sm text-red-600 mt-2 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.service}</span></div>}
                            </div>

                            {formData.service && (
                                <div className="space-y-6 animate-fade-in">
                                    {isMoving ? (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="font-semibold text-slate-800 mb-2 block">Von wo?</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                                    <div className="sm:col-span-1">
                                                        <input id="moveFromZip" name="moveFromZip" value={formData.moveFromZip} onChange={e => handleFieldChange('moveFromZip', e.target.value)} type="text" placeholder="PLZ" className={`w-full h-14 text-base px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.moveFromZip ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-invalid={!!errors.moveFromZip} aria-describedby={errors.moveFromZip ? "moveFromZip-error" : undefined} />
                                                        {errors.moveFromZip && <div id="moveFromZip-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.moveFromZip}</span></div>}
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input id="moveFromCity" name="moveFromCity" value={formData.moveFromCity} onChange={e => handleFieldChange('moveFromCity', e.target.value)} type="text" placeholder="Ort" className={`w-full h-14 text-base px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.moveFromCity ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-invalid={!!errors.moveFromCity} aria-describedby={errors.moveFromCity ? "moveFromCity-error" : undefined} />
                                                        {errors.moveFromCity && <div id="moveFromCity-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.moveFromCity}</span></div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="font-semibold text-slate-800 mb-2 block">Nach wo?</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                                    <div className="sm:col-span-1">
                                                        <input id="moveToZip" name="moveToZip" value={formData.moveToZip} onChange={e => handleFieldChange('moveToZip', e.target.value)} type="text" placeholder="PLZ" className={`w-full h-14 text-base px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.moveToZip ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-invalid={!!errors.moveToZip} aria-describedby={errors.moveToZip ? "moveToZip-error" : undefined} />
                                                        {errors.moveToZip && <div id="moveToZip-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.moveToZip}</span></div>}
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input id="moveToCity" name="moveToCity" value={formData.moveToCity} onChange={e => handleFieldChange('moveToCity', e.target.value)} type="text" placeholder="Ort" className={`w-full h-14 text-base px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.moveToCity ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-invalid={!!errors.moveToCity} aria-describedby={errors.moveToCity ? "moveToCity-error" : undefined} />
                                                        {errors.moveToCity && <div id="moveToCity-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.moveToCity}</span></div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <label className="font-semibold text-slate-800 mb-2 block">Ort</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                                <div className="sm:col-span-1">
                                                    <input id="locationZip" name="locationZip" value={formData.locationZip} onChange={e => handleFieldChange('locationZip', e.target.value)} type="text" placeholder="PLZ" className={`w-full h-14 text-base px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.locationZip ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-invalid={!!errors.locationZip} aria-describedby={errors.locationZip ? "locationZip-error" : undefined} />
                                                    {errors.locationZip && <div id="locationZip-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.locationZip}</span></div>}
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input id="locationCity" name="locationCity" value={formData.locationCity} onChange={e => handleFieldChange('locationCity', e.target.value)} type="text" placeholder="Ort" className={`w-full h-14 text-base px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.locationCity ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-invalid={!!errors.locationCity} aria-describedby={errors.locationCity ? "locationCity-error" : undefined} />
                                                    {errors.locationCity && <div id="locationCity-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.locationCity}</span></div>}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="projectDescription" className="font-semibold text-slate-800 mb-2 block">Beschreibung (optional)</label>
                                        <textarea id="projectDescription" name="projectDescription" value={formData.projectDescription} onChange={(e) => handleFieldChange('projectDescription', e.target.value)} className={`w-full text-base p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.projectDescription ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} placeholder={'Beschreiben Sie Ihr Projekt...'} rows={5} aria-invalid={!!errors.projectDescription} aria-describedby={errors.projectDescription ? "projectDescription-error" : undefined} />
                                        {errors.projectDescription && <div id="projectDescription-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.projectDescription}</span></div>}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-auto pt-8">
                            <button type="submit" className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-all shadow-md text-lg flex items-center justify-center gap-2">Details klären <ArrowRightIcon className="w-5 h-5" /></button>
                        </div>
                    </form>
                );
            case 2: // Details step (AI or Loading)
                return (
                    <form onSubmit={(e) => { e.preventDefault(); handleNext(2); }} className="flex flex-col h-full animate-fade-in">
                        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <ColoredWrenchScrewdriverIcon className="w-8 h-8" />
                            <span>Details klären</span>
                        </h2>
                        <p className="text-slate-600 mt-2 mb-8">Zusätzliche Angaben helfen den Profis, Ihnen eine genaue Offerte zu erstellen.</p>

                        <div className="space-y-6 flex-grow overflow-y-auto -mr-4 pr-4 custom-scrollbar">
                            {/* Static Questions */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="timeline" className="font-semibold text-slate-800 mb-2 block">Gewünschter Zeitrahmen</label>
                                    <div className="relative flex items-center">
                                        <CalendarDaysIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <select id="timeline" value={formData.timeline} onChange={e => handleFieldChange('timeline', e.target.value)} className={`w-full h-14 text-base pl-11 pr-10 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none ${errors.timeline ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.timeline} aria-describedby={errors.timeline ? "timeline-error" : undefined}>
                                            <option value="">Bitte wählen...</option>
                                            <option value="So schnell wie möglich">So schnell wie möglich</option>
                                            <option value="Innerhalb 1 Monat">Innerhalb 1 Monat</option>
                                            <option value="Innerhalb 3 Monate">Innerhalb 3 Monate</option>
                                            <option value="Flexibel / Unbestimmt">Flexibel / Unbestimmt</option>
                                        </select>
                                        <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                    </div>
                                    {errors.timeline && <div id="timeline-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.timeline}</span></div>}
                                </div>
                                <div>
                                    <label htmlFor="onSiteVisit" className="font-semibold text-slate-800 mb-2 block">Besichtigungstermin möglich?</label>
                                    <div className="relative flex items-center">
                                        <UsersIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <select id="onSiteVisit" value={formData.onSiteVisit} onChange={e => handleFieldChange('onSiteVisit', e.target.value)} className={`w-full h-14 text-base pl-11 pr-10 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none ${errors.onSiteVisit ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.onSiteVisit} aria-describedby={errors.onSiteVisit ? "onSiteVisit-error" : undefined}>
                                            <option value="">Bitte wählen...</option>
                                            <option value="Ja, erwünscht">Ja, erwünscht</option>
                                            <option value="Ja, nach Absprache">Ja, nach Absprache</option>
                                            <option value="Nein, nicht möglich/nötig">Nein, nicht möglich/nötig</option>
                                        </select>
                                        <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                    </div>
                                    {errors.onSiteVisit && <div id="onSiteVisit-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.onSiteVisit}</span></div>}
                                </div>
                            </div>

                            {isMoving && (
                                <div className="animate-fade-in mt-6 pt-6 border-t border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-3 mb-4">
                                        <ColoredTruckIcon className="w-7 h-7" />
                                        <span>Details zum Umzug</span>
                                    </h3>
                                    <div className="space-y-6 bg-slate-100 p-6 rounded-lg border border-slate-200">
                                        <div>
                                            <label htmlFor="numberOfRooms" className="font-medium text-slate-800 mb-2 block">Anzahl Zimmer</label>
                                            <div className="relative">
                                                <select id="numberOfRooms" value={formData.numberOfRooms} onChange={e => handleFieldChange('numberOfRooms', e.target.value)} className={`w-full h-14 text-base px-4 pr-10 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none ${errors.numberOfRooms ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.numberOfRooms} aria-describedby={errors.numberOfRooms ? "numberOfRooms-error" : undefined}>
                                                    <option value="">Bitte wählen...</option>
                                                    {roomOptions.map(o => <option key={o} value={o}>{o} Zimmer</option>)}
                                                </select>
                                                <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                            </div>
                                            {errors.numberOfRooms && <div id="numberOfRooms-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.numberOfRooms}</span></div>}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="floorFrom" className="font-medium text-slate-800 mb-2 block">Stockwerk (Auszug)</label>
                                                <div className="relative">
                                                    <select id="floorFrom" value={formData.floorFrom} onChange={e => handleFieldChange('floorFrom', e.target.value)} className={`w-full h-14 text-base px-4 pr-10 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none ${errors.floorFrom ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.floorFrom} aria-describedby={errors.floorFrom ? "floorFrom-error" : undefined}>
                                                        <option value="">Wählen...</option>
                                                        <option value="Untergeschoss">Untergeschoss</option>
                                                        <option value="Erdgeschoss">Erdgeschoss</option>
                                                        <option value="Hochparterre">Hochparterre</option>
                                                        <option value="1. Stock">1. Stock</option>
                                                        <option value="2. Stock">2. Stock</option>
                                                        <option value="3. Stock">3. Stock</option>
                                                        <option value="4. Stock">4. Stock</option>
                                                        <option value="5. Stock">5. Stock</option>
                                                        <option value="6. Stock oder höher">6. Stock oder höher</option>
                                                    </select>
                                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                                </div>
                                                {errors.floorFrom && <div id="floorFrom-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.floorFrom}</span></div>}
                                            </div>
                                            <div>
                                                <label htmlFor="liftFrom" className="font-medium text-slate-800 mb-2 block">Lift (Auszug)</label>
                                                <div className="relative">
                                                    <select id="liftFrom" value={formData.liftFrom} onChange={e => handleFieldChange('liftFrom', e.target.value)} className={`w-full h-14 text-base px-4 pr-10 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none ${errors.liftFrom ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.liftFrom} aria-describedby={errors.liftFrom ? "liftFrom-error" : undefined}>
                                                        <option value="">Wählen</option><option value="Ja">Ja</option><option value="Nein">Nein</option><option value="Teilweise">Teilweise</option>
                                                    </select>
                                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                                </div>
                                                {errors.liftFrom && <div id="liftFrom-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.liftFrom}</span></div>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="floorTo" className="font-medium text-slate-800 mb-2 block">Stockwerk (Einzug)</label>
                                                <div className="relative">
                                                    <select id="floorTo" value={formData.floorTo} onChange={e => handleFieldChange('floorTo', e.target.value)} className={`w-full h-14 text-base px-4 pr-10 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none ${errors.floorTo ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.floorTo} aria-describedby={errors.floorTo ? "floorTo-error" : undefined}>
                                                        <option value="">Wählen...</option>
                                                        <option value="Untergeschoss">Untergeschoss</option>
                                                        <option value="Erdgeschoss">Erdgeschoss</option>
                                                        <option value="Hochparterre">Hochparterre</option>
                                                        <option value="1. Stock">1. Stock</option>
                                                        <option value="2. Stock">2. Stock</option>
                                                        <option value="3. Stock">3. Stock</option>
                                                        <option value="4. Stock">4. Stock</option>
                                                        <option value="5. Stock">5. Stock</option>
                                                        <option value="6. Stock oder höher">6. Stock oder höher</option>
                                                    </select>
                                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                                </div>
                                                {errors.floorTo && <div id="floorTo-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.floorTo}</span></div>}
                                            </div>
                                            <div>
                                                <label htmlFor="liftTo" className="font-medium text-slate-800 mb-2 block">Lift (Einzug)</label>
                                                <div className="relative">
                                                    <select id="liftTo" value={formData.liftTo} onChange={e => handleFieldChange('liftTo', e.target.value)} className={`w-full h-14 text-base px-4 pr-10 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none ${errors.liftTo ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.liftTo} aria-describedby={errors.liftTo ? "liftTo-error" : undefined}>
                                                        <option value="">Wählen</option><option value="Ja">Ja</option><option value="Nein">Nein</option><option value="Teilweise">Teilweise</option>
                                                    </select>
                                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                                </div>
                                                {errors.liftTo && <div id="liftTo-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.liftTo}</span></div>}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="specialObjects" className="font-medium text-slate-800 mb-2 block">Besondere Objekte (optional)</label>
                                            <textarea id="specialObjects" value={formData.specialObjects} onChange={e => handleFieldChange('specialObjects', e.target.value)} placeholder="z.B. Klavier, Tresor, grosses Kunstwerk" rows={3} className={`w-full text-base p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.specialObjects ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Dynamic Questions Section */}
                            {isGeneratingQuestions ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
                                    <p className="mt-4 text-slate-600">Ermittle passende Fragen...</p>
                                </div>
                            ) : dynamicQuestions.length > 0 && (
                                <div className="space-y-6 animate-fade-in pt-6 border-t border-slate-200">
                                    <p className="font-semibold text-slate-800">Projektspezifische Fragen:</p>
                                    {dynamicQuestions.map(q => (
                                        <div key={q.key}>
                                            <label htmlFor={q.key} className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                                                <PencilIcon className="w-4 h-4 text-slate-400" />{q.question}
                                            </label>
                                            {q.type === 'select' ? (
                                                <div className="relative flex items-center">
                                                    <select
                                                        id={q.key}
                                                        onChange={e => handleDynamicAnswerChange(q.key, e.target.value)}
                                                        className={`w-full h-14 px-4 pr-10 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none ${errors[q.key] ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`}
                                                        aria-invalid={!!errors[q.key]}
                                                        aria-describedby={errors[q.key] ? `${q.key}-error` : undefined}
                                                    >
                                                        <option value="">Bitte wählen...</option>
                                                        {q.options.map((o: string) => <option key={o} value={o}>{o}</option>)}
                                                    </select>
                                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                                </div>
                                            ) : (
                                                <input
                                                    id={q.key}
                                                    onChange={e => handleDynamicAnswerChange(q.key, e.target.value)}
                                                    type="text"
                                                    className={`w-full h-14 px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors[q.key] ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`}
                                                    aria-invalid={!!errors[q.key]}
                                                    aria-describedby={errors[q.key] ? `${q.key}-error` : undefined}
                                                />
                                            )}
                                            {errors[q.key] && <div id={`${q.key}-error`} role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors[q.key]}</span></div>}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* File Uploader Section */}
                            <FileUploader files={formData.files} onFilesChange={handleFilesChange} onRemoveFile={removeFile} />
                        </div>

                        <div className="mt-auto pt-8 flex items-center gap-4">
                            <button type="button" onClick={handleBack} className="bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 transition-all">Zurück</button>
                            <button type="submit" className="flex-1 bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-all shadow-md text-lg flex items-center justify-center gap-2">
                                Weiter zu Kontakt <ArrowRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                );
            case 3: // Contact
                return (
                    <form onSubmit={(e) => { e.preventDefault(); handleNext(3); }} className="flex flex-col h-full animate-fade-in">
                        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3"><ColoredPartyPopperIcon className="w-8 h-8" /><span>Fast geschafft!</span></h2>
                        <p className="text-slate-600 mt-2 mb-8">Wohin dürfen wir die unverbindlichen Offerten senden?</p>
                        <div className="space-y-6 flex-grow overflow-y-auto -mr-4 pr-4 custom-scrollbar">
                            <div>
                                <div className="relative flex items-center">
                                    <UsersIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        name="anrede"
                                        value={formData.anrede}
                                        onChange={e => handleFieldChange('anrede', e.target.value)}
                                        className={`w-full h-14 text-base p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none bg-white ${errors.anrede ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`}
                                        aria-required="true"
                                        aria-invalid={!!errors.anrede}
                                        aria-describedby={errors.anrede ? "anrede-error" : undefined}
                                    >
                                        <option value="">Anrede wählen</option>
                                        <option value="Frau">Frau</option>
                                        <option value="Herr">Herr</option>
                                        <option value="Firma">Firma</option>
                                    </select>
                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                </div>
                                {errors.anrede && <div id="anrede-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.anrede}</span></div>}
                            </div>
                            {formData.anrede === 'Firma' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div>
                                        <div className="relative flex items-center">
                                            <BuildingOfficeIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input name="companyName" value={formData.companyName} onChange={e => handleFieldChange('companyName', e.target.value)} type="text" placeholder="Firma" className={`w-full h-14 text-base p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.companyName ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.companyName} aria-describedby={errors.companyName ? "companyName-error" : undefined} />
                                        </div>
                                        {errors.companyName && <div id="companyName-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.companyName}</span></div>}
                                    </div>
                                    <div>
                                        <div className="relative flex items-center">
                                            <BriefcaseIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input name="position" value={formData.position} onChange={e => handleFieldChange('position', e.target.value)} type="text" placeholder="Ihre Position" className={`w-full h-14 text-base p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.position ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.position} aria-describedby={errors.position ? "position-error" : undefined} />
                                        </div>
                                        {errors.position && <div id="position-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.position}</span></div>}
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <div className="relative flex items-center">
                                        <ColoredUserIcon className="w-6 h-6 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input name="firstName" value={formData.firstName} onChange={e => handleFieldChange('firstName', e.target.value)} type="text" placeholder={formData.anrede === 'Firma' ? 'Vorname Ansprechperson' : 'Vorname'} className={`w-full h-14 text-base p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.firstName ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "firstName-error" : undefined} />
                                    </div>
                                    {errors.firstName && <div id="firstName-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.firstName}</span></div>}
                                </div>
                                <div>
                                    <div className="relative flex items-center">
                                        <input name="lastName" value={formData.lastName} onChange={e => handleFieldChange('lastName', e.target.value)} type="text" placeholder={formData.anrede === 'Firma' ? 'Nachname Ansprechperson' : 'Nachname'} className={`w-full h-14 text-base p-3 px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.lastName ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "lastName-error" : undefined} />
                                    </div>
                                    {errors.lastName && <div id="lastName-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.lastName}</span></div>}
                                </div>
                            </div>
                            <div>
                                <div className="relative flex items-center">
                                    <ColoredMapPinIcon className="w-6 h-6 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input name="address" value={formData.address} onChange={e => handleFieldChange('address', e.target.value)} type="text" placeholder="Strasse, Nr." className={`w-full h-14 text-base p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.address ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.address} aria-describedby={errors.address ? "address-error" : undefined} />
                                </div>
                                {errors.address && <div id="address-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.address}</span></div>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <div className="relative flex items-center">
                                        <ColoredMapPinIcon className="w-6 h-6 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input name="postalCode" value={formData.postalCode} onChange={e => handleFieldChange('postalCode', e.target.value)} type="text" placeholder="PLZ" className={`w-full h-14 text-base p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.postalCode ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.postalCode} aria-describedby={errors.postalCode ? "postalCode-error" : undefined} />
                                    </div>
                                    {errors.postalCode && <div id="postalCode-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.postalCode}</span></div>}
                                </div>
                                <div>
                                    <div className="relative flex items-center">
                                        <input name="city" value={formData.city} onChange={e => handleFieldChange('city', e.target.value)} type="text" placeholder="Ort" className={`w-full h-14 text-base p-3 px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.city ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.city} aria-describedby={errors.city ? "city-error" : undefined} />
                                    </div>
                                    {errors.city && <div id="city-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.city}</span></div>}
                                </div>
                            </div>
                            <div>
                                <div className="relative flex items-center">
                                    <ColoredMapPinIcon className="w-6 h-6 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select name="kanton" value={formData.kanton} onChange={e => handleFieldChange('kanton', e.target.value)} className={`w-full h-14 text-base p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow appearance-none bg-white ${errors.kanton ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.kanton} aria-describedby={errors.kanton ? "kanton-error" : undefined}>
                                        <option value="">Kanton wählen</option>
                                        {kantons.map(k => <option key={k} value={k}>{k}</option>)}
                                    </select>
                                    <ChevronUpDownIcon className="w-5 h-5 text-slate-400 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
                                </div>
                                {errors.kanton && <div id="kanton-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.kanton}</span></div>}
                            </div>
                            <div>
                                <div className="relative flex items-center">
                                    <ColoredMailIcon className="w-6 h-6 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input name="email" value={formData.email} onChange={e => handleFieldChange('email', e.target.value)} type="email" placeholder="E-Mail" className={`w-full h-14 text-base p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.email ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                                </div>
                                {errors.email && <div id="email-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.email}</span></div>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <div className="relative flex items-center">
                                        <ColoredPhoneIcon className="w-6 h-6 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input name="phone" value={formData.phone} onChange={e => handleFieldChange('phone', e.target.value)} type="tel" placeholder="Telefon (optional)" className="w-full h-14 text-base p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow border-slate-300 focus:border-primary-600 focus:ring-primary-600/50" />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative flex items-center">
                                        <ColoredPhoneIcon className="w-6 h-6 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input name="mobile" value={formData.mobile} onChange={e => handleFieldChange('mobile', e.target.value)} type="tel" placeholder="Mobile" className={`w-full h-14 text-base p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${errors.mobile ? 'border-red-500 ring-red-500/50' : 'border-slate-300 focus:border-primary-600 focus:ring-primary-600/50'}`} aria-required="true" aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? "mobile-error" : undefined} />
                                    </div>
                                    {errors.mobile && <div id="mobile-error" role="alert" className="text-sm text-red-600 mt-1 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" /><span>{errors.mobile}</span></div>}
                                </div>
                            </div>
                            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.showMobileToProviders}
                                        onChange={e => handleFieldChange('showMobileToProviders', e.target.checked)}
                                        className="w-5 h-5 mt-0.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-medium text-slate-800">Mobilnummer sichtbar?</span>
                                        <p className="text-sm text-slate-500 mt-0.5">Wenn aktiviert, können interessierte Handwerker Ihre Mobilnummer sehen und Sie direkt kontaktieren.</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="mt-auto pt-8 flex items-center gap-4">
                            <button type="button" onClick={handleBack} className="bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 transition-all">Zurück</button>
                            <button type="submit" className="flex-1 bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-all shadow-md text-lg flex items-center justify-center gap-2">Weiter zur Übersicht <ArrowRightIcon className="w-5 h-5" /></button>
                        </div>
                    </form>
                );
            case 4: // Review
                return (
                    <div className="flex flex-col h-full animate-fade-in">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-200">
                            <div className="w-12 h-12 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-md">
                                <CheckCircleIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Zusammenfassung</h2>
                                <p className="text-sm text-slate-500">Überprüfen Sie Ihre Angaben</p>
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto pr-2 -mr-2 custom-scrollbar space-y-4">
                            {/* Service Badge */}
                            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                                <TagIcon className="w-4 h-4" />
                                {formData.service}
                            </div>

                            {/* Timeline Style Summary */}
                            <div className="relative pl-8">
                                {/* Timeline Line */}
                                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200"></div>

                                {/* Step 1: Project */}
                                <div className="relative mb-6">
                                    <div className="absolute -left-8 w-6 h-6 rounded-full bg-primary-100 border-2 border-primary-500 flex items-center justify-center">
                                        <span className="text-xs font-bold text-primary-600">1</span>
                                    </div>
                                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-slate-800">Projekt</h3>
                                            <button onClick={() => setStep(1)} type="button" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Bearbeiten</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <span className="text-slate-400 text-xs">Standort</span>
                                                <p className="font-medium text-slate-700">{isMoving ? `${formData.moveFromCity} → ${formData.moveToCity}` : `${formData.locationZip} ${formData.locationCity}`}</p>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 text-xs">Zeitrahmen</span>
                                                <p className="font-medium text-slate-700">{formData.timeline}</p>
                                            </div>
                                        </div>
                                        {formData.projectDescription && (
                                            <div className="mt-3 pt-3 border-t border-slate-100">
                                                <span className="text-slate-400 text-xs">Beschreibung</span>
                                                <p className="text-sm text-slate-600 mt-1">{formData.projectDescription}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Step 2: Details */}
                                <div className="relative mb-6">
                                    <div className="absolute -left-8 w-6 h-6 rounded-full bg-primary-100 border-2 border-primary-500 flex items-center justify-center">
                                        <span className="text-xs font-bold text-primary-600">2</span>
                                    </div>
                                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-slate-800">Details</h3>
                                            <button onClick={() => setStep(2)} type="button" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Bearbeiten</button>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            {isMoving && (
                                                <>
                                                    <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                                                        <span className="text-slate-500">Anzahl Zimmer</span>
                                                        <span className="font-medium text-slate-700">{formData.numberOfRooms}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                                                        <span className="text-slate-500">Auszug (Stockwerk)</span>
                                                        <span className="font-medium text-slate-700">{formData.floorFrom}, Lift: {formData.liftFrom}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                                                        <span className="text-slate-500">Einzug (Stockwerk)</span>
                                                        <span className="font-medium text-slate-700">{formData.floorTo}, Lift: {formData.liftTo}</span>
                                                    </div>
                                                    {formData.specialObjects && (
                                                        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                                                            <span className="text-slate-500">Besondere Objekte</span>
                                                            <span className="font-medium text-slate-700">{formData.specialObjects}</span>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                            {formData.onSiteVisit && (
                                                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                                                    <span className="text-slate-500">Besichtigung</span>
                                                    <span className="font-medium text-slate-700">{formData.onSiteVisit}</span>
                                                </div>
                                            )}
                                            {formData.files.length > 0 && (
                                                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                                                    <span className="text-slate-500">Hochgeladene Dateien</span>
                                                    <span className="font-medium text-slate-700">{formData.files.length} Datei(en)</span>
                                                </div>
                                            )}
                                            {dynamicQuestions.map(q => (
                                                <div key={q.key} className="flex items-center justify-between py-1.5 border-b border-slate-50 gap-4">
                                                    <span className="text-slate-500">{q.question}</span>
                                                    <span className="font-medium text-slate-700 text-right">{formData.dynamicAnswers[q.key] || '-'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3: Contact */}
                                <div className="relative">
                                    <div className="absolute -left-8 w-6 h-6 rounded-full bg-primary-100 border-2 border-primary-500 flex items-center justify-center">
                                        <span className="text-xs font-bold text-primary-600">3</span>
                                    </div>
                                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-slate-800">Kontaktdaten</h3>
                                            <button onClick={() => setStep(3)} type="button" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Bearbeiten</button>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg flex-shrink-0">
                                                {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                {formData.anrede === 'Firma' && formData.companyName && (
                                                    <p className="text-xs text-slate-500 mb-0.5">{formData.companyName}</p>
                                                )}
                                                <p className="font-semibold text-slate-800">{formData.firstName} {formData.lastName}</p>
                                                {formData.position && <p className="text-xs text-slate-500">{formData.position}</p>}
                                                <div className="mt-2 text-sm text-slate-600">
                                                    <p>{formData.address}</p>
                                                    <p>{formData.postalCode} {formData.city}, {formData.kanton}</p>
                                                </div>
                                                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-sm">
                                                    <p className="flex items-center gap-2 text-slate-600">
                                                        <EnvelopeIcon className="w-4 h-4 text-slate-400" />
                                                        {formData.email}
                                                    </p>
                                                    {formData.phone && (
                                                        <p className="flex items-center gap-2 text-slate-600">
                                                            <PhoneIcon className="w-4 h-4 text-slate-400" />
                                                            {formData.phone}
                                                        </p>
                                                    )}
                                                    {formData.mobile && (
                                                        <p className="flex items-center gap-2 text-slate-600">
                                                            <PhoneIcon className="w-4 h-4 text-slate-400" />
                                                            {formData.mobile}
                                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${formData.showMobileToProviders ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                                                {formData.showMobileToProviders ? 'Für Handwerker sichtbar' : 'Privat'}
                                                            </span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-4 border-t border-slate-200">
                            <div className="bg-green-50 rounded-xl p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-medium text-green-800">Bereit zum Absenden</p>
                                        <p className="text-green-700 mt-0.5">Sie erhalten Offerten von geprüften Handwerkern aus Ihrer Region.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button type="button" onClick={() => setStep(3)} className="px-5 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors">
                                    Zurück
                                </button>
                                <button type="button" onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg text-base flex items-center justify-center gap-2">
                                    <RocketLaunchIcon className="w-5 h-5" />
                                    Jetzt Offerten erhalten
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 5: // Verification
                return (
                    <div className="flex flex-col h-full animate-fade-in">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-primary-100 mb-4">
                                <EnvelopeIcon className="w-10 h-10 text-primary-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">E-Mail bestätigen</h2>
                            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                                Wir haben einen 6-stelligen Code an <span className="font-semibold text-slate-700">{formData.email}</span> gesendet.
                            </p>
                        </div>

                        <div className="flex-grow flex flex-col items-center justify-center">
                            {/* Code Input */}
                            <div className="w-full max-w-xs">
                                <label className="block text-sm font-medium text-slate-700 mb-2 text-center">Bestätigungscode eingeben</label>
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                        setVerificationCode(val);
                                        setVerificationError('');
                                    }}
                                    placeholder="• • • • • •"
                                    className={`w-full text-center text-3xl font-mono tracking-[0.5em] py-4 px-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${verificationError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/50' : 'border-slate-300 focus:border-primary-500 focus:ring-primary-500/50'}`}
                                    maxLength={6}
                                    autoFocus
                                />
                                {verificationError && (
                                    <p className="text-red-600 text-sm mt-2 text-center flex items-center justify-center gap-1">
                                        <ExclamationTriangleIcon className="w-4 h-4" />
                                        {verificationError}
                                    </p>
                                )}
                            </div>

                            {/* Verify Button */}
                            <button
                                type="button"
                                onClick={handleVerifyCode}
                                disabled={verificationCode.length !== 6}
                                className={`mt-6 w-full max-w-xs py-3.5 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${verificationCode.length === 6 ? 'bg-primary-600 hover:bg-primary-700 shadow-lg' : 'bg-slate-300 cursor-not-allowed'}`}
                            >
                                <CheckCircleIcon className="w-5 h-5" />
                                Code bestätigen
                            </button>

                            {/* Resend Code */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-slate-500 mb-2">Keinen Code erhalten?</p>
                                {resendCooldown > 0 ? (
                                    <p className="text-sm text-slate-400">
                                        Erneut senden in <span className="font-mono font-semibold">{resendCooldown}s</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResendCode}
                                        disabled={isResending}
                                        className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors disabled:opacity-50"
                                    >
                                        {isResending ? 'Wird gesendet...' : 'Code erneut senden'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-4 border-t border-slate-200">
                            <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3">
                                <ShieldCheckIcon className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-slate-600">
                                    <p>Die Verifizierung schützt vor Spam und stellt sicher, dass nur echte Anfragen an unsere Handwerker weitergeleitet werden.</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep(4)}
                                className="mt-4 w-full py-2.5 text-slate-500 hover:text-slate-700 font-medium transition-colors text-sm"
                            >
                                ← Zurück zur Übersicht
                            </button>
                        </div>
                    </div>
                );
            case 6: // Success
                return (
                    <div className="m-auto text-center animate-fade-in">
                        <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto animate-pulse" />
                        <h2 className="text-3xl font-bold text-slate-900 mt-6">Vielen Dank!</h2>
                        <p className="text-slate-600 mt-2 max-w-md mx-auto">Ihre Anfrage wurde erfolgreich an passende Anbieter übermittelt. Sie erhalten die Angebote in Kürze per E-Mail.</p>
                        <div className="mt-8">
                            <button
                                onClick={handleDownloadPDF}
                                className="bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-all shadow-md text-base flex items-center justify-center gap-2 mx-auto"
                            >
                                <ArrowDownTrayIcon className="w-5 h-5" />
                                Zusammenfassung als PDF
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 mt-6">Dieses Fenster schliesst sich automatisch.</p>
                    </div>
                );
            default:
                return null;
        }
    }

    if (!isOpen && !isVisible) return null;
    // Only render portal if mounted and document.body is available
    if (!mounted || typeof document === 'undefined' || !document.body) return null;

    return createPortal(
        <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[101] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-request-title"
        >
            <div
                className={`bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-2xl shadow-2xl flex transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
                onClick={e => e.stopPropagation()}
            >
                <ProgressSidebar step={step} service={formData.service} />
                <div className="flex-1 flex flex-col p-6 sm:p-10 overflow-y-auto relative">
                    <h2 id="quote-request-title" className="sr-only">Offertenanfrage Formular</h2>
                    <button onClick={handleClose} aria-label="Schliessen" className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"><XMarkIcon className="w-7 h-7" /></button>
                    {renderStepContent()}
                </div>
            </div>
        </div>,
        document.body
    );
}