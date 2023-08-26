const express = require("express");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require("./middleware/logger");

// use logger
// app.use(logger);

// use body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set statics
app.use(express.static(path.join(__dirname, "public")));

// bring in those routes
app.use("/api/users", require("./routes/api/users"));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.listen(PORT, () => console.log("server running on port : " + PORT));
