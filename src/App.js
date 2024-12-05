// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Container } from 'react-bootstrap';

// Import Pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import VendorPage from './pages/VendorPage';
import CustomerPage from './pages/CustomerPage';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/*" element={<AuthPage />} />
            <Route path="/vendor/*" element={<VendorPage />} />
            <Route path="/customer/*" element={<CustomerPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;