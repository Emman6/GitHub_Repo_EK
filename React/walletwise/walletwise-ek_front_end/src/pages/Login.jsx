import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Link, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import Footer from '../Footer'; //  Keep this here at the very top

export default function Login() {
  const navigate = useNavigate();
  
  // 1. CONSUMING THE AUTH CONTEXT
  const { login } = useAuth(); 

  // 2. LOCAL STATE MANAGEMENT
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Event handler to update the state object dynamically based on the input's "name" attribute
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. FORM SUBMISSION HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Logging in with:', formData);
    
    // MOCK API CALL: Simulating a JWT token response from a real backend.
    const mockJWTToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...mock_token";
    
    // Pass both the token and the email
    login(mockJWTToken, formData.email);
    
    navigate('/dashboard');
  };

  return (
    <Grid container sx={{ height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f6f8' }}>
      <Grid item xs={11} sm={8} md={5} lg={4}>
        <Card sx={{ p: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 3 }}>
          <Typography variant="h4" align="center" sx={{ color: '#0D6E6E', fontWeight: 'bold', mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 4 }}>
            Please sign in to continue to WalletWise
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* EMAIL FIELD */}
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
            
            {/* PASSWORD FIELD */}
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            
            {/* SUBMIT BUTTON */}
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ backgroundColor: '#0D6E6E', '&:hover': { backgroundColor: '#0A5555' }, mb: 2 }}
            >
              Sign In
            </Button>
          </form>

          {/* REDIRECTION LINK */}
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link 
              component="button" 
              variant="body2" 
              onClick={() => navigate('/register')}
              sx={{ color: '#0D6E6E', fontWeight: 'bold', textDecoration: 'none' }}
            >
              Register here
            </Link>
          </Typography>
        </Card>
      </Grid>
      <Footer />
    </Grid>
  );
}