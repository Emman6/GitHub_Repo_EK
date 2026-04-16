import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ModernLayout from './layouts/ModernLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';         
import Register from './pages/Register';   
import Income from './pages/Income';
import Expense from './pages/Expense';
import Debts from './pages/Debts';
import Balance from './pages/Balance';
import Reports from './pages/Reports';
import Users from './pages/Users';
import { AuthProvider, useAuth } from './context/AuthContext'; 

// 1. STANDARD PROTECTED ROUTE GUARD
// This checks if a user is logged in at all. If not, it bounces them to login.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// 2. REFACTORED: ADMIN ROUTE GUARD
// We removed the alert() function here. Invoking browser alerts directly within 
// a functional component's render execution phase forces React to halt and re-render, 
// causing that "repeating click" behavior. Redirection handles it smoothly.
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  // Guard A: If not logged in, go to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Guard B: If logged in but NOT an admin, block them and kick them to dashboard
  // Notice we stripped away the repetitive alert() message box.
  if (user?.role !== 'Admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const Placeholder = ({ name }) => (
  <div style={{ padding: '20px' }}><h2>{name} Page</h2></div>
);

export default function AppRouter() {
  return (
    // Wrap entire app in AuthProvider so token state is globally available
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <ModernLayout><Dashboard /></ModernLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/income" element={
            <ProtectedRoute>
              <ModernLayout><Income /></ModernLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/expense" element={
            <ProtectedRoute>
              <ModernLayout><Expense /></ModernLayout>
            </ProtectedRoute>
          } />

           <Route path="/debts" element={
            <ProtectedRoute>
              <ModernLayout><Debts /></ModernLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/balance" element={
            <ProtectedRoute>
              <ModernLayout><Balance /></ModernLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <ModernLayout><Reports /></ModernLayout>
            </ProtectedRoute>
          } />
          
          {/* USERS PAGE: Protected by AdminRoute instead of standard ProtectedRoute */}
          <Route path="/users" element={
            <AdminRoute>
              <ModernLayout><Users /></ModernLayout>
            </AdminRoute>
          } />

          {/* Fallback route for undefined paths */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}