import React, { useState } from 'react';
import { History, Eye, Trash2, AlertTriangle, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

export default function HistoryTable() {
  const { history, viewHistoryItem, deleteHistoryItem, clearHistory, setActiveTab } = useAnalysis();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const confirmClear = () => {
    clearHistory();
    setShowClearConfirm(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card p-6 transition-colors">
      
      {/* Header and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/60 text-burgundy-800 dark:text-rose-400 flex items-center justify-center">
              <History className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span>Analysis Session History</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            In-memory record of evaluated EEG spectrograms and clinical cases
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/60 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Clear Analysis History?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              This will remove all {history.length} logged records from your current browser session. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmClear}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State matching requirement */}
      {history.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-4">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No analyses logged yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1 mb-5">
            Upload an EEG spectrogram and run your first multimodal seizure classification.
          </p>
          <button
            type="button"
            onClick={() => { setActiveTab('analyze'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-burgundy-800 hover:bg-burgundy-900 transition-colors shadow-sm"
          >
            <span>Start an Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* History Table */
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 font-semibold">Analysis ID</th>
                <th className="py-3 px-3 font-semibold">Date & Time</th>
                <th className="py-3 px-3 font-semibold">Evaluator</th>
                <th className="py-3 px-3 font-semibold">Uploaded Filename</th>
                <th className="py-3 px-3 font-semibold">Demo Classification</th>
                <th className="py-3 px-3 font-semibold">Demo Confidence</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {history.map((item) => {
                const isSeizure = item.classification === 'Seizure Detected';
                return (
                  <tr 
                    key={item.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Analysis ID */}
                    <td className="py-3.5 px-3 font-mono font-medium text-slate-900 dark:text-white whitespace-nowrap">
                      {item.id}
                    </td>

                    {/* Date and Time */}
                    <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {item.timestamp}
                    </td>

                    {/* Evaluator */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.evaluator || 'Dr. Elena Vance'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.evaluatorRole || 'Chief Epileptologist'}
                        </span>
                      </div>
                    </td>

                    {/* Uploaded Filename */}
                    <td className="py-3.5 px-3 font-medium text-slate-800 dark:text-slate-200 max-w-[180px] truncate">
                      {item.imageName}
                    </td>

                    {/* Demo Classification */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          isSeizure
                            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/60'
                            : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/60'
                        }`}
                      >
                        {isSeizure ? (
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                        ) : (
                          <CheckCircle className="w-3 h-3 shrink-0" />
                        )}
                        <span>{item.classification}</span>
                      </span>
                    </td>

                    {/* Demo Confidence */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {item.confidence}%
                        </span>
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-burgundy-800 dark:bg-rose-500 h-full rounded-full"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => viewHistoryItem(item)}
                          title="View full mock analysis report"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-burgundy-800 dark:text-rose-400 hover:bg-burgundy-50 dark:hover:bg-burgundy-950/50 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Result</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteHistoryItem(item.id)}
                          title="Delete record"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footnote */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
          <span>Patient data kept in volatile React memory only.</span>
        </div>
        <span>{history.length} {history.length === 1 ? 'record' : 'records'} logged</span>
      </div>

    </div>
  );
}
