import React, { useState } from 'react';
import { Brain, Moon, Sun, User, Menu, X, LogIn, Sparkles } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { useAuth } from '../../context/useAuth';
import UserProfileDropdown from '../auth/UserProfileDropdown';

export default function Navbar() {
  const { activeTab, setActiveTab, darkMode, toggleDarkMode } = useAnalysis();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'analyze', label: 'Analyze' },
    { id: 'history', label: 'History' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors w-full">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand matching screenshot */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/60 flex items-center justify-center text-burgundy-800 dark:text-rose-400 group-hover:scale-105 transition-transform duration-200">
              <Brain className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                Neuro LLM
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                Epileptic Seizure Detection
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-150 rounded-lg ${
                    isActive
                      ? 'text-burgundy-800 dark:text-rose-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-burgundy-800 dark:bg-rose-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Dark Mode & Auth / Profile */}
          <div className="flex items-center gap-2.5">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Authentication / User Profile Element */}
            {isAuthenticated ? (
              <UserProfileDropdown />
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Demo</span>
                </button>

                <button
                  onClick={() => openAuthModal('signin')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-burgundy-800 hover:bg-burgundy-900 transition-colors shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-800 dark:text-rose-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-burgundy-800 dark:bg-rose-400" />}
                </button>
              );
            })}

            {!isAuthenticated && (
              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 px-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signin');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-burgundy-800 hover:bg-burgundy-900 transition-colors text-center"
                >
                  Sign In / Choose Evaluator Profile
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
}
