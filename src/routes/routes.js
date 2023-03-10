const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

router.post('/contentType', controller.createContentType);

router.post('/contentField', controller.createContentField);

router.post('/removeContentField', controller.removeContentField);

router.get('/getAllContentType', controller.getContentType);

router.post('/getContentField', controller.getContentField);

router.post('/editContentTypeName', controller.editContentTypeName);

router.post('/addContentInstance', controller.addContentInstance);

router.post('/getAllInstancesOfContentType', controller.getAllInstancesOfContentType);

router.post('/removeContentInstance', controller.removeContentInstance);

module.exports = router;