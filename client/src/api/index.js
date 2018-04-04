import * as api from './api';

export default {
  goals: {
    fetch: api.fetchGoals,
    add: api.addGoal,
    delete: api.deleteGoal,
  },
};
