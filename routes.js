const express = require('express');
const router = express.Router();

//  TODO: update for all Schemas
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const aboutController = require('./controllers/aboutController');
const inventoryController = require('./controllers/inventoryController');

//  TODO: create controller exports
router.post('/message', aboutController.createMessage);

//  ** User Routes **  //
router.post('/register', 
  userController.validateRegister,
  userController.checkAlreadyRegistered,
  userController.register,
  authController.login
);
router.post('/login', authController.login);
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

module.exports = router;