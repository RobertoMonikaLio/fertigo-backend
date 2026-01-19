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
                    // HashRouter verwendet # für Routen
                    window.location.hash = '#/admin/dashboard';
                    navigate('/admin/dashboard');
                    setLoginState('idle'); 
                }, 1500);
            } else if (email === "partner@fertigo.ch" && password === "password123") {
                setLoginState('success');
                setTimeout(() => {
                    // HashRouter verwendet # für Routen
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

    return (
        <>
            {/* --- NEW LIGHT MOBILE VIEW --- */}
            <div className="lg:hidden min-h-screen bg-slate-50 text-slate-900 flex flex-col p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}></div>

                <div className="relative z-10 text-center pt-8">
                    <Link to="/" className="inline-block">
                        <span className="font-extrabold text-3xl tracking-tight">Fertigo</span>
                    </Link>
                </div>
                
                <div className="relative z-10 flex-grow flex flex-col justify-center">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-slate-900">Willkommen zurück</h1>
                        <p className="text-slate-600 mt-2">Melden Sie sich an, um fortzufahren.</p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                         <div>
                            <div className="relative">
                                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input 
                                    id="email-mobile" 
                                    type="email" 
                                    value={email}
                                    onChange={handleEmailChange}
                                    required 
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none font-medium text-slate-900 placeholder-slate-500"
                                    placeholder="E-Mail Adresse"
                                    aria-invalid={!!error}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input 
                                    id="password-mobile" 
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required 
                                    className="w-full pl-12 pr-12 py-4 bg-white border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none font-medium text-slate-900 placeholder-slate-500"
                                    placeholder="Passwort"
                                    aria-invalid={!!error}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label={isPasswordVisible ? "Passwort verbergen" : "Passwort anzeigen"}
                                >
                                    {isPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </button>
                            </div>
                            <div className="text-right mt-2">
                                <a href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700">Passwort vergessen?</a>
                            </div>
                        </div>

                        {error && (
                            <div role="alert" className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2 animate-fade-in">
                                <XCircleIcon className="h-5 w-5" />
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loginState === 'loading' || loginState === 'success'}
                            className={`w-full py-4 px-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${loginState === 'success' ? 'bg-green-500' : `bg-primary-600 shadow-primary-500/30 hover:bg-primary-700`}`}
                            aria-busy={loginState === 'loading'}
                        >
                            {getButtonContent()}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-slate-300 flex-1"></div>
                        <span className="text-xs font-bold text-slate-500 uppercase">Oder</span>
                        <div className="h-px bg-slate-300 flex-1"></div>
                    </div>

                    <button className="w-full py-3.5 px-4 rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all flex items-center justify-center gap-3 group">
                        <GoogleIcon className="w-5 h-5" />
                        <span>Mit Google anmelden</span>
                    </button>
                </div>

                <div className="relative z-10 text-center pb-4">
                    <p className="text-slate-600 text-sm">
                        Noch kein Konto? <Link to="/register" className="font-bold text-primary-600 hover:text-primary-700">Jetzt registrieren</Link>
                    </p>
                </div>
            </div>

            {/* --- DESKTOP VIEW --- */}
            <div className="hidden lg:flex min-h-screen bg-slate-50 items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
                    <div className="p-8 pt-10">
                        <div className="text-center mb-10">
                            <Link to="/" className="inline-block mb-4">
                                <span className="font-extrabold text-3xl text-slate-900 tracking-tight">Fertigo</span>
                            </Link>
                            <h1 className="text-2xl font-bold text-slate-800">Willkommen zurück</h1>
                            <p className="text-slate-500 mt-2">Melden Sie sich an, um fortzufahren.</p>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                             <div>
                                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">E-Mail Adresse</label>
                                <div className="relative">
                                    <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input 
                                        id="email" 
                                        type="email" 
                                        value={email}
                                        onChange={handleEmailChange}
                                        required 
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none font-medium text-slate-800"
                                        placeholder="name@beispiel.ch"
                                        aria-invalid={!!error}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="password" className="block text-sm font-bold text-slate-700">Passwort</label>
                                    <a href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700">Vergessen?</a>
                                </div>
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input 
                                        id="password" 
                                        type={isPasswordVisible ? "text" : "password"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required 
                                        className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none font-medium text-slate-800"
                                        placeholder="••••••••"
                                        aria-invalid={!!error}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        aria-label={isPasswordVisible ? "Passwort verbergen" : "Passwort anzeigen"}
                                    >
                                        {isPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div role="alert" className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2 animate-fade-in">
                                    <XCircleIcon className="h-5 w-5" />
                                    {error}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={loginState === 'loading' || loginState === 'success'}
                                className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${loginState === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-primary-600 hover:bg-primary-700'}`}
                                aria-busy={loginState === 'loading'}
                            >
                                {getButtonContent()}
                            </button>
                        </form>

                        <div className="my-8 flex items-center gap-4">
                            <div className="h-px bg-slate-200 flex-1"></div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Oder</span>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>

                        <button className="w-full py-3 px-4 rounded-xl border-2 border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all flex items-center justify-center gap-3 group">
                            <GoogleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Mit Google anmelden</span>
                        </button>
                    </div>
                    
                    <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
                        <p className="text-slate-600 text-sm">
                            Noch kein Konto? <Link to="/register" className="font-bold text-primary-600 hover:text-primary-700">Jetzt registrieren</Link>
                        </p>
                    </div>
                </div>
                
                <div className="fixed bottom-4 right-4 bg-slate-800 text-slate-300 p-4 rounded-lg shadow-2xl text-xs space-y-2 opacity-50 hover:opacity-100 transition-opacity hidden lg:block">
                    <p className="font-bold text-white border-b border-slate-700 pb-1 mb-2">Test Accounts</p>
                    <div className="cursor-pointer hover:text-white flex items-center gap-2" onClick={() => handleTestLogin('partner')}>
                        <BriefcaseIcon className="w-4 h-4"/> Partner: partner@fertigo.ch
                    </div>
                    <div className="cursor-pointer hover:text-white flex items-center gap-2" onClick={() => handleTestLogin('admin')}>
                        <ShieldCheckIcon className="w-4 h-4"/> Admin: admin@fertigo.ch
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;