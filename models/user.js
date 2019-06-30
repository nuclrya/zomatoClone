const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resSchema = new Schema ({
  name: String,
  email: String,
  cart: {
    items: [
      {
        name: { type: String , required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
})

module.exports = mongoose.model('User',resSchema);