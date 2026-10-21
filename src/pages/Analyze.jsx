import React from 'react';
import EEGUpload from '../components/analyze/EEGUpload';
import ClinicalForm from '../components/analyze/ClinicalForm';
import AnalyzeButton from '../components/analyze/AnalyzeButton';
import LoadingOverlay from '../components/analyze/LoadingOverlay';
import ResultsDashboard from '../components/results/ResultsDashboard';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/useAuth';
import { 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  Info, 
  RotateCcw, 
  FileText, 
  UserCheck, 
  LogIn 
} from 'lucide-react';

export default function AnalyzePage() {
  const { loadSampleData, clearForm, eegImage, clinicalData } = useAnalysis();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const hasContent = Boolean(
    eegImage || 
    clinicalData.patientHistory || 
    clinicalData.symptoms || 
    clinicalData.medicationInfo
  );

  return (
    <div className="w-full py-6 sm:py-10">
      
      {/* Top Banner & Header */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 mb-6">
        
        {/* Evaluator Status Banner */}
        <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isAuthenticated 
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                : 'bg-burgundy-50 dark:bg-burgundy-950/60 text-burgundy-800 dark:text-rose-400 border border-burgundy-200/60 dark:border-burgundy-900/60'
            }`}>
              {isAuthenticated ? <UserCheck className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{isAuthenticated ? user.name : 'Unauthenticated Evaluation Session'}</span>
                {isAuthenticated && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {user.role}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {isAuthenticated 
                  ? `${user.institution} • License: ${user.license || 'VERIFIED'}`
                  : 'Evaluations will be saved as Guest Researcher. Sign in to stamp evaluations with your clinical ID.'
                }
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-burgundy-800 dark:text-rose-300 bg-burgundy-50 hover:bg-burgundy-100 dark:bg-burgundy-950/70 dark:hover:bg-burgundy-900/70 border border-burgundy-200 dark:border-burgundy-800 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Demo</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Session Verified</span>
              </span>
            )}
          </div>
        </div>

        {/* Title & Quick Actions Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-50 dark:bg-burgundy-950/70 border border-burgundy-100 dark:border-burgundy-900/60 text-burgundy-800 dark:text-rose-300 text-xs font-semibold mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Multimodal Diagnostic Evaluation Tool</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              EEG Spectrogram & Clinical Semiology Analyzer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Provide an electroencephalogram time-frequency spectrogram and patient clinical semiology notes. The multimodal foundation framework cross-aligns continuous waveforms with clinical context.
            </p>
          </div>

          {/* Action pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={loadSampleData}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl text-burgundy-800 dark:text-rose-300 bg-burgundy-50 hover:bg-burgundy-100 dark:bg-burgundy-950/60 dark:hover:bg-burgundy-900/60 border border-burgundy-200/70 dark:border-burgundy-800/70 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Load Verified Sample Case</span>
            </button>

            {hasContent && (
              <button
                type="button"
                onClick={clearForm}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset Fields</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Main Analysis Cards Section */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 mt-4">
        
        {/* Two main cards arranged side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: EEG Spectrogram Upload Card (Left) */}
          <EEGUpload />

          {/* Card 2: Clinical Information Card (Right) */}
          <ClinicalForm />
        </div>

        {/* Centered Burgundy Analyze Button */}
        <AnalyzeButton />

      </div>

      {/* Results Dashboard rendered below form when analysis is complete */}
      <ResultsDashboard />

      {/* Simulated pipeline loading overlay */}
      <LoadingOverlay />

      {/* Instructions / Medical Reference Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 mt-12">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3.5 text-xs text-slate-600 dark:text-slate-400">
          <Info className="w-5 h-5 text-burgundy-800 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Clinical Evaluation Protocol: </span>
            For optimal sensitivity, upload 2D spectrogram representations (STFT or CWT) covering at least 10–30 seconds of scalp recordings. Include patient age, known focal or generalized epilepsy history, semiology during episode (e.g., staring, automatisms, motor clonic jerks), and current anti-seizure medication (ASM) regimen to maximize cross-attention alignment fidelity.
          </div>
        </div>
      </div>

    </div>
  );
}
