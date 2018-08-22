import { createThunk, createAction } from 'redan';
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

const _completedInLastTwoWeeks = response => {
  const { data } = response;
  const last = data[data.length - 1];

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 14);

  const completedAt = new Date(last.completed_at);

  return completedAt < cutoff;
};

export const storiesReceived = createAction('STORIES_RECEIVED');
export const updateGoalOrder = createAction('UPDATE_GOAL_ORDER');

export const fetchGoals = createThunk('FETCH_GOALS', team => () =>
  api.goals.get(team),
);

export const fetchTeams = createThunk('FETCH_TEAMS', () => () =>
  api.teams.get(),
);

export const fetchProjects = createThunk('FETCH_PROJECTS', () => () =>
  api.projects.get(),
);

export const addProject = createThunk(
  'ADD_PROJECT',
  project => (dispatch, getState) => {
    const state = getState();
    const team = state.teams.entities.find(t => t.id === state.teams.current);

    dispatch(fetchStories([project]));
    api.teams.update(team.id, { projects: [...team.projects, project] });
  },
);

export const removeProject = createThunk(
  'REMOVE_PROJECT',
  project => (dispatch, getState) => {
    const state = getState();
    const team = state.teams.entities.find(t => t.id === state.teams.current);

    api.teams.update(team.id, {
      projects: team.projects.filter(p => p !== project),
    });
  },
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
  projects => (dispatch, getState) => {
    const requests = [];

    projects.forEach(project => {
      // FETCH READY
      requests.push(
        _keepFetching(
          next =>
            api.stories.get(
              `state:ready project:${project} !is:archived`,
              next,
            ),
          res => dispatch(storiesReceived(res)),
        ),
      );

      // FETCH DOING
      requests.push(
        _keepFetching(
          next =>
            api.stories.get(`is:started project:${project} !is:archived`, next),
          res => dispatch(storiesReceived(res)),
        ),
      );

      // FETCH DONE
      requests.push(
        _keepFetching(
          next =>
            api.stories.get(`is:done project:${project} !is:archived`, next),
          res => dispatch(storiesReceived(res)),
          _completedInLastTwoWeeks,
        ),
      );
    });

    return Promise.all(requests);
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

export const setTeam = createThunk('SET_TEAM', id => (dispatch, getState) => {
  const state = getState();
  const team = state.teams.entities.find(t => t.id === id);

  dispatch(fetchGoals(id));
  dispatch(fetchStories(team.projects));
});
