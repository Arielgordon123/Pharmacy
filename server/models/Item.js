const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  name: String,
  sapName: String,
  patarName: String,
  serial: Number,
  authority: String,
  category: String,
  enCategory: String,
  neged: String,
  imageUrl: String,
  deleted: { type: Boolean, default: false }
});
module.exports = mongoose.model("Item", ItemSchema);
