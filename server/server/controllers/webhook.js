const Goal = require('../models').goal;
const updateDataset = require('../scripts/update-dataset');

const _isCreateAction = action =>
  action.entity_type === 'story'
  && action.action === 'create';

const _isUpdateWorkflow = action =>
  action.entity_type === 'story'
  && action.action === 'update'
  && !!action.changes.workflow_state_id;

const _isArchived = action =>
  action.entity_type === 'story'
  && action.action === 'update'
  && !!action.changes.archived;

const update = (req, res) => Goal.all().then(goals => {
  res.status(200).send();

  const goalsJSON = goals.map(goal => goal.toJSON());
  const cards = goalsJSON.reduce((acc, goal) => [ ...acc, ...goal.cards ], []);

  const updates = req.body.actions
    .filter(action => cards.includes(action.id))
    .filter(action =>
      _isCreateAction(action)
      || _isUpdateWorkflow(action)
      || _isArchived(action));

  const projects = updates.reduce((acc, update) => {
    const goal = goalsJSON.find(goal => goal.cards.includes(update.id));

    if (!acc.includes(goal.project)) {
      acc.push(goal.project);
    }

    return acc;
  }, []);

  projects.forEach(id => {
    updateDataset(id);
  });
});

module.exports = {
  update,
};
