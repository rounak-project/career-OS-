import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { OnboardingWizard } from './components/OnboardingWizard';
import { AnalysisLoading } from './components/AnalysisLoading';
import { Dashboard } from './components/Dashboard';
import { CareerGapView } from './components/CareerGapView';
import { UserProfile, CareerAnalysisResponse, RecommendedRole } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'wizard' | 'loading' | 'dashboard' | 'gap'>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    currentRole: 'Software Developer',
    industry: 'Technology',
    yearsExperience: '2–4',
    currentSalary: 850000,
    currency: 'INR',
    country: 'India',
    city: 'Bengaluru',
    remotePreference: 'Hybrid',
    skills: ['Python', 'JavaScript', 'SQL', 'Git']
  });
  const [analysisData, setAnalysisData] = useState<CareerAnalysisResponse | null>(null);
  const [selectedRole, setSelectedRole] = useState<RecommendedRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStartOnboarding = () => {
    setCurrentView('wizard');
  };

  const handleExploreHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCompleteWizard = async (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView('loading');
    setErrorMsg(null);

    try {
      const res = await fetch('/api/career/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      if (!res.ok) {
        throw new Error('Failed to analyze career profile.');
      }

      const data: CareerAnalysisResponse = await res.json();
      setAnalysisData(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error connecting to CareerOS server.');
    }
  };

  const handleLoadingComplete = () => {
    setCurrentView('dashboard');
  };

  const handleSelectRole = (role: RecommendedRole) => {
    setSelectedRole(role);
    setCurrentView('gap');
  };

  const handleReset = () => {
    setCurrentView('wizard');
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans">
      <Navbar
        onReset={() => setCurrentView('landing')}
        hasAnalyzed={currentView === 'dashboard' || currentView === 'gap'}
      />

      <main className="flex-1">
        {errorMsg && (
          <div className="max-w-xl mx-auto mt-6 bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl text-sm text-center">
            {errorMsg}
            <button
              onClick={() => setCurrentView('wizard')}
              className="ml-4 underline font-semibold hover:text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {currentView === 'landing' && (
          <LandingPage
            onStart={handleStartOnboarding}
            onExploreHowItWorks={handleExploreHowItWorks}
          />
        )}

        {currentView === 'wizard' && (
          <OnboardingWizard
            onComplete={handleCompleteWizard}
            onCancel={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'loading' && (
          <AnalysisLoading
            onComplete={handleLoadingComplete}
          />
        )}

        {currentView === 'dashboard' && analysisData && (
          <Dashboard
            analysis={analysisData}
            userProfile={userProfile}
            onSelectRole={handleSelectRole}
            onRestart={handleReset}
          />
        )}

        {currentView === 'gap' && selectedRole && (
          <CareerGapView
            role={selectedRole}
            userProfile={userProfile}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CareerOS Intelligence. Know your next move.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Data Methodology</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Guarantee</span>
            <span className="hover:text-slate-400 cursor-pointer">Market Benchmarks</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
