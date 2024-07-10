'use strict';

const { NOW } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
       },
       sur_name:{
         type: Sequelize.STRING,
         allowNull: false
        },
        email:{
         type: Sequelize.STRING,
         allowNull: false,
        },
        phone:{
         type: Sequelize.STRING,
         allowNull: false
        },
        identification_card:{
         type: Sequelize.STRING,
         allowNull: false
        },
   
        quantity:{
         type: Sequelize.INTEGER,
         allowNull: false
        },
   
        shipment:{
         type: Sequelize.ENUM,
         values:["standard", "express", "gratuitous", "store pickup", "urgent"],
         allowNull: false,
         defaultValue:"gratuitous"
        },
   
        sub_total:{
         type: Sequelize.DECIMAL,
         allowNull: false
        },
   
        total_price:{
         type: Sequelize.DECIMAL,
         allowNull: false
        },
   
        date_loans:{
         type: Sequelize.DATE,
         allowNull:false,
         defaultValue:NOW
        },
        
        date_return:{
         type: Sequelize.DATE,
         allowNull:false
        },
   
        bookshop:{
         type: Sequelize.ENUM,
         values:["oasis_1", "oasis_2", "oasis_3", "oasis_4"],
          allowNull:false,
          defaultValue:"oasis_1"
       },
        users_clienteId:{
         type: Sequelize.INTEGER,
         allowNull:false,
         references:{
          model:"users_clientes",
          key: "id"
         },
         onUpdate:"SET NULL",
         onDelete:"CASCADE"
         },
        
        bookId:{
         type: Sequelize.INTEGER,
         allowNull:false,
         references:{
          model:"books",
          key: "id"
         },
         onUpdate:"SET NULL",
         onDelete:"CASCADE"
         },
        status:{
         type: Sequelize.BOOLEAN,
         allowNull:false,
         defaultValue:true
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
    await queryInterface.dropTable('loans');
  }
};