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

    await queryInterface.renameColumn("carts", "users_sheefsId", "users_clientesId")

    await queryInterface.addColumn("carts","shipments", {
      type: Sequelize.ENUM("standard", "express", "gratuitous", "store pickup", "urgent " ),
      allowNull:false,
      defaultValue:"gratuitous"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.renameColumn("carts", "users_clientesId","users_sheefsId")

    await queryInterface.removeColumn("carts","shipment", {
      type: Sequelize.ENUM("Standard", "Express", "gratuitous", "Store pickup", "urgent " ),
      allowNull:false
      
    })
  }
};
