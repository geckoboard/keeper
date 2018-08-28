'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [
      {
        title: 'Margarita',
        icon: '🍸',
        dataset: 'keeper.goals.margarita',
        slug: 'margarita',
        projects: [21375],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {}
};
