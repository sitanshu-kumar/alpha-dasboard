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
      console.log(value);
      if (!value.data.email_confirmed) {
        store.dispatch(showEmailVerification());
      }
    } catch (er) {
      console.log('error', er.response.data.errors.email);
      if (er.response.data.errors.email)
        store.dispatch({type: 'EMAIL_EXIST', payload: true});
      //store.dispatch(setError('Email already exist'));
    }
  };

  // function for user mail verification
  verifyEmail = async (email, token) => {
    try {
      const value = await API.get('/users/confirm', {params: {email, token}});
      if (value) {
        const {jwt, email, first_name, last_name} = value.data;
        localStorage.setItem('token', jwt);
        const decoded = jwt_decode(jwt);
        store.dispatch(setCurrentUser(decoded, email, first_name, last_name));
        store.dispatch({type: 'EMAIL_VERIFICATION_STATUS', payload: true});
        window.location.reload();
      }
    } catch (er) {
      store.dispatch({type: 'EMAIL_VERIFICATION_STATUS', payload: false});
    }
  };

  // function for user mail verification
  getCurrentProfile = async () => {
    try {
      const value = await API.get('/users/me');
      if (value) {
        store.dispatch({
          type: 'GET_PROFILE',
          payload: value.data,
        });
      }
    } catch (er) {
      console.log(er);
    }
  };
}

export const registerAPI = new RegisterAPI();
