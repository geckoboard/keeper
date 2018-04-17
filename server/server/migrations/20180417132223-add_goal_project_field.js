'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('goals', 'project', {
     type: Sequelize.INTEGER,
   }).then(() => {
     return queryInterface.sequelize.query('UPDATE goals SET project = 5');
   });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('goals', 'project');
  }
};
