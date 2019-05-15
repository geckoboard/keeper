const createAction = type => (payload, req) => ({
  type,
  payload,
  sender: req.header('X-Socket-Session'),
});

module.exports = createAction;
