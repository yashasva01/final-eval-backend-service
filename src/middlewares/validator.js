const joi = require ('joi');

const createContentTypeSchema = joi.object ({
  name: joi.string().required(),
});
const createContentFieldSchema = joi.object ({
  name: joi.string().required(),
  field: joi.string().required(), 
});
const removeContentFieldSchema = joi.object ({
  name: joi.string().required(),
  field: joi.string().required(), 
});
const getContentFieldSchema = joi.object ({
  name: joi.string().required(),
});
const editContentTypeNameSchema = joi.object ({
  oldName: joi.string().required(),
  newName: joi.string().required(),
});
const addContentInstanceSchema = joi.object ({
  instanceName: joi.string().required(),
  contentType: joi.string().required(),
  instanceData: joi.object().required(),
});
const getAllInstancesOfContentTypeSchema = joi.object ({
  contentType: joi.string().required(),
});
const removeContentInstanceSchema = joi.object ({
  instanceName: joi.string().required(),
});
const editContentInstanceSchema = joi.object ({
  typeName: joi.string().required(),
  typeField: joi.string().required(),
});

const Validate = (schema, data) => (req, res, next) => {
  if (req.headers['x-access-token']) {
    const object = { authorization: req.headers['x-access-token'] };
    
    const { error } = schema.validate(object);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  } else {
    const { error } = schema.validate(data);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  }
};
const Schemas = {createContentTypeSchema,
  createContentFieldSchema,
  removeContentFieldSchema,
  getContentFieldSchema,
  editContentTypeNameSchema,
  addContentInstanceSchema,
  getAllInstancesOfContentTypeSchema,
  removeContentInstanceSchema,
  editContentInstanceSchema
};

module.exports = {Schemas, Validate};