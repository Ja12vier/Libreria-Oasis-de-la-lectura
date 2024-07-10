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

    await queryInterface.addColumn("loans", "shippind_place",{
      type:Sequelize.TEXT,
      allowNull:false,
      defaultValue:"store pickup"
     });

     
    await queryInterface.addColumn("shoppinds", "shippind_place",{
      type:Sequelize.TEXT,
      allowNull:false,
      defaultValue:"store pickup"
     });

     
    await queryInterface.addColumn("carts", "shippind_place",{
      type:Sequelize.TEXT,
      allowNull:false,
      defaultValue:"store pickup"
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("loans", "shippind_place")
    await queryInterface.removeColumn("shoppinds", "shippind_place")
    await queryInterface.removeColumn("carts", "shippind_place")
  }
};
