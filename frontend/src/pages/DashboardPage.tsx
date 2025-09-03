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
  TrendingUp,
  BugReport,
  CheckCircle,
  Warning,
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
      value: '12',
      icon: <Assessment />,
      color: theme.palette.primary.main,
      change: '+3 this month'
    },
    {
      title: 'Issues Found',
      value: analysisResults?.totalIssues.toString() || '0',
      icon: <BugReport />,
      color: theme.palette.error.main,
      change: 'Last analysis'
    },
    {
      title: 'Compliance Rate',
      value: '87%',
      icon: <CheckCircle />,
      color: theme.palette.success.main,
      change: '+5% improvement'
    },
    {
      title: 'Files Analyzed',
      value: currentSession?.files.length.toString() || '0',
      icon: <Upload />,
      color: theme.palette.info.main,
      change: 'Current session'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Infotainment System Analysis',
      description: 'Analyzed 45 files with 3 AI models',
      timestamp: '2 hours ago',
      status: 'completed',
      issues: 12
    },
    {
      id: 2,
      title: 'Navigation Interface Review',
      description: 'Focused on WCAG 2.2 compliance',
      timestamp: '1 day ago',
      status: 'completed',
      issues: 8
    },
    {
      id: 3,
      title: 'Media Player Accessibility',
      description: 'Audio and video accessibility check',
      timestamp: '3 days ago',
      status: 'completed',
      issues: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.palette.success.main;
      case 'in-progress':
        return theme.palette.warning.main;
      case 'failed':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle />;
      case 'in-progress':
        return <PlayArrow />;
      case 'failed':
        return <Error />;
      default:
        return <Info />;
    }
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box mb={4}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Welcome back, {user?.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's an overview of your accessibility analysis activities.
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
                  <List>
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      >
                        <ListItem
                          sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                            mb: 1,
                            backgroundColor: theme.palette.background.paper
                          }}
                        >
                          <ListItemIcon>
                            <Avatar
                              sx={{
                                backgroundColor: getStatusColor(activity.status) + '20',
                                color: getStatusColor(activity.status),
                                width: 40,
                                height: 40
                              }}
                            >
                              {getStatusIcon(activity.status)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle1" fontWeight="bold">
                                  {activity.title}
                                </Typography>
                                <Chip
                                  label={`${activity.issues} issues`}
                                  size="small"
                                  color={activity.issues > 10 ? 'error' : activity.issues > 5 ? 'warning' : 'success'}
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {activity.description}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {activity.timestamp}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
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
