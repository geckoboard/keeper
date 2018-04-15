import { createThunk, createAction } from 'redan';
import api from '../api';

const _getNextToken = response => {
  if (!response.next) {
    return undefined;
  }

  return response.next.match(/(?<=next=)[^\&]*/)[0];
};

const _keepFetching = (fetcher, callback, stopWhen = () => false) => {
  const recursiveFetch = response => {
    const next = _getNextToken(response);

    callback(response);

    if (!next || stopWhen(response)) {
      return;
    }

    fetcher(next).then(recursiveFetch);
  };

  fetcher().then(recursiveFetch);
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

export const fetchGoals = createThunk('FETCH_GOALS', () => () =>
  api.goals.get(),
);

export const addGoal = createThunk('CREATE_GOAL', title => () =>
  api.goals.add(title),
);

export const updateGoalTitle = createThunk(
  'UPDATE_GOAL_TITLE',
  ({ id, title }) => () => api.goals.update(id, { title }),
);

export const deleteGoal = createThunk('DELETE_GOAL', id => () =>
  api.goals.delete(id),
);

export const fetchStories = () => dispatch => {
  // FETCH READY
  _keepFetching(
    next => api.stories.get('state:ready project:taco !is:archived', next),
    res => dispatch(storiesReceived(res)),
  );

  // FETCH DOING
  _keepFetching(
    next => api.stories.get('is:started project:taco !is:archived', next),
    res => dispatch(storiesReceived(res)),
  );

  // FETCH DONE
  _keepFetching(
    next => api.stories.get('is:done project:taco !is:archived', next),
    res => dispatch(storiesReceived(res)),
    _completedInLastThirtyDays,
  );
};

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
