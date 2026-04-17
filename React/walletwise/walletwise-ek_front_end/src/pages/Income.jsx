import React, { useState } from 'react';
import { Box, Typography, Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useFinance } from '../context/FinanceContext'; // I am hooking into the central brain

export default function Income() {
  // I am pulling the shared data and the 'add' function from our Context
  const { incomes, addIncome } = useFinance();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ date: '', source: '', amount: '' });

  const handleSave = () => {
    // I am sending the data to the central context so Dashboard can see it too
    addIncome({ ...formData, amount: parseFloat(formData.amount) });
    setOpen(false);
    setFormData({ date: '', source: '', amount: '' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Income Records</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} sx={{ bgcolor: '#0D6E6E' }}>
          Add Income
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Source</TableCell>
              <TableCell align="right">Amount (UGX)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* I am now mapping through the GLOBAL incomes list */}
            {incomes.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.source}</TableCell>
                <TableCell align="right">{row.amount.toLocaleString()}</TableCell>
              </TableRow>
            ))}
            {incomes.length === 0 && (
              <TableRow><TableCell colSpan={3} align="center">No data found. Click 'Add Income' to begin.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Entry Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Record New Income</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField type="date" fullWidth value={formData.date} onChange={(e)=>setFormData({...formData, date: e.target.value})} />
          <TextField label="Source" fullWidth value={formData.source} onChange={(e)=>setFormData({...formData, source: e.target.value})} />
          <TextField label="Amount" type="number" fullWidth value={formData.amount} onChange={(e)=>setFormData({...formData, amount: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#0D6E6E' }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}