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


    await queryInterface.addColumn("carts", "bookshop",{

      type: Sequelize.ENUM,
      values:["oasis_1", "oasis_2", "oasis_3", "oasis_4"],
      allowNull:false,
      defaultValue:"oasis_1"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn("carts", "bookshop")
  }
};
