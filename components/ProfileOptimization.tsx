import React from 'react';
import { LightbulbIcon, PhotoIcon, CalendarDaysIcon, ArrowRightIcon } from './icons';

const ProfileOptimization: React.FC = () => {
  const completeness = 85;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completeness / 100) * circumference;

  const tips = [
    {
      icon: <PhotoIcon className="w-6 h-6 text-primary-700" />,
      text: "Fügen Sie neue Projektbilder hinzu, um Ihre Sichtbarkeit zu erhöhen.",
      action: "Bilder hochladen"
    },
    {
      icon: <CalendarDaysIcon className="w-6 h-6 text-primary-700" />,
      text: "Ihre letzte Aktivität war vor 7 Tagen. Ein aktives Profil wird öfter angefragt.",
      action: "Profil ansehen"
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-slate-200/80 flex items-center gap-3">
        <LightbulbIcon className="w-6 h-6 text-primary-700" />
        <h2 className="text-xl font-bold text-slate-800">Profil-Optimierung</h2>
      </div>
      <div className="p-6 flex flex-col lg:flex-row gap-6 items-center flex-grow">
        {/* Progress Gauge */}
        <div className="flex flex-col items-center text-center flex-shrink-0">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                className="text-slate-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50"
              />
              {/* Progress circle */}
              <circle
                className="text-primary-600 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50"
                transform="rotate(-90 50 50)"
              />
              {/* Text in the middle */}
              <text
                x="50"
                y="50"
                fontFamily="sans-serif"
                fontSize="24"
                fontWeight="bold"
                textAnchor="middle"
                dy=".3em"
                className="fill-current text-slate-800"
              >
                {`${completeness}%`}
              </text>
            </svg>
          </div>
          <p className="font-semibold text-slate-700 mt-3 max-w-[150px]">Ihr Profil ist zu {completeness}% vollständig.</p>
        </div>

        <div className="w-full lg:border-l lg:pl-6 border-slate-200/80">
          <h4 className="font-bold text-slate-800 mb-4 text-center lg:text-left">Dynamische Tipps</h4>
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-slate-50/70 rounded-lg border border-slate-200/60">
                <div className="flex-shrink-0 mt-1">
                  {tip.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-2">{tip.text}</p>
                  <a href="#/partner/profile" className="text-sm font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1">
                    {tip.action} <ArrowRightIcon className="w-4 h-4"/>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptimization;
