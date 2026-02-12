import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailIcon, LockClosedIcon, ArrowRightIcon, SpinnerIcon, CheckIcon, XCircleIcon, EyeIcon, EyeSlashIcon, BriefcaseIcon, ShieldCheckIcon } from '../components/icons';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loginState === 'loading' || loginState === 'success') return;
        
        setError(null);
        setLoginState('loading');

        try {
            // Try admin login first
            const adminRes = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (adminRes.ok) {
                const data = await adminRes.json();
                setLoginState('success');
                localStorage.setItem('fertigo_admin', JSON.stringify({
                    email: data.email,
                    role: data.role,
                    token: data.token,
                    loggedInAt: Date.now(),
                }));
                setTimeout(() => {
                    window.location.hash = '#/admin/dashboard';
                    navigate('/admin/dashboard');
                    setLoginState('idle');
                }, 1200);
                return;
            }

            // Try provider login
            const providerRes = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (providerRes.ok) {
                const data = await providerRes.json();
                setLoginState('success');
                localStorage.setItem('fertigo_provider', JSON.stringify({
                    _id: data._id,
                    email: data.email,
                    name: data.name,
                    token: data.token,
                    loggedInAt: Date.now(),
                }));
                setTimeout(() => {
                    window.location.hash = '#/partner/requests';
                    navigate('/partner/requests');
                    setLoginState('idle');
                }, 1200);
                return;
            }

            // Both failed
            setLoginState('error');
            setError('Ungültige E-Mail oder Passwort.');
            setTimeout(() => setLoginState('idle'), 2000);
        } catch (err) {
            setLoginState('error');
            setError('Server nicht erreichbar. Bitte versuchen Sie es später.');
            setTimeout(() => setLoginState('idle'), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500 rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>
            <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-primary-400 rounded-full opacity-5"></div>


            {/* Main Content */}
            <main className="relative z-10 flex items-center justify-center px-6 py-12 min-h-[calc(100vh-180px)]">
                <div className="w-full max-w-[420px]">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                            Sicherer Login
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 mb-3">
                            Partnerportal
                        </h1>
                        <p className="text-slate-500 text-lg">
                            Melden Sie sich mit Ihrem Konto an
                        </p>
                    </div>

                    {/* Form */}
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <div className="relative">
                                <input 
                                    id="email" 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
                                    required 
                                    className="peer w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none text-slate-900 placeholder-transparent"
                                    placeholder="E-Mail"
                                />
                                <label 
                                    htmlFor="email" 
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition-all pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-600 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                                >
                                    E-Mail Adresse
                                </label>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="relative">
                                <input 
                                    id="password" 
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); if (error) setError(null); }}
                                    required 
                                    className="peer w-full px-5 py-4 pr-14 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none text-slate-900 placeholder-transparent"
                                    placeholder="Passwort"
                                />
                                <label 
                                    htmlFor="password" 
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition-all pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-600 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                                >
                                    Passwort
                                </label>
                                <button 
                                    type="button"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {isPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Options Row */}
                        <div className="flex items-center justify-between py-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                                <span className="text-sm text-slate-600">Angemeldet bleiben</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                                Passwort vergessen?
                            </a>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-3">
                                <XCircleIcon className="h-5 w-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loginState === 'loading' || loginState === 'success'}
                            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                                loginState === 'success' 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-slate-900 text-white hover:bg-slate-800'
                            } disabled:cursor-not-allowed`}
                        >
                            {loginState === 'loading' ? (
                                <><SpinnerIcon className="h-5 w-5 animate-spin" /><span>Anmelden...</span></>
                            ) : loginState === 'success' ? (
                                <><CheckIcon className="h-6 w-6" /><span>Erfolgreich!</span></>
                            ) : (
                                <span>Anmelden</span>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-white text-sm text-slate-400">Neu hier?</span>
                        </div>
                    </div>

                    {/* Register Button */}
                    <Link 
                        to="/register" 
                        className="w-full py-4 rounded-2xl font-semibold text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        Konto erstellen
                        <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </div>
            </main>


        </div>
    );
};

export default LoginPage;
