import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

/**
 * Final stable Footer for UCU WebDev Intermediate Assessment.
 * I have designed this to remain humble and functional, 
 * reflecting my commitment to excellence and clear communication.
 */
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto', // This pushes the footer to the bottom of the flex container
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ fontSize: '0.75rem', letterSpacing: '0.05rem' }}
        >
          {/* I am establishing my professional contact for the facilitator */}
          {'© '} {new Date().getFullYear()} WalletWise. All rights reserved. | 
          <Link 
            href="mailto:katoemmanuel02@gmail.com" 
            color="inherit" 
            sx={{ ml: 1, textDecoration: 'underline' }}
          >
            katoemmanuel02@gmail.com
          </Link>
        </Typography>
        <Typography 
          variant="caption" 
          display="block" 
          align="center" 
          color="text.secondary"
          sx={{ fontStyle: 'italic', mt: 0.5 }}
        >
          Built with grace and diligence for the glory of God.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;