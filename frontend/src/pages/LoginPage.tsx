import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.secondary.main}20, ${theme.palette.primary.main}20)`,
          zIndex: 0
        }}
      />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 4,
              background: theme.palette.mode === 'dark' 
                ? 'rgba(30, 30, 30, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              position: 'relative',
              zIndex: 1
            }}
          >
            <Box textAlign="center" mb={4}>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                    mb: 1
                  }}
                >
                  A11y Analyzer
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ fontWeight: 400 }}
                >
                  Premium Accessibility Analysis for Infotainment Systems
                </Typography>
              </motion.div>
            </Box>

            <LoginForm onToggleMode={toggleMode} isLogin={isLogin} />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;
