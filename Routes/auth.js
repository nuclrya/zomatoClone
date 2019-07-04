const express = require('express');

const protectLayer = require('../middleware/auth');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login',authController.getLogin);

router.post('/login',authController.postLogin);

router.get('/signin',authController.getSignin);

router.post('/signin',authController.postSignin);

router.get('/reset-pwd',authController.getReset);

router.post('/reset-pwd',authController.postReset);

router.get('/reset-pwd/:token',authController.getNewPassword);

router.post('/new-password',authController.postNewPassword);

router.get('/logout', protectLayer, authController.getLogout);    // Add middle to all Routes which need protection 

module.exports = router;
