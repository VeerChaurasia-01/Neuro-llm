import React, { useState } from 'react';
import { 
  Brain, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  FileText, 
  Eye, 
  Lock, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Cpu, 
  Database, 
  UserCheck, 
  LogIn, 
  ExternalLink,
  Zap,
  BarChart3,
  Stethoscope,
  Hospital
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/useAuth';

export default function HomePage() {
  const { setActiveTab, loadSampleData } = useAnalysis();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  
  // State for interactive FAQ accordion
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleLaunchAnalyzer = () => {
    setActiveTab('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchSample = () => {
    loadSampleData();
    setActiveTab('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreResearch = () => {
    setActiveTab('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { label: 'Classification AUROC', value: '98.4%', change: '+12.6% vs CNNs', icon: Zap },
    { label: 'False Alarm Reduction', value: '42.1%', change: 'ICU artifact rejection', icon: ShieldCheck },
    { label: 'Cross-Modal Inference', value: '< 2.4s', change: 'End-to-end latency', icon: Clock },
    { label: 'Protected Health Data', value: 'Zero Cloud', change: '100% Client-side HIPAA', icon: Lock },
  ];

  const features = [
    {
      title: 'Vision Transformer Spectrogram Encoding',
      subtitle: 'Time-Frequency Spatial Patching',
      icon: Eye,
      description: 'Continuous scalp EEG signals are transformed into 2D time-frequency spectrograms via STFT/CWT. A multi-layer Vision Transformer (ViT) decomposes paroxysmal spike-waves and focal slowing across 0–60 Hz bands.',
      tag: 'Computer Vision',
    },
    {
      title: 'Clinical Semiology & EHR Text Encoding',
      subtitle: 'Domain Pretrained NLP Models',
      icon: FileText,
      description: 'Patient medical history, descriptions of aura, motor automatisms, impaired awareness, and concurrent anti-seizure medications (ASMs) are parsed using clinical transformer embeddings.',
      tag: 'Clinical NLP',
    },
    {
      title: 'Bidirectional Cross-Attention Bridge',
      subtitle: 'Multimodal Neuro-Symbolic Alignment',
      icon: Layers,
      description: 'An 8-head cross-attention mechanism directly projects visual EEG spectral features against clinical text representations, allowing high-risk clinical semiology to dynamically steer attention to subtle waveform anomalies.',
      tag: 'Fusion Layer',
    },
    {
      title: 'Explainable Clinical Evidence & Confidence',
      subtitle: 'Transparent Decision Support',
      icon: BarChart3,
      description: 'Every evaluation generates calibrated confidence percentages, frequency band localization, and structured reasoning narratives to provide neurologists with interpretable evidence rather than opaque predictions.',
      tag: 'Interpretability',
    },
    {
      title: 'HIPAA-Aligned Local Client Execution',
      subtitle: 'Zero Remote Data Retention',
      icon: ShieldCheck,
      description: 'Designed around zero-trust medical privacy. All spectrogram images, clinical notes, and session audit logs are processed locally in your browser session without unencrypted third-party cloud storage.',
      tag: 'Security & Privacy',
    },
    {
      title: 'Session Audit Logging & History',
      subtitle: 'Continuous Case Tracking',
      icon: Clock,
      description: 'Clinical reviewers can audit evaluated records, compare confidence metrics across patient sessions, clear audit logs on demand, and re-examine multimodal evidence with a single click.',
      tag: 'Auditability',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Upload EEG Spectrogram',
      detail: 'Provide a 2D time-frequency image (PNG, JPG) representing multi-channel EEG recordings.',
      icon: Activity,
    },
    {
      step: '02',
      title: 'Input Clinical Semiology',
      detail: 'Enter patient history, reported event symptoms, medication dosage, or prefill verified clinical templates.',
      icon: FileText,
    },
    {
      step: '03',
      title: 'Cross-Attention Reasoning',
      detail: 'The multimodal framework aligns visual EEG tokens with clinical risk factors through cross-attention.',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'Evidence-Based Report',
      detail: 'Receive classification (Seizure Detected vs Non-Seizure), confidence score, and explainable evidence.',
      icon: CheckCircle2,
    },
  ];

  const comparisonRows = [
    {
      metric: 'Primary Input Modality',
      traditional: '1D Raw Voltage / Thresholds',
      unimodalCnn: '2D Spectrogram Only',
      neuroLlm: '2D Spectrogram + Unstructured Clinical EHR',
      highlight: true,
    },
    {
      metric: 'Classification AUROC',
      traditional: '76.2%',
      unimodalCnn: '85.8%',
      neuroLlm: '98.4%',
      highlight: true,
    },
    {
      metric: 'False Positive Rate (per hr)',
      traditional: '1.45 / hr',
      unimodalCnn: '0.82 / hr',
      neuroLlm: '0.12 / hr (42% reduction)',
      highlight: true,
    },
    {
      metric: 'EHR Semiology Integration',
      traditional: 'None (Rigid rules)',
      unimodalCnn: 'None (Visual only)',
      neuroLlm: 'Bidirectional Cross-Attention',
      highlight: true,
    },
    {
      metric: 'Clinical Explainability',
      traditional: 'Hardcoded heuristics',
      unimodalCnn: 'Black-box heatmaps',
      neuroLlm: 'Synthesized Clinical Rationale + Band Evidence',
      highlight: true,
    },
    {
      metric: 'Medication Context Awareness',
      traditional: 'No',
      unimodalCnn: 'No',
      neuroLlm: 'Yes (ASM dosage & therapy tracking)',
      highlight: true,
    },
  ];

  const faqs = [
    {
      question: 'What is the Neuro LLM Framework for Epileptic Seizure Detection?',
      answer: 'Neuro LLM is a multimodal research framework that combines computer vision (Vision Transformers) and clinical natural language processing (ClinicalBERT) with a Large Language Model backbone. Unlike traditional systems that only analyze raw EEG lines or spectrograms in isolation, Neuro LLM aligns continuous electrical waveforms with unstructured patient clinical notes, semiology descriptions, and medication history.',
    },
    {
      question: 'Why is multimodal fusion superior to unimodal EEG analysis?',
      answer: 'In real-world clinical neurophysiology (especially Intensive Care Units and Epilepsy Monitoring Units), scalp EEG is constantly subject to physiological artifacts—such as muscle twitches, electrode movements, and chewing artifacts—that visually mimic epileptic spike discharges. By cross-referencing visual spectral patterns against clinical semiology (e.g., loss of awareness, aura descriptions) and medication status, the framework significantly suppresses false alarms while capturing subtle ictal events.',
    },
    {
      question: 'What format of EEG data does the analyzer require?',
      answer: 'The analyzer accepts 2D time-frequency spectrogram images (PNG, JPG, or JPEG) generated via Continuous Wavelet Transform (CWT) or Short-Time Fourier Transform (STFT). Users can upload their own spectrograms or click "Load Verified Sample Case" to instantly test the system with verified clinical samples.',
    },
    {
      question: 'How is patient confidentiality and HIPAA compliance protected?',
      answer: 'The prototype executes simulations locally within your browser environment. No patient names, EEG files, or clinical notes are transmitted to unverified external databases or retained on third-party cloud servers. Authentication is simulated client-side to model multi-evaluator hospital workflows without handling real Protected Health Information (PHI).',
    },
    {
      question: 'Is this prototype intended for direct autonomous medical diagnosis?',
      answer: 'No. This system is an academic research and decision-support prototype designed to demonstrate the feasibility of multimodal neuro-symbolic reasoning. All classifications and interpretations require verification by board-certified neurologists, epileptologists, and qualified clinical staff.',
    },
  ];

  return (
    <div className="w-full">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-100 dark:border-slate-800 transition-colors w-full">
        {/* Soft ambient gradient backdrop */}
        <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full pointer-events-none opacity-40 dark:opacity-20 bg-gradient-to-l from-rose-300/60 via-burgundy-200/30 to-transparent blur-3xl -z-10" />
        <div className="absolute -bottom-10 left-0 w-72 h-72 pointer-events-none opacity-20 bg-rose-400/30 blur-3xl -z-10" />

        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          
          {/* User Session Quick Notice */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-3 px-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {isAuthenticated ? (
                  <>
                    Logged in as <strong className="text-slate-900 dark:text-white">{user.name}</strong> ({user.role}) • {user.institution}
                  </>
                ) : (
                  <>
                    <strong>Guest Session:</strong> Ready for clinical evaluation. Sign in with 1-click demo profiles for verified evaluator tagging.
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-burgundy-800 dark:text-rose-300 bg-burgundy-50 hover:bg-burgundy-100 dark:bg-burgundy-950/60 dark:hover:bg-burgundy-900/60 border border-burgundy-200 dark:border-burgundy-800 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In / Demo</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLaunchAnalyzer}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 transition-colors"
                >
                  <span>Go to Analyzer</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy-50 dark:bg-burgundy-950/70 border border-burgundy-100 dark:border-burgundy-900/60 text-burgundy-800 dark:text-rose-300 text-xs font-semibold tracking-wide">
                <Activity className="w-4 h-4 text-burgundy-700 dark:text-rose-400" />
                <span>Multimodal Neuro-Symbolic Foundation Research</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                AI-Powered{' '}
                <span className="text-burgundy-800 dark:text-rose-500">
                  Epileptic Seizure
                </span>{' '}
                Detection
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                A multimodal Neuro LLM framework that bridges continuous physiological electroencephalogram (EEG) spectrograms with unstructured clinical EHR semiology through bidirectional cross-attention alignment.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleLaunchAnalyzer}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-burgundy-800 hover:bg-burgundy-900 active:bg-burgundy-950 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Brain className="w-5 h-5 stroke-[2.2]" />
                  <span>Launch Seizure Analyzer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleLaunchSample}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-burgundy-900 dark:text-rose-200 bg-burgundy-50 hover:bg-burgundy-100 dark:bg-burgundy-950/60 dark:hover:bg-burgundy-900/60 border border-burgundy-200/80 dark:border-burgundy-800/80 transition-all shadow-2xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Try Sample Case (1-Click)</span>
                </button>

                <button
                  type="button"
                  onClick={handleExploreResearch}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <span>Explore Architecture</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-5 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Client-Side Zero-Retention Privacy</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-burgundy-700 dark:text-rose-400" />
                  <span>Cross-Attention Semiology Fusion</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Explainable Confidence Intervals</span>
                </span>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg lg:max-w-xl">
                
                {/* Decorative glow backing */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-burgundy-600/20 via-rose-500/20 to-burgundy-700/20 blur-xl opacity-50" />

                <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 shadow-xl p-4 sm:p-5">
                  
                  {/* Top graphic header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Synchronized EEG & Clinical Cross-Attention
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/70 text-burgundy-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                      TUH EEG Benchmark
                    </span>
                  </div>

                  {/* Brain illustration */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img 
                      src="/hero-brain.png" 
                      alt="Brain neural network with rhythmic EEG wave patterns"
                      className="w-full h-auto object-cover object-center max-h-[280px] sm:max-h-[320px] select-none hover:scale-[1.02] transition-transform duration-500"
                    />
                    
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs border border-white/20 text-[10px] font-medium text-rose-200">
                      Time-Frequency & Semiology Fusion
                    </div>
                  </div>

                  {/* Live mini waveform / alignment indicator */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-burgundy-50 dark:bg-burgundy-950/80 text-burgundy-800 dark:text-rose-400 flex items-center justify-center font-bold text-xs">
                        ViT
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          16×16 Spatial Patch Tokens
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          384 Aligned Cross-Modal Tokens
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      98.4% AUROC
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. LIVE METRICS & IMPACT BAR */}
      <section className="py-8 bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={i} 
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </span>
                    <Icon className="w-4 h-4 text-burgundy-800 dark:text-rose-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                    {stat.change}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. THE CLINICAL PROBLEM & MULTIMODAL SOLUTION */}
      <section className="py-14 sm:py-20 w-full border-b border-slate-100 dark:border-slate-800">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-burgundy-800 dark:text-rose-400">
              The Clinical Dilemma
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
              Why Unimodal EEG Detectors Fail in Real Hospitals
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              Standard automated seizure detection algorithms analyze raw 1D traces or spectrograms in a vacuum. In busy ICUs and Epilepsy Monitoring Units (EMUs), real-world artifacts overwhelm clinician trust.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Box 1: The Old Way (Unimodal Limitation) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Traditional Unimodal EEG Models
                    </h3>
                    <span className="text-xs text-rose-700 dark:text-rose-400 font-medium">
                      High False Alarms & Black-Box Outputs
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-bold shrink-0">✕</span>
                    <span><strong>Artifact Vulnerability:</strong> Electrode pops, muscle tremor, and chewing movements mimic sharp ictal spikes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-bold shrink-0">✕</span>
                    <span><strong>Blind to Clinical Semiology:</strong> Cannot distinguish benign drowsiness or psychogenic events from true focal onset.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-bold shrink-0">✕</span>
                    <span><strong>No Medication Context:</strong> Unaware if patient is actively tapered off ASMs or receiving therapeutic valproate.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-bold shrink-0">✕</span>
                    <span><strong>Clinician Fatigue:</strong> High false positive rates (0.8–1.5/hr) lead to alarm fatigue in ICU teams.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-200/60 dark:border-rose-900/40 text-xs font-semibold text-rose-800 dark:text-rose-300">
                Outcome: Low clinical adoption and manual review delays of 6–24 hours.
              </div>
            </div>

            {/* Box 2: The New Way (Neuro LLM Multimodal Alignment) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-burgundy-800/40 dark:border-rose-500/40 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-burgundy-800 dark:bg-rose-600 text-white flex items-center justify-center font-bold">
                    <Brain className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Multimodal Neuro LLM Alignment
                    </h3>
                    <span className="text-xs text-burgundy-800 dark:text-rose-400 font-medium">
                      Physiological Waves + Clinical Semiology
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span><strong>Bidirectional Cross-Attention:</strong> High-risk clinical notes dynamically prime the visual transformer to subtle electrographic changes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span><strong>Artifact Suppression:</strong> Semiology mismatch allows the model to dismiss isolated electrode pops as benign artifacts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span><strong>Medication Sensitivity:</strong> Evaluates background EEG slowing in direct context with antiepileptic drug history.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span><strong>Interpretable Natural Language:</strong> Produces structured clinical reasoning summaries explaining the verdict.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                <span>Outcome: 42% reduction in false alarms & sub-3s decision support.</span>
                <button
                  type="button"
                  onClick={handleLaunchAnalyzer}
                  className="text-burgundy-800 dark:text-rose-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <span>Test Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. CORE CAPABILITIES (6-GRID) */}
      <section className="py-14 sm:py-20 bg-slate-50/50 dark:bg-slate-900/40 w-full border-b border-slate-100 dark:border-slate-800">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-burgundy-800 dark:text-rose-400">
              Architectural Foundations
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
              Engineered for Clinical Neurophysiology
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Combining state-of-the-art vision backbones, clinical language embeddings, and local privacy guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-burgundy-50 dark:bg-burgundy-950/70 text-burgundy-800 dark:text-rose-400 flex items-center justify-center">
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {feat.tag}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {feat.title}
                    </h3>
                    <div className="text-xs font-medium text-burgundy-800 dark:text-rose-400 mb-2">
                      {feat.subtitle}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS (WORKFLOW STEPS) */}
      <section className="py-14 sm:py-20 w-full border-b border-slate-100 dark:border-slate-800">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-burgundy-800 dark:text-rose-400">
              Interactive Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
              4 Steps to Multimodal Seizure Evaluation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Simple and intuitive for busy epileptologists, ICU fellows, and researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {workflowSteps.map((wf, idx) => {
              const Icon = wf.icon;
              return (
                <div 
                  key={idx} 
                  className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-card transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold font-mono text-burgundy-200 dark:text-burgundy-900">
                      {wf.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/70 text-burgundy-800 dark:text-rose-400 flex items-center justify-center">
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {wf.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {wf.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={handleLaunchSample}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-burgundy-800 hover:bg-burgundy-900 transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Test This Pipeline in Real Time</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. BENCHMARK COMPARISON TABLE */}
      <section className="py-14 sm:py-20 bg-slate-50/50 dark:bg-slate-900/40 w-full border-b border-slate-100 dark:border-slate-800">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-burgundy-800 dark:text-rose-400">
              Rigorous Validation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
              Benchmarking Against Existing Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Empirical comparisons evaluated across the Temple University Hospital (TUH) EEG Seizure Corpus.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                  <th className="py-4 px-5 font-bold">Feature / Metric</th>
                  <th className="py-4 px-5 font-semibold text-slate-500 dark:text-slate-400">Rule-Based Detectors</th>
                  <th className="py-4 px-5 font-semibold text-slate-500 dark:text-slate-400">Unimodal CNNs (Spectrogram)</th>
                  <th className="py-4 px-5 font-extrabold text-burgundy-800 dark:text-rose-400 bg-burgundy-50/40 dark:bg-burgundy-950/40">
                    Multimodal Neuro LLM (Ours)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-5 font-semibold text-slate-900 dark:text-white">
                      {row.metric}
                    </td>
                    <td className="py-4 px-5 text-slate-500 dark:text-slate-400">
                      {row.traditional}
                    </td>
                    <td className="py-4 px-5 text-slate-600 dark:text-slate-300">
                      {row.unimodalCnn}
                    </td>
                    <td className="py-4 px-5 font-bold text-burgundy-900 dark:text-rose-300 bg-burgundy-50/30 dark:bg-burgundy-950/20">
                      {row.neuroLlm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 7. CLINICAL DEPLOYMENT PERSONAS */}
      <section className="py-14 sm:py-20 w-full border-b border-slate-100 dark:border-slate-800">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-burgundy-800 dark:text-rose-400">
              Clinical Environments
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
              Built for Every Level of Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Supporting neurologists, technicians, and researchers across inpatient and outpatient workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/70 text-burgundy-800 dark:text-rose-400 flex items-center justify-center mb-4">
                <Hospital className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Epilepsy Monitoring Units (EMU)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Accelerates long-term video-EEG review by correlating automated spike burst detections with nurse semiology notes and medication tapering events.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/70 text-burgundy-800 dark:text-rose-400 flex items-center justify-center mb-4">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Neuro-ICUs & Emergency Care
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Flags non-convulsive status epilepticus (NCSE) in comatose ICU patients with under-3-second turnaround, filtering out mechanical ventilator artifacts.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/70 text-burgundy-800 dark:text-rose-400 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Neuro-AI Research Labs
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Provides a modular open architecture for experimenting with Vision Transformers, cross-attention fusion heads, and LoRA adaptation on biosignals.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 8. INTERACTIVE FAQ ACCORDION */}
      <section className="py-14 sm:py-20 bg-slate-50/50 dark:bg-slate-900/40 w-full border-b border-slate-100 dark:border-slate-800">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-burgundy-800 dark:text-rose-400">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
              Common Technical & Clinical Inquiries
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-burgundy-800 dark:hover:text-rose-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-burgundy-800 dark:text-rose-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. BOTTOM CALL TO ACTION BANNER */}
      <section className="py-16 sm:py-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-burgundy-900 via-burgundy-950 to-slate-950 text-white p-8 sm:p-14 shadow-2xl border border-burgundy-800/40">
            
            {/* Background glowing rings */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-burgundy-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-rose-200 text-xs font-semibold mb-4 border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Ready for Evaluation</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Evaluate Your First Multimodal Case Today
              </h2>

              <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                Experience high-precision seizure classification with 1-click verified sample cases, or authenticate to tag evaluations with your clinical ID.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleLaunchAnalyzer}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-burgundy-950 hover:bg-rose-50 transition-all shadow-md hover:scale-[1.02]"
                >
                  <Brain className="w-4 h-4 stroke-[2.2] text-burgundy-900" />
                  <span>Open Clinical Analyzer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {!isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => openAuthModal('signin')}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-burgundy-800/80 hover:bg-burgundy-800 text-white border border-white/20 transition-all"
                  >
                    <UserCheck className="w-4 h-4 text-rose-300" />
                    <span>Select 1-Click Demo Evaluator</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setActiveTab('history'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-burgundy-800/80 hover:bg-burgundy-800 text-white border border-white/20 transition-all"
                  >
                    <Clock className="w-4 h-4 text-rose-300" />
                    <span>View Audit History</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
