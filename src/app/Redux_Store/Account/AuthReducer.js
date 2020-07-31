import isEmpty from '../../validation/is-empty';

import {
  SET_CURRENT_USER,
  LOGOUT,
  USER_PASSWORD_CHANGE,
  SET_MFA_STATUS,
  SHOW_EMAIL_VERIFICATION,
  SET_RESET_PASSWORD_EMAIL,
} from '../types';

const getFromLS = (key) => localStorage.getItem('token');

const initialState = {
  isAuthenticated: !isEmpty(getFromLS('token')),
  loading: true,
  user: {},
  showEmailVerificationModal: false,
  loggedInSucessful: null,
  emailVerificationSend: null,
  userEmail: null,
  passwordReset: null,
  emailExist: null,
  loginFailed: null,
  passwordChanged: null,
};

export default function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        loading: false,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {},
      };

    // shows and hides password changed modal
    case USER_PASSWORD_CHANGE:
      return {
        ...state,
        passwordChanged: action.payload,
      };

    case SET_MFA_STATUS:
      return {
        ...state,
        currentMFAaction: action.payload,
      };

    case SHOW_EMAIL_VERIFICATION:
      return {
        ...state,
        showEmailVerificationModal: action.payload,
      };

    case SET_RESET_PASSWORD_EMAIL:
      return {...state, resetPasswordEmail: action.payload};

    case 'SET_LOGIN_SUCCESS':
      return {...state, loggedInSucessful: action.payload};

    case 'EMAIL_VERIFICATION_SEND_SUCCESS':
      return {...state, emailVerificationSend: action.payload};

    case 'EMIL_FOR_RESET_PASSWORD':
      return {...state, userEmail: action.payload};

    case 'PASSWORD_RESETED_SUCCESS':
      return {...state, passwordReset: true};

    case 'EMAIL_EXIST':
      return {...state, emailExist: action.payload};

    case 'EMAIL_VERIFICATION_STATUS':
      return {...state, emailVerification: action.payload};
    case 'LOGIN_FAILED':
      return {...state, loginFailed: action.payload};
    default:
      return state;
  }
}
