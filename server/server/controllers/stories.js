const request = require('request-promise');

const API = 'https://api.clubhouse.io/api/v2';
const API_KEY = process.env.CLUBHOUSE_API_KEY;

const list = (req, res) => {
  var options = {
    uri: `${API}/projects/5/stories`,
    qs: {
      token: API_KEY
    },
    json: true
  };

  const workflows = [
    500000011, // ready
    500000015, // doing
    500074438, // QA
    // 500000012  // Done
  ];

  return request(options).then(stories => {
    res.status(200).send(
      stories.filter(story => 
        workflows.includes(story.workflow_state_id)
        && !story.archived
      )
    )
  });
}

module.exports = {
  list,
};