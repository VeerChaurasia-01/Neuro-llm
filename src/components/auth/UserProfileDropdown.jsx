import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  LogOut, 
  ShieldCheck, 
  Award, 
  Building, 
  Sparkles, 
  ChevronDown 
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';

export default function UserProfileDropdown() {
  const { user, logout, openAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs group"
        aria-label="User Profile Menu"
      >
        {/* Avatar circle */}
        <div className="relative">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-burgundy-800 dark:bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
            {user.avatar || 'MD'}
          </div>
          {/* Active status indicator green dot */}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
        </div>

        {/* User name & role preview on desktop */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-slate-900 dark:text-white leading-none truncate max-w-[140px]">
            {user.name}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[140px] mt-0.5">
            {user.role}
          </span>
        </div>

        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform duration-200" />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
          
          {/* User Header */}
          <div className="px-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-burgundy-800 dark:bg-rose-600 text-white font-bold text-sm flex items-center justify-center shadow-2xs">
                {user.avatar || 'MD'}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {user.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-burgundy-50 dark:bg-burgundy-950/60 text-[10px] font-semibold text-burgundy-800 dark:text-rose-300 border border-burgundy-100/70 dark:border-burgundy-900/50">
                <Award className="w-3 h-3 text-burgundy-700 dark:text-rose-400" />
                <span>{user.role}</span>
              </span>
              {user.license && (
                <span className="text-[10px] text-slate-400 font-mono">
                  {user.license}
                </span>
              )}
            </div>
          </div>

          {/* Institution details */}
          <div className="px-4 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
            <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="truncate">{user.institution}</span>
          </div>

          {/* Verified Session Badge */}
          <div className="px-4 py-2 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Active Clinical Evaluator Session</span>
          </div>

          {/* Action buttons */}
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 px-2 space-y-1">
            <button
              onClick={() => {
                setIsOpen(false);
                openAuthModal('signin');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Switch Profile / Demo Persona</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
