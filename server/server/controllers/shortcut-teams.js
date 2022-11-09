const request = require('request-promise');
const { API_URL, API_KEY } = require('./constants');

const list = (req, res, next) =>
  request({
    uri: `${API_URL}/groups`,
    qs: { token: API_KEY },
    json: true,
  })
    .then(teams => {
      return res.status(200).send(teams);
    })
    .catch(next);

module.exports = {
  list,
};

const listStories = (req, res, next) => {
  return request({
    uri: `${API_URL}/groups/${req.params.teamId}/stories`,
    qs: { token: API_KEY },
    json: true,
  })
    .then(teams => {
      return res.status(200).send(teams);
    })
    .catch(next);
};

module.exports = {
  list,
  listStories,
};
