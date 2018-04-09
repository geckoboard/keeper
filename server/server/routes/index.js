const goalsController = require('../controllers').goals;
const storiesController = require('../controllers').stories;
const webhookController = require('../controllers').webhook;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Goals API!',
  }));

  app.get('/api/goals', goalsController.list);
  app.post('/api/goals', goalsController.create);
  app.put('/api/goals/:goalId', goalsController.update);
  app.delete('/api/goals/:goalId', goalsController.destroy);

  app.get('/api/stories', storiesController.list);

  app.post('/api/webhook', webhookController.update);
};