'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookshops extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      bookshops.belongsToMany(models.books, {through:"books_bookshops"})

    
    }
  }
  bookshops.init({
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
    province:{
      type: DataTypes.STRING,
      allowNull:false
    
    },
    city:{
      type: DataTypes.STRING,
      allowNull:false
    
    }
  }, {
    sequelize,
    modelName: 'bookshops',
  });
  return bookshops;
};