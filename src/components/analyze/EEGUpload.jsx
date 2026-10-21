import React, { useRef, useState } from 'react';
import { Image as ImageIcon, UploadCloud, X, AlertCircle } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

export default function EEGUpload() {
  const { eegImage, handleImageUpload, removeImage, validationError } = useAnalysis();
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      id="eeg-upload-section"
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col justify-between"
    >
      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        className="hidden"
        id="eeg-file-input"
      />

      <div>
        {/* Card Header matching reference screenshot */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-11 h-11 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/60 border border-burgundy-100/70 dark:border-burgundy-900/60 flex items-center justify-center text-burgundy-800 dark:text-rose-400 shrink-0">
            <ImageIcon className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Upload EEG Spectrogram
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Upload a 2D EEG spectrogram image (PNG, JPG, JPEG)
            </p>
          </div>
        </div>

        {/* Validation Error banner */}
        {validationError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/80 flex items-center gap-2.5 text-xs text-rose-800 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Upload Container */}
        {!eegImage ? (
          /* Empty Upload State matching Screenshot 1 */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-10 text-center transition-all duration-200 flex flex-col items-center justify-center min-h-[260px] ${
              isDragOver
                ? 'border-burgundy-600 bg-rose-100/50 dark:bg-rose-950/30'
                : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-slate-800/40 hover:bg-rose-50/70 dark:hover:bg-slate-800/60'
            }`}
          >
            {/* Centered Image Upload Icon */}
            <div className="w-14 h-14 rounded-2xl bg-rose-100/80 dark:bg-rose-950/80 text-burgundy-800 dark:text-rose-400 flex items-center justify-center mb-4 shadow-2xs">
              <ImageIcon className="w-7 h-7 stroke-[2]" />
            </div>

            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Drag and drop your EEG spectrogram image here
            </p>

            <span className="text-xs text-slate-400 dark:text-slate-500 mb-4">
              or
            </span>

            {/* Choose Image Burgundy Button */}
            <button
              type="button"
              onClick={triggerFileInput}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-burgundy-800 hover:bg-burgundy-900 active:bg-burgundy-950 transition-colors shadow-sm hover:shadow"
            >
              <UploadCloud className="w-4 h-4 stroke-[2.2]" />
              <span>Choose Image</span>
            </button>
          </div>
        ) : (
          /* Uploaded Image State matching Screenshot 2 */
          <div className="border border-slate-200/90 dark:border-slate-700/80 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col items-center">
            
            {/* Image Preview with Remove 'X' button */}
            <div className="relative w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-black/5 dark:bg-black/30 flex items-center justify-center">
              <img
                src={eegImage.url}
                alt="Uploaded EEG Spectrogram Preview"
                className="w-full max-h-[190px] object-contain select-none"
              />

              {/* Close / Remove button */}
              <button
                type="button"
                onClick={removeImage}
                title="Remove image"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 shadow-md border border-slate-200 dark:border-slate-600 flex items-center justify-center transition-transform hover:scale-105"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Details matching screenshot 2: filename, dimensions · size */}
            <div className="w-full mt-3 text-center">
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate px-2">
                {eegImage.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {eegImage.dimensions || '640 × 320'} · {eegImage.size || '182 KB'}
              </div>
            </div>

            {/* Replace Image Button matching screenshot 2 */}
            <div className="mt-3 w-full flex justify-center">
              <button
                type="button"
                onClick={triggerFileInput}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-burgundy-800 dark:text-rose-400 bg-white dark:bg-slate-800 border border-burgundy-800/60 dark:border-rose-400/60 hover:bg-burgundy-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Replace Image</span>
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Helper text below upload area matching screenshot */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-center">
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Supported formats: PNG, JPG, JPEG &nbsp;|&nbsp; Recommended size: 224 × 224 or higher
        </span>
      </div>

    </div>
  );
}
