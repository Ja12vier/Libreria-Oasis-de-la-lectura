'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books_bookshops extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
   
    }
  }
  books_bookshops.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    bookId:{
      type: DataTypes.INTEGER,
      allowNull:false
      },
    bookshopId:{
        type: DataTypes.INTEGER,
        allowNull:false
        },

    quantity:{
        type: DataTypes.INTEGER
      
    } 
  }, {
    sequelize,
    modelName: 'books_bookshops',

  });
  return books_bookshops;
};