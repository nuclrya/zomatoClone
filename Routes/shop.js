const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/',shopController.getLanding);

router.get('/restaurants',shopController.getRestaurants);

router.get('/restaurants/:restaurantId', shopController.getRestaurant);


module.exports = router;