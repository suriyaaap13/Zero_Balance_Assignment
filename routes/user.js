const express = require('express');
const router = express.Router();

// import the user Controller
const userController = require('../controllers/user_controller');

// importing actions of user_controller
router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;