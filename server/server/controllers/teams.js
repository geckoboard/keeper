const Goal = require('../models').goal;
const Team = require('../models').team;
const socket = require('../../socket');
const actions = require('../actions');

const list = (req, res, next) =>
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
    .catch(next);

const update = (req, res, next) =>
  Team.findByPk(req.params.teamId, {
    include: [
      {
        model: Goal,
        as: 'goals',
      },
    ],
  })
    .then(team => {
      if (!team) {
        const err = new Error('Team Not Found');
        err.statusCode = 404;
        throw err;
      }

      const { shortcutTeams } = req.body;

      return team.update({
        shortcutTeams: shortcutTeams || team.shortcutTeams,
      });
    })
    .then(team => {
      socket.emit(actions.teams.update(team, req.header('X-Socket-Session')));
      return res.status(200).send(team);
    })
    .catch(next);

module.exports = {
  list,
  update,
};
