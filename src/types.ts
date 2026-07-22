/**
 * Hermosa AI Resume Intelligence System - Type Definitions
 */

export interface SkillItem {
  name: string;
  category?: 'Technical' | 'Soft' | 'Domain' | 'Tool';
  importance?: 'Required' | 'Preferred' | 'Nice-to-have';
}

export interface CertificateItem {
  name: string;
  status: 'Relevant' | 'Irrelevant';
  issuer?: string;
}

export interface ExperienceData {
  required: string;
  candidate: string;
  status: 'Qualified' | 'Not Qualified' | 'Partially Qualified';
  details?: string;
}

export interface CertificatesData {
  count: number;
  relevant: number;
  irrelevant: number;
  items?: CertificateItem[];
}

export interface AcademicVerificationData {
  degree: string;
  university: string;
  cgpa: string;
  graduationYear: string;
  status: 'Verified' | 'Unverified' | 'Discrepancy Detected';
  notes?: string;
}

export interface AiDetectionData {
  probability: number; // 0-100%
  assessment: 'Likely Human' | 'Mixed AI & Human' | 'Highly AI Generated';
  insights?: string;
}

export interface FraudFlag {
  type: string;
  status: 'Pass' | 'Warning' | 'Fail';
  message: string;
}

export interface FraudDetectionData {
  risk: 'Low' | 'Medium' | 'High';
  reasons: string[];
  flags?: FraudFlag[];
}

export interface RecommendationData {
  decision: 'Hire' | 'Maybe' | 'Reject';
  confidence: number; // 0-100%
  summary: string;
}

export interface AnalysisReport {
  resumeScore: number; // 0-100
  atsCompatibility: number; // 0-100
  jobFit: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
  skillsMatched: string[];
  missingSkills: string[];
  experience: ExperienceData;
  certificates: CertificatesData;
  academicVerification: AcademicVerificationData;
  aiDetection: AiDetectionData;
  fraudDetection: FraudDetectionData;
  recommendation: RecommendationData;
  suggestions: string[];
  analyzedAt?: string;
  filename?: string;
  jobTitle?: string;
}

export interface SamplePreset {
  id: string;
  title: string;
  role: string;
  jobDescription: string;
  resumeText: string;
  sampleReport?: Partial<AnalysisReport>;
}

export interface AnalyzePayload {
  resumeText: string;
  jobDescription: string;
  filename?: string;
}

export interface UploadResponse {
  success: boolean;
  filename: string;
  extractedText: string;
  charCount: number;
  wordCount: number;
  message?: string;
}
