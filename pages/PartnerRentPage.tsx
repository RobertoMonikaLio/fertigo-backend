
import React, { useState, useEffect, useRef } from 'react';
import { 
    TagIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon, MapPinIcon, BanknotesIcon,
    PhotoIcon, CheckCircleIcon, EyeIcon, BoldIcon, ItalicIcon, ListBulletIcon
} from '../components/icons';

// --- MOCK DATA & TYPES ---

interface PartnerRentalItem {
    id: number;
    name: string;
    description: string;
    images: string[]; // URL to the image
    category: 'Baumaschinen' | 'Werkzeuge & Geräte' | 'Garten & Landschaft' | 'Transport & Umzug' | 'Event & Party' | 'Reinigung' | 'Gerüste & Bauzubehör' | 'Fahrzeuge';
    location: string;
    pricePerDay: number;
    status: 'Aktiv' | 'Inaktiv' | 'Entwurf';
}

const initialPartnerItems: PartnerRentalItem[] = [
    { id: 101, name: 'Hochdruckreiniger Kärcher K7', description: 'Leistungsstarker Hochdruckreiniger für Terrassen, Fassaden und Fahrzeuge.', images: ['https://images.unsplash.com/photo-1628135543633-b5f70d74b868?q=80&w=800&auto=format=fit', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format=fit'], category: 'Reinigung', location: '8004 Zürich', pricePerDay: 60, status: 'Aktiv' },
    { id: 102, name: 'Fassadengerüst, 50m²', description: 'Stabiles Fassadengerüst für Maler- und Renovationsarbeiten.', images: ['https://images.unsplash.com/photo-1590234732187-54b03c51888e?q=80&w=800&auto=format=fit'], category: 'Gerüste & Bauzubehör', location: '8004 Zürich', pricePerDay: 25, status: 'Aktiv' },
    { id: 103, name: 'Maler-Abdeckset Profi', description: 'Komplettes Set mit Folien, Klebebändern und Vlies.', images: ['https://images.unsplash.com/photo-1596205252494-b044c38b2a3a?q=80&w=800&auto=format=fit', 'https://images.unsplash.com/photo-1618335438258-e49a035d8e0f?q=80&w=800&auto=format=fit', 'https://images.unsplash.com/photo-1558959958-4235e14d4b89?q=80&w=800&auto=format=fit'], category: 'Werkzeuge & Geräte', location: '8004 Zürich', pricePerDay: 25, status: 'Inaktiv' },
];

const categories: PartnerRentalItem['category'][] = [
    'Baumaschinen', 'Werkzeuge & Geräte', 'Garten & Landschaft', 'Transport & Umzug', 
    'Event & Party', 'Reinigung', 'Gerüste & Bauzubehör', 'Fahrzeuge'
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Aktiv': return 'bg-green-100 text-green-800';
        case 'Inaktiv': return 'bg-slate-100 text-slate-800';
        case 'Entwurf': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

// --- MULTI IMAGE UPLOADER ---
const MultiImageUploader: React.FC<{
    imagePreviews: string[];
    setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ imagePreviews, setImagePreviews }) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const totalImages = imagePreviews.length + files.length;
            if (totalImages > 5) {
                alert('Sie können maximal 5 Bilder hochladen.');
                files.splice(5 - imagePreviews.length);
            }

            Promise.all(files.map((file: File) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            })).then(previews => {
                setImagePreviews(currentPreviews => [...currentPreviews, ...previews]);
            });
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImagePreviews(previews => previews.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Bilder (bis zu 5)</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {imagePreviews.map((src, index) => (
                    <div key={index} className="relative aspect-square group">
                        <img src={src} alt={`Vorschau ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-sm" />
                        <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                {imagePreviews.length < 5 && (
                    <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="aspect-square border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500 hover:border-primary-500 hover:text-primary-600 transition-colors"
                    >
                        <PhotoIcon className="w-8 h-8" />
                        <span className="text-xs mt-1 font-semibold">Bild hinzufügen</span>
                    </button>
                )}
            </div>
            <input
                ref={imageInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesSelected}
                className="hidden"
            />
        </div>
    );
};

// --- RICH TEXT EDITOR ---
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
        
        // Restore focus
        setTimeout(() => textarea.focus(), 0);
    };
    
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-bold text-slate-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition overflow-hidden">
                <div className="px-2 py-1.5 border-b border-slate-100 bg-slate-50 flex items-center gap-1">
                    <button type="button" onClick={() => applyFormat('bold')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"><BoldIcon className="w-4 h-4"/></button>
                    <button type="button" onClick={() => applyFormat('italic')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"><ItalicIcon className="w-4 h-4"/></button>
                    <button type="button" onClick={() => applyFormat('bullet')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"><ListBulletIcon className="w-4 h-4"/></button>
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
                ></textarea>
            </div>
        </div>
    );
};


// --- NEW LISTING FORM COMPONENT ---
const NewListingForm: React.FC<{
    onCreateListing: (newItemData: Omit<PartnerRentalItem, 'id' | 'status'>) => void;
    onClose: () => void;
}> = ({ onCreateListing, onClose }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<PartnerRentalItem['category']>('Werkzeuge & Geräte');
    const [location, setLocation] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreateListing({
            name,
            category,
            location,
            pricePerDay: parseFloat(pricePerDay) || 0,
            description,
            images: imagePreviews,
        });
    };
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-slate-50 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900">Neues Inserat erstellen</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Titel des Inserats</label>
                        <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 border-slate-300 rounded-lg shadow-sm bg-white" placeholder="z.B. Hochdruckreiniger Kärcher K7" />
                    </div>
                    <RichTextEditor 
                        id="description" 
                        name="description" 
                        label="Beschreibung" 
                        value={description} 
                        onChange={(e: any) => setDescription(e.target.value)} 
                        required 
                        rows={4} 
                        placeholder="Beschreiben Sie den Artikel, seinen Zustand und Anwendungsbereiche." 
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Kategorie</label>
                            <select name="category" id="category" value={category} onChange={e => setCategory(e.target.value as any)} className="w-full p-3 border-slate-300 rounded-lg shadow-sm bg-white">
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Standort</label>
                            <div className="relative"><MapPinIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input type="text" name="location" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="w-full pl-11 pr-4 py-3 border-slate-300 rounded-lg shadow-sm bg-white" placeholder="PLZ, Ort" /></div>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="pricePerDay" className="block text-sm font-medium text-slate-700 mb-1">Preis pro Tag (CHF)</label>
                        <div className="relative"><BanknotesIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input type="number" name="pricePerDay" id="pricePerDay" value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} required min="0" step="0.01" className="w-full pl-11 pr-4 py-3 border-slate-300 rounded-lg shadow-sm bg-white" placeholder="z.B. 60" /></div>
                    </div>
                    <MultiImageUploader imagePreviews={imagePreviews} setImagePreviews={setImagePreviews} />
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-200 mt-4">
                        <button type="button" onClick={onClose} className="w-full sm:w-auto bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-300">Abbrechen</button>
                        <button type="submit" className="w-full sm:flex-1 bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 shadow-md">Inserat prüfen</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FeeConfirmationModal: React.FC<{
    onClose: () => void;
    onConfirm: () => void;
}> = ({ onClose, onConfirm }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">Bestätigung erforderlich</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <div className="p-8 text-center">
                    <BanknotesIcon className="w-16 h-16 text-primary-600 mx-auto" />
                    <h4 className="text-2xl font-bold text-slate-800 mt-4">Gebühr für Inserat-Aktivierung</h4>
                    <p className="text-5xl font-extrabold text-slate-900 my-4">CHF 9.90</p>
                    <p className="text-slate-600">
                        Ihr Inserat wird für 30 Tage auf dem Marktplatz sichtbar sein. Mit der Bestätigung wird dieser Betrag von Ihrer hinterlegten Zahlungsmethode abgebucht.
                    </p>
                </div>
                <div className="p-5 bg-slate-50/70 rounded-b-2xl flex justify-end items-center gap-3">
                    <button onClick={onClose} className="bg-slate-200 text-slate-800 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-300 transition-colors">
                        Abbrechen
                    </button>
                    <button onClick={onConfirm} className="bg-primary-600 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-primary-700 shadow-md transition-all">
                        Bestätigen & Bezahlen
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- EDIT LISTING FORM COMPONENT ---
const EditListingForm: React.FC<{
    item: PartnerRentalItem;
    onUpdateListing: (updatedItem: PartnerRentalItem) => void;
    onClose: () => void;
}> = ({ item, onUpdateListing, onClose }) => {
    const [name, setName] = useState(item.name);
    const [category, setCategory] = useState<PartnerRentalItem['category']>(item.category);
    const [location, setLocation] = useState(item.location);
    const [pricePerDay, setPricePerDay] = useState(String(item.pricePerDay));
    const [description, setDescription] = useState(item.description);
    const [imagePreviews, setImagePreviews] = useState<string[]>(item.images);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateListing({
            ...item,
            name,
            category,
            location,
            pricePerDay: parseFloat(pricePerDay) || 0,
            description,
            images: imagePreviews,
        });
    };
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-slate-50 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900">Inserat bearbeiten</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6">
                    <div>
                        <label htmlFor="edit-name" className="block text-sm font-medium text-slate-700 mb-1">Titel des Inserats</label>
                        <input type="text" name="name" id="edit-name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 border-slate-300 rounded-lg shadow-sm bg-white" placeholder="z.B. Hochdruckreiniger Kärcher K7" />
                    </div>
                    <RichTextEditor 
                        id="edit-description" 
                        name="description" 
                        label="Beschreibung" 
                        value={description} 
                        onChange={(e: any) => setDescription(e.target.value)} 
                        required 
                        rows={4} 
                        placeholder="Beschreiben Sie den Artikel, seinen Zustand und Anwendungsbereiche." 
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="edit-category" className="block text-sm font-medium text-slate-700 mb-1">Kategorie</label>
                            <select name="category" id="edit-category" value={category} onChange={e => setCategory(e.target.value as any)} className="w-full p-3 border-slate-300 rounded-lg shadow-sm bg-white">
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="edit-location" className="block text-sm font-medium text-slate-700 mb-1">Standort</label>
                            <div className="relative"><MapPinIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input type="text" name="location" id="edit-location" value={location} onChange={e => setLocation(e.target.value)} required className="w-full pl-11 pr-4 py-3 border-slate-300 rounded-lg shadow-sm bg-white" placeholder="PLZ, Ort" /></div>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="edit-pricePerDay" className="block text-sm font-medium text-slate-700 mb-1">Preis pro Tag (CHF)</label>
                        <div className="relative"><BanknotesIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input type="number" name="pricePerDay" id="edit-pricePerDay" value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} required min="0" step="0.01" className="w-full pl-11 pr-4 py-3 border-slate-300 rounded-lg shadow-sm bg-white" placeholder="z.B. 60" /></div>
                    </div>
                    <MultiImageUploader imagePreviews={imagePreviews} setImagePreviews={setImagePreviews} />
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-200 mt-4">
                        <button type="button" onClick={onClose} className="w-full sm:w-auto bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-300">Abbrechen</button>
                        <button type="submit" className="w-full sm:flex-1 bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 shadow-md">Änderungen speichern</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ListingDetailModal: React.FC<{
    item: PartnerRentalItem;
    onClose: () => void;
}> = ({ item, onClose }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900">Inserat Details</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon className="w-7 h-7" /></button>
                </div>
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                    {item.images && item.images.length > 0 && (
                        <div className="space-y-4">
                            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-inner">
                                <img src={item.images[selectedImageIndex]} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            {item.images.length > 1 && (
                                <div className="grid grid-cols-5 gap-2">
                                    {item.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`aspect-square bg-slate-100 rounded-md overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                                                selectedImageIndex === index ? 'border-primary-600' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    <h3 className="text-3xl font-bold text-slate-800">{item.name}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-slate-700 border-t pt-4">
                        <div><strong>Kategorie:</strong> {item.category}</div>
                        <div><strong>Standort:</strong> {item.location}</div>
                        <div><strong>Preis pro Tag:</strong> CHF {item.pricePerDay.toLocaleString('de-CH')}</div>
                        <div><strong>Status:</strong> <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>{item.status}</span></div>
                    </div>
                    <div className="border-t pt-4">
                        <h4 className="font-bold text-slate-800 mb-2">Beschreibung</h4>
                        <p className="text-slate-600 whitespace-pre-wrap">{item.description}</p>
                    </div>
                </div>
                <div className="p-5 bg-slate-50/70 rounded-b-2xl flex justify-end">
                    <button onClick={onClose} className="bg-slate-200 text-slate-800 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-300 transition-colors">
                        Schliessen
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const PartnerRentPage: React.FC = () => {
    const [myItems, setMyItems] = useState<PartnerRentalItem[]>(initialPartnerItems);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
    const [pendingListing, setPendingListing] = useState<Omit<PartnerRentalItem, 'id' | 'status'> | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showUpdateSuccessMessage, setShowUpdateSuccessMessage] = useState(false);
    const [editingItem, setEditingItem] = useState<PartnerRentalItem | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [viewingItem, setViewingItem] = useState<PartnerRentalItem | null>(null);

    const handleOpenFormModal = () => setIsFormModalOpen(true);
    const handleCloseFormModal = () => setIsFormModalOpen(false);
    
    const handleCreateListing = (newItemData: Omit<PartnerRentalItem, 'id' | 'status'>) => {
        setPendingListing(newItemData);
        handleCloseFormModal();
        setIsFeeModalOpen(true);
    };

    const handleConfirmPayment = () => {
        if (pendingListing) {
            const newItem: PartnerRentalItem = {
                ...pendingListing,
                id: Date.now(),
                status: 'Aktiv'
            };
            setMyItems([newItem, ...myItems]);
            setPendingListing(null);
            setIsFeeModalOpen(false);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 4000);
        }
    };

    const handleDeleteItem = (itemId: number) => {
        if (window.confirm("Möchten Sie dieses Inserat wirklich und unwiderruflich löschen?")) {
            setMyItems(myItems.filter(item => item.id !== itemId));
        }
    };
    
    const handleOpenEditModal = (itemToEdit: PartnerRentalItem) => {
        setEditingItem(itemToEdit);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingItem(null);
    };

    const handleUpdateListing = (updatedItem: PartnerRentalItem) => {
        setMyItems(myItems.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        handleCloseEditModal();
        setShowUpdateSuccessMessage(true);
        setTimeout(() => setShowUpdateSuccessMessage(false), 4000);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            {isFormModalOpen && <NewListingForm onClose={handleCloseFormModal} onCreateListing={handleCreateListing} />}
            {isFeeModalOpen && <FeeConfirmationModal onClose={() => setIsFeeModalOpen(false)} onConfirm={handleConfirmPayment} />}
            {isEditModalOpen && editingItem && <EditListingForm item={editingItem} onClose={handleCloseEditModal} onUpdateListing={handleUpdateListing} />}
            {viewingItem && <ListingDetailModal item={viewingItem} onClose={() => setViewingItem(null)} />}

            <main className="flex flex-col">
                <div className="overflow-y-auto">
                     {showSuccessMessage && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-3" role="alert">
                            <CheckCircleIcon className="w-6 h-6" />
                            <div>
                                <p className="font-bold">Erfolgreich veröffentlicht!</p>
                                <p>Ihr neues Inserat ist jetzt auf dem Marktplatz aktiv.</p>
                            </div>
                        </div>
                    )}
                    {showUpdateSuccessMessage && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-3" role="alert">
                            <CheckCircleIcon className="w-6 h-6" />
                            <div>
                                <p className="font-bold">Erfolgreich aktualisiert!</p>
                                <p>Ihre Änderungen am Inserat wurden gespeichert.</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-800">Meine Miet-Inserate</h1>
                        <button onClick={handleOpenFormModal} className="flex items-center gap-2 bg-primary-600 text-white font-bold px-4 py-2.5 rounded-lg hover:bg-primary-700 transition-all shadow-md text-sm">
                            <PlusIcon className="w-5 h-5" />
                            Neues Inserat erstellen
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-600">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Inserat</th>
                                        <th scope="col" className="px-6 py-3">Kategorie</th>
                                        <th scope="col" className="px-6 py-3">Preis</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3 text-right">Aktionen</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {myItems.map(item => (
                                        <tr key={item.id} className="bg-white border-b hover:bg-slate-50">
                                            <th scope="row" className="px-6 py-4 font-bold text-slate-900">{item.name}</th>
                                            <td className="px-6 py-4">{item.category}</td>
                                            <td className="px-6 py-4">CHF {item.pricePerDay} / Tag</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => setViewingItem(item)} className="p-2 text-slate-500 hover:text-primary-600" title="Details ansehen"><EyeIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => handleOpenEditModal(item)} className="p-2 text-slate-500 hover:text-primary-600" title="Bearbeiten"><PencilIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-slate-500 hover:text-red-600" title="Löschen"><TrashIcon className="w-5 h-5"/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                             {myItems.length === 0 && (
                                <div className="text-center p-12">
                                    <TagIcon className="w-12 h-12 mx-auto text-slate-300" />
                                    <h3 className="mt-4 text-lg font-semibold text-slate-700">Noch keine Inserate</h3>
                                    <p className="mt-1 text-sm text-slate-500">Klicken Sie auf "Neues Inserat erstellen", um Ihr erstes Mietobjekt anzubieten.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PartnerRentPage;
