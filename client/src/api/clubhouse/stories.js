import { API, apiRequest, getJSON } from '../utils';

export const get = (query, next) => {
  let url = `${API}/stories?query=${query}`;

  if (next) {
    url += `&next=${next}`;
  }

  return apiRequest(url).then(getJSON);
};

export const getReady = (project, next) =>
  get(`state:ready project:${project} !is:archived`, next);

export const getDoing = (project, next) =>
  get(`is:started project:${project} !is:archived`, next);

export const getDone = (project, next) =>
  get(`is:done project:${project} !is:archived`, next);

export const getReadyByShortcutTeam = (teamId, next) =>
  get(`state:ready team:${teamId} !is:archived`, next);

export const getDoingByShortcutTeam = (teamId, next) =>
  get(`is:started team:${teamId} !is:archived`, next);

export const getDoneByShortcutTeam = (teamId, next) =>
  get(`is:done team:${teamId} !is:archived`, next);

export const create = ({ projectId, teamId, goalId, name }) =>
  apiRequest(`${API}/stories`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      teamId,
      goalId,
      name,
    }),
  }).then(getJSON);
