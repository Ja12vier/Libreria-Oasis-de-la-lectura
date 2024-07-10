'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      carts.belongsTo(models.books,{foreignKey: "booksId"})
      carts.belongsTo(models.users_clientes, {foreignKey: "users_clientesId"})
    }
  }
  carts.init({
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
      type: DataTypes.ENUM("standard", "express", "gratuitous", "store pickup", "urgent" ),
      allowNull:false,
      defaultValue:"gratuitous"
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
      type: DataTypes.ENUM,
      values:["oasis_1", "oasis_2", "oasis_3", "oasis_4"],
       allowNull:false,
       defaultValue:"oasis_1"
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
    modelName: 'carts',
  });
  return carts;
};