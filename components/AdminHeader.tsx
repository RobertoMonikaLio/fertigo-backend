

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, BellIcon, UserIcon, ArrowRightIcon, ArrowPathIcon } from './icons';
import { Link, useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  title: string;
  onRefresh?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onRefresh }) => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('fertigo_admin');
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  // Admin-Daten dynamisch aus dem localStorage laden
  const [adminName, setAdminName] = useState('Admin');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminInitial, setAdminInitial] = useState('A');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fertigo_admin');
      if (stored) {
        const data = JSON.parse(stored);
        const email = data?.email || '';
        const name = data?.name || data?.email?.split('@')[0] || 'Admin';
        setAdminEmail(email);
        setAdminName(name);
        setAdminInitial(name.charAt(0).toUpperCase());
      }
    } catch {
      // Fallback auf Standardwerte
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <div className="flex items-center gap-4">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            title="Daten aktualisieren"
          >
            <ArrowPathIcon className="w-6 h-6" />
          </button>
        )}
        <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800">
          <BellIcon className="w-6 h-6" />
        </button>

        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(prev => !prev)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-haspopup="true"
            aria-expanded={isUserMenuOpen}
          >
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-600 border-2 border-red-200">
              {adminInitial}
            </div>
            <div className="text-left hidden md:block">
              <p className="font-semibold text-slate-800">{adminName}</p>
              <p className="text-xs text-slate-500">{adminEmail}</p>
            </div>
            <ChevronDownIcon className={`w-4 h-4 text-slate-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isUserMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl z-10 animate-fade-in">
              <div className="p-4 border-b border-slate-200/80 md:hidden">
                <p className="font-semibold text-slate-800">{adminName}</p>
                <p className="text-xs text-slate-500 truncate">{adminEmail}</p>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    to="/admin/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-100 font-medium"
                  >
                    <UserIcon className="w-5 h-5 text-slate-500" />
                    <span>Mein Profil</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
                  >
                    <ArrowRightIcon className="w-5 h-5 text-slate-500" />
                    <span>Abmelden</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;