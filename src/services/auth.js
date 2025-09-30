import api from './api';

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login/', credentials);
    return response;
  } catch (error) {
    console.error('Login error details:', error);
    throw error;
  }
};

export const registerDonor = async (donorData) => {
  try {
    const response = await api.post('/auth/register/donor/', donorData);
    return response;
  } catch (error) {
    console.error('Registration error:', error.response);
    throw error;
  }
};

export const registerHospital = async (hospitalData) => {
  try {
    console.log('Sending hospital registration data to API:', hospitalData);
    const response = await api.post('/auth/register/hospital/', hospitalData);
    console.log('Hospital registration API response:', response);
    return response;
  } catch (error) {
    console.error('Hospital registration API error:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile/');
    return response;
  } catch (error) {
    console.error('Profile error:', error.response);
    throw error;
  }
};