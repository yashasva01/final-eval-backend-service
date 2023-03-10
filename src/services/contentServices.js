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

async function addContentInstance(instanceName, contentType, instanceData){
  if(!contentType && !instanceData){
    return { status: 400, message: 'Content type and instance data are required' };
  }
  try{
    const contentInstance = await db.contentInstance.findOne({ where: { instanceName: instanceName } });
    if (contentInstance) {
      return { status: 400, message: 'Content instance already exists' };
    }
    const content = await db.contentType.findOne({ where: { typeName: contentType } });
    if (!content) {
      return { status: 400, message: 'Content type does not exist' };
    }
    const typeFields = content.dataValues.typeFields;
    console.log('the following typefields' + typeFields);
    const instanceFields = Object.keys(instanceData);
    console.log('the following instancefields' + instanceFields);
    if (typeFields.length !== instanceFields.length) {
      return { status: 400, message: 'Content instance fields do not match content type fields' };
    }
    for (let i = 0; i < typeFields.length; i++) {
      console.log(typeFields[i]);
      if (!typeFields.includes(instanceFields[i])) {
        return { status: 400, message: 'Content instance fields do not match content type fields' };
      }
    }
    await db.contentInstance.create({ instanceName: instanceName, instanceData: instanceData, contentType: contentType });
    return { status: 200, message: 'Content instance created successfully' };
  }catch(err){
    return { status: 500, message: 'Internal server error' };
  }
}

async function getAllInstancesOfContentType (contentType) {
  if (!contentType) {
    return { status: 400, message: 'Content type is required' };
  }
  try{
    const content = await db.contentType.findOne({ where: { typeName: contentType } });
    if (!content) {
      return { status: 400, message: 'Content type does not exist' };
    }
    const contentInstances = await db.contentInstance.findAll({ where: { contentType: contentType } });
    if (!contentInstances) {
      return { status: 400, message: 'Content instances do not exist' };
    }
    const allContentInstances = [];
    contentInstances.map(contentInstance => {
      allContentInstances.push(contentInstance.dataValues);
    });
    console.log(allContentInstances);
    return { status: 200, message: {message: 'Content instances retrieved successfully', data: allContentInstances} };
  }catch(err){
    return { status: 500, message: 'Internal server error' };
  }
}

async function removeContentInstance(instanceName) {
  if (!instanceName) {
    return { status: 400, message: 'Name is required' };
  }
  try{
    const contentInstance = await db.contentInstance.findOne({ where: { instanceName: instanceName } });
    if (!contentInstance) {
      return { status: 400, message: 'Content instance does not exist' };
    }
    await db.contentInstance.destroy({ where: { instanceName: instanceName } });
    return { status: 200, message: 'Content instance removed successfully' };
  }catch(err){
    return { status: 500, message: 'Internal server error' };
  }
}
async function editContentInstance (typeName, typeField) {
  if(!typeName && !typeField){
    return { status: 400, message: 'Content type and field are required' };
  }
  try{
    const listOfInstances = await db.contentInstance.findAll({ where: { contentType: typeName } });
    if (!listOfInstances) {
      return { status: 400, message: 'Content instances do not exist' };
    }
    const allContentInstances = [];
    listOfInstances.map(contentInstance => {
      allContentInstances.push(contentInstance.dataValues);
    }
    );
    let instanceFields = [];
    for (let i = 0; i < allContentInstances.length; i++) {
      const instanceData = { instanceName: allContentInstances[i].instanceName, ...allContentInstances[i].instanceData};
      instanceFields = [...instanceFields, Object(instanceData)];
    }
    for (let i = 0; i < instanceFields.length; i++) {
      let instanceField = instanceFields[i];
      for(let key in instanceField){
        if(key === typeField){
          delete instanceField[key];
        }
      }
      for (let i = 0; i < instanceFields.length; i++) {
        let currentKey =''; 
        const instanceField = instanceFields[i];
        for(let key in instanceField){
          if(key === 'instanceName'){
            currentKey = instanceField[key];
            delete instanceField[key];
          }
          if(key === typeField){
            delete instanceField[key];
          }
        }
        await db.contentInstance.update({ instanceData: instanceField }, { where: { instanceName: currentKey }});
      }
      return { status: 200, message: 'Content instance updated successfully' };
    }
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
  editContentTypeName,
  addContentInstance,
  getAllInstancesOfContentType,
  removeContentInstance,
  editContentInstance
};