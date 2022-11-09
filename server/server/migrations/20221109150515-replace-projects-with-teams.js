'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('teams', 'projects', { transaction: t }),
        queryInterface.addColumn(
          'teams',
          'shortcutTeams',
          {
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          { transaction: t },
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('teams', 'shortcutTeams', {
          transaction: t,
        }),
        queryInterface.addColumn(
          'teams',
          'projects',
          {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
          },
          { transaction: t },
        ),
      ]);
    });
  },
};
