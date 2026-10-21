import React from 'react';
import { Sparkles, Activity } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

export default function Hero() {
  const { loadSampleData } = useAnalysis();

  return (
    <section className="relative overflow-hidden pt-8 pb-10 md:pt-12 md:pb-14 transition-colors w-full">
      
      {/* Background soft ambient radial gradient matching screenshot */}
      <div className="absolute top-0 right-0 w-full md:w-3/5 h-full pointer-events-none opacity-40 dark:opacity-25 bg-gradient-to-l from-rose-200/60 via-rose-100/30 to-transparent blur-3xl -z-10" />

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headings & Description */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Academic badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-50 dark:bg-burgundy-950/70 border border-burgundy-100 dark:border-burgundy-900/60 text-burgundy-800 dark:text-rose-300 text-xs font-semibold tracking-wide">
              <Activity className="w-3.5 h-3.5 text-burgundy-700 dark:text-rose-400" />
              <span>Multimodal Neuro-Symbolic Research</span>
            </div>

            {/* Main Heading matching screenshot */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              AI-Powered{' '}
              <span className="text-burgundy-800 dark:text-rose-500">
                Epileptic
              </span>
              <br className="hidden sm:inline" />
              {' '}Seizure Detection
            </h1>

            {/* Subtitle Description */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl xl:max-w-3xl">
              Upload EEG spectrograms and provide clinical information to explore multimodal seizure classification with interpretable, evidence-oriented results using a multimodal Neuro LLM framework.
            </p>

            {/* Quick Demo Pre-load Action */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={loadSampleData}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg text-burgundy-800 dark:text-rose-300 bg-burgundy-50 hover:bg-burgundy-100/80 dark:bg-burgundy-950/60 dark:hover:bg-burgundy-900/60 border border-burgundy-200/60 dark:border-burgundy-800/60 transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-burgundy-700 dark:text-rose-400" />
                <span>Load Sample Case (Spectrogram & Notes)</span>
              </button>
              
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Click to instantly test the multimodal pipeline
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual from screenshot */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Image container with subtle glow */}
              <div className="relative rounded-2xl overflow-hidden shadow-sm dark:shadow-none bg-gradient-to-r from-rose-50/50 via-rose-100/40 to-rose-200/50 dark:from-slate-900/40 dark:via-burgundy-950/30 dark:to-slate-900/40 border border-rose-100/70 dark:border-slate-800/80">
                <img 
                  src="/hero-brain.png" 
                  alt="Medical neural brain illustration with rhythmic EEG wave patterns"
                  className="w-full h-auto object-cover object-center max-h-[280px] sm:max-h-[320px] lg:max-h-[360px] select-none hover:scale-[1.01] transition-transform duration-500"
                  loading="eager"
                />

                {/* Subtitle tag overlay */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border border-white/40 dark:border-slate-700/50 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                  Time-Frequency & Semiology Fusion
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
