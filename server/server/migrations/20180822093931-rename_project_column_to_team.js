'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.renameColumn('goals', 'project', 'team');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('goals', 'team', 'project');
  }
};
