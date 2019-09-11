var express = require('express');
var router = express.Router();

const userValidation = require('./validation');
const userController = require('./controller');


router.get('/', userController.getAllUsers);

module.exports = router;