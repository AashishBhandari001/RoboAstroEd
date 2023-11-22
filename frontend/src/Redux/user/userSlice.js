import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.currentUser = null;
      state.isAuthenticated = false;
    },

    logoutStart: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    logoutSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.currentUser = null;
      state.isAuthenticated = true;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
