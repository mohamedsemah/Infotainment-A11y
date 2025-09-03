import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Link
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  GitHub
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';
import { User } from '../../types';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onToggleMode: () => void;
  isLogin: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, isLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = useAppStore((state) => state.login);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isLogin) {
        // Login logic
        if (!formData.email || !formData.password) {
          throw new Error('Please fill in all fields');
        }

        const user: User = {
          id: 'user_123',
          email: formData.email,
          name: formData.email.split('@')[0],
          createdAt: new Date()
        };

        login(user);
        toast.success('Welcome back!');
      } else {
        // Register logic
        if (!formData.email || !formData.password || !formData.name) {
          throw new Error('Please fill in all fields');
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        const user: User = {
          id: 'user_123',
          email: formData.email,
          name: formData.name,
          createdAt: new Date()
        };

        login(user);
        toast.success('Account created successfully!');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast(`${provider} login coming soon!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%',
          maxWidth: 400
        }}
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isLogin 
              ? 'Sign in to continue your accessibility analysis' 
              : 'Join us to start analyzing your infotainment systems'
            }
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {!isLogin && (
          <TextField
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={handleInputChange('name')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            required
          />
        )}

        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleInputChange('password')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />

        {!isLogin && (
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            required
          />
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: 2
          }}
        >
          {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Or continue with
          </Typography>
        </Divider>

        <Box display="flex" gap={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={() => handleSocialLogin('Google')}
            sx={{ borderRadius: 2 }}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GitHub />}
            onClick={() => handleSocialLogin('GitHub')}
            sx={{ borderRadius: 2 }}
          >
            GitHub
          </Button>
        </Box>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              component="button"
              type="button"
              onClick={onToggleMode}
              sx={{ fontWeight: 600 }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default LoginForm;
