import axios from 'axios';
import store from '../../../../Redux_Store/store';
import API from '../../../../Redux_Store/newConfig';
import {USER_PASSWORD_CHANGE} from '../../../../Redux_Store/types';
import {userChangePassword, setError} from './changePasswordDispatcher';

class ChangePasswordAPI {
  // function to change password
  changePassword = async (UserPasswordDetails) => {
    try {
      const value = await API.post(
        '/users/change_password',
        UserPasswordDetails,
      );
      if (value) {
        store.dispatch(userChangePassword());
      }
    } catch (error) {
      store.dispatch(setError(error.response.data));
    }
  };
  resetChangePassword = () => {
    return {type: USER_PASSWORD_CHANGE, payload: false};
  };
}

export const changePasswordAPI = new ChangePasswordAPI();
