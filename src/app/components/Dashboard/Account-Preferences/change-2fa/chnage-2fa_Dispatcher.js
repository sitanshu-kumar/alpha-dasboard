// to get current profile
export const getCurrentProfile = (data) => ({
  type: 'GET_PROFILE',
  payload: data,
});

// to set secret key
export const setSecretKey = (data) => ({
  type: 'SET_SECRET_KEY',
  payload: data,
});

// to set 2fa errrors
export const setSecretKeyError = (data) => ({
  type: 'SET_SECRET_KEY_ERROR',
  payload: data,
});

// eslint-disable-next-line camelcase
export const secretResponse = () => ({
  type: 'SECRET_KEY_UPDATE_STATUS',
  payload: true,
});
