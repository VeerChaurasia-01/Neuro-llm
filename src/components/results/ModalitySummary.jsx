import React from 'react';
import { Layers, Image as ImageIcon, FileText, GitMerge, Check, Minus } from 'lucide-react';

export default function ModalitySummary({ result }) {
  const hasClinical = Boolean(
    result?.patientHistory || result?.symptoms || result?.medicationInfo || result?.additionalNotes
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card p-6 col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-burgundy-800 dark:text-rose-400" />
            <span>Multimodal Modality Summary & Cross-Attention Bridge</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Demonstrating visual and textual token alignment before Neuro LLM adaptation
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-burgundy-50 dark:bg-burgundy-950/70 text-burgundy-800 dark:text-rose-300 border border-burgundy-100 dark:border-burgundy-900/50">
          Cross-Attention Fusion
        </span>
      </div>

      {/* Visual Fusion Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        
        {/* Modality 1: EEG Visual Input */}
        <div className="md:col-span-4 p-4 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-burgundy-800 dark:text-rose-400 flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                EEG Image Analysis
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Vision Transformer (ViT) Encodings
              </div>
            </div>
          </div>
          
          <div className="space-y-1.5 text-xs mt-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Visual Input:</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Provided ({result?.imageDimensions || '2D STFT'})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Patch Dimension:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">16 × 16 Grid</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Tokens Generated:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">196 Spatial Tokens</span>
            </div>
          </div>
        </div>

        {/* Fusion Center Node */}
        <div className="md:col-span-3 flex flex-col items-center justify-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-burgundy-800 dark:bg-rose-600 text-white flex items-center justify-center shadow-md animate-pulse">
            <GitMerge className="w-6 h-6 rotate-90" />
          </div>
          <span className="text-[11px] font-bold text-burgundy-800 dark:text-rose-300 mt-2 text-center">
            Multi-Head Cross-Attention
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 text-center">
            Bidirectional Token Fusion
          </span>
        </div>

        {/* Modality 2: Clinical Context */}
        <div className="md:col-span-4 p-4 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-burgundy-800 dark:text-rose-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Clinical Context
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                ClinicalBERT Context Encodings
              </div>
            </div>
          </div>
          
          <div className="space-y-1.5 text-xs mt-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Clinical Data:</span>
              <span className={`font-medium flex items-center gap-1 ${
                hasClinical 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-amber-600 dark:text-amber-400'
              }`}>
                {hasClinical ? (
                  <><Check className="w-3.5 h-3.5" /> Enriched Notes</>
                ) : (
                  <><Minus className="w-3.5 h-3.5" /> Unspecified / Partial</>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Clinical Tokens:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">
                {hasClinical ? '128 Subword Tokens' : 'Default Prior'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Attention Gain:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">
                {hasClinical ? '+23.4% Alignment' : 'Baseline Unimodal'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
