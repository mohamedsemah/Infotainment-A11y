import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, User, Theme, AnalysisSession, AccessibilityIssue, UploadedFile, LLMModel } from '../types';
import { lightTheme, darkTheme } from '../theme';

// Polling function for analysis progress
const pollAnalysisProgress = async (sessionId: string) => {
  console.log('🔄 [POLLING] Starting progress polling for session:', sessionId);
  
  const poll = async () => {
    try {
      console.log('📡 [POLLING] Checking progress...');
      const response = await fetch(`/api/analysis/progress/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'demo-token'}`
        }
      });
      
      if (!response.ok) {
        console.error('❌ [POLLING] Progress check failed:', response.status);
        return;
      }
      
      const data = await response.json();
      console.log('📊 [POLLING] Progress data:', data);
      
      // Update progress in store
      const store = useAppStore.getState();
      if (store.currentSession?.id === sessionId) {
        store.updateAnalysisProgress(data.progress || 0);
        
        if (data.status === 'completed') {
          console.log('✅ [POLLING] Analysis completed!');
          store.completeAnalysis(data.issues || []);
          return; // Stop polling
        } else if (data.status === 'failed') {
          console.error('💥 [POLLING] Analysis failed!');
          store.setError(data.error || 'Analysis failed');
          store.setLoading(false);
          return; // Stop polling
        }
      }
      
      // Continue polling if still analyzing
      if (data.status === 'analyzing') {
        setTimeout(poll, 2000); // Poll every 2 seconds
      }
      
    } catch (error) {
      console.error('💥 [POLLING] Polling error:', error);
    }
  };
  
  // Start polling after a short delay
  setTimeout(poll, 1000);
};


interface AppStore extends AppState {
  // Auth actions
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  
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
      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

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
      startAnalysis: async (files: UploadedFile[], models: LLMModel[]) => {
        console.log('🚀 [STORE] Starting analysis...');
        console.log('📁 [STORE] Files:', files.length, files.map(f => f.name));
        console.log('🤖 [STORE] Models:', models.length, models.map(m => m.name));
        
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
        
        console.log('📝 [STORE] Created session:', sessionId);
        set({ currentSession: session, isLoading: true, error: null });
        
        try {
          console.log('🌐 [STORE] Calling backend API...');
          const response = await fetch('/api/analysis/start', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token') || 'demo-token'}`
            },
            body: JSON.stringify({
              sessionId,
              files: files.map(f => ({
                name: f.name,
                content: f.content,
                type: f.type,
                size: f.size
              })),
              models: models.map(m => m.id)
            })
          });
          
          console.log('📡 [STORE] Backend response status:', response.status);
          
          if (!response.ok) {
            const errorData = await response.text();
            console.error('❌ [STORE] Backend error:', errorData);
            throw new Error(`Backend error: ${response.status} - ${errorData}`);
          }
          
          const result = await response.json();
          console.log('✅ [STORE] Backend response:', result);
          
          // Start polling for progress
          pollAnalysisProgress(sessionId);
          
        } catch (error) {
          console.error('💥 [STORE] Analysis failed:', error);
          set({ 
            currentSession: { ...session, status: 'failed' }, 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Analysis failed - please ensure backend is running' 
          });
        }
      },
      updateAnalysisProgress: (progress: number) => {
        console.log('📊 [STORE] Updating progress:', progress + '%');
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
