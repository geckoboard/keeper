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
