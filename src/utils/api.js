import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

export const recipeAPI = {
  getAll: (params) => api.get('/recipes', { params }),
  getById: (id) => api.get(`/recipes/${id}`),
  create: (data) => api.post('/recipes', data),
  update: (id, data) => api.put(`/recipes/${id}`, data),
  delete: (id) => api.delete(`/recipes/${id}`),
  addReview: (id, data) => api.post(`/recipes/${id}/reviews`, data),
  getRandom: () => api.get('/recipes/random')
};

export const userAPI = {
  getFavorites: () => api.get('/users/favorites'),
  addToFavorites: (recipeId) => api.post('/users/favorites', { recipeId }),
  removeFromFavorites: (recipeId) => api.delete(`/users/favorites/${recipeId}`),
  
  getCollections: () => api.get('/users/collections'),
  createCollection: (name) => api.post('/users/collections', { name }),
  getCollectionById: (id) => api.get(`/users/collections/${id}`),
  deleteCollection: (id) => api.delete(`/users/collections/${id}`),
  addRecipeToCollection: (collectionId, recipeId) => 
    api.post('/users/collections/recipes', { collectionId, recipeId }),
  removeRecipeFromCollection: (collectionId, recipeId) => 
    api.delete(`/users/collections/${collectionId}/recipes/${recipeId}`)
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  markAsPaid: (id) => api.put(`/orders/${id}/pay`),
  cancel: (id) => api.put(`/orders/${id}/cancel`)
};

export default api;
