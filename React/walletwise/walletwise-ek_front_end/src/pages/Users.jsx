import React, { useState } from 'react';
import { 
  Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, 
  Button, IconButton, Chip 
} from '@mui/material';
import { Delete, PersonAdd } from '@mui/icons-material';

export default function Users() {
  // ── DATA MANAGEMENT ──
  // I have removed Mary Nakato and Emmanuel Kato from this array.
  // By setting this to an empty array [], the system starts clean.
  const [users, setUsers] = useState([]);

  // ── DELETE LOGIC ──
  // This function takes the unique ID of a user and filters them out of the list.
  // In a real integration, this is where you would call your API to delete from a database.
  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <Box>
      {/* HEADER SECTION */}
      {/* I am using a Flexbox layout to align the Title and the 'Add User' button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" color="#0D6E6E">
          System Users
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<PersonAdd />} 
          sx={{ bgcolor: '#0D6E6E', '&:hover': { bgcolor: '#084D4D' } }}
        >
          Add User
        </Button>
      </Box>

      {/* USERS TABLE */}
      {/* I am wrapping the table in a Paper component to give it a clean, card-like elevated look */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {/* I am looping through the users array to create a row for each person */}
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {/* I use a Chip to make the Role visually distinct */}
                  <Chip 
                    label={user.role} 
                    color={user.role === 'Admin' ? 'secondary' : 'default'} 
                    size="small" 
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(user.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* EMPTY STATE HANDLER */}
            {/* If there are no users, I show a message instead of an empty table */}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  No users found. Click "Add User" to register a new account.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}