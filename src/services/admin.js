import api from './api';

export const getPendingRequests = async () => {
  const response = await api.get('/requests/pending/');
  return response;
};

export const approveRequest = async (requestId) => {
  const response = await api.post(`/requests/${requestId}/approve/`);
  return response;
};

export const rejectRequest = async (requestId) => {
  const response = await api.post(`/requests/${requestId}/reject/`);
  return response;
};

export const getPlatformStats = async () => {
  // This would typically come from a dedicated stats endpoint
  // For now, we'll simulate with mock data
  return {
    data: {
      total_donors: 1250,
      total_hospitals: 45,
      total_requests: 320,
      fulfilled_requests: 285,
      pending_approvals: 8
    }
  };
};

export const getRecentActivity = async () => {
  // This would typically come from a dedicated activity endpoint
  // For now, we'll simulate with mock data
  return {
    data: {
      activities: [
        {
          id: 1,
          type: 'registration',
          description: 'New donor registered: John Doe',
          timestamp: new Date().toISOString(),
          user: 'John Doe'
        },
        {
          id: 2,
          type: 'request',
          description: 'Blood request created by City Hospital',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          user: 'City Hospital'
        },
        {
          id: 3,
          type: 'approval',
          description: 'Request #123 approved',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          user: 'Admin'
        }
      ]
    }
  };
};