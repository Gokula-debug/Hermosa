import React from 'react';
import { ShieldCheck, FileCheck2, Cpu, Brain, Sparkles, Target, Zap } from 'lucide-react';

interface HeroProps {
  onSelectSample?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectSample }) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-6 bg-radial-gradient">
      {/* Background Decorative Blur Circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#EC6A9E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#111113] border border-[#F8BBD0]/20 text-xs font-medium text-[#F8BBD0] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#EC6A9E]" />
          <span>Automated Senior Tech Recruiter Audit Engine</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          AI Resume Intelligence <br />
          <span className="bg-gradient-to-r from-[#F8BBD0] via-[#EC6A9E] to-white bg-clip-text text-transparent pink-text-glow">
            & Job Fit Auditor
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Upload any engineering resume PDF alongside a job description. Hermosa uses <span className="text-zinc-200 font-medium">Gemini 2.5 Flash</span> to generate an instant 10-point audit report covering ATS score, skill gaps, fraud detection, and hiring recommendations.
        </p>

        {/* Feature Highlights Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-6 text-xs text-zinc-300 font-medium">
          <div className="flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-[#111113]/80 border border-zinc-800/80 backdrop-blur">
            <Target className="w-4 h-4 text-[#F8BBD0]" />
            <span>0-100% ATS Match</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-[#111113]/80 border border-zinc-800/80 backdrop-blur">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Fraud & Risk Audit</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-[#111113]/80 border border-zinc-800/80 backdrop-blur">
            <Brain className="w-4 h-4 text-[#EC6A9E]" />
            <span>AI Content Probability</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-[#111113]/80 border border-zinc-800/80 backdrop-blur">
            <FileCheck2 className="w-4 h-4 text-[#F8BBD0]" />
            <span>Academic & Degree Check</span>
          </div>
        </div>
      </div>
    </div>
  );
};
