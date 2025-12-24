import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

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
  updateProfile: (data) => api.put('/auth/profile', data),
  uploadAvatar: (formData) => {
    return api.post('/auth/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export const recipeAPI = {
  getAll: (params) => api.get('/recipes', { params }),
  getById: (id) => api.get(`/recipes/${id}`),
  create: (data) => api.post('/recipes', data),
  update: (id, data) => api.put(`/recipes/${id}`, data),
  delete: (id) => api.delete(`/recipes/${id}`),
  addReview: (id, data) => api.post(`/recipes/${id}/reviews`, data),
  getRandom: () => api.get('/recipes/random'),
  uploadImage: (formData) => {
    return api.post('/recipes/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
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

export const collectionAPI = {
  getMyCollections: () => api.get('/collections/my-collections'),
  getById: (id) => api.get(`/collections/${id}`),
  create: (data) => api.post('/collections', data),
  update: (id, data) => api.put(`/collections/${id}`, data),
  delete: (id) => api.delete(`/collections/${id}`),
  addRecipe: (collectionId, recipeId) => api.post(`/collections/${collectionId}/add-recipe`, { recipeId }),
  removeRecipe: (collectionId, recipeId) => api.post(`/collections/${collectionId}/remove-recipe`, { recipeId })
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  markAsPaid: (id) => api.put(`/orders/${id}/pay`),
  cancel: (id) => api.put(`/orders/${id}/cancel`)
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecipeTypes: () => api.get('/dashboard/recipe-types'),
  getFavoritesByCategory: () => api.get('/dashboard/favorites-by-category'),
  getRecentActivity: () => api.get('/dashboard/recent-activity'),
  getWeeklyMealPlan: () => api.get('/dashboard/meal-plan'),
  getAllMealPlans: () => api.get('/dashboard/meal-plans'),
  saveMealPlan: (mealPlan, weekStartDate) => api.post('/dashboard/meal-plan', { mealPlan, weekStartDate })
};

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => api.put('/notifications/mark-all-as-read'),
  delete: (notificationId) => api.delete(`/notifications/${notificationId}`)
};

export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

export default api;
