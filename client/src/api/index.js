import * as goals from './goals';
import * as stories from './stories';

export default {
  goals: {
    fetch: goals.fetchGoals,
    add: goals.addGoal,
    delete: goals.deleteGoal,
    update: goals.updateGoal,
  },
  stories: {
    fetch: stories.fetchStories,
  },
};
