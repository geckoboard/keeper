const request = require('request-promise');
const Goal = require('../models').goal;
const { whitelistStory } = require('./helpers');
const { API_URL, API_KEY } = require('./constants');

const _getTeamReadyColumn = teamId => {
  const options = {
    qs: { token: API_KEY },
    uri: `${API_URL}/teams/${teamId}`,
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

const list = (req, res, next) => {
  const qs = {
    token: API_KEY,
    page_size: 25,
    query: req.query.query,
    next: req.query.next,
  };

  const options = {
    uri: `${API_URL}/search/stories`,
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
    .catch(next);
};

const create = (req, res, next) =>
  _getTeamReadyColumn(req.body.teamId)
    .then(column =>
      request({
        method: 'post',
        uri: `${API_URL}/stories`,
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
    .catch(next);

module.exports = {
  list,
  create,
};
