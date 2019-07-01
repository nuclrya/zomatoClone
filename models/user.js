const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: String,
  email: String,
  cart: {
    items: [
      {
        name: String,
        quantity: Number
      }
    ]
  }
})

userSchema.methods.addToCart = function(cart) {
  this.cart.items = cart;
  return this.save()
};

module.exports = mongoose.model('User',userSchema);