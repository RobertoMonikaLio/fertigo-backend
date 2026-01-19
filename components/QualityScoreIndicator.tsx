import React from 'react';

interface QualityScoreIndicatorProps {
    score: number;
}

const QualityScoreIndicator: React.FC<QualityScoreIndicatorProps> = ({ score }) => {
    const getScoreDetails = (s: number) => {
        if (s >= 75) {
            return {
                label: 'Hoch',
                color: 'bg-green-500',
                textColor: 'text-green-800',
                bgColor: 'bg-green-100',
            };
        } else if (s >= 40) {
            return {
                label: 'Mittel',
                color: 'bg-yellow-500',
                textColor: 'text-yellow-800',
                bgColor: 'bg-yellow-100',
            };
        } else {
            return {
                label: 'Niedrig',
                color: 'bg-red-500',
                textColor: 'text-red-800',
                bgColor: 'bg-red-100',
            };
        }
    };

    const { label, color, textColor, bgColor } = getScoreDetails(score);

    return (
        <div className="flex items-center gap-2" title={`Qualitäts-Score: ${score}/100`}>
            <div className={`w-20 bg-slate-200 rounded-full h-2.5`}>
                <div className={`${color} h-2.5 rounded-full`} style={{ width: `${score}%` }}></div>
            </div>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
                {label}
            </span>
        </div>
    );
};

export default QualityScoreIndicator;
