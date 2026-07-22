import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { LoadingScreen } from './components/LoadingScreen';
import { AnalysisReport } from './types';
import { analyzeResume } from './services/api';
import { SAMPLE_PRESETS } from './data/samples';

export default function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [filename, setFilename] = useState('');
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStartAnalysis = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const result = await analyzeResume({
        resumeText,
        jobDescription,
        filename: filename || 'Candidate Resume.pdf',
      });

      setReport(result);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Analysis execution error:', err);
      setErrorMsg(err.message || 'Failed to complete resume analysis. Please try again.');
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setErrorMsg(null);
  };

  const handleLoadDefaultSample = () => {
    const defaultSample = SAMPLE_PRESETS[0];
    setResumeText(defaultSample.resumeText);
    setJobDescription(defaultSample.jobDescription);
    setFilename(`${defaultSample.role} - Sample Resume.pdf`);
  };

  return (
    <div className="min-h-screen bg-black text-[#f3f4f6] flex flex-col justify-between selection:bg-[#EC6A9E] selection:text-white">
      {/* Top Sticky Header */}
      <Navbar
        onReset={handleReset}
        onOpenSamples={handleLoadDefaultSample}
        isDashboard={!!report}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {isLoading ? (
          <LoadingScreen />
        ) : report ? (
          <Dashboard report={report} onReset={handleReset} />
        ) : (
          <Home
            resumeText={resumeText}
            setResumeText={setResumeText}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            filename={filename}
            setFilename={setFilename}
            onStartAnalysis={handleStartAnalysis}
          />
        )}

        {/* Global Error Alert Banner */}
        {errorMsg && !isLoading && (
          <div className="max-w-xl mx-auto my-6 p-4 rounded-xl bg-red-950/80 border border-red-700 text-red-200 text-xs text-center flex items-center justify-between gap-2 shadow-lg">
            <span>{errorMsg}</span>
            <button
              onClick={() => setErrorMsg(null)}
              className="px-2 py-1 rounded bg-red-900 hover:bg-red-800 text-white font-bold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
