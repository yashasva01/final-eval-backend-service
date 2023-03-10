'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contentType extends Model {

    static associate(models) {
      
    }
  }
  contentType.init({
    typeName: DataTypes.STRING,
    typeFields: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'contentType',
  });
  return contentType;
};