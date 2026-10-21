import React, { useState } from 'react';
import { 
  Activity, 
  Eye, 
  FileText, 
  GitMerge, 
  Cpu, 
  CheckCircle2, 
  BarChart3, 
  ArrowRight
} from 'lucide-react';

export default function ResearchPipeline() {
  const [selectedStep, setSelectedStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'EEG Input',
      short: 'Raw EEG / Spectrograms',
      icon: Activity,
      category: 'Visual Modality',
      description: 'Raw multi-channel scalp EEG time-series converted via Continuous Wavelet Transform (CWT) or Short-Time Fourier Transform (STFT) into 2D time-frequency spectrogram images, capturing frequency shifts over time (0–60 Hz).',
      tech: '2D STFT / Continuous Wavelet Transform (CWT)',
    },
    {
      number: '02',
      title: 'Visual Feature Extraction',
      short: 'Vision Transformer (ViT)',
      icon: Eye,
      category: 'Computer Vision',
      description: 'Spectrograms partitioned into non-overlapping 16×16 spatial patches, linearly projected with positional embeddings through a multi-layer Vision Transformer (ViT-B/16) to capture subtle paroxysmal epileptiform patterns.',
      tech: 'ViT-B/16 / Swin Transformer / ResNet-50',
    },
    {
      number: '03',
      title: 'Clinical Text Encoding',
      short: 'ClinicalBERT / BioBERT',
      icon: FileText,
      category: 'NLP Modality',
      description: 'Unstructured patient medical records (semiology, loss of awareness, seizure history, medication dosage) tokenized and projected into dense contextual semantic embeddings using a domain-pretrained transformer.',
      tech: 'ClinicalBERT / BioBERT / PubMedBERT',
    },
    {
      number: '04',
      title: 'Multimodal Fusion',
      short: 'Multi-Head Cross-Attention',
      icon: GitMerge,
      category: 'Multimodal Alignment',
      description: 'Bidirectional multi-head cross-attention mechanism that aligns visual EEG spectral tokens with clinical text representations, allowing high-risk clinical context to dynamically steer attention to subtle EEG abnormalities.',
      tech: '8-Head Cross-Attention Layer + LayerNorm',
    },
    {
      number: '05',
      title: 'Neuro LLM Adaptation',
      short: 'Parameter-Efficient LoRA',
      icon: Cpu,
      category: 'Language Model Backbone',
      description: 'A pretrained Large Language Model backbone adapted using Low-Rank Adaptation (LoRA) matrices on query/value projection weights, optimizing multi-modal clinical reasoning while preserving zero-shot language generalization.',
      tech: 'LLaMA / Mistral / Gemma adapted via LoRA (r=16, α=32)',
    },
    {
      number: '06',
      title: 'Output Generation',
      short: 'Classification & Explanation',
      icon: CheckCircle2,
      category: 'Clinical Output',
      description: 'Dual-headed generation producing both discrete binary classification (Seizure Detected vs Non-Seizure Pattern), calibrated posterior confidence score, and natural-language evidence-based interpretation summaries.',
      tech: 'Softmax Classifier + Autoregressive Rationalization',
    },
    {
      number: '07',
      title: 'Rigorous Evaluation',
      short: 'Patient-Independent Validation',
      icon: BarChart3,
      category: 'Validation Protocol',
      description: 'Validated on standardized benchmark datasets (Temple University Hospital EEG Seizure Corpus - TUSZ, CHB-MIT) with patient-split cross-validation to prevent subject leakage. Evaluated via Precision, Recall, F1, ECE, and consistency.',
      tech: 'TUSZ / CHB-MIT | ECE Calibration | F1-Score',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card p-6 sm:p-8 transition-colors">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-burgundy-800 dark:text-rose-400">
            End-to-End Conceptual Framework
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            7-Stage Multimodal Neuro LLM Pipeline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Click on any module to inspect its technical specification and architecture role
          </p>
        </div>

        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
          Proposed Research Architecture
        </div>
      </div>

      {/* Desktop Horizontal / Mobile Vertical Pipeline Stepper */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5 mb-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = selectedStep === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedStep(idx)}
              className={`relative text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'border-burgundy-800 dark:border-rose-400 bg-burgundy-50/70 dark:bg-burgundy-950/60 shadow-xs ring-1 ring-burgundy-800/20 dark:ring-rose-400/20'
                  : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className={`text-[10px] font-bold font-mono ${
                  isSelected ? 'text-burgundy-800 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500'
                }`}>
                  {step.number}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  isSelected 
                    ? 'bg-burgundy-800 text-white dark:bg-rose-600' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className={`text-xs font-bold leading-snug line-clamp-2 ${
                  isSelected ? 'text-burgundy-950 dark:text-rose-200' : 'text-slate-800 dark:text-slate-200'
                }`}>
                  {step.title}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                  {step.short}
                </div>
              </div>

              {/* Desktop arrow connector */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300 dark:text-slate-700">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail Inspector */}
      {selectedStep !== null && (
        <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/90 dark:border-slate-700/80 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-burgundy-800 text-white dark:bg-rose-600">
                Stage {steps[selectedStep].number}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {steps[selectedStep].title}
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
              {steps[selectedStep].category}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {steps[selectedStep].description}
          </p>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Target Technology:</span>
              <span className="font-mono text-burgundy-900 dark:text-rose-300 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                {steps[selectedStep].tech}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Step {selectedStep + 1} of 7 in framework pipeline
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
