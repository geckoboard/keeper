const socket = require('../../../../socket');
const actions = require('../../../actions');

const test = action =>
  action.action === 'update' &&
  action.changes.archived &&
  action.changes.archived.new;

const handler = async action => {
  socket.emit(actions.stories.delete(action.id, 'clubhouse'));
};

module.exports = {
  name: 'Story Archived',
  test,
  handler,
};
