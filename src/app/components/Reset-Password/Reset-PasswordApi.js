import axios from 'axios';
import store from '../../Redux_Store/store';
import API from '../../Redux_Store/newConfig';

class ResetPasswordAPI {
  getEmailVerificationCode = async (email) => {
    try {
      const value = await API.get('/users/send_email', {
        params: {email: email, category: 'forgot_password'},
      });
      store.dispatch({type: 'EMAIL_VERIFICATION_SEND_SUCCESS', payload: true});
      store.dispatch({type: 'EMIL_FOR_RESET_PASSWORD', payload: email});
      console.log(value);
    } catch (error) {
      store.dispatch({type: 'EMAIL_VERIFICATION_SEND_SUCCESS', payload: false});
      //store.dispatch(setError(error.response.data));
    }
  };

  resetPassword = async (UserPasswordDetails) => {
    try {
      const value = await API.post(
        '/users/reset_password',
        UserPasswordDetails,
      );
      console.log(value);
      if (value) {
        store.dispatch({type: 'PASSWORD_RESETED_SUCCESS', payload: true});
      }
    } catch (error) {
      //store.dispatch(setError('Token MisMatch'));
    }
  };
}

export const resetPasswordAPI = new ResetPasswordAPI();
