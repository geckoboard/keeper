import { createThunk, createAction } from 'redan';
import PROJECTS from '../../../projects';
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

export const fetchGoals = createThunk('FETCH_GOALS', project => () =>
  api.goals.get(project),
);

export const addGoal = createThunk(
  'CREATE_GOAL',
  ({ project, title, order }) => () => api.goals.add(project, { title, order }),
);

export const updateGoalTitle = createThunk(
  'UPDATE_GOAL_TITLE',
  ({ id, title }) => () => api.goals.update(id, { title }),
);

export const deleteGoal = createThunk('DELETE_GOAL', id => () =>
  api.goals.delete(id),
);

export const fetchStories = createThunk(
  'FETCH_STORIES',
  projectId => dispatch => {
    const project = PROJECTS[projectId];

    // FETCH READY
    const ready = _keepFetching(
      next =>
        api.stories.get(
          `state:ready project:${project.name} !is:archived`,
          next,
        ),
      res => dispatch(storiesReceived(res)),
    );

    // FETCH DOING
    const doing = _keepFetching(
      next =>
        api.stories.get(
          `is:started project:${project.name} !is:archived`,
          next,
        ),
      res => dispatch(storiesReceived(res)),
    );

    // FETCH DONE
    const done = _keepFetching(
      next =>
        api.stories.get(`is:done project:${project.name} !is:archived`, next),
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

export const setProject = createThunk('SET_PROJECT', id => dispatch => {
  dispatch(fetchGoals(id));
  dispatch(fetchStories(id));
});
