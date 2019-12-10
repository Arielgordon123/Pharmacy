const express = require("express");
const router = express.Router();

const Category = require("../../models/Category");
const Item = require("../../models/Item");

router.get("/", async (req, res) => {
  console.log("in route :",req.query.cat);
  const cats = await Item.find({enCategory:req.query.cat},{__v:0,_id:0}, { _id: 0, __v: 0 });
  
  res.json(cats);
});


module.exports = router;
