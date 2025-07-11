// src/api/auth.js
import API from './axios'; // ✅ Use your API instance with baseURL

export const loginApi = async ({ identifier, password }) => {
  const res = await API.post('/auth/login', { identifier, password });
  return res.data; // Should return { token, user }
};
