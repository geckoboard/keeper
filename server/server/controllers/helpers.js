const whitelistStory = story => ({
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
});

module.exports = {
  whitelistStory,
};
