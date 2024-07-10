
const bcrypt=require("bcrypt");
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    users_clientes.belongsToMany(models.books, {through:"usersClientes_books"})
    users_clientes.hasOne(models.carts, {foreignKey: "users_clientesId"})
    users_clientes.hasMany(models.shoppinds, {foreignKey:"users_clientesId"})
    users_clientes.hasMany(models.loans, {foreignKey:"bookId"})
    }
  }
  users_clientes.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name_cliente:{ 
     type:DataTypes.STRING,
     allowNull:false
    
    },

    last_name:{ 
      type:DataTypes.STRING,
      allowNull:false
     
     },
     phone:{ 
      type:DataTypes.STRING,
      allowNull:false
     
     },
     email:{ 
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
     
     },
     password:{ 
      type:DataTypes.STRING,
      allowNull:false
     
     },
     
     province:{ 
      type:DataTypes.STRING,
      allowNull:false
     
     },
     city:{ 
      type:DataTypes.STRING,
      allowNull:false
     }
     


  }, {
    sequelize,
    modelName: 'users_clientes',
  });
  users_clientes.beforeCreate(async(users_clientes)=>{
    const encriptarPassword= await bcrypt.hash(users_clientes.password, 10)
    users_clientes.password=encriptarPassword;
  })

  users_clientes.beforeUpdate(async(users_clientes)=>{
    const encriptarPassword= await bcrypt.hash(users_clientes.password, 10)
    users_clientes.password=encriptarPassword
   })
  
  users_clientes.prototype.toJSON=function(){
    const values=Object.assign({}, this.get())
    delete values.password
    return values
  }



  return users_clientes;
};
