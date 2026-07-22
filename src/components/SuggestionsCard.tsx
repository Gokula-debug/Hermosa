import React from 'react';
import { Lightbulb, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface SuggestionsCardProps {
  suggestions: string[];
}

export const SuggestionsCard: React.FC<SuggestionsCardProps> = ({ suggestions = [] }) => {
  return (
    <div className="space-y-3">
      {suggestions && suggestions.length > 0 ? (
        <div className="space-y-2">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-black/50 border border-zinc-800 hover:border-[#F8BBD0]/30 transition-colors flex items-start space-x-3 text-xs"
            >
              <div className="p-1 rounded-md bg-[#EC6A9E]/10 text-[#F8BBD0] shrink-0 mt-0.5">
                <Lightbulb className="w-3.5 h-3.5 text-[#EC6A9E]" />
              </div>
              <div className="flex-1">
                <p className="text-zinc-200 leading-relaxed">{item}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-zinc-400 italic">No specific improvements required. Strong resume!</p>
      )}
    </div>
  );
};
