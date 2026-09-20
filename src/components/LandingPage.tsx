import React from 'react';
import { ArrowRight, TrendingUp, Sparkles, Shield, BarChart3, Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
  onExploreHowItWorks: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onExploreHowItWorks }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
            <span className="text-xs font-medium text-indigo-300">Career Progression Intelligence Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Your next career move, <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">mapped.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Tell CareerOS where you are today. We'll show you realistic higher-paying roles you could move into — and exactly what stands between you and them.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
            <button
              onClick={onStart}
              className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold shadow-xl shadow-indigo-600/25 hover:from-indigo-500 hover:to-indigo-400 transition-all transform hover:-translate-y-0.5"
            >
              <span>Analyze My Career</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onExploreHowItWorks}
              className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition"
            >
              See How It Works
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white font-mono">3–5</p>
              <p className="text-xs text-slate-400 mt-1">Realistic Next Roles</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-indigo-400 font-mono">100%</p>
              <p className="text-xs text-slate-400 mt-1">Transparent Metrics</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">₹X → ↑</p>
              <p className="text-xs text-slate-400 mt-1">Salary Uplift Map</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Interactive Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-[11px] font-semibold uppercase px-3 py-1 rounded-full shadow">
              Live Simulation Preview
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current Position</p>
                  <p className="text-lg font-bold text-white mt-0.5">Product Analyst</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current Salary</p>
                  <p className="text-lg font-bold text-emerald-400 font-mono mt-0.5">₹9.5 LPA</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Potential Next Roles Detected</p>
                
                <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">Senior Product Analyst</span>
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded">87% Match</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">₹14–19 LPA • +₹4.5–9.5K</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    87%
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">Product Manager</span>
                      <span className="text-xs bg-indigo-500/10 text-indigo-400 font-mono px-2 py-0.5 rounded">74% Match</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">₹18–26 LPA • +₹8.5–16.5K</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs">
                    74%
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">Data Analytics Lead</span>
                      <span className="text-xs bg-cyan-500/10 text-cyan-400 font-mono px-2 py-0.5 rounded">71% Match</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">₹16–22 LPA • +₹6.5–12.5K</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-xs">
                    71%
                  </div>
                </div>
              </div>

              <button
                onClick={onStart}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm rounded-xl transition flex items-center justify-center space-x-2 border border-slate-700"
              >
                <span>Run Your Career Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-slate-900/50 border-t border-slate-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-white">How CareerOS Works</h2>
            <p className="text-slate-400">Like a fitness tracker for your career, turning your professional background into actionable progression data.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl relative">
              <div className="text-4xl font-extrabold text-indigo-500/30 font-mono mb-4">01</div>
              <h3 className="text-xl font-semibold text-white mb-2">Tell us where you are</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Add your current role, industry, years of experience, current compensation, and core technical skills.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl relative">
              <div className="text-4xl font-extrabold text-indigo-500/30 font-mono mb-4">02</div>
              <h3 className="text-xl font-semibold text-white mb-2">We analyze your career distance</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                CareerOS compares your profile against real-world role requirements and verified salary benchmarks across markets.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl relative">
              <div className="text-4xl font-extrabold text-indigo-500/30 font-mono mb-4">03</div>
              <h3 className="text-xl font-semibold text-white mb-2">See your next moves</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Get realistic higher-paying roles, precise match scores, and exact skill gaps you need to bridge to unlock your next pay tier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
