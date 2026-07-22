import React from 'react';

interface CircularScoreProps {
  score: number; // 0 to 100
  title: string;
  subtitle?: string;
  size?: number; // SVG px size
  strokeWidth?: number;
  colorTheme?: 'pink' | 'green' | 'blue' | 'amber';
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  title,
  subtitle,
  size = 140,
  strokeWidth = 10,
  colorTheme = 'pink',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const colorMap = {
    pink: {
      stroke: '#EC6A9E',
      gradientFrom: '#F8BBD0',
      gradientTo: '#EC6A9E',
      text: 'text-[#F8BBD0]',
      badgeBg: 'bg-[#EC6A9E]/10',
      badgeBorder: 'border-[#EC6A9E]/30',
    },
    green: {
      stroke: '#22c55e',
      gradientFrom: '#4ade80',
      gradientTo: '#16a34a',
      text: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/40',
      badgeBorder: 'border-emerald-500/30',
    },
    blue: {
      stroke: '#3b82f6',
      gradientFrom: '#60a5fa',
      gradientTo: '#2563eb',
      text: 'text-blue-400',
      badgeBg: 'bg-blue-950/40',
      badgeBorder: 'border-blue-500/30',
    },
    amber: {
      stroke: '#f59e0b',
      gradientFrom: '#fbbf24',
      gradientTo: '#d97706',
      text: 'text-amber-400',
      badgeBg: 'bg-amber-950/40',
      badgeBorder: 'border-amber-500/30',
    },
  };

  const currentTheme = colorMap[colorTheme] || colorMap.pink;

  // Rating label
  const getScoreRating = (val: number) => {
    if (val >= 85) return 'Excellent Match';
    if (val >= 70) return 'Strong Fit';
    if (val >= 50) return 'Moderate Alignment';
    return 'Action Needed';
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentTheme.gradientFrom} />
              <stop offset="100%" stopColor={currentTheme.gradientTo} />
            </linearGradient>
          </defs>

          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#222226"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Animated score progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#gradient-${title.replace(/\s+/g, '-')})`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score percentage */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-3xl font-extrabold font-mono tracking-tight ${currentTheme.text}`}>
            {normalizedScore}%
          </span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mt-0.5">
            Score
          </span>
        </div>
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-bold text-white mb-0.5">{title}</h4>
        {subtitle && <p className="text-xs text-zinc-400 mb-2">{subtitle}</p>}

        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${currentTheme.badgeBg} ${currentTheme.badgeBorder} ${currentTheme.text}`}>
          {getScoreRating(normalizedScore)}
        </span>
      </div>
    </div>
  );
};
