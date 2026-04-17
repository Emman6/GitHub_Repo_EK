import React from 'react';
import { 
  Box, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, Typography, Divider 
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  AccountBalanceWallet, 
  AddCircleOutline, 
  RemoveCircleOutline, 
  Assessment,
  ReceiptLong,   
  People,        
  BarChart,
  AccountBalance 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // I have removed 'Profile' from this list as it is now accessible via the Settings gear
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Accounts', icon: <AccountBalanceWallet />, path: '/accounts' },
    { text: 'Income', icon: <AddCircleOutline />, path: '/income' },
    { text: 'Expenses', icon: <RemoveCircleOutline />, path: '/expense' },
    { text: 'Reports', icon: <BarChart />, path: '/reports' },
    { text: 'Debts', icon: <ReceiptLong />, path: '/debts' },
    { text: 'Balance', icon: <AccountBalance />, path: '/balance' }, 
    { text: 'Users', icon: <People />, path: '/users' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box', 
          bgcolor: '#084D4D', 
          color: 'white' 
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>WALLETWISE</Typography>
      </Box>
      
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => navigate(item.path)}
              sx={{
                bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.15)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}