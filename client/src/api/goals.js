const API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api';
const getJSON = x => x.json();

const getGoals = () => fetch(`${API}/goals`).then(getJSON);

const addGoal = title =>
  fetch(`${API}/goals`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then(getJSON);

const deleteGoal = id =>
  fetch(`${API}/goals/${id}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
    },
  });

const updateGoal = (id, update) =>
  fetch(`${API}/goals/${id}`, {
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
