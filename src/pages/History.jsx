import React from 'react';
import HistoryTable from '../components/history/HistoryTable';
import { Clock, ShieldCheck } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div className="py-8 sm:py-12 w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
      
      {/* Page Title & Breadcrumb */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-50 dark:bg-burgundy-950/70 border border-burgundy-100 dark:border-burgundy-900/60 text-burgundy-800 dark:text-rose-300 text-xs font-semibold mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Session Audit Log</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Analysis History
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
          Review previous mock classifications, confidence metrics, and spectrogram evaluations conducted during the active browser session.
        </p>
      </div>

      {/* Main Table Card */}
      <HistoryTable />

      {/* Privacy note */}
      <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">HIPAA / Academic Privacy Guarantee: </span>
          All records shown here are maintained strictly in local React memory for the current prototype session. No EEG images or clinical notes are sent to external servers or persisted in persistent databases.
        </div>
      </div>

    </div>
  );
}
