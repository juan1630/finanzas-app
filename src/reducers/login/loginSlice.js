import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    token: "",
  },
  reducers: {
    loginSuccess: (state, {payload}) => {
      state.isAuthenticated = payload.auth;
      state.token = payload.token;
    },
    logout: (state) => {
      state.isAuthenticated  = false;
    },
  },
});

export const { loginSuccess, logout } = loginSlice.actions;
export default loginSlice.reducer;
