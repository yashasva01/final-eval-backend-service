'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contentInstance extends Model {

    static associate(models) {

    }
  }
  contentInstance.init({
    instanceName: DataTypes.STRING,
    contentType: DataTypes.STRING,
    instanceData: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'contentInstance',
  });
  return contentInstance;
};