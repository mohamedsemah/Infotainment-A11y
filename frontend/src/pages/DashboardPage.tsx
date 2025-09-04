import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  useTheme,
  Paper
} from '@mui/material';
import {
  Upload,
  Assessment,
  BugReport,
  CheckCircle,
  Error,
  Info,
  History,
  PlayArrow
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, currentSession, analysisResults } = useAppStore();

  const quickStats = [
    {
      title: 'Total Analyses',
      value: '0',
      icon: <Assessment />,
      color: theme.palette.primary.main,
      change: 'No analyses yet'
    },
    {
      title: 'Issues Found',
      value: analysisResults?.totalIssues.toString() || '0',
      icon: <BugReport />,
      color: theme.palette.error.main,
      change: analysisResults ? 'Last analysis' : 'No issues found'
    },
    {
      title: 'Compliance Rate',
      value: 'N/A',
      icon: <CheckCircle />,
      color: theme.palette.success.main,
      change: 'No data available'
    },
    {
      title: 'Files Analyzed',
      value: currentSession?.files.length.toString() || '0',
      icon: <Upload />,
      color: theme.palette.info.main,
      change: currentSession ? 'Current session' : 'No files uploaded'
    }
  ];

  const recentActivities: any[] = [];


  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box mb={4}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Welcome{analysisResults ? ' back' : ''}, {user?.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {analysisResults 
              ? "Here's an overview of your accessibility analysis activities."
              : "Ready to start analyzing your infotainment system for accessibility compliance? Upload your files and begin your first analysis."
            }
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} mb={4}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h4" fontWeight="bold" color={stat.color}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {stat.change}
                        </Typography>
                      </Box>
                      <Avatar
                        sx={{
                          backgroundColor: stat.color + '20',
                          color: stat.color,
                          width: 56,
                          height: 56
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Quick Actions
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Upload />}
                      onClick={() => navigate('/analysis')}
                      sx={{ justifyContent: 'flex-start', py: 1.5 }}
                    >
                      Start New Analysis
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Assessment />}
                      onClick={() => navigate('/results')}
                      disabled={!analysisResults}
                      sx={{ justifyContent: 'flex-start', py: 1.5 }}
                    >
                      View Latest Results
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<History />}
                      onClick={() => navigate('/results')}
                      sx={{ justifyContent: 'flex-start', py: 1.5 }}
                    >
                      Analysis History
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Recent Activities
                  </Typography>
                  {recentActivities.length > 0 ? (
                    <List>
                      {/* Activities will be shown here when they exist */}
                    </List>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 4,
                        textAlign: 'center'
                      }}
                    >
                      <History sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Recent Activities
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Start your first analysis to see your activity history here.
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<Upload />}
                        onClick={() => navigate('/analysis')}
                        sx={{ mt: 1 }}
                      >
                        Start Analysis
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Current Session Status */}
          {currentSession && (
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Current Analysis Session
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <Typography variant="body1" gutterBottom>
                        <strong>Session:</strong> {currentSession.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Files:</strong> {currentSession.files.length} files uploaded
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Models:</strong> {currentSession.selectedModels.map(m => m.name).join(', ')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Status:</strong> {currentSession.status}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} textAlign="right">
                      <Button
                        variant="contained"
                        onClick={() => navigate('/results')}
                        disabled={currentSession.status !== 'completed'}
                      >
                        View Results
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default DashboardPage;
