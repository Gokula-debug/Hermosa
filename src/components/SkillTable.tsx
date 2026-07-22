import React, { useState } from 'react';
import { CheckCircle, XCircle, Search, Filter, Layers, Code } from 'lucide-react';

interface SkillTableProps {
  matchedSkills: string[];
  missingSkills: string[];
}

export const SkillTable: React.FC<SkillTableProps> = ({ matchedSkills = [], missingSkills = [] }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'matched' | 'missing'>('all');

  const totalSkills = matchedSkills.length + missingSkills.length;
  const matchPercentage = totalSkills > 0 ? Math.round((matchedSkills.length / totalSkills) * 100) : 0;

  const filteredMatched = matchedSkills.filter((s) => s.toLowerCase().includes(search.toLowerCase()));
  const filteredMissing = missingSkills.filter((s) => s.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      {/* Skill Match Overview Progress Bar */}
      <div className="bg-black/50 p-3.5 rounded-xl border border-zinc-800/80">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-zinc-300 font-medium flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-[#F8BBD0]" />
            <span>Skill Match Ratio</span>
          </span>
          <span className="font-mono font-bold text-[#F8BBD0]">
            {matchedSkills.length} of {totalSkills} Skills Found ({matchPercentage}%)
          </span>
        </div>
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${matchPercentage}%` }}
            className="bg-emerald-500 h-full transition-all duration-700"
          />
          <div
            style={{ width: `${100 - matchPercentage}%` }}
            className="bg-[#EC6A9E]/60 h-full transition-all duration-700"
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills..."
            className="w-full bg-black/60 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#EC6A9E]"
          />
        </div>

        <div className="flex items-center space-x-1 bg-black/60 p-1 rounded-lg border border-zinc-800 text-xs w-full sm:w-auto justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              filter === 'all' ? 'bg-[#EC6A9E] text-white font-medium' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All ({totalSkills})
          </button>
          <button
            onClick={() => setFilter('matched')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              filter === 'matched' ? 'bg-emerald-600 text-white font-medium' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Matched ({matchedSkills.length})
          </button>
          <button
            onClick={() => setFilter('missing')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              filter === 'missing' ? 'bg-rose-900/80 text-white font-medium' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Missing ({missingSkills.length})
          </button>
        </div>
      </div>

      {/* Matched Skills Grid */}
      {(filter === 'all' || filter === 'matched') && (
        <div>
          <div className="flex items-center space-x-1.5 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Matched Skills ({filteredMatched.length})
            </h4>
          </div>
          {filteredMatched.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {filteredMatched.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs font-medium flex items-center space-x-1.5 shadow-sm hover:border-emerald-400 transition-colors"
                >
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic p-2">No matched skills found in filter.</p>
          )}
        </div>
      )}

      {/* Missing Skills Grid */}
      {(filter === 'all' || filter === 'missing') && (
        <div className="pt-2">
          <div className="flex items-center space-x-1.5 mb-2">
            <XCircle className="w-4 h-4 text-[#EC6A9E]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8BBD0]">
              Missing Skills / Skill Gaps ({filteredMissing.length})
            </h4>
          </div>
          {filteredMissing.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {filteredMissing.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#EC6A9E]/10 border border-[#EC6A9E]/30 text-[#F8BBD0] text-xs font-medium flex items-center space-x-1.5 shadow-sm hover:border-[#EC6A9E]/60 transition-colors"
                >
                  <XCircle className="w-3 h-3 text-[#EC6A9E]" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-400 italic p-2">No missing skills! Excellent match coverage.</p>
          )}
        </div>
      )}
    </div>
  );
};
