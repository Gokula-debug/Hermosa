import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Trash2, FileUp, Edit3 } from 'lucide-react';
import { uploadResumePdf } from '../services/api';

interface ResumeUploadProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  filename: string;
  setFilename: (name: string) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  resumeText,
  setResumeText,
  filename,
  setFilename,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setUploadError('Please select a valid PDF file (.pdf format only).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setFilename(file.name);

    try {
      const response = await uploadResumePdf(file);
      setResumeText(response.extractedText);
      setIsUploading(false);
    } catch (err: any) {
      console.error('File parsing error:', err);
      setUploadError(err.message || 'Failed to extract text from PDF.');
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    setResumeText('');
    setFilename('');
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-zinc-800 bg-[#111113]/90 relative overflow-hidden">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-[#F8BBD0]/10 text-[#F8BBD0]">
            <FileUp className="w-5 h-5 text-[#EC6A9E]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">1. Candidate Resume (PDF)</h3>
            <p className="text-xs text-zinc-400">Upload PDF or paste candidate resume text</p>
          </div>
        </div>

        {/* Input Mode Toggle */}
        <div className="flex items-center bg-black/60 p-1 rounded-lg border border-zinc-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1 rounded-md transition-colors flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'upload' ? 'bg-[#EC6A9E] text-white font-medium' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>PDF Upload</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`px-3 py-1 rounded-md transition-colors flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'text' ? 'bg-[#EC6A9E] text-white font-medium' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Paste Text</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Drag and Drop PDF Uploader */}
      {activeTab === 'upload' && (
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files && e.target.files[0] && handleFileChange(e.target.files[0])}
          />

          {!resumeText && !isUploading ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? 'border-[#EC6A9E] bg-[#EC6A9E]/10 scale-[1.01]'
                  : 'border-zinc-800 hover:border-[#F8BBD0]/40 bg-black/40 hover:bg-black/60'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#F8BBD0]/10 flex items-center justify-center mx-auto mb-3 text-[#F8BBD0]">
                <Upload className="w-6 h-6 text-[#EC6A9E]" />
              </div>
              <p className="text-sm font-medium text-white mb-1">
                Click to upload or drag & drop Resume PDF
              </p>
              <p className="text-xs text-zinc-500">
                PDF files up to 10MB accepted
              </p>
            </div>
          ) : isUploading ? (
            <div className="p-8 border border-zinc-800 rounded-xl bg-black/40 text-center animate-pulse">
              <div className="w-8 h-8 border-2 border-[#EC6A9E] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-[#F8BBD0]">Extracting PDF text with pdf-parse...</p>
              <p className="text-xs text-zinc-500 mt-1">Reading document structure & candidate data</p>
            </div>
          ) : (
            <div className="p-4 border border-emerald-500/30 rounded-xl bg-emerald-950/20 flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-emerald-200">
                    {filename || 'Resume PDF Parsed'}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Extracted {resumeText.length} characters ({resumeText.split(/\s+/).length} words)
                  </p>
                  <p className="text-xs text-zinc-500 italic mt-2 line-clamp-2 bg-black/50 p-2 rounded border border-zinc-800/80 font-mono">
                    "{resumeText.slice(0, 180)}..."
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                title="Remove resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {uploadError && (
            <div className="p-3 bg-red-950/40 border border-red-800/50 rounded-xl text-xs text-red-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Direct Text Area Paste */}
      {activeTab === 'text' && (
        <div>
          <textarea
            rows={8}
            value={resumeText}
            onChange={(e) => {
              setResumeText(e.target.value);
              if (!filename) setFilename('Pasted Resume');
            }}
            placeholder="Paste candidate resume plain text here (experience, skills, education, certifications)..."
            className="w-full bg-black/60 border border-zinc-800 rounded-xl p-3.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#EC6A9E] font-mono leading-relaxed resize-none"
          />
          <div className="flex items-center justify-between mt-2 text-xs text-zinc-500">
            <span>{resumeText ? `${resumeText.length} characters` : 'No text entered'}</span>
            {resumeText && (
              <button
                type="button"
                onClick={handleClear}
                className="text-red-400 hover:underline cursor-pointer"
              >
                Clear text
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
