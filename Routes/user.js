const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json({ extended: false });


const userController = require('../controllers/user');

const router = express.Router();

router.get('/',userController.getLanding);

router.get('/restaurants',userController.getRestaurants);

router.get('/restaurants/:restaurantId', userController.getRestaurant);

router.post('/cart', jsonParser, userController.postCart);


module.exports = router;