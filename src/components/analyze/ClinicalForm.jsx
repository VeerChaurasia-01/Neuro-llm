import React from 'react';
import { FileText, RotateCcw } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { SAMPLE_CLINICAL_DATA } from '../../constants/presets';

export default function ClinicalForm() {
  const { clinicalData, updateClinicalField } = useAnalysis();

  const handlePrefill = () => {
    updateClinicalField('patientHistory', SAMPLE_CLINICAL_DATA.patientHistory);
    updateClinicalField('symptoms', SAMPLE_CLINICAL_DATA.symptoms);
    updateClinicalField('medicationInfo', SAMPLE_CLINICAL_DATA.medicationInfo);
    updateClinicalField('additionalNotes', SAMPLE_CLINICAL_DATA.additionalNotes);
  };

  const handleReset = () => {
    updateClinicalField('patientHistory', '');
    updateClinicalField('symptoms', '');
    updateClinicalField('medicationInfo', '');
    updateClinicalField('additionalNotes', '');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col justify-between">
      
      <div>
        {/* Card Header matching reference screenshot */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/60 border border-burgundy-100/70 dark:border-burgundy-900/60 flex items-center justify-center text-burgundy-800 dark:text-rose-400 shrink-0">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Clinical Information
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter patient history, symptoms or clinical notes
              </p>
            </div>
          </div>

          {/* Quick Helper buttons */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrefill}
              title="Prefill sample clinical notes"
              className="text-[11px] font-medium text-burgundy-800 dark:text-rose-400 hover:text-burgundy-900 dark:hover:text-rose-300 px-2.5 py-1 rounded-md bg-burgundy-50 dark:bg-burgundy-950/50 hover:bg-burgundy-100 dark:hover:bg-burgundy-900/60 border border-burgundy-200/50 dark:border-burgundy-900/50 transition-colors"
            >
              Prefill Sample
            </button>
            {(clinicalData.patientHistory || clinicalData.symptoms) && (
              <button
                type="button"
                onClick={handleReset}
                title="Clear text areas"
                className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Form Inputs matching screenshot */}
        <div className="space-y-4">
          
          {/* Field 1: Patient History */}
          <div>
            <label 
              htmlFor="patient-history"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
            >
              Patient History
            </label>
            <textarea
              id="patient-history"
              rows={2}
              value={clinicalData.patientHistory}
              onChange={(e) => updateClinicalField('patientHistory', e.target.value)}
              placeholder="e.g., Patient is a 22-year-old male with a known history of epilepsy..."
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-burgundy-800 dark:focus:border-rose-400 focus:ring-1 focus:ring-burgundy-800/30 dark:focus:ring-rose-400/30 transition-all resize-y min-h-[58px]"
            />
          </div>

          {/* Field 2: Symptoms */}
          <div>
            <label 
              htmlFor="symptoms"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
            >
              Symptoms
            </label>
            <textarea
              id="symptoms"
              rows={2}
              value={clinicalData.symptoms}
              onChange={(e) => updateClinicalField('symptoms', e.target.value)}
              placeholder="e.g., recurrent episodes of loss of awareness, involuntary movements..."
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-burgundy-800 dark:focus:border-rose-400 focus:ring-1 focus:ring-burgundy-800/30 dark:focus:ring-rose-400/30 transition-all resize-y min-h-[58px]"
            />
          </div>

          {/* Field 3: Medication Information */}
          <div>
            <label 
              htmlFor="medication-info"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
            >
              Medication Information
            </label>
            <textarea
              id="medication-info"
              rows={2}
              value={clinicalData.medicationInfo}
              onChange={(e) => updateClinicalField('medicationInfo', e.target.value)}
              placeholder="e.g., currently on valproate, dosage and duration..."
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-burgundy-800 dark:focus:border-rose-400 focus:ring-1 focus:ring-burgundy-800/30 dark:focus:ring-rose-400/30 transition-all resize-y min-h-[52px]"
            />
          </div>

          {/* Field 4: Additional Notes */}
          <div>
            <label 
              htmlFor="additional-notes"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
            >
              Additional Notes
            </label>
            <textarea
              id="additional-notes"
              rows={2}
              value={clinicalData.additionalNotes}
              onChange={(e) => updateClinicalField('additionalNotes', e.target.value)}
              placeholder="e.g., no history of head trauma, EEG requested for evaluation..."
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-burgundy-800 dark:focus:border-rose-400 focus:ring-1 focus:ring-burgundy-800/30 dark:focus:ring-rose-400/30 transition-all resize-y min-h-[52px]"
            />
          </div>

        </div>
      </div>

      {/* Mobile-only prefill trigger */}
      <div className="sm:hidden mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-right">
        <button
          type="button"
          onClick={handlePrefill}
          className="text-xs font-medium text-burgundy-800 dark:text-rose-400 hover:underline"
        >
          Prefill Sample Clinical Data
        </button>
      </div>

    </div>
  );
}
