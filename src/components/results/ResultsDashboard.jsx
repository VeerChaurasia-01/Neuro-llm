import React from 'react';
import { RotateCcw, Trash2, History, CheckCircle2 } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import ClassificationCard from './ClassificationCard';
import ConfidenceCard from './ConfidenceCard';
import EEGEvidenceCard from './EEGEvidenceCard';
import ExplanationCard from './ExplanationCard';
import ModalitySummary from './ModalitySummary';

export default function ResultsDashboard() {
  const { currentResult, runAnalysis, clearForm, setActiveTab } = useAnalysis();

  if (!currentResult) return null;

  const handleAnalyzeAgain = () => {
    runAnalysis();
  };

  const handleClearForm = () => {
    clearForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewHistory = () => {
    setActiveTab('history');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="results-section" 
      className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800 transition-colors w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        
        {/* Banner identifying Demo / Simulated Result matching Section 8 & 9 */}
        <div className="mb-6 p-4 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/40 border border-burgundy-200/80 dark:border-burgundy-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-burgundy-800 dark:bg-rose-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-burgundy-950 dark:text-rose-200">
                Demo / Simulated Result — Multimodal Evaluation Completed
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {currentResult.evaluator ? (
                  <span>Evaluated by <strong className="text-slate-700 dark:text-slate-200">{currentResult.evaluator}</strong> ({currentResult.evaluatorRole}) • {currentResult.evaluatorInstitution}</span>
                ) : (
                  <span>Analysis generated via client-side multimodal synthesis simulation. For research preview only.</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-burgundy-200 dark:border-burgundy-800 text-burgundy-800 dark:text-rose-300">
              {currentResult.timestamp}
            </span>
          </div>
        </div>

        {/* Section Heading matching Section 9 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Seizure Analysis Results
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Multimodal Neuro LLM classification, confidence estimation, and evidence interpretability
            </p>
          </div>

          {/* Action buttons (Top quick access) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAnalyzeAgain}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-burgundy-800 text-white hover:bg-burgundy-900 transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Analyze Again</span>
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Clear Form</span>
            </button>
          </div>
        </div>

        {/* Modular Result Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Classification */}
          <ClassificationCard result={currentResult} />

          {/* Card B: Confidence */}
          <ConfidenceCard result={currentResult} />

          {/* Card C: EEG Evidence */}
          <EEGEvidenceCard result={currentResult} />

          {/* Card D: Clinical Explanation */}
          <ExplanationCard result={currentResult} />

          {/* Card E: Modality Summary & Cross Attention */}
          <ModalitySummary result={currentResult} />
        </div>

        {/* Section 9 F: Action Buttons Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Case record logged to current browser session history.
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClearForm}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-slate-500" />
              <span>Clear Form</span>
            </button>

            <button
              type="button"
              onClick={handleViewHistory}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-burgundy-800 dark:text-rose-300 bg-burgundy-50 hover:bg-burgundy-100 dark:bg-burgundy-950/60 dark:hover:bg-burgundy-900/60 border border-burgundy-200 dark:border-burgundy-800/80 transition-colors"
            >
              <History className="w-4 h-4" />
              <span>View History</span>
            </button>

            <button
              type="button"
              onClick={handleAnalyzeAgain}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-burgundy-800 hover:bg-burgundy-900 transition-colors shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Analyze Again</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
