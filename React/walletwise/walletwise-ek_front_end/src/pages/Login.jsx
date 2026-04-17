import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Stack, Alert, 
  CircularProgress, Paper, Grid
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

// ── BRANDING CONSTANTS ──
const WW_THEME = {
  teal: '#0D6E6E',
  tealDark: '#094E4E',
  bg: '#F4F7F6'
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Consuming the login function from AuthContext

  // ── LOCAL STATE ──
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes dynamically for all fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── FORM SUBMISSION ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a brief delay for a professional "processing" feel
    setTimeout(() => {
      try {
        // 1. Fetch the registered users list from LocalStorage
        const rawData = localStorage.getItem('walletwise_users');
        const savedUsers = rawData ? JSON.parse(rawData) : [];

        // 2. SEARCH: Find the user with matching email and password
        // Using toLowerCase on email to prevent login failures due to capitalization
        const foundUser = savedUsers.find(
          (u) => u.email.toLowerCase() === formData.email.toLowerCase() && 
                 u.password === formData.password
        );

        if (foundUser) {
          // 3. INTEGRATION: Pass the whole user object to the Auth Provider
          login(foundUser); 
          // 4. NAVIGATION: Move to the dashboard once authenticated
          navigate('/dashboard');
        } else {
          // If no match, stop the spinner and show an error
          setError('Invalid credentials. Please check your email/password or Register.');
          setLoading(false);
        }
      } catch (err) {
        // Catch-all for unexpected code crashes
        console.error("Login Error Details:", err);
        setError('A system error occurred. Please clear your site data and try again.');
        setLoading(false);
      }
    }, 1000); 
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: WW_THEME.bg }}>
      <Grid container sx={{ flex: 1 }}>
        
        {/* LEFT PANEL: WELCOME MESSAGE */}
        <Grid item xs={12} md={6} sx={{ 
          bgcolor: WW_THEME.teal, color: 'white', display: 'flex', 
          flexDirection: 'column', justifyContent: 'center', p: { xs: 4, md: 8 } 
        }}>
          <Stack spacing={2}>
            <AccountBalanceWalletIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" fontWeight={900}>WalletWise</Typography>
            <Typography variant="h6" sx={{ opacity: 0.8 }}>
              Smart financial stewardship through integrated tracking.
            </Typography>
          </Stack>
        </Grid>

        {/* RIGHT PANEL: INTERACTIVE LOGIN FORM */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <Paper elevation={0} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 4, border: '1px solid #eee' }}>
            <Typography variant="h5" fontWeight={800} color={WW_THEME.teal} gutterBottom>
              Secure Sign-In
            </Typography>
            
            {/* Conditional Error Display */}
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your registered email"
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large" 
                  disabled={loading}
                  sx={{ 
                    bgcolor: WW_THEME.teal, 
                    py: 1.5, 
                    fontWeight: 'bold', 
                    '&:hover': { bgcolor: WW_THEME.tealDark } 
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
                </Button>
              </Stack>
            </form>

            <Typography variant="body2" textAlign="center" sx={{ mt: 4 }}>
              Don't have an account?{' '}
              <RouterLink to="/register" style={{ color: WW_THEME.teal, fontWeight: 'bold', textDecoration: 'none' }}>
                Register Here
              </RouterLink>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}