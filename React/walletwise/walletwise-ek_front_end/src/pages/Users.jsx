import React, { useState } from 'react';
import { 
  Box, Typography, Card, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  Button, Snackbar, Alert, Chip 
} from '@mui/material';
import { Edit, Delete, Person, Email } from '@mui/icons-material';
import Footer from '../Footer';

export default function Users() {
  // 1. STATE MANAGEMENT (Array of objects representing users)
  // Default static data removed to prepare for dynamic API integration
  const [users, setUsers] = useState([]);

  // Dialog & Form States
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [formData, setFormData] = useState({ username: '', email: '' });

  // Toast (Snackbar) States
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // 2. EVENT HANDLERS
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setFormData({ username: user.username, email: user.email });
    setOpenEditDialog(true);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleSaveEdit = () => {
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
    setOpenEditDialog(false);
    setToast({ open: true, message: 'User updated successfully!', severity: 'success' });
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setOpenDeleteDialog(false);
    setToast({ open: true, message: 'User deleted successfully!', severity: 'success' });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0D6E6E', mb: 3 }}>
        System Users
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  No users found in the system.
                </TableCell>
              </TableRow>
            ) : (
              users.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.role} 
                      color={row.role === 'Admin' ? 'secondary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpenEdit(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleOpenDelete(row)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* EDIT DIALOG */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Edit User</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            label="Username"
            fullWidth
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
            InputProps={{
              startAdornment: <Person sx={{ color: 'text.secondary', mr: 1 }} />
            }}
          />
          <TextField
            label="Email Address"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            InputProps={{
              startAdornment: <Email sx={{ color: 'text.secondary', mr: 1 }} />
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenEditDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" sx={{ backgroundColor: '#0D6E6E' }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete **{selectedUser?.username}**? This action cannot be reversed.
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* TOAST NOTIFICATION */}
      <Snackbar 
        open={toast.open} 
        autoHideDuration={4000} 
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
      <Footer />
    </Box>
  
);
 
}