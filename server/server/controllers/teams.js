const Goal = require('../models').goal;
const Team = require('../models').team;

const list = (req, res) =>
  Team.findAll({
    order: [['title', 'ASC']],
    include: [
      {
        model: Goal,
        as: 'goals',
      },
    ],
  })
    .then(teams => res.status(200).send(teams))
    .catch(error => res.status(400).send(error));

const update = (req, res) =>
  Team.findByPk(req.params.teamId)
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
