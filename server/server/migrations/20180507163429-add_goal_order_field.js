'use strict';

const Goal = require('../models').goal;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('goals', 'order', {
      type: Sequelize.INTEGER,
    }).then(() => {
      return queryInterface.sequelize.query('SELECT * from goals', { model: Goal });
    }).then(goals => {
      const projectOrders = {};
      const updates = goals
        .sort((a, b) => a.id > b.id)
        .map(goal => {
          if (!projectOrders[goal.project]) {
            projectOrders[goal.project] = 0;
          }
          const order = projectOrders[goal.project] += 1;

          return goal.update({ order });
        });

      return Promise.all(updates);
    });
  },
 
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('goals', 'order');
  }
};
