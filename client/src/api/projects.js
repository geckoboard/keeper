import { API, apiRequest, getJSON } from './utils';

const getProjects = () => apiRequest(`${API}/projects`).then(getJSON);

export { getProjects as get };
