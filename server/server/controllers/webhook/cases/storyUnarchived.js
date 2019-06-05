const socket = require('../../../../socket');
const {
  workflowState,
  whitelistStory,
  getWorkflowState,
} = require('../../helpers');
const actions = require('../../../actions');

const test = action =>
  action.action === 'update' &&
  action.changes.archived &&
  !action.changes.archived.new;

const handler = async (action, refs, getStory) => {
  const story = await getStory(action.id);
  const state = await getWorkflowState(story.workflow_state_id);

  if (!workflowState.isUnstarted(state)) {
    socket.emit(actions.stories.create(whitelistStory(story), 'clubhouse'));
  }
};

module.exports = {
  name: 'Story Unarchived',
  test,
  handler,
};
