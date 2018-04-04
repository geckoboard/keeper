const API = 'http://localhost:8000/api';
const getJSON = x => x.json();

export const fetchStories = () => fetch(`${API}/stories`).then(getJSON);
