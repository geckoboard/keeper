const cases = require('./cases');
const Handler = require('./handler');

const update = (req, res) => {
  res.status(200).send();

  const { body } = req;

  body.actions
    .filter(action => action.entity_type === 'story')
    .forEach(action => {
      const handler = new Handler();

      handler.registerCase(cases.storyCreated);
      handler.registerCase(cases.storyRenamed);
      handler.registerCase(cases.storyArchived);
      handler.registerCase(cases.storyUnarchived);
      handler.registerCase(cases.storyMovedToVisibleColumn);
      handler.registerCase(cases.storyMovedFromVisibleColumn);
      handler.registerCase(cases.storyMovedBetweenVisibleColumns);

      handler.handle(action, body.references);
    });
};

module.exports = {
  update,
};
