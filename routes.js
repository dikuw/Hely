const express = require('express');
const router = express.Router();

//  TODO: update for all Schemas
const aboutController = require('./controllers/aboutController');
const inventoryController = require('./controllers/inventoryController');

//  TODO: create controller exports
router.post('/message', aboutController.createMessage);

router.post('/uploadImage', inventoryController.uploadImage)

//  ** Inventory Routes **  //
//  CREATE
router.post('/item', inventoryController.createInventoryItem);
//  GET
router.get('/inventory', inventoryController.getInventory);

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