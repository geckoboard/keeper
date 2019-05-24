const Goal = require('../models').goal;
const socket = require('../../socket');
const actions = require('../actions');

const create = (req, res) =>
  Goal.create({
    order: req.body.order,
    title: req.body.title,
    active: true,
    teamId: req.params.teamId,
  })
    .then(goal => {
      socket.emit(
        actions.goals.create(
          { teamId: req.params.teamId, goal },
          req.header('X-Socket-Session'),
        ),
      );
      res.status(201).send(goal);
    })
    .catch(error => res.status(400).send(error));

const list = (req, res) =>
  Goal.findAll({
    where: {
      teamId: req.params.teamId,
    },
    order: [['order', 'ASC']],
  })
    .then(goals => res.status(200).send(goals))
    .catch(error => res.status(400).send(error));

const update = (req, res) =>
  Goal.findByPk(req.params.goalId)
    .then(goal => {
      if (!goal) {
        return res.status(404).send({
          message: 'Goal Not Found',
        });
      }

      const { cards, title } = req.body;

      return goal.update({
        title: title || goal.title,
        cards: cards ? cards : goal.cards,
      });
    })
    .then(goal => {
      const teamId = goal.getDataValue('teamId');
      socket.emit(
        actions.goals.update({ teamId, goal }, req.header('X-Socket-Session')),
      );
      res.status(200).send(goal);
    })
    .catch(error => res.status(400).send(error));

const destroy = async (req, res) => {
  try {
    const { goalId } = req.params;
    const goal = await Goal.findByPk(goalId);

    if (!goal) {
      return res.status(404).send({
        message: 'Goal Not Found',
      });
    }

    const teamId = goal.getDataValue('teamId');

    await goal.destroy();

    socket.emit(
      actions.goals.delete({ teamId, goalId }, req.header('X-Socket-Session')),
    );

    const remaining = await Goal.findAll({
      where: { teamId },
      order: [['order', 'ASC']],
    });

    await Promise.all(
      remaining.map((g, index) =>
        g.update({
          order: index + 1,
        }),
      ),
    );

    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateOrders = async (req, res) => {
  try {
    const updates = Object.keys(req.body).map(async goalId => {
      const goal = await Goal.findByPk(goalId);
      return goal.update({
        order: req.body[goalId],
      });
    });

    await Promise.all(updates);

    socket.emit(
      actions.goals.updateOrders(
        { teamId: req.params.teamId, updates: req.body },
        req.header('X-Socket-Session'),
      ),
    );
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  create,
  list,
  update,
  destroy,
  updateOrders,
};
