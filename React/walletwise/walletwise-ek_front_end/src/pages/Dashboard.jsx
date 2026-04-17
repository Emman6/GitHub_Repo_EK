import React from 'react';
import { Box, Grid, Card, Typography, Stack, Divider, List, ListItem, ListItemText } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalanceWallet, History } from '@mui/icons-material';
import { useFinance } from '../context/FinanceContext'; 

export default function Dashboard() {
  const { totalIncome, totalExpense, totalBalance, incomes, expenses } = useFinance();

  // I am combining and sorting recent activities to show on the dashboard
  const recentActivities = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 900, color: '#084D4D' }}>
        Financial Overview
      </Typography>

      <Grid container spacing={3}>
        {/* TOP METRICS */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 4, bgcolor: '#084D4D', color: 'white', boxShadow: '0 8px 16px rgba(8,77,77,0.2)' }}>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Current Balance</Typography>
                <Typography variant="h4" fontWeight={900}>UGX {totalBalance.toLocaleString()}</Typography>
              </Box>
              <AccountBalanceWallet sx={{ fontSize: 40, opacity: 0.3 }} />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #e0e0e0' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ p: 1, bgcolor: '#e8f5e9', borderRadius: 2 }}><TrendingUp sx={{ color: '#2e7d32' }} /></Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Total Income</Typography>
                <Typography variant="h5" fontWeight={800} color="#2e7d32">+ UGX {totalIncome.toLocaleString()}</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #e0e0e0' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ p: 1, bgcolor: '#ffebee', borderRadius: 2 }}><TrendingDown sx={{ color: '#c62828' }} /></Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Total Expenses</Typography>
                <Typography variant="h5" fontWeight={800} color="#c62828">- UGX {totalExpense.toLocaleString()}</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* RECENT ACTIVITY SECTION */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #e0e0e0' }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <History color="action" />
              <Typography variant="h6" fontWeight={700}>Recent Activity</Typography>
            </Stack>
            <Divider />
            <List>
              {recentActivities.map((item, index) => (
                <ListItem key={index} divider={index !== recentActivities.length - 1}>
                  <ListItemText 
                    primary={item.description || item.source} 
                    secondary={item.date} 
                  />
                  <Typography 
                    fontWeight={700} 
                    color={item.spent ? '#c62828' : '#2e7d32'}
                  >
                    {item.spent ? '-' : '+'} UGX {(item.spent || item.amount).toLocaleString()}
                  </Typography>
                </ListItem>
              ))}
              {recentActivities.length === 0 && (
                <Typography sx={{ py: 2, textAlign: 'center', color: 'text.secondary' }}>
                  No recent transactions found.
                </Typography>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}