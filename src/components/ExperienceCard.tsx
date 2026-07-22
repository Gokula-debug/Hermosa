import React from 'react';
import { Briefcase, CheckCircle2, XCircle, AlertTriangle, Calendar, UserCheck } from 'lucide-react';
import { ExperienceData } from '../types';

interface ExperienceCardProps {
  data: ExperienceData;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ data }) => {
  const { required = 'N/A', candidate = 'N/A', status = 'Qualified', details } = data || {};

  const isQualified = status === 'Qualified';
  const isPartially = status === 'Partially Qualified';

  return (
    <div className="space-y-4">
      {/* Required vs Candidate Comparison Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-1 flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-[#F8BBD0]" />
            <span>Job Requirement</span>
          </p>
          <p className="text-lg font-bold font-mono text-white">{required}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-1 flex items-center space-x-1">
            <UserCheck className="w-3 h-3 text-[#EC6A9E]" />
            <span>Candidate Total</span>
          </p>
          <p className="text-lg font-bold font-mono text-[#F8BBD0]">{candidate}</p>
        </div>
      </div>

      {/* Qualification Badge Banner */}
      <div
        className={`p-3 rounded-xl border flex items-center justify-between ${
          isQualified
            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
            : isPartially
            ? 'bg-amber-950/30 border-amber-500/30 text-amber-300'
            : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
        }`}
      >
        <div className="flex items-center space-x-2">
          {isQualified ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : isPartially ? (
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-400" />
          )}
          <span className="text-xs font-bold uppercase tracking-wide">
            Status: {status}
          </span>
        </div>
        <span className="text-[11px] opacity-80 font-mono">Experience Match</span>
      </div>

      {/* Detailed Analysis */}
      {details && (
        <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
          {details}
        </div>
      )}
    </div>
  );
};
