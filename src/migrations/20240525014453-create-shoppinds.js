'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shoppinds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        quantity:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
       sub_total:{
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      shipments:{
        type: Sequelize.STRING,
        allowNull:false
    
      },
      total_price:{
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      bookshops:{
        type: Sequelize.STRING,
        allowNull:false
      },
      booksId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"books",
          key:"id"
        },
        onUpdate:"SET NULL",
        onDelete:"CASCADE"
  
      },

      users_clientesId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"users_clientes",
          key:"id"
        },
        onUpdate:"SET NULL",
        onDelete:"CASCADE"
      },
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
    await queryInterface.dropTable('shoppinds');
  }
};