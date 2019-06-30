const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/',userController.getLanding);

router.get('/restaurants',userController.getRestaurants);

router.get('/restaurants/:restaurantId', userController.getRestaurant);


module.exports = router;