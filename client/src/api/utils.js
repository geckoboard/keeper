const sharedOptions = {
  credentials: 'same-origin',
};

export const apiRequest = (url, options = {}) =>
  fetch(url, { ...sharedOptions, ...options });

export const API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api';

export const getJSON = x => x.json();
