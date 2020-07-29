import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import {BaseApiUrl} from '../config';
import {
  SET_ERRORS,
  SET_CURRENT_USER,
  LOGOUT,
  USER_PASSWORD_CHANGE,
  SET_MFA_STATUS,
  SHOW_EMAIL_VERIFICATION,
  SET_RESET_PASSWORD_EMAIL,
} from '../types';

const BASE_URL = BaseApiUrl;

// Register User
export const registerUser = (userData) => (dispatch) => {
  axios
    .post(`${BASE_URL}/users/sign_up`, userData, {
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8',
      },
    })
    .then((res) => {
      if (!res.data.email_confirmed) {
        dispatch({type: SHOW_EMAIL_VERIFICATION, payload: true});
      }
    })
    .catch((error) => {
      dispatch({type: SHOW_EMAIL_VERIFICATION, payload: true});
    });
};

// hideEmailVerification
export const hideEmailVerification = () => ({
  type: SHOW_EMAIL_VERIFICATION,
  payload: false,
});

// verify Email end point for activating account
export const verifyEmail = (token, email) => (dispatch) => {
  let url = `${BASE_URL}/users/confirm`;
  axios
    .get(url, {params: {email, token}})
    .then((res) => {
      const {jwt, email, first_name, last_name} = res.data;
      localStorage.setItem('token', jwt);
      setAuthToken(jwt);
      const decoded = jwt_decode(jwt);
      dispatch(setCurrentUser(decoded, email, first_name, last_name));
    })
    .catch((er) => {
      if (er.response.data)
        dispatch({
          type: SET_ERRORS,
          payload: er.response.data,
        });
    });
};

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(`${BASE_URL}/users/sign_in`, userData, {
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8',
      },
    })
    .then((res) => {
      const {
        jwt,
        email,
        first_name,
        last_name,
        email_confirmed,
        enabled_2fa,
      } = res.data;
      if (email_confirmed && jwt) {
        console.log('email has been confirmed');
        localStorage.setItem('token', jwt);
        setAuthToken(jwt);
        const decoded = jwt_decode(jwt);
        dispatch(setCurrentUser(decoded, email, first_name, last_name));
      } else {
        dispatch({type: SHOW_EMAIL_VERIFICATION, payload: true});
      }
    })
    .catch((error) =>
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      }),
    );
};

// Set logged in user
export const setCurrentUser = (decoded, email, first_name, last_name) => {
  return {
    type: SET_CURRENT_USER,
    payload: {decoded, email, first_name, last_name},
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  document.title = 'Alpha5';
  setAuthToken(false);
  dispatch({
    type: LOGOUT,
  });
};

export const goToResetPasswordForm = (email, history) => {
  history.push('/password-change');
  return {
    type: SET_RESET_PASSWORD_EMAIL,
    payload: email,
  };
};

export const passwordResetted = () => {
  return {
    type: SET_RESET_PASSWORD_EMAIL,
    payload: '',
  };
};

export const changePassword = (UserPasswordDetails) => (dispatch) => {
  // changing user password
  axios
    .post(`${BASE_URL}/users/change_password`, UserPasswordDetails)
    .then((res) =>
      dispatch({
        type: USER_PASSWORD_CHANGE,
        payload: true,
      }),
    )
    .catch((error) =>
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      }),
    );
};

export const resetChangePassword = () => {
  return {type: USER_PASSWORD_CHANGE, payload: false};
};

export const setMFAAuthentication = (permittedAction) => {
  return {type: SET_MFA_STATUS, payload: permittedAction};
};

export const resetMFAAuthentication = () => {
  return {type: SET_MFA_STATUS, payload: null};
};
