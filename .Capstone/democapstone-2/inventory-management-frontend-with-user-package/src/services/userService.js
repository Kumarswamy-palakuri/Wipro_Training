import api from './api';

export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  getInactive: async () => {
    const response = await api.get('/users/inactive');
    return response.data;
  },
  
  getPendingRegistrations: async () => {
    const response = await api.get('/users/registrations/pending');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  create: async (user, password) => {
    const response = await api.post('/users', user, {
      params: { password }
    });
    return response.data;
  },
  
  update: async (id, user, password = null) => {
    const response = await api.put(`/users/${id}`, user, {
      params: password ? { password } : {}
    });
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
  
  requestApproval: async (requestedRole) => {
    const response = await api.post('/users/request-approval', {
      requestedRole
    });
    return response.data;
  },
  
  getPendingApprovals: async () => {
    const response = await api.get('/users/approvals/pending');
    return response.data;
  },
  
  processApproval: async (approvalId, status, comments) => {
    const response = await api.post(`/users/approvals/${approvalId}/process`, {
      status, comments
    });
    return response.data;
  },
  getUserApprovals: async (userId) => {
  const response = await api.get(`/users/${userId}/approvals`);
  return response.data;
}
};