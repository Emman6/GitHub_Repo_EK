import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Avatar, Divider } from '@mui/material';

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: 'Emmanuel',
    lastName: 'Kato',
    address: 'Kampala, Uganda',
    birthday: '1995-05-12',
    password: ''
  });

  // I am using a generic handler to update any field in the profile state.
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: '#0D6E6E' }}>EK</Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">My Profile</Typography>
            <Typography color="textSecondary">Manage your personal information</Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label="First Name" name="firstName" fullWidth value={profile.firstName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Last Name" name="lastName" fullWidth value={profile.lastName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Home Address" name="address" fullWidth value={profile.address} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Birthday" name="birthday" type="date" fullWidth InputLabelProps={{ shrink: true }} value={profile.birthday} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="New Password" name="password" type="password" fullWidth value={profile.password} onChange={handleChange} />
          </Grid>
        </Grid>

        <Button variant="contained" sx={{ mt: 4, px: 4, bgcolor: '#0D6E6E' }}>
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
}