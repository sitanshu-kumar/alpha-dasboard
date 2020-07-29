import {
  SET_ERRORS,
  SET_CURRENT_USER,
  SHOW_EMAIL_VERIFICATION,
} from '../../redux/types';

// eslint-disable-next-line camelcase
export const setCurrentUser = ({decoded, email, first_name, last_name}) => ({
  type: SET_CURRENT_USER,
  payload: {
    decoded,
    email,
    first_name,
    last_name,
  },
});

// eslint-disable-next-line camelcase
export const showEmailVerification = () => ({
  type: SHOW_EMAIL_VERIFICATION,
  payload: true,
});

export const hideEmailVerification = () => ({
  type: SHOW_EMAIL_VERIFICATION,
  payload: false,
});

// eslint-disable-next-line camelcase
export const setError = (data) => ({
  type: SET_ERRORS,
  payload: data,
});
export const setLoginSucess = (data) => ({
  type: 'SET_LOGIN_SUCCESS',
  payload: data,
});
