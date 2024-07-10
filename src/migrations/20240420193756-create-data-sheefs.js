'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('data_sheefs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
    ean:{ 
      type:Sequelize.INTEGER,
      allowNull:false
    
    },
    editorial:{ 
      type:Sequelize.STRING,
      allowNull:false
    
  },
    trasnlator:{ 
    type:Sequelize.STRING,
    allowNull:false
  
}, 
   format:{ 
  type:Sequelize.STRING,
  allowNull:false

},
  country_publication:{ 
  type:Sequelize.STRING,
  allowNull:false

},
  lenguajes:{ 
  type:Sequelize.STRING,
  allowNull:false

},
  dimensions:{ 
  type:Sequelize.STRING,
  allowNull:false

},  
  peso:{ 
  type:Sequelize.STRING,
  allowNull:false

},  
  number_page:{ 
  type:Sequelize.INTEGER,
  allowNull:false

},
  date_publication:{ 
  type:Sequelize.DATE,
  allowNull:false

},
materias:{ 
  type:Sequelize.STRING,
  allowNull:false

},
authorsId:{ 
  type:Sequelize.INTEGER,
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
    await queryInterface.dropTable('data_sheefs');
  }
};