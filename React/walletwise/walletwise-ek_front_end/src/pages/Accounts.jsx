import React, { useState } from 'react';
import { 
  Box, Typography, Button, Grid, Card, Stack, 
  IconButton, TextField, InputAdornment, 
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { AddCircleOutline, AccountBalance, Smartphone, Payments, Search } from '@mui/icons-material';
import { useFinance } from '../context/FinanceContext'; // Integrated Global State

export default function Accounts() {
  // ── GLOBAL STATE ──
  // I am pulling the accounts and the add function from our global provider
  const { accounts = [], addAccount, incomes, addIncome } = useFinance();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [newAcc, setNewAcc] = useState({ name: '', type: 'bank', balance: '' });

  const handleSave = () => {
    if (!newAcc.name || !newAcc.balance) return;

    const accountId = Date.now();
    
    // 1. Add to the Accounts list
    addAccount({
      id: accountId,
      name: newAcc.name,
      type: newAcc.type,
      balance: parseFloat(newAcc.balance),
    });

    // 2. Integration: We count the initial balance as a starting 'Income' record
    // so it shows up in your total balance calculations.
    addIncome({
      id: `init-${accountId}`,
      date: new Date().toISOString().split('T')[0],
      source: `Initial Deposit: ${newAcc.name}`,
      amount: parseFloat(newAcc.balance),
      category: 'Initial Balance'
    });

    setOpen(false);
    setNewAcc({ name: '', type: 'bank', balance: '' });
  };

  const filteredAccounts = accounts.filter(acc => 
    acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={900} color="#084D4D">Financial Sources</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddCircleOutline />} 
          onClick={() => setOpen(true)}
          sx={{ bgcolor: '#084D4D', borderRadius: 2, px: 3 }}
        >
          Add Source
        </Button>
      </Stack>

      <TextField
        placeholder="Search accounts..."
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4, bgcolor: 'white' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {filteredAccounts.map((acc) => (
          <Grid item xs={12} sm={6} md={4} key={acc.id}>
            <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #eee' }}>
              <Typography variant="caption" sx={{ textTransform: 'uppercase', color: 'text.disabled', fontWeight: 700 }}>
                {acc.type}
              </Typography>
              <Typography variant="h6" fontWeight={800}>{acc.name}</Typography>
              <Typography variant="h5" fontWeight={900} color="#084D4D" mt={1}>
                UGX {acc.balance.toLocaleString()}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Add New Financial Source</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Account Name (e.g. Centenary Bank)" fullWidth value={newAcc.name} onChange={(e) => setNewAcc({...newAcc, name: e.target.value})} />
          <TextField label="Opening Balance" type="number" fullWidth value={newAcc.balance} onChange={(e) => setNewAcc({...newAcc, balance: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#084D4D' }}>Save Account</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}