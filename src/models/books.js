'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      books.belongsTo(models.authors, {foreignKey:"authorsId"})
      books.belongsTo(models.images, {foreignKey: "imagesId"})
      books.belongsTo(models.data_sheefs, {foreignKey: "data_sheefsId"})
      books.belongsTo(models.genders,  {foreignKey: "gendersId"})
      books.belongsToMany(models.bookshops, {through:"books_bookshops"})
      books.belongsToMany(models.users_clientes, {through:"users_clientes_books"})
      books.hasMany(models.carts,  {foreignKey: "booksId"})
      books.hasMany(models.shoppinds,{foreignKey:"booksId"})
      books.hasMany(models.loans, {foreignKey:"bookId"})
      books.hasMany(models.comments, {foreignKey:"bookId"})
    }
  }
  books.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name_books:{ 
      type: DataTypes.STRING,
      allowNull:false
    
    },
    detail:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull:false
    },

    date_publication:{
      type: DataTypes.DATE,
      allowNull:false
    },
    price_loans:{
      type: DataTypes.DECIMAL,
      allowNull:false
    },
    //authors.hasMany(models.books)
    //authors.hasMany(models.data_sheefs)
    editors:{
      type: DataTypes.STRING,
      allowNull:false
    },
    
    authorsId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    imagesId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    
    data_sheefsId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },

    gendersId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },


    status:{
      type:DataTypes.ENUM("activo", "inactivo", "pendiente"),
      allowNull:false,
      defaultValue:"activo"
    }

  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};