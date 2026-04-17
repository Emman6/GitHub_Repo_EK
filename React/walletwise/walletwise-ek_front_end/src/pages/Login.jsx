import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Stack, Alert, 
  CircularProgress, Paper, Divider, Grid
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

// ── DESIGN SYSTEM ──
const WW = {
  teal: '#0D6E6E',
  tealDark: '#094E4E',
  tealLight: '#E0F2F1',
  white: '#FFFFFF',
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  // ── STATE MANAGEMENT ──
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── LOGIN LOGIC (LOCALSTORAGE APPROACH) ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // I am simulating a network delay to make the UI feel realistic
    setTimeout(() => {
      // 1. Retrieve the users registered via the Register.jsx page
      const savedUsers = JSON.parse(localStorage.getItem('walletwise_users') || '[]');

      // 2. Search for a user with matching email and password
      const userMatch = savedUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (userMatch) {
        // SUCCESS: Passing the user data to our global AuthContext
        login(userMatch);
        navigate('/dashboard');
      } else if (formData.email === 'admin@wallet.com' && formData.password === 'admin123') {
        // FALLBACK: Hardcoded admin for your testing convenience
        login({ username: 'Admin User', email: 'admin@wallet.com', role: 'Admin' });
        navigate('/dashboard');
      } else {
        // FAILURE: Show error if no match is found on the "disk"
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      }
    }, 1000); 
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F4F7F6' }}>
      <Grid container sx={{ flex: 1 }}>
        {/* LEFT SIDE: BRANDING & WELCOME */}
        <Grid item xs={12} md={6} sx={{ 
          bgcolor: WW.teal, color: 'white', display: 'flex', 
          flexDirection: 'column', justifyContent: 'center', p: { xs: 4, md: 8 } 
        }}>
          <Stack spacing={2} alignItems="flex-start">
            <AccountBalanceWalletIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" fontWeight={900}>WalletWise</Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, maxWidth: 450 }}>
              Master your finances with our integrated tracking system.
            </Typography>
            <Box sx={{ mt: 4 }}>
              {['Real-time tracking', 'Detailed reports', 'Secure local storage'].map((text) => (
                <Typography key={text} variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  • {text}
                </Typography>
              ))}
            </Box>
          </Stack>
        </Grid>

        {/* RIGHT SIDE: LOGIN FORM */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <Paper elevation={0} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 4, border: '1px solid #eee' }}>
            <Typography variant="h5" fontWeight={800} mb={1} color={WW.teal}>Welcome Back</Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>Enter your credentials to access your dashboard</Typography>

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
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: WW.teal, opacity: 0.7 }} />
                  }}
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1, color: WW.teal, opacity: 0.7 }} />
                  }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large" 
                  disabled={loading}
                  sx={{ bgcolor: WW.teal, py: 1.5, borderRadius: 2, fontWeight: 'bold', '&:hover': { bgcolor: WW.tealDark } }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>
              </Stack>
            </form>

            <Divider sx={{ my: 4 }}>
              <Typography variant="caption" color="text.secondary">OR</Typography>
            </Divider>

            <Typography variant="body2" textAlign="center">
              New to the system?{' '}
              <RouterLink to="/register" style={{ color: WW.teal, fontWeight: 'bold', textDecoration: 'none' }}>
                Register here
              </RouterLink>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}