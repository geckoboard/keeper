'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('teams', {
      slug: {
        [Sequelize.Op.in]: ['bento', 'burrito', 'margarita', 'tabasco', 'taco'],
      },
    });
  },

  async down() {},
};
