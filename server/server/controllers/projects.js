const request = require('request-promise');

const API = 'https://api.clubhouse.io/api/v2';
const API_KEY = process.env.CLUBHOUSE_API_KEY;

const list = (req, res) => request({
  uri: `${API}/projects`,
  qs: { token: API_KEY },
  json: true
})
  .then(goals => res.status(200).send(goals))
  .catch(error => res.status(400).send(error));

module.exports = {
  list,
};