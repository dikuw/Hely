import axios from 'axios';

const api = axios.create({
    baseURL: 'https://helybe.herokuapp.com/api',
    // baseURL: 'http://localhost:8000/api',
});

export const registerUser = payload => api.post(`/register`, payload);
export const insertInventoryItem = payload => api.post(`/postItem`, payload);
export const getInventory = () => api.get(`/getInventory`);
export const putInventory = payload => api.put(`/putInventory`, payload);
export const postImage = payload => api.post(`/uploadImage`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });

const apis = {
  registerUser,
  insertInventoryItem,
  getInventory,
  putInventory,
  postImage,
};

export default apis;