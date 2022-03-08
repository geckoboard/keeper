'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('teams', [
      {
        title: 'Team Data',
        icon: '🎯',
        dataset: 'keeper.goals.teamdata',
        slug: 'team-data',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Team Expansion',
        icon: '🎈',
        dataset: 'keeper.goals.teamexpansion',
        slug: 'team-expansion',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Team Platform',
        icon: '👾',
        dataset: 'keeper.goals.teamplatform',
        slug: 'team-platform',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('teams', {
      slug: {
        [Sequelize.Op.in]: ['team-data', 'team-expansion', 'team-platform'],
      },
    });
  },
};
