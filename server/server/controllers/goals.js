const Goal = require('../models').goal;
const socket = require('../../socket');
const actions = require('../actions');

const create = (req, res, next) =>
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
    .catch(next);

const list = (req, res, next) =>
  Goal.findAll({
    where: {
      teamId: req.params.teamId,
    },
    order: [['order', 'ASC']],
  })
    .then(goals => res.status(200).send(goals))
    .catch(next);

const update = (req, res, next) =>
  Goal.findByPk(req.params.goalId)
    .then(goal => {
      if (!goal) {
        const err = new Error('Goal Not Found');
        err.statusCode = 404;
        throw err;
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
    .catch(next);

const destroy = async (req, res, next) => {
  try {
    const { goalId } = req.params;
    const goal = await Goal.findByPk(goalId);

    if (!goal) {
      const err = new Error('Goal Not Found');
      err.statusCode = 404;
      throw err;
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
  } catch (err) {
    next(err);
  }
};

const updateOrders = async (req, res, next) => {
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
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  list,
  update,
  destroy,
  updateOrders,
};
