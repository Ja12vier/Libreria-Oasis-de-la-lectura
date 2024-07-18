'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
          min:1,
          max:5
        }
      },
      bookId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"books",
          key:"id"
        },
        onUpdate:"SET NULL",
        onDelete: "CASCADE"
  
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
    await queryInterface.dropTable('comments');
  }
};