const express = require('express');
const router = express.Router();
const passport = require('passport');
//  TODO: update for all Schemas
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const aboutController = require('./controllers/aboutController');
const inventoryController = require('./controllers/inventoryController');
const orderController = require('./controllers/orderController');

//  TODO: create controller exports
router.post('/message', aboutController.createMessage);

//  ** User Routes **  //
router.get('/getUser', userController.getCurrentUser);
router.post('/register', 
  userController.validateRegister,
  userController.checkAlreadyRegistered,
  userController.register,
  passport.authenticate('local'),
  authController.login
);
router.post('/login', authController.passportLocal, authController.login);
router.post('/auth/facebook', authController.passportFB, authController.login);
router.get('/auth/facebook/callback', authController.login);
router.post('/auth/instagram', authController.passportIG, authController.login);
router.get('/auth/instagram/callback', authController.login);
router.post('/auth/twitter', authController.passportTW, authController.login);
router.get('/auth/twitter/callback', authController.login);
router.post('/logout', authController.logout);
router.post('/forgot', authController.forgot);

//  ** Inventory Routes **  //
//  GET
router.get('/getInventory', inventoryController.getInventory);
//  CREATE
router.post('/postItem', inventoryController.postItem);
//  UPDATE
router.put('/putInventory', inventoryController.archiveInventory, inventoryController.putInventory);
//  POST IMAGE
router.post('/uploadImage', inventoryController.uploadImage);

//  ** Order Routes **  //
//  GET
router.get('/getOrders', orderController.getOrders);
router.get('/getUserOrders', orderController.getUserOrders);
//  CREATE
router.post('/postOrder', orderController.postOrder);
//  UPDATE
router.put('/putOrder', orderController.putOrder);

module.exports = router;