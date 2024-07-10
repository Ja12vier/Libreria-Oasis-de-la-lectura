'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class data_sheefs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      data_sheefs.hasOne(models.books, {foreignKey:"data_sheefsId"})
      data_sheefs.belongsTo(models.authors, {foreignKey:"authorsId"})
    }
  }
  data_sheefs.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ean:{ 
      type:DataTypes.FLOAT,
      allowNull:false
    
    },
    editorial:{ 
      type:DataTypes.STRING,
      allowNull:false
    
  },
    trasnlator:{ 
    type:DataTypes.STRING,
    allowNull:false
  
}, 
   format:{ 
  type:DataTypes.STRING,
  allowNull:false

},
  country_publication:{ 
  type:DataTypes.STRING,
  allowNull:false

},
  lenguajes:{ 
  type:DataTypes.STRING,
  allowNull:false

},
  dimensions:{ 
  type:DataTypes.STRING,
  allowNull:false

},  
  peso:{ 
  type:DataTypes.STRING,
  allowNull:false

},  
  number_page:{ 
  type:DataTypes.INTEGER,
  allowNull:false

},
  date_publication:{ 
  type:DataTypes.DATE,
  allowNull:false

},
materias:{ 
  type:DataTypes.STRING,
  allowNull:false

},
authorsId:{ 
  type:DataTypes.INTEGER,
  allowNull:false

}
  }, {
    sequelize,
    modelName: 'data_sheefs',
  });
  return data_sheefs;
};