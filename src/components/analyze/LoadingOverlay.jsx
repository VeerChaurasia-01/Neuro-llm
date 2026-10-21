import React from 'react';
import { Loader2, Eye, FileText, Cpu, Network, CheckCircle2 } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

export default function LoadingOverlay() {
  const { isAnalyzing, analysisStep } = useAnalysis();

  if (!isAnalyzing) return null;

  const steps = [
    { label: 'Vision Transformer (ViT): Extracting 2D EEG spectrogram tokens', icon: Eye },
    { label: 'ClinicalBERT: Encoding patient history and semiology tokens', icon: FileText },
    { label: 'Cross-Attention: Aligning visual-spectral & clinical tokens', icon: Network },
    { label: 'Neuro LLM: Performing multimodal inference & reasoning', icon: Cpu },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Animated header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-burgundy-50 dark:bg-burgundy-950/80 text-burgundy-800 dark:text-rose-400 flex items-center justify-center mb-3">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Analyzing EEG and clinical information...
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Executing multimodal Neuro LLM inference pipeline
          </p>
        </div>

        {/* Steps Stepper */}
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = analysisStep > idx;
            const isCurrent = analysisStep === idx;

            return (
              <div 
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-xl border text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300'
                    : isCurrent
                    ? 'border-burgundy-200 dark:border-burgundy-900 bg-burgundy-50/60 dark:bg-burgundy-950/50 text-burgundy-900 dark:text-rose-300 font-semibold shadow-xs'
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 text-slate-400 dark:text-slate-500 opacity-60'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-burgundy-700 dark:text-rose-400 animate-spin shrink-0" />
                ) : (
                  <Icon className="w-4 h-4 shrink-0" />
                )}
                <span className="truncate">{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-burgundy-800 dark:bg-rose-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, (analysisStep + 1) * 25)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 mt-2">
            <span>Simulated Research Pipeline</span>
            <span>{Math.min(100, (analysisStep + 1) * 25)}% Complete</span>
          </div>
        </div>

      </div>
    </div>
  );
}
