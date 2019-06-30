const Restaurant = require('../models/res');


exports.getAddRestaurant = (req, res, next) => {
    res.render('admin/restaurantForm', {
        pageTitle: 'Add Restaurant'
      });
}


exports.postAddRestaurant = (req, res, next) => {
    const name = req.body.name;
    const image = req.file;
    const cuisine = req.body.cuisine;
    const imageUrl = "images/" + image.filename;
    const restaurant = new Restaurant({
        name: name,
        imageUrl: imageUrl,
        cuisine: cuisine,
    });
    restaurant
        .save()
        .then(result => {
          res.redirect('/restaurants');
        })
        .catch(err => {
          console.log(err);
        });
}