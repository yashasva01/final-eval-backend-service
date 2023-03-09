'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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