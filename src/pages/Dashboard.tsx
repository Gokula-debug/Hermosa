import React, { useState } from 'react';
import { AnalysisReport } from '../types';
import { DashboardCard } from '../components/DashboardCard';
import { CircularScore } from '../components/CircularScore';
import { SkillTable } from '../components/SkillTable';
import { CertificateCard } from '../components/CertificateCard';
import { ExperienceCard } from '../components/ExperienceCard';
import { AcademicCard } from '../components/AcademicCard';
import { FraudCard } from '../components/FraudCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { SuggestionsCard } from '../components/SuggestionsCard';
import {
  Award,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Brain,
  Lightbulb,
  Download,
  Share2,
  RefreshCw,
  FileText,
  Target,
  CheckCircle2,
  Sparkles,
  Printer,
} from 'lucide-react';

interface DashboardProps {
  report: AnalysisReport;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ report, onReset }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'scores' | 'skills' | 'verification' | 'decision'>('all');

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Hermosa_Audit_${report.filename || 'Report'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header Executive Banner */}
      <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-[#111113] via-[#1a1118] to-[#111113] border border-[#F8BBD0]/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#F8BBD0] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#EC6A9E]" />
              <span>Hermosa AI Executive Audit Report</span>
              <span>•</span>
              <span>{new Date(report.analyzedAt || Date.now()).toLocaleDateString()}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
              <span>{report.filename || 'Candidate Resume'}</span>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-bold font-sans uppercase border ${
                  report.jobFit === 'Excellent'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                    : report.jobFit === 'Good'
                    ? 'bg-blue-950/60 border-blue-500/40 text-blue-400'
                    : 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                }`}
              >
                Fit: {report.jobFit}
              </span>
            </h1>

            <p className="text-xs text-zinc-400 mt-1">
              Job Match: <strong className="text-zinc-200">{report.jobTitle}</strong> • Analyzed against full job requirements
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadJson}
              className="px-3.5 py-2 rounded-xl bg-black/60 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#F8BBD0]" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-black/60 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#F8BBD0]" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onReset}
              className="px-4 py-2 rounded-xl bg-[#EC6A9E] hover:bg-[#d9588b] text-white text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-md shadow-[#EC6A9E]/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-zinc-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#EC6A9E] text-white shadow'
              : 'text-zinc-400 hover:text-white bg-[#111113]'
          }`}
        >
          All 10 Audit Modules
        </button>
        <button
          onClick={() => setActiveTab('scores')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'scores'
              ? 'bg-[#EC6A9E] text-white shadow'
              : 'text-zinc-400 hover:text-white bg-[#111113]'
          }`}
        >
          Scores & ATS
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'skills'
              ? 'bg-[#EC6A9E] text-white shadow'
              : 'text-zinc-400 hover:text-white bg-[#111113]'
          }`}
        >
          Skills & Experience
        </button>
        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'verification'
              ? 'bg-[#EC6A9E] text-white shadow'
              : 'text-zinc-400 hover:text-white bg-[#111113]'
          }`}
        >
          Academics & Fraud Risk
        </button>
        <button
          onClick={() => setActiveTab('decision')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'decision'
              ? 'bg-[#EC6A9E] text-white shadow'
              : 'text-zinc-400 hover:text-white bg-[#111113]'
          }`}
        >
          Hiring Decision & Tips
        </button>
      </div>

      {/* DASHBOARD MODULES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Module 1: Resume Match Score */}
        {(activeTab === 'all' || activeTab === 'scores') && (
          <DashboardCard
            title="1. Resume Match Score"
            subtitle="Overall qualification alignment"
            icon={<Target className="w-5 h-5 text-[#EC6A9E]" />}
          >
            <CircularScore
              score={report.resumeScore}
              title="Overall Match"
              subtitle={`Job Fit Rating: ${report.jobFit}`}
              colorTheme={report.resumeScore >= 75 ? 'pink' : report.resumeScore >= 50 ? 'amber' : 'pink'}
            />
          </DashboardCard>
        )}

        {/* Module 2: ATS Compatibility */}
        {(activeTab === 'all' || activeTab === 'scores') && (
          <DashboardCard
            title="2. ATS Compatibility"
            subtitle="Keyword parser pass probability"
            icon={<FileText className="w-5 h-5 text-[#F8BBD0]" />}
          >
            <CircularScore
              score={report.atsCompatibility}
              title="ATS Keyword Pass"
              subtitle="Optimized for Enterprise ATS"
              colorTheme={report.atsCompatibility >= 75 ? 'green' : 'amber'}
            />
          </DashboardCard>
        )}

        {/* Module 3: AI Content Detection */}
        {(activeTab === 'all' || activeTab === 'scores') && (
          <DashboardCard
            title="3. AI Content Detection"
            subtitle="Stylistic & authorship probability"
            icon={<Brain className="w-5 h-5 text-[#EC6A9E]" />}
          >
            <div className="space-y-4 pt-1">
              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 text-center">
                <span className="text-3xl font-extrabold font-mono text-[#F8BBD0]">
                  {report.aiDetection.probability}%
                </span>
                <p className="text-xs text-zinc-400 mt-1 font-semibold">
                  AI Probability
                </p>

                <div className="mt-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                      report.aiDetection.probability <= 30
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                        : report.aiDetection.probability <= 60
                        ? 'bg-amber-950/40 border-amber-500/30 text-amber-400'
                        : 'bg-rose-950/40 border-rose-500/30 text-rose-400'
                    }`}
                  >
                    {report.aiDetection.assessment}
                  </span>
                </div>
              </div>

              {report.aiDetection.insights && (
                <p className="text-xs text-zinc-400 p-3 rounded-xl bg-black/40 border border-zinc-800/80 leading-relaxed">
                  {report.aiDetection.insights}
                </p>
              )}
            </div>
          </DashboardCard>
        )}

        {/* Module 4: Experience Analysis */}
        {(activeTab === 'all' || activeTab === 'skills') && (
          <DashboardCard
            title="4. Experience Analysis"
            subtitle="Tenure & domain depth evaluation"
            icon={<Briefcase className="w-5 h-5 text-[#F8BBD0]" />}
          >
            <ExperienceCard data={report.experience} />
          </DashboardCard>
        )}

        {/* Module 5: Skills Match (Spans 2 cols on lg) */}
        {(activeTab === 'all' || activeTab === 'skills') && (
          <DashboardCard
            title="5. Skills Match Audit"
            subtitle="Matched vs missing technical proficiencies"
            icon={<Sparkles className="w-5 h-5 text-[#EC6A9E]" />}
            className="lg:col-span-2"
          >
            <SkillTable
              matchedSkills={report.skillsMatched}
              missingSkills={report.missingSkills}
            />
          </DashboardCard>
        )}

        {/* Module 6: Certificate Analysis */}
        {(activeTab === 'all' || activeTab === 'verification') && (
          <DashboardCard
            title="6. Certificate Analysis"
            subtitle="Relevance & credential validity"
            icon={<Award className="w-5 h-5 text-[#F8BBD0]" />}
          >
            <CertificateCard data={report.certificates} />
          </DashboardCard>
        )}

        {/* Module 7: Academic Verification */}
        {(activeTab === 'all' || activeTab === 'verification') && (
          <DashboardCard
            title="7. Academic Verification"
            subtitle="Degree, university & grade scale check"
            icon={<GraduationCap className="w-5 h-5 text-[#EC6A9E]" />}
          >
            <AcademicCard data={report.academicVerification} />
          </DashboardCard>
        )}

        {/* Module 8: Fraud & Discrepancy Detection */}
        {(activeTab === 'all' || activeTab === 'verification') && (
          <DashboardCard
            title="8. Fraud & Risk Detection"
            subtitle="Timeline integrity & entity checks"
            icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          >
            <FraudCard data={report.fraudDetection} />
          </DashboardCard>
        )}

        {/* Module 9: Hiring Recommendation (Spans 2 cols on lg) */}
        {(activeTab === 'all' || activeTab === 'decision') && (
          <DashboardCard
            title="9. Hiring Recommendation"
            subtitle="Executive recruiter final verdict"
            icon={<CheckCircle2 className="w-5 h-5 text-[#EC6A9E]" />}
            className="lg:col-span-2"
          >
            <RecommendationCard data={report.recommendation} />
          </DashboardCard>
        )}

        {/* Module 10: Improvement Suggestions */}
        {(activeTab === 'all' || activeTab === 'decision') && (
          <DashboardCard
            title="10. Actionable Improvements"
            subtitle="Recommendations to increase score"
            icon={<Lightbulb className="w-5 h-5 text-[#F8BBD0]" />}
          >
            <SuggestionsCard suggestions={report.suggestions} />
          </DashboardCard>
        )}
      </div>
    </div>
  );
};
