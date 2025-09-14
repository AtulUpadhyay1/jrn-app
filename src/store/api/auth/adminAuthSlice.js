import { createSlice } from "@reduxjs/toolkit";
import adminAuthService from "@/services/adminAuthService";

// Check if admin is authenticated on app load
const isAdminAuthenticated = adminAuthService.isAuthenticated();
const storedAdminUser = adminAuthService.getAdminUser();

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    adminUser: storedAdminUser,
    isAdminAuth: isAdminAuthenticated,
    isLoading: false,
    error: null,
  },
  reducers: {
    setAdminLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAdminError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setAdminUser: (state, action) => {
      state.adminUser = action.payload;
      state.isAdminAuth = true;
      state.isLoading = false;
      state.error = null;
      // Store admin user data in localStorage
      adminAuthService.setAdminUser(action.payload);
    },
    adminLogOut: (state) => {
      state.adminUser = null;
      state.isAdminAuth = false;
      state.isLoading = false;
      state.error = null;
      // Clear all admin auth-related data from localStorage
      adminAuthService.logout();
    },
    clearAdminError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  setAdminLoading, 
  setAdminError, 
  setAdminUser, 
  adminLogOut, 
  clearAdminError 
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;