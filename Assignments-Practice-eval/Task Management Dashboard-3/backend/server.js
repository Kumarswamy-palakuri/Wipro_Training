// D:\Wipro\Task Management Dashboard-3\backend\server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// In-memory tasks: { id, title, description, deadline, assignee, status }
let tasks = [];

// (Optional) health check
app.get("/", (_, res) => res.send("Realtime Task Server running"));

io.on("connection", (socket) => {
  console.log("🔌 client connected:", socket.id);

  // Send initial tasks to the new client
  socket.emit("loadTasks", tasks);

  // Add task
  socket.on("addTask", (task) => {
    const newTask = {
      id: Date.now(),
      title: task.title?.trim() || "",
      description: task.description || "",
      deadline: task.deadline || "",
      assignee: task.assignee || "",
      status: task.status || "todo",
    };
    tasks.push(newTask);
    io.emit("taskAdded", newTask); // broadcast to everyone

    // notify the assignee
    if (newTask.assignee) {
      io.emit("userNotified", {
        to: newTask.assignee,
        type: "assigned",
        title: "New Task Assigned",
        message: `“${newTask.title}” assigned to you`,
        taskId: newTask.id,
      });
    }
  });

  // Update task (title/desc/deadline/assignee/status)
  socket.on("updateTask", (updated) => {
    const i = tasks.findIndex((t) => t.id === updated.id);
    if (i === -1) return;
    const prev = tasks[i];
    tasks[i] = { ...prev, ...updated };
    io.emit("taskUpdated", tasks[i]);

    // notify current assignee
    if (tasks[i].assignee) {
      io.emit("userNotified", {
        to: tasks[i].assignee,
        type: "updated",
        title: "Task Updated",
        message: `“${tasks[i].title}” was updated`,
        taskId: tasks[i].id,
      });
    }
  });

  // Delete task
  socket.on("deleteTask", (taskId) => {
    const t = tasks.find((x) => x.id === taskId);
    tasks = tasks.filter((x) => x.id !== taskId);
    io.emit("taskDeleted", taskId);

    if (t?.assignee) {
      io.emit("userNotified", {
        to: t.assignee,
        type: "deleted",
        title: "Task Deleted",
        message: `“${t.title}” was deleted`,
        taskId: t.id,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔌 client disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("✅ Realtime server on http://localhost:5000");
});
