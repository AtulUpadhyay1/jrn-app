import { createSlice } from "@reduxjs/toolkit";
import authService from "@/services/authService";

// Check if user is authenticated on app load
const isAuthenticated = authService.isAuthenticated();
const storedUser = JSON.parse(localStorage.getItem("user") || "null");

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    isAuth: isAuthenticated,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.user = null;
      state.isAuth = false;
      // Clear all auth-related data from localStorage
      authService.logout();
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
