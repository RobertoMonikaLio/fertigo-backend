import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const CustomerRegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPw, setShowPw] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (form.password !== form.confirm) {
            setError('Passwörter stimmen nicht überein.');
            return;
        }
        if (form.password.length < 8) {
            setError('Passwort muss mindestens 8 Zeichen lang sein.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/customer/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Registrierung fehlgeschlagen.');
                return;
            }

            // Auto-login
            localStorage.setItem('fertigo_customer', JSON.stringify({
                _id: data._id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                token: data.token,
                loggedInAt: Date.now(),
            }));

            navigate('/kunden/dashboard');
        } catch {
            setError('Server nicht erreichbar. Bitte versuchen Sie es später erneut.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 font-medium outline-none transition-all focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Fertigo</h1>
                        <p className="text-sm text-green-600 font-semibold mt-0.5">Clever, Günstig, Flexibel</p>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">Kundenkonto erstellen</h2>
                        <p className="text-slate-500 text-sm mt-1">Verfolgen Sie Ihre Anfragen und Projekte.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Vorname</label>
                                <input
                                    name="firstName"
                                    className={inputClass}
                                    placeholder="Max"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nachname</label>
                                <input
                                    name="lastName"
                                    className={inputClass}
                                    placeholder="Muster"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-Mail-Adresse</label>
                            <input
                                name="email"
                                type="email"
                                className={inputClass}
                                placeholder="max.muster@beispiel.ch"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Telefonnummer <span className="text-slate-400 font-normal">(optional)</span></label>
                            <input
                                name="phone"
                                type="tel"
                                className={inputClass}
                                placeholder="+41 XX XXX XX XX"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Passwort</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPw ? 'text' : 'password'}
                                    className={inputClass}
                                    placeholder="Mindestens 8 Zeichen"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(v => !v)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-semibold"
                                >
                                    {showPw ? 'Verstecken' : 'Zeigen'}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Passwort bestätigen</label>
                            <input
                                name="confirm"
                                type="password"
                                className={inputClass}
                                placeholder="Passwort wiederholen"
                                value={form.confirm}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-red-700 text-sm font-semibold">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 text-white font-bold py-3.5 rounded-xl hover:bg-primary-700 disabled:opacity-60 transition-all shadow-md"
                        >
                            {loading ? 'Registrierung...' : 'Konto erstellen'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Bereits ein Konto?{' '}
                        <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700">
                            Anmelden
                        </Link>
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-400">
                            Sie sind Handwerker?{' '}
                            <Link to="/register" className="font-semibold text-slate-600 hover:text-slate-900">
                                Als Partner registrieren →
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerRegisterPage;
