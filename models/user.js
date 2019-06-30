const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resSchema = new Schema ({
  cart: {
    items: [
      {
        name: { type: String , required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
})

module.exports = mongoose.model('Restaurant',resSchema);