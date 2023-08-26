const express = require("express");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT || 5000;
const users = require("./users");
const logger = require("./middleware/logger");

// use logger
// app.use(logger);

app.use(express.static(path.join(__dirname, "public")));

// Set statics
app.get("/api/users", (req, res) => {
  res.json(users);
});

// get individual user
app.get("/api/users/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    res.json(users.filter((user) => user.id.toString() === req.params.id));
  } else {
    res.status(400);
    res.json({ msg: "user not found" });
  }
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.listen(PORT, () => console.log("server running on port : " + PORT));
