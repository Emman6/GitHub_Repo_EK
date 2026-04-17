import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AppRouter from './AppRouter';
import { AuthProvider } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';

// I am defining a custom theme to give the application a professional identity.
// I've used Deep Sea Teal for trust and Harvest Gold for financial accents.
const walletWiseTheme = createTheme({
  palette: {
    primary: { main: '#084D4D' }, 
    secondary: { main: '#F0A500' },
    background: { default: '#F4F7F6' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={walletWiseTheme}>
      <CssBaseline />
      {/* I am nesting the providers so that all routes have access 
          to both user authentication and financial data state. */}
      <AuthProvider>
        <FinanceProvider>
          <AppRouter />
        </FinanceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;