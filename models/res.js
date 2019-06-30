const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resSchema = new Schema ({
  name: String,
  cuisine: String,
  imageUrl: String 
})

module.exports = mongoose.model('Restaurant',resSchema);