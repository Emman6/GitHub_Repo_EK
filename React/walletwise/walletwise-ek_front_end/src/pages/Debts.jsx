import React, { useState } from 'react';
import { 
  Box, Typography, Button, Grid, Card, Stack, 
  TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip 
} from '@mui/material';
import { Add, ReceiptLong, Person, CalendarToday, Delete } from '@mui/icons-material';
import { useFinance } from '../context/FinanceContext'; // Integrated Global State

export default function Debts() {
  // ── GLOBAL STATE ──
  // Pulling debt data and actions from the global context
  const { debts = [], addDebt, deleteDebt } = useFinance();
  
  const [open, setOpen] = useState(false);
  const [newDebt, setNewDebt] = useState({ lender: '', amount: '', dueDate: '', type: 'Owed to Me' });

  const handleSave = () => {
    if (!newDebt.lender || !newDebt.amount) return;
    
    addDebt({
      ...newDebt,
      id: Date.now(),
      status: 'Pending'
    });
    
    setOpen(false);
    setNewDebt({ lender: '', amount: '', dueDate: '', type: 'Owed to Me' });
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={900} color="#084D4D">Debts & IOUs</Typography>
          <Typography variant="body2" color="text.secondary">Track your liabilities and receivables</Typography>
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
          <Grid item xs={12} md={6} lg={4} key={debt.id}>
            <Card sx={{ p: 3, borderRadius: 4, position: 'relative', border: '1px solid #eee' }}>
              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Chip 
                  label={debt.type} 
                  size="small" 
                  sx={{ bgcolor: debt.type === 'Owed to Me' ? '#E8F5E9' : '#FFF3E0' }} 
                />
                <IconButton size="small" color="error" onClick={() => deleteDebt(debt.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Stack>
              
              <Typography variant="h6" fontWeight={800}>{debt.lender}</Typography>
              <Typography variant="h5" fontWeight={900} color="#084D4D" sx={{ my: 1 }}>
                UGX {parseFloat(debt.amount).toLocaleString()}
              </Typography>
              
              <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                <CalendarToday sx={{ fontSize: 16 }} />
                <Typography variant="caption">Due: {debt.dueDate}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Add Debt Record</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Name" fullWidth value={newDebt.lender} onChange={(e) => setNewDebt({...newDebt, lender: e.target.value})} />
          <TextField label="Amount" type="number" fullWidth value={newDebt.amount} onChange={(e) => setNewDebt({...newDebt, amount: e.target.value})} />
          <TextField label="Due Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newDebt.dueDate} onChange={(e) => setNewDebt({...newDebt, dueDate: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#084D4D' }}>Save Record</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}