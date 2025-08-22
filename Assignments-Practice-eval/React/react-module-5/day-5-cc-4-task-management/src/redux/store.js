import { configureStore } from "@reduxjs/toolkit";
import { authReducer, tasksReducer } from "./reducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer
  }
  // Thunk is included by default in RTK middleware
});

export default store;

