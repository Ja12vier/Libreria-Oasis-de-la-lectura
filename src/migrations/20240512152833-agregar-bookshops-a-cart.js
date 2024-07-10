'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn("carts", "bookshops",{

      type: Sequelize.ENUM("Oasis de la lectura 1",
       "Oasis de la lectura 2", "Oasis de la lectura 3", 
       "Oasis de la lectura 4"),
       defaultValue:"Oasis de la lectura 1",
       allowNull:false
    })
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("carts", "bookshops")
  }
};
