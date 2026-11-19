import React, { createContext, useState, useEffect } from 'react';
import { SAMPLE_SPECTROGRAM, SAMPLE_CLINICAL_DATA, NORMAL_CLINICAL_DATA } from '../constants/presets';
import { runMultimodalDetection } from '../utils/detector';

export const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
  // Navigation: 'home' | 'analyze' | 'history' | 'about'
  const [activeTab, setActiveTab] = useState('home');

  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('neuro_llm_theme');
    if (saved) return saved === 'dark';
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('neuro_llm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('neuro_llm_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Form input state
  const [eegImage, setEegImage] = useState(null);
  const [clinicalData, setClinicalData] = useState({
    patientHistory: '',
    symptoms: '',
    medicationInfo: '',
    additionalNotes: '',
  });

  // Validation error
  const [validationError, setValidationError] = useState(null);

  // Simulated analysis execution state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  // Results state
  const [currentResult, setCurrentResult] = useState(null);

  // Session history
  const [history, setHistory] = useState([
    {
      id: 'NLLM-8912',
      timestamp: '2026-10-10 10:45 AM',
      evaluator: 'Dr. Elena Vance (Demo Evaluator)',
      evaluatorRole: 'Chief Epileptologist',
      evaluatorInstitution: 'Johns Hopkins Comprehensive Epilepsy Center',
      imageName: 'eeg_patient_sample.png',
      imageUrl: '/sample-spectrogram.png',
      imageDimensions: '640 × 320',
      imageSize: '182 KB',
      classification: 'Seizure Detected',
      confidence: 94.2,
      patientHistory: SAMPLE_CLINICAL_DATA.patientHistory,
      symptoms: SAMPLE_CLINICAL_DATA.symptoms,
      medicationInfo: SAMPLE_CLINICAL_DATA.medicationInfo,
      additionalNotes: SAMPLE_CLINICAL_DATA.additionalNotes,
      interpretation: 'Multimodal analysis identified synchronized high-amplitude spike-and-wave rhythmic activity in the 3–4 Hz delta/theta range, strongly aligned with reported staring and unresponsive semiology. The cross-attention fusion layer highlighted heightened ictal probability despite ongoing valproate therapy.',
      spectralEvidence: 'Rhythmic delta/theta dominant slowing (<4 Hz) observed during the 10–18s window with paroxysmal burst discharge.',
      modalityDetails: {
        eegProvided: true,
        clinicalProvided: true,
        tokensAligned: 384,
        confidenceScore: 0.942,
        dominantBand: 'Delta / Theta (<8 Hz)',
        deltaThetaRatio: 64,
        alphaBetaRatio: 26,
        gammaRatio: 10,
        timeWindow: '10s – 18s',
      }
    }
  ]);

  // Handle image upload from file input or drag-and-drop
  const handleImageUpload = (file) => {
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setValidationError('Please upload a valid image file (PNG, JPG, or JPEG).');
      return;
    }

    setValidationError(null);
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = objectUrl;
    img.onload = () => {
      const formattedSize = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;

      setEegImage({
        file,
        url: objectUrl,
        name: file.name,
        size: formattedSize,
        dimensions: `${img.naturalWidth} × ${img.naturalHeight}`,
        isSample: false,
      });
    };
  };

  // Pre-load sample EEG image and clinical notes
  const loadSampleData = () => {
    setEegImage(SAMPLE_SPECTROGRAM);
    setClinicalData(SAMPLE_CLINICAL_DATA);
    setValidationError(null);
  };

  // Pre-load normal control case
  const loadNormalData = () => {
    setEegImage(SAMPLE_SPECTROGRAM);
    setClinicalData(NORMAL_CLINICAL_DATA);
    setValidationError(null);
  };

  // Remove uploaded image
  const removeImage = () => {
    setEegImage(null);
    setValidationError(null);
  };

  // Update clinical data field
  const updateClinicalField = (field, value) => {
    setClinicalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Clear entire form
  const clearForm = () => {
    setEegImage(null);
    setClinicalData({
      patientHistory: '',
      symptoms: '',
      medicationInfo: '',
      additionalNotes: '',
    });
    setValidationError(null);
    setCurrentResult(null);
  };

  // Run multimodal analysis
  const runAnalysis = async () => {
    if (!eegImage) {
      setValidationError('Please upload an EEG spectrogram image before starting analysis.');
      const uploadCard = document.getElementById('eeg-upload-section');
      if (uploadCard) {
        uploadCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setValidationError(null);
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= 3) {
          clearInterval(stepInterval);
          return 3;
        }
        return prev + 1;
      });
    }, 450);

    try {
      const detectionResult = await runMultimodalDetection(eegImage, clinicalData);

      setTimeout(() => {
        clearInterval(stepInterval);
        setIsAnalyzing(false);

        const id = `NLLM-${Math.floor(1000 + Math.random() * 9000)}`;
        
        const now = new Date();
        const timestamp = now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        let activeUser = null;
        try {
          const savedAuth = localStorage.getItem('neuro_llm_auth_user');
          if (savedAuth) activeUser = JSON.parse(savedAuth);
        } catch (err) {
          console.error('Failed to read auth user', err);
        }

        const newResult = {
          id,
          timestamp,
          evaluator: activeUser ? activeUser.name : 'Dr. Elena Vance (Demo Evaluator)',
          evaluatorRole: activeUser ? activeUser.role : 'Chief Epileptologist',
          evaluatorInstitution: activeUser ? activeUser.institution : 'Johns Hopkins Comprehensive Epilepsy Center',
          imageName: eegImage.name,
          imageUrl: eegImage.url,
          imageDimensions: eegImage.dimensions || '640 × 320',
          imageSize: eegImage.size || '182 KB',
          classification: detectionResult.classification,
          confidence: detectionResult.confidence,
          patientHistory: clinicalData.patientHistory,
          symptoms: clinicalData.symptoms,
          medicationInfo: clinicalData.medicationInfo,
          additionalNotes: clinicalData.additionalNotes,
          interpretation: detectionResult.interpretation,
          spectralEvidence: detectionResult.spectralEvidence,
          modalityDetails: {
            eegProvided: true,
            clinicalProvided: detectionResult.clinicalFeats.hasClinicalNotes,
            tokensAligned: detectionResult.tokenAlignment,
            confidenceScore: detectionResult.confidence / 100,
            dominantBand: detectionResult.visualFeats.dominantBand,
            deltaThetaRatio: detectionResult.visualFeats.deltaThetaRatio,
            alphaBetaRatio: detectionResult.visualFeats.alphaBetaRatio,
            gammaRatio: detectionResult.visualFeats.gammaRatio,
            timeWindow: detectionResult.visualFeats.timeWindow,
            peakBurstRatio: detectionResult.visualFeats.peakBurstRatio,
          }
        };

        setCurrentResult(newResult);
        setHistory(prev => [newResult, ...prev]);

        setTimeout(() => {
          const resultsEl = document.getElementById('results-section');
          if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);

      }, 1900);
    } catch (err) {
      console.error('Detection failed', err);
      clearInterval(stepInterval);
      setIsAnalyzing(false);
    }
  };

  // View specific history record
  const viewHistoryItem = (item) => {
    setCurrentResult(item);
    setActiveTab('analyze');
    setTimeout(() => {
      const resultsEl = document.getElementById('results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  // Delete history item
  const deleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  // Clear entire history
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <AnalysisContext.Provider
      value={{
        activeTab,
        setActiveTab,
        darkMode,
        toggleDarkMode,
        eegImage,
        handleImageUpload,
        loadSampleData,
        loadNormalData,
        removeImage,
        clinicalData,
        updateClinicalField,
        clearForm,
        validationError,
        setValidationError,
        isAnalyzing,
        analysisStep,
        runAnalysis,
        currentResult,
        history,
        viewHistoryItem,
        deleteHistoryItem,
        clearHistory,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export { useAnalysis } from './useAnalysis';
