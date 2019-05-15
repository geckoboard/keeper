'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [
      {
        title: 'Bento',
        icon: '🍱',
        dataset: 'keeper.goals.bento',
        slug: 'bento',
        projects: [5609],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {},
};
