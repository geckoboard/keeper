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
 */

const getStory = id =>
  request({
    qs: { token: API_KEY },
    uri: `${API}/stories/${id}`,
  }).then(story => JSON.parse(story));

const isVisibleWorkflowState = (state = {}) =>
  state.type === 'started' || state.name === 'Ready';

const isStoryVisible = (story, references) => {
  if (story.archived || story.completed) {
    return false;
  }

  if (story.started) {
    return true;
  }

  const state = references.find(
    ref =>
      ref.entity_type === 'workflow-state' &&
      ref.id === story.workflow_state_id,
  );

  return isVisibleWorkflowState(state);
};

const handleCreate = (action, references) =>
  getStory(action.id).then(story => {
    if (isStoryVisible(story, references)) {
      socket.emit(actions.stories.create(whitelistStory(story), 'clubhouse'));
    }
  });

const handleUpdated = (action, references) => {
  if (action.changes.archived) {
    action.changes.archived.new
      ? socket.emit(actions.stories.delete(action.id, 'clubhouse'))
      : handleCreate(action, references);

    return;
  }

  return getStory(action.id).then(story => {
    socket.emit(actions.stories.update(whitelistStory(story), 'clubhouse'));
  });
};

const update = (req, res) => {
  res.status(200).send();

  const { body } = req;

  body.actions
    .filter(action => action.entity_type === 'story')
    .forEach(action => {
      if (action.action === 'create') {
        handleCreate(action, body.references);
      } else if (action.action === 'update') {
        handleUpdated(action, body.references);
      }
    });
};

module.exports = {
  update,
};
