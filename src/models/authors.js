'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here   
      authors.hasMany(models.books, {foreignKey: "authorsId"})
    authors.hasMany(models.data_sheefs, {foreignKey: "authorsId"})
    }
  }
  authors.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    descryption:{
      type: DataTypes.TEXT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'authors',
  });
  return authors;
};