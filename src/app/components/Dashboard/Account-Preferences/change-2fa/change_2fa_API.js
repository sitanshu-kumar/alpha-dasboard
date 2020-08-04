import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../../../../Redux_Store/store';
import API from '../../../../Redux_Store/newConfig';
import {compose} from 'redux';
import {withAlert} from 'react-alert';
import setAuthToken from '../../../../utils/setAuthToken';
import {
  getCurrentProfile,
  setSecretKey,
  setSecretKeyError,
  secretResponse,
} from './chnage-2fa_Dispatcher';

class Change2faApi {
  // function for user login process
  changeMFAStatus = async (data) => {
    try {
      const value = await API.post('/users/change_2fa_status', data);
      if (value) {
        this.getCurrentProfile();
        this.getSecretKeyFor2FA();
        //store.dispatch(setSecretKeyError('Sucessfully Updated !!'));
        store.dispatch(secretResponse());
      }
    } catch (er) {
      let data = er.response.data;
      if (data.type == 'invalid_data')
        store.dispatch({
          type: 'SET_SECRET_KEY_ERROR',
          payload: true,
        });
    }
  };

  getSecretKeyFor2FA = async () => {
    try {
      const value = await API.get('/users/secret_key_2fa');
      const {secret_key_2fa} = value.data;
      store.dispatch(setSecretKey(secret_key_2fa));
    } catch (er) {
      try {
        const value = await API.get('/users/secret_key_2fa');
        const {secret_key_2fa} = value.data;
        store.dispatch(setSecretKey(secret_key_2fa));
      } catch (er) {
        console.log(er);
      }
    }
  };

  getCurrentProfile = async () => {
    try {
      const value = await API.get('/users/me');
      if (value.data) store.dispatch(getCurrentProfile(value.data));
    } catch (er) {
      console.log(er);
    }
  };
}

export const change2faApi = new Change2faApi();
