import React from 'react';
import { Brain, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { useAuth } from '../../context/useAuth';

export default function Footer() {
  const { setActiveTab } = useAnalysis();
  const { isAuthenticated, user, openAuthModal } = useAuth();

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors w-full">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 py-10">
        
        {/* Research Disclaimer Banner */}
        <div className="mb-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/50 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 mt-0.5 shrink-0" />
          <div className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
            <span className="font-semibold block sm:inline">Research Prototype Disclaimer: </span>
            This prototype demonstrates the proposed research workflow. It does not provide medical diagnosis or validated seizure predictions. All clinical decisions require qualified medical professionals.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Overview */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-burgundy-50 dark:bg-burgundy-950/70 flex items-center justify-center text-burgundy-800 dark:text-rose-400">
                <Brain className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                Neuro LLM — Epileptic Seizure Detection
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              A Multimodal Neuro LLM Framework for Epileptic Seizure Detection Using EEG Images and Clinical Information. Synthesizing visual time-frequency spectrogram features with patient clinical narratives via cross-attention alignment.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 dark:text-slate-500">
              Academic Demonstration Prototype • Built with React & Tailwind CSS
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Prototype Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-600 dark:text-slate-400 hover:text-burgundy-800 dark:hover:text-rose-400 transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('analyze'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-600 dark:text-slate-400 hover:text-burgundy-800 dark:hover:text-rose-400 transition-colors"
                >
                  Analyze Spectrogram
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('history'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-600 dark:text-slate-400 hover:text-burgundy-800 dark:hover:text-rose-400 transition-colors"
                >
                  Session History
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-600 dark:text-slate-400 hover:text-burgundy-800 dark:hover:text-rose-400 transition-colors"
                >
                  Architecture & Pipeline
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openAuthModal('signin')}
                  className="text-slate-600 dark:text-slate-400 hover:text-burgundy-800 dark:hover:text-rose-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{isAuthenticated ? `Evaluator: ${user.name}` : 'Clinical Evaluator Portal'}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-burgundy-50 dark:bg-burgundy-950/60 text-burgundy-800 dark:text-rose-300 rounded font-semibold border border-burgundy-200/60 dark:border-burgundy-900/50">
                    {isAuthenticated ? 'Active' : 'Login'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Framework Pipeline */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Architecture Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy-600" />
                Vision Transformer (ViT)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy-600" />
                ClinicalBERT Text Encoder
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy-600" />
                Multi-Head Cross-Attention
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy-600" />
                LoRA-Adapted Neuro LLM
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <div>
            &copy; 2026 Multimodal Neuro LLM Research Prototype.
          </div>
          <div className="flex items-center gap-4">
            <span>Evaluation Benchmarks: TUSZ / CHB-MIT</span>
            <span>•</span>
            <span>Client-Side Simulated Inference</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
