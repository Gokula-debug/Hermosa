import React from 'react';
import { Sparkles, Code2, Cpu, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-[#222226] bg-black/90 py-8 text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Project Info */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-[#EC6A9E]/20 flex items-center justify-center text-[#F8BBD0]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-zinc-300 font-mono tracking-tight">HERMOSA</span>
          <span>•</span>
          <span>AI Resume Intelligence & ATS System</span>
        </div>

        {/* Technology Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#111113] border border-zinc-800 text-zinc-400">
            React + Vite
          </span>
          <span className="px-2 py-0.5 rounded bg-[#111113] border border-zinc-800 text-zinc-400">
            Tailwind CSS
          </span>
          <span className="px-2 py-0.5 rounded bg-[#111113] border border-zinc-800 text-zinc-400">
            Node / Express
          </span>
          <span className="px-2 py-0.5 rounded bg-[#EC6A9E]/10 border border-[#EC6A9E]/20 text-[#F8BBD0]">
            Gemini 2.5 Flash
          </span>
        </div>

        {/* Right copyright */}
        <div className="text-zinc-500">
          Senior Engineering Project
        </div>
      </div>
    </footer>
  );
};
