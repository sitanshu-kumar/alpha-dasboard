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
};

export default function (state = initialState, action) {
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

    default:
      return state;
  }
}
