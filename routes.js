const express = require('express');
const router = express.Router();

//  TODO: update for all Schemas
const aboutController = require('./controllers/aboutController');
const inventoryController = require('./controllers/inventoryController');

//  TODO: create controller exports
router.post('/message', aboutController.createMessage);

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