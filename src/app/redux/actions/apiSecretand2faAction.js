import axios from 'axios';
import {BaseApiUrl} from '../config';
import {GET_ALL_API_SECRET_KEY} from '../../redux/types';
import store from '../store';

export const getAllApiKeys = () => (dispatch) => {
  let url = BaseApiUrl + '/users/get_all_key_pairs';
  axios.get(url).then((res) => {
    let apiSecretKeysArray = res.data.map((el) => {
      return {...el, secret: '*************'};
    });
    dispatch({type: GET_ALL_API_SECRET_KEY, payload: apiSecretKeysArray});
  });
};

export const getNewKeyAndSecret = (name) => (dispatch) => {
  let url = BaseApiUrl + '/users/generate_key_pair';
  axios
    .post(url, {name})
    .then((res) => {
      console.log(res.data);
      let {secret_key} = res.data;
      let ar = store.getState().apikeys.apiSecretKeysArray;
      if (Array.isArray(ar)) ar.unshift({...res.data, secret: secret_key});
      else ar = [{...res.data, secret: secret_key}];
      dispatch({type: GET_ALL_API_SECRET_KEY, payload: ar});
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteApiKey = (id, name) => (dispatch) => {
  let url = BaseApiUrl + '/users/delete_key_pair';
  axios.post(url, {name}).then((res) => {
    console.log(res.data);
    let ar = store.getState().apikeys.apiSecretKeysArray;
    let newarr = ar.filter((el) => el.name != name);
    dispatch({type: GET_ALL_API_SECRET_KEY, payload: newarr});
  });
};

export const clearKeys = () => {
  return {type: GET_ALL_API_SECRET_KEY, payload: []};
};
