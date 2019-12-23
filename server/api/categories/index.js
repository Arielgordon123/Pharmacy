const express = require("express");
const router = express.Router();

const Category = require("../../models/Category");
const Item = require("../../models/Item");
router.get("/", async (req, res) => {
  console.log("in route :");
  const cats = await Category.find({}, { __v: 0 });
  res.json(cats);

  //   const cat = new Category({
  //     name: "test",
  //     enName: "test2"
  //   });
  //   cat
  //     .save()

  //     .then(data => {
  //       res.json(data);
  //     });
  //   res.send("OK")
});
router.post("/", async (req, res) => {
  console.log("in route add new cat:", req.body.name);
  if ( res.locals.user.role == "admin") {
    const cat = new Category({
      name: req.body.name,
      enName: req.body.enName
    });

    cat.save().then(category => {
      res.status(201).json({ msg: "category created", item: category });
    });
  }
  else
  res.status(403).json({ msg: "Forbidden request"});
});

module.exports = router;
