import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../../../../Redux_Store/store';
import API from '../../../../Redux_Store/newConfig';

import {} from './BalanceDispatchFunction';

class BalanceApi {
  constructor() {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common[
        // eslint-disable-next-line dot-notation
        'Authorization'
      ] = `Bearer ${localStorage.getItem('token')}`;
    }
  }

  // function to user address
  getUserAddress = async (symbol) => {
    try {
      const value = await API.get('account/get_deposit_address', {
        params: {asset_symbol: symbol},
      });
      if (value) {
      }
    } catch (er) {}
  };
}

export const balanceApi = new BalanceApi();
