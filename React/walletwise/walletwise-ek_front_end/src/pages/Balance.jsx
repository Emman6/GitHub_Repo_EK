import React from 'react';
import { 
  Box, Typography, Grid, Card, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, Chip 
} from '@mui/material';
import Chart from 'react-apexcharts';
import { AccountBalanceWallet, TrendingUp, TrendingDown } from '@mui/icons-material';
import { useFinance } from '../context/FinanceContext';
import Footer from '../components/Footer';

export default function Balance() {
  // ── GLOBAL DATA ACCESS ──
  // I am importing the live data and calculated totals from our FinanceContext.
  // This ensures the numbers here match the Dashboard and Sidebar exactly.
  const { incomes, expenses, totalIncome, totalExpense, totalBalance } = useFinance();

  // ── CHART LOGIC ──
  // I am preparing the data for the trend chart. 
  // For now, I am showing a simple comparison between total earnings and total spending.
  const trendSeries = [
    { name: 'Income', data: [totalIncome] },
    { name: 'Expenses', data: [totalExpense] }
  ];

  const trendOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    colors: ['#0D6E6E', '#D32F2F'], // Teal for income, Red for expenses
    plotOptions: { bar: { borderRadius: 4, columnWidth: '40%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Current Period'] },
    // I am setting a "No Data" message in case the user hasn't recorded anything yet.
    noData: { 
      text: 'No transactions recorded yet to display trend.',
      style: { color: '#0D6E6E', fontSize: '16px' }
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0D6E6E', mb: 3 }}>
        Financial Health Overview
      </Typography>

      {/* ── TOP STATS SECTION ── */}
      {/* I am using a Grid to display the primary balance figures as high-visibility cards. */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#E0F2F1' }}>
            <AccountBalanceWallet sx={{ fontSize: 40, color: '#0D6E6E' }} />
            <Box>
              <Typography variant="subtitle2" color="textSecondary">Net Live Balance</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0D6E6E' }}>
                UGX {totalBalance.toLocaleString()}
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <TrendingUp sx={{ fontSize: 40, color: '#2E7D32' }} />
            <Box>
              <Typography variant="subtitle2" color="textSecondary">Total Earnings</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                UGX {totalIncome.toLocaleString()}
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <TrendingDown sx={{ fontSize: 40, color: '#D32F2F' }} />
            <Box>
              <Typography variant="subtitle2" color="textSecondary">Total Spending</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                UGX {totalExpense.toLocaleString()}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* ── VISUAL TRENDS ── */}
      {/* I am rendering a bar chart here to give the user a visual scale of their finances. */}
      <Card sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Income vs. Expense Ratio</Typography>
        <Chart options={trendOptions} series={trendSeries} type="bar" height={300} />
      </Card>

      {/* ── TRANSACTION LEDGER ── */}
      {/* I have combined income and expense data into one "Recent Activity" table.
          This helps the user see their financial flow in chronological order. */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Recent Activity Snapshot</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description / Source</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* I am merging both arrays and sorting them by date to show the most recent first. */}
            {[...incomes, ...expenses]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 10) // Only showing the 10 most recent for the snapshot
              .map((item, index) => (
                <TableRow key={item.id || index} hover>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.source || item.description}</TableCell>
                  <TableCell>
                    <Chip 
                      label={item.source ? "Income" : "Expense"} 
                      size="small"
                      sx={{ 
                        bgcolor: item.source ? '#E8F5E9' : '#FFEBEE', 
                        color: item.source ? '#2E7D32' : '#C62828',
                        fontWeight: 'bold'
                      }} 
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: item.source ? '#2E7D32' : '#C62828' }}>
                    {item.source ? '+' : '-'} UGX {parseFloat(item.amount || item.spent).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            
            {incomes.length === 0 && expenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  Your ledger is currently empty. Add records in the Income or Expense tabs.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Footer />
    </Box>
  );
}