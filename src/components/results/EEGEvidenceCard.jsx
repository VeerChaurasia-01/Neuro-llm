import React from 'react';
import { Activity, Info, BarChart2 } from 'lucide-react';

export default function EEGEvidenceCard({ result }) {
  const details = result?.modalityDetails || {};

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            EEG Spectral Evidence
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Time-Frequency Representation
          </span>
        </div>

        {/* Spectrogram image preview */}
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-black/5 dark:bg-black/30 p-2 mb-3">
          <img
            src={result?.imageUrl || '/sample-spectrogram.png'}
            alt="Analyzed EEG Spectrogram"
            className="w-full max-h-[160px] object-contain rounded-lg"
          />
        </div>

        {/* Spectrogram meta tag */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3 px-1">
          <span className="font-medium truncate max-w-[200px]">{result?.imageName}</span>
          <span className="font-mono">{result?.imageDimensions}</span>
        </div>

        {/* Spectral energy band breakdown bar */}
        {details.deltaThetaRatio !== undefined && (
          <div className="mb-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-center text-[11px] mb-1.5 font-medium text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <BarChart2 className="w-3.5 h-3.5 text-burgundy-700 dark:text-rose-400" />
                <span>Extracted Spectral Bands:</span>
              </span>
              <span>Delta/Theta: {details.deltaThetaRatio}% | Alpha/Beta: {details.alphaBetaRatio}%</span>
            </div>
            <div className="w-full h-2 rounded-full flex overflow-hidden bg-slate-200 dark:bg-slate-700">
              <div 
                className="bg-burgundy-700 dark:bg-rose-500 transition-all" 
                style={{ width: `${details.deltaThetaRatio || 50}%` }}
                title={`Delta/Theta (<8Hz): ${details.deltaThetaRatio}%`}
              />
              <div 
                className="bg-amber-500 transition-all" 
                style={{ width: `${details.alphaBetaRatio || 35}%` }}
                title={`Alpha/Beta (8-30Hz): ${details.alphaBetaRatio}%`}
              />
              <div 
                className="bg-cyan-500 transition-all" 
                style={{ width: `${details.gammaRatio || 15}%` }}
                title={`Gamma (>30Hz): ${details.gammaRatio}%`}
              />
            </div>
          </div>
        )}

        {/* Placeholder description of how spectral patterns could be reviewed */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-burgundy-700 dark:text-rose-400" />
            <span>Spectral Feature Analysis (ViT Encodings)</span>
          </p>
          <p>
            {result?.spectralEvidence || 
              'Time-frequency energy distributions evaluated across standard frequency bands (delta, theta, alpha, beta, gamma). Model inspects paroxysmal spectral surges and sustained synchronization across temporal bins.'}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Time-frequency spectral density extraction via Vision Transformer encoder.</span>
      </div>
    </div>
  );
}
