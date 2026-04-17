import React, { useState } from 'react';
import { 
  Box, Typography, Button, Grid, Card, Stack, 
  IconButton, Chip, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, Paper 
} from '@mui/material';
import { Add, ReceiptLong, Person, CalendarToday, Delete } from '@mui/icons-material';
import { useFinance } from '../context/FinanceContext';

export default function Debts() {
  // I am pulling from a global context (if you have it set up) or local state
  const [debts, setDebts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newDebt, setNewDebt] = useState({ lender: '', amount: '', dueDate: '', type: 'Owed to Me' });

  // I use this to save a new debt record
  const handleSave = () => {
    setDebts([...debts, { ...newDebt, id: Date.now(), status: 'Pending' }]);
    setOpen(false);
    setNewDebt({ lender: '', amount: '', dueDate: '', type: 'Owed to Me' });
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={900} color="#084D4D">Debts & IOUs</Typography>
          <Typography variant="body2" color="text.secondary">Track money you owe and money owed to you</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => setOpen(true)}
          sx={{ bgcolor: '#084D4D', borderRadius: 2 }}
        >
          Add Record
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {debts.map((debt) => (
          <Grid item xs={12} md={6} key={debt.id}>
            <Card sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)' }}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                  <Box sx={{ p: 1.5, bgcolor: '#F4F7F6', borderRadius: 3 }}>
                    <Person sx={{ color: '#084D4D' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={800}>{debt.lender}</Typography>
                    <Chip 
                      label={debt.type} 
                      size="small" 
                      color={debt.type === 'Owed to Me' ? 'success' : 'error'} 
                      sx={{ fontWeight: 'bold', fontSize: '10px' }}
                    />
                  </Box>
                </Stack>
                <Typography variant="h6" fontWeight={900} color="#084D4D">
                  UGX {parseFloat(debt.amount).toLocaleString()}
                </Typography>
              </Stack>
              <Stack direction="row" mt={2} alignItems="center" spacing={1} color="text.secondary">
                <CalendarToday fontSize="small" />
                <Typography variant="caption">Due: {debt.dueDate}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Form Dialog for New Debt */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Debt Record</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField 
            label="Person/Entity Name" 
            fullWidth 
            value={newDebt.lender}
            onChange={(e) => setNewDebt({...newDebt, lender: e.target.value})}
          />
          <TextField 
            label="Amount" 
            type="number" 
            fullWidth 
            value={newDebt.amount}
            onChange={(e) => setNewDebt({...newDebt, amount: e.target.value})}
          />
          <TextField 
            label="Due Date" 
            type="date" 
            fullWidth 
            InputLabelProps={{ shrink: true }}
            value={newDebt.dueDate}
            onChange={(e) => setNewDebt({...newDebt, dueDate: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#084D4D' }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}