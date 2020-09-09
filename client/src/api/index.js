import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASEURL
});

export const getUser = () => api.get('/getUser');
export const register = payload => api.post('/register', payload);
export const login = payload => api.post('/login', payload);
export const logout = payload => api.post('/logout', payload);
export const forgot = payload => api.post('/forgot', payload);
export const getInventory = () => api.get('/getInventory');
export const insertInventoryItem = payload => api.post('/addItem', payload);
export const updateInventoryItem = payload => api.post('/updateItem', payload);
export const postImage = payload => api.post('/uploadImage', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getShippingOptions = () => api.get('/getShippingOptions');
export const insertShippingOption = payload => api.post('/addShippingOption', payload);
export const updateShippingOption = payload => api.post('/updateShippingOption', payload);
export const getUserOrders = id => api.get(`/getUserOrders/${id}`);
export const getOrders = () => api.get(`/getOrders`);
export const postOrder = payload => api.post('/postOrder', payload);
export const postCreatePaymentIntent = payload => api.post('/stripe/createPaymentIntent', payload);

const apis = {
  getUser,
  register,
  login,
  logout,
  forgot,
  getInventory,
  postImage,
  insertInventoryItem,
  updateInventoryItem,
  getShippingOptions,
  insertShippingOption,
  updateShippingOption,
  getUserOrders,
  getOrders,
  postOrder,
  postCreatePaymentIntent,
};

export default apis;