import React from 'react';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerBorder?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  icon,
  badge,
  children,
  className = '',
  headerBorder = true,
}) => {
  return (
    <div className={`glass-card p-5 sm:p-6 rounded-2xl bg-[#111113]/90 border border-[#222226] hover:border-[#F8BBD0]/30 transition-all duration-300 flex flex-col justify-between ${className}`}>
      <div>
        {/* Card Header */}
        <div className={`flex items-start justify-between ${headerBorder ? 'pb-4 mb-4 border-b border-zinc-800/80' : 'mb-3'}`}>
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="p-2.5 rounded-xl bg-[#F8BBD0]/10 text-[#F8BBD0] border border-[#F8BBD0]/20 shrink-0">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
              {subtitle && <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {badge && <div>{badge}</div>}
        </div>

        {/* Card Content Body */}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};
