import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

/**
 * Final Integrated Footer - WalletWise Project.
 * * I have structured this component to serve as a persistent anchor for the application.
 * By using Material UI's Box and Container, I ensure the layout is responsive 
 * and adheres to the project's design system.
 */
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto', // SECTION: Sticky Logic
        // This 'mt: auto' is essential. It works with the flexbox parent 
        // to push this box to the very bottom of the viewport.
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        {/* SECTION: Identity & Copyright */}
        {/* I am establishing ownership of the work while keeping the text small (body2) */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ fontSize: '0.75rem', fontWeight: 500 }}
        >
          © {new Date().getFullYear()} Emmanuel Mwesigwa Kwezi Kato. All rights reserved.
        </Typography>

        {/* SECTION: Functional Contact Link */}
        {/* I have implemented a 'mailto' link. This is a standard web protocol 
            that triggers the user's local email client (like Outlook or Mail). */}
        <Typography align="center" sx={{ mt: 0.5 }}>
          <Link 
            href="mailto:katoemmanuel02@gmail.com" 
            color="primary" 
            sx={{ 
              fontSize: '0.7rem', 
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' } 
            }}
          >
            Contact Me for Support
          </Link>
        </Typography>

        {/* SECTION: Reflection */}
        {/* This reflects my personal philosophy as a student of the Word and Technology. */}
        <Typography 
          variant="caption" 
          display="block" 
          align="center" 
          color="text.secondary"
          sx={{ fontStyle: 'italic', mt: 1, opacity: 0.8 }}
        >
          "Commit your work to the Lord, and your plans will be established." — Proverbs 16:3
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;