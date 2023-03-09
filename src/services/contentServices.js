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

async function removeContentField (name, field) {
  if(!name && !field){
    return { status: 400, message: 'Name and field are required' };
  }try{
    const contentType = await db.contentType.findOne({ where: { typeName: name } });
    if (!contentType) {
      return { status: 400, message: 'Content type does not exist' };
    }
    const typeFields = contentType.dataValues.typeFields;
    if (!typeFields.includes(field)) {
      return { status: 400, message: 'Content field does not exist' };
    }
    const index = typeFields.indexOf(field);
    typeFields.splice(index, 1);
    await db.contentType.update({ typeFields: typeFields }, { where: { typeName: name } });
    return { status: 200, message: 'Content field removed successfully' };
  }catch(err){
    return { status: 500, message: 'Internal server error' }; 
  }
}

async function getContentType () {
  try{
    const contentTypes = await db.contentType.findAll();
    const allContentTypes = [];
    contentTypes.map(contentType => {
      allContentTypes.push(contentType.dataValues.typeName);
    });
    if (!contentTypes) {
      return { status: 400, message: 'Content type does not exist' };
    }
    return { status: 200, message: {message: 'Content type retrieved successfully', data: allContentTypes} };
  }catch(err){
    return { status: 500, message: 'Internal server error' };
  }
}

async function getContentField (name) {
  if (!name) {
    return { status: 400, message: 'Name is required' };
  }
  try{
    const contentType = await db.contentType.findOne({ where: { typeName: name } });
    if (!contentType) {
      return { status: 400, message: 'Content type does not exist' };
    }
    const typeFields = contentType.dataValues.typeFields;
    console.log(typeFields);
    return { status: 200, message: {message: 'Content field retrieved successfully', data: typeFields} };
  }catch(err){
    return { status: 500, message: 'Internal server error' };
  }
}

async function editContentTypeName (oldName, newName) {
  if (!newName && !oldName) {
    return { status: 400, message: 'Name is required' };
  }
  try{
    const contentType = await db.contentType.findOne({ where: { typeName: oldName } });
    if (!contentType) {
      return { status: 400, message: 'Content type does not exists' };
    }
    await db.contentType.update({ typeName: newName }, { where: { typeName: oldName } });
    return { status: 200, message: 'Content type name edited successfully' };
  }catch(err){
    return { status: 500, message: 'Internal server error' };
  }
}

module.exports = {
  createContentType,
  createContentField,
  removeContentField,
  getContentType,
  getContentField,
  editContentTypeName
};