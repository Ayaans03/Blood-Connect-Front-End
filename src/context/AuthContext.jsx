import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerDonor, registerHospital, getUserProfile } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const { access, refresh, user_type, is_verified } = response.data;
      
      const userData = {
        username: credentials.username,
        user_type,
        is_verified
      };
      
      setUser(userData);
      setToken(access);
      setIsAuthenticated(true);
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const registerDonorAccount = async (donorData) => {
    try {
      const response = await registerDonor(donorData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Registration failed' 
      };
    }
  };

  const registerHospitalAccount = async (hospitalData) => {
    try {
      console.log('Sending hospital data to API:', hospitalData);
      const response = await registerHospital(hospitalData);
      console.log('Hospital registration response:', response);
      
      // Check for success based on status code
      if (response.status === 201) {
        return { 
          success: true, 
          data: response.data,
          message: response.data.message || 'Hospital registered successfully'
        };
      } else {
        return { 
          success: false, 
          error: response.data || 'Registration failed' 
        };
      }
    } catch (error) {
      console.error('Hospital registration error in context:', error);
      return { 
        success: false, 
        error: error.response?.data || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          // Verify token is still valid by fetching user profile
          const profileResponse = await getUserProfile();
          const userData = profileResponse.data;
          
          setToken(storedToken);
          setUser({
            ...JSON.parse(storedUser),
            ...userData
          });
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    registerDonor: registerDonorAccount,
    registerHospital: registerHospitalAccount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};