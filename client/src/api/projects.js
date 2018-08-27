import { apiRequest } from './utils';

const API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api';
const getJSON = x => x.json();

const getProjects = () => apiRequest(`${API}/projects`).then(getJSON);

export { getProjects as get };
