const express = require('express');
const router = express.Router();

const orgzController = require('./controller');
const orgzValidation = require('./validation');

router.get('/', orgzController.getAllOrgz);
// router.post('/create', orgzValidation.createOrgzValidation, orgzController.insertOrgz);

module.exports = router;