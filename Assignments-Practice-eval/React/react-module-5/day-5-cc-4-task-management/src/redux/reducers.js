import { createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, loginUser, logoutUser } from "./actions";

const persistedToken = localStorage.getItem("token");
const persistedUser = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: persistedToken || null,
    user: persistedUser ? JSON.parse(persistedUser) : null,
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.status = "idle";
        state.error = null;
      });
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add task";
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete task";
      });
  }
});

export const authReducer = authSlice.reducer;
export const tasksReducer = tasksSlice.reducer;
// import { combineReducers } from 'redux';

// const initialAuthState = {
//   isAuthenticated: !!localStorage.getItem('auth_token'),
//   user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
//   loading: false,
//   error: null,
// };

// function authReducer(state = initialAuthState, action) {
//   switch (action.type) {
//     case 'LOGIN_REQUEST':
//       return { ...state, loading: true, error: null };
//     case 'LOGIN_SUCCESS':
//       return { ...state, loading: false, isAuthenticated: true, user: action.payload };
//     case 'LOGIN_FAILURE':
//       return { ...state, loading: false, error: action.payload };
//     case 'LOGOUT':
//       return { ...state, isAuthenticated: false, user: null };
//     default:
//       return state;
//   }
// }

// const initialTasksState = {
//   items: [],
// };

// function tasksReducer(state = initialTasksState, action) {
//   switch (action.type) {
//     case 'TASK_ADD':
//       return { ...state, items: [...state.items, action.payload] };
//     case 'TASK_DELETE':
//       return { ...state, items: state.items.filter((t) => t.id !== action.payload) };
//     default:
//       return state;
//   }
// }

// export default combineReducers({
//   auth: authReducer,
//   tasks: tasksReducer,
// });
