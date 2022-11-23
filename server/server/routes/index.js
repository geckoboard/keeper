const path = require('path');
const goalsController = require('../controllers').goals;
const membersController = require('../controllers').members;
const projectsController = require('../controllers').projects;
const shortcutTeamsController = require('../controllers').shortcutTeams;
const storiesController = require('../controllers').stories;
const teamsController = require('../controllers').teams;
const webhookController = require('../controllers').webhook;

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Goals API!',
    }),
  );

  app.get('/api/shortcut-teams', shortcutTeamsController.list);
  app.get(
    '/api/shortcut-teams/:teamId/stories',
    shortcutTeamsController.listStories,
  );

  app.get('/api/teams', teamsController.list);
  app.put('/api/teams/:teamId', teamsController.update);

  app.get('/api/members', membersController.list);

  app.get('/api/projects', projectsController.list);

  app.get('/api/:teamId/goals', goalsController.list);
  app.post('/api/:teamId/goals', goalsController.create);
  app.put('/api/:teamId/goals/orders', goalsController.updateOrders);
  app.put('/api/goals/:goalId', goalsController.update);
  app.delete('/api/goals/:goalId', goalsController.destroy);

  app.get('/api/stories', storiesController.list);
  app.post('/api/stories', storiesController.create);

  app.post('/api/webhook', webhookController.update);

  app.get('/:teamId', (req, res) =>
    res.sendFile(path.join(__dirname + '/../../../client/dist/index.html')),
  );
};
