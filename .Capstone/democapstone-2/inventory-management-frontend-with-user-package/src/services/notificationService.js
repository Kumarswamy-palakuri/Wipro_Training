// frontend/src/services/notificationService.js
import api from './api';

export const notificationService = {
  getLowStockNotifications: async () => {
    const response = await api.get('/notifications/low-stock');
    return response.data;
  },
  
  subscribe: async (subscription) => {
    const response = await api.post('/notifications/subscribe', subscription);
    return response.data;
  }
};