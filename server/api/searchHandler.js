const express = require("express");
const axios = require("axios");
const router = express.Router();

const Item = require("../models/Item");

router.get("/:query", async (req, res) => {
  // console.log("in route search:", req.params.query);

  if (!isNaN(req.params.query)) {
    // search by serial
    // console.log('search by number :');
    const items = await Item.find({ serial: { $eq: Number(req.params.query)  }}, "_id name");
    res.json(items);
  } else {
    //  search by text
    // console.log('search by text :');
    const items = await Item.find({$text: { $search: req.params.query} }, "_id name");
    res.json(items);
  }
 
});
module.exports = router;
