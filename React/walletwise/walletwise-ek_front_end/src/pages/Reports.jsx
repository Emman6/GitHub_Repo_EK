import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Card, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, TextField, Button
} from '@mui/material';
import Chart from 'react-apexcharts';
import { FilterAlt, Download } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import Footer from '../Footer';

export default function Reports() {
  const [dateRange, setDateRange] = useState({ start: '2026-03-01', end: '2026-03-31' });

  // CLEAN STATE: Extracted data starts as empty
  const incomeData = [];
  const expenseData = [];
  const debtData = [];

  const incomeSeries = incomeData.map(item => item.amount);
  const incomeLabels = incomeData.map(item => item.source);

  const expenseSeries = expenseData.map(item => item.amount);
  const expenseLabels = expenseData.map(item => item.category);

  // Grouped Bar chart empty setups
  const barSeries = [
    { name: 'Income', data: [] },
    { name: 'Expense', data: [] }
  ];

  const barOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    xaxis: { categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
    noData: { text: 'No transactional data within period.' }
  };

  const incomeOptions = {
    labels: incomeLabels,
    legend: { position: 'bottom' },
    noData: { text: 'No income recorded.' }
  };

  const expenseOptions = {
    labels: expenseLabels,
    legend: { position: 'bottom' },
    noData: { text: 'No expenses recorded.' }
  };

  // EXCEL EXPORT LOGIC
  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    
    const incWS = XLSX.utils.json_to_sheet(incomeData.length ? incomeData : [{ Message: 'No data' }]);
    XLSX.utils.book_append_sheet(wb, incWS, "Income");

    const expWS = XLSX.utils.json_to_sheet(expenseData.length ? expenseData : [{ Message: 'No data' }]);
    XLSX.utils.book_append_sheet(wb, expWS, "Expense");

    XLSX.writeFile(wb, `Financial_Report_${dateRange.start}_to_${dateRange.end}.xlsx`);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0D6E6E' }}>Financial Reports</Typography>
        <Button variant="outlined" startIcon={<Download />} onClick={handleExportExcel}>
          Export to Excel
        </Button>
      </Box>

      {/* FILTER BAR */}
      <Card sx={{ p: 2, mb: 4, display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <FilterAlt color="action" />
        <TextField label="Start Date" type="date" size="small" InputLabelProps={{ shrink: true }} value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
        <TextField label="End Date" type="date" size="small" InputLabelProps={{ shrink: true }} value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
        <Button variant="contained" sx={{ backgroundColor: '#0D6E6E' }}>Generate Report</Button>
      </Card>

      {/* SUMMARY TABLE */}
      <TableContainer component={Paper} sx={{ mb: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Metric</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover><TableCell>Total Income</TableCell><TableCell align="right" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>UGX 0</TableCell></TableRow>
            <TableRow hover><TableCell>Total Expense</TableCell><TableCell align="right" sx={{ color: '#C62828', fontWeight: 'bold' }}>UGX 0</TableCell></TableRow>
            <TableRow hover sx={{ backgroundColor: '#ffebee' }}><TableCell sx={{ fontWeight: 'bold' }}>Total Active Debt</TableCell><TableCell align="right" sx={{ color: '#c62828', fontWeight: 'bold' }}>UGX 0</TableCell></TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* CHARTS */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Income vs Expense by Type</Typography>
            <Chart options={barOptions} series={barSeries} type="bar" height={350} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Income Breakdown</Typography>
            <Chart options={incomeOptions} series={incomeSeries} type="donut" width="100%" />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Expense Breakdown</Typography>
            <Chart options={expenseOptions} series={expenseSeries} type="donut" width="100%" />
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}