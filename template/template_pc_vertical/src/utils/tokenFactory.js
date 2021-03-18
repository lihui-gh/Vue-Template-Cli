const TokenStorageKey = '_token';

const setToken = function(token) {
  return localStorage.setItem(TokenStorageKey, token);
};

const getToken = function() {
  return localStorage.getItem(TokenStorageKey);
};

const clearToken = function() {
  return localStorage.removeItem(TokenStorageKey);
};

export default {
  setToken: setToken,
  getToken: getToken,
  clearToken: clearToken
};
