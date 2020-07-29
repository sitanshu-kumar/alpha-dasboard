import {USER_PASSWORD_CHANGE, SET_ERRORS} from '../../../../Redux_Store/types';

export const userChangePassword = () => ({
  type: USER_PASSWORD_CHANGE,
  payload: true,
});

export const setError = (data) => ({
  type: SET_ERRORS,
  payload: data,
});
