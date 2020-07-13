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
router.post('/uploadImage', inventoryController.uploadImage)

// //  CREATE
// router.post('/movie', movieController.createMovie);
// //  UPDATE
// router.put('/movie/:id', movieController.updateMovie);
// //  DELETE
// //  TODO: change to PUT request to update deleted flag - don't actually allow users to delete stuff from the database
// router.delete('/movie/:id', movieController.deleteMovie);
// //  GET ONE
// router.get('/movie/:id', movieController.getMovieById);
// //  GET ALL
// router.get('/movies', movieController.getMovies);

module.exports = router;