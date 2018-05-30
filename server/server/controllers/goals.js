const Goal = require('../models').goal;
const updateDataset = require('../scripts/update-dataset');

const create = (req, res) => Goal.create({
  order: req.body.order,
  title: req.body.title,
  active: true,
  project: req.params.projectId,
})
  .then(goal => {
    res.status(201).send(goal);
    updateDataset(goal.getDataValue('project'));
  })
  .catch(error => res.status(400).send(error));

const list = (req, res) => Goal.findAll({
  where: {
    project: req.params.projectId,
  },
  order: [['order', 'ASC']],
})
  .then(goals => res.status(200).send(goals))
  .catch(error => res.status(400).send(error));

const update = (req, res) => Goal.findById(req.params.goalId)
  .then(goal => {
    if (!goal) {
      return res.status(404).send({
        message: 'Goal Not Found',
      });
    }

    const { cards, title } = req.body;

    return goal.update({
      title: title || goal.title,
      cards: cards ? cards : goal.cards
    });
  })
  .then(goal => {
    res.status(200).send(goal);
    updateDataset(goal.getDataValue('project'));
  })
  .catch(error => res.status(400).send(error));

const destroy = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId);
    
    if (!goal) {
      return res.status(404).send({
        message: 'Goal Not Found',
      });
    }
    
    const project = goal.getDataValue('project');
    
    await goal.destroy();
    
    const remaining = await Goal.findAll({
      where: { project },
      order: [['order', 'ASC']],
    });
    
    await Promise.all(
      remaining.map((g, index) => g.update({
        order: index + 1,
      }))
    );

    res.status(204).send();
    updateDataset(project);
  } catch (error) {
    res.status(400).send(error);
  }
}

const updateOrders = async (req, res) => {
  try {
    const updates = Object.keys(req.body).map(async goalId => {
      const goal = await Goal.findById(goalId);
      return goal.update({
        order: req.body[goalId],
      });
    });

    await Promise.all(updates);
  
    res.status(204).send();
    updateDataset(req.params.projectId)
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  create,
  list,
  update,
  destroy,
  updateOrders,
};