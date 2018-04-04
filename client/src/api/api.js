const API = 'http://localhost:8000/api';
const getJSON = x => x.json();

export const fetchGoals = () => fetch(`${API}/goals`).then(getJSON);

export const addGoal = title =>
  fetch(`${API}/goals`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then(getJSON);

export const deleteGoal = id =>
  fetch(`${API}/goals/${id}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
    },
  });
