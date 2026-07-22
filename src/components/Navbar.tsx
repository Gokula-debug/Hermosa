import React from 'react';
import { Sparkles, FileCheck, RefreshCw, Cpu, Zap } from 'lucide-react';

interface NavbarProps {
  onReset?: () => void;
  onOpenSamples?: () => void;
  isDashboard?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset, onOpenSamples, isDashboard }) => {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#222226]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={onReset}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EC6A9E] to-[#F8BBD0] p-0.5 shadow-lg shadow-[#EC6A9E]/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#111113] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#F8BBD0] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                HERMOSA
              </span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#F8BBD0]/10 text-[#F8BBD0] border border-[#F8BBD0]/20 font-semibold">
                AI 2.5 Flash
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Resume Intelligence & ATS Audit Platform
            </p>
          </div>
        </div>

        {/* Right Controls & Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#111113] border border-zinc-800 text-xs text-zinc-300">
            <Cpu className="w-3.5 h-3.5 text-[#F8BBD0]" />
            <span>Gemini 2.5 Engine Active</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          {onOpenSamples && (
            <button
              onClick={onOpenSamples}
              className="flex items-center space-x-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-[#111113] hover:bg-zinc-800 text-[#F8BBD0] border border-[#F8BBD0]/20 hover:border-[#F8BBD0]/40 transition-all duration-200 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#EC6A9E]" />
              <span>Sample Profiles</span>
            </button>
          )}

          {isDashboard && onReset && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-[#EC6A9E] hover:bg-[#d9588b] text-white shadow-md shadow-[#EC6A9E]/20 transition-all duration-200 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Analyze Another Resume</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
