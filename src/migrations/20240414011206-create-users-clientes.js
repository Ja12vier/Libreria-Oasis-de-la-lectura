'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_cliente:{ 
        type:Sequelize.STRING,
        allowNull:false
       
       },
   
       last_name:{ 
         type:Sequelize.STRING,
         allowNull:false
        
        },
        phone:{ 
         type:Sequelize.DECIMAL,
         allowNull:false
        
        },
        email:{ 
         type:Sequelize.STRING,
         allowNull:false,
         unique:true
        
        },
        password:{ 
         type:Sequelize.STRING,
         allowNull:false
        
        },
        
        province:{ 
         type:Sequelize.STRING,
         allowNull:false
        
        },
        city:{ 
         type:Sequelize.STRING,
         allowNull:false
        
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
    await queryInterface.dropTable('users_clientes');
  }
};