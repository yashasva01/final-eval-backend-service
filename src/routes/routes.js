const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

router.post('/contentType', controller.createContentType);

module.exports = router;