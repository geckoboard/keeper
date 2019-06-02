const socket = require('../../../../socket');
const {
  workflowState,
  whitelistStory,
  findWorkflowStateFromRefs,
} = require('../../helpers');
const actions = require('../../../actions');

const test = (action, refs) => {
  if (action.action !== 'update' || !action.changes.workflow_state_id) {
    return false;
  }

  const oldState = findWorkflowStateFromRefs(
    refs,
    action.changes.workflow_state_id.old,
  );
  const newState = findWorkflowStateFromRefs(
    refs,
    action.changes.workflow_state_id.new,
  );

  return (
    workflowState.isUnstarted(oldState) && !workflowState.isUnstarted(newState)
  );
};

const handler = async (action, refs, getStory) => {
  const story = await getStory(action.id);

  socket.emit(actions.stories.create(whitelistStory(story), 'clubhouse'));
};

module.exports = {
  name: 'Story Moved To Visible Column',
  test,
  handler,
};
