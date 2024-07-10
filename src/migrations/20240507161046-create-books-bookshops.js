'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books_bookshops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId:{
        type: Sequelize.INTEGER,
        allowNull:false
       
        },
      bookshopId:{
          type: Sequelize.INTEGER,
          allowNull:false
         
          },
  
      quantity:{
          type: Sequelize.INTEGER
   
      } ,
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
    await queryInterface.dropTable('books_bookshops');
  }
};