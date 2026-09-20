import React from 'react';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onReset: () => void;
  hasAnalyzed: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset, hasAnalyzed }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0f17]/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0b0f17] rounded-[11px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-white font-sans">CareerOS</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded-full">
                V1 Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Know your next move.</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Market Benchmarks</span>
          </div>
          {hasAnalyzed && (
            <button
              onClick={onReset}
              className="text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-3.5 py-2 rounded-lg transition"
            >
              Update Profile
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
