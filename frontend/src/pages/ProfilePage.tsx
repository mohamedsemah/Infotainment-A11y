import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Alert,
  useTheme
} from '@mui/material';
import {
  Person,
  Email,
  Security,
  Notifications,
  Palette,
  Save,
  Edit,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const { user, theme: appTheme, toggleTheme, setTheme } = useAppStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    notifications: true,
    darkMode: appTheme.mode === 'dark'
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSwitchChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.checked }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setFormData(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const accountStats = [
    {
      title: 'Total Analyses',
      value: '24',
      icon: <CheckCircle />,
      color: theme.palette.success.main
    },
    {
      title: 'Issues Resolved',
      value: '156',
      icon: <Warning />,
      color: theme.palette.warning.main
    },
    {
      title: 'Account Created',
      value: new Date(user?.createdAt || Date.now()).toLocaleDateString(),
      icon: <Person />,
      color: theme.palette.info.main
    }
  ];

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Profile Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your account settings and preferences.
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Personal Information
                </Typography>
                <Button
                  variant={isEditing ? "contained" : "outlined"}
                  startIcon={isEditing ? <Save /> : <Edit />}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} textAlign="center">
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      fontSize: '3rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {user?.name || 'User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email || 'user@example.com'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    disabled={!isEditing}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Paper>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Preferences
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Palette />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dark Mode"
                    secondary="Switch between light and dark themes"
                  />
                  <Switch
                    checked={formData.darkMode}
                    onChange={handleThemeToggle}
                    color="primary"
                  />
                </ListItem>

                <Divider />

                <ListItem>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive notifications about analysis results"
                  />
                  <Switch
                    checked={formData.notifications}
                    onChange={handleSwitchChange('notifications')}
                    color="primary"
                  />
                </ListItem>
              </List>
            </Paper>
          </motion.div>
        </Grid>

        {/* Account Stats */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Account Statistics
              </Typography>
              
              {accountStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <Card sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            backgroundColor: stat.color + '20',
                            color: stat.color,
                            width: 40,
                            height: 40
                          }}
                        >
                          {stat.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {stat.title}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Paper>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Security
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>
                  <ListItemText
                    primary="Change Password"
                    secondary="Update your account password"
                  />
                  <Button variant="outlined" size="small">
                    Change
                  </Button>
                </ListItem>

                <Divider />

                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText
                    primary="Two-Factor Authentication"
                    secondary="Add an extra layer of security"
                  />
                  <Button variant="outlined" size="small">
                    Enable
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
