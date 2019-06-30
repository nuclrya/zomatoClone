const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/',adminController.getLanding);

router.get('/restaurants',adminController.getRestaurants);

router.get('/add-restaurant',adminController.getAddRestaurant);

router.post('/add-restaurant',adminController.postAddRestaurant);

module.exports = router;