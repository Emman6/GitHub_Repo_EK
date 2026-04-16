import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Avatar } from '@mui/material';
import { Dashboard as DashboardIcon, AttachMoney, CreditCard, AccountBalance, Assessment, People, ExitToApp, Alarm } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Hooking into the global auth state

export default function ModernLayout({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth(); // 2. Extract user data safely

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Income', icon: <AttachMoney />, path: '/income' },
    { text: 'Expense', icon: <CreditCard />, path: '/expense' },
    { text: 'Debts', icon: <Alarm />, path: '/debts' }, 
    { text: 'Balance', icon: <AccountBalance />, path: '/balance' },
    { text: 'Reports', icon: <Assessment />, path: '/reports' },
    { text: 'Users', icon: <People />, path: '/users' },
  ];

  const drawerWidth = 240;

  // EVENT HANDLER: Logic executed when Logout is clicked
  const handleLogout = () => {
    console.log("User logged out");
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* SIDEBAR NAVIGATION DRAWER */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#0A3B3B', 
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          },
        }}
      >
        <Box>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              WalletWise
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Stewardship & Finance
            </Typography>
          </Box>
          
          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

          {/* 3. NEW AVATAR AND USERNAME PLACEMENT */}
          {/* This places the logged in individual in authority over their dashboard UI */}
          <Box sx={{ px: 2, pb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ bgcolor: '#0D6E6E', border: '2px solid rgba(255,255,255,0.2)' }}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {user?.email || 'Active User'}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>
                Role: {user?.role || 'User'}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
          
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  onClick={() => navigate(item.path)}
                  sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Bottom Section: Logout Button */}
        <Box>
          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton 
                onClick={handleLogout}
                sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* MAIN CONTENT AREA */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, backgroundColor: '#F4F6F8', overflowY: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
}