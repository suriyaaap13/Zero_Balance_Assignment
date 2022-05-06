const express = require('express');
const router = express.Router();

router.use('/users', require('./user'));
router.use('/movie', require('./movie'));

module.exports = router;