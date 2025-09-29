import api from './api';

export const getHospitalProfile = async () => {
  const response = await api.get('/hospitals/profile/');
  return response;
};

export const createBloodRequest = async (requestData) => {
  const response = await api.post('/hospitals/blood-requests/create/', requestData);
  return response;
};

export const getHospitalRequests = async () => {
  const response = await api.get('/hospitals/blood-requests/');
  return response;
};

export const getAvailableDonors = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key]) params.append(key, filters[key]);
  });
  
  const response = await api.get(`/donors/?${params}`);
  return response;
};