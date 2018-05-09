const sharedOptions = {
  credentials: 'same-origin',
};

export const apiRequest = (url, options = {}) =>
  fetch(url, { ...sharedOptions, ...options });
