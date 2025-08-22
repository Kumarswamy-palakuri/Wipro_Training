import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { username: null },
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.username = null;
      localStorage.removeItem("username");
    },
    hydrateFromStorage: (state) => {
      const saved = localStorage.getItem("username");
      state.username = saved || null;
    }
  }
});

export const { login, logout, hydrateFromStorage } = userSlice.actions;
export default userSlice.reducer;