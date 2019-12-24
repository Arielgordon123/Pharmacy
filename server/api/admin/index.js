const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const moment = require("moment");
const tz = require("moment-timezone");

router.get("/users", async (req, res) => {
  if (res.locals.user.role == "admin") {
    User.find({}, { __v: 0, hashedPassword: 0 }).then(users => {
      let newArr = users.map(user => {
        let temp = JSON.parse(JSON.stringify(user));
        temp.lastLogin = moment
          .utc(temp.lastLogin)
          .local()
          .format("HH:mm:ss YYYY-MM-DD");
        return temp;
      });
      res.json(newArr);
    });
  } else {
    res.status(403).json({ msg: "Forbidden request" });
  }
});

module.exports = router;
