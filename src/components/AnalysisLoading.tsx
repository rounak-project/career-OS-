import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Compass, CheckCircle2, Loader2 } from 'lucide-react';

interface AnalysisLoadingProps {
  onComplete: () => void;
}

const STAGES = [
  "Understanding your professional profile...",
  "Comparing requirements across verified role datasets...",
  "Checking localized salary benchmarks...",
  "Identifying critical skill gaps and importance weightings...",
  "Synthesizing your realistic next-move career map..."
];

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ onComplete }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl shadow-indigo-500/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px] mx-auto mb-6 shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full bg-[#0b0f17] rounded-[15px] flex items-center justify-center">
            <Compass className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Analyzing your career...</h2>
        <p className="text-xs text-slate-400 mb-8">CareerOS Intelligence Engine</p>

        <div className="space-y-3 text-left">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: idx <= currentStageIndex ? 1 : 0.4, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center space-x-3 p-3 rounded-xl border transition ${
                  isCurrent
                    ? 'bg-indigo-600/10 border-indigo-500/30 text-white'
                    : isCompleted
                    ? 'bg-slate-950/40 border-slate-800/80 text-slate-300'
                    : 'bg-slate-950/20 border-slate-900 text-slate-600'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className="text-xs font-medium">{stage}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
