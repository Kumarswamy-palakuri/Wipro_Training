import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // Change for production
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Products', 'Logs', 'Approvals', 'LowStock'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
    }),
    register: builder.mutation({
      query: (data) => ({ url: '/auth/register', method: 'POST', body: data }),
    }),
    getMe: builder.query({
      query: () => '/user/me',
    }),
    getPendingApprovals: builder.query({
      query: () => '/admin/approvals',
      providesTags: ['Approvals'],
    }),
    approve: builder.mutation({
      query: ({ id, role }) => ({ url: `/admin/approvals/${id}/approve`, method: 'POST', body: { role } }),
      invalidatesTags: ['Approvals'],
    }),
    reject: builder.mutation({
      query: (id) => ({ url: `/admin/approvals/${id}/reject`, method: 'POST' }),
      invalidatesTags: ['Approvals'],
    }),
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    addProduct: builder.mutation({
      query: (product) => ({ url: '/products', method: 'POST', body: product }),
      invalidatesTags: ['Products', 'LowStock'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/products/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Products', 'LowStock'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Products', 'LowStock'],
    }),
    addMovement: builder.mutation({
      query: (movement) => ({ url: '/staff/movements', method: 'POST', body: movement }),
      invalidatesTags: ['Products', 'Logs', 'LowStock'],
    }),
    getLogs: builder.query({
      query: () => '/logs',
      providesTags: ['Logs'],
    }),
    getLowStock: builder.query({
      query: () => '/alerts/low-stock',
      providesTags: ['LowStock'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useGetPendingApprovalsQuery,
  useApproveMutation,
  useRejectMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddMovementMutation,
  useGetLogsQuery,
  useGetLowStockQuery,
} = apiSlice;