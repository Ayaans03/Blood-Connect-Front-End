import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegistrationSelection from './components/registration/RegistrationSelection';
import DonorRegistration from './components/registration/DonorRegistration';
import HospitalRegistration from './components/registration/HospitalRegistration';
import DonorDashboard from './components/DonorDashboard';
import StaffDashboard from './components/StaffDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Registration Routes */}
            <Route path="/register" element={<RegistrationSelection />} />
            <Route path="/register/donor" element={<DonorRegistration />} />
            <Route path="/register/hospital" element={<HospitalRegistration />} />
            
            {/* Protected Routes */}
            <Route 
              path="/donor-dashboard" 
              element={
                <ProtectedRoute requiredRole="donor">
                  <DonorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff-dashboard" 
              element={
                <ProtectedRoute requiredRole="hospital_staff">
                  <StaffDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute requiredRole="blood_bank_manager">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;