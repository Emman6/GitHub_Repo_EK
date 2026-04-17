import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; // I added this import
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts'; 
import Income from './pages/Income';
import Debts from './pages/Debts'; 
import Profile from './pages/Profile';
import Balance from './pages/Balance';
import Expense from './pages/Expense';
import Users from './pages/Users';
import Reports from './pages/Reports';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar'; 
import Navbar from './components/Navbar';
import { Box } from '@mui/material';

// ── MAIN LAYOUT ──
const MainLayout = () => (
  <Box sx={{ display: 'flex' }}>
    <Sidebar />
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  </Box>
);

// ── PROTECTED ROUTE GUARD ──
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
  return (
    <Routes>
      {/* ── PUBLIC ROUTES ── */}
      {/* I've placed Register here so it can be accessed without logging in */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* ── PRIVATE ROUTES ── */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/debts" element={<Debts />} /> 
        <Route path="/balance" element={<Balance />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reports" element={<Reports />} />
      </Route>

      {/* CATCH-ALL REDIRECT */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}