const request = require('request-promise');
const geckoboard = require('geckoboard');
const Goal = require('../models').goal;

const API = 'https://api.clubhouse.io/api/v2';
const API_KEY = process.env.CLUBHOUSE_API_KEY;

const datasetSchema = {
  id: 'keeper.goals',
  fields: {
    name: {
      type: 'string',
      name: 'Name'
    },
    status: {
      type: 'string',
      name: 'Status'
    },
    progress: {
      type: 'string',
      name: 'Progress'
    },
    order: {
      type: 'number',
      name: 'Order'
    }
  }
};

const updateDataset = () => Goal.all().then(goals => {
  gb = geckoboard(process.env.GECKOBOARD_API_KEY);

  gb.ping(function (err) {
    if (err) {
      console.error(err);
      return;
    }
  });
  
  const goalsJSON = goals.map(goal => goal.toJSON());

  const cards = goalsJSON.reduce((acc, goal) => {
    const cards = goal.cards || [];
    acc = [ ...acc, ...cards ];
    return acc;
  }, []);

  const storyRequests = cards.map(id => request({ 
    qs: { token: API_KEY },
    uri: `${API}/stories/${id}`
  }).then(story => JSON.parse(story)));

  Promise.all(storyRequests)
    .then(stories => {
      const data = goalsJSON.map(goal => {
        let cards = goal.cards || [];
        cards = cards.map(id => stories.find(story => story.id === id));
        cards = cards.filter(story => !story.archived);

        const completed = cards.filter(story => story.completed);
        const started = cards.filter(story => story.started);

        let status = '';

        if (started.length > 0) {
          status = '🚚';
        }

        if (cards.length === completed.length && completed.length > 0) {
          status = '✅';
        }

        return {
          name: goal.title,
          order: goal.id,
          status: status,
          progress: `(${completed.length}/${cards.length})`
        };
      });

      gb.datasets.findOrCreate(datasetSchema,
        function (err, dataset) {
          if (err) {
            console.error(err);
            return;
          }
    
          dataset.put(data, function(e) {
            console.error(e);
          });
        }
      );
    });
});

module.exports = updateDataset;