const request = require('request-promise');
const geckoboard = require('geckoboard');
const Goal = require('../models').goal;
const Team = require('../models').team;

const API = 'https://api.clubhouse.io/api/v2';
const API_KEY = process.env.CLUBHOUSE_API_KEY;

const getDatasetSchema = dataset => ({
  id: dataset,
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
});

const formatDataForDataset = (goals, stories) => goals
  .sort((a, b) => b.order - a.order)
  .map(goal => {
    const cards = goal.cards
      .map(id => stories.find(story => story.id === id))
      .filter(story => !story.archived);

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
      order: goal.order,
      status: status,
      progress: cards.length === 0 ? '--' : `(${completed.length}/${cards.length})`
    };
  });

const updateDataset = teamId => Team.findById(
  teamId, 
  {
    include: [{ model: Goal, as: 'goals' }]
  }).then(team => {
  gb = geckoboard(process.env.GECKOBOARD_API_KEY);

  gb.ping(function (err) {
    if (err) {
      console.error(err);
      return;
    }
  });

  const _team = team.get();
  
  const goalsJSON = _team.goals.map(goal => goal.toJSON());
  const cards = goalsJSON.reduce((acc, goal) => [ ...acc, ...goal.cards ], []);

  const storyRequests = cards.map(id => request({ 
    qs: { token: API_KEY },
    uri: `${API}/stories/${id}`
  }).then(story => JSON.parse(story)));

  Promise.all(storyRequests)
    .then(stories => {
      const data = formatDataForDataset(goalsJSON, stories);

      gb.datasets.findOrCreate(
        getDatasetSchema(_team.dataset),
        function (err, dataset) {
          if (err) {
            console.error(err);
            return;
          }

          dataset.put(data, function(err) {
            if (err) {
              console.error(err);
            }
          });
        }
      );
    });
});

module.exports = updateDataset;
