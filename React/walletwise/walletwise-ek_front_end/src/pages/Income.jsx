import React, { useState } from 'react';
import { 
  Box, Typography, Button, Card, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  MenuItem, Select, FormControl, InputLabel, Snackbar, Alert 
} from '@mui/material';
import { Edit, Delete, Add, FilterList } from '@mui/icons-material';
import Footer from '../Footer';

export default function Income() {
  // CLEAN STATE: Initialized as an empty array
  const [incomes, setIncomes] = useState([]);
  const [filterType, setFilterType] = useState('All');
  
  // Dialog States
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  
  const [formData, setFormData] = useState({ date: '', source: '', type: 'Salary', amount: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // EVENT HANDLERS
  const handleOpenDialog = (income = null) => {
    if (income) {
      setSelectedIncome(income);
      setFormData({ date: income.date, source: income.source, type: income.type, amount: income.amount.toString() });
    } else {
      setSelectedIncome(null);
      setFormData({ date: '', source: '', type: 'Salary', amount: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ date: '', source: '', type: 'Salary', amount: '' });
  };

  const handleSaveIncome = () => {
    if (!formData.date || !formData.source || !formData.amount) {
      setToast({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
      return;
    }

    const amountNum = parseFloat(formData.amount);

    if (selectedIncome) {
      // Edit existing record
      setIncomes(incomes.map(item => item.id === selectedIncome.id ? { ...item, ...formData, amount: amountNum } : item));
      setToast({ open: true, message: 'Income record updated successfully!', severity: 'success' });
    } else {
      // Add new record
      const newIncome = { id: Date.now(), ...formData, amount: amountNum };
      setIncomes([...incomes, newIncome]);
      setToast({ open: true, message: 'New income added successfully!', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleOpenDelete = (income) => {
    setSelectedIncome(income);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setIncomes(incomes.filter(item => item.id !== selectedIncome.id));
    setOpenDeleteDialog(false);
    setToast({ open: true, message: 'Income record deleted!', severity: 'info' });
  };

  const filteredIncomes = filterType === 'All' ? incomes : incomes.filter(inc => inc.type === filterType);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0D6E6E' }}>Income Manager</Typography>
        <Button variant="contained" startIcon={<Add />} sx={{ backgroundColor: '#0D6E6E' }} onClick={() => handleOpenDialog()}>
          Add Income
        </Button>
      </Box>

      {/* FILTER BAR */}
      <Card sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <FilterList color="action" />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select value={filterType} label="Filter by Type" onChange={(e) => setFilterType(e.target.value)}>
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Gigs">Gigs</MenuItem>
            <MenuItem value="Gifts">Gifts</MenuItem>
          </Select>
        </FormControl>
      </Card>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Source</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIncomes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  No income records found. Click 'Add Income' to get started.
                </TableCell>
              </TableRow>
            ) : (
              filteredIncomes.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.source}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>UGX {row.amount.toLocaleString()}</TableCell>
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

      {/* ADD/EDIT DIALOG */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>{selectedIncome ? 'Edit Income Record' : 'Add New Income'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} fullWidth />
          <TextField label="Income Source" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={formData.type} label="Type" onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Gigs">Gigs</MenuItem>
              <MenuItem value="Gifts">Gifts</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Amount (UGX)" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} fullWidth />
          
          {formData.amount && (
            <Typography variant="body2" sx={{ color: '#0D6E6E', fontStyle: 'italic', mt: 1 }}>
              Calculated Tithe (10%): UGX {(parseFloat(formData.amount) * 0.1).toLocaleString()}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
          <Button onClick={handleSaveIncome} variant="contained" sx={{ backgroundColor: '#0D6E6E' }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this income record?</DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* TOAST */}
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={toast.severity} sx={{ width: '100%' }}>{toast.message}</Alert>
      </Snackbar>
      <Footer />
    </Box>
  );
}