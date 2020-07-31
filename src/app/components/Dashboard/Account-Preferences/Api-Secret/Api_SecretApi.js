import axios from 'axios';
import store from '../../../../Redux_Store/store';
import API from '../../../../Redux_Store/newConfig';
import {GET_ALL_API_SECRET_KEY} from '../../../../Redux_Store/types';
import {getAllApiSecret} from './Api_SecretDispatcher';

class ApiSecretKeyAPI {
  constructor() {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common[
        // eslint-disable-next-line dot-notation
        'Authorization'
      ] = `Bearer ${localStorage.getItem('token')}`;
    }
  }

  // function for get all api key secret
  getAllApiKeys = async (id, name) => {
    try {
      const value = await API.get('/users/get_all_key_pairs');
      if (value) {
        let apiSecretKeysArray = value.data.map((el) => {
          return {...el, secret: '*************'};
        });
        store.dispatch(getAllApiSecret(apiSecretKeysArray));
      }
    } catch (er) {
      console.log(er);
    }
  };

  getEmailVerificationCode = async (email) => {
    try {
      const value = await API.get('/users/send_email', {
        params: {email: email, category: 'generate_key_pair'},
      });
      console.log(value);
    } catch (error) {}
  };

  getEmailVerificationCodeForDeletion = async (email) => {
    try {
      const value = await API.get('/users/send_email', {
        params: {email: email, category: 'delete_key_pair'},
      });
      console.log(value);
    } catch (error) {}
  };

  // function for get new api key secret
  getNewKeyAndSecret = async (data) => {
    try {
      let value = await API.post('/users/generate_key_pair', data);
      console.log(value);
      if (value.data) {
        let {secret_key} = value.data;
        let ar = store.getState().apikeys.apiSecretKeysArray;
        if (Array.isArray(ar)) ar.unshift({...value.data, secret: secret_key});
        else ar = [{...value.data, secret: secret_key}];
        store.dispatch(getAllApiSecret(ar));
      }
    } catch (er) {
      console.log(er);
    }
  };

  // function for delete api key secret
  deleteApiKey = async (data) => {
    try {
      const value = await API.post('/users/delete_key_pair', data);
      console.log(value);
      if (value) {
        let ar = store.getState().apikeys.apiSecretKeysArray;
        let newarr = ar.filter((el) => el.name != data.name);
        store.dispatch(getAllApiSecret(newarr));
      }
    } catch (er) {
      console.log(er);
    }
  };

  // function for clear keys
  clearKeys = () => {
    return {type: GET_ALL_API_SECRET_KEY, payload: []};
  };
}

export const apiSecretKeyAPI = new ApiSecretKeyAPI();
