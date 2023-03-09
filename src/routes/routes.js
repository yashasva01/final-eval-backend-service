const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

router.post('/users/register', controller.registerNewUsers);

module.exports = router;