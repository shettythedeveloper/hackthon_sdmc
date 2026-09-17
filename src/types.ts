export type VoterLevel = 'first_time' | 'everyday' | 'deep_dive';

export interface StageProcedure {
  title: string;
  detail: string;
  iconName: string;
}

export interface MythVsFact {
  myth: string;
  fact: string;
  whyItMatters: string;
}

export interface ElectionStage {
  id: string;
  number: number;
  title: string;
  badge: string;
  timeframe: string;
  summary: string;
  keyActors: string[];
  procedures: StageProcedure[];
  voterResponsibilities: string[];
  mythVsFact: MythVsFact;
  integrityMeasures: string[];
}

export interface PollingStationStep {
  step: number;
  officerTitle: string;
  location: string;
  actionTitle: string;
  voterInstructions: string;
  officialProtocol: string;
  securityFeature: string;
  icon: string;
  badge: string;
}

export interface JargonTerm {
  id: string;
  term: string;
  category: 'Procedure' | 'Integrity' | 'Legal' | 'System' | 'Voting Rights';
  shortDefinition: string;
  inSimpleWords: string;
  realWorldExample: string;
  faq: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  badgeEarned: string;
}

export interface TimelineMilestone {
  dayOffset: string; // e.g. "T-45 Days"
  title: string;
  phase: 'Announcement' | 'Nomination' | 'Scrutiny' | 'Campaign' | 'Silence' | 'Voting' | 'Counting';
  description: string;
  voterTask: string;
  isCrucial: boolean;
}

export interface VoterPlanItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
}
