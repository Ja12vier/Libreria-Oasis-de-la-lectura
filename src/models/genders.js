'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      genders.hasMany(models.books, {foreignKey: "gendersId"})
    }
  }
  genders.init({
    name_gender:{
      type: DataTypes.STRING,
      allowNull:false
  }
  }, {
    sequelize,
    modelName: 'genders',
  });
  return genders;
};