import { createThunk, createAction } from 'redan';
import TEAMS from '../../../teams';
import api from '../api';

const _getNextToken = response => {
  if (!response.next) {
    return undefined;
  }

  return response.next.split('next=')[1];
};

const _keepFetching = (fetcher, callback, stopWhen = () => false) => {
  const recursiveFetch = response => {
    const next = _getNextToken(response);

    callback(response);

    if (!next || stopWhen(response)) {
      return;
    }

    return fetcher(next).then(recursiveFetch);
  };

  return fetcher().then(recursiveFetch);
};

const _completedInLastThirtyDays = response => {
  const { data } = response;
  const last = data[data.length - 1];

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  const completedAt = new Date(last.completed_at);

  return completedAt < cutoff;
};

export const storiesReceived = createAction('STORIES_RECEIVED');
export const updateGoalOrder = createAction('UPDATE_GOAL_ORDER');

export const fetchGoals = createThunk('FETCH_GOALS', team => () =>
  api.goals.get(team),
);

export const addGoal = createThunk(
  'CREATE_GOAL',
  ({ team, title, order }) => () => api.goals.add(team, { title, order }),
);

export const updateGoalTitle = createThunk(
  'UPDATE_GOAL_TITLE',
  ({ id, title }) => () => api.goals.update(id, { title }),
);

export const saveGoalOrders = createThunk(
  'SAVE_GOAL_ORDERS',
  team => (_, getState) => {
    const goals = getState().goals.entities;

    const updates = goals.reduce(
      (updates, { id, order }) => ({ ...updates, [id]: order }),
      {},
    );

    return api.goals.updateOrders(team, updates);
  },
);

export const deleteGoal = createThunk('DELETE_GOAL', id => () =>
  api.goals.delete(id),
);

export const fetchStories = createThunk(
  'FETCH_STORIES',
  teamId => dispatch => {
    const team = TEAMS[teamId];

    // FETCH READY
    const ready = _keepFetching(
      next =>
        api.stories.get(
          `state:ready project:${team.name} !is:archived`,
          next,
        ),
      res => dispatch(storiesReceived(res)),
    );

    // FETCH DOING
    const doing = _keepFetching(
      next =>
        api.stories.get(
          `is:started project:${team.name} !is:archived`,
          next,
        ),
      res => dispatch(storiesReceived(res)),
    );

    // FETCH DONE
    const done = _keepFetching(
      next =>
        api.stories.get(`is:done project:${team.name} !is:archived`, next),
      res => dispatch(storiesReceived(res)),
      _completedInLastThirtyDays,
    );

    return Promise.all([ready, doing, done]);
  },
);

export const addStoryToGoal = createThunk(
  'ADD_STORY_TO_GOAL',
  ({ goalId, storyId }) => (_, getState) => {
    let { cards } = getState().goals.entities.find(x => x.id === goalId);

    if (!cards.includes(storyId)) {
      cards = [...cards, storyId];
    }

    return api.goals.update(goalId, { cards });
  },
);

export const removeStoryFromGoal = createThunk(
  'REMOVE_STORY_FROM_GOAL',
  ({ goalId, storyId }) => (_, getState) => {
    let { cards } = getState().goals.entities.find(x => x.id === goalId);
    cards = cards.filter(c => c !== storyId);

    return api.goals.update(goalId, { cards });
  },
);

export const setTeam = createThunk('SET_TEAM', id => dispatch => {
  dispatch(fetchGoals(id));
  dispatch(fetchStories(id));
});
