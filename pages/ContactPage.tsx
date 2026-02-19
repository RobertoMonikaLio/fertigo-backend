


import React, { useState } from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, ArrowRightIcon, SpinnerIcon, CheckCircleIcon, ExclamationTriangleIcon, ChevronDownIcon, UserIcon } from '../components/icons';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from './AppContext';
import { translations } from '../components/translations';

const ContactPage: React.FC = () => {
    const { language } = useAppContext();
    const tLang = translations[language] || translations['de'];
    const t = tLang.contactPage;

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
        if (!formData.anrede) newErrors.anrede = t.validationAnrede;
        if (formData.anrede === 'Firma') {
            if (formData.companyName.trim().length < 2) newErrors.companyName = t.validationCompany;
            if (formData.position.trim().length < 2) newErrors.position = t.validationPosition;
        }
        if (formData.firstName.trim().length < 2) newErrors.firstName = t.validationFirstName;
        if (formData.lastName.trim().length < 2) newErrors.lastName = t.validationLastName;
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
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Header */}
            <div className="bg-slate-900 py-12 sm:py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
                                <span>💬</span>
                                <span>{t.weAreHere}</span>
                            </span>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                                {t.heroTitlePart1}<br />
                                <span className="text-primary-400">
                                    {t.heroTitlePart2}
                                </span>
                            </h1>
                            <p className="text-slate-400 text-base sm:text-lg mb-8">
                                {t.subtitle}
                            </p>

                            {/* Mobile Contact Info Cards (Hidden on Desktop) */}
                            <div className="grid grid-cols-1 gap-4 lg:hidden mb-8">
                                <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0">
                                        <MailIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">{t.email}</h3>
                                        <a href="mailto:support@fertigo.ch" className="text-slate-400 text-sm hover:text-white transition-colors">support@fertigo.ch</a>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0">
                                        <MapPinIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">{t.address}</h3>
                                        <p className="text-slate-400 text-sm">Musterstrasse 123<br />8000 Zürich</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="hidden lg:flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
                                <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 text-center">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                                        <UserIcon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{t.weAreHere}</h3>
                                    <p className="text-slate-600 text-sm">{t.responseTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl -mt-6 sm:-mt-8 relative z-10 pb-20">
                <div className="bg-white p-5 sm:p-10 rounded-3xl shadow-2xl border border-slate-200">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">{t.writeMessage}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div className="group">
                            <label htmlFor="anrede" className="block mb-1.5 sm:mb-2 text-sm font-semibold sm:font-medium text-slate-700">{t.anrede}</label>
                            <select id="anrede" value={formData.anrede} onChange={handleChange} className={`w-full border-slate-200 sm:border-slate-300 rounded-xl sm:rounded-lg bg-slate-50 sm:bg-white px-4 py-3 sm:p-3 text-slate-900 shadow-sm focus:bg-white focus:ring-2 transition ${errors.anrede ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-600 focus:border-primary-600'}`} required aria-required="true" aria-invalid={!!errors.anrede}>
                                <option value="" disabled>{t.selectOption}</option>
                                <option value="Frau">{t.frau}</option>
                                <option value="Herr">{t.herr}</option>
                                <option value="Firma">{t.firma}</option>
                            </select>
                            {errors.anrede && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" />{errors.anrede}</p>}
                        </div>

                        {formData.anrede === 'Firma' && (
                            <div className="space-y-4 sm:space-y-5 animate-fade-in">
                                <div>
                                    <label htmlFor="companyName" className="block mb-1.5 sm:mb-2 text-sm font-semibold sm:font-medium text-slate-700">{t.companyName}</label>
                                    <input type="text" id="companyName" value={formData.companyName} onChange={handleChange} className={`w-full border-slate-200 sm:border-slate-300 rounded-xl sm:rounded-lg bg-slate-50 sm:bg-white px-4 py-3 sm:p-3 text-slate-900 shadow-sm focus:bg-white focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition ${errors.companyName ? 'border-red-500' : ''}`} placeholder={t.companyPlaceholder} required={formData.anrede === 'Firma'} aria-required={formData.anrede === 'Firma'} />
                                    {errors.companyName && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" />{errors.companyName}</p>}
                                </div>
                                <div>
                                    <label htmlFor="position" className="block mb-1.5 sm:mb-2 text-sm font-semibold sm:font-medium text-slate-700">{t.position}</label>
                                    <input type="text" id="position" value={formData.position} onChange={handleChange} className={`w-full border-slate-200 sm:border-slate-300 rounded-xl sm:rounded-lg bg-slate-50 sm:bg-white px-4 py-3 sm:p-3 text-slate-900 shadow-sm focus:bg-white focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition ${errors.position ? 'border-red-500' : ''}`} placeholder={t.positionPlaceholder} required={formData.anrede === 'Firma'} aria-required={formData.anrede === 'Firma'} />
                                    {errors.position && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" />{errors.position}</p>}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label htmlFor="firstName" className="block mb-1.5 sm:mb-2 text-sm font-semibold sm:font-medium text-slate-700">{formData.anrede === 'Firma' ? t.firstNameContact : t.firstName}</label>
                                <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} className={`w-full border-slate-200 sm:border-slate-300 rounded-xl sm:rounded-lg bg-slate-50 sm:bg-white px-4 py-3 sm:p-3 text-slate-900 shadow-sm focus:bg-white focus:ring-2 transition ${errors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-600 focus:border-primary-600'}`} placeholder={t.firstNamePlaceholder} required aria-required="true" aria-invalid={!!errors.firstName} />
                                {errors.firstName && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" />{errors.firstName}</p>}
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block mb-1.5 sm:mb-2 text-sm font-semibold sm:font-medium text-slate-700">{formData.anrede === 'Firma' ? t.lastNameContact : t.lastName}</label>
                                <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} className={`w-full border-slate-200 sm:border-slate-300 rounded-xl sm:rounded-lg bg-slate-50 sm:bg-white px-4 py-3 sm:p-3 text-slate-900 shadow-sm focus:bg-white focus:ring-2 transition ${errors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-600 focus:border-primary-600'}`} placeholder={t.lastNamePlaceholder} required aria-required="true" aria-invalid={!!errors.lastName} />
                                {errors.lastName && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" />{errors.lastName}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1.5 sm:mb-2 text-sm font-semibold sm:font-medium text-slate-700">{t.yourEmail}</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full border-slate-200 sm:border-slate-300 rounded-xl sm:rounded-lg bg-slate-50 sm:bg-white px-4 py-3 sm:p-3 text-slate-900 shadow-sm focus:bg-white focus:ring-2 transition ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-600 focus:border-primary-600'}`}
                                placeholder={t.emailPlaceholder}
                                required
                                aria-required="true"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "email-error" : undefined}
                            />
                            {errors.email && <p id="email-error" role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" />{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-1.5 sm:mb-2 text-sm font-semibold sm:font-medium text-slate-700">{t.phoneOptional}</label>
                            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="w-full border-slate-200 sm:border-slate-300 rounded-xl sm:rounded-lg bg-slate-50 sm:bg-white px-4 py-3 sm:p-3 text-slate-900 shadow-sm focus:bg-white focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition" placeholder={t.phonePlaceholder} />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block mb-1.5 sm:mb-2 text-sm font-semibold sm:font-medium text-slate-700">{t.mobileOptional}</label>
                            <input type="tel" id="mobile" value={formData.mobile} onChange={handleChange} className="w-full border-slate-200 sm:border-slate-300 rounded-xl sm:rounded-lg bg-slate-50 sm:bg-white px-4 py-3 sm:p-3 text-slate-900 shadow-sm focus:bg-white focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition" placeholder={t.mobilePlaceholder} />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-1.5 sm:mb-2 text-sm font-semibold sm:font-medium text-slate-700">{t.subject}</label>
                            <div className="relative">
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full border-slate-200 sm:border-slate-300 rounded-xl sm:rounded-lg bg-slate-50 sm:bg-white px-4 py-3 sm:p-3 text-slate-900 shadow-sm focus:bg-white focus:ring-2 transition appearance-none ${errors.subject ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-600 focus:border-primary-600'}`}
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
                            {errors.subject && <p role="alert" className="mt-2 text-sm text-red-600 flex items-center gap-1.5"><ExclamationTriangleIcon className="w-4 h-4" />{errors.subject}</p>}
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-1.5 sm:mb-2 text-sm font-semibold sm:font-medium text-slate-700">{t.yourMessage}</label>
                            <textarea id="message" value={formData.message} onChange={handleChange} rows={4} className="w-full border-slate-200 sm:border-slate-300 rounded-xl sm:rounded-lg bg-slate-50 sm:bg-white px-4 py-3 sm:p-3 text-slate-900 shadow-sm focus:bg-white focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition" placeholder={t.messagePlaceholder}></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={formStatus === 'loading'}
                            className="w-full bg-primary-700 text-white font-bold py-3.5 sm:py-3 px-5 rounded-xl sm:rounded-lg hover:bg-primary-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 disabled:bg-primary-500 disabled:cursor-wait"
                            aria-busy={formStatus === 'loading'}
                        >
                            {formStatus === 'loading' ? (
                                <>
                                    <SpinnerIcon className="w-5 h-5 animate-spin" />
                                    <span>{t.sendingMessage}</span>
                                </>
                            ) : (
                                <>
                                    {t.sendMessage} <ArrowRightIcon className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;