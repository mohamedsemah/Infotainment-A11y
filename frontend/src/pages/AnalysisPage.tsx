import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  Upload,
  Psychology,
  PlayArrow,
  CheckCircle
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAppStore } from '../store';
import { UploadedFile, LLMModel } from '../types';
import FileUpload from '../components/FileUpload/FileUpload';
import LLMSelection from '../components/LLMSelection/LLMSelection';
import { AVAILABLE_LLM_MODELS } from '../data/llmModels';

const AnalysisPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { startAnalysis, isLoading, currentSession } = useAppStore();

  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedModels, setSelectedModels] = useState<LLMModel[]>([]);

  const steps = [
    {
      label: 'Upload Files',
      description: 'Upload your infotainment system files',
      icon: <Upload />
    },
    {
      label: 'Select AI Models',
      description: 'Choose AI models for analysis',
      icon: <Psychology />
    },
    {
      label: 'Start Analysis',
      description: 'Begin accessibility analysis',
      icon: <PlayArrow />
    }
  ];

  const handleNext = () => {
    if (activeStep === 0 && uploadedFiles.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }
    if (activeStep === 1 && selectedModels.length === 0) {
      toast.error('Please select at least one AI model');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStartAnalysis = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('Please upload files first');
      return;
    }
    if (selectedModels.length === 0) {
      toast.error('Please select AI models first');
      return;
    }

    try {
      startAnalysis(uploadedFiles, selectedModels);
      toast.success('Analysis started successfully!');
      navigate('/results');
    } catch (error) {
      toast.error('Failed to start analysis');
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FileUpload
            files={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxFiles={50}
            maxSize={100}
          />
        );
      case 1:
        return (
          <LLMSelection
            selectedModels={selectedModels}
            onSelectionChange={setSelectedModels}
            maxSelection={3}
          />
        );
      case 2:
        return (
          <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Analysis Summary
              </Typography>
              <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {uploadedFiles.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Files Uploaded
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary" fontWeight="bold">
                    {selectedModels.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    AI Models Selected
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    {uploadedFiles.reduce((total, file) => total + file.size, 0) / (1024 * 1024)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Size (MB)
                  </Typography>
                </Paper>
              </Box>
            </Paper>

            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                The analysis will examine your infotainment system files for WCAG 2.2 compliance 
                across all four POUR principles: Perceivable, Operable, Understandable, and Robust.
              </Typography>
            </Alert>

            <Box display="flex" gap={2} justifyContent="center">
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={isLoading}
                size="large"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleStartAnalysis}
                disabled={isLoading}
                size="large"
                startIcon={<PlayArrow />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                Start Analysis
              </Button>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          New Accessibility Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Upload your infotainment system files and select AI models to perform a comprehensive 
          WCAG 2.2 accessibility analysis.
        </Typography>
      </motion.div>

      <Paper sx={{ mt: 3 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={({ active, completed }) => (
                  <motion.div
                    animate={{ scale: active ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: completed 
                          ? theme.palette.success.main 
                          : active 
                            ? theme.palette.primary.main 
                            : theme.palette.grey[300],
                        color: completed || active ? 'white' : theme.palette.grey[600]
                      }}
                    >
                      {completed ? <CheckCircle /> : step.icon}
                    </Box>
                  </motion.div>
                )}
              >
                <Typography variant="h6" fontWeight="bold">
                  {step.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  {getStepContent(index)}
                </Box>
                <Box sx={{ mb: 1 }}>
                  {index < steps.length - 1 && (
                    <Box display="flex" gap={2}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={
                          (index === 0 && uploadedFiles.length === 0) ||
                          (index === 1 && selectedModels.length === 0)
                        }
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {isLoading && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Analysis in Progress...
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={currentSession?.progress || 0}
            sx={{ height: 8, borderRadius: 4, mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            {currentSession?.progress || 0}% complete
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default AnalysisPage;
