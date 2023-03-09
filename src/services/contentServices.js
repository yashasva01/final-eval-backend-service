const db = require('../models');

async function createContentType (name) {
  if (!name) {
    return { status: 400, message: 'Name is required' };
  }
  try{
    const contentName = await db.contentType.findOne({ where: { typeName: name } });
    if (contentName) {
      return { status: 400, message: 'Content type already exists' };
    }
    const contentType = await db.contentType.create({ typeName: name, typeFields: []});
    return { status: 200, message: {message: 'Content type created successfully', data: contentType.dataValues} };
  }catch(err){
    return { status: 500, message: 'Internal server error' }; 
  }
}

async function createContentField (name, field) {
  if(!name && !field){
    return { status: 400, message: 'Name and field are required' };
  }
  try{
    const contentType = await db.contentType.findOne({ where: { typeName: name } });
    if (!contentType) {
      return { status: 400, message: 'Content type does not exist' };
    }
    const typeFields = contentType.dataValues.typeFields;
    if (typeFields.includes(field)) {
      return { status: 400, message: 'Content field already exists' };
    }
    typeFields.push(field);
    await db.contentType.update({ typeFields: typeFields }, { where: { typeName: name } });
    return { status: 200, message: 'Content field created successfully' };
  }catch(err){
    return { status: 500, message: 'Internal server error' }; 
  }
}

module.exports = {
  createContentType,
  createContentField
};