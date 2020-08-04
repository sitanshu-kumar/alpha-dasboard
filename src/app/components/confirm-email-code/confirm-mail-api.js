import axios from 'axios';
import store from '../../Redux_Store/store';
import API from '../../Redux_Store/newConfig';
import {RESEND_EMAIL_STATUS} from '../../Redux_Store/types';

class ResendEmailAPI {
  constructor() {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common[
        // eslint-disable-next-line dot-notation
        'Authorization'
      ] = `Bearer ${localStorage.getItem('token')}`;
    }
  }

  //function to resend code
  resendEmail = async (emailid, category) => {
    try {
      const value = await API.get('/users/send_email', {
        params: {email: emailid, category},
      });
      if (value) store.dispatch({type: RESEND_EMAIL_STATUS, payload: true});
    } catch (er) {
      store.dispatch({type: RESEND_EMAIL_STATUS, payload: false});
    }
  };
}

export const resendEmailAPI = new ResendEmailAPI();
