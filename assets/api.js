// assets/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-h2ah.onrender.com", // cambia si usas otro puerto/host
});

// agrega token si existe
api.interceptors.request.use((config) => {
  const t = localStorage.getItem("tk");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

