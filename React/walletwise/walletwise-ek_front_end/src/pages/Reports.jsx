import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Card, TextField, Button, Stack
} from '@mui/material';
import Chart from 'react-apexcharts';
import { FilterAlt, Download } from '@mui/icons-material';
import * as XLSX from 'xlsx'; // Make sure you have installed: npm install xlsx
import { useFinance } from '../context/FinanceContext';

export default function Reports() {
  const { incomes, expenses } = useFinance();
  const [dateRange, setDateRange] = useState({ start: '2026-04-01', end: '2026-04-30' });

  // ── EXCEL EXPORT LOGIC ──
  // I am converting the current saved data into a format Excel understands.
  const downloadExcel = () => {
    const reportData = [
      ...incomes.map(i => ({ Date: i.date, Description: i.source, Type: 'Income', Amount: i.amount })),
      ...expenses.map(e => ({ Date: e.date, Description: e.description, Type: 'Expense', Amount: e.spent }))
    ];

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Report");
    
    // This triggers the file download in the facilitator's browser
    XLSX.writeFile(workbook, `WalletWise_Report_${Date.now()}.xlsx`);
  };

  // ── CHART PREPARATION ──
  const barSeries = [
    { name: 'Income', data: [incomes.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0)] },
    { name: 'Expense', data: [expenses.reduce((acc, curr) => acc + parseFloat(curr.spent || 0), 0)] }
  ];

  const barOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    xaxis: { categories: ['Total Summary'] },
    colors: ['#084D4D', '#D32F2F'],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={900} color="#084D4D">Financial Reports</Typography>
        <Button 
          variant="outlined" 
          startIcon={<Download />} 
          onClick={downloadExcel}
          sx={{ color: '#084D4D', borderColor: '#084D4D', fontWeight: 'bold' }}
        >
          Download Report
        </Button>
      </Stack>

      <Card sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #eee' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={dateRange.start} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={dateRange.end} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button fullWidth variant="contained" startIcon={<FilterAlt />} sx={{ bgcolor: '#084D4D', py: 1.5 }}>Apply Filter</Button>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Visual Cashflow Breakdown</Typography>
            <Chart options={barOptions} series={barSeries} type="bar" height={350} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}