const Goal = require('../models').goal;
const updateDataset = require('../scripts/update-dataset');

const create = (req, res) => Goal.create({
  order: req.body.order,
  title: req.body.title,
  active: true,
  team: req.params.teamId,
})
  .then(goal => {
    res.status(201).send(goal);
    updateDataset(goal.getDataValue('team'));
  })
  .catch(error => res.status(400).send(error));

const list = (req, res) => Goal.findAll({
  where: {
    team: req.params.teamId,
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
    updateDataset(goal.getDataValue('team'));
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
    
    const team = goal.getDataValue('team');
    
    await goal.destroy();
    
    const remaining = await Goal.findAll({
      where: { team },
      order: [['order', 'ASC']],
    });
    
    await Promise.all(
      remaining.map((g, index) => g.update({
        order: index + 1,
      }))
    );

    res.status(204).send();
    updateDataset(team);
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
    updateDataset(req.params.teamId)
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