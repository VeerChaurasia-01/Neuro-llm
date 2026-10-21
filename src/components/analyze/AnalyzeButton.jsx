import React from 'react';
import { Brain, Loader2 } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

export default function AnalyzeButton() {
  const { runAnalysis, isAnalyzing, eegImage } = useAnalysis();

  return (
    <div className="w-full flex flex-col items-center justify-center my-8">
      {/* Centered Burgundy Analyze Button matching screenshot */}
      <button
        type="button"
        onClick={runAnalysis}
        disabled={isAnalyzing}
        className={`relative group inline-flex items-center justify-center gap-3 px-10 py-3.5 rounded-xl font-semibold text-base text-white transition-all duration-200 shadow-md ${
          isAnalyzing
            ? 'bg-burgundy-900/80 cursor-wait opacity-90'
            : 'bg-burgundy-800 hover:bg-burgundy-900 active:bg-burgundy-950 hover:shadow-lg hover:-translate-y-0.5'
        } min-w-[280px] sm:min-w-[340px]`}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing EEG and clinical information...</span>
          </>
        ) : (
          <>
            <div className="p-1 rounded-md bg-white/10 group-hover:bg-white/20 transition-colors">
              <Brain className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span>Analyze for Seizure</span>
          </>
        )}
      </button>

      {/* Validation prompt reminder if no image */}
      {!eegImage && !isAnalyzing && (
        <span className="text-xs text-slate-400 dark:text-slate-500 mt-2.5">
          * EEG Spectrogram image required before analysis
        </span>
      )}
    </div>
  );
}
