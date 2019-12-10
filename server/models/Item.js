const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    name:  String,
    sapName:  String,
    patarName:  String,
    serial: Number,
    authority:  String,
    category:  String,
  
    neged:  String,
    imageUrl:  String

})
module.exports = mongoose.model('Item',ItemSchema)