import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

export default function ClassificationCard({ result }) {
  const isSeizure = result?.classification === 'Seizure Detected';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Multimodal Classification
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            ID: {result?.id}
          </span>
        </div>

        {/* Status Badge & Icon */}
        <div className="flex items-center gap-4 my-2">
          <div
            className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
              isSeizure
                ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-400 border border-rose-200/80 dark:border-rose-900/60'
                : 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-900/60'
            }`}
          >
            {isSeizure ? (
              <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
            ) : (
              <CheckCircle className="w-6 h-6 stroke-[2.2]" />
            )}
          </div>

          <div>
            <div
              className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                isSeizure
                  ? 'text-rose-900 dark:text-rose-300'
                  : 'text-emerald-900 dark:text-emerald-300'
              }`}
            >
              {result?.classification}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isSeizure
                ? 'Epileptiform discharge signature detected'
                : 'Physiological non-epileptic baseline observed'}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
          {isSeizure
            ? 'Cross-attention fusion aligned rhythmic high-amplitude low-frequency EEG spectral spikes with clinical semiology.'
            : 'Spectral features conform to expected physiological rhythms with no sustained ictal activity.'}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Mock classification for framework evaluation only.</span>
      </div>
    </div>
  );
}
