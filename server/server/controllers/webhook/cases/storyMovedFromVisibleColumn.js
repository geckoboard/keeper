const socket = require('../../../../socket');
const { workflowState, findWorkflowStateFromRefs } = require('../../helpers');
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
    !workflowState.isUnstarted(oldState) && workflowState.isUnstarted(newState)
  );
};

const handler = async action => {
  socket.emit(actions.stories.delete(action.id, 'clubhouse'));
};

module.exports = {
  name: 'Story Moved From Visible Column',
  test,
  handler,
};
