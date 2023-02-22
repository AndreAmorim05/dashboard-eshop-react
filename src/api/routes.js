import axios from "axios";

const BASE_ROUTE = process.env.REACT_APP_BASE_URL

axios.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const api = {
  get: {
    products: () => axios.get(`${BASE_ROUTE}/api/v1/products`),
    users: () => axios.get(`${BASE_ROUTE}/api/v1/users`),
    orders: () => axios.get(`${BASE_ROUTE}/api/v1/orders`),
    me: () => axios.get(`${BASE_ROUTE}/api/v1/users/get/me`)
  },
  post: {
    createProduct: (data) => axios.post(`${BASE_ROUTE}/api/v1/products`, data),
    createUser: (data) => axios.post(`${BASE_ROUTE}/api/v1/users`, data),
    createOrder: (data) => axios.post(`${BASE_ROUTE}/api/v1/orders`, data),
    userLogin: (data) => axios.post(`${BASE_ROUTE}/api/v1/users/login`, data),
  },
  put: {
    updateProduct: (id, data) => axios.put(`${BASE_ROUTE}/api/v1/products/${id}`, data),
    updateUser: (id, data) => axios.put(`${BASE_ROUTE}/api/v1/users/${id}`, data),
    updateOrder: (id, data) => axios.put(`${BASE_ROUTE}/api/v1/orders/${id}`, data)
  },
  delete: {
    deleteProduct: (id) => axios.delete(`${BASE_ROUTE}/api/v1/products/${id}`),
    deleteUser: (id) => axios.delete(`${BASE_ROUTE}/api/v1/users/${id}`),
    deleteOrder: (id) => axios.delete(`${BASE_ROUTE}/api/v1/orders/${id}`)
  }
};

export default api;