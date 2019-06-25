const request = require('request-promise');
const { API_URL, API_KEY } = require('./constants');

const whitelistStory = story => ({
  id: story.id,
  app_url: story.app_url,
  name: story.name,
  archived: story.archived,
  blocked: story.blocked,
  blocker: story.blocker,
  started: story.started,
  completed: story.completed,
  completed_at: story.completed_at,
  project_id: story.project_id,
});

const whitelistMember = member => ({
  id: member.id,
  profile: {
    name: member.profile.name,
  },
});

const getStory = id =>
  request({
    qs: { token: API_KEY },
    uri: `${API_URL}/stories/${id}`,
  }).then(story => JSON.parse(story));

const getWorkflowState = id =>
  request({
    qs: { token: API_KEY },
    uri: `${API_URL}/workflows`,
  })
    .then(state => JSON.parse(state))
    .then(workflows => {
      const states = workflows.reduce(
        (states, workflow) => states.concat(workflow.states),
        [],
      );

      return states.find(state => state.id === id);
    });

const findWorkflowStateFromRefs = (refs, id) =>
  refs.find(ref => ref.entity_type === 'workflow-state' && ref.id === id);

const isWorkflowStateReadyOrDoing = (state = {}) =>
  state.type === 'started' || state.name === 'Ready';

const isWorkflowStateDone = (state = {}) => state.type === 'done';
const isWorkflowStateUnstarted = (state = {}) =>
  state.type === 'unstarted' && state.name !== 'Ready';

const isStoryReadyOrDoing = (story, references = []) => {
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

  return isWorkflowStateReadyOrDoing(state);
};

const isStoryDone = story => story.completed;

module.exports = {
  whitelistStory,
  whitelistMember,
  getStory,
  getWorkflowState,
  isStoryReadyOrDoing,
  findWorkflowStateFromRefs,
  storyState: {
    isReadyOrDoing: isStoryReadyOrDoing,
    isDone: isStoryDone,
  },
  workflowState: {
    isUnstarted: isWorkflowStateUnstarted,
    isReadyOrDoing: isWorkflowStateReadyOrDoing,
    isDone: isWorkflowStateDone,
  },
};
