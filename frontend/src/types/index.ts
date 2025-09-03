// Core types for the accessibility analyzer

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string;
  lastModified: Date;
  path?: string;
}

export interface LLMModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  costPerToken: number;
  isAvailable: boolean;
}

export interface WCAGGuideline {
  id: string;
  principle: 'Perceivable' | 'Operable' | 'Understandable' | 'Robust';
  guideline: string;
  successCriteria: string;
  level: 'A' | 'AA' | 'AAA';
  description: string;
  version: '2.0' | '2.1' | '2.2';
}

export interface AccessibilityIssue {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  wcagGuideline: WCAGGuideline;
  pourPrinciple: 'Perceivable' | 'Operable' | 'Understandable' | 'Robust';
  files: IssueFile[];
  suggestions: string[];
  confidence: number; // 0-100
  createdAt: Date;
}

export interface IssueFile {
  fileId: string;
  fileName: string;
  lineNumber?: number;
  columnNumber?: number;
  codeSnippet: string;
  context: string;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface AnalysisSession {
  id: string;
  name: string;
  userId: string;
  files: UploadedFile[];
  selectedModels: LLMModel[];
  issues: AccessibilityIssue[];
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  progress: number; // 0-100
}

export interface AnalysisResult {
  sessionId: string;
  totalIssues: number;
  issuesByPrinciple: {
    Perceivable: AccessibilityIssue[];
    Operable: AccessibilityIssue[];
    Understandable: AccessibilityIssue[];
    Robust: AccessibilityIssue[];
  };
  issuesByLevel: {
    A: AccessibilityIssue[];
    AA: AccessibilityIssue[];
    AAA: AccessibilityIssue[];
  };
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface Theme {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export interface AppState {
  user: User | null;
  theme: Theme;
  currentSession: AnalysisSession | null;
  analysisResults: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

// POUR Principles for accessibility analysis
export const POUR_PRINCIPLES = [
  'Perceivable',
  'Operable', 
  'Understandable',
  'Robust'
] as const;

export type POURPrinciple = typeof POUR_PRINCIPLES[number];