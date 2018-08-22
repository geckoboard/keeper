const Goal = require('../models').goal;
const Team = require('../models').team;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      icon: Sequelize.STRING, 
      dataset: Sequelize.STRING, 
      slug: Sequelize.STRING,
      projects: Sequelize.ARRAY(Sequelize.INTEGER),
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
    .then(() => queryInterface.bulkInsert('teams', [
        {
          title: 'Burrito',
          icon: '🌯',
          dataset: 'keeper.goals.burrito',
          slug: 'burrito',
          projects: [36],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Guacamole',
          icon: '🥑',
          dataset: 'keeper.goals.guacamole',
          slug: 'guacamole',
          projects: [3120],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Taco',
          icon: '🌮',
          dataset: 'keeper.goals.taco',
          slug: 'taco',
          projects: [5],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]))
      .then(() => queryInterface.sequelize.query('SELECT * from teams', { model: Team }))
      .then(teams => {
        const map = {
          5: teams.find(t => t.title === 'Taco').id,
          36: teams.find(t => t.title === 'Burrito').id,
          3120: teams.find(t => t.title === 'Guacamole').id,
        };

        return goals = queryInterface.sequelize.query('SELECT * from goals', { model: Goal })
          .then((goals) => {
            const updates = goals.map(goal => {
              const teamId = map[goal.teamId];

              return goal.update({ teamId });
            });

            return Promise.all(updates);
          });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teams');
  }
};