import { createThunk } from 'redan';
import api from '../api';

export const fetchGoals = createThunk('FETCH_GOALS', () => () =>
  api.goals.fetch(),
);

export const addGoal = createThunk('CREATE_GOAL', title => () =>
  api.goals.add(title),
);

export const deleteGoal = createThunk('DELETE_GOAL', id => () =>
  api.goals.delete(id),
);

export const fetchStories = createThunk('FETCH_STORIES', () => () =>
  api.stories.fetch(),
);

export const addStoryToGoal = createThunk(
  'ADD_STORY_TO_GOAL',
  ({ goalId, storyId }) => (_, getState) => {
    const goal = getState().goals.entities.find(x => x.id === goalId);
    let cards = goal.cards || [];

    if (!cards.includes(storyId)) {
      cards = [...cards, storyId];
    }

    return api.goals.update(goalId, { cards });
  },
);
