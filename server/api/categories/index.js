const express = require("express");
const router = express.Router();

const Category = require("../../models/Category");
const Item = require("../../models/Item");
router.get("/", async (req, res) => {
  console.log("in route :");
  const cats = await Category.find({}, { _id: 0, __v: 0 });
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


module.exports = router;
