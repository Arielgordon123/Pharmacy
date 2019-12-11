const express = require("express");
const router = express.Router();

const Category = require("../../models/Category");
const Item = require("../../models/Item");

router.get("/", async (req, res) => {
  console.log("in route :",req.query.cat);
  const cats = await Item.find({enCategory:req.query.cat},'_id name');
  
  res.json(cats);
});

router.get("/:id", async (req, res) => {
  console.log("in route params:",req.params.id);
  const cats = await Item.findOne({_id:req.params.id},{__v:0});
  
  res.json(cats);
});


module.exports = router;
