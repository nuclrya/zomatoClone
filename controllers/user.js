const Restaurant = require('../models/res');

exports.getLanding = (req, res, next) => {
      res.render('user/home',{
        pageTitle: 'Zomato'
    })
}

exports.getRestaurants = (req, res, next) => {
    Restaurant.find()
    .then(result => {
      res.render('user/resList', {
        prods: result,
        pageTitle: 'All Restaurants',
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getRestaurant = (req, res, next) => {
    const resId = req.params.restaurantId;
    Restaurant.findById(resId)
      .then(restaurant => {
        res.render('user/menu', {
          restaurant: restaurant,
          pageTitle: restaurant.name,
          csrfToken: req.csrfToken()
        });
      })
      .catch(err => console.log(err));
  };

exports.postCart = (req, res, next) => {
    const cart  = req.body.item;
    req.user.addToCart(cart)
      .then(result => {
        res.status(200).json({
          message: "success"
        })
      });
}