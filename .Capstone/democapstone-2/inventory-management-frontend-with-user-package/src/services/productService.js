// frontend/src/services/productService.js
import api from './api';

export const productService = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  create: async (product) => {
    const response = await api.post('/products', product);
    return response.data;
  },
  
  update: async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
  
  updateStock: async (id, quantityChange, movementType, reason) => {
    const response = await api.post(`/products/${id}/update-stock`, {
      quantityChange,
      movementType,
      reason
    });
    return response.data;
  },
  
  getMovements: async (id, startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate.toISOString();
    if (endDate) params.endDate = endDate.toISOString();
    
    const response = await api.get(`/products/${id}/movements`, { params });
    return response.data;
  },
  
  getLowStock: async () => {
    const response = await api.get('/products/low-stock');
    return response.data;
  }
};