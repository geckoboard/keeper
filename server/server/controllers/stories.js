const request = require('request-promise');

const API = 'https://api.clubhouse.io/api/v2';
const API_KEY = process.env.CLUBHOUSE_API_KEY;

const list = (req, res) => {
  const qs = {
    token: API_KEY,
    page_size: 25,
    query: req.query.query,
    next: req.query.next,
  };

  const options = {
    uri: `${API}/search/stories`,
    qs,
    json: true,
  };

  return request(options)
    .then(stories => {
      res.status(200).send({
        ...stories,
        data: stories.data.map(story => ({
          id: story.id,
          app_url: story.app_url,
          name: story.name,
          archived: story.archived,
          blocked: story.blocked,
          blocker: story.blocker,
          started: story.started,
          completed: story.completed,
          completed_at: story.completed_at,
          project_id: story.project_id,
        })),
      });
    })
    .catch(error => res.status(400).send(error));
};

module.exports = {
  list,
};
