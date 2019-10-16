'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', {
      slug: 'guacamole'
    });
  },

  down: (queryInterface, Sequelize) => { }
};
