import { createAsyncThunk } from "@reduxjs/toolkit";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    await sleep(600); // simulate API
    if (!username || !password) throw new Error("Username and password are required");
    // Simple demo auth: any non-empty credentials succeed
    const token = `demo-token-${Date.now()}`;
    const user = { username };
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { token, user };
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await sleep(200);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return true;
});

export const addTask = createAsyncThunk("tasks/addTask", async (title) => {
  await sleep(300);
  if (!title?.trim()) throw new Error("Task title cannot be empty");
  return { id: Date.now(), title: title.trim() };
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await sleep(200);
  return id;
});
// Auth actions with Thunk
// export const login = (username, password) => async (dispatch) => {
//   try {
//     dispatch({ type: 'LOGIN_REQUEST' });
//     // Simulate API call
//     await new Promise((res) => setTimeout(res, 600));
//     // Very simple auth check for challenge
//     if (username && password) {
//       const user = { username };
//       localStorage.setItem('auth_token', 'demo-token');
//       localStorage.setItem('auth_user', JSON.stringify(user));
//       dispatch({ type: 'LOGIN_SUCCESS', payload: user });
//     } else {
//       throw new Error('Invalid credentials');
//     }
//   } catch (err) {
//     dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
//   }
// };

// export const logout = () => (dispatch) => {
//   localStorage.removeItem('auth_token');
//   localStorage.removeItem('auth_user');
//   dispatch({ type: 'LOGOUT' });
// };

// // Task actions
// export const addTask = (text) => {
//   return {
//     type: 'TASK_ADD',
//     payload: { id: crypto.randomUUID(), text },
//   };
// };

// export const deleteTask = (id) => {
//   return { type: 'TASK_DELETE', payload: id };
// };
