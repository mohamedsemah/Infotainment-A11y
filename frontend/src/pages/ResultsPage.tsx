import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Badge,
  useTheme,
  Alert
} from '@mui/material';
import {
  Visibility,
  TouchApp,
  Psychology,
  Build,
  Download,
  Refresh,
  BugReport
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { AccessibilityIssue, POUR_PRINCIPLES } from '../types';
import IssueModal from '../components/Results/IssueModal';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`pour-tabpanel-${index}`}
      aria-labelledby={`pour-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ResultsPage: React.FC = () => {
  const theme = useTheme();
  const { analysisResults, isLoading } = useAppStore();
  
  const [activeTab, setActiveTab] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState<AccessibilityIssue | null>(null);
  const [filterLevel, setFilterLevel] = useState<'all' | 'A' | 'AA' | 'AAA'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getPrincipleIcon = (principle: string) => {
    switch (principle) {
      case 'Perceivable':
        return <Visibility />;
      case 'Operable':
        return <TouchApp />;
      case 'Understandable':
        return <Psychology />;
      case 'Robust':
        return <Build />;
      default:
        return <BugReport />;
    }
  };

  const getPrincipleColor = (principle: string) => {
    switch (principle) {
      case 'Perceivable':
        return theme.palette.primary.main;
      case 'Operable':
        return theme.palette.secondary.main;
      case 'Understandable':
        return theme.palette.success.main;
      case 'Robust':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return theme.palette.error.main;
      case 'high':
        return theme.palette.warning.main;
      case 'medium':
        return theme.palette.info.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A':
        return theme.palette.primary.main;
      case 'AA':
        return theme.palette.secondary.main;
      case 'AAA':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const filterIssues = (issues: AccessibilityIssue[]) => {
    return issues.filter(issue => {
      const levelMatch = filterLevel === 'all' || issue.wcagGuideline.level === filterLevel;
      const severityMatch = filterSeverity === 'all' || issue.severity === filterSeverity;
      return levelMatch && severityMatch;
    });
  };

  const getFilteredIssuesByPrinciple = (principle: string) => {
    if (!analysisResults) return [];
    const issues = analysisResults.issuesByPrinciple[principle as keyof typeof analysisResults.issuesByPrinciple];
    return filterIssues(issues);
  };

  if (!analysisResults && !isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Analysis Results
        </Typography>
        <Alert severity="info">
          No analysis results found. Please start a new analysis to view results.
        </Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Analysis in Progress
        </Typography>
        <Alert severity="info">
          Your accessibility analysis is currently running. Results will appear here once complete.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Analysis Results
            </Typography>
            <Typography variant="body1" color="text.secondary">
              WCAG 2.2 Accessibility Analysis Results
            </Typography>
          </Box>
          
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => {
                // TODO: Implement export functionality
                console.log('Export results');
              }}
            >
              Export Results
            </Button>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => {
                // TODO: Implement refresh functionality
                console.log('Refresh results');
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Typography variant="h3" color="primary" fontWeight="bold">
                    {analysisResults?.totalIssues || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Issues Found
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Typography variant="h3" color="error" fontWeight="bold">
                    {analysisResults?.summary.critical || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Critical Issues
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Typography variant="h3" color="warning.main" fontWeight="bold">
                    {analysisResults?.summary.high || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    High Priority
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Typography variant="h3" color="success.main" fontWeight="bold">
                    {analysisResults?.summary.low || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Low Priority
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* POUR Tabs */}
        <Paper sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  minHeight: 64,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600
                }
              }}
            >
              {POUR_PRINCIPLES.map((principle, index) => {
                const issues = getFilteredIssuesByPrinciple(principle);
                return (
                  <Tab
                    key={principle}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        {getPrincipleIcon(principle)}
                        <span>{principle}</span>
                        <Badge badgeContent={issues.length} color="error" />
                      </Box>
                    }
                    sx={{
                      color: getPrincipleColor(principle),
                      '&.Mui-selected': {
                        color: getPrincipleColor(principle)
                      }
                    }}
                  />
                );
              })}
            </Tabs>
          </Box>

          {POUR_PRINCIPLES.map((principle, index) => (
            <TabPanel key={principle} value={activeTab} index={index}>
              <Box mb={3}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {principle} Issues
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Issues related to the {principle.toLowerCase()} principle of WCAG 2.2
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <AnimatePresence>
                  {getFilteredIssuesByPrinciple(principle).map((issue) => (
                    <Grid item xs={12} md={6} lg={4} key={issue.id}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          sx={{
                            cursor: 'pointer',
                            height: '100%',
                            border: `1px solid ${theme.palette.divider}`,
                            '&:hover': {
                              boxShadow: theme.shadows[4],
                              borderColor: getPrincipleColor(principle)
                            }
                          }}
                          onClick={() => setSelectedIssue(issue)}
                        >
                          <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                              <Typography variant="h6" fontWeight="bold" noWrap>
                                {issue.title}
                              </Typography>
                              <Chip
                                label={issue.wcagGuideline.successCriteria}
                                size="small"
                                sx={{
                                  backgroundColor: getLevelColor(issue.wcagGuideline.level) + '20',
                                  color: getLevelColor(issue.wcagGuideline.level),
                                  fontWeight: 600
                                }}
                              />
                            </Box>

                            <Typography variant="body2" color="text.secondary" paragraph>
                              {issue.description}
                            </Typography>

                            <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                              <Chip
                                label={issue.severity.toUpperCase()}
                                size="small"
                                sx={{
                                  backgroundColor: getSeverityColor(issue.severity) + '20',
                                  color: getSeverityColor(issue.severity),
                                  fontWeight: 600
                                }}
                              />
                              <Chip
                                label={`Level ${issue.wcagGuideline.level}`}
                                size="small"
                                variant="outlined"
                              />
                              <Chip
                                label={`${issue.confidence}% confidence`}
                                size="small"
                                variant="outlined"
                              />
                            </Box>

                            <Typography variant="caption" color="text.secondary">
                              {issue.files.length} file(s) affected
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </AnimatePresence>
              </Grid>

              {getFilteredIssuesByPrinciple(principle).length === 0 && (
                <Box textAlign="center" py={8}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No {principle.toLowerCase()} issues found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Great! Your infotainment system appears to be compliant with {principle.toLowerCase()} requirements.
                  </Typography>
                </Box>
              )}
            </TabPanel>
          ))}
        </Paper>
      </motion.div>

      {/* Issue Detail Modal */}
      <IssueModal
        issue={selectedIssue}
        open={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
      />
    </Box>
  );
};

export default ResultsPage;
