import React from 'react';
import { ArrowRight, TrendingUp, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Compass, HelpCircle } from 'lucide-react';
import { CareerAnalysisResponse, RecommendedRole, UserProfile } from '../types';
import { motion } from 'motion/react';

interface DashboardProps {
  analysis: CareerAnalysisResponse;
  userProfile: UserProfile;
  onSelectRole: (role: RecommendedRole) => void;
  onRestart: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ analysis, userProfile, onSelectRole, onRestart }) => {
  const formatCurrencyAmount = (amount: number) => {
    if (userProfile.currency === 'INR') {
      return `₹${(amount / 100000).toFixed(1)} LPA`;
    }
    return `${userProfile.currency} ${amount.toLocaleString()}/yr`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Career Progression Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Your Career Map</h1>
        </div>

        <button
          onClick={onRestart}
          className="inline-flex items-center space-x-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl transition self-start"
        >
          <span>Update Career Profile</span>
        </button>
      </div>

      {/* Top Summary & Career Distance Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Current Position Summary */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between shadow-xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Your Current Position</p>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-white">{analysis.userSummary.currentRole}</p>
                <p className="text-sm text-indigo-400 mt-0.5">{analysis.userSummary.industry}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <div>
                  <p className="text-xs text-slate-400">Current Salary</p>
                  <p className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{analysis.userSummary.salaryFormatted}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Experience</p>
                  <p className="text-lg font-bold text-white mt-0.5">{analysis.userSummary.experience} yrs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <p className="text-xs text-slate-300 leading-relaxed">
              📍 <strong className="text-white">Market:</strong> {userProfile.city}, {userProfile.country} ({userProfile.remotePreference})
            </p>
          </div>
        </div>

        {/* Career Distance & Overall Insights */}
        <div className="lg:col-span-8 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Career Distance Intelligence</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Analyzed today</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-2">
              <div>
                <h2 className="text-3xl font-extrabold text-white">
                  {analysis.overallDistanceScore}% aligned with your next move
                </h2>
                <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                  {analysis.overallSummary}
                </p>
              </div>

              {/* Progress Circle Visual */}
              <div className="w-24 h-24 rounded-full bg-slate-950 border-4 border-indigo-500/30 flex flex-col items-center justify-center shrink-0 shadow-lg">
                <span className="text-2xl font-extrabold text-indigo-400 font-mono">{analysis.overallDistanceScore}%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Distance</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Deterministic Scoring Model (Skill 60% • Experience 25% • Transition 15%)</span>
            <span className="hidden sm:inline">3–5 Candidate Roles Verified</span>
          </div>
        </div>
      </div>

      {/* Recommended Roles Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Recommended Higher-Paying Roles</h2>
            <p className="text-sm text-slate-400">Realistic transitions that exceed your current compensation.</p>
          </div>
          <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
            {analysis.recommendedRoles.length} Roles Found
          </span>
        </div>

        {analysis.recommendedRoles.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <p className="text-lg font-bold text-white">We couldn't find enough realistic higher-paying matches.</p>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Try adding more skills or adjusting your current role title to explore adjacent career paths.
            </p>
            <button
              onClick={onRestart}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
            >
              Update Profile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {analysis.recommendedRoles.map((role, idx) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 sm:p-8 rounded-3xl shadow-xl transition space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                        {role.industry}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        Req: {role.minimumExperience}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{role.title}</h3>
                    <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">{role.description}</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center space-x-4 shrink-0">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Career Match</p>
                      <p className="text-2xl font-extrabold text-indigo-400 font-mono mt-0.5">{role.matchPercentage}%</p>
                    </div>
                    <div className="w-px h-10 bg-slate-800" />
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Potential Uplift</p>
                      <p className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                        +{formatCurrencyAmount(role.salaryDifferenceMin)}–{formatCurrencyAmount(role.salaryDifferenceMax)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                    <span>Skill Alignment & Readiness</span>
                    <span className="font-mono text-indigo-400">{role.matchPercentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-cyan-400 rounded-full transition-all duration-1000"
                      style={{ width: `${role.matchPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Salary & Skills Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80 items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Estimated Salary Range</p>
                    <p className="text-lg font-bold text-white font-mono">
                      {formatCurrencyAmount(role.typicalSalaryMin)} – {formatCurrencyAmount(role.typicalSalaryMax)}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">Source: {role.dataSource.sourceName}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Key Skills Alignment</p>
                      <div className="flex flex-wrap gap-1.5">
                        {role.matchingSkills.map(s => (
                          <span key={s} className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-1 rounded-md font-medium">
                            {s} ✓
                          </span>
                        ))}
                        {role.missingSkills.slice(0, 2).map((m: any) => (
                          <span key={m.skill} className="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-md font-medium">
                            {m.skill} ⚠
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectRole(role)}
                      className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 transition shrink-0"
                    >
                      <span>View Career Gap</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Transparency Notice */}
      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Career Match is an algorithmic estimate of profile overlap. It is not a guaranteed hiring probability.</span>
        </div>
      </div>
    </div>
  );
};
