import React, { useState } from 'react';
import { 
  Box, Grid, Typography, TextField, Button, Link, 
  Card, FormControl, InputLabel, Select, MenuItem, Alert 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Register() {
  const navigate = useNavigate();

  // ── STATE MANAGEMENT ──
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '',
    role: 'User', 
    secretCode: '' 
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── REGISTRATION LOGIC ──
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. Check Admin Secret (Integration Rule)
    if (formData.role === 'Admin' && formData.secretCode !== '2026') {
      setError('Invalid Admin Secret Code.');
      return;
    }

    // 2. LocalStorage Persistence
    // I am simulating a database by saving the user object to the browser's disk.
    // This allows the login page to "find" this user later.
    const existingUsers = JSON.parse(localStorage.getItem('walletwise_users') || '[]');
    
    // I check if the email is already taken to prevent duplicates
    if (existingUsers.find(u => u.email === formData.email)) {
      setError('This email is already registered.');
      return;
    }

    const newUser = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
      password: formData.password, // In production, we would hash this!
      role: formData.role
    };

    existingUsers.push(newUser);
    localStorage.setItem('walletwise_users', JSON.stringify(existingUsers));

    // 3. Success Feedback
    // Instead of just vanishing, I am now redirecting them so they can log in with their new credentials.
    alert('Account created successfully! Please log in.');
    navigate('/login');
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', bgcolor: '#F4F7F6' }} justifyContent="center" alignItems="center">
      <Grid item xs={11} sm={8} md={5} lg={4}>
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={900} color="#0D6E6E">Create Account</Typography>
            <Typography variant="body2" color="text.secondary">Join WalletWise to start tracking</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="username"
              fullWidth
              required
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Register As</InputLabel>
              <Select
                name="role"
                value={formData.role}
                label="Register As"
                onChange={handleChange}
              >
                <MenuItem value="User">Standard User</MenuItem>
                <MenuItem value="Admin">System Administrator</MenuItem>
              </Select>
            </FormControl>

            {formData.role === 'Admin' && (
              <TextField
                label="Admin Secret Code"
                name="secretCode"
                type="password"
                fullWidth
                required
                value={formData.secretCode}
                onChange={handleChange}
                sx={{ mb: 2 }}
                helperText="Enter '2026' for demonstration purposes"
              />
            )}

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ bgcolor: '#0D6E6E', '&:hover': { bgcolor: '#0A5555' }, py: 1.5 }}
            >
              Sign Up
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{' '}
            <Link 
              component="button" 
              variant="body2" 
              onClick={() => navigate('/login')}
              sx={{ color: '#0D6E6E', fontWeight: 'bold', textDecoration: 'none' }}
            >
              Log in here
            </Link>
          </Typography>
        </Card>
      </Grid>
      <Footer />
    </Grid>
  );
}