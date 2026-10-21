import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AnalysisProvider, useAnalysis } from './context/AnalysisContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthModal from './components/auth/AuthModal';
import HomePage from './pages/Home';
import AnalyzePage from './pages/Analyze';
import HistoryPage from './pages/History';
import AboutPage from './pages/About';

function AppContent() {
  const { activeTab } = useAnalysis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors selection:bg-rose-100 selection:text-burgundy-900 w-full overflow-x-hidden">
      {/* Sticky Slim Navigation Bar */}
      <Navbar />

      {/* Main Content View */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'analyze' && <AnalyzePage />}
        {activeTab === 'history' && <HistoryPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Academic Footer */}
      <Footer />

      {/* Global Interactive Clinical Authentication Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AnalysisProvider>
        <AppContent />
      </AnalysisProvider>
    </AuthProvider>
  );
}
