import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../../Redux_Store/store';
import API from '../../Redux_Store/newConfig';

import {
  setCurrentUser,
  showEmailVerification,
  setError,
  setUserExistError,
} from './RegisterDispatchFunction';

class RegisterAPI {
  constructor() {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common[
        // eslint-disable-next-line dot-notation
        'Authorization'
      ] = `Bearer ${localStorage.getItem('token')}`;
    }
  }

  // function for user register process
  registerUser = async (userData) => {
    try {
      const value = await API.post('/users/sign_up', userData);
      if (!value.data.email_confirmed) {
        store.dispatch(showEmailVerification);
      }
    } catch (er) {
      console.log('error', er.response);
      store.dispatch(setError('Email already exist'));
    }
  };
}

export const registerAPI = new RegisterAPI();
