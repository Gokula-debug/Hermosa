import React from 'react';
import { GraduationCap, Building2, Award, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { AcademicVerificationData } from '../types';

interface AcademicCardProps {
  data: AcademicVerificationData;
}

export const AcademicCard: React.FC<AcademicCardProps> = ({ data }) => {
  const {
    degree = 'Degree Not Stated',
    university = 'University Not Stated',
    cgpa = 'N/A',
    graduationYear = 'N/A',
    status = 'Verified',
    notes,
  } = data || {};

  const isVerified = status === 'Verified';

  return (
    <div className="space-y-3.5">
      {/* Degree Title & Status */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-[#F8BBD0]/10 text-[#F8BBD0]">
            <GraduationCap className="w-5 h-5 text-[#EC6A9E]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{degree}</h4>
            <p className="text-xs text-zinc-400 flex items-center space-x-1 mt-0.5">
              <Building2 className="w-3 h-3 text-zinc-500" />
              <span>{university}</span>
            </p>
          </div>
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex items-center space-x-1 ${
            isVerified
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
              : 'bg-amber-950/40 border-amber-500/30 text-amber-400'
          }`}
        >
          {isVerified ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
          <span>{status}</span>
        </span>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 flex items-center space-x-2.5">
          <Award className="w-4 h-4 text-[#F8BBD0]" />
          <div>
            <p className="text-[10px] text-zinc-500 uppercase font-semibold">CGPA / Grade</p>
            <p className="font-mono font-bold text-white">{cgpa}</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 flex items-center space-x-2.5">
          <Calendar className="w-4 h-4 text-[#EC6A9E]" />
          <div>
            <p className="text-[10px] text-zinc-500 uppercase font-semibold">Graduation Year</p>
            <p className="font-mono font-bold text-white">{graduationYear}</p>
          </div>
        </div>
      </div>

      {/* Verification Notes */}
      {notes && (
        <p className="text-xs text-zinc-400 p-2.5 rounded-xl bg-black/40 border border-zinc-800/80 leading-relaxed">
          <strong className="text-zinc-300">Verification Note:</strong> {notes}
        </p>
      )}
    </div>
  );
};
