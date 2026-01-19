
import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon } from './icons';

interface Notification {
  id: number;
  title: string;
  time: string;
  isRead: boolean;
  link: string;
}

interface NotificationDropdownProps {
  notifications: Notification[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl z-10 animate-fade-in text-sm">
      <div className="p-4 border-b border-slate-200/80">
        <h3 className="font-bold text-slate-800">Benachrichtigungen</h3>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          <ul>
            {notifications.map(notification => (
              <li key={notification.id}>
                <Link to={notification.link.substring(1)} className="flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors">
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0"></div>
                  )}
                  <div className={notification.isRead ? 'pl-5' : ''}>
                    <p className="font-semibold text-slate-700 leading-tight">{notification.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-10 text-center">
            <BellIcon className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="mt-2 font-semibold text-slate-600">Keine neuen Benachrichtigungen</p>
            <p className="text-xs text-slate-500">Wir informieren Sie hier über neue Leads.</p>
          </div>
        )}
      </div>
      <div className="p-2 border-t border-slate-200/80">
        <Link to="/partner/marketplace" className="w-full text-center block px-3 py-2 font-bold text-primary-600 hover:bg-primary-50 rounded-md transition-colors">
          Alle im Marktplatz ansehen
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;
