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
