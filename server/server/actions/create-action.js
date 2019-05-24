const createAction = type => (payload, sender) => ({
  type,
  payload,
  sender,
});

module.exports = createAction;
