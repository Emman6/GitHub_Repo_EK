import React, { useState } from 'react';
import { 
  Box, Typography, Button, Grid, Card, Stack, 
  IconButton, TextField, InputAdornment, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import PaymentsIcon from '@mui/icons-material/Payments';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

export default function Accounts() {
  // I am starting with an empty array so you can add your own real data.
  const [myAccounts, setMyAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // I use this state to manage the "Add Account" popup window.
  const [open, setOpen] = useState(false);
  const [newAcc, setNewAcc] = useState({ name: '', type: 'bank', balance: '' });

  // I am creating this function to take your form input and save it to the list.
  const handleSave = () => {
    const accountToAdd = {
      id: Date.now(),
      name: newAcc.name,
      type: newAcc.type,
      balance: parseFloat(newAcc.balance) || 0,
    };
    setMyAccounts([...myAccounts, accountToAdd]);
    setOpen(false); // Close the popup
    setNewAcc({ name: '', type: 'bank', balance: '' }); // Clear the form
  };

  // I use this helper to decide which icon to show based on the account type.
  const getIcon = (type) => {
    switch (type) {
      case 'bank': return <AccountBalanceIcon sx={{ color: '#084D4D' }} />;
      case 'mobile': return <SmartphoneIcon sx={{ color: '#084D4D' }} />;
      default: return <PaymentsIcon sx={{ color: '#084D4D' }} />;
    }
  };

  // I am filtering the display list based on what you type in the search bar.
  const filteredAccounts = myAccounts.filter(acc => 
    acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={900} color="#084D4D">My Accounts</Typography>
          <Typography variant="body2" color="text.secondary">Manage your financial sources</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpen(true)}
          sx={{ bgcolor: '#084D4D', borderRadius: 2, px: 3 }}
        >
          Add New Source
        </Button>
      </Stack>

      <Paper sx={{ p: 1, mb: 4, borderRadius: 3, display: 'flex', alignItems: 'center', bgcolor: '#fcfcfc' }}>
        <TextField 
          fullWidth 
          variant="standard" 
          placeholder="Search accounts..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ 
            disableUnderline: true, 
            startAdornment: (
              <InputAdornment position="start" sx={{ ml: 2 }}>
                <SearchIcon color="disabled" />
              </InputAdornment>
            ) 
          }}
          sx={{ py: 1 }}
        />
      </Paper>

      <Grid container spacing={3}>
        {filteredAccounts.map((acc) => (
          <Grid item xs={12} sm={6} md={4} key={acc.id}>
            <Card sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ p: 1.5, bgcolor: '#F4F7F6', borderRadius: 3 }}>
                  {getIcon(acc.type)}
                </Box>
                <IconButton size="small"><MoreVertIcon /></IconButton>
              </Stack>

              <Box sx={{ mt: 3 }}>
                <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  {acc.type}
                </Typography>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>{acc.name}</Typography>
                <Typography variant="h5" fontWeight={900} color="#084D4D">
                  UGX {acc.balance.toLocaleString()}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}

        {filteredAccounts.length === 0 && (
          <Box sx={{ width: '100%', textAlign: 'center', mt: 5, opacity: 0.5 }}>
            <Typography>No accounts found. Add a source to get started.</Typography>
          </Box>
        )}
      </Grid>

      {/* I am adding this Dialog so the user can enter new account data. */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Source</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField 
            label="Account Name" 
            fullWidth 
            value={newAcc.name} 
            onChange={(e) => setNewAcc({...newAcc, name: e.target.value})} 
          />
          <TextField 
            label="Initial Balance" 
            type="number" 
            fullWidth 
            value={newAcc.balance} 
            onChange={(e) => setNewAcc({...newAcc, balance: e.target.value})} 
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