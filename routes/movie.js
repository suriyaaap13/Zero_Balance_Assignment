const express = require('express');
const router = express.Router();
const verify = require('../config/verifyToken');

const movieController = require('../controllers/movie_controller');

router.get('/list', verify, movieController.movieList);
router.post('/rate/:id', verify, movieController.rateMovie);
router.get('/open-list', movieController.openList);
router.get('/search', movieController.search);

module.exports = router;