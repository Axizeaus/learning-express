const express = require("express");
const router = express.Router();
const users = require("../../Users");
const uuid = require("uuid");

// get all users.
router.get("/", (req, res) => {
  res.json(users);
});

// get individual user
router.get("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    res.json(users.filter((user) => user.id.toString() === req.params.id));
  } else {
    res.status(400);
    res.json({ msg: "user not found" });
  }
});

// create member
router.post("/", (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ msg: "please provide a name and email" });
  }

  users.push(newUser);
  res.json(users);
});

// update user
router.put("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    const updateUser = req.body;

    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.email = updateUser.email ? updateUser.email : user.email;
        res.json({ msg: "user updated", user });
      }
    });
  } else {
    res.status(400);
    res.json({ msg: `there is no user with id: ${req.params.id}` });
  }
});

// delete user
router.delete("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "user deleted successfully",
      users: users.filter((user) => user.id.toString() !== req.params.id),
    });
  } else {
    res.status(400);
    res.json({ msg: "user not found" });
  }
});

module.exports = router;
