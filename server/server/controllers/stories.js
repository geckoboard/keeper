const request = require('request-promise');
const Goal = require('../models').goal;
const { whitelistStory } = require('./helpers');

const API = 'https://api.clubhouse.io/api/v2';
const API_KEY = process.env.CLUBHOUSE_API_KEY;

const _getTeamReadyColumn = teamId => {
  const options = {
    qs: { token: API_KEY },
    uri: `${API}/teams/${teamId}`,
  };

  return request(options).then(response => {
    const team = JSON.parse(response);
    const unstarted = team.workflow.states.filter(
      state => state.type === 'unstarted',
    );

    if (unstarted.length === 0) {
      throw new Error('This team workflow has no columns of type: unstarted');
    }

    return unstarted[unstarted.length - 1];
  });
};

const list = (req, res) => {
  const qs = {
    token: API_KEY,
    page_size: 25,
    query: req.query.query,
    next: req.query.next,
  };

  const options = {
    uri: `${API}/search/stories`,
    qs,
    json: true,
  };

  return request(options)
    .then(stories => {
      res.status(200).send({
        ...stories,
        data: stories.data.map(whitelistStory),
      });
    })
    .catch(error => res.status(400).send(error));
};

const create = (req, res) =>
  _getTeamReadyColumn(req.body.teamId)
    .then(column =>
      request({
        method: 'post',
        uri: `${API}/stories`,
        qs: { token: API_KEY },
        body: {
          name: req.body.name,
          project_id: req.body.projectId,
          workflow_state_id: column.id,
        },
        json: true,
      }),
    )
    .then(story =>
      Goal.findByPk(req.body.goalId)
        .then(goal =>
          goal.update({
            cards: [...goal.cards, story.id],
          }),
        )
        .then(() => res.status(200).send(whitelistStory(story))),
    )
    .catch(error => {
      res.status(400).send(error);
    });

module.exports = {
  list,
  create,
};
