const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // 👈 needed to read POST body

let users = [];

app.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(user);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
