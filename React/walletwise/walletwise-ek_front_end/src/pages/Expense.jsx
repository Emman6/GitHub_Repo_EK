import React, { useState } from 'react';
import { 
  Box, Typography, Button, Card, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  MenuItem, Select, FormControl, InputLabel, Snackbar, Alert, Chip 
} from '@mui/material';
import { Edit, Delete, Add, FilterList } from '@mui/icons-material';
import Footer from '../Footer';

export default function Expense() {
  // CLEAN STATE: Initialized as an empty array
  const [expenses, setExpenses] = useState([]);
  const [filterType, setFilterType] = useState('All');
  
  // Dialog States
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  
  const [formData, setFormData] = useState({ date: '', description: '', type: 'Necessity', budgeted: '', spent: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // EVENT HANDLERS
  const handleOpenDialog = (expense = null) => {
    if (expense) {
      setSelectedExpense(expense);
      setFormData({ 
        date: expense.date, 
        description: expense.description, 
        type: expense.type, 
        budgeted: expense.budgeted.toString(), 
        spent: expense.spent.toString() 
      });
    } else {
      setSelectedExpense(null);
      setFormData({ date: '', description: '', type: 'Necessity', budgeted: '', spent: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ date: '', description: '', type: 'Necessity', budgeted: '', spent: '' });
  };

  const handleSaveExpense = () => {
    if (!formData.date || !formData.description || !formData.spent) {
      setToast({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
      return;
    }

    const budgetedNum = formData.budgeted ? parseFloat(formData.budgeted) : 0;
    const spentNum = parseFloat(formData.spent);

    if (selectedExpense) {
      setExpenses(expenses.map(item => item.id === selectedExpense.id ? { ...item, ...formData, budgeted: budgetedNum, spent: spentNum } : item));
      setToast({ open: true, message: 'Expense record updated!', severity: 'success' });
    } else {
      const newExpense = { id: Date.now(), ...formData, budgeted: budgetedNum, spent: spentNum };
      setExpenses([...expenses, newExpense]);
      setToast({ open: true, message: 'Expense recorded successfully!', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleOpenDelete = (expense) => {
    setSelectedExpense(expense);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setExpenses(expenses.filter(item => item.id !== selectedExpense.id));
    setOpenDeleteDialog(false);
    setToast({ open: true, message: 'Expense record deleted!', severity: 'info' });
  };

  const filteredExpenses = filterType === 'All' ? expenses : expenses.filter(exp => exp.type === filterType);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#D32F2F' }}>Expense Tracker</Typography>
        <Button variant="contained" startIcon={<Add />} sx={{ backgroundColor: '#D32F2F', '&:hover': { backgroundColor: '#B71C1C' } }} onClick={() => handleOpenDialog()}>
          Add Expense
        </Button>
      </Box>

      {/* FILTER BAR */}
      <Card sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <FilterList color="action" />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select value={filterType} label="Filter by Type" onChange={(e) => setFilterType(e.target.value)}>
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Necessity">Necessity</MenuItem>
            <MenuItem value="Luxury">Luxury</MenuItem>
          </Select>
        </FormControl>
      </Card>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Budgeted (UGX)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Spent (UGX)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  No expenses recorded. Click 'Add Expense' to get started.
                </TableCell>
              </TableRow>
            ) : (
              filteredExpenses.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.budgeted ? row.budgeted.toLocaleString() : 'N/A'}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#C62828' }}>{row.spent.toLocaleString()}</TableCell>
                  <TableCell>
                    {row.budgeted && row.spent > row.budgeted ? (
                      <Chip label="Overspent" color="error" size="small" />
                    ) : (
                      <Chip label="Within Budget" color="success" size="small" />
                    )}
                  </TableCell>
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
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>{selectedExpense ? 'Edit Expense Record' : 'Add New Expense'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} fullWidth />
          <TextField label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={formData.type} label="Type" onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
              <MenuItem value="Necessity">Necessity</MenuItem>
              <MenuItem value="Luxury">Luxury</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Budgeted Amount (Optional)" type="number" value={formData.budgeted} onChange={(e) => setFormData({ ...formData, budgeted: e.target.value })} fullWidth />
          <TextField label="Amount Spent" type="number" value={formData.spent} onChange={(e) => setFormData({ ...formData, spent: e.target.value })} fullWidth />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
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