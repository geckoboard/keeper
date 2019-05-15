const createAction = require('./create-action');

module.exports = {
  teams: {
    update: createAction('socket:teams:update'),
  },
  goals: {
    create: createAction('socket:goals:create'),
    update: createAction('socket:goals:update'),
    updateOrders: createAction('socket:goals:updateOrders'),
    delete: createAction('socket:goals:delete'),
  },
};
