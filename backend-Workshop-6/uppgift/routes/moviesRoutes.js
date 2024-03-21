const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const auth = require('../middleware/auth-middleware'); 

router.get('/movies', auth, moviesController.getAllMovies);
router.post('/movies', auth, moviesController.createMovie);
router.put('/movies/:id', auth, moviesController.updateMovie);
router.delete('/movies/:id', auth, moviesController.deleteMovie);

module.exports = router;