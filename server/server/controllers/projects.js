const request = require('request-promise');
const { API_URL, API_KEY } = require('./constants');

const list = (req, res, next) =>
  request({
    uri: `${API_URL}/projects`,
    qs: { token: API_KEY },
    json: true,
  })
    .then(goals => res.status(200).send(goals))
    .catch(next);

module.exports = {
  list,
};
