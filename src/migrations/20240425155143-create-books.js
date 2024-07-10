'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_books:{ 
        type: Sequelize.STRING,
        allowNull:false
      
      },
      detail:{
        type: Sequelize.STRING,
        allowNull:false
      },
      price:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
      date_publication:{
        type: Sequelize.DATE,
        allowNull:false
      },
      price_loans:{
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      
      editors:{
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      
      authorsId:{
        type: Sequelize.INTEGER,
        allowNull:false
        
      },
      imagesId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"images",
          key:"id"
        },
        onUpdate:"SET NULL",
        onDelete:"CASCADE"
      },
      
      data_sheefsId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"data_sheefs",
          key:"id"
        },
        onUpdate:"SET NULL",
        onDelete:"CASCADE"
      },
  
      gendersId:{
        type: Sequelize.INTEGER,
        allowNull:false
       
      },
  
  
      status:{
        type:Sequelize.ENUM("activo", "inactivo", "pendiente"),
        allowNull:false,
        defaultValue:"activo"
      }
  ,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};