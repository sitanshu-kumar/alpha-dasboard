import {
  SET_ERRORS,
  SET_CURRENT_USER,
  LOGOUT,
  USER_PASSWORD_CHANGE,
  SET_MFA_STATUS,
  SHOW_EMAIL_VERIFICATION,
  SET_RESET_PASSWORD_EMAIL,
  USER_ALREADY_EXIST,
} from '../../Redux_Store/types';

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

// eslint-disable-next-line camelcase
export const setError = (er) => ({
  type: SET_ERRORS,
  payload: 'email exist',
});
