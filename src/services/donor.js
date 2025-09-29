import api from './api';

export const getDonorProfile = async () => {
  const response = await api.get('/donors/donor/profile/');  // Changed to /donors/donor/profile/
  return response;
};

export const updateDonorProfile = async (profileData) => {
  const response = await api.put('/donors/donor/profile/', profileData);  // Changed to /donors/donor/profile/
  return response;
};

export const getDonorNotifications = async () => {
  const response = await api.get('/requests/notifications/donor/');  // Changed to /requests/notifications/donor/
  return response;
};

export const respondToNotification = async (notificationId, response) => {
  const data = { response };
  const result = await api.post(`/requests/notifications/${notificationId}/respond/`, data);  // Changed path
  return result;
};

export const getDonationHistory = async () => {
  const response = await api.get('/donors/donor/donation-history/');  // Changed to /donors/donor/donation-history/
  return response;
};