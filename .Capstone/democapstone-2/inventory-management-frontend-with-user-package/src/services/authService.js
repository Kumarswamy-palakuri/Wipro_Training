import api from './api';

export const authService = {
  // login: async (username, password) => {
  //   const response = await api.post('/auth/login', { username, password });
  //   return response.data;
  // },
  
  // register: async (username, email, password, requestedRole) => {
  //   const response = await api.post('/auth/register', {
  //     username,
  //     email,
  //     password,
  //     requestedRole
  //   });
  //   return response.data;
    login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },
  
  register: async (username, email, password, requestedRole) => {
    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
        requestedRole
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }
  
};