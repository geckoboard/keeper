import { apiRequest } from './utils';

const API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api';
const getJSON = x => x.json();

export const get = (query, next) => {
  let url = `${API}/stories?query=${query}`;

  if (next) {
    url += `&next=${next}`;
  }

  return apiRequest(url).then(getJSON);
};
