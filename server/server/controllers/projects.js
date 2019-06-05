const request = require('request-promise');

const API = 'https://api.clubhouse.io/api/v2';
const API_KEY = process.env.CLUBHOUSE_API_KEY;

const list = (req, res, next) =>
  request({
    uri: `${API}/projects`,
    qs: { token: API_KEY },
    json: true,
  })
    .then(goals => res.status(200).send(goals))
    .catch(next);

module.exports = {
  list,
};
