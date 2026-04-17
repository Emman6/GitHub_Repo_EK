import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Stack, Avatar, Box, Divider } from '@mui/material';
import { Logout, NotificationsNone, Settings } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Navigation hook initialized

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', color: '#333', borderBottom: '1px solid #eee' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton size="small"><NotificationsNone /></IconButton>
          
          {/* I have linked the gear icon to the Profile page and removed Profile from Sidebar */}
          <IconButton size="small" onClick={() => navigate('/profile')}>
            <Settings />
          </IconButton>
          
          <Divider orientation="vertical" flexItem />
          
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Admin User</Typography>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#084D4D', fontSize: '14px' }}>A</Avatar>
          
          <IconButton color="error" onClick={logout} size="small">
            <Logout />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}