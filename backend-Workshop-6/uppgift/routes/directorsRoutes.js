const express = require('express');
const router = express.Router();
const directorsController = require('../controllers/directorsController');

router.get('/directors', directorsController.getAllDirectors);
router.post('/directors', directorsController.createDirector);
router.put('/directors/:id', directorsController.updateDirector);
router.delete('/directors/:id', directorsController.deleteDirector);

module.exports = router;