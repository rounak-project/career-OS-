export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface UserProfile {
  currentRole: string;
  industry: string;
  yearsExperience: string;
  currentSalary: number;
  currency: CurrencyCode;
  country: string;
  city: string;
  remotePreference: string;
  skills: string[];
}

export interface SkillGapItem {
  skill: string;
  importance: 'High' | 'Medium' | 'Foundational';
  status: 'have' | 'strengthen' | 'missing';
  whyItMatters: string;
  frequency: string;
  learningDirection: string;
}

export interface RecommendedRole {
  id: string;
  title: string;
  industry: string;
  description: string;
  minimumExperience: string;
  typicalSalaryMin: number;
  typicalSalaryMax: number;
  currency: CurrencyCode;
  matchPercentage: number;
  salaryDifferenceMin: number;
  salaryDifferenceMax: number;
  matchingSkills: string[];
  missingSkills: SkillGapItem[];
  experienceCompatibility: string;
  explanation: string;
  careerPath: string[]; // e.g. ["Software Developer", "Backend Developer", "Senior Software Engineer"]
  dataSource: {
    sourceName: string;
    sourceUrl: string;
    collectedAt: string;
    isEstimate: boolean;
  };
}

export interface CareerAnalysisResponse {
  userSummary: {
    currentRole: string;
    industry: string;
    experience: string;
    salaryFormatted: string;
    currency: CurrencyCode;
  };
  overallDistanceScore: number;
  overallSummary: string;
  recommendedRoles: RecommendedRole[];
  analyzedAt: string;
}
