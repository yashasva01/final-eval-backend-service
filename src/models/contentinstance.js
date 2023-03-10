'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contentInstance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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