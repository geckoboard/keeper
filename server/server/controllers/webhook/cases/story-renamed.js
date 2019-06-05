const socket = require('../../../../socket');
const { whitelistStory } = require('../../helpers');
const actions = require('../../../actions');

const test = action => action.action === 'update' && action.changes.name;

const handler = async (action, refs, getStory) => {
  const story = await getStory(action.id);

  socket.emit(actions.stories.update(whitelistStory(story), 'clubhouse'));
};

module.exports = {
  name: 'Story Renamed',
  test,
  handler,
};
