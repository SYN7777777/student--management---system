import { createSlice } from '@reduxjs/toolkit';

const savedToken = localStorage.getItem('token');
const savedUser  = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;


const initialState = {
  token: savedToken || null,
  user : savedUser  || null,  // role, email etc.
  isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user; // No need to decode
      state.isAuthenticated = true;

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user  = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
