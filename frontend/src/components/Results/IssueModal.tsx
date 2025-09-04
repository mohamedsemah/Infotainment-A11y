import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useTheme,
  Alert
} from '@mui/material';
import {
  Close,
  Code,
  Visibility,
  BugReport,
  FileCopy,
  CheckCircle,
  Warning,
  Error,
  Info
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AccessibilityIssue } from '../../types';

interface IssueModalProps {
  issue: AccessibilityIssue | null;
  open: boolean;
  onClose: () => void;
}

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
      id={`issue-tabpanel-${index}`}
      aria-labelledby={`issue-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const IssueModal: React.FC<IssueModalProps> = ({ issue, open, onClose }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Error color="error" />;
      case 'high':
        return <Warning color="warning" />;
      case 'medium':
        return <Info color="info" />;
      case 'low':
        return <CheckCircle color="success" />;
      default:
        return <BugReport />;
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  const getLanguageFromFileName = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'html':
      case 'htm':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'xml':
        return 'xml';
      case 'qml':
        return 'qml';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'cpp':
      case 'c':
        return 'cpp';
      default:
        return 'text';
    }
  };

  if (!issue) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: '80vh'
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            {getSeverityIcon(issue.severity)}
            <Typography variant="h6" fontWeight="bold">
              {issue.title}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Issue Header */}
        <Box mb={3}>
          <Typography variant="body1" paragraph>
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
              label={`WCAG ${issue.wcagGuideline.successCriteria}`}
              size="small"
              sx={{
                backgroundColor: getLevelColor(issue.wcagGuideline.level) + '20',
                color: getLevelColor(issue.wcagGuideline.level),
                fontWeight: 600
              }}
            />
            <Chip
              label={`Level ${issue.wcagGuideline.level}`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`${issue.pourPrinciple}`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`${issue.confidence}% confidence`}
              size="small"
              variant="outlined"
            />
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>WCAG Guideline:</strong> {issue.wcagGuideline.guideline} - {issue.wcagGuideline.description}
            </Typography>
          </Alert>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab
              icon={<Code />}
              label="Code Analysis"
              iconPosition="start"
            />
            <Tab
              icon={<Visibility />}
              label="Live Preview"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" gutterBottom>
            Affected Files and Code Snippets
          </Typography>

          {issue.files.map((file, index) => (
            <Paper key={index} sx={{ mb: 3, overflow: 'hidden' }}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: theme.palette.grey[50],
                  borderBottom: `1px solid ${theme.palette.divider}`
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight="bold">
                    {file.fileName}
                  </Typography>
                  <Box display="flex" gap={1}>
                    {file.lineNumber && (
                      <Chip
                        label={`Line ${file.lineNumber}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(file.codeSnippet)}
                    >
                      <FileCopy />
                    </IconButton>
                  </Box>
                </Box>
                {file.context && (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Context: {file.context}
                  </Typography>
                )}
              </Box>

              <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                <SyntaxHighlighter
                  language={getLanguageFromFileName(file.fileName)}
                  style={theme.palette.mode === 'dark' ? vscDarkPlus : vs}
                  showLineNumbers
                  startingLineNumber={file.lineNumber ? Math.max(1, file.lineNumber - 5) : 1}
                  lineNumberStyle={{
                    color: theme.palette.text.secondary,
                    marginRight: '1em'
                  }}
                  customStyle={{
                    margin: 0,
                    fontSize: '0.875rem'
                  }}
                >
                  {file.codeSnippet}
                </SyntaxHighlighter>
              </Box>
            </Paper>
          ))}

          {issue.suggestions.length > 0 && (
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Suggested Improvements
              </Typography>
              <List>
                {issue.suggestions.map((suggestion, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          {suggestion}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" gutterBottom>
            Live Preview with Issue Highlighting
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              This preview shows the infotainment interface with the accessibility issue highlighted.
              The red bounding box indicates the problematic area.
            </Typography>
          </Alert>

          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              backgroundColor: theme.palette.grey[50],
              border: `2px dashed ${theme.palette.divider}`,
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Visibility sx={{ fontSize: 64, color: theme.palette.text.secondary, mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Live Preview Coming Soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The live preview feature will show your infotainment interface with accessibility issues highlighted.
            </Typography>
            
            {issue.files.some(f => f.boundingBox) && (
              <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom>
                  Issue Location:
                </Typography>
                {issue.files
                  .filter(f => f.boundingBox)
                  .map((file, index) => (
                    <Chip
                      key={index}
                      label={`${file.fileName}: (${file.boundingBox?.x}, ${file.boundingBox?.y})`}
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
              </Box>
            )}
          </Paper>
        </TabPanel>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // TODO: Implement fix suggestion
            console.log('Implement fix for issue:', issue.id);
          }}
        >
          View Fix Suggestions
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IssueModal;
