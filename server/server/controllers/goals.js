const Goal = require('../models').goal;
const updateDataset = require('../scripts/update-dataset');

const create = (req, res) => Goal.create({
  title: req.body.title,
  active: true,
})
  .then(goal => res.status(201).send(goal))
  .then(updateDataset)
  .catch(error => res.status(400).send(error));

const list = (req, res) => Goal.all()
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
  .then(goal => res.status(200).send(goal))
  .then(updateDataset)
  .catch(error => res.status(400).send(error));

const destroy = (req, res) => Goal.findById(req.params.goalId)
  .then(goal => {
    if (!goal) {
      return res.status(404).send({
        message: 'Goal Not Found',
      });
    }

    return goal.destroy();
  })
  .then(() => res.status(204).send())
  .then(updateDataset)
  .catch(error => res.status(400).send(error));

module.exports = {
  create,
  list,
  update,
  destroy,
};