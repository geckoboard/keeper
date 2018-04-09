const request = require('request-promise');

const API = 'https://api.clubhouse.io/api/v2';
const API_KEY = process.env.CLUBHOUSE_API_KEY;

const list = (req, res) => {
  qs = {
    token: API_KEY,
    page_size: 25,
    query: req.query.query,
    next: req.query.next,
  };

  const options = {
    uri: `${API}/search/stories`,
    qs,
    json: true
  };

  return request(options).then(stories => res.status(200).send(stories));
}

module.exports = {
  list,
};