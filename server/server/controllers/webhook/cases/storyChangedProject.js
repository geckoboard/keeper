const socket = require('../../../../socket');
const {
  whitelistStory,
  workflowState,
  getWorkflowState,
} = require('../../helpers');
const actions = require('../../../actions');

const test = action => action.action === 'update' && action.changes.project_id;

const handler = async (action, refs, getStory) => {
  const story = await getStory(action.id);
  const state = await getWorkflowState(story.workflow_state_id);

  if (!workflowState.isUnstarted(state)) {
    socket.emit(
      actions.stories.updateProject(
        {
          from: action.changes.project_id.old,
          to: action.changes.project_id.new,
          story: whitelistStory(story),
        },
        'clubhouse',
      ),
    );
  }
};

module.exports = {
  name: 'Story Archived',
  test,
  handler,
};
