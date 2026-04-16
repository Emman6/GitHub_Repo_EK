import React, { useState } from 'react';
import { Box, Typography, Card, Grid, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import Chart from 'react-apexcharts';
import Footer from '../Footer';

export default function Dashboard() {
  // STATE MANAGEMENT
  const [period, setPeriod] = useState('This Month');
  
  // Starting with a clean slate of 0 balance
  const [balance] = useState(0); 

  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev, 
      [field]: value 
    }));
  };

  // CLEAN STATE: Empty arrays mean the charts will show "No Data" until records are added
  const incomeSeries = [];
  const incomeOptions = {
    labels: [],
    colors: ['#0D6E6E', '#4CAF50', '#FF9800', '#E91E63'],
    legend: { position: 'bottom' },
    noData: { text: 'No income data recorded yet' }
  };

  const expenseSeries = [];
  const expenseOptions = {
    labels: [],
    colors: ['#C62828', '#FFB300'],
    legend: { position: 'bottom' },
    noData: { text: 'No expense data recorded yet' }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#0D6E6E' }}>
        Financial Dashboard
      </Typography>

      {/* FILTERS SECTION */}
      <Grid container spacing={2} sx={{ mb: 4 }} alignItems="center">
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Period</InputLabel>
            <Select value={period} label="Period" onChange={(e) => setPeriod(e.target.value)}>
              <MenuItem value="This Week">This Week</MenuItem>
              <MenuItem value="This Month">This Month</MenuItem>
              <MenuItem value="Custom">Custom Range</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {period === 'Custom' && (
          <>
            <Grid item xs={6} md={3}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={dateRange.start}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={dateRange.end}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* SUMMARY CARDS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Typography variant="subtitle2" color="textSecondary">Current Balance</Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold', color: '#0D6E6E' }}>
              UGX {balance.toLocaleString()}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Typography variant="subtitle2" color="textSecondary">Total Income</Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold', color: '#2E7D32' }}>
              UGX 0
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Typography variant="subtitle2" color="textSecondary">Total Expenditure</Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold', color: '#C62828' }}>
              UGX 0
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* CHARTS SECTION */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Income by Type</Typography>
            <Chart options={incomeOptions} series={incomeSeries} type="donut" width="100%" />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Expense by Type</Typography>
            <Chart options={expenseOptions} series={expenseSeries} type="donut" width="100%" />
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}