const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

router.post('/contentType', controller.createContentType);

router.post('/contentField', controller.createContentField);

module.exports = router;