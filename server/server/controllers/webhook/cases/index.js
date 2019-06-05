const storyCreated = require('./story-created');
const storyRenamed = require('./story-renamed');
const storyArchived = require('./story-Archived');
const storyUnarchived = require('./story-unarchived');
const storyChangedProject = require('./story-changed-project');
const storyMovedToVisibleColumn = require('./story-moved-to-visible-column');
const storyMovedFromVisibleColumn = require('./story-moved-from-visible-column');
const storyMovedBetweenVisibleColumns = require('./story-moved-between-visible-columns');

module.exports = {
  storyCreated,
  storyRenamed,
  storyArchived,
  storyUnarchived,
  storyChangedProject,
  storyMovedToVisibleColumn,
  storyMovedFromVisibleColumn,
  storyMovedBetweenVisibleColumns,
};
