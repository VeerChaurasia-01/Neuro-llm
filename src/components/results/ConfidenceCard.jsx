import React from 'react';
import { Info, Sparkles } from 'lucide-react';

export default function ConfidenceCard({ result }) {
  const confidence = result?.confidence || 92.4;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Model Confidence
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-burgundy-800 dark:text-rose-400 bg-burgundy-50 dark:bg-burgundy-950/60 px-2 py-0.5 rounded-md">
            <Sparkles className="w-3 h-3" />
            <span>LoRA Adapted</span>
          </span>
        </div>

        {/* Confidence Percentage & Gauge */}
        <div className="flex items-center justify-between my-2">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {confidence}%
            </div>
            <div className="text-xs font-semibold text-burgundy-800 dark:text-rose-400 mt-1">
              Demo confidence score
            </div>
          </div>

          {/* Radial visual indicator */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {/* Background track */}
              <path
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Progress stroke */}
              <path
                className="text-burgundy-800 dark:text-rose-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${confidence}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-800 dark:text-slate-200">
              {Math.round(confidence)}%
            </div>
          </div>
        </div>

        {/* Linear progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span>Posterior Probability</span>
            <span>{confidence >= 90 ? 'High Agreement' : 'Moderate Agreement'}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-burgundy-800 dark:bg-rose-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Demo score only; not clinically calibrated or validated.</span>
      </div>
    </div>
  );
}
