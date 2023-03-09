const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

router.get('/', controller.landingpage);

module.exports = router;