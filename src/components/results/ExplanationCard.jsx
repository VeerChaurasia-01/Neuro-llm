import React from 'react';
import { Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

export default function ExplanationCard({ result }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Clinical Explanation
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
            <Sparkles className="w-3 h-3" />
            <span>Interpretable Output</span>
          </span>
        </div>

        {/* Title matching requirement: Interpretation Summary */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-burgundy-800 dark:text-rose-400" />
          <span>Interpretation Summary</span>
        </h3>

        {/* Narrative Box */}
        <div className="p-4 rounded-xl bg-burgundy-50/50 dark:bg-burgundy-950/30 border border-burgundy-100/70 dark:border-burgundy-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {result?.interpretation || (
            'The multimodal framework correlated temporal bursts in low-frequency spectrogram bands with the documented clinical semiology. The presence of recurrent unresponsive episodes and active anticonvulsant therapy provides high mutual information gain, assisting the classification layer in distinguishing epileptiform discharges from non-pathological background artifacts.'
          )}
        </div>

        {/* Clinical Summary Tags */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block mb-0.5">
              Clinical Context Factor:
            </span>
            <span className="text-slate-700 dark:text-slate-300 font-medium truncate block">
              {result?.symptoms ? 'Semiology documented' : 'Semiology unspecified'}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block mb-0.5">
              Pharmacological Status:
            </span>
            <span className="text-slate-700 dark:text-slate-300 font-medium truncate block">
              {result?.medicationInfo ? 'Anticonvulsant recorded' : 'No medication noted'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Mock illustrative summary; requires qualified neurologist review.</span>
      </div>
    </div>
  );
}
