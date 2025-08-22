import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

// Example async using thunk (simulated delay)
export const addTaskAsync = createAsyncThunk(
  "tasks/addTaskAsync",
  async (title) => {
    await new Promise(res => setTimeout(res, 200));
    return { id: uuid(), title, createdAt: Date.now() };
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    removeTask: (state, action) => state.filter(t => t.id !== action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      state.unshift(action.payload);
    });
  }
});

export const { removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;