const express = require("express");
const router = express.Router();

const Category = require("../../models/Category");
const Item = require("../../models/Item");

router.get("/", async (req, res) => {
  console.log("in route :", req.query.cat);
  Category.findOne({ enName: req.query.cat }).then(category => {
    if (category) {
      Item.find(
        { enCategory: req.query.cat, deleted: false },
        "_id name imageUrl"
      ).then(items => {
        res.json(items);
      });
    } else {
      res.status(400).json({ msg: "cat not exists" });
    }
  });
});

router.get("/:id", async (req, res) => {
  console.log("in route params:", req.params.id);
  const items = await Item.findOne({ _id: req.params.id }, { __v: 0 });

  res.json(items);
});

router.delete("/:id", async (req, res) => {
  if (res.locals.user.role == "admin") {
    Item.updateOne({ _id: req.params.id }, { deleted: true }).then(() => {
      res.status(204).json({ msg: "resource deleted successfully" });
    });
  } else res.status(403).json({ msg: "Forbidden request" });
});

router.post("/", async (req, res) => {
  if (res.locals.user.role == "admin") {
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
  } else {
    res.status(403).json({ msg: "Forbidden request" });
  }
});

router.patch("/", async (req, res) => {
  if (res.locals.user.role == "admin") {
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
    });
  } else {
    res.status(403).json({ msg: "Forbidden request" });
  }
  // item.save().then(it=>{
  //   res.status(201).json({msg: "created"})
  // })
});

module.exports = router;
