import axios from 'axios';

// Konfigurasi base URL API
const API_BASE_URL = 'http://localhost:5000/api';

// Buat instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk handle response error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('adminToken');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  },
};

// Info Service
export const infoService = {
  getAll: async () => {
    const response = await api.get('/info');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/info/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/info', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/info/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/info/${id}`);
    return response.data;
  },
};

// Gallery Service
export const galleryService = {
  getAll: async () => {
    const response = await api.get('/gallery');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/gallery/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/gallery', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/gallery/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  },
};

// Directory Service
export const directoryService = {
  getAll: async () => {
    const response = await api.get('/directory');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/directory/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/directory', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/directory/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/directory/${id}`);
    return response.data;
  },
};

// Agenda Service
export const agendaService = {
  getAll: async () => {
    const response = await api.get('/agenda');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/agenda/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/agenda', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/agenda/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/agenda/${id}`);
    return response.data;
  },
};

// About Service
export const aboutService = {
  getAll: async () => {
    const response = await api.get('/about');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/about/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/about', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/about/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/about/${id}`);
    return response.data;
  },
};

export default api; 