import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const insertInventoryItem = payload => api.post(`/postItem`, payload);
export const getInventory = () => api.get(`/getInventory`);
export const putInventory = payload => api.put(`/putInventory`, payload);

const apis = {
  insertInventoryItem,
  getInventory,
  putInventory,
};

export default apis;