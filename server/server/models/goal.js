module.exports = (sequelize, DataTypes) => {
  const goal = sequelize.define('goal', {
    title: { 
      type: DataTypes.STRING, 
      allowNull: false,
    },
    cards: DataTypes.ARRAY(DataTypes.INTEGER),
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {});

  return goal;
};