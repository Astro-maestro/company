// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL from environment variables (Vite)
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_AUTH_URL;

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue( error.response?.data?.message || error.message || 'An error occurred during registration');
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return {token, user};
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred during login');
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Get the token from state
      console.log("Token being sent:", token);
      const config = {
        headers: { "x-access-token": token }, // Set the x-access-token header
      };
      await axios.post(`${BASE_URL}/logout`, {}, config); // Send an empty body
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return true; // Return true on successful logout
    } catch (error) {
      return rejectWithValue( error.response?.data?.message || error.message || 'An error occurred during logout'); // Return the error response
    }
  }
);


// Update password
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (passwordData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Get the token from state
      console.log("Token being sent:", token);
      const config = {
        headers: { "x-access-token": token }, // Set the x-access-token header
      };
      const response = await axios.post(`${BASE_URL}/update-password`, passwordData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue( error.response?.data?.message || error.message || 'An error occurred during updating the password');
    }
  }
);

// Forget password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/forget-password`, passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue( error.response?.data?.message || error.message || 'An error occurred during resetting the password');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token; // Set token from action payload
      state.user = action.payload.user; // Set user from action payload
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(payload.user));
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message || 'User Registration Failed';
        console.log(payload.message);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.isLoggedIn = true;
        state.token = payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message || 'User Login Failed';
        console.log(payload.message);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
      })
      // Handle Update Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message || 'Failed to update password';
        console.log(payload.message);
      })
      // Handle Forget Password
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message  || 'Failed to reset password';
        console.log(payload.message);
      });
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;
export default authSlice.reducer;
