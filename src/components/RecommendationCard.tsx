import React from 'react';
import { UserCheck, UserX, HelpCircle, Sparkles, Award } from 'lucide-react';
import { RecommendationData } from '../types';

interface RecommendationCardProps {
  data: RecommendationData;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ data }) => {
  const { decision = 'Hire', confidence = 85, summary } = data || {};

  const getDecisionBadge = (d: string) => {
    switch (d.toLowerCase()) {
      case 'hire':
        return {
          bg: 'bg-emerald-950/50 border-emerald-500/40',
          text: 'text-emerald-400',
          icon: <UserCheck className="w-6 h-6 text-emerald-400" />,
          label: 'STRONG HIRE',
        };
      case 'reject':
        return {
          bg: 'bg-rose-950/50 border-rose-500/40',
          text: 'text-rose-400',
          icon: <UserX className="w-6 h-6 text-rose-400" />,
          label: 'DO NOT RECOMMEND',
        };
      default:
        return {
          bg: 'bg-amber-950/50 border-amber-500/40',
          text: 'text-amber-400',
          icon: <HelpCircle className="w-6 h-6 text-amber-400" />,
          label: 'MAYBE / SECOND ROUND REVIEW',
        };
    }
  };

  const badgeConfig = getDecisionBadge(decision);

  return (
    <div className="space-y-4">
      {/* Decision Banner */}
      <div className={`p-4 rounded-xl border flex items-center justify-between ${badgeConfig.bg}`}>
        <div className="flex items-center space-x-3">
          {badgeConfig.icon}
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
              Hiring Decision Recommendation
            </p>
            <h3 className={`text-lg font-black tracking-wider ${badgeConfig.text}`}>
              {badgeConfig.label}
            </h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium block">
            Confidence
          </span>
          <span className="text-xl font-bold font-mono text-white">
            {confidence}%
          </span>
        </div>
      </div>

      {/* Summary Narrative */}
      {summary && (
        <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-sans">
          <p className="font-semibold text-white mb-1 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F8BBD0]" />
            <span>Executive Assessment:</span>
          </p>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};
