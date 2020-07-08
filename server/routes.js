const express = require('express');
const router = express.Router();

//  TODO: update for all Schemas
const aboutController = require('./controllers/aboutController');

//  TODO: create controller exports
router.get('/', aboutController.aboutPage); 
router.get('/about', aboutController.aboutPage);
router.get('/faq', aboutController.faqPage);
router.get('/contact', aboutController.contactPage);
router.get('/privacy', aboutController.privacyPage);
router.get('/terms', aboutController.termsPage);
router.get('/returns', aboutController.returnsPage);
router.get('/shipping', aboutController.shippingPage);
router.post('/message', aboutController.validateMessage, aboutController.saveMessage, aboutController.sendMessage);

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