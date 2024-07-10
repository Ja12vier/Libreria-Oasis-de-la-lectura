'use strict';
const {
  Model,
  NOW
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class loans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      loans.belongsTo(models.books, {foreignKey:"bookId"})
      loans.belongsTo(models.users_clientes, {foreignKey:"users_clienteId"})
      
    }
  }
  loans.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:{
     type: DataTypes.STRING,
     allowNull: false
    },
    sur_name:{
      type: DataTypes.STRING,
      allowNull: false
     },
     email:{
      type: DataTypes.STRING,
      allowNull: false,
     },
     phone:{
      type: DataTypes.STRING,
      allowNull: false
     },
     identification_card:{
      type: DataTypes.STRING,
      allowNull: false
     },

     quantity:{
      type: DataTypes.INTEGER,
      allowNull: false
     },

     shipment:{
      type: DataTypes.ENUM,
      values:["standard", "express", "gratuitous", "store pickup", "urgent"],
      allowNull: false,
      defaultValue:"gratuitous"
     },

     sub_total:{
      type: DataTypes.DECIMAL,
      allowNull: false
     },

     total_price:{
      type: DataTypes.DECIMAL,
      allowNull: false
     },

     date_loans:{
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue:NOW
     },
     
     date_return:{
      type: DataTypes.DATE,
      allowNull:false
     },

     bookshop:{
      type: DataTypes.ENUM,
      values:["oasis_1", "oasis_2", "oasis_3", "oasis_4"],
       allowNull:false,
       defaultValue:"oasis_1"
    },

     shippind_place:{
      type:DataTypes.TEXT,
      allowNull:false,
      defaultValue:"store pickup"
     },

     users_clienteId:{
      type: DataTypes.INTEGER,
      allowNull:false
      },
     
     bookId:{
      type: DataTypes.INTEGER,
      allowNull:false
      },
     status:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
      }
      
  }, {
    sequelize,
    modelName: 'loans',
  });
  return loans;
};