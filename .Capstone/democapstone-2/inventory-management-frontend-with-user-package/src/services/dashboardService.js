// frontend/src/services/dashboardService.js
import api from './api';

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
  
  getManagerStats: async () => {
    const response = await api.get('/dashboard/manager-stats');
    return response.data;
  }
};