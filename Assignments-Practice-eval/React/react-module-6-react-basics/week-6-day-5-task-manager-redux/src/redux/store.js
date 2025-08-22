import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tasksReducer from "./taskSlice";

// Preload from localStorage
const savedUser = localStorage.getItem("username");
const savedTasks = localStorage.getItem("tasks");

const preloadedState = {
  user: { username: savedUser || null },
  tasks: savedTasks ? JSON.parse(savedTasks) : []
};

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
  preloadedState
});

// Persist tasks & user
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
    if(state.user.username){
      localStorage.setItem("username", state.user.username);
    } else {
      localStorage.removeItem("username");
    }
  } catch {}
});

export default store;