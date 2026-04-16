import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Link, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

export default function Register() {
  const navigate = useNavigate();

  // 1. STATE MANAGEMENT
  // We expand the initial state object to track the user's role and the secret code.
  // We default the role to 'User' so regular sign-ups remain streamlined.
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '',
    role: 'User', 
    secretCode: '' 
  });

  // Event handler to update state dynamically as the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. EVENT HANDLERS
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // BACKEND SIMULATION (As advised for security):
    // In a real production application, you would send this entire `formData` payload 
    // to your Node/Express, Python, or PHP backend via an API call (like fetch or axios).
    // The backend server would then securely check if the submitted code matches the expected master code.
    
    console.log('Registering user with payload:', formData);

    if (formData.role === 'Admin') {
      // This check would normally happen securely on your server database side
      if (formData.secretCode !== '2026') {
        alert('Invalid Secret Code for Admin Registration!');
        return; // Stop the execution and prevent registration
      }
    }
    
    // Successful registration automatically redirects to the Login page
    alert(`Successfully registered as a ${formData.role}!`);
    navigate('/login');
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      
      {/* LEFT SIDE: WalletWise Teal Branding (Visual consistency) */}
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ 
          backgroundColor: '#0D6E6E',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          WalletWise
        </Typography>
        <Typography variant="h6" align="center">
          Take control of your finances today.
        </Typography>
      </Grid>

      {/* RIGHT SIDE: Registration Form */}
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: '#f4f6f8' 
        }}
      >
        <Card sx={{ p: 4, width: '100%', maxWidth: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Join us and start managing your budget.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
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

            {/* 3. CONDITIONAL FORM FIELDS */}
            {/* Role Selection Dropdown */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="role-select-label">Register As</InputLabel>
              <Select
                labelId="role-select-label"
                name="role"
                value={formData.role}
                label="Register As"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <MenuItem value="User">Normal User</MenuItem>
                <MenuItem value="Admin">Administrator</MenuItem>
              </Select>
            </FormControl>

            {/* Conditional Rendering using Javascript logical && operator. 
                The text field only mounts into the DOM when role is strictly equal to 'Admin' */}
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
                helperText="Enter the master code to register as an admin"
              />
            )}

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ backgroundColor: '#0D6E6E', '&:hover': { backgroundColor: '#0A5555' }, mb: 2, mt: 1 }}
            >
              Sign Up
            </Button>
          </form>

          <Typography variant="body2" align="center">
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