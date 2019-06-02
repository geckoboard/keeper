const storyCreated = require('./storyCreated');
const storyRenamed = require('./storyRenamed');
const storyArchived = require('./storyArchived');
const storyUnarchived = require('./storyUnarchived');
const storyMovedToVisibleColumn = require('./storyMovedToVisibleColumn');
const storyMovedFromVisibleColumn = require('./storyMovedFromVisibleColumn');
const storyMovedBetweenVisibleColumns = require('./storyMovedBetweenVisibleColumns');

module.exports = {
  storyCreated,
  storyRenamed,
  storyArchived,
  storyUnarchived,
  storyMovedToVisibleColumn,
  storyMovedFromVisibleColumn,
  storyMovedBetweenVisibleColumns,
};
