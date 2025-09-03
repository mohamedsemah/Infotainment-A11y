import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, User, Theme, AnalysisSession, AccessibilityIssue, UploadedFile, LLMModel } from '../types';
import { lightTheme, darkTheme } from '../theme';

interface AppStore extends AppState {
  // Auth actions
  login: (user: User) => void;
  logout: () => void;
  
  // Theme actions
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  
  // Session actions
  createSession: (session: AnalysisSession) => void;
  updateSession: (sessionId: string, updates: Partial<AnalysisSession>) => void;
  deleteSession: (sessionId: string) => void;
  
  // Analysis actions
  startAnalysis: (files: UploadedFile[], models: LLMModel[]) => void;
  updateAnalysisProgress: (progress: number) => void;
  completeAnalysis: (issues: AccessibilityIssue[]) => void;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      theme: lightTheme,
      currentSession: null,
      analysisResults: null,
      isLoading: false,
      error: null,

      // Auth actions
      login: (user: User) => set({ user }),
      logout: () => set({ user: null, currentSession: null, analysisResults: null }),

      // Theme actions
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme.mode === 'light' ? darkTheme : lightTheme;
        set({ theme: newTheme });
      },
      setTheme: (theme: Theme) => set({ theme }),

      // Session actions
      createSession: (session: AnalysisSession) => set({ currentSession: session }),
      updateSession: (sessionId: string, updates: Partial<AnalysisSession>) => {
        const currentSession = get().currentSession;
        if (currentSession && currentSession.id === sessionId) {
          set({ currentSession: { ...currentSession, ...updates } });
        }
      },
      deleteSession: (sessionId: string) => {
        const currentSession = get().currentSession;
        if (currentSession && currentSession.id === sessionId) {
          set({ currentSession: null, analysisResults: null });
        }
      },

      // Analysis actions
      startAnalysis: (files: UploadedFile[], models: LLMModel[]) => {
        const sessionId = `session_${Date.now()}`;
        const session: AnalysisSession = {
          id: sessionId,
          name: `Analysis ${new Date().toLocaleDateString()}`,
          userId: get().user?.id || 'anonymous',
          files,
          selectedModels: models,
          issues: [],
          status: 'analyzing',
          createdAt: new Date(),
          progress: 0
        };
        set({ currentSession: session, isLoading: true, error: null });
      },
      updateAnalysisProgress: (progress: number) => {
        const currentSession = get().currentSession;
        if (currentSession) {
          set({ currentSession: { ...currentSession, progress } });
        }
      },
      completeAnalysis: (issues: AccessibilityIssue[]) => {
        const currentSession = get().currentSession;
        if (currentSession) {
          const completedSession = {
            ...currentSession,
            issues,
            status: 'completed' as const,
            completedAt: new Date(),
            progress: 100
          };
          
          // Create analysis results
          const analysisResults = {
            sessionId: currentSession.id,
            totalIssues: issues.length,
            issuesByPrinciple: {
              Perceivable: issues.filter(i => i.pourPrinciple === 'Perceivable'),
              Operable: issues.filter(i => i.pourPrinciple === 'Operable'),
              Understandable: issues.filter(i => i.pourPrinciple === 'Understandable'),
              Robust: issues.filter(i => i.pourPrinciple === 'Robust')
            },
            issuesByLevel: {
              A: issues.filter(i => i.wcagGuideline.level === 'A'),
              AA: issues.filter(i => i.wcagGuideline.level === 'AA'),
              AAA: issues.filter(i => i.wcagGuideline.level === 'AAA')
            },
            summary: {
              critical: issues.filter(i => i.severity === 'critical').length,
              high: issues.filter(i => i.severity === 'high').length,
              medium: issues.filter(i => i.severity === 'medium').length,
              low: issues.filter(i => i.severity === 'low').length
            }
          };
          
          set({ 
            currentSession: completedSession, 
            analysisResults, 
            isLoading: false 
          });
        }
      },

      // UI actions
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null })
    }),
    {
      name: 'a11y-analyzer-storage',
      partialize: (state) => ({
        user: state.user,
        theme: state.theme
      })
    }
  )
);
