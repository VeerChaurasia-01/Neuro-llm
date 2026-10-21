import React, { useState } from 'react';
import { 
  X, 
  Brain, 
  Lock, 
  Mail, 
  User, 
  Building, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    setAuthModalMode, 
    login, 
    signup, 
    loginWithDemo, 
    demoAccounts 
  } = useAuth();

  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'signin' | 'signup'
  
  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  // Sign Up state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpRole, setSignUpRole] = useState('Attending Neurologist');
  const [signUpInstitution, setSignUpInstitution] = useState('');
  const [signUpLicense, setSignUpLicense] = useState('');
  const [signUpError, setSignUpError] = useState('');

  // Sync mode with parent if modal opened with specific mode
  React.useEffect(() => {
    if (authModalMode === 'signup') {
      setActiveTab('signup');
    } else if (authModalMode === 'signin') {
      setActiveTab('signin');
    }
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      setSignInError('Please fill in both your email and password.');
      return;
    }
    setSignInError('');
    login(signInEmail, signInPassword);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword) {
      setSignUpError('Name, email, and password are required.');
      return;
    }
    setSignUpError('');
    signup({
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
      role: signUpRole,
      institution: signUpInstitution || 'Clinical Medical Center',
      license: signUpLicense || 'LIC-VERIFIED',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 transition-all duration-200">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header with Brand */}
        <div className="relative px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-rose-50/50 via-white to-rose-50/30 dark:from-burgundy-950/40 dark:via-slate-900 dark:to-slate-900">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/70 border border-burgundy-100 dark:border-burgundy-900/60 flex items-center justify-center text-burgundy-800 dark:text-rose-400">
              <Brain className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Neuro LLM Clinical Portal
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Authenticate for research-grade multimodal seizure classification
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 mt-5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('demo')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'demo'
                  ? 'bg-white dark:bg-slate-700 text-burgundy-800 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>1-Click Demo Profiles</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'signin'
                  ? 'bg-white dark:bg-slate-700 text-burgundy-800 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'signup'
                  ? 'bg-white dark:bg-slate-700 text-burgundy-800 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Register Evaluator
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* TAB 1: 1-Click Demo Profiles */}
          {activeTab === 'demo' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Select an authorized clinical or research persona to test multimodal case evaluations with authenticated credentials:
              </div>

              <div className="space-y-3">
                {demoAccounts.map((account) => (
                  <div
                    key={account.id}
                    onClick={() => loginWithDemo(account)}
                    className="group cursor-pointer p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-burgundy-800/60 dark:hover:border-rose-400/60 hover:bg-rose-50/30 dark:hover:bg-burgundy-950/30 transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-burgundy-800 dark:bg-rose-600 text-white font-bold flex items-center justify-center text-sm shadow-xs group-hover:scale-105 transition-transform">
                        {account.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-burgundy-800 dark:group-hover:text-rose-400 transition-colors">
                          {account.name}
                        </div>
                        <div className="text-xs font-medium text-burgundy-700 dark:text-rose-300">
                          {account.role}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                          {account.institution}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-burgundy-800 dark:text-rose-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 group-hover:border-burgundy-800 group-hover:bg-burgundy-800 group-hover:text-white dark:group-hover:bg-rose-600 dark:group-hover:text-white transition-all shadow-2xs flex items-center gap-1"
                    >
                      <span>Select</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  Or enter your own hospital / academic email via the{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('signin')}
                    className="text-burgundy-800 dark:text-rose-400 font-semibold hover:underline"
                  >
                    Sign In tab
                  </button>
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: Sign In */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              {signInError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{signInError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="doctor@hospital.org or researcher@univ.edu"
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-burgundy-800 dark:focus:border-rose-400 focus:ring-1 focus:ring-burgundy-800/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Clinical Portal Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-burgundy-800 dark:focus:border-rose-400 focus:ring-1 focus:ring-burgundy-800/30"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="rounded text-burgundy-800 focus:ring-burgundy-800/30" 
                  />
                  <span>Remember session</span>
                </label>
                <button
                  type="button"
                  onClick={() => setActiveTab('demo')}
                  className="text-burgundy-800 dark:text-rose-400 hover:underline"
                >
                  Use Demo Login instead
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-burgundy-800 hover:bg-burgundy-900 transition-colors shadow-sm"
              >
                Sign In to Clinical Portal
              </button>

              <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                Don't have an evaluator profile?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="text-burgundy-800 dark:text-rose-400 font-semibold hover:underline"
                >
                  Register here
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Register Evaluator */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              {signUpError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{signUpError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name & Title
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="Dr. Jordan Patel"
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:border-burgundy-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Clinical Role
                  </label>
                  <select
                    value={signUpRole}
                    onChange={(e) => setSignUpRole(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:border-burgundy-800"
                  >
                    <option value="Chief Epileptologist">Chief Epileptologist</option>
                    <option value="Attending Neurologist">Attending Neurologist</option>
                    <option value="Clinical Neurophysiology Fellow">Clinical Neurophysiology Fellow</option>
                    <option value="Lead ICU EEG Technologist">Lead ICU EEG Technologist</option>
                    <option value="Neuro-AI Computational Researcher">Neuro-AI Computational Researcher</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Institutional Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="j.patel@hospital.org"
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:border-burgundy-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Hospital / Institution
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={signUpInstitution}
                      onChange={(e) => setSignUpInstitution(e.target.value)}
                      placeholder="Cleveland Clinic"
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:border-burgundy-800"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Medical License / Staff ID
                  </label>
                  <div className="relative">
                    <Award className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={signUpLicense}
                      onChange={(e) => setSignUpLicense(e.target.value)}
                      placeholder="MD-98421"
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:border-burgundy-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Portal Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:border-burgundy-800"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-burgundy-800 hover:bg-burgundy-900 transition-colors shadow-sm"
              >
                Create Evaluator Credentials
              </button>

              <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className="text-burgundy-800 dark:text-rose-400 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}

          {/* Privacy Footnote */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>HIPAA Compliant Client Authentication</span>
            </span>
            <span>Local Session Security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
