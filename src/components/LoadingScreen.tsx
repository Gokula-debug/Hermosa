import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Cpu, ShieldCheck, FileSearch, CheckCircle2 } from 'lucide-react';

const LOADING_PHASES = [
  'Analyzing Candidate Resume Structure...',
  'Extracting Hard & Soft Skills...',
  'Calculating ATS Keywords Compatibility...',
  'Evaluating AI Content Probability...',
  'Comparing Required vs Candidate Experience...',
  'Verifying Academic Degrees & CGPA Scale...',
  'Scanning Fraud & Discrepancy Indicators...',
  'Synthesizing Senior Recruiter Hiring Recommendation...',
  'Generating Final Executive Audit Report...',
];

export const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < LOADING_PHASES.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const progressPct = Math.round(((currentStep + 1) / LOADING_PHASES.length) * 100);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="glass-card max-w-lg w-full p-8 rounded-2xl bg-[#111113]/90 border border-[#F8BBD0]/20 text-center relative overflow-hidden shadow-2xl">
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F8BBD0] via-[#EC6A9E] to-[#F8BBD0] animate-pulse" />

        {/* Animated Central Spinner Icon */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-[#EC6A9E]/20 animate-ping" />
          <div className="w-20 h-20 rounded-full border-4 border-t-[#EC6A9E] border-r-[#F8BBD0] border-b-zinc-800 border-l-zinc-800 animate-spin" />
          <Brain className="w-8 h-8 text-[#F8BBD0] absolute animate-pulse" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
          Hermosa AI Audit in Progress
        </h3>
        <p className="text-xs text-zinc-400 mb-6 font-mono">
          Powered by Gemini 2.5 Flash API
        </p>

        {/* Current Active Step */}
        <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#F8BBD0] font-semibold flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EC6A9E] animate-spin" />
              <span>{LOADING_PHASES[currentStep]}</span>
            </span>
            <span className="font-mono text-zinc-400">{progressPct}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPct}%` }}
              className="bg-gradient-to-r from-[#F8BBD0] to-[#EC6A9E] h-full transition-all duration-500 ease-out"
            />
          </div>
        </div>

        {/* Phase Checkmarks */}
        <div className="space-y-2 text-left max-h-36 overflow-y-auto pr-1">
          {LOADING_PHASES.slice(0, currentStep + 1).map((phase, idx) => (
            <div
              key={idx}
              className={`flex items-center space-x-2 text-xs transition-all duration-300 ${
                idx === currentStep ? 'text-[#F8BBD0] font-semibold' : 'text-zinc-500 line-through'
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 shrink-0 ${
                  idx === currentStep ? 'text-[#EC6A9E] animate-bounce' : 'text-emerald-500'
                }`}
              />
              <span className="truncate">{phase}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
