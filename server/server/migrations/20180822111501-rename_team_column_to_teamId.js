'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('goals', 'team', 'teamId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('goals', 'teamId', 'team');
  },
};
