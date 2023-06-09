import { createSlice } from '@reduxjs/toolkit';

// import { register, login, current, logout, editCurrent } from './authOperations';

import {
  register,
  login,
  logout,
  findUserOp,
} from './authOperations';

const initialState = {
  user: {},
  token: '',
  isLogin: false,
  loading: false,
  isRegistered: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegistered(state, { payload }) {
      state.isRegistered = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        state.isLogin = true;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.user = {};
        state.token = '';
        state.isLogin = false;
        state.isRegistered = false;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
          .addCase(findUserOp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findUserOp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.isLogin = false;
        state.isRegistered = false;
      })
      .addCase(findUserOp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
  },
});

export const { setRegistered } = authSlice.actions;
export default authSlice.reducer;
