import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, 
  FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import Chart from 'react-apexcharts';
import { AccountBalanceWallet } from '@mui/icons-material';
import Footer from '../Footer';

export default function Balance() {
  // CLEAN STATE: No snapshots stored yet
  const [balanceHistory] = useState([]);

  // Mock data simulation for last 30 daily snapshots is kept empty
  const trendSeries = [{ name: 'Balance', data: [] }];

  const trendOptions = {
    chart: { type: 'area', toolbar: { show: false } },
    colors: ['#0D6E6E'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    noData: { text: 'No daily balance snapshots generated yet.' }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0D6E6E', mb: 3 }}>
        Account Balance & Trend
      </Typography>

      {/* TOP CARDS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <AccountBalanceWallet sx={{ fontSize: 50, color: '#0D6E6E', mr: 2 }} />
            <Box>
              <Typography variant="subtitle2" color="textSecondary">Current Live Balance</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0D6E6E' }}>UGX 0</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* CHART SECTION */}
      <Card sx={{ p: 3, mb: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Last 30 Days Balance Trend</Typography>
        <Chart options={trendOptions} series={trendSeries} type="area" height={300} />
      </Card>

      {/* SNAPSHOT HISTORY TABLE */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Balance Snapshot History</Typography>
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Snapshot Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Recorded Balance</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Snapshot Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  No historical snapshots recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              balanceHistory.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.date}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>UGX {row.amount.toLocaleString()}</TableCell>
                  <TableCell>{row.type}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </Box>
  );
}