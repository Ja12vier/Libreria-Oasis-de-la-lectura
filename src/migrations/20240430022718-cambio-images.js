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
    await queryInterface.changeColumn("images", "url", {
      type: Sequelize.TEXT,
      allowNull:false
    })

    await queryInterface.changeColumn("images", "publicId", {
      type: Sequelize.STRING,
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

    await queryInterface.changeColumn("images", "url", {
      type: Sequelize.STRING,
      allowNull:false
    })

    await queryInterface.changeColumn("images", "publicId", {
      type: Sequelize.INTEGER,
        allowNull:false
    })
  }
};
