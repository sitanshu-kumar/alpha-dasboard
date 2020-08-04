import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../../Redux_Store/store';
import API from '../../Redux_Store/newConfig';
import setAuthToken from '../../utils/setAuthToken';

import {
  setCurrentUser,
  showEmailVerification,
  setError,
  hideEmailVerification,
  setLoginSucess,
} from './LoginDispatchFunction';

class LoginAPI {
  constructor() {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common[
        // eslint-disable-next-line dot-notation
        'Authorization'
      ] = `Bearer ${localStorage.getItem('token')}`;
    }
  }

  // function for user login process
  loginUser = async (userData) => {
    try {
      const value = await API.post('/users/sign_in', userData);
      const {
        jwt,
        email,
        first_name,
        last_name,
        email_confirmed,
        enabled_2fa,
      } = value.data;

      if (email_confirmed && jwt) {
        localStorage.setItem('token', jwt);

        const decoded = jwt_decode(jwt);
        // dispatch method for response  for set current user
        store.dispatch(setCurrentUser(decoded, email, first_name, last_name));
        store.dispatch(setLoginSucess('Logged Sucessfully!'));
        window.location.reload();
      } else {
        store.dispatch(showEmailVerification());
      }
    } catch (er) {
      console.log('error', er);
      store.dispatch({type: 'LOGIN_FAILED', payload: true});
    }
  };

  // function for user email verification

  verifyEmail = async (emailID, token) => {
    try {
      const value = await API.get('/users/confirm', {
        params: {email: emailID, token},
      });

      const {jwt, email, first_name, last_name} = value.data;
      localStorage.setItem('token', jwt);
      setAuthToken(jwt);
      const decoded = jwt_decode(jwt);

      // dispatch method for response  for set current user
      store.dispatch(setCurrentUser(decoded, email, first_name, last_name));
      store.dispatch({type: 'EMAIL_VERIFICATION_STATUS', payload: true});
      window.location.reload();
    } catch (er) {
      console.log(er);
      store.dispatch({type: 'EMAIL_VERIFICATION_STATUS', payload: false});
    }
  };

  logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    store.dispatch(setCurrentUser({}));

    store.dispatch({
      type: 'LOGOUT',
    });

    window.location.reload();

    document.title = 'Alpha5';
  };
  hideEmailVerification = () => {
    store.dispatch(hideEmailVerification());
  };
}

export const loginAPI = new LoginAPI();
