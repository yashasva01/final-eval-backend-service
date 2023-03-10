const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();
// const {Schema, Validate} = require('../middlewares/validator');

router.post('/contentType', //Validate(Schema.createContentTypeSchema, 'body'),
  controller.createContentType);

router.post('/contentField', //Validate(Schema.createContentFieldSchema, 'body'), 
  controller.createContentField);

router.post('/removeContentField', //Validate(Schema.removeContentFieldSchema, 'body'), 
  controller.removeContentField);

router.get('/getAllContentType',controller.getContentType);

router.post('/getContentField', //Validate(Schema.getContentFieldSchema, 'body'), 
  controller.getContentField);

router.post('/editContentTypeName', //Validate(Schema.editContentTypeNameSchema, 'body'), 
  controller.editContentTypeName);

router.post('/addContentInstance', //Validate(Schema.addContentInstanceSchema, 'body'), 
  controller.addContentInstance);

router.post('/getAllInstancesOfContentType', //Validate(Schema.getAllInstancesOfContentTypeSchema, 'body'), 
  controller.getAllInstancesOfContentType);

router.post('/removeContentInstance', //Validate(Schema.removeContentInstanceSchema, 'body'), 
  controller.removeContentInstance);

router.post('/editContentInstance', //Validate(Schema.editContentInstanceSchema, 'body'), 
  controller.editContentInstance);

module.exports = router;