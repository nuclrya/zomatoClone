const Restaurant = require('../models/res');


exports.getAddRestaurant = (req, res, next) => {
    res.render('admin/restaurantForm', {
        pageTitle: 'Add Restaurant'
      });
}


exports.postAddRestaurant = (req, res, next) => {
    const name = req.body.name;
    const imageUrl = req.file;
    const cuisine = req.body.cuisine;
    const restaurant = new Restaurant({
        name: name,
        imageUrl: imageUrl,
        cuisine: cuisine,
    });
    restaurant
        .save()
        .then(result => {
          console.log('Created Product');
          res.redirect('/restaurants');
        })
        .catch(err => {
          console.log(err);
        });
}