import React from 'react';
import { Briefcase, Trash2, FileText, Sparkles } from 'lucide-react';

interface JobDescriptionProps {
  jobDescription: string;
  setJobDescription: (text: string) => void;
  onSelectRolePreset?: (roleKey: string) => void;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({
  jobDescription,
  setJobDescription,
  onSelectRolePreset,
}) => {
  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-zinc-800 bg-[#111113]/90 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#F8BBD0]/10 text-[#F8BBD0]">
            <Briefcase className="w-5 h-5 text-[#EC6A9E]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">2. Target Job Description</h3>
            <p className="text-xs text-zinc-400">Enter requirements, responsibilities, and qualifications</p>
          </div>
        </div>

        {jobDescription && (
          <button
            type="button"
            onClick={() => setJobDescription('')}
            className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
            title="Clear job description"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Preset Role Quick Options */}
      {onSelectRolePreset && (
        <div className="mb-3">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-2 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-[#F8BBD0]" />
            <span>Quick Sample Roles:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSelectRolePreset('fullstack-dev')}
              className="px-2.5 py-1 rounded-md bg-black/60 hover:bg-[#EC6A9E]/20 text-[#F8BBD0] border border-zinc-800 hover:border-[#EC6A9E]/40 text-xs transition-colors cursor-pointer"
            >
              Full Stack Engineer
            </button>
            <button
              type="button"
              onClick={() => onSelectRolePreset('ai-engineer')}
              className="px-2.5 py-1 rounded-md bg-black/60 hover:bg-[#EC6A9E]/20 text-[#F8BBD0] border border-zinc-800 hover:border-[#EC6A9E]/40 text-xs transition-colors cursor-pointer"
            >
              AI / ML Engineer
            </button>
            <button
              type="button"
              onClick={() => onSelectRolePreset('junior-dev')}
              className="px-2.5 py-1 rounded-md bg-black/60 hover:bg-[#EC6A9E]/20 text-[#F8BBD0] border border-zinc-800 hover:border-[#EC6A9E]/40 text-xs transition-colors cursor-pointer"
            >
              Junior React Specialist
            </button>
          </div>
        </div>
      )}

      {/* Textarea */}
      <textarea
        rows={8}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste target job description here... (e.g. Responsibilities, Required Experience, Technical Skills, Education)"
        className="w-full bg-black/60 border border-zinc-800 rounded-xl p-3.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#EC6A9E] font-mono leading-relaxed resize-none"
      />

      {/* Footer Info */}
      <div className="flex items-center justify-between mt-2 text-xs text-zinc-500">
        <span>
          {jobDescription ? `${jobDescription.length} characters (${jobDescription.split(/\s+/).filter(Boolean).length} words)` : 'Minimum ~50 words recommended for accurate match'}
        </span>
        {jobDescription.length > 0 && jobDescription.length < 50 && (
          <span className="text-amber-400 text-[11px]">Short job description provided</span>
        )}
      </div>
    </div>
  );
};
