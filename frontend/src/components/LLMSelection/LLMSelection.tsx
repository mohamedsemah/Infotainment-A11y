import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Divider,
  useTheme
} from '@mui/material';
import {
  Info,
  CheckCircle,
  Cancel,
  Speed,
  Memory,
  AttachMoney
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { LLMModel } from '../../types';
import { AVAILABLE_LLM_MODELS } from '../../data/llmModels';

interface LLMSelectionProps {
  selectedModels: LLMModel[];
  onSelectionChange: (models: LLMModel[]) => void;
  maxSelection?: number;
}

const LLMSelection: React.FC<LLMSelectionProps> = ({
  selectedModels,
  onSelectionChange,
  maxSelection = 3
}) => {
  const theme = useTheme();
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleModelToggle = (model: LLMModel) => {
    const isSelected = selectedModels.some(m => m.id === model.id);
    
    if (isSelected) {
      onSelectionChange(selectedModels.filter(m => m.id !== model.id));
    } else {
      if (selectedModels.length < maxSelection) {
        onSelectionChange([...selectedModels, model]);
      }
    }
  };

  const getModelIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'openai':
        return '🤖';
      case 'anthropic':
        return '🧠';
      case 'google':
        return '🔍';
      case 'xai':
        return '⚡';
      case 'meta':
        return '🦙';
      case 'deepseek':
        return '🔬';
      default:
        return '🤖';
    }
  };

  const getPerformanceColor = (maxTokens: number) => {
    if (maxTokens >= 200000) return theme.palette.success.main;
    if (maxTokens >= 100000) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getCostColor = (costPerToken: number) => {
    if (costPerToken <= 0.00001) return theme.palette.success.main;
    if (costPerToken <= 0.00003) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const calculateTotalCost = () => {
    return selectedModels.reduce((total, model) => total + model.costPerToken, 0);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select AI Models for Analysis
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Choose up to {maxSelection} AI models to analyze your infotainment system files. 
          Different models may provide varying insights and accuracy levels.
        </Typography>

        {selectedModels.length > 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Selected Models:</strong> {selectedModels.map(m => m.name).join(', ')}
            </Typography>
            <Typography variant="body2">
              <strong>Estimated Cost:</strong> ${calculateTotalCost().toFixed(6)} per token
            </Typography>
          </Alert>
        )}
      </Paper>

      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={3}>
        {AVAILABLE_LLM_MODELS.map((model) => {
          const isSelected = selectedModels.some(m => m.id === model.id);
          const isDisabled = !isSelected && selectedModels.length >= maxSelection;

          return (
            <motion.div
              key={model.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                sx={{
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.6 : 1,
                  border: isSelected 
                    ? `2px solid ${theme.palette.primary.main}` 
                    : `1px solid ${theme.palette.divider}`,
                  backgroundColor: isSelected 
                    ? theme.palette.primary.main + '10' 
                    : theme.palette.background.paper,
                  transition: 'all 0.3s ease',
                  '&:hover': !isDisabled ? {
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[4]
                  } : {}
                }}
                onClick={() => !isDisabled && handleModelToggle(model)}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="h4">
                        {getModelIcon(model.provider)}
                      </Typography>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {model.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          by {model.provider}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={1}>
                      {isSelected ? (
                        <CheckCircle color="primary" />
                      ) : (
                        <Cancel color="disabled" />
                      )}
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {model.description}
                  </Typography>

                  <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                    <Chip
                      icon={<Memory />}
                      label={`${(model.maxTokens / 1000).toFixed(0)}K tokens`}
                      size="small"
                      sx={{
                        backgroundColor: getPerformanceColor(model.maxTokens) + '20',
                        color: getPerformanceColor(model.maxTokens),
                        border: `1px solid ${getPerformanceColor(model.maxTokens)}40`
                      }}
                    />
                    <Chip
                      icon={<AttachMoney />}
                      label={`$${model.costPerToken.toFixed(6)}/token`}
                      size="small"
                      sx={{
                        backgroundColor: getCostColor(model.costPerToken) + '20',
                        color: getCostColor(model.costPerToken),
                        border: `1px solid ${getCostColor(model.costPerToken)}40`
                      }}
                    />
                    <Chip
                      icon={<Speed />}
                      label={model.isAvailable ? 'Available' : 'Unavailable'}
                      size="small"
                      color={model.isAvailable ? 'success' : 'error'}
                    />
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isSelected}
                          disabled={isDisabled}
                          onChange={() => handleModelToggle(model)}
                        />
                      }
                      label="Select"
                      sx={{ m: 0 }}
                    />
                    
                    <Tooltip title="View details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDetails(showDetails === model.id ? null : model.id);
                        }}
                      >
                        <Info />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <AnimatePresence>
                    {showDetails === model.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Divider sx={{ my: 2 }} />
                        <Box>
                          <Typography variant="subtitle2" gutterBottom>
                            Technical Specifications:
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            • Maximum Tokens: {model.maxTokens.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            • Cost per Token: ${model.costPerToken.toFixed(8)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            • Provider: {model.provider}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            • Status: {model.isAvailable ? 'Operational' : 'Maintenance'}
                          </Typography>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Box>

      {selectedModels.length === 0 && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          Please select at least one AI model to proceed with the analysis.
        </Alert>
      )}
    </Box>
  );
};

export default LLMSelection;
