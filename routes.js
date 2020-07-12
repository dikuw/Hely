const express = require('express');
const router = express.Router();

//  TODO: update for all Schemas
const aboutController = require('./controllers/aboutController');

//  TODO: create controller exports
// router.post('/message', aboutController.validateMessage, aboutController.saveMessage, aboutController.sendMessage);
router.post('/message', aboutController.createMessage);
// router.post('/message', aboutController.createMessage);
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