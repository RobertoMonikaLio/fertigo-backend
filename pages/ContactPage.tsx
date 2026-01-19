


import React, { useState } from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, ArrowRightIcon, SpinnerIcon, CheckCircleIcon, ExclamationTriangleIcon, ChevronDownIcon } from '../components/icons';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from './AppContext';

const translations = {
    de: {
        title: "Kontaktieren Sie uns",
        subtitle: "Haben Sie Fragen oder benötigen Sie Unterstützung? Unser Team ist für Sie da und freut sich auf Ihre Nachricht.",
        directContact: "Direkter Kontakt",
        email: "E-Mail",
        address: "Adresse",
        writeMessage: "Schreiben Sie uns eine Nachricht",
        anrede: "Anrede",
        frau: "Frau",
        herr: "Herr",
        firma: "Firma",
        companyName: "Firmenname",
        position: "Ihre Position",
        firstName: "Vorname",
        lastName: "Nachname",
        firstNameContact: "Vorname Ansprechperson",
        lastNameContact: "Nachname Ansprechperson",
        yourEmail: "Ihre E-Mail",
        phoneOptional: "Telefon (optional)",
        mobileOptional: "Ihre Mobile (optional)",
        subject: "Betreff",
        yourMessage: "Ihre Nachricht",
        sendMessage: "Nachricht senden",
        sendingMessage: "Sende...",
        messageSentTitle: "Nachricht gesendet!",
        messageSentSubtitle: "Vielen Dank für Ihre Kontaktaufnahme. Wir werden uns so schnell wie möglich bei Ihnen melden.",
        firstNamePlaceholder: "Max",
        lastNamePlaceholder: "Mustermann",
        emailPlaceholder: "max.mustermann@example.com",
        phonePlaceholder: "044 123 45 67",
        mobilePlaceholder: "079 123 45 67",
        subjectPlaceholder: "Bitte wählen Sie einen Betreff...",
        messagePlaceholder: "Ihre Nachricht an uns...",
        invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        subjectOptions: {
            general: "Allgemeine Anfrage",
            quote: "Frage zu einer Offerte",
            providerSupport: "Support für Anbieter",
            press: "Presseanfrage",
            other: "Sonstiges"
        },
        selectSubject: "Bitte wählen Sie einen Betreff."
    },
    fr: {
        title: "Contactez-nous",
        subtitle: "Avez-vous des questions ou besoin d'aide ? Notre équipe est là pour vous et se réjouit de votre message.",
        directContact: "Contact direct",
        email: "E-mail",
        address: "Adresse",
        writeMessage: "Écrivez-nous un message",
        anrede: "Civilité",
        frau: "Madame",
        herr: "Monsieur",
        firma: "Entreprise",
        companyName: "Nom de l'entreprise",
        position: "Votre poste",
        firstName: "Prénom",
        lastName: "Nom",
        firstNameContact: "Prénom du contact",
        lastNameContact: "Nom du contact",
        yourEmail: "Votre e-mail",
        phoneOptional: "Téléphone (optionnel)",
        mobileOptional: "Votre mobile (optionnel)",
        subject: "Sujet",
        yourMessage: "Votre message",
        sendMessage: "Envoyer le message",
        sendingMessage: "Envoi...",
        messageSentTitle: "Message envoyé !",
        messageSentSubtitle: "Merci de nous avoir contactés. Nous vous répondrons dès que possible.",
        firstNamePlaceholder: "Jean",
        lastNamePlaceholder: "Dupont",
        emailPlaceholder: "jean.dupont@example.com",
        phonePlaceholder: "022 123 45 67",
        mobilePlaceholder: "079 123 45 67",
        subjectPlaceholder: "Veuillez sélectionner un sujet...",
        messagePlaceholder: "Votre message pour nous...",
        invalidEmail: "Veuillez entrer une adresse e-mail valide.",
        subjectOptions: {
            general: "Demande générale",
            quote: "Question sur un devis",
            providerSupport: "Support pour les fournisseurs",
            press: "Demande de presse",
            other: "Autre"
        },
        selectSubject: "Veuillez sélectionner un sujet."
    },
    it: {
        title: "Contattaci",
        subtitle: "Hai domande o hai bisogno di assistenza? Il nostro team è qui per te e attende con piacere il tuo messaggio.",
        directContact: "Contatto diretto",
        email: "E-mail",
        address: "Indirizzo",
        writeMessage: "Scrivici un messaggio",
        anrede: "Titolo",
        frau: "Signora",
        herr: "Signore",
        firma: "Azienda",
        companyName: "Nome dell'azienda",
        position: "La tua posizione",
        firstName: "Nome",
        lastName: "Cognome",
        firstNameContact: "Nome del contatto",
        lastNameContact: "Cognome del contatto",
        yourEmail: "La tua e-mail",
        phoneOptional: "Telefono (opzionale)",
        mobileOptional: "Il tuo cellulare (opzionale)",
        subject: "Oggetto",
        yourMessage: "Il tuo messaggio",
        sendMessage: "Invia messaggio",
        sendingMessage: "Invio...",
        messageSentTitle: "Messaggio inviato!",
        messageSentSubtitle: "Grazie per averci contattato. Ti risponderemo il prima possibile.",
        firstNamePlaceholder: "Mario",
        lastNamePlaceholder: "Rossi",
        emailPlaceholder: "mario.rossi@example.com",
        phonePlaceholder: "091 123 45 67",
        mobilePlaceholder: "079 123 45 67",
        subjectPlaceholder: "Si prega di selezionare un oggetto...",
        messagePlaceholder: "Il tuo messaggio per noi...",
        invalidEmail: "Inserisci un indirizzo email valido.",
        subjectOptions: {
            general: "Richiesta generale",
            quote: "Domanda su un preventivo",
            providerSupport: "Supporto per fornitori",
            press: "Richiesta stampa",
            other: "Altro"
        },
        selectSubject: "Si prega di selezionare un oggetto."
    },
    en: {
        title: "Contact Us",
        subtitle: "Do you have questions or need support? Our team is here for you and looks forward to your message.",
        directContact: "Direct Contact",
        email: "E-mail",
        address: "Address",
        writeMessage: "Write us a message",
        anrede: "Salutation",
        frau: "Mrs.",
        herr: "Mr.",
        firma: "Company",
        companyName: "Company Name",
        position: "Your Position",
        firstName: "First Name",
        lastName: "Last Name",
        firstNameContact: "Contact First Name",
        lastNameContact: "Contact Last Name",
        yourEmail: "Your E-mail",
        phoneOptional: "Phone (optional)",
        mobileOptional: "Your Mobile (optional)",
        subject: "Subject",
        yourMessage: "Your Message",
        sendMessage: "Send Message",
        sendingMessage: "Sending...",
        messageSentTitle: "Message Sent!",
        messageSentSubtitle: "Thank you for contacting us. We will get back to you as soon as possible.",
        firstNamePlaceholder: "John",
        lastNamePlaceholder: "Doe",
        emailPlaceholder: "john.doe@example.com",
        phonePlaceholder: "044 123 45 67",
        mobilePlaceholder: "079 123 45 67",
        subjectPlaceholder: "Please select a subject...",
        messagePlaceholder: "Your message to us...",
        invalidEmail: "Please enter a valid email address.",
        subjectOptions: {
            general: "General Inquiry",
            quote: "Question about a quote",
            providerSupport: "Support for providers",
            press: "Press inquiry",
            other: "Other"
        },
        selectSubject: "Please select a subject."
    }
};

