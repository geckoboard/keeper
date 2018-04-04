import * as goals from './goals';
import * as stories from './stories';

export default {
  goals: {
    fetch: goals.fetchGoals,
    add: goals.addGoal,
    delete: goals.deleteGoal,
  },
  stories: {
    fetch: stories.fetchStories,
  },
};
