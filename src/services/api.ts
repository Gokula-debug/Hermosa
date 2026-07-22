import { AnalysisReport, AnalyzePayload, UploadResponse } from '../types';

/**
 * Upload resume PDF file to server for text extraction
 */
export async function uploadResumePdf(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Upload failed with status ${response.status}`);
  }

  return await response.json();
}

/**
 * Send extracted resume text & job description to server for Gemini AI Analysis
 */
export async function analyzeResume(payload: AnalyzePayload): Promise<AnalysisReport> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Analysis failed with status ${response.status}`);
  }

  return await response.json();
}
