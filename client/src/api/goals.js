import { apiRequest } from './utils';

const API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api';
const getJSON = x => x.json();

const getGoals = project => apiRequest(`${API}/${project}/goals`).then(getJSON);

const addGoal = (project, title) =>
  apiRequest(`${API}/${project}/goals`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then(getJSON);

const deleteGoal = id =>
  apiRequest(`${API}/goals/${id}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
    },
  });

const updateGoal = (id, update) =>
  apiRequest(`${API}/goals/${id}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(update),
  }).then(getJSON);

export {
  getGoals as get,
  addGoal as add,
  deleteGoal as delete,
  updateGoal as update,
};
