const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: String,
    enName: String

})
module.exports = mongoose.model('Category',CategorySchema)