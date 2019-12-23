const express = require("express");
const router = express.Router();
const User = require("../../models/User");
router.get("/users", async (req, res) => {
  if (res.locals.user.role == "admin") {
    const users = await User.find({}, { __v: 0, hashedPassword: 0 });
    res.json(users);
  } else {
    res.status(403).json({ msg: "Forbidden request"});
  }
});

module.exports = router;
