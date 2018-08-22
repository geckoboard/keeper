const Goal = require('../models').goal;
const Team = require('../models').team;

const list = (req, res) => Team.findAll({
  include: [{
    model: Goal,
    as: 'goals'
  }]
})
  .then(goals => res.status(200).send(goals))
  .catch(error => res.status(400).send(error));

module.exports = {
  list,
};