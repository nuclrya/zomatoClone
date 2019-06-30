const Restaurant = require('../models/res');

exports.getLanding = (req, res, next) => {
    res.render('landing',{
        pageTitle: 'Zomato'
    })
}

exports.getRestaurants = (req, res, next) => {
    Restaurant.find()
    .then(result => {
      res.render('restaurant/res-list', {
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
        res.render('shop/menu', {
          restaurant: restaurant,
          pageTitle: restaurant.title
        });
      })
      .catch(err => console.log(err));
  };