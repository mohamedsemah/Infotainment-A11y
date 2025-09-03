import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import { useAppStore } from './store';
import { createMuiTheme } from './theme';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnalysisPage from './pages/AnalysisPage';
import ResultsPage from './pages/ResultsPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  const theme = useAppStore((state) => state.theme);
  const muiTheme = createMuiTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="analysis" element={<AnalysisPage />} />
              <Route path="results" element={<ResultsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </Box>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme.mode === 'dark' ? '#1e1e1e' : '#ffffff',
              color: theme.text,
              border: `1px solid ${theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            },
          }}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
