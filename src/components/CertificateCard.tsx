import React from 'react';
import { Award, CheckCircle2, AlertCircle, Bookmark } from 'lucide-react';
import { CertificatesData } from '../types';

interface CertificateCardProps {
  data: CertificatesData;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ data }) => {
  const { count = 0, relevant = 0, irrelevant = 0, items = [] } = data || {};

  return (
    <div className="space-y-4">
      {/* Stat Bar */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
          <p className="text-xl font-bold font-mono text-white">{count}</p>
          <p className="text-[11px] text-zinc-400">Total Certs</p>
        </div>
        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
          <p className="text-xl font-bold font-mono text-emerald-400">{relevant}</p>
          <p className="text-[11px] text-emerald-300">Relevant</p>
        </div>
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30">
          <p className="text-xl font-bold font-mono text-amber-400">{irrelevant}</p>
          <p className="text-[11px] text-amber-300">Irrelevant / Generic</p>
        </div>
      </div>

      {/* Certificate Item List */}
      {items && items.length > 0 ? (
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {items.map((cert, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                cert.status === 'Relevant'
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-300'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Award className={`w-4 h-4 shrink-0 ${cert.status === 'Relevant' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <div>
                  <p className="font-medium text-white">{cert.name}</p>
                  {cert.issuer && <p className="text-[11px] text-zinc-400">{cert.issuer}</p>}
                </div>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                  cert.status === 'Relevant'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-zinc-400 italic">
          Candidate has listed {count} certification(s) in resume text.
        </p>
      )}
    </div>
  );
};
