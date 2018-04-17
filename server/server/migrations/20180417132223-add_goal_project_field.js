'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('goals', 'project', {
    type: Sequelize.INTEGER,
   });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('goals', 'project');
  }
};
