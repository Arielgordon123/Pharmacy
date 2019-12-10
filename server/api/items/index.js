const express = require("express");
const router = express.Router();

const Category = require("../../models/Category");
const Item = require("../../models/Item");

router.get("/", async (req, res) => {
  console.log("in route :",req.query.cat);
  const cats = await Item.find({enCategory:req.query.cat},{__v:0,_id:0}, { _id: 0, __v: 0 });
  console.log('cats :', cats);
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
