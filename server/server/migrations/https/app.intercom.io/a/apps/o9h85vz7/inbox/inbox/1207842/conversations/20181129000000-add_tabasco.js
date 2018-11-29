'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [
      {
        title: 'Tabasco',
        icon: '🌶',
        dataset: 'keeper.goals.tabasco',
        slug: 'tabasco',
        projects: [62],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {}
};
