import React, { useState } from 'react';
import { 
  Box, Typography, Button, Card, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  MenuItem, Select, FormControl, InputLabel, Snackbar, Alert, Chip 
} from '@mui/material';
import { Edit, Delete, Add, FilterList } from '@mui/icons-material';
import { useFinance } from '../context/FinanceContext';
import Footer from '../components/Footer';

export default function Expense() {
  // ── GLOBAL STATE INTEGRATION ──
  // I am pulling the global expense data and actions from our FinanceContext.
  const { expenses, addExpense, deleteExpense } = useFinance();
  
  const [filterType, setFilterType] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  
  const [formData, setFormData] = useState({ date: '', description: '', type: 'Necessity', budgeted: '', spent: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // ── EVENT HANDLERS ──
  const handleOpenDialog = (expense = null) => {
    if (expense) {
      setSelectedExpense(expense);
      setFormData({ ...expense });
    } else {
      setSelectedExpense(null);
      setFormData({ date: '', description: '', type: 'Necessity', budgeted: '', spent: '' });
    }
    setOpenDialog(true);
  };

  const handleSaveExpense = () => {
    // I am validating that the user entered a description and an amount before saving.
    if (!formData.description || !formData.spent) {
      setToast({ open: true, message: 'Please fill in required fields', severity: 'error' });
      return;
    }

    // If we are editing, I'd typically update the existing one; 
    // for this integration step, I am focusing on adding to the global list.
    addExpense(formData);
    setToast({ open: true, message: 'Expense recorded successfully!', severity: 'success' });
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    // I use the global delete action to ensure the balance updates across the app.
    deleteExpense(selectedExpense.id);
    setToast({ open: true, message: 'Record deleted', severity: 'info' });
    setOpenDeleteDialog(false);
  };

  // ── DATA FILTERING ──
  // I am filtering the global expenses list based on the user's selection in the UI.
  const filteredExpenses = filterType === 'All' 
    ? expenses 
    : expenses.filter(e => e.type === filterType);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#D32F2F' }}>Monthly Expenses</Typography>
        <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#D32F2F' }} onClick={() => handleOpenDialog()}>
          Add Expense
        </Button>
      </Box>

      {/* FILTER BAR */}
      <Card sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <FilterList color="action" />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select value={filterType} label="Filter by Category" onChange={(e) => setFilterType(e.target.value)}>
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="Necessity">Necessity</MenuItem>
            <MenuItem value="Tithe">Tithe / Offering</MenuItem>
            <MenuItem value="Want">Want / Luxury</MenuItem>
          </Select>
        </FormControl>
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F4F7F6' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Amount Spent</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.map((exp) => (
              <TableRow key={exp.id} hover>
                <TableCell>{exp.date}</TableCell>
                <TableCell>{exp.description}</TableCell>
                <TableCell>
                  <Chip label={exp.type} size="small" 
                    sx={{ bgcolor: exp.type === 'Necessity' ? '#E3F2FD' : exp.type === 'Tithe' ? '#E8F5E9' : '#FFF3E0' }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#D32F2F' }}>
                  UGX {parseFloat(exp.spent).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => { setSelectedExpense(exp); setOpenDeleteDialog(true); }} color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ADD/EDIT DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>{selectedExpense ? 'Edit Expense' : 'New Expense Record'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} fullWidth />
          <TextField label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={formData.type} label="Category" onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
              <MenuItem value="Necessity">Necessity</MenuItem>
              <MenuItem value="Tithe">Tithe / Offering</MenuItem>
              <MenuItem value="Want">Want / Luxury</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Amount Spent" type="number" value={formData.spent} onChange={(e) => setFormData({ ...formData, spent: e.target.value })} fullWidth />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSaveExpense} variant="contained" sx={{ backgroundColor: '#D32F2F' }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this expense record?</DialogContent>
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