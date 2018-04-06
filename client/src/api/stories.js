const API = 'http://localhost:8000/api';
const getJSON = x => x.json();

export const get = (query, next) => {
  let url = `${API}/stories?query=${query}`;

  if (next) {
    url += `&next=${next}`;
  }

  return fetch(url).then(getJSON);
};
