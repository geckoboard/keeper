import { apiRequest } from './utils';

const API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api';
const getJSON = x => x.json();

const getTeams = team => apiRequest(`${API}/teams`).then(getJSON);

export { getTeams as get };
