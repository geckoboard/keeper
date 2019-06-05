const socket = require('../../../../socket');
const { storyState, whitelistStory } = require('../../helpers');
const actions = require('../../../actions');

const test = action => action.action === 'create';

const handler = async (action, refs, getStory) => {
  const story = await getStory(action.id);

  if (storyState.isReadyOrDoing(story, refs)) {
    socket.emit(actions.stories.create(whitelistStory(story), 'clubhouse'));
  }
};

module.exports = {
  name: 'Story Created',
  test,
  handler,
};
