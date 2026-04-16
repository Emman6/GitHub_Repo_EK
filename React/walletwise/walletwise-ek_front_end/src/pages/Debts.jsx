import React, { useState } from 'react';
import { 
  Box, Typography, Button, Card, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  Snackbar, Alert, Chip 
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Footer from '../Footer';

export default function Debts() {
  // CLEAN STATE: Initialized as an empty array
  const [debts, setDebts] = useState([]);

  // Dialog States
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);
  
  const [formData, setFormData] = useState({ creditor: '', source: '', amount: '', paybackPeriod: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // EVENT HANDLERS
  const handleOpenDialog = (debt = null) => {
    if (debt) {
      setSelectedDebt(debt);
      setFormData({ creditor: debt.creditor, source: debt.source, amount: debt.amount.toString(), paybackPeriod: debt.paybackPeriod });
    } else {
      setSelectedDebt(null);
      setFormData({ creditor: '', source: '', amount: '', paybackPeriod: '' });
    }
    setOpenDialog(true);
  };

  const handleSaveDebt = () => {
    if (!formData.creditor || !formData.amount) {
      setToast({ open: true, message: 'Please fill in required fields.', severity: 'error' });
      return;
    }

    const amountNum = parseFloat(formData.amount);

    if (selectedDebt) {
      setDebts(debts.map(item => item.id === selectedDebt.id ? { ...item, ...formData, amount: amountNum } : item));
      setToast({ open: true, message: 'Debt updated successfully!', severity: 'success' });
    } else {
      const newDebt = { id: Date.now(), ...formData, amount: amountNum, status: 'Active' };
      setDebts([...debts, newDebt]);
      setToast({ open: true, message: 'New debt record added!', severity: 'success' });
    }
    setOpenDialog(false);
  };

  const handleOpenDelete = (debt) => {
    setSelectedDebt(debt);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setDebts(debts.filter(item => item.id !== selectedDebt.id));
    setOpenDeleteDialog(false);
    setToast({ open: true, message: 'Debt record deleted!', severity: 'info' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#C62828' }}>Debt Management</Typography>
        <Button variant="contained" startIcon={<Add />} sx={{ backgroundColor: '#C62828' }} onClick={() => handleOpenDialog()}>
          Add Debt Record
        </Button>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Creditor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Source/Reason</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Payback Period</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {debts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  No debt records found. Click 'Add Debt Record' to record any liabilities.
                </TableCell>
              </TableRow>
            ) : (
              debts.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.creditor}</TableCell>
                  <TableCell>{row.source}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#C62828' }}>UGX {row.amount.toLocaleString()}</TableCell>
                  <TableCell>{row.paybackPeriod}</TableCell>
                  <TableCell><Chip label={row.status} color="error" size="small" /></TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpenDialog(row)}><Edit size="small" /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDelete(row)}><Delete size="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>{selectedDebt ? 'Edit Debt Record' : 'Add New Debt'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Creditor" value={formData.creditor} onChange={(e) => setFormData({ ...formData, creditor: e.target.value })} fullWidth />
          <TextField label="Source/Reason" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} fullWidth />
          <TextField label="Amount Borrowed" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} fullWidth />
          <TextField label="Payback Period (e.g. 6 Months)" value={formData.paybackPeriod} onChange={(e) => setFormData({ ...formData, paybackPeriod: e.target.value })} fullWidth />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSaveDebt} variant="contained" sx={{ backgroundColor: '#C62828' }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* DELETE DIALOG */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Delete Record</DialogTitle>
        <DialogContent>Are you sure you want to delete this debt record?</DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={toast.severity} sx={{ width: '100%' }}>{toast.message}</Alert>
      </Snackbar>
      <Footer />
    </Box>
  );
}