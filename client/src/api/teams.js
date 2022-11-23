import { API, apiRequest, getJSON } from './utils';

const getShortcutTeams = () =>
  apiRequest(`${API}/shortcut-teams`).then(getJSON);

const getTeams = () => apiRequest(`${API}/teams`).then(getJSON);

const updateTeam = (id, updates) =>
  apiRequest(`${API}/teams/${id}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updates),
  }).then(getJSON);

export { getTeams as get, updateTeam as update, getShortcutTeams };
