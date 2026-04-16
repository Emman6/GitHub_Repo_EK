import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';
import './index.css';

// 1. Target the 'root' div in our index.html file
const rootElement = document.getElementById('root');

// 2. Create the React root and render our AppRouter inside it
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* AppRouter handles all our page routing and navigation */}
    <AppRouter />
  </React.StrictMode>
);