var express = require('express');
var router = express.Router();

const middleware = require(`${__helpers}/middleware`);
const UserController = require('./controllerUsers');


router.post('/login', UserController.login);

router.get('/users', middleware.auth, UserController.getAllUsers);
router.get('/add', UserController.insertUser); // change this to post


module.exports = router;