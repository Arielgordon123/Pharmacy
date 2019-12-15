const express = require("express");
const router = express.Router();

const Category = require("../../models/Category");
const Item = require("../../models/Item");

router.get("/", async (req, res) => {
  console.log("in route :", req.query.cat);
  const items = await Item.find({ enCategory: req.query.cat }, "_id name imageUrl");

  res.json(items);
});

router.get("/:id", async (req, res) => {
  console.log("in route params:", req.params.id);
  const items = await Item.findOne({ _id: req.params.id }, { __v: 0 });

  res.json(items);
});
router.post("/", async (req, res) => {
  console.log("in route add new item:", req.body.name);
  const item = new Item({
    name: req.body.name,
    sapName: req.body.sapName,
    patarName: req.body.patarName,
    serial: req.body.serial,
    authority: req.body.authority,
    category: req.body.category,
    enCategory: req.body.enCategory,
    neged: req.body.neged,
    imageUrl: req.body.imageUrl
  });

  item.save().then(it => {
    res.status(201).json({ msg: "created" });
  });
});

router.patch("/", async (req, res) => {
  console.log("in route edit item:", req.body);

  Item.updateOne(
    {
      _id: req.body._id
    },
    {
      name: req.body.name,
      sapName: req.body.sapName,
      patarName: req.body.patarName,
      serial: req.body.serial,
      authority: req.body.authority,
      category: req.body.category,
      enCategory: req.body.enCategory,
      neged: req.body.neged,
      imageUrl: req.body.imageUrl
    }
  ).then(it => {
    res.status(201).json({ msg: "updated" });
  });;

  // item.save().then(it=>{
  //   res.status(201).json({msg: "created"})
  // })
});

module.exports = router;
