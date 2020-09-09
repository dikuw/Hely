const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const aboutController = require('./controllers/aboutController');
const inventoryController = require('./controllers/inventoryController');
const shippingOptionsController = require('./controllers/shippingOptionsController');
const orderController = require('./controllers/orderController');
const paymentController = require('./controllers/paymentController');

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
router.post('/addItem', inventoryController.addItem);
//  UPDATE
router.post('/updateItem', inventoryController.updateItem)
//  POST IMAGE
router.post('/uploadImage', inventoryController.uploadImage);

//  ** Shipping Option Routes **  //
//  GET
router.get('/getShippingOptions', shippingOptionsController.getItems);
//  CREATE
router.post('/addShippingOption', shippingOptionsController.addItem);
//  UPDATE
router.post('/updateShippingOption', shippingOptionsController.updateItem)


//  ** Order Routes **  //
//  GET
router.get('/getOrders', orderController.getOrders);
router.get('/getUserOrders/:id', orderController.getUserOrders);
//  CREATE
router.post('/postOrder', orderController.postOrder);
//  UPDATE
router.put('/putOrder', orderController.putOrder);

//  ** Payment Routes **  //
router.post('/stripe/createPaymentIntent', paymentController.postCreatePaymentIntent);

module.exports = router;