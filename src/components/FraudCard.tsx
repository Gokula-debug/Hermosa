import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { FraudDetectionData } from '../types';

interface FraudCardProps {
  data: FraudDetectionData;
}

export const FraudCard: React.FC<FraudCardProps> = ({ data }) => {
  const { risk = 'Low', reasons = [], flags = [] } = data || {};

  const getRiskBadge = (r: string) => {
    switch (r.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-rose-950/50',
          border: 'border-rose-500/40',
          text: 'text-rose-400',
          icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
          label: 'HIGH FRAUD RISK',
        };
      case 'medium':
        return {
          bg: 'bg-amber-950/50',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
          label: 'MEDIUM RISK - ATTENTION NEEDED',
        };
      default:
        return {
          bg: 'bg-emerald-950/40',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
          label: 'LOW RISK - CLEAN BACKCHECK',
        };
    }
  };

  const badgeConfig = getRiskBadge(risk);

  return (
    <div className="space-y-3.5">
      {/* Risk Banner */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between ${badgeConfig.bg} ${badgeConfig.border}`}>
        <div className="flex items-center space-x-2.5">
          {badgeConfig.icon}
          <div>
            <h4 className={`text-xs font-extrabold tracking-wider ${badgeConfig.text}`}>
              {badgeConfig.label}
            </h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Automated Verification Engine Scan
            </p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${badgeConfig.text} border ${badgeConfig.border}`}>
          {risk} Risk
        </span>
      </div>

      {/* Specific Check Flags if available */}
      {flags && flags.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {flags.map((flag, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 flex items-start space-x-2 text-xs">
              {flag.status === 'Pass' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : flag.status === 'Warning' ? (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold text-white">{flag.type}</p>
                <p className="text-[11px] text-zinc-400 leading-tight">{flag.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Findings List */}
      {reasons && reasons.length > 0 && (
        <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-xs">
          <p className="font-semibold text-zinc-300 mb-1.5 flex items-center space-x-1">
            <Info className="w-3.5 h-3.5 text-[#F8BBD0]" />
            <span>Audit Findings & Observations:</span>
          </p>
          <ul className="space-y-1 text-zinc-400 pl-4 list-disc marker:text-[#EC6A9E]">
            {reasons.map((reason, idx) => (
              <li key={idx} className="leading-relaxed">
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