const ContactPage: React.FC = () => {
    const { language } = useAppContext();
    const t = (translations as any)[language] || translations.de;

    const [formData, setFormData] = useState({ anrede: '', companyName: '', position: '', firstName: '', lastName: '', email: '', phone: '', mobile: '', subject: '', message: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => {
            const newState = { ...prev, [id]: value };
             if (id === 'anrede' && value !== 'Firma') {
                newState.companyName = '';
                newState.position = '';
            }
            return newState;
        });
        if (errors[id as keyof typeof errors]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[id as keyof typeof errors];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.anrede) newErrors.anrede = 'Bitte wählen Sie eine Anrede.';
        if (formData.anrede === 'Firma') {
            if (formData.companyName.trim().length < 2) newErrors.companyName = 'Bitte geben Sie den Firmennamen an.';
            if (formData.position.trim().length < 2) newErrors.position = 'Bitte geben Sie Ihre Position an.';
        }
        if (formData.firstName.trim().length < 2) newErrors.firstName = 'Bitte geben Sie Ihren Vornamen an.';
        if (formData.lastName.trim().length < 2) newErrors.lastName = 'Bitte geben Sie Ihren Nachnamen an.';
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = t.invalidEmail;
        }
         if (!formData.subject) newErrors.subject = t.selectSubject;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setFormStatus('loading');
            setTimeout(() => {
                console.log('Form data submitted:', formData);
                setFormStatus('success');
            }, 1500);
        }
    };

    if (formStatus === 'success') {
        return (
            <div className="bg-white py-24 sm:py-32">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mt-6">{t.messageSentTitle}</h1>
                    <p className="text-lg text-slate-600 mt-4">{t.messageSentSubtitle}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary-50 sm:bg-white py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <div className="hidden md:block max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-4">{t.title}</h1>
                    <p className="text-lg text-slate-600 mb-16">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto">
                    
                    <div className="hidden md:block md:col-span-2">
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">{t.directContact}</h2>
                        <div className="space-y-6 text-slate-700">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <MailIcon className="w-6 h-6 text-primary-700" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">{t.email}</h3>
                                    <a href="mailto:info@fertigo.ch" className="hover:text-primary-700 transition-colors">info@fertigo.ch</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPinIcon className="w-6 h-6 text-primary-700" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">{t.address}</h3>
                                    <p>Musterstrasse 123<br/>8001 Zürich, Schweiz</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:col-span-3 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-200">
                         <h2 className="text-2xl font-bold text-slate-800 mb-6">{t.writeMessage}</h2>
                         <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="anrede" className="block mb-2 text-sm font-medium text-slate-700">{t.anrede}</label>
                                <select id="anrede" value={formData.anrede} onChange={handleChange} className={`w-full border-slate-300 rounded-lg p-3 shadow-sm focus:ring-2 transition ${errors.anrede ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-600 focus:border-primary-600'}`} required aria-required="true" aria-invalid={!!errors.anrede}>
                                    <option value="" disabled>Bitte wählen...</option>
                                    <option value="Frau">{t.frau}</option>
                                    <option value="Herr">{t.herr}</option>
                                    <option value="Firma">{t.firma}</option>
                                </select>
                                {errors.anrede && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4"/>{errors.anrede}</p>}
                            </div>

                            {formData.anrede === 'Firma' && (
                                <div className="space-y-5 animate-fade-in">
                                    <div>
                                        <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-slate-700">{t.companyName}</label>
                                        <input type="text" id="companyName" value={formData.companyName} onChange={handleChange} className={`w-full border-slate-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition ${errors.companyName ? 'border-red-500' : ''}`} placeholder="Name der Firma" required={formData.anrede === 'Firma'} aria-required={formData.anrede === 'Firma'} />
                                        {errors.companyName && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4"/>{errors.companyName}</p>}
                                    </div>
                                     <div>
                                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-slate-700">{t.position}</label>
                                        <input type="text" id="position" value={formData.position} onChange={handleChange} className={`w-full border-slate-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition ${errors.position ? 'border-red-500' : ''}`} placeholder="z.B. Geschäftsführer" required={formData.anrede === 'Firma'} aria-required={formData.anrede === 'Firma'} />
                                        {errors.position && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4"/>{errors.position}</p>}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-slate-700">{formData.anrede === 'Firma' ? t.firstNameContact : t.firstName}</label>
                                    <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} className={`w-full border-slate-300 rounded-lg p-3 shadow-sm focus:ring-2 transition ${errors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-600 focus:border-primary-600'}`} placeholder={t.firstNamePlaceholder} required aria-required="true" aria-invalid={!!errors.firstName} />
                                    {errors.firstName && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4"/>{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-slate-700">{formData.anrede === 'Firma' ? t.lastNameContact : t.lastName}</label>
                                    <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} className={`w-full border-slate-300 rounded-lg p-3 shadow-sm focus:ring-2 transition ${errors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-600 focus:border-primary-600'}`} placeholder={t.lastNamePlaceholder} required aria-required="true" aria-invalid={!!errors.lastName} />
                                    {errors.lastName && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4"/>{errors.lastName}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">{t.yourEmail}</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    className={`w-full border-slate-300 rounded-lg p-3 shadow-sm focus:ring-2 transition ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-600 focus:border-primary-600'}`} 
                                    placeholder={t.emailPlaceholder} 
                                    required 
                                    aria-required="true"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                                {errors.email && <p id="email-error" role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4"/>{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-slate-700">{t.phoneOptional}</label>
                                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="w-full border-slate-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition" placeholder={t.phonePlaceholder} />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-slate-700">{t.mobileOptional}</label>
                                <input type="tel" id="mobile" value={formData.mobile} onChange={handleChange} className="w-full border-slate-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition" placeholder={t.mobilePlaceholder} />
                            </div>
                             <div>
                                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-slate-700">{t.subject}</label>
                                <div className="relative">
                                    <select 
                                        id="subject" 
                                        name="subject"
                                        value={formData.subject} 
                                        onChange={handleChange} 
                                        className={`w-full border-slate-300 rounded-lg p-3 shadow-sm focus:ring-2 transition appearance-none ${errors.subject ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-600 focus:border-primary-600'}`} 
                                        required 
                                        aria-required="true" 
                                        aria-invalid={!!errors.subject}
                                    >
                                        <option value="" disabled>{t.subjectPlaceholder}</option>
                                        <option value={t.subjectOptions.general}>{t.subjectOptions.general}</option>
                                        <option value={t.subjectOptions.quote}>{t.subjectOptions.quote}</option>
                                        <option value={t.subjectOptions.providerSupport}>{t.subjectOptions.providerSupport}</option>
                                        <option value={t.subjectOptions.press}>{t.subjectOptions.press}</option>
                                        <option value={t.subjectOptions.other}>{t.subjectOptions.other}</option>
                                    </select>
                                    <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                                {errors.subject && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4"/>{errors.subject}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-700">{t.yourMessage}</label>
                                <textarea id="message" value={formData.message} onChange={handleChange} rows={4} className="w-full border-slate-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition" placeholder={t.messagePlaceholder}></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={formStatus === 'loading'} 
                                className="w-full bg-primary-700 text-white font-bold py-3 px-5 rounded-lg hover:bg-primary-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 disabled:bg-primary-500 disabled:cursor-wait"
                                aria-busy={formStatus === 'loading'}
                            >
                                {formStatus === 'loading' ? (
                                    <>
                                        <SpinnerIcon className="w-5 h-5 animate-spin"/>
                                        <span>{t.sendingMessage}</span>
                                    </>
                                ) : (
                                    <>
                                        {t.sendMessage} <ArrowRightIcon className="w-5 h-5"/>
                                    </>
                                )}
                            </button>
                         </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;