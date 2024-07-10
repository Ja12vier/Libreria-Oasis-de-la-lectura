'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shoppinds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      shoppinds.belongsTo(models.users_clientes,{foreignKey:"users_clientesId"})
      shoppinds.belongsTo(models.books,{foreignKey:"booksId"})
    }
  }
  shoppinds.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
      quantity:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
     sub_total:{
      type: DataTypes.DECIMAL,
      allowNull:false
    },
    shipments:{
      type: DataTypes.STRING,
      allowNull:false
  
    },
    shippind_place:{
      type:DataTypes.TEXT,
      allowNull:false,
      defaultValue:"store pickup"
     },
    total_price:{
      type: DataTypes.DECIMAL,
      allowNull:false
    },
    bookshop:{
      type: DataTypes.STRING,
      allowNull:false
    },
    booksId:{
      type: DataTypes.INTEGER,
      allowNull:false

    },
    users_clientesId:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'shoppinds',
  });
  return shoppinds;
};