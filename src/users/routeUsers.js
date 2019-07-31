var express = require('express');
var router = express.Router();

const userValidation = require('./validationUsers');
const userController = require('./controllerUsers');


router.get('/', userController.getAllUsers);
router.post('/create', userController.insertUser);


module.exports = router;