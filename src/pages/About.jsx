import React from 'react';
import ResearchPipeline from '../components/about/ResearchPipeline';
import { BookOpen, ShieldAlert, Target, Award, Layers } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12 w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 space-y-10">
      
      {/* Header section */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-50 dark:bg-burgundy-950/70 border border-burgundy-100 dark:border-burgundy-900/60 text-burgundy-800 dark:text-rose-300 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Research Framework & Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          A Multimodal Neuro LLM Framework for Epileptic Seizure Detection Using EEG Images and Clinical Information
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 max-w-4xl leading-relaxed">
          Bridging the semantic gap between continuous physiological electroencephalogram (EEG) recordings and clinical unstructured EHR semiology through multimodal foundation models and cross-attention alignment.
        </p>
      </div>

      {/* Prominent Research Disclaimer matching Section 11 */}
      <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3.5 shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 mt-0.5 shrink-0" />
        <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
          <span className="font-bold">Medical Research Disclaimer: </span>
          This prototype demonstrates the proposed research workflow. It does not provide medical diagnosis or validated seizure predictions. All clinical decisions require qualified medical professionals.
        </div>
      </div>

      {/* 7-Stage Pipeline Component */}
      <ResearchPipeline />

      {/* Conceptual Background & Motivation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Core Research Problem */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card p-6">
          <div className="w-10 h-10 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/60 text-burgundy-800 dark:text-rose-400 flex items-center justify-center mb-4">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            The Unimodal EEG Limitation
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Standard automated seizure detection models rely solely on raw 1D voltage traces or spectrograms. In real-world clinical practice, scalp EEG signals are frequently contaminated by muscle twitches, electrode pop artifacts, and ocular movements that mimic ictal rhythms. Without clinical semiology, patient history, and medication context, false alarm rates remain high.
          </p>
        </div>

        {/* Card 2: Multimodal Neuro LLM Solution */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card p-6">
          <div className="w-10 h-10 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/60 text-burgundy-800 dark:text-rose-400 flex items-center justify-center mb-4">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Multimodal Cross-Attention Alignment
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            By mapping 2D spectrogram patches through a Vision Transformer and patient clinical records through a ClinicalBERT language model, our framework fuses visual and textual tokens using multi-head cross-attention. A parameter-efficient LoRA-adapted Neuro LLM synthesizes both modalities into explainable, calibrated predictions.
          </p>
        </div>

      </div>

      {/* Evaluation Protocols & Benchmark Datasets */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Validation Protocol & Target Benchmarks
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Methodology for patient-independent performance verification
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
              Benchmark Corpora
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              TUSZ (Temple University Hospital EEG Seizure Corpus) & CHB-MIT Pediatric Scalp EEG database with standard 10–20 montage channels.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
              Patient-Split Validation
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Strict subject-independent K-fold splits ensuring zero subject overlap between training, validation, and holdout test partitions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
              Clinical Evaluation Metrics
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Precision, Recall (Sensitivity), F1-Score, Expected Calibration Error (ECE), and clinical rationale consistency scoring.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>Source: Academic Research Paper Specification</span>
          <span className="font-semibold text-burgundy-800 dark:text-rose-400">Frontend Prototype Demonstration Only</span>
        </div>
      </div>

    </div>
  );
}
