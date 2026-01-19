import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailIcon, LockClosedIcon, ArrowRightIcon, SpinnerIcon, CheckIcon, XCircleIcon, EyeIcon, EyeSlashIcon, BriefcaseIcon, ShieldCheckIcon } from '../components/icons';

const GoogleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.655-3.397-11.27-7.962l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.712,35.619,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [triggerSubmit, setTriggerSubmit] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleTestLogin = (role: 'partner' | 'admin') => {
        if (loginState === 'loading' || loginState === 'success') return;
        if (role === 'partner') {
            setEmail('partner@fertigo.ch');
            setPassword('password123');
        } else {
            setEmail('admin@fertigo.ch');
            setPassword('adminpassword');
        }
        setTriggerSubmit(true);
    };
    
    useEffect(() => {
        if (triggerSubmit && formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            setTriggerSubmit(false);
        }
    }, [triggerSubmit, email, password]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginState === 'loading' || loginState === 'success') return;
        
        setError(null);
        setLoginState('loading');

        setTimeout(() => {
            if (email === "admin@fertigo.ch" && password === "adminpassword") {
                setLoginState('success');
                setTimeout(() => {
                    window.location.hash = '#/admin/dashboard';
                    navigate('/admin/dashboard');
                    setLoginState('idle'); 
                }, 1500);
            } else if (email === "partner@fertigo.ch" && password === "password123") {
                setLoginState('success');
                setTimeout(() => {
                    window.location.hash = '#/partner/requests';
                    navigate('/partner/requests');
                    setLoginState('idle'); 
                }, 1500);
            } else {
                setLoginState('error');
                setError('E-Mail oder Passwort ungültig.');
                setTimeout(() => {
                    setLoginState('idle');
                }, 2000);
            }
        }, 1500);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); if (error) setError(null); };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); if (error) setError(null); };
    
    const getButtonContent = () => {
        switch (loginState) {
            case 'loading': return <><SpinnerIcon className="h-5 w-5 text-white animate-spin" /><span>Melde an...</span></>;
            case 'success': return <><CheckIcon className="h-6 w-6 text-white" /><span>Erfolgreich!</span></>;
            default: return <><span>Anmelden</span><ArrowRightIcon className="h-5 w-5" /></>;
        }
    };

    const LoginForm = ({ isMobile = false }: { isMobile?: boolean }) => (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor={isMobile ? "email-mobile" : "email"} className="block text-sm font-semibold text-slate-700 mb-2">
                    E-Mail Adresse
                </label>
                <div className="relative group">
                    <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <input 
                        id={isMobile ? "email-mobile" : "email"} 
                        type="email" 
                        value={email}
                        onChange={handleEmailChange}
                        required 
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:ring-0 focus:border-primary-500 transition-all outline-none font-medium text-slate-900 placeholder-slate-400"
                        placeholder="name@beispiel.ch"
                        aria-invalid={!!error}
                    />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor={isMobile ? "password-mobile" : "password"} className="block text-sm font-semibold text-slate-700">
                        Passwort
                    </label>
                    <a href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                        Vergessen?
                    </a>
                </div>
                <div className="relative group">
                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <input 
                        id={isMobile ? "password-mobile" : "password"} 
                        type={isPasswordVisible ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        required 
                        className="w-full pl-12 pr-14 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:ring-0 focus:border-primary-500 transition-all outline-none font-medium text-slate-900 placeholder-slate-400"
                        placeholder="••••••••"
                        aria-invalid={!!error}
                    />
                    <button 
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-all"
                        aria-label={isPasswordVisible ? "Passwort verbergen" : "Passwort anzeigen"}
                    >
                        {isPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {error && (
                <div role="alert" className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-700 text-sm font-medium flex items-center gap-3 animate-shake">
                    <div className="p-1 bg-red-100 rounded-full">
                        <XCircleIcon className="h-5 w-5" />
                    </div>
                    {error}
                </div>
            )}

            <button 
                type="submit" 
                disabled={loginState === 'loading' || loginState === 'success'}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${loginState === 'success' ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-gradient-to-r from-primary-600 to-primary-500 shadow-primary-500/30 hover:shadow-primary-500/50'}`}
                aria-busy={loginState === 'loading'}
            >
                {getButtonContent()}
            </button>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-slate-200"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-sm font-semibold text-slate-400 uppercase tracking-wider">oder weiter mit</span>
                </div>
            </div>

            <button 
                type="button"
                className="w-full py-3.5 px-4 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold transition-all flex items-center justify-center gap-3 group"
            >
                <GoogleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Google</span>
            </button>
        </form>
    );

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-300/20 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
                    <Link to="/" className="inline-flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-all">
                            <span className="text-white font-black text-xl">F</span>
                        </div>
                        <span className="font-extrabold text-2xl text-white tracking-tight">Fertigo</span>
                    </Link>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
                                Willkommen im<br />
                                <span className="text-emerald-200">Partnerportal</span>
                            </h1>
                            <p className="text-lg text-white/80 max-w-md leading-relaxed">
                                Verwalten Sie Ihre Anfragen, Projekte und Abrechnungen an einem zentralen Ort.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Echtzeit-Übersicht</p>
                                    <p className="text-white/70 text-sm">Alle Anfragen auf einen Blick</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Schnelle Reaktion</p>
                                    <p className="text-white/70 text-sm">Direkt auf Anfragen reagieren</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-white/60 text-sm">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30"></div>
                            <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white/30"></div>
                            <div className="w-8 h-8 rounded-full bg-white/40 border-2 border-white/30"></div>
                        </div>
                        <span>Bereits über 100+ Partner vertrauen uns</span>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 xl:w-[45%] bg-white flex flex-col">
                <div className="lg:hidden p-6 pb-0">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">F</span>
                        </div>
                        <span className="font-extrabold text-xl text-slate-900">Fertigo</span>
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 lg:p-12 xl:p-16">
                    <div className="w-full max-w-md">
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                Willkommen zurück
                            </h2>
                            <p className="text-slate-500">
                                Melden Sie sich an, um fortzufahren.
                            </p>
                        </div>

                        <LoginForm />

                        <p className="text-center text-slate-500 mt-8">
                            Noch kein Konto?{' '}
                            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                                Jetzt registrieren
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="hidden lg:block p-6 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>© 2026 Fertigo. Alle Rechte vorbehalten.</span>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-slate-600 transition-colors">Datenschutz</a>
                            <a href="#" className="hover:text-slate-600 transition-colors">Impressum</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="fixed bottom-4 right-4 bg-slate-900 text-slate-300 p-4 rounded-2xl shadow-2xl text-xs space-y-2 opacity-40 hover:opacity-100 transition-opacity hidden lg:block z-50">
                <p className="font-bold text-white border-b border-slate-700 pb-2 mb-2">Test Accounts</p>
                <div className="cursor-pointer hover:text-white flex items-center gap-2 py-1" onClick={() => handleTestLogin('partner')}>
                    <BriefcaseIcon className="w-4 h-4"/> Partner: partner@fertigo.ch
                </div>
                <div className="cursor-pointer hover:text-white flex items-center gap-2 py-1" onClick={() => handleTestLogin('admin')}>
                    <ShieldCheckIcon className="w-4 h-4"/> Admin: admin@fertigo.ch
                </div>
            </div>
        </div>
    );
};

export default LoginPage;