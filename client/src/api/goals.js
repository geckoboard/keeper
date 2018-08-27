import { API, apiRequest, getJSON } from './utils';

const getGoals = team => apiRequest(`${API}/${team}/goals`).then(getJSON);

const addGoal = (team, goal) =>
  apiRequest(`${API}/${team}/goals`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(goal),
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

const updateOrders = (team, updates) =>
  apiRequest(`${API}/${team}/goals/orders`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

export {
  getGoals as get,
  addGoal as add,
  deleteGoal as delete,
  updateGoal as update,
  updateOrders,
};
