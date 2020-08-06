import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  // baseURL: 'https://helybe.herokuapp.com/api',
  // baseURL: 'http://localhost:8000/api',
  baseURL: process.env.REACT_APP_BASEURL
});

export const getUser = () => api.get('/getUser');
export const register = payload => api.post('/register', payload);
export const login = payload => api.post('/login', payload);
export const logout = payload => api.post('/logout', payload);
export const forgot = payload => api.post('/forgot', payload);
export const insertInventoryItem = payload => api.post('/postItem', payload);
export const getInventory = () => api.get('/getInventory');
export const putInventory = payload => api.put('/putInventory', payload);
export const postImage = payload => api.post('/uploadImage', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getUserOrders = id => api.get(`/getUserOrders/${id}`);
export const postOrder = payload => api.post('/postOrder', payload);
export const postCreatePaymentIntent = payload => api.post('/stripe/createPaymentIntent', payload);

const apis = {
  getUser,
  register,
  login,
  logout,
  forgot,
  insertInventoryItem,
  getInventory,
  putInventory,
  postImage,
  getUserOrders,
  postOrder,
  postCreatePaymentIntent,
};

export default apis;