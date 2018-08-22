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

const update = (req, res) => Team.findById(req.params.teamId)
  .then(team => {
    if (!team) {
      return res.status(404).send({
        message: 'Team Not Found',
      });
    }

    const { projects } = req.body;

    return team.update({
      projects: projects || team.projects,
    });
  })
  .then(team => res.status(200).send(team))
  .catch(error => res.status(400).send(error));

module.exports = {
  list,
  update,
};