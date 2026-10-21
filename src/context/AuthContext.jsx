import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Preset demo accounts for instant 1-click clinical evaluation testing
export const DEMO_ACCOUNTS = [
  {
    id: 'usr-elena',
    name: 'Dr. Elena Vance, MD',
    email: 'elena.vance@neurology.hopkins.edu',
    role: 'Chief Epileptologist',
    institution: 'Johns Hopkins Comprehensive Epilepsy Center',
    license: 'MD-84920-MD',
    avatar: 'EV',
    specialty: 'Refractory Epilepsy & Stereotactic EEG',
  },
  {
    id: 'usr-marcus',
    name: 'Dr. Marcus Chen, PhD',
    email: 'm.chen@neuroai-institute.org',
    role: 'Lead Neuro-AI Researcher',
    institution: 'Stanford Bio-Computation & Neural Signal Lab',
    license: 'RES-55102',
    avatar: 'MC',
    specialty: 'Multimodal Foundation Models & Biosignals',
  },
  {
    id: 'usr-sarah',
    name: 'Sarah Jenkins, REEG/EPT',
    email: 'sjenkins@mayo.org',
    role: 'Lead ICU EEG Technologist',
    institution: 'Mayo Clinic Neurophysiology Service',
    license: 'REEG-9310',
    avatar: 'SJ',
    specialty: 'Continuous ICU EEG & Artifact Discrimination',
  },
];

export function AuthProvider({ children }) {
  // Load saved user or default to null
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('neuro_llm_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'signup'

  // Persist user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('neuro_llm_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('neuro_llm_auth_user');
    }
  }, [user]);

  const openAuthModal = (mode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Sign in with custom credentials
  const login = (email, password) => {
    // Check if email matches any demo account
    const matchedDemo = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (matchedDemo) {
      setUser(matchedDemo);
      closeAuthModal();
      return { success: true };
    }

    // Default generic custom user
    const namePart = email.split('@')[0];
    const formattedName = namePart
      .split(/[._-]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const initials = formattedName
      .split(' ')
      .map((w) => w.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MD';

    const customUser = {
      id: `usr-${Date.now()}`,
      name: formattedName ? `Dr. ${formattedName}` : 'Clinical Evaluator',
      email: email.trim(),
      role: 'Clinical Neurologist',
      institution: 'Clinical Neurology & Epilepsy Service',
      license: `LIC-${Math.floor(10000 + Math.random() * 90000)}`,
      avatar: initials,
      specialty: 'Clinical Neurophysiology',
    };

    setUser(customUser);
    closeAuthModal();
    return { success: true };
  };

  // Fast 1-click login with demo preset
  const loginWithDemo = (demoAccount) => {
    setUser(demoAccount);
    closeAuthModal();
  };

  // Register a new user
  const signup = ({ name, email, password, role, institution, license }) => {
    const initials = name
      .trim()
      .split(' ')
      .map((w) => w.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MD';

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim().startsWith('Dr.') ? name.trim() : `Dr. ${name.trim()}`,
      email: email.trim(),
      role: role || 'Attending Neurologist',
      institution: institution || 'Academic Medical Center',
      license: license || `MED-${Math.floor(10000 + Math.random() * 90000)}`,
      avatar: initials,
      specialty: 'Epilepsy & Seizure Evaluation',
    };

    setUser(newUser);
    closeAuthModal();
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
        login,
        loginWithDemo,
        signup,
        logout,
        demoAccounts: DEMO_ACCOUNTS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
