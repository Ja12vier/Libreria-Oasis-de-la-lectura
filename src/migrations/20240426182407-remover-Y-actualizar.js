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

    
    await queryInterface.changeColumn("authors", "descryption",{
      type: Sequelize.STRING,
      allowNull:false,
    })

    await queryInterface.changeColumn("books", "authorsId",{
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"authors",
        key:"id"
      },
      onUpdate:"SET NULL",
      onDelete:"CASCADE"
    });

    await queryInterface.changeColumn("carts", "booksId",{
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"books",
        key:"id"
      },
      onUpdate:"SET NULL",
      onDelete:"CASCADE"
    })

    await queryInterface.changeColumn("books", "gendersId",{
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"genders",
        key:"id"
      },
      onUpdate:"SET NULL",
      onDelete:"CASCADE"
    });

   

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */


    await queryInterface.removeColumn("books", "authorsId",{
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"authors",
        key:"id"
      },
      onUpdate:"SET NULL",
      onDelete:"CASCADE"
    })
    await queryInterface.changeColumn("authors", "descryption",{
      type: Sequelize.STRING,
      allowNull:false,
    })

    await queryInterface.addColumn("authors", "authorsId",{
      type: Sequelize.INTEGER,
      allowNull:false
    });

    await queryInterface.addColumn("carrts", "booksId",{
      type: Sequelize.INTEGER
    })

    await queryInterface.addColumn("books", "gendersId",{
      type: Sequelize.INTEGER,
      allowNull:false
    });

    await queryInterface.addColumn("books", "authorsId",{
      type: Sequelize.INTEGER,
      allowNull:false
    });

  }
};
