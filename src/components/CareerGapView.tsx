import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, TrendingUp, BookOpen, ShieldCheck, ExternalLink } from 'lucide-react';
import { RecommendedRole, UserProfile } from '../types';
import { motion } from 'motion/react';

interface CareerGapViewProps {
  role: RecommendedRole;
  userProfile: UserProfile;
  onBack: () => void;
}

export const CareerGapView: React.FC<CareerGapViewProps> = ({ role, userProfile, onBack }) => {
  const formatCurrencyAmount = (amount: number) => {
    if (userProfile.currency === 'INR') {
      return `₹${(amount / 100000).toFixed(1)} LPA`;
    }
    return `${userProfile.currency} ${amount.toLocaleString()}/yr`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Career Map</span>
      </button>

      {/* Header Summary Card */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/20">
              <span>Target Role Analysis</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Your path to {role.title}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {role.description}
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl text-center md:text-right shrink-0">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Career Match</p>
            <p className="text-4xl font-extrabold text-indigo-400 font-mono mt-1">{role.matchPercentage}%</p>
            <p className="text-xs text-emerald-400 mt-1 font-medium">
              Potential: +{formatCurrencyAmount(role.salaryDifferenceMin)}–{formatCurrencyAmount(role.salaryDifferenceMax)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-slate-800/80">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current Position</p>
            <p className="text-lg font-bold text-white mt-1">{userProfile.currentRole}</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{formatCurrencyAmount(userProfile.currentSalary)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Target Salary Range</p>
            <p className="text-lg font-bold text-emerald-400 mt-1 font-mono">
              {formatCurrencyAmount(role.typicalSalaryMin)} – {formatCurrencyAmount(role.typicalSalaryMax)}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">Estimated market range</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Experience Requirement</p>
            <p className="text-lg font-bold text-white mt-1">{role.minimumExperience}</p>
            <p className="text-xs text-slate-400 mt-0.5">Compatibility: {role.experienceCompatibility}</p>
          </div>
        </div>
      </div>

      {/* Career Progress Visualization (You -> Target) */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-6 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <span>Career Transition Flow</span>
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {role.careerPath.map((stepTitle, idx) => {
            const isCurrent = stepTitle.toLowerCase() === userProfile.currentRole.toLowerCase() || idx === 0;
            const isTarget = idx === role.careerPath.length - 1;

            return (
              <React.Fragment key={stepTitle}>
                <div className={`w-full sm:w-1/3 p-4 rounded-xl border text-center ${
                  isTarget
                    ? 'bg-indigo-600/10 border-indigo-500/40 text-white shadow-lg'
                    : isCurrent
                    ? 'bg-slate-950 border-slate-700 text-slate-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400'
                }`}>
                  <p className="text-[10px] uppercase font-semibold text-indigo-400 mb-1">
                    {isCurrent ? 'Current Position' : isTarget ? 'Target Role' : `Transition Step ${idx}`}
                  </p>
                  <p className="font-bold text-sm">{stepTitle}</p>
                </div>
                {idx < role.careerPath.length - 1 && (
                  <div className="text-slate-600 rotate-90 sm:rotate-0 my-2 sm:my-0 font-bold">→</div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Skill Gap Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* You Already Have */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>You Already Have ({role.matchingSkills.length} skills)</span>
          </div>

          <div className="space-y-2">
            {role.matchingSkills.length === 0 ? (
              <p className="text-xs text-slate-500">No direct skill matches detected in our primary taxonomy.</p>
            ) : (
              role.matchingSkills.map((skill) => (
                <div key={skill} className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{skill}</span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg font-mono">Matched ✓</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Skills to Strengthen / Missing */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>Skills to Strengthen or Acquire ({role.missingSkills.length})</span>
          </div>

          <div className="space-y-3">
            {role.missingSkills.map((item: any) => (
              <div key={item.skill} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white flex items-center space-x-2">
                    <span>{item.skill}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                      item.importance === 'High' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {item.importance} Priority ({item.frequency})
                    </span>
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  <strong className="text-slate-400">Why it matters:</strong> {item.whyItMatters}
                </p>

                <div className="pt-2 border-t border-slate-900 flex items-start space-x-2 text-xs text-indigo-300">
                  <BookOpen className="w-4 h-4 shrink-0 mt-0.5" />
                  <span><strong>Suggested Direction:</strong> {item.learningDirection}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Transparency Footer */}
      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-white">Salary Data Source: {role.dataSource.sourceName}</p>
            <p className="text-[11px] text-slate-400">Data updated: {role.dataSource.collectedAt} • Estimated market range (not guaranteed)</p>
          </div>
        </div>
        <a
          href={role.dataSource.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition"
        >
          <span>View Source</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
};
