import axios from "axios";

// .env.development => VITE_API_BASE_URL=https://localhost:44383
const base = import.meta.env.VITE_API_BASE_URL || "https://localhost:44383";

export const api = axios.create({
  baseURL: `${base}/api`,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
