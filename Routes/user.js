const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json({ extended: false });
const protectLayer = require('../middleware/auth');



const userController = require('../controllers/user');

const router = express.Router();

router.get('/',userController.getLanding);

router.get('/restaurants',userController.getRestaurants);

router.get('/restaurants/:restaurantId', userController.getRestaurant);

router.post('/cart',protectLayer,  jsonParser, userController.postCart);


module.exports = router;