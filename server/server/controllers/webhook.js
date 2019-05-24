const request = require('request-promise');
const socket = require('../../socket');
const { whitelistStory } = require('./helpers');
const actions = require('../actions');

const API = 'https://api.clubhouse.io/api/v2';
const API_KEY = process.env.CLUBHOUSE_API_KEY;

/**
 * Still TODO:
 *
 * 1) Handle case where card is moved into visible column.
 * 2) Handle case where card is moved into invisible column.
 * 3) Clear done and archived cards from frontend when goal is deleted
 */

const getStory = id =>
  request({
    qs: { token: API_KEY },
    uri: `${API}/stories/${id}`,
  }).then(story => JSON.parse(story));

const isInVisibleColumn = (story, references) => {
  if (story.archived || story.completed) {
    return false;
  }

  if (story.started) {
    return true;
  }

  const workflow = references.find(
    ref =>
      ref.entity_type === 'workflow-state' &&
      ref.id === story.workflow_state_id,
  );

  if (workflow && workflow.name === 'Ready') {
    return true;
  }

  return false;
};

const handleCreate = (action, references) =>
  getStory(action.id).then(story => {
    if (isInVisibleColumn(story, references)) {
      socket.emit(actions.stories.create(whitelistStory(story), 'clubhouse'));
    }
  });

const handleUpdated = action =>
  getStory(action.id).then(story => {
    socket.emit(actions.stories.update(whitelistStory(story), 'clubhouse'));
  });

const update = (req, res) => {
  res.status(200).send();

  req.body.actions
    .filter(action => action.entity_type === 'story')
    .forEach(action => {
      if (action.action === 'create') {
        handleCreate(action, req.body.references);
      } else if (action.action === 'update') {
        handleUpdated(action);
      }
    });
};

module.exports = {
  update,
};
