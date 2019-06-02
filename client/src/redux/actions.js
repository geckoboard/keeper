import { createThunk, createAction } from 'redan';
import api from '../api';
import { unique } from '../utils';
import { getGoals } from './helpers';

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

export const setGoals = createAction('SET_GOALS');
export const storiesReceived = createAction('STORIES_RECEIVED');
export const updateGoalOrder = createAction('UPDATE_GOAL_ORDER');

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
    api.teams.update(team.id, {
      projects: unique([...team.projects, project]),
    });
  },
);

export const removeProject = createThunk(
  'REMOVE_PROJECT',
  project => (dispatch, getState) => {
    const state = getState();
    const team = state.teams.entities.find(t => t.id === state.teams.current);

    api.teams.update(team.id, {
      projects: unique(team.projects.filter(p => p !== project)),
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
    const goals = getGoals(getState());

    const updates = goals.reduce(
      (updates, { id, order }) => ({ ...updates, [id]: order }),
      {},
    );

    return api.goals.updateOrders(team, updates);
  },
);

export const deleteGoal = createThunk('DELETE_GOAL', goal => () =>
  api.goals.delete(goal.id),
);

export const fetchStories = createThunk(
  'FETCH_STORIES',
  projects => dispatch => {
    const requests = [];

    projects.forEach(project => {
      // FETCH READY
      requests.push(
        _keepFetching(
          next => api.clubhouse.stories.getReady(project, next),
          res => dispatch(storiesReceived(res)),
        ),
      );

      // FETCH DOING
      requests.push(
        _keepFetching(
          next => api.clubhouse.stories.getDoing(project, next),
          res => dispatch(storiesReceived(res)),
        ),
      );

      // FETCH DONE
      requests.push(
        _keepFetching(
          next => api.clubhouse.stories.getDone(project, next),
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
    let { cards } = getGoals(getState()).find(x => x.id === goalId);

    if (!cards.includes(storyId)) {
      cards = [...cards, storyId];
    }

    return api.goals.update(goalId, { cards });
  },
);

export const removeStoryFromGoal = createThunk(
  'REMOVE_STORY_FROM_GOAL',
  ({ goalId, storyId }) => (_, getState) => {
    let { cards } = getGoals(getState()).find(x => x.id === goalId);
    cards = cards.filter(c => c !== storyId);

    return api.goals.update(goalId, { cards });
  },
);

export const setTeam = createThunk('SET_TEAM', id => (dispatch, getState) => {
  const state = getState();
  const team = state.teams.entities.find(t => t.id === id);

  dispatch(setGoals(team.goals));
  dispatch(fetchStories(team.projects));
});

export const createStoryFromGoal = createThunk(
  'CREATE_STORY_FROM_GOAL',
  ({ goal, project }) => () =>
    api.clubhouse.stories
      .create({
        goalId: goal.id,
        teamId: project.team_id,
        projectId: project.id,
        name: goal.title,
      })
      .then(story => ({
        goalId: goal.id,
        story,
      })),
);
