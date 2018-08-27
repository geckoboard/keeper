import { apiRequest } from './utils';

const API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api';
const getJSON = x => x.json();

const getTeams = team => apiRequest(`${API}/teams`).then(getJSON);

const updateTeam = (id, updates) =>
  apiRequest(`${API}/teams/${id}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updates),
  }).then(getJSON);

export { getTeams as get, updateTeam as update };
