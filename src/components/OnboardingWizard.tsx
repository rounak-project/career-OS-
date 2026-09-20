import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Plus, X, Briefcase, DollarSign, Wrench, MapPin } from 'lucide-react';
import { UserProfile, CurrencyCode } from '../types';

interface OnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

const COMMON_SKILLS = [
  "Python", "JavaScript", "SQL", "React", "Excel", "AWS", "Machine Learning",
  "TypeScript", "Node.js", "Docker", "System Design", "Product Management",
  "Data Analysis", "Agile", "Tableau", "Figma", "Git", "Kubernetes"
];

const INDUSTRIES = [
  "Technology", "Fintech", "SaaS", "E-commerce", "Healthcare", "Consulting",
  "Banking & Finance", "Data & AI", "EdTech", "Telecommunications"
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<number>(1);
  const [currentRole, setCurrentRole] = useState<string>("Software Developer");
  const [industry, setIndustry] = useState<string>("Technology");
  const [yearsExperience, setYearsExperience] = useState<string>("2–4");
  const [currentSalary, setCurrentSalary] = useState<number>(850000);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [skills, setSkills] = useState<string[]>(["Python", "JavaScript", "SQL", "Git"]);
  const [customSkillInput, setCustomSkillInput] = useState<string>("");
  const [country, setCountry] = useState<string>("India");
  const [city, setCity] = useState<string>("Bengaluru");
  const [remotePreference, setRemotePreference] = useState<string>("Hybrid");

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setCustomSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      onComplete({
        currentRole,
        industry,
        yearsExperience,
        currentSalary,
        currency,
        country,
        city,
        remotePreference,
        skills
      });
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
    else onCancel();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-indigo-500/10 relative">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            <span>Step {step} of 4</span>
            <span className="text-indigo-400">
              {step === 1 && "Current Role"}
              {step === 2 && "Compensation"}
              {step === 3 && "Core Skills"}
              {step === 4 && "Location & Market"}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-indigo-500 shadow-sm shadow-indigo-500/50' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Current Role */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">What is your current role?</h2>
                <p className="text-sm text-slate-400">Tell us where you stand in your career today.</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Current Job Title
                </label>
                <input
                  type="text"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  placeholder="e.g. Software Developer, Product Analyst"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Years of Experience
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['<1', '1–2', '2–4', '4–7', '7–10', '10+'].map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setYearsExperience(exp)}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition ${
                        yearsExperience === exp
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {exp} years
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Compensation */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">What is your current compensation?</h2>
                <p className="text-sm text-slate-400">Used strictly to calculate your potential salary uplift.</p>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Annual Salary (Numerical)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-500 font-mono">
                      {currency === 'INR' ? '₹' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                    </span>
                    <input
                      type="number"
                      value={currentSalary}
                      onChange={(e) => setCurrentSalary(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500 transition"
                      step={currency === 'INR' ? 50000 : 5000}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    {currency === 'INR' 
                      ? `Equivalent: ₹${(currentSalary / 100000).toFixed(1)} LPA` 
                      : `${currency} ${currentSalary.toLocaleString()}/year`}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => {
                      const newCurr = e.target.value as CurrencyCode;
                      setCurrency(newCurr);
                      if (newCurr === 'INR' && currentSalary < 50000) setCurrentSalary(850000);
                      if (newCurr !== 'INR' && currentSalary > 200000) setCurrentSalary(85000);
                    }}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="INR">₹ INR (Lakhs)</option>
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                    <option value="GBP">£ GBP</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                <p className="text-xs text-slate-400 leading-relaxed">
                  🔒 <strong className="text-slate-300">Privacy Guaranteed:</strong> Your salary details are used purely for localized market comparison and never shared with third parties or employers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Skills */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">What skills do you currently have?</h2>
                <p className="text-sm text-slate-400">Select from common skills or add your own custom expertise.</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {/* Selected Skill Chips */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Your Selected Skills ({skills.length})
                </label>
                <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  {skills.length === 0 ? (
                    <span className="text-xs text-slate-500 self-center">No skills added yet. Choose below or type custom.</span>
                  ) : (
                    skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center space-x-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 px-3 py-1.5 rounded-lg text-xs font-medium"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-indigo-400 hover:text-white transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Custom skill adder */}
              <div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(customSkillInput);
                      }
                    }}
                    placeholder="Add custom skill (e.g. GraphQL, PyTorch, Kubernetes)..."
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(customSkillInput)}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_SKILLS.filter(cs => !skills.includes(cs)).map((cs) => (
                    <button
                      key={cs}
                      type="button"
                      onClick={() => handleAddSkill(cs)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700/60 transition flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3 text-indigo-400" />
                      <span>{cs}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Location */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Where is your primary market?</h2>
                <p className="text-sm text-slate-400">Salary benchmarks and job requirements vary by location.</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="India">India (Primary Market)</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Mumbai, Delhi"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Work Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Hybrid', 'Remote', 'On-site'].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setRemotePreference(pref)}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition ${
                        remotePreference === pref
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition"
          >
            <span>{step === 4 ? 'Analyze My Career' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
