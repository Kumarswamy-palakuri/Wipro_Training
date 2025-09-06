import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk("auth/login", async (payload, thunkApi) => {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data.token;
  } catch (err) {
    return thunkApi.rejectWithValue(err?.response?.data?.message || "Login failed");
  }
});

function decodeRole(token) {
  try {
    if (!token) return null;
    const p = jwtDecode(token);
    return p["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || p.role || null;
  } catch { return null; }
}

const initialToken = localStorage.getItem("token");
const initialRole = decodeRole(initialToken);

const slice = createSlice({
  name: "auth",
  initialState: { token: initialToken || null, role: initialRole, status: "idle", error: null },
  reducers: {
    setToken(state, action) {
      const token = action.payload || null;
      state.token = token;
      state.role = decodeRole(token);
      if (token) localStorage.setItem("token", token); else localStorage.removeItem("token");
    },
    logout(state) {
      state.token = null; state.role = null; state.status = "idle"; state.error = null;
      localStorage.removeItem("token");
    },
    clearAuthError(state) { state.error = null; }
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => { s.status = "loading"; s.error = null; });
    b.addCase(login.fulfilled, (s, a) => {
      s.status = "succeeded"; s.token = a.payload; s.role = decodeRole(a.payload);
      localStorage.setItem("token", a.payload);
    });
    b.addCase(login.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || "Login failed"; });
  }
});

export const { logout, setToken, clearAuthError } = slice.actions;
export default slice.reducer;
