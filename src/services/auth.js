import api from './api';

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login/', credentials);  // Changed to /auth/login/
  return response;
};

export const registerDonor = async (donorData) => {
  const response = await api.post('/auth/register/donor/', donorData);  // Changed to /auth/register/donor/
  return response;
};

export const registerHospital = async (hospitalData) => {
  const response = await api.post('/auth/register/hospital/', hospitalData);  // Changed to /auth/register/hospital/
  return response;
};

export const getUserProfile = async () => {
  const response = await api.get('/auth/profile/');  // Changed to /auth/profile/
  return response;
};