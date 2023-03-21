import axios from 'axios';

const BASE_ROUTE = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = {
  get: {
    products: () => axios.get(`${BASE_ROUTE}/products`),
    users: () => axios.get(`${BASE_ROUTE}/users`),
    orders: () => axios.get(`${BASE_ROUTE}/orders`),
    me: () => axios.get(`${BASE_ROUTE}/users/get/me`),
  },
  post: {
    createProduct: (data) => axios.post(`${BASE_ROUTE}/products`, data),
    createUser: (data) => axios.post(`${BASE_ROUTE}/users`, data),
    createOrder: (data) => axios.post(`${BASE_ROUTE}/orders`, data),
    userLogin: (data) => axios.post(`${BASE_ROUTE}/users/login`, data),
  },
  put: {
    updateProduct: (id, data) =>
      axios.put(`${BASE_ROUTE}/products/${id}`, data),
    updateUser: (id, data) => axios.put(`${BASE_ROUTE}/users/${id}`, data),
    updateOrder: (id, data) => axios.put(`${BASE_ROUTE}/orders/${id}`, data),
  },
  delete: {
    deleteProduct: (id) => axios.delete(`${BASE_ROUTE}/products/${id}`),
    deleteUser: (id) => axios.delete(`${BASE_ROUTE}/users/${id}`),
    deleteOrder: (id) => axios.delete(`${BASE_ROUTE}/orders/${id}`),
  },
};

export default api;
