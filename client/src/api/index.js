import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const insertInventoryItem = payload => api.post(`/item`, payload);
export const getInventory = () => api.get(`/inventory`);

const apis = {
  insertInventoryItem,
  getInventory,
};

export default apis;