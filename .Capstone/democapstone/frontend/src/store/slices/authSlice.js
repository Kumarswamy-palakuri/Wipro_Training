import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { jwtDecode } from "jwt-decode"; // ensure: npm i jwt-decode

// Async login -> returns JWT token
export const login = createAsyncThunk("auth/login", async (payload, thunkApi) => {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data.token;
  } catch (err) {
    // normalize error message
    const msg =
      err?.response?.data?.message ||
      err?.response?.data ||
      err?.message ||
      "Login failed";
    return thunkApi.rejectWithValue(msg);
  }
});

// Helpers to decode role claim safely
function decodeRole(token) {
  try {
    if (!token) return null;
    const payload = jwtDecode(token);
    return (
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      payload.role ||
      null
    );
  } catch {
    return null;
  }
}

const initialToken = localStorage.getItem("token");
const initialRole = decodeRole(initialToken);

const slice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken || null,
    role: initialRole,
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    // Useful if a refresh-token flow or external login sets a new token
    setToken(state, action) {
      const token = action.payload || null;
      state.token = token;
      state.role = decodeRole(token);
      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    b.addCase(login.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.token = a.payload;
      s.role = decodeRole(a.payload);
      localStorage.setItem("token", a.payload);
    });
    b.addCase(login.rejected, (s, a) => {
      s.status = "failed";
      // prefer rejectWithValue payload
      s.error = a.payload || a.error?.message || "Login failed";
    });
  },
});

export const { logout, setToken, clearAuthError } = slice.actions;
export default slice.reducer;
