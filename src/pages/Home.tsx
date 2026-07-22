import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { ResumeUpload } from '../components/ResumeUpload';
import { JobDescription } from '../components/JobDescription';
import { SAMPLE_PRESETS } from '../data/samples';
import { Sparkles, ArrowRight, Zap, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface HomeProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  jobDescription: string;
  setJobDescription: (text: string) => void;
  filename: string;
  setFilename: (name: string) => void;
  onStartAnalysis: () => void;
}

export const Home: React.FC<HomeProps> = ({
  resumeText,
  setResumeText,
  jobDescription,
  setJobDescription,
  filename,
  setFilename,
  onStartAnalysis,
}) => {
  const [showSamplesModal, setShowSamplesModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleApplyPreset = (presetId: string) => {
    const preset = SAMPLE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setResumeText(preset.resumeText);
      setJobDescription(preset.jobDescription);
      setFilename(`${preset.role} - Sample Resume.pdf`);
      setFormError(null);
      setShowSamplesModal(false);
    }
  };

  const handleAnalyzeClick = () => {
    if (!resumeText || !resumeText.trim()) {
      setFormError('Please upload a candidate Resume PDF or paste resume text before analyzing.');
      return;
    }

    if (!jobDescription || !jobDescription.trim()) {
      setFormError('Please enter a target Job Description to compare the candidate against.');
      return;
    }

    setFormError(null);
    onStartAnalysis();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <Hero />

      {/* Main Input Form Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Sample Profile Banner Prompt */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#111113] via-[#1a1118] to-[#111113] border border-[#F8BBD0]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#EC6A9E]/20 text-[#F8BBD0] shrink-0">
              <Zap className="w-5 h-5 text-[#EC6A9E]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Want a 1-click test drive?</h4>
              <p className="text-xs text-zinc-400">
                Load a pre-configured sample resume & job description (Full Stack, AI Specialist, or Junior Dev).
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => handleApplyPreset('fullstack-dev')}
              className="px-3 py-1.5 rounded-lg bg-[#EC6A9E]/20 hover:bg-[#EC6A9E]/30 text-[#F8BBD0] border border-[#EC6A9E]/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              Load Full Stack Sample
            </button>
            <button
              onClick={() => setShowSamplesModal(true)}
              className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs transition-colors cursor-pointer"
            >
              View All Samples
            </button>
          </div>
        </div>

        {/* 2-Column Grid Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeUpload
            resumeText={resumeText}
            setResumeText={setResumeText}
            filename={filename}
            setFilename={setFilename}
          />

          <JobDescription
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            onSelectRolePreset={handleApplyPreset}
          />
        </div>

        {/* Validation Error Banner */}
        {formError && (
          <div className="mt-4 p-4 bg-red-950/50 border border-red-800/60 rounded-2xl text-xs text-red-200 flex items-center space-x-2.5">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Analyze Call-To-Action Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleAnalyzeClick}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#EC6A9E] to-[#d9588b] text-white font-bold text-base shadow-xl shadow-[#EC6A9E]/25 hover:shadow-[#EC6A9E]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer pink-glow-box"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span>ANALYZE RESUME WITH AI</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-zinc-500 mt-2 font-mono">
            Analyzed securely using Gemini 2.5 Flash • No permanent data stored
          </p>
        </div>
      </div>

      {/* Samples Modal */}
      {showSamplesModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full p-6 rounded-2xl bg-[#111113] border border-[#F8BBD0]/30 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Zap className="w-5 h-5 text-[#EC6A9E]" />
                <span>Select a Sample Candidate Profile</span>
              </h3>
              <button
                onClick={() => setShowSamplesModal(false)}
                className="text-zinc-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {SAMPLE_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="p-4 rounded-xl bg-black/60 border border-zinc-800 hover:border-[#EC6A9E]/50 transition-all text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{preset.title}</h4>
                    <p className="text-xs text-[#F8BBD0] mb-2">{preset.role}</p>
                    <p className="text-xs text-zinc-400 line-clamp-2">{preset.jobDescription.slice(0, 150)}...</p>
                  </div>
                  <button
                    onClick={() => handleApplyPreset(preset.id)}
                    className="px-4 py-2 rounded-xl bg-[#EC6A9E] hover:bg-[#d9588b] text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
                  >
                    Load Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
