const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const Goal = sequelize.define(
  'goal',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cards: Sequelize.ARRAY(Sequelize.INTEGER),
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    getterMethods: {
      cards() {
        return this.getDataValue('cards') || [];
      },
    },
  },
);

const Team = sequelize.define(
  'team',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    icon: Sequelize.STRING,
    dataset: Sequelize.STRING,
    slug: Sequelize.STRING,
    projects: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  {
    getterMethods: {
      projects() {
        return this.getDataValue('projects') || [];
      },
    },
  },
);

Team.hasMany(Goal);
Goal.belongsTo(Team);

module.exports = { goal: Goal, team: Team };
