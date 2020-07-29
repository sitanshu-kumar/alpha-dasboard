import axios from 'axios';
import {BaseApiUrl} from '../config';
import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from '../types';

const BASE_URL = BaseApiUrl;

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
  axios
    .get(`${BASE_URL}/users/me`, {
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8',
      },
    })
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((error) => console.log(error));
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
